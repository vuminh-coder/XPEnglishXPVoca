const fs = require('fs');

let seed = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
const id = 'tybKnGZRwcU';
const firstIdx = seed.indexOf(id);
const secondIdx = seed.indexOf(id, firstIdx + 1);

if (secondIdx !== -1) {
  const objStart = seed.lastIndexOf('{', secondIdx);
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < seed.length; i++) {
    if (seed[i] === '{') depth++;
    else if (seed[i] === '}') {
      depth--;
      if (depth === 0) {
        objEnd = i;
        if (seed[objEnd + 1] === ',') objEnd++;
        break;
      }
    }
  }
  seed = seed.substring(0, objStart) + seed.substring(objEnd + 1);
  fs.writeFileSync('scripts/seed_video_ecosystem.ts', seed, 'utf8');
  console.log('Successfully removed duplicate Kurzgesagt from seed_video_ecosystem.ts');
} else {
  console.log('No duplicate found');
}
