#!/usr/bin/env python3
"""Check local HTML resources and avatar URL declarations without network calls."""
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "app/web"


class Resources(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        field = "href" if tag == "link" else "src"
        if tag in {"script", "link", "img", "audio", "source"} and attrs.get(field):
            self.urls.append(attrs[field])


def check_assets(web=WEB):
    web = web.resolve()
    checked = 0
    for page in ("index.html", "login/index.html", "kb/index.html", "reference/index.html"):
        parser = Resources()
        html = (web / page).read_text(encoding="utf-8")
        parser.feed(html)
        for url in parser.urls:
            parsed = urlsplit(url)
            if parsed.scheme or parsed.netloc or url.startswith("#"):
                continue
            resolved = urlsplit(urljoin("https://fixture/" + page, url)).path
            target = (web / unquote(resolved).lstrip("/")).resolve()
            if not target.is_relative_to(web) or not target.is_file():
                raise ValueError("Missing or invalid resource in {}: {}".format(page, url))
            checked += 1
    avatar = (web / "shared/js/avatar/avatar-controller.js").read_text(encoding="utf-8")
    required = (
        "https://cdn.jsdelivr.net/npm/@met4citizen/talkinghead@1.7.0/modules/talkinghead.mjs",
        "HeadAudio@main/avatars/david.glb",
        "HeadAudio@main/avatars/julia.glb",
    )
    if not all(url in avatar for url in required):
        raise ValueError("The shared avatar controller is missing a required URL declaration")
    for mode in ("kb", "reference"):
        html = (web / mode / "index.html").read_text(encoding="utf-8")
        if "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js" not in html:
            raise ValueError("Missing Three.js import-map declaration in " + mode)
    return checked


if __name__ == "__main__":
    try:
        print("PASS {} local web resources and avatar URL declarations; external availability was not checked".format(check_assets()))
    except (OSError, ValueError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
