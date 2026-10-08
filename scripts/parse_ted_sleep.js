const fs = require('fs');

const path = 'C:/Users/VU VAN MINH/.gemini/antigravity/brain/7d866991-13ab-4ac5-a059-a84d168ebc18/.system_generated/steps/4117/content.md';
const content = fs.readFileSync(path, 'utf8');

// check for script tags
const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let i = 0;
while ((match = regex.exec(content)) !== null) {
  const inner = match[1].trim();
  if (inner.includes('transcript') || inner.includes('paragraphs') || inner.includes('cues')) {
    console.log(`Script ${i} length:`, inner.length);
    console.log(`Script ${i} snippet:`, inner.substring(0, 300));
  }
  i++;
}
