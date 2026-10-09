import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_AIRPORT_CHECKIN } from "../features/listening/data/lessons/lesson_airport_checkin";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 8: AIRPORT CHECK-IN (bIz2Gzu3DKE)        ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_AIRPORT_CHECKIN.id}`);
  console.log(`- Slug                : ${LESSON_AIRPORT_CHECKIN.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_AIRPORT_CHECKIN.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_AIRPORT_CHECKIN.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_AIRPORT_CHECKIN.durationSeconds}s (${LESSON_AIRPORT_CHECKIN.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_AIRPORT_CHECKIN.cefrLevel} / ${LESSON_AIRPORT_CHECKIN.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_AIRPORT_CHECKIN.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_AIRPORT_CHECKIN.categoryName} (${LESSON_AIRPORT_CHECKIN.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_AIRPORT_CHECKIN.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI FILE ÂM THANH GỐC (WHISPER AI AUDIO DATA)
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI AUDIO WHISPER GỐC:");
  const audioDataPath = path.resolve(process.cwd(), "scripts/airport_audio.json");
  const audioData = JSON.parse(fs.readFileSync(audioDataPath, "utf8"));

  const whisperWords: string[] = [];
  audioData.segments.forEach((s: any) => {
    if (s.words) {
      s.words.forEach((w: any) => {
        const trimmed = w.word.trim();
        if (trimmed) whisperWords.push(trimmed);
      });
    }
  });

  const normalize = (w: string) => w.replace(/[.,!?:;\"\'\(\)\-]/g, "").toLowerCase();

  let totalWords = 0;
  let tokenErrors = 0;

  LESSON_AIRPORT_CHECKIN.segments.forEach((seg, idx) => {
    const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
    totalWords += tokens.length;
    const dur = (seg.endTime - seg.startTime).toFixed(2);
    const validTokens = tokens.every((t) => t.clean.length > 0 && t.dots.length === t.clean.length);
    if (!validTokens) tokenErrors++;

    console.log(`\n  --- Câu #${seg.orderIndex + 1} [${seg.startTime.toFixed(2)}s -> ${seg.endTime.toFixed(2)}s] (${dur}s) ---`);
    console.log(`  • Văn bản tiếng Anh: "${seg.text}"`);
    console.log(`  • Bản dịch tiếng Việt: "${seg.translationVi}"`);
    console.log(`  • Phiên âm IPA      : /${seg.ipaUs}/`);
    console.log(`  • Danh từ riêng     : [${(seg.properNouns || []).join(", ")}]`);
    console.log(`  • Từ khóa quan trọng: [${(seg.keywords || []).join(", ")}]`);
    console.log(`  • Token Dictation   : ${tokens.length} từ -> ${validTokens ? "✅ HỢP LỆ (100% gõ được)" : "❌ LỖI TOKEN"}`);
  });

  const lessonWords: string[] = [];
  LESSON_AIRPORT_CHECKIN.segments.forEach((s) => {
    const ws = s.text.trim().split(/\s+/);
    ws.forEach((w) => lessonWords.push(w));
  });

  console.log(`\n=> Tổng số từ bài học: ${lessonWords.length} từ`);
  console.log(`=> Tổng số từ Whisper Audio gốc: ${whisperWords.length} từ`);

  let wordDiffs = 0;
  const maxLen = Math.max(whisperWords.length, lessonWords.length);
  for (let i = 0; i < maxLen; i++) {
    const ww = whisperWords[i] ? normalize(whisperWords[i]) : "<EOF>";
    const lw = lessonWords[i] ? normalize(lessonWords[i]) : "<EOF>";
    if (ww !== lw) {
      wordDiffs++;
      if (wordDiffs <= 10) {
        console.log(`   Khác biệt tại index ${i}: Whisper="${whisperWords[i]}" vs Lesson="${lessonWords[i]}"`);
      }
    }
  }

  console.log(`=> Sai khác từ với Audio gốc: ${wordDiffs} từ (khớp ${whisperWords.length - wordDiffs}/${whisperWords.length} từ)`);
  console.log(`=> Lỗi token Dictation: ${tokenErrors}`);

  // PHẦN 3: KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_AIRPORT_CHECKIN.id },
        { slug: LESSON_AIRPORT_CHECKIN.slug },
        { externalId: LESSON_AIRPORT_CHECKIN.externalId },
      ],
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/16`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);

    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_AIRPORT_CHECKIN.segments[idx];
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
        { id: LESSON_AIRPORT_CHECKIN.id },
        { audioUrl: { contains: LESSON_AIRPORT_CHECKIN.externalId } },
      ],
    },
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/16 câu`);
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
