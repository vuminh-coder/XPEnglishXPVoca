const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_18_calibrated.json', 'utf8'));

// 1. Update features/listening/data/videoCatalogMockData.ts
let mockContent = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');

const rtsMock = {
  id: "ff4c64b7-ea82-4963-a4f6-1ff808d929e6",
  slug: "anne-marie-rewrite-the-stars",
  title: "Anne-Marie & James Arthur: Rewrite The Stars (The Greatest Showman)",
  description: "Luyện nghe và chép chính tả qua ca khúc nhạc phim kinh điển \"Rewrite The Stars\" (The Greatest Showman: Reimagined) qua giọng ca đầy nội lực của James Arthur và Anne-Marie. Học cách nối âm tự nhiên, thành ngữ tình yêu và cấu trúc giả định.",
  sourceType: "YOUTUBE",
  externalId: "pRfmrE0ToTo",
  thumbnailUrl: "https://img.youtube.com/vi/pRfmrE0ToTo/hqdefault.jpg",
  durationSeconds: 105,
  durationFormatted: "01:45",
  cefrLevel: "B1",
  supportedTypes: "BOTH",
  categoryId: "cat_stories_culture",
  categorySlug: "stories-culture",
  categoryName: "Câu Chuyện & Văn Hóa",
  accent: "en-US",
  wpmSpeed: 120,
  viewCount: 3950,
  studyCount: 1420,
  segments: segments
};

// Remove any existing pRfmrE0ToTo in mockContent
while (mockContent.includes('pRfmrE0ToTo')) {
  const p = mockContent.indexOf('pRfmrE0ToTo');
  const objStart = mockContent.lastIndexOf('{', p);
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < mockContent.length; i++) {
    if (mockContent[i] === '{') depth++;
    else if (mockContent[i] === '}') {
      depth--;
      if (depth === 0) {
        objEnd = i;
        if (mockContent[objEnd + 1] === ',') objEnd++;
        break;
      }
    }
  }
  mockContent = mockContent.substring(0, objStart) + mockContent.substring(objEnd + 1);
}

// Insert rtsMock at front of MOCK_VIDEO_LESSONS
const mockTarget = 'export const MOCK_VIDEO_LESSONS: MockVideoLesson[] = [';
mockContent = mockContent.replace(mockTarget, mockTarget + '\n' + JSON.stringify(rtsMock, null, 2) + ',');
fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', mockContent, 'utf8');
console.log('Successfully updated videoCatalogMockData.ts with Rewrite The Stars!');

// 2. Update scripts/seed_video_ecosystem.ts
let seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

// Remove any existing pRfmrE0ToTo in seedContent
while (seedContent.includes('pRfmrE0ToTo')) {
  const p = seedContent.indexOf('pRfmrE0ToTo');
  const objStart = seedContent.lastIndexOf('{', p);
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < seedContent.length; i++) {
    if (seedContent[i] === '{') depth++;
    else if (seedContent[i] === '}') {
      depth--;
      if (depth === 0) {
        objEnd = i;
        if (seedContent[objEnd + 1] === ',') objEnd++;
        break;
      }
    }
  }
  seedContent = seedContent.substring(0, objStart) + seedContent.substring(objEnd + 1);
}

const seedEntry = `{
    slug: "anne-marie-rewrite-the-stars",
    title: "Anne-Marie & James Arthur: Rewrite The Stars (The Greatest Showman)",
    description: "Luyện nghe và chép chính tả qua ca khúc nhạc phim kinh điển \\"Rewrite The Stars\\" (The Greatest Showman: Reimagined) qua giọng ca đầy nội lực của James Arthur và Anne-Marie. Học cách nối âm tự nhiên, thành ngữ tình yêu và cấu trúc giả định.",
    categorySlug: "stories-culture",
    playlistSlug: "music-soundtracks",
    externalId: "pRfmrE0ToTo",
    thumbnailUrl: "https://img.youtube.com/vi/pRfmrE0ToTo/hqdefault.jpg",
    durationSeconds: 105,
    durationFormatted: "01:45",
    cefrLevel: "B1",
    accent: "en-US",
    wpmSpeed: 120,
    segments: ${JSON.stringify(segments, null, 6).replace(/^/gm, '    ').trim()}
  },`;

const seedTarget = 'const CURATED_LESSONS: SeedLesson[] = [';
seedContent = seedContent.replace(seedTarget, seedTarget + '\n  ' + seedEntry);
fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
console.log('Successfully updated seed_video_ecosystem.ts with Rewrite The Stars!');
