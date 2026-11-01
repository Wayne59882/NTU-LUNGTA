#!/usr/bin/env bash
set -Eeuo pipefail
ACTION="${1:-}"
TAG="${2:-}"
DNS64="${3:-e30=}"
SELECTED_ORIGIN="${4:-}"
CLIENT_BUILD="${5:-}"
BASE="${LUNGTA_BASE_DIR:-/path/to/workdir}"
TARGET="${LUNGTA_RESUME_TARGET:-$BASE/NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED}"
EXPECTED_BUILD='v241.12.5-full-answer-voice'
EXPECTED_ZIP="${6:-}"
[[ "$EXPECTED_ZIP" =~ ^[a-f0-9]{64}$ ]] || { echo "[STOP] Missing verified archive digest." >&2; exit 2; }
EXPECTED_MODEL='v241.12.9-VQ-hopkins-region-20261010'
BACKUP=''; CONFIG=''; CHANGED=0; PUBLISH_STARTED=0
fail() { echo "[STOP] $*" >&2; exit 2; }
on_exit() {
 local rc=$?; trap - EXIT
 [[ -z "$CONFIG" ]] || rm -f "$CONFIG"
 if [[ "$rc" -ne 0 ]]; then
  if [[ "$CHANGED" == 1 && "$PUBLISH_STARTED" == 0 ]]; then
   if node "$SOURCE/INSTALL_FULL_PROGRAM.cjs" restore "$PAYLOAD" "$TARGET" "$BACKUP"; then
    echo '[FAILED] Original application restored; publishing had not started.' >&2
   else echo "[FAILED] Restore incomplete; retain backup: $BACKUP" >&2; fi
  elif [[ "$PUBLISH_STARTED" == 1 ]]; then
   echo "[FAILED] Publishing/receipt did not complete. Retain backup: $BACKUP" >&2
  else echo '[FAILED] Stopped before updating application files.' >&2; fi
 fi
 exit "$rc"
}
trap on_exit EXIT
[[ "$ACTION" == prepare || "$ACTION" == publish || "$ACTION" == renew-tunnel ]] || fail 'Invalid deployment action.'
[[ "$TAG" =~ ^vqR5_[a-f0-9]{12}$ ]] || fail 'Invalid deployment tag.'
[[ -z "${CLOUDFLARE_ENV:-}" ]] || fail 'CLOUDFLARE_ENV must be unset for the production Worker.'
[[ -d "$TARGET/web/reference/js" && -d "$TARGET/web/kb/js" ]] || fail 'Existing full application is missing.'
TARGET="$(cd "$TARGET" && pwd -P)"; BASE="$(cd "$BASE" && pwd -P)"
[[ "$(tr -d '\r\n' < "$TARGET/VERSION.txt")" == "$EXPECTED_BUILD" ]] || fail 'Existing build differs.'
for d in "$BASE/node-v22/bin" "$HOME/node-v22/bin"; do
 [[ ! -x "$d/node" ]] || { export PATH="$d:$PATH"; break; }
done
for exe in node curl sha256sum unzip base64 mktemp; do command -v "$exe" >/dev/null || fail "Missing command: $exe"; done
node --input-type=commonjs -e 'if(Number(process.versions.node.split(".")[0])<20)process.exit(2)'
SOURCE="$BASE/lungta_stage_R5_$TAG"
PAYLOAD="$SOURCE/NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED"
CHECK_DIR="$TARGET/logs/vq_vqR5_$TAG"
if [[ "$ACTION" == prepare ]]; then
 echo '[1/4] Checking LOCAL services without DNS or public tunnel requests'
 mkdir -p "$TARGET/logs"; mkdir "$CHECK_DIR"
else
 [[ -f "$CHECK_DIR/prepared.json" ]] || fail 'Run preparation before publishing.'
 if [[ "$ACTION" == publish ]]; then
  [[ "$CLIENT_BUILD" == "$EXPECTED_BUILD" ]] || fail 'Windows must verify the selected tunnel first.'
 fi
fi
for port in 8182 8179; do
 url="http://127.0.0.1:$port/api/reference/health"
 curl --fail --silent --show-error --connect-timeout 5 --max-time 15 "$url" -o "$CHECK_DIR/local_$port.json" || fail "LOCAL service check failed at $url; no application files were updated."
 node --input-type=commonjs - "$CHECK_DIR/local_$port.json" "$EXPECTED_BUILD" <<'JS'
