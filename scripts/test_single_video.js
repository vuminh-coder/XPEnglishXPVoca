const puppeteer = require('puppeteer-core');

async function testSingle() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Load YT API
  await page.evaluate(() => {
    return new Promise(resolve => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = resolve;
      document.head.appendChild(tag);
      setTimeout(resolve, 3000);
    });
  });

  const testIds = ['1qlLS47uBD4', 'viL7crj0jsw', 'uPIEn0M8su0'];

  for (const vid of testIds) {
    console.log(`\nTesting video: ${vid}`);
    const res = await page.evaluate(async (v) => {
      return new Promise((resolve) => {
        const div = document.createElement('div');
        div.id = 'yt_test_' + v;
        div.style.width = '300px';
        div.style.height = '200px';
        document.body.appendChild(div);

        let resolved = false;
        let playerInstance;

        const timer = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            try { playerInstance?.destroy(); } catch(e){}
            div.remove();
            resolve({ status: 'TIMEOUT_NO_RESPONSE' });
          }
        }, 8000);

        playerInstance = new window.YT.Player(div.id, {
          videoId: v,
          playerVars: {
            origin: window.location.origin,
            enablejsapi: 1,
            autoplay: 1
          },
          events: {
            onReady: (e) => {
              console.log('onReady, calling playVideo() for ' + v);
              try {
                e.target.mute(); // Mute so autoplay works
                e.target.playVideo();
              } catch(err) {
                console.log('playVideo error: ' + err.message);
              }
            },
            onStateChange: (e) => {
              // 1: PLAYING
              if (e.data === 1 && !resolved) {
                resolved = true;
                clearTimeout(timer);
                try { playerInstance.destroy(); } catch(e){}
                div.remove();
                resolve({ status: 'PLAYING_SUCCESS' });
              }
            },
            onError: (e) => {
              if (!resolved) {
                resolved = true;
                clearTimeout(timer);
                try { playerInstance.destroy(); } catch(e){}
                div.remove();
                resolve({ status: 'ERROR', code: e.data });
              }
            }
          }
        });
      });
    }, vid);
    console.log(`Result for ${vid}:`, res);
  }

  await browser.close();
}

testSingle().catch(console.error);
