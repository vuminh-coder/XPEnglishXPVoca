import fs from 'fs';
import path from 'path';

const mockDataPath = path.resolve('features/listening/data/videoCatalogMockData.ts');
const rawContent = fs.readFileSync(mockDataPath, 'utf8');
const lines = rawContent.split('\n');

const lessonsConfig = [
  {
    exportName: 'LESSON_REWRITE_THE_STARS',
    fileName: 'lesson_rewrite_the_stars.ts',
    startLine: 114,
    endLine: 430,
    slug: 'anne-marie-rewrite-the-stars',
    title: 'Rewrite The Stars',
  },
  {
    exportName: 'LESSON_KURZGESAGT_INTERSTELLAR',
    fileName: 'lesson_kurzgesagt_interstellar.ts',
    startLine: 432,
    endLine: 840,
    slug: 'kurzgesagt-interstellar-war',
    title: 'Kurzgesagt: How to Win an Interstellar War',
  },
  {
    exportName: 'LESSON_DAILY_PETS',
    fileName: 'lesson_daily_pets.ts',
    startLine: 844,
    endLine: 1037,
    slug: 'daily-pets-animals-nature',
    title: 'Daily English: Pets, Animals & Nature Conversation',
  },
  {
    exportName: 'LESSON_BBC_SUNKEN_SHIP',
    fileName: 'lesson_bbc_sunken_ship.ts',
    startLine: 1039,
    endLine: 1329,
    slug: 'bbc-6min-brain-boost',
    title: 'BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship',
  },
  {
    exportName: 'LESSON_STEVE_JOBS',
    fileName: 'lesson_steve_jobs.ts',
    startLine: 1332,
    endLine: 1639,
    slug: 'steve-jobs-stanford-stay-hungry',
    title: 'Steve Jobs: How to Live Before You Die',
  },
  {
    exportName: 'LESSON_TED_BILINGUAL_BRAIN',
    fileName: 'lesson_ted_bilingual_brain.ts',
    startLine: 1642,
    endLine: 1843,
    slug: 'ted-ed-benefits-of-a-bilingual-brain',
    title: 'TED-Ed: The Benefits of a Bilingual Brain',
  },
  {
    exportName: 'LESSON_BBC_WHY_WE_LAUGH',
    fileName: 'lesson_bbc_why_we_laugh.ts',
    startLine: 1846,
    endLine: 2047,
    slug: 'bbc-6-minute-why-laughter-is-the-best-medicine',
    title: 'BBC 6 Minute English: Why Laughter is the Best Medicine',
  },
  {
    exportName: 'LESSON_AIRPORT_CHECKIN',
    fileName: 'lesson_airport_checkin.ts',
    startLine: 2052,
    endLine: 2249,
    slug: 'daily-english-airport-check-in',
    title: 'English for Travel: Checking in at the Airport',
  },
  {
    exportName: 'LESSON_NATGEO_RENEWABLE_ENERGY',
    fileName: 'lesson_natgeo_renewable_energy.ts',
    startLine: 2252,
    endLine: 2548,
    slug: 'ielts-listening-environmental-sustainability',
    title: 'National Geographic: Renewable Energy 101',
  },
  {
    exportName: 'LESSON_JENSEN_HUANG',
    fileName: 'lesson_jensen_huang.ts',
    startLine: 2551,
    endLine: 2672,
    slug: 'jensen-huang-elon-musk-supercomputer',
    title: 'Jensen Huang: How Elon Musk Built the World\'s Fastest Supercomputer in 19 Days',
  },
];

const lessonsDir = path.resolve('features/listening/data/lessons');
if (!fs.existsSync(lessonsDir)) {
  fs.mkdirSync(lessonsDir, { recursive: true });
}

console.log('Writing modular lesson files...');

for (const cfg of lessonsConfig) {
  // Extract lines (1-indexed)
  const chunk = lines.slice(cfg.startLine - 1, cfg.endLine);
  let chunkText = chunk.join('\n').trim();
  
  // If ends with comma, remove it
  if (chunkText.endsWith(',')) {
    chunkText = chunkText.slice(0, -1).trim();
  }

  const fileContent = `import { MockVideoLesson } from "../types";

/**
 * ${cfg.title}
 * Slug: ${cfg.slug}
 */
export const ${cfg.exportName}: MockVideoLesson = ${chunkText};
`;

  const destPath = path.join(lessonsDir, cfg.fileName);
  fs.writeFileSync(destPath, fileContent, 'utf8');
  console.log(`Created: ${cfg.fileName} (${cfg.exportName})`);
}

// Write index.ts in lessons/
const indexImports = lessonsConfig
  .map(c => `import { ${c.exportName} } from "./${c.fileName.replace('.ts', '')}";`)
  .join('\n');

const indexExports = lessonsConfig
  .map(c => `  ${c.exportName},`)
  .join('\n');

const indexContent = `// Modular lesson catalog exports
${indexImports}

export {
${indexExports}
};

export const ALL_MODULAR_LESSONS = [
${indexExports}
];
`;

fs.writeFileSync(path.join(lessonsDir, 'index.ts'), indexContent, 'utf8');
console.log('Created: features/listening/data/lessons/index.ts');
