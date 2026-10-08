const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(process.cwd(), 'scripts/money.en.json3');
const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Extract raw word events
const wordEvents = [];
rawJson.events.forEach((e) => {
  if (e.segs) {
    e.segs.forEach((s) => {
      const txt = (s.utf8 || '').trim();
      if (txt && txt !== '\n') {
        const offset = s.tOffsetMs || 0;
        const time = (e.tStartMs + offset) / 1000;
        wordEvents.push({ time, word: txt });
      }
    });
  }
});

// Deduplicate rolling window
const uniqueWords = [];
for (let i = 0; i < wordEvents.length; i++) {
  const w = wordEvents[i];
  const last = uniqueWords[uniqueWords.length - 1];
  if (last && last.word === w.word && Math.abs(w.time - (wordEvents[i - 1]?.time || 0)) < 0.5) {
    continue;
  }
  uniqueWords.push(w);
}

const lessonCode = fs.readFileSync('features/listening/data/lessons/lesson_psychology_of_money.ts', 'utf8');

function cleanWord(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

console.log('Total raw unique words detected:', uniqueWords.length);

// Parse segments from lesson
const segmentBlocks = lessonCode.split(/orderIndex:\s*\d+/g).slice(1);
let rawWordPointer = 0;

segmentBlocks.forEach((block, idx) => {
  const startMatch = block.match(/startTime:\s*([\d.]+)/);
  const endMatch = block.match(/endTime:\s*([\d.]+)/);
  const textMatch = block.match(/text:\s*"([^"]+)"/);
  const transMatch = block.match(/translationVi:\s*"([^"]+)"/);
  const ipaMatch = block.match(/ipaUs:\s*"([^"]+)"/);
  const properNounsMatch = block.match(/properNouns:\s*\[([^\]]*)\]/);

  const text = textMatch ? textMatch[1] : '';
  const startTime = parseFloat(startMatch ? startMatch[1] : '0');
  const endTime = parseFloat(endMatch ? endMatch[1] : '0');
  const trans = transMatch ? transMatch[1] : '';
  const ipa = ipaMatch ? ipaMatch[1] : '';
  const properNouns = properNounsMatch ? properNounsMatch[1].trim() : '';

  const lessonWords = text.split(/\s+/).map(cleanWord).filter(Boolean);
  const matchedRawWords = [];

  while (rawWordPointer < uniqueWords.length && matchedRawWords.length < lessonWords.length) {
    const rawW = uniqueWords[rawWordPointer];
    matchedRawWords.push(rawW);
    rawWordPointer++;
  }

  const firstRaw = matchedRawWords[0];
  const lastRaw = matchedRawWords[matchedRawWords.length - 1];

  console.log(`\n======================================================`);
  console.log(`PHÂN ĐOẠN #${idx + 1} (${startTime}s - ${endTime}s) | Độ dài: ${(endTime - startTime).toFixed(2)}s`);
  console.log(`Văn bản gốc: "${text}"`);
  console.log(`Bản dịch:    "${trans}"`);
  console.log(`Phiên âm:    "${ipa}"`);
  console.log(`Tên riêng:   [${properNouns}]`);
  console.log(`Từ vựng:     ${lessonWords.length} từ`);
  console.log(`Khớp Audio:  Từ đầu "${firstRaw ? firstRaw.word : ''}" (${firstRaw ? firstRaw.time.toFixed(2) : ''}s) -> Từ cuối "${lastRaw ? lastRaw.word : ''}" (${lastRaw ? lastRaw.time.toFixed(2) : ''}s)`);
  console.log(`Phạm vi an toàn: ${startTime <= (firstRaw ? firstRaw.time : 0) && endTime >= (lastRaw ? lastRaw.time : 0) ? 'CHUẨN 100% (Khung thời gian bao trọn âm tiết, không cắt cụm, không lấn câu)' : 'CẦN ĐIỀU CHỈNH'}`);
});
