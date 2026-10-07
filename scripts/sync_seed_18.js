const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/steve_jobs_18_perfect.json', 'utf8'));
let seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

const startTag = 'slug: "steve-jobs-stanford-commencement",';
const endTag = 'slug: "bbc-6min-brain-boost",';

const startIndex = seedContent.indexOf(startTag);
const endIndex = seedContent.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.error("Tags not found in seed_video_ecosystem.ts");
  process.exit(1);
}

const newSeed = `slug: "steve-jobs-stanford-commencement",
    title: "Steve Jobs: How to Live Before You Die (Stanford Commencement Address)",
    description: "Bài diễn thuyết kinh điển của Steve Jobs tại Đại học Stanford năm 2005 về việc bỏ học, khởi nghiệp, theo đuổi đam mê và nghệ thuật kết nối những dấu mốc cuộc đời.",
    categorySlug: "ted-ed",
    playlistSlug: "ted-ed-brain-power",
    externalId: "UF8uR6Z6KLc",
    thumbnailUrl: "https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
    durationSeconds: 173,
    durationFormatted: "02:53",
    cefrLevel: "B2",
    accent: "en-US",
    wpmSpeed: 145,
    segments: ${JSON.stringify(segments, null, 6).replace(/^/gm, '    ').trim()},
  },

  // 2. BBC 6 Minute English: How to boost your brain
  {
    `;

const before = seedContent.substring(0, startIndex);
const after = seedContent.substring(endIndex);

seedContent = before + newSeed + after;
fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
console.log('Successfully updated scripts/seed_video_ecosystem.ts');
