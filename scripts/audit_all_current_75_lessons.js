const puppeteer = require('puppeteer-core');
const fs = require('fs');

const allLessons = JSON.parse(fs.readFileSync('scripts/current_active_lessons.json', 'utf8'));
console.log(`Starting definitive live Playback audit for all ${allLessons.length} updated lessons...`);

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Load YT API once
  await page.evaluate(() => {
    return new Promise(resolve => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = resolve;
      document.head.appendChild(tag);
      setTimeout(resolve, 4000);
    });
  });

  const auditResults = [];

  for (let i = 0; i < allLessons.length; i++) {
    const item = allLessons[i];
    process.stdout.write(`[${i + 1}/${allLessons.length}] ${item.externalId} (${item.title.slice(0, 30)})... `);

    const testRes = await page.evaluate(async (v) => {
      return new Promise((resolve) => {
        const div = document.createElement('div');
        div.id = 'yt_play_test_' + v.replace(/[^a-zA-Z0-9]/g, '_');
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
            resolve({ playStatus: 'TIMEOUT_BUFFERING', errorCode: null });
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
                // 1 = PLAYING
                if (e.data === 1 && !resolved) {
                  resolved = true;
                  clearTimeout(timer);
                  try { player.destroy(); } catch(e){}
                  div.remove();
                  resolve({ playStatus: 'PLAYING_SUCCESS', errorCode: null });
                }
              },
              onError: (e) => {
                if (!resolved) {
                  resolved = true;
                  clearTimeout(timer);
                  try { player.destroy(); } catch(e){}
                  div.remove();
                  resolve({ playStatus: 'ERROR', errorCode: e.data });
                }
              }
            }
          });
        } catch(err) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            div.remove();
            resolve({ playStatus: 'ERROR', errorCode: err.message });
          }
        }
      });
    }, item.externalId);

    console.log(`${testRes.playStatus} ${testRes.errorCode ? `(Code ${testRes.errorCode})` : ''}`);
    auditResults.push({
      ...item,
      playStatus: testRes.playStatus,
      errorCode: testRes.errorCode
    });
  }

  await browser.close();

  const successCount = auditResults.filter(r => r.playStatus === 'PLAYING_SUCCESS').length;
  const errorCount = auditResults.filter(r => r.playStatus === 'ERROR').length;
  const timeoutCount = auditResults.filter(r => r.playStatus === 'TIMEOUT_BUFFERING').length;

  console.log(`\n================ AUDIT SUMMARY ================`);
  console.log(`Total Lessons Tested: ${auditResults.length}`);
  console.log(`PLAYING_SUCCESS:      ${successCount} (${Math.round(successCount / auditResults.length * 100)}%)`);
  console.log(`ERROR (Embed/Dead):   ${errorCount}`);
  console.log(`TIMEOUT/BUFFERING:    ${timeoutCount}`);

  fs.writeFileSync('scripts/post_replacement_playback_results.json', JSON.stringify(auditResults, null, 2));
  console.log('Detailed results saved to scripts/post_replacement_playback_results.json');
}

run().catch(console.error);
