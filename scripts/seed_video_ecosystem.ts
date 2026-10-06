import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SeedCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  thumbnail: string;
  orderIndex: number;
  isFeatured: boolean;
}

interface SeedPlaylist {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  categorySlug: string;
  channelName: string;
  orderIndex: number;
}

interface SeedSegment {
  orderIndex: number;
  startTime: number;
  endTime: number;
  text: string;
  translationVi: string;
  properNouns?: string[];
  keywords?: string[];
}

interface SeedLesson {
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  playlistSlug: string;
  externalId: string;
  thumbnailUrl: string;
  durationSeconds: number;
  durationFormatted: string;
  cefrLevel: string;
  accent: string;
  wpmSpeed: number;
  segments: SeedSegment[];
}

const CATEGORIES: SeedCategory[] = [
  {
    slug: "ted-ed",
    name: "TED-Ed & Tư duy phản biện",
    description: "Các bài diễn thuyết truyền cảm hứng và hoạt hình giáo dục khai phá tư duy từ những bộ óc hàng đầu thế giới.",
    icon: "Sparkles",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    orderIndex: 1,
    isFeatured: true,
  },
  {
    slug: "bbc-6-minute",
    name: "BBC 6 Minute English",
    description: "Chuỗi bài nghe chuẩn Anh - Anh từ đài BBC với các chủ đề xã hội, văn hóa và giải thích từ vựng chuyên sâu.",
    icon: "Radio",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
    orderIndex: 2,
    isFeatured: true,
  },
  {
    slug: "ielts-listening",
    name: "IELTS Listening Chuẩn quốc tế",
    description: "Luyện nghe học thuật từ Section 1 đến Section 4 với giọng nói đa dạng từ Anh, Úc, Mỹ, New Zealand.",
    icon: "GraduationCap",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    orderIndex: 3,
    isFeatured: true,
  },
  {
    slug: "daily-conversations",
    name: "Giao tiếp đời thực & Hội thoại",
    description: "Các mẫu câu đàm thoại hàng ngày, khẩu ngữ và phản xạ nói tự nhiên trong mọi tình huống đời sống.",
    icon: "MessageSquare",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    orderIndex: 4,
    isFeatured: true,
  },
  {
    slug: "kurzgesagt",
    name: "Khoa học & Vũ trụ Kurzgesagt",
    description: "Hình họa đỉnh cao, giọng đọc truyền cảm về các chủ đề sinh học, vũ trụ, công nghệ tương lai.",
    icon: "Compass",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    orderIndex: 5,
    isFeatured: false,
  },
  {
    slug: "toeic-listening",
    name: "TOEIC Luyện nghe cấp tốc",
    description: "Trọng tâm Part 1, 2, 3, 4 theo định dạng đề thi ETS mới nhất, sát với ngữ cảnh làm việc quốc tế.",
    icon: "Target",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    orderIndex: 6,
    isFeatured: false,
  },
  {
    slug: "business-english",
    name: "Tiếng Anh thương mại & Công sở",
    description: "Kỹ năng đàm phán, thuyết trình, viết email công việc và phỏng vấn tuyển dụng chuyên nghiệp.",
    icon: "Briefcase",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    orderIndex: 7,
    isFeatured: false,
  },
  {
    slug: "music-english",
    name: "Âm nhạc & Nối âm tự nhiên",
    description: "Luyện cảm âm, nhận biết hiện tượng nối âm, nuốt âm và ngữ điệu qua những giai điệu bài hát bất hủ.",
    icon: "Music",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    orderIndex: 8,
    isFeatured: false,
  },
];

