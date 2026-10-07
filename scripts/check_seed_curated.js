const fs = require('fs');

const seed = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

const regex = /externalId:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)"/g;
let m;
console.log('CURATED_LESSONS in seed script:');
const matches = seed.match(/externalId:\s*"([^"]+)"/g);
console.log('Total externalIds in seed script:', matches ? matches.length : 0);
if (matches) {
  matches.forEach(m => console.log(' - ' + m));
}
