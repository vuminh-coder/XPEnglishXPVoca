const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../features/listening/data/lessons');
const files = fs.readdirSync(dir).filter(f => f.startsWith('lesson_') && f.endsWith('.ts'));
const lessons = [];
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const idMatch = content.match(/id:\s*["']([^"']+)["']/);
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const catMatch = content.match(/categoryId:\s*["']([^"']+)["']/);
  const durationMatch = content.match(/durationSeconds:\s*(\d+)/);
  const segsMatch = content.match(/orderIndex/g);
  const quizMatch = content.match(/q_[\w]+/g);
  lessons.push({
    file: f,
    id: idMatch ? idMatch[1] : null,
    title: titleMatch ? titleMatch[1].slice(0, 35) : null,
    categoryId: catMatch ? catMatch[1] : null,
    duration: durationMatch ? Number(durationMatch[1]) : 0,
    segments: segsMatch ? segsMatch.length : 0,
    quizzes: quizMatch ? quizMatch.length : 0
  });
});

console.log('Total non-movie lesson files:', lessons.length);
console.table(lessons);

// Group by categoryId
const byCat = {};
lessons.forEach(l => {
  if (!byCat[l.categoryId]) byCat[l.categoryId] = [];
  byCat[l.categoryId].push(l);
});
console.log('\nGrouped by category:');
Object.entries(byCat).forEach(([cat, list]) => {
  console.log(`\n=== Category: ${cat} (${list.length} lessons) ===`);
  list.forEach(l => console.log(`  - [${l.id}] ${l.title} (${l.segments} segs, ${l.quizzes} quiz, ${l.duration}s) -> ${l.file}`));
});
