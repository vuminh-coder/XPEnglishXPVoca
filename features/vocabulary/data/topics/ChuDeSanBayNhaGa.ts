import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 54: Sân bay & Nhà ga (Airport & Station Travel)
 * Mã chủ đề: t_basic_airport_station_travel
 * Tổng số từ vựng: 20 từ
 */
export const THEME_SAN_BAY_NHA_GA: BasicTheme = {
  "id": "t_basic_airport_station_travel",
  "name": "Sân bay & Nhà ga",
  "nameEn": "Airport & Station Travel",
  "icon": "🛫",
  "difficulty": 1,
  "color": "#0284c7",
  "description": "Nhà ga sân bay, cổng lên máy bay, thẻ lên tàu, hành lý, hải quan, chuyến bay.",
  "totalVocabs": 20
};

export const VOCABS_SAN_BAY_NHA_GA: BasicVocabularyItem[] = [
  {
    "id": "bv_airpor_01",
    "word": "airport",
    "phonetic": "/ˈerpɔːrt/",
    "definition": "A complex of runways and buildings for takeoff, landing, and maintenance of aircraft.",
    "definitionVn": "sân bay, phi trường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Arrive at the international airport two hours before departure.",
      "Noi Bai and Tan Son Nhat are major airports in Vietnam."
    ],
    "exampleTranslations": [
      "Hãy đến sân bay quốc tế trước giờ khởi hành hai tiếng nhé.",
      "Nội Bài và Tân Sơn Nhất là những sân bay lớn ở Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_02",
    "word": "terminal",
    "phonetic": "/ˈtɜːrmɪnl/",
    "definition": "A building at an airport or station where passengers arrive and depart.",
    "definitionVn": "nhà ga sân bay (T1, T2)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "International flights depart from Terminal 2.",
      "Follow the signs to reach Terminal 1 for domestic flights."
    ],
    "exampleTranslations": [
      "Các chuyến bay quốc tế khởi hành từ Nhà ga T2.",
      "Đi theo biển chỉ dẫn để đến Nhà ga T1 cho các chuyến bay nội địa nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_03",
    "word": "gate",
    "phonetic": "/ɡeɪt/",
    "definition": "A numbered exit from an airport terminal leading to an aircraft.",
    "definitionVn": "cửa ra máy bay, cổng lên máy bay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Boarding begins at Gate 12 in twenty minutes.",
      "Check your flight boarding pass for the assigned gate number."
    ],
    "exampleTranslations": [
      "Việc lên máy bay bắt đầu tại Cổng số 12 trong hai mươi phút nữa.",
      "Hãy kiểm tra thẻ lên máy bay để biết số cổng quy định nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_04",
    "word": "platform",
    "phonetic": "/ˈplætfɔːrm/",
    "definition": "A raised level surface on which passengers board or alight from a train.",
    "definitionVn": "sân ga, thềm ga xe lửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "The train to Da Nang will arrive on Platform 3.",
      "Stand safely behind the yellow safety line on the platform."
    ],
    "exampleTranslations": [
      "Đoàn tàu đi Đà Nẵng sẽ vào sân ga số 3.",
      "Hãy đứng an toàn phía sau vạch vàng cảnh báo trên sân ga nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_05",
    "word": "boarding pass",
    "phonetic": "/ˈbɔːrdɪŋ pæs/",
    "definition": "A pass for boarding an aircraft, given to a passenger when the luggage is checked in.",
    "definitionVn": "thẻ lên máy bay, vé lên tàu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Scan the digital QR code on your mobile boarding pass.",
      "Keep your passport and boarding pass ready at the gate."
    ],
    "exampleTranslations": [
      "Quét mã QR kỹ thuật số trên thẻ lên máy bay trên điện thoại nhé.",
      "Hãy chuẩn bị sẵn hộ chiếu và thẻ lên máy bay tại cửa khởi hành nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_06",
    "word": "luggage",
    "phonetic": "/ˈlʌɡɪdʒ/",
    "definition": "Suitcases or other bags in which to pack personal belongings for traveling.",
    "definitionVn": "hành lý (vali, túi xách)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Attach a luggage tag with your name and phone number.",
      "Cabin luggage must fit in the overhead airplane compartment."
    ],
    "exampleTranslations": [
      "Gắn thẻ hành lý có ghi tên và số điện thoại của bạn nhé.",
      "Hành lý xách tay phải vừa với khoang chứa đồ phía trên máy bay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_07",
    "word": "baggage",
    "phonetic": "/ˈbæɡɪdʒ/",
    "definition": "Personal belongings packed in suitcases for traveling.",
    "definitionVn": "hành lý ký gửi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Collect your checked baggage at baggage claim carousel 4.",
      "Weight limits for checked baggage must be observed."
    ],
    "exampleTranslations": [
      "Nhận hành lý ký gửi tại băng chuyền trả hành lý số 4 nhé.",
      "Quy định về trọng lượng hành lý ký gửi cần phải được tuân thủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_08",
    "word": "check-in",
    "phonetic": "/ˈtʃek ɪn/",
    "definition": "The act of reporting one's arrival at an airport, hotel, etc.",
    "definitionVn": "làm thủ tục lên máy bay / nhận phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Complete online check-in twenty-four hours before flight departure.",
      "The airline check-in counter is right inside the main hall."
    ],
    "exampleTranslations": [
      "Hoàn tất thủ tục check-in trực tuyến trước 24 giờ khởi hành nhé.",
      "Quầy làm thủ tục của hãng hàng không nằm ngay trong sảnh chính."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_09",
    "word": "security",
    "phonetic": "/sɪˈkjʊrəti/",
    "definition": "The procedures followed to ensure safety at an airport or station.",
    "definitionVn": "an ninh soi chiếu, trật tự an ninh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Remove laptops and metal items before passing through airport security.",
      "Follow security officers' instructions politely."
    ],
    "exampleTranslations": [
      "Bỏ máy tính xách tay và đồ kim loại ra trước khi qua cổng soi chiếu an ninh nhé.",
      "Làm theo hướng dẫn của nhân viên an ninh một cách lịch sự."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_10",
    "word": "customs",
    "phonetic": "/ˈkʌstəmz/",
    "definition": "The official department that administers and collects the duties levied by a government on imported goods.",
    "definitionVn": "hải quan (xuất nhập cảnh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Declare foreign currency and commercial goods at customs.",
      "The customs officer stamped the arrival document."
    ],
    "exampleTranslations": [
      "Khai báo ngoại tệ và hàng hóa thương mại tại cơ quan hải quan nhé.",
      "Cán bộ hải quan đã đóng dấu vào giấy tờ nhập cảnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_11",
    "word": "flight",
    "phonetic": "/flaɪt/",
    "definition": "A journey made by flying, especially in an airplane.",
    "definitionVn": "chuyến bay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "The direct flight from Hanoi to Ho Chi Minh City takes two hours.",
      "We wish you a pleasant and smooth flight!"
    ],
    "exampleTranslations": [
      "Chuyến bay thẳng từ Hà Nội vào TP. Hồ Chí Minh mất hai tiếng.",
      "Chúng tôi chúc quý khách có một chuyến bay êm ái và thoải mái!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_12",
    "word": "departure",
    "phonetic": "/dɪˈpɑːrtʃər/",
    "definition": "The action of leaving, especially to start a journey.",
    "definitionVn": "giờ khởi hành, chuyến bay đi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Check the electronic departure screen for updated flight times.",
      "The flight departure is on schedule."
    ],
    "exampleTranslations": [
      "Kiểm tra màn hình khởi hành điện tử để cập nhật giờ bay nhé.",
      "Chuyến bay khởi hành đúng theo lịch trình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_13",
    "word": "arrival",
    "phonetic": "/əˈraɪvl/",
    "definition": "The action or an act of arriving, or a person or thing that has arrived.",
    "definitionVn": "giờ đến nơi, chuyến bay đến",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Our estimated arrival time in Da Nang is 3:30 PM.",
      "Meet arriving international guests at the arrival hall."
    ],
    "exampleTranslations": [
      "Thời gian dự kiến đến nơi của chúng tôi tại Đà Nẵng là 3h30 chiều.",
      "Đón khách quốc tế đến tại sảnh đón nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_14",
    "word": "delay",
    "phonetic": "/dɪˈleɪ/",
    "definition": "A period of time by which something is late or postponed.",
    "definitionVn": "sự chậm trễ, hoãn chuyến bay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "The flight experienced a brief thirty-minute weather delay.",
      "We apologize for any inconvenience caused by the delay."
    ],
    "exampleTranslations": [
      "Chuyến bay bị hoãn 30 phút do ảnh hưởng của thời tiết.",
      "Chúng tôi xin lỗi vì mọi bất tiện do sự hoãn chuyến này gây ra."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_15",
    "word": "passenger",
    "phonetic": "/ˈpæsɪndʒər/",
    "definition": "A traveler on a public or private conveyance other than the driver, pilot, or crew.",
    "definitionVn": "hành khách (đi máy bay, tàu xe)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Passengers are requested to fasten seatbelts during turbulence.",
      "The plane can carry over three hundred passengers."
    ],
    "exampleTranslations": [
      "Hành khách được yêu cầu cài dây an toàn khi máy bay đi qua vùng nhiễu động.",
      "Chiếc máy bay có thể chở hơn ba trăm hành khách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_16",
    "word": "seat",
    "phonetic": "/siːt/",
    "definition": "A place for sitting on a train or plane.",
    "definitionVn": "chỗ ngồi, ghế máy bay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Would you prefer an aisle seat or a window seat?",
      "Remain seated until the seatbelt sign is turned off."
    ],
    "exampleTranslations": [
      "Bạn thích ngồi ghế cạnh lối đi hay ghế cạnh cửa sổ hơn?",
      "Hãy ngồi yên tại chỗ cho đến khi đèn báo hiệu cài dây an toàn tắt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_17",
    "word": "board",
    "phonetic": "/bɔːrd/",
    "definition": "Get on or into a ship, aircraft, train, or other vehicle.",
    "definitionVn": "lên (máy bay, tàu hỏa, xe)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Please have your passport and boarding pass ready as you board the aircraft.",
      "Passengers with small children may board first."
    ],
    "exampleTranslations": [
      "Vui lòng chuẩn bị sẵn hộ chiếu và thẻ lên tàu khi bạn lên máy bay nhé.",
      "Hành khách đi cùng trẻ nhỏ được ưu tiên lên máy bay trước."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_18",
    "word": "land",
    "phonetic": "/lænd/",
    "definition": "Come down through the air and rest on the ground or a surface.",
    "definitionVn": "hạ cánh (máy bay tiếp đất)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "The airplane landed smoothly on the runway despite rainy weather.",
      "We landed in Da Nang at exactly noon."
    ],
    "exampleTranslations": [
      "Máy bay đã hạ cánh êm ái xuống đường băng dù trời mưa.",
      "Chúng tôi đã hạ cánh xuống Đà Nẵng vào đúng 12h trưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_19",
    "word": "pilot",
    "phonetic": "/ˈpaɪlət/",
    "definition": "A person who operates the flying controls of an aircraft.",
    "definitionVn": "cơ trưởng, phi công lái máy bay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "The experienced captain pilot welcomed all passengers aboard.",
      "Pilots undergo rigorous flight simulation training."
    ],
    "exampleTranslations": [
      "Cơ trưởng giàu kinh nghiệm chào mừng tất cả hành khách lên máy bay.",
      "Các phi công trải qua quá trình huấn luyện mô phỏng bay nghiêm ngặt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_airpor_20",
    "word": "flight attendant",
    "phonetic": "/ˈflaɪt əˌtendənt/",
    "definition": "A steward or stewardess on an aircraft.",
    "definitionVn": "tiếp viên hàng không",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_airport_station_travel",
    "themeNameVn": "Sân bay & Nhà ga",
    "themeNameEn": "Airport & Station Travel",
    "examples": [
      "Friendly flight attendants served hot tea and meals.",
      "Listen attentively to the flight attendant's safety briefing."
    ],
    "exampleTranslations": [
      "Những tiếp viên hàng không thân thiện đã phục vụ trà nóng và bữa ăn.",
      "Hãy chăm chú lắng nghe hướng dẫn an toàn của tiếp viên hàng không nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_SAN_BAY_NHA_GA: VocabularyTopicPackage = {
  theme: THEME_SAN_BAY_NHA_GA,
  vocabs: VOCABS_SAN_BAY_NHA_GA,
};

export default CHUDE_SAN_BAY_NHA_GA;
