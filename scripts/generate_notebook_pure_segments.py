# -*- coding: utf-8 -*-
"""
Generate 100% Pure Segments (Zero Merged Utterances) for The Notebook: Noah and Allie's Most Passionate Moments.
YouTube ID: Y5hVdlRFAUo (13:24 - 804s)
"""
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/notebook_current_segments.json', 'r', encoding='utf-8') as f:
    current_segs = json.load(f)

print(f"Loaded {len(current_segs)} existing segments.")

# We will break down each merged segment into fine-grained pure segments.
# For each segment that has '—', we split text and translationVi by '—'.
# We also craft accurate IPA, keywords, and AI explanation for each pure part.

def split_translation(trans):
    parts = [p.strip() for p in trans.split('—') if p.strip()]
    return parts

def split_text(text):
    parts = [p.strip() for p in text.split('—') if p.strip()]
    return parts

pure_segments = []

for seg in current_segs:
    text = seg['text']
    trans = seg['translationVi']
    
    t_parts = split_text(text)
    tr_parts = split_translation(trans)
    
    if len(t_parts) <= 1:
        # Already pure
        pure_segments.append({
            "startTime": seg['startTime'],
            "endTime": seg['endTime'],
            "text": text.strip(),
            "translationVi": trans.strip(),
            "ipaUs": seg.get('ipaUs', ''),
            "keywords": seg.get('keywords', []),
            "explanationAi": seg.get('explanationAi', ''),
            "properNouns": seg.get('properNouns', [])
        })
    else:
        # Need to split into len(t_parts) segments
        duration = seg['endTime'] - seg['startTime']
        num_parts = len(t_parts)
        # calculate approximate word lengths to distribute duration proportionally
        word_counts = [max(1, len(p.split())) for p in t_parts]
        total_words = sum(word_counts)
        
        cur_start = seg['startTime']
        for i, p in enumerate(t_parts):
            p_trans = tr_parts[i] if i < len(tr_parts) else tr_parts[-1]
            p_dur = duration * (word_counts[i] / total_words)
            p_end = round(cur_start + p_dur, 2)
            if i == num_parts - 1:
                p_end = seg['endTime']
            
            # Extract keywords from part
            words = [w.lower().strip(".,!?:;\"'") for w in p.split()]
            keywords = [w for w in words if len(w) > 3 and w not in ["that", "this", "what", "with", "from", "have", "were", "your", "they", "there", "about"]][:2]
            if not keywords:
                keywords = words[:1]
                
            # Extract proper nouns
            p_nouns = []
            for name in ["Noah", "Allie", "Tommy", "Sara", "Lon", "Windsor", "Calhoun", "Seabrook"]:
                if name in p:
                    p_nouns.append(name)
            
            pure_segments.append({
                "startTime": round(cur_start, 2),
                "endTime": round(p_end, 2),
                "text": p.strip(),
                "translationVi": p_trans.strip(),
                "ipaUs": seg.get('ipaUs', ''), # will refine IPA
                "keywords": keywords,
                "explanationAi": seg.get('explanationAi', ''),
                "properNouns": p_nouns
            })
            cur_start = p_end

print(f"Generated {len(pure_segments)} initial pure segments.")

with open('scripts/notebook_raw_pure_segments.json', 'w', encoding='utf-8') as f:
    json.dump(pure_segments, f, ensure_ascii=False, indent=2)

print("Saved to scripts/notebook_raw_pure_segments.json")
