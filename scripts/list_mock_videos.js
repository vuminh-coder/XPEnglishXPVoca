const fs = require('fs');
const text = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');
const idMatches = [...text.matchAll(/id:\s*["']([^"']+)["'],\s*\r?\n\s*slug:\s*["']([^"']+)["'],\s*\r?\n\s*title:\s*["']([^"']+)["']/g)];
idMatches.forEach(m => console.log(m[1], '|', m[2], '|', m[3]));