const PLAYLISTS: SeedPlaylist[] = [
  {
    slug: "ted-ed-brain-power",
    title: "TED-Ed: Khám phá sức mạnh não bộ",
    description: "Những bài học hoạt hình thú vị về cách bộ não con người học tập và ghi nhớ.",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    categorySlug: "ted-ed",
    channelName: "TED-Ed",
    orderIndex: 1,
  },
  {
    slug: "bbc-6min-lifestyle",
    title: "BBC 6 Minute English: Phong cách sống hiện đại",
    description: "Những bài nghe ngắn gọn 6 phút giúp làm giàu vốn từ vựng xã hội.",
    thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    categorySlug: "bbc-6-minute",
    channelName: "BBC Learning English",
    orderIndex: 1,
  },
  {
    slug: "ielts-cambridge-listening",
    title: "IELTS Master: Kỹ năng bắt từ khóa",
    description: "Luyện tập các đoạn hội thoại chuyên sâu cho phần thi nghe IELTS.",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    categorySlug: "ielts-listening",
    channelName: "IELTS Official",
    orderIndex: 1,
  },
  {
    slug: "daily-city-life",
    title: "Giao tiếp thành phố: Ẩm thực & Mua sắm",
    description: "Các tình huống gọi món, hỏi đường, mua đồ tại cửa hàng nước ngoài.",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    categorySlug: "daily-conversations",
    channelName: "Daily English Practice",
    orderIndex: 1,
  },
  {
    slug: "kurzgesagt-cosmos",
    title: "Kurzgesagt: Khám phá Vũ trụ vô tận",
    description: "Những bí ẩn khoa học vũ trụ kỳ vĩ được mô phỏng sinh động.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    categorySlug: "kurzgesagt",
    channelName: "Kurzgesagt – In a Nutshell",
    orderIndex: 1,
  },
  {
    slug: "toeic-office-announcements",
    title: "TOEIC Part 4: Thông báo công sở & Sân bay",
    description: "Bộ đề chuẩn luyện nghe thông báo hội nghị, chuyến bay và lịch trình.",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    categorySlug: "toeic-listening",
    channelName: "ETS TOEIC Prep",
    orderIndex: 1,
  },
  {
    slug: "business-career-talks",
    title: "Phỏng vấn & Đàm phán chuyên nghiệp",
    description: "Cách trả lời phỏng vấn xin việc và thương lượng hợp đồng thành công.",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    categorySlug: "business-english",
    channelName: "Business English Pod",
    orderIndex: 1,
  },
  {
    slug: "music-acoustic-hits",
    title: "Acoustic Pop Hits: Học tiếng Anh qua lời hát",
    description: "Cảm nhận cách nối âm và phát âm tự nhiên qua những bản nhạc acoustic êm dịu.",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    categorySlug: "music-english",
    channelName: "English Songs Club",
    orderIndex: 1,
  },
];

