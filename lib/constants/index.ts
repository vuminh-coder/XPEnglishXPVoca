export const LEVEL_XP = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9200, 11000];

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Newbie',
  2: 'Beginner',
  3: 'Learner',
  4: 'Student',
  5: 'Word Explorer',
  6: 'Vocabulary Builder',
  7: 'Rising Star',
  8: 'Word Crafter',
  9: 'Vocabulary Master',
  10: 'Word Wizard',
  11: 'Word Wizard',
  12: 'Language Legend',
  13: 'Language Legend',
  14: 'Vocabulary Sage',
  15: 'Grandmaster'
};

export const MOCK_THEMES = [
  {
    "id": "t1",
    "name": "Gia đình",
    "nameEn": "Family",
    "icon": "👥",
    "difficulty": 1,
    "totalVocabs": 40,
    "color": "#3b82f6"
  },
  {
    "id": "t2",
    "name": "Nhà cửa",
    "nameEn": "House",
    "icon": "🏠",
    "difficulty": 1,
    "totalVocabs": 48,
    "color": "#10b981"
  },
  {
    "id": "t3",
    "name": "Thực phẩm",
    "nameEn": "Food",
    "icon": "🍎",
    "difficulty": 1,
    "totalVocabs": 50,
    "color": "#ef4444"
  },
  {
    "id": "t4",
    "name": "Nghề nghiệp",
    "nameEn": "Occupation",
    "icon": "💼",
    "difficulty": 1,
    "totalVocabs": 30,
    "color": "#f59e0b"
  },
  {
    "id": "t5",
    "name": "Trường học",
    "nameEn": "School",
    "icon": "📚",
    "difficulty": 1,
    "totalVocabs": 20,
    "color": "#6366f1"
  },
  {
    "id": "t6",
    "name": "Quần áo",
    "nameEn": "Clothing",
    "icon": "👕",
    "difficulty": 1,
    "totalVocabs": 25,
    "color": "#ec4899"
  },
  {
    "id": "t7",
    "name": "Thời tiết",
    "nameEn": "Weather",
    "icon": "☁️",
    "difficulty": 1,
    "totalVocabs": 25,
    "color": "#06b6d4"
  },
  {
    "id": "t8",
    "name": "Phương tiện",
    "nameEn": "Transportation",
    "icon": "🚗",
    "difficulty": 1,
    "totalVocabs": 20,
    "color": "#8b5cf6"
  },
  {
    "id": "t9",
    "name": "Động vật",
    "nameEn": "Animal",
    "icon": "🦁",
    "difficulty": 1,
    "totalVocabs": 35,
    "color": "#14b8a6"
  },
  {
    "id": "t10",
    "name": "Thói quen hàng ngày",
    "nameEn": "Daily Routine",
    "icon": "⏰",
    "difficulty": 1,
    "totalVocabs": 30,
    "color": "#f43f5e"
  },
  {
    "id": "t11",
    "name": "Sức khỏe",
    "nameEn": "Health",
    "icon": "🏥",
    "difficulty": 2,
    "totalVocabs": 40,
    "color": "#10b981"
  },
  {
    "id": "t12",
    "name": "Kinh doanh",
    "nameEn": "Business",
    "icon": "📈",
    "difficulty": 2,
    "totalVocabs": 40,
    "color": "#3b82f6"
  },
  {
    "id": "t13",
    "name": "Công nghệ",
    "nameEn": "Technology",
    "icon": "💻",
    "difficulty": 2,
    "totalVocabs": 38,
    "color": "#9c27b0"
  },
  {
    "id": "t14",
    "name": "Môi trường",
    "nameEn": "Environment",
    "icon": "🌱",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#2e7d32"
  },
  {
    "id": "t15",
    "name": "Giáo dục",
    "nameEn": "Education",
    "icon": "🎓",
    "difficulty": 2,
    "totalVocabs": 29,
    "color": "#ff9800"
  },
  {
    "id": "t16",
    "name": "Tâm lý học",
    "nameEn": "Psychology",
    "icon": "🧠",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#673ab7"
  },
  {
    "id": "t17",
    "name": "Du lịch",
    "nameEn": "Travel",
    "icon": "✈️",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#00bcd4"
  },
  {
    "id": "t18",
    "name": "Mạng xã hội",
    "nameEn": "Social Media",
    "icon": "📱",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#e91e63"
  },
  {
    "id": "t19",
    "name": "Giao tiếp",
    "nameEn": "Communication",
    "icon": "💬",
    "difficulty": 2,
    "totalVocabs": 35,
    "color": "#4caf50"
  },
  {
    "id": "t20",
    "name": "Văn học",
    "nameEn": "Literature",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#ff5722"
  },
  {
    "id": "t21",
    "name": "Học thuật",
    "nameEn": "Academic",
    "icon": "🏫",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#3f51b5"
  },
  {
    "id": "t22",
    "name": "Kinh doanh nâng cao",
    "nameEn": "Advanced Business",
    "icon": "📊",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#ffeb3b"
  },
  {
    "id": "t23",
    "name": "Công nghệ nâng cao",
    "nameEn": "Advanced Technology",
    "icon": "🤖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#009688"
  },
  {
    "id": "t24",
    "name": "Môi trường nâng cao",
    "nameEn": "Advanced Environment",
    "icon": "🌍",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#4caf50"
  },
  {
    "id": "t25",
    "name": "Tâm lý nâng cao",
    "nameEn": "Advanced Psychology",
    "icon": "🎭",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#795548"
  },
  {
    "id": "t26",
    "name": "Y học nâng cao",
    "nameEn": "Advanced Medicine",
    "icon": "🔬",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#607d8b"
  },
  {
    "id": "t27",
    "name": "Luật học",
    "nameEn": "Advanced Law",
    "icon": "⚖️",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#9e9e9e"
  },
  {
    "id": "t28",
    "name": "Kinh tế nâng cao",
    "nameEn": "Advanced Economics",
    "icon": "💸",
    "difficulty": 3,
    "totalVocabs": 1,
    "color": "#ff5722"
  },
  {
    "id": "t29",
    "name": "Chính trị nâng cao",
    "nameEn": "Advanced Politics",
    "icon": "🏛️",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#701a75"
  },
  {
    "id": "t30",
    "name": "Triết học nâng cao",
    "nameEn": "Advanced Philosophy",
    "icon": "🦉",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#4c1d95"
  }
];

