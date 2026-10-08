import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 28: Giác quan & Cảm nhận (Senses & Perception)
 * Mã chủ đề: t_basic_senses_perceptions
 * Tổng số từ vựng: 20 từ
 */
export const THEME_GIAC_QUAN_CAM_NHAN: BasicTheme = {
  "id": "t_basic_senses_perceptions",
  "name": "Giác quan & Cảm nhận",
  "nameEn": "Senses & Perception",
  "icon": "👃",
  "difficulty": 1,
  "color": "#c026d3",
  "description": "Thị giác, thính giác, khứu giác, vị giác và xúc giác.",
  "totalVocabs": 20
};

export const VOCABS_GIAC_QUAN_CAM_NHAN: BasicVocabularyItem[] = [
  {
    "id": "bv_senses_01",
    "word": "sense",
    "phonetic": "/sens/",
    "definition": "A faculty by which the body perceives an external stimulus; one of the faculties of sight, smell, hearing, taste, and touch.",
    "definitionVn": "giác quan (5 giác quan)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Humans perceive the world through five primary senses.",
      "A sense of humor makes life joyful."
    ],
    "exampleTranslations": [
      "Con người cảm nhận thế giới qua năm giác quan chính.",
      "Khiếu hài hước làm cho cuộc sống thêm tràn ngập niềm vui."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_02",
    "word": "sight",
    "phonetic": "/saɪt/",
    "definition": "The faculty or power of seeing.",
    "definitionVn": "thị giác, tầm nhìn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The sunset from the mountain was a breathtaking sight.",
      "Protect your sight by limiting screen time."
    ],
    "exampleTranslations": [
      "Hoàng hôn nhìn từ đỉnh núi là một cảnh tượng đẹp nghẹt thở.",
      "Bảo vệ thị lực của bạn bằng cách hạn chế thời gian nhìn màn hình nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_03",
    "word": "hearing",
    "phonetic": "/ˈhɪrɪŋ/",
    "definition": "The faculty of perceiving sounds.",
    "definitionVn": "thính giác, khả năng nghe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Dogs have an exceptionally sharp sense of hearing.",
      "Protect your hearing by avoiding excessively loud noise."
    ],
    "exampleTranslations": [
      "Loài chó có thính giác cực kỳ nhạy bén.",
      "Bảo vệ thính lực của bạn bằng cách tránh những tiếng ồn quá lớn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_04",
    "word": "taste",
    "phonetic": "/teɪst/",
    "definition": "The sensation of flavor perceived in the mouth and throat on contact with a substance.",
    "definitionVn": "vị giác, nếm vị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "This homemade soup has a delicious savory taste.",
      "Taste the food before adding more salt."
    ],
    "exampleTranslations": [
      "Món súp nấu tại nhà này có hương vị đậm đà rất ngon.",
      "Hãy nếm thử thức ăn trước khi nêm thêm muối nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_05",
    "word": "smell",
    "phonetic": "/smel/",
    "definition": "The faculty or power of perceiving odours or scents by means of the organs in the nose.",
    "definitionVn": "khứu giác, mùi hương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "I love the sweet smell of blooming jasmine flowers.",
      "The bakery has a wonderful smell of fresh bread."
    ],
    "exampleTranslations": [
      "Tôi rất thích mùi thơm ngọt ngào của những bông hoa nhài đang nở.",
      "Tiệm bánh tỏa ra mùi thơm tuyệt vời của bánh mì mới ra lò."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_06",
    "word": "touch",
    "phonetic": "/tʌtʃ/",
    "definition": "The sense by which physical contact with other bodies is perceived.",
    "definitionVn": "xúc giác, chạm vào",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The soft blanket feels gentle to the touch.",
      "Do not touch the hot cooking stove."
    ],
    "exampleTranslations": [
      "Chiếc chăn mềm mại đem lại cảm giác êm ái khi chạm vào.",
      "Đừng chạm vào bếp nấu đang nóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_07",
    "word": "see",
    "phonetic": "/siː/",
    "definition": "Perceive with the eyes for visual impression.",
    "definitionVn": "nhìn thấy, xem",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Can you see the yellow star in the sky?",
      "I am glad to see you again today."
    ],
    "exampleTranslations": [
      "Bạn có nhìn thấy ngôi sao vàng trên bầu trời không?",
      "Tôi rất vui khi được gặp lại bạn hôm nay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_08",
    "word": "look",
    "phonetic": "/lʊk/",
    "definition": "Direct one's gaze toward someone or something or in a specified direction.",
    "definitionVn": "nhìn, ngắm nhìn",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Look at this colorful photograph!",
      "Look both ways before crossing the road."
    ],
    "exampleTranslations": [
      "Hãy nhìn bức ảnh rực rỡ sắc màu này đi!",
      "Hãy nhìn cả hai bên trước khi băng qua đường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_09",
    "word": "watch",
    "phonetic": "/wɑːtʃ/",
    "definition": "Look at or observe attentively over a period of time.",
    "definitionVn": "xem, theo dõi (tivi, phim, trận đấu)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "We watch an English movie together on Friday nights.",
      "Watch how the master chef slices vegetables."
    ],
    "exampleTranslations": [
      "Chúng tôi cùng xem một bộ phim tiếng Anh vào tối thứ Sáu.",
      "Hãy quan sát cách vị bếp trưởng thái rau củ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_10",
    "word": "hear",
    "phonetic": "/hɪr/",
    "definition": "Perceive with the ear the sound made by someone or something.",
    "definitionVn": "nghe thấy (âm thanh lọt vào tai)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "I hear birds chirping outside my bedroom window.",
      "Can you hear my voice clearly over the call?"
    ],
    "exampleTranslations": [
      "Tôi nghe thấy tiếng chim hót líu lo bên ngoài cửa sổ phòng ngủ.",
      "Bạn có nghe rõ giọng của tôi qua cuộc gọi không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_11",
    "word": "feel",
    "phonetic": "/fiːl/",
    "definition": "Be aware of a person or object through touching or being touched; experience an emotion.",
    "definitionVn": "cảm thấy, cảm giác",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "I feel energetic and happy this sunny morning.",
      "Feel how soft this wool scarf is."
    ],
    "exampleTranslations": [
      "Tôi cảm thấy tràn đầy năng lượng và vui vẻ trong buổi sáng nắng đẹp này.",
      "Hãy cảm nhận chiếc khăn len này mềm mại đến mức nào nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_12",
    "word": "bright",
    "phonetic": "/braɪt/",
    "definition": "Giving out or reflecting a lot of light; shining.",
    "definitionVn": "sáng sủa, rực rỡ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The morning sun is bright and warm.",
      "She has bright and cheerful eyes."
    ],
    "exampleTranslations": [
      "Ánh nắng ban mai rực rỡ và ấm áp.",
      "Cô ấy có đôi mắt sáng ngời và vui tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_13",
    "word": "dark",
    "phonetic": "/dɑːrk/",
    "definition": "With little or no light.",
    "definitionVn": "tối tăm, bóng tối",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "It gets dark outside after 7:00 PM.",
      "Turn on the light in the dark hallway."
    ],
    "exampleTranslations": [
      "Trời bên ngoài trở nên tối sau 7h tối.",
      "Hãy bật đèn trong hành lang tối lên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_14",
    "word": "loud",
    "phonetic": "/laʊd/",
    "definition": "Producing or capable of producing much noise; easily heard.",
    "definitionVn": "to, ồn ào (âm thanh)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Don't play music too loud with headphones.",
      "A loud clap of thunder startled the room."
    ],
    "exampleTranslations": [
      "Đừng bật nhạc quá to khi đeo tai nghe nhé.",
      "Một tiếng sấm to vang lên làm giật mình cả căn phòng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_15",
    "word": "quiet",
    "phonetic": "/ˈkwaɪət/",
    "definition": "Making little or no noise.",
    "definitionVn": "yên tĩnh, êm ả",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The library is a quiet place to read and study.",
      "Please be quiet while others are sleeping."
    ],
    "exampleTranslations": [
      "Thư viện là một nơi yên tĩnh để đọc sách và học tập.",
      "Xin vui lòng giữ trật tự trong khi người khác đang ngủ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_16",
    "word": "soft",
    "phonetic": "/sɔːft/",
    "definition": "Easy to mold, cut, compress, or fold; not hard or firm to the touch.",
    "definitionVn": "mềm mại, êm ái",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The baby is sleeping on a soft pillow.",
      "Her voice is soft and gentle."
    ],
    "exampleTranslations": [
      "Em bé đang ngủ trên một chiếc gối mềm mại.",
      "Giọng nói của cô ấy thật nhẹ nhàng và êm ái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_17",
    "word": "hard",
    "phonetic": "/hɑːrd/",
    "definition": "Solid, firm, and rigid; not easily broken, bent, or pierced.",
    "definitionVn": "cứng, rắn chắc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Diamonds are the hardest natural minerals.",
      "A walnut has a hard outer shell."
    ],
    "exampleTranslations": [
      "Kim cương là khoáng vật tự nhiên cứng nhất.",
      "Quả óc chó có lớp vỏ ngoài rất cứng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_18",
    "word": "sweet",
    "phonetic": "/swiːt/",
    "definition": "Having the pleasant taste characteristic of sugar or honey.",
    "definitionVn": "ngọt ngào, có vị ngọt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Ripe mangoes are naturally sweet and juicy.",
      "She has a sweet and caring smile."
    ],
    "exampleTranslations": [
      "Xoài chín có vị ngọt tự nhiên và mọng nước.",
      "Cô ấy có nụ cười ngọt ngào và chu đáo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_19",
    "word": "sour",
    "phonetic": "/ˈsaʊər/",
    "definition": "Having an acid taste like lemon or vinegar.",
    "definitionVn": "chua, có vị chua",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Green lemons have a sharp sour taste.",
      "Yogurt has a pleasantly sour flavor."
    ],
    "exampleTranslations": [
      "Những quả chanh xanh có vị chua gắt.",
      "Sữa chua có hương vị chua thanh dễ chịu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_20",
    "word": "salty",
    "phonetic": "/ˈsɔːlti/",
    "definition": "Tasting of, containing, or preserved with salt.",
    "definitionVn": "mặn, có vị mặn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Ocean seawater is naturally salty.",
      "Potato chips are crunchy and slightly salty."
    ],
    "exampleTranslations": [
      "Nước biển đại dương có vị mặn tự nhiên.",
      "Khoai tây chiên giòn rụm và hơi mặn nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_GIAC_QUAN_CAM_NHAN: VocabularyTopicPackage = {
  theme: THEME_GIAC_QUAN_CAM_NHAN,
  vocabs: VOCABS_GIAC_QUAN_CAM_NHAN,
};

export default CHUDE_GIAC_QUAN_CAM_NHAN;
