import re
import json

def calc_tokenize_count(text, proper_nouns=None):
    if proper_nouns is None:
        proper_nouns = []
    normalized = text
    # Replace em-dashes with spaces
    normalized = re.sub(r'\s*—\s*', ' ', normalized)
    # Split by whitespace
    raw_tokens = [tok for tok in normalized.strip().split() if tok]
    count = 0
    for tok in raw_tokens:
        clean = re.sub(r'^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$', '', tok)
        # Check if it has letters or numbers
        if clean and re.search(r'[a-zA-Z0-9]', clean):
            count += 1
    return count

# Let's verify calc_tokenize_count logic against DictationWorkspace
sample = "Will you or will you not go out with me? — Okay, fine! I'll go out with you! — Well, don't do me any favors."
print("Sample tokens:", calc_tokenize_count(sample))
