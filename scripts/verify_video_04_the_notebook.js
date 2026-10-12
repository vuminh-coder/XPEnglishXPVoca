const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function testVideo04() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const shotDir = path.join(__dirname, '..', 'public', 'test-artifacts');
  if (!fs.existsSync(shotDir)) {
    fs.mkdirSync(shotDir, { recursive: true });
  }

  console.log('Navigating to Video 04 (The Notebook) Dictation Studio...');
  await page.goto('http://localhost:3000/study/dictation/video?id=mov_rom_04', { waitUntil: 'domcontentloaded' });
  console.log('Waiting 12 seconds for API data resolution...');
  await new Promise(r => setTimeout(r, 12000));
  const dictationShot = 'public/test-artifacts/video_04_the_notebook_dictation.png';
  await page.screenshot({ path: dictationShot, fullPage: false });
  console.log(`Saved Dictation screenshot: ${dictationShot}`);

  console.log('Navigating to Video 04 Comprehension Quiz (/study/dictation/video/mov_rom_04/comprehension)...');
  await page.goto('http://localhost:3000/study/dictation/video/mov_rom_04/comprehension', { waitUntil: 'domcontentloaded' });
  console.log('Waiting 12 seconds for Quiz data resolution...');
  await new Promise(r => setTimeout(r, 12000));
  const quizShot = 'public/test-artifacts/video_04_the_notebook_quiz.png';
  await page.screenshot({ path: quizShot, fullPage: false });
  console.log(`Saved Quiz screenshot: ${quizShot}`);

  await browser.close();
  console.log('All screenshots captured successfully with fully populated data!');
}

testVideo04().catch(console.error);
