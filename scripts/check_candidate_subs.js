const { execSync } = require('child_process');

const candidates = [
  { id: 'h6fcK_fRYaI', title: 'The Egg - A Short Story | Kurzgesagt' },
  { id: 'f4OZmJ93yqk', title: 'What is depression? | TED-Ed' },
  { id: 'kP15q815Saw', title: 'How memories form | TED-Ed' },
  { id: 'rBdanm0Dnu8', title: 'Business English Phone Call' },
  { id: '1b8U1l30l98', title: 'IELTS Listening Academic Lecture' }
];

candidates.forEach(c => {
  try {
    const out = execSync(`yt-dlp --list-subs https://www.youtube.com/watch?v=${c.id}`, { encoding: 'utf8', timeout: 15000 });
    console.log(`\n=== ${c.title} (${c.id}) ===`);
    const lines = out.split('\n').filter(l => l.includes('en') || l.includes('English'));
    console.log(lines.slice(0, 5).join('\n'));
  } catch (err) {
    console.log(`Error checking ${c.id}: ${err.message}`);
  }
});
