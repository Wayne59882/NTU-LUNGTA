#!/usr/bin/env python3
from __future__ import print_function
import json, os, tempfile, subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer

HOST=os.environ.get('VQ_TEACHER_TTS_HOST','127.0.0.1')
PORT=int(os.environ.get('VQ_TEACHER_TTS_PORT','11436'))
MODEL_NAME=os.environ.get('VQ_TEACHER_TTS_MODEL','tts_models/multilingual/multi-dataset/xtts_v2')
REFERENCE=os.environ.get('VQ_TEACHER_VOICE_REFERENCE', os.path.join(os.path.dirname(__file__),'web','assets','voice','teacher_voice_reference.wav'))
DEVICE_REQUEST=os.environ.get('VQ_TEACHER_TTS_DEVICE','auto').lower()
if not os.path.isfile(REFERENCE) or os.path.getsize(REFERENCE) < 1024:
    raise RuntimeError('Teacher reference voice is missing or empty: %s' % REFERENCE)
try:
    import torch
    DEVICE=('cuda' if DEVICE_REQUEST in ('auto','cuda') and torch.cuda.is_available() else 'cpu')
except Exception:
    DEVICE='cpu'
SUPPORTED={'en','es','fr','de','it','pt','pl','tr','ru','nl','cs','ar','zh-cn','ja','hu','ko','hi'}

def map_language(v):
    v=str(v or 'en').lower().replace('_','-')
    if v.startswith(('zh','cmn','yue')): return 'zh-cn'
    aliases={'en':'en','es':'es','fr':'fr','de':'de','it':'it','pt':'pt','pl':'pl','tr':'tr','ru':'ru','nl':'nl','cs':'cs','ar':'ar','ja':'ja','ko':'ko','hu':'hu','hi':'hi'}
    base=v.split('-')[0]
    return aliases.get(base, base)

print('Loading teacher voice cloning model:', MODEL_NAME)
from TTS.api import TTS
_tts=TTS(MODEL_NAME).to(DEVICE)
print('Teacher voice TTS ready on %s:%s; device=%s; reference=%s' % (HOST,PORT,DEVICE,REFERENCE))


def normalize_medical_speech(text, language):
    """Convert respiratory abbreviations into stable spoken forms for XTTS.
    Display text is untouched; only synthesized speech is normalized."""
    import re
    t=str(text or '')
    replacements=[
        (r'\bPaCO2\b','P a C O two'),
        (r'\bPACO2\b','P A C O two'),
        (r'\bPaO2\b','P a O two'),
        (r'\bPAO2\b','P A O two'),
        (r'\bPvO2\b','P v O two'),
        (r'\bCaO2\b','C a O two'),
        (r'\bSaO2\b','S a O two'),
        (r'\bSvO2\b','S v O two'),
        (r'\bSpO2\b','S p O two'),
        (r'\bFiO2\b','F I O two'),
        (r'\bFIO2\b','F I O two'),
        (r'\bQs/Q[tT]\b','Q S over Q T'),
        (r'\bV/Q\b','V Q'),
        (r'V\s*[•·]?\s*A?\s*/\s*Q\s*[•·]?','V Q'),
        (r'\bA-a gradient\b','A a gradient'),
    ]
    for pat,rep in replacements:
        t=re.sub(pat,rep,t)
    is_zh=str(language or '').lower().startswith(('zh','cmn')) or bool(re.search(r'[\u3400-\u9fff]',t))
    decimal_word=' 點 ' if is_zh else ' point '
    t=re.sub(r'(?<![\w.])(\d+)\.(\d+)(?![\w.])',lambda m:m.group(1)+decimal_word+' '.join(m.group(2)),t)
    return t

def render(text, language, rate):
    lang=map_language(language)
    if lang not in SUPPORTED:
        raise ValueError('Teacher reference voice does not support XTTS language: %s' % language)
    fd, raw=tempfile.mkstemp(prefix='vq_teacher_',suffix='.wav'); os.close(fd)
    fd, out=tempfile.mkstemp(prefix='vq_teacher_rate_',suffix='.wav'); os.close(fd)
    try:
        spoken_text=normalize_medical_speech(text, lang)
        _tts.tts_to_file(text=spoken_text, speaker_wav=REFERENCE, language=lang, file_path=raw)
        rate=max(0.8,min(1.2,float(rate or 1.0)))
        path=raw
        if abs(rate-1.0)>0.01:
            try:
                subprocess.check_call(['ffmpeg','-loglevel','error','-y','-i',raw,'-filter:a','atempo=%.4f'%rate,out])
                path=out
            except Exception: path=raw
        with open(path,'rb') as f: return f.read(),lang
    finally:
        for p in (raw,out):
            try: os.remove(p)
            except Exception: pass

class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args): return
    def send_json(self, code, obj):
        raw=json.dumps(obj).encode('utf-8'); self.send_response(code); self.send_header('Content-Type','application/json'); self.send_header('Content-Length',str(len(raw))); self.end_headers(); self.wfile.write(raw)
    def do_GET(self):
        if self.path=='/health': self.send_json(200, {'ok':True,'model':MODEL_NAME,'device':DEVICE,'device_requested':DEVICE_REQUEST,'reference':os.path.realpath(REFERENCE),'reference_bytes':os.path.getsize(REFERENCE),'supported_languages':sorted(SUPPORTED)}); return
        self.send_json(404, {'error':'not found'})
    def do_POST(self):
        if self.path!='/tts': self.send_json(404, {'error':'not found'}); return
        try:
            n=int(self.headers.get('Content-Length','0') or '0'); req=json.loads(self.rfile.read(n).decode('utf-8'))
            text=str(req.get('text','')).strip()
            if not text: self.send_json(400, {'error':'empty text'}); return
            audio,lang=render(text, req.get('language','en-US'), req.get('rate',1.0))
            self.send_response(200); self.send_header('Content-Type','audio/wav'); self.send_header('X-VQ-Teacher-Language',lang); self.send_header('Content-Length',str(len(audio))); self.end_headers(); self.wfile.write(audio)
        except ValueError as exc: self.send_json(400, {'error':str(exc)})
        except Exception as exc: self.send_json(500, {'error':str(exc)})

if __name__=='__main__': HTTPServer((HOST,PORT),Handler).serve_forever()
