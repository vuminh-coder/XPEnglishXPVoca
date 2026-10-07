const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const logs = [];
  page.on('console', msg => logs.push(msg.text()));
  page.on('pageerror', err => logs.push('PAGE_ERROR: ' + err.toString()));
  
  await page.goto('http://localhost:3000/study/dictation?id=1481dc60-fe8a-4fa9-830b-9a227ede9b6e', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Find Play button or buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText.trim(),
      title: b.title || '',
      ariaLabel: b.getAttribute('aria-label') || '',
      className: b.className
    })).filter(b => b.text || b.title || b.ariaLabel);
  });
  console.log('Buttons on page (total ' + buttons.length + '):', JSON.stringify(buttons.slice(0, 15), null, 2));

  const iframeSrc = await page.evaluate(() => {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    return iframes.map(f => f.src);
  });
  console.log('Iframe src list:', iframeSrc);

  const sentences = await page.evaluate(() => {
    // Check elements in right sidebar or transcript
    const trans = document.querySelectorAll('.group\\/sentence, [data-sentence-index]');
    return Array.from(trans).map(el => el.textContent.trim().slice(0, 80));
  });
  console.log('Sentences found in sidebar:', sentences.length, sentences);

  // Check state of dictation workspace
  const workspaceInfo = await page.evaluate(() => {
    const wordInputs = document.querySelectorAll('input');
    const properNouns = document.querySelectorAll('.bg-amber-500\\/10, .text-amber-600');
    return {
      inputsCount: wordInputs.length,
      inputValues: Array.from(wordInputs).map(i => i.value),
      properNounsCount: properNouns.length
    };
  });
  console.log('Workspace info:', workspaceInfo);

  await page.screenshot({ path: 'dictation_detail_view.png' });
  await browser.close();
  console.log('Done!');
})();
