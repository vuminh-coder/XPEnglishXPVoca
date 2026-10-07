async function testClients() {
  const videoId = "lpLFjQ-bRv8";
  const clients = [
    { clientName: "WEB", clientVersion: "2.20240901.00.00", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    { clientName: "IOS", clientVersion: "19.29.1", userAgent: "com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X; en_US)" },
    { clientName: "TVHTML5", clientVersion: "7.20230405.08.01", userAgent: "Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0)" },
    { clientName: "MWEB", clientVersion: "2.20240901.00.00", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15" }
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
      console.log(`Client ${c.clientName} status:`, res.status);
      if (res.ok) {
        const data = await res.json();
        const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        console.log(`Client ${c.clientName} tracks:`, tracks ? tracks.length : "NONE");
        if (tracks && tracks.length > 0) {
          console.log("Found track:", tracks[0].baseUrl);
          // Try fetching track
          const trackRes = await fetch(tracks[0].baseUrl);
          console.log("Track fetch status:", trackRes.status);
          const trackText = await trackRes.text();
          console.log("Track text length:", trackText.length, trackText.slice(0, 100));
          return;
        }
      }
    } catch (e) {
      console.log(`Client ${c.clientName} error:`, e.message);
    }
  }

  // Also test fetching watch page
  try {
    const watchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      }
    });
    console.log("Watch page status:", watchRes.status);
    const html = await watchRes.text();
    const hasCaptions = html.includes("captionTracks");
    console.log("Watch page has captionTracks?", hasCaptions);
    if (hasCaptions) {
      const m = html.match(/"captionTracks":(\[.*?\])/);
      if (m) console.log("CaptionTracks found:", m[1].slice(0, 200));
    }
  } catch (e) {
    console.log("Watch page error:", e.message);
  }
}

testClients();
