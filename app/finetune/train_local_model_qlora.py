#!/usr/bin/env python3
"""Question-response behavior QLoRA for all three MC-VHTA local models.

The same main SFT corpus is used for Granite 4.2 8B, Gemma 4 12B, and
Ministral 3 8B. The training objective is answer behavior/format; physiology
knowledge remains grounded by the application's RAG/KB context at inference.
"""
import os,json,time,inspect,argparse
from pathlib import Path
import torch
from torch.nn.utils.rnn import pad_sequence
from torch.utils.data import Dataset
from transformers import AutoTokenizer,AutoModelForCausalLM,BitsAndBytesConfig,Trainer,TrainingArguments,set_seed
try:
    from transformers import AutoModelForMultimodalLM
except Exception:
    AutoModelForMultimodalLM=None
try:
    from transformers import AutoModelForImageTextToText
except Exception:
    AutoModelForImageTextToText=None
from peft import LoraConfig,get_peft_model,prepare_model_for_kbit_training
from model_profiles import profile

ROOT=Path(__file__).resolve().parent

class JsonlChatDataset(Dataset):
    def __init__(self,path,tokenizer,max_length):
        self.rows=[json.loads(x) for x in Path(path).read_text(encoding='utf-8').splitlines() if x.strip()]
        self.tokenizer=tokenizer; self.max_length=max_length
    def __len__(self): return len(self.rows)
    def _chat(self,messages,add_generation_prompt):
        try:return self.tokenizer.apply_chat_template(messages,tokenize=False,add_generation_prompt=add_generation_prompt,enable_thinking=False)
        except TypeError:return self.tokenizer.apply_chat_template(messages,tokenize=False,add_generation_prompt=add_generation_prompt)
    def __getitem__(self,i):
        msgs=self.rows[i]['messages']; prompt=self._chat(msgs[:-1],True); answer=msgs[-1]['content'].strip(); eos=self.tokenizer.eos_token or ''
        p=self.tokenizer(prompt,add_special_tokens=False,truncation=True,max_length=self.max_length)
        x=self.tokenizer(prompt+answer+eos,add_special_tokens=False,truncation=True,max_length=self.max_length)
        ids=torch.tensor(x['input_ids'],dtype=torch.long); mask=torch.tensor(x['attention_mask'],dtype=torch.long); labels=ids.clone()
        labels[:min(len(p['input_ids']),len(labels))]=-100
        if torch.all(labels.eq(-100)): raise RuntimeError('Example truncated before assistant response; increase --max-length')
        return {'input_ids':ids,'attention_mask':mask,'labels':labels}

class Collator:
    def __init__(self,pad_id):self.pad_id=pad_id
    def __call__(self,batch):
        return {'input_ids':pad_sequence([x['input_ids'] for x in batch],batch_first=True,padding_value=self.pad_id),
                'attention_mask':pad_sequence([x['attention_mask'] for x in batch],batch_first=True,padding_value=0),
                'labels':pad_sequence([x['labels'] for x in batch],batch_first=True,padding_value=-100)}

def gpu_free_gib():
    if not torch.cuda.is_available():return 0.0,0.0
    f,t=torch.cuda.mem_get_info();return f/(1024**3),t/(1024**3)

def load_model(model_id,loader,use_cuda):
    common={'low_cpu_mem_usage':True,'trust_remote_code':True}
    if use_cuda:
        dtype=torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16
        common.update(quantization_config=BitsAndBytesConfig(load_in_4bit=True,bnb_4bit_quant_type='nf4',bnb_4bit_use_double_quant=True,bnb_4bit_compute_dtype=dtype),device_map={'':0},torch_dtype=dtype)
    else: common.update(torch_dtype=torch.float32)
    if loader=='causal': cls=AutoModelForCausalLM
    else:
        cls=AutoModelForMultimodalLM or AutoModelForImageTextToText
        if cls is None: raise RuntimeError('This Transformers build lacks multimodal auto-model support required for Gemma 4 / Ministral 3. Run PREPARE_FINETUNE_ENV.sh.')
    model=cls.from_pretrained(model_id,**common)
    if use_cuda:model=prepare_model_for_kbit_training(model,use_gradient_checkpointing=True)
    else:
        try:model.gradient_checkpointing_enable()
        except Exception:pass
    return model

