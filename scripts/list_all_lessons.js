const fs = require('fs');

const seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
const lines = seedContent.split('\n');

console.log('=== Seed Script CURATED_LESSONS ===');
lines.forEach((l, i) => {
  if (l.trim().startsWith('title:') && !l.includes('pl.title')) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
