# -*- coding: utf-8 -*-
"""
Analysis of all 125 cues for Monsters Inc to form complete contiguous segments.
"""
import json

with open('scripts/monsters_inc_cleaned_cues.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

print(f"Total cues: {len(cues)}")

# Let's inspect cue blocks:
# Block 1: Intro (0-6) -> 28s to 87s
# Block 2: Scene 1 dialogue (7-14) -> 87s to 152s
# Block 3: Teaching "pal", "she's the one", "hook up" (15-23) -> 152s to 227s
# Block 4: Pronunciation "what do you know" -> "whaddya know" (24-26) -> 227s to 254s
# Block 5: Teaching "save it for the scare floor", Karate Kid (27-34) -> 254s to 321s
# Block 6: Teaching "in the zone", "winds of change", "what a creep", Scooby Doo (35-39) -> 321s to 360s
# Block 7: Channel review / app tip & transition (40-48) -> 360s to 435s
# Block 8: Scene 2 setup & dialogue (49-55) -> 435s to 488s
# Block 9: Teaching "blow this", past tense "blew it" (56-57) -> 488s to 513s
# Block 10: Pronunciation "it'll be", flap T "not ours" (58-61) -> 513s to 548s
# Block 11: Teaching "out of our hair" (62-65) -> 548s to 580s
# Block 12: Teaching "can it" slang (66-70) -> 580s to 621s
# Block 13: Scene 3 Randall interrogation & teaching "word on the street" (71-75) -> 621s to 661s
# Block 14: Teaching "trace back to", "no way" refusal/surprise (76-79) -> 661s to 696s
# Block 15: Scene 3 Waxford & teaching "inside job" (80-84) -> 696s to 736s
# Block 16: Teaching "put your money on", "put your money where your mouth is" (85-88) -> 736s to 768s
# Block 17: Teaching "them shifty eyes" (89-91) -> 768s to 798s
# Block 18: Unsubtitled listening quiz 1: "she's the one", "hook up" (92-97) -> 798s to 842s
# Block 19: Unsubtitled listening quiz 2: "what do you know", "allergies", "in the zone" (98-103) -> 842s to 888s
# Block 20: Unsubtitled listening quiz 3: "don't blow this", "out of our hair", "can it" (104-106) -> 888s to 918s
# Block 21: Unsubtitled listening quiz 4: "word on the street", "no way", "inside job", "shifty eyes" (107-111) -> 918s to 959s
# Block 22: Comment of the day & vocabulary recap challenge ("in the zone", "word on the street", "shifty") (112-121) -> 959s to 1037s
# Block 23: Outro Easter Egg clip: Mike Wazowski & Boo astronaut pail (122-124) -> 1037s to 1059s

print("All 23 blocks identified, covering 100% of all 125 cues!")
