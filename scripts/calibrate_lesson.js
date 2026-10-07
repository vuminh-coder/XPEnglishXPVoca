const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lessonId = '1481dc60-fe8a-4fa9-830b-9a227ede9b6e';
  console.log(`Calibrating segments for video lesson ${lessonId}...`);

  // Define the 6 clean, pedagogical, perfectly timestamped segments covering the entire 109s speech
  const segments = [
    {
      orderIndex: 1,
      startTime: 0.08,
      endTime: 16.76,
      text: "From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is superhuman.",
      normalizedText: "from the moment of concept to building a massive factory liquid cooled energized permitted in the short time that was done that is superhuman",
      translationVi: "Từ lúc lên ý tưởng đến khi xây dựng một nhà máy khổng lồ, làm mát bằng chất lỏng, cấp điện và cấp phép trong thời gian ngắn ngủi như vậy, điều đó thực sự phi thường.",
      ipaUs: "/frʌm ðə ˈmoʊmənt ʌv ˈkɑːnsept tuː ˈbɪldɪŋ ə ˈmæsɪv ˈfæktəri/",
      explanationAi: "Jensen Huang ca ngợi tốc độ triển khai thần tốc của đội ngũ xAI khi xây dựng nhà máy Colossus.",
      properNouns: ["Jensen", "Colossus"],
      keywords: ["concept", "massive", "factory", "liquid-cooled", "superhuman"]
    },
    {
      orderIndex: 2,
      startTime: 16.76,
      endTime: 31.16,
      text: "As far as I know, there's only one person in the world who could do that. Elon is singular in his understanding of engineering, large systems, and marshaling resources.",
      normalizedText: "as far as i know there is only one person in the world who could do that elon is singular in his understanding of engineering large systems and marshaling resources",
      translationVi: "Theo tôi được biết, chỉ có một người duy nhất trên thế giới có thể làm được điều đó. Elon là người độc nhất vô nhị trong hiểu biết về kỹ thuật, các hệ thống quy mô lớn và huy động nguồn lực.",
      ipaUs: "/æz fɑːr æz aɪ noʊ ðerz ˈoʊnli wʌn ˈpɜːrsn ɪn ðə wɜːrld huː kəd duː ðæt/",
      explanationAi: "Từ 'singular' ở đây mang nghĩa là xuất sắc, phi thường, độc nhất vô nhị (exceptional/unique).",
      properNouns: ["Elon", "Elon Musk"],
      keywords: ["singular", "engineering", "systems", "marshaling", "resources"]
    },
    {
      orderIndex: 3,
      startTime: 31.16,
      endTime: 56.44,
      text: "His engineering team is extraordinary. From the moment that we decided to go, all of the planning, infrastructure, and technology came in to train in 19 days.",
      normalizedText: "his engineering team is extraordinary from the moment that we decided to go all of the planning infrastructure and technology came in to train in 19 days",
      translationVi: "Đội ngũ kỹ sư của anh ấy thật phi thường. Từ khoảnh khắc chúng tôi quyết định bắt đầu, toàn bộ khâu lên kế hoạch, cơ sở hạ tầng và công nghệ đã sẵn sàng để vận hành trong 19 ngày.",
      ipaUs: "/hɪz ˌendʒɪˈnɪrɪŋ tiːm ɪz ɪkˈstrɔːrdəneri/",
      explanationAi: "Extraordinary nghĩa là phi thường, vượt trội hơn người khác. 'Infrastructure' là cơ sở hạ tầng công nghệ.",
      properNouns: ["NVIDIA", "xAI"],
      keywords: ["extraordinary", "planning", "infrastructure", "technology", "19 days"]
    },
    {
      orderIndex: 4,
      startTime: 56.44,
      endTime: 75.72,
      text: "19 days is incredible. If you take a step back, 19 days is just a couple of weeks. And the mountain of technology, all of the wiring and networking, is unbelievable.",
      normalizedText: "19 days is incredible if you take a step back 19 days is just a couple of weeks and the mountain of technology all of the wiring and networking is unbelievable",
      translationVi: "19 ngày thực sự khó tin. Nếu bạn nhìn lại, 19 ngày chỉ là vài tuần ngắn ngủi. Và khối lượng công nghệ đồ sộ, toàn bộ hệ thống dây nối và mạng kết nối, thật không thể tưởng tượng được.",
      ipaUs: "/naɪnˈtiːn deɪz ɪz ɪnˈkredəbl/",
      explanationAi: "'A mountain of technology' là hình ảnh ẩn dụ cho khối lượng thiết bị phần cứng, chip và máy chủ khổng lồ.",
      properNouns: [],
      keywords: ["incredible", "couple of weeks", "mountain", "wiring", "networking"]
    },
    {
      orderIndex: 5,
      startTime: 75.72,
      endTime: 93.12,
      text: "What Elon and the xAI team achieved is singular, never been done before. 100,000 GPUs, that easily is the fastest supercomputer on the planet as one cluster.",
      normalizedText: "what elon and the xai team achieved is singular never been done before 100000 gpus that easily is the fastest supercomputer on the planet as one cluster",
      translationVi: "Những gì Elon và đội ngũ xAI đã đạt được là độc nhất vô nhị, chưa từng có tiền lệ. 100.000 GPU, đó chắc chắn là siêu máy tính nhanh nhất hành tinh dưới dạng một cụm duy nhất.",
      ipaUs: "/wʌt ˈiːlɑːn ænd ðə ˌeks eɪ ˈaɪ tiːm əˈtʃiːvd ɪz ˈsɪŋɡjələr/",
      explanationAi: "Cluster: một cụm máy chủ siêu máy tính được liên kết hoạt động như một hệ thống đơn nhất.",
      properNouns: ["Elon", "xAI", "GPU"],
      keywords: ["achieved", "singular", "100,000 GPUs", "fastest", "supercomputer", "cluster"]
    },
    {
      orderIndex: 6,
      startTime: 93.12,
      endTime: 109.04,
      text: "A supercomputer that you would normally build takes three years to plan, and then it takes one year to get it to all work. We are talking about 19 days.",
      normalizedText: "a supercomputer that you would normally build takes three years to plan and then it takes one year to get it to all work we are talking about 19 days",
      translationVi: "Một siêu máy tính thông thường bạn xây dựng phải mất 3 năm để lên kế hoạch, và mất 1 năm để đưa tất cả vào hoạt động. Ở đây chúng ta đang nói về 19 ngày.",
      ipaUs: "/ə ˈsuːpərkəmpjuːtər ðæt juː wʊd ˈnɔːrməli bɪld teɪks θriː jɪrz/",
      explanationAi: "So sánh thời gian chuẩn trong ngành (4 năm) so với kỳ tích 19 ngày của xAI Colossus.",
      properNouns: [],
      keywords: ["supercomputer", "normally", "three years", "one year", "19 days"]
    }
  ];

  // 1. Delete old inaccurate segments
  await prisma.lessonSegment.deleteMany({
    where: { lessonId }
  });

  // 2. Insert calibrated segments
  for (const s of segments) {
    await prisma.lessonSegment.create({
      data: {
        lessonId,
        orderIndex: s.orderIndex,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        normalizedText: s.normalizedText,
        translationVi: s.translationVi,
        ipaUs: s.ipaUs,
        explanationAi: s.explanationAi,
        properNouns: s.properNouns,
        keywords: s.keywords,
        tokenCount: s.text.split(/\s+/).filter(Boolean).length
      }
    });
  }

  // 3. Update VideoLesson record
  await prisma.videoLesson.update({
    where: { id: lessonId },
    data: {
      durationSeconds: 110,
      durationFormatted: "01:50",
      wpmSpeed: 135
    }
  });

  // 4. Update or sync ListeningLesson cache table if it exists
  const existingListening = await prisma.listeningLesson.findUnique({
    where: { id: lessonId }
  });

  if (existingListening) {
    await prisma.listeningLesson.update({
      where: { id: lessonId },
      data: {
        duration: "01:50",
        transcript: segments.map((s, idx) => ({
          id: `seg_${idx + 1}`,
          startTime: s.startTime,
          endTime: s.endTime,
          text: s.text,
          translation: s.translationVi,
          vietnamese: s.translationVi,
          translationVi: s.translationVi,
          ipa: s.ipaUs,
          ipaUs: s.ipaUs,
          explanationVi: s.explanationAi,
          properNouns: s.properNouns,
          keywords: s.keywords
        }))
      }
    });
  }

  console.log(`Successfully calibrated ${segments.length} segments for lesson ${lessonId}!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
