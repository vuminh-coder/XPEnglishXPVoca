import { ALL_MODULAR_LESSONS } from '../features/listening/data/lessons';

async function verifyAll17ViaApi() {
  console.log(`Testing all ${ALL_MODULAR_LESSONS.length} modular lessons via API:`);
  let passedCount = 0;

  for (let i = 0; i < ALL_MODULAR_LESSONS.length; i++) {
    const lesson = ALL_MODULAR_LESSONS[i];
    
    // Test 1: Fetch via /api/video-catalog/lessons/[id]
    const res1 = await fetch(`http://localhost:3000/api/video-catalog/lessons/${lesson.id}`);
    const data1: any = await res1.json();
    const lesson1 = data1.lesson || data1;
    const count1 = lesson1.segments?.length || lesson1.subtitles?.length || 0;

    // Test 2: Fetch via /api/listening/lessons/[id]
    const res2 = await fetch(`http://localhost:3000/api/listening/lessons/${lesson.id}`);
    const data2: any = await res2.json();
    const lesson2 = data2.data || data2.lesson || data2;
    const count2 = lesson2.transcript?.length || lesson2.segments?.length || lesson2.subtitles?.length || 0;

    if (count1 > 0 && count2 > 0) {
      passedCount++;
      console.log(`✓ [${i + 1}/${ALL_MODULAR_LESSONS.length}] ${lesson.title.substring(0, 35)}... (Cat: ${count1} segs, Listen: ${count2} segs)`);
    } else {
      console.error(`✗ [${i + 1}/${ALL_MODULAR_LESSONS.length}] ${lesson.title} FAILED! count1=${count1}, count2=${count2}`);
    }
  }

  console.log(`\nResult: ${passedCount}/${ALL_MODULAR_LESSONS.length} lessons verified through API!`);
  if (passedCount === ALL_MODULAR_LESSONS.length) {
    console.log(`🎉 ALL ${ALL_MODULAR_LESSONS.length} DIVERSE LESSONS ARE 100% OPERATIONAL ACROSS SYSTEM APIS!`);
  }
}

verifyAll17ViaApi();
