#!/usr/bin/env python3
from __future__ import print_function
import os, re, sqlite3, threading, time
from pathlib import Path

ROOT=Path(__file__).resolve().parent
DB_PATH=Path(os.environ.get('VQ_SITE_METRICS_DB', str(ROOT/'analytics'/'site_metrics.sqlite3')))
ONLINE_WINDOW_SEC=max(30, int(os.environ.get('VQ_ONLINE_WINDOW_SEC','90')))
_SESSION_RETENTION_SEC=max(86400, int(os.environ.get('VQ_METRICS_SESSION_RETENTION_SEC', str(7*86400))))
_ID_RE=re.compile(r'^[A-Za-z0-9._:-]{8,160}$')
_lock=threading.Lock()


def _connect():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    con=sqlite3.connect(str(DB_PATH), timeout=10)
    con.execute('PRAGMA journal_mode=WAL')
    con.execute('PRAGMA synchronous=NORMAL')
    con.execute('CREATE TABLE IF NOT EXISTS visitors (visitor_id TEXT PRIMARY KEY, first_seen REAL NOT NULL, last_seen REAL NOT NULL)')
    con.execute('CREATE TABLE IF NOT EXISTS sessions (session_id TEXT PRIMARY KEY, visitor_id TEXT NOT NULL, last_seen REAL NOT NULL)')
    con.execute('CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON sessions(last_seen)')
    con.execute('CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON sessions(visitor_id)')
    return con


def _clean_id(value, field):
    v=str(value or '').strip()
    if not _ID_RE.match(v):
        raise ValueError('%s is invalid' % field)
    return v


def snapshot():
    now=time.time(); cutoff=now-ONLINE_WINDOW_SEC
    with _lock:
        con=_connect()
        try:
            total=int(con.execute('SELECT COUNT(*) FROM visitors').fetchone()[0])
            online=int(con.execute('SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE last_seen>=?',(cutoff,)).fetchone()[0])
            return {'ok':True,'online_now':online,'total_visitors':total,'online_window_sec':ONLINE_WINDOW_SEC,'counting_method':'anonymous-browser-id'}
        finally:
            con.close()


def heartbeat(payload):
    visitor_id=_clean_id((payload or {}).get('visitor_id'),'visitor_id')
    session_id=_clean_id((payload or {}).get('session_id'),'session_id')
    now=time.time(); cutoff=now-ONLINE_WINDOW_SEC; prune_before=now-_SESSION_RETENTION_SEC
    with _lock:
        con=_connect()
        try:
            con.execute('BEGIN IMMEDIATE')
            con.execute('INSERT OR IGNORE INTO visitors(visitor_id,first_seen,last_seen) VALUES(?,?,?)',(visitor_id,now,now))
            con.execute('UPDATE visitors SET last_seen=? WHERE visitor_id=?',(now,visitor_id))
            con.execute('INSERT OR REPLACE INTO sessions(session_id,visitor_id,last_seen) VALUES(?,?,?)',(session_id,visitor_id,now))
            con.execute('DELETE FROM sessions WHERE last_seen<?',(prune_before,))
            total=int(con.execute('SELECT COUNT(*) FROM visitors').fetchone()[0])
            online=int(con.execute('SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE last_seen>=?',(cutoff,)).fetchone()[0])
            con.commit()
            return {'ok':True,'online_now':online,'total_visitors':total,'online_window_sec':ONLINE_WINDOW_SEC,'counting_method':'anonymous-browser-id'}
        except Exception:
            con.rollback(); raise
        finally:
            con.close()
