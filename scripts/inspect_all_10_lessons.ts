import { MOCK_VIDEO_LESSONS } from '../features/listening/data/videoCatalogMockData';
import { ALL_MODULAR_LESSONS } from '../features/listening/data/lessons';

console.log('Testing all 10 lessons resolution:');
ALL_MODULAR_LESSONS.forEach((lesson, idx) => {
  console.log(`\n--- Lesson ${idx + 1}: ${lesson.title} ---`);
  console.log(`  ID: ${lesson.id}`);
  console.log(`  External ID: ${lesson.externalId}`);
  console.log(`  Slug: ${lesson.slug}`);
  console.log(`  Category: [${lesson.categoryId}] ${lesson.categoryName}`);
  console.log(`  Segments: ${lesson.segments.length}`);
  console.log(`  Duration: ${lesson.durationFormatted} (${lesson.durationSeconds}s)`);
  console.log(`  WPM: ${lesson.wpmSpeed}`);
  console.log(`  CEFR: ${lesson.cefrLevel}`);
  console.log(`  First segment: [${lesson.segments[0].startTime}s -> ${lesson.segments[0].endTime}s] "${lesson.segments[0].text}"`);
  const lastIdx = lesson.segments.length - 1;
  console.log(`  Last segment: [${lesson.segments[lastIdx].startTime}s -> ${lesson.segments[lastIdx].endTime}s] "${lesson.segments[lastIdx].text}"`);
});
