const fs = require('fs');

// Decode XML/HTML Entities
function decodeXmlEntities(text) {
  if (!text) return "";
  let result = text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

  result = result
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));

  return result.replace(/\s+/g, " ").trim();
}

// JSON3 Subtitle Parser
function parseTimedTextJson3(jsonStr) {
  if (!jsonStr) return [];
  try {
    const data = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
    if (!data || !Array.isArray(data.events)) return [];

    const rawItems = [];

    for (const event of data.events) {
      if (!event.segs || !Array.isArray(event.segs)) continue;

      const text = event.segs
        .map((s) => s.utf8 || "")
        .join("")
        .replace(/\n/g, " ")
        .trim();

      const decodedText = decodeXmlEntities(text);
      if (!decodedText || decodedText.length === 0) continue;

      const startTime = typeof event.tStartMs === "number" ? event.tStartMs / 1000 : 0;
      const rawDur = typeof event.dDurationMs === "number" ? event.dDurationMs / 1000 : null;

      rawItems.push({
        startTime: parseFloat(startTime.toFixed(3)),
        rawDur: rawDur ? parseFloat(rawDur.toFixed(3)) : null,
        textEn: decodedText,
      });
    }

    rawItems.sort((a, b) => a.startTime - b.startTime);

    return rawItems.map((item, i) => {
      let duration;
      const nextItem = rawItems[i + 1];

      if (item.rawDur !== null && !isNaN(item.rawDur) && item.rawDur > 0) {
        duration = item.rawDur;
      } else {
        if (nextItem) {
          duration = Math.max(0.8, parseFloat((nextItem.startTime - item.startTime).toFixed(3)));
          if (duration > 5.0) duration = 5.0;
        } else {
          duration = 4.0;
        }
      }

      if (nextItem && item.startTime + duration > nextItem.startTime) {
        const maxAllowedDur = parseFloat((nextItem.startTime - item.startTime).toFixed(3));
        if (maxAllowedDur > 0.3) {
          duration = maxAllowedDur;
        }
      }

      const endTime = parseFloat((item.startTime + duration).toFixed(3));
      return {
        startTime: item.startTime,
        endTime,
        duration: parseFloat(duration.toFixed(3)),
        textEn: item.textEn,
      };
    });
  } catch (e) {
    return [];
  }
}

// Extract Caption Tracks array from Watch Page HTML
function extractCaptionTracksFromHtml(html) {
  // Method 1: Direct captionTracks regex
  const tracksMatch = /"captionTracks":\s*(\[[\s\S]+?\])\s*,\s*"/i.exec(html);
  if (tracksMatch && tracksMatch[1]) {
    try {
      return JSON.parse(tracksMatch[1]);
    } catch (e) {}
  }

  // Method 2: ytInitialPlayerResponse object regex
  const playerMatch = /ytInitialPlayerResponse\s*=\s*({[\s\S]+?});\s*(?:var|window|document|<\/script>)/i.exec(html) ||
                      /ytInitialPlayerResponse\s*=\s*({[\s\S]+?})</i.exec(html);
  if (playerMatch && playerMatch[1]) {
    try {
      const data = JSON.parse(playerMatch[1]);
      return data?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
    } catch (e) {}
  }

  return [];
}

async function runTest() {
  const videoIds = ['gN78u1P3j9Y', '7X8II6J-6mU', '2Vv-BfVoq4g', 'tFZ2gpsjuYc'];
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

  for (const id of videoIds) {
    console.log('\n--------------------------------------------------');
    console.log('Testing Real Subtitle Extraction for Video ID:', id);
    const watchUrl = `https://www.youtube.com/watch?v=${id}`;

    try {
      const res = await fetch(watchUrl, {
        headers: {
          'User-Agent': ua,
          'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        },
      });
      const html = await res.text();
      const tracks = extractCaptionTracksFromHtml(html);

      console.log(`Caption Tracks found: ${tracks.length}`);
      if (tracks.length > 0) {
        let enTrack = tracks.find((t) => t.languageCode?.startsWith("en")) || tracks[0];
        console.log(`Selected track lang: ${enTrack.languageCode} | name: ${enTrack.name?.simpleText || enTrack.name?.runs?.[0]?.text}`);

        // Try fetching track with fmt=json3
        const trackUrl = enTrack.baseUrl.includes('fmt=') ? enTrack.baseUrl : `${enTrack.baseUrl}&fmt=json3`;
        const trackRes = await fetch(trackUrl, { headers: { 'User-Agent': ua } });
        const jsonText = await trackRes.text();

        console.log(`Track response status: ${trackRes.status} | len: ${jsonText.length}`);
        const parsed = parseTimedTextJson3(jsonText);
        console.log(`Parsed REAL Sentences Count: ${parsed.length}`);

        if (parsed.length > 0) {
          console.log(`SUCCESS! First 3 Real Sentences for ${id}:`);
          parsed.slice(0, 3).forEach((s, idx) => {
            console.log(`  [${s.startTime}s -> ${s.endTime}s] (${s.duration}s): "${s.textEn}"`);
          });
        }
      } else {
        console.warn(`No caption tracks found in HTML for ${id}`);
      }
    } catch (e) {
      console.error(`Error processing ${id}:`, e);
    }
  }
}

runTest();
