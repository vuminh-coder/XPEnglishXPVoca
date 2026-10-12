const puppeteer = require('puppeteer-core');

async function testEmbed() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set up console listener
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  const result = await page.evaluate(async (videoId) => {
    return new Promise((resolve) => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);

      const div = document.createElement('div');
      div.id = 'test_yt_player';
      document.body.appendChild(div);

      function initPlayer() {
        new window.YT.Player('test_yt_player', {
          height: '360',
          width: '640',
          videoId: videoId,
          events: {
            'onReady': (event) => {
              console.log('Player onReady, playing...');
              event.target.playVideo();
            },
            'onStateChange': (event) => {
              console.log('Player state change: ' + event.data);
              if (event.data === 1) { // PLAYING
                const dur = event.target.getDuration();
                resolve({ playable: true, state: event.data, duration: dur, error: null });
              }
            },
            'onError': (event) => {
              console.log('Player error: ' + event.data);
              resolve({ playable: false, state: -1, duration: null, error: event.data });
            }
          }
        });
      }

      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        window.onYouTubeIframeAPIReady = initPlayer;
      }

      setTimeout(() => {
        resolve({ playable: false, reason: 'TIMEOUT' });
      }, 10000);
    });
  }, '9lo1ncSInLI');

  console.log('FINAL RESULT:', JSON.stringify(result, null, 2));
  await browser.close();
}

testEmbed().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
