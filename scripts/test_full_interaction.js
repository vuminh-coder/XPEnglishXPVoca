const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false, // let's see or run headless
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const logs = [];
  page.on('console', msg => logs.push('[BROWSER] ' + msg.text()));
  page.on('pageerror', err => logs.push('[PAGE_ERROR] ' + err.toString()));
  
  console.log('1. Navigating to page...');
  await page.goto('http://localhost:3000/study/dictation?id=1481dc60-fe8a-4fa9-830b-9a227ede9b6e', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Check initial state
  const state1 = await page.evaluate(() => {
    return {
      title: document.querySelector('h1, h2, h3')?.innerText,
      timer: document.querySelector('.font-mono.tabular-nums')?.innerText,
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({ val: i.value, placeholder: i.placeholder, class: i.className })),
      tabs: Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('phụ đề') || b.innerText.includes('Luyện chép')).map(b => b.innerText),
    };
  });
  console.log('Initial state:', JSON.stringify(state1, null, 2));

  // 2. Click "Danh sách phụ đề (6)"
  console.log('2. Clicking "Danh sách phụ đề" tab...');
  const clickedTab = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const subTab = btns.find(b => b.innerText.includes('Danh sách phụ đề'));
    if (subTab) {
      subTab.click();
      return true;
    }
    return false;
  });
  console.log('Subtitles tab clicked:', clickedTab);
  await new Promise(r => setTimeout(r, 1000));

  // Check what is rendered in subtitle list tab
  const subList = await page.evaluate(() => {
    const items = document.querySelectorAll('.group\\/sentence, [data-sentence-index], .cursor-pointer');
    return Array.from(items)
      .map(el => el.innerText.trim())
      .filter(t => t.length > 20 && !t.includes('Học viên') && !t.includes('Quay lại'));
  });
  console.log('Subtitles in list tab (total ' + subList.length + '):', subList.slice(0, 8));

  // 3. Switch back to "Luyện chép" tab
  console.log('3. Clicking back to "Luyện chép" tab...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const dictTab = btns.find(b => b.innerText.includes('Luyện chép'));
    if (dictTab) dictTab.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 4. Test clicking the Play button
  console.log('4. Testing Play button click...');
  const playClickResult = await page.evaluate(() => {
    // Find the center play button
    const btns = Array.from(document.querySelectorAll('button'));
    const playBtn = btns.find(b => b.className.includes('bg-[#0059bb]') && b.className.includes('rounded-full'));
    if (playBtn) {
      playBtn.click();
      return { found: true, title: playBtn.title };
    }
    return { found: false };
  });
  console.log('Play button click result:', playClickResult);

  // Wait 4 seconds and check logs and player time
  await new Promise(r => setTimeout(r, 4000));
  
  const stateAfterPlay = await page.evaluate(() => {
    const timeDisplays = Array.from(document.querySelectorAll('.font-mono.tabular-nums')).map(el => el.innerText);
    return { timeDisplays };
  });
  console.log('Time displays after 4s play:', stateAfterPlay);

  console.log('Recent browser logs:');
  logs.slice(-15).forEach(l => console.log(l));

  await page.screenshot({ path: 'dictation_interaction_test.png' });
  await browser.close();
  console.log('Interaction test completed!');
})();
