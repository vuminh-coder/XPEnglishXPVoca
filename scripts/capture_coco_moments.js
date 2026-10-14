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

  await page.goto('https://www.youtube.com/watch?v=EQ9RFbIHrFw', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Mute video
  await page.evaluate(() => {
    const video = document.querySelector('video');
    if (video) {
      video.muted = true;
      video.play();
    }
  });

  const timestamps = [10, 60, 80, 110, 130, 160, 250, 350, 450, 580, 620, 680, 750, 850, 950];
  for (const t of timestamps) {
    await page.evaluate((time) => {
      const video = document.querySelector('video');
      if (video) {
        video.currentTime = time;
      }
    }, t);
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `scripts/coco_frame_${t}.png` });
    console.log(`Captured frame at ${t}s`);
  }

  await browser.close();
  console.log('Done capturing frames.');
})();
