const fs = require('fs');
const { testCandidates } = require('./test_candidate_embeds');

async function main() {
  const data = JSON.parse(fs.readFileSync('scripts/replacement_candidates.json', 'utf-8'));
  const allIds = [];
  const idToItem = {};

  for (const [itemId, cands] of Object.entries(data)) {
    for (const c of cands) {
      allIds.push(c.id);
      if (!idToItem[c.id]) idToItem[c.id] = [];
      idToItem[c.id].push(itemId);
    }
  }

  console.log(`Total unique candidate IDs to test: ${allIds.length}`);

  // Test in chunks of 15
  const chunkSize = 15;
  const verifiedPlayable = {};

  for (let i = 0; i < allIds.length; i += chunkSize) {
    const chunk = allIds.slice(i, i + chunkSize);
    console.log(`Testing chunk ${i / chunkSize + 1} (${chunk.length} videos)...`);
    try {
      const results = await testCandidates(chunk);
      for (const r of results) {
        if (r.playable) {
          verifiedPlayable[r.id] = true;
          console.log(`  [PLAYABLE] ${r.id}`);
        } else {
          console.log(`  [NOT PLAYABLE] ${r.id} (${r.reason})`);
        }
      }
    } catch (err) {
      console.error(`Chunk error:`, err);
    }
  }

  const finalPicks = {};
  for (const [itemId, cands] of Object.entries(data)) {
    const playable = cands.filter(c => verifiedPlayable[c.id]);
    finalPicks[itemId] = playable;
    console.log(`Item ${itemId}: ${playable.length} playable candidates found`);
  }

  fs.writeFileSync('scripts/verified_playable_picks.json', JSON.stringify(finalPicks, null, 2));
  console.log('Saved to scripts/verified_playable_picks.json');
}

main().catch(console.error);
