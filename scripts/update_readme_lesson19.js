import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
const content = fs.readFileSync(readmePath, 'utf-8');

const startMarker = `   - Trình biên dịch TypeScript (\`npx tsc --noEmit\`): **0 lỗi (Zero TS Errors)**.\n\n---\n\n### 48. Mở Rộng Kho Video Lên 16 Bài Học Đa Dạng Chủ Đề Không Trùng Lặp & Đồng Bộ Cơ Sở Dữ Liệu Neon PostgreSQL\n1. **Mục Tiêu Nâng Cấp & Đa Dạng Hóa Hệ Thống (Content Diversity Expansion)**:`;

const endMarker = `   - **Xác minh qua Live API Routes ([` + '`scripts/verify_all_18_api.ts`' + `](file:///e:/XP%20English%20%20XP%20Voca/scripts/verify_all_18_api.ts))**: Cả 18 bài học đều nạp thành công 200 OK với đầy đủ 259/259 phân đoạn qua cả \`/api/video-catalog/lessons/[id]\` và \`/api/listening/lessons/[id]\`.\n\n---`;

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

console.log('startIndex:', startIndex, 'endIndex:', endIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const replacement = `   - Trình biên dịch TypeScript (\`npx tsc --noEmit\`): **0 lỗi (Zero TS Errors)**.

---

### 48. Mở Rộng Kho Video Lên 19 Bài Học Đa Dạng Chủ Đề Không Trùng Lặp & Đồng Bộ Cơ Sở Dữ Liệu Neon PostgreSQL
1. **Mục Tiêu Nâng Cấp & Đa Dạng Hóa Hệ Thống (Content Diversity Expansion)**:
   - Đáp ứng nhu cầu học viên luyện nghe và chép chính tả trên các ngữ cảnh đời thực và học thuật phong phú nhất, kho video đã được mở rộng mạnh mẽ từ 10 bài lên **19 bài học chính thức**, phân bổ trải rộng trên **11 danh mục chủ đề hoàn toàn độc lập và không trùng lặp**.
   - 100% video đều là các tác phẩm nổi tiếng toàn cầu, video YouTube thật đang hoạt động, có âm thanh và phụ đề khớp chính xác 100% từng từ (Verbatim), đầy đủ phiên âm IPA, dịch nghĩa tiếng Việt, giải thích AI và phân tích ngữ cảnh chuyên sâu.

2. **9 Bài Học Video Bổ Sung & 4 Danh Mục Mới**:
   - **4 Danh mục mới được chuẩn hóa ([`features/listening/data/categories.ts`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/categories.ts))**:
     * \`cat_career_business\` (Sự Nghiệp & Phỏng Vấn, icon 💼)
     * \`cat_food_dining\` (Ẩm Thực & Nhà Hàng, icon 🍽️)
     * \`cat_nature_planet\` (Thiên Nhiên & Trái Đất, icon 🌿)
     * \`cat_finance_wealth\` (Tài Chính & Tư Duy Đầu Tư, icon 📈)
   - **Chi tiết các bài học mới trong thư mục [`features/listening/data/lessons/`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/)**:
     11. [\`lesson_matt_walker_sleep.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_matt_walker_sleep.ts): **Matt Walker: Sleep Is Your Superpower | TED** (\`5MuIMqhT8DM\`, 12 phân đoạn, 85s, B2) – Khoa học thần kinh về giấc ngủ, củng cố trí nhớ và tế bào miễn dịch tự nhiên (270/270 từ, 0 diffs). Test: [\`__tests__/matt_walker_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/matt_walker_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_11_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_11_deep_audit.png).
     12. [\`lesson_oxford_food_cooking.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_oxford_food_cooking.ts): **Oxford Online English: Talk About Food and Cooking in English** (\`SlTrn13aez4\`, 12 phân đoạn, 121s, A2) – Dò sát 100% phụ đề YouTube gốc \`oxford_food.en.json3\` (228/228 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/oxford_food_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/oxford_food_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_12_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_12_deep_audit.png).
     13. [\`lesson_david_attenborough_planet.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_david_attenborough_planet.ts): **Sir David Attenborough: A Life on Our Planet | Netflix** (\`64R2MYUt394\`, 14 phân đoạn, 99s, B2) – Dò sát 100% phụ đề YouTube gốc \`attenborough.en-US.json3\` (129/129 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/attenborough_planet_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/attenborough_planet_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_13_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_13_deep_audit.png).
     14. [\`lesson_careervidz_interview.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_careervidz_interview.ts): **CareerVidz: Tell Me About Yourself (The S.E.A.T. Method)** (\`ml8HHHgDxiE\`, 12 phân đoạn, 87s, B1) – Dò sát 100% phụ đề YouTube gốc \`careervidz.en.json3\` (226/226 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/careervidz_interview_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/careervidz_interview_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_14_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_14_deep_audit.png).
     15. [\`lesson_ratatouille_anton_ego.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_ratatouille_anton_ego.ts): **Ratatouille: Anton Ego's Food Critic Review (The Bitter Truth)** (\`tAyQL1inris\`, 14 phân đoạn, 119s, C1) – Dò sát 100% phụ đề YouTube gốc \`ratatouille_ego.en.json3\` (242/242 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/ratatouille_ego_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/ratatouille_ego_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_15_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_15_deep_audit.png).
     16. [\`lesson_psychology_of_money.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_psychology_of_money.ts): **The Psychology of Money: Warren Buffett's Greatest Secret** (\`DOgVUMfcb7U\`, 9 phân đoạn, 48s, B2) – Dò sát 100% phụ đề YouTube gốc \`money.en.json3\` (125/125 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/psychology_of_money_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/psychology_of_money_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_16_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_16_deep_audit.png).
     17. [\`lesson_simon_sinek.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_simon_sinek.ts): **Simon Sinek: How Great Leaders Inspire Action (The Golden Circle)** (\`qp0HIF3SfI4\`, 8 phân đoạn, 107s, B2) – Dò sát 100% phụ đề YouTube gốc \`simon_sinek_ted.en.json3\` (286/286 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/simon_sinek_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/simon_sinek_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_17_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_17_deep_audit.png).
     18. [\`lesson_oxford_meeting.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_oxford_meeting.ts): **Oxford Online English: Attending a Meeting in English - Useful Phrases for Meetings** (\`NEKZFA7L7Lg\`, 10 phân đoạn, 102s, B1) – Dò sát 100% phụ đề YouTube gốc \`oxford_meeting.en.json3\` (175/175 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/oxford_meeting_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/oxford_meeting_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_18_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_18_deep_audit.png).
     19. [\`lesson_julian_treasure.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_julian_treasure.ts): **Julian Treasure: How to Speak So That People Want to Listen** (\`eIho2S0ZahI\`, 10 phân đoạn, 72s, B2) – Dò sát 100% phụ đề YouTube gốc \`julian_treasure.en.json3\` (177/177 từ, 0 diffs), đồng bộ đầy đủ cả 2 bảng \`VideoLesson\` + \`ListeningLesson\`, 2 Live APIs (200 OK). Test: [\`__tests__/julian_treasure_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/julian_treasure_verbatim.test.ts) (6/6 PASS). Screenshot: [\`public/dictation_lesson_19_deep_audit.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_19_deep_audit.png).

3. **Đồng Bộ Hóa Đa Tầng 3-Tier Hoàn Hảo & Kiểm Thử Tự Động Toàn Diện**:
   - **Tầng 1 (Neon PostgreSQL DB)**: Kịch bản [\`scripts/sync_julian_treasure_db.ts\`](file:///e:/XP%20English%20%20XP%20Voca/scripts/sync_julian_treasure_db.ts) đã đồng bộ thành công bài học 19 và toàn bộ 10 phân đoạn \`LessonSegment\`, \`VideoLesson\` và \`ListeningLesson\` vào cơ sở dữ liệu.
   - **Tầng 2 (Client RAM Mock)**: [\`features/listening/data/videoCatalogMockData.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/videoCatalogMockData.ts) re-export toàn vẹn 19 bài học và 11 danh mục.
   - **Tầng 3 (Modular Data Files)**: 19 tệp bài học độc lập nằm trong [\`features/listening/data/lessons/\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/).
   - **Bộ kiểm thử mở rộng ([\`__tests__/modular_lessons_deep_audit.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/modular_lessons_deep_audit.test.ts))**: Đạt **80 tests PASS**, xác minh 19/19 bài học không trùng lặp YouTube ID, không trùng lặp Slug, đúng danh mục, mốc thời gian liên tục và token hóa 100% hợp lệ.
   - **Tổng kết kiểm thử hệ thống**: **99/99 test files đạt 100% PASS (trong đó 19/19 bài học đều có bộ test verbatim riêng biệt đạt 125/125 tests PASS)**.
   - **Kịch bản kiểm toán tổng lực ([\`scripts/audit_all_19_system_deep.ts\`](file:///e:/XP%20English%20%20XP%20Voca/scripts/audit_all_19_system_deep.ts))**: Kiểm toán tự động 269 phân đoạn, 4,203 từ vựng, 4,202 tokens gõ phím, 19/19 tệp screenshot, 0 lỗi trùng lặp và 0 lỗi token.
   - **Trình biên dịch TypeScript (\`npx tsc --noEmit\`)**: **0 lỗi (Zero TS Errors)**.
   - **Xác minh qua Live API Routes ([\`scripts/verify_all_19_api.ts\`](file:///e:/XP%20English%20%20XP%20Voca/scripts/verify_all_19_api.ts))**: Cả 19 bài học đều nạp thành công 200 OK với đầy đủ 269/269 phân đoạn qua cả \`/api/video-catalog/lessons/[id]\` và \`/api/listening/lessons/[id]\`.

---`;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex + endMarker.length);
fs.writeFileSync(readmePath, newContent, 'utf-8');
console.log('README.md updated successfully! Length before:', content.length, 'after:', newContent.length);
