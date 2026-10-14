import json
import re

with open('scripts/bbc_brain_official.en-GB.json3', 'r', encoding='utf-8') as f:
    data = json.load(f)

events = data.get('events', [])

# We want to break down into pure segments:
# Every single sentence or standalone turn by a single speaker.
# Zero merged utterances: If two people speak in one event, split them.
# Let's inspect events and map each event to segment.

# Let's write out the candidate segments manually or semi-automatically with full verification against audio/captions.
