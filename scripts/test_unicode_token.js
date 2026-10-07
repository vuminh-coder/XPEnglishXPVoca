const rawWord = '"会"';
const leadingMatch = rawWord.match(/^([^a-zA-Z0-9]*)/);
const trailingMatch = rawWord.match(/([^a-zA-Z0-9]*)$/);
const leadingPunc = leadingMatch ? leadingMatch[1] : '';
const trailingPunc = trailingMatch ? trailingMatch[1] : '';
const clean = rawWord.slice(leadingPunc.length, rawWord.length - trailingPunc.length);
console.log('clean:', JSON.stringify(clean));
const targetClean = clean.replace(/[^a-zA-Z0-9']/g, '').toLowerCase();
console.log('targetClean:', JSON.stringify(targetClean));
