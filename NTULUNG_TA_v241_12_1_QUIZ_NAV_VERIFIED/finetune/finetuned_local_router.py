#!/usr/bin/env python3
import os,json,time,threading,argparse,gc
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
import torch
from transformers import AutoTokenizer,AutoModelForCausalLM,BitsAndBytesConfig
try:
    from transformers import AutoModelForMultimodalLM
except Exception: AutoModelForMultimodalLM=None
try:
    from transformers import AutoModelForImageTextToText
except Exception: AutoModelForImageTextToText=None
from peft import PeftModel
from model_profiles import PROFILES,profile,adapter_dir

LOCK=threading.Lock();STATE={'key':None,'model':None,'tokenizer':None,'device':None}

def available():return {k:p for k,p in PROFILES.items() if (adapter_dir(k)/'adapter_config.json').exists()}
def key_from_tag(tag):
    t=str(tag or '')
    for k,p in PROFILES.items():
        if t in (p['runtime_tag'],k):return k
    return None

def unload():
    STATE.update(key=None,model=None,tokenizer=None,device=None);gc.collect()
    if torch.cuda.is_available():torch.cuda.empty_cache()

def base_loader(p,model_id,mode):
    common={'low_cpu_mem_usage':True,'trust_remote_code':True}
    if mode=='cuda':
        dtype=torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16
        common.update(quantization_config=BitsAndBytesConfig(load_in_4bit=True,bnb_4bit_quant_type='nf4',bnb_4bit_use_double_quant=True,bnb_4bit_compute_dtype=dtype),device_map={'':0},torch_dtype=dtype)
    else:common.update(torch_dtype=torch.float32)
    if p['loader']=='causal':cls=AutoModelForCausalLM
    else:
        cls=AutoModelForMultimodalLM or AutoModelForImageTextToText
        if cls is None:raise RuntimeError('Transformers multimodal loader unavailable')
    return cls.from_pretrained(model_id,**common)

def load(key):
    if STATE['key']==key and STATE['model'] is not None:return
    p=profile(key);ad=adapter_dir(key)
    if not (ad/'adapter_config.json').exists():raise RuntimeError(f'Fine-tuned adapter not found for {key}: {ad}')
    unload();mode=os.getenv('VQ_FT_SERVE_DEVICE','cuda' if torch.cuda.is_available() else 'cpu').lower()
    if mode=='cuda' and not torch.cuda.is_available():mode='cpu'
    if mode=='cuda':
        free,_=torch.cuda.mem_get_info();need=float(os.getenv('VQ_FT_MIN_SERVE_VRAM_GIB',str(p['min_free_vram_gib'])))
        if free/(1024**3)<need and os.getenv('VQ_FT_FORCE_LOW_VRAM','0')!='1':raise RuntimeError(f'Not enough free GPU memory to load {p["label"]} fine-tuned adapter.')
    model_id=os.getenv('VQ_FT_'+key.upper()+'_MODEL_ID',p['hf_model_id'])
    tok=AutoTokenizer.from_pretrained(str(ad),use_fast=True,trust_remote_code=True);tok.pad_token=tok.pad_token or tok.eos_token
    base=base_loader(p,model_id,mode);model=PeftModel.from_pretrained(base,str(ad),is_trainable=False);model.eval();model.config.use_cache=True
    STATE.update(key=key,model=model,tokenizer=tok,device=mode,loaded_at=time.time())

def chat_text(messages):
    tok=STATE['tokenizer']
    try:return tok.apply_chat_template(messages,tokenize=False,add_generation_prompt=True,enable_thinking=False)
    except TypeError:return tok.apply_chat_template(messages,tokenize=False,add_generation_prompt=True)

def generate(messages,opts):
    tok=STATE['tokenizer'];model=STATE['model'];prompt=chat_text(messages);inputs=tok(prompt,return_tensors='pt');dev=next(model.parameters()).device;inputs={k:v.to(dev) for k,v in inputs.items()}
    temp=float(opts.get('temperature',.05) or 0);kw={'max_new_tokens':max(1,min(int(opts.get('num_predict',320) or 320),640)),'repetition_penalty':float(opts.get('repeat_penalty',1.02) or 1.02),'pad_token_id':tok.pad_token_id,'eos_token_id':tok.eos_token_id}
    if temp>.001:kw.update(do_sample=True,temperature=temp,top_p=float(opts.get('top_p',.8) or .8))
    else:kw.update(do_sample=False)
    t=time.time()
    with torch.inference_mode():out=model.generate(**inputs,**kw)
    gen=out[0,inputs['input_ids'].shape[1]:];return tok.decode(gen,skip_special_tokens=True).strip(),time.time()-t,int(gen.numel())

class H(BaseHTTPRequestHandler):
    def log_message(self,fmt,*args):
        if self.path.startswith('/api/'):super().log_message(fmt,*args)
    def js(self,status,obj):
        b=json.dumps(obj,ensure_ascii=False).encode();self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
    def body(self):
        n=int(self.headers.get('Content-Length','0') or 0);return json.loads(self.rfile.read(n).decode()) if n else {}
    def do_GET(self):
        if self.path in ('/health','/api/health'):self.js(200,{'ok':True,'service':'NTU-LUNGTA fine-tuned local-model router','available_models':list(available()),'active_model':STATE.get('key'),'device':STATE.get('device')});return
        if self.path=='/api/tags':self.js(200,{'models':[{'name':p['runtime_tag'],'model':p['runtime_tag']} for p in available().values()]});return
        self.js(404,{'error':'not found'})
    def do_POST(self):
        try:req=self.body()
        except Exception as e:self.js(400,{'error':str(e)});return
        if self.path not in ('/api/chat','/api/generate'):self.js(404,{'error':'not found'});return
        key=key_from_tag(req.get('model'))
        if not key:self.js(404,{'error':'unknown fine-tuned model tag'});return
        if self.path=='/api/chat':msgs=req.get('messages') or []
        else:msgs=[{'role':'user','content':str(req.get('prompt',''))}]
        try:
            with LOCK:load(key);text,sec,count=generate(msgs,req.get('options') or {})
            self.js(200,{'model':profile(key)['runtime_tag'],'message':{'role':'assistant','content':text},'response':text,'done':True,'eval_count':count,'eval_duration':int(sec*1e9),'total_duration':int(sec*1e9)})
        except Exception as e:self.js(500,{'error':str(e)})

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--host',default='127.0.0.1');ap.add_argument('--port',type=int,default=11439);a=ap.parse_args();ThreadingHTTPServer((a.host,a.port),H).serve_forever()
if __name__=='__main__':main()
