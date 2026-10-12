import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

data_p1 = json.load(open('scripts/verified_playable_picks.json', encoding='utf-8'))
data_p2 = json.load(open('scripts/verified_extended_picks.json', encoding='utf-8'))

# Romance is already 100% finished with high standard
romance_12 = [
    {"id": "mov_rom_01", "extId": "iUB-sCiZIUw", "duration": 323, "title": "About Time: Tim Learns the Secret Formula for Happiness Extended"},
    {"id": "mov_rom_02", "extId": "QV1tiEDvkkw", "duration": 819, "title": "The Before Trilogy: Jesse & Céline - Love Over Time"},
    {"id": "mov_rom_03", "extId": "gW0xteHHXrY", "duration": 390, "title": "La La Land: Sebastian & Mia Dinner Confrontation"},
    {"id": "mov_rom_04", "extId": "Y5hVdlRFAUo", "duration": 804, "title": "The Notebook: Noah & Allie 365 Letters & Rain Dock Kiss"},
    {"id": "mov_rom_05", "extId": "baGBRtR53TA", "duration": 604, "title": "Pride & Prejudice: Mr. Darcy Apollo Rain Proposal & Sunrise"},
    {"id": "mov_rom_06", "extId": "sLHx2vVa1HA", "duration": 541, "title": "Me Before You: Louisa & Will - Girl in Red Dress"},
    {"id": "mov_rom_07", "extId": "ESI7jRy2yAk", "duration": 604, "title": "One Day: Emma & Dexter July 15 Love Across 20 Years"},
    {"id": "mov_rom_08", "extId": "AS47hWRO0bw", "duration": 624, "title": "500 Days of Summer: Top 10 Moments & Expectations vs Reality"},
    {"id": "mov_rom_09", "extId": "OSqS2ESN_ys", "duration": 321, "title": "Titanic: Jack & Rose 'I'll Never Let Go' & Whistle Rescue"},
    {"id": "mov_rom_10", "extId": "9lo1ncSInLI", "duration": 315, "title": "Eternal Sunshine: Meet Me in Montauk - Joel & Clementine"},
    {"id": "mov_rom_11", "extId": "sM4rv42qyvk", "duration": 377, "title": "Notting Hill: The Ritz Press Conference & Wedding"},
    {"id": "mov_rom_12", "extId": "KTUvOpY89RE", "duration": 335, "title": "Flipped: Bryce & Juli The Ancient Sycamore Tree"}
]

# Sitcoms: 8 existing passed + 4 new
sitcoms_pass = {
    "mov_sit_01": {"extId": "v1xXlxDHWPU", "duration": 313, "title": "Friends: The Iconic Apartment Bet Trivia Game"},
    "mov_sit_02": {"extId": "xT5zt93BbAg", "duration": 492, "title": "Friends: The Very Best of Chandler Bing's Sarcasm"},
    "mov_sit_03": {"extId": "qMNsPjt7L4M", "duration": 710, "title": "Modern Family: The Best of Phil Dunphy Best Dad Ever"},
    "mov_sit_04": {"extId": "72okAeSn5Tc", "duration": 888, "title": "Modern Family: Gloria's Funniest Language Struggles"},
    "mov_sit_05": {"extId": "Xnk4seEHmgw", "duration": 722, "title": "The Office (US): Jim Halpert's 15-Minute Ultimate Pranks"},
    "mov_sit_06": {"extId": "Db1NdYbQhAA", "duration": 908, "title": "The Office (US): Michael Scott's Best Conference Meetings"},
    "mov_sit_10": {"extId": "EKEEalhsDOA", "duration": 1888, "title": "Young Sheldon Outsmarting Everyone (Debates & Science)"},
    "mov_sit_12": {"extId": "S_acAHyAKuI", "duration": 315, "title": "Schitt's Creek: Alexis Rose & Moira's Most Iconic Dinners"}
}

# Inspirational: 1 existing passed
inspirational_pass = {
    "mov_insp_11": {"extId": "p9DQSnik1mw", "duration": 489, "title": "Scent of a Woman: Al Pacino's Iconic Final Speech"}
}

def get_candidates(item_id):
    c1 = data_p1.get(item_id, [])
    c2 = data_p2.get(item_id, [])
    # Merge unique
    seen = set()
    combined = []
    for c in c1 + c2:
        if c['id'] not in seen:
            seen.add(c['id'])
            combined.append(c)
    return combined

print("=== CANDIDATES AVAILABILITY CHECK ===")
items_to_pick = [
    # Sitcoms (4)
    "mov_sit_07", "mov_sit_08", "mov_sit_09", "mov_sit_11",
    # Inspirational (11)
    "mov_insp_01", "mov_insp_02", "mov_insp_03", "mov_insp_04", "mov_insp_05", 
    "mov_insp_06", "mov_insp_07", "mov_insp_08", "mov_insp_09", "mov_insp_10", "mov_insp_12",
    # Animation (12)
    "mov_ani_01", "mov_ani_02", "mov_ani_03", "mov_ani_04", "mov_ani_05", "mov_ani_06",
    "mov_ani_07", "mov_ani_08", "mov_ani_09", "mov_ani_10", "mov_ani_11", "mov_ani_12"
]

all_picks = {}

for it in items_to_pick:
    cands = get_candidates(it)
    # Filter only duration >= 300 and views >= 100k
    valid = [c for c in cands if c['duration'] >= 300 and c['views'] >= 100000]
    # Sort by views descending
    valid.sort(key=lambda x: x['views'], reverse=True)
    if valid:
        best = valid[0]
        all_picks[it] = best
        print(f"[{it}] OK -> {best['id']} ({best['duration']}s / {best['duration']//60}:{best['duration']%60:02d} | {best['views']:,} views) - {best['title']}")
    else:
        print(f"[{it}] ERROR: NO VALID PLAYABLE CANDIDATE FOUND! (total raw cands: {len(cands)})")

with open('scripts/final_27_replacements_selected.json', 'w', encoding='utf-8') as f:
    json.dump(all_picks, f, indent=2, ensure_ascii=False)