const fs=require('fs'),h=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
if(h.ok!==true||h.build!==process.argv[3]){console.error('[STOP] Local service/build mismatch');process.exit(2)}
JS
 echo "[LOCAL OK] 127.0.0.1:$port"
done
if [[ -f "$TARGET/logs/reference_backend.pid" ]]; then
 pid="$(tr -d '\r\n' < "$TARGET/logs/reference_backend.pid")"
 if [[ "$pid" =~ ^[0-9]+$ ]] && kill -0 "$pid" 2>/dev/null; then
  cwd="$(readlink "/proc/$pid/cwd" || true)"
  [[ -z "$cwd" || "$cwd" == "$TARGET/web/reference" ]] || fail 'Running backend belongs to another application.'
 fi
fi
if [[ "$ACTION" == prepare ]]; then
 echo '[2/4] Checking the exact newly uploaded COMPLETE ZIP'
 ARCHIVE="$BASE/lungta_upload_$TAG.zip"
 [[ -f "$ARCHIVE" ]] || fail "Uploaded complete archive is missing: $ARCHIVE"
 uploaded_hash="$(sha256sum "$ARCHIVE")"; uploaded_hash="${uploaded_hash%% *}"
 [[ "$uploaded_hash" == "$EXPECTED_ZIP" ]] || fail 'Uploaded complete ZIP digest differs; extraction and installation were not started.'
 mkdir "$SOURCE"; unzip -q "$ARCHIVE" -d "$SOURCE"; ln -s "$ARCHIVE" "$SOURCE.zip"
