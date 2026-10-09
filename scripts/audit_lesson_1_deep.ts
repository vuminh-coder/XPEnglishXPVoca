import { PrismaClient } from "@prisma/client";
import { LESSON_REWRITE_THE_STARS } from "../features/listening/data/lessons/lesson_rewrite_the_stars";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 1: REWRITE THE STARS (pRfmrE0ToTo)   ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_REWRITE_THE_STARS.id}`);
  console.log(`- Slug                : ${LESSON_REWRITE_THE_STARS.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_REWRITE_THE_STARS.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_REWRITE_THE_STARS.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_REWRITE_THE_STARS.durationSeconds}s (${LESSON_REWRITE_THE_STARS.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_REWRITE_THE_STARS.cefrLevel} / ${LESSON_REWRITE_THE_STARS.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_REWRITE_THE_STARS.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_REWRITE_THE_STARS.categoryName} (${LESSON_REWRITE_THE_STARS.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_REWRITE_THE_STARS.segments.length} phân đoạn`);

  // PHẦN 2: CHI TIẾT TỪNG PHÂN ĐOẠN & TOKEN HÓA (SEGMENTS & TOKENIZATION)
  console.log("\n>>> [PHẦN 2] KIỂM TRA CHI TIẾT TỪNG TRONG 18 PHÂN ĐOẠN:");
  let totalWords = 0;
  let tokenErrors = 0;
  let timelineGaps = 0;

  LESSON_REWRITE_THE_STARS.segments.forEach((seg, idx) => {
    const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
    totalWords += tokens.length;
    const dur = (seg.endTime - seg.startTime).toFixed(2);
    const validTokens = tokens.every(t => t.clean.length > 0 && t.dots.length === t.clean.length);

    if (!validTokens) tokenErrors++;

    console.log(`\n  --- Câu #${seg.orderIndex} [${seg.startTime.toFixed(2)}s -> ${seg.endTime.toFixed(2)}s] (${dur}s) ---`);
    console.log(`  • Văn bản tiếng Anh: "${seg.text}"`);
    console.log(`  • Bản dịch tiếng Việt: "${seg.translationVi}"`);
    console.log(`  • Phiên âm IPA      : /${seg.ipaUs}/`);
    console.log(`  • Phân tích AI Tutor: "${seg.explanationAi}"`);
    console.log(`  • Từ khóa quan trọng: [${(seg.keywords || []).join(", ")}]`);
    console.log(`  • Token Dictation   : ${tokens.length} từ -> ${validTokens ? "✅ HỢP LỆ (100% gõ được)" : "❌ LỖI TOKEN"}`);

    if (idx > 0) {
      const prev = LESSON_REWRITE_THE_STARS.segments[idx - 1];
      if (seg.startTime < prev.endTime) {
        console.warn(`    ⚠️ CẢNH BÁO TIMELINE: Chồng lấn thời gian với câu #${prev.orderIndex} (${seg.startTime}s < ${prev.endTime}s)`);
        timelineGaps++;
      }
    }
  });

  console.log(`\n=> Tổng số từ cần gõ trong bài: ${totalWords} từ`);
  console.log(`=> Lỗi token: ${tokenErrors} | Lỗi timeline: ${timelineGaps}`);

  // PHẦN 3: KIỂM TRA CƠ SỞ DỮ LIỆU NEON POSTGRESQL (DATABASE PARITY)
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_REWRITE_THE_STARS.id },
        { slug: LESSON_REWRITE_THE_STARS.slug },
        { externalId: LESSON_REWRITE_THE_STARS.externalId }
      ]
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    }
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson tìm thấy trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/18`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);
    
    // Kiểm tra khớp từng câu giữa DB và Mock
    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_REWRITE_THE_STARS.segments[idx];
      if (!mockSeg || dbSeg.text !== mockSeg.text) {
        dbMismatches++;
        console.log(`   ❌ Khác biệt ở câu #${idx + 1}: DB="${dbSeg.text}" vs Mock="${mockSeg?.text}"`);
      }
    });
    console.log(`   => Số phân đoạn sai lệch giữa DB và Mock: ${dbMismatches}`);
  } else {
    console.log("❌ VideoLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
  }

  const dbListening = await prisma.listeningLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_REWRITE_THE_STARS.id },
        { audioUrl: { contains: LESSON_REWRITE_THE_STARS.externalId } }
      ]
    }
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson tìm thấy trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/18 câu`);
  } else {
    console.log("❌ ListeningLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
  }

  console.log("\n================================================================================");
}

main()
  .catch((e) => {
    console.error("Lỗi khi kiểm thử:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
