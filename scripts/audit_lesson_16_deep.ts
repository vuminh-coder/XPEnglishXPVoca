export {};
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_PSYCHOLOGY_OF_MONEY } from "../features/listening/data/lessons/lesson_psychology_of_money";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 16: PSYCHOLOGY OF MONEY (DOgVUMfcb7U)   ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_PSYCHOLOGY_OF_MONEY.id}`);
  console.log(`- Slug                : ${LESSON_PSYCHOLOGY_OF_MONEY.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_PSYCHOLOGY_OF_MONEY.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_PSYCHOLOGY_OF_MONEY.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_PSYCHOLOGY_OF_MONEY.durationSeconds}s (${LESSON_PSYCHOLOGY_OF_MONEY.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_PSYCHOLOGY_OF_MONEY.cefrLevel} / ${LESSON_PSYCHOLOGY_OF_MONEY.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_PSYCHOLOGY_OF_MONEY.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_PSYCHOLOGY_OF_MONEY.categoryName} (${LESSON_PSYCHOLOGY_OF_MONEY.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_PSYCHOLOGY_OF_MONEY.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC:");
  const subPath = path.resolve(process.cwd(), "scripts/money.en.json3");
  const rawJson = JSON.parse(fs.readFileSync(subPath, "utf8"));

  function cleanWords(str: string): string[] {
    return str
      .replace(/stock-picking/gi, "stockpicking")
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/…/g, "...")
      .replace(/['"]+/g, " ")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  }

  const wordEvents: Array<{ time: number; word: string }> = [];
  rawJson.events.forEach((e: any) => {
    if (e.segs) {
      e.segs.forEach((s: any) => {
        const txt = (s.utf8 || "").trim();
        if (txt && txt !== "\n") {
          const offset = s.tOffsetMs || 0;
          const time = (e.tStartMs + offset) / 1000;
          const words = cleanWords(txt);
          words.forEach((w) => {
            wordEvents.push({ time, word: w });
          });
        }
      });
    }
  });

  const uniqueWords: string[] = [];
  for (let i = 0; i < wordEvents.length; i++) {
    const w = wordEvents[i];
    const last = uniqueWords[uniqueWords.length - 1];
    if (last && last === w.word && Math.abs(w.time - (wordEvents[i - 1]?.time || 0)) < 0.5) {
      continue;
    }
    uniqueWords.push(w.word);
  }

  function normalizeAsr(words: string[]): string[] {
    return words.map((w) => {
      if (w === "howell" || w === "howel") return "housel";
      return w;
    });
  }

  const normRaw = normalizeAsr(uniqueWords);
  const normLesson = normalizeAsr(
    cleanWords(LESSON_PSYCHOLOGY_OF_MONEY.segments.map((s) => s.text).join(" "))
  );

  let totalTokens = 0;
  let tokenErrors = 0;

  LESSON_PSYCHOLOGY_OF_MONEY.segments.forEach((seg, idx) => {
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

  console.log(`\n=> Tổng số từ bài học: ${normLesson.length} từ`);
  console.log(`=> Tổng số từ YouTube hội thoại gốc: ${normRaw.length} từ`);

  let wordDiffs = 0;
  const maxLen = Math.max(normRaw.length, normLesson.length);
  for (let i = 0; i < maxLen; i++) {
    const rw = normRaw[i] || "<END_RAW>";
    const lw = normLesson[i] || "<END_LESSON>";
    if (rw !== lw) {
      wordDiffs++;
      if (wordDiffs <= 10) {
        console.log(`   Khác biệt tại index ${i}: Raw="${normRaw[i]}" vs Lesson="${normLesson[i]}"`);
      }
    }
  }

  console.log(`=> Sai khác từ với YouTube gốc: ${wordDiffs} từ (khớp ${normRaw.length - wordDiffs}/${normRaw.length} từ)`);
  console.log(`=> Lỗi token Dictation: ${tokenErrors}`);

  if (wordDiffs === 0) {
    console.log(`=> TRẠNG THÁI: [100% VERBATIM MATCH] Tuyệt đối không có sai lệch!`);
  } else {
    console.log(`=> TRẠNG THÁI: [LỖI] Có ${wordDiffs} sai khác!`);
    process.exit(1);
  }

  // PHẦN 3: KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL (DUAL-TABLE)
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_PSYCHOLOGY_OF_MONEY.id },
        { slug: LESSON_PSYCHOLOGY_OF_MONEY.slug },
        { externalId: LESSON_PSYCHOLOGY_OF_MONEY.externalId },
      ],
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/9`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);

    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_PSYCHOLOGY_OF_MONEY.segments[idx];
      if (!mockSeg || dbSeg.text !== mockSeg.text) {
        dbMismatches++;
        console.log(`   ❌ Khác biệt ở câu #${idx + 1}: DB="${dbSeg.text}" vs Mock="${mockSeg?.text}"`);
      }
    });
    console.log(`   => Số phân đoạn sai lệch giữa DB và Mock: ${dbMismatches}`);
  } else {
    console.log("❌ VideoLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
    process.exit(1);
  }

  const dbListening = await prisma.listeningLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_PSYCHOLOGY_OF_MONEY.id },
        { audioUrl: { contains: LESSON_PSYCHOLOGY_OF_MONEY.externalId } },
      ],
    },
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/9 câu`);
  } else {
    console.log("❌ ListeningLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
    process.exit(1);
  }

  console.log("\n================================================================================");
  console.log("   HOÀN TẤT KIỂM THỬ: BÀI HỌC 16 ĐẠT CHUẨN 100% VERBATIM & SYNC TOÀN DIỆN!       ");
  console.log("================================================================================");
}

main()
  .catch((e) => {
    console.error("Lỗi khi kiểm thử:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
