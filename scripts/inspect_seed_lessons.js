const fs = require('fs');

const content = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
const lines = content.split('\n');

const lessons = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('slug:') && lines[i].includes('"') && !lines[i].includes('categorySlug') && !lines[i].includes('playlistSlug')) {
    const slugMatch = lines[i].match(/slug:\s*"([^"]+)"/);
    if (slugMatch) {
      let title = '', extId = '', cat = '', segCount = 0;
      for (let j = i; j < Math.min(lines.length, i + 30); j++) {
        const tm = lines[j].match(/title:\s*"([^"]+)"/);
        if (tm && !title) title = tm[1];
        const em = lines[j].match(/externalId:\s*"([^"]+)"/);
        if (em && !extId) extId = em[1];
        const cm = lines[j].match(/categorySlug:\s*"([^"]+)"/);
        if (cm && !cat) cat = cm[1];
      }
      if (extId) {
        lessons.push({ slug: slugMatch[1], title, extId, cat, line: i + 1 });
      }
    }
  }
}

console.log('Found in seed_video_ecosystem.ts:', lessons.length, 'lessons');
lessons.forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.extId}] (${l.cat}) "${l.title}" (slug: ${l.slug})`);
});
