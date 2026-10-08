import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 39: Đồ uống & Trà sữa (Drinks & Beverages)
 * Mã chủ đề: t_basic_drinks_beverages
 * Tổng số từ vựng: 20 từ
 */
export const THEME_DO_UONG_TRA_SUA: BasicTheme = {
  "id": "t_basic_drinks_beverages",
  "name": "Đồ uống & Trà sữa",
  "nameEn": "Drinks & Beverages",
  "icon": "🧋",
  "difficulty": 1,
  "color": "#d97706",
  "description": "Sinh tố, nước ép, trà sữa trân châu, trà đá, nước chanh và nước khoáng.",
  "totalVocabs": 20
};

export const VOCABS_DO_UONG_TRA_SUA: BasicVocabularyItem[] = [
  {
    "id": "bv_drinks_01",
    "word": "smoothie",
    "phonetic": "/ˈsmuːði/",
    "definition": "A thick, smooth drink of fresh fruit pureed with milk, yogurt, or ice cream.",
    "definitionVn": "sinh tố (hoa quả xay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "An avocado smoothie with condensed milk is a Vietnamese favorite.",
      "Blend fresh mango and banana with yogurt for breakfast."
    ],
    "exampleTranslations": [
      "Sinh tố bơ với sữa đặc là món khoái khẩu của người Việt.",
      "Xay xoài tươi và chuối cùng sữa chua cho bữa sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_02",
    "word": "juice",
    "phonetic": "/dʒuːs/",
    "definition": "The liquid part that can be extracted from plant or fruit tissue by squeezing.",
    "definitionVn": "nước ép trái cây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Fresh watermelon juice is super hydrating in the summer heat.",
      "Drink a glass of freshly squeezed orange juice every morning."
    ],
    "exampleTranslations": [
      "Nước ép dưa hấu tươi cực kỳ giải nhiệt trong cái nóng mùa hè.",
      "Uống một ly nước cam vắt tươi mỗi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_03",
    "word": "milk tea",
    "phonetic": "/mɪlk tiː/",
    "definition": "A beverage made from tea mixed with milk and often sugar or tapioca pearls (boba).",
    "definitionVn": "trà sữa (trân châu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Brown sugar boba milk tea is popular among students.",
      "Order milk tea with 50% sugar and less ice."
    ],
    "exampleTranslations": [
      "Trà sữa trân châu đường đen rất được học sinh sinh viên ưa chuộng.",
      "Gọi trà sữa với 50% đường và ít đá nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_04",
    "word": "lemonade",
    "phonetic": "/ˌleməˈneɪd/",
    "definition": "A drink made from lemon juice and water sweetened with sugar.",
    "definitionVn": "nước chanh (tươi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Ice-cold lemonade with mint leaves is wonderfully refreshing.",
      "She squeezed five fresh lemons to make a pitcher of lemonade."
    ],
    "exampleTranslations": [
      "Nước chanh đá mát lạnh với lá bạc hà đem lại cảm giác sảng khoái tuyệt vời.",
      "Cô ấy vắt năm quả chanh tươi để làm một bình nước chanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_05",
    "word": "soda",
    "phonetic": "/ˈsoʊdə/",
    "definition": "Carbonated water or a sweet carbonated soft drink.",
    "definitionVn": "nước ngọt có ga, xô-đa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Limit sugary sodas and drink fresh water instead.",
      "A cold lime soda with ice is fizzy and refreshing."
    ],
    "exampleTranslations": [
      "Hạn chế nước ngọt có ga và hãy uống nước lọc thay thế nhé.",
      "Một ly xô-đa chanh đá sủi bọt uống rất sảng khoái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_06",
    "word": "mineral water",
    "phonetic": "/ˈmɪnərəl ˈwɔːtər/",
    "definition": "Water containing dissolved mineral salts, obtained from natural springs.",
    "definitionVn": "nước khoáng thiên nhiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Bottled natural mineral water replenishes essential electrolytes.",
      "Drink mineral water when engaging in intense sports."
    ],
    "exampleTranslations": [
      "Nước khoáng thiên nhiên đóng chai bổ sung các khoáng chất thiết yếu.",
      "Hãy uống nước khoáng khi tham gia các hoạt động thể thao cường độ cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_07",
    "word": "hot chocolate",
    "phonetic": "/hɑːt ˈtʃɑːklət/",
    "definition": "A hot drink made with melted chocolate or cocoa powder mixed with hot milk or water.",
    "definitionVn": "sô-cô-la nóng, ca cao nóng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "A steaming mug of hot chocolate with marshmallows warms a chilly evening.",
      "Kids love hot chocolate in winter."
    ],
    "exampleTranslations": [
      "Một ly sô-cô-la nóng hổi bốc khói cùng kẹo xốp làm ấm cả buổi tối se lạnh.",
      "Trẻ em rất thích uống sô-cô-la nóng vào mùa đông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_08",
    "word": "iced tea",
    "phonetic": "/aɪst tiː/",
    "definition": "Tea that has been chilled and is served with ice, often flavored with lemon.",
    "definitionVn": "trà đá (giải khát)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Street-side iced tea (trà đá) is a ubiquitous cultural staple in Hanoi.",
      "Order a refreshing glass of peach iced tea."
    ],
    "exampleTranslations": [
      "Trà đá vỉa hè là nét văn hóa đặc trưng quen thuộc ở Hà Nội.",
      "Hãy gọi một ly trà đào đá thanh mát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_09",
    "word": "cocktail",
    "phonetic": "/ˈkɑːkteɪl/",
    "definition": "An alcoholic or non-alcoholic mixed drink consisting of fruit juices and other flavorings.",
    "definitionVn": "cocktail (đồ uống pha chế)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "The bartender crafted a tropical mocktail with passion fruit.",
      "Enjoy sunset cocktails by the beach resort."
    ],
    "exampleTranslations": [
      "Người pha chế đã làm một ly mocktail nhiệt đới với chanh leo.",
      "Thưởng thức cocktail lúc hoàng hôn bên khu nghỉ dưỡng bãi biển nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_10",
    "word": "beer",
    "phonetic": "/bɪr/",
    "definition": "An alcoholic drink made from yeast-fermented malt flavored with hops.",
    "definitionVn": "bia (đồ uống lên men)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Hanoi draft beer (bia hơi) brings people together on warm evenings.",
      "Never drink beer and drive."
    ],
    "exampleTranslations": [
      "Bia hơi Hà Nội kết nối mọi người trong những buổi tối ấm áp.",
      "Đã uống bia rượu thì không bao giờ lái xe nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_11",
    "word": "wine",
    "phonetic": "/waɪn/",
    "definition": "An alcoholic drink made from fermented grape juice.",
    "definitionVn": "rượu vang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Red wine pairs harmoniously with grilled steak.",
      "Da Lat is famous for its local grape and berry wines."
    ],
    "exampleTranslations": [
      "Rượu vang đỏ kết hợp hài hòa với món bít tết nướng.",
      "Đà Lạt nổi tiếng với các loại rượu vang nho và quả mọng địa phương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_12",
    "word": "straw",
    "phonetic": "/strɔː/",
    "definition": "A thin hollow tube of paper or stainless steel used for sucking up drink.",
    "definitionVn": "ống hút (uống nước)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Use an eco-friendly bamboo or paper straw.",
      "Sip your smoothie with a reusable metal straw."
    ],
    "exampleTranslations": [
      "Hãy sử dụng ống hút tre hoặc ống hút giấy thân thiện với môi trường nhé.",
      "Uống sinh tố bằng ống hút kim loại dùng nhiều lần nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_13",
    "word": "ice",
    "phonetic": "/aɪs/",
    "definition": "Frozen water used for cooling drinks.",
    "definitionVn": "đá viên, đá lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Can I have extra ice in my coffee, please?",
      "Crushed ice keeps the fruit drink chilled."
    ],
    "exampleTranslations": [
      "Cho tôi xin thêm đá vào cà phê được không?",
      "Đá bào giữ cho đồ uống trái cây luôn mát lạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_14",
    "word": "cold",
    "phonetic": "/koʊld/",
    "definition": "At a low temperature; not warm.",
    "definitionVn": "lạnh, mát lạnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "A cold drink on a humid day feels amazing.",
      "Keep beverages cold in the cooler box."
    ],
    "exampleTranslations": [
      "Một ly đồ uống lạnh vào ngày trời oi bức đem lại cảm giác tuyệt vời.",
      "Giữ đồ uống luôn mát lạnh trong thùng giữ nhiệt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_15",
    "word": "refreshing",
    "phonetic": "/rɪˈfreʃɪŋ/",
    "definition": "Serving to refresh or reinvigorate, especially in hot weather.",
    "definitionVn": "sảng khoái, tươi mát",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Fresh coconut water is natural, sweet, and refreshing.",
      "Take a refreshing sip of chilled iced tea."
    ],
    "exampleTranslations": [
      "Nước dừa tươi rất tự nhiên, ngọt thanh và sảng khoái.",
      "Uống một ngụm trà đá mát lạnh để thấy thật tươi mát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_16",
    "word": "sip",
    "phonetic": "/sɪp/",
    "definition": "Drink by taking small mouthfuls.",
    "definitionVn": "nhấp từng ngụm, nhâm nhi",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Sip hot tea slowly so you do not burn your tongue.",
      "She sat on the balcony sipping her morning latte."
    ],
    "exampleTranslations": [
      "Nhấp trà nóng từ từ kẻo bị bỏng lưỡi nhé.",
      "Cô ấy ngồi ngoài ban công nhâm nhi ly cà phê latte buổi sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_17",
    "word": "pour",
    "phonetic": "/pɔːr/",
    "definition": "Cause a liquid to flow from a container in a steady stream.",
    "definitionVn": "rót, đổ (nước, sữa)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Pour fresh milk into the breakfast cereal bowl.",
      "He poured a glass of cold water for the thirsty guest."
    ],
    "exampleTranslations": [
      "Rót sữa tươi vào bát ngũ cốc ăn sáng nhé.",
      "Anh ấy đã rót một ly nước lạnh cho người khách đang khát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_18",
    "word": "thirsty",
    "phonetic": "/ˈθɜːrsti/",
    "definition": "Feeling a need to drink liquid.",
    "definitionVn": "khát nước",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "After playing football under the sun, the boys were very thirsty.",
      "Drink clean water whenever you feel thirsty."
    ],
    "exampleTranslations": [
      "Sau khi đá bóng dưới trời nắng, các cậu bé đều rất khát nước.",
      "Hãy uống nước sạch bất cứ khi nào bạn thấy khát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_19",
    "word": "glass",
    "phonetic": "/ɡlæs/",
    "definition": "A drinking container made of glass.",
    "definitionVn": "chiếc cốc thủy tinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "She raised a tall glass of sparkling water.",
      "Fill the glass to the brim."
    ],
    "exampleTranslations": [
      "Cô ấy nâng một chiếc cốc thủy tinh lớn đựng nước khoáng có ga.",
      "Rót đầy nước vào cốc thủy tinh đến tận miệng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_drinks_20",
    "word": "beverage",
    "phonetic": "/ˈbevərɪdʒ/",
    "definition": "A drink, especially one other than water.",
    "definitionVn": "thức uống, đồ uống giải khát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_drinks_beverages",
    "themeNameVn": "Đồ uống & Trà sữa",
    "themeNameEn": "Drinks & Beverages",
    "examples": [
      "Hot and cold beverages are available at the café counter.",
      "Water is the essential beverage for human life."
    ],
    "exampleTranslations": [
      "Đồ uống nóng và lạnh luôn có sẵn tại quầy quán cà phê.",
      "Nước lọc là thức uống thiết yếu nhất cho sự sống của con người."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_DO_UONG_TRA_SUA: VocabularyTopicPackage = {
  theme: THEME_DO_UONG_TRA_SUA,
  vocabs: VOCABS_DO_UONG_TRA_SUA,
};

export default CHUDE_DO_UONG_TRA_SUA;
