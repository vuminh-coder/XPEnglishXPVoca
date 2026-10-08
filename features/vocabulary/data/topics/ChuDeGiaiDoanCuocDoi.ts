import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 57: Giai đoạn cuộc đời (Life Stages & Ages)
 * Mã chủ đề: t_basic_life_stages_age
 * Tổng số từ vựng: 20 từ
 */
export const THEME_GIAI_DOAN_CUOC_DOI: BasicTheme = {
  "id": "t_basic_life_stages_age",
  "name": "Giai đoạn cuộc đời",
  "nameEn": "Life Stages & Ages",
  "icon": "🌱",
  "difficulty": 1,
  "color": "#10b981",
  "description": "Em bé, thiếu niên, người lớn, người già, sinh nhật, thời thơ ấu và trưởng thành.",
  "totalVocabs": 20
};

export const VOCABS_GIAI_DOAN_CUOC_DOI: BasicVocabularyItem[] = [
  {
    "id": "bv_life_s_01",
    "word": "baby",
    "phonetic": "/ˈbeɪbi/",
    "definition": "A very young child, especially one newly or recently born.",
    "definitionVn": "em bé, trẻ sơ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The newborn baby slept peacefully in her mother's warm arms.",
      "Babies smile when they recognize their parents' voices."
    ],
    "exampleTranslations": [
      "Em bé mới sinh ngủ bình yên trong vòng tay ấm áp của mẹ.",
      "Các em bé mỉm cười khi nhận ra giọng nói của bố mẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_02",
    "word": "infant",
    "phonetic": "/ˈɪnfənt/",
    "definition": "A very young child or baby in the earliest stage of development.",
    "definitionVn": "trẻ nhỏ dưới 1 tuổi, nhũ nhi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Infants need adequate sleep, gentle care, and proper nutrition.",
      "Regular health checkups ensure healthy infant growth."
    ],
    "exampleTranslations": [
      "Trẻ nhỏ cần ngủ đủ giấc, được chăm sóc ân cần và dinh dưỡng hợp lý.",
      "Khám sức khỏe định kỳ đảm bảo sự phát triển khỏe mạnh của trẻ nhũ nhi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_03",
    "word": "toddler",
    "phonetic": "/ˈtɑːdlər/",
    "definition": "A young child who is just beginning to walk (usually aged 1 to 3).",
    "definitionVn": "trẻ chập chững biết đi (1-3 tuổi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The energetic toddler took his first wobbly steps across the rug.",
      "Toddlers are endlessly curious about exploring their surroundings."
    ],
    "exampleTranslations": [
      "Đứa trẻ đang tập đi chập chững bước những bước đầu tiên trên thảm.",
      "Trẻ ở độ tuổi tập đi vô cùng tò mò khám phá thế giới xung quanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_04",
    "word": "child",
    "phonetic": "/tʃaɪld/",
    "definition": "A young human being below the age of full physical development (plural: children).",
    "definitionVn": "đứa trẻ, thiếu nhi (số ít)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Every child deserves love, protection, and a quality education.",
      "She had a joyful and imaginative imagination as a child."
    ],
    "exampleTranslations": [
      "Mọi đứa trẻ đều xứng đáng được yêu thương, bảo vệ và có nền giáo dục chất lượng.",
      "Cô ấy có trí tưởng tượng phong phú và vui tươi thuở ấu thơ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_05",
    "word": "teenager",
    "phonetic": "/ˈtiːneɪdʒər/",
    "definition": "A person aged between 13 and 19 years old.",
    "definitionVn": "thanh thiếu niên (13 - 19 tuổi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Teenagers develop independence, critical thinking, and new passions.",
      "She is an ambitious teenager aiming to study abroad."
    ],
    "exampleTranslations": [
      "Thanh thiếu niên phát triển tính tự lập, tư duy phản biện và những đam mê mới.",
      "Cô ấy là một thiếu niên đầy hoài bão với mục tiêu đi du học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_06",
    "word": "youth",
    "phonetic": "/juːθ/",
    "definition": "The period between childhood and adult age; young people collectively.",
    "definitionVn": "tuổi trẻ, giới trẻ, thanh xuân",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Youth is a precious time to learn, explore, and build character.",
      "The energetic youth volunteer in community green projects."
    ],
    "exampleTranslations": [
      "Tuổi trẻ là quãng thời gian quý giá để học tập, khám phá và rèn luyện nhân cách.",
      "Giới trẻ năng động tình nguyện tham gia các dự án xanh của cộng đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_07",
    "word": "adult",
    "phonetic": "/əˈdʌlt/",
    "definition": "A person who is fully grown or developed.",
    "definitionVn": "người trưởng thành, người lớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Adults take on responsibilities for career, family, and society.",
      "Learning continues throughout your entire adult life."
    ],
    "exampleTranslations": [
      "Người trưởng thành gánh vác trách nhiệm với sự nghiệp, gia đình và xã hội.",
      "Việc học tập vẫn tiếp tục diễn ra trong suốt cuộc đời người lớn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_08",
    "word": "elderly",
    "phonetic": "/ˈeldərli/",
    "definition": "Of a person, old or aging; past middle age.",
    "definitionVn": "người cao tuổi, người già",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Respect, assist, and care for elderly citizens in society.",
      "The elderly couple took a gentle walk around the morning park."
    ],
    "exampleTranslations": [
      "Hãy kính trọng, giúp đỡ và chăm sóc những người cao tuổi trong xã hội.",
      "Đôi vợ chồng già đi dạo nhẹ nhàng quanh công viên buổi sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_09",
    "word": "birth",
    "phonetic": "/bɜːrθ/",
    "definition": "The emergence of a baby or other young from the body of its mother.",
    "definitionVn": "sự ra đời, sự sinh nở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The family celebrated the joyful birth of their twin daughters.",
      "Record your date and place of birth on official forms."
    ],
    "exampleTranslations": [
      "Gia đình đã tổ chức ăn mừng sự chào đời tràn ngập niềm vui của hai cô con gái sinh đôi.",
      "Ghi ngày và nơi sinh của bạn vào các mẫu đơn chính thức nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_10",
    "word": "birthday",
    "phonetic": "/ˈbɜːrθdeɪ/",
    "definition": "The anniversary of the day on which a person was born.",
    "definitionVn": "ngày sinh nhật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Happy Birthday! Wishing you good health, joy, and success!",
      "We surprised him with a birthday cake and gifts."
    ],
    "exampleTranslations": [
      "Chúc mừng sinh nhật! Chúc bạn dồi dào sức khỏe, niềm vui và thành công!",
      "Chúng tôi đã làm anh ấy bất ngờ với chiếc bánh sinh nhật và quà tặng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_11",
    "word": "childhood",
    "phonetic": "/ˈtʃaɪldhʊd/",
    "definition": "The state or period of being a child.",
    "definitionVn": "thời thơ ấu, tuổi ấu thơ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Memories of a happy childhood in the countryside stay in our hearts forever.",
      "I spent my early childhood reading storybooks."
    ],
    "exampleTranslations": [
      "Những kỷ niệm về tuổi thơ êm đềm ở làng quê sẽ mãi in sâu trong tim chúng ta.",
      "Tôi đã trải qua thời thơ ấu đọc những cuốn truyện tranh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_12",
    "word": "grow",
    "phonetic": "/ɡroʊ/",
    "definition": "Undergo natural development by increasing in size and changing physically.",
    "definitionVn": "lớn lên, trưởng thành, phát triển",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Children grow taller and stronger through sports and balanced meals.",
      "Never stop learning and growing as a person."
    ],
    "exampleTranslations": [
      "Trẻ em lớn lên cao hơn và khỏe mạnh hơn qua thể thao và bữa ăn cân bằng.",
      "Đừng bao giờ ngừng học hỏi và hoàn thiện bản thân nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_13",
    "word": "age",
    "phonetic": "/eɪdʒ/",
    "definition": "The length of time that a person has lived or a thing has existed.",
    "definitionVn": "tuổi tác, số tuổi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Age is just a number when it comes to pursuing your dreams.",
      "She started learning English at the early age of six."
    ],
    "exampleTranslations": [
      "Tuổi tác chỉ là con số khi bạn theo đuổi những ước mơ của mình.",
      "Cô ấy bắt đầu học tiếng Anh từ năm lên sáu tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_14",
    "word": "young",
    "phonetic": "/jʌŋ/",
    "definition": "Having lived or existed for only a short time; not old.",
    "definitionVn": "trẻ trung, tươi trẻ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Young minds are full of boundless curiosity and creative energy.",
      "Stay young at heart by keeping a positive attitude."
    ],
    "exampleTranslations": [
      "Tâm hồn trẻ thơ tràn đầy sự tò mò vô tận và năng lượng sáng tạo.",
      "Hãy giữ cho tâm hồn luôn tươi trẻ bằng một thái độ sống tích cực nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_15",
    "word": "old",
    "phonetic": "/oʊld/",
    "definition": "Having lived for a long time; no longer young.",
    "definitionVn": "già, cao tuổi, lâu năm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The wise old teacher shared inspiring stories with his students.",
      "Respect and care for old people in the community."
    ],
    "exampleTranslations": [
      "Người thầy giáo già thông thái đã chia sẻ những câu chuyện truyền cảm hứng cho học trò.",
      "Hãy kính trọng và chăm sóc người già trong cộng đồng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_16",
    "word": "mature",
    "phonetic": "/məˈtʃʊr/",
    "definition": "Fully developed physically; having reached an advanced stage of mental development.",
    "definitionVn": "chín chắn, trưởng thành",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "She handles unexpected difficulties with a mature and calm mindset.",
      "He grew into a mature, responsible young adult."
    ],
    "exampleTranslations": [
      "Cô ấy xử lý những khó khăn bất ngờ với một tâm thế chín chắn và điềm tĩnh.",
      "Cậu ấy đã trưởng thành thành một thanh niên có trách nhiệm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_17",
    "word": "generation",
    "phonetic": "/ˌdʒenəˈreɪʃn/",
    "definition": "All of the people born and living at about the same time, regarded collectively.",
    "definitionVn": "thế hệ (con người)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The younger generation embraces technology and global connectivity.",
      "Three generations live harmoniously under one roof."
    ],
    "exampleTranslations": [
      "Thế hệ trẻ đón nhận công nghệ và sự kết nối toàn cầu.",
      "Ba thế hệ cùng chung sống hòa thuận dưới một mái nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_18",
    "word": "life",
    "phonetic": "/laɪf/",
    "definition": "The condition that distinguishes animals and plants from inorganic matter; existence.",
    "definitionVn": "cuộc sống, cuộc đời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Live a meaningful life filled with learning, love, and contribution.",
      "English opens doors to a broader, brighter life."
    ],
    "exampleTranslations": [
      "Hãy sống một cuộc đời ý nghĩa ngập tràn học hỏi, yêu thương và cống hiến.",
      "Tiếng Anh mở ra cánh cửa dẫn tới một cuộc sống tươi sáng và rộng mở hơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_19",
    "word": "graduate",
    "phonetic": "/ˈɡrædʒueɪt/",
    "definition": "Successfully complete an academic degree, course of training, or high school.",
    "definitionVn": "tốt nghiệp (ra trường)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "She will graduate from the university with high academic honors.",
      "We celebrated happily on the day we graduated."
    ],
    "exampleTranslations": [
      "Cô ấy sẽ tốt nghiệp đại học với bằng danh dự cao quý.",
      "Chúng tôi đã cùng nhau ăn mừng vui vẻ trong ngày tốt nghiệp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_20",
    "word": "retire",
    "phonetic": "/rɪˈtaɪər/",
    "definition": "Leave one's job and cease to work, typically upon reaching the normal age for leaving employment.",
    "definitionVn": "nghỉ hưu, về hưu",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "After forty dedicated years of teaching, the professor will retire next month.",
      "Retirees enjoy gardening and traveling."
    ],
    "exampleTranslations": [
      "Sau bốn mươi năm tận tụy cống hiến cho sự nghiệp trồng người, vị giáo sư sẽ về hưu vào tháng tới.",
      "Những người về hưu thích làm vườn và đi du lịch."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_GIAI_DOAN_CUOC_DOI: VocabularyTopicPackage = {
  theme: THEME_GIAI_DOAN_CUOC_DOI,
  vocabs: VOCABS_GIAI_DOAN_CUOC_DOI,
};

export default CHUDE_GIAI_DOAN_CUOC_DOI;
