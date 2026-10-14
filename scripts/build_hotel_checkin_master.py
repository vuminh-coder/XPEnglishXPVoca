import json
import re

with open('hotel_checkin_auto.en.json3', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Flatten words from json3
raw_words = []
events = data.get('events', [])
for ev in events:
    t_base = ev.get('tStartMs', 0)
    d_dur = ev.get('dDurationMs', 0)
    segs = ev.get('segs', [])
    for idx_s, s in enumerate(segs):
        w = s.get('utf8', '').strip()
        t_off = s.get('tOffsetMs', 0)
        clean_w = w.replace('\n', ' ').strip()
        if clean_w and clean_w != '[Music]':
            # Check if this token contains spaces like "all right."
            sub_words = clean_w.split()
            for sw_idx, sw in enumerate(sub_words):
                raw_words.append({
                    'word': sw,
                    't': round((t_base + t_off) / 1000.0 + (sw_idx * 0.2), 2),
                    'event_dur': round(d_dur / 1000.0, 2)
                })

print(f"Total raw words: {len(raw_words)}")

# Candidate segments definition
# Each segment: (Speaker, Text)
segments_data = [
    ("Receptionist", "Good morning. Welcome to the Transnational Hotel. What can I do for you?"),
    ("Tom", "Good morning. My name is Tom Sanders. I have a reservation for a single room for three nights."),
    ("Receptionist", "All right, Mr. Sanders. Let me pull up your reservation."),
    ("Receptionist", "I can't seem to find a record of your booking. Did you book the room directly through us or do you use a hotel reservation service or a travel agent?"),
    ("Tom", "Well, I booked it directly through you. I've already also paid a deposit on the first night. I have a a reservation number if that helps."),
    ("Receptionist", "Yeah, sure. Can I see that, please? Thank you."),
    ("Receptionist", "Oh, I see. Maybe there was a glitch with the booking system."),
    ("Receptionist", "Well, we don't have any more single rooms available with the exception of one adjoined room, but you would then be right next door to a family with children, which might get noisy."),
    ("Receptionist", "But that's not a problem. I can upgrade you to one of our business suites. They all come with jacuzzi's."),
    ("Tom", "Well, that sounds nice. Uh, but how much more is that going to cost?"),
    ("Receptionist", "That would of course be at no extra charge to you."),
    ("Tom", "Oh, well, thank you."),
    ("Receptionist", "My pleasure."),
    ("Tom", "Uh, what about the wireless internet?"),
    ("Receptionist", "Oh, it's really easy. This is your access code and instructions on how to use it. If you have any problems, feel free to call the front desk."),
    ("Receptionist", "And this is a list of all the hotel amenities like the gym and the indoor pool."),
    ("Tom", "Oh, thank you very much."),
    ("Receptionist", "You're welcome. Has the valet already taken your car or will you be needing a parking pass?"),
    ("Tom", "Oh, I don't have a car. I took a taxi direct from the airport."),
    ("Receptionist", "Oh, all right. Could I have some form of ID, please? And could you just fill out this registration form?"),
    ("Tom", "Sure. Uh, here's my driver's license."),
    ("Receptionist", "Thank you. Oh, you're from San Francisco?"),
    ("Tom", "Yes, I am all the way from the West Coast."),
    ("Receptionist", "I hope you had a good trip."),
    ("Tom", "Yes, I did. Thank you. The flight was long, but it was smooth and I slept almost the whole way."),
    ("Receptionist", "Oh, and is this your first time in the Big Apple?"),
    ("Tom", "Yes, it is. I have a business conference to attend, but I'm looking forward to getting some sightseeing done as well."),
    ("Receptionist", "Well, I'd be more than happy to give you some sightseeing tips if you need any."),
    ("Tom", "Thank you."),
    ("Receptionist", "All right, I've got you all checked into your room. This is your room key. You're in room 653."),
    ("Receptionist", "Just take the elevator on the right up to the sixth floor. When you get off the elevator, turn right."),
    ("Receptionist", "Your room is at the end of the corridor on the left hand side."),
    ("Receptionist", "Just leave your suitcase here and the bell boy will bring it up."),
    ("Tom", "Great. Well, thank you very much."),
    ("Receptionist", "If you need anything, please feel free to dial the front desk. Enjoy your stay."),
    ("Tom", "Thank you."),
    ("Receptionist", "You're welcome.")
]

w_idx = 0
results = []
for i, (speaker, text) in enumerate(segments_data):
    words_in_text = text.split()
    n = len(words_in_text)
    seg_words = raw_words[w_idx : w_idx + n]
    
    # Verify words match
    for w_t, w_r in zip(words_in_text, seg_words):
        cw_t = re.sub(r'[^a-zA-Z0-9]', '', w_t).lower()
        cw_r = re.sub(r'[^a-zA-Z0-9]', '', w_r['word']).lower()
        if cw_t != cw_r:
            print(f"Error at seg {i}: '{cw_t}' != '{cw_r}'")
            break
            
    start_time = seg_words[0]['t']
    # end time can be the last word's time + estimated duration of that word
    end_time = round(seg_words[-1]['t'] + 0.8, 2)
    
    # Calculate token count according to JS regex \b[A-Za-z0-9_]+\b
    js_tokens = re.findall(r'\b[A-Za-z0-9_]+\b', text)
    
    results.append({
        'orderIndex': i,
        'speaker': speaker,
        'start': start_time,
        'end': end_time,
        'text': text,
        'tokenCount': len(js_tokens),
        'wordCount': n
    })
    w_idx += n

print(f"Total processed segments: {len(results)}")
print(f"Total words processed: {w_idx} / {len(raw_words)}")

# Adjust end times so there are no overlaps with next segment's start time
for i in range(len(results) - 1):
    next_start = results[i + 1]['start']
    if results[i]['end'] >= next_start:
        results[i]['end'] = round(next_start - 0.05, 2)
    # Ensure end > start
    if results[i]['end'] <= results[i]['start']:
        results[i]['end'] = round(results[i]['start'] + 0.5, 2)

for r in results:
    dur = round(r['end'] - r['start'], 2)
    print(f"Seg {r['orderIndex']:2d} [{r['start']:6.2f}s -> {r['end']:6.2f}s] ({dur:4.2f}s, {r['tokenCount']:2d} tok) [{r['speaker']}]: {r['text']}")
