const fs = require('fs');

const segs = JSON.parse(fs.readFileSync('scripts/airport_checkin_16_calibrated.json', 'utf8'));
const filePath = 'features/listening/data/videoCatalogMockData.ts';
let content = fs.readFileSync(filePath, 'utf8');

const formattedSegments = segs.map(s => {
  return `      {
        orderIndex: ${s.orderIndex},
        startTime: ${s.startTime},
        endTime: ${s.endTime},
        text: ${JSON.stringify(s.text)},
        translationVi: ${JSON.stringify(s.translationVi)},
        ipaUs: ${JSON.stringify(s.ipaUs)},
        properNouns: ${JSON.stringify(s.properNouns || [])},
        keywords: ${JSON.stringify(s.keywords || [])},
        explanationAi: ${JSON.stringify(s.explanation || "")},
      }`;
}).join(',\n');

const newEntry = `  // 4. English for Travel: Checking in at the Airport
  {
    id: "vid_airport_checkin",
    slug: "daily-english-airport-check-in",
    title: "English for Travel: Checking in at the Airport",
    description: "Học các mẫu câu giao tiếp tiếng Anh thực tế nhất khi làm thủ tục check-in tại sân bay: xuất trình hộ chiếu, cân hành lý, chọn ghế ngồi cửa sổ và tìm cửa khởi hành cùng Pocket Passport.",
    sourceType: "YOUTUBE",
    externalId: "bIz2Gzu3DKE",
    thumbnailUrl: "https://img.youtube.com/vi/bIz2Gzu3DKE/hqdefault.jpg",
    durationSeconds: 60,
    durationFormatted: "01:00",
    cefrLevel: "A2",
    supportedTypes: "BOTH",
    categoryId: "cat_daily_conv",
    categorySlug: "daily-conversations",
    categoryName: "Giao Tiếp Đời Thực",
    accent: "en-US",
    wpmSpeed: 115,
    viewCount: 5200,
    studyCount: 2100,
    segments: [
${formattedSegments},
    ],
  },`;

const startMarker = '    id: "vid_airport_checkin",';
const endMarker = '      // 5. National Geographic: Renewable Energy 101';

const startIndex = content.lastIndexOf('  {', content.indexOf(startMarker));
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Marker not found! start:', startIndex, 'end:', endIndex);
  process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const updatedContent = before + newEntry + '\n\n' + after;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated features/listening/data/videoCatalogMockData.ts with 16 airport segments!');
