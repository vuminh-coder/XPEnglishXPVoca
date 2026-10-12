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

  console.log('Opening JoBlo Titanic clip...');
  await page.goto('https://www.youtube.com/watch?v=OSqS2ESN_ys', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Function to seek and wait for 'seeked' event
  async function seekTo(seconds) {
    await page.evaluate(async (t) => {
      const v = document.querySelector('video');
      if (!v) return;
      v.muted = true;
      v.currentTime = t;
      await new Promise(resolve => {
        v.addEventListener('seeked', resolve, { once: true });
        setTimeout(resolve, 3000);
      });
    }, seconds);
    await new Promise(r => setTimeout(r, 1000));
  }

  const times = [0, 15, 30, 45, 60, 75, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310];
  for (const t of times) {
    await seekTo(t);
    const pad = String(t).padStart(3, '0');
    await page.screenshot({ path: `scripts/titanic_frames/seek_${pad}s.png` });
    console.log(`Seeked and screenshotted at ${t}s`);
  }

  await browser.close();
})();
