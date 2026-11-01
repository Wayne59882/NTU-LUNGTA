# Project Organization and Development

[Project home](../README.md)

The repository separates application behavior, operator commands, configuration,
dependencies, automated checks, research records, and historical material.

## Directory responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Runtime services | `app/*.py`, `app/feedback/` | Gateway, access control, material APIs, retrieval, course preparation, speech, and feedback. |
| Browser interface | `app/web/` | View-specific pages plus shared frontend modules and assets. |
| Operator commands | `scripts/setup/`, `scripts/runtime/`, `scripts/deploy/`, `scripts/data/` | Prepare the environment/data, start services, and deploy. |
| Public configuration | `config/`, `app/wrangler.jsonc` | Environment templates and the active Worker/assets configuration. |
| Dependencies | `requirements/`, `app/package.json` | Python dependency lists and the pinned Wrangler development dependency. |
| Automated checks | `tests/regression/`, `tests/fixtures/`, `.github/workflows/` | Software regression fixtures and the offline CI workflow. |
| Research evidence | `research/` | Model-comparison tools, source questions, recorded results, and numerical validation. |
| Documentation | `docs/` | Setup, architecture, code mapping, evaluation, demonstration, and migration. |
| Historical material | `archive/`, `docs/releases/`, `tests/legacy/` | Older tools and release/validation records outside the current execution path. |

The current application has separate service modules for the gateway, knowledge
base, reference-material service, and speech recognition. It does not use a
batch-workflow scheduler. The startup order is implemented in
`scripts/runtime/start_services.sh`; the relationship between services is
described in [architecture.md](architecture.md).

## Entrypoints and dependency direction

`scripts/start.sh` delegates to the runtime launcher. Shell helpers share
`scripts/lib/paths.sh` and explicitly select `app/` as the working directory when
invoking the existing Python entrypoints. Private course data, feedback, and logs
therefore retain their application-relative locations.

Runtime modules do not import operator scripts. Research tools and tests are
invoked separately and are not required to serve normal requests. Shared browser
behavior lives under `app/web/shared/`; view-specific behavior remains in each
view's own directory.

## Making a change

1. Start with the user action or operator command and identify its entrypoint.
2. Follow the path through the page, gateway/Worker, backend module, and data.
3. Edit shared behavior in the common module and retain view-specific differences.
4. Run `python3 scripts/check_offline.py` and include the relevant verification
   evidence with the change.
5. For model, permission, speech-device, or deployment changes, also validate the
   real environment; fixture success cannot establish those properties.

The [code guide](code-map.md) maps functions to source files. The
[migration guide](migration.md) records changes from the older layout.

## What the automated checks establish

The offline checks cover the defined numerical and UI/control fixtures, source
syntax, local documentation links, frontend resource routes, and operator-script
routing. Operator checks run the real shell scripts in an isolated copy with
stand-in external commands, including a project path containing spaces. They also
check that a missing local asset prevents the deployment command from running
and that PDF ingestion writes to the application corpus directory.

The web-resource checker verifies local file references and the declared avatar
URLs. It does not establish external CDN availability. Full account isolation,
real model correctness/latency, device audio, private data migration, and public
deployment still need environment-specific tests.

## Remaining work

Some backend modules are large and some frontend modules wrap existing global
functions. Consolidating shared resources and separating operator tools improves
navigation and maintenance, but does not eliminate those implementation debts.
Package lists are not a fully validated environment lockfile. Record resolved
versions and deployment details when reproducing experiments.
