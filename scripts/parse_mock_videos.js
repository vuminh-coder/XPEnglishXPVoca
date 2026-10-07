const fs = require('fs');

const file = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');
const lines = file.split('\n');

const lessons = [];
let current = null;

for (const line of lines) {
  const idMatch = line.match(/^\s*id:\s*["']([^"']+)["']/);
  const titleMatch = line.match(/^\s*title:\s*["']([^"']+)["']/);
  const extMatch = line.match(/^\s*externalId:\s*["']([^"']+)["']/);
  const durMatch = line.match(/^\s*durationFormatted:\s*["']([^"']+)["']/);
  const levelMatch = line.match(/^\s*cefrLevel:\s*["']([^"']+)["']/);

  if (idMatch && !line.includes('cat_')) {
    current = { id: idMatch[1] };
    lessons.push(current);
  }
  if (current && titleMatch && !current.title) current.title = titleMatch[1];
  if (current && extMatch && !current.externalId) current.externalId = extMatch[1];
  if (current && durMatch && !current.duration) current.duration = durMatch[1];
  if (current && levelMatch && !current.cefrLevel) current.cefrLevel = levelMatch[1];
}

console.log('MOCK_VIDEO_LESSONS count:', lessons.length);
lessons.forEach((l, idx) => {
  console.log(`[${idx + 1}] ID: ${l.id} | ExternalId: ${l.externalId} | Level: ${l.cefrLevel} | Title: ${l.title}`);
});
