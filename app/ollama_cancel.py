"""Cooperative cancellation for per-question Ollama /api/chat streams.

Only Q&A workers enter a CancellationScope. Lecture, indexing and PDF jobs keep
their existing nonstreaming behavior. A cancelled stream closes its own socket,
never the shared Ollama process or another user's connection.
"""
import json
import socket
import threading
import urllib.request


class AnswerCancelled(Exception):
    """The requesting student superseded this answer."""


_LOCAL = threading.local()


def current_scope():
    return getattr(_LOCAL, 'scope', None)


class CancellationScope:
    def __init__(self):
        self.cancelled = threading.Event()
        self._lock = threading.Lock()
        self._socket = None
        self._previous = None

    def __enter__(self):
        self._previous = current_scope()
        _LOCAL.scope = self
        self.check()
        return self

    def __exit__(self, *args):
        _LOCAL.scope = self._previous

    def check(self):
        if self.cancelled.is_set():
            raise AnswerCancelled('Answer cancelled after model switch')

    def attach(self, response):
        # urllib -> http.client.HTTPResponse -> socket.SocketIO -> socket.
        try:
            sock = response.fp.raw._sock
        except (AttributeError, TypeError):
            sock = None
        with self._lock:
            self._socket = sock
            cancelled = self.cancelled.is_set()
        if cancelled:
            if sock is not None:
                self._interrupt(sock)
            self.check()

    def detach(self):
        with self._lock:
            self._socket = None

    @staticmethod
    def _interrupt(sock):
        try:
            sock.shutdown(socket.SHUT_RDWR)
        except (OSError, AttributeError):
            pass

    def cancel(self):
        self.cancelled.set()
        with self._lock:
            sock = self._socket
        if sock is not None:
            self._interrupt(sock)


def stream_chat_json(url, payload, timeout):
    """Combine Ollama NDJSON into its normal nonstreaming response shape."""
    scope = current_scope()
    if scope is None:
        raise RuntimeError('Streaming Q&A requires a cancellation scope')
    scope.check()
    stream_payload = dict(payload, stream=True)
    req = urllib.request.Request(
        url,
        data=json.dumps(stream_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST',
    )
    chunks = []
    last = None
    try:
        with urllib.request.urlopen(req, timeout=float(timeout)) as response:
            scope.attach(response)
            for line in response:
                scope.check()
                if not line.strip():
                    continue
                piece = json.loads(line.decode('utf-8'))
                if piece.get('error'):
                    raise RuntimeError(str(piece['error']))
                message = piece.get('message') or {}
                if isinstance(message.get('content'), str):
                    chunks.append(message['content'])
                last = piece
                if piece.get('done'):
                    break
            scope.check()
        if last is None or last.get('done') is not True:
            raise RuntimeError('Ollama stream ended before completion')
        result = dict(last)
        message = dict(result.get('message') or {})
        message['content'] = ''.join(chunks)
        result['message'] = message
        return result
    except Exception as exc:
        if scope.cancelled.is_set():
            raise AnswerCancelled('Answer cancelled after model switch') from exc
        raise
    finally:
        scope.detach()
