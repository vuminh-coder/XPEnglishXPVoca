import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 43: Phòng tắm & Vệ sinh (Bathroom & Toiletries)
 * Mã chủ đề: t_basic_bathroom_toiletries
 * Tổng số từ vựng: 20 từ
 */
export const THEME_PHONG_TAM_VE_SINH: BasicTheme = {
  "id": "t_basic_bathroom_toiletries",
  "name": "Phòng tắm & Vệ sinh",
  "nameEn": "Bathroom & Toiletries",
  "icon": "🚿",
  "difficulty": 1,
  "color": "#06b6d4",
  "description": "Vòi sen, bồn tắm, bồn rửa, khăn tắm, dầu gội, xà phòng, bàn chải đánh răng.",
  "totalVocabs": 20
};

export const VOCABS_PHONG_TAM_VE_SINH: BasicVocabularyItem[] = [
  {
    "id": "bv_bathro_01",
    "word": "bathroom",
    "phonetic": "/ˈbæθruːm/",
    "definition": "A room containing a toilet, sink, and typically also a bath or shower.",
    "definitionVn": "phòng tắm, phòng vệ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Keep the bathroom clean, dry, and well-ventilated.",
      "Wash your hands thoroughly in the bathroom before eating."
    ],
    "exampleTranslations": [
      "Giữ phòng tắm luôn sạch sẽ, khô ráo và thoáng khí nhé.",
      "Rửa tay thật sạch trong phòng tắm trước khi ăn cơm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_02",
    "word": "shower",
    "phonetic": "/ˈʃaʊər/",
    "definition": "An apparatus which produces a spray of water for bathing.",
    "definitionVn": "vòi hoa sen, tắm vòi sen",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Taking a warm shower in the evening washes away daily fatigue.",
      "Step into the shower and turn on the water."
    ],
    "exampleTranslations": [
      "Tắm vòi sen nước ấm vào buổi tối giúp xua tan mệt mỏi trong ngày.",
      "Bước vào buồng tắm và bật vòi hoa sen lên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_03",
    "word": "bathtub",
    "phonetic": "/ˈbæθtʌb/",
    "definition": "A tub, usually installed in a bathroom, in which to bathe.",
    "definitionVn": "bồn tắm (nằm ngâm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Soak in a warm bubble bathtub to relax tense muscles.",
      "Fill the bathtub with soothing warm water."
    ],
    "exampleTranslations": [
      "Ngâm mình trong bồn tắm bọt nước ấm để thư giãn cơ bắp căng thẳng nhé.",
      "Xả đầy nước ấm êm dịu vào bồn tắm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_04",
    "word": "toilet",
    "phonetic": "/ˈtɔɪlət/",
    "definition": "A fixed receptacle consisting of a bowl and a flushing mechanism, used for urination and defecation.",
    "definitionVn": "bồn cầu, bệ vệ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Flush the toilet and put the lid down after use.",
      "Always keep the toilet bowl disinfected and clean."
    ],
    "exampleTranslations": [
      "Nhấn xả nước bồn cầu và đậy nắp lại sau khi sử dụng nhé.",
      "Luôn luôn giữ bồn cầu được khử khuẩn sạch sẽ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_05",
    "word": "sink",
    "phonetic": "/sɪŋk/",
    "definition": "A fixed basin with a water supply and a drain, used for washing hands and face.",
    "definitionVn": "bồn rửa mặt, lavabo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Wash your face with gentle cleanser over the bathroom sink.",
      "Clean the white ceramic sink regularly."
    ],
    "exampleTranslations": [
      "Rửa mặt bằng sữa rửa mặt dịu nhẹ trên bồn rửa mặt nhé.",
      "Lau chùi bồn rửa mặt bằng sứ trắng thường xuyên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_06",
    "word": "faucet",
    "phonetic": "/ˈfɔːsɪt/",
    "definition": "A device by which a flow of liquid from a pipe can be controlled; a tap.",
    "definitionVn": "vòi nước (vặn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Turn off the faucet tightly while brushing your teeth to save water.",
      "The chrome faucet shines brightly."
    ],
    "exampleTranslations": [
      "Khóa chặt vòi nước trong khi đánh răng để tiết kiệm nước nhé.",
      "Chiếc vòi nước mạ crom sáng bóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_07",
    "word": "towel",
    "phonetic": "/ˈtaʊəl/",
    "definition": "A piece of thick absorbent cloth used for drying oneself after washing.",
    "definitionVn": "chiếc khăn tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Dry your skin gently with a soft fluffy cotton towel.",
      "Hang the damp towel on the rack to air out."
    ],
    "exampleTranslations": [
      "Lau khô da nhẹ nhàng bằng một chiếc khăn cotton mềm xốp nhé.",
      "Treo chiếc khăn ẩm lên giá để thoáng khí nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_08",
    "word": "shampoo",
    "phonetic": "/ʃæmˈpuː/",
    "definition": "A liquid preparation for washing the hair.",
    "definitionVn": "dầu gội đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Massage herbal shampoo gently into your scalp.",
      "Rinse out all the shampoo lather with warm water."
    ],
    "exampleTranslations": [
      "Mát-xa dầu gội thảo dược nhẹ nhàng lên da đầu nhé.",
      "Xả sạch bọt dầu gội bằng nước ấm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_09",
    "word": "soap",
    "phonetic": "/soʊp/",
    "definition": "A substance used with water for washing and cleaning, made of natural oils or fats.",
    "definitionVn": "xà phòng, bánh xà bông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Wash your hands with antibacterial soap for 20 seconds.",
      "Natural handmade goat milk soap is moisturizing."
    ],
    "exampleTranslations": [
      "Rửa tay bằng xà phòng kháng khuẩn trong 20 giây nhé.",
      "Xà phòng sữa dê thủ công tự nhiên giúp dưỡng ẩm rất tốt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_10",
    "word": "toothpaste",
    "phonetic": "/ˈtuːθpeɪst/",
    "definition": "A paste used on a toothbrush for cleaning the teeth.",
    "definitionVn": "kem đánh răng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Squeeze a pea-sized amount of fluoride toothpaste onto your brush.",
      "Mint toothpaste leaves your breath fresh and cool."
    ],
    "exampleTranslations": [
      "Bóp một lượng kem đánh răng có chứa fluor bằng hạt đậu lên bàn chải nhé.",
      "Kem đánh răng vị bạc hà giúp hơi thở thơm tho và mát lạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_11",
    "word": "toothbrush",
    "phonetic": "/ˈtuːθbrʌʃ/",
    "definition": "A small brush with a long handle, used for cleaning the teeth.",
    "definitionVn": "bàn chải đánh răng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Replace your toothbrush every three months for optimal oral health.",
      "Brush your teeth with soft bristles twice a day."
    ],
    "exampleTranslations": [
      "Thay bàn chải đánh răng mỗi ba tháng một lần để chăm sóc răng miệng tốt nhất nhé.",
      "Đánh răng bằng lông bàn chải mềm hai lần một ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_12",
    "word": "hairdryer",
    "phonetic": "/ˈherdraɪər/",
    "definition": "An electrical device for blowing hot or warm air over damp hair to dry it.",
    "definitionVn": "máy sấy tóc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Blow-dry your wet hair on a cool setting with the hairdryer.",
      "Unplug the hairdryer after you finish styling."
    ],
    "exampleTranslations": [
      "Sấy khô tóc ướt ở chế độ mát bằng máy sấy tóc nhé.",
      "Rút phích cắm máy sấy tóc sau khi tạo kiểu xong nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_13",
    "word": "comb",
    "phonetic": "/koʊm/",
    "definition": "A strip of plastic, metal, or wood with a row of narrow teeth, used for untangling or styling the hair.",
    "definitionVn": "cây lược (chải tóc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Gently untangle your hair with a wide-tooth wooden comb.",
      "Comb your hair neatly before going to school."
    ],
    "exampleTranslations": [
      "Gỡ rối tóc nhẹ nhàng bằng một chiếc lược gỗ răng thưa nhé.",
      "Chải tóc thật gọn gàng trước khi đi học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_14",
    "word": "brush",
    "phonetic": "/brʌʃ/",
    "definition": "An implement with a handle, consisting of bristles, used for hair styling or teeth cleaning.",
    "definitionVn": "bàn chải tóc, cọ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Brush your hair smoothly from roots to tips.",
      "A soft round hair brush adds volume to hair."
    ],
    "exampleTranslations": [
      "Chải tóc suôn mượt từ chân đến ngọn nhé.",
      "Một chiếc bàn chải tóc tròn mềm giúp tạo độ bồng bềnh cho mái tóc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_15",
    "word": "razor",
    "phonetic": "/ˈreɪzər/",
    "definition": "An instrument with a sharp blade or combination of blades, used to remove unwanted body hair, especially facial hair.",
    "definitionVn": "dao cạo râu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Apply shaving cream before using a safety razor.",
      "Keep sharp razors safely away from small children."
    ],
    "exampleTranslations": [
      "Thoa bọt cạo râu trước khi dùng dao cạo an toàn nhé.",
      "Để dao cạo sắc bén xa tầm với của trẻ nhỏ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_16",
    "word": "tissue",
    "phonetic": "/ˈtɪʃuː/",
    "definition": "A piece of soft, absorbent paper used as a disposable handkerchief or wipe.",
    "definitionVn": "khăn giấy, giấy ăn rút",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Use a soft tissue to wipe your nose when you sneeze.",
      "Always carry a small pocket pack of tissues."
    ],
    "exampleTranslations": [
      "Dùng khăn giấy mềm để lau mũi khi hắt xì nhé.",
      "Hãy luôn mang theo một gói khăn giấy bỏ túi nhỏ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_17",
    "word": "bath",
    "phonetic": "/bæθ/",
    "definition": "An act of washing oneself in a bath or under a shower.",
    "definitionVn": "tắm rửa, bồn tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Take a warm relaxing bath before going to bed.",
      "The baby giggled happily during her warm evening bath."
    ],
    "exampleTranslations": [
      "Tắm nước ấm thư giãn trước khi đi ngủ nhé.",
      "Em bé khúc khích cười vui vẻ trong giờ tắm nước ấm buổi tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_18",
    "word": "wash",
    "phonetic": "/wɑːʃ/",
    "definition": "Clean with water and, typically, soap or detergent.",
    "definitionVn": "rửa, tắm rửa, giặt giũ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Wash your hands with soap before preparing meals.",
      "She washed her face with cold water to wake up."
    ],
    "exampleTranslations": [
      "Rửa tay bằng xà phòng trước khi chuẩn bị bữa ăn nhé.",
      "Cô ấy rửa mặt bằng nước lạnh để tỉnh táo hơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_19",
    "word": "dry",
    "phonetic": "/draɪ/",
    "definition": "Free from moisture or liquid; not wet or moist.",
    "definitionVn": "khô ráo, lau khô",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Dry your wet hands completely with a clean towel.",
      "Hang the bath mat out in the sun to dry."
    ],
    "exampleTranslations": [
      "Lau khô đôi bàn tay ướt hoàn toàn bằng khăn sạch nhé.",
      "Phơi thảm phòng tắm ngoài nắng cho khô nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_20",
    "word": "hygiene",
    "phonetic": "/ˈhaɪdʒiːn/",
    "definition": "Conditions or practices conducive to maintaining health and preventing disease, especially through cleanliness.",
    "definitionVn": "vệ sinh cá nhân, vệ sinh phòng dịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Good personal hygiene protects you and your family from illnesses.",
      "Teach children proper handwashing hygiene from an early age."
    ],
    "exampleTranslations": [
      "Vệ sinh cá nhân tốt giúp bảo vệ bạn và gia đình khỏi bệnh tật.",
      "Dạy trẻ nhỏ thói quen vệ sinh rửa tay đúng cách từ sớm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_PHONG_TAM_VE_SINH: VocabularyTopicPackage = {
  theme: THEME_PHONG_TAM_VE_SINH,
  vocabs: VOCABS_PHONG_TAM_VE_SINH,
};

export default CHUDE_PHONG_TAM_VE_SINH;
