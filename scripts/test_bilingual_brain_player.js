const puppeteer = require('puppeteer-core');

async function testPlayer() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set HTML with YouTube Iframe API
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://www.youtube.com/iframe_api"></script>
  </head>
  <body>
    <div id="player"></div>
  </body>
  </html>
  `;

  await page.setContent(html);

  const result = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let state = 'INIT';
      let error = null;

      window.onYouTubeIframeAPIReady = () => {
        new window.YT.Player('player', {
          videoId: 'MMmOLN5zBLY',
          events: {
            onReady: (e) => {
              state = 'READY';
              e.target.playVideo();
            },
            onStateChange: (e) => {
              if (e.data === 1) { // PLAYING
                resolve({ success: true, status: 'PLAYING', error: null });
              }
            },
            onError: (e) => {
              resolve({ success: false, status: 'ERROR', error: e.data });
            }
          }
        });
      };

      setTimeout(() => {
        resolve({ success: false, status: 'TIMEOUT', state });
      }, 7000);
    });
  });

  console.log('Player test result for MMmOLN5zBLY:', result);
  await browser.close();
}

testPlayer().catch(console.error);
