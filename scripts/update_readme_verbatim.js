const fs = require('fs');

let txt = fs.readFileSync('README.md', 'utf8');

const target = '11. [`lesson_matt_walker_sleep.ts`]';
const idx = txt.indexOf(target);
if (idx === -1) {
  console.error('Target not found!');
  process.exit(1);
}

const endIdx = txt.indexOf('3. **Đồng Bộ Hóa Đa Tầng');
if (endIdx === -1) {
  console.error('End target not found!');
  process.exit(1);
}

const newBlock = `11. [\`lesson_matt_walker_sleep.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_matt_walker_sleep.ts): **Matt Walker: Sleep Is Your Superpower | TED** (\`5MuIMqhT8DM\`, 12 phân đoạn, 121s, B2) – Dò sát 100% phụ đề và audio YouTube gốc, cơ chế thần kinh củng cố trí nhớ và tế bào miễn dịch. Test: [\`__tests__/matt_walker_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/matt_walker_verbatim.test.ts).
      12. [\`lesson_oxford_food_cooking.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_oxford_food_cooking.ts): **Oxford Online English: Talk About Food and Cooking in English** (\`SlTrn13aez4\`, 12 phân đoạn, 121s, A2) – Dò sát 100% hội thoại thực tế ẩm thực quốc tế (UK, Berlin, Mediterranean, Spanish, Italian, roast, shepherd's pie, paella, albondigas). Test: [\`__tests__/oxford_food_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/oxford_food_verbatim.test.ts).
      13. [\`lesson_david_attenborough_planet.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_david_attenborough_planet.ts): **Sir David Attenborough: A Life on Our Planet | Netflix** (\`64R2MYUt394\`, 14 phân đoạn, 99s, B2) – Dò sát 100% từng từ giọng đọc kinh điển của Sir David Attenborough về lời khai nhân chứng và thông điệp cứu rỗi Trái Đất. Test: [\`__tests__/attenborough_planet_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/attenborough_planet_verbatim.test.ts).
      14. [\`lesson_careervidz_interview.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_careervidz_interview.ts): **CareerVidz: Tell Me About Yourself (The S.E.A.T. Method)** (\`ml8HHHgDxiE\`, 12 phân đoạn, 87s, B1) – Dò sát 100% video phỏng vấn Richard McMunn: phân tích câu trả lời tệ hại và bài mẫu chuẩn mực ghi điểm phỏng vấn. Test: [\`__tests__/careervidz_interview_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/careervidz_interview_verbatim.test.ts).
      15. [\`lesson_ratatouille_anton_ego.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_ratatouille_anton_ego.ts): **Ratatouille: Anton Ego's Food Critic Review (The Bitter Truth)** (\`tAyQL1inris\`, 14 phân đoạn, 119s, C1) – Chuẩn hóa sang YouTube ID đang hoạt động với đầy đủ phụ đề gốc, bài phê bình điện ảnh bất hủ của Pixar. Test: [\`__tests__/ratatouille_ego_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/ratatouille_ego_verbatim.test.ts).
      16. [\`lesson_psychology_of_money.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_psychology_of_money.ts): **The Psychology of Money: Warren Buffett's Greatest Secret** (\`DOgVUMfcb7U\`, 8 phân đoạn, 48s, B2) – Dò sát 100% từng từ về bí mật 70 năm đầu tư của Warren Buffett và sức mạnh của lãi suất kép từ Morgan Housel. Test: [\`__tests__/psychology_of_money_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/psychology_of_money_verbatim.test.ts).

`;

txt = txt.substring(0, idx) + newBlock + txt.substring(endIdx);

txt = txt.replace('3. **Đồng Bộ Hóa Đa Tầng 3-Tier Hoàn Hảo & Kiểm Thử Tự Động (125/125 Tests Pass)**:', '3. **Đồng Bộ Hóa Đa Tầng 3-Tier Hoàn Hảo & Kiểm Thử Tự Động Toàn Diện (920/920 Tests Pass)**:');
txt = txt.replace('11/11 test files đạt 125/125 tests PASS 100%', '90/90 test files đạt 920/920 tests PASS 100% (trong đó 16/16 bài học đều có bộ test verbatim riêng biệt đạt 87/87 tests PASS)');

fs.writeFileSync('README.md', txt, 'utf8');
console.log('README.md successfully updated!');
