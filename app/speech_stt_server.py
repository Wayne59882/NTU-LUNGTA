#!/usr/bin/env python3
from __future__ import print_function
import json, os, tempfile
from http.server import BaseHTTPRequestHandler, HTTPServer

HOST=os.environ.get('VQ_STT_HOST','127.0.0.1')
PORT=int(os.environ.get('VQ_STT_PORT','11437'))
MODEL_NAME=os.environ.get('VQ_STT_MODEL','large-v3-turbo')
BUILD='v210-stt-whisper-large-v3-turbo-shared-gpu-adaptive-1'
DEVICE_REQUEST=os.environ.get('VQ_STT_DEVICE','auto').strip().lower()
MIN_FREE_VRAM_MB=max(0,int(os.environ.get('VQ_STT_MIN_FREE_VRAM_MB','5500')))
def _free_vram_mb():
    try:
        import subprocess
        out=subprocess.check_output(['nvidia-smi','--query-gpu=memory.free','--format=csv,noheader,nounits'],stderr=subprocess.DEVNULL,text=True,timeout=3)
        vals=[int(x.strip()) for x in out.splitlines() if x.strip().isdigit()]
        return max(vals) if vals else 0
    except Exception:
        return 0
try:
    import ctranslate2
    _cuda_count=int(ctranslate2.get_cuda_device_count() or 0)
except Exception:
    _cuda_count=0
FREE_VRAM_MB=_free_vram_mb() if _cuda_count>0 else 0
if DEVICE_REQUEST=='auto':
    DEVICE='cuda' if (_cuda_count>0 and FREE_VRAM_MB>=MIN_FREE_VRAM_MB) else 'cpu'
else:
    DEVICE=DEVICE_REQUEST
COMPUTE=os.environ.get('VQ_STT_COMPUTE_TYPE','int8_float16' if DEVICE=='cuda' else 'int8')
BEAM_SIZE=max(1,int(os.environ.get('VQ_STT_BEAM_SIZE','3')))
print('Loading multilingual speech recognizer:', MODEL_NAME, 'device=', DEVICE, 'compute=', COMPUTE, 'requested=', DEVICE_REQUEST, 'free_vram_mb=', FREE_VRAM_MB, 'cuda_threshold_mb=', MIN_FREE_VRAM_MB)
from faster_whisper import WhisperModel
_model=WhisperModel(MODEL_NAME, device=DEVICE, compute_type=COMPUTE)
print('Multilingual STT ready on %s:%s' % (HOST,PORT))

def suffix_for(content_type):
    c=(content_type or '').lower()
    if 'webm' in c: return '.webm'
    if 'ogg' in c: return '.ogg'
    if 'mp4' in c or 'm4a' in c: return '.m4a'
    if 'mpeg' in c or 'mp3' in c: return '.mp3'
    return '.wav'

def normalize_language_hint(v):
    v=str(v or '').strip().lower().replace('_','-')
    if v.startswith(('zh','cmn')): return 'zh'
    if v.startswith('en'): return 'en'
    if v.startswith('ja'): return 'ja'
    if v.startswith('ko'): return 'ko'
    if v.startswith('es'): return 'es'
    if v.startswith('fr'): return 'fr'
    if v.startswith('de'): return 'de'
    if v.startswith('it'): return 'it'
    if v.startswith('pt'): return 'pt'
    return ''

def public_language_tag(lang):
    l=str(lang or '').lower()
    if l=='zh': return 'zh-TW'
    if l=='en': return 'en-US'
    return l

def cjk_ratio(text):
    t=str(text or '')
    if not t: return 0.0
    useful=[ch for ch in t if not ch.isspace()]
    if not useful: return 0.0
    return sum(1 for ch in useful if '\u3400' <= ch <= '\u9fff')/float(len(useful))

