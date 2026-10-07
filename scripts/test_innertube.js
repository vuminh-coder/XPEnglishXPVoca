async function testInnertube() {
  const videoId = "lpLFjQ-bRv8";
  console.log("Testing YouTube Innertube for", videoId);
  try {
    const res = await fetch("https://www.youtube.com/youtubei/v1/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "com.google.android.youtube/19.29.35 (Linux; U; Android 14; en_US; Pixel 8 Pro)",
      },
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            clientName: "ANDROID",
            clientVersion: "19.29.35",
            hl: "en",
            gl: "US",
          },
        },
      }),
    });
    console.log("Innertube status:", res.status);
    const data = await res.json();
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    console.log("Caption tracks:", tracks ? tracks.map(t => ({ lang: t.languageCode, vssId: t.vssId, url: t.baseUrl })) : "NONE");
    if (data?.playabilityStatus) {
      console.log("Playability status:", data.playabilityStatus.status, data.playabilityStatus.reason);
    }
  } catch (e) {
    console.error("Innertube error:", e);
  }
}

testInnertube();
