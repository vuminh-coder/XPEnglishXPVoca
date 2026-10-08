import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 14: Địa điểm & Chỉ đường (Places & Directions)
 * Mã chủ đề: t_basic_places_directions
 * Tổng số từ vựng: 22 từ
 */
export const THEME_DIA_DIEM_CHI_DUONG: BasicTheme = {
  "id": "t_basic_places_directions",
  "name": "Địa điểm & Chỉ đường",
  "nameEn": "Places & Directions",
  "icon": "🗺️",
  "difficulty": 1,
  "color": "#6366f1",
  "description": "Trường học, bệnh viện, siêu thị và các từ chỉ phương hướng cơ bản.",
  "totalVocabs": 22
};

export const VOCABS_DIA_DIEM_CHI_DUONG: BasicVocabularyItem[] = [
  {
    "id": "bv_places_01",
    "word": "place",
    "phonetic": "/pleɪs/",
    "definition": "A particular position or point in space.",
    "definitionVn": "địa điểm, nơi chốn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Da Nang is a wonderful place to live.",
      "Is this place quiet for studying?"
    ],
    "exampleTranslations": [
      "Đà Nẵng là một nơi tuyệt vời để sinh sống.",
      "Nơi này có đủ yên tĩnh để học bài không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_02",
    "word": "school",
    "phonetic": "/skuːl/",
    "definition": "An institution for educating children or students.",
    "definitionVn": "trường học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Children go to school from Monday to Friday.",
      "Our school has a big library."
    ],
    "exampleTranslations": [
      "Trẻ em đi học từ thứ Hai đến thứ Sáu.",
      "Trường chúng tôi có một thư viện lớn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_03",
    "word": "hospital",
    "phonetic": "/ˈhɑːspɪtl/",
    "definition": "An institution providing medical treatment and care.",
    "definitionVn": "bệnh viện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Doctors and nurses work hard at the hospital.",
      "The hospital is nearby."
    ],
    "exampleTranslations": [
      "Bác sĩ và y tá làm việc tận tụy ở bệnh viện.",
      "Bệnh viện ở ngay gần đây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_04",
    "word": "pharmacy",
    "phonetic": "/ˈfɑːrməsi/",
    "definition": "A shop where medicinal drugs are prepared or sold.",
    "definitionVn": "hiệu thuốc, nhà thuốc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "I bought cough medicine at the 24-hour pharmacy.",
      "The pharmacy is right next to the clinic."
    ],
    "exampleTranslations": [
      "Tôi đã mua thuốc ho tại hiệu thuốc mở cửa 24 giờ.",
      "Nhà thuốc nằm ngay cạnh phòng khám."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_05",
    "word": "bank",
    "phonetic": "/bæŋk/",
    "definition": "A financial establishment that invests money and provides loans.",
    "definitionVn": "ngân hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "I need to go to the bank to deposit money.",
      "The bank opens at 8:00 AM on weekdays."
    ],
    "exampleTranslations": [
      "Tôi cần đến ngân hàng để gửi tiền.",
      "Ngân hàng mở cửa lúc 8h sáng các ngày trong tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_06",
    "word": "market",
    "phonetic": "/ˈmɑːrkɪt/",
    "definition": "A regular gathering of people for the purchase and sale of provisions.",
    "definitionVn": "khu chợ, chợ truyền thống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Mom buys fresh vegetables at the morning market.",
      "Ben Thanh Market is famous in Ho Chi Minh City."
    ],
    "exampleTranslations": [
      "Mẹ mua rau tươi ở chợ sớm.",
      "Chợ Bến Thành rất nổi tiếng ở TP. Hồ Chí Minh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_07",
    "word": "supermarket",
    "phonetic": "/ˈsuːpərmɑːrkɪt/",
    "definition": "A large self-service shop selling foods and household goods.",
    "definitionVn": "siêu thị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "We do our weekly grocery shopping at the supermarket.",
      "The supermarket is having a big promotion."
    ],
    "exampleTranslations": [
      "Chúng tôi mua sắm hàng tuần tại siêu thị.",
      "Siêu thị đang có chương trình khuyến mãi lớn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_08",
    "word": "restaurant",
    "phonetic": "/ˈrestərənt/",
    "definition": "A place where people pay to sit and eat meals that are cooked on premises.",
    "definitionVn": "nhà hàng, quán ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Let's celebrate your birthday at a seafood restaurant.",
      "The restaurant serves delicious local dishes."
    ],
    "exampleTranslations": [
      "Hãy cùng chúc mừng sinh nhật bạn tại một nhà hàng hải sản nhé.",
      "Nhà hàng phục vụ những món ăn địa phương rất ngon."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_09",
    "word": "café",
    "phonetic": "/kæˈfeɪ/",
    "definition": "A small restaurant selling light meals and drinks, especially coffee.",
    "definitionVn": "quán cà phê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Let's meet at the corner café to chat.",
      "This café has free high-speed Wi-Fi."
    ],
    "exampleTranslations": [
      "Hãy gặp nhau ở quán cà phê góc phố để trò chuyện nhé.",
      "Quán cà phê này có Wi-Fi tốc độ cao miễn phí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_10",
    "word": "hotel",
    "phonetic": "/hoʊˈtel/",
    "definition": "An establishment providing accommodation, meals, and other services for travelers.",
    "definitionVn": "khách sạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "We booked a comfortable beachfront hotel room.",
      "The hotel staff is very friendly and helpful."
    ],
    "exampleTranslations": [
      "Chúng tôi đã đặt một phòng khách sạn tiện nghi trước biển.",
      "Nhân viên khách sạn rất thân thiện và nhiệt tình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_11",
    "word": "park",
    "phonetic": "/pɑːrk/",
    "definition": "A large public green area in a town used for recreation.",
    "definitionVn": "công viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Many people jog in the park every morning.",
      "The park has green trees and flowers."
    ],
    "exampleTranslations": [
      "Nhiều người chạy bộ trong công viên mỗi sáng.",
      "Công viên có cây xanh và hoa nở."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_12",
    "word": "cinema",
    "phonetic": "/ˈsɪnəmə/",
    "definition": "A theater where movies are shown for public entertainment.",
    "definitionVn": "rạp chiếu phim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "We watched an exciting action film at the cinema.",
      "Grab some popcorn before entering the cinema."
    ],
    "exampleTranslations": [
      "Chúng tôi đã xem một bộ phim hành động gay cấn tại rạp chiếu phim.",
      "Hãy lấy một ít bắp rang bơ trước khi vào rạp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_13",
    "word": "airport",
    "phonetic": "/ˈerpɔːrt/",
    "definition": "A complex of runways and buildings for takeoff, landing, and maintenance of aircraft.",
    "definitionVn": "sân bay, phi trường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Arrive at the international airport two hours before departure.",
      "Noi Bai Airport is in Hanoi."
    ],
    "exampleTranslations": [
      "Hãy đến sân bay quốc tế trước 2 giờ khởi hành nhé.",
      "Sân bay Nội Bài ở Hà Nội."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_14",
    "word": "station",
    "phonetic": "/ˈsteɪʃn/",
    "definition": "A regular stopping place on a public transport route, especially train or bus.",
    "definitionVn": "nhà ga (ga tàu, ga xe buýt)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "The train will arrive at the central station at 3 PM.",
      "Meet me right outside the metro station."
    ],
    "exampleTranslations": [
      "Tàu hỏa sẽ đến ga trung tâm lúc 3h chiều.",
      "Hãy gặp tôi ngay bên ngoài nhà ga tàu điện nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_15",
    "word": "bus stop",
    "phonetic": "/bʌs stɑːp/",
    "definition": "A designated place where public buses stop for passengers to board or alight.",
    "definitionVn": "trạm dừng xe buýt, điểm chờ xe buýt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "I wait for the bus at the bus stop every morning.",
      "There is a bus stop right in front of our school."
    ],
    "exampleTranslations": [
      "Tôi đứng đợi xe buýt tại trạm dừng mỗi sáng.",
      "Có một trạm dừng xe buýt ngay trước cổng trường chúng tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_16",
    "word": "library",
    "phonetic": "/ˈlaɪbreri/",
    "definition": "A building or room containing collections of books and periodicals for reading or borrowing.",
    "definitionVn": "thư viện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "The university library is quiet and ideal for study.",
      "I borrowed three English novels from the library."
    ],
    "exampleTranslations": [
      "Thư viện trường đại học rất yên tĩnh và lý tưởng để học bài.",
      "Tôi đã mượn ba cuốn tiểu thuyết tiếng Anh từ thư viện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_17",
    "word": "street",
    "phonetic": "/striːt/",
    "definition": "A public road in a city or town, typically with houses and buildings on side.",
    "definitionVn": "con đường, đường phố",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Look both ways before crossing the busy street.",
      "Our store is located on Main Street."
    ],
    "exampleTranslations": [
      "Hãy nhìn cả hai bên trước khi băng qua đường phố đông đúc.",
      "Cửa hàng của chúng tôi nằm trên trục đường chính."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_18",
    "word": "city",
    "phonetic": "/ˈsɪti/",
    "definition": "A large town.",
    "definitionVn": "thành phố, đô thị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Ho Chi Minh City is the largest economic hub in Vietnam.",
      "I love the vibrant energy of the city."
    ],
    "exampleTranslations": [
      "TP. Hồ Chí Minh là trung tâm kinh tế lớn nhất Việt Nam.",
      "Tôi yêu nguồn năng lượng sôi động của thành phố."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_places_19",
    "word": "here",
    "phonetic": "/hɪr/",
    "definition": "In, at, or to this place or position.",
    "definitionVn": "ở đây, tại đây (vị trí gần)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Come here and sit next to me.",
      "I have lived here for over five years."
    ],
    "exampleTranslations": [
      "Hãy lại đây và ngồi cạnh tôi nhé.",
      "Tôi đã sống ở đây hơn năm năm rồi."
    ],
    "synonyms": [],
    "antonyms": [
      "there"
    ]
  },
  {
    "id": "bv_places_20",
    "word": "there",
    "phonetic": "/ðer/",
    "definition": "In, at, or to that place or position.",
    "definitionVn": "ở đó, đằng kia (vị trí xa)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Look over there at the mountain peak!",
      "The library is over there across the road."
    ],
    "exampleTranslations": [
      "Hãy nhìn đằng kia trên đỉnh núi kìa!",
      "Thư viện ở đằng kia phía bên kia đường."
    ],
    "synonyms": [],
    "antonyms": [
      "here"
    ]
  },
  {
    "id": "bv_places_21",
    "word": "left",
    "phonetic": "/left/",
    "definition": "On, towards, or relating to the side of the body facing west when facing north.",
    "definitionVn": "bên trái, rẽ trái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Turn left at the intersection.",
      "The pharmacy is on the left side of the street."
    ],
    "exampleTranslations": [
      "Hãy rẽ trái tại ngã tư nhé.",
      "Hiệu thuốc nằm ở phía bên trái con đường."
    ],
    "synonyms": [],
    "antonyms": [
      "right"
    ]
  },
  {
    "id": "bv_places_22",
    "word": "right",
    "phonetic": "/raɪt/",
    "definition": "On, towards, or relating to the side of the body opposite left.",
    "definitionVn": "bên phải, rẽ phải",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_places_directions",
    "themeNameVn": "Địa điểm & Chỉ đường",
    "themeNameEn": "Places & Directions",
    "examples": [
      "Turn right at the traffic lights.",
      "Your book is on the right side of the desk."
    ],
    "exampleTranslations": [
      "Hãy rẽ phải tại cột đèn giao thông.",
      "Cuốn sách của bạn ở phía bên phải bàn học."
    ],
    "synonyms": [],
    "antonyms": [
      "left"
    ]
  }
];

export const CHUDE_DIA_DIEM_CHI_DUONG: VocabularyTopicPackage = {
  theme: THEME_DIA_DIEM_CHI_DUONG,
  vocabs: VOCABS_DIA_DIEM_CHI_DUONG,
};

export default CHUDE_DIA_DIEM_CHI_DUONG;
