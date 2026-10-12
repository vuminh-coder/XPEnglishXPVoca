const fs = require('fs');
const puppeteer = require('puppeteer-core');

async function testEmbeds() {
  if (!fs.existsSync('scripts/romance_candidates_5m_100k.json')) {
    console.log('Candidate file not ready yet.');
    return;
  }

  const candidates = JSON.parse(fs.readFileSync('scripts/romance_candidates_5m_100k.json', 'utf8'));
  console.log(`Loaded ${candidates.length} candidates. Starting embed playability test in Chrome...`);

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
      setTimeout(resolve, 4000);
    });
  });

  const verified = [];

  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    process.stdout.write(`[${i + 1}/${candidates.length}] ${c.id} (${c.duration_min}m, ${c.views.toLocaleString()} views, ${c.likes?.toLocaleString()} likes) -> `);

    const testRes = await page.evaluate(async (v) => {
      return new Promise((resolve) => {
        const div = document.createElement('div');
        div.id = 'cand_' + v.replace(/[^a-zA-Z0-9]/g, '_');
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
            resolve({ playable: false, reason: 'TIMEOUT' });
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
                  resolve({ playable: true, reason: 'OK' });
                }
              },
              onError: (e) => {
                if (!resolved) {
                  resolved = true;
                  clearTimeout(timer);
                  try { player.destroy(); } catch(e){}
                  div.remove();
                  resolve({ playable: false, reason: 'ERROR_' + e.data, code: e.data });
                }
              }
            }
          });
        } catch(err) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            div.remove();
            resolve({ playable: false, reason: err.message });
          }
        }
      });
    }, c.id);

    console.log(testRes.playable ? 'PLAYABLE ✅' : `BLOCKED ❌ (${testRes.reason})`);

    if (testRes.playable) {
      verified.push({
        ...c,
        playable: true
      });
    }
  }

  await browser.close();

  console.log(`\nVerified ${verified.length} / ${candidates.length} PLAYABLE candidates!`);
  fs.writeFileSync('scripts/romance_verified_high_standard.json', JSON.stringify(verified, null, 2));
  console.log('Saved to scripts/romance_verified_high_standard.json');
}

testEmbeds().catch(console.error);
