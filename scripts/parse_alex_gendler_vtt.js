const fs = require('fs');
const path = require('path');

const enVtt = fs.readFileSync(path.join(__dirname, 'alex_gendler_sub.en.vtt'), 'utf8');
const viVtt = fs.readFileSync(path.join(__dirname, 'alex_gendler_sub.vi.vtt'), 'utf8');

function parseVtt(content) {
  const lines = content.split(/\r?\n/);
  const cues = [];
  let currentCue = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const timeMatch = line.match(/^(\d{2}:)?(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}:)?(\d{2}):(\d{2})\.(\d{3})/);
    if (timeMatch) {
      if (currentCue) cues.push(currentCue);
      const startS = (parseInt(timeMatch[1] || '0') * 3600) + (parseInt(timeMatch[2]) * 60) + parseInt(timeMatch[3]) + (parseInt(timeMatch[4]) / 1000);
      const endS = (parseInt(timeMatch[5] || '0') * 3600) + (parseInt(timeMatch[6]) * 60) + parseInt(timeMatch[7]) + (parseInt(timeMatch[8]) / 1000);
      currentCue = { start: startS, end: endS, text: '' };
    } else if (currentCue && line && !line.includes('NOTE') && !line.startsWith('WEBVTT')) {
      const cleanLine = line.replace(/<[^>]+>/g, '').trim();
      if (cleanLine) {
        currentCue.text = currentCue.text ? currentCue.text + ' ' + cleanLine : cleanLine;
      }
    }
  }
  if (currentCue) cues.push(currentCue);
  return cues;
}

const enCues = parseVtt(enVtt);
const viCues = parseVtt(viVtt);

console.log('EN Cues count:', enCues.length);
console.log('VI Cues count:', viCues.length);
console.log('\nFirst 5 EN Cues:');
enCues.slice(0, 5).forEach((c, i) => console.log(`[${i}] ${c.start.toFixed(1)}s -> ${c.end.toFixed(1)}s: "${c.text}"`));
console.log('\nLast 5 EN Cues:');
enCues.slice(-5).forEach((c, i) => console.log(`[${enCues.length - 5 + i}] ${c.start.toFixed(1)}s -> ${c.end.toFixed(1)}s: "${c.text}"`));
