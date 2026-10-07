const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));

// 1. Clean videoCatalogMockData.ts so there is EXACTLY 1 Kurzgesagt
let mock = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');
// remove all tybKnGZRwcU entries
while (mock.includes('tybKnGZRwcU')) {
  const p = mock.indexOf('tybKnGZRwcU');
  const objStart = mock.lastIndexOf('{', p);
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < mock.length; i++) {
    if (mock[i] === '{') depth++;
    else if (mock[i] === '}') {
      depth--;
      if (depth === 0) {
        objEnd = i;
        if (mock[objEnd + 1] === ',') objEnd++;
        break;
      }
    }
  }
  mock = mock.substring(0, objStart) + mock.substring(objEnd + 1);
}

const kurzgesagtMock = {
  id: "88c4fc17-4445-46f4-82d4-c51fbb56e859",
  slug: "kurzgesagt-interstellar-war",
  title: "Kurzgesagt: How to Win an Interstellar War",
  description: "Khám phá cuộc chiến vũ trụ đầy kịch tính cùng Kurzgesagt – In a Nutshell: Liệu người ngoài hành tinh có thể hủy diệt Trái Đất từ khoảng cách hàng năm ánh sáng? Học từ vựng khoa học viễn tưởng, vật lý thiên văn và tư duy logic.",
  sourceType: "YOUTUBE",
  externalId: "tybKnGZRwcU",
  thumbnailUrl: "https://img.youtube.com/vi/tybKnGZRwcU/hqdefault.jpg",
  durationSeconds: 93,
  durationFormatted: "01:33",
  cefrLevel: "B2",
  supportedTypes: "BOTH",
  categoryId: "cat_science_tech",
  categorySlug: "science-tech",
  categoryName: "Khoa Học & Công Nghệ",
  accent: "en-US",
  wpmSpeed: 140,
  viewCount: 4210,
  studyCount: 1560,
  segments: segments
};

const mockTarget = 'export const MOCK_VIDEO_LESSONS: MockVideoLesson[] = [';
mock = mock.replace(mockTarget, mockTarget + '\n' + JSON.stringify(kurzgesagtMock, null, 2) + ',');
fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', mock, 'utf8');

// 2. Clean seed_video_ecosystem.ts so there is EXACTLY 1 Kurzgesagt
let seed = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
while (seed.includes('tybKnGZRwcU')) {
  const p = seed.indexOf('tybKnGZRwcU');
  const objStart = seed.lastIndexOf('{', p);
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < seed.length; i++) {
    if (seed[i] === '{') depth++;
    else if (seed[i] === '}') {
      depth--;
      if (depth === 0) {
        objEnd = i;
        if (seed[objEnd + 1] === ',') objEnd++;
        break;
      }
    }
  }
  seed = seed.substring(0, objStart) + seed.substring(objEnd + 1);
}

const seedEntry = `{
    title: "Kurzgesagt: How to Win an Interstellar War",
    description: "Khám phá cuộc chiến vũ trụ đầy kịch tính cùng Kurzgesagt – In a Nutshell: Liệu người ngoài hành tinh có thể hủy diệt Trái Đất từ khoảng cách hàng năm ánh sáng? Học từ vựng khoa học viễn tưởng, vật lý thiên văn và tư duy logic.",
    categorySlug: "science-tech",
    playlistSlug: "space-astronomy",
    externalId: "tybKnGZRwcU",
    thumbnailUrl: "https://img.youtube.com/vi/tybKnGZRwcU/hqdefault.jpg",
    durationSeconds: 93,
    durationFormatted: "01:33",
    cefrLevel: "B2",
    accent: "en-US",
    wpmSpeed: 140,
    segments: ${JSON.stringify(segments, null, 6).replace(/^/gm, '    ').trim()}
  },`;

const seedTarget = 'export const SEED_LESSONS: SeedLesson[] = [';
seed = seed.replace(seedTarget, seedTarget + '\n  ' + seedEntry);
fs.writeFileSync('scripts/seed_video_ecosystem.ts', seed, 'utf8');

console.log('Cleaned and synced exactly 1 Kurzgesagt in both mock and seed!');
