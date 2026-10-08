import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 19: Sở thích & Thể thao (Hobbies & Sports)
 * Mã chủ đề: t_basic_hobbies_sports
 * Tổng số từ vựng: 25 từ
 */
export const THEME_SO_THICH_THE_THAO: BasicTheme = {
  "id": "t_basic_hobbies_sports",
  "name": "Sở thích & Thể thao",
  "nameEn": "Hobbies & Sports",
  "icon": "⚽",
  "difficulty": 1,
  "color": "#ea580c",
  "description": "Bóng đá, bơi lội, ca hát, đàn piano, vẽ tranh và giải trí.",
  "totalVocabs": 25
};

export const VOCABS_SO_THICH_THE_THAO: BasicVocabularyItem[] = [
  {
    "id": "bv_hobbie_01",
    "word": "hobby",
    "phonetic": "/ˈhɑːbi/",
    "definition": "An activity done regularly in one's leisure time for pleasure.",
    "definitionVn": "sở thích (lúc rảnh rỗi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Reading English books is my favorite hobby.",
      "What hobbies do you enjoy on weekends?"
    ],
    "exampleTranslations": [
      "Đọc sách tiếng Anh là sở thích yêu thích của tôi.",
      "Bạn thích làm những sở thích gì vào cuối tuần?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_02",
    "word": "sport",
    "phonetic": "/spɔːrt/",
    "definition": "An activity involving physical exertion and skill.",
    "definitionVn": "môn thể thao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Playing sports keeps you fit and energetic.",
      "Football is the most popular sport in Vietnam."
    ],
    "exampleTranslations": [
      "Chơi thể thao giúp bạn khỏe mạnh và tràn đầy năng lượng.",
      "Bóng đá là môn thể thao được yêu thích nhất tại Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_03",
    "word": "game",
    "phonetic": "/ɡeɪm/",
    "definition": "A form of play or sport, especially a competitive one played according to rules.",
    "definitionVn": "trò chơi, ván đấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Let's play a fun English word-guessing game!",
      "Board games are great for family evenings."
    ],
    "exampleTranslations": [
      "Cùng chơi trò chơi đoán từ vựng tiếng Anh vui nhộn nào!",
      "Trò chơi cờ bàn rất tuyệt cho những buổi tối gia đình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_04",
    "word": "football",
    "phonetic": "/ˈfʊtbɔːl/",
    "definition": "A form of team game played with a spherical ball; soccer.",
    "definitionVn": "môn bóng đá (túc cầu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "The boys are playing football in the schoolyard.",
      "Vietnam's national football team won the championship."
    ],
    "exampleTranslations": [
      "Các cậu bé đang chơi bóng đá trong sân trường.",
      "Đội tuyển bóng đá quốc gia Việt Nam đã giành chức vô địch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_05",
    "word": "soccer",
    "phonetic": "/ˈsɑːkər/",
    "definition": "A game played by two teams of eleven players with a round ball.",
    "definitionVn": "bóng đá (cách gọi kiểu Mỹ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "He plays soccer as a forward in the local team.",
      "Soccer matches bring fans together."
    ],
    "exampleTranslations": [
      "Cậu ấy chơi bóng đá ở vị trí tiền đạo trong đội bóng địa phương.",
      "Những trận đấu bóng đá kết nối người hâm mộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_06",
    "word": "basketball",
    "phonetic": "/ˈbæskɪtbɔːl/",
    "definition": "A game played between two teams of five players who score points by tossing a ball through a netted hoop.",
    "definitionVn": "môn bóng rổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Playing basketball helps teenagers grow taller.",
      "He shot the basketball straight into the hoop."
    ],
    "exampleTranslations": [
      "Chơi bóng rổ giúp thanh thiếu niên phát triển chiều cao.",
      "Cậu ấy đã ném bóng rổ thẳng vào rổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_07",
    "word": "volleyball",
    "phonetic": "/ˈvɑːlibɔːl/",
    "definition": "A game for two teams, usually of six players, in which a large ball is hit by hand over a high net.",
    "definitionVn": "môn bóng chuyền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Beach volleyball is very fun to play in the summer.",
      "She spiked the volleyball over the net."
    ],
    "exampleTranslations": [
      "Bóng chuyền bãi biển chơi rất vui vào mùa hè.",
      "Cô ấy đã đập bóng chuyền qua lưới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_08",
    "word": "badminton",
    "phonetic": "/ˈbædmɪntən/",
    "definition": "A game with rackets in which a shuttlecock is hit back and forth across a net.",
    "definitionVn": "môn cầu lông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Badminton is popular in parks in the early morning.",
      "He bought a lightweight carbon badminton racket."
    ],
    "exampleTranslations": [
      "Cầu lông rất phổ biến ở các công viên vào sáng sớm.",
      "Anh ấy đã mua một cây vợt cầu lông carbon siêu nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_09",
    "word": "tennis",
    "phonetic": "/ˈtenɪs/",
    "definition": "A game in which two or four players strike a ball with rackets over a net.",
    "definitionVn": "môn quần vợt, tennis",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "They play tennis on clay courts every Sunday.",
      "Tennis requires agility and strong stamina."
    ],
    "exampleTranslations": [
      "Họ chơi quần vợt trên sân đất nện mỗi Chủ Nhật.",
      "Môn quần vợt đòi hỏi sự nhanh nhẹn và thể lực dẻo dai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_10",
    "word": "swimming",
    "phonetic": "/ˈswɪmɪŋ/",
    "definition": "The sport or activity of propelling oneself through water.",
    "definitionVn": "môn bơi lội, bơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Swimming is a full-body exercise that refreshes the mind.",
      "We go swimming at the community pool."
    ],
    "exampleTranslations": [
      "Bơi lội là bài tập toàn thân giúp tinh thần sảng khoái.",
      "Chúng tôi đi bơi ở hồ bơi cộng đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_11",
    "word": "running",
    "phonetic": "/ˈrʌnɪŋ/",
    "definition": "The action or movement of a runner.",
    "definitionVn": "chạy bộ (thể dục)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Morning running builds strong cardiovascular health.",
      "She completed a 5-kilometer running marathon."
    ],
    "exampleTranslations": [
      "Chạy bộ buổi sáng xây dựng sức khỏe tim mạch vững chắc.",
      "Cô ấy đã hoàn thành cự ly chạy marathon 5km."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_12",
    "word": "cycling",
    "phonetic": "/ˈsaɪklɪŋ/",
    "definition": "The activity of riding a bicycle.",
    "definitionVn": "đạp xe đạp thể thao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Cycling around the lake is peaceful and healthy.",
      "He wears a helmet and cycling gloves."
    ],
    "exampleTranslations": [
      "Đạp xe quanh hồ rất thanh bình và tốt cho sức khỏe.",
      "Anh ấy đội mũ bảo hiểm và đeo găng tay đạp xe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_13",
    "word": "chess",
    "phonetic": "/tʃes/",
    "definition": "A board game of strategic skill for two players.",
    "definitionVn": "cờ vua (trò chơi trí tuệ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Playing chess trains strategic thinking and patience.",
      "Checkmate! That was an impressive game of chess."
    ],
    "exampleTranslations": [
      "Chơi cờ vua rèn luyện tư duy chiến lược và tính kiên nhẫn.",
      "Chiếu tướng! Đó là một ván cờ vua rất ấn tượng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_14",
    "word": "guitar",
    "phonetic": "/ɡɪˈtɑːr/",
    "definition": "A stringed musical instrument with a fretted fingerboard.",
    "definitionVn": "đàn ghi-ta, đàn guitar",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "He played an acoustic guitar while we sang around the campfire.",
      "She practices guitar chords every evening."
    ],
    "exampleTranslations": [
      "Anh ấy đệm đàn ghi-ta mộc trong khi chúng tôi cùng hát quanh lửa trại.",
      "Cô ấy luyện các hợp âm ghi-ta mỗi tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_15",
    "word": "piano",
    "phonetic": "/piˈænoʊ/",
    "definition": "A large musical instrument with a keyboard.",
    "definitionVn": "đàn dương cầm, đàn piano",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Classical piano music is soothing and elegant.",
      "She has played the piano since she was five."
    ],
    "exampleTranslations": [
      "Nhạc piano cổ điển rất du dương và trang nhã.",
      "Cô ấy đã chơi đàn piano từ năm 5 tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_16",
    "word": "singing",
    "phonetic": "/ˈsɪŋɪŋ/",
    "definition": "The activity of performing songs with the voice.",
    "definitionVn": "ca hát, việc hát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Singing English songs helps improve pronunciation naturally.",
      "She won first prize in the singing contest."
    ],
    "exampleTranslations": [
      "Hát các bài hát tiếng Anh giúp cải thiện phát âm rất tự nhiên.",
      "Cô ấy đã giành giải nhất trong cuộc thi ca hát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_17",
    "word": "dancing",
    "phonetic": "/ˈdænsɪŋ/",
    "definition": "The activity of dancing for pleasure or in order to entertain others.",
    "definitionVn": "nhảy múa, khiêu vũ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Dancing is a joyful way to express emotions and stay active.",
      "They took salsa dancing lessons."
    ],
    "exampleTranslations": [
      "Khiêu vũ là một cách tràn ngập niềm vui để thể hiện cảm xúc và vận động.",
      "Họ đã tham gia các lớp học nhảy salsa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_18",
    "word": "drawing",
    "phonetic": "/ˈdrɔːɪŋ/",
    "definition": "A picture or diagram made with a pencil, pen, or crayon rather than paint.",
    "definitionVn": "vẽ tranh, bức vẽ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Drawing cartoons is a fun creative outlet.",
      "The child showed me her colorful drawing of a house."
    ],
    "exampleTranslations": [
      "Vẽ tranh hoạt hình là một cách sáng tạo thú vị.",
      "Em bé khoe tôi bức vẽ ngôi nhà đầy màu sắc của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_19",
    "word": "painting",
    "phonetic": "/ˈpeɪntɪŋ/",
    "definition": "The action or skill of using paint, or a painted picture.",
    "definitionVn": "hội họa, bức tranh sơn dầu/thủy mặc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Oil painting requires great precision and passion.",
      "The museum displays historic watercolor paintings."
    ],
    "exampleTranslations": [
      "Vẽ tranh sơn dầu đòi hỏi sự tỉ mỉ và đam mê cao độ.",
      "Bảo tàng trưng bày những bức tranh màu nước lịch sử."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_20",
    "word": "fishing",
    "phonetic": "/ˈfɪʃɪŋ/",
    "definition": "The activity of catching fish, either for food or as a sport.",
    "definitionVn": "câu cá (thư giãn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Fishing by the quiet river is wonderfully relaxing.",
      "My grandfather loves weekend fishing trips."
    ],
    "exampleTranslations": [
      "Câu cá bên dòng sông tĩnh lặng đem lại cảm giác thư thái tuyệt vời.",
      "Ông tôi rất thích các chuyến đi câu cá cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_21",
    "word": "badminton",
    "phonetic": "/ˈbæd.mɪn.tən/",
    "definition": "A racket sport played with shuttles across a net on an indoor or outdoor court.",
    "definitionVn": "môn cầu lông dùng vợt và quả cầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "They play friendly doubles badminton at the community recreation center every Tuesday evening.",
      "Quick reflexes and explosive jump smashes are essential skills in competitive badminton."
    ],
    "exampleTranslations": [
      "Họ chơi cầu lông đôi giao hữu tại trung tâm giải trí cộng đồng vào mỗi tối thứ Ba.",
      "Phản xạ nhanh và những cú nhảy đập cầu bùng nổ là những kỹ năng thiết yếu trong môn cầu lông thi đấu."
    ],
    "synonyms": [
      "shuttlecock game"
    ],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_22",
    "word": "gardening",
    "phonetic": "/ˈɡɑːr.dən.ɪŋ/",
    "definition": "The hobby or activity of tending and cultivating a garden, growing flowers, and vegetables.",
    "definitionVn": "thú vui làm vườn, trồng hoa và rau sạch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Weekend gardening relieves work-related stress while yielding organic heirloom tomatoes.",
      "She wears protective gloves and uses a sharp trowel for delicate flowerbed gardening."
    ],
    "exampleTranslations": [
      "Làm vườn cuối tuần giúp xua tan căng thẳng liên quan đến công việc đồng thời mang lại những quả cà chua hữu cơ ngon lành.",
      "Cô ấy đeo găng tay bảo hộ và dùng một cái bay sắc nhọn để làm vườn bồn hoa mỏng manh."
    ],
    "synonyms": [
      "horticulture",
      "plant cultivation"
    ],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_23",
    "word": "hiking",
    "phonetic": "/ˈhaɪ.kɪŋ/",
    "definition": "The activity of going for long, scenic walks, especially across rural or mountainous countryside.",
    "definitionVn": "đi bộ đường dài dã ngoại, leo núi ngắm cảnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Sturdy waterproof boots and trekking poles make mountain hiking much safer and more comfortable.",
      "We embarked on a scenic dawn hiking expedition along the national park coastal ridge."
    ],
    "exampleTranslations": [
      "Giày bốt chống thấm nước chắc chắn và gậy leo núi giúp việc đi bộ đường dài trên núi an toàn và thoải mái hơn nhiều.",
      "Chúng tôi bắt đầu chuyến thám hiểm đi bộ đường dài ngắm bình minh tuyệt đẹp dọc theo sườn núi ven biển của công viên quốc gia."
    ],
    "synonyms": [
      "trekking",
      "hillwalking",
      "trail walking"
    ],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_24",
    "word": "skating",
    "phonetic": "/ˈskeɪ.t̬ɪŋ/",
    "definition": "The sport or recreational activity of gliding on ice skates or roller skates across smooth surfaces.",
    "definitionVn": "trượt băng hoặc trượt patin giải trí",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "During frosty winter months, children enjoy outdoor ice skating on the frozen municipal pond.",
      "Beginners should always wear knee pads and wrist guards when practicing roller skating."
    ],
    "exampleTranslations": [
      "Trong những tháng mùa đông băng giá, trẻ em thích trượt băng ngoài trời trên ao nước đóng băng của thành phố.",
      "Người mới bắt đầu nên luôn đeo đệm đầu gối và bảo vệ cổ tay khi tập trượt patin."
    ],
    "synonyms": [
      "ice skating",
      "rollerblading"
    ],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_25",
    "word": "photography",
    "phonetic": "/fəˈtɑː.ɡrə.fi/",
    "definition": "The art or practice of taking and processing photographs with optical cameras.",
    "definitionVn": "nghệ thuật nhiếp ảnh, thú vui chụp ảnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Landscape photography requires immense patience while waiting for the golden sunset light.",
      "She invested in a high-resolution mirrorless camera to take her wildlife photography to the next level."
    ],
    "exampleTranslations": [
      "Nhiếp ảnh phong cảnh đòi hỏi sự kiên nhẫn to lớn trong khi chờ đợi ánh sáng hoàng hôn vàng rực.",
      "Cô ấy đã đầu tư vào một chiếc máy ảnh không gương lật độ phân giải cao để đưa tác phẩm chụp ảnh động vật hoang dã của mình lên một tầm cao mới."
    ],
    "synonyms": [
      "picture taking",
      "camerawork",
      "photo craft"
    ],
    "antonyms": []
  }
];

export const CHUDE_SO_THICH_THE_THAO: VocabularyTopicPackage = {
  theme: THEME_SO_THICH_THE_THAO,
  vocabs: VOCABS_SO_THICH_THE_THAO,
};

export default CHUDE_SO_THICH_THE_THAO;
