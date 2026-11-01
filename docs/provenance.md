# Source Attribution and Verification Scope

[Project home](../README.md)

This record distinguishes application development, editorial references,
third-party components, and existing research data. It is a bounded source review,
not a certification of originality or of every historical experiment.

## Reorganization and documentation

The README chapter layout of
[CircDEX / circRNA_agent](https://github.com/choukaihsuan/circRNA_agent) was an
editorial reference for the 2026-11-01 organization work. NTU-LUNGTA's descriptions,
commands, and service map were written for this teaching application. No circRNA
source files or experimental results were imported during the reorganization.

AI-assisted implementation and editing were used for this work. The edits are
recorded in Git; automated checks provide evidence for their stated software
scope, not new measurements of model performance or learning outcomes.

## Checks performed on 2026-11-01

The review used initial commit
`8d3361598d788f877f3a8da551519c245bc7585f` and organized commit
`4d543ed8a5a03dd7d7f01082ff0414e772045d20`.

| Check | Finding | Limit |
|---|---|---|
| Existing research files | All 47 JSON, JSONL, CSV, and PNG files under `research/` matched a blob in the initial commit byte for byte. | An unchanged file does not prove that the original experiment was authentic or correctly designed. |
| Recorded national-examination results | The 60 stored model answers agreed internally with the 30 recorded answer-key entries, the group counts, and all four mean/SD rows. | The original model sessions were not replayed and the official PDF answer keys were not independently rechecked in this review. |
| Comparison with the editorial reference | No whole Python, JavaScript, shell, R, or HTML file had the same Git blob hash. Long exact README word matches were confined to the table of contents' generic section labels. | Whole-file hashes and word matching cannot establish the absence of partial copying or an independent idea's origin. |
| Offline software checks | The organized revision passed nine suites and the Python 3.12 / Node.js 22 and 24 CI workflow. | These fixtures do not measure live model accuracy, latency, or learning outcomes. |

The examination data are indexed in
[`research/physician_benchmark/`](../research/physician_benchmark/). The original
record defines its time measurement as a complete 10-item asynchronous batch,
with 3-second polling; it does not report individual-question latency. Preserve
that definition when using these results.

## Third-party browser components

| Component | Declared use | Source and license information checked |
|---|---|---|
| Three.js 0.180.0 | Browser 3D rendering and import maps. | [r180 LICENSE](https://github.com/mrdoob/three.js/blob/r180/LICENSE): MIT; copyright 2010–2025 three.js authors. |
| TalkingHead 1.7.0 | Imported lip-sync/avatar library. | [Upstream repository](https://github.com/met4citizen/TalkingHead) and [current main LICENSE](https://github.com/met4citizen/TalkingHead/blob/main/LICENSE): MIT; copyright 2023–2024 Mika Suominen. The exact distributed 1.7.0 license file was not independently retrieved in this review. |
| HeadAudio avatar files | External `david.glb` and `julia.glb` URLs used for the application's male/female roles. | [Avatar directory](https://github.com/met4citizen/HeadAudio/tree/main/avatars). The repository's [software LICENSE](https://github.com/met4citizen/HeadAudio/blob/main/LICENSE) is MIT; asset-specific provenance and terms remain to be confirmed. |

These libraries and demo models are third-party work. Application role names do
not establish authorship of the underlying avatar models. The inventory above
does not grant a license to the application or clear every included asset.

## Material and asset records still needed

The corpus metadata names Guyton and Hall, Vander, and Beachey as textbook
sources. The [pilot source record](../research/three_model_10q/SOURCE_AUDIT_10Q.md)
lists passages and page references. These are recorded source claims; the private
textbooks and their exact page mappings were not independently verified here.

The original creator/source and permission records for local
`app/web/shared/assets/avatar_*.png`, `lung_*.png`, and `voice/*` were not fully
established from the repository. Keep the original creation files, source links,
or permission records associated with each asset. Do not describe all third-party
assets or textbook material as original project work.

For experimental claims, retain original run logs, model identifiers, environment
details, question and answer-key provenance, and the seen/unseen distinction.
See the [evaluation guide](evaluation.md) and [testing scope](testing.md).
