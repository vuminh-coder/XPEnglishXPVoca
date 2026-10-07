const fs = require('fs');

const content = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');
const regex = /id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g;
let match;
console.log('MOCK VIDEO LESSONS:');
while ((match = regex.exec(content)) !== null) {
  console.log(`- ${match[1]} | ${match[2]} | ${match[3]}`);
}
