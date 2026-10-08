import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 51: Ánh sáng & Thị giác (Light & Visual Effects)
 * Mã chủ đề: t_basic_light_visual_effects
 * Tổng số từ vựng: 20 từ
 */
export const THEME_ANH_SANG_THI_GIAC: BasicTheme = {
  "id": "t_basic_light_visual_effects",
  "name": "Ánh sáng & Thị giác",
  "nameEn": "Light & Visual Effects",
  "icon": "💡",
  "difficulty": 1,
  "color": "#eab308",
  "description": "Ánh nắng, bóng râm, phát sáng, lấp lánh, tia chớp, nến, trong suốt và hình ảnh.",
  "totalVocabs": 20
};

export const VOCABS_ANH_SANG_THI_GIAC: BasicVocabularyItem[] = [
  {
    "id": "bv_light__01",
    "word": "light",
    "phonetic": "/laɪt/",
    "definition": "The natural agent that stimulates sight and makes things visible.",
    "definitionVn": "ánh sáng, tia sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Natural sunlight floods the living room in the morning.",
      "Turn on the desk light to read clearly."
    ],
    "exampleTranslations": [
      "Ánh nắng mặt trời tự nhiên tràn ngập phòng khách vào buổi sáng.",
      "Bật đèn bàn lên để đọc sách rõ ràng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__02",
    "word": "shadow",
    "phonetic": "/ˈʃædoʊ/",
    "definition": "A dark area or shape produced by a body coming between rays of light and a surface.",
    "definitionVn": "bóng râm, chiếc bóng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "We rested in the cool shadow of a massive banyan tree.",
      "Your shadow gets longer as the sun sets."
    ],
    "exampleTranslations": [
      "Chúng tôi nghỉ ngơi dưới bóng râm mát rượi của cây đa cổ thụ.",
      "Bóng của bạn dài dần ra khi mặt trời lặn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__03",
    "word": "dark",
    "phonetic": "/dɑːrk/",
    "definition": "With little or no light; of deep color.",
    "definitionVn": "bóng tối, tối mịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Stars twinkle brightly in the pitch dark night sky.",
      "Cats see remarkably well in the dark."
    ],
    "exampleTranslations": [
      "Các vì sao lấp lánh rực rỡ trên bầu trời đêm tối mịt.",
      "Mèo nhìn rất tốt trong bóng tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__04",
    "word": "bright",
    "phonetic": "/braɪt/",
    "definition": "Giving out or reflecting a lot of light; shining.",
    "definitionVn": "sáng rực, tươi sáng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The morning sun is bright and cheerful.",
      "She has a bright future ahead of her."
    ],
    "exampleTranslations": [
      "Ánh nắng ban mai rực rỡ và tươi vui.",
      "Cô ấy có một tương lai tươi sáng rộng mở phía trước."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__05",
    "word": "glow",
    "phonetic": "/ɡloʊ/",
    "definition": "Give out steady light without flame.",
    "definitionVn": "phát sáng, tỏa sáng êm dịu",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Fireflies glow magically in the summer evening woods.",
      "The warm fireplace gave a cozy golden glow."
    ],
    "exampleTranslations": [
      "Những chú đom đóm phát sáng kỳ diệu trong cánh rừng đêm mùa hè.",
      "Lò sưởi ấm áp tỏa ra ánh sáng vàng êm đềm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__06",
    "word": "shine",
    "phonetic": "/ʃaɪn/",
    "definition": "Give out or reflect light; be bright.",
    "definitionVn": "chiếu sáng, tỏa ánh hào quang",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The sun shines warmly over the peaceful beach.",
      "Polish your leather shoes so they shine."
    ],
    "exampleTranslations": [
      "Mặt trời chiếu sáng ấm áp trên bãi biển thanh bình.",
      "Đánh bóng đôi giày da của bạn để chúng sáng bóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__07",
    "word": "sparkle",
    "phonetic": "/ˈspɑːrkl/",
    "definition": "Shine brightly with flashes of light; glitter.",
    "definitionVn": "lấp lánh, lóng lánh",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Morning dew drops sparkle like diamonds on grass blades.",
      "The blue sea sparkles under the midday sun."
    ],
    "exampleTranslations": [
      "Những giọt sương mai lấp lánh như kim cương trên ngọn cỏ.",
      "Biển xanh lóng lánh dưới ánh mặt trời ban trưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__08",
    "word": "flash",
    "phonetic": "/flæʃ/",
    "definition": "A sudden brief burst of bright light.",
    "definitionVn": "ánh chớp, tia sáng lóe lên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "A sudden flash of lightning illuminated the stormy sky.",
      "The camera flash captured the group smile."
    ],
    "exampleTranslations": [
      "Một tia chớp bất chợt lóe lên thắp sáng bầu trời giông bão.",
      "Đèn flash máy ảnh đã bắt trọn nụ cười của cả nhóm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__09",
    "word": "beam",
    "phonetic": "/biːm/",
    "definition": "A ray or shaft of light.",
    "definitionVn": "chùm sáng, luồng sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "A beam of sunlight streamed through the window curtains.",
      "The lighthouse sends out a rotating beam of light."
    ],
    "exampleTranslations": [
      "Một luồng ánh nắng mặt trời chiếu xuyên qua rèm cửa sổ.",
      "Ngọn hải đăng phát ra một luồng sáng xoay tròn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__10",
    "word": "sunlight",
    "phonetic": "/ˈsʌnlaɪt/",
    "definition": "Light from the sun.",
    "definitionVn": "ánh nắng mặt trời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Morning sunlight helps the body produce Vitamin D naturally.",
      "Plants need water and sunlight to thrive."
    ],
    "exampleTranslations": [
      "Ánh nắng mặt trời buổi sớm giúp cơ thể tạo ra Vitamin D một cách tự nhiên.",
      "Cây cối cần nước và ánh nắng để phát triển tươi tốt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__11",
    "word": "moonlight",
    "phonetic": "/ˈmuːnlaɪt/",
    "definition": "The light of the moon.",
    "definitionVn": "ánh trăng, ánh nguyệt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The calm lake reflected silver moonlight on Mid-Autumn night.",
      "Walking on the beach by moonlight is romantic."
    ],
    "exampleTranslations": [
      "Mặt hồ êm đềm phản chiếu ánh trăng bạc trong đêm rằm Trung Thu.",
      "Đi dạo trên bãi biển dưới ánh trăng thật lãng mạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__12",
    "word": "lamp",
    "phonetic": "/læmp/",
    "definition": "A device for giving light, consisting of an electric bulb or tube with a shade or cover.",
    "definitionVn": "chiếc đèn bàn, đèn chiếu sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Switch on the desk study lamp to protect your eyesight.",
      "The bedside lamp gives a soft and gentle warm light."
    ],
    "exampleTranslations": [
      "Bật chiếc đèn bàn học lên để bảo vệ thị lực của bạn nhé.",
      "Cây đèn đầu giường tỏa ra ánh sáng ấm áp nhẹ nhàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__13",
    "word": "candle",
    "phonetic": "/ˈkændl/",
    "definition": "A cylinder or block of wax with a central wick which is lit to produce light as it burns.",
    "definitionVn": "cây nến, ngọn nến",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Light the aromatic scented candle to create a relaxing atmosphere.",
      "She blew out all twenty candles on her birthday cake."
    ],
    "exampleTranslations": [
      "Thắp cây nến thơm để tạo bầu không khí thư thái nhé.",
      "Cô ấy đã thổi tắt cả hai mươi ngọn nến trên chiếc bánh sinh nhật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__14",
    "word": "clear",
    "phonetic": "/klɪr/",
    "definition": "Transparent; unclouded; easily seen through.",
    "definitionVn": "trong suốt, trong trẻo, rõ ràng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The sea water in Phu Quoc is crystal clear and blue.",
      "Speak with a clear voice so everyone understands."
    ],
    "exampleTranslations": [
      "Nước biển ở Phú Quốc trong vắt và xanh biếc.",
      "Hãy nói bằng một giọng rõ ràng để mọi người cùng hiểu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__15",
    "word": "transparent",
    "phonetic": "/trænsˈpærənt/",
    "definition": "Allowing light to pass through so that objects behind can be distinctly seen.",
    "definitionVn": "trong suốt (nhìn thấu qua được)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Clean glass is completely transparent.",
      "The water in the mountain stream is so transparent you can see pebbles on the bottom."
    ],
    "exampleTranslations": [
      "Kính sạch thì hoàn toàn trong suốt.",
      "Nước suối vùng núi trong suốt đến mức bạn có thể nhìn thấy sỏi dưới đáy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__16",
    "word": "shiny",
    "phonetic": "/ˈʃaɪni/",
    "definition": "Reflecting light, typically because clean, polished, or smooth.",
    "definitionVn": "sáng bóng, bóng loáng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "He tossed a shiny silver coin into the fountain.",
      "Her clean black hair looks shiny and healthy."
    ],
    "exampleTranslations": [
      "Cậu ấy ném một đồng xu bạc sáng bóng vào đài phun nước.",
      "Mái tóc đen sạch của cô ấy trông bóng mượt và chắc khỏe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__17",
    "word": "dim",
    "phonetic": "/dɪm/",
    "definition": "Not shining brightly or clearly.",
    "definitionVn": "lờ mờ, ánh sáng mờ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Reading in dim light can cause eye strain; turn on a lamp.",
      "The stars appeared dim through the clouds."
    ],
    "exampleTranslations": [
      "Đọc sách trong ánh sáng lờ mờ có thể gây mỏi mắt; hãy bật đèn lên nhé.",
      "Những vì sao hiện lên lờ mờ qua làn mây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__18",
    "word": "reflection",
    "phonetic": "/rɪˈflekʃn/",
    "definition": "The throwing back by a body or surface of light, heat, or sound without absorbing it; an image seen in a mirror or water.",
    "definitionVn": "hình ảnh phản chiếu, sự phản chiếu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Look at your smiling reflection in the mirror.",
      "The calm river captured the mirror reflection of green mountains."
    ],
    "exampleTranslations": [
      "Hãy nhìn hình ảnh phản chiếu nụ cười của bạn trong gương nhé.",
      "Dòng sông phẳng lặng thu trọn hình ảnh phản chiếu như gương của núi xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__19",
    "word": "view",
    "phonetic": "/vjuː/",
    "definition": "The ability to see something or to be seen from a particular position; a sight or panorama.",
    "definitionVn": "tầm nhìn, khung cảnh ngắm nhìn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Our hotel room balcony offers a breathtaking panoramic ocean view.",
      "Climb to the rooftop for a scenic city view."
    ],
    "exampleTranslations": [
      "Ban công phòng khách sạn mở ra tầm nhìn toàn cảnh đại dương đẹp ngỡ ngàng.",
      "Trèo lên sân thượng để ngắm khung cảnh thành phố nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__20",
    "word": "color",
    "phonetic": "/ˈkʌlər/",
    "definition": "The visual perceptual property corresponding in humans to the categories called red, blue, yellow, etc.",
    "definitionVn": "màu sắc, sắc màu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Autumn leaves paint the forest in rich shades of vibrant color.",
      "What is your favorite color? — Sky blue!"
    ],
    "exampleTranslations": [
      "Những chiếc lá thu nhuộm cả khu rừng trong những sắc màu rực rỡ.",
      "Màu sắc yêu thích của bạn là gì? — Màu xanh da trời!"
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_ANH_SANG_THI_GIAC: VocabularyTopicPackage = {
  theme: THEME_ANH_SANG_THI_GIAC,
  vocabs: VOCABS_ANH_SANG_THI_GIAC,
};

export default CHUDE_ANH_SANG_THI_GIAC;
