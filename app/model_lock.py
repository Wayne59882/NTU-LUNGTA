"""Shared answer/vision-model lock for KB and uploaded courses (Python 3.6)."""
import os
import threading
import time
from ollama_cancel import current_scope
try:
    import fcntl
except ImportError:
    fcntl=None


class SharedModelLock:
    def __init__(self,path=None):
        self.path=path or os.environ.get('VQ_SHARED_MODEL_LOCK','/tmp/vq_ollama_answer.lock')
        self.thread_lock=threading.Lock();self.fp=None

    def __enter__(self):
        scope=current_scope()
        if scope is None:
            self.thread_lock.acquire()
        else:
            while not self.thread_lock.acquire(timeout=0.05):
                scope.check()
            scope.check()
        try:
            self.fp=open(self.path,'a+')
            if fcntl is not None:
                if scope is None:
                    fcntl.flock(self.fp.fileno(),fcntl.LOCK_EX)
                else:
                    while True:
                        scope.check()
                        try:
                            fcntl.flock(self.fp.fileno(),fcntl.LOCK_EX | fcntl.LOCK_NB)
                            break
                        except BlockingIOError:
                            time.sleep(0.05)
        except Exception:
            if self.fp:self.fp.close()
            self.fp=None;self.thread_lock.release();raise
        return self

    def __exit__(self,*args):
        try:
            if self.fp is not None:
                if fcntl is not None:fcntl.flock(self.fp.fileno(),fcntl.LOCK_UN)
                self.fp.close()
        finally:self.fp=None;self.thread_lock.release()
