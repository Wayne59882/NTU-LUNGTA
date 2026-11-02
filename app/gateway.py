#!/usr/bin/env python3
from __future__ import print_function
import argparse, json, os, sys, urllib.request, urllib.error
from http.server import SimpleHTTPRequestHandler
try:
    from http.server import ThreadingHTTPServer
except ImportError:
    from http.server import HTTPServer
    from socketserver import ThreadingMixIn
    class ThreadingHTTPServer(ThreadingMixIn,HTTPServer): daemon_threads=True
from pathlib import Path
from static_assets import SharedAssetsMixin
from urllib.parse import urlsplit, quote
ROOT=Path(__file__).resolve().parent; WEB=ROOT/'web'
sys.path.insert(0,str(ROOT))
import access_control as AUTH  # R12: sign-in, teacher/student roles, per-teacher courses
KB='http://127.0.0.1:'+os.environ.get('VQ_KB_INTERNAL_PORT','8181')
REF='http://127.0.0.1:'+os.environ.get('VQ_REFERENCE_INTERNAL_PORT','8182')
class H(SharedAssetsMixin, SimpleHTTPRequestHandler):
    def end_headers(self): self.send_header('Cache-Control','no-store'); super().end_headers()
    def _target(self):
        p=self.path
        if p.startswith('/api/kb/'): return KB+'/api/'+p[len('/api/kb/'):]
        if p=='/api/reference/tts': return KB+'/api/tts'
        if p.startswith('/api/reference/'): return REF+p
        return None
    def _send(self,status,ctype,data,extra=None):
        self.send_response(status);self.send_header('Content-Type',ctype);self.send_header('Content-Length',str(len(data)))
        for k,v in (extra or []):self.send_header(k,v)
        self.end_headers()
        try:self.wfile.write(data)
        except (BrokenPipeError,ConnectionResetError):pass
    def _json(self,status,payload):self._send(status,'application/json; charset=utf-8',json.dumps(payload,ensure_ascii=False).encode('utf-8'))
    def _proxy(self):
        target=self._target()
        if not target:return False
        parts=urlsplit(self.path);path=parts.path
        n=int(self.headers.get('Content-Length','0') or 0); body=self.rfile.read(n) if n else None
        user=None;ctx={}
        if path not in AUTH.PUBLIC_API:
            try:
                user=AUTH.user_from_request(self)
                if not user:self._json(401,{'ok':False,'code':'login_required','error':'Please sign in.','login':'/login/'});return True
                denial,ctx=AUTH.authorize(user,path,parts.query,body,self.headers.get('Content-Type',''))
            except Exception as e:
                self._json(503,{'ok':False,'error':'Account service unavailable.','detail':str(e)[:200]});return True
            if denial:self._json(denial['status'],denial['payload']);return True
        headers={k:v for k,v in self.headers.items() if k.lower() not in ('host','content-length','connection','cookie')}
        try:
            req=urllib.request.Request(target,data=body,headers=headers,method=self.command)
            with urllib.request.urlopen(req,timeout=300) as r:
                status=getattr(r,'status',200);ctype=r.headers.get('Content-Type','application/octet-stream')
                if path=='/api/reference/course-upload-source' and status==200 and ctype.split(';')[0]=='application/pdf':
                    self.send_response(status);self.send_header('Content-Type',ctype)
                    for header in ('Content-Length','Content-Disposition'):
                        if r.headers.get(header):self.send_header(header,r.headers[header])
                    self.end_headers()
                    try:
                        for block in iter(lambda:r.read(1024*1024),b''):self.wfile.write(block)
                    except (BrokenPipeError,ConnectionResetError):pass
                    return True
                data=r.read()
        except urllib.error.HTTPError as e:
            status=e.code;ctype=e.headers.get('Content-Type','application/json');data=e.read()
        except Exception as e:
            self._json(502,{'error':'Backend unavailable','detail':str(e)});return True
        if user:
            try:data=AUTH.after_response(user,ctx,status,data,ctype)
            except Exception as e:print('[AUTH] after_response failed: %r'%(e,),file=sys.stderr)
        self._send(status,ctype,data);return True
    def _page_allowed(self):
        path=urlsplit(self.path).path
        if path not in AUTH.GATED_PAGES:return True
        try:
            if AUTH.user_from_request(self):return True
        except Exception:pass
        nxt=self.path if path not in ('/','/index.html') else '/reference/'
        self.send_response(302);self.send_header('Location','/login/?next='+quote(nxt,safe=''));self.send_header('Content-Length','0');self.end_headers()
        return False
    def do_GET(self):
        path=urlsplit(self.path).path
        if path.startswith('/api/auth/'):return AUTH.handle(self,'GET',path,urlsplit(self.path).query)
        if self._proxy():return
        if self.path=='/api/ready':return self._json(200,{'ok':True,'content_integrity_revision':'R15','service':'Gateway'})
        if self.path=='/api/health':
            b=json.dumps({'ok':True,'build':'v241.12.5-full-answer-voice','serving_profile':'v241.12.5-full-answer-voice','auth':'r12-roles','modes':['query-knowledge-base','reference-textbook']}).encode();self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b);return
        if path.startswith('/api/'):return self._json(404,{'error':'Not found'})
        if not self._page_allowed():return
        if self.path=='/':self.path='/reference/'
        return super().do_GET()
    def do_HEAD(self):
        if urlsplit(self.path).path.startswith('/api/'):return self._json(405,{'error':'Method not allowed'})
        if not self._page_allowed():return
        return super().do_HEAD()
    def do_POST(self):
        path=urlsplit(self.path).path
        if path.startswith('/api/auth/'):return AUTH.handle(self,'POST',path,urlsplit(self.path).query)
        if self._proxy():return
        self.send_error(404)
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--host',default='0.0.0.0');ap.add_argument('--port',type=int,default=int(os.environ.get('VQ_PORT','8179')));args=ap.parse_args();AUTH.init();os.chdir(str(WEB));s=ThreadingHTTPServer((args.host,args.port),H);print('[OK] v206.7 gateway http://%s:%s (R12 accounts: admin %s)'%(args.host,args.port,AUTH.admin_email()));sys.stdout.flush();s.serve_forever()
if __name__=='__main__':main()
