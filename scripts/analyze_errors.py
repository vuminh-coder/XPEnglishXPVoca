import json

with open('scripts/audit_playback_results.json', 'r', encoding='utf-8') as f:
    results = json.load(f)

errors = [r for r in results if r['playStatus'] == 'ERROR']
print(f"Total: {len(results)}, Errors: {len(errors)}")

with open('scripts/all_errors_breakdown.txt', 'w', encoding='utf-8') as out:
    out.write(f"Total: {len(results)}, Errors: {len(errors)}\n\n")
    for idx, e in enumerate(errors, 1):
        out.write(f"{idx}. [{e['errorCode']}] {e['file']} | id: {e['id']} | extId: {e['externalId']} | {e['title']}\n")

print("Written to scripts/all_errors_breakdown.txt")
