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

console.log('--- ALL EN CUES ---');
enCues.forEach((c, i) => {
  // find closest vi cue
  const vi = viCues.find(v => Math.abs(v.start - c.start) < 2.0);
  console.log(`[${i}] ${c.start.toFixed(1)}s - ${c.end.toFixed(1)}s | EN: "${c.text}" | VI: "${vi ? vi.text : ''}"`);
});
