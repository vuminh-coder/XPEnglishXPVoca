const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/pets_11_calibrated.json', 'utf8'));
let seedContent = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');

const startTag = 'slug: "daily-pets-animals-nature",';
const endTag = 'slug: "kurzgesagt-earth-spinning",';

const startIndex = seedContent.indexOf(startTag);
const endIndex = seedContent.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.error("Tags not found in seed_video_ecosystem.ts");
  process.exit(1);
}

const newSeed = `slug: "daily-pets-animals-nature",
    title: "Daily English: Pets, Animals & Nature Conversation",
    description: "Bài luyện nghe giao tiếp tiếng Anh thường ngày về chủ đề thú cưng, động vật sở thú và thiên nhiên cây cỏ cùng Pocket Passport.",
    categorySlug: "daily-conversations",
    playlistSlug: "daily-city-life",
    externalId: "AK42GhbTZ9w",
    thumbnailUrl: "https://img.youtube.com/vi/AK42GhbTZ9w/hqdefault.jpg",
    durationSeconds: 72,
    durationFormatted: "01:12",
    cefrLevel: "A2",
    accent: "en-US",
    wpmSpeed: 125,
    segments: ${JSON.stringify(segments, null, 6).replace(/^/gm, '    ').trim()},
  },

  // 5. Kurzgesagt: What if the Earth stopped spinning?
  {
    `;

const before = seedContent.substring(0, startIndex);
const after = seedContent.substring(endIndex);

seedContent = before + newSeed + after;
fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedContent, 'utf8');
console.log('Successfully updated scripts/seed_video_ecosystem.ts with 11 pets segments');
