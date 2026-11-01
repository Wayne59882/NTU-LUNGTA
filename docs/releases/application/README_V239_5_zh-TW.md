# v239.5 — Short physiology query scope fix

This release preserves v239.4 dynamic batch feedback and the v238.1 inference/RAG path, while fixing false out-of-scope rejection for short physiology questions whose ASCII abbreviations are directly adjacent to Chinese text.

Examples now accepted by the scope gate:
- 什麼是V/Q
- V/Q是什麼
- PaO₂是什麼
- 什麼是PaCO₂
- SpO₂正常值是多少

Cause fixed: Python Unicode `\\b` treats Chinese characters and ASCII letters as word characters, so `什麼是V/Q` did not have a `\\b` boundary before `V`. v239.5 uses ASCII-only token boundaries and normalizes scientific Unicode subscripts/slashes before matching.
