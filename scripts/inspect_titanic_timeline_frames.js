const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,720']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  console.log('Navigating to Titanic video OSqS2ESN_ys...');
  await page.goto('https://www.youtube.com/watch?v=OSqS2ESN_ys', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));

  // Ensure video element is loaded and play/pause
  await page.evaluate(() => {
    const v = document.querySelector('video');
    if (v) {
      v.muted = true;
      v.play();
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  if (!fs.existsSync('scripts/titanic_frames')) {
    fs.mkdirSync('scripts/titanic_frames', { recursive: true });
  }

  // Sample timestamps every 15-20 seconds: 0, 15, 30, 45, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 315
  const timestamps = [5, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 315];
  for (const t of timestamps) {
    await page.evaluate((time) => {
      const v = document.querySelector('video');
      if (v) v.currentTime = time;
    }, t);
    await new Promise(r => setTimeout(r, 1500));
    const padT = String(t).padStart(3, '0');
    await page.screenshot({ path: `scripts/titanic_frames/frame_${padT}s.png` });
    console.log(`Captured frame at ${t}s`);
  }

  console.log('Finished capturing frames!');
  await browser.close();
})();
