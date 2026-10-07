const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/steve_jobs_18_perfect.json', 'utf8'));

// 1. Update videoCatalogMockData.ts
let mockContent = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');

const steveJobsStartTag = 'id: "0678a126-f94d-4930-81ce-ebe1e6731e7e",';
const steveJobsEndTag = 'id: "vid_ted_bilingual_brain",';

const startIndex = mockContent.indexOf(steveJobsStartTag);
const endIndex = mockContent.indexOf(steveJobsEndTag);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find delimiters in videoCatalogMockData.ts");
  process.exit(1);
}

const newSteveJobsMock = `id: "0678a126-f94d-4930-81ce-ebe1e6731e7e",
    slug: "steve-jobs-stanford-stay-hungry",
    title: "Steve Jobs: How to Live Before You Die (Stanford Commencement Address)",
    description: "Bài diễn thuyết kinh điển của Steve Jobs tại Đại học Stanford năm 2005 về việc bỏ học, khởi nghiệp, theo đuổi đam mê và nghệ thuật kết nối những dấu mốc cuộc đời.",
    sourceType: "YOUTUBE",
    externalId: "UF8uR6Z6KLc",
    thumbnailUrl: "https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
    durationSeconds: 173,
    durationFormatted: "02:53",
    cefrLevel: "B2",
    supportedTypes: "BOTH",
    categoryId: "cat_stories_culture",
    categorySlug: "stories-culture",
    categoryName: "Câu Chuyện & Văn Hóa",
    accent: "en-US",
    wpmSpeed: 145,
    viewCount: 3820,
    studyCount: 1240,
    segments: ${JSON.stringify(segments, null, 8).replace(/^/gm, '    ').trim()},
  },

  // 2. TED-Ed: The Benefits of a Bilingual Brain
  {
    `;

const before = mockContent.substring(0, startIndex);
const after = mockContent.substring(endIndex);

mockContent = before + newSteveJobsMock + after;
fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', mockContent, 'utf8');
console.log('Successfully updated features/listening/data/videoCatalogMockData.ts');

// 2. Update scripts/seed_video_ecosystem.ts
let seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
const seedStartTag = 'externalId: "UF8uR6Z6KLc",';
const seedEndTag = 'externalId: "MMmOLN5zBLY",';

const seedStart = seedContent.indexOf(seedStartTag);
const seedEnd = seedContent.indexOf(seedEndTag);

if (seedStart !== -1 && seedEnd !== -1) {
  const seedBefore = seedContent.substring(0, seedStart);
  const seedAfter = seedContent.substring(seedEnd);

  const newSeedSteveJobs = `externalId: "UF8uR6Z6KLc",
    title: "Steve Jobs: How to Live Before You Die (Stanford Commencement Address)",
    description: "Bài diễn thuyết kinh điển của Steve Jobs tại Đại học Stanford năm 2005 về việc bỏ học, khởi nghiệp, theo đuổi đam mê và nghệ thuật kết nối những dấu mốc cuộc đời.",
    thumbnailUrl: "https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
    durationSeconds: 173,
    durationFormatted: "02:53",
    cefrLevel: "B2",
    accent: "en-US",
    wpmSpeed: 145,
    categorySlug: "stories-culture",
    segments: ${JSON.stringify(segments, null, 6).replace(/^/gm, '    ').trim()},
  },
  {
    `;

  seedContent = seedBefore + newSeedSteveJobs + seedAfter;
  fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
  console.log('Successfully updated scripts/seed_video_ecosystem.ts');
} else {
  console.warn('Could not find seed delimiters, checking manual sync');
}
