const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'FikAJxtVgOY';
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,720']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Let's sample a few timestamps to see what is shown
  const testTimes = [55, 90, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1050, 1200, 1350, 1450];
  
  for (const t of testTimes) {
    await page.evaluate((seekTime) => {
      const v = document.querySelector('video');
      if (v) {
        v.pause();
        v.currentTime = seekTime;
      }
    }, t);
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `scripts/frame_${t}s.jpg` });
    console.log(`Captured frame at ${t}s`);
  }

  await browser.close();
  console.log('Done sampling frames!');
})();
