const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_18_calibrated.json', 'utf8'));

segments[4].tokenCount = 6;
segments[16].tokenCount = 17;

fs.writeFileSync('scripts/rewrite_the_stars_18_calibrated.json', JSON.stringify(segments, null, 2), 'utf8');
console.log('Fixed token counts in rewrite_the_stars_18_calibrated.json!');