def decode_file(inp, language=None):
    kwargs=dict(language=language, beam_size=BEAM_SIZE, vad_filter=True, condition_on_previous_text=False)
    if language=='zh':
        kwargs['initial_prompt']='繁體中文。呼吸生理、通氣、灌流、肺尖、肺底、V/Q、PaO2、PaCO2、FiO2、氧合、肺泡、血流。'
    segs,info=_model.transcribe(inp, **kwargs)
    segs=list(segs)
    text=' '.join((s.text or '').strip() for s in segs if (s.text or '').strip()).strip()
    logs=[float(getattr(s,'avg_logprob',-10.0) or -10.0) for s in segs]
    nos=[float(getattr(s,'no_speech_prob',0.0) or 0.0) for s in segs]
    avg_logprob=(sum(logs)/len(logs)) if logs else -10.0
    no_speech=(sum(nos)/len(nos)) if nos else 1.0
    score=avg_logprob-(0.35*no_speech)
    return {
        'text':text,
        'language':str(getattr(info,'language','') or language or ''),
        'probability':float(getattr(info,'language_probability',0.0) or 0.0),
        'score':score,
        'avg_logprob':avg_logprob,
        'no_speech_prob':no_speech,
    }

def transcribe(raw, content_type, language_hint=''):
    fd, inp=tempfile.mkstemp(prefix='vq_stt_',suffix=suffix_for(content_type)); os.close(fd)
    try:
        with open(inp,'wb') as f: f.write(raw)
        auto=decode_file(inp, None)
        chosen=auto
        hint=normalize_language_hint(language_hint)
        retry_used=False

        # Browser/UI language is only a soft prior. If Whisper's automatic result
        # disagrees with a Chinese prior, make one forced-Chinese comparison and
        # keep whichever acoustic decoding is better. This prevents short Mandarin
        # questions from turning into plausible-looking English gibberish while
        # preserving automatic multilingual recognition for clear speech.
        auto_lang=str(auto.get('language') or '').lower()
        if hint=='zh' and auto_lang!='zh':
            forced=decode_file(inp, 'zh')
            retry_used=True
            # Prefer the Chinese candidate when its acoustic score is comparable
            # or better. A clearly worse forced decode is rejected.
            if forced['text'] and (forced['score'] >= auto['score']-0.08 or auto['probability'] < 0.72):
                chosen=forced
        elif auto_lang=='en' and (auto['probability'] < 0.98 or auto['avg_logprob'] < -0.45):
            # Auto-detect may occasionally label Mandarin as English, especially for
            # short medical questions containing abbreviations such as V/Q. Compare
            # a Mandarin decode whenever English confidence/decoding quality is not
            # exceptionally strong. Keep genuine English unless the Chinese decode is
            # acoustically comparable and actually contains substantial CJK text.
            forced=decode_file(inp, 'zh')
            retry_used=True
            if forced['text'] and cjk_ratio(forced['text']) >= 0.25 and forced['score'] >= auto['score']-0.03:
                chosen=forced
        elif hint and auto_lang!=hint and auto['probability'] < 0.55:
            forced=decode_file(inp, hint)
            retry_used=True
            if forced['text'] and forced['score'] >= auto['score']-0.03:
                chosen=forced

        return {
            'text':chosen['text'],
            'language':public_language_tag(chosen['language']),
            'language_probability':chosen['probability'],
            'auto_language':public_language_tag(auto['language']),
            'auto_language_probability':auto['probability'],
            'language_hint':public_language_tag(hint),
            'language_retry_used':retry_used,
        }
    finally:
        try: os.remove(inp)
        except Exception: pass

class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args): return
    def send_json(self,code,obj):
        body=json.dumps(obj,ensure_ascii=False).encode('utf-8'); self.send_response(code); self.send_header('Content-Type','application/json; charset=utf-8'); self.send_header('Content-Length',str(len(body))); self.end_headers(); self.wfile.write(body)
    def do_GET(self):
        if self.path=='/health': self.send_json(200,{'ok':True,'build':BUILD,'model':MODEL_NAME,'device':DEVICE,'compute_type':COMPUTE,'beam_size':BEAM_SIZE}); return
        self.send_json(404,{'error':'not found'})
    def do_POST(self):
        if self.path!='/stt': self.send_json(404,{'error':'not found'}); return
        try:
            n=int(self.headers.get('Content-Length','0') or '0')
            if n<=0 or n>25*1024*1024: self.send_json(400,{'error':'invalid audio size'}); return
            raw=self.rfile.read(n)
            result=transcribe(raw,self.headers.get('Content-Type','audio/webm'),self.headers.get('X-VQ-Language-Hint',''))
            self.send_json(200,result)
        except Exception as exc: self.send_json(500,{'error':str(exc)})

if __name__=='__main__': HTTPServer((HOST,PORT),Handler).serve_forever()
