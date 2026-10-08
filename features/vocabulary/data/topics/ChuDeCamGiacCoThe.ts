import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 44: Cảm giác cơ thể (Bodily Sensations)
 * Mã chủ đề: t_basic_bodily_sensations
 * Tổng số từ vựng: 20 từ
 */
export const THEME_CAM_GIAC_CO_THE: BasicTheme = {
  "id": "t_basic_bodily_sensations",
  "name": "Cảm giác cơ thể",
  "nameEn": "Bodily Sensations",
  "icon": "🌡️",
  "difficulty": 1,
  "color": "#e11d48",
  "description": "Cơn đau, ngứa, toát mồ hôi, run rẩy, chóng mặt, buồn ngủ, no bụng, khát nước.",
  "totalVocabs": 20
};

export const VOCABS_CAM_GIAC_CO_THE: BasicVocabularyItem[] = [
  {
    "id": "bv_bodily_01",
    "word": "pain",
    "phonetic": "/peɪn/",
    "definition": "Physical suffering or discomfort caused by illness or injury.",
    "definitionVn": "cơn đau, nỗi đau đớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Tell the doctor exactly where you feel the sharp pain.",
      "Gentle stretching relieves muscular back pain."
    ],
    "exampleTranslations": [
      "Hãy nói cho bác sĩ biết chính xác chỗ bạn cảm thấy đau nhói nhé.",
      "Kéo giãn cơ nhẹ nhàng giúp giảm đau lưng cơ bắp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_02",
    "word": "itch",
    "phonetic": "/ɪtʃ/",
    "definition": "An uncomfortable sensation on the skin that causes a desire to scratch.",
    "definitionVn": "ngứa ngáy, cơn ngứa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Apply soothing lotion to relieve the itchy insect bite.",
      "Do not scratch the itch with dirty fingernails."
    ],
    "exampleTranslations": [
      "Thoa kem làm dịu để giảm cơn ngứa do côn trùng cắn nhé.",
      "Đừng gãi chỗ ngứa bằng móng tay bẩn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_03",
    "word": "sweat",
    "phonetic": "/swet/",
    "definition": "Moisture exuded through the pores of the skin, typically in profuse drops as a reaction to heat or physical exertion.",
    "definitionVn": "mồ hôi, toát mồ hôi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Wipe the sweat from your forehead with a towel after running.",
      "Sweating helps cool the body down naturally."
    ],
    "exampleTranslations": [
      "Lau mồ hôi trên trán bằng khăn sau khi chạy bộ nhé.",
      "Toát mồ hôi giúp làm mát cơ thể một cách tự nhiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_04",
    "word": "shiver",
    "phonetic": "/ˈʃɪvər/",
    "definition": "Shake slightly and uncontrollably as a result of being cold, frightened, or excited.",
    "definitionVn": "run rẩy (vì lạnh, sợ)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "He began to shiver in the cold winter rain.",
      "Put on a warm wool coat so you don't shiver."
    ],
    "exampleTranslations": [
      "Cậu ấy bắt đầu run lên bần bật trong cơn mưa đông lạnh giá.",
      "Mặc áo khoác len ấm vào để không bị run rẩy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_05",
    "word": "dizzy",
    "phonetic": "/ˈdɪzi/",
    "definition": "Having or involving a sensation of spinning around and losing one's balance.",
    "definitionVn": "chóng mặt, hoa mắt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Sit down and drink water if you feel dizzy in the hot sun.",
      "Standing up too quickly can make you feel slightly dizzy."
    ],
    "exampleTranslations": [
      "Hãy ngồi xuống và uống nước nếu bạn thấy chóng mặt dưới nắng gắt nhé.",
      "Đứng dậy quá nhanh có thể làm bạn thấy hơi hoa mắt chóng mặt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_06",
    "word": "sleepy",
    "phonetic": "/ˈsliːpi/",
    "definition": "Needing or ready for sleep.",
    "definitionVn": "buồn ngủ, ngái ngủ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "I feel sleepy after studying for three hours straight.",
      "The warm glass of milk made the child sleepy."
    ],
    "exampleTranslations": [
      "Tôi thấy buồn ngủ sau khi học bài suốt ba tiếng liên tục.",
      "Ly sữa ấm đã làm cho đứa trẻ cảm thấy buồn ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_07",
    "word": "exhausted",
    "phonetic": "/ɪɡˈzɔːstɪd/",
    "definition": "Completely drained of physical or mental energy; extremely tired.",
    "definitionVn": "kiệt sức, mệt lử",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "The marathon runner collapsed across the finish line, completely exhausted.",
      "Rest well tonight if you feel exhausted."
    ],
    "exampleTranslations": [
      "Vận động viên marathon ngã quỵ qua vạch đích, hoàn toàn kiệt sức.",
      "Hãy nghỉ ngơi thật tốt tối nay nếu bạn thấy mệt lử nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_08",
    "word": "full",
    "phonetic": "/fʊl/",
    "definition": "Having eaten to one's satisfaction or capacity.",
    "definitionVn": "no bụng, no nê",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "I am completely full; thank you for the wonderful meal!",
      "Don't eat too fast so you know when you are comfortably full."
    ],
    "exampleTranslations": [
      "Tôi đã no căng bụng rồi; cảm ơn vì bữa ăn tuyệt vời nhé!",
      "Đừng ăn quá nhanh để bạn biết khi nào mình đã no vừa vặn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_09",
    "word": "hungry",
    "phonetic": "/ˈhʌŋɡri/",
    "definition": "Feeling or displaying the need for food.",
    "definitionVn": "đói bụng, cồn cào",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "My stomach is rumbling because I am so hungry.",
      "Let's grab a healthy snack if you are hungry."
    ],
    "exampleTranslations": [
      "Bụng tôi đang réo ùng ục vì tôi quá đói rồi.",
      "Cùng kiếm món ăn nhẹ lành mạnh nếu bạn đang đói nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_10",
    "word": "thirsty",
    "phonetic": "/ˈθɜːrsti/",
    "definition": "Feeling a need to drink liquid.",
    "definitionVn": "khát nước, háo nước",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "After a long walk in the sun, we were incredibly thirsty.",
      "Carry a water bottle so you never get thirsty."
    ],
    "exampleTranslations": [
      "Sau chuyến đi bộ dài dưới nắng, chúng tôi vô cùng khát nước.",
      "Mang theo bình nước để bạn không bao giờ bị khát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_11",
    "word": "numb",
    "phonetic": "/nʌm/",
    "definition": "Deprived of the power of sensation; unable to feel anything.",
    "definitionVn": "tê cóng, tê bì (tay chân)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "My fingers were numb from holding ice cubes.",
      "Rub your hands together to warm up numb fingers."
    ],
    "exampleTranslations": [
      "Các ngón tay của tôi bị tê cóng vì cầm đá viên.",
      "Xoa hai bàn tay vào nhau để làm ấm những ngón tay bị tê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_12",
    "word": "breath",
    "phonetic": "/breθ/",
    "definition": "The air taken into the lungs and then expelled during breathing.",
    "definitionVn": "hơi thở, nhịp thở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Take a slow, deep breath to calm your mind.",
      "Hold your breath for a few seconds underwater."
    ],
    "exampleTranslations": [
      "Hãy hít một hơi thật sâu và chậm rãi để tâm trí bình tĩnh lại nhé.",
      "Nín thở vài giây khi ở dưới nước nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_13",
    "word": "cough",
    "phonetic": "/kɔːf/",
    "definition": "Expel air from the lungs with a sudden sharp sound.",
    "definitionVn": "ho, tiếng ho",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Cover your mouth with your elbow when you cough.",
      "Drink warm honey water to soothe a persistent cough."
    ],
    "exampleTranslations": [
      "Hãy lấy khuỷu tay che miệng khi ho nhé.",
      "Uống nước mật ong ấm để làm dịu cơn ho dai dẳng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_14",
    "word": "sneeze",
    "phonetic": "/sniːz/",
    "definition": "Make a sudden involuntary expulsion of air through the nose and mouth.",
    "definitionVn": "hắt xì hơi, hắt hơi",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Say 'Bless you!' when someone sneezes politely.",
      "Cover your nose with a clean tissue when you sneeze."
    ],
    "exampleTranslations": [
      "Hãy nói 'Bless you!' khi ai đó hắt xì hơi thật lịch sự nhé.",
      "Che mũi bằng khăn giấy sạch khi bạn hắt hơi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_15",
    "word": "yawn",
    "phonetic": "/jɔːn/",
    "definition": "Involuntarily open one's mouth wide and inhale deeply due to tiredness.",
    "definitionVn": "ngáp ngủ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Yawning is a natural sign that your body needs sleep.",
      "She stifled a yawn during the long afternoon lecture."
    ],
    "exampleTranslations": [
      "Ngáp là dấu hiệu tự nhiên cho thấy cơ thể bạn cần được ngủ nghỉ.",
      "Cô ấy kìm một cái ngáp trong bài giảng dài buổi chiều."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_16",
    "word": "cry",
    "phonetic": "/kraɪ/",
    "definition": "Shed tears, typically as an expression of distress, pain, or sorrow.",
    "definitionVn": "khóc, rơi nước mắt",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "It is okay to cry and let out your emotions when you are sad.",
      "The baby cried because she was hungry."
    ],
    "exampleTranslations": [
      "Khóc và giải tỏa cảm xúc khi bạn buồn là chuyện hoàn toàn bình thường.",
      "Em bé khóc vì em bị đói."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_17",
    "word": "laugh",
    "phonetic": "/læf/",
    "definition": "Make the spontaneous sounds and movements of the face and body that are the instinctive expressions of lively amusement.",
    "definitionVn": "cười, cười vang vui vẻ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Laughing together with friends is the best medicine for the soul.",
      "The hilarious comedy made everyone laugh out loud."
    ],
    "exampleTranslations": [
      "Cùng cười vang với bạn bè là liều thuốc tốt nhất cho tâm hồn.",
      "Vở hài kịch vui nhộn khiến mọi người cười nghiêng ngả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_18",
    "word": "relax",
    "phonetic": "/rɪˈlæks/",
    "definition": "Make or become less tense or anxious.",
    "definitionVn": "thư giãn, thả lỏng cơ thể",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Take a warm bath and listen to acoustic music to relax.",
      "Relax your shoulders and breathe deeply."
    ],
    "exampleTranslations": [
      "Tắm nước ấm và nghe nhạc mộc để thư giãn nhé.",
      "Thả lỏng đôi vai và hít thở thật sâu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_19",
    "word": "freeze",
    "phonetic": "/friːz/",
    "definition": "Be turned into ice or another solid as a result of extreme cold; be very cold.",
    "definitionVn": "đóng băng, lạnh cóng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Water freezes into solid ice at zero degrees Celsius.",
      "Put on thick mittens before your hands freeze."
    ],
    "exampleTranslations": [
      "Nước đóng băng thành đá rắn ở 0 độ C.",
      "Đeo găng tay dày vào trước khi đôi tay bạn bị lạnh cóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_20",
    "word": "warm",
    "phonetic": "/wɔːrm/",
    "definition": "Of or at a fairly or comfortably high temperature.",
    "definitionVn": "ấm áp, làm ấm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "A cup of warm ginger tea feels comforting on a rainy day.",
      "Warm your hands near the heater."
    ],
    "exampleTranslations": [
      "Một tách trà gừng ấm đem lại cảm giác dễ chịu trong ngày mưa.",
      "Làm ấm đôi bàn tay gần lò sưởi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_CAM_GIAC_CO_THE: VocabularyTopicPackage = {
  theme: THEME_CAM_GIAC_CO_THE,
  vocabs: VOCABS_CAM_GIAC_CO_THE,
};

export default CHUDE_CAM_GIAC_CO_THE;
