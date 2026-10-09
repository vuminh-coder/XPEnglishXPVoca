export {};

async function main() {
  const res = await fetch("http://localhost:3000/api/youtube/captions?videoId=lpLFjQ-bRv8");
  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Success:", data.success);
  console.log("Title:", data.title);
  console.log("Subtitles count:", data.subtitles?.length);
  if (data.subtitles?.length > 0) {
    console.log("Sample sub 0:", data.subtitles[0]);
    console.log("Sample sub 1:", data.subtitles[1]);
  }
  console.log("Tracks:", data.tracks?.length);
}

main().catch(console.error);
