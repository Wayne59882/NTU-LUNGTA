# Source code for the thesis figures and tables

These archives preserve the historical application code supplied for the thesis, together with the formal v153 KB audit code and CSV data. They are stored on `thesis-v9-source-archive-20261104`, based on main commit `253b947c5e7f929809d6c1da8fee080ee68f7a9e`. This branch adds files only under `research/software_history/`; it does not change application, deployment, or workflow files.

## Figure 1 and Table 3 correspondence

| Figure 1 configuration | Reported use | Historical source | Current source |
| --- | --- | --- | --- |
| A. Fixed Respiratory Knowledge Base | KB coefficient calibration and score-threshold analysis | Original v153 split source; v153 GitHub-ready source; formal v170 bundle with the documented course-context correction | The branch base commit and `app/web/kb/` |
| B. Reference Textbook System | Medical licensing examination comparison | v241.12.5 source | The branch base commit and `app/web/reference/` |
| B. Reference Textbook System | Fixed-bank scenario practice demonstration | v241.12.5 R12 source; no LLM call for drawing and grading the fixed quiz | The branch base commit |
| C. Uploaded-PDF Course System | Uploaded pharmacology course demonstration | v241.12.5 R12 source | The branch base commit and the course preparation/Q&A server code |

The latest implementation verified on 4 November 2026 was **R17f**, identified by the first entry of `CHANGELOG.md` and commit `253b947c5e7f929809d6c1da8fee080ee68f7a9e`. R17f identifies the current repository, not a rerun of the historical benchmarks or replacement screenshots. The versions for those results remain the versions reported in the supplied V8 table.

## Archived files

| Archive | Contents and provenance |
| --- | --- |
| `v153_original_split_source.zip` | Original split application from `VQ_TA_SPLIT_FILE_v153_NO_STUDENT_COMPARISON.zip`; source code is unchanged. |
| `v153_github_ready_source.zip` | The supplied GitHub-ready v153 package. KB records are split out of the QA engine in this package; it is distinguished from the original split source above. |
| `v153_formal_v170_source.zip` | The supplied formal v170 bundle. Its release note identifies v153 scoring with the course-context mapping correction documented in v168. It is not presented as an untouched original v153 release. |
| `v153_formal_v170_50q_audit.zip` | Unmodified evaluator, method notes, and CSV audit files from the formal original-50-question package. |
| `v153_formal_v170_200q_audit.zip` | Unmodified evaluator, method notes, and CSV audit files from the formal added-150/total-200 package. |
| `v241_12_5_source.zip` | Source files from `NTULUNG_TA_v241_12_5_VQ_CALCULATION_FIXED.zip`; the original directory structure and source bytes are retained. |
| `v241_12_5_R12_source.zip` | Source files from `MC_VHTA_COMPLETE_R12_MATH_AUDIO_20261102.zip`; the original directory structure and source bytes are retained. |

Each accompanying manifest records the original package filename and SHA-256, archived file hashes, and omitted files. `archive_index.json` lists package-level provenance. Historical package documentation and verification statements are retained as supplied; they are not claims that all historical runtime tests were rerun during this archival operation.

## KB analysis correspondence

The formal v170 audit files identify a frozen **11,013-item KB**, 50 calibration questions, an additional 150 validation questions, and a total 200-question set. At gate 68 the supplied audit summaries record TP/FP/TN/FN of 25/1/24/0 for the original 50 and 98/7/93/2 for the total 200. Their maximum-F1 threshold intervals are 68–93 and 68–71, respectively, matching Figure 13. The adopted seven nonzero coefficients are 45, 8, 7 (alias cap 28), 18, 2, 2, and 12, matching Tables 4–5. Formal calibration uses the historical fixed-Top-1 protocol at gate 97; it is distinct from the 200-question reranking sensitivity analysis described in the thesis.

The 12,134 records reported in Table 1 describe the later teaching-interface KB. They must not be substituted for the frozen 11,013-item KB used in Figure 13. This archive does not claim that later 12,134-item revalidation outputs reproduce that earlier experiment.

## Scope and use

The source files are copied byte-for-byte. The archives exclude image/audio assets, private textbook passages, private uploaded course materials, environment files, and non-source generated outputs. Formal KB audit archives retain their evaluator and research CSV data. Therefore these are **source archives, not complete deployment distributions**. Existing private/licensed corpus preparation and model setup are still required for the textbook and uploaded-course workflows. See the repository's existing setup and evaluation documentation.

Historical launchers may assume an old layout; extract and inspect them in a separate directory. Do not copy an archive over a running installation. No deployment or merge to main is performed by adding these archives.
