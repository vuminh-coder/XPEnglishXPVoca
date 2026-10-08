const fs = require('fs');

const segs = JSON.parse(fs.readFileSync('scripts/airport_checkin_16_calibrated.json', 'utf8'));
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

const newEntry = `  // 6. English for Travel: Checking in at the Airport
  {
    slug: "daily-english-airport-check-in",
    title: "English for Travel: Checking in at the Airport",
    description: "Học các mẫu câu giao tiếp tiếng Anh thực tế nhất khi làm thủ tục check-in tại sân bay: xuất trình hộ chiếu, cân hành lý, chọn ghế ngồi cửa sổ và tìm cửa khởi hành cùng Pocket Passport.",
    categorySlug: "daily-conversations",
    playlistSlug: "daily-city-life",
    externalId: "bIz2Gzu3DKE",
    thumbnailUrl: "https://img.youtube.com/vi/bIz2Gzu3DKE/hqdefault.jpg",
    durationSeconds: 60,
    durationFormatted: "01:00",
    cefrLevel: "A2",
    accent: "en-US",
    wpmSpeed: 115,
    segments: [
${formattedSegments}
    ],
  },`;

let startIndex = content.indexOf('  // 6. English for Travel: Checking in at the Airport');
if (startIndex === -1) {
  startIndex = content.indexOf('  // 6. TOEIC Part 4: Airport Flight Announcement');
}
const endMarker = '  // 7. Leadership & Tech: Jensen Huang on Elon Musk Supercomputer';
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Marker not found! start:', startIndex, 'end:', endIndex);
  process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const updatedContent = before + newEntry + '\n\n' + after;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated scripts/seed_video_ecosystem.ts with Airport Check-in bIz2Gzu3DKE!');
