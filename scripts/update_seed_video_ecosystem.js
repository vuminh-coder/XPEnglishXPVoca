const fs = require('fs');

const segs = JSON.parse(fs.readFileSync('scripts/natgeo_25_calibrated.json', 'utf8'));
const filePath = 'scripts/seed_video_ecosystem.ts';
let content = fs.readFileSync(filePath, 'utf8');

const formattedSegments = segs.map(s => {
  const words = s.text.trim().split(/\s+/);
  return `      {
        orderIndex: ${s.orderIndex},
        startTime: ${s.startTime},
        endTime: ${s.endTime},
        text: ${JSON.stringify(s.text)},
        translationVi: ${JSON.stringify(s.translationVi)},
        ipaUs: ${JSON.stringify(s.ipaUs)},
        explanationAi: ${JSON.stringify(s.explanation || "")},
        properNouns: ${JSON.stringify(s.properNouns || [])},
        keywords: ${JSON.stringify(s.keywords || [])},
        tokenCount: ${words.length},
      }`;
}).join(',\n');

const newEntry = `  // 3. IELTS Listening: National Geographic - Renewable Energy 101
  {
    slug: "ielts-listening-environmental-sustainability",
    title: "National Geographic: Renewable Energy 101",
    description: "Khám phá khoa học năng lượng tái tạo: cơ chế 5 nguồn năng lượng sạch (mặt trời, gió, thủy điện, địa nhiệt, sinh khối), lợi ích đẩy lùi biến đổi khí hậu và thách thức lưu trữ pin.",
    categorySlug: "ielts-listening",
    playlistSlug: "ielts-cambridge-listening",
    externalId: "1kUE0BZtTRc",
    thumbnailUrl: "https://img.youtube.com/vi/1kUE0BZtTRc/hqdefault.jpg",
    durationSeconds: 196,
    durationFormatted: "03:16",
    cefrLevel: "B2",
    accent: "en-US",
    wpmSpeed: 145,
    segments: [
${formattedSegments}
    ],
  },`;

let startIndex = content.indexOf('  // 3. IELTS Listening: National Geographic - Renewable Energy 101');
if (startIndex === -1) {
  startIndex = content.indexOf('  // 3. IELTS Listening Section 2: University Campus Tour');
}
const endMarker = '  // 4. Daily Conversations: Ordering Coffee & Pastries';

const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Marker not found! start:', startIndex, 'end:', endIndex);
  process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const updatedContent = before + newEntry + '\n\n' + after;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated scripts/seed_video_ecosystem.ts with calibrated buffer segments!');
