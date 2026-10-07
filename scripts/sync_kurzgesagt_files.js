const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));

// 1. Update features/listening/data/videoCatalogMockData.ts
let mockContent = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');

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

// Check if already in mockContent
if (mockContent.includes('88c4fc17-4445-46f4-82d4-c51fbb56e859') || mockContent.includes('tybKnGZRwcU')) {
  // Replace existing item
  const regex = /\{\s*id:\s*"88c4fc17-4445-46f4-82d4-c51fbb56e859"[\s\S]*?\},(?=\n\s*\{|\n\s*\])/;
  if (mockContent.match(regex)) {
    mockContent = mockContent.replace(regex, JSON.stringify(kurzgesagtMock, null, 2) + ',');
  } else {
    console.log('Regex did not match existing Kurzgesagt, will insert at front of list');
    const target = 'export const MOCK_VIDEO_LESSONS: MockVideoLesson[] = [';
    mockContent = mockContent.replace(target, target + '\n' + JSON.stringify(kurzgesagtMock, null, 2) + ',');
  }
} else {
  const target = 'export const MOCK_VIDEO_LESSONS: MockVideoLesson[] = [';
  mockContent = mockContent.replace(target, target + '\n' + JSON.stringify(kurzgesagtMock, null, 2) + ',');
}

fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', mockContent, 'utf8');
console.log('Updated videoCatalogMockData.ts with Kurzgesagt 21 segments.');

// 2. Update scripts/seed_video_ecosystem.ts
let seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
if (seedContent.includes('tybKnGZRwcU')) {
  const seedRegex = /\{\s*title:\s*"Kurzgesagt[\s\S]*?externalId:\s*"tybKnGZRwcU"[\s\S]*?segments:\s*\[[\s\S]*?\n    \],\n  \},/;
  const newSeedLesson = `{
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
    segments: ${JSON.stringify(segments, null, 6).replace(/^/gm, '    ').trim()},
  },`;

  if (seedContent.match(seedRegex)) {
    seedContent = seedContent.replace(seedRegex, newSeedLesson);
    fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
    console.log('Updated seed_video_ecosystem.ts with Kurzgesagt 21 segments.');
  } else {
    console.log('Seed regex did not match, inserting to SEED_LESSONS list.');
    const seedTarget = 'export const SEED_LESSONS: SeedLesson[] = [';
    seedContent = seedContent.replace(seedTarget, seedTarget + '\n' + newSeedLesson);
    fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
    console.log('Inserted Kurzgesagt into SEED_LESSONS.');
  }
}
