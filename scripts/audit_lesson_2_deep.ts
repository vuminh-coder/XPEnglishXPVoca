import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_KURZGESAGT_INTERSTELLAR } from "../features/listening/data/lessons/lesson_kurzgesagt_interstellar";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 2: KURZGESAGT (tybKnGZRwcU)   ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_KURZGESAGT_INTERSTELLAR.id}`);
  console.log(`- Slug                : ${LESSON_KURZGESAGT_INTERSTELLAR.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_KURZGESAGT_INTERSTELLAR.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_KURZGESAGT_INTERSTELLAR.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_KURZGESAGT_INTERSTELLAR.durationSeconds}s (${LESSON_KURZGESAGT_INTERSTELLAR.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_KURZGESAGT_INTERSTELLAR.cefrLevel} / ${LESSON_KURZGESAGT_INTERSTELLAR.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_KURZGESAGT_INTERSTELLAR.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_KURZGESAGT_INTERSTELLAR.categoryName} (${LESSON_KURZGESAGT_INTERSTELLAR.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_KURZGESAGT_INTERSTELLAR.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC:");
  const subPath = path.resolve(process.cwd(), "scripts/kurzgesagt_raw.en.json3");
  const rawSub = JSON.parse(fs.readFileSync(subPath, "utf8"));
  const rawLines = rawSub.events
    .filter((e: any) => e.segs)
    .map((e: any) => ({
      text: e.segs.map((s: any) => s.utf8).join("").replace(/\n/g, " ").replace(/\s+/g, " ").trim(),
    }))
    .filter((l: any) => l.text);

  const segMap = [
    [0], [1, 2], [3, 4], [5, 6], [7], [8], [9, 10], [11], [12], [13],
    [14, 15], [16, 17], [18, 19], [20, 21, 22], [23], [24], [25], [26],
    [27, 28], [29], [30, 31, 32]
  ];

  function cleanWords(s: string): string[] {
    return s
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/--/g, " ")
      .replace(/—/g, " ")
      .replace(/['"]+/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  }

  let totalWords = 0;
  let tokenErrors = 0;
  let wordDiffs = 0;

  LESSON_KURZGESAGT_INTERSTELLAR.segments.forEach((seg, idx) => {
    const offText = segMap[idx].map((i) => rawLines[i].text).join(" ");
    const offWords = cleanWords(offText);
    const segWords = cleanWords(seg.text);

    let match = offWords.length === segWords.length;
    if (match) {
      for (let w = 0; w < offWords.length; w++) {
        if (offWords[w] !== segWords[w]) {
          match = false;
          wordDiffs++;
          break;
        }
      }
    } else {
      wordDiffs += Math.abs(offWords.length - segWords.length);
    }

    const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
    totalWords += tokens.length;
    const dur = (seg.endTime - seg.startTime).toFixed(2);
    const validTokens = tokens.every((t) => t.clean.length > 0 && t.dots.length === t.clean.length);
    if (!validTokens) tokenErrors++;

    console.log(`\n  --- Câu #${seg.orderIndex} [${seg.startTime.toFixed(2)}s -> ${seg.endTime.toFixed(2)}s] (${dur}s) ---`);
    console.log(`  • Văn bản tiếng Anh: "${seg.text}"`);
    console.log(`  • Phụ đề YouTube   : "${offText}"`);
    console.log(`  • Khớp Verbatim    : ${match ? "✅ 100% HOÀN TOÀN TRÙNG KHỚP" : "❌ LỆCH TỪ"}`);
    console.log(`  • Bản dịch tiếng Việt: "${seg.translationVi}"`);
    console.log(`  • Phiên âm IPA      : /${seg.ipaUs}/`);
    console.log(`  • Phân tích AI Tutor: "${seg.explanationAi}"`);
    console.log(`  • Danh từ riêng     : [${(seg.properNouns || []).join(", ")}]`);
    console.log(`  • Token Dictation   : ${tokens.length} từ -> ${validTokens ? "✅ HỢP LỆ (100% gõ được)" : "❌ LỖI TOKEN"}`);
  });

  console.log(`\n=> Tổng số từ kiểm tra: ${totalWords} từ`);
  console.log(`=> Sai khác từ với YouTube gốc: ${wordDiffs} từ`);
  console.log(`=> Lỗi token Dictation: ${tokenErrors}`);

  // PHẦN 3: KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_KURZGESAGT_INTERSTELLAR.id },
        { slug: LESSON_KURZGESAGT_INTERSTELLAR.slug },
        { externalId: LESSON_KURZGESAGT_INTERSTELLAR.externalId },
      ],
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/21`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);

    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_KURZGESAGT_INTERSTELLAR.segments[idx];
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
        { id: LESSON_KURZGESAGT_INTERSTELLAR.id },
        { audioUrl: { contains: LESSON_KURZGESAGT_INTERSTELLAR.externalId } },
      ],
    },
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/21 câu`);
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
