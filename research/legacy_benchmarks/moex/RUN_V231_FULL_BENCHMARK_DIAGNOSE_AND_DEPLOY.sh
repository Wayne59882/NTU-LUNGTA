#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
BASE="${VQ_BASE:-/path/to/workdir}"
ENV_DIR="${VQ_MOEX_ENV:-$BASE/lungta-moex-venv}"
MODEL="${VQ_BENCH_MODEL:-granite}"
OUT="$ROOT/benchmark/output"
STATE="$ROOT/benchmark/state"
mkdir -p "$OUT" "$STATE"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
export VQ_V231_PROFILE=optimized
REF_PROFILE=optimized

stamp(){ date '+%Y-%m-%d %H:%M:%S'; }
wait_ref(){
  for i in $(seq 1 60); do
    if curl -fsS http://127.0.0.1:8182/api/reference/health >/dev/null 2>&1; then return 0; fi
    sleep 2
  done
  echo "[ERROR] reference server did not become healthy" >&2
  tail -120 "$ROOT/logs/reference_backend.log" 2>/dev/null || true
  return 1
}
restart_ref(){
  echo "[$(stamp)] restarting Reference backend"
  pkill -u "$USER" -f '[r]eference_server.py.*8182' 2>/dev/null || true
  sleep 2
  nohup env VQ_V231_PROFILE="$REF_PROFILE" python3 "$ROOT/reference_server.py" --mode ollama --host 127.0.0.1 --port 8182 --open none > "$ROOT/logs/reference_backend.log" 2>&1 &
  echo $! > "$ROOT/logs/reference_backend.pid"
  wait_ref
}

printf '\n===== V231 FULL AUTO START %s =====\n' "$(stamp)"
echo "MODEL=$MODEL"

# The installed v231 server must be active. This does not expose official answers to production.
if ! curl -fsS http://127.0.0.1:8182/api/reference/health >/dev/null 2>&1; then
  echo '[INFO] Reference backend not active; start the application first with START_VQ_TA_SERVER.sh.' >&2
  exit 20
fi

# Save the untouched Guyton corpus/index once for reliable A/B and instant rollback.
if [[ ! -f "$STATE/guyton_chunks.jsonl" ]]; then cp reference_corpus/chunks.jsonl "$STATE/guyton_chunks.jsonl"; fi
if [[ ! -f "$STATE/guyton_vector_index.sqlite3" ]]; then cp reference_corpus/vector_index.sqlite3 "$STATE/guyton_vector_index.sqlite3"; fi
if [[ ! -f "$STATE/guyton_window_index.sqlite3" ]]; then cp reference_corpus/window_index.sqlite3 "$STATE/guyton_window_index.sqlite3"; fi

# Always begin the experiment from Guyton-only.
cp "$STATE/guyton_chunks.jsonl" reference_corpus/chunks.jsonl
cp "$STATE/guyton_vector_index.sqlite3" reference_corpus/vector_index.sqlite3
cp "$STATE/guyton_window_index.sqlite3" reference_corpus/window_index.sqlite3
restart_ref

printf '\n===== 1/7 FETCH 15-YEAR OFFICIAL MOEX BENCHMARK =====\n'
./benchmark/moex/PREPARE_MOEX_BENCHMARK_ENV.sh
"$ENV_DIR/bin/python" benchmark/moex/FETCH_MOEX_BENCHMARK.py --start-year 2012 --end-year 2026
"$ENV_DIR/bin/python" - <<'PY'
import json
from pathlib import Path
p=Path('benchmark/moex/dataset/sources.json')
rows=json.loads(p.read_text(encoding='utf-8'))
ok=[x for x in rows if not x.get('error')]
if len(ok)<10: raise SystemExit('[ERROR] fewer than 10 MOEX years were retrieved: %d'%len(ok))
print('[OK] official MOEX years retrieved:',len(ok),[x.get('year') for x in ok])
PY

printf '\n===== 2/7 V229-COMPATIBLE GUYTON BASELINE =====\n'
python3 benchmark/moex/EVALUATE_V231_TRACE.py --profile baseline --model "$MODEL" --output "$OUT/guyton_v229_baseline.json"

printf '\n===== 3/7 V231 GUYTON AGENT OPTIMIZATION =====\n'
python3 benchmark/moex/EVALUATE_V231_TRACE.py --profile optimized --model "$MODEL" --output "$OUT/guyton_v231_optimized.json"

