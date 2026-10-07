import { prisma } from "../infrastructure/database/prisma";
import { PRESET_YOUTUBE_VIDEOS } from "../features/listening/data/defaultVideoPresets";

async function main() {
  console.log("=== PRESET YOUTUBE VIDEOS ===");
  console.log("Count:", PRESET_YOUTUBE_VIDEOS.length);
  PRESET_YOUTUBE_VIDEOS.forEach((v, i) => {
    console.log(
      `[${i + 1}] ID: ${v.id} | Title: ${v.title} | Duration: ${v.duration} | Subtitles count: ${v.subtitles?.length}`
    );
  });

  console.log("\n=== NEON POSTGRESQL VIDEO TABLES ===");
  const catCount = await prisma.videoCategory.count();
  const playlistCount = await prisma.videoPlaylist.count();
  const lessonCount = await prisma.videoLesson.count();
  const segmentCount = await prisma.lessonSegment.count();
  const requestCount = await prisma.lessonRequest.count();

  console.log({
    categories: catCount,
    playlists: playlistCount,
    lessons: lessonCount,
    segments: segmentCount,
    requests: requestCount,
  });

  const lessons = await prisma.videoLesson.findMany({
    include: {
      category: { select: { name: true, slug: true } },
      segments: { select: { id: true, orderIndex: true, text: true, properNouns: true, startTime: true, endTime: true, translationVi: true } },
    },
  });

  console.log("\n=== SEEDED VIDEO LESSONS IN DB ===");
  lessons.forEach((l, i) => {
    console.log(
      `[${i + 1}] DB ID: ${l.id} | YT ID: ${l.externalId} | Level: ${l.cefrLevel} | Title: ${l.title} | Segments: ${l.segments.length}`
    );
    console.log("   Category:", l.category?.name);
    console.log("   Duration:", l.durationFormatted);
    if (l.segments.length > 0) {
      console.log(`   Sample Segment 1 [${l.segments[0].startTime}s - ${l.segments[0].endTime}s]:`, l.segments[0].text);
      console.log("   Vietnamese translation:", l.segments[0].translationVi);
      console.log("   Proper Nouns:", l.segments[0].properNouns);
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
