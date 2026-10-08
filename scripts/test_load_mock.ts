import { MOCK_VIDEO_LESSONS, MOCK_VIDEO_CATEGORIES } from '../features/listening/data/videoCatalogMockData';

console.log('Categories count:', MOCK_VIDEO_CATEGORIES.length);
console.log('Lessons count:', MOCK_VIDEO_LESSONS.length);
MOCK_VIDEO_LESSONS.forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.externalId}] id="${l.id}" slug="${l.slug}" segments=${l.segments.length}`);
});
