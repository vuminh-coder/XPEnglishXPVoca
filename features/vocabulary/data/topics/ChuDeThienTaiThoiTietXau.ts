import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 33: Thiên tai & Thời tiết xấu (Severe Weather)
 * Mã chủ đề: t_basic_severe_weather
 * Tổng số từ vựng: 20 từ
 */
export const THEME_THIEN_TAI_THOI_TIET_XAU: BasicTheme = {
  "id": "t_basic_severe_weather",
  "name": "Thiên tai & Thời tiết xấu",
  "nameEn": "Severe Weather",
  "icon": "⛈️",
  "difficulty": 1,
  "color": "#475569",
  "description": "Bão lớn, sấm sét, lũ lụt, hạn hán, lốc xoáy và an toàn trú ẩn.",
  "totalVocabs": 20
};

export const VOCABS_THIEN_TAI_THOI_TIET_XAU: BasicVocabularyItem[] = [
  {
    "id": "bv_severe_01",
    "word": "storm",
    "phonetic": "/stɔːrm/",
    "definition": "A violent disturbance of the atmosphere with strong winds and usually rain, thunder, lightning, or snow.",
    "definitionVn": "cơn giông bão, bão lớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Stay indoors during the severe tropical storm.",
      "The storm brought heavy rain and strong gusts."
    ],
    "exampleTranslations": [
      "Hãy ở trong nhà trong suốt cơn bão nhiệt đới dữ dội nhé.",
      "Cơn bão mang theo mưa to và gió giật mạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_02",
    "word": "thunder",
    "phonetic": "/ˈθʌndər/",
    "definition": "A loud rumbling or crashing noise heard after a lightning flash due to the expansion of rapidly heated air.",
    "definitionVn": "tiếng sấm, sấm sét",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Loud rolling thunder echoed across the dark sky.",
      "The dog hid under the bed because of the thunder."
    ],
    "exampleTranslations": [
      "Tiếng sấm vang rền vang vọng khắp bầu trời tăm tối.",
      "Chú chó trốn dưới gầm giường vì tiếng sấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_03",
    "word": "lightning",
    "phonetic": "/ˈlaɪtnɪŋ/",
    "definition": "The occurrence of a natural electrical discharge of very short duration and high voltage between a cloud and the ground.",
    "definitionVn": "tia sét, ánh chớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "A bright flash of lightning illuminated the entire room.",
      "Never stand under tall solitary trees during lightning."
    ],
    "exampleTranslations": [
      "Một tia chớp sáng rực thắp sáng cả căn phòng.",
      "Không bao giờ đứng dưới những cây cao đơn độc khi có sấm sét nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_04",
    "word": "flood",
    "phonetic": "/flʌd/",
    "definition": "An overflow of a large amount of water beyond its normal limits, especially over what is normally dry land.",
    "definitionVn": "lũ lụt, ngập úng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Heavy seasonal rains caused urban floods in the streets.",
      "Villagers moved to higher ground to escape the flood."
    ],
    "exampleTranslations": [
      "Mưa lớn theo mùa đã gây ngập lụt trên các tuyến phố đô thị.",
      "Dân làng đã chuyển lên vùng đất cao hơn để tránh lũ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_05",
    "word": "drought",
    "phonetic": "/draʊt/",
    "definition": "A prolonged period of abnormally low rainfall, leading to a shortage of water.",
    "definitionVn": "hạn hán, khô hạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The severe drought dried up the farmland and ponds.",
      "Save fresh water during long periods of drought."
    ],
    "exampleTranslations": [
      "Trận hạn hán khắc nghiệt đã làm khô cạn đồng ruộng và ao hồ.",
      "Hãy tiết kiệm nước sạch trong những đợt khô hạn kéo dài."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_06",
    "word": "earthquake",
    "phonetic": "/ˈɜːrθkweɪk/",
    "definition": "A sudden and violent shaking of the ground, sometimes causing great destruction, as a result of movements within the earth's crust.",
    "definitionVn": "trận động đất",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Buildings in Japan are designed to withstand earthquakes.",
      "Drop, cover, and hold on during an earthquake."
    ],
    "exampleTranslations": [
      "Các tòa nhà ở Nhật Bản được thiết kế để chống chịu động đất.",
      "Hãy cúi xuống, che chắn và bám chặt khi có động đất nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_07",
    "word": "typhoon",
    "phonetic": "/taɪˈfuːn/",
    "definition": "A tropical storm in the region of the Indian or western Pacific oceans.",
    "definitionVn": "cơn bão biển nhiệt đới",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The coastal provinces prepared defenses against the incoming typhoon.",
      "Typhoons bring heavy rains and gale-force winds."
    ],
    "exampleTranslations": [
      "Các tỉnh ven biển đã chuẩn bị phương án phòng chống cơn bão nhiệt đới sắp tới.",
      "Bão biển mang theo mưa lớn và gió giật cấp bão."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_08",
    "word": "tornado",
    "phonetic": "/tɔːrˈneɪdoʊ/",
    "definition": "A mobile, destructive vortex of violently rotating winds having the appearance of a funnel-shaped cloud.",
    "definitionVn": "cơn lốc xoáy, vòi rồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The powerful tornado damaged houses in its narrow path.",
      "Seek shelter underground if a tornado approaches."
    ],
    "exampleTranslations": [
      "Cơn lốc xoáy kinh hoàng đã tàn phá các ngôi nhà trên đường đi hẹp của nó.",
      "Hãy tìm nơi trú ẩn dưới lòng đất nếu có lốc xoáy đến gần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_09",
    "word": "fog",
    "phonetic": "/fɑːɡ/",
    "definition": "A thick cloud of tiny water droplets suspended in the atmosphere at or near the earth's surface.",
    "definitionVn": "sương mù (dày đặc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Dense morning fog blanketed the mountain town of Sapa.",
      "Turn on fog lights when driving through thick fog."
    ],
    "exampleTranslations": [
      "Lớp sương mù sớm dày đặc bao phủ thị trấn vùng núi Sa Pa.",
      "Bật đèn sương mù khi lái xe qua lớp sương mù dày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_10",
    "word": "foggy",
    "phonetic": "/ˈfɑːɡi/",
    "definition": "Full of or accompanied by fog.",
    "definitionVn": "nhiều sương mù, mờ mịt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "It is a cold and foggy morning in the valley.",
      "Drive slowly on foggy mountain passes."
    ],
    "exampleTranslations": [
      "Đó là một buổi sáng lạnh và nhiều sương mù trong thung lũng.",
      "Hãy lái xe chậm rãi trên những con đèo nhiều sương mù nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_11",
    "word": "frost",
    "phonetic": "/frɔːst/",
    "definition": "A deposit of small white ice crystals formed on the ground or other surfaces when the temperature falls below freezing point.",
    "definitionVn": "sương giá, băng giá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Delicate white frost covered the green grass at dawn.",
      "Winter frost can damage delicate young crops."
    ],
    "exampleTranslations": [
      "Lớp sương giá trắng mỏng bao phủ bãi cỏ xanh lúc rạng đông.",
      "Băng giá mùa đông có thể làm hỏng các mầm cây non."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_12",
    "word": "ice",
    "phonetic": "/aɪs/",
    "definition": "Frozen water, a brittle, transparent crystalline solid.",
    "definitionVn": "băng tuyết, đá lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Put two ice cubes into your glass of lemonade.",
      "Be careful not to slip on the smooth ice."
    ],
    "exampleTranslations": [
      "Thả hai viên đá lạnh vào ly nước chanh của bạn nhé.",
      "Hãy cẩn thận kẻo trượt chân trên lớp băng trơn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_13",
    "word": "hail",
    "phonetic": "/heɪl/",
    "definition": "Pellets of frozen rain which fall in showers from cumulonimbus clouds.",
    "definitionVn": "mưa đá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The sudden hail storm dented car roofs.",
      "Hail stones can fall at high speeds."
    ],
    "exampleTranslations": [
      "Cơn mưa đá bất ngờ đã làm móp méo nóc xe ô tô.",
      "Những viên đá mưa có thể rơi với tốc độ rất cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_14",
    "word": "heatwave",
    "phonetic": "/ˈhiːtweɪv/",
    "definition": "A prolonged period of abnormally hot weather.",
    "definitionVn": "đợt nắng nóng gay gắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Stay hydrated and avoid direct sun during the summer heatwave.",
      "The heatwave set record high temperatures."
    ],
    "exampleTranslations": [
      "Uống đủ nước và tránh ánh nắng trực tiếp trong đợt nắng nóng mùa hè nhé.",
      "Đợt nắng nóng gay gắt đã lập kỷ lục nhiệt độ cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_15",
    "word": "blizzard",
    "phonetic": "/ˈblɪzərd/",
    "definition": "A severe snowstorm with high winds and low visibility.",
    "definitionVn": "trận bão tuyết dữ dội",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The mountain roads were blocked by a ferocious winter blizzard.",
      "Stay inside your warm cabin during the blizzard."
    ],
    "exampleTranslations": [
      "Những con đường vùng núi bị chia cắt bởi trận bão tuyết mùa đông dữ dội.",
      "Hãy ở trong căn nhà gỗ ấm áp trong suốt trận bão tuyết nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_16",
    "word": "warning",
    "phonetic": "/ˈwɔːrnɪŋ/",
    "definition": "A statement or event that warns of something or that serves as cautionary advice.",
    "definitionVn": "lời cảnh báo, dự báo khẩn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The meteorological agency issued a severe storm warning.",
      "Heed official weather warnings and prepare supplies."
    ],
    "exampleTranslations": [
      "Cơ quan khí tượng đã phát đi lời cảnh báo bão dữ dội.",
      "Hãy chú ý đến các cảnh báo thời tiết chính thức và chuẩn bị nhu yếu phẩm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_17",
    "word": "safe",
    "phonetic": "/seɪf/",
    "definition": "Protected from or not exposed to danger or risk.",
    "definitionVn": "an toàn, bình an",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Stay in a safe and sturdy shelter during the storm.",
      "We arrived home safe and sound."
    ],
    "exampleTranslations": [
      "Hãy ở trong nơi trú ẩn an toàn và kiên cố trong cơn bão nhé.",
      "Chúng tôi đã về đến nhà bình an vô sự."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_18",
    "word": "danger",
    "phonetic": "/ˈdeɪndʒər/",
    "definition": "The possibility of suffering harm or injury.",
    "definitionVn": "mối nguy hiểm, sự hiểm nguy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Do not cross flooded bridges because of high danger.",
      "Warning signs alert travelers to potential road danger."
    ],
    "exampleTranslations": [
      "Không băng qua những cây cầu ngập nước vì mối nguy hiểm rất cao.",
      "Biển cảnh báo nhắc nhở người đi đường về những hiểm nguy tiềm ẩn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_19",
    "word": "shelter",
    "phonetic": "/ˈʃeltər/",
    "definition": "A place giving temporary protection from bad weather or danger.",
    "definitionVn": "nơi trú ẩn, chỗ trú mưa bão",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Hikers found shelter in a dry mountain cave during the downpour.",
      "The community center served as an emergency shelter."
    ],
    "exampleTranslations": [
      "Những người leo núi đã tìm thấy nơi trú ẩn trong một hang đá khô ráo khi trời mưa như trút.",
      "Trung tâm cộng đồng được dùng làm nơi trú ẩn khẩn cấp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_20",
    "word": "rescue",
    "phonetic": "/ˈreskjuː/",
    "definition": "Save someone from a dangerous or distressing situation.",
    "definitionVn": "giải cứu, cứu nạn",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Brave rescue teams saved flood victims by boat.",
      "Helicopters carried out mountain rescue missions."
    ],
    "exampleTranslations": [
      "Các đội cứu hộ dũng cảm đã cứu các nạn nhân lũ lụt bằng thuyền.",
      "Trực thăng đã thực hiện các nhiệm vụ cứu nạn trên vùng núi."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_THIEN_TAI_THOI_TIET_XAU: VocabularyTopicPackage = {
  theme: THEME_THIEN_TAI_THOI_TIET_XAU,
  vocabs: VOCABS_THIEN_TAI_THOI_TIET_XAU,
};

export default CHUDE_THIEN_TAI_THOI_TIET_XAU;
