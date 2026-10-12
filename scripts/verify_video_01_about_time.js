const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  console.log('Navigating to About Time comprehension quiz page...');
  await page.goto('http://localhost:3000/study/dictation/video/comprehension/mov_rom_01', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4500));

  await page.screenshot({ path: 'public/test-artifacts/video_01_quiz_view_loaded.png' });
  console.log('Saved quiz loaded view screenshot');

  await browser.close();
  console.log('Verification completed successfully!');
})();
