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

  console.log('Navigating to YouTube video 9lo1ncSInLI...');
  await page.goto('https://www.youtube.com/watch?v=9lo1ncSInLI', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  fs.mkdirSync('scripts/eternal_frames', { recursive: true });

  async function captureAt(seconds, label) {
    await page.evaluate(async (t) => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = t;
        v.pause();
      }
    }, seconds);
    await new Promise(r => setTimeout(r, 1500));
    const path = `scripts/eternal_frames/frame_${label}_${seconds}s.png`;
    await page.screenshot({ path });
    console.log(`Saved screenshot at ${seconds}s -> ${path}`);
  }

  const times = [
    [5, 'loop1'],
    [20, 'loop2'],
    [32, 'barking_tree'],
    [45, 'break_in'],
    [70, 'inside_house'],
    [90, 'candles_liquor'],
    [115, 'david_ruth_laskin'],
    [140, 'ruthless'],
    [165, 'wish_i_had_stayed'],
    [185, 'walked_out_door'],
    [210, 'you_said_so_go'],
    [230, 'what_if_you_stayed'],
    [240, 'make_up_goodbye'],
    [255, 'meet_me_in_montauk'],
    [270, 'house_crumbling'],
    [290, 'stan_mary_lacuna'],
    [310, 'she_was_just_a_girl']
  ];

  for (const [t, lbl] of times) {
    await captureAt(t, lbl);
  }

  await browser.close();
  console.log('Done capturing frames!');
})();
