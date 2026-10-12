const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// Read all lessons from embed_check_results.json or parse them directly
const lessonsData = JSON.parse(fs.readFileSync('scripts/embed_check_results.json', 'utf8'));

// Also add the 3 missing lessons if not present
const allLessons = [...lessonsData];
if (!allLessons.find(l => l.externalId === 'pRfmrE0ToTo')) {
  allLessons.push({ id: 'ff4c64b7-ea82-4963-a4f6-1ff808d929e6', externalId: 'pRfmrE0ToTo', title: 'Rewrite The Stars', file: 'features/listening/data/lessons/lesson_rewrite_the_stars.ts' });
}
if (!allLessons.find(l => l.externalId === 'tybKnGZRwcU')) {
  allLessons.push({ id: '88c4fc17-4445-46f4-82d4-c51fbb56e859', externalId: 'tybKnGZRwcU', title: 'Kurzgesagt', file: 'features/listening/data/lessons/lesson_kurzgesagt_interstellar.ts' });
}
if (!allLessons.find(l => l.externalId === 'doOlP7NLUwc')) {
  allLessons.push({ id: 'e4476093-9f0c-4620-a7f3-345d0e6b64db', externalId: 'doOlP7NLUwc', title: 'BBC Sunken Ship', file: 'features/listening/data/lessons/lesson_bbc_sunken_ship.ts' });
}

console.log(`Testing ${allLessons.length} lessons with real Chrome YouTube IFrame Player...`);

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // We navigate to http://localhost:3000 so the origin is exactly http://localhost:3000
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Test videos in batches of 5 concurrently inside the browser
  const results = [];
  const batchSize = 6;
  
  for (let i = 0; i < allLessons.length; i += batchSize) {
    const batch = allLessons.slice(i, i + batchSize);
    
    const batchResults = await page.evaluate(async (items) => {
      // Load YouTube IFrame API if not loaded
      if (!window.YT) {
        await new Promise((resolve) => {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          window.onYouTubeIframeAPIReady = () => resolve();
          document.head.appendChild(tag);
          setTimeout(resolve, 5000);
        });
      }

      const promises = items.map(item => {
        return new Promise((resolve) => {
          const divId = 'yt_test_' + item.externalId.replace(/[^a-zA-Z0-9]/g, '_');
          let div = document.getElementById(divId);
          if (!div) {
            div = document.createElement('div');
            div.id = divId;
            div.style.width = '200px';
            div.style.height = '150px';
            div.style.display = 'none';
            document.body.appendChild(div);
          }

          let resolved = false;
          let player;

          const timer = setTimeout(() => {
            if (!resolved) {
              resolved = true;
              try { player?.destroy(); } catch(e){}
              div.remove();
              resolve({
                id: item.id,
                externalId: item.externalId,
                title: item.title,
                file: item.file,
                status: 'TIMEOUT_READY',
                errorCode: null
              });
            }
          }, 6000);

          try {
            player = new window.YT.Player(divId, {
              videoId: item.externalId,
              playerVars: {
                origin: window.location.origin,
                enablejsapi: 1,
                autoplay: 0,
                controls: 0
              },
              events: {
                onReady: (e) => {
                  if (!resolved) {
                    resolved = true;
                    clearTimeout(timer);
                    try { player.destroy(); } catch(e){}
                    div.remove();
                    resolve({
                      id: item.id,
                      externalId: item.externalId,
                      title: item.title,
                      file: item.file,
                      status: 'READY_OK',
                      errorCode: null
                    });
                  }
                },
                onError: (e) => {
                  if (!resolved) {
                    resolved = true;
                    clearTimeout(timer);
                    const code = e.data;
                    let status = 'ERROR_' + code;
                    if (code === 101 || code === 150) {
                      status = 'BLOCKED_EMBED_BY_OWNER';
                    } else if (code === 100 || code === 2) {
                      status = 'UNAVAILABLE_OR_REMOVED';
                    }
                    try { player.destroy(); } catch(e){}
                    div.remove();
                    resolve({
                      id: item.id,
                      externalId: item.externalId,
                      title: item.title,
                      file: item.file,
                      status: status,
                      errorCode: code
                    });
                  }
                }
              }
            });
          } catch(err) {
            if (!resolved) {
              resolved = true;
              clearTimeout(timer);
              resolve({
                id: item.id,
                externalId: item.externalId,
                title: item.title,
                file: item.file,
                status: 'EXCEPTION',
                errorCode: err.message
              });
            }
          }
        });
      });

      return Promise.all(promises);
    }, batch);

    for (const res of batchResults) {
      results.push(res);
      const tag = res.status === 'READY_OK' ? '[OK]' : `[${res.status}]`;
      console.log(`${tag.padEnd(25)} | ${res.id.padEnd(16)} | ${res.externalId.padEnd(12)} | Code: ${res.errorCode} | ${res.title.slice(0, 35)}`);
    }
  }

  await browser.close();

  fs.writeFileSync('scripts/puppeteer_embed_results.json', JSON.stringify(results, null, 2), 'utf8');

  console.log('\n' + '='.repeat(80));
  console.log('FINAL AUDIT: EMBEDDING RESTRICTION DETECTION RESULTS');
  console.log('='.repeat(80));
  const blocked = results.filter(r => r.status !== 'READY_OK');
  console.log(`Total problematic videos: ${blocked.length} / ${results.length}`);
  for (const b of blocked) {
    console.log(`❌ FAILED: ${b.id} (${b.externalId}) -> ${b.status} (code: ${b.errorCode})`);
    console.log(`   File: ${b.file}`);
    console.log(`   Title: ${b.title}\n`);
  }
}

run().catch(console.error);
