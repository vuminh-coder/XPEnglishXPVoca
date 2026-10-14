const fs = require('fs');

const code = fs.readFileSync('features/listening/data/lessons/movies/animation/lesson_up.ts', 'utf8');

// Match each segment object
const regex = /"orderIndex":\s*(\d+),[\s\S]*?"text":\s*"([^"]+)",[\s\S]*?"tokenCount":\s*(\d+)/g;
let m;
while ((m = regex.exec(code)) !== null) {
  const order = m[1];
  const text = m[2];
  const declared = parseInt(m[3]);
  const jsTokens = text.match(/\b[A-Za-z0-9_]+\b/g) || [];
  if (declared !== jsTokens.length) {
    console.log(`Segment ${order}: declared ${declared} vs JS tokens ${jsTokens.length}`);
    console.log(`Text: ${text}`);
    console.log(`Tokens:`, jsTokens);
  }
}
