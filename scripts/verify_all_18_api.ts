import { ALL_MODULAR_LESSONS } from "../features/listening/data/lessons";

async function verifyAll18ViaApi() {
  console.log("================================================================================");
  console.log(`   XÁC THỰC TOÀN DIỆN ${ALL_MODULAR_LESSONS.length} BÀI HỌC QUA 2 LIVE ENDPOINTS (PORT 3000)   `);
  console.log("================================================================================\n");

  let passedCount = 0;
  let totalSegments1 = 0;
  let totalSegments2 = 0;

  for (let i = 0; i < ALL_MODULAR_LESSONS.length; i++) {
    const lesson = ALL_MODULAR_LESSONS[i];
    
    // Endpoint 1: /api/video-catalog/lessons/[id]
    const res1 = await fetch(`http://localhost:3000/api/video-catalog/lessons/${lesson.id}`);
    const data1: any = await res1.json();
    const lesson1 = data1.lesson || data1;
    const count1 = lesson1.segments?.length || 0;

    // Endpoint 2: /api/listening/lessons/[id]
    const res2 = await fetch(`http://localhost:3000/api/listening/lessons/${lesson.id}`);
    const data2: any = await res2.json();
    const lesson2 = data2.data || data2.lesson || data2;
    const count2 = lesson2.transcript?.length || 0;

    const expectedSegs = lesson.segments.length;
    const isOk1 = res1.status === 200 && count1 === expectedSegs;
    const isOk2 = res2.status === 200 && count2 === expectedSegs;

    if (isOk1 && isOk2) {
      passedCount++;
      totalSegments1 += count1;
      totalSegments2 += count2;
      console.log(`✅ [${(i + 1).toString().padStart(2, "0")}/${ALL_MODULAR_LESSONS.length}] (${lesson.externalId}) ${lesson.title.substring(0, 45).padEnd(45)} | Segs: ${count1}/${expectedSegs} | 200 OK`);
    } else {
      console.error(`❌ [${i + 1}/${ALL_MODULAR_LESSONS.length}] ${lesson.title} FAILED! Ep1: ${res1.status} (${count1}/${expectedSegs}), Ep2: ${res2.status} (${count2}/${expectedSegs})`);
    }
  }

  console.log("\n================================================================================");
  console.log(`Kết quả: ${passedCount}/${ALL_MODULAR_LESSONS.length} bài học đạt 100% chuẩn kép Live APIs!`);
  console.log(`Tổng số phân đoạn VideoCatalog API: ${totalSegments1}`);
  console.log(`Tổng số phân đoạn Listening API   : ${totalSegments2}`);
  if (passedCount === ALL_MODULAR_LESSONS.length) {
    console.log(`🎉 TẤT CẢ ${ALL_MODULAR_LESSONS.length} BÀI HỌC HOẠT ĐỘNG HOÀN HẢO 100% TRÊN LIVE APIs!`);
  }
  console.log("================================================================================");
}

verifyAll18ViaApi().catch((err) => {
  console.error("Lỗi xác thực API:", err);
  process.exit(1);
});
