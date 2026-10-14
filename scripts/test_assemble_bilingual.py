import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# Import our IPA converter logic
from build_bilingual_brain_master import get_word_ipa, sentence_to_ipa, en_cues, grouping

# Define metadata for all 39 segments
# We verify tokenCount with regex \b[A-Za-z0-9_]+\b
def calc_tokens(text):
    m = re.findall(r'\b[A-Za-z0-9_]+\b', text)
    return len(m)

print("Starting generation of 39 master segments...")
