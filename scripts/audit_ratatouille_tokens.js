const fs = require('fs');

function tokenizeSentence(sentence, properNouns = []) {
  const words = sentence.split(/\s+/).filter(Boolean);
  return words.map((rawWord) => {
    const match = rawWord.match(/^([^a-zA-Z0-9]*)(.*?)([^a-zA-Z0-9]*)$/);
    const prefix = match ? match[1] : '';
    const clean = match ? match[2] : rawWord;
    const suffix = match ? match[3] : '';

    const isProper = properNouns.some((pn) =>
      clean.toLowerCase() === pn.toLowerCase() ||
      rawWord.toLowerCase().includes(pn.toLowerCase())
    );

    return {
      raw: rawWord,
      clean,
      prefix,
      suffix,
      isProper,
      dots: '.'.repeat(clean.length),
    };
  });
}

const lessonCode = fs.readFileSync('features/listening/data/lessons/lesson_ratatouille_anton_ego.ts', 'utf8');

const segRegex = /text:\s*"([^"]+)",[\s\S]*?properNouns:\s*\[([^\]]*)\],/g;
let match;
let idx = 0;
while ((match = segRegex.exec(lessonCode)) !== null) {
  const text = match[1];
  const pns = match[2] ? match[2].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean) : [];
  const tokens = tokenizeSentence(text, pns);
  console.log(`\nSegment #${idx}: "${text}"`);
  console.log(`Proper nouns: [${pns.join(', ')}]`);
  console.log(`Tokens count: ${tokens.length}`);
  const displayTokens = tokens.map(t => `${t.prefix}${t.isProper ? '['+t.clean+']' : t.dots}${t.suffix}`).join(' ');
  console.log(`Masked display: ${displayTokens}`);
  idx++;
}
