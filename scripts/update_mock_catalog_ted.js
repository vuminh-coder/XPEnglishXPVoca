const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

const mockPath = 'features/listening/data/videoCatalogMockData.ts';
let mock = fs.readFileSync(mockPath, 'utf8');

const formattedSegments = segments.map((s, idx) => {
  return `      {
        orderIndex: ${s.orderIndex},
        startTime: ${s.startTime.toFixed(2)},
        endTime: ${s.endTime.toFixed(2)},
        text: ${JSON.stringify(s.text)},
        translationVi: ${JSON.stringify(s.translationVi)},
        ipaUs: ${JSON.stringify(s.ipaUs)},
        properNouns: ${JSON.stringify(s.properNouns || [])},
        keywords: ${JSON.stringify(s.keywords || [])},
      }`;
}).join(',\n');

const entryStart = mock.indexOf('    id: "vid_ted_bilingual_brain",');
const entryEnd = mock.indexOf('    id: "vid_bbc_why_we_laugh",');

if (entryStart === -1 || entryEnd === -1) {
  console.error('Could not find entry boundaries!');
  process.exit(1);
}

const newEntry = `    id: "vid_ted_bilingual_brain",
    slug: "ted-ed-benefits-of-a-bilingual-brain",
    title: "TED-Ed: The Benefits of a Bilingual Brain",
    description: "Khám phá cách não bộ xử lý đa ngôn ngữ giúp cải thiện trí nhớ, tăng khả năng tập trung và làm chậm quá trình lão hóa nhận thức.",
    sourceType: "YOUTUBE",
    externalId: "MMmOLN5zBLY",
    thumbnailUrl: "https://img.youtube.com/vi/MMmOLN5zBLY/hqdefault.jpg",
    durationSeconds: 126,
    durationFormatted: "02:05",
    cefrLevel: "B1",
    supportedTypes: "BOTH",
    categoryId: "cat_ted_ed",
    categorySlug: "ted-ed",
    categoryName: "TED-Ed & Tư Duy Sâu",
    accent: "en-US",
    wpmSpeed: 138,
    viewCount: 4520,
    studyCount: 1680,
    segments: [
${formattedSegments},
    ],
  },

  // 3. BBC 6 Minute English: Why Do We Laugh?
  {\n`;

mock = mock.substring(0, entryStart) + newEntry + mock.substring(entryEnd);
fs.writeFileSync(mockPath, mock, 'utf8');
console.log('Successfully updated videoCatalogMockData.ts with 18 calibrated segments!');
