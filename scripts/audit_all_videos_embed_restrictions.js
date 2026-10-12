const puppeteer = require('puppeteer-core');
const fs = require('fs');

// Read all lessons from embed_check_results.json + missing
const lessonsData = JSON.parse(fs.readFileSync('scripts/embed_check_results.json', 'utf8'));
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

console.log(`Starting definitive live Playback audit for ${allLessons.length} videos...`);

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

  // We test sequentially or in small pairs so network / YouTube rate limits don't interfere
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
            resolve({ status: 'TIMEOUT', code: null });
          }
        }, 7000);

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
                  resolve({ status: 'PLAYING_SUCCESS', code: null });
                }
              },
              onError: (e) => {
                if (!resolved) {
                  resolved = true;
                  clearTimeout(timer);
                  try { player.destroy(); } catch(e){}
                  div.remove();
                  resolve({ status: 'ERROR', code: e.data });
                }
              }
            }
          });
        } catch(err) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            div.remove();
            resolve({ status: 'EXCEPTION', code: err.message });
          }
        }
      });
    }, item.externalId);

    const record = {
      ...item,
      playStatus: testRes.status,
      errorCode: testRes.code
    };
    auditResults.push(record);

    if (testRes.status === 'PLAYING_SUCCESS') {
      console.log(`✅ OK (Playable)`);
    } else if (testRes.code === 150 || testRes.code === 101) {
      console.log(`❌ BLOCKED BY OWNER (Code ${testRes.code})`);
    } else if (testRes.code === 100 || testRes.code === 2) {
      console.log(`❌ UNAVAILABLE / DEAD (Code ${testRes.code})`);
    } else {
      console.log(`⚠️ ${testRes.status} (Code: ${testRes.code})`);
    }
  }

  await browser.close();

  fs.writeFileSync('scripts/audit_playback_results.json', JSON.stringify(auditResults, null, 2), 'utf8');

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY OF ALL DEFECTIVE VIDEOS (BLOCKED EMBED OR DEAD):');
  console.log('='.repeat(80));

  const defective = auditResults.filter(r => r.playStatus !== 'PLAYING_SUCCESS');
  console.log(`Total defective videos: ${defective.length} / ${auditResults.length}\n`);

  for (const d of defective) {
    let reasonText = '';
    if (d.errorCode === 150 || d.errorCode === 101) {
      reasonText = 'CHỦ VIDEO GIỚI HẠN PHÁT NHÚNG (Error 150/101)';
    } else if (d.errorCode === 100) {
      reasonText = 'VIDEO KHÔNG TỒN TẠI HOẶC BỊ XÓA (Error 100)';
    } else {
      reasonText = `${d.playStatus} (Code: ${d.errorCode})`;
    }

    console.log(`- Lesson ID: ${d.id}`);
    console.log(`  YouTube ID: ${d.externalId}`);
    console.log(`  Lý do lỗi: ${reasonText}`);
    console.log(`  Tiêu đề: ${d.title}`);
    console.log(`  Tệp: ${d.file}\n`);
  }
}

run().catch(console.error);
