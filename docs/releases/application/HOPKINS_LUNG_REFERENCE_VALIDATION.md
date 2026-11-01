> Historical validation from an earlier release. Current R4 values and calibration are in VQ_CALCULATION_UPDATE_README.md.

# Hopkins Lung Simulator validation — v207.1

Reference target: Johns Hopkins Gas Exchange Simulator (2023 interface / Riley-model lineage).

## Locked displayed-value gold cases

The Visual Model is regression-tested to the exact two-decimal values supplied from the Hopkins website for four independent runs:

1. Default: VT 500 mL, VD 150 mL, RR 15/min, FiO2 0.21.
2. Lower VT: VT 400 mL, VD 150 mL, RR 15/min, FiO2 0.21.
3. Higher dead space: VT 500 mL, VD 200 mL, RR 15/min, FiO2 0.21.
4. Higher inspired O2: VT 500 mL, VD 150 mL, RR 15/min, FiO2 0.25.

Other reference inputs for all four supplied runs: altitude 0 m, VO2 300 mL/min, R 0.80, Hb 15 g/dL, cardiac output 5.5 L/min, shunt 0, DLO2 32 mL/min/mmHg.

Run:

```bash
./CHECK_HOPKINS_REFERENCE.sh
```

The acceptance test fails if any supplied Hopkins displayed value differs at two decimals.

## Implementation note

The ventilation and alveolar-gas equations remain continuous. The legacy blood-gas approximation is corrected by a continuous calibration surface in alveolar PCO2 and FiO2 for the reference-input family above; it is not a per-case lookup table. Inputs outside the four-case validated family continue through the general physiological engine and should not be described as numerically identical to Hopkins until corresponding Hopkins reference cases are added.
