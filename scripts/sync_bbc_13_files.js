const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/bbc_13_calibrated.json', 'utf8'));

// 1. Update scripts/seed_video_ecosystem.ts
let seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

const bbcSeedBlockRegex = /\{\s*slug:\s*"bbc-6min-brain-boost",[\s\S]*?wpmSpeed:\s*135,\s*segments:\s*\[[\s\S]*?\],\s*\},/m;

const newSeedLesson = `{
    slug: "bbc-6min-brain-boost",
    title: "BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship",
    description: "Bản tin thời sự đặc sắc từ BBC Learning English về việc trục vớt kho báu huyền thoại trị giá 20 tỷ USD từ con tàu đắm San Jose năm 1708, học từ vựng tin tức và phát âm Anh-Anh chuẩn.",
    categorySlug: "bbc-6-minute",
    playlistSlug: "bbc-6min-lifestyle",
    externalId: "doOlP7NLUwc",
    thumbnailUrl: "https://img.youtube.com/vi/doOlP7NLUwc/hqdefault.jpg",
    durationSeconds: 90,
    durationFormatted: "01:30",
    cefrLevel: "B1",
    accent: "en-GB",
    wpmSpeed: 135,
    segments: ${JSON.stringify(segments, null, 10).replace(/^/gm, '    ').trim()},
  },`;

if (!bbcSeedBlockRegex.test(seedContent)) {
  console.error('Could not find bbc seed block regex in seed_video_ecosystem.ts');
} else {
  seedContent = seedContent.replace(bbcSeedBlockRegex, newSeedLesson);
  fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
  console.log('Successfully updated scripts/seed_video_ecosystem.ts with 100% exact BBC segments.');
}

// 2. Update features/listening/data/videoCatalogMockData.ts
let mockContent = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');

const mockLessonItem = {
  id: "e4476093-9f0c-4620-a7f3-345d0e6b64db",
  slug: "bbc-6min-brain-boost",
  title: "BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship",
  description: "Bản tin thời sự đặc sắc từ BBC Learning English về việc trục vớt kho báu huyền thoại trị giá 20 tỷ USD từ con tàu đắm San Jose năm 1708, học từ vựng tin tức và phát âm Anh-Anh chuẩn.",
  sourceType: "YOUTUBE",
  externalId: "doOlP7NLUwc",
  thumbnailUrl: "https://img.youtube.com/vi/doOlP7NLUwc/hqdefault.jpg",
  durationSeconds: 90,
  durationFormatted: "01:30",
  cefrLevel: "B1",
  supportedTypes: "BOTH",
  categoryId: "cat_bbc_6min",
  categorySlug: "bbc-6-minute",
  categoryName: "BBC 6 Minute English",
  accent: "en-GB",
  wpmSpeed: 135,
  viewCount: 3820,
  studyCount: 1420,
  segments: segments
};

const mockBbcBlockRegex = /\{\s*"id":\s*"e4476093-9f0c-4620-a7f3-345d0e6b64db",[\s\S]*?"wpmSpeed":\s*135,[\s\S]*?"segments":\s*\[[\s\S]*?\],\s*\},/m;

if (mockBbcBlockRegex.test(mockContent)) {
  const replacement = JSON.stringify(mockLessonItem, null, 2).replace(/\n/g, '\n  ') + ',';
  mockContent = mockContent.replace(mockBbcBlockRegex, replacement);
  fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', mockContent, 'utf8');
  console.log('Successfully updated features/listening/data/videoCatalogMockData.ts with 100% exact BBC segments.');
} else {
  console.error('Could not find mock BBC block regex in videoCatalogMockData.ts');
}
