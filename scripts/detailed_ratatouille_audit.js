const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ratatouille_ego.en.json3', 'utf8'));

console.log('--- ALL SUBTITLE EVENTS IN JSON3 ---');
const rawEvents = [];
raw.events.forEach((ev, i) => {
  const segText = ev.segs ? ev.segs.map(s => s.utf8).join('') : '';
  const start = ev.tStartMs / 1000;
  const dur = (ev.dDurationMs || 0) / 1000;
  const end = start + dur;
  rawEvents.push({ i, start, end, dur, text: segText.replace(/\n/g, ' ').trim() });
  console.log(`Event #${i} [${start.toFixed(2)}s - ${end.toFixed(2)}s] (${dur.toFixed(2)}s): "${segText.replace(/\n/g, ' ').trim()}"`);
  if (ev.segs && ev.segs.length > 1) {
    ev.segs.forEach((s, si) => {
      if (s.utf8 && s.utf8.trim()) {
        const wordOffset = (ev.tStartMs + (s.tOffsetMs || 0)) / 1000;
        console.log(`    word[${si}] at ${wordOffset.toFixed(2)}s: "${s.utf8.trim()}"`);
      }
    });
  }
});

console.log('\n--- LESSON SEGMENTS ---');
const lessonCode = fs.readFileSync('features/listening/data/lessons/lesson_ratatouille_anton_ego.ts', 'utf8');

// Parse segments from lesson
const segmentBlocks = lessonCode.split(/orderIndex:\s*\d+/g).slice(1);
segmentBlocks.forEach((block, idx) => {
  const startMatch = block.match(/startTime:\s*([\d.]+)/);
  const endMatch = block.match(/endTime:\s*([\d.]+)/);
  const textMatch = block.match(/text:\s*"([^"]+)"/);
  const properNounsMatch = block.match(/properNouns:\s*\[([^\]]*)\]/);
  const ipaMatch = block.match(/ipaUs:\s*"([^"]+)"/);
  const transMatch = block.match(/translationVi:\s*"([^"]+)"/);

  console.log(`Lesson Seg #${idx} [${startMatch ? startMatch[1] : '?'}s - ${endMatch ? endMatch[1] : '?'}s]:`);
  console.log(`  Text: "${textMatch ? textMatch[1] : '?'}"`);
  console.log(`  Proper Nouns: [${properNounsMatch ? properNounsMatch[1].trim() : ''}]`);
  console.log(`  IPA: ${ipaMatch ? ipaMatch[1] : '?'}`);
  console.log(`  Vi: ${transMatch ? transMatch[1] : '?'}`);
});
