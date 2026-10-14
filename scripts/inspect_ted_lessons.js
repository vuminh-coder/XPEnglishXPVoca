const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../features/listening/data/lessons');
const tedFiles = [
  'lesson_alex_gendler_languages.ts',
  'lesson_julian_treasure.ts',
  'lesson_matt_walker_sleep.ts',
  'lesson_ted_bilingual_brain.ts',
  'lesson_ted_science_habits.ts'
];

tedFiles.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const ytMatch = c.match(/externalId:\s*['"]([^'"]+)['"]/);
  const durMatch = c.match(/durationSeconds:\s*(\d+)/);
  const titleMatch = c.match(/title:\s*['"]([^'"]+)['"]/);
  const segsMatch = c.match(/orderIndex/g);
  console.log(f, {
    ytId: ytMatch ? ytMatch[1] : null,
    dur: durMatch ? durMatch[1] : null,
    segs: segsMatch ? segsMatch.length : 0,
    title: titleMatch ? titleMatch[1] : null
  });
});
