# Multi-Course Virtual Human Teaching Assistant — Application

This directory contains the teaching application's runtime code, based on
`v241.12.5-full-answer-voice` with the R12 account and course-access updates.

| Location | Responsibility |
|---|---|
| `gateway.py`, `access_control.py` | Public entry point, accounts, and course access. |
| `reference_server.py`, `reference_search.py` | Material-based Q&A API and retrieval. |
| `course_runtime.py`, `exam_questions.py` | PDF, chapter, lecture-script, and question-bank preparation. |
| `kb_server.py`, `speech_stt_server.py` | Built-in knowledge base and speech routing/recognition. |
| `web/shared/` | Shared frontend code, styles, and assets grouped by function. |
| `web/reference/`, `web/kb/` | The two views and their view-specific code/data. |
| `cloudflare/worker/` | Worker entry point and cloud answer route. |
| `feedback/`, `reference_corpus/` | Reporting tools and corpus metadata; private content is excluded from Git. |
| `finetune/` | Optional fine-tuning tools and router; separate from the default model path. |

Operator tools live in [`scripts/`](../scripts/README.md), outside the runtime
modules. Run `python3 scripts/check_offline.py` from the repository root for
offline checks. After preparing and sourcing deployment settings, run
`bash scripts/start.sh` from the repository root to start the service.

[Project home](../README.md) · [Setup](../docs/getting-started.md) · [Architecture](../docs/architecture.md) · [Code guide](../docs/code-map.md) · [Evaluation](../docs/evaluation.md) · [Migration](../docs/migration.md)

The detailed setup and research guides linked above currently use Traditional Chinese.
