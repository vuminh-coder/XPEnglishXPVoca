const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const timestamps = [
  { sec: 15, name: 'ch1_intro' },
  { sec: 45, name: 'ch1_intro_details' },
  { sec: 100, name: 'ch2_scene_start' },
  { sec: 115, name: 'ch2_pointless' },
  { sec: 135, name: 'ch2_gallivanting' },
  { sec: 155, name: 'ch2_satchel' },
  { sec: 175, name: 'ch2_hair' },
  { sec: 200, name: 'ch2_deal' },
  { sec: 230, name: 'ch2_lanterns' },
  { sec: 255, name: 'ch2_simpatico' },
  { sec: 290, name: 'ch2_brick_by_brick' },
  { sec: 330, name: 'ch2_smolder' },
  { sec: 360, name: 'ch3_pointless_def' },
  { sec: 420, name: 'ch3_elision' },
  { sec: 480, name: 'ch3_connected_speech' },
  { sec: 580, name: 'ch4_community_story' },
  { sec: 650, name: 'ch5_advanced_terms_1' },
  { sec: 720, name: 'ch5_advanced_terms_2' },
  { sec: 800, name: 'ch6_american_t_1' },
  { sec: 880, name: 'ch6_american_t_2' },
  { sec: 950, name: 'ch6_expressions' },
  { sec: 1020, name: 'ch7_review_quiz_1' },
  { sec: 1100, name: 'ch7_review_quiz_2' },
  { sec: 1180, name: 'ch7_outro' },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto('https://www.youtube.com/watch?v=uQ2rJKiiRiU', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  // Ensure artifacts dir exists
  const outDir = path.resolve(__dirname, 'tangled_frames');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const t of timestamps) {
    console.log(`Navigating to ${t.sec}s (${t.name})...`);
    await page.evaluate((sec) => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = sec;
        v.play();
      }
    }, t.sec);

    await new Promise(r => setTimeout(r, 2000));

    // Capture video element screenshot
    const videoHandle = await page.$('.html5-video-player, video');
    if (videoHandle) {
      const shotPath = path.join(outDir, `${t.name}.png`);
      await videoHandle.screenshot({ path: shotPath });
      console.log(`Saved ${shotPath}`);
    }
  }

  await browser.close();
  console.log('All frames captured successfully!');
})();
