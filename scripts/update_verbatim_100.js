const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LESSON_ID = '1481dc60-fe8a-4fa9-830b-9a227ede9b6e';

const VERBATIM_SEGMENTS = [
  {
    orderIndex: 0,
    startTime: 0.08,
    endTime: 16.50,
    text: "From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is like superhuman, right?",
    normalizedText: "from the moment of concept to building a massive factory liquid cooled energized permitted in the short time that was done that is like superhuman right",
    ipaUs: "/frʌm ðə ˈmoʊmənt əv ˈkɑːnsept tu ˈbɪldɪŋ ə ˈmæsɪv ˈfæktəri ˈlɪkwɪd kuːld ˈenərdʒaɪzd pərˈmɪtɪd ɪn ðə ʃɔːrt taɪm ðæt wəz dʌn ðæt ɪz laɪk ˌsuːpərˈhjuːmən raɪt/",
    translationVi: "Từ lúc lên ý tưởng đến khi xây dựng một nhà máy khổng lồ, làm mát bằng chất lỏng, cấp điện và cấp phép trong khoảng thời gian ngắn ngủi như vậy, điều đó thực sự phi thường, đúng không?",
    explanationAi: "Jensen Huang ca ngợi tốc độ triển khai kỷ lục của xAI khi xây dựng siêu máy tính Colossus từ con số 0 trong thời gian chưa từng có.",
    properNouns: [],
    keywords: ["concept", "massive factory", "liquid-cooled", "energized", "permitted", "superhuman"]
  },
  {
    orderIndex: 1,
    startTime: 16.50,
    endTime: 20.40,
    text: "And as far as I know, there's only one person in the world who could do that.",
    normalizedText: "and as far as i know there's only one person in the world who could do that",
    ipaUs: "/ænd æz fɑːr æz aɪ noʊ ðerz ˈoʊnli wʌn ˈpɜːrsn ɪn ðə wɜːrld huː kəd duː ðæt/",
    translationVi: "Và theo tôi được biết, chỉ có một người duy nhất trên thế giới có thể làm được điều đó.",
    explanationAi: "Cụm 'as far as I know' là thành ngữ thông dụng chỉ nhận định cá nhân dựa trên hiểu biết của người nói.",
    properNouns: [],
    keywords: ["as far as I know", "only one person", "world"]
  },
  {
    orderIndex: 2,
    startTime: 20.40,
    endTime: 31.16,
    text: "You know, I mean Elon is singular in this understanding of engineering, and construction, and large systems, and marshaling resources, it's unbelievable.",
    normalizedText: "you know i mean elon is singular in this understanding of engineering and construction and large systems and marshaling resources it's unbelievable",
    ipaUs: "/juː noʊ aɪ miːn ˈiːlɑːn ɪz ˈsɪŋɡjələr ɪn ðɪs ˌʌndərˈstændɪŋ əv ˌendʒɪˈnɪrɪŋ ænd kənˈstrʌkʃn ænd lɑːrdʒ ˈsɪstəmz ænd ˈmɑːrʃəlɪŋ ˈriːsɔːrsɪz ɪts ˌʌnbɪˈliːvəbl/",
    translationVi: "Ý tôi là Elon thực sự độc nhất vô nhị trong hiểu biết về kỹ thuật, xây dựng, các hệ thống quy mô lớn và huy động nguồn lực, điều đó thật khó tin.",
    explanationAi: "Từ 'singular' mang nghĩa độc nhất, xuất chúng. 'Marshaling resources' nghĩa là huy động và tập hợp các nguồn lực thần tốc.",
    properNouns: ["Elon", "Elon Musk"],
    keywords: ["singular", "engineering", "construction", "large systems", "marshaling resources", "unbelievable"]
  },
  {
    orderIndex: 3,
    startTime: 31.16,
    endTime: 34.40,
    text: "And of course, then his engineering team is extraordinary.",
    normalizedText: "and of course then his engineering team is extraordinary",
    ipaUs: "/ænd əv kɔːrs ðen hɪz ˌendʒɪˈnɪrɪŋ tiːm ɪz ɪkˈstrɔːrdəneri/",
    translationVi: "Và tất nhiên, đội ngũ kỹ sư của anh ấy cũng thật phi thường.",
    explanationAi: "Extraordinary nghĩa là phi thường, xuất sắc vượt bậc.",
    properNouns: [],
    keywords: ["of course", "engineering team", "extraordinary"]
  },
  {
    orderIndex: 4,
    startTime: 34.40,
    endTime: 45.60,
    text: "And from the moment that we decided to go, the planning with our engineering team, our networking team, our infrastructure computing team, the software team, all of the preparation in advance.",
    normalizedText: "and from the moment that we decided to go the planning with our engineering team our networking team our infrastructure computing team the software team all of the preparation in advance",
    ipaUs: "/ænd frʌm ðə ˈmoʊmənt ðæt wi dɪˈsaɪdɪd tu ɡoʊ ðə ˈplænɪŋ wɪð ˈaʊər ˌendʒɪˈnɪrɪŋ tiːm ˈaʊər ˈnetwɜːrkɪŋ tiːm ˈaʊər ˈɪnfrəstrʌktʃər kəmˈpjuːtɪŋ tiːm ðə ˈsɔːftwer tiːm ɔːl əv ðə ˌprepəˈreɪʃn ɪn ədˈvæns/",
    translationVi: "Và từ khoảnh khắc chúng tôi quyết định bắt đầu, khâu lên kế hoạch cùng đội ngũ kỹ sư, đội ngũ mạng, đội ngũ hạ tầng điện toán, đội ngũ phần mềm, tất cả đều được chuẩn bị từ trước.",
    explanationAi: "Liệt kê chi tiết sự phối hợp liên phòng ban giữa NVIDIA và xAI: networking, infrastructure computing, và software.",
    properNouns: [],
    keywords: ["planning", "networking team", "infrastructure computing", "software team", "preparation in advance"]
  },
  {
    orderIndex: 5,
    startTime: 45.60,
    endTime: 56.44,
    text: "Then all of the infrastructure, all of the logistics, and the amount of technology and equipment that came in on that day to train in 19 days.",
    normalizedText: "then all of the infrastructure all of the logistics and the amount of technology and equipment that came in on that day to train in 19 days",
    ipaUs: "/ðen ɔːl əv ðə ˈɪnfrəstrʌktʃər ɔːl əv ðə ləˈdʒɪstɪks ænd ðə əˈmaʊnt əv tekˈnɑːlədʒi ænd ɪˈkwɪpmənt ðæt keɪm ɪn ɑːn ðæt deɪ tu treɪn ɪn naɪnˈtiːn deɪz/",
    translationVi: "Rồi toàn bộ cơ sở hạ tầng, toàn bộ hậu cần, cùng khối lượng công nghệ và thiết bị khổng lồ đổ về vào ngày hôm đó để bắt đầu vận hành huấn luyện trong 19 ngày.",
    explanationAi: "Logistics: chuỗi cung ứng và hậu cần vận chuyển hàng chục nghìn GPU và máy chủ.",
    properNouns: ["19 days"],
    keywords: ["infrastructure", "logistics", "technology", "equipment", "19 days"]
  },
  {
    orderIndex: 6,
    startTime: 56.44,
    endTime: 65.50,
    text: "19 days! 19 days is incredible. But it's also kind of nice to just take a step back, you know how many days 19 days is? It's just a couple of weeks.",
    normalizedText: "19 days 19 days is incredible but it's also kind of nice to just take a step back you know how many days 19 days is it's just a couple of weeks",
    ipaUs: "/naɪnˈtiːn deɪz naɪnˈtiːn deɪz ɪz ɪnˈkredəbl bʌt ɪts ˈɔːlsoʊ kaɪnd əv naɪs tu dʒʌst teɪk ə step bæk juː noʊ haʊ ˈmeni deɪz naɪnˈtiːn deɪz ɪz ɪts dʒʌst ə ˈkʌpl əv wiːks/",
    translationVi: "19 ngày! 19 ngày thật khó tin. Nhưng cũng nên nhìn lại một chút, bạn có biết 19 ngày là bao nhiêu không? Chỉ là vài tuần ngắn ngủi.",
    explanationAi: "Take a step back: lùi lại một bước để quan sát tổng thể và đánh giá quy mô sự việc.",
    properNouns: [],
    keywords: ["19 days", "incredible", "take a step back", "couple of weeks"]
  },
  {
    orderIndex: 7,
    startTime: 65.50,
    endTime: 76.80,
    text: "And the mountain of technology, if you're ever to see it, is unbelievable: all of the wiring and the networking, just getting this mountain of technology integrated, and all the software. Incredible, right?",
    normalizedText: "and the mountain of technology if you're ever to see it is unbelievable all of the wiring and the networking just getting this mountain of technology integrated and all the software incredible right",
    ipaUs: "/ænd ðə ˈmaʊntn əv tekˈnɑːlədʒi ɪf jʊr ˈevər tu siː ɪt ɪz ˌʌnbɪˈliːvəbl ɔːl əv ðə ˈwaɪərɪŋ ænd ðə ˈnetwɜːrkɪŋ dʒʌst ˈɡetɪŋ ðɪs ˈmaʊntn əv tekˈnɑːlədʒi ˈɪntɪɡreɪtɪd ænd ɔːl ðə ˈsɔːftwer ɪnˈkredəbl raɪt/",
    translationVi: "Và khối lượng công nghệ đồ sộ, nếu bạn từng tận mắt chứng kiến thì thật không thể tin được: toàn bộ hệ thống dây nối và mạng kết nối, chỉ việc tích hợp khối công nghệ khổng lồ này và tất cả phần mềm. Thật phi thường, đúng không?",
    explanationAi: "A mountain of technology: khối lượng thiết bị, linh kiện khổng lồ gồm hàng ngàn km dây cáp mạng và máy chủ phức tạp.",
    properNouns: [],
    keywords: ["mountain of technology", "wiring", "networking", "integrated", "software"]
  },
  {
    orderIndex: 8,
    startTime: 76.80,
    endTime: 91.50,
    text: "Yeah, so I think what Elon and the xAI team did, what they achieved is singular, never been done before. Just to put in perspective: 100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.",
    normalizedText: "yeah so i think what elon and the xai team did what they achieved is singular never been done before just to put in perspective 100 000 gpus that's easily the fastest supercomputer on the planet as one cluster",
    ipaUs: "/jeə soʊ aɪ θɪŋk wʌt ˈiːlɑːn ænd ðə ˌeks eɪ ˈaɪ tiːm dɪd wʌt ðeɪ əˈtʃiːvd ɪz ˈsɪŋɡjələr ˈnevər bɪn dʌn bɪˈfɔːr dʒʌst tu pʊt ɪn pərˈspektɪv wʌn ˈhʌndrəd ˈθaʊznd ˌdʒiː piː ˈjuːz ðæts ˈiːzəli ðə ˈfæstɪst ˈsuːpərkəmpjuːtər ɑːn ðə ˈplænɪt æz wʌn ˈklʌstər/",
    translationVi: "Vâng, nên tôi nghĩ những gì Elon và đội ngũ xAI đã làm, những gì họ đạt được là độc nhất vô nhị, chưa từng có tiền lệ. Để dễ hình dung: 100.000 GPU, đó chắc chắn là siêu máy tính nhanh nhất hành tinh dưới dạng một cụm duy nhất.",
    explanationAi: "Cluster: một cụm siêu máy tính liên kết hàng vạn chip hoạt động nhịp nhàng như một cỗ máy đơn lẻ.",
    properNouns: ["Elon", "xAI", "GPU"],
    keywords: ["achieved", "singular", "100,000 GPUs", "fastest supercomputer", "cluster"]
  },
  {
    orderIndex: 9,
    startTime: 91.50,
    endTime: 109.04,
    text: "A supercomputer that you would build would take normally three years to plan, right? And then they deliver the equipment and it takes one year to get it all working. Yes, we're talking about 19 days.",
    normalizedText: "a supercomputer that you would build would take normally three years to plan right and then they deliver the equipment and it takes one year to get it all working yes we're talking about 19 days",
    ipaUs: "/ə ˈsuːpərkəmpjuːtər ðæt juː wʊd bɪld wʊd teɪk ˈnɔːrməli θriː jɪrz tu plæn raɪt ænd ðen ðeɪ dɪˈlɪvər ðə ɪˈkwɪpmənt ænd ɪt teɪks wʌn jɪr tu ɡet ɪt ɔːl ˈwɜːrkɪŋ jes wɪr ˈtɔːkɪŋ əˈbaʊt naɪnˈtiːn deɪz/",
    translationVi: "Một siêu máy tính thông thường bạn xây dựng phải mất ba năm để lên kế hoạch, đúng không? Rồi họ bàn giao thiết bị và mất thêm một năm nữa để đưa tất cả vào hoạt động. Ở đây chúng ta đang nói về 19 ngày.",
    explanationAi: "So sánh thời gian chuẩn của ngành siêu máy tính (4 năm: 3 năm kế hoạch + 1 năm lắp ráp vận hành) so với kỷ lục 19 ngày của xAI.",
    properNouns: ["19 days"],
    keywords: ["supercomputer", "normally three years", "deliver equipment", "one year", "19 days"]
  }
];

