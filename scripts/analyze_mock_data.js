const fs = require('fs');

const content = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');

// We can load the file via ts-node or dynamic require or evaluate MOCK_VIDEO_LESSONS
// Let's parse MOCK_VIDEO_LESSONS using a small script that transpiles or strips typescript
const cleaned = content
  .replace(/export interface[\s\S]*?(?=export const MOCK_VIDEO_CATEGORIES)/, '')
  .replace(/export const MOCK_VIDEO_CATEGORIES: MockVideoCategory\[\] =/, 'const MOCK_VIDEO_CATEGORIES =')
  .replace(/export const MOCK_VIDEO_LESSONS: MockVideoLesson\[\] =/, 'const MOCK_VIDEO_LESSONS =');

const sandbox = {};
const fn = new Function('exports', cleaned + '\nreturn { MOCK_VIDEO_CATEGORIES, MOCK_VIDEO_LESSONS };');
const res = fn({});

console.log('Categories count:', res.MOCK_VIDEO_CATEGORIES.length);
console.log('Lessons count:', res.MOCK_VIDEO_LESSONS.length);

res.MOCK_VIDEO_LESSONS.forEach((lesson, i) => {
  console.log(`\nLesson ${i + 1}:`);
  console.log(`  id: ${lesson.id}`);
  console.log(`  slug: ${lesson.slug}`);
  console.log(`  title: ${lesson.title}`);
  console.log(`  externalId: ${lesson.externalId}`);
  console.log(`  cefrLevel: ${lesson.cefrLevel}`);
  console.log(`  segmentsCount: ${lesson.segments.length}`);
  const firstSeg = lesson.segments[0];
  const lastSeg = lesson.segments[lesson.segments.length - 1];
  console.log(`  firstSeg: [${firstSeg.startTime}s - ${firstSeg.endTime}s] "${firstSeg.text.substring(0, 40)}..."`);
  console.log(`  lastSeg: [${lastSeg.startTime}s - ${lastSeg.endTime}s] "${lastSeg.text.substring(0, 40)}..."`);
});
