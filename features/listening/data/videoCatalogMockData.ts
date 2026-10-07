export interface MockVideoSegment {
  orderIndex: number;
  startTime: number;
  endTime: number;
  text: string;
  normalizedText?: string;
  translationVi: string;
  ipaUs?: string;
  explanationAi?: string;
  properNouns?: string[];
  keywords?: string[];
  tokenCount?: number;
}

export interface MockVideoCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  orderIndex: number;
  lessonsCount?: number;
}

export interface MockVideoLesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  sourceType: string;
  externalId: string; // YouTube Video ID
  thumbnailUrl: string;
  durationSeconds: number;
  durationFormatted: string;
  cefrLevel: string; // A1, A2, B1, B2, C1, C2
  supportedTypes: string; // DICTATION, SHADOWING, BOTH
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  accent: string;
  wpmSpeed: number;
  viewCount: number;
  studyCount: number;
  segments: MockVideoSegment[];
}

export const MOCK_VIDEO_CATEGORIES: MockVideoCategory[] = [
  {
    id: "cat_ted_ed",
    slug: "ted-ed",
    name: "TED-Ed & Tư Duy Sâu",
    description: "Các bài giảng khoa học, tâm lý và triết học ngắn gọn, dễ hiểu từ TED-Ed.",
    icon: "🧠",
    orderIndex: 0,
    lessonsCount: 5,
  },
  {
    id: "cat_bbc_6min",
    slug: "bbc-6-minute",
    name: "BBC 6 Minute English",
    description: "Học từ vựng và thành ngữ qua các chủ đề thời sự gần gũi với giọng Anh-Anh chuẩn.",
    icon: "🎙️",
    orderIndex: 1,
    lessonsCount: 4,
  },
  {
    id: "cat_daily_conv",
    slug: "daily-conversations",
    name: "Giao Tiếp Đời Thực",
    description: "Phản xạ giao tiếp hàng ngày tại sân bay, nhà hàng, công sở và đời sống.",
    icon: "☕",
    orderIndex: 2,
    lessonsCount: 4,
  },
  {
    id: "cat_ielts_listen",
    slug: "ielts-listening",
    name: "IELTS Nghe & Thuyết Trình",
    description: "Các bài diễn thuyết học thuật, thảo luận nghiên cứu định dạng bài thi IELTS.",
    icon: "🎓",
    orderIndex: 3,
    lessonsCount: 3,
  },
  {
    id: "cat_toeic_listen",
    slug: "toeic-listening",
    name: "TOEIC Luyện Nghe Công Sở",
    description: "Tình huống làm việc văn phòng, thương mại, thông báo hội nghị chuẩn ETS TOEIC.",
    icon: "💼",
    orderIndex: 4,
    lessonsCount: 3,
  },
  {
    id: "cat_science_tech",
    slug: "science-tech",
    name: "Khoa Học & Công Nghệ",
    description: "Khám phá AI, vũ trụ, sinh học và các phát minh công nghệ định hình tương lai.",
    icon: "🚀",
    orderIndex: 5,
    lessonsCount: 3,
  },
  {
    id: "cat_stories_culture",
    slug: "stories-culture",
    name: "Câu Chuyện & Văn Hóa",
    description: "Những câu chuyện truyền cảm hứng, tiểu sử danh nhân và văn hóa các nước.",
    icon: "🌍",
    orderIndex: 6,
    lessonsCount: 2,
  },
];