elif [[ "$ACTION" == publish ]]; then
 [[ "$SELECTED_ORIGIN" =~ ^https://[-a-z0-9]+\.trycloudflare\.(com|app)$ ]] || fail 'Invalid selected tunnel URL.'
 node --input-type=commonjs - "$CHECK_DIR/prepared.json" "$TAG" "$SELECTED_ORIGIN" <<'JS'
const fs=require('fs'),d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
if(d.tag!==process.argv[3]||!d.origins.includes(process.argv[4])){console.error('[STOP] Tunnel was not among the prepared candidates');process.exit(2)}
JS
fi
if [[ "$ACTION" == renew-tunnel ]]; then
 echo '[TUNNEL] Starting one fresh tunnel to the verified LOCAL gateway.'
 BIN="$(command -v cloudflared || true)"
 for p in "$BASE/cloudflared" "$TARGET/cloudflared" "$HOME/bin/cloudflared"; do
  [[ -n "$BIN" || ! -x "$p" ]] || BIN="$p"
 done
 [[ -n "$BIN" ]] || fail 'cloudflared is missing; LOCAL services passed but no live public tunnel was found.'
 LOG="$CHECK_DIR/new_tunnel.log"
 [[ ! -e "$LOG" ]] || fail 'Tunnel recovery already started for this run. Keep its log.'
 nohup "$BIN" tunnel --no-autoupdate --url http://127.0.0.1:8179 --protocol http2 > "$LOG" 2>&1 < /dev/null &
 TPID=$!; printf '%s\n' "$TPID" > "$CHECK_DIR/new_tunnel.pid"
 ORIGIN=''
 for ((i=0;i<20;i++)); do
  ORIGIN="$(sed -nE 's/.*(https:\/\/[-a-z0-9]+\.trycloudflare\.(com|app)).*/\1/p' "$LOG" | head -n 1)"
  [[ -z "$ORIGIN" ]] || break
  kill -0 "$TPID" 2>/dev/null || break
  sleep 2
 done
 if [[ -z "$ORIGIN" ]]; then
  kill "$TPID" 2>/dev/null || true
  tail -n 12 "$LOG" >&2
  fail 'Tunnel creation failed; LOCAL services passed. Application and Worker settings were not changed.'
 fi
 node --input-type=commonjs - "$CHECK_DIR/prepared.json" "$TAG" "$ORIGIN" <<'JS'
const fs=require('fs'),[file,tag,origin]=process.argv.slice(2),d=JSON.parse(fs.readFileSync(file,'utf8'));
if(d.tag!==tag)throw Error('Preparation identity mismatch');
d.origins=[origin];fs.writeFileSync(file,JSON.stringify(d)+'\n',{mode:0o600});
console.log('LUNGTA_PREPARED='+Buffer.from(JSON.stringify(d)).toString('base64'));
JS
 echo '[TUNNEL CREATED] Windows must verify HTTPS health before publishing.'
 exit 0
fi

actual="$(sha256sum "$SOURCE.zip")"; actual="${actual%% *}"
[[ "$actual" == "$EXPECTED_ZIP" ]] || fail 'Archive digest differs.'
(cd "$SOURCE" && sha256sum -c PACKAGE.sha256 >/dev/null)
node "$SOURCE/INSTALL_FULL_PROGRAM.cjs" preflight "$PAYLOAD" "$TARGET"
node "$SOURCE/PATCH_HTML_CACHE.cjs" "$TARGET" --check-only
node --input-type=commonjs - "$PAYLOAD/web/reference/js/35_hopkins_reference_lung_physiology.js" "$EXPECTED_MODEL" <<'JS'
const fs=require('fs'),vm=require('vm'),c={module:{exports:{}}};vm.runInNewContext(fs.readFileSync(process.argv[2],'utf8'),c);
const e=c.module.exports,d=e.calculateFromInputs(e.presetInputs('normal'));if(d.modelRevision!==process.argv[3])throw Error('Wrong V/Q model revision');
const expected={mvPCO2:47.22,mixedVenousCO2Content:53.57,mvPH:7.35,mvPO2:39.45,mvSat:71.44,mixedVenousO2Content:14.41,endPCO2:40,endCO2Content:49.21,endPO2:101.78,endSat:97.78,endCapO2Content:19.86,VE:7.5,VA:5.25,PACO2:40,PIO2:149.68,PAO2:101.78,artPCO2:40,arterialCO2Content:49.21,artPH:7.4,artPO2:101.78,artSat:97.78,arterialO2Content:19.86,aaGradient:.01};
for(const [k,v] of Object.entries(expected))if((d[k]*(k.endsWith('Sat')?100:1)).toFixed(2)!==v.toFixed(2))throw Error('Default reference mismatch: '+k);
console.log('[OK] All 23 default display fields match the supplied reference.');
const high=e.calculateFromInputs(e.presetInputs('highvq'));
if(high.endCapillaryScope!=='selected-region'||high.endPCO2!==high.units[0].pc||high.endPO2!==high.units[0].ecPO2)throw Error('Wrong end-capillary display scope');
if(!(high.endPCO2<d.endPCO2&&high.artPCO2>d.artPCO2))throw Error('High V/Q region/arterial distinction failed');
console.log('[OK] End Capillary uses the selected region; arterial content mixing is retained.');

JS
if [[ "$ACTION" == prepare ]]; then
 (cd "$PAYLOAD" && node VERIFY_VQ_CONSERVATION.cjs && node VERIFY_V241_12_4_BATCH.cjs && node VERIFY_V241_12_5_VOICE.cjs)
 node "$SOURCE/VERIFY_VOICE_MANUAL_STOP.cjs" "$PAYLOAD/web/reference/js/25_v105_resume_after_question_mouth_sync.js"
 node "$SOURCE/VERIFY_VOICE_MANUAL_STOP.cjs" "$PAYLOAD/web/kb/js/25_v105_resume_after_question_mouth_sync.js"
 node --check "$PAYLOAD/cloudflare/worker/src/index.js"
 node --input-type=commonjs - "$TARGET" "$CHECK_DIR/prepared.json" "$TAG" "$SELECTED_ORIGIN" <<'JS'
const fs=require('fs'),path=require('path'),[target,out,tag,known]=process.argv.slice(2),origins=[];
function add(s){const matches=String(s).match(/https:\/\/[-a-z0-9]+\.trycloudflare\.(?:com|app)/g)||[];for(const u of matches)if(!u.includes('REPLACE')&&!origins.includes(u))origins.push(u)}
add(known);
for(const rel of ['current_cloudflare_origin.txt','logs/cloudflare_origin_url.txt','logs/cloudflared.log'])try{add(fs.readFileSync(path.join(target,rel),'utf8').slice(-60000))}catch{}
const d={tag,build:'v241.12.5-full-answer-voice',model_revision:'v241.12.9-VQ-hopkins-region-20261010',origins:origins.slice(0,6)};
fs.writeFileSync(out,JSON.stringify(d)+'\n',{mode:0o600});
console.log('LUNGTA_PREPARED='+Buffer.from(JSON.stringify(d)).toString('base64'));
JS
 echo '[PREPARED] Local services and COMPLETE release passed. Windows must now verify the tunnel.'
 exit 0
fi
cat > "$CHECK_DIR/config_helper.cjs" <<'CONFIG_JS'
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
function parseJsonc(text) {
  text = text.replace(/^\uFEFF/, '');
  let stripped = '', quoted = false, escaped = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (quoted) {
      stripped += c;
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') quoted = false;
    } else if (c === '"') { quoted = true; stripped += c; }
    else if (c === '/' && next === '/') {
      i += 2; while (i < text.length && text[i] !== '\n') i++;
      stripped += '\n';
    } else if (c === '/' && next === '*') {
      const end = text.indexOf('*/', i + 2);
      assert(end >= 0, 'Unclosed JSONC comment');
      stripped += ' '; i = end + 1;
    } else stripped += c;
  }
  let clean = ''; quoted = false; escaped = false;
  for (let i = 0; i < stripped.length; i++) {
    const c = stripped[i];
    if (quoted) {
      clean += c;
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') quoted = false;
    } else if (c === '"') { quoted = true; clean += c; }
    else if (c === ',') {
      let j = i + 1; while (/\s/.test(stripped[j] || '') && j < stripped.length) j++;
      if (stripped[j] !== '}' && stripped[j] !== ']') clean += c;
    } else clean += c;
  }
  return JSON.parse(clean);
}
function makeConfig(target, output) {
  target = fs.realpathSync(target);
  assert(path.dirname(output) === target, 'Temporary config must remain in the app root');
  const cfg = parseJsonc(fs.readFileSync(path.join(target, 'wrangler.jsonc'), 'utf8'));
  assert(cfg.name === 'lungta', 'Unexpected Worker name');
  assert(cfg.assets && cfg.assets.directory === 'web', 'Unexpected asset directory');
  assert(path.resolve(target, cfg.main) === path.join(target, 'cloudflare/worker/src/index.js'), 'Unexpected Worker entry point');
  delete cfg.vars;
  cfg.keep_vars = true;
  fs.writeFileSync(output, JSON.stringify(cfg, null, 2) + '\n', { mode: 0o600, flag: 'wx' });
  console.log('[CONFIG] Temporary config omits local vars and preserves existing Worker variables.');
}
module.exports = { parseJsonc, makeConfig };
if (require.main === module) makeConfig(process.argv[2], process.argv[3]);
CONFIG_JS
cat > "$CHECK_DIR/dns_helper.cjs" <<'DNS_JS'
'use strict';
const dns = require('node:dns');
const net = require('node:net');
const allowed = new Set(['api.cloudflare.com', 'dash.cloudflare.com', 'registry.npmjs.org']);
let raw = {};
try { raw = JSON.parse(process.env.LUNGTA_DEPLOY_DNS || '{}'); } catch {}
if (!raw || typeof raw !== 'object' || Array.isArray(raw)) raw = {};
const map = {};
for (const [host, addresses] of Object.entries(raw)) {
  if (!allowed.has(host) || !Array.isArray(addresses)) continue;
  const ips = addresses.filter(x => typeof x === 'string' && net.isIP(x) === 4);
  if (ips.length) map[host] = ips;
}
const nativeLookup = dns.lookup.bind(dns);
function answer(host, options) {
  const family = typeof options === 'number' ? options : (options && options.family) || 0;
  if (!map[host] || ![0, 4, 'IPv4'].includes(family)) return null;
  return options && options.all
    ? map[host].map(address => ({ address, family: 4 }))
    : { address: map[host][0], family: 4 };
}
dns.lookup = function (host, options, callback) {
  if (typeof options === 'function') { callback = options; options = {}; }
  const value = answer(host, options);
  if (!value || typeof callback !== 'function') return nativeLookup(host, options, callback);
  process.nextTick(() => {
    if (Array.isArray(value)) callback(null, value);
    else callback(null, value.address, value.family);
  });
};
if (dns.promises && typeof dns.promises.lookup === 'function') {
  const nativePromiseLookup = dns.promises.lookup.bind(dns.promises);
  dns.promises.lookup = function (host, options) {
    const value = answer(host, options);
    return value ? Promise.resolve(value) : nativePromiseLookup(host, options);
  };
}
DNS_JS
chmod 600 "$CHECK_DIR/config_helper.cjs" "$CHECK_DIR/dns_helper.cjs"
export LUNGTA_DEPLOY_DNS="$(printf '%s' "$DNS64" | base64 -d)"
export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--require=$CHECK_DIR/dns_helper.cjs"
CONFIG="$TARGET/.lungta_vqR5_$TAG.jsonc"
node "$CHECK_DIR/config_helper.cjs" "$TARGET" "$CONFIG"
cached="$(node --input-type=commonjs - "$TARGET" "$HOME" <<'JS'
const fs=require('fs'),path=require('path'),[target,home]=process.argv.slice(2),dirs=[path.join(target,'node_modules/wrangler')],cache=path.join(home,'.npm/_npx');
if(fs.existsSync(cache))for(const n of fs.readdirSync(cache))dirs.push(path.join(cache,n,'node_modules/wrangler'));
for(const d of dirs)try{const p=JSON.parse(fs.readFileSync(path.join(d,'package.json'),'utf8')),bin=path.join(d,'bin/wrangler.js');if(p.version==='4.127.0'&&fs.existsSync(bin)){process.stdout.write(bin);break}}catch{}
JS
)"
if [[ -n "$cached" ]]; then WRANGLER=(node "$cached");
else command -v npx >/dev/null || fail 'npx or cached Wrangler is required'; WRANGLER=(npx --yes wrangler@4.127.0); fi
echo '[3/4] Checking Cloudflare access, then backing up and installing the COMPLETE release'
"${WRANGLER[@]}" whoami --config "$CONFIG" --json > "$CHECK_DIR/cloudflare_access.json" < /dev/null
mkdir -p "$TARGET/backups"; BACKUP="$(mktemp -d "$TARGET/backups/vq_full_XXXXXXXX")"
node "$SOURCE/INSTALL_FULL_PROGRAM.cjs" backup "$PAYLOAD" "$TARGET" "$BACKUP"
echo "[BACKUP] $BACKUP"; CHANGED=1
node "$SOURCE/INSTALL_FULL_PROGRAM.cjs" apply "$PAYLOAD" "$TARGET" "$BACKUP"
(cd "$TARGET" && node VERIFY_VQ_CONSERVATION.cjs)
echo '[4/4] Publishing COMPLETE assets and synchronizing the Windows-verified tunnel'
PUBLISH_STARTED=1
(cd "$TARGET" && "${WRANGLER[@]}" deploy --config "$CONFIG" --keep-vars --var "ORIGIN_URL:$SELECTED_ORIGIN" < /dev/null)
node --input-type=commonjs - "$TARGET" "$CHECK_DIR/receipt.json" "$TAG" "$BACKUP" "$EXPECTED_ZIP" "$SELECTED_ORIGIN" <<'JS'
const fs=require('fs'),path=require('path'),crypto=require('crypto'),[target,out,tag,backup,archiveHash,origin]=process.argv.slice(2),files=[];
for(const mode of ['kb','reference'])for(const rel of ['index.html','js/05_recognition_stop_on_submit.js','js/25_v105_resume_after_question_mouth_sync.js','js/29_v153_course_aligned_student_results.js','js/35_hopkins_reference_lung_physiology.js','js/55_v241_course_adaptive_ta.js']){
 files.push({url_path:rel==='index.html'?`/${mode}/`:`/${mode}/${rel}`,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(target,'web',mode,rel))).digest('hex')});
}
const receipt={tag,build:'v241.12.5-full-answer-voice',published:true,public_verified:false,model_revision:'v241.12.9-VQ-hopkins-region-20261010',origin,archive_sha256:archiveHash,complete_release_files:fs.readFileSync(path.join(target,'FULL_RELEASE_FILES.txt'),'utf8').split(/\r?\n/).filter(Boolean).length,backup_path:backup,files};
fs.writeFileSync(out,JSON.stringify(receipt)+'\n',{mode:0o600});
fs.writeFileSync(path.join(target,'current_cloudflare_origin.txt'),origin+'\n',{mode:0o600});
console.log('LUNGTA_PUBLISHED='+Buffer.from(JSON.stringify(receipt)).toString('base64'));
JS
echo '[SERVER PUBLISH COMPLETE] Windows will verify public files and routing next.'
