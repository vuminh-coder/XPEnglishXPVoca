import re
import json

new_segments_text = [
    "From the moment of concept to building a massive factory,",
    "liquid-cooled, energized, permitted in the short time that was done,",
    "that is like superhuman, right?",
    "And as far as I know, there's only one person in the world who could do that.",
    "You know, I mean Elon is singular in this understanding of engineering,",
    "and construction, and large systems, and marshaling resources,",
    "it's unbelievable.",
    "And of course, then his engineering team is extraordinary.",
    "And from the moment that we decided to go,",
    "the planning with our engineering team, our networking team,",
    "our infrastructure computing team, the software team,",
    "all of the preparation in advance.",
    "Then all of the infrastructure, all of the logistics,",
    "and the amount of technology and equipment that came in on that day",
    "to train in 19 days.",
    "19 days!",
    "19 days is incredible.",
    "But it's also kind of nice to just take a step back,",
    "you know how many days 19 days is?",
    "It's just a couple of weeks.",
    "And the mountain of technology, if you're ever to see it, is unbelievable:",
    "all of the wiring and the networking,",
    "just getting this mountain of technology integrated, and all the software.",
    "Incredible, right?",
    "Yeah, so I think what Elon and the xAI team did,",
    "what they achieved is singular, never been done before.",
    "Just to put in perspective:",
    "100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.",
    "A supercomputer that you would build would take normally three years to plan, right?",
    "And then they deliver the equipment and it takes one year to get it all working.",
    "Yes, we're talking about 19 days."
]

# Accurate calibrated timestamps for 31 segments:
# Seg 1: 0.08 - 7.24 (From the moment of concept to building a massive factory,)
# Seg 2: 7.24 - 13.84 (liquid-cooled, energized, permitted in the short time that was done,)
# Seg 3: 13.84 - 16.50 (that is like superhuman, right?)
# Seg 4: 16.50 - 20.40 (And as far as I know, there's only one person in the world who could do that.)
# Seg 5: 20.40 - 25.72 (You know, I mean Elon is singular in this understanding of engineering,)
# Seg 6: 25.72 - 30.00 (and construction, and large systems, and marshaling resources,)
# Seg 7: 30.00 - 31.16 (it's unbelievable.)
# Seg 8: 31.16 - 34.40 (And of course, then his engineering team is extraordinary.)
# Seg 9: 34.40 - 38.28 (And from the moment that we decided to go,)
# Seg 10: 38.28 - 41.80 (the planning with our engineering team, our networking team,)
# Seg 11: 41.80 - 44.12 (our infrastructure computing team, the software team,)
# Seg 12: 44.12 - 47.28 (all of the preparation in advance.)
# Seg 13: 47.28 - 49.72 (Then all of the infrastructure, all of the logistics,)
# Seg 14: 49.72 - 53.00 (and the amount of technology and equipment that came in on that day)
# Seg 15: 53.00 - 56.44 (to train in 19 days.)
# Seg 16: 56.44 - 58.00 (19 days!)
# Seg 17: 58.00 - 60.20 (19 days is incredible.)
# Seg 18: 60.20 - 62.00 (But it's also kind of nice to just take a step back,)
# Seg 19: 62.00 - 64.00 (you know how many days 19 days is?)
# Seg 20: 64.00 - 65.52 (It's just a couple of weeks.)
# Seg 21: 65.52 - 69.48 (And the mountain of technology, if you're ever to see it, is unbelievable:)
# Seg 22: 69.48 - 71.52 (all of the wiring and the networking,)
# Seg 23: 71.52 - 75.72 (just getting this mountain of technology integrated, and all the software.)
# Seg 24: 75.72 - 77.00 (Incredible, right?)
# Seg 25: 77.00 - 80.44 (Yeah, so I think what Elon and the xAI team did,)
# Seg 26: 80.44 - 83.24 (what they achieved is singular, never been done before.)
# Seg 27: 83.24 - 85.28 (Just to put in perspective:)
# Seg 28: 85.28 - 91.50 (100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.)
# Seg 29: 91.50 - 98.84 (A supercomputer that you would build would take normally three years to plan, right?)
# Seg 30: 98.84 - 105.88 (And then they deliver the equipment and it takes one year to get it all working.)
# Seg 31: 105.88 - 109.04 (Yes, we're talking about 19 days.)

calibrated_times = [
    (0.08, 7.24),
    (7.24, 13.84),
    (13.84, 16.50),
    (16.50, 20.40),
    (20.40, 25.72),
    (25.72, 30.00),
    (30.00, 31.16),
    (31.16, 34.40),
    (34.40, 38.28),
    (38.28, 41.80),
    (41.80, 44.12),
    (44.12, 47.28),
    (47.28, 49.72),
    (49.72, 53.00),
    (53.00, 56.44),
    (56.44, 58.00),
    (58.00, 60.20),
    (60.20, 62.00),
    (62.00, 64.00),
    (64.00, 65.52),
    (65.52, 69.48),
    (69.48, 71.52),
    (71.52, 75.72),
    (75.72, 77.00),
    (77.00, 80.44),
    (80.44, 83.24),
    (83.24, 85.28),
    (85.28, 91.50),
    (91.50, 98.84),
    (98.84, 105.88),
    (105.88, 109.04),
]

print(f"Total calibrated segments: {len(calibrated_times)}")
assert len(calibrated_times) == len(new_segments_text)

for idx, (st, et) in enumerate(calibrated_times):
    txt = new_segments_text[idx]
    dur = round(et - st, 2)
    print(f"Seg {idx+1:02d}: [{st:6.2f} - {et:6.2f}] ({dur:4.2f}s) {txt}")
