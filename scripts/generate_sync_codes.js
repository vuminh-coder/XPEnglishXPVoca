const fs = require('fs');

const segs = JSON.parse(fs.readFileSync('scripts/bbc_laugh_18_calibrated.json', 'utf8'));

// 1. Generate Mock Data Entry
const mockLines = [];
mockLines.push('  // 3. BBC 6 Minute English: Why Laughter is the Best Medicine');
mockLines.push('  {');
mockLines.push('    id: "vid_bbc_why_we_laugh",');
mockLines.push('    slug: "bbc-6-minute-why-laughter-is-the-best-medicine",');
mockLines.push('    title: "BBC 6 Minute English: Why Laughter is the Best Medicine",');
mockLines.push('    description: "Khám phá tác dụng kỳ diệu của tiếng cười đối với sức khỏe tinh thần và thể chất: từ câu đố về loài chuột, giải phóng hormone endorphin đến ngành nghiên cứu khoa học Gelotology.",');
mockLines.push('    sourceType: "YOUTUBE",');
mockLines.push('    externalId: "Fez57g8jMNM",');
mockLines.push('    thumbnailUrl: "https://img.youtube.com/vi/Fez57g8jMNM/hqdefault.jpg",');
mockLines.push('    durationSeconds: 106,');
mockLines.push('    durationFormatted: "01:46",');
mockLines.push('    cefrLevel: "B1",');
mockLines.push('    supportedTypes: "BOTH",');
mockLines.push('    categoryId: "cat_bbc_6min",');
mockLines.push('    categorySlug: "bbc-6-minute",');
mockLines.push('    categoryName: "BBC 6 Minute English",');
mockLines.push('    accent: "en-GB",');
mockLines.push('    wpmSpeed: 140,');
mockLines.push('    viewCount: 3820,');
mockLines.push('    studyCount: 1410,');
mockLines.push('    segments: [');

for (const s of segs) {
  mockLines.push('      {');
  mockLines.push(`        orderIndex: ${s.orderIndex},`);
  mockLines.push(`        startTime: ${s.startTime},`);
  mockLines.push(`        endTime: ${s.endTime},`);
  mockLines.push(`        text: ${JSON.stringify(s.text)},`);
  mockLines.push(`        translationVi: ${JSON.stringify(s.translationVi)},`);
  mockLines.push(`        ipaUs: ${JSON.stringify(s.ipaUs)},`);
  mockLines.push(`        properNouns: ${JSON.stringify(s.properNouns || [])},`);
  mockLines.push(`        keywords: ${JSON.stringify(s.keywords || [])},`);
  mockLines.push('      },');
}

mockLines.push('    ],');
mockLines.push('  },');

fs.writeFileSync('scripts/mock_entry_bbc.txt', mockLines.join('\n'), 'utf8');

// 2. Generate Seed Script Entry
const seedLines = [];
seedLines.push('  {');
seedLines.push('    slug: "bbc-6-minute-why-laughter-is-the-best-medicine",');
seedLines.push('    title: "BBC 6 Minute English: Why Laughter is the Best Medicine",');
seedLines.push('    description: "Khám phá tác dụng kỳ diệu của tiếng cười đối với sức khỏe tinh thần và thể chất: từ câu đố về loài chuột, giải phóng hormone endorphin đến ngành nghiên cứu khoa học Gelotology.",');
seedLines.push('    categorySlug: "bbc-6-minute",');
seedLines.push('    playlistSlug: "bbc-6min-lifestyle",');
seedLines.push('    externalId: "Fez57g8jMNM",');
seedLines.push('    thumbnailUrl: "https://img.youtube.com/vi/Fez57g8jMNM/hqdefault.jpg",');
seedLines.push('    durationSeconds: 106,');
seedLines.push('    durationFormatted: "01:46",');
seedLines.push('    cefrLevel: "B1",');
seedLines.push('    accent: "en-GB",');
seedLines.push('    wpmSpeed: 140,');
seedLines.push('    segments: [');

for (const s of segs) {
  const tokenCount = s.text.trim().split(/\s+/).length;
  const normalizedText = s.text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim();
  seedLines.push('      {');
  seedLines.push(`        orderIndex: ${s.orderIndex + 1},`);
  seedLines.push(`        startTime: ${s.startTime},`);
  seedLines.push(`        endTime: ${s.endTime},`);
  seedLines.push(`        text: ${JSON.stringify(s.text)},`);
  seedLines.push(`        normalizedText: ${JSON.stringify(normalizedText)},`);
  seedLines.push(`        ipaUs: ${JSON.stringify(s.ipaUs)},`);
  seedLines.push(`        translationVi: ${JSON.stringify(s.translationVi)},`);
  seedLines.push(`        explanationAi: ${JSON.stringify(s.explanation)},`);
  seedLines.push(`        properNouns: ${JSON.stringify(s.properNouns || [])},`);
  seedLines.push(`        keywords: ${JSON.stringify(s.keywords || [])},`);
  seedLines.push(`        tokenCount: ${tokenCount},`);
  seedLines.push('      },');
}

seedLines.push('    ],');
seedLines.push('  },');

fs.writeFileSync('scripts/seed_entry_bbc.txt', seedLines.join('\n'), 'utf8');

console.log('Successfully generated mock and seed entries!');
