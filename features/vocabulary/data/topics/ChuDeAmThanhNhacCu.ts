import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 50: Âm thanh & Nhạc cụ (Sounds & Instruments)
 * Mã chủ đề: t_basic_sounds_instruments
 * Tổng số từ vựng: 20 từ
 */
export const THEME_AM_THANH_NHAC_CU: BasicTheme = {
  "id": "t_basic_sounds_instruments",
  "name": "Âm thanh & Nhạc cụ",
  "nameEn": "Sounds & Instruments",
  "icon": "🎵",
  "difficulty": 1,
  "color": "#c026d3",
  "description": "Âm thanh, giai điệu, tiếng vỗ tay, chuông reo, trống, sáo, vĩ cầm, kèn.",
  "totalVocabs": 20
};

export const VOCABS_AM_THANH_NHAC_CU: BasicVocabularyItem[] = [
  {
    "id": "bv_sounds_01",
    "word": "sound",
    "phonetic": "/saʊnd/",
    "definition": "Vibrations that travel through the air or another medium and can be heard when they reach a person's ear.",
    "definitionVn": "âm thanh, tiếng động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The peaceful sound of gentle rain helps me sleep.",
      "Sound travels through air in invisible waves."
    ],
    "exampleTranslations": [
      "Âm thanh êm đềm của cơn mưa rào nhẹ giúp tôi ngủ ngon.",
      "Âm thanh truyền qua không khí dưới dạng những làn sóng vô hình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_02",
    "word": "noise",
    "phonetic": "/nɔɪz/",
    "definition": "A sound, especially one that is loud or unpleasant or that causes disturbance.",
    "definitionVn": "tiếng ồn, âm thanh khó chịu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Wear noise-canceling headphones to study quietly.",
      "Loud traffic noise can disrupt concentration."
    ],
    "exampleTranslations": [
      "Đeo tai nghe chống ồn để học tập yên tĩnh nhé.",
      "Tiếng ồn xe cộ lớn có thể làm gián đoạn sự tập trung."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_03",
    "word": "melody",
    "phonetic": "/ˈmelədi/",
    "definition": "A sequence of single notes that is musically satisfying; a tune.",
    "definitionVn": "giai điệu (du dương)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The gentle acoustic guitar melody calmed the room.",
      "Hum along to the cheerful melody of the song."
    ],
    "exampleTranslations": [
      "Giai điệu đàn ghi-ta mộc êm dịu làm dịu bầu không khí căn phòng.",
      "Ngâm nga theo giai điệu vui tươi của bài hát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_04",
    "word": "voice",
    "phonetic": "/vɔɪs/",
    "definition": "The sound produced in a person's larynx and uttered through the mouth.",
    "definitionVn": "giọng nói, giọng hát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The singer has a remarkably powerful and soulful voice.",
      "Speak with a warm and polite voice."
    ],
    "exampleTranslations": [
      "Người ca sĩ có một giọng hát nội lực và truyền cảm xuất sắc.",
      "Hãy nói bằng một giọng ấm áp và lịch sự nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_05",
    "word": "whisper",
    "phonetic": "/ˈwɪspər/",
    "definition": "A soft, quiet murmur of voices.",
    "definitionVn": "tiếng thì thầm, tiếng nói nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "She spoke in a gentle whisper so she wouldn't wake the sleeping baby.",
      "The wind made a soft whisper through the pine trees."
    ],
    "exampleTranslations": [
      "Cô ấy nói bằng một tiếng thì thầm nhẹ nhàng để không đánh thức em bé đang ngủ.",
      "Gió tạo nên tiếng thì thầm êm ả qua rặng thông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_06",
    "word": "shout",
    "phonetic": "/ʃaʊt/",
    "definition": "A loud call or cry, typically as an expression of a strong emotion or to grab attention.",
    "definitionVn": "tiếng la hét, tiếng reo to",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "A joyful shout arose from the stadium when the goal was scored.",
      "Give a shout if you need any help."
    ],
    "exampleTranslations": [
      "Một tiếng reo hò vui sướng vang lên từ sân vận động khi bàn thắng được ghi.",
      "Hãy gọi to một tiếng nếu bạn cần giúp đỡ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_07",
    "word": "clap",
    "phonetic": "/klæp/",
    "definition": "Strike the palms of one's hands together repeatedly, typically in order to applaud.",
    "definitionVn": "vỗ tay, tiếng vỗ tay",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The audience clapped enthusiastically after the concert.",
      "Clap your hands to the beat of the music."
    ],
    "exampleTranslations": [
      "Khán giả đã vỗ tay nhiệt liệt sau buổi hòa nhạc.",
      "Hãy vỗ tay theo nhịp điệu của âm nhạc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_08",
    "word": "snap",
    "phonetic": "/snæp/",
    "definition": "Make a sudden sharp cracking sound, as with one's fingers.",
    "definitionVn": "búng tay, tiếng tách",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "He snapped his fingers to the jazz rhythm.",
      "The dry branch snapped with a loud crack."
    ],
    "exampleTranslations": [
      "Anh ấy búng tay theo nhịp điệu nhạc jazz.",
      "Cành cây khô gãy đánh tách một tiếng to."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_09",
    "word": "ring",
    "phonetic": "/rɪŋ/",
    "definition": "Make a clear resonant or vibrating sound, as a bell or phone.",
    "definitionVn": "rung chuông, đổ chuông",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The school bell rings at exactly 7:30 AM.",
      "My phone is ringing; let me answer it."
    ],
    "exampleTranslations": [
      "Chuông trường học reo vào đúng 7h30 sáng.",
      "Điện thoại tôi đang đổ chuông; để tôi nghe máy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_10",
    "word": "bang",
    "phonetic": "/bæŋ/",
    "definition": "A sudden loud, sharp noise, as of an explosion or door slamming.",
    "definitionVn": "tiếng nổ lớn, tiếng đập mạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The door slammed shut with a loud bang in the gust of wind.",
      "Fireworks went off with a colorful bang."
    ],
    "exampleTranslations": [
      "Cánh cửa đóng sầm lại đánh 'rầm' một tiếng lớn trong cơn gió giật.",
      "Pháo hoa nổ vang với những tiếng nổ rực rỡ sắc màu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_11",
    "word": "buzz",
    "phonetic": "/bʌz/",
    "definition": "A low, continuous humming or murmuring sound, made for example by a bee or machinery.",
    "definitionVn": "tiếng vo ve (ong, côn trùng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The gentle buzz of honeybees filled the blooming garden.",
      "My phone gave a silent vibration buzz."
    ],
    "exampleTranslations": [
      "Tiếng vo ve êm ả của bầy ong mật ngập tràn khu vườn hoa nở.",
      "Điện thoại của tôi rung lên một tiếng rung nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_12",
    "word": "echo",
    "phonetic": "/ˈekoʊ/",
    "definition": "A sound or sounds caused by the reflection of sound waves from a surface back to the listener.",
    "definitionVn": "tiếng vang, âm vang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Your voice creates a clear echo inside the large mountain cave.",
      "His shout echoed through the empty hall."
    ],
    "exampleTranslations": [
      "Giọng nói của bạn tạo nên tiếng vang rõ rệt trong hang núi lớn.",
      "Tiếng hét của anh ấy vang vọng khắp đại sảnh vắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_13",
    "word": "drum",
    "phonetic": "/drʌm/",
    "definition": "A percussion instrument sounded by being struck with sticks or the hands.",
    "definitionVn": "cái trống, trống nhạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The traditional festival opening featured roaring bronze drums.",
      "He plays the drums in a student rock band."
    ],
    "exampleTranslations": [
      "Lễ khai mạc lễ hội truyền thống vang lừng tiếng trống đồng.",
      "Cậu ấy chơi trống trong một ban nhạc rock sinh viên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_14",
    "word": "flute",
    "phonetic": "/fluːt/",
    "definition": "A wind instrument made from a tube with holes that are stopped by the fingers.",
    "definitionVn": "cây sáo, sáo trúc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The sweet, peaceful melody of a bamboo flute echoed across the rice fields.",
      "She plays the classical silver flute beautifully."
    ],
    "exampleTranslations": [
      "Giai điệu ngọt ngào, thanh bình của cây sáo trúc vang vọng khắp cánh đồng lúa.",
      "Cô ấy thổi cây sáo bạc cổ điển rất hay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_15",
    "word": "violin",
    "phonetic": "/ˌvaɪəˈlɪn/",
    "definition": "A stringed musical instrument of treble pitch, played with a horsehair bow.",
    "definitionVn": "đàn vĩ cầm, đàn violin",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The violin soloist played a moving classical piece.",
      "She practices violin scales for one hour every day."
    ],
    "exampleTranslations": [
      "Nghệ sĩ độc tấu vĩ cầm đã biểu diễn một bản nhạc cổ điển đầy xúc động.",
      "Cô ấy luyện các gam vĩ cầm một tiếng mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_16",
    "word": "trumpet",
    "phonetic": "/ˈtrʌmpɪt/",
    "definition": "A brass musical instrument with a flared bell and three valves.",
    "definitionVn": "kèn trom-pét (kèn đồng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The bright, triumphant sound of the trumpet announced the ceremony.",
      "Jazz trumpeters play with incredible passion."
    ],
    "exampleTranslations": [
      "Âm thanh rộn rã, hùng tráng của chiếc kèn trumpet đã mở màn cho buổi lễ.",
      "Các nghệ sĩ thổi kèn trumpet nhạc jazz chơi với niềm đam mê cháy bỏng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_17",
    "word": "guitar",
    "phonetic": "/ɡɪˈtɑːr/",
    "definition": "A stringed musical instrument with a fretted fingerboard.",
    "definitionVn": "đàn ghi-ta, guitar",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Singing together around an acoustic guitar is so much fun.",
      "He learned to strum chords on his classical guitar."
    ],
    "exampleTranslations": [
      "Cùng nhau hát quanh cây đàn ghi-ta mộc chơi rất vui.",
      "Anh ấy đã học cách gảy hợp âm trên cây đàn ghi-ta cổ điển của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_18",
    "word": "piano",
    "phonetic": "/piˈænoʊ/",
    "definition": "A large musical instrument with a keyboard.",
    "definitionVn": "đàn dương cầm, piano",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Playing the piano trains focus, coordination, and patience.",
      "The grand piano produces a rich, resonant tone."
    ],
    "exampleTranslations": [
      "Chơi đàn piano rèn luyện sự tập trung, khéo léo và kiên nhẫn.",
      "Cây đại dương cầm phát ra âm thanh trầm hùng và ngân vang."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_19",
    "word": "loud",
    "phonetic": "/laʊd/",
    "definition": "Producing or capable of producing much noise; easily heard.",
    "definitionVn": "to, ồn ào (âm thanh)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Do not play loud music with earphones to protect hearing.",
      "The thunder was loud and startled the cat."
    ],
    "exampleTranslations": [
      "Đừng bật nhạc quá to khi nghe tai nghe để bảo vệ thính giác nhé.",
      "Tiếng sấm nổ to làm chú mèo giật mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_20",
    "word": "quiet",
    "phonetic": "/ˈkwaɪət/",
    "definition": "Making little or no noise; peaceful.",
    "definitionVn": "yên tĩnh, êm ả",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "A quiet study room improves reading speed and comprehension.",
      "The early morning countryside is serene and quiet."
    ],
    "exampleTranslations": [
      "Một phòng học yên tĩnh giúp nâng cao tốc độ đọc và khả năng hiểu bài.",
      "Vùng quê buổi sớm mai thật thanh bình và tĩnh lặng."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_AM_THANH_NHAC_CU: VocabularyTopicPackage = {
  theme: THEME_AM_THANH_NHAC_CU,
  vocabs: VOCABS_AM_THANH_NHAC_CU,
};

export default CHUDE_AM_THANH_NHAC_CU;
