import re

def tokenize(text):
    clean = re.sub(r'[\.,!?;"—–\(\)\[\]]', '', text)
    tokens = [w for w in clean.strip().split() if w]
    return len(tokens)

segments_text = [
    ("And what about Mr. Wickham? What excuse can you give to your behavior towards him?", 165.5, 169.6),
    ("You take an eager interest in that gentleman's concerns.", 169.6, 171.2),
    ("He told me of his misfortunes.", 171.2, 172.6),
    ("Oh, yes, his misfortunes have been very great indeed.", 172.6, 175.0),
    ("You ruin his chances, and yet you treat him with sarcasm?", 175.0, 177.8),
    ("So this is your opinion of me. Thank you for explaining so fully.", 178.0, 182.6),
    ("Perhaps these offenses might have been overlooked had not your pride been hurt by my honesty in admitting scruples about our relationship.", 182.6, 187.9),
    ("Could you expect me to rejoice in the inferiority of your circumstances?", 187.9, 192.0),
    ("And those are the words of a gentleman?!", 192.0, 194.2),
    ("From the first moment I met you, your arrogance and conceit, your selfish disdain for the feelings of others made me realize that you were the last man in the world I could ever be prevailed upon to marry.", 194.2, 203.9),
    ("Forgive me, madam, for taking up so much of your time.", 216.8, 220.5)
]

for idx, (t, s, e) in enumerate(segments_text, 45):
    tc = tokenize(t)
    print(f"Index {idx} ({s} - {e}) [Tokens: {tc}]: {t}")
