const fs = require('fs');

const mock = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');

const matches = mock.match(/id:\s*"([^"]+)",[\s\S]*?durationSeconds:\s*(\d+),[\s\S]*?durationFormatted:\s*"([^"]+)",/g);
if (matches) {
  matches.forEach(m => {
    const id = m.match(/id:\s*"([^"]+)"/)[1];
    const durSec = m.match(/durationSeconds:\s*(\d+)/)[1];
    const durFmt = m.match(/durationFormatted:\s*"([^"]+)"/)[1];
    console.log(`${id} -> ${durSec}s (${durFmt})`);
  });
}
