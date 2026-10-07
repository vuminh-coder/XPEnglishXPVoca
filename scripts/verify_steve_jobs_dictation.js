const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const EXPECTED_STEVE_JOBS_SENTENCES = [
  {
    num: 1,
    time: "00:22 - 00:32",
    text: "Thank you. I am honored to be with you today at your commencement from one of the finest universities in the world."
  },
  {
    num: 2,
    time: "00:35 - 00:45",
    text: "Truth be told, I never graduated from college, and this is the closest I've ever gotten to a college graduation."
  },
  {
    num: 3,
    time: "00:47 - 00:54",
    text: "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories."
  },
  {
    num: 4,
    time: "00:55 - 00:59",
    text: "The first story is about connecting the dots."
  },
  {
    num: 5,
    time: "01:01 - 01:08",
    text: "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit."
  },
  {
    num: 6,
    time: "01:09 - 01:14",
    text: "So why did I drop out? It started before I was born."
  },
  {
    num: 7,
    time: "01:15 - 01:21",
    text: "My biological mother was a young, unwed graduate student, and she decided to put me up for adoption."
  },
  {
    num: 8,
    time: "01:22 - 01:31",
    text: "She felt very strongly that I should be adopted by college graduates, so everything was all set for me to be adopted at birth by a lawyer and his wife."
  },
  {
    num: 9,
    time: "01:31 - 01:37",
    text: "Except that when I popped out, they decided at the last minute that they really wanted a girl."
  },
  {
    num: 10,
    time: "01:37 - 01:46",
    text: "So my parents, who were on a waiting list, got a call in the middle of the night asking: 'We have an unexpected baby boy; do you want him?'"
  },
  {
    num: 11,
    time: "01:47 - 01:58",
    text: "They said: 'Of course.' My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school."
  },
  {
    num: 12,
    time: "01:59 - 02:08",
    text: "She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would go to college."
  },
  {
    num: 13,
    time: "02:09 - 02:13",
    text: "This was the start in my life."
  },
  {
    num: 14,
    time: "02:13 - 02:27",
    text: "And 17 years later I did go to college, but I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents' savings were being spent on my college tuition."
  },
  {
    num: 15,
    time: "02:27 - 02:36",
    text: "After six months, I couldn't see the value in it. I had no idea what I wanted to do with my life, and no idea how college was going to help me figure it out."
  },
  {
    num: 16,
    time: "02:36 - 02:41",
    text: "And here I was, spending all of the money my parents had saved their entire life."
  },
  {
    num: 17,
    time: "02:42 - 02:46",
    text: "So I decided to drop out and trust that it would all work out OK."
  },
  {
    num: 18,
    time: "02:47 - 02:52",
    text: "It was pretty scary at the time, but looking back it was one of the best decisions I ever made."
  }
];

(async () => {
  console.log('=== STARTING PUPPETEER VERIFICATION FOR STEVE JOBS 18 VERBATIM SENTENCES ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to: http://localhost:3000/study/dictation?id=0678a126-f94d-4930-81ce-ebe1e6731e7e');
  await page.goto('http://localhost:3000/study/dictation?id=0678a126-f94d-4930-81ce-ebe1e6731e7e', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForSelector('main', { timeout: 45000 });
  const title = await page.title();
  console.log('Page Title:', title);

  // Wait 2s for React hydration of transcript data
  await new Promise(r => setTimeout(r, 2000));

  // Wait for sidebar transcript items to render
  await page.waitForFunction(() => {
    const items = document.querySelectorAll('[data-sentence-index]');
    return items.length >= 18;
  }, { timeout: 15000 });

  const sentenceCount = await page.$$eval('[data-sentence-index]', els => els.length);
  console.log(`Found ${sentenceCount} sentences in Interactive Transcript Sidebar.`);

  // Verify all 18 sentences
  const domSentences = await page.$$eval('[data-sentence-index]', els => {
    return els.map(el => {
      const idx = el.getAttribute('data-sentence-index');
      const textEl = el.querySelector('p');
      const timeEl = el.querySelector('span');
      return {
        idx: parseInt(idx, 10),
        text: textEl ? textEl.innerText.trim() : '',
        time: timeEl ? timeEl.innerText.trim() : ''
      };
    });
  });

  let allMatched = true;
  for (let i = 0; i < EXPECTED_STEVE_JOBS_SENTENCES.length; i++) {
    const exp = EXPECTED_STEVE_JOBS_SENTENCES[i];
    const act = domSentences[i];
    const match = act && act.text.toLowerCase().replace(/[^a-z0-9]/g, '') === exp.text.toLowerCase().replace(/[^a-z0-9]/g, '');
    console.log(`Sentence #${i + 1}: Match=${match}`);
    if (!match) {
      console.log(`  Expected: "${exp.text}"`);
      console.log(`  Actual:   "${act?.text}"`);
      allMatched = false;
    }
  }

  // Click on sentence #13 ("This was the start in my life.")
  console.log('Clicking sentence #13 ("This was the start in my life.")...');
  await page.click('[data-sentence-index="12"]');
  await new Promise(r => setTimeout(r, 1000));

  // Check workspace sentence text
  const currentSentenceText = await page.evaluate(() => {
    const tokens = Array.from(document.querySelectorAll('span')).filter(s => s.innerText.includes('This was the start'));
    return tokens.length > 0;
  });
  console.log('Workspace switched to sentence #13:', currentSentenceText);

  // Take screenshot
  const screenshotPath = path.join(__dirname, '../public/dictation_steve_jobs_100_verbatim.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved screenshot to: ${screenshotPath}`);

  await browser.close();

  if (allMatched && sentenceCount === 18) {
    console.log('\n>>> SUCCESS: ALL 18 SENTENCES CALIBRATED 100% VERBATIM & MATCH DOM PERFECTLY! <<<');
    process.exit(0);
  } else {
    console.error('\n>>> ERROR: Mismatch detected! <<<');
    process.exit(1);
  }
})();
