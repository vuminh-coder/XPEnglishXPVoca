const fs = require('fs');

const seed = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

const regex = /externalId:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g;
let m;
console.log('Lessons currently in seed_video_ecosystem.ts:');
while ((m = regex.exec(seed)) !== null) {
  console.log(`- ${m[1]} | ${m[2]}`);
}
