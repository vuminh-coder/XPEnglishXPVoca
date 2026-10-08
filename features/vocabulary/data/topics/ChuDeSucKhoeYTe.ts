import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 22: Sức khỏe & Y tế (Health & Medical)
 * Mã chủ đề: t_basic_health_medical
 * Tổng số từ vựng: 20 từ
 */
export const THEME_SUC_KHOE_Y_TE: BasicTheme = {
  "id": "t_basic_health_medical",
  "name": "Sức khỏe & Y tế",
  "nameEn": "Health & Medical",
  "icon": "💊",
  "difficulty": 1,
  "color": "#dc2626",
  "description": "Sốt, ho, cảm lạnh, đau đầu, thuốc uống và cách chăm sóc bản thân.",
  "totalVocabs": 20
};

export const VOCABS_SUC_KHOE_Y_TE: BasicVocabularyItem[] = [
  {
    "id": "bv_health_01",
    "word": "health",
    "phonetic": "/helθ/",
    "definition": "The state of being free from illness or injury.",
    "definitionVn": "sức khỏe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Good health is the greatest wealth in life.",
      "Drink water and exercise regularly for good health."
    ],
    "exampleTranslations": [
      "Sức khỏe tốt là tài sản quý giá nhất trong đời.",
      "Uống nước và tập thể dục đều đặn để có sức khỏe tốt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_02",
    "word": "healthy",
    "phonetic": "/ˈhelθi/",
    "definition": "In good health; promoting health.",
    "definitionVn": "khỏe mạnh, lành mạnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Eating vegetables and sleeping early keeps you healthy.",
      "She maintains a healthy lifestyle."
    ],
    "exampleTranslations": [
      "Ăn rau củ và ngủ sớm giúp bạn luôn khỏe mạnh.",
      "Cô ấy duy trì một lối sống lành mạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_03",
    "word": "sick",
    "phonetic": "/sɪk/",
    "definition": "Affected by physical or mental illness; unwell.",
    "definitionVn": "bị ốm, bị bệnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "He stayed home from school because he felt sick.",
      "Get well soon if you are feeling sick."
    ],
    "exampleTranslations": [
      "Cậu ấy nghỉ học ở nhà vì cảm thấy bị ốm.",
      "Mau khỏe lại nhé nếu bạn đang thấy mệt trong người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_04",
    "word": "fever",
    "phonetic": "/ˈfiːvər/",
    "definition": "An abnormally high body temperature, usually accompanied by shivering and headache.",
    "definitionVn": "cơn sốt, sốt cao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "The child has a high fever; let's see a doctor.",
      "Drink warm fluids to bring down the fever."
    ],
    "exampleTranslations": [
      "Em bé bị sốt cao; hãy đưa bé đi khám bác sĩ.",
      "Uống nước ấm để hạ sốt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_05",
    "word": "cough",
    "phonetic": "/kɔːf/",
    "definition": "Expel air from the lungs with a sudden sharp sound.",
    "definitionVn": "ho, cơn ho",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Cover your mouth with a tissue when you cough.",
      "Warm honey and lemon tea helps soothe a dry cough."
    ],
    "exampleTranslations": [
      "Hãy che miệng bằng khăn giấy khi ho nhé.",
      "Trà chanh mật ong ấm giúp làm dịu cơn ho khan."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_06",
    "word": "cold",
    "phonetic": "/koʊld/",
    "definition": "A common viral infection in which the mucous membrane of the nose and throat becomes inflamed.",
    "definitionVn": "cảm lạnh thông thường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "I caught a mild cold because of the rainy weather.",
      "Rest in bed and drink hot ginger tea for a cold."
    ],
    "exampleTranslations": [
      "Tôi bị cảm lạnh nhẹ do thời tiết mưa gió.",
      "Nghỉ ngơi trên giường và uống trà gừng nóng khi bị cảm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_07",
    "word": "headache",
    "phonetic": "/ˈhedeɪk/",
    "definition": "A continuous pain in the head.",
    "definitionVn": "đau đầu, nhức đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "I have a bad headache from staring at screens too long.",
      "Take a short walk and rest your eyes to ease a headache."
    ],
    "exampleTranslations": [
      "Tôi bị đau đầu dữ dội do nhìn màn hình quá lâu.",
      "Đi dạo một lát và cho mắt nghỉ ngơi để giảm nhức đầu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_08",
    "word": "stomachache",
    "phonetic": "/ˈstʌməkeɪk/",
    "definition": "Pain in a person's stomach or belly.",
    "definitionVn": "đau bụng, đau dạ dày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Don't eat unwashed food to avoid a stomachache.",
      "He rested with a warm towel over his stomachache."
    ],
    "exampleTranslations": [
      "Đừng ăn thực phẩm chưa rửa sạch để tránh bị đau bụng nhé.",
      "Cậu ấy nghỉ ngơi và chườm khăn ấm lên bụng bị đau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_09",
    "word": "toothache",
    "phonetic": "/ˈtuːθeɪk/",
    "definition": "Pain in or around a tooth.",
    "definitionVn": "đau răng, nhức răng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Visit the dentist twice a year to prevent toothache.",
      "He had a sharp toothache from eating too many sweets."
    ],
    "exampleTranslations": [
      "Đi khám nha sĩ hai lần một năm để phòng ngừa đau răng nhé.",
      "Cậu ấy bị nhức răng dữ dội vì ăn quá nhiều đồ ngọt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_10",
    "word": "pain",
    "phonetic": "/peɪn/",
    "definition": "Physical suffering or discomfort caused by illness or injury.",
    "definitionVn": "cơn đau, nỗi đau đớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Tell the doctor where you feel the sharp pain.",
      "The medicine relieved the muscular pain."
    ],
    "exampleTranslations": [
      "Hãy nói cho bác sĩ biết bạn cảm thấy đau nhói ở chỗ nào nhé.",
      "Thuốc đã làm dịu cơn đau cơ bắp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_11",
    "word": "medicine",
    "phonetic": "/ˈmedɪsn/",
    "definition": "A compound or preparation used for the treatment or prevention of disease.",
    "definitionVn": "thuốc chữa bệnh, y dược",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Take your prescribed medicine after meals.",
      "Store all medicines out of reach of children."
    ],
    "exampleTranslations": [
      "Uống thuốc theo đơn sau bữa ăn nhé.",
      "Cất giữ mọi loại thuốc xa tầm với của trẻ em."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_12",
    "word": "pill",
    "phonetic": "/pɪl/",
    "definition": "A small round mass of solid medicine to be swallowed whole.",
    "definitionVn": "viên thuốc (dạng nén/nhộng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Swallow this vitamin pill with a full glass of water.",
      "Take one pill every eight hours."
    ],
    "exampleTranslations": [
      "Uống viên vitamin này với một ly nước đầy nhé.",
      "Uống một viên mỗi tám tiếng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_13",
    "word": "bandage",
    "phonetic": "/ˈbændɪdʒ/",
    "definition": "A strip of material used to bind up a wound or protect a hurt part.",
    "definitionVn": "băng gạc, băng dán vết thương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Clean the small cut and apply a sterile adhesive bandage.",
      "The nurse wrapped a clean bandage around his wrist."
    ],
    "exampleTranslations": [
      "Rửa sạch vết cắt nhỏ và dán băng gạc vô trùng nhé.",
      "Y tá đã quấn một lớp băng gạc sạch quanh cổ tay anh ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_14",
    "word": "rest",
    "phonetic": "/rest/",
    "definition": "Cease work or movement in order to relax, refresh oneself, or recover strength.",
    "definitionVn": "nghỉ ngơi, tĩnh dưỡng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "You need plenty of bed rest to recover from the flu.",
      "Rest for ten minutes after exercising."
    ],
    "exampleTranslations": [
      "Bạn cần nghỉ ngơi tĩnh dưỡng trên giường nhiều để hồi phục sau cúm.",
      "Nghỉ ngơi mười phút sau khi tập thể dục nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_15",
    "word": "dentist",
    "phonetic": "/ˈdentɪst/",
    "definition": "A person qualified to treat the diseases and conditions that affect the teeth and gums.",
    "definitionVn": "nha sĩ (bác sĩ răng hàm mặt)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "The dentist cleaned my teeth gently and checked for cavities.",
      "Brush and floss before seeing the dentist."
    ],
    "exampleTranslations": [
      "Nha sĩ đã lấy cao răng nhẹ nhàng và kiểm tra sâu răng.",
      "Đánh răng và dùng chỉ nha khoa trước khi gặp nha sĩ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_16",
    "word": "ambulance",
    "phonetic": "/ˈæmbjələns/",
    "definition": "A vehicle equipped for taking sick or injured people to and from hospital.",
    "definitionVn": "xe cứu thương, xe cấp cứu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Give way when you hear the siren of an emergency ambulance.",
      "The ambulance arrived within five minutes."
    ],
    "exampleTranslations": [
      "Hãy nhường đường khi bạn nghe thấy tiếng còi xe cứu thương khẩn cấp.",
      "Xe cấp cứu đã đến nơi trong vòng năm phút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_17",
    "word": "cure",
    "phonetic": "/kjʊr/",
    "definition": "Relieve a person of the symptoms of a disease or condition.",
    "definitionVn": "chữa khỏi, phương thuốc chữa trị",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Prevention is always better than cure.",
      "Scientists work hard to cure serious illnesses."
    ],
    "exampleTranslations": [
      "Phòng bệnh luôn luôn tốt hơn chữa bệnh.",
      "Các nhà khoa học nỗ lực làm việc để chữa khỏi những căn bệnh hiểm nghèo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_18",
    "word": "exercise",
    "phonetic": "/ˈeksərsaɪz/",
    "definition": "Activity requiring physical effort, carried out to sustain or improve health and fitness.",
    "definitionVn": "tập thể dục, rèn luyện thân thể",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Thirty minutes of daily exercise keeps you energized.",
      "Morning exercise is great for your mood."
    ],
    "exampleTranslations": [
      "Ba mươi phút tập thể dục mỗi ngày giúp bạn luôn tràn đầy năng lượng.",
      "Tập thể dục buổi sáng rất tốt cho tâm trạng của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_19",
    "word": "vitamin",
    "phonetic": "/ˈvaɪtəmɪn/",
    "definition": "Any of a group of organic compounds which are essential for normal growth and nutrition.",
    "definitionVn": "vi-ta-min (dưỡng chất)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Citrus fruits are packed with natural Vitamin C.",
      "Sunlight helps our bodies synthesize Vitamin D."
    ],
    "exampleTranslations": [
      "Các loại quả có múi chứa đầy Vitamin C tự nhiên.",
      "Ánh nắng mặt trời giúp cơ thể chúng ta tổng hợp Vitamin D."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_health_20",
    "word": "sleep",
    "phonetic": "/sliːp/",
    "definition": "A condition of body and mind that typically recurs for several hours every night.",
    "definitionVn": "giấc ngủ, ngủ ngon",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_health_medical",
    "themeNameVn": "Sức khỏe & Y tế",
    "themeNameEn": "Health & Medical",
    "examples": [
      "Adequate sleep is vital for immune function and brain health.",
      "Aim for eight hours of uninterrupted sleep."
    ],
    "exampleTranslations": [
      "Ngủ đủ giấc là điều tối quan trọng cho hệ miễn dịch và sức khỏe trí não.",
      "Hãy hướng tới tám tiếng ngủ ngon không gián đoạn."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_SUC_KHOE_Y_TE: VocabularyTopicPackage = {
  theme: THEME_SUC_KHOE_Y_TE,
  vocabs: VOCABS_SUC_KHOE_Y_TE,
};

export default CHUDE_SUC_KHOE_Y_TE;
