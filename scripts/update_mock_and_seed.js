const fs = require('fs');

// 1. Update videoCatalogMockData.ts
let mockFile = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');
const newMockEntry = fs.readFileSync('scripts/mock_entry_bbc.txt', 'utf8');

const mockStart = mockFile.indexOf('  // 3. BBC 6 Minute English: Why Laughter is the Best Medicine');
const mockEnd = mockFile.indexOf('  // 4. Daily Conversation: Checking in at the Airport');

if (mockStart !== -1 && mockEnd !== -1) {
  mockFile = mockFile.slice(0, mockStart) + newMockEntry + '\n\n' + mockFile.slice(mockEnd);
  fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', mockFile, 'utf8');
  console.log('Updated features/listening/data/videoCatalogMockData.ts');
} else {
  console.error('Failed to locate mock entry range: mockStart=' + mockStart + ', mockEnd=' + mockEnd);
}

// 2. Update seed_video_ecosystem.ts
let seedFile = fs.readFileSync('scripts/seed_video_ecosystem.ts', 'utf8');
const newSeedEntry = fs.readFileSync('scripts/seed_entry_bbc.txt', 'utf8');

const seedStart = seedFile.indexOf('  {\n    slug: "bbc-6-minute-why-laughter-is-the-best-medicine",');
const seedEnd = seedFile.indexOf('  {\n    slug: "ted-ed-benefits-of-a-bilingual-brain",');

if (seedStart !== -1 && seedEnd !== -1) {
  seedFile = seedFile.slice(0, seedStart) + newSeedEntry + '\n' + seedFile.slice(seedEnd);
  fs.writeFileSync('scripts/seed_video_ecosystem.ts', seedFile, 'utf8');
  console.log('Updated scripts/seed_video_ecosystem.ts');
} else {
  console.error('Failed to locate seed entry range: seedStart=' + seedStart + ', seedEnd=' + seedEnd);
}
