const puppeteer = require('puppeteer-core');
const fs = require('fs');
const https = require('https');

(async () => {
  const videoId = 'iUB-sCiZIUw';
  console.log(`Starting Puppeteer Chrome to extract 100% transcript for video: ${videoId}`);
  
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  const pageTitle = await page.title();
  console.log('Video Title:', pageTitle);

  // Extract initial player response
  const playerResponse = await page.evaluate(() => {
    return window.ytInitialPlayerResponse || null;
  });

  let captionTracks = [];
  if (playerResponse && playerResponse.captions && playerResponse.captions.playerCaptionsTracklistRenderer) {
    captionTracks = playerResponse.captions.playerCaptionsTracklistRenderer.captionTracks || [];
  }
  console.log(`Found ${captionTracks.length} caption tracks in ytInitialPlayerResponse`);

  let rawCaptionsXml = null;
  if (captionTracks.length > 0) {
    const enTrack = captionTracks.find(t => t.languageCode === 'en' || t.vssId?.includes('en')) || captionTracks[0];
    console.log(`Using caption track: ${enTrack.name?.simpleText || enTrack.languageCode} (${enTrack.baseUrl})`);
    
    // Fetch captions directly inside page context or via fetch
    try {
      rawCaptionsXml = await page.evaluate(async (url) => {
        const resp = await fetch(url);
        return await resp.text();
      }, enTrack.baseUrl);
      console.log(`Successfully fetched raw captions text/xml (${rawCaptionsXml.length} chars)`);
      fs.writeFileSync('scripts/about_time_raw_captions.xml', rawCaptionsXml, 'utf-8');
    } catch (e) {
      console.log('Fetch captions error:', e.message);
    }
  }

  // Also try to open the transcript panel in the YouTube UI to get the exact rendered transcript
  let uiTranscriptSegments = [];
  try {
    // Scroll down a bit to ensure description is loaded
    await page.evaluate(() => window.scrollBy(0, 300));
    await new Promise(r => setTimeout(r, 1500));

    // Look for expand description button
    const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
    if (expandBtn) {
      await expandBtn.click();
      await new Promise(r => setTimeout(r, 1500));
    }

    // Look for Show transcript button
    const buttons = await page.$$('button, ytd-button-renderer');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
      if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('chép lời')) {
        console.log('Clicking transcript button:', text.trim());
        await btn.click();
        await new Promise(r => setTimeout(r, 3000));
        break;
      }
    }

    // Extract segments from DOM
    uiTranscriptSegments = await page.$$eval('ytd-transcript-segment-renderer', els => {
      return els.map(el => {
        const timeEl = el.querySelector('.segment-timestamp');
        const textEl = el.querySelector('.segment-text');
        return {
          timestamp: timeEl ? timeEl.innerText.trim() : '',
          text: textEl ? textEl.innerText.trim() : ''
        };
      });
    });
    console.log(`Extracted ${uiTranscriptSegments.length} transcript segments from UI panel!`);
  } catch (e) {
    console.log('UI transcript error:', e.message);
  }

  const result = {
    videoId,
    pageTitle,
    captionTracks,
    uiTranscriptSegments,
    hasRawCaptions: !!rawCaptionsXml
  };

  fs.writeFileSync('scripts/about_time_extracted_full.json', JSON.stringify(result, null, 2), 'utf-8');
  console.log('Finished extraction and saved to scripts/about_time_extracted_full.json');

  await browser.close();
})();
