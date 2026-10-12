const puppeteer = require('puppeteer-core');

async function testVideo03() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to Video 03 (La La Land) Dictation Studio...');
  await page.goto('http://localhost:3000/study/dictation/video?id=mov_rom_03', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: 'public/test-artifacts/video_03_dictation_loaded.png', fullPage: false });
  console.log('Saved Dictation screenshot: public/test-artifacts/video_03_dictation_loaded.png');

  console.log('Navigating to Video 03 Comprehension Quiz...');
  await page.goto('http://localhost:3000/study/dictation/video/comprehension/mov_rom_03', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: 'public/test-artifacts/video_03_quiz_rendered.png', fullPage: false });
  console.log('Saved Quiz screenshot: public/test-artifacts/video_03_quiz_rendered.png');

  await browser.close();
}

testVideo03().catch(console.error);
