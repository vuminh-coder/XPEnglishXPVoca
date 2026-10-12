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

  console.log('Navigating to Notting Hill video sM4rv42qyvk...');
  await page.goto('https://www.youtube.com/watch?v=sM4rv42qyvk', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  fs.mkdirSync('scripts/notting_hill_frames', { recursive: true });

  // Play and seek
  await page.evaluate(() => {
    const v = document.querySelector('video');
    if (v) {
      v.muted = true;
      v.play();
    }
  });

  async function captureAt(seconds, label) {
    await page.evaluate(async (t) => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = t;
        v.pause();
      }
    }, seconds);
    await new Promise(r => setTimeout(r, 1500));
    const path = `scripts/notting_hill_frames/frame_${label}_${seconds}s.png`;
    await page.screenshot({ path });
    console.log(`Saved screenshot at ${seconds}s -> ${path}`);
  }

  const times = [
    [10, 'car_chase'],
    [25, 'how_much_longer'],
    [50, 'questions'],
    [75, 'william_arrives'],
    [95, 'more_than_good_friends'],
    [125, 'daft_prick_knees'],
    [145, 'horse_and_hound_delighted'],
    [175, 'indefinitely'],
    [200, 'cameras_flashing_she'],
    [240, 'red_carpet_premiere'],
    [290, 'wedding_reception'],
    [330, 'park_bench_pregnancy'],
    [365, 'closing_shot']
  ];

  for (const [t, lbl] of times) {
    await captureAt(t, lbl);
  }

  await browser.close();
  console.log('Done capturing Notting Hill frames!');
})();
