const fs = require('fs');

async function testCaptionTracksRegex() {
  const ids = ['gN78u1P3j9Y', '7X8II6J-6mU', '2Vv-BfVoq4g', 'tFZ2gpsjuYc'];
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

  for (const id of ids) {
    console.log('\n========================================');
    console.log('Testing video:', id);
    const watchUrl = 'https://www.youtube.com/watch?v=' + id;
    try {
      const res = await fetch(watchUrl, {
        headers: {
          'User-Agent': ua,
          'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        },
      });
      const html = await res.text();
      console.log('HTML fetched len:', html.length);

      // Match captionTracks array cleanly
      const match = /"captionTracks":\s*(\[[\s\S]+?\])\s*,\s*"/i.exec(html);
      if (match && match[1]) {
        const tracks = JSON.parse(match[1]);
        console.log('SUCCESS! Extracted tracks count:', tracks.length);
        for (const t of tracks) {
          console.log(`- Lang: ${t.languageCode} | Kind: ${t.kind || 'manual'} | Name: ${t.name?.simpleText || t.name?.runs?.[0]?.text}`);
          console.log(`  BaseURL: ${t.baseUrl.substring(0, 120)}...`);

          // Test fetching the track content with fmt=json3 and fmt=srv1
          const jsonRes = await fetch(t.baseUrl + '&fmt=json3', { headers: { 'User-Agent': ua } });
          const jsonText = await jsonRes.text();
          console.log(`  -> fmt=json3 len: ${jsonText.length}`);

          if (jsonText && jsonText.includes('"events"')) {
            const data = JSON.parse(jsonText);
            const validEvents = (data.events || []).filter(e => e.segs && e.segs.length > 0);
            console.log(`  -> JSON3 valid events (sentences): ${validEvents.length}`);
            if (validEvents.length > 0) {
              const sampleText = validEvents.slice(0, 3).map(e => e.segs.map(s => s.utf8).join('').trim()).join(' / ');
              console.log(`  -> Sample captions: "${sampleText}"`);
            }
          }
        }
      } else {
        console.warn('FAILED: captionTracks regex not matched');
      }
    } catch (e) {
      console.error('Error testing video:', id, e);
    }
  }
}

testCaptionTracksRegex();