export const MOCK_VOCABULARIES = [
  {
    "id": "v_t1_1",
    "word": "father",
    "phonetic": "/ˈfɑːðər/",
    "definition": "English vocabulary word: father",
    "definitionVn": "bố, cha",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'father' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_2",
    "word": "mother",
    "phonetic": "/ˈmʌðər/",
    "definition": "English vocabulary word: mother",
    "definitionVn": "mẹ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'mother' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_3",
    "word": "parent",
    "phonetic": "/ˈpeərənt/",
    "definition": "English vocabulary word: parent",
    "definitionVn": "cha mẹ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'parent' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_4",
    "word": "brother",
    "phonetic": "/ˈbrʌðər/",
    "definition": "English vocabulary word: brother",
    "definitionVn": "anh/em trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'brother' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_5",
    "word": "sister",
    "phonetic": "/ˈsɪstər/",
    "definition": "English vocabulary word: sister",
    "definitionVn": "chị/em gái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'sister' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_6",
    "word": "son",
    "phonetic": "/sʌn/",
    "definition": "English vocabulary word: son",
    "definitionVn": "con trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'son' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_7",
    "word": "daughter",
    "phonetic": "/ˈdɔːtər/",
    "definition": "English vocabulary word: daughter",
    "definitionVn": "con gái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'daughter' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_8",
    "word": "husband",
    "phonetic": "/ˈhʌzbənd/",
    "definition": "English vocabulary word: husband",
    "definitionVn": "chồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'husband' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_9",
    "word": "wife",
    "phonetic": "/waɪf/",
    "definition": "English vocabulary word: wife",
    "definitionVn": "vợ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'wife' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_10",
    "word": "grandfather",
    "phonetic": "/ˈɡrænfɑːðər/",
    "definition": "English vocabulary word: grandfather",
    "definitionVn": "ông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'grandfather' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_11",
    "word": "grandmother",
    "phonetic": "/ˈɡrænmʌðər/",
    "definition": "English vocabulary word: grandmother",
    "definitionVn": "bà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'grandmother' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_12",
    "word": "uncle",
    "phonetic": "/ˈʌŋkəl/",
    "definition": "English vocabulary word: uncle",
    "definitionVn": "chú, bác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'uncle' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_13",
    "word": "aunt",
    "phonetic": "/ɑːnt/",
    "definition": "English vocabulary word: aunt",
    "definitionVn": "cô, dì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'aunt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_14",
    "word": "cousin",
    "phonetic": "/ˈkʌzən/",
    "definition": "English vocabulary word: cousin",
    "definitionVn": "anh/chị em họ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'cousin' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_15",
    "word": "nephew",
    "phonetic": "/ˈnefjuː/",
    "definition": "English vocabulary word: nephew",
    "definitionVn": "cháu trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'nephew' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_16",
    "word": "niece",
    "phonetic": "/niːs/",
    "definition": "English vocabulary word: niece",
    "definitionVn": "cháu gái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'niece' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_17",
    "word": "stepfather",
    "phonetic": "/ˈstepfɑːðər/",
    "definition": "English vocabulary word: stepfather",
    "definitionVn": "bố dượng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'stepfather' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_18",
    "word": "stepmother",
    "phonetic": "/ˈstepmʌðər/",
    "definition": "English vocabulary word: stepmother",
    "definitionVn": "mẹ kế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'stepmother' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_19",
    "word": "stepbrother",
    "phonetic": "/ˈstepbrʌðər/",
    "definition": "English vocabulary word: stepbrother",
    "definitionVn": "anh/em trai kế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'stepbrother' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_20",
    "word": "stepsister",
    "phonetic": "/ˈstepsɪstər/",
    "definition": "English vocabulary word: stepsister",
    "definitionVn": "chị/em gái kế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'stepsister' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_21",
    "word": "grandchild",
    "phonetic": "/ˈɡræntʃaɪld/",
    "definition": "English vocabulary word: grandchild",
    "definitionVn": "cháu nội/ngoại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'grandchild' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_22",
    "word": "sibling",
    "phonetic": "/ˈsɪblɪŋ/",
    "definition": "English vocabulary word: sibling",
    "definitionVn": "anh chị em ruột",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'sibling' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_23",
    "word": "relative",
    "phonetic": "/ˈrelətɪv/",
    "definition": "English vocabulary word: relative",
    "definitionVn": "họ hàng",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'relative' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_24",
    "word": "in-law",
    "phonetic": "/ˈɪn lɔː/",
    "definition": "English vocabulary word: in-law",
    "definitionVn": "thông gia",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'in-law' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_25",
    "word": "godfather",
    "phonetic": "/ˈɡɒdfɑːðər/",
    "definition": "English vocabulary word: godfather",
    "definitionVn": "cha đỡ đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'godfather' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_26",
    "word": "godmother",
    "phonetic": "/ˈɡɒdmʌðər/",
    "definition": "English vocabulary word: godmother",
    "definitionVn": "mẹ đỡ đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'godmother' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_27",
    "word": "guardian",
    "phonetic": "/ˈɡɑːdiən/",
    "definition": "English vocabulary word: guardian",
    "definitionVn": "người giám hộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'guardian' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_28",
    "word": "ancestor",
    "phonetic": "/ˈænsestər/",
    "definition": "English vocabulary word: ancestor",
    "definitionVn": "tổ tiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'ancestor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_29",
    "word": "descendant",
    "phonetic": "/dɪˈsendənt/",
    "definition": "English vocabulary word: descendant",
    "definitionVn": "con cháu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'descendant' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_30",
    "word": "spouse",
    "phonetic": "/spaʊz/",
    "definition": "English vocabulary word: spouse",
    "definitionVn": "vợ/chồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'spouse' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_31",
    "word": "twin",
    "phonetic": "/twɪn/",
    "definition": "English vocabulary word: twin",
    "definitionVn": "sinh đôi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'twin' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_32",
    "word": "orphan",
    "phonetic": "/ˈɔːfən/",
    "definition": "English vocabulary word: orphan",
    "definitionVn": "trẻ mồ côi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'orphan' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_33",
    "word": "widow",
    "phonetic": "/ˈwɪdoʊ/",
    "definition": "English vocabulary word: widow",
    "definitionVn": "góa phụ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'widow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_34",
    "word": "widower",
    "phonetic": "/ˈwɪdoʊər/",
    "definition": "English vocabulary word: widower",
    "definitionVn": "góa phu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'widower' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_35",
    "word": "bride",
    "phonetic": "/braɪd/",
    "definition": "English vocabulary word: bride",
    "definitionVn": "cô dâu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'bride' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_36",
    "word": "groom",
    "phonetic": "/ɡruːm/",
    "definition": "English vocabulary word: groom",
    "definitionVn": "chú rể",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'groom' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_37",
    "word": "best man",
    "phonetic": "/ˌbest ˈmæn/",
    "definition": "English vocabulary word: best man",
    "definitionVn": "phù rể",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'best man' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_38",
    "word": "bridesmaid",
    "phonetic": "/ˈbraɪdzmeɪd/",
    "definition": "English vocabulary word: bridesmaid",
    "definitionVn": "phù dâu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'bridesmaid' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_39",
    "word": "family tree",
    "phonetic": "/ˈfæməli triː/",
    "definition": "English vocabulary word: family tree",
    "definitionVn": "cây phả hệ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'family tree' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t1_40",
    "word": "generation",
    "phonetic": "/ˌdʒenəˈreɪʃən/",
    "definition": "English vocabulary word: generation",
    "definitionVn": "thế hệ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t1",
    "examples": [
      "\"How do you use the word 'generation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_1",
    "word": "house",
    "phonetic": "/haʊs/",
    "definition": "English vocabulary word: house",
    "definitionVn": "ngôi nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'house' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_2",
    "word": "apartment",
    "phonetic": "/əˈpɑːrtmənt/",
    "definition": "English vocabulary word: apartment",
    "definitionVn": "căn hộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'apartment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_3",
    "word": "room",
    "phonetic": "/ruːm/",
    "definition": "English vocabulary word: room",
    "definitionVn": "phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'room' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_4",
    "word": "bedroom",
    "phonetic": "/ˈbedruːm/",
    "definition": "English vocabulary word: bedroom",
    "definitionVn": "phòng ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'bedroom' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_5",
    "word": "living room",
    "phonetic": "/ˈlɪvɪŋ ruːm/",
    "definition": "English vocabulary word: living room",
    "definitionVn": "phòng khách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'living room' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_6",
    "word": "kitchen",
    "phonetic": "/ˈkɪtʃən/",
    "definition": "English vocabulary word: kitchen",
    "definitionVn": "nhà bếp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'kitchen' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_7",
    "word": "bathroom",
    "phonetic": "/ˈbæθruːm/",
    "definition": "English vocabulary word: bathroom",
    "definitionVn": "phòng tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'bathroom' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_8",
    "word": "dining room",
    "phonetic": "/ˈdaɪnɪŋ ruːm/",
    "definition": "English vocabulary word: dining room",
    "definitionVn": "phòng ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'dining room' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_9",
    "word": "garage",
    "phonetic": "/ɡəˈrɑːʒ/",
    "definition": "English vocabulary word: garage",
    "definitionVn": "nhà để xe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'garage' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_10",
    "word": "garden",
    "phonetic": "/ˈɡɑːrdən/",
    "definition": "English vocabulary word: garden",
    "definitionVn": "vườn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'garden' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_11",
    "word": "basement",
    "phonetic": "/ˈbeɪsmənt/",
    "definition": "English vocabulary word: basement",
    "definitionVn": "tầng hầm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'basement' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_12",
    "word": "attic",
    "phonetic": "/ˈætɪk/",
    "definition": "English vocabulary word: attic",
    "definitionVn": "gác mái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'attic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_13",
    "word": "balcony",
    "phonetic": "/ˈbælkəni/",
    "definition": "English vocabulary word: balcony",
    "definitionVn": "ban công",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'balcony' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_14",
    "word": "door",
    "phonetic": "/dɔːr/",
    "definition": "English vocabulary word: door",
    "definitionVn": "cửa ra vào",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'door' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_15",
    "word": "window",
    "phonetic": "/ˈwɪndoʊ/",
    "definition": "English vocabulary word: window",
    "definitionVn": "cửa sổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'window' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_16",
    "word": "wall",
    "phonetic": "/wɔːl/",
    "definition": "English vocabulary word: wall",
    "definitionVn": "tường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'wall' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_17",
    "word": "floor",
    "phonetic": "/flɔːr/",
    "definition": "English vocabulary word: floor",
    "definitionVn": "sàn nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'floor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_18",
    "word": "ceiling",
    "phonetic": "/ˈsiːlɪŋ/",
    "definition": "English vocabulary word: ceiling",
    "definitionVn": "trần nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'ceiling' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_19",
    "word": "roof",
    "phonetic": "/ruːf/",
    "definition": "English vocabulary word: roof",
    "definitionVn": "mái nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'roof' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_20",
    "word": "chimney",
    "phonetic": "/ˈtʃɪmni/",
    "definition": "English vocabulary word: chimney",
    "definitionVn": "ống khói",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'chimney' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_21",
    "word": "stair",
    "phonetic": "/steər/",
    "definition": "English vocabulary word: stair",
    "definitionVn": "cầu thang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'stair' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_22",
    "word": "elevator",
    "phonetic": "/ˈelɪveɪtər/",
    "definition": "English vocabulary word: elevator",
    "definitionVn": "thang máy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'elevator' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_23",
    "word": "fence",
    "phonetic": "/fens/",
    "definition": "English vocabulary word: fence",
    "definitionVn": "hàng rào",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'fence' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_24",
    "word": "gate",
    "phonetic": "/ɡeɪt/",
    "definition": "English vocabulary word: gate",
    "definitionVn": "cổng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'gate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_25",
    "word": "porch",
    "phonetic": "/pɔːrtʃ/",
    "definition": "English vocabulary word: porch",
    "definitionVn": "hiên nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'porch' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_26",
    "word": "backyard",
    "phonetic": "/ˌbækˈjɑːrd/",
    "definition": "English vocabulary word: backyard",
    "definitionVn": "sân sau",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'backyard' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_27",
    "word": "front yard",
    "phonetic": "/ˌfrʌnt ˈjɑːrd/",
    "definition": "English vocabulary word: front yard",
    "definitionVn": "sân trước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'front yard' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_28",
    "word": "furniture",
    "phonetic": "/ˈfɜːrnɪtʃər/",
    "definition": "English vocabulary word: furniture",
    "definitionVn": "đồ nội thất",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'furniture' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_29",
    "word": "table",
    "phonetic": "/ˈteɪbəl/",
    "definition": "English vocabulary word: table",
    "definitionVn": "bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'table' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_30",
    "word": "chair",
    "phonetic": "/tʃeər/",
    "definition": "English vocabulary word: chair",
    "definitionVn": "ghế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'chair' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_31",
    "word": "sofa",
    "phonetic": "/ˈsoʊfə/",
    "definition": "English vocabulary word: sofa",
    "definitionVn": "ghế sofa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'sofa' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_32",
    "word": "bed",
    "phonetic": "/bed/",
    "definition": "English vocabulary word: bed",
    "definitionVn": "giường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'bed' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_33",
    "word": "wardrobe",
    "phonetic": "/ˈwɔːrdroʊb/",
    "definition": "English vocabulary word: wardrobe",
    "definitionVn": "tủ quần áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'wardrobe' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_34",
    "word": "drawer",
    "phonetic": "/drɔːr/",
    "definition": "English vocabulary word: drawer",
    "definitionVn": "ngăn kéo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'drawer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_35",
    "word": "shelf",
    "phonetic": "/ʃelf/",
    "definition": "English vocabulary word: shelf",
    "definitionVn": "kệ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'shelf' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_36",
    "word": "cabinet",
    "phonetic": "/ˈkæbɪnət/",
    "definition": "English vocabulary word: cabinet",
    "definitionVn": "tủ có kệ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'cabinet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_37",
    "word": "mirror",
    "phonetic": "/ˈmɪrər/",
    "definition": "English vocabulary word: mirror",
    "definitionVn": "gương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'mirror' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_38",
    "word": "lamp",
    "phonetic": "/læmp/",
    "definition": "English vocabulary word: lamp",
    "definitionVn": "đèn bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'lamp' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_39",
    "word": "carpet",
    "phonetic": "/ˈkɑːrpɪt/",
    "definition": "English vocabulary word: carpet",
    "definitionVn": "thảm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'carpet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_40",
    "word": "rug",
    "phonetic": "/rʌɡ/",
    "definition": "English vocabulary word: rug",
    "definitionVn": "thảm nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'rug' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_41",
    "word": "curtain",
    "phonetic": "/ˈkɜːrtən/",
    "definition": "English vocabulary word: curtain",
    "definitionVn": "rèm cửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'curtain' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_42",
    "word": "pillow",
    "phonetic": "/ˈpɪloʊ/",
    "definition": "English vocabulary word: pillow",
    "definitionVn": "gối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'pillow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_43",
    "word": "blanket",
    "phonetic": "/ˈblæŋkɪt/",
    "definition": "English vocabulary word: blanket",
    "definitionVn": "chăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'blanket' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_44",
    "word": "towel",
    "phonetic": "/ˈtaʊəl/",
    "definition": "English vocabulary word: towel",
    "definitionVn": "khăn tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'towel' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_45",
    "word": "toilet",
    "phonetic": "/ˈtɔɪlət/",
    "definition": "English vocabulary word: toilet",
    "definitionVn": "bồn cầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'toilet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_46",
    "word": "sink",
    "phonetic": "/sɪŋk/",
    "definition": "English vocabulary word: sink",
    "definitionVn": "bồn rửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'sink' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_47",
    "word": "shower",
    "phonetic": "/ˈʃaʊər/",
    "definition": "English vocabulary word: shower",
    "definitionVn": "vòi tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'shower' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t2_48",
    "word": "bathtub",
    "phonetic": "/ˈbæθtʌb/",
    "definition": "English vocabulary word: bathtub",
    "definitionVn": "bồn tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t2",
    "examples": [
      "\"How do you use the word 'bathtub' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_1",
    "word": "apple",
    "phonetic": "/ˈæpəl/",
    "definition": "English vocabulary word: apple",
    "definitionVn": "táo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'apple' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_2",
    "word": "banana",
    "phonetic": "/bəˈnænə/",
    "definition": "English vocabulary word: banana",
    "definitionVn": "chuối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'banana' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_3",
    "word": "orange",
    "phonetic": "/ˈɔrɪndʒ/",
    "definition": "English vocabulary word: orange",
    "definitionVn": "cam",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'orange' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_4",
    "word": "bread",
    "phonetic": "/bred/",
    "definition": "English vocabulary word: bread",
    "definitionVn": "bánh mì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'bread' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_5",
    "word": "rice",
    "phonetic": "/raɪs/",
    "definition": "English vocabulary word: rice",
    "definitionVn": "cơm, gạo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'rice' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_6",
    "word": "meat",
    "phonetic": "/miːt/",
    "definition": "English vocabulary word: meat",
    "definitionVn": "thịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'meat' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_7",
    "word": "chicken",
    "phonetic": "/ˈtʃɪkɪn/",
    "definition": "English vocabulary word: chicken",
    "definitionVn": "gà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'chicken' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_8",
    "word": "beef",
    "phonetic": "/biːf/",
    "definition": "English vocabulary word: beef",
    "definitionVn": "thịt bò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'beef' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_9",
    "word": "pork",
    "phonetic": "/pɔːrk/",
    "definition": "English vocabulary word: pork",
    "definitionVn": "thịt lợn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'pork' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_10",
    "word": "fish",
    "phonetic": "/fɪʃ/",
    "definition": "English vocabulary word: fish",
    "definitionVn": "cá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'fish' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_11",
    "word": "egg",
    "phonetic": "/eɡ/",
    "definition": "English vocabulary word: egg",
    "definitionVn": "trứng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'egg' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_12",
    "word": "milk",
    "phonetic": "/mɪlk/",
    "definition": "English vocabulary word: milk",
    "definitionVn": "sữa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'milk' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_13",
    "word": "cheese",
    "phonetic": "/tʃiːz/",
    "definition": "English vocabulary word: cheese",
    "definitionVn": "phô mai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'cheese' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_14",
    "word": "butter",
    "phonetic": "/ˈbʌtər/",
    "definition": "English vocabulary word: butter",
    "definitionVn": "bơ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'butter' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_15",
    "word": "yogurt",
    "phonetic": "/ˈjoʊɡərt/",
    "definition": "English vocabulary word: yogurt",
    "definitionVn": "sữa chua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'yogurt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_16",
    "word": "coffee",
    "phonetic": "/ˈkɔːfi/",
    "definition": "English vocabulary word: coffee",
    "definitionVn": "cà phê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'coffee' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_17",
    "word": "tea",
    "phonetic": "/tiː/",
    "definition": "English vocabulary word: tea",
    "definitionVn": "trà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'tea' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_18",
    "word": "juice",
    "phonetic": "/dʒuːs/",
    "definition": "English vocabulary word: juice",
    "definitionVn": "nước ép",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'juice' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_19",
    "word": "water",
    "phonetic": "/ˈwɔːtər/",
    "definition": "English vocabulary word: water",
    "definitionVn": "nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'water' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_20",
    "word": "pizza",
    "phonetic": "/ˈpiːtsə/",
    "definition": "English vocabulary word: pizza",
    "definitionVn": "bánh pizza",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'pizza' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_21",
    "word": "sandwich",
    "phonetic": "/ˈsænwɪtʃ/",
    "definition": "English vocabulary word: sandwich",
    "definitionVn": "bánh sandwich",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'sandwich' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_22",
    "word": "salad",
    "phonetic": "/ˈsæləd/",
    "definition": "English vocabulary word: salad",
    "definitionVn": "rau trộn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'salad' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_23",
    "word": "soup",
    "phonetic": "/suːp/",
    "definition": "English vocabulary word: soup",
    "definitionVn": "súp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'soup' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_24",
    "word": "potato",
    "phonetic": "/pəˈteɪtoʊ/",
    "definition": "English vocabulary word: potato",
    "definitionVn": "khoai tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'potato' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_25",
    "word": "tomato",
    "phonetic": "/təˈmeɪtoʊ/",
    "definition": "English vocabulary word: tomato",
    "definitionVn": "cà chua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'tomato' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_26",
    "word": "onion",
    "phonetic": "/ˈʌnjən/",
    "definition": "English vocabulary word: onion",
    "definitionVn": "hành tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'onion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_27",
    "word": "garlic",
    "phonetic": "/ˈɡɑːrlɪk/",
    "definition": "English vocabulary word: garlic",
    "definitionVn": "tỏi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'garlic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_28",
    "word": "pepper",
    "phonetic": "/ˈpepər/",
    "definition": "English vocabulary word: pepper",
    "definitionVn": "ớt, tiêu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'pepper' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_29",
    "word": "salt",
    "phonetic": "/sɔːlt/",
    "definition": "English vocabulary word: salt",
    "definitionVn": "muối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'salt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_30",
    "word": "sugar",
    "phonetic": "/ˈʃʊɡər/",
    "definition": "English vocabulary word: sugar",
    "definitionVn": "đường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'sugar' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_31",
    "word": "flour",
    "phonetic": "/flaʊər/",
    "definition": "English vocabulary word: flour",
    "definitionVn": "bột mì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'flour' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_32",
    "word": "oil",
    "phonetic": "/ɔɪl/",
    "definition": "English vocabulary word: oil",
    "definitionVn": "dầu ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'oil' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_33",
    "word": "vinegar",
    "phonetic": "/ˈvɪnɪɡər/",
    "definition": "English vocabulary word: vinegar",
    "definitionVn": "giấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'vinegar' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_34",
    "word": "sauce",
    "phonetic": "/sɔːs/",
    "definition": "English vocabulary word: sauce",
    "definitionVn": "nước sốt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'sauce' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_35",
    "word": "noodles",
    "phonetic": "/ˈnuːdəlz/",
    "definition": "English vocabulary word: noodles",
    "definitionVn": "mì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'noodles' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_36",
    "word": "pasta",
    "phonetic": "/ˈpɑːstə/",
    "definition": "English vocabulary word: pasta",
    "definitionVn": "mì Ý",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'pasta' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_37",
    "word": "toast",
    "phonetic": "/toʊst/",
    "definition": "English vocabulary word: toast",
    "definitionVn": "bánh mì nướng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'toast' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_38",
    "word": "cereal",
    "phonetic": "/ˈsɪriəl/",
    "definition": "English vocabulary word: cereal",
    "definitionVn": "ngũ cốc",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'cereal' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_39",
    "word": "jam",
    "phonetic": "/dʒæm/",
    "definition": "English vocabulary word: jam",
    "definitionVn": "mứt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'jam' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_40",
    "word": "honey",
    "phonetic": "/ˈhʌni/",
    "definition": "English vocabulary word: honey",
    "definitionVn": "mật ong",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'honey' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_41",
    "word": "chocolate",
    "phonetic": "/ˈtʃɔːklət/",
    "definition": "English vocabulary word: chocolate",
    "definitionVn": "sô-cô-la",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'chocolate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_42",
    "word": "cake",
    "phonetic": "/keɪk/",
    "definition": "English vocabulary word: cake",
    "definitionVn": "bánh ngọt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'cake' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_43",
    "word": "cookie",
    "phonetic": "/ˈkʊki/",
    "definition": "English vocabulary word: cookie",
    "definitionVn": "bánh quy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'cookie' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_44",
    "word": "ice cream",
    "phonetic": "/ˌaɪs ˈkriːm/",
    "definition": "English vocabulary word: ice cream",
    "definitionVn": "kem",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'ice cream' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_45",
    "word": "candy",
    "phonetic": "/ˈkændi/",
    "definition": "English vocabulary word: candy",
    "definitionVn": "kẹo",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'candy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_46",
    "word": "fruit",
    "phonetic": "/fruːt/",
    "definition": "English vocabulary word: fruit",
    "definitionVn": "trái cây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'fruit' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_47",
    "word": "vegetable",
    "phonetic": "/ˈvedʒtəbəl/",
    "definition": "English vocabulary word: vegetable",
    "definitionVn": "rau củ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'vegetable' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_48",
    "word": "mushroom",
    "phonetic": "/ˈmʌʃruːm/",
    "definition": "English vocabulary word: mushroom",
    "definitionVn": "nấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'mushroom' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_49",
    "word": "carrot",
    "phonetic": "/ˈkærət/",
    "definition": "English vocabulary word: carrot",
    "definitionVn": "cà rốt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'carrot' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t3_50",
    "word": "corn",
    "phonetic": "/kɔːrn/",
    "definition": "English vocabulary word: corn",
    "definitionVn": "ngô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t3",
    "examples": [
      "\"How do you use the word 'corn' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_1",
    "word": "doctor",
    "phonetic": "/ˈdɑːktər/",
    "definition": "English vocabulary word: doctor",
    "definitionVn": "bác sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'doctor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_2",
    "word": "teacher",
    "phonetic": "/ˈtiːtʃər/",
    "definition": "English vocabulary word: teacher",
    "definitionVn": "giáo viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'teacher' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_3",
    "word": "engineer",
    "phonetic": "/ˌendʒɪˈnɪr/",
    "definition": "English vocabulary word: engineer",
    "definitionVn": "kỹ sư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'engineer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_4",
    "word": "lawyer",
    "phonetic": "/ˈlɔːjər/",
    "definition": "English vocabulary word: lawyer",
    "definitionVn": "luật sư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'lawyer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_5",
    "word": "nurse",
    "phonetic": "/nɜːrs/",
    "definition": "English vocabulary word: nurse",
    "definitionVn": "y tá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'nurse' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_6",
    "word": "accountant",
    "phonetic": "/əˈkaʊntənt/",
    "definition": "English vocabulary word: accountant",
    "definitionVn": "kế toán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'accountant' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_7",
    "word": "architect",
    "phonetic": "/ˈɑːrkɪtekt/",
    "definition": "English vocabulary word: architect",
    "definitionVn": "kiến trúc sư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'architect' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_8",
    "word": "artist",
    "phonetic": "/ˈɑːrtɪst/",
    "definition": "English vocabulary word: artist",
    "definitionVn": "họa sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'artist' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_9",
    "word": "musician",
    "phonetic": "/mjuːˈzɪʃən/",
    "definition": "English vocabulary word: musician",
    "definitionVn": "nhạc sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'musician' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_10",
    "word": "writer",
    "phonetic": "/ˈraɪtər/",
    "definition": "English vocabulary word: writer",
    "definitionVn": "nhà văn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'writer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_11",
    "word": "actor",
    "phonetic": "/ˈæktər/",
    "definition": "English vocabulary word: actor",
    "definitionVn": "diễn viên nam",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'actor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_12",
    "word": "actress",
    "phonetic": "/ˈæktrəs/",
    "definition": "English vocabulary word: actress",
    "definitionVn": "diễn viên nữ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'actress' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_13",
    "word": "singer",
    "phonetic": "/ˈsɪŋər/",
    "definition": "English vocabulary word: singer",
    "definitionVn": "ca sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'singer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_14",
    "word": "dancer",
    "phonetic": "/ˈdænsər/",
    "definition": "English vocabulary word: dancer",
    "definitionVn": "vũ công",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'dancer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_15",
    "word": "photographer",
    "phonetic": "/fəˈtɑːɡrəfər/",
    "definition": "English vocabulary word: photographer",
    "definitionVn": "nhiếp ảnh gia",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'photographer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_16",
    "word": "journalist",
    "phonetic": "/ˈdʒɜːrnəlɪst/",
    "definition": "English vocabulary word: journalist",
    "definitionVn": "nhà báo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'journalist' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_17",
    "word": "pilot",
    "phonetic": "/ˈpaɪlət/",
    "definition": "English vocabulary word: pilot",
    "definitionVn": "phi công",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'pilot' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_18",
    "word": "flight attendant",
    "phonetic": "/ˈflaɪt əˌtendənt/",
    "definition": "English vocabulary word: flight attendant",
    "definitionVn": "tiếp viên hàng không",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'flight attendant' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_19",
    "word": "chef",
    "phonetic": "/ʃef/",
    "definition": "English vocabulary word: chef",
    "definitionVn": "đầu bếp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'chef' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_20",
    "word": "police officer",
    "phonetic": "/pəˈliːs ˌɑːfɪsər/",
    "definition": "English vocabulary word: police officer",
    "definitionVn": "cảnh sát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'police officer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_21",
    "word": "firefighter",
    "phonetic": "/ˈfaɪərfaɪtər/",
    "definition": "English vocabulary word: firefighter",
    "definitionVn": "lính cứu hỏa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'firefighter' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_22",
    "word": "soldier",
    "phonetic": "/ˈsoʊldʒər/",
    "definition": "English vocabulary word: soldier",
    "definitionVn": "quân nhân",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'soldier' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_23",
    "word": "sailor",
    "phonetic": "/ˈseɪlər/",
    "definition": "English vocabulary word: sailor",
    "definitionVn": "thủy thủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'sailor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_24",
    "word": "mechanic",
    "phonetic": "/məˈkænɪk/",
    "definition": "English vocabulary word: mechanic",
    "definitionVn": "thợ máy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'mechanic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_25",
    "word": "electrician",
    "phonetic": "/ɪˌlekˈtrɪʃən/",
    "definition": "English vocabulary word: electrician",
    "definitionVn": "thợ điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'electrician' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_26",
    "word": "plumber",
    "phonetic": "/ˈplʌmər/",
    "definition": "English vocabulary word: plumber",
    "definitionVn": "thợ sửa ống nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'plumber' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_27",
    "word": "carpenter",
    "phonetic": "/ˈkɑːrpəntər/",
    "definition": "English vocabulary word: carpenter",
    "definitionVn": "thợ mộc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'carpenter' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_28",
    "word": "farmer",
    "phonetic": "/ˈfɑːrmər/",
    "definition": "English vocabulary word: farmer",
    "definitionVn": "nông dân",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'farmer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_29",
    "word": "scientist",
    "phonetic": "/ˈsaɪəntɪst/",
    "definition": "English vocabulary word: scientist",
    "definitionVn": "nhà khoa học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'scientist' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t4_30",
    "word": "astronaut",
    "phonetic": "/ˈæstrənɔːt/",
    "definition": "English vocabulary word: astronaut",
    "definitionVn": "phi hành gia",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t4",
    "examples": [
      "\"How do you use the word 'astronaut' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_1",
    "word": "school",
    "phonetic": "/skuːl/",
    "definition": "English vocabulary word: school",
    "definitionVn": "trường học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'school' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_2",
    "word": "classroom",
    "phonetic": "/ˈklæsruːm/",
    "definition": "English vocabulary word: classroom",
    "definitionVn": "phòng học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'classroom' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_3",
    "word": "student",
    "phonetic": "/ˈstuːdənt/",
    "definition": "English vocabulary word: student",
    "definitionVn": "học sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'student' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_4",
    "word": "teacher",
    "phonetic": "/ˈtiːtʃər/",
    "definition": "English vocabulary word: teacher",
    "definitionVn": "giáo viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'teacher' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_5",
    "word": "desk",
    "phonetic": "/desk/",
    "definition": "English vocabulary word: desk",
    "definitionVn": "bàn học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'desk' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_6",
    "word": "chair",
    "phonetic": "/tʃeər/",
    "definition": "English vocabulary word: chair",
    "definitionVn": "ghế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'chair' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_7",
    "word": "board",
    "phonetic": "/bɔːrd/",
    "definition": "English vocabulary word: board",
    "definitionVn": "bảng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'board' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_8",
    "word": "book",
    "phonetic": "/bʊk/",
    "definition": "English vocabulary word: book",
    "definitionVn": "sách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'book' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_9",
    "word": "notebook",
    "phonetic": "/ˈnoʊtbʊk/",
    "definition": "English vocabulary word: notebook",
    "definitionVn": "vở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'notebook' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_10",
    "word": "pencil",
    "phonetic": "/ˈpensəl/",
    "definition": "English vocabulary word: pencil",
    "definitionVn": "bút chì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'pencil' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_11",
    "word": "pen",
    "phonetic": "/pen/",
    "definition": "English vocabulary word: pen",
    "definitionVn": "bút mực",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'pen' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_12",
    "word": "eraser",
    "phonetic": "/ɪˈreɪzər/",
    "definition": "English vocabulary word: eraser",
    "definitionVn": "tẩy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'eraser' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_13",
    "word": "ruler",
    "phonetic": "/ˈruːlər/",
    "definition": "English vocabulary word: ruler",
    "definitionVn": "thước kẻ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'ruler' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_14",
    "word": "backpack",
    "phonetic": "/ˈbækpæk/",
    "definition": "English vocabulary word: backpack",
    "definitionVn": "ba lô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'backpack' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_15",
    "word": "calculator",
    "phonetic": "/ˈkælkjuleɪtər/",
    "definition": "English vocabulary word: calculator",
    "definitionVn": "máy tính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'calculator' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_16",
    "word": "dictionary",
    "phonetic": "/ˈdɪkʃəneri/",
    "definition": "English vocabulary word: dictionary",
    "definitionVn": "từ điển",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'dictionary' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_17",
    "word": "library",
    "phonetic": "/ˈlaɪbreri/",
    "definition": "English vocabulary word: library",
    "definitionVn": "thư viện",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'library' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_18",
    "word": "laboratory",
    "phonetic": "/ˈlæbrətɔːri/",
    "definition": "English vocabulary word: laboratory",
    "definitionVn": "phòng thí nghiệm",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'laboratory' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_19",
    "word": "gymnasium",
    "phonetic": "/dʒɪmˈneɪziəm/",
    "definition": "English vocabulary word: gymnasium",
    "definitionVn": "phòng tập thể dục",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'gymnasium' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t5_20",
    "word": "playground",
    "phonetic": "/ˈpleɪɡraʊnd/",
    "definition": "English vocabulary word: playground",
    "definitionVn": "sân chơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t5",
    "examples": [
      "\"How do you use the word 'playground' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_1",
    "word": "shirt",
    "phonetic": "/ʃɜːrt/",
    "definition": "English vocabulary word: shirt",
    "definitionVn": "áo sơ mi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'shirt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_2",
    "word": "T-shirt",
    "phonetic": "/ˈtiː ʃɜːrt/",
    "definition": "English vocabulary word: T-shirt",
    "definitionVn": "áo thun",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'T-shirt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_3",
    "word": "blouse",
    "phonetic": "/blaʊz/",
    "definition": "English vocabulary word: blouse",
    "definitionVn": "áo blouse",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'blouse' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_4",
    "word": "jacket",
    "phonetic": "/ˈdʒækɪt/",
    "definition": "English vocabulary word: jacket",
    "definitionVn": "áo khoác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'jacket' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_5",
    "word": "coat",
    "phonetic": "/koʊt/",
    "definition": "English vocabulary word: coat",
    "definitionVn": "áo măng tô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'coat' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_6",
    "word": "sweater",
    "phonetic": "/ˈswetər/",
    "definition": "English vocabulary word: sweater",
    "definitionVn": "áo len",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'sweater' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_7",
    "word": "jeans",
    "phonetic": "/dʒiːnz/",
    "definition": "English vocabulary word: jeans",
    "definitionVn": "quần jeans",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'jeans' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_8",
    "word": "trousers",
    "phonetic": "/ˈtraʊzərz/",
    "definition": "English vocabulary word: trousers",
    "definitionVn": "quần dài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'trousers' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_9",
    "word": "shorts",
    "phonetic": "/ʃɔːrts/",
    "definition": "English vocabulary word: shorts",
    "definitionVn": "quần đùi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'shorts' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_10",
    "word": "skirt",
    "phonetic": "/skɜːrt/",
    "definition": "English vocabulary word: skirt",
    "definitionVn": "váy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'skirt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_11",
    "word": "dress",
    "phonetic": "/dres/",
    "definition": "English vocabulary word: dress",
    "definitionVn": "đầm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'dress' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_12",
    "word": "suit",
    "phonetic": "/suːt/",
    "definition": "English vocabulary word: suit",
    "definitionVn": "bộ vest",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'suit' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_13",
    "word": "tie",
    "phonetic": "/taɪ/",
    "definition": "English vocabulary word: tie",
    "definitionVn": "cà vạt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'tie' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_14",
    "word": "belt",
    "phonetic": "/belt/",
    "definition": "English vocabulary word: belt",
    "definitionVn": "thắt lưng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'belt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_15",
    "word": "shoes",
    "phonetic": "/ʃuːz/",
    "definition": "English vocabulary word: shoes",
    "definitionVn": "giày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'shoes' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_16",
    "word": "boots",
    "phonetic": "/buːts/",
    "definition": "English vocabulary word: boots",
    "definitionVn": "ủng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'boots' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_17",
    "word": "sandals",
    "phonetic": "/ˈsændəlz/",
    "definition": "English vocabulary word: sandals",
    "definitionVn": "dép",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'sandals' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_18",
    "word": "socks",
    "phonetic": "/sɑːks/",
    "definition": "English vocabulary word: socks",
    "definitionVn": "tất",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'socks' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_19",
    "word": "gloves",
    "phonetic": "/ɡlʌvz/",
    "definition": "English vocabulary word: gloves",
    "definitionVn": "găng tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'gloves' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_20",
    "word": "hat",
    "phonetic": "/hæt/",
    "definition": "English vocabulary word: hat",
    "definitionVn": "mũ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'hat' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_21",
    "word": "scarf",
    "phonetic": "/skɑːrf/",
    "definition": "English vocabulary word: scarf",
    "definitionVn": "khăn quàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'scarf' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_22",
    "word": "necklace",
    "phonetic": "/ˈnekləs/",
    "definition": "English vocabulary word: necklace",
    "definitionVn": "dây chuyền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'necklace' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_23",
    "word": "bracelet",
    "phonetic": "/ˈbreɪslət/",
    "definition": "English vocabulary word: bracelet",
    "definitionVn": "vòng tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'bracelet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_24",
    "word": "earring",
    "phonetic": "/ˈɪrɪŋ/",
    "definition": "English vocabulary word: earring",
    "definitionVn": "bông tai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'earring' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t6_25",
    "word": "ring",
    "phonetic": "/rɪŋ/",
    "definition": "English vocabulary word: ring",
    "definitionVn": "nhẫn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t6",
    "examples": [
      "\"How do you use the word 'ring' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_1",
    "word": "weather",
    "phonetic": "/ˈweðər/",
    "definition": "English vocabulary word: weather",
    "definitionVn": "thời tiết",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'weather' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_2",
    "word": "temperature",
    "phonetic": "/ˈtemprətʃər/",
    "definition": "English vocabulary word: temperature",
    "definitionVn": "nhiệt độ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'temperature' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_3",
    "word": "sunny",
    "phonetic": "/ˈsʌni/",
    "definition": "English vocabulary word: sunny",
    "definitionVn": "nắng",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'sunny' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_4",
    "word": "cloudy",
    "phonetic": "/ˈklaʊdi/",
    "definition": "English vocabulary word: cloudy",
    "definitionVn": "có mây",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'cloudy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_5",
    "word": "rainy",
    "phonetic": "/ˈreɪni/",
    "definition": "English vocabulary word: rainy",
    "definitionVn": "có mưa",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'rainy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_6",
    "word": "windy",
    "phonetic": "/ˈwɪndi/",
    "definition": "English vocabulary word: windy",
    "definitionVn": "có gió",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'windy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_7",
    "word": "snowy",
    "phonetic": "/ˈsnoʊi/",
    "definition": "English vocabulary word: snowy",
    "definitionVn": "có tuyết",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'snowy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_8",
    "word": "hot",
    "phonetic": "/hɑːt/",
    "definition": "English vocabulary word: hot",
    "definitionVn": "nóng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'hot' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_9",
    "word": "cold",
    "phonetic": "/koʊld/",
    "definition": "English vocabulary word: cold",
    "definitionVn": "lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'cold' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_10",
    "word": "warm",
    "phonetic": "/wɔːrm/",
    "definition": "English vocabulary word: warm",
    "definitionVn": "ấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'warm' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_11",
    "word": "cool",
    "phonetic": "/kuːl/",
    "definition": "English vocabulary word: cool",
    "definitionVn": "mát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'cool' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_12",
    "word": "humid",
    "phonetic": "/ˈhjuːmɪd/",
    "definition": "English vocabulary word: humid",
    "definitionVn": "ẩm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'humid' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_13",
    "word": "dry",
    "phonetic": "/draɪ/",
    "definition": "English vocabulary word: dry",
    "definitionVn": "khô",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'dry' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_14",
    "word": "stormy",
    "phonetic": "/ˈstɔːrmi/",
    "definition": "English vocabulary word: stormy",
    "definitionVn": "có bão",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'stormy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_15",
    "word": "foggy",
    "phonetic": "/ˈfɑːɡi/",
    "definition": "English vocabulary word: foggy",
    "definitionVn": "có sương mù",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'foggy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_16",
    "word": "thunder",
    "phonetic": "/ˈθʌndər/",
    "definition": "English vocabulary word: thunder",
    "definitionVn": "sấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'thunder' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_17",
    "word": "lightning",
    "phonetic": "/ˈlaɪtnɪŋ/",
    "definition": "English vocabulary word: lightning",
    "definitionVn": "chớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'lightning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_18",
    "word": "rainbow",
    "phonetic": "/ˈreɪnboʊ/",
    "definition": "English vocabulary word: rainbow",
    "definitionVn": "cầu vồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'rainbow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_19",
    "word": "wind",
    "phonetic": "/wɪnd/",
    "definition": "English vocabulary word: wind",
    "definitionVn": "gió",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'wind' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_20",
    "word": "rain",
    "phonetic": "/reɪn/",
    "definition": "English vocabulary word: rain",
    "definitionVn": "mưa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'rain' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_21",
    "word": "snow",
    "phonetic": "/snoʊ/",
    "definition": "English vocabulary word: snow",
    "definitionVn": "tuyết",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'snow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_22",
    "word": "sunshine",
    "phonetic": "/ˈsʌnʃaɪn/",
    "definition": "English vocabulary word: sunshine",
    "definitionVn": "ánh nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'sunshine' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_23",
    "word": "clouds",
    "phonetic": "/klaʊdz/",
    "definition": "English vocabulary word: clouds",
    "definitionVn": "mây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'clouds' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_24",
    "word": "sky",
    "phonetic": "/skaɪ/",
    "definition": "English vocabulary word: sky",
    "definitionVn": "bầu trời",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'sky' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t7_25",
    "word": "season",
    "phonetic": "/ˈsiːzən/",
    "definition": "English vocabulary word: season",
    "definitionVn": "mùa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t7",
    "examples": [
      "\"How do you use the word 'season' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_1",
    "word": "car",
    "phonetic": "/kɑːr/",
    "definition": "English vocabulary word: car",
    "definitionVn": "ô tô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'car' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_2",
    "word": "bus",
    "phonetic": "/bʌs/",
    "definition": "English vocabulary word: bus",
    "definitionVn": "xe buýt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'bus' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_3",
    "word": "train",
    "phonetic": "/treɪn/",
    "definition": "English vocabulary word: train",
    "definitionVn": "tàu hỏa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'train' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_4",
    "word": "airplane",
    "phonetic": "/ˈerpleɪn/",
    "definition": "English vocabulary word: airplane",
    "definitionVn": "máy bay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'airplane' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_5",
    "word": "bicycle",
    "phonetic": "/ˈbaɪsɪkəl/",
    "definition": "English vocabulary word: bicycle",
    "definitionVn": "xe đạp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'bicycle' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_6",
    "word": "motorcycle",
    "phonetic": "/ˈmoʊtərsaɪkəl/",
    "definition": "English vocabulary word: motorcycle",
    "definitionVn": "xe máy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'motorcycle' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_7",
    "word": "truck",
    "phonetic": "/trʌk/",
    "definition": "English vocabulary word: truck",
    "definitionVn": "xe tải",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'truck' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_8",
    "word": "taxi",
    "phonetic": "/ˈtæksi/",
    "definition": "English vocabulary word: taxi",
    "definitionVn": "xe taxi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'taxi' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_9",
    "word": "subway",
    "phonetic": "/ˈsʌbweɪ/",
    "definition": "English vocabulary word: subway",
    "definitionVn": "tàu điện ngầm",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'subway' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_10",
    "word": "ship",
    "phonetic": "/ʃɪp/",
    "definition": "English vocabulary word: ship",
    "definitionVn": "tàu thủy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'ship' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_11",
    "word": "boat",
    "phonetic": "/boʊt/",
    "definition": "English vocabulary word: boat",
    "definitionVn": "thuyền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'boat' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_12",
    "word": "helicopter",
    "phonetic": "/ˈhelɪkɑːptər/",
    "definition": "English vocabulary word: helicopter",
    "definitionVn": "máy bay trực thăng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'helicopter' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_13",
    "word": "van",
    "phonetic": "/væn/",
    "definition": "English vocabulary word: van",
    "definitionVn": "xe van",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'van' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_14",
    "word": "ambulance",
    "phonetic": "/ˈæmbjələns/",
    "definition": "English vocabulary word: ambulance",
    "definitionVn": "xe cứu thương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'ambulance' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_15",
    "word": "fire truck",
    "phonetic": "/ˈfaɪər trʌk/",
    "definition": "English vocabulary word: fire truck",
    "definitionVn": "xe cứu hỏa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'fire truck' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_16",
    "word": "police car",
    "phonetic": "/pəˈliːs kɑːr/",
    "definition": "English vocabulary word: police car",
    "definitionVn": "xe cảnh sát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'police car' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_17",
    "word": "school bus",
    "phonetic": "/ˈskuːl bʌs/",
    "definition": "English vocabulary word: school bus",
    "definitionVn": "xe buýt đưa đón học sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'school bus' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_18",
    "word": "highway",
    "phonetic": "/ˈhaɪweɪ/",
    "definition": "English vocabulary word: highway",
    "definitionVn": "đường cao tốc",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'highway' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_19",
    "word": "bridge",
    "phonetic": "/brɪdʒ/",
    "definition": "English vocabulary word: bridge",
    "definitionVn": "cầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'bridge' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t8_20",
    "word": "tunnel",
    "phonetic": "/ˈtʌnəl/",
    "definition": "English vocabulary word: tunnel",
    "definitionVn": "đường hầm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t8",
    "examples": [
      "\"How do you use the word 'tunnel' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_1",
    "word": "dog",
    "phonetic": "/dɔːɡ/",
    "definition": "English vocabulary word: dog",
    "definitionVn": "chó",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'dog' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_2",
    "word": "cat",
    "phonetic": "/kæt/",
    "definition": "English vocabulary word: cat",
    "definitionVn": "mèo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'cat' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_3",
    "word": "bird",
    "phonetic": "/bɜːrd/",
    "definition": "English vocabulary word: bird",
    "definitionVn": "chim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'bird' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_4",
    "word": "fish",
    "phonetic": "/fɪʃ/",
    "definition": "English vocabulary word: fish",
    "definitionVn": "cá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'fish' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_5",
    "word": "elephant",
    "phonetic": "/ˈelɪfənt/",
    "definition": "English vocabulary word: elephant",
    "definitionVn": "voi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'elephant' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_6",
    "word": "tiger",
    "phonetic": "/ˈtaɪɡər/",
    "definition": "English vocabulary word: tiger",
    "definitionVn": "hổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'tiger' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_7",
    "word": "lion",
    "phonetic": "/ˈlaɪən/",
    "definition": "English vocabulary word: lion",
    "definitionVn": "sư tử",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'lion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_8",
    "word": "bear",
    "phonetic": "/beər/",
    "definition": "English vocabulary word: bear",
    "definitionVn": "gấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'bear' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_9",
    "word": "monkey",
    "phonetic": "/ˈmʌŋki/",
    "definition": "English vocabulary word: monkey",
    "definitionVn": "khỉ",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'monkey' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_10",
    "word": "horse",
    "phonetic": "/hɔːrs/",
    "definition": "English vocabulary word: horse",
    "definitionVn": "ngựa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'horse' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_11",
    "word": "cow",
    "phonetic": "/kaʊ/",
    "definition": "English vocabulary word: cow",
    "definitionVn": "bò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'cow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_12",
    "word": "chicken",
    "phonetic": "/ˈtʃɪkɪn/",
    "definition": "English vocabulary word: chicken",
    "definitionVn": "gà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'chicken' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_13",
    "word": "duck",
    "phonetic": "/dʌk/",
    "definition": "English vocabulary word: duck",
    "definitionVn": "vịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'duck' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_14",
    "word": "pig",
    "phonetic": "/pɪɡ/",
    "definition": "English vocabulary word: pig",
    "definitionVn": "lợn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'pig' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_15",
    "word": "sheep",
    "phonetic": "/ʃiːp/",
    "definition": "English vocabulary word: sheep",
    "definitionVn": "cừu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'sheep' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_16",
    "word": "goat",
    "phonetic": "/ɡoʊt/",
    "definition": "English vocabulary word: goat",
    "definitionVn": "dê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'goat' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_17",
    "word": "rabbit",
    "phonetic": "/ˈræbɪt/",
    "definition": "English vocabulary word: rabbit",
    "definitionVn": "thỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'rabbit' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_18",
    "word": "snake",
    "phonetic": "/sneɪk/",
    "definition": "English vocabulary word: snake",
    "definitionVn": "rắn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'snake' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_19",
    "word": "turtle",
    "phonetic": "/ˈtɜːrtəl/",
    "definition": "English vocabulary word: turtle",
    "definitionVn": "rùa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'turtle' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_20",
    "word": "frog",
    "phonetic": "/frɔːɡ/",
    "definition": "English vocabulary word: frog",
    "definitionVn": "ếch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'frog' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_21",
    "word": "whale",
    "phonetic": "/weɪl/",
    "definition": "English vocabulary word: whale",
    "definitionVn": "cá voi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'whale' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_22",
    "word": "dolphin",
    "phonetic": "/ˈdɑːlfɪn/",
    "definition": "English vocabulary word: dolphin",
    "definitionVn": "cá heo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'dolphin' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_23",
    "word": "shark",
    "phonetic": "/ʃɑːrk/",
    "definition": "English vocabulary word: shark",
    "definitionVn": "cá mập",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'shark' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_24",
    "word": "eagle",
    "phonetic": "/ˈiːɡəl/",
    "definition": "English vocabulary word: eagle",
    "definitionVn": "đại bàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'eagle' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_25",
    "word": "owl",
    "phonetic": "/aʊl/",
    "definition": "English vocabulary word: owl",
    "definitionVn": "cú",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'owl' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_26",
    "word": "penguin",
    "phonetic": "/ˈpeŋɡwɪn/",
    "definition": "English vocabulary word: penguin",
    "definitionVn": "chim cánh cụt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'penguin' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_27",
    "word": "butterfly",
    "phonetic": "/ˈbʌtərflaɪ/",
    "definition": "English vocabulary word: butterfly",
    "definitionVn": "bướm",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'butterfly' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_28",
    "word": "ladybug",
    "phonetic": "/ˈleɪdiˌbʌɡ/",
    "definition": "English vocabulary word: ladybug",
    "definitionVn": "bọ rùa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'ladybug' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_29",
    "word": "ant",
    "phonetic": "/ænt/",
    "definition": "English vocabulary word: ant",
    "definitionVn": "kiến",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'ant' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_30",
    "word": "spider",
    "phonetic": "/ˈspaɪdər/",
    "definition": "English vocabulary word: spider",
    "definitionVn": "nhện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'spider' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_31",
    "word": "bee",
    "phonetic": "/biː/",
    "definition": "English vocabulary word: bee",
    "definitionVn": "ong",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'bee' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_32",
    "word": "crocodile",
    "phonetic": "/ˈkrɑːkədaɪl/",
    "definition": "English vocabulary word: crocodile",
    "definitionVn": "cá sấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'crocodile' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_33",
    "word": "zebra",
    "phonetic": "/ˈziːbrə/",
    "definition": "English vocabulary word: zebra",
    "definitionVn": "ngựa vằn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'zebra' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_34",
    "word": "giraffe",
    "phonetic": "/dʒəˈræf/",
    "definition": "English vocabulary word: giraffe",
    "definitionVn": "hươu cao cổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'giraffe' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t9_35",
    "word": "kangaroo",
    "phonetic": "/ˌkæŋɡəˈruː/",
    "definition": "English vocabulary word: kangaroo",
    "definitionVn": "kangaroo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t9",
    "examples": [
      "\"How do you use the word 'kangaroo' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_1",
    "word": "wake up",
    "phonetic": "/weɪk ʌp/",
    "definition": "English vocabulary word: wake up",
    "definitionVn": "thức dậy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'wake up' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_2",
    "word": "get up",
    "phonetic": "/ɡet ʌp/",
    "definition": "English vocabulary word: get up",
    "definitionVn": "ngồi dậy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'get up' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_3",
    "word": "brush teeth",
    "phonetic": "/brʌʃ tiːθ/",
    "definition": "English vocabulary word: brush teeth",
    "definitionVn": "đánh răng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'brush teeth' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_4",
    "word": "wash face",
    "phonetic": "/wɑːʃ feɪs/",
    "definition": "English vocabulary word: wash face",
    "definitionVn": "rửa mặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'wash face' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_5",
    "word": "take shower",
    "phonetic": "/teɪk ˈʃaʊər/",
    "definition": "English vocabulary word: take shower",
    "definitionVn": "tắm",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'take shower' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_6",
    "word": "get dressed",
    "phonetic": "/ɡet drest/",
    "definition": "English vocabulary word: get dressed",
    "definitionVn": "mặc quần áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'get dressed' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_7",
    "word": "have breakfast",
    "phonetic": "/hæv ˈbrekfəst/",
    "definition": "English vocabulary word: have breakfast",
    "definitionVn": "ăn sáng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'have breakfast' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_8",
    "word": "go to school",
    "phonetic": "/ɡoʊ tuː skuːl/",
    "definition": "English vocabulary word: go to school",
    "definitionVn": "đi học",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'go to school' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_9",
    "word": "study",
    "phonetic": "/ˈstʌdi/",
    "definition": "English vocabulary word: study",
    "definitionVn": "học",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'study' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_10",
    "word": "have lunch",
    "phonetic": "/hæv lʌntʃ/",
    "definition": "English vocabulary word: have lunch",
    "definitionVn": "ăn trưa",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'have lunch' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_11",
    "word": "do homework",
    "phonetic": "/duː ˈhoʊmwɜːrk/",
    "definition": "English vocabulary word: do homework",
    "definitionVn": "làm bài tập",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'do homework' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_12",
    "word": "have dinner",
    "phonetic": "/hæv ˈdɪnər/",
    "definition": "English vocabulary word: have dinner",
    "definitionVn": "ăn tối",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'have dinner' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_13",
    "word": "watch TV",
    "phonetic": "/wɑːtʃ ˈtiː ˈviː/",
    "definition": "English vocabulary word: watch TV",
    "definitionVn": "xem TV",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'watch TV' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_14",
    "word": "read a book",
    "phonetic": "/riːd ə bʊk/",
    "definition": "English vocabulary word: read a book",
    "definitionVn": "đọc sách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'read a book' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_15",
    "word": "exercise",
    "phonetic": "/ˈeksərsaɪz/",
    "definition": "English vocabulary word: exercise",
    "definitionVn": "tập thể dục",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'exercise' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_16",
    "word": "go to bed",
    "phonetic": "/ɡoʊ tuː bed/",
    "definition": "English vocabulary word: go to bed",
    "definitionVn": "đi ngủ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 6,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'go to bed' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_17",
    "word": "get home",
    "phonetic": "/ɡet hoʊm/",
    "definition": "English vocabulary word: get home",
    "definitionVn": "về nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'get home' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_18",
    "word": "cook dinner",
    "phonetic": "/kʊk ˈdɪnər/",
    "definition": "English vocabulary word: cook dinner",
    "definitionVn": "nấu bữa tối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'cook dinner' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_19",
    "word": "listen to music",
    "phonetic": "/ˈlɪsən tuː ˈmjuːzɪk/",
    "definition": "English vocabulary word: listen to music",
    "definitionVn": "nghe nhạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'listen to music' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_20",
    "word": "browse internet",
    "phonetic": "/braʊz ˈɪntərnet/",
    "definition": "English vocabulary word: browse internet",
    "definitionVn": "lướt internet",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'browse internet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_21",
    "word": "call someone",
    "phonetic": "/kɔːl ˈsʌmwʌn/",
    "definition": "English vocabulary word: call someone",
    "definitionVn": "gọi điện cho ai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'call someone' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_22",
    "word": "send message",
    "phonetic": "/send ˈmesɪdʒ/",
    "definition": "English vocabulary word: send message",
    "definitionVn": "gửi tin nhắn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'send message' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_23",
    "word": "drink water",
    "phonetic": "/drɪŋk ˈwɔːtər/",
    "definition": "English vocabulary word: drink water",
    "definitionVn": "uống nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'drink water' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_24",
    "word": "chat with friends",
    "phonetic": "/tʃæt wɪð frendz/",
    "definition": "English vocabulary word: chat with friends",
    "definitionVn": "trò chuyện với bạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'chat with friends' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_25",
    "word": "plan the day",
    "phonetic": "/plæn ðə deɪ/",
    "definition": "English vocabulary word: plan the day",
    "definitionVn": "lên kế hoạch cho ngày mới",
    "pos": "adjective",
    "difficulty": 1,
    "frequency": 7,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'plan the day' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_26",
    "word": "start work",
    "phonetic": "/stɑːrt wɜːrk/",
    "definition": "English vocabulary word: start work",
    "definitionVn": "bắt đầu làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 8,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'start work' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_27",
    "word": "take a break",
    "phonetic": "/teɪk ə breɪk/",
    "definition": "English vocabulary word: take a break",
    "definitionVn": "nghỉ giải lao",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'take a break' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_28",
    "word": "check email",
    "phonetic": "/tʃek ˈiːmeɪl/",
    "definition": "English vocabulary word: check email",
    "definitionVn": "kiểm tra email",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'check email' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_29",
    "word": "prepare for tomorrow",
    "phonetic": "/prɪˈpeər fɔːr təˈmɑːroʊ/",
    "definition": "English vocabulary word: prepare for tomorrow",
    "definitionVn": "chuẩn bị cho ngày mai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'prepare for tomorrow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t10_30",
    "word": "relax",
    "phonetic": "/rɪˈlæks/",
    "definition": "English vocabulary word: relax",
    "definitionVn": "thư giãn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t10",
    "examples": [
      "\"How do you use the word 'relax' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_1",
    "word": "health",
    "phonetic": "/helθ/",
    "definition": "English vocabulary word: health",
    "definitionVn": "sức khỏe",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'health' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_2",
    "word": "medical",
    "phonetic": "/ˈmedɪkəl/",
    "definition": "English vocabulary word: medical",
    "definitionVn": "y tế",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'medical' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_3",
    "word": "patient",
    "phonetic": "/ˈpeɪʃənt/",
    "definition": "English vocabulary word: patient",
    "definitionVn": "bệnh nhân",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'patient' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_4",
    "word": "hospital",
    "phonetic": "/ˈhɑːspɪtl/",
    "definition": "English vocabulary word: hospital",
    "definitionVn": "bệnh viện",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'hospital' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_5",
    "word": "clinic",
    "phonetic": "/ˈklɪnɪk/",
    "definition": "English vocabulary word: clinic",
    "definitionVn": "phòng khám",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'clinic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_6",
    "word": "pharmacy",
    "phonetic": "/ˈfɑːrməsi/",
    "definition": "English vocabulary word: pharmacy",
    "definitionVn": "hiệu thuốc",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'pharmacy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_7",
    "word": "prescription",
    "phonetic": "/prɪˈskrɪpʃən/",
    "definition": "English vocabulary word: prescription",
    "definitionVn": "đơn thuốc",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'prescription' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_8",
    "word": "symptom",
    "phonetic": "/ˈsɪmptəm/",
    "definition": "English vocabulary word: symptom",
    "definitionVn": "triệu chứng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'symptom' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_9",
    "word": "disease",
    "phonetic": "/dɪˈziːz/",
    "definition": "English vocabulary word: disease",
    "definitionVn": "bệnh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'disease' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_10",
    "word": "infection",
    "phonetic": "/ɪnˈfekʃən/",
    "definition": "English vocabulary word: infection",
    "definitionVn": "nhiễm trùng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'infection' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_11",
    "word": "allergy",
    "phonetic": "/ˈælərdʒi/",
    "definition": "English vocabulary word: allergy",
    "definitionVn": "dị ứng",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'allergy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_12",
    "word": "fever",
    "phonetic": "/ˈfiːvər/",
    "definition": "English vocabulary word: fever",
    "definitionVn": "sốt",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'fever' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_13",
    "word": "cough",
    "phonetic": "/kɔːf/",
    "definition": "English vocabulary word: cough",
    "definitionVn": "ho",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'cough' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_14",
    "word": "headache",
    "phonetic": "/ˈhedeɪk/",
    "definition": "English vocabulary word: headache",
    "definitionVn": "đau đầu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'headache' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_15",
    "word": "stomachache",
    "phonetic": "/ˈstʌməkeɪk/",
    "definition": "English vocabulary word: stomachache",
    "definitionVn": "đau bụng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'stomachache' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_16",
    "word": "toothache",
    "phonetic": "/ˈtuːθeɪk/",
    "definition": "English vocabulary word: toothache",
    "definitionVn": "đau răng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'toothache' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_17",
    "word": "sore throat",
    "phonetic": "/ˈsɔːr θroʊt/",
    "definition": "English vocabulary word: sore throat",
    "definitionVn": "đau họng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'sore throat' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_18",
    "word": "runny nose",
    "phonetic": "/ˈrʌni noʊz/",
    "definition": "English vocabulary word: runny nose",
    "definitionVn": "chảy nước mũi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'runny nose' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_19",
    "word": "treatment",
    "phonetic": "/ˈtriːtmənt/",
    "definition": "English vocabulary word: treatment",
    "definitionVn": "điều trị",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'treatment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_20",
    "word": "medicine",
    "phonetic": "/ˈmedɪsən/",
    "definition": "English vocabulary word: medicine",
    "definitionVn": "thuốc",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'medicine' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_21",
    "word": "surgery",
    "phonetic": "/ˈsɜːrdʒəri/",
    "definition": "English vocabulary word: surgery",
    "definitionVn": "phẫu thuật",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'surgery' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_22",
    "word": "vaccine",
    "phonetic": "/vækˈsiːn/",
    "definition": "English vocabulary word: vaccine",
    "definitionVn": "vắc-xin",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'vaccine' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_23",
    "word": "immune",
    "phonetic": "/ɪˈmjuːn/",
    "definition": "English vocabulary word: immune",
    "definitionVn": "miễn dịch",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'immune' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_24",
    "word": "mental",
    "phonetic": "/ˈmentl/",
    "definition": "English vocabulary word: mental",
    "definitionVn": "tinh thần",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'mental' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_25",
    "word": "depression",
    "phonetic": "/dɪˈpreʃən/",
    "definition": "English vocabulary word: depression",
    "definitionVn": "trầm cảm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'depression' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_26",
    "word": "anxiety",
    "phonetic": "/æŋˈzaɪəti/",
    "definition": "English vocabulary word: anxiety",
    "definitionVn": "lo âu",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'anxiety' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_27",
    "word": "stress",
    "phonetic": "/stres/",
    "definition": "English vocabulary word: stress",
    "definitionVn": "căng thẳng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'stress' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_28",
    "word": "diet",
    "phonetic": "/ˈdaɪət/",
    "definition": "English vocabulary word: diet",
    "definitionVn": "chế độ ăn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'diet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_29",
    "word": "nutrition",
    "phonetic": "/nuːˈtrɪʃən/",
    "definition": "English vocabulary word: nutrition",
    "definitionVn": "dinh dưỡng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'nutrition' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_30",
    "word": "therapy",
    "phonetic": "/ˈθerəpi/",
    "definition": "English vocabulary word: therapy",
    "definitionVn": "liệu pháp",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'therapy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_31",
    "word": "recovery",
    "phonetic": "/rɪˈkʌvəri/",
    "definition": "English vocabulary word: recovery",
    "definitionVn": "hồi phục",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'recovery' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_32",
    "word": "wellness",
    "phonetic": "/ˈwelnes/",
    "definition": "English vocabulary word: wellness",
    "definitionVn": "sức khỏe tốt",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'wellness' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_33",
    "word": "hygiene",
    "phonetic": "/ˈhaɪdʒiːn/",
    "definition": "English vocabulary word: hygiene",
    "definitionVn": "vệ sinh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'hygiene' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_34",
    "word": "prevention",
    "phonetic": "/prɪˈvenʃən/",
    "definition": "English vocabulary word: prevention",
    "definitionVn": "phòng ngừa",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'prevention' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_35",
    "word": "medication",
    "phonetic": "/ˌmedɪˈkeɪʃən/",
    "definition": "English vocabulary word: medication",
    "definitionVn": "thuốc điều trị",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'medication' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_36",
    "word": "addiction",
    "phonetic": "/əˈdɪkʃən/",
    "definition": "English vocabulary word: addiction",
    "definitionVn": "nghiện",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'addiction' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_37",
    "word": "screening",
    "phonetic": "/ˈskriːnɪŋ/",
    "definition": "English vocabulary word: screening",
    "definitionVn": "sàng lọc",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'screening' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_38",
    "word": "diagnosis",
    "phonetic": "/ˌdaɪəɡˈnoʊsɪs/",
    "definition": "English vocabulary word: diagnosis",
    "definitionVn": "chẩn đoán",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'diagnosis' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_39",
    "word": "checkup",
    "phonetic": "/ˈtʃekʌp/",
    "definition": "English vocabulary word: checkup",
    "definitionVn": "kiểm tra sức khỏe",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'checkup' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t11_40",
    "word": "ambulance",
    "phonetic": "/ˈæmbjələns/",
    "definition": "English vocabulary word: ambulance",
    "definitionVn": "xe cứu thương",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t11",
    "examples": [
      "\"How do you use the word 'ambulance' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_1",
    "word": "business",
    "phonetic": "/ˈbɪznəs/",
    "definition": "English vocabulary word: business",
    "definitionVn": "kinh doanh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'business' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_2",
    "word": "company",
    "phonetic": "/ˈkʌmpəni/",
    "definition": "English vocabulary word: company",
    "definitionVn": "công ty",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'company' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_3",
    "word": "corporation",
    "phonetic": "/ˌkɔːrpəˈreɪʃən/",
    "definition": "English vocabulary word: corporation",
    "definitionVn": "tập đoàn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'corporation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_4",
    "word": "enterprise",
    "phonetic": "/ˈentərpraɪz/",
    "definition": "English vocabulary word: enterprise",
    "definitionVn": "doanh nghiệp",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'enterprise' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_5",
    "word": "startup",
    "phonetic": "/ˈstɑːrtʌp/",
    "definition": "English vocabulary word: startup",
    "definitionVn": "công ty khởi nghiệp",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'startup' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_6",
    "word": "entrepreneur",
    "phonetic": "/ˌɑːntrəprəˈnɜːr/",
    "definition": "English vocabulary word: entrepreneur",
    "definitionVn": "doanh nhân",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'entrepreneur' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_7",
    "word": "investor",
    "phonetic": "/ɪnˈvestər/",
    "definition": "English vocabulary word: investor",
    "definitionVn": "nhà đầu tư",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'investor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_8",
    "word": "shareholder",
    "phonetic": "/ˈʃerhoʊldər/",
    "definition": "English vocabulary word: shareholder",
    "definitionVn": "cổ đông",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'shareholder' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_9",
    "word": "stakeholder",
    "phonetic": "/ˈsteɪkhoʊldər/",
    "definition": "English vocabulary word: stakeholder",
    "definitionVn": "bên liên quan",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'stakeholder' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_10",
    "word": "board of directors",
    "phonetic": "/bɔːrd əv dəˈrektərz/",
    "definition": "English vocabulary word: board of directors",
    "definitionVn": "hội đồng quản trị",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'board of directors' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_11",
    "word": "CEO",
    "phonetic": "/ˌsiː iː ˈoʊ/",
    "definition": "English vocabulary word: CEO",
    "definitionVn": "giám đốc điều hành",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'CEO' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_12",
    "word": "manager",
    "phonetic": "/ˈmænɪdʒər/",
    "definition": "English vocabulary word: manager",
    "definitionVn": "quản lý",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'manager' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_13",
    "word": "employee",
    "phonetic": "/ɪmˈplɔɪiː/",
    "definition": "English vocabulary word: employee",
    "definitionVn": "nhân viên",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'employee' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_14",
    "word": "customer",
    "phonetic": "/ˈkʌstəmər/",
    "definition": "English vocabulary word: customer",
    "definitionVn": "khách hàng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'customer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_15",
    "word": "client",
    "phonetic": "/ˈklaɪənt/",
    "definition": "English vocabulary word: client",
    "definitionVn": "khách hàng (dịch vụ)",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'client' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_16",
    "word": "partner",
    "phonetic": "/ˈpɑːrtnər/",
    "definition": "English vocabulary word: partner",
    "definitionVn": "đối tác",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'partner' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_17",
    "word": "competitor",
    "phonetic": "/kəmˈpetɪtər/",
    "definition": "English vocabulary word: competitor",
    "definitionVn": "đối thủ cạnh tranh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'competitor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_18",
    "word": "profit",
    "phonetic": "/ˈprɑːfɪt/",
    "definition": "English vocabulary word: profit",
    "definitionVn": "lợi nhuận",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'profit' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_19",
    "word": "loss",
    "phonetic": "/lɔːs/",
    "definition": "English vocabulary word: loss",
    "definitionVn": "thua lỗ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'loss' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_20",
    "word": "revenue",
    "phonetic": "/ˈrevənuː/",
    "definition": "English vocabulary word: revenue",
    "definitionVn": "doanh thu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'revenue' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_21",
    "word": "budget",
    "phonetic": "/ˈbʌdʒɪt/",
    "definition": "English vocabulary word: budget",
    "definitionVn": "ngân sách",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'budget' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_22",
    "word": "investment",
    "phonetic": "/ɪnˈvestmənt/",
    "definition": "English vocabulary word: investment",
    "definitionVn": "đầu tư",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'investment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_23",
    "word": "sales",
    "phonetic": "/seɪlz/",
    "definition": "English vocabulary word: sales",
    "definitionVn": "bán hàng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'sales' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_24",
    "word": "marketing",
    "phonetic": "/ˈmɑːrkɪtɪŋ/",
    "definition": "English vocabulary word: marketing",
    "definitionVn": "tiếp thị",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'marketing' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_25",
    "word": "strategy",
    "phonetic": "/ˈstrætədʒi/",
    "definition": "English vocabulary word: strategy",
    "definitionVn": "chiến lược",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'strategy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_26",
    "word": "innovation",
    "phonetic": "/ˌɪnəˈveɪʃən/",
    "definition": "English vocabulary word: innovation",
    "definitionVn": "đổi mới",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'innovation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_27",
    "word": "expansion",
    "phonetic": "/ɪkˈspænʃən/",
    "definition": "English vocabulary word: expansion",
    "definitionVn": "mở rộng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'expansion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_28",
    "word": "merger",
    "phonetic": "/ˈmɜːrdʒər/",
    "definition": "English vocabulary word: merger",
    "definitionVn": "sáp nhập",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'merger' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_29",
    "word": "acquisition",
    "phonetic": "/ˌækwɪˈzɪʃən/",
    "definition": "English vocabulary word: acquisition",
    "definitionVn": "mua lại",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'acquisition' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_30",
    "word": "stock",
    "phonetic": "/stɑːk/",
    "definition": "English vocabulary word: stock",
    "definitionVn": "cổ phiếu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'stock' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_31",
    "word": "market",
    "phonetic": "/ˈmɑːrkɪt/",
    "definition": "English vocabulary word: market",
    "definitionVn": "thị trường",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'market' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_32",
    "word": "brand",
    "phonetic": "/brænd/",
    "definition": "English vocabulary word: brand",
    "definitionVn": "thương hiệu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'brand' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_33",
    "word": "advertising",
    "phonetic": "/ˈædvərtaɪzɪŋ/",
    "definition": "English vocabulary word: advertising",
    "definitionVn": "quảng cáo",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'advertising' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_34",
    "word": "promotion",
    "phonetic": "/prəˈmoʊʃən/",
    "definition": "English vocabulary word: promotion",
    "definitionVn": "khuyến mãi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'promotion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_35",
    "word": "logistics",
    "phonetic": "/ləˈdʒɪstɪks/",
    "definition": "English vocabulary word: logistics",
    "definitionVn": "hậu cần",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'logistics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_36",
    "word": "supply chain",
    "phonetic": "/səˈplaɪ tʃeɪn/",
    "definition": "English vocabulary word: supply chain",
    "definitionVn": "chuỗi cung ứng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'supply chain' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_37",
    "word": "quarterly",
    "phonetic": "/ˈkwɔːrtərli/",
    "definition": "English vocabulary word: quarterly",
    "definitionVn": "hàng quý",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'quarterly' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_38",
    "word": "annual",
    "phonetic": "/ˈænjuəl/",
    "definition": "English vocabulary word: annual",
    "definitionVn": "hàng năm",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'annual' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_39",
    "word": "forecast",
    "phonetic": "/ˈfɔːrkæst/",
    "definition": "English vocabulary word: forecast",
    "definitionVn": "dự báo",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'forecast' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t12_40",
    "word": "report",
    "phonetic": "/rɪˈpɔːrt/",
    "definition": "English vocabulary word: report",
    "definitionVn": "báo cáo",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t12",
    "examples": [
      "\"How do you use the word 'report' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_1",
    "word": "technology",
    "phonetic": "/tekˈnɑːlədʒi/",
    "definition": "English vocabulary word: technology",
    "definitionVn": "công nghệ",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'technology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_2",
    "word": "digital",
    "phonetic": "/ˈdɪdʒɪtl/",
    "definition": "English vocabulary word: digital",
    "definitionVn": "kỹ thuật số",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'digital' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_3",
    "word": "innovation",
    "phonetic": "/ˌɪnəˈveɪʃən/",
    "definition": "English vocabulary word: innovation",
    "definitionVn": "đổi mới",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'innovation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_4",
    "word": "software",
    "phonetic": "/ˈsɔːftwer/",
    "definition": "English vocabulary word: software",
    "definitionVn": "phần mềm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'software' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_5",
    "word": "hardware",
    "phonetic": "/ˈhɑːrdwer/",
    "definition": "English vocabulary word: hardware",
    "definitionVn": "phần cứng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'hardware' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_6",
    "word": "application",
    "phonetic": "/ˌæplɪˈkeɪʃən/",
    "definition": "English vocabulary word: application",
    "definitionVn": "ứng dụng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'application' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_7",
    "word": "device",
    "phonetic": "/dɪˈvaɪs/",
    "definition": "English vocabulary word: device",
    "definitionVn": "thiết bị",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'device' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_8",
    "word": "network",
    "phonetic": "/ˈnetwɜːrk/",
    "definition": "English vocabulary word: network",
    "definitionVn": "mạng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'network' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_9",
    "word": "internet",
    "phonetic": "/ˈɪntərnet/",
    "definition": "English vocabulary word: internet",
    "definitionVn": "internet",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'internet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_10",
    "word": "computer",
    "phonetic": "/kəmˈpjuːtər/",
    "definition": "English vocabulary word: computer",
    "definitionVn": "máy tính",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'computer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_11",
    "word": "laptop",
    "phonetic": "/ˈlæptɑːp/",
    "definition": "English vocabulary word: laptop",
    "definitionVn": "máy tính xách tay",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'laptop' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_12",
    "word": "smartphone",
    "phonetic": "/ˈsmɑːrtfoʊn/",
    "definition": "English vocabulary word: smartphone",
    "definitionVn": "điện thoại thông minh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'smartphone' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_13",
    "word": "artificial intelligence",
    "phonetic": "/ˌɑːrtɪfɪʃəl ɪnˈtelɪdʒəns/",
    "definition": "English vocabulary word: artificial intelligence",
    "definitionVn": "trí tuệ nhân tạo",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'artificial intelligence' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_14",
    "word": "machine learning",
    "phonetic": "/məˈʃiːn ˈlɜːrnɪŋ/",
    "definition": "English vocabulary word: machine learning",
    "definitionVn": "học máy",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'machine learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_15",
    "word": "data",
    "phonetic": "/ˈdeɪtə/",
    "definition": "English vocabulary word: data",
    "definitionVn": "dữ liệu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'data' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_16",
    "word": "algorithm",
    "phonetic": "/ˈælɡərɪðəm/",
    "definition": "English vocabulary word: algorithm",
    "definitionVn": "thuật toán",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'algorithm' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_17",
    "word": "cybersecurity",
    "phonetic": "/ˌsaɪbərsɪˈkjʊrəti/",
    "definition": "English vocabulary word: cybersecurity",
    "definitionVn": "an ninh mạng",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'cybersecurity' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_18",
    "word": "encryption",
    "phonetic": "/ɪnˈkrɪpʃən/",
    "definition": "English vocabulary word: encryption",
    "definitionVn": "mã hóa",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'encryption' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_19",
    "word": "cloud computing",
    "phonetic": "/klaʊd kəmˈpjuːtɪŋ/",
    "definition": "English vocabulary word: cloud computing",
    "definitionVn": "điện toán đám mây",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'cloud computing' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_20",
    "word": "blockchain",
    "phonetic": "/ˈblɑːktʃeɪn/",
    "definition": "English vocabulary word: blockchain",
    "definitionVn": "chuỗi khối",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'blockchain' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_21",
    "word": "virtual",
    "phonetic": "/ˈvɜːrtʃuəl/",
    "definition": "English vocabulary word: virtual",
    "definitionVn": "ảo",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'virtual' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_22",
    "word": "augmented reality",
    "phonetic": "/ɔːɡˈmentɪd riˈæləti/",
    "definition": "English vocabulary word: augmented reality",
    "definitionVn": "thực tế tăng cường",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'augmented reality' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_23",
    "word": "virtual reality",
    "phonetic": "/ˈvɜːrtʃuəl riˈæləti/",
    "definition": "English vocabulary word: virtual reality",
    "definitionVn": "thực tế ảo",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'virtual reality' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_24",
    "word": "user interface",
    "phonetic": "/ˈjuːzər ˈɪntərfeɪs/",
    "definition": "English vocabulary word: user interface",
    "definitionVn": "giao diện người dùng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'user interface' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_25",
    "word": "user experience",
    "phonetic": "/ˈjuːzər ɪkˈspɪriəns/",
    "definition": "English vocabulary word: user experience",
    "definitionVn": "trải nghiệm người dùng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'user experience' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_26",
    "word": "responsive",
    "phonetic": "/rɪˈspɑːnsɪv/",
    "definition": "English vocabulary word: responsive",
    "definitionVn": "đáp ứng",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'responsive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_27",
    "word": "database",
    "phonetic": "/ˈdeɪtəbeɪs/",
    "definition": "English vocabulary word: database",
    "definitionVn": "cơ sở dữ liệu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'database' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_28",
    "word": "server",
    "phonetic": "/ˈsɜːrvər/",
    "definition": "English vocabulary word: server",
    "definitionVn": "máy chủ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'server' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_29",
    "word": "program",
    "phonetic": "/ˈproʊɡræm/",
    "definition": "English vocabulary word: program",
    "definitionVn": "chương trình",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'program' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_30",
    "word": "code",
    "phonetic": "/koʊd/",
    "definition": "English vocabulary word: code",
    "definitionVn": "mã",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'code' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_31",
    "word": "developer",
    "phonetic": "/dɪˈveləpər/",
    "definition": "English vocabulary word: developer",
    "definitionVn": "nhà phát triển",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'developer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_32",
    "word": "update",
    "phonetic": "/ʌpˈdeɪt/",
    "definition": "English vocabulary word: update",
    "definitionVn": "cập nhật",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'update' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_33",
    "word": "download",
    "phonetic": "/ˌdaʊnˈloʊd/",
    "definition": "English vocabulary word: download",
    "definitionVn": "tải xuống",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'download' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_34",
    "word": "upload",
    "phonetic": "/ʌpˈloʊd/",
    "definition": "English vocabulary word: upload",
    "definitionVn": "tải lên",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'upload' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_35",
    "word": "cloud storage",
    "phonetic": "/klaʊd ˈstɔːrɪdʒ/",
    "definition": "English vocabulary word: cloud storage",
    "definitionVn": "lưu trữ đám mây",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'cloud storage' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_36",
    "word": "digital footprint",
    "phonetic": "/ˌdɪdʒɪtl ˈfʊtprɪnt/",
    "definition": "English vocabulary word: digital footprint",
    "definitionVn": "dấu chân kỹ thuật số",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'digital footprint' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_37",
    "word": "authentication",
    "phonetic": "/ɔːˌθentɪˈkeɪʃən/",
    "definition": "English vocabulary word: authentication",
    "definitionVn": "xác thực",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'authentication' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t13_38",
    "word": "authorization",
    "phonetic": "/ˌɔːθərəˈzeɪʃən/",
    "definition": "English vocabulary word: authorization",
    "definitionVn": "phân quyền",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t13",
    "examples": [
      "\"How do you use the word 'authorization' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_1",
    "word": "environment",
    "phonetic": "/ɪnˈvaɪrənmənt/",
    "definition": "English vocabulary word: environment",
    "definitionVn": "môi trường",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'environment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_2",
    "word": "ecosystem",
    "phonetic": "/ˈiːkoʊsɪstəm/",
    "definition": "English vocabulary word: ecosystem",
    "definitionVn": "hệ sinh thái",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'ecosystem' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_3",
    "word": "pollution",
    "phonetic": "/pəˈluːʃən/",
    "definition": "English vocabulary word: pollution",
    "definitionVn": "ô nhiễm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'pollution' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_4",
    "word": "climate change",
    "phonetic": "/ˈklaɪmət tʃeɪndʒ/",
    "definition": "English vocabulary word: climate change",
    "definitionVn": "biến đổi khí hậu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'climate change' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_5",
    "word": "global warming",
    "phonetic": "/ˈɡloʊbəl ˈwɔːrmɪŋ/",
    "definition": "English vocabulary word: global warming",
    "definitionVn": "nóng lên toàn cầu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'global warming' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_6",
    "word": "deforestation",
    "phonetic": "/diːˌfɔːrɪˈsteɪʃən/",
    "definition": "English vocabulary word: deforestation",
    "definitionVn": "phá rừng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'deforestation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_7",
    "word": "conservation",
    "phonetic": "/ˌkɑːnsərˈveɪʃən/",
    "definition": "English vocabulary word: conservation",
    "definitionVn": "bảo tồn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'conservation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_8",
    "word": "renewable energy",
    "phonetic": "/rɪˈnuːəbl ˈenərdʒi/",
    "definition": "English vocabulary word: renewable energy",
    "definitionVn": "năng lượng tái tạo",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'renewable energy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_9",
    "word": "sustainable",
    "phonetic": "/səˈsteɪnəbl/",
    "definition": "English vocabulary word: sustainable",
    "definitionVn": "bền vững",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'sustainable' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_10",
    "word": "recycle",
    "phonetic": "/ˌriːˈsaɪkəl/",
    "definition": "English vocabulary word: recycle",
    "definitionVn": "tái chế",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'recycle' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_11",
    "word": "reduce",
    "phonetic": "/rɪˈduːs/",
    "definition": "English vocabulary word: reduce",
    "definitionVn": "giảm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'reduce' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_12",
    "word": "reuse",
    "phonetic": "/ˌriːˈjuːz/",
    "definition": "English vocabulary word: reuse",
    "definitionVn": "tái sử dụng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'reuse' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_13",
    "word": "carbon footprint",
    "phonetic": "/ˈkɑːrbən ˈfʊtprɪnt/",
    "definition": "English vocabulary word: carbon footprint",
    "definitionVn": "dấu chân carbon",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'carbon footprint' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_14",
    "word": "biodiversity",
    "phonetic": "/ˌbaɪoʊdaɪˈvɜːrsəti/",
    "definition": "English vocabulary word: biodiversity",
    "definitionVn": "đa dạng sinh học",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'biodiversity' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_15",
    "word": "endangered species",
    "phonetic": "/ɪnˈdeɪndʒərd ˈspiːʃiːz/",
    "definition": "English vocabulary word: endangered species",
    "definitionVn": "loài có nguy cơ tuyệt chủng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'endangered species' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_16",
    "word": "greenhouse gases",
    "phonetic": "/ˈɡriːnhaʊs ˈɡæsɪz/",
    "definition": "English vocabulary word: greenhouse gases",
    "definitionVn": "khí nhà kính",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'greenhouse gases' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_17",
    "word": "wildlife",
    "phonetic": "/ˈwaɪldlaɪf/",
    "definition": "English vocabulary word: wildlife",
    "definitionVn": "động vật hoang dã",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'wildlife' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_18",
    "word": "natural resources",
    "phonetic": "/ˈnætʃrəl ˈriːsɔːrsɪz/",
    "definition": "English vocabulary word: natural resources",
    "definitionVn": "tài nguyên thiên nhiên",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'natural resources' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_19",
    "word": "ocean",
    "phonetic": "/ˈoʊʃən/",
    "definition": "English vocabulary word: ocean",
    "definitionVn": "đại dương",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'ocean' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_20",
    "word": "deforestation",
    "phonetic": "/diːˌfɔːrɪˈsteɪʃən/",
    "definition": "English vocabulary word: deforestation",
    "definitionVn": "phá rừng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'deforestation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_21",
    "word": "drought",
    "phonetic": "/draʊt/",
    "definition": "English vocabulary word: drought",
    "definitionVn": "hạn hán",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'drought' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_22",
    "word": "flood",
    "phonetic": "/flʌd/",
    "definition": "English vocabulary word: flood",
    "definitionVn": "lũ lụt",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'flood' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_23",
    "word": "earthquake",
    "phonetic": "/ˈɜːrθkweɪk/",
    "definition": "English vocabulary word: earthquake",
    "definitionVn": "động đất",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'earthquake' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_24",
    "word": "tsunami",
    "phonetic": "/tsuːˈnɑːmi/",
    "definition": "English vocabulary word: tsunami",
    "definitionVn": "sóng thần",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'tsunami' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_25",
    "word": "hurricane",
    "phonetic": "/ˈhɜːrəkeɪn/",
    "definition": "English vocabulary word: hurricane",
    "definitionVn": "bão",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'hurricane' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_26",
    "word": "solar power",
    "phonetic": "/ˈsoʊlər ˈpaʊər/",
    "definition": "English vocabulary word: solar power",
    "definitionVn": "năng lượng mặt trời",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'solar power' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_27",
    "word": "wind energy",
    "phonetic": "/wɪnd ˈenərdʒi/",
    "definition": "English vocabulary word: wind energy",
    "definitionVn": "năng lượng gió",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'wind energy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_28",
    "word": "biodegradable",
    "phonetic": "/ˌbaɪoʊdɪˈɡreɪdəbl/",
    "definition": "English vocabulary word: biodegradable",
    "definitionVn": "có thể phân hủy sinh học",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'biodegradable' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_29",
    "word": "compost",
    "phonetic": "/ˈkɑːmpoʊst/",
    "definition": "English vocabulary word: compost",
    "definitionVn": "phân trộn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'compost' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t14_30",
    "word": "pollution",
    "phonetic": "/pəˈluːʃən/",
    "definition": "English vocabulary word: pollution",
    "definitionVn": "ô nhiễm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t14",
    "examples": [
      "\"How do you use the word 'pollution' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_1",
    "word": "education",
    "phonetic": "/ˌedʒuˈkeɪʃən/",
    "definition": "English vocabulary word: education",
    "definitionVn": "giáo dục",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'education' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_2",
    "word": "curriculum",
    "phonetic": "/kəˈrɪkjələm/",
    "definition": "English vocabulary word: curriculum",
    "definitionVn": "chương trình học",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'curriculum' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_3",
    "word": "pedagogy",
    "phonetic": "/ˈpedəɡɑːdʒi/",
    "definition": "English vocabulary word: pedagogy",
    "definitionVn": "sư phạm",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'pedagogy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_4",
    "word": "scholarship",
    "phonetic": "/ˈskɑːlərʃɪp/",
    "definition": "English vocabulary word: scholarship",
    "definitionVn": "học bổng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'scholarship' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_5",
    "word": "tuition",
    "phonetic": "/tuːˈɪʃən/",
    "definition": "English vocabulary word: tuition",
    "definitionVn": "học phí",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'tuition' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_6",
    "word": "degree",
    "phonetic": "/dɪˈɡriː/",
    "definition": "English vocabulary word: degree",
    "definitionVn": "bằng cấp",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'degree' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_7",
    "word": "diploma",
    "phonetic": "/dɪˈploʊmə/",
    "definition": "English vocabulary word: diploma",
    "definitionVn": "chứng chỉ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'diploma' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_8",
    "word": "certificate",
    "phonetic": "/sərˈtɪfɪkət/",
    "definition": "English vocabulary word: certificate",
    "definitionVn": "chứng nhận",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'certificate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_9",
    "word": "semester",
    "phonetic": "/sɪˈmestər/",
    "definition": "English vocabulary word: semester",
    "definitionVn": "học kỳ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'semester' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_10",
    "word": "syllabus",
    "phonetic": "/ˈsɪləbəs/",
    "definition": "English vocabulary word: syllabus",
    "definitionVn": "đề cương môn học",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'syllabus' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_11",
    "word": "lecture",
    "phonetic": "/ˈlektʃər/",
    "definition": "English vocabulary word: lecture",
    "definitionVn": "bài giảng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'lecture' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_12",
    "word": "assignment",
    "phonetic": "/əˈsaɪnmənt/",
    "definition": "English vocabulary word: assignment",
    "definitionVn": "bài tập",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'assignment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_13",
    "word": "project",
    "phonetic": "/ˈprɑːdʒekt/",
    "definition": "English vocabulary word: project",
    "definitionVn": "dự án",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'project' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_14",
    "word": "research",
    "phonetic": "/rɪˈsɜːrtʃ/",
    "definition": "English vocabulary word: research",
    "definitionVn": "nghiên cứu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'research' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_15",
    "word": "thesis",
    "phonetic": "/ˈθiːsɪs/",
    "definition": "English vocabulary word: thesis",
    "definitionVn": "luận văn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'thesis' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_16",
    "word": "dissertation",
    "phonetic": "/ˌdɪsərˈteɪʃən/",
    "definition": "English vocabulary word: dissertation",
    "definitionVn": "luận án",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'dissertation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_17",
    "word": "academic",
    "phonetic": "/ˌækəˈdemɪk/",
    "definition": "English vocabulary word: academic",
    "definitionVn": "học thuật",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'academic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_18",
    "word": "faculty",
    "phonetic": "/ˈfækəlti/",
    "definition": "English vocabulary word: faculty",
    "definitionVn": "khoa, giảng viên",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'faculty' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_19",
    "word": "mentor",
    "phonetic": "/ˈmentɔːr/",
    "definition": "English vocabulary word: mentor",
    "definitionVn": "người hướng dẫn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'mentor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_20",
    "word": "peer",
    "phonetic": "/pɪr/",
    "definition": "English vocabulary word: peer",
    "definitionVn": "bạn học",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'peer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_21",
    "word": "e-learning",
    "phonetic": "/ˈiː lɜːrnɪŋ/",
    "definition": "English vocabulary word: e-learning",
    "definitionVn": "học trực tuyến",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'e-learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_22",
    "word": "distance learning",
    "phonetic": "/ˈdɪstəns ˈlɜːrnɪŋ/",
    "definition": "English vocabulary word: distance learning",
    "definitionVn": "học từ xa",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'distance learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_23",
    "word": "lifelong learning",
    "phonetic": "/ˈlaɪflɔːŋ ˈlɜːrnɪŋ/",
    "definition": "English vocabulary word: lifelong learning",
    "definitionVn": "học tập suốt đời",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'lifelong learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_24",
    "word": "critical thinking",
    "phonetic": "/ˈkrɪtɪkəl ˈθɪŋkɪŋ/",
    "definition": "English vocabulary word: critical thinking",
    "definitionVn": "tư duy phản biện",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'critical thinking' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_25",
    "word": "creativity",
    "phonetic": "/ˌkriːeɪˈtɪvəti/",
    "definition": "English vocabulary word: creativity",
    "definitionVn": "sáng tạo",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'creativity' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_26",
    "word": "literacy",
    "phonetic": "/ˈlɪtərəsi/",
    "definition": "English vocabulary word: literacy",
    "definitionVn": "khả năng đọc viết",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'literacy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_27",
    "word": "numeracy",
    "phonetic": "/ˈnuːmərəsi/",
    "definition": "English vocabulary word: numeracy",
    "definitionVn": "khả năng tính toán",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'numeracy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_28",
    "word": "assessment",
    "phonetic": "/əˈsesmənt/",
    "definition": "English vocabulary word: assessment",
    "definitionVn": "đánh giá",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'assessment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t15_29",
    "word": "graduation",
    "phonetic": "/ˌɡrædʒuˈeɪʃən/",
    "definition": "English vocabulary word: graduation",
    "definitionVn": "tốt nghiệp",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t15",
    "examples": [
      "\"How do you use the word 'graduation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_1",
    "word": "psychology",
    "phonetic": "/saɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: psychology",
    "definitionVn": "tâm lý học",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'psychology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_2",
    "word": "mind",
    "phonetic": "/maɪnd/",
    "definition": "English vocabulary word: mind",
    "definitionVn": "tâm trí",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'mind' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_3",
    "word": "behavior",
    "phonetic": "/bɪˈheɪvjər/",
    "definition": "English vocabulary word: behavior",
    "definitionVn": "hành vi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'behavior' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_4",
    "word": "emotion",
    "phonetic": "/ɪˈmoʊʃən/",
    "definition": "English vocabulary word: emotion",
    "definitionVn": "cảm xúc",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'emotion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_5",
    "word": "thought",
    "phonetic": "/θɔːt/",
    "definition": "English vocabulary word: thought",
    "definitionVn": "suy nghĩ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'thought' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_6",
    "word": "perception",
    "phonetic": "/pərˈsepʃən/",
    "definition": "English vocabulary word: perception",
    "definitionVn": "nhận thức",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'perception' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_7",
    "word": "memory",
    "phonetic": "/ˈmeməri/",
    "definition": "English vocabulary word: memory",
    "definitionVn": "trí nhớ",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'memory' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_8",
    "word": "attention",
    "phonetic": "/əˈtenʃən/",
    "definition": "English vocabulary word: attention",
    "definitionVn": "sự chú ý",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'attention' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_9",
    "word": "motivation",
    "phonetic": "/ˌmoʊtɪˈveɪʃən/",
    "definition": "English vocabulary word: motivation",
    "definitionVn": "động lực",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'motivation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_10",
    "word": "personality",
    "phonetic": "/ˌpɜːrsəˈnæləti/",
    "definition": "English vocabulary word: personality",
    "definitionVn": "tính cách",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'personality' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_11",
    "word": "intelligence",
    "phonetic": "/ɪnˈtelɪdʒəns/",
    "definition": "English vocabulary word: intelligence",
    "definitionVn": "trí thông minh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'intelligence' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_12",
    "word": "consciousness",
    "phonetic": "/ˈkɑːnʃəsnəs/",
    "definition": "English vocabulary word: consciousness",
    "definitionVn": "ý thức",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'consciousness' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_13",
    "word": "subconscious",
    "phonetic": "/sʌbˈkɑːnʃəs/",
    "definition": "English vocabulary word: subconscious",
    "definitionVn": "tiềm thức",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'subconscious' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_14",
    "word": "empathy",
    "phonetic": "/ˈempəθi/",
    "definition": "English vocabulary word: empathy",
    "definitionVn": "sự đồng cảm",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'empathy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_15",
    "word": "stress",
    "phonetic": "/stres/",
    "definition": "English vocabulary word: stress",
    "definitionVn": "căng thẳng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'stress' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_16",
    "word": "anxiety",
    "phonetic": "/æŋˈzaɪəti/",
    "definition": "English vocabulary word: anxiety",
    "definitionVn": "lo âu",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'anxiety' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_17",
    "word": "depression",
    "phonetic": "/dɪˈpreʃən/",
    "definition": "English vocabulary word: depression",
    "definitionVn": "trầm cảm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'depression' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_18",
    "word": "trauma",
    "phonetic": "/ˈtrɔːmə/",
    "definition": "English vocabulary word: trauma",
    "definitionVn": "chấn thương tâm lý",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'trauma' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_19",
    "word": "therapy",
    "phonetic": "/ˈθerəpi/",
    "definition": "English vocabulary word: therapy",
    "definitionVn": "liệu pháp tâm lý",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'therapy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_20",
    "word": "cognition",
    "phonetic": "/kɑːɡˈnɪʃən/",
    "definition": "English vocabulary word: cognition",
    "definitionVn": "nhận thức",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'cognition' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_21",
    "word": "learning",
    "phonetic": "/ˈlɜːrnɪŋ/",
    "definition": "English vocabulary word: learning",
    "definitionVn": "học tập",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_22",
    "word": "habit",
    "phonetic": "/ˈhæbɪt/",
    "definition": "English vocabulary word: habit",
    "definitionVn": "thói quen",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'habit' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_23",
    "word": "instinct",
    "phonetic": "/ˈɪnstɪŋkt/",
    "definition": "English vocabulary word: instinct",
    "definitionVn": "bản năng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'instinct' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_24",
    "word": "intuition",
    "phonetic": "/ˌɪntuˈɪʃən/",
    "definition": "English vocabulary word: intuition",
    "definitionVn": "trực giác",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'intuition' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_25",
    "word": "self-esteem",
    "phonetic": "/ˌself ɪˈstiːm/",
    "definition": "English vocabulary word: self-esteem",
    "definitionVn": "lòng tự trọng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'self-esteem' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_26",
    "word": "self-awareness",
    "phonetic": "/ˌself əˈwernəs/",
    "definition": "English vocabulary word: self-awareness",
    "definitionVn": "tự nhận thức",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'self-awareness' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_27",
    "word": "social",
    "phonetic": "/ˈsoʊʃəl/",
    "definition": "English vocabulary word: social",
    "definitionVn": "xã hội",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'social' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_28",
    "word": "emotional",
    "phonetic": "/ɪˈmoʊʃənl/",
    "definition": "English vocabulary word: emotional",
    "definitionVn": "cảm xúc",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'emotional' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_29",
    "word": "mental health",
    "phonetic": "/ˈmentl helθ/",
    "definition": "English vocabulary word: mental health",
    "definitionVn": "sức khỏe tâm thần",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'mental health' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t16_30",
    "word": "resilience",
    "phonetic": "/rɪˈzɪliəns/",
    "definition": "English vocabulary word: resilience",
    "definitionVn": "khả năng phục hồi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t16",
    "examples": [
      "\"How do you use the word 'resilience' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_1",
    "word": "travel",
    "phonetic": "/ˈtrævəl/",
    "definition": "English vocabulary word: travel",
    "definitionVn": "du lịch",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'travel' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_2",
    "word": "tourism",
    "phonetic": "/ˈtʊrɪzəm/",
    "definition": "English vocabulary word: tourism",
    "definitionVn": "ngành du lịch",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'tourism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_3",
    "word": "adventure",
    "phonetic": "/ədˈventʃər/",
    "definition": "English vocabulary word: adventure",
    "definitionVn": "phiêu lưu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'adventure' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_4",
    "word": "itinerary",
    "phonetic": "/aɪˈtɪnəreri/",
    "definition": "English vocabulary word: itinerary",
    "definitionVn": "hành trình",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'itinerary' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_5",
    "word": "destination",
    "phonetic": "/ˌdestɪˈneɪʃən/",
    "definition": "English vocabulary word: destination",
    "definitionVn": "điểm đến",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'destination' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_6",
    "word": "accommodation",
    "phonetic": "/əˌkɑːməˈdeɪʃən/",
    "definition": "English vocabulary word: accommodation",
    "definitionVn": "chỗ ở",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'accommodation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_7",
    "word": "hotel",
    "phonetic": "/hoʊˈtel/",
    "definition": "English vocabulary word: hotel",
    "definitionVn": "khách sạn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'hotel' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_8",
    "word": "resort",
    "phonetic": "/rɪˈzɔːrt/",
    "definition": "English vocabulary word: resort",
    "definitionVn": "khu nghỉ dưỡng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'resort' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_9",
    "word": "hostel",
    "phonetic": "/ˈhɑːstl/",
    "definition": "English vocabulary word: hostel",
    "definitionVn": "nhà nghỉ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'hostel' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_10",
    "word": "flight",
    "phonetic": "/flaɪt/",
    "definition": "English vocabulary word: flight",
    "definitionVn": "chuyến bay",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'flight' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_11",
    "word": "airline",
    "phonetic": "/ˈerlaɪn/",
    "definition": "English vocabulary word: airline",
    "definitionVn": "hãng hàng không",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'airline' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_12",
    "word": "passport",
    "phonetic": "/ˈpæspɔːrt/",
    "definition": "English vocabulary word: passport",
    "definitionVn": "hộ chiếu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'passport' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_13",
    "word": "visa",
    "phonetic": "/ˈviːzə/",
    "definition": "English vocabulary word: visa",
    "definitionVn": "thị thực",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'visa' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_14",
    "word": "luggage",
    "phonetic": "/ˈlʌɡɪdʒ/",
    "definition": "English vocabulary word: luggage",
    "definitionVn": "hành lý",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'luggage' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_15",
    "word": "souvenir",
    "phonetic": "/ˌsuːvəˈnɪr/",
    "definition": "English vocabulary word: souvenir",
    "definitionVn": "quà lưu niệm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'souvenir' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_16",
    "word": "culture",
    "phonetic": "/ˈkʌltʃər/",
    "definition": "English vocabulary word: culture",
    "definitionVn": "văn hóa",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'culture' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_17",
    "word": "landscape",
    "phonetic": "/ˈlændskeɪp/",
    "definition": "English vocabulary word: landscape",
    "definitionVn": "phong cảnh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'landscape' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_18",
    "word": "cuisine",
    "phonetic": "/kwɪˈziːn/",
    "definition": "English vocabulary word: cuisine",
    "definitionVn": "ẩm thực",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'cuisine' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_19",
    "word": "local",
    "phonetic": "/ˈloʊkəl/",
    "definition": "English vocabulary word: local",
    "definitionVn": "địa phương",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'local' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_20",
    "word": "language barrier",
    "phonetic": "/ˈlæŋɡwɪdʒ ˈbæriər/",
    "definition": "English vocabulary word: language barrier",
    "definitionVn": "rào cản ngôn ngữ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'language barrier' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_21",
    "word": "tour guide",
    "phonetic": "/tʊr ɡaɪd/",
    "definition": "English vocabulary word: tour guide",
    "definitionVn": "hướng dẫn viên",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'tour guide' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_22",
    "word": "reservation",
    "phonetic": "/ˌrezərˈveɪʃən/",
    "definition": "English vocabulary word: reservation",
    "definitionVn": "đặt chỗ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'reservation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_23",
    "word": "cancel",
    "phonetic": "/ˈkænsəl/",
    "definition": "English vocabulary word: cancel",
    "definitionVn": "hủy",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'cancel' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_24",
    "word": "delay",
    "phonetic": "/dɪˈleɪ/",
    "definition": "English vocabulary word: delay",
    "definitionVn": "trì hoãn",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'delay' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_25",
    "word": "immigration",
    "phonetic": "/ˌɪmɪˈɡreɪʃən/",
    "definition": "English vocabulary word: immigration",
    "definitionVn": "nhập cư",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'immigration' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_26",
    "word": "customs",
    "phonetic": "/ˈkʌstəmz/",
    "definition": "English vocabulary word: customs",
    "definitionVn": "hải quan",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'customs' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_27",
    "word": "departure",
    "phonetic": "/dɪˈpɑːrtʃər/",
    "definition": "English vocabulary word: departure",
    "definitionVn": "khởi hành",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'departure' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_28",
    "word": "arrival",
    "phonetic": "/əˈraɪvəl/",
    "definition": "English vocabulary word: arrival",
    "definitionVn": "đến nơi",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'arrival' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_29",
    "word": "currency",
    "phonetic": "/ˈkɜːrənsi/",
    "definition": "English vocabulary word: currency",
    "definitionVn": "tiền tệ",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'currency' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t17_30",
    "word": "exchange rate",
    "phonetic": "/ɪksˈtʃeɪndʒ reɪt/",
    "definition": "English vocabulary word: exchange rate",
    "definitionVn": "tỷ giá hối đoái",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t17",
    "examples": [
      "\"How do you use the word 'exchange rate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_1",
    "word": "social media",
    "phonetic": "/ˈsoʊʃəl ˈmiːdiə/",
    "definition": "English vocabulary word: social media",
    "definitionVn": "mạng xã hội",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'social media' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_2",
    "word": "platform",
    "phonetic": "/ˈplætfɔːrm/",
    "definition": "English vocabulary word: platform",
    "definitionVn": "nền tảng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'platform' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_3",
    "word": "network",
    "phonetic": "/ˈnetwɜːrk/",
    "definition": "English vocabulary word: network",
    "definitionVn": "mạng lưới",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'network' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_4",
    "word": "influencer",
    "phonetic": "/ˈɪnfluənsər/",
    "definition": "English vocabulary word: influencer",
    "definitionVn": "người có ảnh hưởng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'influencer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_5",
    "word": "content",
    "phonetic": "/ˈkɑːntent/",
    "definition": "English vocabulary word: content",
    "definitionVn": "nội dung",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'content' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_6",
    "word": "post",
    "phonetic": "/poʊst/",
    "definition": "English vocabulary word: post",
    "definitionVn": "bài đăng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'post' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_7",
    "word": "share",
    "phonetic": "/ʃeər/",
    "definition": "English vocabulary word: share",
    "definitionVn": "chia sẻ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'share' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_8",
    "word": "like",
    "phonetic": "/laɪk/",
    "definition": "English vocabulary word: like",
    "definitionVn": "thích",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'like' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_9",
    "word": "comment",
    "phonetic": "/ˈkɑːment/",
    "definition": "English vocabulary word: comment",
    "definitionVn": "bình luận",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'comment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_10",
    "word": "follow",
    "phonetic": "/ˈfɑːloʊ/",
    "definition": "English vocabulary word: follow",
    "definitionVn": "theo dõi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'follow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_11",
    "word": "unfollow",
    "phonetic": "/ʌnˈfɑːloʊ/",
    "definition": "English vocabulary word: unfollow",
    "definitionVn": "bỏ theo dõi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'unfollow' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_12",
    "word": "profile",
    "phonetic": "/ˈproʊfaɪl/",
    "definition": "English vocabulary word: profile",
    "definitionVn": "hồ sơ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'profile' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_13",
    "word": "notification",
    "phonetic": "/ˌnoʊtɪfɪˈkeɪʃən/",
    "definition": "English vocabulary word: notification",
    "definitionVn": "thông báo",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'notification' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_14",
    "word": "privacy",
    "phonetic": "/ˈpraɪvəsi/",
    "definition": "English vocabulary word: privacy",
    "definitionVn": "quyền riêng tư",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'privacy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_15",
    "word": "hashtag",
    "phonetic": "/ˈhæʃtæɡ/",
    "definition": "English vocabulary word: hashtag",
    "definitionVn": "thẻ bắt đầu bằng #",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'hashtag' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_16",
    "word": "viral",
    "phonetic": "/ˈvaɪrəl/",
    "definition": "English vocabulary word: viral",
    "definitionVn": "lan truyền",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'viral' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_17",
    "word": "trend",
    "phonetic": "/trend/",
    "definition": "English vocabulary word: trend",
    "definitionVn": "xu hướng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'trend' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_18",
    "word": "engagement",
    "phonetic": "/ɪnˈɡeɪdʒmənt/",
    "definition": "English vocabulary word: engagement",
    "definitionVn": "tương tác",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'engagement' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_19",
    "word": "algorithm",
    "phonetic": "/ˈælɡərɪðəm/",
    "definition": "English vocabulary word: algorithm",
    "definitionVn": "thuật toán",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'algorithm' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_20",
    "word": "story",
    "phonetic": "/ˈstɔːri/",
    "definition": "English vocabulary word: story",
    "definitionVn": "câu chuyện",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'story' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_21",
    "word": "feed",
    "phonetic": "/fiːd/",
    "definition": "English vocabulary word: feed",
    "definitionVn": "bảng tin",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'feed' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_22",
    "word": "group",
    "phonetic": "/ɡruːp/",
    "definition": "English vocabulary word: group",
    "definitionVn": "nhóm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'group' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_23",
    "word": "message",
    "phonetic": "/ˈmesɪdʒ/",
    "definition": "English vocabulary word: message",
    "definitionVn": "tin nhắn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'message' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_24",
    "word": "live stream",
    "phonetic": "/laɪv striːm/",
    "definition": "English vocabulary word: live stream",
    "definitionVn": "phát trực tiếp",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'live stream' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_25",
    "word": "meme",
    "phonetic": "/miːm/",
    "definition": "English vocabulary word: meme",
    "definitionVn": "meme",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'meme' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_26",
    "word": "emoji",
    "phonetic": "/ɪˈmoʊdʒi/",
    "definition": "English vocabulary word: emoji",
    "definitionVn": "biểu tượng cảm xúc",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'emoji' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_27",
    "word": "avatar",
    "phonetic": "/ˈævətɑːr/",
    "definition": "English vocabulary word: avatar",
    "definitionVn": "hình đại diện",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'avatar' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_28",
    "word": "username",
    "phonetic": "/ˈjuːzərneɪm/",
    "definition": "English vocabulary word: username",
    "definitionVn": "tên đăng nhập",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'username' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_29",
    "word": "verification",
    "phonetic": "/ˌverɪfɪˈkeɪʃən/",
    "definition": "English vocabulary word: verification",
    "definitionVn": "xác minh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'verification' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t18_30",
    "word": "online community",
    "phonetic": "/ˌɑːnlaɪn kəˈmjuːnəti/",
    "definition": "English vocabulary word: online community",
    "definitionVn": "cộng đồng trực tuyến",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t18",
    "examples": [
      "\"How do you use the word 'online community' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_1",
    "word": "communication",
    "phonetic": "/kəˌmjuːnɪˈkeɪʃən/",
    "definition": "English vocabulary word: communication",
    "definitionVn": "giao tiếp",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'communication' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_2",
    "word": "language",
    "phonetic": "/ˈlæŋɡwɪdʒ/",
    "definition": "English vocabulary word: language",
    "definitionVn": "ngôn ngữ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'language' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_3",
    "word": "conversation",
    "phonetic": "/ˌkɑːnvərˈseɪʃən/",
    "definition": "English vocabulary word: conversation",
    "definitionVn": "cuộc trò chuyện",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'conversation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_4",
    "word": "dialogue",
    "phonetic": "/ˈdaɪəlɔːɡ/",
    "definition": "English vocabulary word: dialogue",
    "definitionVn": "đối thoại",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'dialogue' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_5",
    "word": "discussion",
    "phonetic": "/dɪˈskʌʃən/",
    "definition": "English vocabulary word: discussion",
    "definitionVn": "thảo luận",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'discussion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_6",
    "word": "argument",
    "phonetic": "/ˈɑːrɡjumənt/",
    "definition": "English vocabulary word: argument",
    "definitionVn": "tranh luận",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'argument' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_7",
    "word": "feedback",
    "phonetic": "/ˈfiːdbæk/",
    "definition": "English vocabulary word: feedback",
    "definitionVn": "phản hồi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'feedback' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_8",
    "word": "negotiation",
    "phonetic": "/nɪˌɡoʊʃiˈeɪʃən/",
    "definition": "English vocabulary word: negotiation",
    "definitionVn": "đàm phán",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'negotiation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_9",
    "word": "presentation",
    "phonetic": "/ˌpriːzenˈteɪʃən/",
    "definition": "English vocabulary word: presentation",
    "definitionVn": "thuyết trình",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'presentation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_10",
    "word": "message",
    "phonetic": "/ˈmesɪdʒ/",
    "definition": "English vocabulary word: message",
    "definitionVn": "tin nhắn",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'message' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_11",
    "word": "greeting",
    "phonetic": "/ˈɡriːtɪŋ/",
    "definition": "English vocabulary word: greeting",
    "definitionVn": "lời chào",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'greeting' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_12",
    "word": "introduction",
    "phonetic": "/ˌɪntrəˈdʌkʃən/",
    "definition": "English vocabulary word: introduction",
    "definitionVn": "giới thiệu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'introduction' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_13",
    "word": "conclusion",
    "phonetic": "/kənˈkluːʒən/",
    "definition": "English vocabulary word: conclusion",
    "definitionVn": "kết luận",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'conclusion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_14",
    "word": "question",
    "phonetic": "/ˈkwestʃən/",
    "definition": "English vocabulary word: question",
    "definitionVn": "câu hỏi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'question' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_15",
    "word": "answer",
    "phonetic": "/ˈænsər/",
    "definition": "English vocabulary word: answer",
    "definitionVn": "câu trả lời",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'answer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_16",
    "word": "explain",
    "phonetic": "/ɪkˈspleɪn/",
    "definition": "English vocabulary word: explain",
    "definitionVn": "giải thích",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'explain' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_17",
    "word": "express",
    "phonetic": "/ɪkˈspres/",
    "definition": "English vocabulary word: express",
    "definitionVn": "bày tỏ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'express' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_18",
    "word": "agree",
    "phonetic": "/əˈɡriː/",
    "definition": "English vocabulary word: agree",
    "definitionVn": "đồng ý",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'agree' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_19",
    "word": "disagree",
    "phonetic": "/ˌdɪsəˈɡriː/",
    "definition": "English vocabulary word: disagree",
    "definitionVn": "không đồng ý",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'disagree' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_20",
    "word": "apologize",
    "phonetic": "/əˈpɑːlədʒaɪz/",
    "definition": "English vocabulary word: apologize",
    "definitionVn": "xin lỗi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'apologize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_21",
    "word": "interrupt",
    "phonetic": "/ˌɪntəˈrʌpt/",
    "definition": "English vocabulary word: interrupt",
    "definitionVn": "ngắt lời",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'interrupt' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_22",
    "word": "negotiate",
    "phonetic": "/nɪˈɡoʊʃieɪt/",
    "definition": "English vocabulary word: negotiate",
    "definitionVn": "đàm phán",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'negotiate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_23",
    "word": "persuade",
    "phonetic": "/pərˈsweɪd/",
    "definition": "English vocabulary word: persuade",
    "definitionVn": "thuyết phục",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'persuade' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_24",
    "word": "compromise",
    "phonetic": "/ˈkɑːmprəmaɪz/",
    "definition": "English vocabulary word: compromise",
    "definitionVn": "thỏa hiệp",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'compromise' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_25",
    "word": "clarify",
    "phonetic": "/ˈklærəfaɪ/",
    "definition": "English vocabulary word: clarify",
    "definitionVn": "làm rõ",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'clarify' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_26",
    "word": "summarize",
    "phonetic": "/ˈsʌməraɪz/",
    "definition": "English vocabulary word: summarize",
    "definitionVn": "tóm tắt",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'summarize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_27",
    "word": "paraphrase",
    "phonetic": "/ˈpærəfreɪz/",
    "definition": "English vocabulary word: paraphrase",
    "definitionVn": "diễn giải",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'paraphrase' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_28",
    "word": "tone",
    "phonetic": "/toʊn/",
    "definition": "English vocabulary word: tone",
    "definitionVn": "giọng điệu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'tone' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_29",
    "word": "body language",
    "phonetic": "/ˈbɑːdi ˈlæŋɡwɪdʒ/",
    "definition": "English vocabulary word: body language",
    "definitionVn": "ngôn ngữ cơ thể",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'body language' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_30",
    "word": "gesture",
    "phonetic": "/ˈdʒestʃər/",
    "definition": "English vocabulary word: gesture",
    "definitionVn": "cử chỉ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'gesture' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_31",
    "word": "eye contact",
    "phonetic": "/ˈaɪ kɑːntækt/",
    "definition": "English vocabulary word: eye contact",
    "definitionVn": "giao tiếp bằng mắt",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'eye contact' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_32",
    "word": "verbal",
    "phonetic": "/ˈvɜːrbəl/",
    "definition": "English vocabulary word: verbal",
    "definitionVn": "bằng lời",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'verbal' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_33",
    "word": "non-verbal",
    "phonetic": "/ˌnɑːn ˈvɜːrbəl/",
    "definition": "English vocabulary word: non-verbal",
    "definitionVn": "không lời",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'non-verbal' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_34",
    "word": "written communication",
    "phonetic": "/ˈrɪtn kəˌmjuːnɪˈkeɪʃən/",
    "definition": "English vocabulary word: written communication",
    "definitionVn": "giao tiếp viết",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'written communication' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t19_35",
    "word": "listening",
    "phonetic": "/ˈlɪsənɪŋ/",
    "definition": "English vocabulary word: listening",
    "definitionVn": "lắng nghe",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t19",
    "examples": [
      "\"How do you use the word 'listening' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_1",
    "word": "literature",
    "phonetic": "/ˈlɪtərətʃər/",
    "definition": "English vocabulary word: literature",
    "definitionVn": "văn học",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'literature' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_2",
    "word": "novel",
    "phonetic": "/ˈnɑːvəl/",
    "definition": "English vocabulary word: novel",
    "definitionVn": "tiểu thuyết",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'novel' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_3",
    "word": "poem",
    "phonetic": "/ˈpoʊəm/",
    "definition": "English vocabulary word: poem",
    "definitionVn": "bài thơ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'poem' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_4",
    "word": "poetry",
    "phonetic": "/ˈpoʊətri/",
    "definition": "English vocabulary word: poetry",
    "definitionVn": "thơ ca",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'poetry' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_5",
    "word": "prose",
    "phonetic": "/proʊz/",
    "definition": "English vocabulary word: prose",
    "definitionVn": "văn xuôi",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'prose' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_6",
    "word": "drama",
    "phonetic": "/ˈdrɑːmə/",
    "definition": "English vocabulary word: drama",
    "definitionVn": "kịch",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'drama' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_7",
    "word": "fiction",
    "phonetic": "/ˈfɪkʃən/",
    "definition": "English vocabulary word: fiction",
    "definitionVn": "tiểu thuyết hư cấu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'fiction' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_8",
    "word": "non-fiction",
    "phonetic": "/ˌnɑːn ˈfɪkʃən/",
    "definition": "English vocabulary word: non-fiction",
    "definitionVn": "sách phi hư cấu",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'non-fiction' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_9",
    "word": "author",
    "phonetic": "/ˈɔːθər/",
    "definition": "English vocabulary word: author",
    "definitionVn": "tác giả",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'author' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_10",
    "word": "poet",
    "phonetic": "/ˈpoʊət/",
    "definition": "English vocabulary word: poet",
    "definitionVn": "nhà thơ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'poet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_11",
    "word": "playwright",
    "phonetic": "/ˈpleɪraɪt/",
    "definition": "English vocabulary word: playwright",
    "definitionVn": "nhà viết kịch",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'playwright' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_12",
    "word": "narrator",
    "phonetic": "/ˈnæreɪtər/",
    "definition": "English vocabulary word: narrator",
    "definitionVn": "người kể chuyện",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'narrator' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_13",
    "word": "character",
    "phonetic": "/ˈkærəktər/",
    "definition": "English vocabulary word: character",
    "definitionVn": "nhân vật",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'character' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_14",
    "word": "plot",
    "phonetic": "/plɑːt/",
    "definition": "English vocabulary word: plot",
    "definitionVn": "cốt truyện",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'plot' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_15",
    "word": "theme",
    "phonetic": "/θiːm/",
    "definition": "English vocabulary word: theme",
    "definitionVn": "chủ đề",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'theme' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_16",
    "word": "setting",
    "phonetic": "/ˈsetɪŋ/",
    "definition": "English vocabulary word: setting",
    "definitionVn": "bối cảnh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'setting' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_17",
    "word": "symbol",
    "phonetic": "/ˈsɪmbəl/",
    "definition": "English vocabulary word: symbol",
    "definitionVn": "biểu tượng",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'symbol' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_18",
    "word": "metaphor",
    "phonetic": "/ˈmetəfɔːr/",
    "definition": "English vocabulary word: metaphor",
    "definitionVn": "ẩn dụ",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 7,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'metaphor' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_19",
    "word": "simile",
    "phonetic": "/ˈsɪməli/",
    "definition": "English vocabulary word: simile",
    "definitionVn": "phép so sánh",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'simile' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_20",
    "word": "irony",
    "phonetic": "/ˈaɪrəni/",
    "definition": "English vocabulary word: irony",
    "definitionVn": "mỉa mai",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'irony' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_21",
    "word": "satire",
    "phonetic": "/ˈsætaɪər/",
    "definition": "English vocabulary word: satire",
    "definitionVn": "châm biếm",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'satire' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_22",
    "word": "genre",
    "phonetic": "/ˈʒɑːnrə/",
    "definition": "English vocabulary word: genre",
    "definitionVn": "thể loại",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'genre' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_23",
    "word": "classic",
    "phonetic": "/ˈklæsɪk/",
    "definition": "English vocabulary word: classic",
    "definitionVn": "tác phẩm kinh điển",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'classic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_24",
    "word": "contemporary",
    "phonetic": "/kənˈtempəreri/",
    "definition": "English vocabulary word: contemporary",
    "definitionVn": "đương đại",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'contemporary' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_25",
    "word": "biography",
    "phonetic": "/baɪˈɑːɡrəfi/",
    "definition": "English vocabulary word: biography",
    "definitionVn": "tiểu sử",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'biography' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_26",
    "word": "autobiography",
    "phonetic": "/ˌɔːtəbaɪˈɑːɡrəfi/",
    "definition": "English vocabulary word: autobiography",
    "definitionVn": "tự truyện",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 5,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'autobiography' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_27",
    "word": "essay",
    "phonetic": "/ˈeseɪ/",
    "definition": "English vocabulary word: essay",
    "definitionVn": "bài luận",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'essay' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_28",
    "word": "editorial",
    "phonetic": "/ˌedɪˈtɔːriəl/",
    "definition": "English vocabulary word: editorial",
    "definitionVn": "xã luận",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'editorial' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_29",
    "word": "folklore",
    "phonetic": "/ˈfoʊklɔːr/",
    "definition": "English vocabulary word: folklore",
    "definitionVn": "văn học dân gian",
    "pos": "noun",
    "difficulty": 2,
    "frequency": 6,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'folklore' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t20_30",
    "word": "mythology",
    "phonetic": "/mɪˈθɑːlədʒi/",
    "definition": "English vocabulary word: mythology",
    "definitionVn": "thần thoại",
    "pos": "adjective",
    "difficulty": 2,
    "frequency": 8,
    "themeId": "t20",
    "examples": [
      "\"How do you use the word 'mythology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_1",
    "word": "academic",
    "phonetic": "/ˌækəˈdemɪk/",
    "definition": "English vocabulary word: academic",
    "definitionVn": "học thuật",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'academic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_2",
    "word": "analyze",
    "phonetic": "/ˈænəlaɪz/",
    "definition": "English vocabulary word: analyze",
    "definitionVn": "phân tích",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'analyze' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_3",
    "word": "synthesize",
    "phonetic": "/ˈsɪnθəsaɪz/",
    "definition": "English vocabulary word: synthesize",
    "definitionVn": "tổng hợp",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'synthesize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_4",
    "word": "evaluate",
    "phonetic": "/ɪˈvæljueɪt/",
    "definition": "English vocabulary word: evaluate",
    "definitionVn": "đánh giá",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'evaluate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_5",
    "word": "criticize",
    "phonetic": "/ˈkrɪtɪsaɪz/",
    "definition": "English vocabulary word: criticize",
    "definitionVn": "phê phán",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'criticize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_6",
    "word": "hypothesize",
    "phonetic": "/haɪˈpɑːθəsaɪz/",
    "definition": "English vocabulary word: hypothesize",
    "definitionVn": "giả thuyết",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'hypothesize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_7",
    "word": "conceptualize",
    "phonetic": "/kənˈseptʃuəlaɪz/",
    "definition": "English vocabulary word: conceptualize",
    "definitionVn": "khái niệm hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'conceptualize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_8",
    "word": "contextualize",
    "phonetic": "/kənˈtekstʃuəlaɪz/",
    "definition": "English vocabulary word: contextualize",
    "definitionVn": "bối cảnh hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'contextualize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_9",
    "word": "correlate",
    "phonetic": "/ˈkɔːrəleɪt/",
    "definition": "English vocabulary word: correlate",
    "definitionVn": "tương quan",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'correlate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_10",
    "word": "interpret",
    "phonetic": "/ɪnˈtɜːrprət/",
    "definition": "English vocabulary word: interpret",
    "definitionVn": "giải thích",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'interpret' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_11",
    "word": "outline",
    "phonetic": "/ˈaʊtlaɪn/",
    "definition": "English vocabulary word: outline",
    "definitionVn": "phác thảo",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'outline' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_12",
    "word": "summarize",
    "phonetic": "/ˈsʌməraɪz/",
    "definition": "English vocabulary word: summarize",
    "definitionVn": "tóm tắt",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'summarize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_13",
    "word": "demonstrate",
    "phonetic": "/ˈdemənstreɪt/",
    "definition": "English vocabulary word: demonstrate",
    "definitionVn": "chứng minh",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'demonstrate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_14",
    "word": "conclude",
    "phonetic": "/kənˈkluːd/",
    "definition": "English vocabulary word: conclude",
    "definitionVn": "kết luận",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'conclude' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_15",
    "word": "investigate",
    "phonetic": "/ɪnˈvestɪɡeɪt/",
    "definition": "English vocabulary word: investigate",
    "definitionVn": "điều tra",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'investigate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_16",
    "word": "derive",
    "phonetic": "/dɪˈraɪv/",
    "definition": "English vocabulary word: derive",
    "definitionVn": "suy ra",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'derive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_17",
    "word": "infer",
    "phonetic": "/ɪnˈfɜːr/",
    "definition": "English vocabulary word: infer",
    "definitionVn": "suy luận",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'infer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_18",
    "word": "predict",
    "phonetic": "/prɪˈdɪkt/",
    "definition": "English vocabulary word: predict",
    "definitionVn": "dự đoán",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'predict' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_19",
    "word": "validate",
    "phonetic": "/ˈvælɪdeɪt/",
    "definition": "English vocabulary word: validate",
    "definitionVn": "xác thực",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'validate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_20",
    "word": "propose",
    "phonetic": "/prəˈpoʊz/",
    "definition": "English vocabulary word: propose",
    "definitionVn": "đề xuất",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'propose' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_21",
    "word": "assume",
    "phonetic": "/əˈsuːm/",
    "definition": "English vocabulary word: assume",
    "definitionVn": "giả định",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'assume' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_22",
    "word": "acknowledge",
    "phonetic": "/əkˈnɑːlɪdʒ/",
    "definition": "English vocabulary word: acknowledge",
    "definitionVn": "thừa nhận",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'acknowledge' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_23",
    "word": "challenge",
    "phonetic": "/ˈtʃælɪndʒ/",
    "definition": "English vocabulary word: challenge",
    "definitionVn": "thách thức",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'challenge' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_24",
    "word": "emphasize",
    "phonetic": "/ˈemfəsaɪz/",
    "definition": "English vocabulary word: emphasize",
    "definitionVn": "nhấn mạnh",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'emphasize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_25",
    "word": "illustrate",
    "phonetic": "/ˈɪləstreɪt/",
    "definition": "English vocabulary word: illustrate",
    "definitionVn": "minh họa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'illustrate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_26",
    "word": "reference",
    "phonetic": "/ˈrefərəns/",
    "definition": "English vocabulary word: reference",
    "definitionVn": "tham khảo",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'reference' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_27",
    "word": "contribute",
    "phonetic": "/kənˈtrɪbjuːt/",
    "definition": "English vocabulary word: contribute",
    "definitionVn": "đóng góp",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'contribute' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_28",
    "word": "establish",
    "phonetic": "/ɪˈstæblɪʃ/",
    "definition": "English vocabulary word: establish",
    "definitionVn": "thiết lập",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'establish' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_29",
    "word": "identify",
    "phonetic": "/aɪˈdentɪfaɪ/",
    "definition": "English vocabulary word: identify",
    "definitionVn": "xác định",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'identify' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t21_30",
    "word": "indicate",
    "phonetic": "/ˈɪndɪkeɪt/",
    "definition": "English vocabulary word: indicate",
    "definitionVn": "chỉ ra",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t21",
    "examples": [
      "\"How do you use the word 'indicate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_1",
    "word": "strategic",
    "phonetic": "/strəˈtiːdʒɪk/",
    "definition": "English vocabulary word: strategic",
    "definitionVn": "chiến lược",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'strategic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_2",
    "word": "sustainable",
    "phonetic": "/səˈsteɪnəbl/",
    "definition": "English vocabulary word: sustainable",
    "definitionVn": "bền vững",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'sustainable' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_3",
    "word": "innovative",
    "phonetic": "/ˈɪnəveɪtɪv/",
    "definition": "English vocabulary word: innovative",
    "definitionVn": "đổi mới",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'innovative' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_4",
    "word": "competitive",
    "phonetic": "/kəmˈpetətɪv/",
    "definition": "English vocabulary word: competitive",
    "definitionVn": "cạnh tranh",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'competitive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_5",
    "word": "distinctive",
    "phonetic": "/dɪˈstɪŋktɪv/",
    "definition": "English vocabulary word: distinctive",
    "definitionVn": "khác biệt",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'distinctive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_6",
    "word": "comprehensive",
    "phonetic": "/ˌkɑːmprɪˈhensɪv/",
    "definition": "English vocabulary word: comprehensive",
    "definitionVn": "toàn diện",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'comprehensive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_7",
    "word": "integrity",
    "phonetic": "/ɪnˈteɡrəti/",
    "definition": "English vocabulary word: integrity",
    "definitionVn": "chính trực",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'integrity' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_8",
    "word": "accountability",
    "phonetic": "/əˌkaʊntəˈbɪləti/",
    "definition": "English vocabulary word: accountability",
    "definitionVn": "trách nhiệm giải trình",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'accountability' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_9",
    "word": "transparency",
    "phonetic": "/trænsˈpærənsi/",
    "definition": "English vocabulary word: transparency",
    "definitionVn": "minh bạch",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'transparency' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_10",
    "word": "adaptability",
    "phonetic": "/əˌdæptəˈbɪləti/",
    "definition": "English vocabulary word: adaptability",
    "definitionVn": "khả năng thích ứng",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'adaptability' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_11",
    "word": "resilience",
    "phonetic": "/rɪˈzɪliəns/",
    "definition": "English vocabulary word: resilience",
    "definitionVn": "khả năng phục hồi",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'resilience' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_12",
    "word": "entrepreneurship",
    "phonetic": "/ˌɑːntrəprəˈnɜːrʃɪp/",
    "definition": "English vocabulary word: entrepreneurship",
    "definitionVn": "tinh thần khởi nghiệp",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'entrepreneurship' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_13",
    "word": "globalization",
    "phonetic": "/ˌɡloʊbəlaɪˈzeɪʃən/",
    "definition": "English vocabulary word: globalization",
    "definitionVn": "toàn cầu hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'globalization' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_14",
    "word": "synergy",
    "phonetic": "/ˈsɪnərdʒi/",
    "definition": "English vocabulary word: synergy",
    "definitionVn": "hiệp lực",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'synergy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_15",
    "word": "mission",
    "phonetic": "/ˈmɪʃən/",
    "definition": "English vocabulary word: mission",
    "definitionVn": "sứ mệnh",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'mission' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_16",
    "word": "vision",
    "phonetic": "/ˈvɪʒən/",
    "definition": "English vocabulary word: vision",
    "definitionVn": "tầm nhìn",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'vision' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_17",
    "word": "target",
    "phonetic": "/ˈtɑːrɡɪt/",
    "definition": "English vocabulary word: target",
    "definitionVn": "mục tiêu",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'target' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_18",
    "word": "implement",
    "phonetic": "/ˈɪmplɪment/",
    "definition": "English vocabulary word: implement",
    "definitionVn": "thực hiện",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'implement' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_19",
    "word": "execute",
    "phonetic": "/ˈeksɪkjuːt/",
    "definition": "English vocabulary word: execute",
    "definitionVn": "thực thi",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'execute' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_20",
    "word": "evaluate",
    "phonetic": "/ɪˈvæljueɪt/",
    "definition": "English vocabulary word: evaluate",
    "definitionVn": "đánh giá",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'evaluate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_21",
    "word": "optimize",
    "phonetic": "/ˈɑːptɪmaɪz/",
    "definition": "English vocabulary word: optimize",
    "definitionVn": "tối ưu hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'optimize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_22",
    "word": "leverage",
    "phonetic": "/ˈlevərɪdʒ/",
    "definition": "English vocabulary word: leverage",
    "definitionVn": "tận dụng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'leverage' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_23",
    "word": "allocate",
    "phonetic": "/ˈæləkeɪt/",
    "definition": "English vocabulary word: allocate",
    "definitionVn": "phân bổ",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'allocate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_24",
    "word": "negotiate",
    "phonetic": "/nɪˈɡoʊʃieɪt/",
    "definition": "English vocabulary word: negotiate",
    "definitionVn": "đàm phán",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'negotiate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_25",
    "word": "collaborate",
    "phonetic": "/kəˈlæbəreɪt/",
    "definition": "English vocabulary word: collaborate",
    "definitionVn": "hợp tác",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'collaborate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_26",
    "word": "delegate",
    "phonetic": "/ˈdelɪɡeɪt/",
    "definition": "English vocabulary word: delegate",
    "definitionVn": "ủy quyền",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'delegate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_27",
    "word": "prioritize",
    "phonetic": "/praɪˈɔːrətaɪz/",
    "definition": "English vocabulary word: prioritize",
    "definitionVn": "ưu tiên",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'prioritize' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_28",
    "word": "pioneer",
    "phonetic": "/ˌpaɪəˈnɪr/",
    "definition": "English vocabulary word: pioneer",
    "definitionVn": "tiên phong",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'pioneer' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_29",
    "word": "automate",
    "phonetic": "/ˈɔːtəmeɪt/",
    "definition": "English vocabulary word: automate",
    "definitionVn": "tự động hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'automate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t22_30",
    "word": "scale",
    "phonetic": "/skeɪl/",
    "definition": "English vocabulary word: scale",
    "definitionVn": "mở rộng quy mô",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t22",
    "examples": [
      "\"How do you use the word 'scale' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_1",
    "word": "artificial intelligence",
    "phonetic": "/ˌɑːrtɪfɪʃəl ɪnˈtelɪdʒəns/",
    "definition": "English vocabulary word: artificial intelligence",
    "definitionVn": "trí tuệ nhân tạo",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'artificial intelligence' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_2",
    "word": "machine learning",
    "phonetic": "/məˈʃiːn ˈlɜːrnɪŋ/",
    "definition": "English vocabulary word: machine learning",
    "definitionVn": "học máy",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'machine learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_3",
    "word": "deep learning",
    "phonetic": "/diːp ˈlɜːrnɪŋ/",
    "definition": "English vocabulary word: deep learning",
    "definitionVn": "học sâu",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'deep learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_4",
    "word": "neural network",
    "phonetic": "/ˈnʊrəl ˈnetwɜːrk/",
    "definition": "English vocabulary word: neural network",
    "definitionVn": "mạng nơ-ron",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'neural network' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_5",
    "word": "natural language processing",
    "phonetic": "/ˈnætʃrəl ˈlæŋɡwɪdʒ ˈprɑːsesɪŋ/",
    "definition": "English vocabulary word: natural language processing",
    "definitionVn": "xử lý ngôn ngữ tự nhiên",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'natural language processing' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_6",
    "word": "computer vision",
    "phonetic": "/kəmˈpjuːtər ˈvɪʒən/",
    "definition": "English vocabulary word: computer vision",
    "definitionVn": "thị giác máy tính",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'computer vision' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_7",
    "word": "robotics",
    "phonetic": "/roʊˈbɑːtɪks/",
    "definition": "English vocabulary word: robotics",
    "definitionVn": "robot học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'robotics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_8",
    "word": "automation",
    "phonetic": "/ˌɔːtəˈmeɪʃən/",
    "definition": "English vocabulary word: automation",
    "definitionVn": "tự động hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'automation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_9",
    "word": "algorithm",
    "phonetic": "/ˈælɡərɪðəm/",
    "definition": "English vocabulary word: algorithm",
    "definitionVn": "thuật toán",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'algorithm' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_10",
    "word": "optimization",
    "phonetic": "/ˌɑːptɪmɪˈzeɪʃən/",
    "definition": "English vocabulary word: optimization",
    "definitionVn": "tối ưu hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'optimization' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_11",
    "word": "simulation",
    "phonetic": "/ˌsɪmjuˈleɪʃən/",
    "definition": "English vocabulary word: simulation",
    "definitionVn": "mô phỏng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'simulation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_12",
    "word": "virtualization",
    "phonetic": "/ˌvɜːrtʃuəlaɪˈzeɪʃən/",
    "definition": "English vocabulary word: virtualization",
    "definitionVn": "ảo hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'virtualization' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_13",
    "word": "encryption",
    "phonetic": "/ɪnˈkrɪpʃən/",
    "definition": "English vocabulary word: encryption",
    "definitionVn": "mã hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'encryption' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_14",
    "word": "authentication",
    "phonetic": "/ɔːˌθentɪˈkeɪʃən/",
    "definition": "English vocabulary word: authentication",
    "definitionVn": "xác thực",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'authentication' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_15",
    "word": "authorization",
    "phonetic": "/ˌɔːθərəˈzeɪʃən/",
    "definition": "English vocabulary word: authorization",
    "definitionVn": "phân quyền",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'authorization' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_16",
    "word": "cybersecurity",
    "phonetic": "/ˌsaɪbərsɪˈkjʊrəti/",
    "definition": "English vocabulary word: cybersecurity",
    "definitionVn": "an ninh mạng",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'cybersecurity' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_17",
    "word": "blockchain",
    "phonetic": "/ˈblɑːktʃeɪn/",
    "definition": "English vocabulary word: blockchain",
    "definitionVn": "chuỗi khối",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'blockchain' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_18",
    "word": "cryptocurrency",
    "phonetic": "/ˈkrɪptoʊkɜːrənsi/",
    "definition": "English vocabulary word: cryptocurrency",
    "definitionVn": "tiền mã hóa",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'cryptocurrency' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_19",
    "word": "big data",
    "phonetic": "/bɪɡ ˈdeɪtə/",
    "definition": "English vocabulary word: big data",
    "definitionVn": "dữ liệu lớn",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'big data' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_20",
    "word": "analytics",
    "phonetic": "/ˌænəˈlɪtɪks/",
    "definition": "English vocabulary word: analytics",
    "definitionVn": "phân tích dữ liệu",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'analytics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_21",
    "word": "predictive",
    "phonetic": "/prɪˈdɪktɪv/",
    "definition": "English vocabulary word: predictive",
    "definitionVn": "dự đoán",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'predictive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_22",
    "word": "cognitive",
    "phonetic": "/ˈkɑːɡnətɪv/",
    "definition": "English vocabulary word: cognitive",
    "definitionVn": "nhận thức",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'cognitive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_23",
    "word": "quantum computing",
    "phonetic": "/ˈkwɑːntəm kəmˈpjuːtɪŋ/",
    "definition": "English vocabulary word: quantum computing",
    "definitionVn": "điện toán lượng tử",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'quantum computing' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_24",
    "word": "internet of things",
    "phonetic": "/ˈɪntərnet əv θɪŋz/",
    "definition": "English vocabulary word: internet of things",
    "definitionVn": "internet vạn vật",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'internet of things' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_25",
    "word": "edge computing",
    "phonetic": "/edʒ kəmˈpjuːtɪŋ/",
    "definition": "English vocabulary word: edge computing",
    "definitionVn": "điện toán biên",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'edge computing' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_26",
    "word": "cloud native",
    "phonetic": "/klaʊd ˈneɪtɪv/",
    "definition": "English vocabulary word: cloud native",
    "definitionVn": "đám mây bản địa",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'cloud native' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_27",
    "word": "microservices",
    "phonetic": "/ˈmaɪkroʊsɜːrvɪsɪz/",
    "definition": "English vocabulary word: microservices",
    "definitionVn": "dịch vụ vi mô",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'microservices' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_28",
    "word": "containerization",
    "phonetic": "/kənˌteɪnərəˈzeɪʃən/",
    "definition": "English vocabulary word: containerization",
    "definitionVn": "đóng gói container",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'containerization' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_29",
    "word": "orchestration",
    "phonetic": "/ˌɔːrkɪˈstreɪʃən/",
    "definition": "English vocabulary word: orchestration",
    "definitionVn": "điều phối",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'orchestration' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t23_30",
    "word": "interoperability",
    "phonetic": "/ˌɪntərˌɑːpərəˈbɪləti/",
    "definition": "English vocabulary word: interoperability",
    "definitionVn": "khả năng tương tác",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t23",
    "examples": [
      "\"How do you use the word 'interoperability' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_1",
    "word": "biodiversity",
    "phonetic": "/ˌbaɪoʊdaɪˈvɜːrsəti/",
    "definition": "English vocabulary word: biodiversity",
    "definitionVn": "đa dạng sinh học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'biodiversity' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_2",
    "word": "ecosystem",
    "phonetic": "/ˈiːkoʊsɪstəm/",
    "definition": "English vocabulary word: ecosystem",
    "definitionVn": "hệ sinh thái",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'ecosystem' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_3",
    "word": "conservation",
    "phonetic": "/ˌkɑːnsərˈveɪʃən/",
    "definition": "English vocabulary word: conservation",
    "definitionVn": "bảo tồn",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'conservation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_4",
    "word": "sustainability",
    "phonetic": "/səˌsteɪnəˈbɪləti/",
    "definition": "English vocabulary word: sustainability",
    "definitionVn": "tính bền vững",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'sustainability' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_5",
    "word": "renewable",
    "phonetic": "/rɪˈnuːəbl/",
    "definition": "English vocabulary word: renewable",
    "definitionVn": "tái tạo",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'renewable' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_6",
    "word": "non-renewable",
    "phonetic": "/ˌnɑːn rɪˈnuːəbl/",
    "definition": "English vocabulary word: non-renewable",
    "definitionVn": "không tái tạo",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'non-renewable' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_7",
    "word": "carbon footprint",
    "phonetic": "/ˈkɑːrbən ˈfʊtprɪnt/",
    "definition": "English vocabulary word: carbon footprint",
    "definitionVn": "dấu chân carbon",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'carbon footprint' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_8",
    "word": "greenhouse effect",
    "phonetic": "/ˈɡriːnhaʊs ɪˈfekt/",
    "definition": "English vocabulary word: greenhouse effect",
    "definitionVn": "hiệu ứng nhà kính",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'greenhouse effect' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_9",
    "word": "ozone depletion",
    "phonetic": "/ˈoʊzoʊn dɪˈpliːʃən/",
    "definition": "English vocabulary word: ozone depletion",
    "definitionVn": "suy giảm tầng ozon",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'ozone depletion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_10",
    "word": "climate change",
    "phonetic": "/ˈklaɪmət tʃeɪndʒ/",
    "definition": "English vocabulary word: climate change",
    "definitionVn": "biến đổi khí hậu",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'climate change' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_11",
    "word": "global warming",
    "phonetic": "/ˈɡloʊbəl ˈwɔːrmɪŋ/",
    "definition": "English vocabulary word: global warming",
    "definitionVn": "nóng lên toàn cầu",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'global warming' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_12",
    "word": "deforestation",
    "phonetic": "/diːˌfɔːrɪˈsteɪʃən/",
    "definition": "English vocabulary word: deforestation",
    "definitionVn": "phá rừng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'deforestation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_13",
    "word": "desertification",
    "phonetic": "/dɪˌzɜːrtɪfɪˈkeɪʃən/",
    "definition": "English vocabulary word: desertification",
    "definitionVn": "sa mạc hóa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'desertification' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_14",
    "word": "pollution",
    "phonetic": "/pəˈluːʃən/",
    "definition": "English vocabulary word: pollution",
    "definitionVn": "ô nhiễm",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'pollution' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_15",
    "word": "contamination",
    "phonetic": "/kənˌtæmɪˈneɪʃən/",
    "definition": "English vocabulary word: contamination",
    "definitionVn": "nhiễm bẩn",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'contamination' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_16",
    "word": "emission",
    "phonetic": "/ɪˈmɪʃən/",
    "definition": "English vocabulary word: emission",
    "definitionVn": "khí thải",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'emission' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_17",
    "word": "eco-friendly",
    "phonetic": "/ˈiːkoʊ ˈfrendli/",
    "definition": "English vocabulary word: eco-friendly",
    "definitionVn": "thân thiện với môi trường",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'eco-friendly' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_18",
    "word": "sustainable development",
    "phonetic": "/səˈsteɪnəbl dɪˈveləpmənt/",
    "definition": "English vocabulary word: sustainable development",
    "definitionVn": "phát triển bền vững",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'sustainable development' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_19",
    "word": "circular economy",
    "phonetic": "/ˈsɜːrkjələr ɪˈkɑːnəmi/",
    "definition": "English vocabulary word: circular economy",
    "definitionVn": "kinh tế tuần hoàn",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'circular economy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_20",
    "word": "zero waste",
    "phonetic": "/ˈzɪroʊ weɪst/",
    "definition": "English vocabulary word: zero waste",
    "definitionVn": "không rác thải",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'zero waste' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_21",
    "word": "carbon neutral",
    "phonetic": "/ˈkɑːrbən ˈnuːtrəl/",
    "definition": "English vocabulary word: carbon neutral",
    "definitionVn": "trung hòa carbon",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'carbon neutral' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_22",
    "word": "environmentalist",
    "phonetic": "/ɪnˌvaɪrənˈmentəlɪst/",
    "definition": "English vocabulary word: environmentalist",
    "definitionVn": "nhà môi trường học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'environmentalist' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_23",
    "word": "activist",
    "phonetic": "/ˈæktɪvɪst/",
    "definition": "English vocabulary word: activist",
    "definitionVn": "nhà hoạt động",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'activist' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_24",
    "word": "ecological footprint",
    "phonetic": "/ˌiːkəˈlɑːdʒɪkl ˈfʊtprɪnt/",
    "definition": "English vocabulary word: ecological footprint",
    "definitionVn": "dấu chân sinh thái",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'ecological footprint' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t24_25",
    "word": "biodiversity loss",
    "phonetic": "/ˌbaɪoʊdaɪˈvɜːrsəti lɔːs/",
    "definition": "English vocabulary word: biodiversity loss",
    "definitionVn": "mất đa dạng sinh học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t24",
    "examples": [
      "\"How do you use the word 'biodiversity loss' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_1",
    "word": "cognitive psychology",
    "phonetic": "/ˈkɑːɡnətɪv saɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: cognitive psychology",
    "definitionVn": "tâm lý học nhận thức",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'cognitive psychology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_2",
    "word": "behavioral psychology",
    "phonetic": "/bɪˈheɪvjərəl saɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: behavioral psychology",
    "definitionVn": "tâm lý học hành vi",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'behavioral psychology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_3",
    "word": "humanistic psychology",
    "phonetic": "/ˌhjuːməˈnɪstɪk saɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: humanistic psychology",
    "definitionVn": "tâm lý học nhân văn",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'humanistic psychology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_4",
    "word": "developmental psychology",
    "phonetic": "/dɪˌveləpˈmentl saɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: developmental psychology",
    "definitionVn": "tâm lý học phát triển",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'developmental psychology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_5",
    "word": "social psychology",
    "phonetic": "/ˈsoʊʃəl saɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: social psychology",
    "definitionVn": "tâm lý học xã hội",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'social psychology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_6",
    "word": "neuropsychology",
    "phonetic": "/ˌnʊroʊsaɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: neuropsychology",
    "definitionVn": "tâm lý học thần kinh",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'neuropsychology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_7",
    "word": "psychopathology",
    "phonetic": "/ˌsaɪkoʊpəˈθɑːlədʒi/",
    "definition": "English vocabulary word: psychopathology",
    "definitionVn": "bệnh lý tâm thần",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'psychopathology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_8",
    "word": "psychotherapy",
    "phonetic": "/ˌsaɪkoʊˈθerəpi/",
    "definition": "English vocabulary word: psychotherapy",
    "definitionVn": "liệu pháp tâm lý",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'psychotherapy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_9",
    "word": "psychoanalysis",
    "phonetic": "/ˌsaɪkoʊəˈnæləsɪs/",
    "definition": "English vocabulary word: psychoanalysis",
    "definitionVn": "phân tâm học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'psychoanalysis' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_10",
    "word": "cognition",
    "phonetic": "/kɑːɡˈnɪʃən/",
    "definition": "English vocabulary word: cognition",
    "definitionVn": "nhận thức",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'cognition' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_11",
    "word": "perception",
    "phonetic": "/pərˈsepʃən/",
    "definition": "English vocabulary word: perception",
    "definitionVn": "tri giác",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'perception' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_12",
    "word": "attention",
    "phonetic": "/əˈtenʃən/",
    "definition": "English vocabulary word: attention",
    "definitionVn": "sự chú ý",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'attention' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_13",
    "word": "memory",
    "phonetic": "/ˈmeməri/",
    "definition": "English vocabulary word: memory",
    "definitionVn": "trí nhớ",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'memory' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_14",
    "word": "learning",
    "phonetic": "/ˈlɜːrnɪŋ/",
    "definition": "English vocabulary word: learning",
    "definitionVn": "học tập",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'learning' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_15",
    "word": "motivation",
    "phonetic": "/ˌmoʊtɪˈveɪʃən/",
    "definition": "English vocabulary word: motivation",
    "definitionVn": "động cơ",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'motivation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_16",
    "word": "emotion",
    "phonetic": "/ɪˈmoʊʃən/",
    "definition": "English vocabulary word: emotion",
    "definitionVn": "cảm xúc",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'emotion' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_17",
    "word": "personality",
    "phonetic": "/ˌpɜːrsəˈnæləti/",
    "definition": "English vocabulary word: personality",
    "definitionVn": "nhân cách",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'personality' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_18",
    "word": "consciousness",
    "phonetic": "/ˈkɑːnʃəsnəs/",
    "definition": "English vocabulary word: consciousness",
    "definitionVn": "ý thức",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'consciousness' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_19",
    "word": "unconscious",
    "phonetic": "/ʌnˈkɑːnʃəs/",
    "definition": "English vocabulary word: unconscious",
    "definitionVn": "vô thức",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'unconscious' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_20",
    "word": "cognitive dissonance",
    "phonetic": "/ˈkɑːɡnətɪv ˈdɪsənəns/",
    "definition": "English vocabulary word: cognitive dissonance",
    "definitionVn": "bất hòa nhận thức",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'cognitive dissonance' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_21",
    "word": "confirmation bias",
    "phonetic": "/ˌkɑːnfərˈmeɪʃən ˈbaɪəs/",
    "definition": "English vocabulary word: confirmation bias",
    "definitionVn": "thiên kiến xác nhận",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'confirmation bias' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_22",
    "word": "conformity",
    "phonetic": "/kənˈfɔːrməti/",
    "definition": "English vocabulary word: conformity",
    "definitionVn": "tuân thủ xã hội",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'conformity' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_23",
    "word": "obedience",
    "phonetic": "/oʊˈbiːdiəns/",
    "definition": "English vocabulary word: obedience",
    "definitionVn": "sự vâng lời",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'obedience' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_24",
    "word": "groupthink",
    "phonetic": "/ˈɡruːpθɪŋk/",
    "definition": "English vocabulary word: groupthink",
    "definitionVn": "tư duy tập thể",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'groupthink' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t25_25",
    "word": "cognitive behavioral therapy",
    "phonetic": "/ˈkɑːɡnətɪv bɪˈheɪvjərəl ˈθerəpi/",
    "definition": "English vocabulary word: cognitive behavioral therapy",
    "definitionVn": "liệu pháp nhận thức hành vi",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t25",
    "examples": [
      "\"How do you use the word 'cognitive behavioral therapy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_1",
    "word": "cardiology",
    "phonetic": "/ˌkɑːrdiˈɑːlədʒi/",
    "definition": "English vocabulary word: cardiology",
    "definitionVn": "tim mạch học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'cardiology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_2",
    "word": "neurology",
    "phonetic": "/nʊˈrɑːlədʒi/",
    "definition": "English vocabulary word: neurology",
    "definitionVn": "thần kinh học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'neurology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_3",
    "word": "oncology",
    "phonetic": "/ɑːŋˈkɑːlədʒi/",
    "definition": "English vocabulary word: oncology",
    "definitionVn": "ung thư học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'oncology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_4",
    "word": "pediatrics",
    "phonetic": "/ˌpiːdiˈætrɪks/",
    "definition": "English vocabulary word: pediatrics",
    "definitionVn": "nhi khoa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'pediatrics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_5",
    "word": "gynecology",
    "phonetic": "/ˌɡaɪnɪˈkɑːlədʒi/",
    "definition": "English vocabulary word: gynecology",
    "definitionVn": "phụ khoa",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'gynecology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_6",
    "word": "orthopedics",
    "phonetic": "/ˌɔːrθəˈpiːdɪks/",
    "definition": "English vocabulary word: orthopedics",
    "definitionVn": "chỉnh hình",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'orthopedics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_7",
    "word": "dermatology",
    "phonetic": "/ˌdɜːrməˈtɑːlədʒi/",
    "definition": "English vocabulary word: dermatology",
    "definitionVn": "da liễu",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'dermatology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_8",
    "word": "ophthalmology",
    "phonetic": "/ˌɑːfθəlˈmɑːlədʒi/",
    "definition": "English vocabulary word: ophthalmology",
    "definitionVn": "nhãn khoa",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'ophthalmology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_9",
    "word": "psychiatry",
    "phonetic": "/saɪˈkaɪətri/",
    "definition": "English vocabulary word: psychiatry",
    "definitionVn": "tâm thần học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'psychiatry' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_10",
    "word": "radiology",
    "phonetic": "/ˌreɪdiˈɑːlədʒi/",
    "definition": "English vocabulary word: radiology",
    "definitionVn": "X-quang",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'radiology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_11",
    "word": "pharmacology",
    "phonetic": "/ˌfɑːrməˈkɑːlədʒi/",
    "definition": "English vocabulary word: pharmacology",
    "definitionVn": "dược lý học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'pharmacology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_12",
    "word": "genetics",
    "phonetic": "/dʒəˈnetɪks/",
    "definition": "English vocabulary word: genetics",
    "definitionVn": "di truyền học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'genetics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_13",
    "word": "immunology",
    "phonetic": "/ˌɪmjuˈnɑːlədʒi/",
    "definition": "English vocabulary word: immunology",
    "definitionVn": "miễn dịch học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'immunology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_14",
    "word": "pathology",
    "phonetic": "/pəˈθɑːlədʒi/",
    "definition": "English vocabulary word: pathology",
    "definitionVn": "bệnh lý học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'pathology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_15",
    "word": "microbiology",
    "phonetic": "/ˌmaɪkroʊbaɪˈɑːlədʒi/",
    "definition": "English vocabulary word: microbiology",
    "definitionVn": "vi sinh vật học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'microbiology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_16",
    "word": "epidemiology",
    "phonetic": "/ˌepɪˌdiːmiˈɑːlədʒi/",
    "definition": "English vocabulary word: epidemiology",
    "definitionVn": "dịch tễ học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'epidemiology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_17",
    "word": "diagnosis",
    "phonetic": "/ˌdaɪəɡˈnoʊsɪs/",
    "definition": "English vocabulary word: diagnosis",
    "definitionVn": "chẩn đoán",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'diagnosis' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_18",
    "word": "prognosis",
    "phonetic": "/prɑːɡˈnoʊsɪs/",
    "definition": "English vocabulary word: prognosis",
    "definitionVn": "tiên lượng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'prognosis' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_19",
    "word": "treatment",
    "phonetic": "/ˈtriːtmənt/",
    "definition": "English vocabulary word: treatment",
    "definitionVn": "điều trị",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'treatment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_20",
    "word": "therapy",
    "phonetic": "/ˈθerəpi/",
    "definition": "English vocabulary word: therapy",
    "definitionVn": "liệu pháp",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'therapy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_21",
    "word": "medication",
    "phonetic": "/ˌmedɪˈkeɪʃən/",
    "definition": "English vocabulary word: medication",
    "definitionVn": "thuốc điều trị",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'medication' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_22",
    "word": "surgery",
    "phonetic": "/ˈsɜːrdʒəri/",
    "definition": "English vocabulary word: surgery",
    "definitionVn": "phẫu thuật",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'surgery' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_23",
    "word": "transplantation",
    "phonetic": "/ˌtrænsplænˈteɪʃən/",
    "definition": "English vocabulary word: transplantation",
    "definitionVn": "cấy ghép",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'transplantation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_24",
    "word": "vaccine",
    "phonetic": "/vækˈsiːn/",
    "definition": "English vocabulary word: vaccine",
    "definitionVn": "vắc-xin",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'vaccine' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_25",
    "word": "antibiotic",
    "phonetic": "/ˌæntibaɪˈɑːtɪk/",
    "definition": "English vocabulary word: antibiotic",
    "definitionVn": "kháng sinh",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'antibiotic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_26",
    "word": "anesthesia",
    "phonetic": "/ˌænəsˈθiːʒə/",
    "definition": "English vocabulary word: anesthesia",
    "definitionVn": "gây mê",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'anesthesia' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_27",
    "word": "rehabilitation",
    "phonetic": "/ˌriːəˌbɪlɪˈteɪʃən/",
    "definition": "English vocabulary word: rehabilitation",
    "definitionVn": "phục hồi chức năng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'rehabilitation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_28",
    "word": "preventive",
    "phonetic": "/prɪˈventɪv/",
    "definition": "English vocabulary word: preventive",
    "definitionVn": "phòng ngừa",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'preventive' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_29",
    "word": "palliative",
    "phonetic": "/ˈpæliətɪv/",
    "definition": "English vocabulary word: palliative",
    "definitionVn": "giảm nhẹ",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'palliative' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t26_30",
    "word": "chronic",
    "phonetic": "/ˈkrɑːnɪk/",
    "definition": "English vocabulary word: chronic",
    "definitionVn": "mãn tính",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t26",
    "examples": [
      "\"How do you use the word 'chronic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_1",
    "word": "constitution",
    "phonetic": "/ˌkɑːnstɪˈtuːʃən/",
    "definition": "English vocabulary word: constitution",
    "definitionVn": "hiến pháp",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'constitution' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_2",
    "word": "legislation",
    "phonetic": "/ˌledʒɪsˈleɪʃən/",
    "definition": "English vocabulary word: legislation",
    "definitionVn": "pháp luật",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'legislation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_3",
    "word": "jurisdiction",
    "phonetic": "/ˌdʒʊrɪsˈdɪkʃən/",
    "definition": "English vocabulary word: jurisdiction",
    "definitionVn": "thẩm quyền",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'jurisdiction' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_4",
    "word": "precedent",
    "phonetic": "/ˈpresɪdənt/",
    "definition": "English vocabulary word: precedent",
    "definitionVn": "tiền lệ",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'precedent' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_5",
    "word": "amendment",
    "phonetic": "/əˈmendmənt/",
    "definition": "English vocabulary word: amendment",
    "definitionVn": "tu chính án",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'amendment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_6",
    "word": "contract",
    "phonetic": "/ˈkɑːntrækt/",
    "definition": "English vocabulary word: contract",
    "definitionVn": "hợp đồng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'contract' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_7",
    "word": "tort",
    "phonetic": "/tɔːrt/",
    "definition": "English vocabulary word: tort",
    "definitionVn": "bồi thường thiệt hại",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'tort' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_8",
    "word": "property",
    "phonetic": "/ˈprɑːpərti/",
    "definition": "English vocabulary word: property",
    "definitionVn": "tài sản",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'property' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_9",
    "word": "intellectual property",
    "phonetic": "/ˌɪntəˈlektʃuəl ˈprɑːpərti/",
    "definition": "English vocabulary word: intellectual property",
    "definitionVn": "sở hữu trí tuệ",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'intellectual property' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_10",
    "word": "copyright",
    "phonetic": "/ˈkɑːpiraɪt/",
    "definition": "English vocabulary word: copyright",
    "definitionVn": "bản quyền",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'copyright' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_11",
    "word": "trademark",
    "phonetic": "/ˈtreɪdmɑːrk/",
    "definition": "English vocabulary word: trademark",
    "definitionVn": "nhãn hiệu",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'trademark' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_12",
    "word": "patent",
    "phonetic": "/ˈpætənt/",
    "definition": "English vocabulary word: patent",
    "definitionVn": "bằng sáng chế",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'patent' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_13",
    "word": "dispute",
    "phonetic": "/dɪˈspjuːt/",
    "definition": "English vocabulary word: dispute",
    "definitionVn": "tranh chấp",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'dispute' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_14",
    "word": "litigation",
    "phonetic": "/ˌlɪtɪˈɡeɪʃən/",
    "definition": "English vocabulary word: litigation",
    "definitionVn": "kiện tụng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'litigation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_15",
    "word": "arbitration",
    "phonetic": "/ˌɑːrbɪˈtreɪʃən/",
    "definition": "English vocabulary word: arbitration",
    "definitionVn": "trọng tài",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'arbitration' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_16",
    "word": "mediation",
    "phonetic": "/ˌmiːdiˈeɪʃən/",
    "definition": "English vocabulary word: mediation",
    "definitionVn": "hòa giải",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'mediation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_17",
    "word": "defendant",
    "phonetic": "/dɪˈfendənt/",
    "definition": "English vocabulary word: defendant",
    "definitionVn": "bị cáo",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'defendant' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_18",
    "word": "plaintiff",
    "phonetic": "/ˈpleɪntɪf/",
    "definition": "English vocabulary word: plaintiff",
    "definitionVn": "nguyên đơn",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'plaintiff' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_19",
    "word": "evidence",
    "phonetic": "/ˈevɪdəns/",
    "definition": "English vocabulary word: evidence",
    "definitionVn": "bằng chứng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'evidence' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_20",
    "word": "testimony",
    "phonetic": "/ˈtestɪmoʊni/",
    "definition": "English vocabulary word: testimony",
    "definitionVn": "lời khai",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'testimony' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_21",
    "word": "verdict",
    "phonetic": "/ˈvɜːrdɪkt/",
    "definition": "English vocabulary word: verdict",
    "definitionVn": "phán quyết",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'verdict' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_22",
    "word": "appeal",
    "phonetic": "/əˈpiːl/",
    "definition": "English vocabulary word: appeal",
    "definitionVn": "kháng cáo",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'appeal' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_23",
    "word": "due process",
    "phonetic": "/ˈduː ˈprɑːses/",
    "definition": "English vocabulary word: due process",
    "definitionVn": "thủ tục công bằng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'due process' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_24",
    "word": "human rights",
    "phonetic": "/ˈhjuːmən raɪts/",
    "definition": "English vocabulary word: human rights",
    "definitionVn": "nhân quyền",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'human rights' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_25",
    "word": "civil rights",
    "phonetic": "/ˈsɪvəl raɪts/",
    "definition": "English vocabulary word: civil rights",
    "definitionVn": "quyền công dân",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'civil rights' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_26",
    "word": "rule of law",
    "phonetic": "/ruːl əv lɔː/",
    "definition": "English vocabulary word: rule of law",
    "definitionVn": "pháp quyền",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'rule of law' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_27",
    "word": "liability",
    "phonetic": "/ˌlaɪəˈbɪləti/",
    "definition": "English vocabulary word: liability",
    "definitionVn": "trách nhiệm",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'liability' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_28",
    "word": "innocence",
    "phonetic": "/ˈɪnəsəns/",
    "definition": "English vocabulary word: innocence",
    "definitionVn": "vô tội",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'innocence' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_29",
    "word": "guilty",
    "phonetic": "/ˈɡɪlti/",
    "definition": "English vocabulary word: guilty",
    "definitionVn": "có tội",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'guilty' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t27_30",
    "word": "corruption",
    "phonetic": "/kəˈrʌpʃən/",
    "definition": "English vocabulary word: corruption",
    "definitionVn": "tham nhũng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t27",
    "examples": [
      "\"How do you use the word 'corruption' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t28_1",
    "word": "macroeconomics",
    "phonetic": "/ˌmækroʊˌiːkəˈnɑːmɪks/",
    "definition": "English vocabulary word: macroeconomics",
    "definitionVn": "kinh tế vĩ mô",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t28",
    "examples": [
      "\"How do you use the word 'macroeconomics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_1",
    "word": "democracy",
    "phonetic": "/dɪˈmɑːkrəsi/",
    "definition": "English vocabulary word: democracy",
    "definitionVn": "dân chủ",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'democracy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_2",
    "word": "republic",
    "phonetic": "/rɪˈpʌblɪk/",
    "definition": "English vocabulary word: republic",
    "definitionVn": "cộng hòa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'republic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_3",
    "word": "monarchy",
    "phonetic": "/ˈmɑːnərki/",
    "definition": "English vocabulary word: monarchy",
    "definitionVn": "quân chủ",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'monarchy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_4",
    "word": "dictatorship",
    "phonetic": "/ˌdɪkˈteɪtərʃɪp/",
    "definition": "English vocabulary word: dictatorship",
    "definitionVn": "độc tài",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'dictatorship' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_5",
    "word": "parliament",
    "phonetic": "/ˈpɑːrləmənt/",
    "definition": "English vocabulary word: parliament",
    "definitionVn": "nghị viện",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'parliament' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_6",
    "word": "congress",
    "phonetic": "/ˈkɑːŋɡrəs/",
    "definition": "English vocabulary word: congress",
    "definitionVn": "quốc hội",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'congress' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_7",
    "word": "senate",
    "phonetic": "/ˈsenət/",
    "definition": "English vocabulary word: senate",
    "definitionVn": "thượng viện",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'senate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_8",
    "word": "cabinet",
    "phonetic": "/ˈkæbɪnət/",
    "definition": "English vocabulary word: cabinet",
    "definitionVn": "nội các",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'cabinet' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_9",
    "word": "constitution",
    "phonetic": "/ˌkɑːnstɪˈtuːʃən/",
    "definition": "English vocabulary word: constitution",
    "definitionVn": "hiến pháp",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'constitution' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_10",
    "word": "amendment",
    "phonetic": "/əˈmendmənt/",
    "definition": "English vocabulary word: amendment",
    "definitionVn": "tu chính án",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'amendment' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_11",
    "word": "election",
    "phonetic": "/ɪˈlekʃən/",
    "definition": "English vocabulary word: election",
    "definitionVn": "bầu cử",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'election' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_12",
    "word": "campaign",
    "phonetic": "/kæmˈpeɪn/",
    "definition": "English vocabulary word: campaign",
    "definitionVn": "chiến dịch",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'campaign' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_13",
    "word": "candidate",
    "phonetic": "/ˈkændɪdət/",
    "definition": "English vocabulary word: candidate",
    "definitionVn": "ứng cử viên",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'candidate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_14",
    "word": "electorate",
    "phonetic": "/ɪˈlektərət/",
    "definition": "English vocabulary word: electorate",
    "definitionVn": "cử tri",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'electorate' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_15",
    "word": "representation",
    "phonetic": "/ˌreprɪzenˈteɪʃən/",
    "definition": "English vocabulary word: representation",
    "definitionVn": "đại diện",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'representation' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_16",
    "word": "sovereignty",
    "phonetic": "/ˈsɑːvrənti/",
    "definition": "English vocabulary word: sovereignty",
    "definitionVn": "chủ quyền",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'sovereignty' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_17",
    "word": "nationalism",
    "phonetic": "/ˈnæʃənəlɪzəm/",
    "definition": "English vocabulary word: nationalism",
    "definitionVn": "chủ nghĩa dân tộc",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'nationalism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_18",
    "word": "internationalism",
    "phonetic": "/ˌɪntərˈnæʃənəlɪzəm/",
    "definition": "English vocabulary word: internationalism",
    "definitionVn": "chủ nghĩa quốc tế",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'internationalism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_19",
    "word": "human rights",
    "phonetic": "/ˈhjuːmən raɪts/",
    "definition": "English vocabulary word: human rights",
    "definitionVn": "nhân quyền",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'human rights' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_20",
    "word": "civil liberties",
    "phonetic": "/ˈsɪvəl ˈlɪbərtiz/",
    "definition": "English vocabulary word: civil liberties",
    "definitionVn": "quyền tự do dân sự",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'civil liberties' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_21",
    "word": "political ideology",
    "phonetic": "/pəˈlɪtɪkl ˌaɪdiˈɑːlədʒi/",
    "definition": "English vocabulary word: political ideology",
    "definitionVn": "hệ tư tưởng chính trị",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'political ideology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_22",
    "word": "conservative",
    "phonetic": "/kənˈsɜːrvətɪv/",
    "definition": "English vocabulary word: conservative",
    "definitionVn": "bảo thủ",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'conservative' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_23",
    "word": "liberal",
    "phonetic": "/ˈlɪbərəl/",
    "definition": "English vocabulary word: liberal",
    "definitionVn": "tự do",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'liberal' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_24",
    "word": "socialist",
    "phonetic": "/ˈsoʊʃəlɪst/",
    "definition": "English vocabulary word: socialist",
    "definitionVn": "xã hội chủ nghĩa",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'socialist' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_25",
    "word": "communist",
    "phonetic": "/ˈkɑːmjunɪst/",
    "definition": "English vocabulary word: communist",
    "definitionVn": "cộng sản",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'communist' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_26",
    "word": "public policy",
    "phonetic": "/ˈpʌblɪk ˈpɑːləsi/",
    "definition": "English vocabulary word: public policy",
    "definitionVn": "chính sách công",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'public policy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_27",
    "word": "governance",
    "phonetic": "/ˈɡʌvərnəns/",
    "definition": "English vocabulary word: governance",
    "definitionVn": "quản trị",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'governance' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_28",
    "word": "corruption",
    "phonetic": "/kəˈrʌpʃən/",
    "definition": "English vocabulary word: corruption",
    "definitionVn": "tham nhũng",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'corruption' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_29",
    "word": "accountability",
    "phonetic": "/əˌkaʊntəˈbɪləti/",
    "definition": "English vocabulary word: accountability",
    "definitionVn": "trách nhiệm giải trình",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'accountability' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t29_30",
    "word": "transparency",
    "phonetic": "/trænsˈpærənsi/",
    "definition": "English vocabulary word: transparency",
    "definitionVn": "minh bạch",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t29",
    "examples": [
      "\"How do you use the word 'transparency' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_1",
    "word": "philosophy",
    "phonetic": "/fɪˈlɑːsəfi/",
    "definition": "English vocabulary word: philosophy",
    "definitionVn": "triết học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'philosophy' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_2",
    "word": "metaphysics",
    "phonetic": "/ˌmetəˈfɪzɪks/",
    "definition": "English vocabulary word: metaphysics",
    "definitionVn": "siêu hình học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 5,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'metaphysics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_3",
    "word": "epistemology",
    "phonetic": "/ɪˌpɪstəˈmɑːlədʒi/",
    "definition": "English vocabulary word: epistemology",
    "definitionVn": "nhận thức luận",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'epistemology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_4",
    "word": "ethics",
    "phonetic": "/ˈeθɪks/",
    "definition": "English vocabulary word: ethics",
    "definitionVn": "đạo đức học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'ethics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_5",
    "word": "aesthetics",
    "phonetic": "/esˈθetɪks/",
    "definition": "English vocabulary word: aesthetics",
    "definitionVn": "mỹ học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'aesthetics' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_6",
    "word": "logic",
    "phonetic": "/ˈlɑːdʒɪk/",
    "definition": "English vocabulary word: logic",
    "definitionVn": "logic học",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'logic' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_7",
    "word": "ontology",
    "phonetic": "/ɑːnˈtɑːlədʒi/",
    "definition": "English vocabulary word: ontology",
    "definitionVn": "bản thể luận",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'ontology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_8",
    "word": "epistemology",
    "phonetic": "/ɪˌpɪstəˈmɑːlədʒi/",
    "definition": "English vocabulary word: epistemology",
    "definitionVn": "nhận thức luận",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'epistemology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_9",
    "word": "axiology",
    "phonetic": "/ˌæksiˈɑːlədʒi/",
    "definition": "English vocabulary word: axiology",
    "definitionVn": "giá trị học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'axiology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_10",
    "word": "phenomenology",
    "phonetic": "/fəˌnɑːmɪˈnɑːlədʒi/",
    "definition": "English vocabulary word: phenomenology",
    "definitionVn": "hiện tượng học",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'phenomenology' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_11",
    "word": "existentialism",
    "phonetic": "/ˌeɡzɪˈstenʃəlɪzəm/",
    "definition": "English vocabulary word: existentialism",
    "definitionVn": "chủ nghĩa hiện sinh",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'existentialism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_12",
    "word": "nihilism",
    "phonetic": "/ˈnaɪɪlɪzəm/",
    "definition": "English vocabulary word: nihilism",
    "definitionVn": "chủ nghĩa hư vô",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'nihilism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_13",
    "word": "stoicism",
    "phonetic": "/ˈstoʊɪsɪzəm/",
    "definition": "English vocabulary word: stoicism",
    "definitionVn": "chủ nghĩa khắc kỷ",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'stoicism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_14",
    "word": "skepticism",
    "phonetic": "/ˈskeptɪsɪzəm/",
    "definition": "English vocabulary word: skepticism",
    "definitionVn": "chủ nghĩa hoài nghi",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'skepticism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_15",
    "word": "rationalism",
    "phonetic": "/ˈræʃənəlɪzəm/",
    "definition": "English vocabulary word: rationalism",
    "definitionVn": "chủ nghĩa duy lý",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'rationalism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_16",
    "word": "empiricism",
    "phonetic": "/ɪmˈpɪrɪsɪzəm/",
    "definition": "English vocabulary word: empiricism",
    "definitionVn": "chủ nghĩa kinh nghiệm",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'empiricism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_17",
    "word": "idealism",
    "phonetic": "/aɪˈdiːəlɪzəm/",
    "definition": "English vocabulary word: idealism",
    "definitionVn": "chủ nghĩa duy tâm",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'idealism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_18",
    "word": "materialism",
    "phonetic": "/məˈtɪriəlɪzəm/",
    "definition": "English vocabulary word: materialism",
    "definitionVn": "chủ nghĩa duy vật",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'materialism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_19",
    "word": "free will",
    "phonetic": "/friː wɪl/",
    "definition": "English vocabulary word: free will",
    "definitionVn": "ý chí tự do",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'free will' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_20",
    "word": "determinism",
    "phonetic": "/dɪˈtɜːrmɪnɪzəm/",
    "definition": "English vocabulary word: determinism",
    "definitionVn": "thuyết quyết định",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'determinism' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_21",
    "word": "meaning of life",
    "phonetic": "/ˈmiːnɪŋ əv laɪf/",
    "definition": "English vocabulary word: meaning of life",
    "definitionVn": "ý nghĩa cuộc sống",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'meaning of life' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_22",
    "word": "consciousness",
    "phonetic": "/ˈkɑːnʃəsnəs/",
    "definition": "English vocabulary word: consciousness",
    "definitionVn": "ý thức",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'consciousness' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_23",
    "word": "soul",
    "phonetic": "/soʊl/",
    "definition": "English vocabulary word: soul",
    "definitionVn": "linh hồn",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'soul' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_24",
    "word": "virtue",
    "phonetic": "/ˈvɜːrtʃuː/",
    "definition": "English vocabulary word: virtue",
    "definitionVn": "đức hạnh",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'virtue' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_25",
    "word": "justice",
    "phonetic": "/ˈdʒʌstɪs/",
    "definition": "English vocabulary word: justice",
    "definitionVn": "công lý",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'justice' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_26",
    "word": "wisdom",
    "phonetic": "/ˈwɪzdəm/",
    "definition": "English vocabulary word: wisdom",
    "definitionVn": "trí tuệ",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 7,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'wisdom' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_27",
    "word": "truth",
    "phonetic": "/truːθ/",
    "definition": "English vocabulary word: truth",
    "definitionVn": "chân lý",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'truth' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_28",
    "word": "knowledge",
    "phonetic": "/ˈnɑːlɪdʒ/",
    "definition": "English vocabulary word: knowledge",
    "definitionVn": "tri thức",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 8,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'knowledge' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_29",
    "word": "reality",
    "phonetic": "/riˈæləti/",
    "definition": "English vocabulary word: reality",
    "definitionVn": "thực tại",
    "pos": "adjective",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'reality' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "v_t30_30",
    "word": "existence",
    "phonetic": "/ɪɡˈzɪstəns/",
    "definition": "English vocabulary word: existence",
    "definitionVn": "sự tồn tại",
    "pos": "noun",
    "difficulty": 3,
    "frequency": 6,
    "themeId": "t30",
    "examples": [
      "\"How do you use the word 'existence' in a sentence?\""
    ],
    "synonyms": [],
    "antonyms": []
  }
];
