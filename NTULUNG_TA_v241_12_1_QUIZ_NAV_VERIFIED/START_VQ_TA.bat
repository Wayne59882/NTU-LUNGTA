@echo off
set VQ_PORT=8179
start "NTULUNG KB" python kb_server.py --mode ollama --host 127.0.0.1 --port 8181 --open none
start "NTULUNG RAG" python rag_server.py --mode ollama --host 127.0.0.1 --port 8182 --open none
python gateway.py --host 0.0.0.0 --port 8179
