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
      if (cleanLine) currentCue.text = currentCue.text ? currentCue.text + ' ' + cleanLine : cleanLine;
    }
  }
  if (currentCue) cues.push(currentCue);
  return cues;
}

const enCues = parseVtt(enVtt);
const viCues = parseVtt(viVtt);

// Define ideal segments breaking logic
// We can combine cues [startIdx..endIdx]
const segmentDefinitions = [
  // 0: Babel story
  { cues: [0, 1, 2, 3] },
  // 1: Small number
  { cues: [4, 5, 6] },
  // 2: So how did we end up with so many?
  { cues: [7] },
  // 3: Early days
  { cues: [8, 9] },
  // 4: Split into smaller tribes
  { cues: [10, 11, 12] },
  // 5: Isolated from one another
  { cues: [13, 14, 15] },
  // 6: Centuries of living... turned similar dialects into radically different languages
  { cues: [16, 17, 18, 19, 20] },
  // 7: Continuing to divide
  { cues: [21] },
  // 8: Tracing multiple languages back to common ancestor
  { cues: [22, 23, 24] },
  // 9: Language family definition
  { cues: [25, 26] },
  // 10: How do we determine?
  { cues: [27] },
  // 11: Similar sounding words don't tell us much
  { cues: [28] },
  // 12: False cognates or borrowed terms
  { cues: [29, 30] },
  // 13: Grammar, syntax and basic vocabulary
  { cues: [31, 32, 33, 34] },
  // 14: By systematically comparing features...
  { cues: [35, 36, 37] },
  // 15: Linguists can determine relationships and reconstruct earlier languages
  { cues: [38, 39, 40] },
  // 16: Important historical clues
  { cues: [41] },
  // 17: Geographic origins and lifestyles
  { cues: [42, 43, 44] },
  // 18: Two main problems
  { cues: [45, 46] },
  // 19: Problem 1 - Where branches at bottom should end
  { cues: [47, 48, 49] },
  // 20: Chinese dialects vs Spanish and Portuguese
  { cues: [50, 51, 52, 53] },
  // 21: Living languages do not exist in neatly divided categories
  { cues: [54, 55, 56, 57] },
  // 22: Political and national considerations
  { cues: [58, 59, 60] },
  // 23: How many languages are there - 3000 to 8000
  { cues: [61, 62, 63] },
  // 24: Problem 2 - Farther back in time, less evidence
  { cues: [64, 65, 66] },
  // 25: Current division represents limit of reasonable certainty
  { cues: [67, 68, 69] },
  // 26: Presumed not to be related on any level
  { cues: [70, 71] },
  // 27: But this may change
  { cues: [72] },
  // 28: Proposals for super families
  { cues: [73, 74] },
  // 29: Widely accepted vs native languages
  { cues: [75, 76, 77, 78] },
  // 30: Common ancestor through babel of migration
  { cues: [79, 80, 81] },
  // 31: Pay attention
  { cues: [82] },
  // 32: Not as foreign as you think
  { cues: [83] }
];

console.log('Total proposed Master Segments:', segmentDefinitions.length);
const segments = segmentDefinitions.map((def, idx) => {
  const firstCue = enCues[def.cues[0]];
  const lastCue = enCues[def.cues[def.cues.length - 1]];
  const text = def.cues.map(i => enCues[i].text).join(' ').replace(/\s+/g, ' ').trim();
  
  // Find matching VI text
  const viTexts = viCues
    .filter(v => v.end >= firstCue.start && v.start <= lastCue.end)
    .map(v => v.text)
    .filter((v, i, arr) => arr.indexOf(v) === i);
  
  return {
    orderIndex: idx,
    startTime: Number(firstCue.start.toFixed(1)),
    endTime: Number(lastCue.end.toFixed(1)),
    text,
    rawVi: viTexts.join(' ')
  };
});

segments.forEach(s => {
  console.log(`[${s.orderIndex}] ${s.startTime}s - ${s.endTime}s: "${s.text}"`);
});

fs.writeFileSync('scripts/alex_segments_raw.json', JSON.stringify(segments, null, 2), 'utf8');
