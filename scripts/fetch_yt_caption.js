const fs = require('fs');

async function fetchCaption(videoId, outputName) {
  console.log(`Fetching captions for YouTube ID: ${videoId}...`);
  const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  const html = await res.text();
  const m = html.match(/"captionTracks":(\[.*?\])/);
  if (!m) {
    console.error(`No captionTracks found in HTML for ${videoId}`);
    return null;
  }

  const unescaped = m[1].replace(/\\u0026/g, '&');
  const tracks = JSON.parse(unescaped);
  console.log('Available tracks:', tracks.map(t => ({ lang: t.languageCode, vssId: t.vssId, name: t.name?.simpleText })));

  const enTrack = tracks.find(t => t.vssId && t.vssId.startsWith('.en')) || tracks.find(t => t.languageCode === 'en');
  if (!enTrack) {
    console.error('No suitable English track found');
    return null;
  }

  console.log(`Selected track: ${enTrack.vssId} (${enTrack.languageCode})`);
  const captionUrl = enTrack.baseUrl.includes('fmt=json3') ? enTrack.baseUrl : (enTrack.baseUrl + '&fmt=json3');
  
  const capRes = await fetch(captionUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    }
  });

  const text = await capRes.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse timedtext response as JSON. Status:', capRes.status, 'Response:', text.slice(0, 200));
    return null;
  }

  console.log(`Successfully fetched ${json.events?.length} events.`);
  const outPath = `scripts/${outputName}.en.json3`;
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved transcript to ${outPath}`);
  return json;
}

const videoId = process.argv[2] || 'tybKnGZRwcU';
const outputName = process.argv[3] || 'kurzgesagt_official';

fetchCaption(videoId, outputName);
