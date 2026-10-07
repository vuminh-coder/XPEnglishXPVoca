const fs = require('fs');
const segments = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));
let seed = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

const seedEntry = `{
    slug: "kurzgesagt-interstellar-war",
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

const target = 'const CURATED_LESSONS: SeedLesson[] = [';
if (seed.includes('tybKnGZRwcU')) {
  console.log('Already in seed');
} else {
  seed = seed.replace(target, target + '\n  ' + seedEntry);
  fs.writeFileSync('scripts/seed_video_ecosystem.ts', seed, 'utf8');
  console.log('Inserted into CURATED_LESSONS in seed_video_ecosystem.ts!');
}
