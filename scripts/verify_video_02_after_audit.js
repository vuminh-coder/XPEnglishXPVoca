const puppeteer = require('puppeteer-core');

async function testVideo02() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to Video 02 Comprehension Quiz...');
  await page.goto('http://localhost:3000/study/dictation/video/comprehension/mov_rom_02', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'public/test-artifacts/video_02_quiz_calibrated.png', fullPage: false });
  console.log('Saved Quiz screenshot: public/test-artifacts/video_02_quiz_calibrated.png');

  await browser.close();
}

testVideo02().catch(console.error);