def find_targets(model):
    wanted={'q_proj','k_proj','v_proj','o_proj','gate_proj','up_proj','down_proj'}; found=set()
    for name,module in model.named_modules():
        low=name.lower(); leaf=name.rsplit('.',1)[-1]
        if any(x in low for x in ('vision','audio','projector','multimodal')):continue
        if leaf in wanted and hasattr(module,'weight'):found.add(leaf)
    if not found: raise RuntimeError('Could not discover text projection modules for LoRA.')
    return sorted(found)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('model_key',choices=['granite','gemma','mistral'])
    ap.add_argument('--train',default=str(ROOT/'dataset'/'train.jsonl'));ap.add_argument('--val',default=str(ROOT/'dataset'/'val.jsonl'))
    ap.add_argument('--max-length',type=int,default=int(os.getenv('VQ_FT_MAX_LENGTH','512')));ap.add_argument('--epochs',type=float,default=float(os.getenv('VQ_FT_EPOCHS','2')))
    ap.add_argument('--lr',type=float,default=float(os.getenv('VQ_FT_LR','0.00015')));ap.add_argument('--rank',type=int,default=int(os.getenv('VQ_FT_LORA_R','16')))
    ap.add_argument('--alpha',type=int,default=int(os.getenv('VQ_FT_LORA_ALPHA','32')));ap.add_argument('--grad-accum',type=int,default=int(os.getenv('VQ_FT_GRAD_ACCUM','8')))
    ap.add_argument('--device',choices=['cuda','cpu','auto'],default=os.getenv('VQ_FT_DEVICE','auto'));args=ap.parse_args();set_seed(42206)
    p=profile(args.model_key);model_id=os.getenv('VQ_FT_MODEL_ID',p['hf_model_id']);out=ROOT/'output'/p['output_dir'];out.mkdir(parents=True,exist_ok=True)
    use_cuda=torch.cuda.is_available() and args.device!='cpu'
    if args.device=='cuda' and not torch.cuda.is_available():raise RuntimeError('CUDA requested but unavailable')
    free,total=gpu_free_gib();need=float(os.getenv('VQ_FT_MIN_FREE_VRAM_GIB',str(p['min_free_vram_gib'])))
    if use_cuda and free<need and os.getenv('VQ_FT_FORCE_LOW_VRAM','0')!='1':raise RuntimeError(f'Only {free:.2f} GiB GPU memory is free (total {total:.2f}). {p["label"]} QLoRA is blocked below {need:.1f} GiB to avoid disrupting shared GPU jobs.')
    print(f'[INFO] model_key={args.model_key} model={model_id} device={"cuda" if use_cuda else "cpu"} free_vram={free:.2f}/{total:.2f} GiB')
    tok=AutoTokenizer.from_pretrained(model_id,use_fast=True,trust_remote_code=True);tok.pad_token=tok.pad_token or tok.eos_token
    model=load_model(model_id,p['loader'],use_cuda);model.config.use_cache=False;targets=find_targets(model);print('[INFO] LoRA targets:',','.join(targets))
    lkw=dict(r=args.rank,lora_alpha=args.alpha,lora_dropout=.05,bias='none',target_modules=targets)
    if p['loader']=='causal':lkw['task_type']='CAUSAL_LM'
    lcfg=LoraConfig(**lkw);model=get_peft_model(model,lcfg);model.print_trainable_parameters()
    train_ds=JsonlChatDataset(args.train,tok,args.max_length);val_ds=JsonlChatDataset(args.val,tok,args.max_length)
    kw=dict(output_dir=str(out/'checkpoints'),per_device_train_batch_size=1,per_device_eval_batch_size=1,gradient_accumulation_steps=args.grad_accum,learning_rate=args.lr,num_train_epochs=args.epochs,warmup_ratio=.05,weight_decay=.01,lr_scheduler_type='cosine',logging_steps=5,save_strategy='epoch',save_total_limit=2,report_to='none',remove_unused_columns=False,gradient_checkpointing=True,dataloader_num_workers=0,seed=42206,data_seed=42206)
    sig=inspect.signature(TrainingArguments.__init__).parameters
    kw['eval_strategy' if 'eval_strategy' in sig else 'evaluation_strategy']='epoch'
    if use_cuda:
        kw['bf16' if torch.cuda.is_bf16_supported() else 'fp16']=True;kw['optim']='paged_adamw_8bit'
    else:kw['optim']='adamw_torch'
    trainer=Trainer(model=model,args=TrainingArguments(**kw),train_dataset=train_ds,eval_dataset=val_ds,data_collator=Collator(tok.pad_token_id))
    started=time.time();result=trainer.train();ev=trainer.evaluate();adapter=out/'adapter';model.save_pretrained(adapter,safe_serialization=True);tok.save_pretrained(adapter)
    metrics={'model_key':args.model_key,'model_id':model_id,'train_examples':len(train_ds),'validation_examples':len(val_ds),'epochs':args.epochs,'max_length':args.max_length,'lora_rank':args.rank,'lora_alpha':args.alpha,'targets':targets,'train_runtime_sec':round(time.time()-started,1),'train_metrics':result.metrics,'eval_metrics':ev}
    (out/'training_metrics.json').write_text(json.dumps(metrics,ensure_ascii=False,indent=2),encoding='utf-8');(out/'TRAINING_COMPLETE').write_text('ok\n',encoding='utf-8');print('[OK] adapter saved to',adapter)
if __name__=='__main__':main()