printf '\n===== 4/7 FULL POST-HOC ERROR TRACE =====\n'
python3 benchmark/moex/DIAGNOSE_V231_ERRORS.py --trace "$OUT/guyton_v231_optimized.json" --model "$MODEL" --output "$OUT/guyton_v231_diagnosis.json"

NEED_SUPP="$(python3 - <<'PY'
import json
x=json.load(open('benchmark/output/guyton_v231_diagnosis.json'))
print('1' if x.get('supplemental_ab_test_needed') else '0')
PY
)"

if [[ "$NEED_SUPP" == "1" ]]; then
  printf '\n===== 5/7 TRUE CORPUS GAP DETECTED -> A/B TEST BEACHEY + VANDER =====\n'
  python3 benchmark/moex/APPLY_SUPPLEMENTAL_CORPUS.py --base "$STATE/guyton_chunks.jsonl"
  rm -f reference_corpus/vector_index.sqlite3 reference_corpus/window_index.sqlite3
  ./PREPARE_REFERENCE_VECTOR_RAG.sh
  restart_ref
  python3 benchmark/moex/EVALUATE_V231_TRACE.py --profile optimized --model "$MODEL" --output "$OUT/expanded_v231_optimized.json"
else
  printf '\n===== 5/7 NO HIGH-CONFIDENCE CORPUS GAP -> KEEP GUYTON ONLY =====\n'
  rm -f "$OUT/expanded_v231_optimized.json"
fi

printf '\n===== 6/7 OBJECTIVE FINAL SOURCE SELECTION =====\n'
python3 benchmark/moex/COMPARE_AND_SELECT.py \
  --baseline "$OUT/guyton_v229_baseline.json" \
  --guyton "$OUT/guyton_v231_optimized.json" \
  --expanded "$OUT/expanded_v231_optimized.json" \
  --diagnosis "$OUT/guyton_v231_diagnosis.json" \
  --output "$OUT/FINAL_V231_DECISION.json" > "$OUT/FINAL_V231_DECISION.txt"
cat "$OUT/FINAL_V231_DECISION.txt"
read CHOICE FINAL_PROFILE < <(python3 - <<'PY'
import json
x=json.load(open('benchmark/output/FINAL_V231_DECISION.json'))
print(x['choice'],x['profile'])
PY
)
printf 'VQ_V231_PROFILE=%s\n' "$FINAL_PROFILE" > "$STATE/final_profile.env"
REF_PROFILE="$FINAL_PROFILE"

python3 benchmark/moex/MAKE_FINAL_REPORT.py

if [[ "$CHOICE" == "guyton" ]]; then
  echo '[FINAL] restoring Guyton-only corpus/index.'
  cp "$STATE/guyton_chunks.jsonl" reference_corpus/chunks.jsonl
  cp "$STATE/guyton_vector_index.sqlite3" reference_corpus/vector_index.sqlite3
  cp "$STATE/guyton_window_index.sqlite3" reference_corpus/window_index.sqlite3
  restart_ref
else
  echo '[FINAL] retaining benchmark-proven Guyton + Beachey + Vander corpus.'
fi

printf '\n===== 7/7 ACCEPTANCE + CLOUDFLARE DEPLOY =====\n'
./CHECK_V206_7.sh

ORIGIN="$(cat "$BASE/current_cloudflare_origin.txt" 2>/dev/null || true)"
if [[ -z "$ORIGIN" ]] || ! curl -fsS "$ORIGIN/api/health" >/dev/null 2>&1; then
  ./START_CLOUDFLARE_TUNNEL.sh
  sleep 5
  ORIGIN="$(cat logs/cloudflare_origin_url.txt)"
  printf '%s\n' "$ORIGIN" > "$BASE/current_cloudflare_origin.txt"
fi
VQ_ORIGIN_URL="$ORIGIN" ./DEPLOY_CLOUDFLARE_WORKERS_DEV.sh

curl -fsS https://lungta.twchu.workers.dev/api/health > "$OUT/public_health.json"
printf '\n===== V231 COMPLETE %s =====\n' "$(stamp)"
echo "Final corpus choice: $CHOICE"
echo "Final agent profile: $FINAL_PROFILE"
echo "Report: $OUT/FINAL_V231_REPORT.md"
echo "Diagnosis: $OUT/guyton_v231_diagnosis.json"
echo "Public: https://lungta.twchu.workers.dev"