(async () => {
  console.log('Connecting to Neon PostgreSQL...');
  
  // 1. Delete old segments for this lesson
  const deleted = await prisma.lessonSegment.deleteMany({
    where: { lessonId: LESSON_ID }
  });
  console.log(`Deleted ${deleted.count} old segments.`);

  // 2. Create the 10 verbatim segments
  for (const seg of VERBATIM_SEGMENTS) {
    const words = seg.text.trim().split(/\s+/).filter(Boolean);
    await prisma.lessonSegment.create({
      data: {
        lessonId: LESSON_ID,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText: seg.normalizedText,
        ipaUs: seg.ipaUs,
        translationVi: seg.translationVi,
        explanationAi: seg.explanationAi,
        properNouns: seg.properNouns,
        keywords: seg.keywords,
        tokenCount: words.length
      }
    });
    console.log(`Created segment #${seg.orderIndex + 1}: ${seg.startTime}s - ${seg.endTime}s ("${seg.text.slice(0, 40)}...")`);
  }

  // 3. Update videoLesson metadata
  await prisma.videoLesson.update({
    where: { id: LESSON_ID },
    data: {
      durationSeconds: 109,
      durationFormatted: "01:49",
      cefrLevel: 'B2',
      wpmSpeed: 155
    }
  });
  console.log('Updated videoLesson record.');

  const check = await prisma.videoLesson.findUnique({
    where: { id: LESSON_ID },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });
  console.log(`Verified DB has ${check.segments.length} calibrated verbatim segments.`);

  await prisma.$disconnect();
  console.log('Done database update!');
})();