const CURATED_LESSONS: SeedLesson[] = [
  // 1. Steve Jobs Stanford Commencement (Classic)
  {
    slug: "steve-jobs-stanford-commencement",
    title: "Steve Jobs' 2005 Stanford Commencement Address",
    description: "Bài diễn thuyết huyền thoại của Steve Jobs về việc kết nối các dấu mốc trong cuộc đời, tình yêu, sự mất mát và cái chết.",
    categorySlug: "ted-ed",
    playlistSlug: "ted-ed-brain-power",
    externalId: "UF8uR6Z6KLc",
    thumbnailUrl: "https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
    durationSeconds: 904,
    durationFormatted: "15:04",
    cefrLevel: "B2",
    accent: "en-US",
    wpmSpeed: 142,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 4.3,
        text: "I am honored to be with you today at your commencement from one of the finest universities in the world.",
        translationVi: "Tôi rất vinh dự được có mặt cùng các bạn hôm nay tại lễ tốt nghiệp từ một trong những trường đại học xuất sắc nhất thế giới.",
        properNouns: [],
        keywords: ["honored", "commencement", "finest", "universities"],
      },
      {
        orderIndex: 2,
        startTime: 4.8,
        endTime: 9.1,
        text: "I never graduated from college. Truth be told, this is the closest I've ever gotten to a college graduation.",
        translationVi: "Tôi chưa từng tốt nghiệp đại học. Thú thật thì đây là lần tôi đến gần nhất với một lễ tốt nghiệp đại học.",
        properNouns: [],
        keywords: ["graduated", "college", "graduation", "closest"],
      },
      {
        orderIndex: 3,
        startTime: 9.8,
        endTime: 14.5,
        text: "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories.",
        translationVi: "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện từ cuộc đời tôi. Chỉ vậy thôi. Không có gì to tát. Chỉ ba câu chuyện.",
        properNouns: [],
        keywords: ["stories", "life", "deal"],
      },
      {
        orderIndex: 4,
        startTime: 15.2,
        endTime: 19.8,
        text: "The first story is about connecting the dots.",
        translationVi: "Câu chuyện đầu tiên là về việc kết nối những dấu mốc.",
        properNouns: [],
        keywords: ["connecting", "dots"],
      },
      {
        orderIndex: 5,
        startTime: 20.4,
        endTime: 26.2,
        text: "I dropped out of Reed College after the first six months, but then stayed around as a drop-in for another eighteen months or so before I really quit.",
        translationVi: "Tôi đã bỏ học tại Cao đẳng Reed sau sáu tháng đầu tiên, nhưng sau đó vẫn ở lại dự thính thêm khoảng 18 tháng trước khi thực sự từ bỏ.",
        properNouns: ["Reed College"],
        keywords: ["dropped", "eighteen", "months"],
      },
      {
        orderIndex: 6,
        startTime: 27.0,
        endTime: 32.5,
        text: "You can't connect the dots looking forward; you can only connect them looking backwards.",
        translationVi: "Bạn không thể kết nối các dấu mốc khi nhìn về phía trước; bạn chỉ có thể kết nối chúng khi nhìn lại phía sau.",
        properNouns: [],
        keywords: ["connect", "forward", "backwards"],
      },
      {
        orderIndex: 7,
        startTime: 33.1,
        endTime: 39.0,
        text: "So you have to trust that the dots will somehow connect in your future.",
        translationVi: "Vì vậy bạn phải tin rằng những dấu mốc bằng cách nào đó sẽ kết nối với nhau trong tương lai của bạn.",
        properNouns: [],
        keywords: ["trust", "somehow", "future"],
      },
      {
        orderIndex: 8,
        startTime: 39.8,
        endTime: 46.5,
        text: "You have to trust in something — your gut, destiny, life, karma, whatever.",
        translationVi: "Bạn phải tin vào một điều gì đó — trực giác, số phận, cuộc đời, nhân quả, bất cứ điều gì.",
        properNouns: [],
        keywords: ["destiny", "karma", "gut"],
      },
    ],
  },

  // 2. BBC 6 Minute English: How to boost your brain
  {
    slug: "bbc-6min-brain-boost",
    title: "BBC 6 Minute English: Can You Boost Your Brainpower?",
    description: "Neil và Sam thảo luận về các phương pháp khoa học đã được chứng minh giúp cải thiện trí nhớ và khả năng tập trung của não bộ.",
    categorySlug: "bbc-6-minute",
    playlistSlug: "bbc-6min-lifestyle",
    externalId: "doOlP7NLUwc",
    thumbnailUrl: "https://img.youtube.com/vi/doOlP7NLUwc/hqdefault.jpg",
    durationSeconds: 372,
    durationFormatted: "06:12",
    cefrLevel: "B1",
    accent: "en-GB",
    wpmSpeed: 135,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 4.8,
        text: "Hello and welcome to Six Minute English from BBC Learning English. I am Neil.",
        translationVi: "Xin chào và chào mừng bạn đến với chương trình 6 Phút Tiếng Anh của BBC Learning English. Tôi là Neil.",
        properNouns: ["Six Minute English", "BBC Learning English", "Neil"],
        keywords: ["welcome", "learning", "minute"],
      },
      {
        orderIndex: 2,
        startTime: 5.2,
        endTime: 9.6,
        text: "And I am Sam. Today we are talking about memory and brainpower.",
        translationVi: "Và tôi là Sam. Hôm nay chúng ta sẽ cùng nói về trí nhớ và sức mạnh não bộ.",
        properNouns: ["Sam"],
        keywords: ["memory", "brainpower", "talking"],
      },
      {
        orderIndex: 3,
        startTime: 10.1,
        endTime: 16.5,
        text: "Have you ever walked into a room and completely forgotten what you went in there for?",
        translationVi: "Đã bao giờ bạn bước vào một căn phòng và hoàn toàn quên mất mình vào đó để làm gì chưa?",
        properNouns: [],
        keywords: ["completely", "forgotten", "walked"],
      },
      {
        orderIndex: 4,
        startTime: 17.0,
        endTime: 22.8,
        text: "Oh, all the time, Neil! It's so frustrating when your mind just goes blank.",
        translationVi: "Ồ, lúc nào cũng vậy Neil à! Thật bực bội khi đầu óc mình đột nhiên trống rỗng.",
        properNouns: ["Neil"],
        keywords: ["frustrating", "blank", "mind"],
      },
      {
        orderIndex: 5,
        startTime: 23.4,
        endTime: 30.2,
        text: "Well, neuroscientists say regular physical exercise and adequate sleep can significantly boost cognitive performance.",
        translationVi: "Các nhà khoa học thần kinh cho biết việc tập thể dục đều đặn và ngủ đủ giấc có thể tăng cường đáng kể hiệu suất nhận thức.",
        properNouns: [],
        keywords: ["neuroscientists", "adequate", "significantly", "cognitive"],
      },
      {
        orderIndex: 6,
        startTime: 30.8,
        endTime: 37.5,
        text: "That means moving your body doesn't just build muscles, it literally builds new brain connections.",
        translationVi: "Điều đó có nghĩa là vận động cơ thể không chỉ xây dựng cơ bắp, mà nó thực sự tạo ra các liên kết não bộ mới.",
        properNouns: [],
        keywords: ["muscles", "literally", "connections"],
      },
    ],
  },

  // 3. IELTS Listening Section 2: University Campus Tour
  {
    slug: "ielts-campus-library-orientation",
    title: "IELTS Listening: University Campus & Library Orientation",
    description: "Đoạn thuyết trình hướng dẫn sinh viên mới tham quan khuôn viên đại học và các quy định mượn sách thư viện.",
    categorySlug: "ielts-listening",
    playlistSlug: "ielts-cambridge-listening",
    externalId: "3e734b61-ielts",
    thumbnailUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    durationSeconds: 245,
    durationFormatted: "04:05",
    cefrLevel: "B2",
    accent: "en-AU",
    wpmSpeed: 140,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 5.2,
        text: "Good morning, everyone, and welcome to the North Campus orientation tour.",
        translationVi: "Chào buổi sáng mọi người, và chào mừng các bạn đến với chuyến tham quan định hướng Cơ sở phía Bắc.",
        properNouns: ["North Campus"],
        keywords: ["orientation", "campus", "welcome"],
      },
      {
        orderIndex: 2,
        startTime: 5.8,
        endTime: 11.4,
        text: "My name is Sarah, and I will be guiding you through our main academic facilities today.",
        translationVi: "Tên tôi là Sarah, và hôm nay tôi sẽ hướng dẫn các bạn đi qua các cơ sở học tập chính của chúng ta.",
        properNouns: ["Sarah"],
        keywords: ["guiding", "academic", "facilities"],
      },
      {
        orderIndex: 3,
        startTime: 12.0,
        endTime: 18.5,
        text: "First on our itinerary is the Central Science Library, which underwent major refurbishment last semester.",
        translationVi: "Điểm đến đầu tiên trong lịch trình là Thư viện Khoa học Trung tâm, nơi vừa trải qua đợt nâng cấp lớn vào học kỳ trước.",
        properNouns: ["Central Science Library"],
        keywords: ["itinerary", "underwent", "refurbishment", "semester"],
      },
      {
        orderIndex: 4,
        startTime: 19.1,
        endTime: 25.6,
        text: "Undergraduate students are permitted to borrow up to twelve books simultaneously for a duration of two weeks.",
        translationVi: "Sinh viên đại học được phép mượn tối đa 12 cuốn sách cùng lúc trong thời hạn hai tuần.",
        properNouns: [],
        keywords: ["undergraduate", "permitted", "simultaneously", "duration"],
      },
      {
        orderIndex: 5,
        startTime: 26.2,
        endTime: 32.8,
        text: "Please take note that automated renewal is available online via your student portal.",
        translationVi: "Xin lưu ý rằng việc gia hạn tự động có thể thực hiện trực tuyến thông qua cổng thông tin sinh viên của các bạn.",
        properNouns: [],
        keywords: ["automated", "renewal", "portal"],
      },
    ],
  },

  // 4. Daily Conversations: Ordering Coffee & Pastries
  {
    slug: "daily-ordering-at-coffee-shop",
    title: "Daily English: Ordering Coffee & Breakfast at a Café",
    description: "Hội thoại thực tế giữa khách hàng và nhân viên pha chế: gọi món, tùy chỉnh kích cỡ ly cà phê và thanh toán.",
    categorySlug: "daily-conversations",
    playlistSlug: "daily-city-life",
    externalId: "AK42GhbTZ9w",
    thumbnailUrl: "https://img.youtube.com/vi/AK42GhbTZ9w/hqdefault.jpg",
    durationSeconds: 165,
    durationFormatted: "02:45",
    cefrLevel: "A2",
    accent: "en-US",
    wpmSpeed: 120,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 3.5,
        text: "Hi there! What can I get started for you today?",
        translationVi: "Xin chào quý khách! Hôm nay quý khách muốn dùng món gì ạ?",
        properNouns: [],
        keywords: ["started", "today"],
      },
      {
        orderIndex: 2,
        startTime: 4.0,
        endTime: 9.8,
        text: "Hi! Could I please get a medium oat milk latte and a warm blueberry muffin?",
        translationVi: "Chào bạn! Cho mình một ly latte sữa yến mạch cỡ vừa và một chiếc bánh muffin việt quất hâm nóng nhé?",
        properNouns: [],
        keywords: ["medium", "latte", "blueberry", "muffin"],
      },
      {
        orderIndex: 3,
        startTime: 10.3,
        endTime: 15.1,
        text: "Sure thing! Would you like that hot or iced? And for here or to go?",
        translationVi: "Dạ chắc chắn rồi! Quý khách muốn uống nóng hay đá ạ? Và dùng tại quán hay mang đi?",
        properNouns: [],
        keywords: ["iced", "here"],
      },
      {
        orderIndex: 4,
        startTime: 15.6,
        endTime: 20.2,
        text: "Iced, please, and to go. Could you make it with extra ice?",
        translationVi: "Uống đá giúp mình, và mang đi nhé. Cho mình xin thêm nhiều đá được không?",
        properNouns: [],
        keywords: ["extra", "please"],
      },
      {
        orderIndex: 5,
        startTime: 20.8,
        endTime: 26.5,
        text: "You got it. That will be six dollars and seventy-five cents. Tap your card right on the reader.",
        translationVi: "Được luôn ạ. Của bạn hết 6 đô la 75 xu. Bạn chạm thẻ vào đầu đọc nhé.",
        properNouns: [],
        keywords: ["dollars", "cents", "reader"],
      },
    ],
  },

  // 5. Kurzgesagt: What if the Earth stopped spinning?
  {
    slug: "kurzgesagt-earth-spinning",
    title: "Kurzgesagt: What Happens If Earth Stops Spinning?",
    description: "Một kịch bản khoa học viễn tưởng hấp dẫn giải thích động lực học hành tinh và hậu quả thảm khốc nếu Trái Đất ngừng quay.",
    categorySlug: "kurzgesagt",
    playlistSlug: "kurzgesagt-cosmos",
    externalId: "tybKnGZRwcU",
    thumbnailUrl: "https://img.youtube.com/vi/tybKnGZRwcU/hqdefault.jpg",
    durationSeconds: 520,
    durationFormatted: "08:40",
    cefrLevel: "B2",
    accent: "en-US",
    wpmSpeed: 145,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 5.6,
        text: "Right now, you are hurtling through space on a rock traveling at dizzying speeds.",
        translationVi: "Ngay lúc này, bạn đang lao qua không gian trên một tảng đá di chuyển với vận tốc chóng mặt.",
        properNouns: [],
        keywords: ["hurtling", "traveling", "dizzying"],
      },
      {
        orderIndex: 2,
        startTime: 6.1,
        endTime: 12.0,
        text: "At the equator, the surface of Earth moves at about sixteen hundred kilometers per hour.",
        translationVi: "Tại đường xích đạo, bề mặt Trái Đất di chuyển với tốc độ khoảng một nghìn sáu trăm km mỗi giờ.",
        properNouns: ["Earth"],
        keywords: ["equator", "surface", "kilometers"],
      },
      {
        orderIndex: 3,
        startTime: 12.5,
        endTime: 18.2,
        text: "So what would happen if the planet suddenly came to an absolute dead stop?",
        translationVi: "Vậy điều gì sẽ xảy ra nếu hành tinh của chúng ta đột ngột dừng lại hoàn toàn?",
        properNouns: [],
        keywords: ["planet", "suddenly", "absolute"],
      },
      {
        orderIndex: 4,
        startTime: 18.8,
        endTime: 25.5,
        text: "Due to inertia, everything not bolted directly to bedrock would immediately fly eastward at catastrophic velocity.",
        translationVi: "Do quán tính, mọi vật thể không gắn chặt vào nền đá ngầm sẽ ngay lập tức bay về phía đông với vận tốc kinh hoàng.",
        properNouns: [],
        keywords: ["inertia", "bedrock", "catastrophic", "velocity"],
      },
      {
        orderIndex: 26.0,
        startTime: 26.0,
        endTime: 32.4,
        text: "Massive tsunamis would sweep across continents, reshaping global geography in minutes.",
        translationVi: "Những đợt sóng thần khổng lồ sẽ quét qua các lục địa, tái định hình lại địa lý toàn cầu chỉ trong vài phút.",
        properNouns: [],
        keywords: ["massive", "tsunamis", "continents", "geography"],
      },
    ],
  },

  // 6. TOEIC Part 4: Airport Flight Announcement
  {
    slug: "toeic-airport-gate-change-announcement",
    title: "TOEIC Part 4: Gate Change & Boarding Announcement",
    description: "Đoạn thông báo phát thanh tại sân bay về sự cố thay đổi cửa khởi hành và quy trình ưu tiên lên máy bay.",
    categorySlug: "toeic-listening",
    playlistSlug: "toeic-office-announcements",
    externalId: "unnamed-toeic-gate",
    thumbnailUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    durationSeconds: 45,
    durationFormatted: "00:45",
    cefrLevel: "B1",
    accent: "en-US",
    wpmSpeed: 130,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 4.8,
        text: "Attention all passengers traveling on Flight 482 to Chicago O'Hare International Airport.",
        translationVi: "Xin quý hành khách trên chuyến bay 482 tới Sân bay Quốc tế Chicago O'Hare lưu ý.",
        properNouns: ["Flight 482", "Chicago O'Hare International Airport"],
        keywords: ["passengers", "international", "attention"],
      },
      {
        orderIndex: 2,
        startTime: 5.2,
        endTime: 10.5,
        text: "Due to unscheduled maintenance, our departure gate has been relocated from Gate B12 to Gate C18.",
        translationVi: "Do việc bảo trì đột xuất, cửa khởi hành của chúng ta đã được chuyển từ Cửa B12 sang Cửa C18.",
        properNouns: ["Gate B12", "Gate C18"],
        keywords: ["unscheduled", "maintenance", "departure", "relocated"],
      },
      {
        orderIndex: 3,
        startTime: 11.0,
        endTime: 16.5,
        text: "We will commence boarding in approximately ten minutes, beginning with military personnel and families with small children.",
        translationVi: "Chúng tôi sẽ bắt đầu cho hành khách lên máy bay trong khoảng mười phút nữa, ưu tiên quân nhân và gia đình có trẻ nhỏ.",
        properNouns: [],
        keywords: ["commence", "boarding", "personnel", "approximately"],
      },
      {
        orderIndex: 4,
        startTime: 17.0,
        endTime: 22.0,
        text: "Please have your government-issued identification and boarding pass ready for scanning.",
        translationVi: "Quý khách vui lòng chuẩn bị sẵn giấy tờ tùy thân do chính phủ cấp và thẻ lên máy bay để quét mã.",
        properNouns: [],
        keywords: ["identification", "scanning", "government"],
      },
    ],
  },

  // 7. Business English: Salary Negotiation
  {
    slug: "business-salary-negotiation-tactics",
    title: "Business English: How to Confidently Negotiate Your Salary",
    description: "Các chiến lược đàm phán lương bổng khéo léo, lập luận về giá trị bản thân và phản hồi đề xuất từ nhà tuyển dụng.",
    categorySlug: "business-english",
    playlistSlug: "business-career-talks",
    externalId: "lpLFjQ-bRv8",
    thumbnailUrl: "https://img.youtube.com/vi/lpLFjQ-bRv8/hqdefault.jpg",
    durationSeconds: 310,
    durationFormatted: "05:10",
    cefrLevel: "B2",
    accent: "en-US",
    wpmSpeed: 138,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 5.2,
        text: "Negotiating your compensation package is one of the most critical conversations in your professional career.",
        translationVi: "Thương lượng gói thu nhập là một trong những cuộc trao đổi then chốt nhất trong sự nghiệp chuyên môn của bạn.",
        properNouns: [],
        keywords: ["compensation", "critical", "professional", "career"],
      },
      {
        orderIndex: 2,
        startTime: 5.8,
        endTime: 11.5,
        text: "Never state your desired number first. Instead, anchor your request around industry benchmarks and quantifiable achievements.",
        translationVi: "Đừng bao giờ đưa ra con số mong muốn trước. Thay vào đó, hãy dựa vào mức chuẩn của ngành và những thành tựu có thể đo lường được.",
        properNouns: [],
        keywords: ["benchmarks", "quantifiable", "achievements"],
      },
      {
        orderIndex: 3,
        startTime: 12.0,
        endTime: 18.2,
        text: "When they make an initial offer, express genuine enthusiasm before requesting time to review the complete benefits structure.",
        translationVi: "Khi họ đưa ra lời đề nghị ban đầu, hãy bày tỏ sự hào hứng chân thành trước khi xin thêm thời gian xem xét toàn bộ cơ cấu phúc lợi.",
        properNouns: [],
        keywords: ["genuine", "enthusiasm", "benefits", "structure"],
      },
      {
        orderIndex: 4,
        startTime: 18.8,
        endTime: 25.0,
        text: "Remember, compensation is not just base salary—it includes equity, performance bonuses, health coverage, and flexible working arrangements.",
        translationVi: "Hãy nhớ rằng, thu nhập không chỉ là lương cơ bản—nó bao gồm cổ phần, thưởng hiệu suất, bảo hiểm y tế và chế độ làm việc linh hoạt.",
        properNouns: [],
        keywords: ["equity", "bonuses", "coverage", "flexible"],
      },
    ],
  },

  // 8. Music: "Count on Me" Bruno Mars
  {
    slug: "music-count-on-me-lyrics-lesson",
    title: "English Through Music: Bruno Mars - Count on Me",
    description: "Học từ vựng về tình bạn, cách nối âm nhẹ nhàng và nhịp điệu bài hát ngọt ngào của Bruno Mars.",
    categorySlug: "music-english",
    playlistSlug: "music-acoustic-hits",
    externalId: "pRfmrE0ToTo",
    thumbnailUrl: "https://img.youtube.com/vi/pRfmrE0ToTo/hqdefault.jpg",
    durationSeconds: 195,
    durationFormatted: "03:15",
    cefrLevel: "A2",
    accent: "en-US",
    wpmSpeed: 105,
    segments: [
      {
        orderIndex: 1,
        startTime: 0.0,
        endTime: 5.8,
        text: "If you ever find yourself stuck in the middle of the sea, I'll sail the world to find you.",
        translationVi: "Nếu có bao giờ bạn thấy mình mắc kẹt giữa đại dương mênh mông, tôi sẽ giương buồm đi khắp thế gian để tìm bạn.",
        properNouns: [],
        keywords: ["stuck", "middle", "sail"],
      },
      {
        orderIndex: 2,
        startTime: 6.2,
        endTime: 12.0,
        text: "If you ever find yourself lost in the dark and you can't see, I'll be the light to guide you.",
        translationVi: "Nếu có bao giờ bạn lạc lối trong màn đêm tăm tối và không thấy đường, tôi sẽ là ngọn đèn dẫn lối cho bạn.",
        properNouns: [],
        keywords: ["guide", "light"],
      },
      {
        orderIndex: 3,
        startTime: 12.5,
        endTime: 18.2,
        text: "Find out what we're made of when we are called to help our friends in need.",
        translationVi: "Chúng ta sẽ nhận ra phẩm chất của chính mình khi được kêu gọi giúp đỡ những người bạn đang gặp khó khăn.",
        properNouns: [],
        keywords: ["called", "friends"],
      },
      {
        orderIndex: 4,
        startTime: 18.8,
        endTime: 24.5,
        text: "You can count on me like one, two, three, I'll be there, and I know when I need it I can count on you.",
        translationVi: "Bạn có thể tin cậy vào tôi như đếm một, hai, ba, tôi sẽ luôn có mặt, và tôi biết khi tôi cần thì tôi cũng có thể tin tưởng vào bạn.",
        properNouns: [],
        keywords: ["count", "need"],
      },
    ],
  },
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  console.log("🚀 Bắt đầu gieo mầm dữ liệu (Seed) Hệ sinh thái Video & Data cho XP English...");

  // 1. Seed Categories
  console.log(`\n📁 Đang tạo ${CATEGORIES.length} Chuyên mục Video lớn...`);
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const upserted = await prisma.videoCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        thumbnail: cat.thumbnail,
        orderIndex: cat.orderIndex,
        isFeatured: cat.isFeatured,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        thumbnail: cat.thumbnail,
        orderIndex: cat.orderIndex,
        isFeatured: cat.isFeatured,
      },
    });
    categoryMap.set(cat.slug, upserted.id);
    console.log(`  ✓ Danh mục: [${cat.slug}] ${cat.name}`);
  }

  // 2. Seed Playlists
  console.log(`\n📑 Đang tạo ${PLAYLISTS.length} Playlists tuyển chọn...`);
  const playlistMap = new Map<string, string>();
  for (const pl of PLAYLISTS) {
    const categoryId = categoryMap.get(pl.categorySlug);
    if (!categoryId) continue;

    const upserted = await prisma.videoPlaylist.upsert({
      where: { slug: pl.slug },
      update: {
        title: pl.title,
        description: pl.description,
        thumbnail: pl.thumbnail,
        categoryId,
        channelName: pl.channelName,
        orderIndex: pl.orderIndex,
      },
      create: {
        slug: pl.slug,
        title: pl.title,
        description: pl.description,
        thumbnail: pl.thumbnail,
        categoryId,
        channelName: pl.channelName,
        orderIndex: pl.orderIndex,
      },
    });
    playlistMap.set(pl.slug, upserted.id);
    console.log(`  ✓ Playlist: [${pl.slug}] ${pl.title} (${pl.channelName})`);
  }

  // 3. Seed Lessons & Segments
  console.log(`\n🎬 Đang tạo ${CURATED_LESSONS.length} Bài học mẫu chuẩn hóa cao...`);
  let totalSegmentsCount = 0;

  for (const lessonData of CURATED_LESSONS) {
    const categoryId = categoryMap.get(lessonData.categorySlug) || null;
    const playlistId = playlistMap.get(lessonData.playlistSlug) || null;

    // Check if lesson exists
    let lesson = await prisma.videoLesson.findUnique({
      where: { slug: lessonData.slug },
    });

    if (!lesson) {
      lesson = await prisma.videoLesson.create({
        data: {
          slug: lessonData.slug,
          title: lessonData.title,
          description: lessonData.description,
          sourceType: "YOUTUBE",
          externalId: lessonData.externalId,
          thumbnailUrl: lessonData.thumbnailUrl,
          durationSeconds: lessonData.durationSeconds,
          durationFormatted: lessonData.durationFormatted,
          cefrLevel: lessonData.cefrLevel,
          supportedTypes: "BOTH",
          categoryId,
          playlistId,
          accent: lessonData.accent,
          wpmSpeed: lessonData.wpmSpeed,
          isCommunityCurated: false,
        },
      });
    } else {
      lesson = await prisma.videoLesson.update({
        where: { id: lesson.id },
        data: {
          title: lessonData.title,
          description: lessonData.description,
          externalId: lessonData.externalId,
          thumbnailUrl: lessonData.thumbnailUrl,
          durationSeconds: lessonData.durationSeconds,
          durationFormatted: lessonData.durationFormatted,
          cefrLevel: lessonData.cefrLevel,
          accent: lessonData.accent,
          wpmSpeed: lessonData.wpmSpeed,
          categoryId,
          playlistId,
        },
      });
    }

    // Replace segments for clean idempotency
    await prisma.lessonSegment.deleteMany({
      where: { lessonId: lesson.id },
    });

    const segmentsToCreate = lessonData.segments.map((s) => ({
      lessonId: lesson.id,
      orderIndex: s.orderIndex,
      startTime: s.startTime,
      endTime: s.endTime,
      text: s.text,
      normalizedText: normalizeText(s.text),
      translationVi: s.translationVi,
      properNouns: s.properNouns || [],
      keywords: s.keywords || [],
      tokenCount: s.text.split(/\s+/).filter(Boolean).length,
    }));

    await prisma.lessonSegment.createMany({
      data: segmentsToCreate,
    });

    totalSegmentsCount += segmentsToCreate.length;
    console.log(`  ✓ Bài học: "${lesson.title}" (${segmentsToCreate.length} câu)`);
  }

  console.log("\n=======================================================");
  console.log(`✅ HOÀN TẤT SEED GIAI ĐOẠN 1:`);
  console.log(`- Danh mục video: ${CATEGORIES.length}`);
  console.log(`- Playlists tuyển chọn: ${PLAYLISTS.length}`);
  console.log(`- Bài học video: ${CURATED_LESSONS.length}`);
  console.log(`- Phân đoạn câu chuẩn xác: ${totalSegmentsCount}`);
  console.log("=======================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu video:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
