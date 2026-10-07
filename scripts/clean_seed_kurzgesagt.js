const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));
let seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

// Find the old Kurzgesagt entry start
const startIdx = seedContent.indexOf('slug: "kurzgesagt-earth-spinning"');
if (startIdx !== -1) {
  const objStart = seedContent.lastIndexOf('{', startIdx);
  // find matching closing brace
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

  const newEntry = `{
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

  seedContent = seedContent.substring(0, objStart) + newEntry + seedContent.substring(objEnd + 1);
  fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
  console.log('Replaced old Kurzgesagt in seed_video_ecosystem.ts with calibrated 21 segments!');
} else {
  console.log('Old entry not found');
}
