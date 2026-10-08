import fs from 'fs';

const content = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');
const lines = content.split('\n');

const lessonIndices: { line: number, slug?: string, title?: string, extId?: string }[] = [];

for (let i = 0; i < lines.length; i++) {
  // Lesson objects in MOCK_VIDEO_LESSONS start with {
  if (lines[i].match(/^\s*\{/) && i > 110) {
    // Check if next 5 lines contain "id": or id:
    let isLesson = false;
    let slug = '';
    let title = '';
    let extId = '';
    for (let j = i; j < Math.min(lines.length, i + 10); j++) {
      if (lines[j].includes('slug":') || lines[j].includes('slug:')) {
        isLesson = true;
        const m = lines[j].match(/slug["']?:\s*"([^"]+)"/);
        if (m) slug = m[1];
      }
      if (lines[j].includes('title":') || lines[j].includes('title:')) {
        const m = lines[j].match(/title["']?:\s*"([^"]+)"/);
        if (m) title = m[1];
      }
      if (lines[j].includes('externalId":') || lines[j].includes('externalId:')) {
        const m = lines[j].match(/externalId["']?:\s*"([^"]+)"/);
        if (m) extId = m[1];
      }
    }
    if (isLesson) {
      lessonIndices.push({ line: i + 1, slug, title, extId });
    }
  }
}

console.log('Detected lessons and start lines:');
lessonIndices.forEach((l, idx) => {
  console.log(`${idx + 1}. Line ${l.line}: extId=${l.extId} slug=${l.slug}`);
});
