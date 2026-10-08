import { MOCK_VIDEO_LESSONS } from '../features/listening/data/videoCatalogMockData';
import { ALL_MODULAR_LESSONS } from '../features/listening/data/lessons';

console.log('Original count:', MOCK_VIDEO_LESSONS.length);
console.log('Modular count:', ALL_MODULAR_LESSONS.length);

if (MOCK_VIDEO_LESSONS.length !== ALL_MODULAR_LESSONS.length) {
  console.error('MISMATCH IN LESSON COUNT!');
  process.exit(1);
}

let allPassed = true;

for (let i = 0; i < MOCK_VIDEO_LESSONS.length; i++) {
  const orig = MOCK_VIDEO_LESSONS[i];
  const mod = ALL_MODULAR_LESSONS[i];

  const origJson = JSON.stringify(orig);
  const modJson = JSON.stringify(mod);

  if (origJson !== modJson) {
    allPassed = false;
    console.error(`Mismatch in lesson ${i + 1} (${orig.title}):`);
    console.error('Orig JSON length:', origJson.length);
    console.error('Mod JSON length:', modJson.length);
  } else {
    console.log(`✓ Lesson ${i + 1} [${orig.externalId}] ${orig.title.substring(0, 40)}... MATCHES 100% (${orig.segments.length} segs)`);
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL 10 LESSONS MATCH 100% BIT-FOR-BIT WITH ZERO DIFFERENCES!');
}
