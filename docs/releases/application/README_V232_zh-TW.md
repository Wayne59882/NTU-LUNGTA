# NTULUNG TA v232 — Semantic-Constraint Verified Stable Agent

這版承接 v231 stable shared-GPU serving，針對「教材已有正確證據，但模型因題幹狀態/時相/正負號語意誤判而選錯」做一般化修正。

核心原則：不把國考答案塞進 production、不針對單題寫正確答案、不新增生理事實 validator。改為要求同一 LLM 在選項決策時保留題幹所有 state/phase/timing/negation/comparison/reference/sign/direction constraints；高語意風險 MCQ 會做 blind same-model verification，若不同意才 adjudicate。

安裝：
```bash
cd /path/to/workdir/NTULUNG_TA_v206_7
chmod +x INSTALL_V232_ACCURACY_STABLE.sh CHECK_V232_ACCURACY_STABLE.sh
./INSTALL_V232_ACCURACY_STABLE.sh
```

注意：共享 A5000 負載仍會影響 Local LLM latency；這版保留 async serving，避免長 HTTP request 造成 Invalid origin response。
