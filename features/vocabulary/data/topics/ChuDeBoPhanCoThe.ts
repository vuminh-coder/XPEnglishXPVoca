import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 12: Bộ phận cơ thể (Human Body Parts)
 * Mã chủ đề: t_basic_body_parts
 * Tổng số từ vựng: 22 từ
 */
export const THEME_BO_PHAN_CO_THE: BasicTheme = {
  "id": "t_basic_body_parts",
  "name": "Bộ phận cơ thể",
  "nameEn": "Human Body Parts",
  "icon": "👀",
  "difficulty": 1,
  "color": "#e11d48",
  "description": "Các bộ phận chính trên cơ thể người từ đầu đến chân.",
  "totalVocabs": 22
};

export const VOCABS_BO_PHAN_CO_THE: BasicVocabularyItem[] = [
  {
    "id": "bv_body_p_01",
    "word": "body",
    "phonetic": "/ˈbɑːdi/",
    "definition": "The physical structure of a human or animal.",
    "definitionVn": "cơ thể, thân thể",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Exercise keeps your body strong.",
      "Drinking water is essential for your body."
    ],
    "exampleTranslations": [
      "Tập thể dục giúp cơ thể bạn khỏe mạnh.",
      "Uống nước rất cần thiết cho cơ thể."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_02",
    "word": "head",
    "phonetic": "/hed/",
    "definition": "The upper part of the human body containing the brain and face.",
    "definitionVn": "cái đầu, phần đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Wear a helmet to protect your head.",
      "She nodded her head."
    ],
    "exampleTranslations": [
      "Hãy đội mũ bảo hiểm để bảo vệ đầu.",
      "Cô ấy gật đầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_03",
    "word": "hair",
    "phonetic": "/her/",
    "definition": "Any of the fine thread-like strands growing from the skin.",
    "definitionVn": "mái tóc, tóc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She has long silky black hair.",
      "He got a haircut yesterday."
    ],
    "exampleTranslations": [
      "Cô ấy có mái tóc đen mượt mà.",
      "Hôm qua anh ấy vừa đi cắt tóc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_04",
    "word": "face",
    "phonetic": "/feɪs/",
    "definition": "The front part of a person's head from forehead to chin.",
    "definitionVn": "khuôn mặt, gương mặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She greeted everyone with a smiling face.",
      "Wash your face every morning."
    ],
    "exampleTranslations": [
      "Cô ấy chào mọi người với gương mặt tươi cười.",
      "Rửa mặt sạch sẽ mỗi buổi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_05",
    "word": "eye",
    "phonetic": "/aɪ/",
    "definition": "The organ of sight.",
    "definitionVn": "con mắt, đôi mắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She has bright brown eyes.",
      "Close your eyes and relax."
    ],
    "exampleTranslations": [
      "Cô ấy có đôi mắt nâu sáng ngời.",
      "Hãy nhắm mắt lại và thư giãn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_06",
    "word": "ear",
    "phonetic": "/ɪr/",
    "definition": "The organ of hearing and balance.",
    "definitionVn": "tai, đôi tai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "We listen to sweet music with our ears.",
      "Cover your ears if the sound is too loud."
    ],
    "exampleTranslations": [
      "Chúng ta lắng nghe âm nhạc ngọt ngào bằng đôi tai.",
      "Bịt tai lại nếu âm thanh quá to nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_07",
    "word": "nose",
    "phonetic": "/noʊz/",
    "definition": "The part projecting above the mouth on the face for smelling.",
    "definitionVn": "chiếc mũi, mũi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "I can smell fresh flowers with my nose.",
      "He wiped his nose with a tissue."
    ],
    "exampleTranslations": [
      "Tôi có thể ngửi thấy mùi hoa thơm bằng mũi.",
      "Anh ấy lau mũi bằng khăn giấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_08",
    "word": "mouth",
    "phonetic": "/maʊθ/",
    "definition": "The opening in the lower part of the human face for speaking and eating.",
    "definitionVn": "cái miệng, khẩu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Open your mouth and say 'Ah'.",
      "Cover your mouth when coughing."
    ],
    "exampleTranslations": [
      "Hãy mở miệng ra và nói 'A' nào.",
      "Hãy che miệng khi ho nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_09",
    "word": "lip",
    "phonetic": "/lɪp/",
    "definition": "Either of the two fleshy parts which form the upper and lower edges of the opening of the mouth.",
    "definitionVn": "bờ môi, làn môi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Apply lip balm to prevent dry lips.",
      "She put a finger to her lips asking for silence."
    ],
    "exampleTranslations": [
      "Thoa son dưỡng để tránh bị khô môi nhé.",
      "Cô ấy đặt ngón tay lên môi ra hiệu giữ im lặng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_10",
    "word": "tooth",
    "phonetic": "/tuːθ/",
    "definition": "Each of a set of hard, enamel-coated structures in the jaws (plural: teeth).",
    "definitionVn": "chiếc răng (số nhiều: teeth)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Brush your teeth twice a day.",
      "She has white and even teeth."
    ],
    "exampleTranslations": [
      "Đánh răng hai lần mỗi ngày nhé.",
      "Cô ấy có hàm răng trắng và đều tăm tắp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_11",
    "word": "tongue",
    "phonetic": "/tʌŋ/",
    "definition": "The fleshy muscular organ in the mouth used for tasting.",
    "definitionVn": "chiếc lưỡi, lưỡi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "We taste sweet and salty flavors with our tongue.",
      "Don't bite your tongue while eating."
    ],
    "exampleTranslations": [
      "Chúng ta nếm vị ngọt và mặn bằng lưỡi.",
      "Đừng cắn vào lưỡi khi ăn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_12",
    "word": "neck",
    "phonetic": "/nek/",
    "definition": "The part of the body connecting the head to the rest of the body.",
    "definitionVn": "cổ, chiếc cổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She wore a warm wool scarf around her neck.",
      "Turn your neck gently to relieve tension."
    ],
    "exampleTranslations": [
      "Cô ấy quàng một chiếc khăn len ấm quanh cổ.",
      "Xoay nhẹ cổ để xua tan căng thẳng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_13",
    "word": "shoulder",
    "phonetic": "/ˈʃoʊldər/",
    "definition": "The joint connecting the arm or forelimb with the torso.",
    "definitionVn": "bờ vai, đôi vai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "He carried the heavy backpack on his shoulders.",
      "She tapped me on the shoulder."
    ],
    "exampleTranslations": [
      "Anh ấy mang chiếc ba lô nặng trên vai.",
      "Cô ấy vỗ nhẹ vào vai tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_14",
    "word": "arm",
    "phonetic": "/ɑːrm/",
    "definition": "Each of the two upper limbs of the human body.",
    "definitionVn": "cánh tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "He crossed his arms and listened carefully.",
      "She held the sleeping baby in her arms."
    ],
    "exampleTranslations": [
      "Anh ấy khoanh tay và chăm chú lắng nghe.",
      "Cô ấy ôm em bé đang ngủ trong vòng tay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_15",
    "word": "hand",
    "phonetic": "/hænd/",
    "definition": "The end part of a person's arm beyond the wrist.",
    "definitionVn": "bàn tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Wash your hands with soap before eating.",
      "Raise your hand to ask a question."
    ],
    "exampleTranslations": [
      "Rửa tay bằng xà phòng trước khi ăn.",
      "Giơ tay lên nếu muốn đặt câu hỏi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_16",
    "word": "finger",
    "phonetic": "/ˈfɪŋɡər/",
    "definition": "Each of the four slender jointed parts attached to either hand.",
    "definitionVn": "ngón tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "We have ten fingers on our two hands.",
      "She wears a sparkling ring on her finger."
    ],
    "exampleTranslations": [
      "Chúng ta có mười ngón tay trên hai bàn tay.",
      "Cô ấy đeo chiếc nhẫn lấp lánh trên ngón tay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_17",
    "word": "chest",
    "phonetic": "/tʃest/",
    "definition": "The front surface of a person's body between the neck and the stomach.",
    "definitionVn": "lồng ngực, ngực",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Take a deep breath and expand your chest.",
      "He placed his hand over his heart on his chest."
    ],
    "exampleTranslations": [
      "Hít một hơi thật sâu và căng lồng ngực ra.",
      "Anh ấy đặt tay lên tim trước ngực."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_18",
    "word": "stomach",
    "phonetic": "/ˈstʌmək/",
    "definition": "The internal organ in which the first part of digestion occurs.",
    "definitionVn": "bụng, dạ dày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "My stomach is rumbling because I am hungry.",
      "Drink warm water if your stomach hurts."
    ],
    "exampleTranslations": [
      "Bụng tôi đang kêu ùng ục vì đói.",
      "Hãy uống nước ấm nếu bị đau dạ dày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_19",
    "word": "back",
    "phonetic": "/bæk/",
    "definition": "The rear surface of the human body from the shoulders to the hips.",
    "definitionVn": "lưng, phía sau lưng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Sit straight to keep your back healthy.",
      "He carried a heavy load on his back."
    ],
    "exampleTranslations": [
      "Hãy ngồi thẳng lưng để giữ cột sống khỏe mạnh.",
      "Anh ấy cõng một gánh nặng trên lưng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_20",
    "word": "leg",
    "phonetic": "/leɡ/",
    "definition": "Each of the limbs on which a person or animal walks and stands.",
    "definitionVn": "chân, cẳng chân",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Running strengthens your leg muscles.",
      "He stretched his legs after sitting for hours."
    ],
    "exampleTranslations": [
      "Chạy bộ giúp tăng cường cơ bắp chân.",
      "Anh ấy duỗi chân sau nhiều giờ ngồi làm việc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_21",
    "word": "knee",
    "phonetic": "/niː/",
    "definition": "The joint between the thigh and the lower leg.",
    "definitionVn": "đầu gối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Bend your knees when lifting heavy objects.",
      "He scraped his knee while playing soccer."
    ],
    "exampleTranslations": [
      "Hãy gập đầu gối khi nâng vật nặng.",
      "Cậu ấy bị trầy đầu gối khi đá bóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_22",
    "word": "foot",
    "phonetic": "/fʊt/",
    "definition": "The lower extremity of the leg below the ankle (plural: feet).",
    "definitionVn": "bàn chân (số nhiều: feet)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Put your shoes on your feet.",
      "We walked on foot along the sandy beach."
    ],
    "exampleTranslations": [
      "Hãy xỏ giày vào chân đi nào.",
      "Chúng tôi đi bộ bằng chân trần dọc bãi cát."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_BO_PHAN_CO_THE: VocabularyTopicPackage = {
  theme: THEME_BO_PHAN_CO_THE,
  vocabs: VOCABS_BO_PHAN_CO_THE,
};

export default CHUDE_BO_PHAN_CO_THE;
