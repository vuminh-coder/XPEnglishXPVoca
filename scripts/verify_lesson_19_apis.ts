export {};

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM TRA LIVE API TRÊN PORT 3000 - BÀI HỌC 19: JULIAN TREASURE (eIho2S0ZahI)  ");
  console.log("================================================================================\n");

  const baseUrl = "http://localhost:3000";

  // Endpoint 1: Video Catalog API
  const videoCatalogUrl = `${baseUrl}/api/video-catalog/lessons/vid_julian_treasure_speak`;
  console.log(`1. Kiểm tra Video Catalog API: ${videoCatalogUrl}`);
  try {
    const res1 = await fetch(videoCatalogUrl);
    console.log(`   - HTTP Status: ${res1.status} ${res1.statusText}`);
    if (!res1.ok) {
      throw new Error(`Video Catalog API trả về status ${res1.status}`);
    }
    const json1 = await res1.json();
    const lesson = json1.lesson || json1;
    console.log(`   - ID: ${lesson.id}`);
    console.log(`   - Tiêu đề: ${lesson.title}`);
    console.log(`   - Số phân đoạn: ${lesson.segments?.length || 0}`);
    console.log(`   - External ID: ${lesson.externalId}`);
    console.log(`   - CEFR: ${lesson.cefrLevel}`);
    if (!lesson.segments || lesson.segments.length !== 10) {
      throw new Error(`Kỳ vọng 10 segments nhưng nhận được ${lesson.segments?.length}`);
    }
    console.log("   ✅ Video Catalog API: ĐẠT CHUẨN 200 OK & ĐẦY ĐỦ 10 SEGMENTS!\n");
  } catch (err) {
    console.error("   ❌ Video Catalog API thất bại:", err);
    process.exit(1);
  }

  // Endpoint 2: Listening Lesson API
  const listeningUrl = `${baseUrl}/api/listening/lessons/vid_julian_treasure_speak`;
  console.log(`2. Kiểm tra Listening Lesson API: ${listeningUrl}`);
  try {
    const res2 = await fetch(listeningUrl);
    console.log(`   - HTTP Status: ${res2.status} ${res2.statusText}`);
    if (!res2.ok) {
      throw new Error(`Listening Lesson API trả về status ${res2.status}`);
    }
    const json2 = await res2.json();
    const lData = json2.data || json2;
    console.log(`   - ID: ${lData.id}`);
    console.log(`   - Tiêu đề: ${lData.title}`);
    console.log(`   - Audio URL: ${lData.audioUrl}`);
    const transcript = Array.isArray(lData.transcript) ? lData.transcript : [];
    console.log(`   - Transcript segments: ${transcript.length}`);
    if (transcript.length !== 10) {
      throw new Error(`Kỳ vọng 10 transcript segments nhưng nhận được ${transcript.length}`);
    }
    console.log("   ✅ Listening Lesson API: ĐẠT CHUẨN 200 OK & ĐẦY ĐỦ 10 TRANSCRIPT SEGMENTS!\n");
  } catch (err) {
    console.error("   ❌ Listening Lesson API thất bại:", err);
    process.exit(1);
  }

  console.log("================================================================================");
  console.log("   🎉 CẢ 2 ENDPOINT API TRÊN PORT 3000 HOẠT ĐỘNG HOÀN HẢO VỚI BÀI HỌC 19!        ");
  console.log("================================================================================");
}

main().catch((err) => {
  console.error("Lỗi kiểm tra Live API bài học 19:", err);
  process.exit(1);
});
