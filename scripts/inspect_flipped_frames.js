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

  console.log('Navigating to Flipped video KTUvOpY89RE...');
  await page.goto('https://www.youtube.com/watch?v=KTUvOpY89RE', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  fs.mkdirSync('scripts/flipped_frames', { recursive: true });

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
    const path = `scripts/flipped_frames/frame_${label}_${seconds}s.png`;
    await page.screenshot({ path });
    console.log(`Saved screenshot at ${seconds}s -> ${path}`);
  }

  const times = [
    [10, 'first_day_in_town'],
    [40, 'moving_van_hands'],
    [75, 'juli_point_of_view'],
    [110, 'climbing_sycamore_tree'],
    [130, 'sum_of_its_parts_painting'],
    [160, 'sycamore_tree_cut_down'],
    [200, 'basket_boys_auction'],
    [240, 'bryce_confusion_feelings'],
    [270, 'juli_angry_leaving'],
    [300, 'bryce_digging_planting'],
    [325, 'touching_hands_never_stopped']
  ];

  for (const [t, lbl] of times) {
    await captureAt(t, lbl);
  }

  await browser.close();
  console.log('Done capturing Flipped frames!');
})();
