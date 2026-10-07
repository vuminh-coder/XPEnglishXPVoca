const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const logs = [];
  page.on('console', msg => logs.push(msg.text()));
  page.on('pageerror', err => logs.push('PAGE_ERROR: ' + err.toString()));
  
  await page.goto('http://localhost:3000/study/dictation?id=1481dc60-fe8a-4fa9-830b-9a227ede9b6e', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Find Play button with title "Phát video (Space)"
  console.log('Finding play button...');
  const playBtnClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const playBtn = btns.find(b => b.title && b.title.includes('Phát video'));
    if (playBtn) {
      playBtn.click();
      return true;
    }
    return false;
  });
  console.log('Play button clicked:', playBtnClicked);

  // Wait 3 seconds to see if playback starts or errors appear
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Console logs after play click:');
  logs.forEach(l => console.log('LOG:', l));

  // Check current time / state of video player
  const playerState = await page.evaluate(() => {
    // Check if YT player exists on window or if progress bar changed
    const timeDisplay = document.querySelector('.font-mono.tabular-nums')?.innerText;
    return { timeDisplay };
  });
  console.log('Player state after 3s:', playerState);

  await page.screenshot({ path: 'dictation_after_play.png' });
  await browser.close();
  console.log('Done test!');
})();
