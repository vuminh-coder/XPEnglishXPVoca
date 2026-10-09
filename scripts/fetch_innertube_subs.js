async function getCaptions(videoId) {
  const clients = [
    { clientName: "IOS", clientVersion: "19.29.1", userAgent: "com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X; en_US)" },
    { clientName: "ANDROID", clientVersion: "19.29.35", userAgent: "com.google.android.youtube/19.29.35 (Linux; U; Android 14; US) gzip" },
    { clientName: "WEB", clientVersion: "2.20240901.00.00", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
  ];

  for (const c of clients) {
    try {
      const res = await fetch("https://www.youtube.com/youtubei/v1/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": c.userAgent,
        },
        body: JSON.stringify({
          videoId,
          context: {
            client: {
              clientName: c.clientName,
              clientVersion: c.clientVersion,
              hl: "en",
              gl: "US",
            },
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (tracks && tracks.length > 0) {
          const enTrack = tracks.find(t => t.languageCode === 'en' || t.vssId?.includes('.en'));
          if (enTrack) {
            console.log(`[${videoId}] Success with client ${c.clientName}! BaseUrl: ${enTrack.baseUrl.slice(0, 80)}...`);
            // Fetch track text
            const subRes = await fetch(enTrack.baseUrl + '&fmt=json3', {
              headers: { 'User-Agent': c.userAgent }
            });
            const subText = await subRes.text();
            console.log(`  Sub text length: ${subText.length}, isJSON: ${subText.startsWith('{')}`);
            if (subText.startsWith('{')) {
              return JSON.parse(subText);
            }
          }
        }
      }
    } catch (err) {
      console.log(`Client ${c.clientName} failed for ${videoId}:`, err.message);
    }
  }
  return null;
}

async function run() {
  const vids = [
    { id: 'eIho2S0ZahI', name: 'Julian Treasure: How to speak so people listen' },
    { id: 'iG9CE55wbtY', name: 'Sir Ken Robinson: Do schools kill creativity?' },
    { id: 'c0KYU2j0TM4', name: 'Susan Cain: The power of introverts' },
    { id: 'arj7oStGLkU', name: 'Tim Urban: Inside the mind of a master procrastinator' }
  ];

  for (const v of vids) {
    console.log(`Testing ${v.name} (${v.id})...`);
    const subs = await getCaptions(v.id);
    if (subs && subs.events) {
      console.log(`>>> GOT SUBS FOR ${v.name}! Events count: ${subs.events.length}`);
      const fs = require('fs');
      fs.writeFileSync(`scripts/${v.id}.en.json3`, JSON.stringify(subs, null, 2));
      console.log(`Saved scripts/${v.id}.en.json3 successfully!`);
      break; // Found our next video!
    }
  }
}

run();
