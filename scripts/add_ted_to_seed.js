const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

const seedPath = 'scripts/seed_video_ecosystem.ts';
let seed = fs.readFileSync(seedPath, 'utf8');

if (seed.includes('MMmOLN5zBLY')) {
  console.log('MMmOLN5zBLY already in seed script! Skipping addition.');
  process.exit(0);
}

const seedSegments = segments.map((s, idx) => {
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

const newLessonCode = `  {
    slug: "ted-ed-benefits-of-a-bilingual-brain",
    title: "TED-Ed: The Benefits of a Bilingual Brain",
    description: "Khám phá cách não bộ xử lý đa ngôn ngữ giúp cải thiện trí nhớ, tăng khả năng tập trung và làm chậm quá trình lão hóa nhận thức qua bài giảng TED-Ed của Mia Nacamulli.",
    categorySlug: "ted-ed",
    playlistSlug: "ted-ed-brain-power",
    externalId: "MMmOLN5zBLY",
    thumbnailUrl: "https://img.youtube.com/vi/MMmOLN5zBLY/hqdefault.jpg",
    durationSeconds: 126,
    durationFormatted: "02:05",
    cefrLevel: "B1",
    accent: "en-US",
    wpmSpeed: 138,
    segments: [
${seedSegments}
    ],
  },
`;

const insertMarker = 'const CURATED_LESSONS: SeedLesson[] = [\n';
const idx = seed.indexOf(insertMarker);
if (idx === -1) {
  console.error('Cannot find CURATED_LESSONS marker!');
  process.exit(1);
}

seed = seed.slice(0, idx + insertMarker.length) + newLessonCode + seed.slice(idx + insertMarker.length);
fs.writeFileSync(seedPath, seed, 'utf8');
console.log('Successfully added TED-Ed lesson with 18 calibrated segments to seed_video_ecosystem.ts!');
