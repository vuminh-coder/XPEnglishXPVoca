const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'FikAJxtVgOY';
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,720', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Let's sample a few timestamps
  const testTimes = [75, 130, 200, 330, 450, 600, 750, 900, 1100, 1300, 1400];
  
  for (const t of testTimes) {
    await page.evaluate((seekTime) => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = seekTime;
        v.play();
      }
    }, t);
    await new Promise(r => setTimeout(r, 2500));
    await page.evaluate(() => {
      const v = document.querySelector('video');
      if (v) v.pause();
    });
    await page.screenshot({ path: `scripts/play_frame_${t}s.jpg` });
    console.log(`Captured frame at ${t}s`);
  }

  await browser.close();
  console.log('Done sampling play frames!');
})();
