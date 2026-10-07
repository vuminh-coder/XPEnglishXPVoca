const fs = require('fs');

const calibratedPath = 'scripts/ted_bilingual_18_calibrated.json';
const calibrated = JSON.parse(fs.readFileSync(calibratedPath, 'utf8'));

// Exact optimal intervals
const exactTimings = [
  { start: 6.55, end: 12.49 },
  { start: 12.49, end: 18.33 },
  { start: 18.33, end: 23.47 },
  { start: 23.47, end: 27.47 },
  { start: 27.47, end: 34.78 },
  { start: 34.78, end: 38.27 },
  { start: 38.27, end: 46.98 },
  { start: 46.98, end: 52.38 },
  { start: 52.38, end: 57.98 },
  { start: 57.98, end: 64.92 },
  { start: 64.92, end: 72.01 },
  { start: 72.01, end: 80.30 },
  { start: 80.30, end: 85.36 },
  { start: 85.36, end: 91.34 },
  { start: 91.34, end: 96.76 },
  { start: 96.76, end: 106.20 },
  { start: 106.20, end: 115.84 },
  { start: 115.84, end: 125.76 },
];

for (let i = 0; i < calibrated.length; i++) {
  calibrated[i].startTime = exactTimings[i].start;
  calibrated[i].endTime = exactTimings[i].end;
}

fs.writeFileSync(calibratedPath, JSON.stringify(calibrated, null, 2), 'utf8');
console.log('1. Calibrated JSON updated.');

// 2. Update Mock Data
const mockPath = 'features/listening/data/videoCatalogMockData.ts';
let mock = fs.readFileSync(mockPath, 'utf8');

const formattedSegments = calibrated.map((s, idx) => {
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

if (entryStart !== -1 && entryEnd !== -1) {
  const newEntry = `    id: "vid_ted_bilingual_brain",
    slug: "ted-ed-benefits-of-a-bilingual-brain",
    title: "TED-Ed: The Benefits of a Bilingual Brain",
    description: "Khám phá cách não bộ xử lý đa ngôn ngữ giúp cải thiện trí nhớ, tăng khả năng tập trung và làm chậm quá trình lão hóa nhận thức qua bài giảng TED-Ed của Mia Nacamulli.",
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
  console.log('2. Mock catalog updated.');
}

// 3. Update Seed script
const seedPath = 'scripts/seed_video_ecosystem.ts';
let seed = fs.readFileSync(seedPath, 'utf8');

const seedSegments = calibrated.map((s, idx) => {
  const tokenCount = s.text.trim().split(/\s+/).length;
  const normalizedText = s.text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim();
  return `      {
        orderIndex: ${s.orderIndex + 1},
        startTime: ${s.startTime.toFixed(2)},
        endTime: ${s.endTime.toFixed(2)},
        text: ${JSON.stringify(s.text)},
        normalizedText: ${JSON.stringify(normalizedText)},
        ipaUs: ${JSON.stringify(s.ipaUs)},
        translationVi: ${JSON.stringify(s.translationVi)},
        explanationAi: ${JSON.stringify(s.explanation)},
        properNouns: ${JSON.stringify(s.properNouns || [])},
        keywords: ${JSON.stringify(s.keywords || [])},
        tokenCount: ${tokenCount},
      }`;
}).join(',\n');

const seedMarker = 'slug: "ted-ed-benefits-of-a-bilingual-brain",';
const seedIdx = seed.indexOf(seedMarker);
if (seedIdx !== -1) {
  // Replace the segments array inside this lesson
  const segStart = seed.indexOf('segments: [', seedIdx);
  const segEnd = seed.indexOf('    ],\n  },', segStart);
  if (segStart !== -1 && segEnd !== -1) {
    seed = seed.substring(0, segStart + 'segments: [\n'.length) + seedSegments + '\n' + seed.substring(segEnd);
    fs.writeFileSync(seedPath, seed, 'utf8');
    console.log('3. Seed script updated.');
  }
}
