"""Exercise the real moved launchers with stand-in commands in an isolated tree."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[2]


def executable(path, body):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body, encoding="utf-8")
    path.chmod(0o755)


def main():
    bash = shutil.which("bash")
    if not bash or os.name != "posix":
        print("SKIP operator scripts: a POSIX environment with Bash is required")
        return
    shell_files = list((ROOT / "scripts").rglob("*.sh"))
    shell_files += list((ROOT / "app/feedback").glob("*.sh"))
    shell_files += list((ROOT / "app/finetune").glob("*.sh"))
    for path in shell_files:
        subprocess.run([bash, "-n", str(path)], check=True, capture_output=True, text=True)

    with tempfile.TemporaryDirectory() as temporary:
        sandbox = Path(temporary)
        project = sandbox / "project with spaces"
        shutil.copytree(ROOT / "scripts", project / "scripts", ignore=shutil.ignore_patterns("__pycache__"))
        shutil.copytree(ROOT / "app/web", project / "app/web")
        for name in ("gateway.py", "kb_server.py", "reference_server.py", "speech_stt_server.py", "reference_search.py", "wrangler.jsonc"):
            shutil.copy2(ROOT / "app" / name, project / "app" / name)
        (project / "app/reference_corpus").mkdir()
        base = sandbox / "server environment"
        tools = sandbox / "stand-in commands"
        log = sandbox / "calls.jsonl"
        standin = "#!" + sys.executable + "\n" + '''import json, os, pathlib, sys
name = pathlib.Path(sys.argv[0]).name
args = sys.argv[1:]
with open(os.environ["VHTA_TEST_CALLS"], "a") as stream:
    stream.write(json.dumps({"name": name, "args": args, "cwd": os.getcwd()}) + "\\n")
if name == "python" and args and args[0].endswith("check_web_assets.py"):
    os.execv(sys.executable, [sys.executable] + args)
if name == "python" and args[:2] == ["-m", "venv"]:
    target = pathlib.Path(args[2]) / "bin/python"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(pathlib.Path(sys.argv[0]).read_bytes())
    target.chmod(0o755)
if name == "python" and args and args[0].endswith(".py"):
    if not pathlib.Path(args[0]).is_file():
        raise SystemExit("missing Python entry point: " + args[0])
if name == "curl":
    print('{"build":"v210-stt-whisper-large-v3-turbo-shared-gpu-adaptive-1","ok":true}')
elif name == "ollama" and args == ["list"]:
    print("NAME ID SIZE\\nbge-m3:latest fixture 1GB")
'''
        for name in ("curl", "pkill", "nohup", "sleep", "node", "npx", "ffmpeg"):
            executable(tools / name, standin)
        serving = base / "serving/bin/python"
        executable(serving, standin)
        for relative in ("ollama/bin/ollama", "miniforge-teacher-tts/bin/python", "node-v22/bin/node", "node-v22/bin/npx"):
            executable(base / relative, standin)
        env = dict(os.environ, VQ_BASE=str(base), PYTHON_BIN=str(serving),
                   PATH=str(tools) + os.pathsep + os.environ["PATH"],
                   VQ_ORIGIN_URL="https://backend.invalid", VQ_ENABLE_LOCAL_FT_ROUTER="0",
                   VHTA_TEST_CALLS=str(log))

        def run(script, expected=0):
            result = subprocess.run([bash, str(project / "scripts" / script)],
                                    cwd=sandbox, env=env, capture_output=True,
                                    text=True, timeout=30)
            assert result.returncode == expected, (script, result.stdout, result.stderr)
            return result

        run("start.sh")
        calls = [json.loads(line) for line in log.read_text().splitlines()]
        assert any(c["name"] == "python" and c["args"] == ["reference_search.py", "--build-index"] for c in calls)
        assert any(c["name"] == "python" and c["args"] == ["reference_search.py", "--status"] for c in calls)
        gateway = [c for c in calls if c["name"] == "python" and c["args"] and c["args"][0] == "gateway.py"]
        assert len(gateway) == 1 and gateway[0]["cwd"] == str(project / "app")
        assert any(c["name"] == "nohup" and "kb_server.py" in c["args"] for c in calls)
        assert any(c["name"] == "nohup" and "reference_server.py" in c["args"] for c in calls)

        run("setup/prepare_models.sh")
        # Reproduce a fresh speech environment without installing any packages.
        (base / "miniforge-teacher-tts/bin/python").unlink()
        run("setup/prepare_stt.sh")
        assert (base / "miniforge-teacher-tts/bin/python").is_file()
        run("deploy/deploy_worker.sh")
        calls = [json.loads(line) for line in log.read_text().splitlines()]
        deployments = [c for c in calls if c["name"] == "npx"]
        assert len(deployments) == 1
        assert deployments[0]["args"] == ["--yes", "wrangler@4.127.0", "deploy", "--config",
                                           str(project / "app/wrangler.jsonc"), "--var",
                                           "ORIGIN_URL:https://backend.invalid"]
        # A missing real resource must block deployment before the stand-in npx.
        (project / "app/web/shared/js/avatar/avatar-controller.js").unlink()
        run("deploy/deploy_worker.sh", expected=1)
        after = [json.loads(line) for line in log.read_text().splitlines()]
        assert len([c for c in after if c["name"] == "npx"]) == 1

        # Check the moved ingestion tool's output location using a small PDF stub.
        fake_pdf = sandbox / "pdf stub"
        fake_pdf.mkdir()
        (fake_pdf / "fitz.py").write_text('''class Page:
    def get_text(self, mode):
        return "physiology " * 130
class Document:
    page_count = 1
    def __getitem__(self, index):
        return Page()
def open(path):
    return Document()
''', encoding="utf-8")
        ingestion = subprocess.run([sys.executable, str(project / "scripts/data/prepare_reference.py"),
                                    "fixture.pdf", "--title", "Fixture"], cwd=sandbox,
                                   env=dict(env, PYTHONPATH=str(fake_pdf)),
                                   capture_output=True, text=True, timeout=10)
        assert ingestion.returncode == 0, ingestion.stderr
        rows = [json.loads(line) for line in (project / "app/reference_corpus/chunks.jsonl").read_text().splitlines()]
        assert len(rows) == 1 and rows[0]["source"] == "Fixture" and rows[0]["pdf_page"] == 1

    print("PASS {} shell syntax checks, launcher/setup/deploy routing from another directory, missing-asset deployment block, and corpus output path; external commands were stand-ins".format(len(shell_files)))


if __name__ == "__main__":
    main()
