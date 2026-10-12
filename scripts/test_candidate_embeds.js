const puppeteer = require('puppeteer-core');

async function testCandidates(candidateIds) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
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

  const results = [];

  for (const vid of candidateIds) {
    const res = await page.evaluate(async (v) => {
      return new Promise((resolve) => {
        const div = document.createElement('div');
        div.id = 'yt_cand_' + v.replace(/[^a-zA-Z0-9]/g, '_');
        div.style.width = '200px';
        div.style.height = '150px';
        document.body.appendChild(div);

        let resolved = false;
        let player;

        const timer = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            try { player?.destroy(); } catch(e){}
            div.remove();
            resolve({ id: v, playable: false, reason: 'TIMEOUT' });
          }
        }, 6000);

        try {
          player = new window.YT.Player(div.id, {
            videoId: v,
            playerVars: {
              origin: window.location.origin,
              enablejsapi: 1,
              autoplay: 1
            },
            events: {
              onReady: (e) => {
                try {
                  e.target.mute();
                  e.target.playVideo();
                } catch(err){}
              },
              onStateChange: (e) => {
                if (e.data === 1 && !resolved) {
                  resolved = true;
                  clearTimeout(timer);
                  try { player.destroy(); } catch(e){}
                  div.remove();
                  resolve({ id: v, playable: true, reason: 'OK' });
                }
              },
              onError: (e) => {
                if (!resolved) {
                  resolved = true;
                  clearTimeout(timer);
                  try { player.destroy(); } catch(e){}
                  div.remove();
                  resolve({ id: v, playable: false, reason: 'ERROR_' + e.data, code: e.data });
                }
              }
            }
          });
        } catch(err) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            div.remove();
            resolve({ id: v, playable: false, reason: err.message });
          }
        }
      });
    }, vid);
    results.push(res);
  }

  await browser.close();
  return results;
}

if (process.argv.slice(2).length > 0) {
  testCandidates(process.argv.slice(2)).then(r => console.log(JSON.stringify(r, null, 2))).catch(console.error);
} else {
  module.exports = { testCandidates };
}
