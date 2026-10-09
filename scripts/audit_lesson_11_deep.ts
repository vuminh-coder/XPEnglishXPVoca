import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_MATT_WALKER_SLEEP } from "../features/listening/data/lessons/lesson_matt_walker_sleep";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 11: MATT WALKER SLEEP (5MuIMqhT8DM)      ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_MATT_WALKER_SLEEP.id}`);
  console.log(`- Slug                : ${LESSON_MATT_WALKER_SLEEP.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_MATT_WALKER_SLEEP.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_MATT_WALKER_SLEEP.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_MATT_WALKER_SLEEP.durationSeconds}s (${LESSON_MATT_WALKER_SLEEP.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_MATT_WALKER_SLEEP.cefrLevel} / ${LESSON_MATT_WALKER_SLEEP.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_MATT_WALKER_SLEEP.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_MATT_WALKER_SLEEP.categoryName} (${LESSON_MATT_WALKER_SLEEP.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_MATT_WALKER_SLEEP.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC:");
  const subPath = path.resolve(process.cwd(), "scripts/matt_walker.en.json3");
  const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));

  const rawWords: string[] = [];
  sub.events.forEach((e: any) => {
    if (!e.segs) return;
    const baseT = e.tStartMs;
    if (baseT > 122000) return;
    e.segs.forEach((s: any) => {
      const text = s.utf8;
      if (!text || text === "\n") return;
      const offset = s.tOffsetMs || 0;
      const startMs = baseT + offset;
      const trimmed = text.trim();
      if (trimmed && !trimmed.startsWith("(") && !trimmed.startsWith("[")) {
        const parts = trimmed.split(/\s+/);
        parts.forEach((p: string) => {
          if (p) rawWords.push(p);
        });
      }
    });
  });

  const normalize = (w: string) => w.replace(/[.,!?:;\"\'\(\)\-]/g, "").toLowerCase();

  let totalWords = 0;
  let tokenErrors = 0;

  LESSON_MATT_WALKER_SLEEP.segments.forEach((seg, idx) => {
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
  LESSON_MATT_WALKER_SLEEP.segments.forEach((s) => {
    const ws = s.text.trim().split(/\s+/);
    ws.forEach((w) => lessonWords.push(w));
  });

  console.log(`\n=> Tổng số từ bài học: ${lessonWords.length} từ`);
  console.log(`=> Tổng số từ YouTube gốc: ${rawWords.length} từ`);

  let wordDiffs = 0;
  const maxLen = Math.max(rawWords.length, lessonWords.length);
  for (let i = 0; i < maxLen; i++) {
    const rw = rawWords[i] ? normalize(rawWords[i]) : "<EOF>";
    const lw = lessonWords[i] ? normalize(lessonWords[i]) : "<EOF>";
    if (rw !== lw) {
      wordDiffs++;
      if (wordDiffs <= 10) {
        console.log(`   Khác biệt tại index ${i}: Raw="${rawWords[i]}" vs Lesson="${lessonWords[i]}"`);
      }
    }
  }

  console.log(`=> Sai khác từ với YouTube gốc: ${wordDiffs} từ (khớp ${rawWords.length - wordDiffs}/${rawWords.length} từ)`);
  console.log(`=> Lỗi token Dictation: ${tokenErrors}`);

  // PHẦN 3: KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_MATT_WALKER_SLEEP.id },
        { slug: LESSON_MATT_WALKER_SLEEP.slug },
        { externalId: LESSON_MATT_WALKER_SLEEP.externalId },
      ],
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/12`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);

    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_MATT_WALKER_SLEEP.segments[idx];
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
        { id: LESSON_MATT_WALKER_SLEEP.id },
        { audioUrl: { contains: LESSON_MATT_WALKER_SLEEP.externalId } },
      ],
    },
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/12 câu`);
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
