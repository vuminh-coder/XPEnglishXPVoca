import json
import re

with open("features/listening/data/lessons/lesson_psychology_of_money.ts", "r", encoding="utf-8") as f:
    old_content = f.read()

# Parse current segments from lesson
seg_texts_old = re.findall(r'text:\s*"([^"]+)"', old_content)
all_old_words = " ".join(seg_texts_old).lower()
all_old_words = re.sub(r"[^a-z0-9]", " ", all_old_words).split()

print(f"Old total words: {len(all_old_words)}")

# Plan 16 Pure Master Segments
plan_16 = [
    "In the book, The Psychology of Money, Morgan Housel shares Warren Buffett's real secret.",
    "It's not stock-picking, it's patience.",
    "Housel explains that compound interest only works if you stay in the game.",
    "Most people want to get rich fast.",
    "They jump in, jump out, chase trends, and end up with nothing.",
    "But Buffett?",
    "He's been investing for more than 70 years.",
    "The magic isn't his IQ.",
    "It's that he never left the table.",
    "Compounding needs time, not genius.",
    "That's the lesson from The Psychology of Money.",
    "If you want wealth, stop rushing.",
    "Be patient. Stay consistent.",
    "That's the real secret.",
    "So master your mind, not the market.",
    "Comment: do you think money is more math or behavior?"
]

all_new_words = " ".join(plan_16).lower()
all_new_words = re.sub(r"[^a-z0-9]", " ", all_new_words).split()

print(f"New total words: {len(all_new_words)}")

diffs = 0
for i in range(max(len(all_old_words), len(all_new_words))):
    o = all_old_words[i] if i < len(all_old_words) else "<MISSING>"
    n = all_new_words[i] if i < len(all_new_words) else "<MISSING>"
    if o != n:
        print(f"Diff at word {i}: old='{o}' vs new='{n}'")
        diffs += 1

if diffs == 0:
    print("ALL 126 WORDS MATCH 100% PERFECTLY! 0 DIFFS!")
