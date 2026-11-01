# 10-question three-model pilot benchmark — source audit

These are **newly written pilot questions**, not copied past exam questions. Each item is grounded in a specific passage already present in the production physiology corpus. This avoids reusing the previously reviewed regression questions and gives an auditable answer key.

The three-model benchmark runner sends the **same single question** and the **same cached RAG context** to each model. `expected_option` is used only after the response for scoring and is not included in the model prompt. See the current [evaluation guide](../../../docs/evaluation.md) for model settings and metric definitions.

| ID | Correct | Exact source | Corpus ID | Source-supported fact |
|---|---|---|---|---|
| PILOT01 | C | Guyton & Hall, 15th ed., Ch. 1, p.21 | `guyton15_p0021_c01` | ECF is rich in Na+/Cl−/HCO3−; ICF is rich in K+/Mg2+/phosphate. |
| PILOT02 | C | Vander Human Physiology, 16th ed., Ch. 12, p.413 | `vander16_p0413_c01` | Cardiac output = heart rate × stroke volume; 80 × 70 mL = 5.6 L/min. |
| PILOT03 | B | Vander Human Physiology, 16th ed., Ch. 12, p.440 | `vander16_p0440_c01` | Acute arterial-pressure fall lowers baroreceptor firing, increasing sympathetic and decreasing parasympathetic cardiac activity. |
| PILOT04 | C | Guyton & Hall, 15th ed., Ch. 27, p.338 | `guyton15_p0338_c02` | Increased afferent arteriolar resistance lowers glomerular hydrostatic pressure and GFR. |
| PILOT05 | B | Guyton & Hall, 15th ed., Ch. 28, p.358 | `guyton15_p0358_c02` | High ADH increases medullary collecting-duct water permeability, increasing water reabsorption and reducing urine volume. |
| PILOT06 | B | Guyton & Hall, 15th ed., Ch. 79, p.963 | `guyton15_p0963_c02` | Postprandial insulin promotes rapid glucose transport into skeletal muscle and favors use/storage. |
| PILOT07 | B | Guyton & Hall, 15th ed., Ch. 65, p.803 | `guyton15_p0803_c02` | Protein in the antrum stimulates gastrin; gastrin stimulates ECL histamine release and gastric HCl secretion. |
| PILOT08 | C | Guyton & Hall, 15th ed., Ch. 73, p.888 | `guyton15_p0888_c02` | Maximal thyroxine secretion can raise metabolic rate about 50–100% above normal. |
| PILOT09 | B | Vander Human Physiology, 16th ed., Ch. 13, p.490 | `vander16_p0490_c01` | When alveolar ventilation is high relative to CO2 production, alveolar PCO2 decreases. |
| PILOT10 | B | Guyton & Hall, 15th ed., Ch. 40, p.519 | `guyton15_p0519_c03` | In the upright lung both ventilation and perfusion are lower at the apex, but perfusion falls more, so apical V/Q is higher. |

Production corpus SHA-256 recorded by the deployed vector index: `e6941278363d91ebdba12bad78b5f3da15a31fcee359a395f639c1f9acaed632`.

## Interpretation

This 10-item set is appropriate as a **pilot latency/accuracy comparison**. For thesis headline accuracy, a larger unseen set (e.g. 50 official questions) should be analyzed separately.
