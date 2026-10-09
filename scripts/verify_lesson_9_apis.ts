export {};

async function main() {
  console.log("Testing Live APIs for Lesson 9 (NatGeo Renewable Energy 101)...");

  const resCatalog = await fetch("http://localhost:3000/api/video-catalog/lessons/vid_ielts_environmental_sustainability");
  if (!resCatalog.ok) {
    throw new Error(`Catalog API returned status ${resCatalog.status}`);
  }
  const jsonCatalog = await resCatalog.json();
  const lesson = jsonCatalog.lesson;
  console.log("✅ Video Catalog API (/api/video-catalog/lessons/vid_ielts_environmental_sustainability):");
  console.log(`   - ID: ${lesson?.id}`);
  console.log(`   - Title: ${lesson?.title}`);
  console.log(`   - Segments count: ${lesson?.segments?.length}`);
  console.log(`   - First segment: "${lesson?.segments?.[0]?.text}"`);
  console.log(`   - Last segment: "${lesson?.segments?.[lesson?.segments?.length - 1]?.text}"`);

  const resListening = await fetch("http://localhost:3000/api/listening/lessons/vid_ielts_environmental_sustainability");
  if (!resListening.ok) {
    throw new Error(`Listening API returned status ${resListening.status}`);
  }
  const jsonListening = await resListening.json();
  const lData = jsonListening.data;
  console.log("\n✅ Listening Lesson API (/api/listening/lessons/vid_ielts_environmental_sustainability):");
  console.log(`   - ID: ${lData?.id}`);
  console.log(`   - Title: ${lData?.title}`);
  const transcript = Array.isArray(lData?.transcript) ? lData.transcript : [];
  console.log(`   - Transcript count: ${transcript.length}`);
  console.log(`   - First transcript: "${transcript[0]?.text}"`);
  console.log(`   - Last transcript: "${transcript[transcript.length - 1]?.text}"`);
}

main().catch(console.error);
