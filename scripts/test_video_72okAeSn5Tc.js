const puppeteer = require('puppeteer-core');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });

  const result = await page.evaluate(async (videoId) => {
    if (!window.YT) {
      await new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        window.onYouTubeIframeAPIReady = () => resolve();
        document.head.appendChild(tag);
        setTimeout(resolve, 5000);
      });
    }

    return new Promise((resolve) => {
      const divId = 'test_player_' + videoId;
      let div = document.createElement('div');
      div.id = divId;
      document.body.appendChild(div);

      let player;
      let timeout = setTimeout(() => {
        resolve({ videoId, status: 'TIMEOUT', playable: false });
      }, 10000);

      try {
        player = new window.YT.Player(divId, {
          height: '200',
          width: '200',
          videoId: videoId,
          playerVars: { autoplay: 1, mute: 1, origin: window.location.origin },
          events: {
            onReady: (event) => {
              try {
                event.target.playVideo();
              } catch (e) {}
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                clearTimeout(timeout);
                const duration = player.getDuration ? player.getDuration() : 0;
                resolve({ videoId, status: 'PLAYING', playable: true, duration });
              }
            },
            onError: (event) => {
              clearTimeout(timeout);
              resolve({ videoId, status: 'ERROR', errorCode: event.data, playable: false });
            }
          }
        });
      } catch (err) {
        clearTimeout(timeout);
        resolve({ videoId, status: 'INIT_ERROR', error: err.message, playable: false });
      }
    });
  }, '72okAeSn5Tc');

  console.log('Result for 72okAeSn5Tc:', JSON.stringify(result, null, 2));
  await browser.close();
}

run().catch(console.error);
