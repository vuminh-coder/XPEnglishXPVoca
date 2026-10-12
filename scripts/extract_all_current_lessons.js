const fs = require('fs');
const path = require('path');

function getTsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getTsFiles(fullPath));
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts') && file !== 'index.ts' && file !== 'types.ts') {
      results.push(fullPath);
    }
  });
  return results;
}

const lessonsDir = path.resolve('features/listening/data/lessons');
const files = getTsFiles(lessonsDir);
console.log(`Found ${files.length} lesson files.`);

const lessons = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const extIdMatch = content.match(/["']?externalId["']?:\s*["']([a-zA-Z0-9_-]{11})["']/);
  const titleMatch = content.match(/["']?title["']?:\s*["']([^"']+)["']/);
  const idMatch = content.match(/["']?id["']?:\s*["']([^"']+)["']/);

  if (extIdMatch) {
    lessons.push({
      file: path.relative(process.cwd(), f),
      id: idMatch ? idMatch[1] : 'unknown',
      title: titleMatch ? titleMatch[1] : 'unknown',
      externalId: extIdMatch[1]
    });
  } else {
    console.warn(`No externalId found in: ${f}`);
  }
});

console.log(`Extracted ${lessons.length} lessons with externalId.`);
fs.writeFileSync('scripts/current_active_lessons.json', JSON.stringify(lessons, null, 2));
console.log('Saved to scripts/current_active_lessons.json');
