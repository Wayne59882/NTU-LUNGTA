"""Protect script order/content and serve the reorganized assets over local HTTP."""
import functools
import hashlib
from http.client import HTTPConnection
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import re
import sys
import tempfile
import threading
from urllib.parse import urljoin, urlsplit, unquote
import os

ROOT = Path(__file__).resolve().parents[2]
APP = ROOT / 'app'
WEB = APP / 'web'
sys.path.insert(0, str(APP))
from static_assets import SharedAssetsMixin


def asset(url, mode):
    resolved = urlsplit(urljoin('http://fixture/' + mode + '/', url))
    path = (WEB / unquote(resolved.path).lstrip('/')).resolve()
    path.relative_to(WEB.resolve())
    assert path.is_file(), (mode, url)
    return path, resolved.path + ('?' + resolved.query if resolved.query else '')


class QuietHandler(SharedAssetsMixin, SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


def request(server, url):
    connection = HTTPConnection('127.0.0.1', server.server_port, timeout=5)
    connection.request('GET', url)
    response = connection.getresponse()
    status, headers, data = response.status, dict(response.getheaders()), response.read()
    connection.close()
    return status, headers, data


def check_server(handler, urls, mode):
    server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        for path, url in urls:
            direct_url = url[len(mode) + 1:] if url.startswith('/' + mode + '/') else url
            status, _, data = request(server, direct_url)
            assert status == 200 and data == path.read_bytes(), url
        assert request(server, '/shared/%2e%2e/gateway.py')[0] == 404
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def main():
    contract = json.loads((ROOT / 'tests/fixtures/frontend_contract.json').read_text(encoding='utf-8'))
    all_urls = {}
    for mode, expected in contract['pages'].items():
        html = (WEB / mode / 'index.html').read_text(encoding='utf-8')
        scripts = re.findall(r'<script\b[^>]*\bsrc="([^"]+)"', html, re.I)
        assert len(scripts) == len(expected), mode
        urls = []
        for src, previous in zip(scripts, expected):
            path, url = asset(src, mode)
            assert path == (WEB / previous['new']).resolve(), (mode, src)
            assert urlsplit(url).query == previous['query'], (mode, src)
            # Hashes record the approved R14 runtime; behavior changes have dedicated regression tests.
            normalized = path.read_text(encoding='utf-8').replace('/shared/assets/', 'assets/').encode()
            assert hashlib.sha256(normalized).hexdigest() == previous['sha256'], (mode, src)
            urls.append((path, url))
        for src in re.findall(r'<link\b[^>]*\bhref="([^"]+)"|<(?:img|audio|source)\b[^>]*\bsrc="([^"]+)"', html, re.I):
            url = next(value for value in src if value)
            if url.startswith(('http:', 'https:', 'data:')):
                continue
            urls.append(asset(url, mode))
        check_server(functools.partial(QuietHandler, directory=str(WEB / mode)), urls, mode)
        all_urls.update({url: path for path, url in urls})
    # Use the actual gateway class to confirm the public route and anonymous
    # page redirect remain intact after importing the shared-asset mixin.
    with tempfile.TemporaryDirectory() as tmp:
        os.environ['VQ_AUTH_DB'] = str(Path(tmp) / 'auth.sqlite3')
        import gateway
        class QuietGateway(gateway.H):
            def log_message(self, *_):
                pass
        server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietGateway, directory=str(WEB)))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            for url, path in all_urls.items():
                status, _, data = request(server, url)
                assert status == 200 and data == path.read_bytes(), url
            assert json.loads(request(server, '/api/health')[2])['ok']
            for url in ['/', '/reference/', '/kb/']:
                status, headers, _ = request(server, url)
                assert status == 302 and headers['Location'].startswith('/login/'), url
        finally:
            server.shutdown(); server.server_close(); thread.join(timeout=5)
    print('PASS approved script order/content, both page asset sets, direct shared routes, gateway health and anonymous redirects')


if __name__ == '__main__':
    main()
