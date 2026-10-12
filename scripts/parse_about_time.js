const fs = require('fs');

const content = fs.readFileSync('C:/Users/VU VAN MINH/.gemini/antigravity/brain/75160da0-6646-41c9-817c-8e932ebd6caa/.system_generated/steps/1474/content.md', 'utf8');

const regex = /data-cue-idx="(\d+)"[^>]*>([^<]+)<\/p>/g;
let m;
const cues = [];
while ((m = regex.exec(content)) !== null) {
  const idx = parseInt(m[1], 10);
  if (idx >= 1705 && idx <= 1905) {
    cues.push({ idx, text: m[2].trim() });
  }
}

// Group cues by idx
const grouped = {};
for (const c of cues) {
  if (!grouped[c.idx]) grouped[c.idx] = [];
  grouped[c.idx].push(c.text);
}

const lines = Object.entries(grouped).map(([idx, arr]) => ({
  idx: parseInt(idx, 10),
  text: arr.join(' ').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
}));

fs.writeFileSync('scripts/about_time_lines.json', JSON.stringify(lines, null, 2));
console.log('Saved', lines.length, 'lines from', lines[0]?.idx, 'to', lines[lines.length - 1]?.idx);
