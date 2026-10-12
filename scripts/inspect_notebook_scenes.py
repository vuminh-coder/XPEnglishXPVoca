import json

with open('scripts/notebook_extracted_words.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

# Print words in ranges to inspect dialogue
def print_range(start_s, end_s):
    subset = [w for w in words if start_s <= w['time'] <= end_s]
    print(f"\n--- Range {start_s}s to {end_s}s ({len(subset)} words) ---")
    line = ""
    for w in subset:
        line += f"{w['word']} "
        if len(line) > 80:
            print(f"[{w['time']:05.1f}s] {line}")
            line = ""
    if line:
        print(f"[{subset[-1]['time']:05.1f}s] {line}")

# Inspect key scenes
print_range(0, 105)    # Ferris wheel scene
print_range(105, 215)  # Street walk scene
print_range(220, 350)  # House reunion scene
print_range(420, 465)  # Rain kiss scene
print_range(500, 660)  # Argument morning after scene
print_range(720, 800)  # Letter & elderly recognition scene
