import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 46: Mối quan hệ & Xã hội (Social Relationships)
 * Mã chủ đề: t_basic_relationships_social
 * Tổng số từ vựng: 20 từ
 */
export const THEME_MOI_QUAN_HE_XA_HOI: BasicTheme = {
  "id": "t_basic_relationships_social",
  "name": "Mối quan hệ & Xã hội",
  "nameEn": "Social Relationships",
  "icon": "🤝",
  "difficulty": 1,
  "color": "#2563eb",
  "description": "Bạn thân, hàng xóm, bạn cùng lớp, đồng nghiệp, sếp, lòng tin và sự tôn trọng.",
  "totalVocabs": 20
};

export const VOCABS_MOI_QUAN_HE_XA_HOI: BasicVocabularyItem[] = [
  {
    "id": "bv_relati_01",
    "word": "best friend",
    "phonetic": "/best frend/",
    "definition": "A person's closest and dearest friend.",
    "definitionVn": "bạn thân nhất, tri kỷ",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My best friend always supports me through thick and thin.",
      "We have been best friends since primary school."
    ],
    "exampleTranslations": [
      "Bạn thân nhất của tôi luôn sát cánh bên tôi dù lúc vui hay buồn.",
      "Chúng tôi là bạn thân nhất từ thuở tiểu học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_02",
    "word": "neighbor",
    "phonetic": "/ˈneɪbər/",
    "definition": "A person living near or next door to the speaker or person referred to.",
    "definitionVn": "người hàng xóm, láng giềng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Friendly neighbors make the community feel like home.",
      "Our neighbor helped water our plants while we were on vacation."
    ],
    "exampleTranslations": [
      "Những người hàng xóm thân thiện làm cho khu phố ấm cúng như tổ ấm.",
      "Hàng xóm đã giúp tưới cây cho chúng tôi khi chúng tôi đi nghỉ mát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_03",
    "word": "partner",
    "phonetic": "/ˈpɑːrtnər/",
    "definition": "A person with whom one is associated in a relationship or activity.",
    "definitionVn": "bạn đồng hành, đối tác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Practice speaking English with your study partner every day.",
      "They are reliable business partners."
    ],
    "exampleTranslations": [
      "Hãy luyện nói tiếng Anh với người bạn đồng hành của bạn mỗi ngày nhé.",
      "Họ là những đối tác kinh doanh đáng tin cậy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_04",
    "word": "classmate",
    "phonetic": "/ˈklæsmeɪt/",
    "definition": "A fellow member of a class at school, college, or university.",
    "definitionVn": "bạn cùng lớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My classmates and I worked on a group project together.",
      "Help your classmates when they struggle with a lesson."
    ],
    "exampleTranslations": [
      "Tôi và các bạn cùng lớp đã cùng nhau làm một dự án nhóm.",
      "Hãy giúp đỡ các bạn cùng lớp khi họ gặp khó khăn trong bài học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_05",
    "word": "roommate",
    "phonetic": "/ˈruːmmeɪt/",
    "definition": "A person with whom one shares a room or apartment.",
    "definitionVn": "bạn cùng phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My university roommate is tidy, polite, and considerate.",
      "We share grocery expenses with our roommates."
    ],
    "exampleTranslations": [
      "Bạn cùng phòng đại học của tôi rất ngăn nắp, lễ phép và biết nghĩ cho người khác.",
      "Chúng tôi chia sẻ tiền mua đồ ăn cùng các bạn cùng phòng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_06",
    "word": "colleague",
    "phonetic": "/ˈkɑːliːɡ/",
    "definition": "A person with whom one works in a profession or business.",
    "definitionVn": "đồng nghiệp (ở công sở)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My colleagues gave me a warm welcome on my first day at work.",
      "Collaborate effectively with your work colleagues."
    ],
    "exampleTranslations": [
      "Các đồng nghiệp đã chào đón tôi rất nồng nhiệt trong ngày đầu đi làm.",
      "Hãy hợp tác hiệu quả với các đồng nghiệp tại nơi làm việc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_07",
    "word": "boss",
    "phonetic": "/bɔːs/",
    "definition": "A person in charge of an employee or an organization.",
    "definitionVn": "sếp, người quản lý, thủ trưởng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "A good boss inspires and empowers team members.",
      "She discussed her project proposal with her boss."
    ],
    "exampleTranslations": [
      "Một người sếp tốt luôn truyền cảm hứng và trao quyền cho các thành viên trong nhóm.",
      "Cô ấy đã thảo luận đề xuất dự án với sếp của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_08",
    "word": "guest",
    "phonetic": "/ɡest/",
    "definition": "A person who is invited to visit the home of or take part in an activity organized by another.",
    "definitionVn": "khách mời, khách quý",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "We welcomed dinner guests with warm tea and fruits.",
      "Treat every guest with genuine Vietnamese hospitality."
    ],
    "exampleTranslations": [
      "Chúng tôi chào đón khách mời ăn tối bằng trà ấm và hoa quả.",
      "Hãy đối đãi với mọi vị khách bằng lòng hiếu khách chân thành của người Việt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_09",
    "word": "host",
    "phonetic": "/hoʊst/",
    "definition": "A person who receives or entertains other people as guests.",
    "definitionVn": "chủ nhà, người đăng cai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "The gracious host made sure everyone was comfortable.",
      "Vietnam proudly hosted the international sports tournament."
    ],
    "exampleTranslations": [
      "Người chủ nhà ân cần đảm bảo cho tất cả mọi người đều cảm thấy thoải mái.",
      "Việt Nam tự hào là nước đăng cai giải thể thao quốc tế."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_10",
    "word": "stranger",
    "phonetic": "/ˈstreɪndʒər/",
    "definition": "A person whom one does not know or with whom one is not familiar.",
    "definitionVn": "người lạ, người chưa quen",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Never accept rides or gifts from strangers.",
      "A kind stranger helped me find the right bus stop."
    ],
    "exampleTranslations": [
      "Không bao giờ đi nhờ xe hoặc nhận quà từ người lạ nhé.",
      "Một người lạ tốt bụng đã giúp tôi tìm đúng trạm dừng xe buýt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_11",
    "word": "crowd",
    "phonetic": "/kraʊd/",
    "definition": "A large number of people gathered together in a disorganized or unruly way.",
    "definitionVn": "đám đông, dòng người",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "A cheerful crowd gathered to watch the festive fireworks.",
      "Stay close to your family in busy crowds."
    ],
    "exampleTranslations": [
      "Một đám đông vui tươi đã tụ họp lại để ngắm pháo hoa rực rỡ.",
      "Hãy ở gần gia đình khi đi giữa những đám đông đông đúc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_12",
    "word": "couple",
    "phonetic": "/ˈkʌpl/",
    "definition": "Two people who are married, engaged, or otherwise closely associated romantically.",
    "definitionVn": "cặp đôi, đôi vợ chồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "The young couple took wedding photos near the lake.",
      "The couple celebrated their silver wedding anniversary."
    ],
    "exampleTranslations": [
      "Cặp đôi trẻ chụp ảnh cưới bên bờ hồ.",
      "Đôi vợ chồng đã kỷ niệm đám cưới bạc của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_13",
    "word": "team",
    "phonetic": "/tiːm/",
    "definition": "A group of players forming one side in a competitive game or sport; a group of people working together.",
    "definitionVn": "đội, nhóm làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Teamwork divides the task and multiplies the success.",
      "Our football team practiced hard for the final."
    ],
    "exampleTranslations": [
      "Làm việc nhóm giúp chia sẻ gánh nặng công việc và nhân đôi thành công.",
      "Đội bóng đá của chúng tôi đã tập luyện chăm chỉ cho trận chung kết."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_14",
    "word": "group",
    "phonetic": "/ɡruːp/",
    "definition": "A number of people or things that are located close together or are considered or classed together.",
    "definitionVn": "hội nhóm, nhóm người",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Join an English speaking group to practice daily.",
      "The study group meets at the library on Saturdays."
    ],
    "exampleTranslations": [
      "Tham gia một nhóm luyện nói tiếng Anh để thực hành mỗi ngày nhé.",
      "Nhóm học tập họp mặt tại thư viện vào các ngày thứ Bảy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_15",
    "word": "trust",
    "phonetic": "/trʌst/",
    "definition": "Firm belief in the reliability, truth, ability, or strength of someone or something.",
    "definitionVn": "sự tin tưởng, lòng tin",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Trust is the solid foundation of all lasting friendships.",
      "Always keep your promises to maintain trust."
    ],
    "exampleTranslations": [
      "Lòng tin là nền tảng vững chắc của mọi tình bạn lâu bền.",
      "Hãy luôn giữ lời hứa để duy trì sự tin tưởng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_16",
    "word": "respect",
    "phonetic": "/rɪˈspekt/",
    "definition": "A feeling of deep admiration for someone or something elicited by their abilities, qualities, or achievements.",
    "definitionVn": "sự kính trọng, tôn trọng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Show respect to elders, teachers, and parents.",
      "Mutual respect makes collaboration smooth."
    ],
    "exampleTranslations": [
      "Hãy thể hiện sự kính trọng đối với người lớn tuổi, thầy cô và cha mẹ nhé.",
      "Sự tôn trọng lẫn nhau giúp việc hợp tác trở nên suôn sẻ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_17",
    "word": "share",
    "phonetic": "/ʃer/",
    "definition": "Have a portion of something with another or others.",
    "definitionVn": "chia sẻ, san sẻ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Sharing knowledge and experiences enriches everyone.",
      "Children learned to share their toys generously."
    ],
    "exampleTranslations": [
      "Chia sẻ kiến thức và kinh nghiệm làm phong phú thêm cho tất cả mọi người.",
      "Trẻ em đã học được cách chia sẻ đồ chơi một cách rộng lượng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_18",
    "word": "care",
    "phonetic": "/ker/",
    "definition": "Feel concern or interest; attach importance to something.",
    "definitionVn": "quan tâm, chăm sóc",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "True friends care about each other's feelings and wellbeing.",
      "Care for nature by reducing waste."
    ],
    "exampleTranslations": [
      "Những người bạn chân chính luôn quan tâm đến cảm xúc và sức khỏe của nhau.",
      "Hãy chăm sóc thiên nhiên bằng cách giảm thiểu rác thải nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_19",
    "word": "meet",
    "phonetic": "/miːt/",
    "definition": "Arrange or happen to come into the presence or company of someone.",
    "definitionVn": "gặp gỡ, hẹn gặp",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Let's meet at the bookstore at 3:00 PM.",
      "I was thrilled to meet my favorite English author in person."
    ],
    "exampleTranslations": [
      "Cùng gặp nhau ở hiệu sách lúc 3h chiều nhé.",
      "Tôi đã vô cùng phấn khởi khi được gặp trực tiếp tác giả tiếng Anh yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_20",
    "word": "relationship",
    "phonetic": "/rɪˈleɪʃnʃɪp/",
    "definition": "The way in which two or more concepts, objects, or people are connected, or the state of being connected.",
    "definitionVn": "mối quan hệ, tình cảm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Cultivate healthy and supportive relationships in life.",
      "Open communication strengthens any relationship."
    ],
    "exampleTranslations": [
      "Hãy vun đắp những mối quan hệ lành mạnh và tương trợ trong cuộc sống nhé.",
      "Giao tiếp cởi mở giúp củng cố mọi mối quan hệ."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_MOI_QUAN_HE_XA_HOI: VocabularyTopicPackage = {
  theme: THEME_MOI_QUAN_HE_XA_HOI,
  vocabs: VOCABS_MOI_QUAN_HE_XA_HOI,
};

export default CHUDE_MOI_QUAN_HE_XA_HOI;
