const fs = require('fs');
const path = require('path');

const movieDirs = [
  'features/listening/data/lessons/movies/romance',
  'features/listening/data/lessons/movies/inspirational',
  'features/listening/data/lessons/movies/sitcoms',
  'features/listening/data/lessons/movies/animation',
];

movieDirs.forEach(dir => {
  const files = fs.readdirSync(dir).filter(f => f.startsWith('lesson_') && f.endsWith('.ts'));
  console.log(`\n=== ${dir} (${files.length} files) ===`);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    const content = fs.readFileSync(fullPath, 'utf8');
    const orderIndices = [...content.matchAll(/["']?orderIndex["']?:\s*(\d+)/g)].map(m => parseInt(m[1]));
    const refIndices = [...content.matchAll(/["']?referenceSegmentIndex["']?:\s*(\d+)/g)].map(m => parseInt(m[1]));
    console.log(`  ${f}: segs ${orderIndices[0]}..${orderIndices[orderIndices.length - 1]} (${orderIndices.length}) | refs: [${refIndices.join(',')}]`);
  });
});
