import json

with open('scripts/all_50_notebook_segments.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

with open('scripts/notebook_sentence_clusters.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

print(f"Total segments: {len(segments)}")
print(f"Total clusters: {len(clusters)}")

print("\n--- ALL CLUSTERS ---")
for idx, c in enumerate(clusters):
    print(f"Cluster {idx:02d} ({c['start']:05.1f}s - {c['end']:05.1f}s): {c['text']}")
