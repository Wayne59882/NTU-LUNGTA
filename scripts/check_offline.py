#!/usr/bin/env python3
"""Run existing fixture checks without models, private corpora or API keys."""
import argparse
import ast
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED"
SKIP = {".git", ".venv", "node_modules", "__pycache__", "course_workspaces",
        "auth", "logs", ".wrangler"}


def source_files():
    for current, dirs, names in os.walk(ROOT):
        dirs[:] = sorted(d for d in dirs if d not in SKIP)
        for name in sorted(names):
            yield Path(current) / name


def validate_sources(node):
    counts = {"python": 0, "javascript": 0}
    for path in source_files():
        if path.suffix == ".py":
            ast.parse(path.read_text(encoding="utf-8-sig"), filename=str(path))
            counts["python"] += 1
        elif path.suffix in (".js", ".cjs"):
            subprocess.run([node, "--check", str(path)], check=True,
                           capture_output=True, text=True, timeout=30)
            counts["javascript"] += 1
    print("PASS syntax: {python} Python / {javascript} JavaScript files".format(**counts), flush=True)
    return counts


def validate_document_links():
    # Check the maintained documentation only; legacy release notes contain
    # historical machine paths and are intentionally outside this check.
    paths = [ROOT / name for name in ("README.md", "CHANGELOG.md", "CONTRIBUTING.md")]
    paths += sorted((ROOT / "docs").glob("*.md"))
    paths += [APP / "README.md", APP / "reference_corpus/README.md",
              APP / "research/three_model_10q/SOURCE_AUDIT_10Q.md"]
    checked = 0
    for path in paths:
        body = path.read_text(encoding="utf-8")
        for target in re.findall(r"\]\(([^)\s]+)\)", body):
            if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", target) or target.startswith("#"):
                continue
            destination = (path.parent / target.split("#", 1)[0]).resolve()
            if not destination.is_relative_to(ROOT) or not destination.exists():
                raise ValueError("Broken link in {}: {}".format(path.relative_to(ROOT), target))
            checked += 1
    print("PASS documentation: {} local links".format(checked), flush=True)
    return checked


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path, help="Write an optional JSON result after success")
    args = parser.parse_args()
    node = shutil.which("node")
    if not node:
        parser.error("Node.js 22 or 24 is required")
    node_version = subprocess.check_output([node, "--version"], text=True).strip()
    if int(node_version.lstrip("v").split(".")[0]) < 22:
        parser.error("Node.js 22 or newer is required")
    print("Environment: Python {} / Node {}".format(sys.version.split()[0], node_version), flush=True)
    syntax = validate_sources(node)
    links = validate_document_links()
    suites = [
        ("V/Q numerical constraints", [node, "VERIFY_VQ_CONSERVATION.cjs"]),
        ("Quiz navigation", [node, "VERIFY_V241_12_1_QUIZ_NAV.cjs"]),
        ("Batch recovery fixtures", [node, "VERIFY_V241_12_4_BATCH.cjs"]),
        ("Speech pronunciation fixtures", [node, "VERIFY_V241_12_5_VOICE.cjs"]),
        ("Manual stop: reference", [node, str(ROOT / "VERIFY_VOICE_MANUAL_STOP.cjs"),
                                   "web/reference/js/25_v105_resume_after_question_mouth_sync.js"]),
        ("Manual stop: knowledge base", [node, str(ROOT / "VERIFY_VOICE_MANUAL_STOP.cjs"),
                                        "web/kb/js/25_v105_resume_after_question_mouth_sync.js"]),
        ("Question-generation fixtures", [sys.executable, "VERIFY_V241_12_1_QUIZ_QUALITY.py"]),
        ("Pilot dataset self-test", [sys.executable,
                                    "research/three_model_10q/benchmark_3models.py", "--self-test"]),
    ]
    results = []
    for name, command in suites:
        result = subprocess.run(command, cwd=APP, text=True, capture_output=True, timeout=120)
        if result.returncode:
            print(result.stdout, end="")
            print(result.stderr, end="", file=sys.stderr)
            raise RuntimeError("FAILED: " + name)
        output = result.stdout.strip().splitlines()
        print("PASS {}: {}".format(name, output[-1] if output else "completed"), flush=True)
        results.append({"name": name, "status": "passed", "output": result.stdout.strip()})
    report = {"scope": "offline fixtures and syntax only", "python": sys.version.split()[0],
              "node": node_version, "syntax": syntax, "local_links": links, "suites": results,
              "not_tested": ["real model accuracy or latency", "GPU or private textbook retrieval",
                             "real device audio", "R12 account isolation", "public deployment",
                             "learning outcomes", "GitHub-hosted workflow execution"]}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("PASS: {} existing offline suites; no live-model performance was measured.".format(len(results)))


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        print(error.stderr or str(error), file=sys.stderr)
        sys.exit(1)
    except (OSError, SyntaxError, RuntimeError, ValueError, subprocess.TimeoutExpired) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
