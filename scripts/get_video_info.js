async function run() {
  const r = await fetch('https://www.youtube.com/watch?v=1qlLS47uBD4');
  const html = await r.text();
  const m = html.match(/"lengthSeconds":"(\d+)"/);
  console.log('lengthSeconds:', m ? m[1] : 'not found');
  const viewMatch = html.match(/"viewCount":"(\d+)"/);
  console.log('viewCount:', viewMatch ? viewMatch[1] : 'not found');
}
run();
