const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: CHROME_PATH, 
    headless: false // open real browser window to check audio and see player
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to YouTube video doOlP7NLUwc directly...');
  await page.goto('https://www.youtube.com/watch?v=doOlP7NLUwc', { waitUntil: 'domcontentloaded' });
  
  // Wait 3 seconds
  await new Promise(r => setTimeout(r, 3000));

  // Get captions via player API
  const playerInfo = await page.evaluate(() => {
    const player = document.getElementById('movie_player');
    if (!player) return null;
    return {
      duration: player.getDuration(),
      currentTime: player.getCurrentTime(),
    };
  });
  console.log('Player info:', playerInfo);

  await browser.close();
})();
