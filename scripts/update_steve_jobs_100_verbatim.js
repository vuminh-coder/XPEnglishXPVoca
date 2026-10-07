const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LESSON_ID = '0678a126-f94d-4930-81ce-ebe1e6731e7e';

function normalizeText(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STEVE_JOBS_15_VERBATIM = [
  {
    orderIndex: 0,
    startTime: 22.49,
    endTime: 34.80,
    text: "Thank you. I am honored to be with you today at your commencement from one of the finest universities in the world.",
    ipaUs: "/θæŋk juː aɪ æm ˈɑːnərd tu bi wɪð juː təˈdeɪ æt jʊər kəˈmensmənt frʌm wʌn əv ðə ˈfaɪnɪst ˌjuːnɪˈvɜːrsətiz ɪn ðə wɜːrld/",
    translationVi: "Cảm ơn các bạn. Tôi rất vinh dự được có mặt cùng các bạn hôm nay tại buổi lễ tốt nghiệp của một trong những trường đại học hàng đầu thế giới.",
    explanationAi: "Steve Jobs mở đầu bài phát biểu kinh điển tại Đại học Stanford năm 2005 bằng lời cảm ơn và lời khen ngợi dành cho ngôi trường danh giá.",
    properNouns: ["Stanford"],
    keywords: ["honored", "commencement", "finest universities", "world"]
  },
  {
    orderIndex: 1,
    startTime: 35.80,
    endTime: 46.92,
    text: "Truth be told, I never graduated from college, and this is the closest I've ever gotten to a college graduation.",
    ipaUs: "/truːθ bi toʊld aɪ ˈnevər ˈɡrædʒueɪtɪd frʌm ˈkɑːlɪdʒ ænd ðɪs ɪz ðə ˈkloʊsɪst aɪv ˈevər ˈɡɑːtn tu ə ˈkɑːlɪdʒ ˌɡrædʒuˈeɪʃn/",
    translationVi: "Thành thật mà nói, tôi chưa từng tốt nghiệp đại học, và đây là lần tôi đến gần nhất với một buổi lễ tốt nghiệp đại học.",
    explanationAi: "Thành ngữ 'Truth be told' (Thành thật mà nói) tạo sự hài hước và gần gũi khi Jobs thừa nhận ông chưa từng tốt nghiệp đại học.",
    properNouns: [],
    keywords: ["truth be told", "graduated", "college", "graduation"]
  },
  {
    orderIndex: 2,
    startTime: 47.92,
    endTime: 54.85,
    text: "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories.",
    ipaUs: "/təˈdeɪ aɪ wɑːnt tu tel juː θriː ˈstɔːriz frʌm maɪ laɪf ðæts ɪt noʊ bɪɡ diːl dʒʌst θriː ˈstɔːriz/",
    translationVi: "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện từ cuộc đời tôi. Chỉ thế thôi. Không có gì to tát. Chỉ ba câu chuyện.",
    explanationAi: "Steve Jobs định hình cấu trúc bài nói thành 3 câu chuyện giản dị nhưng sâu sắc thay vì những triết lý giáo điều phức tạp.",
    properNouns: [],
    keywords: ["three stories", "life", "no big deal"]
  },
  {
    orderIndex: 3,
    startTime: 55.76,
    endTime: 59.57,
    text: "The first story is about connecting the dots.",
    ipaUs: "/ðə fɜːrst ˈstɔːri ɪz əˈbaʊt kəˈnektɪŋ ðə dɑːts/",
    translationVi: "Câu chuyện đầu tiên là về việc kết nối những dấu mốc.",
    explanationAi: "Cụm 'connecting the dots' là triết lý sống nổi tiếng của Steve Jobs: các sự kiện trong quá khứ sẽ kết nối lại để định hình tương lai.",
    properNouns: [],
    keywords: ["first story", "connecting the dots"]
  },
  {
    orderIndex: 4,
    startTime: 60.76,
    endTime: 68.73,
    text: "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit.",
    ipaUs: "/aɪ drɑːpt aʊt əv riːd ˈkɑːlɪdʒ ˈæftər ðə fɜːrst sɪks mʌnθs bʌt ðen steɪd əˈraʊnd æz ə drɑːp ɪn fɔːr əˈnʌðər ˌeɪˈtiːn mʌnθs ɔːr soʊ bɪˈfɔːr aɪ ˈriːəli kwɪt/",
    translationVi: "Tôi đã bỏ học tại Cao đẳng Reed sau 6 tháng đầu tiên, nhưng sau đó vẫn ở lại dự thính thêm khoảng 18 tháng trước khi thực sự nghỉ hẳn.",
    explanationAi: "Phân biệt 'drop out' (bỏ học chính quy) và 'drop-in' (ở lại học dự thính các môn yêu thích như thư pháp).",
    properNouns: ["Reed College"],
    keywords: ["dropped out", "Reed College", "drop-in", "18 months", "quit"]
  },
  {
    orderIndex: 5,
    startTime: 69.20,
    endTime: 74.37,
    text: "So why did I drop out? It started before I was born.",
    ipaUs: "/soʊ waɪ dɪd aɪ drɑːp aʊt ɪt ˈstɑːrtɪd bɪˈfɔːr aɪ wəz bɔːrn/",
    translationVi: "Vậy tại sao tôi lại bỏ học? Mọi chuyện bắt đầu từ trước khi tôi ra đời.",
    explanationAi: "Câu hỏi tu từ dẫn dắt người nghe quay trở về hoàn cảnh xuất thân và việc nhận con nuôi của Jobs.",
    properNouns: [],
    keywords: ["drop out", "started", "born"]
  },
  {
    orderIndex: 6,
    startTime: 75.12,
    endTime: 81.35,
    text: "My biological mother was a young, unwed college graduate student, and she decided to put me up for adoption.",
    ipaUs: "/maɪ ˌbaɪəˈlɑːdʒɪkl ˈmʌðər wəz ə jʌŋ ʌnˈwed ˈkɑːlɪdʒ ˈɡrædʒuət ˈstuːdnt ænd ʃi dɪˈsaɪdɪd tu pʊt mi ʌp fɔːr əˈdɑːpʃn/",
    translationVi: "Mẹ ruột của tôi khi ấy là một nghiên cứu sinh trẻ chưa kết hôn, và bà đã quyết định cho tôi làm con nuôi.",
    explanationAi: "'Biological mother' là mẹ ruột; 'put someone up for adoption' nghĩa là đưa ai đó đi làm con nuôi.",
    properNouns: [],
    keywords: ["biological mother", "unwed", "graduate student", "adoption"]
  },
  {
    orderIndex: 7,
    startTime: 82.16,
    endTime: 90.72,
    text: "She felt very strongly that I should be adopted by college graduates, so everything was all set for me to be adopted at birth by a lawyer and his wife.",
    ipaUs: "/ʃi felt ˈveri ˈstrɔːŋli ðæt aɪ ʃʊd bi əˈdɑːptɪd baɪ ˈkɑːlɪdʒ ˈɡrædʒuəts soʊ ˈevriθɪŋ wəz ɔːl set fɔːr mi tu bi əˈdɑːptɪd æt bɜːrθ baɪ ə ˈlɔːjər ænd hɪz waɪf/",
    translationVi: "Bà cảm thấy rất kiên quyết rằng tôi phải được nhận nuôi bởi những người có bằng đại học, vì vậy mọi thứ đã được sắp đặt sẵn để tôi được một luật sư và vợ ông ấy nhận nuôi ngay khi chào đời.",
    explanationAi: "Mẹ ruột của Jobs mong muốn con trai có môi trường học vấn tốt nhất nên đã chọn sẵn gia đình luật sư.",
    properNouns: [],
    keywords: ["strongly", "college graduates", "adopted at birth", "lawyer"]
  },
  {
    orderIndex: 8,
    startTime: 91.72,
    endTime: 96.64,
    text: "Except that when I popped out, they decided at the last minute that they really wanted a girl.",
    ipaUs: "/ɪkˈsept ðæt wen aɪ pɑːpt aʊt ðeɪ dɪˈsaɪdɪd æt ðə læst ˈmɪnɪt ðæt ðeɪ ˈriːəli ˈwɑːntɪd ə ɡɜːrl/",
    translationVi: "Ngoại trừ việc khi tôi chào đời, họ lại đổi ý vào phút chót vì thực sự muốn có một bé gái.",
    explanationAi: "Cụm khẩu ngữ 'popped out' (chào đời, lọt lòng) mang phong cách kể chuyện hóm hỉnh đặc trưng của người Mỹ.",
    properNouns: [],
    keywords: ["popped out", "last minute", "wanted a girl"]
  },
  {
    orderIndex: 9,
    startTime: 97.64,
    endTime: 106.92,
    text: "So my parents, who were on a waiting list, got a call in the middle of the night asking: 'We have an unexpected baby boy; do you want him?'",
    ipaUs: "/soʊ maɪ ˈperənts huː wɜːr ɑːn ə ˈweɪtɪŋ lɪst ɡɑːt ə kɔːl ɪn ðə ˈmɪdl əv ðə naɪt ˈæskɪŋ wi hæv ən ˌʌnɪkˈspektɪd ˈbeɪbi bɔɪ duː juː wɑːnt hɪm/",
    translationVi: "Nên cha mẹ tôi, những người đang trong danh sách chờ, đã nhận được một cuộc gọi lúc nửa đêm hỏi rằng: 'Chúng tôi có một bé trai ngoài dự kiến; ông bà có muốn nhận cháu không?'",
    explanationAi: "Cuộc gọi định mệnh vào ban đêm đã đưa Steve Jobs đến với cha mẹ nuôi Clara và Paul Jobs.",
    properNouns: [],
    keywords: ["waiting list", "middle of the night", "unexpected baby boy"]
  },
  {
    orderIndex: 10,
    startTime: 107.32,
    endTime: 118.47,
    text: "They said: 'Of course.' My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school.",
    ipaUs: "/ðeɪ sed əv kɔːrs maɪ ˌbaɪəˈlɑːdʒɪkl ˈmʌðər ˈleɪtər faʊnd aʊt ðæt maɪ ˈmʌðər həd ˈnevər ˈɡrædʒueɪtɪd frʌm ˈkɑːlɪdʒ ænd ðæt maɪ ˈfɑːðər həd ˈnevər ˈɡrædʒueɪtɪd frʌm haɪ skuːl/",
    translationVi: "Họ trả lời: 'Tất nhiên rồi.' Mẹ ruột của tôi sau đó phát hiện ra rằng mẹ nuôi tôi chưa từng tốt nghiệp đại học và cha nuôi tôi thậm chí chưa từng tốt nghiệp trung học.",
    explanationAi: "Mẹ ruột phát hiện cha mẹ nuôi không có bằng đại học như bà hằng mong muốn.",
    properNouns: [],
    keywords: ["of course", "biological mother", "never graduated", "high school"]
  },
  {
    orderIndex: 11,
    startTime: 118.92,
    endTime: 132.51,
    text: "She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would someday go to college.",
    ipaUs: "/ʃi rɪˈfjuːzd tu saɪn ðə ˈfaɪnl əˈdɑːpʃn ˈpeɪpərz ʃi ˈoʊnli rɪˈlentɪd ə fjuː mʌnθs ˈleɪtər wen maɪ ˈperənts ˈprɑːmɪst ðæt aɪ wʊd ˈsʌmdeɪ ɡoʊ tu ˈkɑːlɪdʒ/",
    translationVi: "Bà đã từ chối ký giấy tờ nhận nuôi cuối cùng. Bà chỉ mủi lòng vài tháng sau đó khi cha mẹ tôi hứa rằng một ngày nào đó tôi nhất định sẽ được đi học đại học.",
    explanationAi: "'Relented' nghĩa là mủi lòng, nhượng bộ sau khi cha mẹ Jobs cam kết bằng danh dự sẽ cho ông học đại học.",
    properNouns: [],
    keywords: ["refused to sign", "adoption papers", "relented", "promised", "go to college"]
  },
  {
    orderIndex: 12,
    startTime: 133.72,
    endTime: 146.78,
    text: "This was the start in my life. And 17 years later, I did go to college, but I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents' savings were being spent on my college tuition.",
    ipaUs: "/ðɪs wəz ðə stɑːrt ɪn maɪ laɪf ænd ˌsevənˈtiːn jɪrz ˈleɪtər aɪ dɪd ɡoʊ tu ˈkɑːlɪdʒ bʌt aɪ naɪˈiːvli tʃoʊz ə ˈkɑːlɪdʒ ðæt wəz ˈɔːlmoʊst æz ɪkˈspensɪv æz ˈstænfərd ænd ɔːl əv maɪ ˈwɜːrkɪŋ klæs ˈperənts ˈseɪvɪŋz wɜːr ˈbiːɪŋ spent ɑːn maɪ ˈkɑːlɪdʒ tuːˈɪʃn/",
    translationVi: "Đó là khởi đầu cuộc đời tôi. Và 17 năm sau, tôi thực sự đã vào đại học, nhưng tôi đã ngây thơ chọn một trường đắt đỏ gần như Stanford, và toàn bộ tiền tiết kiệm cả đời của cha mẹ thuộc tầng lớp lao động đều bị tiêu tốn vào học phí đại học của tôi.",
    explanationAi: "Jobs chia sẻ cảm giác áy náy khi thấy tiền mồ hôi nước mắt của cha mẹ nuôi bị tiêu tán vì học phí đắt đỏ.",
    properNouns: ["Stanford"],
    keywords: ["start in my life", "17 years later", "naively", "expensive as Stanford", "working-class", "college tuition"]
  },
  {
    orderIndex: 13,
    startTime: 147.40,
    endTime: 156.38,
    text: "After six months, I couldn't see the value in it. I had no idea what I wanted to do with my life, and no idea how college was going to help me figure it out.",
    ipaUs: "/ˈæftər sɪks mʌnθs aɪ ˈkʊdnt siː ðə ˈvæljuː ɪn ɪt aɪ həd noʊ aɪˈdiːə wʌt aɪ ˈwɑːntɪd tu duː wɪð maɪ laɪf ænd noʊ aɪˈdiːə haʊ ˈkɑːlɪdʒ wəz ˈɡoʊɪŋ tu help mi ˈfɪɡjər ɪt aʊt/",
    translationVi: "Sau sáu tháng, tôi không thể nhìn thấy giá trị của việc đó. Tôi hoàn toàn không biết mình muốn làm gì với cuộc đời mình, và không biết đại học sẽ giúp tôi tìm ra hướng đi bằng cách nào.",
    explanationAi: "Cảm giác mông lung về mục đích sống của một thanh niên 18 tuổi dẫn đến quyết định bước ngoặt.",
    properNouns: [],
    keywords: ["six months", "see the value", "no idea", "figure it out"]
  },
  {
    orderIndex: 14,
    startTime: 156.72,
    endTime: 166.94,
    text: "And here I was, spending all of the money my parents had saved their entire life. So I decided to drop out and trust that it would all work out OK.",
    ipaUs: "/ænd hɪr aɪ wəz ˈspendɪŋ ɔːl əv ðə ˈmʌni maɪ ˈperənts həd seɪvd ðer ɪnˈtaɪər laɪf soʊ aɪ dɪˈsaɪdɪd tu drɑːp aʊt ænd trʌst ðæt ɪt wʊd ɔːl wɜːrk aʊt ˌoʊˈkeɪ/",
    translationVi: "Và ở đây tôi lại đang tiêu tốn toàn bộ số tiền mà cha mẹ đã dành dụm suốt cả đời họ. Vì vậy tôi quyết định bỏ học và tin tưởng rằng mọi chuyện rồi sẽ ổn thỏa.",
    explanationAi: "Quyết định bỏ học táo bạo và đặt niềm tin rằng trực giác sẽ dẫn dắt cuộc đời đi đúng hướng.",
    properNouns: [],
    keywords: ["spending all the money", "saved their entire life", "decided to drop out", "trust", "work out OK"]
  }
];

(async () => {
  console.log('=== UPDATING NEON POSTGRESQL FOR STEVE JOBS LESSON ===');
  console.log(`Lesson ID: ${LESSON_ID}`);

  // 1. Delete old segments
  const deleted = await prisma.lessonSegment.deleteMany({
    where: { lessonId: LESSON_ID }
  });
  console.log(`Deleted ${deleted.count} old segments.`);

  // 2. Insert the 15 calibrated verbatim segments
  for (const seg of STEVE_JOBS_15_VERBATIM) {
    const words = seg.text.trim().split(/\s+/).filter(Boolean);
    await prisma.lessonSegment.create({
      data: {
        lessonId: LESSON_ID,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText: normalizeText(seg.text),
        ipaUs: seg.ipaUs,
        translationVi: seg.translationVi,
        explanationAi: seg.explanationAi,
        properNouns: seg.properNouns,
        keywords: seg.keywords,
        tokenCount: words.length
      }
    });
    console.log(`Created segment #${seg.orderIndex + 1} (${seg.startTime}s - ${seg.endTime}s): "${seg.text.slice(0, 45)}..."`);
  }

  // 3. Update videoLesson metadata
  await prisma.videoLesson.update({
    where: { id: LESSON_ID },
    data: {
      title: "Steve Jobs: How to Live Before You Die (Stanford Commencement Address)",
      description: "Bài diễn thuyết kinh điển của Steve Jobs tại Đại học Stanford năm 2005 về việc bỏ học, khởi nghiệp, theo đuổi đam mê và nghệ thuật kết nối những dấu mốc cuộc đời.",
      durationSeconds: 167,
      durationFormatted: "02:47",
      cefrLevel: 'B2',
      wpmSpeed: 145
    }
  });
  console.log('Updated videoLesson record in DB.');

  // 4. Verification check
  const check = await prisma.videoLesson.findUnique({
    where: { id: LESSON_ID },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });
  console.log(`Verified DB has ${check.segments.length} calibrated verbatim segments.`);

  await prisma.$disconnect();
  console.log('Done database update for Steve Jobs!');
})();
