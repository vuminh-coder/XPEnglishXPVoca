const fs = require('fs');

async function fetchSteveJobsTranscript() {
  console.log("Fetching YouTube watch page for UF8uR6Z6KLc...");
  const res = await fetch("https://www.youtube.com/watch?v=UF8uR6Z6KLc", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    }
  });

  const html = await res.text();
  const m = html.match(/"captionTracks":(\[.*?\])/);
  if (!m) {
    console.error("No captionTracks found in HTML");
    return;
  }

  const unescaped = m[1].replace(/\\u0026/g, "&");
  const tracks = JSON.parse(unescaped);
  console.log("Available tracks:", tracks.map(t => ({ lang: t.languageCode, vssId: t.vssId, name: t.name?.simpleText })));

  // Prefer human English (.en) over auto-generated (a.en)
  const enTrack = tracks.find(t => t.vssId.startsWith(".en")) || tracks.find(t => t.languageCode === "en");
  if (!enTrack) {
    console.error("No English track found");
    return;
  }

  console.log(`Using track: ${enTrack.vssId} (${enTrack.languageCode})`);
  const captionUrl = enTrack.baseUrl;
  console.log(`Fetching captions directly from: ${captionUrl}`);

  const capRes = await fetch(captionUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    }
  });
  console.log(`Caption HTTP status: ${capRes.status}`);

  const text = await capRes.text();
  console.log(`Response text length: ${text.length}`);
  console.log(`Response preview: ${text.slice(0, 300)}`);
  fs.writeFileSync("scripts/steve_jobs_raw.txt", text);

  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.log("Could not parse as JSON3 directly, will check XML or other formats");
    return;
  }
  console.log(`Total events fetched: ${json.events?.length}`);

  fs.writeFileSync("scripts/steve_jobs_raw.json3", JSON.stringify(json, null, 2));
  console.log("Saved raw transcript to scripts/steve_jobs_raw.json3");

  // Filter out sound effects like [Applause] or empty events
  const cleaned = [];
  for (const ev of json.events || []) {
    if (!ev.segs) continue;
    const text = ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
    if (!text || text === '[Applause]' || text === '[Music]') continue;
    cleaned.push({
      start: (ev.tStartMs / 1000),
      duration: (ev.dDurationMs / 1000),
      end: ((ev.tStartMs + (ev.dDurationMs || 0)) / 1000),
      text
    });
  }

  console.log(`Total clean speech lines: ${cleaned.length}`);
  console.log("\nFirst 15 lines:");
  cleaned.slice(0, 15).forEach((line, i) => {
    console.log(`[${i + 1}] ${line.start.toFixed(2)}s - ${line.end.toFixed(2)}s: "${line.text}"`);
  });
}

fetchSteveJobsTranscript().catch(console.error);
