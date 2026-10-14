const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,720']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('https://www.youtube.com/watch?v=EQ9RFbIHrFw', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Click on video to start playing
  await page.click('video');
  await new Promise(r => setTimeout(r, 1000));

  const times = [100, 180, 240, 320, 420, 500, 600, 700, 800, 880, 930];
  for (const t of times) {
    await page.evaluate((seekTime) => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = seekTime;
        v.play();
      }
    }, t);
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `scripts/coco_seek_${t}.png` });
    console.log(`Seeked and saved ${t}s`);
  }

  await browser.close();
})();
