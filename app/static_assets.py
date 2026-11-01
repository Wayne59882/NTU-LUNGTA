"""Serve the canonical shared browser assets through each Python entry point."""
from pathlib import Path
from urllib.parse import unquote, urlsplit

SHARED_ROOT = Path(__file__).resolve().parent / 'web' / 'shared'


class SharedAssetsMixin:
    def translate_path(self, path):
        url_path = unquote(urlsplit(path).path)
        if url_path.startswith('/shared/'):
            root = SHARED_ROOT.resolve()
            target = (root / url_path[len('/shared/'):]).resolve()
            try:
                target.relative_to(root)
            except ValueError:
                return str(root / '__invalid_shared_asset__')
            return str(target)
        return super(SharedAssetsMixin, self).translate_path(path)
