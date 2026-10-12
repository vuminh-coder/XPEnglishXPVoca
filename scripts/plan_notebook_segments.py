import json

# Load extracted words
with open('scripts/notebook_extracted_words.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

print(f"Total words: {len(words)}")

# Script to carefully structure the segments covering 100% of the speech
# We will design 45-50 well-crafted segments covering:
# Scene 1: Ferris Wheel (0.0s - 105.0s) ~ 8 segments
# Scene 2: Street Walk & Crossroad (105.0s - 215.0s) ~ 8 segments
# Scene 3: The House Reunion (220.0s - 350.0s) ~ 7 segments
# Scene 4: Swan Lake Boat Ride & Rain Kiss (420.0s - 470.0s) ~ 5 segments
# Scene 5: Morning Argument & Broken Promises (505.0s - 565.0s) ~ 7 segments
# Scene 6: "We Fight" & "What Do You Want?!" (565.0s - 660.0s) ~ 9 segments
# Scene 7: The Letter & Elderly Memory Climax (720.0s - 804.0s) ~ 6 segments
# Total ~ 50 segments!
