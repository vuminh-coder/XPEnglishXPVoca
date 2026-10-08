import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 15: Thời tiết & Thiên nhiên (Weather & Nature)
 * Mã chủ đề: t_basic_weather_nature
 * Tổng số từ vựng: 25 từ
 */
export const THEME_THOI_TIET_THIEN_NHIEN: BasicTheme = {
  "id": "t_basic_weather_nature",
  "name": "Thời tiết & Thiên nhiên",
  "nameEn": "Weather & Nature",
  "icon": "🌤️",
  "difficulty": 1,
  "color": "#16a34a",
  "description": "Nắng, mưa, gió, mây, cây cỏ, sông núi và tự nhiên.",
  "totalVocabs": 25
};

export const VOCABS_THOI_TIET_THIEN_NHIEN: BasicVocabularyItem[] = [
  {
    "id": "bv_weathe_01",
    "word": "weather",
    "phonetic": "/ˈweðər/",
    "definition": "The state of the atmosphere at a place and time regarding heat, cloudiness, dryness, sunshine, wind, rain.",
    "definitionVn": "thời tiết, khí hậu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "What is the weather like today? — It is sunny!",
      "The weather is very pleasant in autumn."
    ],
    "exampleTranslations": [
      "Thời tiết hôm nay thế nào? — Trời nhiều nắng!",
      "Thời tiết rất dễ chịu vào mùa thu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_02",
    "word": "sun",
    "phonetic": "/sʌn/",
    "definition": "The star around which the earth orbits, providing light and warmth.",
    "definitionVn": "mặt trời, ánh nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The sun rises in the east and sets in the west.",
      "The warm sun feels great."
    ],
    "exampleTranslations": [
      "Mặt trời mọc ở hướng đông và lặn ở hướng tây.",
      "Ánh nắng ấm áp đem lại cảm giác thật tuyệt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_03",
    "word": "sunny",
    "phonetic": "/ˈsʌni/",
    "definition": "Bright with sunlight.",
    "definitionVn": "nhiều nắng, có nắng đẹp",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "It is a bright and sunny day today.",
      "Let's go for a picnic on this sunny morning."
    ],
    "exampleTranslations": [
      "Hôm nay là một ngày tươi sáng và nhiều nắng.",
      "Hãy đi dã ngoại vào buổi sáng nắng đẹp này nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_04",
    "word": "rain",
    "phonetic": "/reɪn/",
    "definition": "Moisture condensed from the atmosphere that falls visibly in separate drops.",
    "definitionVn": "cơn mưa, mưa rơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Take an umbrella; it looks like rain.",
      "The gentle rain makes everything green."
    ],
    "exampleTranslations": [
      "Hãy mang theo ô nhé; trời trông như sắp mưa đấy.",
      "Cơn mưa rào êm dịu làm mọi thứ thêm xanh tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_05",
    "word": "rainy",
    "phonetic": "/ˈreɪni/",
    "definition": "Having a great deal of rainfall.",
    "definitionVn": "mưa nhiều, ngày mưa",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "I love staying inside and reading books on rainy days.",
      "The rainy season starts in May."
    ],
    "exampleTranslations": [
      "Tôi thích ở trong nhà đọc sách vào những ngày mưa.",
      "Mùa mưa bắt đầu từ tháng Năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_06",
    "word": "wind",
    "phonetic": "/wɪnd/",
    "definition": "The perceptible natural movement of the air.",
    "definitionVn": "ngọn gió, làn gió",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "A cool wind is blowing from the sea.",
      "The strong wind blew my hat away."
    ],
    "exampleTranslations": [
      "Một làn gió mát đang thổi từ biển vào.",
      "Cơn gió mạnh đã thổi bay chiếc mũ của tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_07",
    "word": "windy",
    "phonetic": "/ˈwɪndi/",
    "definition": "Marked by or exposed to strong winds.",
    "definitionVn": "nhiều gió, lộng gió",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "It is too windy to play badminton outside.",
      "A windy day is perfect for flying kites."
    ],
    "exampleTranslations": [
      "Trời quá nhiều gió để có thể chơi cầu lông ngoài trời.",
      "Một ngày lộng gió rất hoàn hảo để thả diều."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_08",
    "word": "cloud",
    "phonetic": "/klaʊd/",
    "definition": "A visible mass of condensed water vapor floating in the atmosphere.",
    "definitionVn": "đám mây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "White fluffy clouds float in the blue sky.",
      "Dark storm clouds are gathering on the horizon."
    ],
    "exampleTranslations": [
      "Những đám mây trắng bồng bềnh trôi trên bầu trời xanh.",
      "Những đám mây đen vần vũ đang tụ lại nơi đường chân trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_09",
    "word": "cloudy",
    "phonetic": "/ˈklaʊdi/",
    "definition": "Covered with or characterized by clouds; overcast.",
    "definitionVn": "nhiều mây, râm mát",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "It is cloudy today, so it won't be too hot.",
      "The sky is overcast and cloudy."
    ],
    "exampleTranslations": [
      "Hôm nay trời nhiều mây nên sẽ không quá nóng.",
      "Bầu trời u ám và phủ đầy mây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_10",
    "word": "snow",
    "phonetic": "/snoʊ/",
    "definition": "Atmospheric water vapor frozen into ice crystals and falling in light white flakes.",
    "definitionVn": "tuyết, tuyết rơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Children love building a snowman in the fresh snow.",
      "Snow covers the mountaintops in winter."
    ],
    "exampleTranslations": [
      "Trẻ em thích đắp người tuyết trong lớp tuyết mới rơi.",
      "Tuyết bao phủ các đỉnh núi vào mùa đông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_11",
    "word": "rainbow",
    "phonetic": "/ˈreɪnboʊ/",
    "definition": "An arch of colors formed in the sky in certain circumstances, caused by the refraction and dispersion of the sun's light by rain.",
    "definitionVn": "cầu vồng (bảy sắc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "A gorgeous rainbow appeared in the sky after the rain.",
      "A rainbow has seven distinct colors."
    ],
    "exampleTranslations": [
      "Một chiếc cầu vồng tuyệt đẹp xuất hiện trên bầu trời sau cơn mưa.",
      "Cầu vồng có bảy sắc màu riêng biệt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_12",
    "word": "sky",
    "phonetic": "/skaɪ/",
    "definition": "The region of the atmosphere and outer space seen from the earth.",
    "definitionVn": "bầu trời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The sky is crystal clear and blue this morning.",
      "Stars twinkle like diamonds in the night sky."
    ],
    "exampleTranslations": [
      "Bầu trời sáng nay trong vắt và xanh ngắt.",
      "Các vì sao lấp lánh như kim cương trên bầu trời đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_13",
    "word": "star",
    "phonetic": "/stɑːr/",
    "definition": "A fixed luminous point in the night sky.",
    "definitionVn": "ngôi sao, vì sao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Look up at the millions of twinkling stars.",
      "The North Star guides travelers at night."
    ],
    "exampleTranslations": [
      "Hãy ngước nhìn hàng triệu vì sao đang lấp lánh.",
      "Sao Bắc Đẩu dẫn đường cho người lữ hành ban đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_14",
    "word": "moon",
    "phonetic": "/muːn/",
    "definition": "The natural satellite of the earth, visible by reflected light from the sun.",
    "definitionVn": "mặt trăng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The full moon shines brightly during Mid-Autumn festival.",
      "The moon reflects light from the sun."
    ],
    "exampleTranslations": [
      "Mặt trăng tròn tỏa sáng rực rỡ trong đêm rằm Trung Thu.",
      "Mặt trăng phản chiếu ánh sáng từ mặt trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_15",
    "word": "nature",
    "phonetic": "/ˈneɪtʃər/",
    "definition": "The physical world collective, including plants, animals, the landscape, and other features.",
    "definitionVn": "thiên nhiên, tự nhiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Spending time in nature reduces stress and brings joy.",
      "We must protect nature for future generations."
    ],
    "exampleTranslations": [
      "Dành thời gian hòa mình vào thiên nhiên giúp giảm căng thẳng và mang lại niềm vui.",
      "Chúng ta phải bảo vệ thiên nhiên cho các thế hệ tương lai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_16",
    "word": "tree",
    "phonetic": "/triː/",
    "definition": "A woody perennial plant, typically having a single stem or trunk.",
    "definitionVn": "cây cối, cái cây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Trees give us cool shade and produce oxygen.",
      "Planting trees helps fight climate change."
    ],
    "exampleTranslations": [
      "Cây cối cho bóng râm mát và tạo ra oxy.",
      "Trồng cây xanh giúp chống lại biến đổi khí hậu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_17",
    "word": "flower",
    "phonetic": "/ˈflaʊər/",
    "definition": "The seed-bearing part of a plant, consisting of reproductive organs typically surrounded by a brightly colored corolla.",
    "definitionVn": "bông hoa, hoa tươi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Colorful flowers bloom beautifully in springtime.",
      "He gave his mother a fragrant bouquet of flowers."
    ],
    "exampleTranslations": [
      "Những bông hoa nhiều màu sắc đua nhau khoe sắc rực rỡ vào mùa xuân.",
      "Anh ấy tặng mẹ một bó hoa thơm ngát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_18",
    "word": "grass",
    "phonetic": "/ɡræs/",
    "definition": "Vegetation consisting of typically short plants with long narrow leaves.",
    "definitionVn": "bãi cỏ, ngọn cỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The fresh green grass is soft under our bare feet.",
      "Do not walk on the garden grass."
    ],
    "exampleTranslations": [
      "Bãi cỏ xanh tươi mềm mại dưới đôi chân trần của chúng tôi.",
      "Xin vui lòng không dẫm lên cỏ trong vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_19",
    "word": "river",
    "phonetic": "/ˈrɪvər/",
    "definition": "A large natural stream of water flowing in a channel to the sea, a lake, or another stream.",
    "definitionVn": "dòng sông, con sông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The Red River flows through the capital city of Hanoi.",
      "Children love swimming in the calm river on hot days."
    ],
    "exampleTranslations": [
      "Sông Hồng chảy qua thủ đô Hà Nội.",
      "Lũ trẻ thích bơi lội dưới dòng sông êm đềm vào những ngày nắng nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_20",
    "word": "sea",
    "phonetic": "/siː/",
    "definition": "The expanse of salt water that covers most of the earth's surface.",
    "definitionVn": "biển, đại dương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "We swam in the warm blue sea during our summer vacation.",
      "The sea breeze feels incredibly fresh."
    ],
    "exampleTranslations": [
      "Chúng tôi đã bơi lội dưới làn nước biển xanh ấm áp trong kỳ nghỉ hè.",
      "Làn gió biển mang lại cảm giác vô cùng trong lành."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_21",
    "word": "drizzle",
    "phonetic": "/ˈdrɪz.əl/",
    "definition": "Light rain falling in very fine, misty drops.",
    "definitionVn": "mưa phùn, mưa bay lất phất",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature Elements",
    "examples": [
      "A gentle spring drizzle moistened the flower petals across the municipal park.",
      "We did not need an umbrella because the sky only produced a brief, passing drizzle."
    ],
    "exampleTranslations": [
      "Một cơn mưa phùn mùa xuân dịu nhẹ làm ẩm những cánh hoa trên khắp công viên thành phố.",
      "Chúng tôi không cần ô vì bầu trời chỉ tạo ra một cơn mưa phùn thoáng qua ngắn ngủi."
    ],
    "synonyms": [
      "misty rain",
      "light shower"
    ],
    "antonyms": [
      "downpour",
      "torrential rain"
    ]
  },
  {
    "id": "bv_weathe_22",
    "word": "thunderstorm",
    "phonetic": "/ˈθʌn.dɚ.stɔːrm/",
    "definition": "A transient storm accompanied by lightning, roaring thunder, and heavy downpours.",
    "definitionVn": "cơn dông bão có sấm chớp và mưa rào lớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature Elements",
    "examples": [
      "The afternoon heat gave way to a violent thunderstorm that shook windows across the suburb.",
      "Aviation radars diverted approaching aircraft away from the severe thunderstorm front."
    ],
    "exampleTranslations": [
      "Cái nóng buổi chiều nhường chỗ cho một cơn dông dữ dội làm rung chuyển các cửa sổ khắp vùng ngoại ô.",
      "Radar hàng không đã chuyển hướng các máy bay đang đến tránh xa khối dông bão nghiêm trọng."
    ],
    "synonyms": [
      "electrical storm",
      "tempest"
    ],
    "antonyms": [
      "clear skies",
      "calm weather"
    ]
  },
  {
    "id": "bv_weathe_23",
    "word": "breeze",
    "phonetic": "/briːz/",
    "definition": "A gentle, light, and refreshing wind.",
    "definitionVn": "làn gió thoảng nhẹ nhàng, mát mẻ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature Elements",
    "examples": [
      "A cool ocean breeze rustled through the palm fronds on the sunlit terrace.",
      "Sitting by the open lakeside window, we enjoyed the soothing evening breeze."
    ],
    "exampleTranslations": [
      "Một làn gió biển mát lành xào xạc qua những tán lá cọ trên sân hiên ngập tràn ánh nắng.",
      "Ngồi bên cửa sổ mở ven hồ, chúng tôi tận hưởng làn gió tối dịu êm."
    ],
    "synonyms": [
      "gentle wind",
      "zephyr",
      "draft"
    ],
    "antonyms": [
      "gale",
      "hurricane"
    ]
  },
  {
    "id": "bv_weathe_24",
    "word": "rainbow",
    "phonetic": "/ˈreɪn.boʊ/",
    "definition": "An arch of colors formed in the sky in certain circumstances, caused by the refraction of sunlight through raindrops.",
    "definitionVn": "cầu vồng bảy sắc sau cơn mưa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature Elements",
    "examples": [
      "As soon as the afternoon storm passed, a magnificent double rainbow arched over the valley.",
      "Children pointed excitedly at the vivid rainbow shining against the dissipating gray clouds."
    ],
    "exampleTranslations": [
      "Ngay sau khi cơn bão buổi chiều qua đi, một cầu vồng đôi tráng lệ uốn lượn qua thung lũng.",
      "Lũ trẻ hào hứng chỉ tay vào chiếc cầu vồng rực rỡ tỏa sáng trên nền mây xám đang tan dần."
    ],
    "synonyms": [
      "solar optical spectrum arc"
    ],
    "antonyms": []
  },
  {
    "id": "bv_weathe_25",
    "word": "humidity",
    "phonetic": "/hjuːˈmɪd.ə.t̬i/",
    "definition": "The state or quality of being humid; a high quantity of moisture or water vapor in the atmosphere.",
    "definitionVn": "độ ẩm không khí, cảm giác nồm ẩm oi bức",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature Elements",
    "examples": [
      "High tropical humidity makes a thirty-degree day feel substantially hotter than it actually is.",
      "Running a dehumidifier in the basement protects wooden furniture from damp humidity."
    ],
    "exampleTranslations": [
      "Độ ẩm nhiệt đới cao làm cho một ngày ba mươi độ có cảm giác nóng hơn đáng kể so với thực tế.",
      "Chạy máy hút ẩm trong tầng hầm giúp bảo vệ đồ nội thất bằng gỗ khỏi độ ẩm ướt."
    ],
    "synonyms": [
      "moisture content",
      "dampness",
      "mugginess"
    ],
    "antonyms": [
      "dryness",
      "aridity"
    ]
  }
];

export const CHUDE_THOI_TIET_THIEN_NHIEN: VocabularyTopicPackage = {
  theme: THEME_THOI_TIET_THIEN_NHIEN,
  vocabs: VOCABS_THOI_TIET_THIEN_NHIEN,
};

export default CHUDE_THOI_TIET_THIEN_NHIEN;
