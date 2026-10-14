import re
import json

old_texts = [
    "Now that you've introduced yourself, the meeting will begin.",
    "During the meeting, you might need to give your opinion on the different agenda items which you are discussing.",
    "You might also need to react to other people's suggestions. How can you do this?",
    "When making suggestions, modal verbs can be very useful. 'Should', 'ought to' or 'might want to' can express something you think is a good idea, but not an obligation:",
    "We ought to give new clients a gift from the company.",
    "We might want to consider looking for another engineer to help with this.",
    "Or: I think we should make this a priority for this month.",
    "'Have to' and 'need to' can express something that is an obligation: We have to improve the way we collect and record sales data.",
    "Or: We need to find a cheaper solution—our budget is very tight.",
    "Remember, you can also use these to make negative suggestions: We shouldn't rush this—we need to think it through carefully. Or: We don't need to hire new staff at the moment."
]

new_segments = [
    {
        "orderIndex": 1,
        "startTime": 235.45,
        "endTime": 241.77,
        "text": "Now that you've introduced yourself, the meeting will begin."
    },
    {
        "orderIndex": 2,
        "startTime": 241.77,
        "endTime": 249.88,
        "text": "During the meeting, you might need to give your opinion on the different agenda items which you are discussing."
    },
    {
        "orderIndex": 3,
        "startTime": 249.88,
        "endTime": 256.35,
        "text": "You might also need to react to other people's suggestions."
    },
    {
        "orderIndex": 4,
        "startTime": 256.35,
        "endTime": 262.45,
        "text": "How can you do this?"
    },
    {
        "orderIndex": 5,
        "startTime": 262.45,
        "endTime": 267.24,
        "text": "When making suggestions, modal verbs can be very useful."
    },
    {
        "orderIndex": 6,
        "startTime": 267.24,
        "endTime": 278.95,
        "text": "'Should', 'ought to' or 'might want to' can express something you think is a good idea, but not an obligation:"
    },
    {
        "orderIndex": 7,
        "startTime": 278.95,
        "endTime": 283.98,
        "text": "We ought to give new clients a gift from the company."
    },
    {
        "orderIndex": 8,
        "startTime": 283.98,
        "endTime": 289.90,
        "text": "We might want to consider looking for another engineer to help with this."
    },
    {
        "orderIndex": 9,
        "startTime": 289.90,
        "endTime": 298.22,
        "text": "Or: I think we should make this a priority for this month."
    },
    {
        "orderIndex": 10,
        "startTime": 298.22,
        "endTime": 305.86,
        "text": "'Have to' and 'need to' can express something that is an obligation:"
    },
    {
        "orderIndex": 11,
        "startTime": 305.86,
        "endTime": 311.11,
        "text": "We have to improve the way we collect and record sales data."
    },
    {
        "orderIndex": 12,
        "startTime": 311.11,
        "endTime": 318.74,
        "text": "Or: We need to find a cheaper solution—our budget is very tight."
    },
    {
        "orderIndex": 13,
        "startTime": 318.74,
        "endTime": 326.24,
        "text": "Remember, you can also use these to make negative suggestions:"
    },
    {
        "orderIndex": 14,
        "startTime": 326.24,
        "endTime": 331.36,
        "text": "We shouldn't rush this—we need to think it through carefully."
    },
    {
        "orderIndex": 15,
        "startTime": 331.36,
        "endTime": 337.66,
        "text": "Or: We don't need to hire new staff at the moment."
    }
]

old_words = re.findall(r'\b[A-Za-z0-9_]+\b', ' '.join(old_texts).lower())
new_words = re.findall(r'\b[A-Za-z0-9_]+\b', ' '.join(s['text'] for s in new_segments).lower())

print(f"Old words: {len(old_words)}")
print(f"New words: {len(new_words)}")
print(f"Exact match: {old_words == new_words}")
