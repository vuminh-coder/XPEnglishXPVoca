# -*- coding: utf-8 -*-
"""
Helper to inspect text of cues for precise drafting.
"""
import json

with open('scripts/monsters_inc_cleaned_cues.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

def print_range(start_idx, end_idx):
    print(f"=== CUES {start_idx} to {end_idx} ===")
    for i in range(start_idx, end_idx + 1):
        c = cues[i]
        print(f"[{i:03d}] {c['timestamp']} ({c['seconds']}s): {c['text']}")

print_range(15, 40)
