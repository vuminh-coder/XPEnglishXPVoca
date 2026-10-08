const fs = require('fs');

const segs = JSON.parse(fs.readFileSync('scripts/natgeo_25_calibrated.json', 'utf8'));
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

const newEntry = `  // 5. National Geographic: Renewable Energy 101
  {
    id: "vid_ielts_environmental_sustainability",
    slug: "ielts-listening-environmental-sustainability",
    title: "National Geographic: Renewable Energy 101",
    description: "Khám phá khoa học năng lượng tái tạo: cơ chế 5 nguồn năng lượng sạch (mặt trời, gió, thủy điện, địa nhiệt, sinh khối), lợi ích đẩy lùi biến đổi khí hậu và thách thức lưu trữ pin.",
    sourceType: "YOUTUBE",
    externalId: "1kUE0BZtTRc",
    thumbnailUrl: "https://img.youtube.com/vi/1kUE0BZtTRc/hqdefault.jpg",
    durationSeconds: 196,
    durationFormatted: "03:16",
    cefrLevel: "B2",
    supportedTypes: "BOTH",
    categoryId: "cat_ielts_listen",
    categorySlug: "ielts-listening",
    categoryName: "IELTS Nghe & Thuyết Trình",
    accent: "en-US",
    wpmSpeed: 145,
    viewCount: 3840,
    studyCount: 1450,
    segments: [
${formattedSegments},
    ],
  },`;

let startIndex = content.indexOf('// 5. National Geographic: Renewable Energy 101');
if (startIndex === -1) {
  startIndex = content.indexOf('// 5. IELTS Academic: Environmental Sustainability');
}
const endIndex = content.indexOf('// 6. Leadership & Tech: Jensen Huang on Elon Musk Supercomputer');

if (startIndex === -1 || endIndex === -1) {
  console.error('Marker not found! start:', startIndex, 'end:', endIndex);
  process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const updatedContent = before + newEntry + '\n\n  ' + after;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated features/listening/data/videoCatalogMockData.ts with buffer-calibrated segments!');
