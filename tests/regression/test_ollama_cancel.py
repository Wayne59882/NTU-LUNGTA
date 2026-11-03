"""Offline cancellation integration: real HTTP streams and cross-thread model lock."""
import json
import socket
import sys
import tempfile
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "app"))
from ollama_cancel import CancellationScope, AnswerCancelled, stream_chat_json
from model_lock import SharedModelLock


class FakeOllama(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", "0"))).decode())
        assert body["stream"] is True
        self.send_response(200)
        self.send_header("Content-Type", "application/x-ndjson")
        self.end_headers()
        try:
            parts = ["hello", " world"] if self.path == "/complete" else ["first"] * 200
            for index, part in enumerate(parts):
                chunk = {"message": {"role": "assistant", "content": part},
                         "done": index == len(parts) - 1}
                self.wfile.write((json.dumps(chunk) + "\n").encode())
                self.wfile.flush()
                if index == 0:
                    self.server.first_chunk.set()
                time.sleep(0.025)
        except (BrokenPipeError, ConnectionResetError, OSError):
            pass


def main():
    srv = ThreadingHTTPServer(("127.0.0.1", 0), FakeOllama)
    srv.first_chunk = threading.Event()
    thread = threading.Thread(target=srv.serve_forever, daemon=True)
    thread.start()
    try:
        url = "http://127.0.0.1:%d" % srv.server_port
        payload = {"model": "fake", "messages": [{"role": "user", "content": "demo"}],
                   "stream": False}
        with CancellationScope():
            result = stream_chat_json(url + "/complete", payload, 5)
        assert result["message"]["content"] == "hello world"
        assert result["done"] is True

        srv.first_chunk.clear()
        scope = CancellationScope()
        finished = threading.Event()
        status = {}
        def run():
            try:
                with scope:
                    stream_chat_json(url + "/long", payload, 5)
                status["result"] = "not-cancelled"
            except AnswerCancelled:
                status["result"] = "cancelled"
            except Exception as exc:
                status["result"] = "unexpected: " + repr(exc)
            finally:
                finished.set()
        worker = threading.Thread(target=run, daemon=True)
        worker.start()
        assert srv.first_chunk.wait(3), "Mock Ollama never began generation"
        scope.cancel()
        assert finished.wait(3), "Cancelled stream continued consuming its worker"
        assert status["result"] == "cancelled", status
        assert scope.cancelled.is_set()

        with tempfile.TemporaryDirectory() as tmp:
            lock = SharedModelLock(str(Path(tmp) / "model.lock"))
            held = threading.Event()
            scope2 = CancellationScope()
            state = []
            def waiting():
                try:
                    with scope2:
                        with lock:
                            state.append("acquired")
                except AnswerCancelled:
                    state.append("cancelled")
                finally:
                    held.set()
            with lock:
                waiting_thread = threading.Thread(target=waiting, daemon=True)
                waiting_thread.start()
                time.sleep(0.10)
                scope2.cancel()
            assert held.wait(2), "Cancellation could not interrupt waiting for the lock"
            assert state == ["cancelled"], state
            with lock:
                pass
        print("[OK] cancellable Ollama NDJSON streaming, socket interruption, and model-lock cleanup")
    finally:
        srv.shutdown()
        srv.server_close()
        thread.join(timeout=3)


if __name__ == "__main__":
    main()
