import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Steve Jobs' Stanford Address
 * 8 in-depth analytical questions covering biographical storytelling, rhetorical style, adoption background, and life lessons.
 */
export const QUIZ_STEVE_JOBS: VideoQuizData = {
  lessonId: "0678a126-f94d-4930-81ce-ebe1e6731e7e",
  lessonTitle: "Steve Jobs: How to Live Before You Die (Stanford Commencement Address)",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
      id: "q_steve_jobs_1",
      question: "What humorous confession does Steve Jobs make in the opening of his address regarding college graduation?",
      questionEn: "What humorous confession does Steve Jobs make in the opening of his address regarding college graduation?",
      questionVi: "Steve Jobs đã đưa ra lời thú nhận hóm hỉnh nào ở phần mở đầu bài phát biểu liên quan đến việc tốt nghiệp đại học?",
      options: [
        "He confesses that he never graduated from college, and this commencement is the closest he has ever gotten to one.",
        "He admits that he attended five different Ivy League universities without receiving a degree.",
        "He jokes that he was awarded an honorary doctorate in calligraphy from Stanford.",
        "He claims that college diplomas are completely worthless in the modern computer industry.",
      ],
      optionsEn: [
        "He confesses that he never graduated from college, and this commencement is the closest he has ever gotten to one.",
        "He admits that he attended five different Ivy League universities without receiving a degree.",
        "He jokes that he was awarded an honorary doctorate in calligraphy from Stanford.",
        "He claims that college diplomas are completely worthless in the modern computer industry.",
      ],
      optionsVi: [
        "Ông thú nhận rằng mình chưa từng tốt nghiệp đại học, và buổi lễ này là lần ông đến gần nhất với một lễ tốt nghiệp.",
        "Ông thừa nhận rằng mình đã theo học tại năm trường đại học Ivy League khác nhau mà không nhận được bằng.",
        "Ông nói đùa rằng mình vừa được trao bằng tiến sĩ danh dự ngành nghệ thuật chữ đẹp từ Stanford.",
        "Ông tuyên bố rằng bằng đại học hoàn toàn vô giá trị trong ngành công nghiệp máy tính hiện đại.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 1, Steve Jobs states: "Truth be told, I never graduated from college, and this is the closest I\'ve ever gotten to a college graduation."',
      explanationEn: 'In Segment 1, Steve Jobs states: "Truth be told, I never graduated from college, and this is the closest I\'ve ever gotten to a college graduation."',
      explanationVi: 'Trong câu 1, Steve Jobs chia sẻ: "Thành thật mà nói, tôi chưa từng tốt nghiệp đại học, và đây là lần tôi đến gần nhất với một buổi lễ tốt nghiệp đại học."',
      referenceSegmentIndex: 1,
      targetedConcept: "Thú nhận mở đầu & Phong cách diễn thuyết (Opening Confession & Rhetorical Style)",
      targetedConceptEn: "Opening Confession & Rhetorical Style",
      targetedConceptVi: "Thú nhận mở đầu & Phong cách diễn thuyết",
    },
    {
      id: "q_steve_jobs_2",
      question: "How does Steve Jobs structure his speech, and what is the central theme of his very first story?",
      questionEn: "How does Steve Jobs structure his speech, and what is the central theme of his very first story?",
      questionVi: "Steve Jobs cấu trúc bài diễn thuyết của mình như thế nào, và chủ đề cốt lõi của câu chuyện đầu tiên là gì?",
      options: [
        "Ten business leadership rules for corporate executives.",
        "Three simple stories from his life, with the first story focusing on connecting the dots.",
        "Five technological forecasts about personal computers and smartphones.",
        "A historical biography analyzing Apple's stock market growth since 1976.",
      ],
      optionsEn: [
        "Ten business leadership rules for corporate executives.",
        "Three simple stories from his life, with the first story focusing on connecting the dots.",
        "Five technological forecasts about personal computers and smartphones.",
        "A historical biography analyzing Apple's stock market growth since 1976.",
      ],
      optionsVi: [
        "Mười quy tắc lãnh đạo kinh doanh dành cho các nhà điều hành tập đoàn.",
        "Ba câu chuyện giản dị từ cuộc đời ông, với câu chuyện đầu tiên tập trung vào việc kết nối các dấu mốc.",
        "Năm dự báo công nghệ về máy tính cá nhân và điện thoại thông minh.",
        "Một bản tiểu sử lịch sử phân tích sự tăng trưởng cổ phiếu của Apple từ năm 1976.",
      ],
      correctAnswer: 1,
      explanation: 'In Segments 2 & 3, Jobs explains: "Today I want to tell you three stories from my life. That\'s it. No big deal. Just three stories. The first story is about connecting the dots."',
      explanationEn: 'In Segments 2 & 3, Jobs explains: "Today I want to tell you three stories from my life. That\'s it. No big deal. Just three stories. The first story is about connecting the dots."',
      explanationVi: 'Trong câu 2 & 3, Jobs giải thích: "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện từ cuộc đời tôi. Chỉ thế thôi. Không có gì to tát. Chỉ ba câu chuyện. Câu chuyện đầu tiên là về việc kết nối những dấu mốc."',
      referenceSegmentIndex: 2,
      targetedConcept: "Cấu trúc bài diễn thuyết & Triết lý 'Connecting the Dots' (Speech Structure & Connecting the Dots)",
      targetedConceptEn: "Speech Structure & Connecting the Dots",
      targetedConceptVi: "Cấu trúc bài diễn thuyết & Triết lý 'Connecting the Dots'",
    },
    {
      id: "q_steve_jobs_3",
      question: "How did Steve Jobs actually manage his attendance at Reed College before completely quitting?",
      questionEn: "How did Steve Jobs actually manage his attendance at Reed College before completely quitting?",
      questionVi: "Steve Jobs đã thực sự sắp xếp việc học tại trường Cao đẳng Reed như thế nào trước khi nghỉ hẳn?",
      options: [
        "He dropped out after 6 months but stayed around as an informal 'drop-in' taking classes of interest for another 18 months.",
        "He studied continuously for 4 consecutive years on a full academic scholarship.",
        "He was immediately expelled after the first semester for failing calculus examinations.",
        "He switched his major every single month until the dean asked him to leave.",
      ],
      optionsEn: [
        "He dropped out after 6 months but stayed around as an informal 'drop-in' taking classes of interest for another 18 months.",
        "He studied continuously for 4 consecutive years on a full academic scholarship.",
        "He was immediately expelled after the first semester for failing calculus examinations.",
        "He switched his major every single month until the dean asked him to leave.",
      ],
      optionsVi: [
        "Ông bỏ học chính thức sau 6 tháng nhưng vẫn ở lại như một sinh viên dự thính học các lớp yêu thích thêm 18 tháng.",
        "Ông học liên tục suốt 4 năm liền với học bổng học thuật toàn phần.",
        "Ông bị đuổi học ngay sau học kỳ đầu tiên vì thi trượt các bài kiểm tra giải tích.",
        "Ông đổi chuyên ngành mỗi tháng một lần cho đến khi hiệu trưởng yêu cầu ông rời đi.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 4, Jobs recounts: "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit."',
      explanationEn: 'In Segment 4, Jobs recounts: "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit."',
      explanationVi: 'Trong câu 4, Jobs kể lại: "Tôi đã bỏ học tại Cao đẳng Reed sau 6 tháng đầu tiên, nhưng sau đó vẫn ở lại dự thính thêm khoảng 18 tháng trước khi thực sự nghỉ hẳn."',
      referenceSegmentIndex: 4,
      targetedConcept: "Hành trình học tập: Drop-out vs Drop-in (Educational Path: Drop-out vs Drop-in)",
      targetedConceptEn: "Educational Path: Drop-out vs Drop-in",
      targetedConceptVi: "Hành trình học tập: Drop-out vs Drop-in",
    },
    {
      id: "q_steve_jobs_4",
      question: "Why did the original adoption plan arranged by Steve Jobs' biological mother fall through at the last minute?",
      questionEn: "Why did the original adoption plan arranged by Steve Jobs' biological mother fall through at the last minute?",
      questionVi: "Tại sao kế hoạch nhận nuôi ban đầu do mẹ ruột Steve Jobs sắp xếp lại bị đổ vỡ vào phút chót?",
      options: [
        "The lawyer and his wife suddenly decided at birth that they really wanted to adopt a baby girl instead.",
        "The lawyer lost his legal license and could no longer afford adoption fees.",
        "The biological mother changed her mind and decided to raise Steve herself in San Francisco.",
        "The hospital refused to release the infant due to missing birth certificate records.",
      ],
      optionsEn: [
        "The lawyer and his wife suddenly decided at birth that they really wanted to adopt a baby girl instead.",
        "The lawyer lost his legal license and could no longer afford adoption fees.",
        "The biological mother changed her mind and decided to raise Steve herself in San Francisco.",
        "The hospital refused to release the infant due to missing birth certificate records.",
      ],
      optionsVi: [
        "Vị luật sư và vợ ông đột ngột đổi ý ngay khi ông chào đời vì họ thực sự muốn nhận nuôi một bé gái.",
        "Vị luật sư bị tước giấy phép hành nghề và không còn đủ khả năng chi trả các khoản phí nhận con nuôi.",
        "Người mẹ ruột đổi ý và quyết định tự mình nuôi dưỡng Steve tại San Francisco.",
        "Bệnh viện từ chối cho xuất viện đứa trẻ vì thiếu hồ sơ giấy khai sinh.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 7 & 8, Jobs explains: "...everything was all set for me to be adopted at birth by a lawyer and his wife. Except that when I popped out, they decided at the last minute that they really wanted a girl."',
      explanationEn: 'In Segments 7 & 8, Jobs explains: "...everything was all set for me to be adopted at birth by a lawyer and his wife. Except that when I popped out, they decided at the last minute that they really wanted a girl."',
      explanationVi: 'Trong câu 7 & 8, Jobs giải thích: "...mọi thứ đã được chuẩn bị sẵn sàng để tôi được một luật sư và vợ ông nhận nuôi ngay khi chào đời. Ngoại trừ việc khi tôi chào đời, họ lại đổi ý vào phút chót vì thực sự muốn có một bé gái."',
      referenceSegmentIndex: 7,
      targetedConcept: "Biến cố nhận nuôi: Quyết định phút chót (Adoption Circumstances: Last-minute Change)",
      targetedConceptEn: "Adoption Circumstances: Last-minute Change",
      targetedConceptVi: "Biến cố nhận nuôi: Quyết định phút chót",
    },
    {
      id: "q_steve_jobs_5",
      question: "Why did Steve Jobs' biological mother initially refuse to sign the final adoption papers, and what made her relent?",
      questionEn: "Why did Steve Jobs' biological mother initially refuse to sign the final adoption papers, and what made her relent?",
      questionVi: "Tại sao mẹ ruột của Steve Jobs ban đầu từ chối ký giấy nhận con nuôi, và điều gì đã khiến bà mủi lòng?",
      options: [
        "Because the adoptive parents were wealthy bankers; she relented only when they promised to buy a farm.",
        "Because the adoptive parents were not college graduates; she only relented when they promised that Steve would go to college.",
        "Because the adoptive parents were planning to move overseas to London.",
        "Because she wanted financial compensation before transferring parental guardianship.",
      ],
      optionsEn: [
        "Because the adoptive parents were wealthy bankers; she relented only when they promised to buy a farm.",
        "Because the adoptive parents were not college graduates; she only relented when they promised that Steve would go to college.",
        "Because the adoptive parents were planning to move overseas to London.",
        "Because she wanted financial compensation before transferring parental guardianship.",
      ],
      optionsVi: [
        "Bởi vì cha mẹ nuôi là những chủ ngân hàng giàu có; bà chỉ đồng ý khi họ hứa sẽ mua một trang trại.",
        "Bởi vì cha mẹ nuôi chưa tốt nghiệp đại học; bà chỉ mủi lòng khi họ hứa danh dự rằng Steve sẽ được học đại học.",
        "Bởi vì cha mẹ nuôi dự định chuyển ra nước ngoài sinh sống tại London.",
        "Bởi vì bà muốn được bồi thường tài chính trước khi chuyển giao quyền giám hộ của cha mẹ.",
      ],
      correctAnswer: 1,
      explanation: 'In Segments 10 & 11: "My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school. She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would go to college."',
      explanationEn: 'In Segments 10 & 11: "My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school. She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would go to college."',
      explanationVi: 'Trong câu 10 & 11: "Mẹ ruột của tôi sau đó phát hiện ra rằng mẹ nuôi tôi chưa từng tốt nghiệp đại học và cha nuôi tôi thậm chí chưa từng tốt nghiệp trung học. Bà đã từ chối ký giấy tờ nhận nuôi cuối cùng. Bà chỉ mủi lòng vài tháng sau đó khi cha mẹ tôi hứa rằng tôi nhất định sẽ được đi học đại học."',
      referenceSegmentIndex: 10,
      targetedConcept: "Xung đột nhận nuôi & Lời hứa đại học: Relented (Adoption Conflict & College Promise)",
      targetedConceptEn: "Adoption Conflict & College Promise",
      targetedConceptVi: "Xung đột nhận nuôi & Lời hứa đại học: Relented",
    },
    {
      id: "q_steve_jobs_6",
      question: "What financial burden did Steve Jobs' college education place on his adoptive parents?",
      questionEn: "What financial burden did Steve Jobs' college education place on his adoptive parents?",
      questionVi: "Việc học đại học của Steve Jobs đã đặt gánh nặng tài chính như thế nào lên vai cha mẹ nuôi của ông?",
      options: [
        "They received state welfare grants that covered 100% of his tuition and housing costs.",
        "He chose a college almost as expensive as Stanford, spending all of his working-class parents' lifelong savings.",
        "They took out commercial bank loans that Apple eventually repaid thirty years later.",
        "He worked three part-time night shifts so his parents never spent a single dollar.",
      ],
      optionsEn: [
        "They received state welfare grants that covered 100% of his tuition and housing costs.",
        "He chose a college almost as expensive as Stanford, spending all of his working-class parents' lifelong savings.",
        "They took out commercial bank loans that Apple eventually repaid thirty years later.",
        "He worked three part-time night shifts so his parents never spent a single dollar.",
      ],
      optionsVi: [
        "Họ nhận được trợ cấp phúc lợi nhà nước chi trả 100% học phí và chi phí nhà ở của ông.",
        "Ông chọn một trường đắt đỏ gần như Stanford, tiêu tốn toàn bộ số tiền tiết kiệm cả đời của cha mẹ thuộc tầng lớp lao động.",
        "Họ đã vay các khoản vay ngân hàng thương mại mà sau này Apple đã trả lại 30 năm sau.",
        "Ông làm ba ca làm thêm ban đêm nên cha mẹ ông chưa từng phải tốn một đồng nào.",
      ],
      correctAnswer: 1,
      explanation: 'In Segment 13, Jobs reflects: "...I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents\' savings were being spent on my college tuition."',
      explanationEn: 'In Segment 13, Jobs reflects: "...I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents\' savings were being spent on my college tuition."',
      explanationVi: 'Trong câu 13, Jobs bộc bạch: "...tôi đã ngây thơ chọn một trường đại học đắt đỏ gần như Stanford, và toàn bộ tiền tiết kiệm của cha mẹ thuộc tầng lớp lao động đều bị tiêu tốn cho học phí đại học của tôi."',
      referenceSegmentIndex: 13,
      targetedConcept: "Gánh nặng học phí & Tầng lớp lao động: Working-class Savings (Financial Burden & Tuition)",
      targetedConceptEn: "Financial Burden & Tuition",
      targetedConceptVi: "Gánh nặng học phí & Tầng lớp lao động: Working-class Savings",
    },
    {
      id: "q_steve_jobs_7",
      question: "What internal dilemma led Steve Jobs to drop out of college after the first six months?",
      questionEn: "What internal dilemma led Steve Jobs to drop out of college after the first six months?",
      questionVi: "Nỗi trăn trở nội tâm nào đã khiến Steve Jobs quyết định bỏ học đại học sau sáu tháng đầu tiên?",
      options: [
        "He could not see the value in it, had no idea what he wanted to do, and felt guilty spending his parents' life savings.",
        "He was offered a high-paying executive position at an established computer firm in Boston.",
        "He wanted to enlist in the military to serve overseas.",
        "He found the academic curriculum too elementary and was bored of getting straight A grades.",
      ],
      optionsEn: [
        "He could not see the value in it, had no idea what he wanted to do, and felt guilty spending his parents' life savings.",
        "He was offered a high-paying executive position at an established computer firm in Boston.",
        "He wanted to enlist in the military to serve overseas.",
        "He found the academic curriculum too elementary and was bored of getting straight A grades.",
      ],
      optionsVi: [
        "Ông không nhìn thấy giá trị của việc học, không biết mình muốn làm gì, và cảm thấy tội lỗi khi tiêu hết tiền tiết kiệm cả đời của cha mẹ.",
        "Ông được mời vào vị trí điều hành lương cao tại một công ty máy tính có tiếng ở Boston.",
        "Ông muốn nhập ngũ để phục vụ tại nước ngoài.",
        "Ông thấy chương trình học quá dễ và cảm thấy chán nản vì toàn đạt điểm A tuyệt đối.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 14 & 15: "After six months, I couldn\'t see the value in it. I had no idea what I wanted to do with my life, and no idea how college was going to help me figure it out. And here I was, spending all of the money my parents had saved their entire life."',
      explanationEn: 'In Segments 14 & 15: "After six months, I couldn\'t see the value in it. I had no idea what I wanted to do with my life, and no idea how college was going to help me figure it out. And here I was, spending all of the money my parents had saved their entire life."',
      explanationVi: 'Trong câu 14 & 15: "Sau sáu tháng, tôi không thể nhìn thấy giá trị của việc đó. Tôi hoàn toàn không biết mình muốn làm gì với cuộc đời mình, và không biết đại học sẽ giúp tôi tìm ra hướng đi bằng cách nào. Và ở đây tôi lại đang tiêu tốn toàn bộ số tiền mà cha mẹ đã dành dụm suốt cả đời họ."',
      referenceSegmentIndex: 14,
      targetedConcept: "Khủng hoảng định hướng cuộc đời: Figure it out (Life Direction & Value Dilemma)",
      targetedConceptEn: "Life Direction & Value Dilemma",
      targetedConceptVi: "Khủng hoảng định hướng cuộc đời: Figure it out",
    },
    {
      id: "q_steve_jobs_8",
      question: "How did Steve Jobs feel when making the decision to drop out, and how did he evaluate it looking back years later?",
      questionEn: "How did Steve Jobs feel when making the decision to drop out, and how did he evaluate it looking back years later?",
      questionVi: "Steve Jobs cảm thấy thế nào khi đưa ra quyết định bỏ học, và ông đánh giá quyết định đó ra sao khi nhìn lại nhiều năm sau?",
      options: [
        "He was completely confident and knew with absolute mathematical certainty that Apple would succeed.",
        "It was pretty scary at the time, but looking back it was one of the best decisions he ever made.",
        "He deeply regretted it every single day and warned Stanford students never to drop out.",
        "He felt entirely indifferent because he had already made millions of dollars trading computer chips.",
      ],
      optionsEn: [
        "He was completely confident and knew with absolute mathematical certainty that Apple would succeed.",
        "It was pretty scary at the time, but looking back it was one of the best decisions he ever made.",
        "He deeply regretted it every single day and warned Stanford students never to drop out.",
        "He felt entirely indifferent because he had already made millions of dollars trading computer chips.",
      ],
      optionsVi: [
        "Ông hoàn toàn tự tin và biết chắc chắn với độ chính xác toán học tuyệt đối rằng Apple sẽ thành công.",
        "Lúc đó thật sự khá đáng sợ, nhưng khi nhìn lại thì đó là một trong những quyết định sáng suốt nhất mà ông từng đưa ra.",
        "Ông vô cùng hối hận mỗi ngày và cảnh báo sinh viên Stanford tuyệt đối không bao giờ được bỏ học.",
        "Ông cảm thấy hoàn toàn thờ ơ vì lúc đó ông đã kiếm được hàng triệu đô la từ việc buôn bán chip máy tính.",
      ],
      correctAnswer: 1,
      explanation: 'In Segment 17, Jobs concludes: "It was pretty scary at the time, but looking back it was one of the best decisions I ever made."',
      explanationEn: 'In Segment 17, Jobs concludes: "It was pretty scary at the time, but looking back it was one of the best decisions I ever made."',
      explanationVi: 'Trong câu 17, Jobs kết luận: "Lúc đó thật sự khá đáng sợ, nhưng nhìn lại thì đó là một trong những quyết định sáng suốt nhất mà tôi từng đưa ra."',
      referenceSegmentIndex: 16,
      targetedConcept: "Hồi tưởng & Đánh giá quyết định cuộc đời: Looking back (Retrospective Evaluation)",
      targetedConceptEn: "Retrospective Evaluation",
      targetedConceptVi: "Hồi tưởng & Đánh giá quyết định cuộc đời: Looking back",
    },
  ],
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * Steve Jobs: How to Live Before You Die
 * Slug: steve-jobs-stanford-stay-hungry
 */
export const LESSON_STEVE_JOBS: MockVideoLesson = {
    id: "0678a126-f94d-4930-81ce-ebe1e6731e7e",
    slug: "steve-jobs-stanford-stay-hungry",
    title: "Steve Jobs: How to Live Before You Die (Stanford Commencement Address)",
    description: "Bài diễn thuyết kinh điển của Steve Jobs tại Đại học Stanford năm 2005 về việc bỏ học, khởi nghiệp, theo đuổi đam mê và nghệ thuật kết nối những dấu mốc cuộc đời.",
    sourceType: "YOUTUBE",
    externalId: "UF8uR6Z6KLc",
    thumbnailUrl: "https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
    durationSeconds: 173,
    durationFormatted: "02:53",
    cefrLevel: "B2",
    supportedTypes: "BOTH",
    categoryId: "cat_stories_culture",
    categorySlug: "stories-culture",
    categoryName: "Câu Chuyện & Văn Hóa",
    accent: "en-US",
    wpmSpeed: 145,
    viewCount: 3820,
    studyCount: 1240,
    quiz: QUIZ_STEVE_JOBS,
    segments: [
            {
                    "orderIndex": 0,
                    "startTime": 22.49,
                    "endTime": 32.74,
                    "text": "Thank you. I am honored to be with you today at your commencement from one of the finest universities in the world.",
                    "ipaUs": "θæŋk ju. aɪ æm ˈɑnərd tu bi wɪð ju təˈdeɪ æt jʊər kəˈmɛnsmənt frʌm wʌn ʌv ðə ˈfaɪnɪst ˌjunəˈvɜrsətiːz ɪn ðə wɜrld.",
                    "translationVi": "Cảm ơn các bạn. Tôi rất vinh dự được có mặt cùng các bạn hôm nay tại buổi lễ tốt nghiệp của một trong những trường đại học hàng đầu thế giới.",
                    "explanationAi": "Steve Jobs mở đầu bài phát biểu tại Đại học Stanford bằng lời cảm kích khiêm tốn trước toàn thể các tân cử nhân và giảng viên.",
                    "properNouns": [
                            "Stanford"
                    ],
                    "keywords": [
                            "honored",
                            "commencement",
                            "finest universities",
                            "world"
                    ],
                    "tokenCount": 22
            },
            {
                    "orderIndex": 1,
                    "startTime": 35.56,
                    "endTime": 45.93,
                    "text": "Truth be told, I never graduated from college, and this is the closest I've ever gotten to a college graduation.",
                    "ipaUs": "truːθ bi toʊld, aɪ ˈnɛvər ˈɡrædʒueɪtɪd frʌm ˈkɑlɪdʒ, ænd ðɪs ɪz ðə ˈkloʊsəst aɪv ˈɛvər ˈɡɑtən tu ə ˈkɑlɪdʒ ˌɡrædʒuˈeɪʃən.",
                    "translationVi": "Thành thật mà nói, tôi chưa từng tốt nghiệp đại học, và đây là lần tôi đến gần nhất với một buổi lễ tốt nghiệp đại học.",
                    "explanationAi": "Thành ngữ 'truth be told' dùng để thú nhận một sự thật thẳng thắn, tạo cảm giác gần gũi và gây tiếng cười tự nhiên cho hội trường.",
                    "properNouns": [],
                    "keywords": [
                            "truth be told",
                            "graduated",
                            "closest",
                            "college graduation"
                    ],
                    "tokenCount": 20
            },
            {
                    "orderIndex": 2,
                    "startTime": 47.98,
                    "endTime": 54.85,
                    "text": "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories.",
                    "ipaUs": "təˈdeɪ aɪ wɑnt tu tɛl ju θri ˈstɔriz frʌm maɪ laɪf. ðæts ɪt. noʊ bɪɡ dil. dʒʌst θri ˈstɔriz.",
                    "translationVi": "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện từ cuộc đời tôi. Chỉ thế thôi. Không có gì to tát. Chỉ ba câu chuyện.",
                    "explanationAi": "Cụm 'no big deal' (không có gì to tát / chuyện nhỏ) thể hiện phong cách diễn thuyết giản dị nhưng tập trung sâu sắc vào các bài học cốt lõi.",
                    "properNouns": [],
                    "keywords": [
                            "three stories",
                            "life",
                            "no big deal"
                    ],
                    "tokenCount": 19
            },
            {
                    "orderIndex": 3,
                    "startTime": 55.85,
                    "endTime": 59.57,
                    "text": "The first story is about connecting the dots.",
                    "ipaUs": "ðə fɜrst ˈstɔri ɪz əˈbaʊt kəˈnɛktɪŋ ðə dɑts.",
                    "translationVi": "Câu chuyện đầu tiên là về việc kết nối những dấu mốc.",
                    "explanationAi": "'Connecting the dots' là triết lý nổi tiếng của Steve Jobs về việc các trải nghiệm dường như ngẫu nhiên trong quá khứ sẽ kết nối và tạo nên ý nghĩa trong tương lai.",
                    "properNouns": [],
                    "keywords": [
                            "first story",
                            "connecting the dots"
                    ],
                    "tokenCount": 8
            },
            {
                    "orderIndex": 4,
                    "startTime": 61.01,
                    "endTime": 68.73,
                    "text": "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit.",
                    "ipaUs": "aɪ drɑpt aʊt ʌv rid ˈkɑlɪdʒ ˈæftər ðə fɜrst sɪks mʌnθs, bʌt ðɛn steɪd əˈraʊnd æz ə drɑp-ɪn fɔr əˈnʌðər eɪˈtin mʌnθs ɔr soʊ bɪˈfɔr aɪ ˈriəli kwɪt.",
                    "translationVi": "Tôi đã bỏ học tại Cao đẳng Reed sau 6 tháng đầu tiên, nhưng sau đó vẫn ở lại dự thính thêm khoảng 18 tháng trước khi thực sự nghỉ hẳn.",
                    "explanationAi": "'Drop out' nghĩa là bỏ học giữa chừng; 'drop-in' là sinh viên không chính thức chỉ tham gia các lớp học mà mình yêu thích.",
                    "properNouns": [
                            "Reed College"
                    ],
                    "keywords": [
                            "dropped out",
                            "Reed College",
                            "drop-in",
                            "18 months",
                            "quit"
                    ],
                    "tokenCount": 28
            },
            {
                    "orderIndex": 5,
                    "startTime": 69.41,
                    "endTime": 74.37,
                    "text": "So why did I drop out? It started before I was born.",
                    "ipaUs": "soʊ waɪ dɪd aɪ drɑp aʊt? ɪt ˈstɑrtɪd bɪˈfɔr aɪ wʌz bɔrn.",
                    "translationVi": "Vậy tại sao tôi lại bỏ học? Mọi chuyện bắt đầu từ trước khi tôi ra đời.",
                    "explanationAi": "Cách Steve Jobs dẫn dắt vấn đề bằng câu hỏi tu từ 'So why did I drop out?' thu hút sự tò mò cao độ của người nghe.",
                    "properNouns": [],
                    "keywords": [
                            "why",
                            "drop out",
                            "started",
                            "born"
                    ],
                    "tokenCount": 12
            },
            {
                    "orderIndex": 6,
                    "startTime": 75.25,
                    "endTime": 81.35,
                    "text": "My biological mother was a young, unwed graduate student, and she decided to put me up for adoption.",
                    "ipaUs": "maɪ ˌbaɪəˈlɑdʒɪkəl ˈmʌðər wʌz ə jʌŋ, ʌnˈwɛd ˈɡrædʒueɪt ˈstudənt, ænd ʃi ˌdɪˈsaɪdɪd tu pʊt mi ʌp fɔr əˈdɑpʃən.",
                    "translationVi": "Mẹ ruột của tôi khi ấy là một nữ sinh viên cao học trẻ chưa kết hôn, và bà đã quyết định cho tôi làm con nuôi.",
                    "explanationAi": "'Biological mother' là mẹ ruột; 'unwed' nghĩa là chưa kết hôn; 'put someone up for adoption' nghĩa là đưa ai đó làm con nuôi.",
                    "properNouns": [],
                    "keywords": [
                            "biological mother",
                            "unwed",
                            "graduate student",
                            "adoption"
                    ],
                    "tokenCount": 18
            },
            {
                    "orderIndex": 7,
                    "startTime": 82.36,
                    "endTime": 91.1,
                    "text": "She felt very strongly that I should be adopted by college graduates, so everything was all set for me to be adopted at birth by a lawyer and his wife.",
                    "ipaUs": "ʃi fɛlt ˈvɛri ˈstrɔŋli ðæt aɪ ʃʊd bi əˈdɑptɪd baɪ ˈkɑlɪdʒ ˈɡrædʒueɪts, soʊ ˈɛvriˌθɪŋ wʌz ɔl sɛt fɔr mi tu bi əˈdɑptɪd æt bɜrθ baɪ ə ˈlɔjər ænd hɪz waɪf.",
                    "translationVi": "Bà cảm thấy rất kiên quyết rằng tôi phải được nhận nuôi bởi những người tốt nghiệp đại học, vì vậy mọi thứ đã được chuẩn bị sẵn sàng để tôi được một luật sư và vợ ông nhận nuôi ngay khi chào đời.",
                    "explanationAi": "'All set' nghĩa là mọi thứ đã sẵn sàng; 'at birth' là ngay từ thời khắc mới sinh ra.",
                    "properNouns": [],
                    "keywords": [
                            "strongly",
                            "college graduates",
                            "all set",
                            "lawyer and his wife"
                    ],
                    "tokenCount": 30
            },
            {
                    "orderIndex": 8,
                    "startTime": 91.74,
                    "endTime": 97.55,
                    "text": "Except that when I popped out, they decided at the last minute that they really wanted a girl.",
                    "ipaUs": "ɪkˈsɛpt ðæt wɛn aɪ pɑpt aʊt, ðeɪ ˌdɪˈsaɪdɪd æt ðə læst ˈmɪnɪt ðæt ðeɪ ˈriəli ˈwɑntɪd ə ɡɜrl.",
                    "translationVi": "Ngoại trừ việc khi tôi chào đời, họ lại đổi ý vào phút chót vì thực sự muốn có một bé gái.",
                    "explanationAi": "'Popped out' là lối nói hài hước bình dân của Steve Jobs ám chỉ việc ra đời từ bụng mẹ; 'at the last minute' là vào phút chót.",
                    "properNouns": [],
                    "keywords": [
                            "except",
                            "popped out",
                            "last minute",
                            "wanted a girl"
                    ],
                    "tokenCount": 18
            },
            {
                    "orderIndex": 9,
                    "startTime": 97.92,
                    "endTime": 106.92,
                    "text": "So my parents, who were on a waiting list, got a call in the middle of the night asking: 'We have an unexpected baby boy; do you want him?'",
                    "ipaUs": "soʊ maɪ ˈpɛrənts, hu wɜr ɑn ə ˈweɪtɪŋ lɪst, ɡɑt ə kɔl ɪn ðə ˈmɪdəl ʌv ðə naɪt ˈæskɪŋ: wi hæv ən ˌʌnɪkˈspɛktɪd ˈbeɪbi bɔɪ; du ju wɑnt hɪm?",
                    "translationVi": "Nên cha mẹ tôi, những người đang trong danh sách chờ, đã nhận được một cuộc gọi lúc nửa đêm hỏi rằng: 'Chúng tôi có một bé trai ngoài dự kiến; ông bà có muốn nhận cháu không?'",
                    "explanationAi": "'Waiting list' là danh sách chờ; 'unexpected baby boy' là em bé trai ngoài dự kiến của trung tâm nhận nuôi.",
                    "properNouns": [],
                    "keywords": [
                            "waiting list",
                            "middle of the night",
                            "unexpected baby boy"
                    ],
                    "tokenCount": 29
            },
            {
                    "orderIndex": 10,
                    "startTime": 107.43,
                    "endTime": 118.47,
                    "text": "They said: 'Of course.' My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school.",
                    "ipaUs": "ðeɪ sɛd: ʌv kɔrs. maɪ ˌbaɪəˈlɑdʒɪkəl ˈmʌðər ˈleɪtər faʊnd aʊt ðæt maɪ ˈmʌðər hæd ˈnɛvər ˈɡrædʒueɪtɪd frʌm ˈkɑlɪdʒ ænd ðæt maɪ ˈfɑðər hæd ˈnɛvər ˈɡrædʒueɪtɪd frʌm haɪ skul.",
                    "translationVi": "Họ trả lời: 'Tất nhiên rồi.' Mẹ ruột của tôi sau đó phát hiện ra rằng mẹ nuôi tôi chưa từng tốt nghiệp đại học và cha nuôi tôi thậm chí chưa từng tốt nghiệp trung học.",
                    "explanationAi": "Steve Jobs nhấn mạnh bối cảnh tầng lớp lao động bình dân của gia đình bố mẹ nuôi Jobs.",
                    "properNouns": [],
                    "keywords": [
                            "of course",
                            "found out",
                            "never graduated",
                            "high school"
                    ],
                    "tokenCount": 28
            },
            {
                    "orderIndex": 11,
                    "startTime": 119.16,
                    "endTime": 128.7,
                    "text": "She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would go to college.",
                    "ipaUs": "ʃi rəˈfjuzd tu saɪn ðə ˈfaɪnəl əˈdɑpʃən ˈpeɪpərz. ʃi ˈoʊnli rɪˈlɛntɪd ə fju mʌnθs ˈleɪtər wɛn maɪ ˈpɛrənts ˈprɑmɪst ðæt aɪ wʊd ɡoʊ tu ˈkɑlɪdʒ.",
                    "translationVi": "Bà đã từ chối ký giấy tờ nhận nuôi cuối cùng. Bà chỉ mủi lòng vài tháng sau đó khi cha mẹ tôi hứa rằng tôi nhất định sẽ được đi học đại học.",
                    "explanationAi": "'Relented' mang nghĩa dịu lòng lại, từ bỏ sự cứng rắn sau một khoảng thời gian kiên quyết phản đối.",
                    "properNouns": [],
                    "keywords": [
                            "refused to sign",
                            "adoption papers",
                            "relented",
                            "promised",
                            "go to college"
                    ],
                    "tokenCount": 25
            },
            {
                    "orderIndex": 12,
                    "startTime": 129.2,
                    "endTime": 133,
                    "text": "This was the start in my life.",
                    "ipaUs": "ðɪs wʌz ðə stɑrt ɪn maɪ laɪf.",
                    "translationVi": "Đó là khởi đầu trong cuộc đời tôi.",
                    "explanationAi": "Câu ngắn gọn, đanh thép đánh dấu bước ngoặt định mệnh giúp Steve Jobs được lớn lên trong gia đình nuôi và có cơ hội vào đại học.",
                    "properNouns": [],
                    "keywords": [
                            "start in my life"
                    ],
                    "tokenCount": 7
            },
            {
                    "orderIndex": 13,
                    "startTime": 133.72,
                    "endTime": 147,
                    "text": "And 17 years later I did go to college, but I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents' savings were being spent on my college tuition.",
                    "ipaUs": "ænd ˌsɛvənˈtin jɪrz ˈleɪtər aɪ dɪd ɡoʊ tu ˈkɑlɪdʒ, bʌt aɪ naɪˈivli tʃoʊz ə ˈkɑlɪdʒ ðæt wʌz ˈɔlˌmoʊst æz ɪkˈspɛnsɪv æz ˈstænfərd, ænd ɔl ʌv maɪ ˈwɜrkɪŋ-klæs ˈpɛrənts ˈseɪvɪŋz wɜr ˈbiɪŋ spɛnt ɑn maɪ ˈkɑlɪdʒ tuˈɪʃən.",
                    "translationVi": "Và 17 năm sau, tôi thực sự đã vào đại học, nhưng tôi đã ngây thơ chọn một trường đại học đắt đỏ gần như Stanford, và toàn bộ tiền tiết kiệm của cha mẹ thuộc tầng lớp lao động đều bị tiêu tốn cho học phí đại học của tôi.",
                    "explanationAi": "'Naively' (một cách ngây thơ, thiếu suy xét chín chắn); 'working-class' là tầng lớp lao động chân tay; 'tuition' là học phí.",
                    "properNouns": [
                            "Stanford"
                    ],
                    "keywords": [
                            "17 years later",
                            "naively",
                            "expensive as Stanford",
                            "working-class",
                            "college tuition"
                    ],
                    "tokenCount": 36
            },
            {
                    "orderIndex": 14,
                    "startTime": 147.61,
                    "endTime": 156.38,
                    "text": "After six months, I couldn't see the value in it. I had no idea what I wanted to do with my life, and no idea how college was going to help me figure it out.",
                    "ipaUs": "ˈæftər sɪks mʌnθs, aɪ ˈkʊdənt si ðə ˈvælju ɪn ɪt. aɪ hæd noʊ aɪˈdiə wʌt aɪ ˈwɑntɪd tu du wɪð maɪ laɪf, ænd noʊ aɪˈdiə haʊ ˈkɑlɪdʒ wʌz ˈɡoʊɪŋ tu hɛlp mi ˈfɪɡjər ɪt aʊt.",
                    "translationVi": "Sau sáu tháng, tôi không thể nhìn thấy giá trị của việc đó. Tôi hoàn toàn không biết mình muốn làm gì với cuộc đời mình, và không biết đại học sẽ giúp tôi tìm ra hướng đi bằng cách nào.",
                    "explanationAi": "'Figure it out' là tìm ra giải pháp hoặc hiểu rõ điều gì đó sau quá trình suy nghĩ trăn trở.",
                    "properNouns": [],
                    "keywords": [
                            "six months",
                            "see the value",
                            "no idea",
                            "figure it out"
                    ],
                    "tokenCount": 35
            },
            {
                    "orderIndex": 15,
                    "startTime": 156.85,
                    "endTime": 161.4,
                    "text": "And here I was, spending all of the money my parents had saved their entire life.",
                    "ipaUs": "ænd hɪr aɪ wʌz, ˈspɛndɪŋ ɔl ʌv ðə ˈmʌni maɪ ˈpɛrənts hæd seɪvd ðɛr ɪnˈtaɪər laɪf.",
                    "translationVi": "Và ở đây tôi lại đang tiêu tốn toàn bộ số tiền mà cha mẹ đã dành dụm suốt cả đời họ.",
                    "explanationAi": "Lời bộc bạch cảm giác tội lỗi và dằn vặt của Jobs khi nhìn thấy gánh nặng tài chính đè lên vai cha mẹ.",
                    "properNouns": [],
                    "keywords": [
                            "spending all of the money",
                            "saved their entire life"
                    ],
                    "tokenCount": 16
            },
            {
                    "orderIndex": 16,
                    "startTime": 162.4,
                    "endTime": 166.94,
                    "text": "So I decided to drop out and trust that it would all work out OK.",
                    "ipaUs": "soʊ aɪ ˌdɪˈsaɪdɪd tu drɑp aʊt ænd trʌst ðæt ɪt wʊd ɔl wɜrk aʊt ˌoʊˈkeɪ.",
                    "translationVi": "Vì vậy tôi quyết định bỏ học và tin tưởng rằng mọi chuyện rồi sẽ ổn thỏa.",
                    "explanationAi": "'Work out OK' nghĩa là mang lại kết quả tốt đẹp hoặc chuyển biến thuận lợi.",
                    "properNouns": [],
                    "keywords": [
                            "decided to drop out",
                            "trust",
                            "work out OK"
                    ],
                    "tokenCount": 15
            },
            {
                    "orderIndex": 17,
                    "startTime": 167.4,
                    "endTime": 172.92,
                    "text": "It was pretty scary at the time, but looking back it was one of the best decisions I ever made.",
                    "ipaUs": "ɪt wʌz ˈprɪti ˈskɛri æt ðə taɪm, bʌt ˈlʊkɪŋ bæk ɪt wʌz wʌn ʌv ðə bɛst dɪˈsɪʒənz aɪ ˈɛvər meɪd.",
                    "translationVi": "Lúc đó thật sự khá đáng sợ, nhưng nhìn lại thì đó là một trong những quyết định sáng suốt nhất mà tôi từng đưa ra.",
                    "explanationAi": "'Pretty scary' là khá đáng sợ; 'looking back' là hồi tưởng, nhìn lại quá khứ.",
                    "properNouns": [],
                    "keywords": [
                            "pretty scary",
                            "looking back",
                            "best decisions"
                    ],
                    "tokenCount": 20
            }
    ],
  };
