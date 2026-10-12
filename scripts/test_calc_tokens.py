import re

def calc_tokenize_count(sentence):
    if not sentence:
        return 0
    raw_words = sentence.strip().split()
    tokens = []
    for raw_word in raw_words:
        # Match leading non-alphanumeric
        m_lead = re.match(r'^([^a-zA-Z0-9]*)', raw_word)
        lead_len = len(m_lead.group(1)) if m_lead else 0
        # Match trailing non-alphanumeric
        m_trail = re.search(r'([^a-zA-Z0-9]*)$', raw_word)
        trail_len = len(m_trail.group(1)) if m_trail else 0
        
        clean = raw_word[lead_len: len(raw_word) - trail_len]
        if len(clean) > 0:
            tokens.append(clean)
    return len(tokens)

s0 = "So where is the new home? — I'm so glad you're home."
print("s0 count:", calc_tokenize_count(s0))
