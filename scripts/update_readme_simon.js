const fs = require('fs');

let readme = fs.readFileSync('README.md', 'utf8');

// 1. Update section 48.2: add Lesson 17
const search1 = `      16. [\`lesson_psychology_of_money.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_psychology_of_money.ts): **The Psychology of Money: Warren Buffett's Greatest Secret** (\`DOgVUMfcb7U\`, 8 phân đoạn, 48s, B2) – Dò sát 100% từng từ về bí mật 70 năm đầu tư của Warren Buffett và sức mạnh của lãi suất kép từ Morgan Housel. Test: [\`__tests__/psychology_of_money_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/psychology_of_money_verbatim.test.ts).`;

const replace1 = `      16. [\`lesson_psychology_of_money.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_psychology_of_money.ts): **The Psychology of Money: Warren Buffett's Greatest Secret** (\`DOgVUMfcb7U\`, 9 phân đoạn, 48s, B2) – Dò sát 100% từng từ về bí mật 70 năm đầu tư của Warren Buffett và sức mạnh của lãi suất kép từ Morgan Housel. Test: [\`__tests__/psychology_of_money_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/psychology_of_money_verbatim.test.ts). Screenshot: [\`public/dictation_money_100_verbatim.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_money_100_verbatim.png).
      17. [\`lesson_simon_sinek.ts\`](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_simon_sinek.ts): **Simon Sinek: How Great Leaders Inspire Action (The Golden Circle)** (\`qp0HIF3SfI4\`, 8 phân đoạn, 107s, B2) – Dò sát 100% video TED kinh điển đạt hơn 60 triệu lượt xem (285/285 từ): Simon Sinek chia sẻ quy luật Vòng Tròn Vàng (Start With Why) giải mã tại sao Apple, Martin Luther King và anh em nhà Wright có thể truyền cảm hứng và thay đổi thế giới. Test: [\`__tests__/simon_sinek_verbatim.test.ts\`](file:///e:/XP%20English%20%20XP%20Voca/__tests__/simon_sinek_verbatim.test.ts). Screenshot: [\`public/dictation_simon_sinek_100_verbatim.png\`](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_simon_sinek_100_verbatim.png).`;

if (readme.includes(search1)) {
  readme = readme.replace(search1, replace1);
  console.log('Successfully updated section 48.2 in README.md');
} else {
  console.warn('Could not find search1 in README.md');
}

// 2. Update section 48.3: add Lesson 17 and update test counts
const search2 = `      16. [lesson_psychology_of_money.ts](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_psychology_of_money.ts): **The Psychology of Money: Warren Buffett's Greatest Secret** (DOgVUMfcb7U, 9 phân đoạn, 48s, B2) – Dò sát 100% video tài chính kinh điển (125/125 từ): Morgan Housel phân tích bí mật thực sự của Warren Buffett về lãi suất kép, sự kiên định không rời bàn cờ ("never left the table") và phương châm làm chủ tâm trí. Test: [__tests__/psychology_of_money_verbatim.test.ts](file:///e:/XP%20English%20%20XP%20Voca/__tests__/psychology_of_money_verbatim.test.ts). Screenshot: [public/dictation_money_100_verbatim.png](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_money_100_verbatim.png).`;

const replace2 = `      16. [lesson_psychology_of_money.ts](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_psychology_of_money.ts): **The Psychology of Money: Warren Buffett's Greatest Secret** (DOgVUMfcb7U, 9 phân đoạn, 48s, B2) – Dò sát 100% video tài chính kinh điển (125/125 từ): Morgan Housel phân tích bí mật thực sự của Warren Buffett về lãi suất kép, sự kiên định không rời bàn cờ ("never left the table") và phương châm làm chủ tâm trí. Test: [__tests__/psychology_of_money_verbatim.test.ts](file:///e:/XP%20English%20%20XP%20Voca/__tests__/psychology_of_money_verbatim.test.ts). Screenshot: [public/dictation_money_100_verbatim.png](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_money_100_verbatim.png).
      17. [lesson_simon_sinek.ts](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_simon_sinek.ts): **Simon Sinek: How Great Leaders Inspire Action (The Golden Circle)** (qp0HIF3SfI4, 8 phân đoạn, 107s, B2) – Dò sát 100% video TED kinh điển đạt hơn 60 triệu lượt xem (285/285 từ): Simon Sinek chia sẻ quy luật Vòng Tròn Vàng (Start With Why) giải mã tại sao Apple, Martin Luther King và anh em nhà Wright có thể truyền cảm hứng và thay đổi thế giới. Test: [__tests__/simon_sinek_verbatim.test.ts](file:///e:/XP%20English%20%20XP%20Voca/__tests__/simon_sinek_verbatim.test.ts). Screenshot: [public/dictation_simon_sinek_100_verbatim.png](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_simon_sinek_100_verbatim.png).`;

if (readme.includes(search2)) {
  readme = readme.replace(search2, replace2);
  console.log('Successfully updated section 48.3 list in README.md');
} else {
  console.warn('Could not find search2 in README.md');
}

// 3. Update test suite statistics
readme = readme.replace(
  /90\/90 test files đạt 922\/922 tests PASS 100% \(trong đó 16\/16 bài học đều có bộ test verbatim riêng biệt đạt 92\/92 tests PASS\)/g,
  '97/97 test files đạt 963/963 tests PASS 100% (trong đó 17/17 bài học đều có bộ test verbatim riêng biệt đạt 98/98 tests PASS)'
);

readme = readme.replace(
  /Nâng lên \*\*68 tests PASS\*\*, xác minh 16\/16 bài học/g,
  'Nâng lên **72 tests PASS**, xác minh 17/17 bài học'
);

readme = readme.replace(
  /Cả 16 bài học đều nạp thành công qua cả/g,
  'Cả 17 bài học đều nạp thành công qua cả'
);

fs.writeFileSync('README.md', readme, 'utf8');
console.log('README.md update completed successfully!');
