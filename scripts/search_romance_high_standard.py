import subprocess
import json
import os

QUERIES = [
    # About Time
    "About Time movie scenes Tim and Mary romance",
    "About Time best romantic scenes Tim Mary",
    "About Time full scene Tim and Mary meeting",
    "About Time movie emotional scenes",
    
    # Before Sunrise / Before Sunset
    "Before Sunrise best conversation scenes Vienna",
    "Before Sunrise train listening booth scene",
    "Before Sunrise walking talking full scene",
    "Before Sunset romantic conversation Paris",
    
    # La La Land
    "La La Land best romantic scenes Seb and Mia",
    "La La Land planetarium observatory dance scene",
    "La La Land Seb and Mia full romantic scene",
    "La La Land City of Stars full scene",
    
    # The Notebook
    "The Notebook best scenes Noah and Allie romance",
    "The Notebook romantic scenes Noah Allie",
    "The Notebook if you're a bird I'm a bird full scene",
    "The Notebook rowboat rain scene full",
    
    # Pride and Prejudice
    "Pride and Prejudice 2005 best romantic scenes Darcy Elizabeth",
    "Pride and Prejudice Elizabeth Darcy dawn scene full",
    "Pride and Prejudice Pemberley conversation scene",
    
    # Me Before You
    "Me Before You Lou and Will best romantic scenes",
    "Me Before You Will and Lou concert dance scene",
    "Me Before You wedding dance scene",
    
    # Her
    "Her 2013 Theodore Samantha conversations best scenes",
    "Her Joaquin Phoenix Samantha romantic scenes",
    
    # 500 Days of Summer
    "500 Days of Summer Tom and Summer best scenes",
    "500 Days of Summer record store park scene",
    
    # Titanic
    "Titanic Jack and Rose romance best scenes",
    "Titanic Jack and Rose flying scene extended",
    "Titanic Jack draws Rose full conversation",
    
    # Eternal Sunshine
    "Eternal Sunshine of the Spotless Mind Joel Clementine best scenes",
    "Eternal Sunshine Montauk beach house scene",
    
    # Notting Hill
    "Notting Hill Will and Anna best romantic scenes",
    "Notting Hill garden bench romantic scene",
    "Notting Hill dinner party scene",
    
    # Flipped
    "Flipped Bryce and Juli best scenes romance",
    "Flipped 2010 tree basket boy scenes",
    
    # Other iconic romantic films if needed
    "A Walk to Remember best romantic scenes Landon Jamie",
    "One Day Dexter and Emma romance best scenes",
    "Love Actually best romantic scenes"
]

def search_candidates():
    candidates = []
    seen_ids = set()

    for q in QUERIES:
        print(f"Searching: '{q}'...")
        cmd = [
            "yt-dlp", "--no-update",
            f"ytsearch10:{q}",
            "--dump-json",
            "--no-playlist"
        ]
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            for line in res.stdout.splitlines():
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                    vid = data.get("id")
                    if not vid or vid in seen_ids:
                        continue
                    seen_ids.add(vid)
                    
                    duration = data.get("duration", 0)
                    views = data.get("view_count", 0)
                    likes = data.get("like_count", 0)
                    title = data.get("title", "")
                    
                    if duration >= 300 and (views or 0) >= 100000:
                        candidates.append({
                            "id": vid,
                            "title": title,
                            "duration": duration,
                            "duration_min": round(duration / 60, 2),
                            "views": views,
                            "likes": likes,
                            "query": q
                        })
                        print(f"  -> MATCH: [{round(duration/60,1)}m | {views:,} views | {likes:,} likes] {vid} - {title}")
                except Exception:
                    pass
        except Exception as e:
            print(f"  Error on query {q}: {e}")

    # Sort by views / likes descending
    candidates.sort(key=lambda x: (x.get("likes") or 0, x.get("views") or 0), reverse=True)
    
    with open("scripts/romance_candidates_5m_100k.json", "w", encoding="utf-8") as f:
        json.dump(candidates, f, indent=2)
        
    print(f"\nFound {len(candidates)} candidates matching duration >= 5m AND views >= 100k!")

if __name__ == "__main__":
    search_candidates()
