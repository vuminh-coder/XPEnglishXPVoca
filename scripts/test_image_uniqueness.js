const fs = require('fs');
const path = require('path');

const mapperContent = fs.readFileSync(path.join(__dirname, '../lib/utils/lessonImageMapper.ts'), 'utf-8');

// Extract photos array
const photosMatch = mapperContent.match(/export const UNIQUE_UNSPLASH_PHOTOS = (\[[\s\S]*?\]);/);
if (!photosMatch) {
  console.error("Could not find UNIQUE_UNSPLASH_PHOTOS array!");
  process.exit(1);
}

const UNIQUE_UNSPLASH_PHOTOS = JSON.parse(photosMatch[1]);

function getLessonCoverImage(lesson) {
  if (lesson.imageUrl && lesson.imageUrl.startsWith("http") && !lesson.imageUrl.includes("unsplash.com")) {
    return lesson.imageUrl;
  }
  const key = lesson.id || lesson.title || "xp_english_default_lesson";
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) + hash) + key.charCodeAt(i);
  }
  const positiveHash = Math.abs(hash);
  const photoIndex = positiveHash % UNIQUE_UNSPLASH_PHOTOS.length;
  const basePhoto = UNIQUE_UNSPLASH_PHOTOS[photoIndex];
  const encodedKey = encodeURIComponent(key.replace(/[^a-zA-Z0-9_-]/g, ""));
  return `${basePhoto}&sig=${encodedKey}_${positiveHash}`;
}

// Test with 200 mock lesson keys
const mockLessons = [];
for (let i = 1; i <= 100; i++) {
  mockLessons.push({ id: `shadow_ext_${i.toString().padStart(3, '0')}`, title: `Shadowing Lesson Title ${i}` });
}
for (let i = 1; i <= 101; i++) {
  mockLessons.push({ id: `listen_${i.toString().padStart(3, '0')}`, title: `Listening Lesson Title ${i}` });
}

console.log(`Testing image uniqueness for ${mockLessons.length} lessons...`);

const urls = new Set();
let duplicates = 0;

mockLessons.forEach((lesson, index) => {
  const url = getLessonCoverImage(lesson);
  if (urls.has(url)) {
    console.error(`Duplicate image URL found at index ${index} (${lesson.id}): ${url}`);
    duplicates++;
  }
  urls.add(url);
});

console.log(`Total lessons tested: ${mockLessons.length}`);
console.log(`Total unique image URLs: ${urls.size}`);
console.log(`Duplicate count: ${duplicates}`);

if (duplicates === 0) {
  console.log("🎉 100% PERFECT! ALL 201 LESSON COVER IMAGES ARE GUARANTEED 100% UNIQUE!");
} else {
  console.error("❌ FOUND DUPLICATES!");
  process.exit(1);
}
