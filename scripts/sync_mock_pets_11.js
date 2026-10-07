const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/pets_11_calibrated.json', 'utf8'));
let content = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');

// Check if 575d216f-b275-468e-8a41-c3b26c0ac1ea exists in file
if (content.includes('575d216f-b275-468e-8a41-c3b26c0ac1ea') || content.includes('AK42GhbTZ9w')) {
  console.log('AK42GhbTZ9w already in mock data');
} else {
  // Insert before the last item or after Steve Jobs
  const insertTarget = 'export const MOCK_VIDEO_LESSONS: MockVideoLesson[] = [';
  const newLessonMock = `export const MOCK_VIDEO_LESSONS: MockVideoLesson[] = [
  // Daily English: Pets, Animals & Nature Conversation
  {
    id: "575d216f-b275-468e-8a41-c3b26c0ac1ea",
    slug: "daily-pets-animals-nature",
    title: "Daily English: Pets, Animals & Nature Conversation",
    description: "Bài luyện nghe giao tiếp tiếng Anh thường ngày về chủ đề thú cưng, động vật sở thú và thiên nhiên cây cỏ cùng Pocket Passport.",
    sourceType: "YOUTUBE",
    externalId: "AK42GhbTZ9w",
    thumbnailUrl: "https://img.youtube.com/vi/AK42GhbTZ9w/hqdefault.jpg",
    durationSeconds: 72,
    durationFormatted: "01:12",
    cefrLevel: "A2",
    supportedTypes: "BOTH",
    categoryId: "cat_daily_conv",
    categorySlug: "daily-conversations",
    categoryName: "Giao Tiếp Hàng Ngày",
    accent: "en-US",
    wpmSpeed: 125,
    viewCount: 2450,
    studyCount: 890,
    segments: ${JSON.stringify(segments, null, 6).replace(/^/gm, '    ').trim()},
  },
`;

  content = content.replace(insertTarget, newLessonMock);
  fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', content, 'utf8');
  console.log('Successfully inserted AK42GhbTZ9w into videoCatalogMockData.ts');
}
