const fs = require('fs');
const path = require('path');

const animDir = path.join(__dirname, '../features/listening/data/lessons/movies/animation');
const targetFiles = [
  'lesson_inside_out.ts',
  'lesson_soul.ts',
  'lesson_ratatouille.ts',
  'lesson_coco.ts',
  'lesson_up.ts'
];

targetFiles.forEach(fileName => {
  const filePath = path.join(animDir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract quiz const name
  const quizMatch = content.match(/export const (QUIZ_[A-Z0-9_]+): VideoQuizData/);
  if (!quizMatch) {
    console.log(`Could not find QUIZ_ in ${fileName}`);
    return;
  }
  const quizConstName = quizMatch[1];
  console.log(`File ${fileName} -> Quiz const: ${quizConstName}`);

  // Find the segments array closing: ']\n};' or ']\r\n};' or similar before export default or end
  // Replace the segments closing with segments closing + quiz property
  const regex = /(\]\s*\n\s*\};)(?![\s\S]*\1)/;
  if (!content.includes(`quiz: ${quizConstName}`)) {
    // Replace the last ']\n};' with '],\n  quiz: ' + quizConstName + '\n};'
    const newContent = content.replace(/(\]\s*[\r\n]+\s*\};)([\s\S]*)$/, (match, p1, p2) => {
      return `],\n  quiz: ${quizConstName}\n};${p2}`;
    });
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Successfully attached quiz to ${fileName}`);
  } else {
    console.log(`Already has quiz: ${fileName}`);
  }
});
