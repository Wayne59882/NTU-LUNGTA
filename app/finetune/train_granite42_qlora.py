#!/usr/bin/env python3
# Backward-compatible wrapper. v224 uses one common trainer for all three local models.
import sys,runpy
sys.argv=[sys.argv[0],'granite',*sys.argv[1:]]
runpy.run_path(__file__.replace('train_granite42_qlora.py','train_local_model_qlora.py'),run_name='__main__')
