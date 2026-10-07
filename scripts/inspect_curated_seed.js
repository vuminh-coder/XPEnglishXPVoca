const fs = require('fs');

const content = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
const lines = content.split('\n');

const curated = [];
let current = null;
let inCurated = false;

for (const line of lines) {
  if (line.includes('const CURATED_LESSONS: SeedLesson[] = [')) {
    inCurated = true;
  }
  if (!inCurated) continue;
  if (line.trim() === '];') {
    inCurated = false;
    break;
  }
  const slugMatch = line.match(/^\s*slug:\s*["']([^"']+)["']/);
  const titleMatch = line.match(/^\s*title:\s*["']([^"']+)["']/);
  const extMatch = line.match(/^\s*externalId:\s*["']([^"']+)["']/);
  if (slugMatch) {
    current = { slug: slugMatch[1] };
    curated.push(current);
  }
  if (current && titleMatch && !current.title) current.title = titleMatch[1];
  if (current && extMatch && !current.externalId) current.externalId = extMatch[1];
}

console.log('CURATED_LESSONS count:', curated.length);
curated.forEach((c, idx) => {
  console.log(`[${idx + 1}] slug: ${c.slug} | externalId: ${c.externalId} | title: ${c.title}`);
});
