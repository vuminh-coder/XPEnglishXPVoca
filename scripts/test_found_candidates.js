const fs = require('fs');
const puppeteer = require('puppeteer-core');

async function testAllFoundCandidates() {
  const data = JSON.parse(fs.readFileSync('scripts/found_candidates.json', 'utf8'));
  const allIds = new Set();
  for (const list of Object.values(data)) {
    for (const id of list) {
      if (id && id.length === 11) allIds.add(id);
    }
  }

  // Add Kung Fu Panda known candidate
  allIds.add('8KO-lPAotFc');

  console.log(`Testing ${allIds.size} unique candidate IDs...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  await page.evaluate(() => {
    return new Promise(resolve => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = resolve;
      document.head.appendChild(tag);
      setTimeout(resolve, 3000);
    });
  });

  const playableResults = {};

  for (const vid of allIds) {
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
        }, 5000);

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

    console.log(`Candidate ${vid}: ${res.playable ? 'PLAYABLE' : res.reason}`);
    playableResults[vid] = res;
  }

  await browser.close();

  fs.writeFileSync('scripts/candidate_playability.json', JSON.stringify(playableResults, null, 2));
  console.log('Saved candidate playability results to scripts/candidate_playability.json');
}

testAllFoundCandidates().catch(console.error);
