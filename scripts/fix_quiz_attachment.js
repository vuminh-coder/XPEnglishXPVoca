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

targetFiles.forEach(file => {
  const filePath = path.join(animDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find quiz const name
  const quizMatch = content.match(/export const (QUIZ_[A-Z0-9_]+): VideoQuizData/);
  if (!quizMatch) {
    console.error('Quiz not found in', file);
    return;
  }
  const quizName = quizMatch[1];
  
  // Fix missing comma: `]\n  quiz:` or `]\r\n  quiz:` -> `],\n  quiz:`
  content = content.replace(/\](\s*[\r\n]+\s*quiz:\s*[A-Z0-9_]+)/g, '],$1');
  
  // Ensure no duplicate comma `],,`
  content = content.replace(/\],,/g, '],');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed comma for', file);
});
