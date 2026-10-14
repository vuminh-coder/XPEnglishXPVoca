import json
import re

with open('doctor_consult_auto.en.json3', 'r', encoding='utf-8') as f:
    data = json.load(f)

raw_words = []
events = data.get('events', [])
for ev in events:
    t_base = ev.get('tStartMs', 0)
    segs = ev.get('segs', [])
    for idx_s, s in enumerate(segs):
        w = s.get('utf8', '').replace('\n', ' ').strip()
        t_off = s.get('tOffsetMs', 0)
        t = round((t_base + t_off) / 1000.0, 2)
        if w and w != '[Music]' and 12.0 <= t <= 150.0:
            for sw in w.split():
                raw_words.append({'word': sw, 't': t})

print(f"Total raw words extracted: {len(raw_words)}")

# Candidate 38 segments
segments_plan = [
    # Scene 1: Clinic Reception & Appointment
    ("Receptionist", "Hello."),
    ("Kate", "Hello."),
    ("Receptionist", "What can I do for you today?"),
    ("Kate", "I would like to see Dr. David."),
    ("Receptionist", "Do you have an appointment?"),
    ("Kate", "No, I don't."),
    ("Receptionist", "Dr. David is busy with a patient. If you want to see Dr. David, then you need to make an appointment."),
    ("Kate", "Okay, I would like to make an appointment."),
    ("Receptionist", "Can I have your name and age, please?"),
    ("Kate", "My name is Kate, I am 23."),
    ("Receptionist", "And what is your diagnosis?"),
    ("Kate", "I think I have a fever."),
    ("Receptionist", "Here is your token number. Please wait in the waiting hall. I will let you know when your turn comes."),
    ("Kate", "Fine, thank you."),
    
    # Scene 2: Doctor Consultation
    ("Receptionist", "Token number 23, Miss Kate, it is your turn. Please go to the doctor's room."),
    ("Dr. David", "Hello, Miss Kate."),
    ("Kate", "Hello, Doctor."),
    ("Dr. David", "What is the matter?"),
    ("Kate", "I have a fever, I am not feeling well."),
    ("Dr. David", "Let me examine you. You have a mild fever."),
    ("Kate", "I feel terrible."),
    ("Dr. David", "Let me check your blood pressure level. Roll up your sleeve."),
    ("Dr. David", "Your blood pressure level is fine: 120 over 80. No need to worry, I am prescribing you some medicines."),
    ("Dr. David", "Here is the prescription. Take two tablets thrice a day."),
    ("Kate", "With meal or without meal?"),
    ("Dr. David", "After having meal, you can take your medicine, and have some rest after taking the medicine."),
    ("Kate", "Thank you."),
    ("Dr. David", "Get well soon."),
    
    # Scene 3: Pharmacy Counter
    ("Pharmacist", "Hello."),
    ("Kate", "Hello."),
    ("Pharmacist", "What can I do for you?"),
    ("Kate", "Give me these medicines according to this prescription."),
    ("Pharmacist", "Okay, ma'am, I will be right back."),
    ("Pharmacist", "Here you go."),
    ("Kate", "Thanks. How much is this medicine?"),
    ("Pharmacist", "It costs 8.67."),
    ("Kate", "Here you go."),
    ("Pharmacist", "Here is your change.")
]

w_idx = 0
results = []
for i, (speaker, text) in enumerate(segments_plan):
    text_words = text.split()
    n = len(text_words)
    seg_raw = raw_words[w_idx : w_idx + n]
    
    # Check word match
    for tw, rw in zip(text_words, seg_raw):
        ctw = re.sub(r'[^a-zA-Z0-9]', '', tw).lower()
        crw = re.sub(r'[^a-zA-Z0-9]', '', rw['word']).lower()
        # map ma'am <-> mom
        if ctw == 'maam' and crw == 'mom':
            continue
        if ctw != crw:
            print(f"Mismatch at seg {i} ({speaker}): expected '{ctw}', got '{crw}'")
            break
            
    start_t = seg_raw[0]['t']
    end_t = round(seg_raw[-1]['t'] + 0.8, 2)
    tokens = len(re.findall(r'\b[A-Za-z0-9_]+\b', text))
    
    results.append({
        'orderIndex': i,
        'speaker': speaker,
        'start': start_t,
        'end': end_t,
        'text': text,
        'tokens': tokens
    })
    w_idx += n

print(f"Processed {len(results)} segments, words: {w_idx} / {len(raw_words)}")

# Non-overlap adjustment
for i in range(len(results) - 1):
    next_s = results[i + 1]['start']
    if results[i]['end'] >= next_s:
        results[i]['end'] = round(next_s - 0.05, 2)
    if results[i]['end'] <= results[i]['start']:
        results[i]['end'] = round(results[i]['start'] + 0.5, 2)

for r in results:
    dur = round(r['end'] - r['start'], 2)
    print(f"Seg {r['orderIndex']:2d} [{r['start']:6.2f}s -> {r['end']:6.2f}s] ({dur:4.2f}s, {r['tokens']:2d} tok) [{r['speaker']}]: {r['text']}")
