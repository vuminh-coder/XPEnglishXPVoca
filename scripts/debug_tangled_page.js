const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto('https://www.youtube.com/watch?v=uQ2rJKiiRiU', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  // Get description text and buttons
  const info = await page.evaluate(() => {
    const desc = document.querySelector('#description, #description-inline-expander')?.innerText || '';
    const allButtons = Array.from(document.querySelectorAll('button, tp-yt-paper-button, ytd-button-renderer')).map(b => ({
      text: b.innerText?.trim() || '',
      aria: b.getAttribute('aria-label') || '',
      id: b.id,
      className: b.className
    })).filter(b => b.text || b.aria);

    const ytInitialData = window.ytInitialData;
    const playerResponse = window.ytInitialPlayerResponse;

    return {
      descPreview: desc.slice(0, 500),
      buttonsCount: allButtons.length,
      relevantButtons: allButtons.filter(b => 
        (b.text + b.aria).toLowerCase().includes('transcript') ||
        (b.text + b.aria).toLowerCase().includes('chép') ||
        (b.text + b.aria).toLowerCase().includes('more') ||
        (b.text + b.aria).toLowerCase().includes('thêm') ||
        (b.text + b.aria).toLowerCase().includes('show')
      ),
      hasCaptionsInPlayerResponse: !!playerResponse?.captions,
      captionTracks: playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks || []
    };
  });

  console.log('DOM info:', JSON.stringify(info, null, 2));

  await browser.close();
})();
