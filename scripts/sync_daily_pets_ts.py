import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# Load calibrated segments
with open('scripts/pets_11_calibrated.json', 'r', encoding='utf-8') as f:
    calibrated = json.load(f)

# Read lesson_daily_pets.ts
with open('features/listening/data/lessons/lesson_daily_pets.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace segments array in code
# Find QUIZ_DAILY_PETS block and metadata
prefix = code[:code.find('  segments: [')]
prefix += '  segments: ' + json.dumps(calibrated, ensure_ascii=False, indent=4) + ',\n};\n'

with open('features/listening/data/lessons/lesson_daily_pets.ts', 'w', encoding='utf-8') as f:
    f.write(prefix)

print("lesson_daily_pets.ts successfully updated!")