export const MOCK_VIDEO_LESSONS: MockVideoLesson[] = [
{
  "id": "ff4c64b7-ea82-4963-a4f6-1ff808d929e6",
  "slug": "anne-marie-rewrite-the-stars",
  "title": "Anne-Marie & James Arthur: Rewrite The Stars (The Greatest Showman)",
  "description": "Luyện nghe và chép chính tả qua ca khúc nhạc phim kinh điển \"Rewrite The Stars\" (The Greatest Showman: Reimagined) qua giọng ca đầy nội lực của James Arthur và Anne-Marie. Học cách nối âm tự nhiên, thành ngữ tình yêu và cấu trúc giả định.",
  "sourceType": "YOUTUBE",
  "externalId": "pRfmrE0ToTo",
  "thumbnailUrl": "https://img.youtube.com/vi/pRfmrE0ToTo/hqdefault.jpg",
  "durationSeconds": 105,
  "durationFormatted": "01:45",
  "cefrLevel": "B1",
  "supportedTypes": "BOTH",
  "categoryId": "cat_stories_culture",
  "categorySlug": "stories-culture",
  "categoryName": "Câu Chuyện & Văn Hóa",
  "accent": "en-US",
  "wpmSpeed": 120,
  "viewCount": 3950,
  "studyCount": 1420,
  "segments": [
    {
      "orderIndex": 1,
      "startTime": 0.8,
      "endTime": 8.8,
      "text": "You know I want you, it's not a secret I try to hide.",
      "normalizedText": "you know i want you its not a secret i try to hide",
      "ipaUs": "juː noʊ aɪ wɑːnt juː ɪts nɑːt ə ˈsiːkrət aɪ traɪ tuː haɪd",
      "translationVi": "Em biết rằng anh muốn có em, đó không phải là bí mật mà anh cố che giấu.",
      "explanationAi": "Cụm 'it's not a secret' (không phải là bí mật / ai cũng biết) và động từ nguyên mẫu 'try to hide' (cố gắng giấu giếm).",
      "properNouns": [],
      "keywords": [
        "secret",
        "hide",
        "want"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 2,
      "startTime": 8.9,
      "endTime": 16.5,
      "text": "I know you want me, so don't keep saying our hands are tied.",
      "normalizedText": "i know you want me so dont keep saying our hands are tied",
      "ipaUs": "aɪ noʊ juː wɑːnt miː soʊ doʊnt kiːp ˈseɪɪŋ ˈaʊər hændz ɑːr taɪd",
      "translationVi": "Anh biết em cũng muốn có anh, vậy nên đừng mãi nói rằng đôi tay chúng ta bị trói buộc.",
      "explanationAi": "Thành ngữ tiếng Anh kinh điển 'hands are tied' (bị trói tay / bất lực không thể làm gì) kết hợp cấu trúc 'keep doing something' (cứ liên tục làm gì).",
      "properNouns": [],
      "keywords": [
        "hands are tied",
        "keep saying"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 3,
      "startTime": 16.5,
      "endTime": 19.2,
      "text": "You claim it's not in the cards,",
      "normalizedText": "you claim its not in the cards",
      "ipaUs": "juː kleɪm ɪts nɑːt ɪn ðə kɑːrdz",
      "translationVi": "Em khẳng định điều đó không nằm trong những lá bài số phận,",
      "explanationAi": "Thành ngữ 'not in the cards' (không thể xảy ra / không được số phận sắp đặt, bắt nguồn từ bói bài Tarot).",
      "properNouns": [],
      "keywords": [
        "claim",
        "not in the cards"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 4,
      "startTime": 19.2,
      "endTime": 24.8,
      "text": "And fate is pulling you miles away and out of reach from me.",
      "normalizedText": "and fate is pulling you miles away and out of reach from me",
      "ipaUs": "ænd feɪt ɪz ˈpʊlɪŋ juː maɪlz əˈweɪ ænd aʊt ʌv riːtʃ frəm miː",
      "translationVi": "Và số phận đang kéo em xa hàng dặm, vượt khỏi tầm với của anh.",
      "explanationAi": "Danh từ 'fate' (định mệnh/số phận), cụm 'miles away' (xa xôi) và thành ngữ 'out of reach' (ngoài tầm với).",
      "properNouns": [],
      "keywords": [
        "fate",
        "miles away",
        "out of reach"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 5,
      "startTime": 24.8,
      "endTime": 26.6,
      "text": "But you're here in my heart,",
      "normalizedText": "but youre here in my heart",
      "ipaUs": "bʌt jʊr hɪr ɪn maɪ hɑːrt",
      "translationVi": "Nhưng em vẫn luôn ở đây, trong trái tim anh,",
      "explanationAi": "Lời bày tỏ tình cảm chân thành 'here in my heart' (luôn ngự trị trong tim).",
      "properNouns": [],
      "keywords": [
        "here",
        "heart"
      ],
      "tokenCount": 6
    },
    {
      "orderIndex": 6,
      "startTime": 26.6,
      "endTime": 33.2,
      "text": "So who can stop me if I decide that you're my destiny?",
      "normalizedText": "so who can stop me if i decide that youre my destiny",
      "ipaUs": "soʊ huː kæn stɑːp miː ɪf aɪ dɪˈsaɪd ðæt jʊr maɪ ˈdɛstəni",
      "translationVi": "Vậy thì ai có thể ngăn cản anh nếu anh quyết định rằng em là định mệnh của cuộc đời mình?",
      "explanationAi": "Danh từ 'destiny' (định mệnh/vận mệnh) và cấu trúc câu hỏi hùng biện 'who can stop me if...?'",
      "properNouns": [],
      "keywords": [
        "stop",
        "decide",
        "destiny"
      ],
      "tokenCount": 12
    },
    {
      "orderIndex": 7,
      "startTime": 33.2,
      "endTime": 38.2,
      "text": "What if we rewrite the stars?",
      "normalizedText": "what if we rewrite the stars",
      "ipaUs": "wʌt ɪf wiː ˌriːˈraɪt ðə stɑːrz",
      "translationVi": "Sẽ ra sao nếu chúng ta viết lại những vì sao định mệnh?",
      "explanationAi": "Cụm chủ đề bài hát 'rewrite the stars' (viết lại số phận định sẵn bởi các vì sao) với cấu trúc giả định 'What if...?'.",
      "properNouns": [],
      "keywords": [
        "rewrite",
        "stars",
        "what if"
      ],
      "tokenCount": 6
    },
    {
      "orderIndex": 8,
      "startTime": 38.2,
      "endTime": 43.3,
      "text": "Say you were made to be mine?",
      "normalizedText": "say you were made to be mine",
      "ipaUs": "seɪ juː wɜːr meɪd tuː biː maɪn",
      "translationVi": "Hãy nói rằng em sinh ra là để dành cho anh?",
      "explanationAi": "Cấu trúc định mệnh 'made to be mine' (sinh ra để thuộc về nhau).",
      "properNouns": [],
      "keywords": [
        "made to be mine"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 9,
      "startTime": 43.3,
      "endTime": 48.4,
      "text": "Nothing could keep us apart,",
      "normalizedText": "nothing could keep us apart",
      "ipaUs": "ˈnʌθɪŋ kʊd kiːp ʌs əˈpɑːrt",
      "translationVi": "Sẽ chẳng có điều gì có thể chia lìa chúng ta,",
      "explanationAi": "Cụm động từ 'keep apart' (chia cắt/ngăn cách hai người).",
      "properNouns": [],
      "keywords": [
        "nothing",
        "keep apart"
      ],
      "tokenCount": 5
    },
    {
      "orderIndex": 10,
      "startTime": 48.4,
      "endTime": 53.6,
      "text": "You'd be the one I was meant to find.",
      "normalizedText": "youd be the one i was meant to find",
      "ipaUs": "juːd biː ðə wʌn aɪ wʌz mɛnt tuː faɪnd",
      "translationVi": "Em sẽ là người duy nhất mà anh được sinh ra để tìm kiếm.",
      "explanationAi": "Cấu trúc 'meant to find' (được định mệnh an bài để tìm thấy).",
      "properNouns": [],
      "keywords": [
        "meant to find"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 11,
      "startTime": 53.6,
      "endTime": 59,
      "text": "It's up to you, and it's up to me,",
      "normalizedText": "its up to you and its up to me",
      "ipaUs": "ɪts ʌp tuː juː ænd ɪts ʌp tuː miː",
      "translationVi": "Tất cả là do em, và tất cả là do anh quyết định,",
      "explanationAi": "Thành ngữ 'it's up to someone' (tùy thuộc vào ai / do ai quyết định).",
      "properNouns": [],
      "keywords": [
        "up to you",
        "up to me"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 12,
      "startTime": 59,
      "endTime": 64.5,
      "text": "No one can say what we get to be.",
      "normalizedText": "no one can say what we get to be",
      "ipaUs": "noʊ wʌn kæn seɪ wʌt wiː ɡɛt tuː biː",
      "translationVi": "Không một ai có quyền phán xét chúng ta sẽ trở thành ai.",
      "explanationAi": "Cụm 'get to be' (có cơ hội/quyền được trở thành).",
      "properNouns": [],
      "keywords": [
        "no one",
        "get to be"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 13,
      "startTime": 64.5,
      "endTime": 69.8,
      "text": "So why don't we rewrite the stars?",
      "normalizedText": "so why dont we rewrite the stars",
      "ipaUs": "soʊ waɪ doʊnt wiː ˌriːˈraɪt ðə stɑːrz",
      "translationVi": "Vậy tại sao chúng ta không cùng nhau viết lại những vì sao?",
      "explanationAi": "Câu gợi ý đầy nhiệt huyết 'Why don't we...?' kết hợp 'rewrite the stars'.",
      "properNouns": [],
      "keywords": [
        "why don't we",
        "rewrite the stars"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 14,
      "startTime": 69.8,
      "endTime": 74,
      "text": "Maybe the world could be ours tonight.",
      "normalizedText": "maybe the world could be ours tonight",
      "ipaUs": "ˈmeɪbi ðə wɜːrld kʊd biː ˈaʊərz təˈnaɪt",
      "translationVi": "Có lẽ cả thế giới này có thể thuộc về đôi ta đêm nay.",
      "explanationAi": "Đại từ sở hữu 'ours' (thuộc về chúng ta) và trạng từ 'tonight'.",
      "properNouns": [],
      "keywords": [
        "maybe",
        "world",
        "ours",
        "tonight"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 15,
      "startTime": 74,
      "endTime": 81.5,
      "text": "You think it's easy, you think I don't want to run to you.",
      "normalizedText": "you think its easy you think i dont want to run to you",
      "ipaUs": "juː θɪŋk ɪts ˈiːzi juː θɪŋk aɪ doʊnt wɑːnt tuː rʌn tuː juː",
      "translationVi": "Anh nghĩ điều đó dễ dàng sao, anh nghĩ em không muốn chạy ngay đến bên anh ư?",
      "explanationAi": "Lời hát của Anne-Marie thể hiện sự giằng xé nội tâm: cụm 'run to you' (chạy về phía ai).",
      "properNouns": [],
      "keywords": [
        "easy",
        "run to you"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 16,
      "startTime": 81.5,
      "endTime": 88.5,
      "text": "But there are mountains, and there are doors that we can't walk through.",
      "normalizedText": "but there are mountains and there are doors that we cant walk through",
      "ipaUs": "bʌt ðɛr ɑːr ˈmaʊntənz ænd ðɛr ɑːr dɔːrz ðæt wiː kænt wɔːk θruː",
      "translationVi": "Nhưng có những ngọn núi rào cản, và có những cánh cửa mà chúng ta không thể bước qua.",
      "explanationAi": "Ẩn dụ về rào cản xã hội 'mountains' (núi cao thử thách) và 'doors that we can't walk through' (những cánh cửa định kiến cấm đoán).",
      "properNouns": [],
      "keywords": [
        "mountains",
        "doors",
        "walk through"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 17,
      "startTime": 88.5,
      "endTime": 96.8,
      "text": "I know you're wondering why, because we're able to be just you and me within these walls.",
      "normalizedText": "i know youre wondering why because were able to be just you and me within these walls",
      "ipaUs": "aɪ noʊ jʊr ˈwʌndərɪŋ waɪ bɪˈkəz wɪr ˈeɪbl tuː biː dʒʌst juː ænd miː wɪˈðɪn ðiːz wɔːlz",
      "translationVi": "Em biết anh đang tự hỏi tại sao, bởi vì chúng ta chỉ có thể là chính mình khi ở trong bốn bức tường này.",
      "explanationAi": "Cụm từ 'within these walls' (ở trong bốn bức tường riêng tư / nơi an toàn kín đáo) đối lập với thế giới bên ngoài.",
      "properNouns": [],
      "keywords": [
        "wondering",
        "within these walls"
      ],
      "tokenCount": 17
    },
    {
      "orderIndex": 18,
      "startTime": 96.8,
      "endTime": 105,
      "text": "But when we go outside, you're gonna wake up and see that it was hopeless after all.",
      "normalizedText": "but when we go outside youre gonna wake up and see that it was hopeless after all",
      "ipaUs": "bʌt wɛn wiː ɡoʊ ˌaʊtˈsaɪd jʊr ˈɡənə weɪk ʌp ænd siː ðæt ɪt wʌz ˈhoʊpləs ˈæftər ɔːl",
      "translationVi": "Nhưng một khi bước ra ngoài, anh sẽ thức tỉnh và nhận ra rằng tất cả đều là vô vọng.",
      "explanationAi": "Cụm 'wake up and see' (thức tỉnh nhận ra sự thật), tính từ 'hopeless' (vô vọng) và thành ngữ 'after all' (rốt cuộc, sau tất cả).",
      "properNouns": [],
      "keywords": [
        "outside",
        "wake up",
        "hopeless",
        "after all"
      ],
      "tokenCount": 17
    }
  ]
},

{
  "id": "88c4fc17-4445-46f4-82d4-c51fbb56e859",
  "slug": "kurzgesagt-interstellar-war",
  "title": "Kurzgesagt: How to Win an Interstellar War",
  "description": "Khám phá cuộc chiến vũ trụ đầy kịch tính cùng Kurzgesagt – In a Nutshell: Liệu người ngoài hành tinh có thể hủy diệt Trái Đất từ khoảng cách hàng năm ánh sáng? Học từ vựng khoa học viễn tưởng, vật lý thiên văn và tư duy logic.",
  "sourceType": "YOUTUBE",
  "externalId": "tybKnGZRwcU",
  "thumbnailUrl": "https://img.youtube.com/vi/tybKnGZRwcU/hqdefault.jpg",
  "durationSeconds": 93,
  "durationFormatted": "01:33",
  "cefrLevel": "B2",
  "supportedTypes": "BOTH",
  "categoryId": "cat_science_tech",
  "categorySlug": "science-tech",
  "categoryName": "Khoa Học & Công Nghệ",
  "accent": "en-US",
  "wpmSpeed": 140,
  "viewCount": 4210,
  "studyCount": 1560,
  "segments": [
    {
      "orderIndex": 1,
      "startTime": 0,
      "endTime": 3.83,
      "text": "Could aliens destroy us from light years away?",
      "normalizedText": "could aliens destroy us from light years away",
      "ipaUs": "kʊd ˈeɪliənz dɪˈstrɔɪ ʌs frəm laɪt jɪrz əˈweɪ",
      "translationVi": "Liệu người ngoài hành tinh có thể tiêu diệt chúng ta từ cách xa hàng năm ánh sáng?",
      "explanationAi": "Cụm 'light years away' (cách xa hàng năm ánh sáng - khoảng cách trong vũ trụ học). Trợ động từ phỏng đoán 'could'.",
      "properNouns": [],
      "keywords": [
        "aliens",
        "destroy",
        "light years",
        "away"
      ],
      "tokenCount": 8
    },
    {
      "orderIndex": 2,
      "startTime": 4.38,
      "endTime": 10.77,
      "text": "Mh, another day at the Kurzgesagt Labs, where we answer the most important questions with science.",
      "normalizedText": "mh another day at the kurzgesagt labs where we answer the most important questions with science",
      "ipaUs": "əm əˈnʌðər deɪ æt ðə kʊərtsɡəˈzɑːkt læbz wɛr wi ˈænsər ðə moʊst ɪmˈpɔːrtnt ˈkwɛstʃənz wɪð ˈsaɪəns",
      "translationVi": "Lại một ngày nữa tại Phòng thí nghiệm Kurzgesagt, nơi chúng tôi giải đáp những câu hỏi quan trọng nhất bằng khoa học.",
      "explanationAi": "Tên thương hiệu 'Kurzgesagt Labs'. Mệnh đề quan hệ 'where we answer...' chỉ nơi chốn.",
      "properNouns": [
        "Kurzgesagt Labs"
      ],
      "keywords": [
        "Kurzgesagt",
        "Labs",
        "answer",
        "important",
        "science"
      ],
      "tokenCount": 16
    },
    {
      "orderIndex": 3,
      "startTime": 10.78,
      "endTime": 15.34,
      "text": "Today: how might civilizations wage war across light years?",
      "normalizedText": "today how might civilizations wage war across light years",
      "ipaUs": "təˈdeɪ haʊ maɪt ˌsɪvələˈzeɪʃənz weɪdʒ wɔːr əˈkrɔːs laɪt jɪrz",
      "translationVi": "Hôm nay: các nền văn minh có thể tiến hành chiến tranh xuyên qua các năm ánh sáng như thế nào?",
      "explanationAi": "Thành ngữ 'wage war' (phát động/tiến hành chiến tranh), danh từ 'civilizations' (các nền văn minh).",
      "properNouns": [],
      "keywords": [
        "civilizations",
        "wage war",
        "across",
        "light years"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 4,
      "startTime": 15.35,
      "endTime": 19.99,
      "text": "What kind of devastating weapons could they use, and what would they look like?",
      "normalizedText": "what kind of devastating weapons could they use and what would they look like",
      "ipaUs": "wʌt kaɪnd ʌv ˈdɛvəˌsteɪtɪŋ ˈwɛpənz kʊd ðeɪ juːz ænd wʌt wʊd ðeɪ lʊk laɪk",
      "translationVi": "Họ có thể sử dụng loại vũ khí hủy diệt nào, và chúng sẽ trông như thế nào?",
      "explanationAi": "Tính từ 'devastating' (mang tính tàn phá khốc liệt) và cụm hỏi diện mạo 'look like'.",
      "properNouns": [],
      "keywords": [
        "devastating",
        "weapons",
        "use",
        "look like"
      ],
      "tokenCount": 14
    },
    {
      "orderIndex": 5,
      "startTime": 20.08,
      "endTime": 21.64,
      "text": "Meet our two players.",
      "normalizedText": "meet our two players",
      "ipaUs": "miːt ˈaʊər tuː ˈpleɪərz",
      "translationVi": "Hãy cùng gặp gỡ hai đấu thủ của chúng ta.",
      "explanationAi": "Ẩn dụ hài hước 'players' (hai bên tham chiến trong vũ trụ).",
      "properNouns": [],
      "keywords": [
        "meet",
        "players"
      ],
      "tokenCount": 4
    },
    {
      "orderIndex": 6,
      "startTime": 21.65,
      "endTime": 25.47,
      "text": "A yellow dwarf star system home to a species of primates.",
      "normalizedText": "a yellow dwarf star system home to a species of primates",
      "ipaUs": "ə ˈjɛloʊ dwɔːrf stɑːr ˈsɪstəm hoʊm tuː ə ˈspiːʃiːz ʌv ˈpraɪmeɪts",
      "translationVi": "Một hệ sao lùn vàng, quê hương của một loài linh trưởng.",
      "explanationAi": "Khái niệm thiên văn 'yellow dwarf star' (sao lùn vàng) và sinh học 'primates' (bộ linh trưởng).",
      "properNouns": [],
      "keywords": [
        "yellow dwarf",
        "star system",
        "species",
        "primates"
      ],
      "tokenCount": 11
    },
    {
      "orderIndex": 7,
      "startTime": 25.48,
      "endTime": 30.14,
      "text": "\"Humans,\" as they call themselves, recently became a technological civilization.",
      "normalizedText": "humans as they call themselves recently became a technological civilization",
      "ipaUs": "ˈhjuːmənz æz ðeɪ kɔːl ðəmˈsɛlvz ˈriːsntli bɪˈkeɪm ə ˌtɛknəˈlɑːdʒɪkl ˌsɪvələˈzeɪʃən",
      "translationVi": "\"Con người,\" như cách họ tự gọi mình, gần đây đã trở thành một nền văn minh công nghệ.",
      "explanationAi": "Cụm 'technological civilization' (nền văn minh kỹ thuật công nghệ) và đại từ phản thân 'themselves'.",
      "properNouns": [
        "Humans"
      ],
      "keywords": [
        "humans",
        "themselves",
        "technological",
        "civilization"
      ],
      "tokenCount": 10
    },
    {
      "orderIndex": 8,
      "startTime": 30.15,
      "endTime": 33.7,
      "text": "They have rockets, nuclear reactors and memes.",
      "normalizedText": "they have rockets nuclear reactors and memes",
      "ipaUs": "ðeɪ hæv ˈrɑːkɪts ˈnuːkliər riˈæktərz ænd miːmz",
      "translationVi": "Họ có tên lửa, lò phản ứng hạt nhân và cả ảnh chế (meme).",
      "explanationAi": "Thuật ngữ 'nuclear reactors' (lò phản ứng hạt nhân) và từ vựng internet 'memes'.",
      "properNouns": [],
      "keywords": [
        "rockets",
        "nuclear reactors",
        "memes"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 9,
      "startTime": 33.71,
      "endTime": 35.09,
      "text": "How cute!",
      "normalizedText": "how cute",
      "ipaUs": "haʊ kjuːt",
      "translationVi": "Thật là dễ thương làm sao!",
      "explanationAi": "Câu cảm thán ngắn 'How cute!' mang sắc thái hài hước châm biếm đặc trưng.",
      "properNouns": [],
      "keywords": [
        "cute"
      ],
      "tokenCount": 2
    },
    {
      "orderIndex": 10,
      "startTime": 35.61,
      "endTime": 37.93,
      "text": "The Smorpians disagree.",
      "normalizedText": "the smorpians disagree",
      "ipaUs": "ðə ˈsmɔːrpiənz ˌdɪsəˈɡriː",
      "translationVi": "Nhưng người Smorpian thì không nghĩ vậy.",
      "explanationAi": "Tên chủng tộc giả tưởng 'Smorpians' và động từ 'disagree' (bất đồng ý kiến).",
      "properNouns": [
        "Smorpians"
      ],
      "keywords": [
        "Smorpians",
        "disagree"
      ],
      "tokenCount": 3
    },
    {
      "orderIndex": 11,
      "startTime": 38.18,
      "endTime": 44.86,
      "text": "They reside on a planet around the orange dwarf star HD 40307, 42 light years away.",
      "normalizedText": "they reside on a planet around the orange dwarf star hd 40307 42 light years away",
      "ipaUs": "ðeɪ rɪˈzaɪd ɑːn ə ˈplænɪt əˈraʊnd ðɪ ˈɔːrɪndʒ dwɔːrf stɑːr eɪtʃ diː fɔːr ˈzɪroʊ θriː ˈzɪroʊ ˈsɛvn ˈfɔːrti tuː laɪt jɪrz əˈweɪ",
      "translationVi": "Họ cư trú trên một hành tinh quay quanh ngôi sao lùn cam HD 40307, cách xa 42 năm ánh sáng.",
      "explanationAi": "Tên thiên văn có thật 'HD 40307' và động từ trang trọng 'reside' (cư ngụ, trú ngụ).",
      "properNouns": [
        "HD 40307"
      ],
      "keywords": [
        "reside",
        "planet",
        "orange dwarf",
        "HD 40307",
        "light years"
      ],
      "tokenCount": 16
    },
    {
      "orderIndex": 12,
      "startTime": 45.01,
      "endTime": 50.46,
      "text": "Smorpian civilization developed earlier than humans and they have much better technology.",
      "normalizedText": "smorpian civilization developed earlier than humans and they have much better technology",
      "ipaUs": "ˈsmɔːrpiən ˌsɪvələˈzeɪʃən dɪˈvɛləpt ˈɜːrliər ðæn ˈhjuːmənz ænd ðeɪ hæv mʌtʃ ˈbɛtər tɛkˈnɑːlədʒi",
      "translationVi": "Nền văn minh Smorpian phát triển sớm hơn loài người và họ sở hữu công nghệ vượt trội hơn nhiều.",
      "explanationAi": "So sánh hơn 'developed earlier than' và cụm từ 'much better technology'.",
      "properNouns": [
        "Smorpian"
      ],
      "keywords": [
        "Smorpian",
        "civilization",
        "earlier",
        "technology"
      ],
      "tokenCount": 12
    },
    {
      "orderIndex": 13,
      "startTime": 50.55,
      "endTime": 55.24,
      "text": "They've recently built a Dyson swarm around their star which gives them near limitless energy.",
      "normalizedText": "theyve recently built a dyson swarm around their star which gives them near limitless energy",
      "ipaUs": "ðeɪv ˈriːsntli bɪlt ə ˈdaɪsn swɔːrm əˈraʊnd ðɛr stɑːr wɪtʃ ɡɪvz ðɛm nɪr ˈlɪmɪtlɪs ˈɛnərdʒi",
      "translationVi": "Gần đây họ đã chế tạo một bầy vệ tinh Dyson bao quanh ngôi sao của mình, đem lại nguồn năng lượng gần như vô hạn.",
      "explanationAi": "Thuật ngữ siêu công trình vũ trụ 'Dyson swarm' và cụm tính từ 'near limitless energy'.",
      "properNouns": [
        "Dyson"
      ],
      "keywords": [
        "Dyson swarm",
        "star",
        "limitless energy"
      ],
      "tokenCount": 15
    },
    {
      "orderIndex": 14,
      "startTime": 55.25,
      "endTime": 62.47,
      "text": "And they noticed humanity, which is unfortunate as the Smorpians are planning a hyperspace bypass through our solar system,",
      "normalizedText": "and they noticed humanity which is unfortunate as the smorpians are planning a hyperspace bypass through our solar system",
      "ipaUs": "ænd ðeɪ ˈnoʊtɪst hjuːˈmænəti wɪtʃ ɪz ʌnˈfɔːrtʃənət æz ðə ˈsmɔːrpiənz ɑːr ˈplænɪŋ ə ˈhaɪpərˌspeɪs ˈbaɪˌpæs θruː ˈaʊər ˈsoʊlər ˈsɪstəm",
      "translationVi": "Và họ đã để mắt tới nhân loại, điều này thật không may vì người Smorpian đang lên kế hoạch làm một đường vòng siêu không gian xuyên qua hệ mặt trời của chúng ta,",
      "explanationAi": "Khái niệm 'hyperspace bypass' (tuyến đường siêu không gian) và mệnh đề phụ 'which is unfortunate'.",
      "properNouns": [
        "Smorpians"
      ],
      "keywords": [
        "humanity",
        "unfortunate",
        "Smorpians",
        "hyperspace bypass",
        "solar system"
      ],
      "tokenCount": 19
    },
    {
      "orderIndex": 15,
      "startTime": 62.48,
      "endTime": 65.46,
      "text": "So they decided that humanity has to go.",
      "normalizedText": "so they decided that humanity has to go",
      "ipaUs": "soʊ ðeɪ dɪˈsaɪdɪd ðæt hjuːˈmænəti hæz tuː ɡoʊ",
      "translationVi": "Vì vậy họ quyết định rằng nhân loại cần phải bị xóa sổ.",
      "explanationAi": "Thành ngữ 'has to go' (phải biến mất / bị loại bỏ khỏi vũ trụ).",
      "properNouns": [],
      "keywords": [
        "decided",
        "humanity",
        "go"
      ],
      "tokenCount": 8
    },
    {
      "orderIndex": 16,
      "startTime": 65.51,
      "endTime": 68.09,
      "text": "Interstellar war is hard though.",
      "normalizedText": "interstellar war is hard though",
      "ipaUs": "ˌɪntərˈstɛlər wɔːr ɪz hɑːrd ðoʊ",
      "translationVi": "Tuy nhiên, chiến tranh liên sao lại vô cùng nan giải.",
      "explanationAi": "Thuật ngữ 'Interstellar war' (chiến tranh giữa các vì sao) và từ đệm 'though'.",
      "properNouns": [],
      "keywords": [
        "interstellar war",
        "hard"
      ],
      "tokenCount": 5
    },
    {
      "orderIndex": 17,
      "startTime": 68.21,
      "endTime": 72.39,
      "text": "Front lines, tactics, and logistics are meaningless at these scales.",
      "normalizedText": "front lines tactics and logistics are meaningless at these scales",
      "ipaUs": "frʌnt laɪnz ˈtæktɪks ænd ləˈdʒɪstɪks ɑːr ˈmiːnɪŋlɪs æt ðiːz skeɪlz",
      "translationVi": "Tiền tuyến, chiến thuật và hậu cần đều trở nên vô nghĩa ở những quy mô vũ trụ này.",
      "explanationAi": "Ba khái niệm quân sự 'front lines', 'tactics', 'logistics' và tính từ 'meaningless'.",
      "properNouns": [],
      "keywords": [
        "front lines",
        "tactics",
        "logistics",
        "meaningless",
        "scales"
      ],
      "tokenCount": 10
    },
    {
      "orderIndex": 18,
      "startTime": 72.72,
      "endTime": 74.74,
      "text": "It's also fought across time.",
      "normalizedText": "its also fought across time",
      "ipaUs": "ɪts ˈɔːlsoʊ fɔːt əˈkrɔːs taɪm",
      "translationVi": "Nó còn là cuộc chiến bị chi phối bởi dòng thời gian.",
      "explanationAi": "Dạng bị động quá khứ phân từ 'fought' của động từ 'fight'.",
      "properNouns": [],
      "keywords": [
        "fought",
        "across time"
      ],
      "tokenCount": 5
    },
    {
      "orderIndex": 19,
      "startTime": 74.95,
      "endTime": 79.29,
      "text": "Decades will pass between firing a weapon and learning whether it hit or not.",
      "normalizedText": "decades will pass between firing a weapon and learning whether it hit or not",
      "ipaUs": "ˈdɛkeɪdz wɪl pæs bɪˈtwiːn ˈfaɪərɪŋ ə ˈwɛpən ænd ˈlɜːrnɪŋ ˈwɛðər ɪt hɪt ɔːr nɑːt",
      "translationVi": "Nhiều thập kỷ sẽ trôi qua giữa thời điểm khai hỏa vũ khí và lúc biết được nó có bắn trúng đích hay không.",
      "explanationAi": "Cấu trúc 'between doing X and doing Y' và danh từ số nhiều 'decades' (hàng thập kỷ).",
      "properNouns": [],
      "keywords": [
        "decades",
        "pass",
        "firing",
        "weapon",
        "learning",
        "hit"
      ],
      "tokenCount": 14
    },
    {
      "orderIndex": 20,
      "startTime": 79.65,
      "endTime": 82.39,
      "text": "Sending an invasion fleet is futile.",
      "normalizedText": "sending an invasion fleet is futile",
      "ipaUs": "ˈsɛndɪŋ ən ɪnˈveɪʒn fliːt ɪz ˈfjuːtl",
      "translationVi": "Việc phái một hạm đội xâm lược là hoàn toàn vô ích.",
      "explanationAi": "Danh động từ 'Sending', danh từ 'invasion fleet' (hạm đội xâm lăng) và tính từ 'futile' (vô vọng).",
      "properNouns": [],
      "keywords": [
        "sending",
        "invasion fleet",
        "futile"
      ],
      "tokenCount": 6
    },
    {
      "orderIndex": 21,
      "startTime": 82.61,
      "endTime": 92.66,
      "text": "Even if the Smorpians travel in a large fraction of the speed of light, the journey to Earth would take decades or even centuries, and humans would have plenty of time to prepare.",
      "normalizedText": "even if the smorpians travel in a large fraction of the speed of light the journey to earth would take decades or even centuries and humans would have plenty of time to prepare",
      "ipaUs": "ˈiːvn ɪf ðə ˈsmɔːrpiənz ˈtrævl ɪn ə lɑːrdʒ ˈfrækʃn ʌv ðə spiːd ʌv laɪt ðə ˈdʒɜːrni tuː ɜːrθ wʊd teɪk ˈdɛkeɪdz ɔːr ˈiːvn ˈsɛntʃəriz ænd ˈhjuːmənz wʊd hæv ˈplɛnti ʌv taɪm tuː prɪˈpɛr",
      "translationVi": "Ngay cả khi người Smorpian di chuyển với một phần đáng kể của tốc độ ánh sáng, hành trình đến Trái Đất cũng sẽ mất hàng thập kỷ hoặc thậm chí hàng thế kỷ, và con người sẽ có dư dả thời gian để chuẩn bị.",
      "explanationAi": "Cụm 'fraction of the speed of light' (tỷ lệ của vận tốc ánh sáng), 'plenty of time' (dư dả thời gian).",
      "properNouns": [
        "Smorpians",
        "Earth"
      ],
      "keywords": [
        "speed of light",
        "journey",
        "Earth",
        "centuries",
        "prepare"
      ],
      "tokenCount": 33
    }
  ]
},


  // Daily English: Pets, Animals & Nature Conversation
  {
    id: "575d216f-b275-468e-8a41-c3b26c0ac1ea",
    slug: "daily-pets-animals-nature",
    title: "Daily English: Pets, Animals & Nature Conversation",
    description: "Bài luyện nghe giao tiếp tiếng Anh thường ngày về chủ đề thú cưng, động vật sở thú và thiên nhiên cây cỏ cùng Pocket Passport.",
    sourceType: "YOUTUBE",
    externalId: "AK42GhbTZ9w",
    thumbnailUrl: "https://img.youtube.com/vi/AK42GhbTZ9w/hqdefault.jpg",
    durationSeconds: 72,
    durationFormatted: "01:12",
    cefrLevel: "A2",
    supportedTypes: "BOTH",
    categoryId: "cat_daily_conv",
    categorySlug: "daily-conversations",
    categoryName: "Giao Tiếp Hàng Ngày",
    accent: "en-US",
    wpmSpeed: 125,
    viewCount: 2450,
    studyCount: 890,
    segments: [
          {
                "orderIndex": 0,
                "startTime": 13,
                "endTime": 19,
                "text": "Our family has a small dog with a white coat and brown spots.",
                "ipaUs": "aʊər ˈfæməli hæz ə smɔl dɔɡ wɪð ə waɪt koʊt ænd braʊn spɑts.",
                "translationVi": "Gia đình chúng tôi có một chú chó nhỏ với bộ lông màu trắng và những đốm màu nâu.",
                "explanationAi": "Từ 'coat' ở đây chỉ bộ lông của động vật (thay vì fur), kết hợp với 'brown spots' miêu tả những đốm màu nâu đặc trưng.",
                "properNouns": [],
                "keywords": [
                      "family",
                      "small dog",
                      "white coat",
                      "brown spots"
                ]
          },
          {
                "orderIndex": 1,
                "startTime": 19.5,
                "endTime": 22.8,
                "text": "My son named our dog Buster.",
                "ipaUs": "maɪ sʌn neɪmd aʊər dɔɡ ˈbʌstər.",
                "translationVi": "Con trai tôi đã đặt tên cho chú chó là Buster.",
                "explanationAi": "Cấu trúc 'named + object + name' (đặt tên cho ai/cái gì là...); 'Buster' là một cái tên phổ biến dành cho thú cưng ở các nước nói tiếng Anh.",
                "properNouns": [
                      "Buster"
                ],
                "keywords": [
                      "son",
                      "named",
                      "dog",
                      "Buster"
                ]
          },
          {
                "orderIndex": 2,
                "startTime": 23.5,
                "endTime": 28.5,
                "text": "Buster and our children have a lot of fun together playing.",
                "ipaUs": "ˈbʌstər ænd aʊər ˈtʃɪldrən hæv ə lɑt ʌv fʌn təˈɡɛðər ˈpleɪɪŋ.",
                "translationVi": "Buster và các con tôi rất vui vẻ khi chơi đùa cùng nhau.",
                "explanationAi": "Cụm 'have a lot of fun together playing' thể hiện sự gắn kết vui tươi giữa chú cún và những đứa trẻ trong gia đình.",
                "properNouns": [
                      "Buster"
                ],
                "keywords": [
                      "children",
                      "a lot of fun",
                      "together playing"
                ]
          },
          {
                "orderIndex": 3,
                "startTime": 29,
                "endTime": 34,
                "text": "Sometimes they play indoors, but most of the time they play outdoors.",
                "ipaUs": "ˈsʌmˌtaɪmz ðeɪ pleɪ ˈɪnˌdɔrz, bʌt moʊst ʌv ðə taɪm ðeɪ pleɪ ˌaʊtˈdɔrz.",
                "translationVi": "Đôi khi chúng chơi trong nhà, nhưng phần lớn thời gian chúng chơi ngoài trời.",
                "explanationAi": "Cặp trạng từ tương phản 'indoors' (trong nhà) và 'outdoors' (ngoài trời); 'most of the time' nghĩa là phần lớn thời gian.",
                "properNouns": [],
                "keywords": [
                      "indoors",
                      "most of the time",
                      "outdoors"
                ]
          },
          {
                "orderIndex": 4,
                "startTime": 34.5,
                "endTime": 37.5,
                "text": "We love being outdoors as much as we can be.",
                "ipaUs": "wi lʌv ˈbiɪŋ ˌaʊtˈdɔrz æz mʌtʃ æz wi kæn bi.",
                "translationVi": "Chúng tôi thích ở ngoài trời nhiều nhất có thể.",
                "explanationAi": "Cấu trúc 'as much as we can be' (nhiều nhất có thể) nhấn mạnh lối sống gần gũi với thiên nhiên của gia đình.",
                "properNouns": [],
                "keywords": [
                      "love being outdoors",
                      "as much as we can"
                ]
          },
          {
                "orderIndex": 5,
                "startTime": 38.5,
                "endTime": 44,
                "text": "Sometimes we go to the local zoo to see other animals.",
                "ipaUs": "ˈsʌmˌtaɪmz wi ɡoʊ tu ðə ˈloʊkəl zu tu si ˈʌðər ˈænəməlz.",
                "translationVi": "Đôi khi chúng tôi đến sở thú địa phương để ngắm nhìn những loài động vật khác.",
                "explanationAi": "'Local zoo' là sở thú địa phương gần nơi sinh sống; 'other animals' là các loài động vật hoang dã khác ngoài thú nuôi trong nhà.",
                "properNouns": [],
                "keywords": [
                      "local zoo",
                      "see",
                      "animals"
                ]
          },
          {
                "orderIndex": 6,
                "startTime": 44.5,
                "endTime": 50.5,
                "text": "My daughter's favorite animal is the giraffe because it is tall and has a long neck.",
                "ipaUs": "maɪ ˈdɔtərz ˈfeɪvərɪt ˈænəməl ɪz ðə dʒəˈræf bɪˈkɔz ɪt ɪz tɔl ænd hæz ə lɔŋ nɛk.",
                "translationVi": "Con vật yêu thích của con gái tôi là hươu cao cổ vì nó cao và có chiếc cổ dài.",
                "explanationAi": "'Giraffe' /dʒəˈræf/ (hươu cao cổ), đặc trưng với tính từ 'tall' và bộ phận cơ thể 'long neck'.",
                "properNouns": [],
                "keywords": [
                      "favorite animal",
                      "giraffe",
                      "tall",
                      "long neck"
                ]
          },
          {
                "orderIndex": 7,
                "startTime": 51,
                "endTime": 53.5,
                "text": "We also like watching the elephants.",
                "ipaUs": "wi ˈɔlsoʊ laɪk ˈwɑtʃɪŋ ði ˈɛləfənts.",
                "translationVi": "Chúng tôi cũng rất thích ngắm nhìn những chú voi.",
                "explanationAi": "Mạo từ 'the' trước nguyên âm 'elephants' phát âm là /ði/, động từ 'watch' dùng khi quan sát động vật chuyển động hoặc sinh hoạt.",
                "properNouns": [],
                "keywords": [
                      "also like",
                      "watching",
                      "elephants"
                ]
          },
          {
                "orderIndex": 8,
                "startTime": 54.4,
                "endTime": 58,
                "text": "Another thing we like to do is take walks in the woods.",
                "ipaUs": "əˈnʌðər θɪŋ wi laɪk tu du ɪz teɪk wɔks ɪn ðə wʊdz.",
                "translationVi": "Một điều khác mà chúng tôi thích làm là đi dạo trong rừng.",
                "explanationAi": "'The woods' trong tiếng Anh chỉ khu rừng nhỏ hoặc vùng cây cối rậm rạp; 'take walks' là đi bộ dạo mát thư giãn.",
                "properNouns": [],
                "keywords": [
                      "another thing",
                      "take walks",
                      "woods"
                ]
          },
          {
                "orderIndex": 9,
                "startTime": 59.2,
                "endTime": 65,
                "text": "There are many kinds of trees, wild flowers and birds.",
                "ipaUs": "ðɛr ɑr ˈmɛni kaɪndz ʌv triz, waɪld ˈflaʊərz ænd bɜrdz.",
                "translationVi": "Ở đó có rất nhiều loài cây, hoa dại và các loài chim.",
                "explanationAi": "'Kinds of' (các loại / các loài); 'wild flowers' là hoa dại mọc tự nhiên trong rừng.",
                "properNouns": [],
                "keywords": [
                      "many kinds of",
                      "trees",
                      "wild flowers",
                      "birds"
                ]
          },
          {
                "orderIndex": 10,
                "startTime": 65.5,
                "endTime": 71.5,
                "text": "Sometimes we see squirrels and rabbits too.",
                "ipaUs": "ˈsʌmˌtaɪmz wi si ˈskwɜrəlz ænd ˈræbɪts tu.",
                "translationVi": "Thỉnh thoảng chúng tôi cũng nhìn thấy sóc và thỏ nữa.",
                "explanationAi": "'Squirrels' /ˈskwɜːrəlz/ (những chú sóc) và 'rabbits' (những chú thỏ); 'too' đặt cuối câu mang nghĩa 'cũng vậy / nữa'.",
                "properNouns": [],
                "keywords": [
                      "squirrels",
                      "rabbits",
                      "too"
                ]
          }
    ],
  },

  {
    "id": "e4476093-9f0c-4620-a7f3-345d0e6b64db",
    "slug": "bbc-6min-brain-boost",
    "title": "BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship",
    "description": "Bản tin thời sự đặc sắc từ BBC Learning English về việc trục vớt kho báu huyền thoại trị giá 20 tỷ USD từ con tàu đắm San Jose năm 1708, học từ vựng tin tức và phát âm Anh-Anh chuẩn.",
    "sourceType": "YOUTUBE",
    "externalId": "doOlP7NLUwc",
    "thumbnailUrl": "https://img.youtube.com/vi/doOlP7NLUwc/hqdefault.jpg",
    "durationSeconds": 90,
    "durationFormatted": "01:30",
    "cefrLevel": "B1",
    "supportedTypes": "BOTH",
    "categoryId": "cat_bbc_6min",
    "categorySlug": "bbc-6-minute",
    "categoryName": "BBC 6 Minute English",
    "accent": "en-GB",
    "wpmSpeed": 135,
    "viewCount": 3820,
    "studyCount": 1420,
    "segments": [
      {
        "orderIndex": 1,
        "startTime": 0,
        "endTime": 6.6,
        "text": "From BBC Learning English, This is Learning English from the News, our podcast about the news headlines.",
        "normalizedText": "from bbc learning english this is learning english from the news our podcast about the news headlines",
        "ipaUs": "frəm biː biː siː ˈlɜːrnɪŋ ˈɪŋɡlɪʃ ðɪs ɪz ˈlɜːrnɪŋ ˈɪŋɡlɪʃ frəm ðə nuːz ˈaʊər ˈpɑːdˌkæst əˈbaʊt ðə nuːz ˈhɛdˌlaɪnz",
        "translationVi": "Từ BBC Learning English, đây là chương trình Learning English from the News, podcast của chúng tôi về các dòng tít tin tức.",
        "explanationAi": "Câu mở đầu giới thiệu chương trình podcast tin tức của BBC Learning English. Chú ý cụm 'Learning English from the News' và danh từ 'headlines' (tiêu đề, dòng tít báo chí).",
        "properNouns": [
          "BBC Learning English",
          "Learning English from the News"
        ],
        "keywords": [
          "headlines",
          "podcast",
          "learning",
          "news",
          "english"
        ],
        "tokenCount": 17
      },
      {
        "orderIndex": 2,
        "startTime": 6.6,
        "endTime": 13.12,
        "text": "In this programme, first treasure recovered from $20 billion sunken ship.",
        "normalizedText": "in this programme first treasure recovered from 20 billion sunken ship",
        "ipaUs": "ɪn ðɪs ˈproʊɡræm fɜːrst ˈtrɛʒər rɪˈkʌvərd frəm ˈtwɛnti ˈbɪljən ˈsʌŋkən ʃɪp",
        "translationVi": "Trong chương trình hôm nay, kho báu đầu tiên được trục vớt từ con tàu đắm trị giá 20 tỷ đô la.",
        "explanationAi": "'Recovered' (được thu hồi, trục vớt) và 'sunken ship' (tàu đắm/chìm dưới nước). Cụm '$20 billion' đóng vai trò tính từ bổ nghĩa cho 'sunken ship'.",
        "properNouns": [],
        "keywords": [
          "recovered",
          "treasure",
          "sunken",
          "programme",
          "billion"
        ],
        "tokenCount": 12
      },
      {
        "orderIndex": 3,
        "startTime": 16.16,
        "endTime": 18.48,
        "text": "Hello, I'm Georgie. And I'm Phil.",
        "normalizedText": "hello im georgie and im phil",
        "ipaUs": "həˈloʊ aɪm ˈdʒɔːrdʒi ænd aɪm fɪl",
        "translationVi": "Xin chào, tôi là Georgie. Và tôi là Phil.",
        "explanationAi": "Lời chào mở đầu thân thiện từ hai người dẫn chương trình BBC: Georgie và Phil.",
        "properNouns": [
          "Georgie",
          "Phil"
        ],
        "keywords": [
          "georgie",
          "hello",
          "phil"
        ],
        "tokenCount": 6
      },
      {
        "orderIndex": 4,
        "startTime": 18.48,
        "endTime": 24.96,
        "text": "In this programme, we look at one big news story and the vocabulary in the headlines that will help you understand it.",
        "normalizedText": "in this programme we look at one big news story and the vocabulary in the headlines that will help you understand it",
        "ipaUs": "ɪn ðɪs ˈproʊɡræm wiː lʊk æt wʌn bɪɡ nuːz ˈstɔːri ænd ðə vəʊˈkæbjəˌlɛri ɪn ðə ˈhɛdˌlaɪnz ðæt wɪl hɛlp juː ˌʌndərˈstænd ɪt",
        "translationVi": "Trong chương trình này, chúng ta sẽ cùng tìm hiểu một câu chuyện thời sự lớn và những từ vựng trong tiêu đề báo chí giúp bạn hiểu rõ nó.",
        "explanationAi": "Cụm 'look at' (xem xét, tìm hiểu), 'vocabulary in the headlines' (từ vựng trong tiêu đề tin tức) và mệnh đề quan hệ 'that will help you understand it'.",
        "properNouns": [],
        "keywords": [
          "vocabulary",
          "headlines",
          "understand",
          "programme",
          "story"
        ],
        "tokenCount": 21
      },
      {
        "orderIndex": 5,
        "startTime": 24.96,
        "endTime": 33.4,
        "text": "You can find all the vocabulary and headlines from this episode, as well as a worksheet on our website, bbclearningenglish.com.",
        "normalizedText": "you can find all the vocabulary and headlines from this episode as well as a worksheet on our website bbclearningenglishcom",
        "ipaUs": "juː kæn faɪnd ɔːl ðə vàʊˈkæbjəˌlɛri ænd ˈhɛdˌlaɪnz frəm ðɪs ˈɛpəˌsoʊd æz wɛl æz ə ˈwɜːrkˌʃiːt ɑːn ˈaʊər ˈwɛbˌsaɪt biːbiːsiːˌlɜːrnɪŋˈɪŋɡlɪʃ dɑːt kɑːm",
        "translationVi": "Bạn có thể tìm thấy toàn bộ từ vựng và tiêu đề trong tập này, cũng như bài tập thực hành trên trang web bbclearningenglish.com của chúng tôi.",
        "explanationAi": "'Episode' (tập phát sóng), liên từ 'as well as' (cũng như), và 'worksheet' (phiếu bài tập học tập).",
        "properNouns": [
          "bbclearningenglish.com"
        ],
        "keywords": [
          "vocabulary",
          "headlines",
          "worksheet",
          "episode",
          "website"
        ],
        "tokenCount": 20
      },
      {
        "orderIndex": 6,
        "startTime": 33.4,
        "endTime": 36.56,
        "text": "OK, Phil, let's hear more about this story.",
        "normalizedText": "ok phil lets hear more about this story",
        "ipaUs": "oʊˈkeɪ fɪl lɛts hɪr mɔːr əˈbaʊt ðɪs ˈstɔːri",
        "translationVi": "Được rồi, Phil, hãy cùng lắng nghe chi tiết hơn về câu chuyện này nhé.",
        "explanationAi": "Câu chuyển ý quen thuộc trong podcast radio: 'let's hear more about...' (hãy cùng lắng nghe thêm về...).",
        "properNouns": [
          "Phil"
        ],
        "keywords": [
          "story",
          "phil",
          "hear"
        ],
        "tokenCount": 8
      },
      {
        "orderIndex": 7,
        "startTime": 41.64,
        "endTime": 49.4,
        "text": "A cannon, three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago.",
        "normalizedText": "a cannon three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago",
        "ipaUs": "ə ˈkænən θriː kɔɪnz ænd ə ˈpɔːrsəlɪn kʌp hæv bɪn rɪˈkʌvərd frəm ə ʃɪp ðæt sæŋk ˈoʊvər θriː ˈhʌndrəd jɪrz əˈɡoʊ",
        "translationVi": "Một khẩu đại bác, ba đồng tiền xu và một chiếc tách sứ đã được trục vớt từ một con tàu bị chìm hơn 300 năm trước.",
        "explanationAi": "'Cannon' (khẩu đại bác súng lớn), 'porcelain' (đồ gốm sứ), 'recovered' (trục vớt được) và thì Hiện tại hoàn thành bị động 'have been recovered'.",
        "properNouns": [],
        "keywords": [
          "porcelain",
          "recovered",
          "cannon",
          "coins",
          "sank"
        ],
        "tokenCount": 19
      },
      {
        "orderIndex": 8,
        "startTime": 49.4,
        "endTime": 56.52,
        "text": "The ship, called the San Jose, was sunk by British ships in 1708 near Cartagena in Colombia.",
        "normalizedText": "the ship called the san jose was sunk by british ships in 1708 near cartagena in colombia",
        "ipaUs": "ðə ʃɪp kɔːld ðə sæn hoʊˈzeɪ wʌz sʌŋk baɪ ˈbrɪtɪʃ ʃɪps ɪn ˈsɛvənˈtiːn oʊ eɪt nɪr ˌkɑːrtəˈheɪnə ɪn kəˈlʌmbiə",
        "translationVi": "Con tàu, mang tên San Jose, đã bị các tàu của Anh đánh chìm vào năm 1708 gần bờ biển Cartagena ở Colombia.",
        "explanationAi": "Địa danh lịch sử Cartagena thuộc Colombia. Động từ 'was sunk' (bị đánh chìm - dạng bị động quá khứ của 'sink').",
        "properNouns": [
          "San Jose",
          "British",
          "Cartagena",
          "Colombia"
        ],
        "keywords": [
          "cartagena",
          "colombia",
          "british",
          "sunk",
          "ships"
        ],
        "tokenCount": 17
      },
      {
        "orderIndex": 9,
        "startTime": 56.52,
        "endTime": 64.24,
        "text": "The ship is thought to have $20 billion worth of gold and silver coins on board, according to some estimates.",
        "normalizedText": "the ship is thought to have 20 billion worth of gold and silver coins on board according to some estimates",
        "ipaUs": "ðə ʃɪp ɪz θɔːt tuː hæv ˈtwɛnti ˈbɪljən wɜːrθ ʌv ɡoʊld ænd ˈsɪlvər kɔɪnz ɑːn bɔːrd əˈkɔːrdɪŋ tuː sʌm ˈɛstəməts",
        "translationVi": "Con tàu được cho là đang chở số lượng tiền vàng và bạc trị giá khoảng 20 tỷ đô la, theo một số ước tính.",
        "explanationAi": "Cấu trúc bị động khách quan 'is thought to have' (được cho là có), cụm 'on board' (ở trên tàu), và danh từ 'estimates' (các ước tính).",
        "properNouns": [],
        "keywords": [
          "estimates",
          "billion",
          "silver",
          "coins",
          "board"
        ],
        "tokenCount": 20
      },
      {
        "orderIndex": 10,
        "startTime": 64.24,
        "endTime": 72.04,
        "text": "Colombia, Spain, an American company and indigenous groups in Bolivia have all claimed that this treasure belongs to them.",
        "normalizedText": "colombia spain an american company and indigenous groups in bolivia have all claimed that this treasure belongs to them",
        "ipaUs": "kəˈlʌmbiə speɪn ən əˈmɛrɪkən ˈkʌmpəni ænd ɪnˈdɪdʒənəs ɡruːps ɪn bəˈlɪviə hæv ɔːl kleɪmd ðæt ðɪs ˈtrɛʒər bɪˈlɔːŋz tuː ðɛm",
        "translationVi": "Colombia, Tây Ban Nha, một công ty Mỹ và các nhóm người bản địa ở Bolivia đều tuyên bố rằng kho báu này thuộc về họ.",
        "explanationAi": "'Indigenous groups' (các bộ tộc người bản địa), động từ 'claimed' (tuyên bố quyền sở hữu), và 'belongs to' (thuộc về ai).",
        "properNouns": [
          "Colombia",
          "Spain",
          "American",
          "Bolivia"
        ],
        "keywords": [
          "indigenous",
          "treasure",
          "belongs",
          "claimed",
          "bolivia"
        ],
        "tokenCount": 19
      },
      {
        "orderIndex": 11,
        "startTime": 72.04,
        "endTime": 78.8,
        "text": "Colombian scientists located the ship in 2015 and launched an expedition to explore it last year.",
        "normalizedText": "colombian scientists located the ship in 2015 and launched an expedition to explore it last year",
        "ipaUs": "kəˈlʌmbiən ˈsaɪəntɪsts ˈloʊkeɪtɪd ðə ʃɪp ɪn ˈtwɛnti fɪfˈtiːn ænd lɔːntʃt ən ˌɛkspəˈdɪʃən tuː ɪkˈsplɔːr ɪt læst jɪr",
        "translationVi": "Các nhà khoa học Colombia đã định vị được con tàu vào năm 2015 và phát động một chuyến thám hiểm để khám phá nó vào năm ngoái.",
        "explanationAi": "'Located' (xác định vị trí), 'launched an expedition' (khởi động/triển khai một chuyến thám hiểm thám trắc).",
        "properNouns": [
          "Colombian"
        ],
        "keywords": [
          "expedition",
          "scientists",
          "launched",
          "located",
          "explore"
        ],
        "tokenCount": 15
      },
      {
        "orderIndex": 12,
        "startTime": 78.8,
        "endTime": 83.84,
        "text": "Let's have our first headline. This one is from Fox Weather, an American broadcaster.",
        "normalizedText": "lets have our first headline this one is from fox weather an american broadcaster",
        "ipaUs": "lɛts hæv ˈaʊər fɜːrst ˈhɛdˌlaɪn ðɪs wʌn ɪz frəm fɑːks ˈwɛðər ən əˈmɛrɪkən ˈbrɔːdˌkæstər",
        "translationVi": "Hãy cùng đến với dòng tít đầu tiên. Tiêu đề này đến từ Fox Weather, một đài truyền hình của Mỹ.",
        "explanationAi": "'Broadcaster' (đài truyền hình/phát thanh phát sóng tin tức). Lối dẫn nhập trực diện vào dòng tít báo chí.",
        "properNouns": [
          "Fox Weather",
          "American"
        ],
        "keywords": [
          "broadcaster",
          "headline",
          "weather",
          "american"
        ],
        "tokenCount": 14
      },
      {
        "orderIndex": 13,
        "startTime": 83.84,
        "endTime": 89.72,
        "text": "Archeologists recover treasures from the legendary 1708 San Jose, wrecked in war.",
        "normalizedText": "archeologists recover treasures from the legendary 1708 san jose wrecked in war",
        "ipaUs": "ˌɑːrkiˈɑːlədʒɪsts rɪˈkʌvər ˈtrɛʒərz frəm ðə ˈlɛdʒənˌdɛri ˈsɛvənˈtiːn oʊ eɪt sæn hoʊˈzeɪ rɛkt ɪn wɔːr",
        "translationVi": "Các nhà khảo cổ học thu hồi những bảo vật từ con tàu huyền thoại San Jose năm 1708, từng bị phá hủy trong chiến tranh.",
        "explanationAi": "'Archeologists' (các nhà khảo cổ học), 'legendary' (huyền thoại), và quá khứ phân từ 'wrecked' (bị đắm, bị phá hủy).",
        "properNouns": [
          "San Jose"
        ],
        "keywords": [
          "archeologists",
          "treasures",
          "legendary",
          "wrecked",
          "war"
        ],
        "tokenCount": 13
      }
    ]
  },

  // 1. Steve Jobs Stanford Speech
  {
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
            }
    ],
  },

  // 2. TED-Ed: The Benefits of a Bilingual Brain
  {
    id: "vid_ted_bilingual_brain",
    slug: "ted-ed-benefits-of-a-bilingual-brain",
    title: "TED-Ed: The Benefits of a Bilingual Brain",
    description: "Khám phá cách não bộ xử lý đa ngôn ngữ giúp cải thiện trí nhớ, tăng khả năng tập trung và làm chậm quá trình lão hóa nhận thức qua bài giảng TED-Ed của Mia Nacamulli.",
    sourceType: "YOUTUBE",
    externalId: "MMmOLN5zBLY",
    thumbnailUrl: "https://img.youtube.com/vi/MMmOLN5zBLY/hqdefault.jpg",
    durationSeconds: 126,
    durationFormatted: "02:05",
    cefrLevel: "B1",
    supportedTypes: "BOTH",
    categoryId: "cat_ted_ed",
    categorySlug: "ted-ed",
    categoryName: "TED-Ed & Tư Duy Sâu",
    accent: "en-US",
    wpmSpeed: 138,
    viewCount: 4520,
    studyCount: 1680,
    segments: [
      {
        orderIndex: 0,
        startTime: 6.55,
        endTime: 12.49,
        text: "¿Hablas español? Parlez-vous français? 你会说中文吗？",
        translationVi: "Bạn có nói tiếng Tây Ban Nha? Bạn có nói tiếng Pháp? Bạn có nói tiếng Trung không?",
        ipaUs: "/ˈaβlas espaˈɲol paʁle vu fʁɑ̃sɛ ni hweɪ ʃwɔ ʈʂʊŋwən ma/",
        properNouns: ["Hablas","español","Parlez-vous","français","你会说中文吗"],
        keywords: ["español","français","中文"],
      },
      {
        orderIndex: 1,
        startTime: 12.49,
        endTime: 18.33,
        text: "If you answered, \"sí,\" \"oui,\" or \"会\" and you're watching this in English,",
        translationVi: "Nếu bạn đã trả lời \"sí\" (có), \"oui\" (vâng), hoặc \"会\" (biết) và bạn đang xem video này bằng tiếng Anh,",
        ipaUs: "/ɪf ju ˈænsərd si wi ɔr hweɪ ænd jʊr ˈwɑtʃɪŋ ðɪs ɪn ˈɪŋɡlɪʃ/",
        properNouns: ["English","sí","oui","会"],
        keywords: ["answered","watching","English"],
      },
      {
        orderIndex: 2,
        startTime: 18.33,
        endTime: 23.47,
        text: "chances are you belong to the world's bilingual and multilingual majority.",
        translationVi: "rất có thể bạn thuộc về bộ phận đa số những người song ngữ và đa ngôn ngữ trên thế giới.",
        ipaUs: "/ˈtʃænsɪz ɑr ju bɪˈlɔŋ tu ðə wɜrldz baɪˈlɪŋɡwəl ænd ˌmʌltiˈlɪŋɡwəl məˈdʒɔrəti/",
        properNouns: [],
        keywords: ["chances","belong","bilingual","multilingual","majority"],
      },
      {
        orderIndex: 3,
        startTime: 23.47,
        endTime: 27.47,
        text: "And besides having an easier time traveling or watching movies without subtitles,",
        translationVi: "Và bên cạnh việc du lịch dễ dàng hơn hay xem phim mà không cần phụ đề,",
        ipaUs: "/ænd bɪˈsaɪdz ˈhævɪŋ ən ˈiziər taɪm ˈtrævəlɪŋ ɔr ˈwɑtʃɪŋ ˈmuviz wɪˈðaʊt ˈsʌbˌtaɪtəlz/",
        properNouns: [],
        keywords: ["besides","traveling","movies","subtitles"],
      },
      {
        orderIndex: 4,
        startTime: 27.47,
        endTime: 34.78,
        text: "knowing two or more languages means that your brain may actually look and work differently than those of your monolingual friends.",
        translationVi: "việc biết từ hai ngôn ngữ trở lên đồng nghĩa với việc bộ não của bạn thực sự có cấu trúc và vận hành khác biệt so với những người bạn đơn ngữ.",
        ipaUs: "/ˈnoʊɪŋ tu ɔr mɔr ˈlæŋɡwɪdʒɪz minz ðæt jʊr breɪn meɪ ˈæktʃuəli lʊk ænd wɜrk ˈdɪfrəntli ðæn ðoʊz ʌv jʊr ˌmɑnəˈlɪŋɡwəl frɛndz/",
        properNouns: [],
        keywords: ["languages","brain","differently","monolingual"],
      },
      {
        orderIndex: 5,
        startTime: 34.78,
        endTime: 38.27,
        text: "So what does it really mean to know a language?",
        translationVi: "Vậy việc thực sự \"biết một ngôn ngữ\" có ý nghĩa như thế nào?",
        ipaUs: "/soʊ wʌt dʌz ɪt ˈriəli min tu noʊ ə ˈlæŋɡwɪdʒ/",
        properNouns: [],
        keywords: ["really","mean","language"],
      },
      {
        orderIndex: 6,
        startTime: 38.27,
        endTime: 46.98,
        text: "Language ability is typically measured in two active parts, speaking and writing, and two passive parts, listening and reading.",
        translationVi: "Năng lực ngôn ngữ thường được đo lường qua hai phần chủ động: nói và viết, cùng hai phần thụ động: nghe và đọc.",
        ipaUs: "/ˈlæŋɡwɪdʒ əˈbɪləti ɪz ˈtɪpɪkli ˈmɛʒərd ɪn tu ˈæktɪv pɑrts ˈspikɪŋ ænd ˈraɪtɪŋ ænd tu ˈpæsɪv pɑrts ˈlɪsənɪŋ ænd ˈridɪŋ/",
        properNouns: [],
        keywords: ["measured","active","speaking","writing","passive","listening","reading"],
      },
      {
        orderIndex: 7,
        startTime: 46.98,
        endTime: 52.38,
        text: "While a balanced bilingual has near equal abilities across the board in two languages,",
        translationVi: "Trong khi một người song ngữ cân bằng sở hữu năng lực gần như tương đương toàn diện ở cả hai ngôn ngữ,",
        ipaUs: "/waɪl ə ˈbælənst baɪˈlɪŋɡwəl hæz nɪr ˈikwəl əˈbɪlətiz əˈkrɔs ðə bɔrd ɪn tu ˈlæŋɡwɪdʒɪz/",
        properNouns: [],
        keywords: ["balanced","equal abilities","across the board"],
      },
      {
        orderIndex: 8,
        startTime: 52.38,
        endTime: 57.98,
        text: "most bilinguals around the world know and use their languages in varying proportions.",
        translationVi: "thì hầu hết những người song ngữ trên thế giới lại biết và sử dụng các ngôn ngữ của mình theo những tỷ lệ khác nhau.",
        ipaUs: "/moʊst baɪˈlɪŋɡwəlz əˈraʊnd ðə wɜrld noʊ ænd juz ðɛr ˈlæŋɡwɪdʒɪz ɪn ˈvɛriɪŋ prəˈpɔrʃənz/",
        properNouns: [],
        keywords: ["bilinguals","varying","proportions"],
      },
      {
        orderIndex: 9,
        startTime: 57.98,
        endTime: 64.92,
        text: "And depending on their situation and how they acquired each language, they can be classified into three general types.",
        translationVi: "Và tùy thuộc vào hoàn cảnh sống cũng như cách tiếp nhận từng ngôn ngữ, họ có thể được phân loại thành ba nhóm tổng quát.",
        ipaUs: "/ænd dɪˈpɛndɪŋ ɑn ðɛr ˌsɪtʃuˈeɪʃən ænd haʊ ðeɪ əˈkwaɪərd itʃ ˈlæŋɡwɪdʒ ðeɪ kæn bi ˈklæsəˌfaɪd ˈɪntu θri ˈdʒɛnərəl taɪps/",
        properNouns: [],
        keywords: ["depending","situation","acquired","classified","three types"],
      },
      {
        orderIndex: 10,
        startTime: 64.92,
        endTime: 72.01,
        text: "For example, let's take Gabriella, whose family immigrates to the US from Peru when she's two-years old.",
        translationVi: "Lấy ví dụ về Gabriella, cô bé có gia đình nhập cư vào Mỹ từ Peru khi cô bé mới hai tuổi.",
        ipaUs: "/fɔr ɪɡˈzæmpəl lɛts teɪk ˌɡæbriˈɛlə huz ˈfæməli ˈɪməˌɡreɪts tu ðə ju ɛs frʌm pəˈru wɛn ʃiz tu jɪrz oʊld/",
        properNouns: ["Gabriella","US","Peru"],
        keywords: ["Gabriella","immigrates","US","Peru"],
      },
      {
        orderIndex: 11,
        startTime: 72.01,
        endTime: 80.30,
        text: "As a compound bilingual, Gabriella develops two linguistic codes simultaneously, with a single set of concepts,",
        translationVi: "Là một người song ngữ phức hợp (compound bilingual), Gabriella phát triển song song hai mã ngôn ngữ cùng với một hệ khái niệm duy nhất,",
        ipaUs: "/æz ə ˈkɑmpaʊnd baɪˈlɪŋɡwəl ˌɡæbriˈɛlə dɪˈvɛləps tu lɪŋˈɡwɪstɪk koʊdz ˌsaɪməlˈteɪniəsli wɪð ə ˈsɪŋɡəl sɛt ʌv ˈkɑnsɛpts/",
        properNouns: ["Gabriella"],
        keywords: ["compound bilingual","linguistic codes","simultaneously","concepts"],
      },
      {
        orderIndex: 12,
        startTime: 80.30,
        endTime: 85.36,
        text: "learning both English and Spanish as she begins to process the world around her.",
        translationVi: "vừa học tiếng Anh vừa học tiếng Tây Ban Nha khi cô bé bắt đầu nhận thức thế giới xung quanh mình.",
        ipaUs: "/ˈlɜrnɪŋ boʊθ ˈɪŋɡlɪʃ ænd ˈspænɪʃ æz ʃi bɪˈɡɪnz tu ˈprɑˌsɛs ðə wɜrld əˈraʊnd hɜr/",
        properNouns: ["English","Spanish"],
        keywords: ["English","Spanish","process","world"],
      },
      {
        orderIndex: 13,
        startTime: 85.36,
        endTime: 91.34,
        text: "Her teenage brother, on the other hand, might be a coordinate bilingual, working with two sets of concepts,",
        translationVi: "Người anh trai tuổi thiếu niên của cô bé, mặt khác, có thể là người song ngữ tọa độ (coordinate bilingual), vận hành với hai hệ khái niệm tách biệt,",
        ipaUs: "/hɜr ˈtinˌeɪdʒər ˈbrʌðər ɑn ði ˈʌðər hænd maɪt bi ə koʊˈɔrdɪnət baɪˈlɪŋɡwəl ˈwɜrkɪŋ wɪð tu sɛts ʌv ˈkɑnsɛpts/",
        properNouns: [],
        keywords: ["teenage","coordinate bilingual","concepts"],
      },
      {
        orderIndex: 14,
        startTime: 91.34,
        endTime: 96.76,
        text: "learning English in school, while continuing to speak Spanish at home and with friends.",
        translationVi: "học tiếng Anh tại trường, trong khi vẫn tiếp tục nói tiếng Tây Ban Nha ở nhà và với bạn bè.",
        ipaUs: "/ˈlɜrnɪŋ ˈɪŋɡlɪʃ ɪn skul waɪl kənˈtɪnjuɪŋ tu spik ˈspænɪʃ æt hoʊm ænd wɪð frɛndz/",
        properNouns: ["English","Spanish"],
        keywords: ["English","school","continuing","Spanish","friends"],
      },
      {
        orderIndex: 15,
        startTime: 96.76,
        endTime: 106.20,
        text: "Finally, Gabriella's parents are likely to be subordinate bilinguals who learn a secondary language by filtering it through their primary language.",
        translationVi: "Cuối cùng, cha mẹ của Gabriella nhiều khả năng là những người song ngữ phụ thuộc (subordinate bilinguals), những người học ngôn ngữ thứ hai thông qua việc lọc qua ngôn ngữ mẹ đẻ.",
        ipaUs: "/ˈfaɪnəli ˌɡæbriˈɛləz ˈpɛrənts ɑr ˈlaɪkli tu bi səˈbɔrdɪnət baɪˈlɪŋɡwəlz hu lɜrn ə ˈsɛkənˌdɛri ˈlæŋɡwɪdʒ baɪ ˈfɪltərɪŋ ɪt θru ðɛr ˈpraɪˌmɛri ˈlæŋɡwɪdʒ/",
        properNouns: ["Gabriella's"],
        keywords: ["subordinate bilinguals","secondary language","filtering","primary language"],
      },
      {
        orderIndex: 16,
        startTime: 106.20,
        endTime: 115.84,
        text: "Because all types of bilingual people can become fully proficient in a language regardless of accent or pronunciation, the difference may not be apparent to a casual observer.",
        translationVi: "Bởi vì tất cả các nhóm người song ngữ đều có thể trở nên cực kỳ thành thạo một ngôn ngữ bất kể giọng điệu hay phát âm, sự khác biệt này có thể không dễ nhận thấy đối với một người quan sát thông thường.",
        ipaUs: "/bɪˈkəz ɔl taɪps ʌv baɪˈlɪŋɡwəl ˈpipəl kæn bɪˈkʌm ˈfʊli prəˈfɪʃənt ɪn ə ˈlæŋɡwɪdʒ rɪˈɡɑrdlɪs ʌv ˈæksɛnt ɔr prəˌnʌnsiˈeɪʃən ðə ˈdɪfərəns meɪ nɑt bi əˈpærənt tu ə ˈkæʒuəl əbˈzɜrvər/",
        properNouns: [],
        keywords: ["proficient","regardless","accent","pronunciation","apparent","casual observer"],
      },
      {
        orderIndex: 17,
        startTime: 115.84,
        endTime: 125.76,
        text: "But recent advances in brain imaging technology have given neurolinguists a glimpse into how specific aspects of language learning affect the bilingual brain.",
        translationVi: "Thế nhưng những tiến bộ gần đây trong công nghệ chẩn đoán hình ảnh não bộ đã giúp các nhà thần kinh ngôn ngữ học có được cái nhìn sâu sắc về cách các khía cạnh cụ thể của việc học ngôn ngữ tác động lên bộ não song ngữ.",
        ipaUs: "/bʌt ˈrisənt ədˈvænsɪz ɪn breɪn ˈɪmɪdʒɪŋ tɛkˈnɑlədʒi hæv ˈɡɪvən ˌnʊroʊlɪŋˈɡwɪsts ə ɡlɪmps ˈɪntu haʊ spəˈsɪfɪk ˈæspɛkts ʌv ˈlæŋɡwɪdʒ ˈlɜrnɪŋ əˈfɛkt ðə baɪˈlɪŋɡwəl breɪn/",
        properNouns: [],
        keywords: ["advances","brain imaging","neurolinguists","glimpse","affect","bilingual brain"],
      },
    ],
  },

  // 3. BBC 6 Minute English: Why Do We Laugh?
  {
    id: "vid_bbc_why_we_laugh",
    slug: "bbc-6-minute-why-do-we-laugh",
    title: "BBC 6 Minute English: Why Do We Laugh?",
    description: "Khám phá khoa học đằng sau tiếng cười con người: Tiếng cười giúp gắn kết cộng đồng và giải tỏa căng thẳng như thế nào?",
    sourceType: "YOUTUBE",
    externalId: "V74l_zS1x8E",
    thumbnailUrl: "https://img.youtube.com/vi/V74l_zS1x8E/hqdefault.jpg",
    durationSeconds: 360,
    durationFormatted: "06:00",
    cefrLevel: "B1",
    supportedTypes: "BOTH",
    categoryId: "cat_bbc_6min",
    categorySlug: "bbc-6-minute",
    categoryName: "BBC 6 Minute English",
    accent: "en-GB",
    wpmSpeed: 130,
    viewCount: 3100,
    studyCount: 950,
    segments: [
      {
        orderIndex: 0,
        startTime: 1.2,
        endTime: 5.5,
        text: "Hello and welcome to 6 Minute English from BBC Learning English. I'm Neil.",
        translationVi: "Xin chào và chào mừng các bạn đến với chương trình 6 Minute English từ BBC Learning English. Tôi là Neil.",
        ipaUs: "/hɛˈloʊ ænd ˈwɛlkəm tu sɪks ˈmɪnət ˈɪŋɡlɪʃ frʌm bi bi si ˈlɜrnɪŋ ˈɪŋɡlɪʃ/",
        properNouns: ["BBC Learning English", "Neil"],
        keywords: ["welcome", "English"],
      },
      {
        orderIndex: 1,
        startTime: 5.8,
        endTime: 10.4,
        text: "And I'm Sam. Today we're talking about something we all love to do: laughing!",
        translationVi: "Và tôi là Sam. Hôm nay chúng ta sẽ nói về một điều mà tất cả chúng ta đều thích làm: tiếng cười!",
        ipaUs: "/ænd aɪm sæm təˈdeɪ wir ˈtɔkɪŋ əˈbaʊt ˈsʌmθɪŋ wi ɔl lʌv tu du ˈlæfɪŋ/",
        properNouns: ["Sam"],
        keywords: ["laughing", "talking"],
      },
      {
        orderIndex: 2,
        startTime: 11.0,
        endTime: 16.8,
        text: "Humans are not the only animals that laugh. Rats, dogs, and chimpanzees also produce laughter sounds during play.",
        translationVi: "Con người không phải loài động vật duy nhất biết cười. Chuột, chó và tinh tinh cũng tạo ra âm thanh tiếng cười khi chơi đùa.",
        ipaUs: "/ˈhjumənz ɑr nɑt ðɪ ˈoʊnli ˈænəməlz ðæt læf/",
        properNouns: [],
        keywords: ["animals", "rats", "dogs", "chimpanzees", "laughter"],
      },
      {
        orderIndex: 3,
        startTime: 17.2,
        endTime: 23.0,
        text: "Laughter releases endorphins in our brain, creating a sense of well-being and reducing physical stress.",
        translationVi: "Tiếng cười giải phóng hormone endorphin trong não bộ, tạo cảm giác hạnh phúc và giảm căng thẳng thể chất.",
        ipaUs: "/ˈlæftər rɪˈlisɪz ɛnˈdɔrfɪnz ɪn ˈaʊər breɪn/",
        properNouns: [],
        keywords: ["endorphins", "well-being", "reducing stress"],
      },
    ],
  },

  // 4. Daily Conversation: Checking in at the Airport
  {
    id: "vid_airport_checkin",
    slug: "daily-english-airport-check-in",
    title: "English for Travel: Checking in at the Airport",
    description: "Học các mẫu câu tiếng Anh thực tế nhất khi làm thủ tục check-in, cân hành lý và nhận vé lên máy bay tại sân bay quốc tế.",
    sourceType: "YOUTUBE",
    externalId: "ly36kn0qt_4",
    thumbnailUrl: "https://img.youtube.com/vi/ly36kn0qt_4/hqdefault.jpg",
    durationSeconds: 240,
    durationFormatted: "04:00",
    cefrLevel: "A2",
    supportedTypes: "BOTH",
    categoryId: "cat_daily_conv",
    categorySlug: "daily-conversations",
    categoryName: "Giao Tiếp Đời Thực",
    accent: "en-US",
    wpmSpeed: 120,
    viewCount: 5200,
    studyCount: 2100,
    segments: [
      {
        orderIndex: 0,
        startTime: 0.8,
        endTime: 4.5,
        text: "Good morning! Where are you flying to today?",
        translationVi: "Chào buổi sáng! Hôm nay quý khách bay đến đâu ạ?",
        ipaUs: "/ɡʊd ˈmɔrnɪŋ wɛr ɑr ju ˈflaɪɪŋ tu təˈdeɪ/",
        properNouns: [],
        keywords: ["flying", "today"],
      },
      {
        orderIndex: 1,
        startTime: 5.0,
        endTime: 9.2,
        text: "Good morning. I'm flying to London Heathrow on flight BA 178.",
        translationVi: "Chào buổi sáng. Tôi bay đến sân bay London Heathrow trên chuyến bay BA 178.",
        ipaUs: "/ɡʊd ˈmɔrnɪŋ aɪm ˈflaɪɪŋ tu ˈlʌndən ˈhiθroʊ ɑn flaɪt bi eɪ wʌn ˈsɛvən eɪt/",
        properNouns: ["London Heathrow", "BA 178"],
        keywords: ["flying", "flight"],
      },
      {
        orderIndex: 2,
        startTime: 9.8,
        endTime: 14.5,
        text: "May I see your passport and booking confirmation, please?",
        translationVi: "Tôi có thể xem hộ chiếu và xác nhận đặt chỗ của quý khách được không?",
        ipaUs: "/meɪ aɪ si jʊər ˈpæspɔrt ænd ˈbʊkɪŋ ˌkɑnfərˈmeɪʃən pliz/",
        properNouns: [],
        keywords: ["passport", "booking confirmation"],
      },
      {
        orderIndex: 3,
        startTime: 15.0,
        endTime: 19.8,
        text: "Here you go. Could I please have a window seat if possible?",
        translationVi: "Đây thưa cô. Nếu được thì cho tôi xin một ghế ngồi cạnh cửa sổ nhé?",
        ipaUs: "/hɪr ju ɡoʊ kʊd aɪ pliz hæv ə ˈwɪndoʊ sit ɪf ˈpɑsəbəl/",
        properNouns: [],
        keywords: ["window seat", "possible"],
      },
      {
        orderIndex: 4,
        startTime: 20.2,
        endTime: 26.0,
        text: "Certainly. Please place your luggage on the scale to verify the weight.",
        translationVi: "Chắc chắn rồi ạ. Quý khách vui lòng đặt hành lý lên bàn cân để kiểm tra trọng lượng.",
        ipaUs: "/ˈsɜrtənli pliz pleɪs jʊər ˈlʌɡɪdʒ ɑn ðə skeɪl tu ˈvɛrəˌfaɪ ðə weɪt/",
        properNouns: [],
        keywords: ["luggage", "scale", "verify", "weight"],
      },
    ],
  },

  // 5. IELTS Academic: Environmental Sustainability
  {
    id: "vid_ielts_environmental_sustainability",
    slug: "ielts-listening-environmental-sustainability",
    title: "IELTS Academic Listening: Renewable Energy Solutions",
    description: "Bài thuyết trình học thuật chuyên sâu về năng lượng tái tạo, hiệu ứng nhà kính và các chiến lược giảm phát thải carbon toàn cầu.",
    sourceType: "YOUTUBE",
    externalId: "1kUE0BZtTRc",
    thumbnailUrl: "https://img.youtube.com/vi/1kUE0BZtTRc/hqdefault.jpg",
    durationSeconds: 310,
    durationFormatted: "05:10",
    cefrLevel: "C1",
    supportedTypes: "BOTH",
    categoryId: "cat_ielts_listen",
    categorySlug: "ielts-listening",
    categoryName: "IELTS Nghe & Thuyết Trình",
    accent: "en-AU",
    wpmSpeed: 155,
    viewCount: 2890,
    studyCount: 1120,
    segments: [
      {
        orderIndex: 0,
        startTime: 1.0,
        endTime: 6.8,
        text: "Transitioning toward renewable energy is not solely an environmental prerogative, but an economic imperative.",
        translationVi: "Chuyển đổi sang năng lượng tái tạo không chỉ là một đặc quyền về môi trường, mà còn là một mệnh lệnh kinh tế tất yếu.",
        ipaUs: "/trænˈzɪʃənɪŋ təˈwɔrd rɪˈnuəbəl ˈɛnərdʒi ɪz nɑt ˈsoʊlli ən ɪnˌvaɪrənˈmɛntəl prɪˈrɑɡətɪv/",
        properNouns: [],
        keywords: ["renewable energy", "environmental", "economic imperative"],
      },
      {
        orderIndex: 1,
        startTime: 7.2,
        endTime: 13.5,
        text: "Solar and wind infrastructure costs have plummeted by more than eighty percent over the past decade.",
        translationVi: "Chi phí cơ sở hạ tầng năng lượng mặt trời và gió đã giảm mạnh hơn 80% trong thập kỷ qua.",
        ipaUs: "/ˈsoʊlər ænd wɪnd ˌɪnfrəˈstrʌktʃər kɔsts hæv ˈplʌmɪtɪd baɪ mɔr ðæn ˈeɪti pərˈsɛnt/",
        properNouns: [],
        keywords: ["solar", "wind infrastructure", "plummeted", "decade"],
      },
      {
        orderIndex: 2,
        startTime: 14.0,
        endTime: 20.5,
        text: "Consequently, emerging economies can leapfrog traditional fossil fuel reliance and foster sustainable grid systems.",
        translationVi: "Do đó, các nền kinh tế mới nổi có thể đi tắt đón đầu, bỏ qua sự phụ thuộc vào nhiên liệu hóa thạch truyền thống để phát triển mạng lưới điện bền vững.",
        ipaUs: "/ˈkɑnsəkwəntli ɪˈmɜrdʒɪŋ ɪˈkɑnəmiz kæn ˈlipˌfrɔɡ trəˈdɪʃənəl ˈfɑsəl fjuəl/",
        properNouns: [],
        keywords: ["leapfrog", "fossil fuel", "sustainable grid"],
      },
    ],
  },

  // 6. Leadership & Tech: Jensen Huang on Elon Musk Supercomputer
  {
    id: "1481dc60-fe8a-4fa9-830b-9a227ede9b6e",
    slug: "jensen-huang-elon-musk-supercomputer",
    title: "Jensen Huang: How Elon Musk Built the World's Fastest Supercomputer in 19 Days",
    description: "NVIDIA CEO Jensen Huang phân tích kỳ tích kỹ thuật phi thường khi Elon Musk và đội ngũ xAI thiết lập cụm siêu máy tính 100.000 GPU trong thời gian kỷ lục 19 ngày.",
    sourceType: "YOUTUBE",
    externalId: "lpLFjQ-bRv8",
    thumbnailUrl: "https://img.youtube.com/vi/lpLFjQ-bRv8/hqdefault.jpg",
    durationSeconds: 109,
    durationFormatted: "01:49",
    cefrLevel: "B2",
    supportedTypes: "BOTH",
    categoryId: "cat_science_tech",
    categorySlug: "science-tech",
    categoryName: "Khoa Học & Công Nghệ",
    accent: "en-US",
    wpmSpeed: 155,
    viewCount: 6420,
    studyCount: 2310,
    segments: [
      {
        orderIndex: 0,
        startTime: 0.08,
        endTime: 16.50,
        text: "From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is like superhuman, right?",
        translationVi: "Từ lúc lên ý tưởng đến khi xây dựng một nhà máy khổng lồ, làm mát bằng chất lỏng, cấp điện và cấp phép trong khoảng thời gian ngắn ngủi như vậy, điều đó thực sự phi thường, đúng không?",
        ipaUs: "/frʌm ðə ˈmoʊmənt əv ˈkɑːnsept tu ˈbɪldɪŋ ə ˈmæsɪv ˈfæktəri ˈlɪkwɪd kuːld ˈenərdʒaɪzd pərˈmɪtɪd ɪn ðə ʃɔːrt taɪm ðæt wəz dʌn ðæt ɪz laɪk ˌsuːpərˈhjuːmən raɪt/",
        properNouns: [],
        keywords: ["concept", "massive factory", "liquid-cooled", "energized", "permitted", "superhuman"],
      },
      {
        orderIndex: 1,
        startTime: 16.50,
        endTime: 20.40,
        text: "And as far as I know, there's only one person in the world who could do that.",
        translationVi: "Và theo tôi được biết, chỉ có một người duy nhất trên thế giới có thể làm được điều đó.",
        ipaUs: "/ænd æz fɑːr æz aɪ noʊ ðerz ˈoʊnli wʌn ˈpɜːrsn ɪn ðə wɜːrld huː kəd duː ðæt/",
        properNouns: [],
        keywords: ["as far as I know", "only one person", "world"],
      },
      {
        orderIndex: 2,
        startTime: 20.40,
        endTime: 31.16,
        text: "You know, I mean Elon is singular in this understanding of engineering, and construction, and large systems, and marshaling resources, it's unbelievable.",
        translationVi: "Ý tôi là Elon thực sự độc nhất vô nhị trong hiểu biết về kỹ thuật, xây dựng, các hệ thống quy mô lớn và huy động nguồn lực, điều đó thật khó tin.",
        ipaUs: "/juː noʊ aɪ miːn ˈiːlɑːn ɪz ˈsɪŋɡjələr ɪn ðɪs ˌʌndərˈstændɪŋ əv ˌendʒɪˈnɪrɪŋ ænd kənˈstrʌkʃn ænd lɑːrdʒ ˈsɪstəmz ænd ˈmɑːrʃəlɪŋ ˈriːsɔːrsɪz ɪts ˌʌnbɪˈliːvəbl/",
        properNouns: ["Elon", "Elon Musk"],
        keywords: ["singular", "engineering", "construction", "large systems", "marshaling resources", "unbelievable"],
      },
      {
        orderIndex: 3,
        startTime: 31.16,
        endTime: 34.40,
        text: "And of course, then his engineering team is extraordinary.",
        translationVi: "Và tất nhiên, đội ngũ kỹ sư của anh ấy cũng thật phi thường.",
        ipaUs: "/ænd əv kɔːrs ðen hɪz ˌendʒɪˈnɪrɪŋ tiːm ɪz ɪkˈstrɔːrdəneri/",
        properNouns: [],
        keywords: ["of course", "engineering team", "extraordinary"],
      },
      {
        orderIndex: 4,
        startTime: 34.40,
        endTime: 45.60,
        text: "And from the moment that we decided to go, the planning with our engineering team, our networking team, our infrastructure computing team, the software team, all of the preparation in advance.",
        translationVi: "Và từ khoảnh khắc chúng tôi quyết định bắt đầu, khâu lên kế hoạch cùng đội ngũ kỹ sư, đội ngũ mạng, đội ngũ hạ tầng điện toán, đội ngũ phần mềm, tất cả đều được chuẩn bị từ trước.",
        ipaUs: "/ænd frʌm ðə ˈmoʊmənt ðæt wi dɪˈsaɪdɪd tu ɡoʊ ðə ˈplænɪŋ wɪð ˈaʊər ˌendʒɪˈnɪrɪŋ tiːm ˈaʊər ˈnetwɜːrkɪŋ tiːm ˈaʊər ˈɪnfrəstrʌktʃər kəmˈpjuːtɪŋ tiːm ðə ˈsɔːftwer tiːm ɔːl əv ðə ˌprepəˈreɪʃn ɪn ədˈvæns/",
        properNouns: [],
        keywords: ["planning", "networking team", "infrastructure computing", "software team", "preparation in advance"],
      },
      {
        orderIndex: 5,
        startTime: 45.60,
        endTime: 56.44,
        text: "Then all of the infrastructure, all of the logistics, and the amount of technology and equipment that came in on that day to train in 19 days.",
        translationVi: "Rồi toàn bộ cơ sở hạ tầng, toàn bộ hậu cần, cùng khối lượng công nghệ và thiết bị khổng lồ đổ về vào ngày hôm đó để bắt đầu vận hành huấn luyện trong 19 ngày.",
        ipaUs: "/ðen ɔːl əv ðə ˈɪnfrəstrʌktʃər ɔːl əv ðə ləˈdʒɪstɪks ænd ðə əˈmaʊnt əv tekˈnɑːlədʒi ænd ɪˈkwɪpmənt ðæt keɪm ɪn ɑːn ðæt deɪ tu treɪn ɪn naɪnˈtiːn deɪz/",
        properNouns: ["19 days"],
        keywords: ["infrastructure", "logistics", "technology", "equipment", "19 days"],
      },
      {
        orderIndex: 6,
        startTime: 56.44,
        endTime: 65.50,
        text: "19 days! 19 days is incredible. But it's also kind of nice to just take a step back, you know how many days 19 days is? It's just a couple of weeks.",
        translationVi: "19 ngày! 19 ngày thật khó tin. Nhưng cũng nên nhìn lại một chút, bạn có biết 19 ngày là bao nhiêu không? Chỉ là vài tuần ngắn ngủi.",
        ipaUs: "/naɪnˈtiːn deɪz naɪnˈtiːn deɪz ɪz ɪnˈkredəbl bʌt ɪts ˈɔːlsoʊ kaɪnd əv naɪs tu dʒʌst teɪk ə step bæk juː noʊ haʊ ˈmeni deɪz naɪnˈtiːn deɪz ɪz ɪts dʒʌst ə ˈkʌpl əv wiːks/",
        properNouns: [],
        keywords: ["19 days", "incredible", "take a step back", "couple of weeks"],
      },
      {
        orderIndex: 7,
        startTime: 65.50,
        endTime: 76.80,
        text: "And the mountain of technology, if you're ever to see it, is unbelievable: all of the wiring and the networking, just getting this mountain of technology integrated, and all the software. Incredible, right?",
        translationVi: "Và khối lượng công nghệ đồ sộ, nếu bạn từng tận mắt chứng kiến thì thật không thể tin được: toàn bộ hệ thống dây nối và mạng kết nối, chỉ việc tích hợp khối công nghệ khổng lồ này và tất cả phần mềm. Thật phi thường, đúng không?",
        ipaUs: "/ænd ðə ˈmaʊntn əv tekˈnɑːlədʒi ɪf jʊr ˈevər tu siː ɪt ɪz ˌʌnbɪˈliːvəbl ɔːl əv ðə ˈwaɪərɪŋ ænd ðə ˈnetwɜːrkɪŋ dʒʌst ˈɡetɪŋ ðɪs ˈmaʊntn əv tekˈnɑːlədʒi ˈɪntɪɡreɪtɪd ænd ɔːl ðə ˈsɔːftwer ɪnˈkredəbl raɪt/",
        properNouns: [],
        keywords: ["mountain of technology", "wiring", "networking", "integrated", "software"],
      },
      {
        orderIndex: 8,
        startTime: 76.80,
        endTime: 91.50,
        text: "Yeah, so I think what Elon and the xAI team did, what they achieved is singular, never been done before. Just to put in perspective: 100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.",
        translationVi: "Vâng, nên tôi nghĩ những gì Elon và đội ngũ xAI đã làm, những gì họ đạt được là độc nhất vô nhị, chưa từng có tiền lệ. Để dễ hình dung: 100.000 GPU, đó chắc chắn là siêu máy tính nhanh nhất hành tinh dưới dạng một cụm duy nhất.",
        ipaUs: "/jeə soʊ aɪ θɪŋk wʌt ˈiːlɑːn ænd ðə ˌeks eɪ ˈaɪ tiːm dɪd wʌt ðeɪ əˈtʃiːvd ɪz ˈsɪŋɡjələr ˈnevər bɪn dʌn bɪˈfɔːr dʒʌst tu pʊt ɪn pərˈspektɪv wʌn ˈhʌndrəd ˈθaʊznd ˌdʒiː piː ˈjuːz ðæts ˈiːzəli ðə ˈfæstɪst ˈsuːpərkəmpjuːtər ɑːn ðə ˈplænɪt æz wʌn ˈklʌstər/",
        properNouns: ["Elon", "xAI", "GPU"],
        keywords: ["achieved", "singular", "100,000 GPUs", "fastest supercomputer", "cluster"],
      },
      {
        orderIndex: 9,
        startTime: 91.50,
        endTime: 109.04,
        text: "A supercomputer that you would build would take normally three years to plan, right? And then they deliver the equipment and it takes one year to get it all working. Yes, we're talking about 19 days.",
        translationVi: "Một siêu máy tính thông thường bạn xây dựng phải mất ba năm để lên kế hoạch, đúng không? Rồi họ bàn giao thiết bị và mất thêm một năm nữa để đưa tất cả vào hoạt động. Ở đây chúng ta đang nói về 19 ngày.",
        ipaUs: "/ə ˈsuːpərkəmpjuːtər ðæt juː wʊd bɪld wʊd teɪk ˈnɔːrməli θriː jɪrz tu plæn raɪt ænd ðen ðeɪ dɪˈlɪvər ðə ɪˈkwɪpmənt ænd ɪt teɪks wʌn jɪr tu ɡet ɪt ɔːl ˈwɜːrkɪŋ jes wɪr ˈtɔːkɪŋ əˈbaʊt naɪnˈtiːn deɪz/",
        properNouns: ["19 days"],
        keywords: ["supercomputer", "normally three years", "deliver equipment", "one year", "19 days"],
      },
    ],
  },
];

export const videoCatalogLessons = MOCK_VIDEO_LESSONS;
