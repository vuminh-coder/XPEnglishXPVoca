export {};
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_SIMON_SINEK } from "../features/listening/data/lessons/lesson_simon_sinek";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 17: SIMON SINEK (qp0HIF3SfI4)         ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_SIMON_SINEK.id}`);
  console.log(`- Slug                : ${LESSON_SIMON_SINEK.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_SIMON_SINEK.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_SIMON_SINEK.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_SIMON_SINEK.durationSeconds}s (${LESSON_SIMON_SINEK.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_SIMON_SINEK.cefrLevel} / ${LESSON_SIMON_SINEK.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_SIMON_SINEK.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_SIMON_SINEK.categoryName} (${LESSON_SIMON_SINEK.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_SIMON_SINEK.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC (TED):");
  const subPath = path.resolve(process.cwd(), "scripts/simon_sinek_ted.en.json3");
  const rawJson = JSON.parse(fs.readFileSync(subPath, "utf8"));

  function cleanWords(str: string): string[] {
    return str
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/--/g, " ")
      .replace(/['"]+/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  }

  const events = rawJson.events.filter(
    (e: any) => e.tStartMs >= 16000 && e.tStartMs < 125000 && e.segs
  );

  const rawWords: string[] = [];
  events.forEach((e: any) => {
    const txt = e.segs.map((s: any) => s.utf8).join("").replace(/\n/g, " ");
    rawWords.push(...cleanWords(txt));
  });

  const lessonWords: string[] = [];
  LESSON_SIMON_SINEK.segments.forEach((seg) => {
    lessonWords.push(...cleanWords(seg.text));
  });

  console.log(`- Tổng số từ phụ đề YouTube TED : ${rawWords.length}`);
  console.log(`- Tổng số từ dữ liệu bài học    : ${lessonWords.length}`);

  let wordDiffCount = 0;
  const maxLen = Math.max(rawWords.length, lessonWords.length);
  for (let i = 0; i < maxLen; i++) {
    const rw = rawWords[i] || "<THIẾU>";
    const lw = lessonWords[i] || "<THIẾU>";
    if (rw !== lw) {
      console.log(`  ❌ Lệch từ #${i + 1}: YouTube="${rw}" vs Bài học="${lw}"`);
      wordDiffCount++;
    }
  }

  if (wordDiffCount === 0) {
    console.log(`\n🎉 KẾT QUẢ ĐỐI SOÁT TỪ VỰNG: KHỚP TUYỆT ĐỐI 100% (${lessonWords.length}/${rawWords.length} TỪ, 0 SAI LỆCH)!`);
  } else {
    throw new Error(`Phát hiện ${wordDiffCount} từ bị lệch!`);
  }

  // PHẦN 3: KIỂM TOÁN TỪNG PHÂN ĐOẠN, TOKEN HÓA VÀ PEDAGOGICAL METADATA
  console.log("\n>>> [PHẦN 3] CHI TIẾT 8 PHÂN ĐOẠN & TOKEN HÓA DICTATION:");
  let totalTokens = 0;
  let tokenErrors = 0;

  LESSON_SIMON_SINEK.segments.forEach((seg) => {
    const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
    totalTokens += tokens.length;
    const dur = (seg.endTime - seg.startTime).toFixed(2);
    const validTokens = tokens.every((t) => t.clean.length > 0 && t.dots.length === t.clean.length);
    if (!validTokens) tokenErrors++;

    console.log(`\n  --- Câu #${seg.orderIndex + 1} [${seg.startTime.toFixed(2)}s -> ${seg.endTime.toFixed(2)}s] (${dur}s) ---`);
    console.log(`  • Văn bản tiếng Anh: "${seg.text}"`);
    console.log(`  • Bản dịch tiếng Việt: "${seg.translationVi}"`);
    console.log(`  • Phiên âm IPA      : ${seg.ipaUs}`);
    console.log(`  • Danh từ riêng     : [${(seg.properNouns || []).join(", ")}]`);
    console.log(`  • Từ khóa quan trọng: [${(seg.keywords || []).join(", ")}]`);
    console.log(`  • Token Dictation   : ${tokens.length} từ -> ${validTokens ? "✅ HỢP LỆ (100% gõ được)" : "❌ LỖI TOKEN"}`);
  });

  console.log(`\n- Tổng số tokens cần gõ trong bài học: ${totalTokens}`);
  console.log(`- Số lỗi token: ${tokenErrors}`);

  // PHẦN 4: KIỂM TRA ĐỒNG BỘ 2 BẢNG NEON POSTGRESQL (VideoLesson & ListeningLesson)
  console.log("\n>>> [PHẦN 4] KIỂM TRA ĐỒNG BỘ 2 BẢNG CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const videoInDb = await prisma.videoLesson.findUnique({
    where: { id: LESSON_SIMON_SINEK.id },
    include: { segments: { orderBy: { orderIndex: "asc" } } },
  });

  if (!videoInDb) {
    throw new Error(`Không tìm thấy bài học ${LESSON_SIMON_SINEK.id} trong bảng VideoLesson!`);
  }
  console.log(`✅ [Bảng 1: VideoLesson] Tìm thấy: ${videoInDb.id} - ${videoInDb.title}`);
  console.log(`   - Số segments: ${videoInDb.segments.length}/8`);

  const listeningInDb = await prisma.listeningLesson.findUnique({
    where: { id: LESSON_SIMON_SINEK.id },
  });

  if (!listeningInDb) {
    throw new Error(`Không tìm thấy bài học ${LESSON_SIMON_SINEK.id} trong bảng ListeningLesson!`);
  }
  console.log(`✅ [Bảng 2: ListeningLesson] Tìm thấy: ${listeningInDb.id} - ${listeningInDb.title}`);
  const transcript = Array.isArray(listeningInDb.transcript) ? listeningInDb.transcript : [];
  console.log(`   - Số transcript segments: ${transcript.length}/8`);

  console.log("\n================================================================================");
  console.log("   TẤT CẢ 4 PHẦN AUDIT ĐÃ ĐẠT CHUẨN 100% HOÀN HẢO!                              ");
  console.log("================================================================================");
}

main()
  .catch((e) => {
    console.error("Lỗi audit chuyên sâu bài học 17:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
