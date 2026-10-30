import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 17: Phương tiện giao thông (Vehicles & Transport)
 * Mã chủ đề: t_basic_transportation
 * Tổng số từ vựng: 25 từ
 */
export const THEME_PHUONG_TIEN_GIAO_THONG: BasicTheme = {
  "id": "t_basic_transportation",
  "name": "Phương tiện giao thông",
  "nameEn": "Vehicles & Transport",
  "icon": "🚗",
  "difficulty": 1,
  "color": "#2563eb",
  "description": "Xe máy, xe buýt, ô tô, máy bay, tàu hỏa và cách đi lại.",
  "totalVocabs": 25
};

export const VOCABS_PHUONG_TIEN_GIAO_THONG: BasicVocabularyItem[] = [
  {
    "id": "bv_transp_01",
    "word": "car",
    "phonetic": "/kɑːr/",
    "definition": "A four-wheeled road vehicle powered by an engine.",
    "definitionVn": "xe ô tô, xe hơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Electric cars are quiet and eco-friendly.",
      "He parked his car in front of the building."
    ],
    "exampleTranslations": [
      "Xe ô tô điện rất êm và thân thiện với môi trường.",
      "Anh ấy đỗ xe hơi trước tòa nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_02",
    "word": "bus",
    "phonetic": "/bʌs/",
    "definition": "A large motor vehicle carrying passengers by road.",
    "definitionVn": "xe buýt (công cộng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Taking the electric bus reduces air pollution.",
      "The number 9 bus arrives every ten minutes."
    ],
    "exampleTranslations": [
      "Đi xe buýt điện giúp giảm ô nhiễm không khí.",
      "Xe buýt số 9 cứ mười phút lại có một chuyến."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_03",
    "word": "taxi",
    "phonetic": "/ˈtæksi/",
    "definition": "A motor vehicle licensed to transport passengers in return for payment of a fare.",
    "definitionVn": "xe tắc-xi, taxi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "We hailed a green taxi to go to the airport.",
      "The taxi ride took fifteen minutes."
    ],
    "exampleTranslations": [
      "Chúng tôi đã vẫy một chiếc taxi xanh để đi ra sân bay.",
      "Chuyến đi taxi mất mười lăm phút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_04",
    "word": "train",
    "phonetic": "/treɪn/",
    "definition": "A series of connected railway carriages or wagons moved by a locomotive.",
    "definitionVn": "tàu hỏa, xe lửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The high-speed train travels from Hanoi to Da Nang smoothly.",
      "Look out the train window at the scenery."
    ],
    "exampleTranslations": [
      "Tàu hỏa cao tốc di chuyển từ Hà Nội vào Đà Nẵng rất êm ái.",
      "Hãy nhìn phong cảnh qua cửa sổ tàu hỏa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_05",
    "word": "plane",
    "phonetic": "/pleɪn/",
    "definition": "An airplane; powered flying vehicle with fixed wings.",
    "definitionVn": "máy bay, phi cơ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The plane took off smoothly into the clear sky.",
      "Board the plane through gate number 4."
    ],
    "exampleTranslations": [
      "Máy bay cất cánh êm ái vào bầu trời trong xanh.",
      "Lên máy bay qua cửa số 4 nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_06",
    "word": "subway",
    "phonetic": "/ˈsʌbweɪ/",
    "definition": "An underground electric railroad.",
    "definitionVn": "tàu điện ngầm, metro",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The city subway system is fast and convenient.",
      "Take line 2 on the metro subway to downtown."
    ],
    "exampleTranslations": [
      "Hệ thống tàu điện ngầm thành phố rất nhanh và tiện lợi.",
      "Đi tuyến số 2 trên tàu điện ngầm vào trung tâm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_07",
    "word": "boat",
    "phonetic": "/boʊt/",
    "definition": "A small vessel for travelling over water.",
    "definitionVn": "thuyền, xuồng nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "We took a wooden boat trip along the scenic river.",
      "Fishermen returned with boats full of fresh fish."
    ],
    "exampleTranslations": [
      "Chúng tôi đi du ngoạn bằng thuyền gỗ dọc dòng sông thơ mộng.",
      "Các ngư dân trở về với những con thuyền đầy ắp cá tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_08",
    "word": "ship",
    "phonetic": "/ʃɪp/",
    "definition": "A large boat for transporting people or goods by sea.",
    "definitionVn": "tàu thủy lớn, tàu biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The cruise ship sailed across the turquoise ocean.",
      "Cargo ships carry goods around the globe."
    ],
    "exampleTranslations": [
      "Con tàu du lịch lướt sóng qua đại dương xanh biếc.",
      "Những con tàu chở hàng vận chuyển hàng hóa vòng quanh thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_09",
    "word": "bicycle",
    "phonetic": "/ˈbaɪsɪkl/",
    "definition": "A vehicle consisting of two wheels held in a frame one behind the other, propelled by pedals.",
    "definitionVn": "xe đạp (hai bánh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Riding a bicycle is great exercise for your legs.",
      "She locked her bicycle outside the library."
    ],
    "exampleTranslations": [
      "Đi xe đạp là bài tập thể dục tuyệt vời cho đôi chân.",
      "Cô ấy khóa xe đạp bên ngoài thư viện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_10",
    "word": "bike",
    "phonetic": "/baɪk/",
    "definition": "An informal term for a bicycle or motorcycle.",
    "definitionVn": "xe đạp thể thao / xe hai bánh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Let's go for a bike ride around the West Lake.",
      "He bought a lightweight racing bike."
    ],
    "exampleTranslations": [
      "Cùng đạp xe dạo một vòng quanh Hồ Tây nhé.",
      "Anh ấy đã mua một chiếc xe đạp đua siêu nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_11",
    "word": "motorcycle",
    "phonetic": "/ˈmoʊtərsaɪkl/",
    "definition": "A two-wheeled vehicle that is powered by an engine.",
    "definitionVn": "xe máy, xe mô tô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Always fasten your helmet when riding a motorcycle.",
      "Motorcycles are the most popular vehicle in Vietnam."
    ],
    "exampleTranslations": [
      "Luôn cài quai mũ bảo hiểm khi đi xe máy nhé.",
      "Xe máy là phương tiện phổ biến nhất ở Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_12",
    "word": "truck",
    "phonetic": "/trʌk/",
    "definition": "A large, heavy motor vehicle for transporting goods.",
    "definitionVn": "xe tải (chở hàng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The delivery truck brought fresh supplies to the store.",
      "Heavy trucks drive on the highway at night."
    ],
    "exampleTranslations": [
      "Chiếc xe tải giao hàng đã mang hàng mới đến cửa hàng.",
      "Các xe tải nặng chạy trên đường cao tốc vào ban đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_13",
    "word": "helicopter",
    "phonetic": "/ˈhelɪkɑːptər/",
    "definition": "An aircraft that derives both lift and propulsion from horizontal rotors.",
    "definitionVn": "máy bay trực thăng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The rescue helicopter landed quickly on the hospital roof.",
      "We saw a scenic helicopter tour over the bay."
    ],
    "exampleTranslations": [
      "Trực thăng cứu hộ đã đáp nhanh chóng xuống nóc bệnh viện.",
      "Chúng tôi thấy tour ngắm cảnh bằng trực thăng trên vịnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_14",
    "word": "ticket",
    "phonetic": "/ˈtɪkɪt/",
    "definition": "A piece of paper or card that gives the holder a certain right, especially to travel.",
    "definitionVn": "vé (vé xe, vé máy bay, vé tàu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Show your train ticket to the inspector.",
      "I booked a round-trip flight ticket online."
    ],
    "exampleTranslations": [
      "Xuất trình vé tàu cho nhân viên soát vé nhé.",
      "Tôi đã đặt vé máy bay khứ hồi trực tuyến."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_15",
    "word": "seat",
    "phonetic": "/siːt/",
    "definition": "A thing made or used for sitting on in a vehicle or room.",
    "definitionVn": "chỗ ngồi, ghế ngồi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Please remain in your seat until the plane stops.",
      "She reserved a window seat on the train."
    ],
    "exampleTranslations": [
      "Xin vui lòng ngồi yên tại chỗ cho đến khi máy bay dừng hẳn.",
      "Cô ấy đã đặt một chỗ ngồi cạnh cửa sổ trên tàu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_16",
    "word": "drive",
    "phonetic": "/draɪv/",
    "definition": "Operate and control the direction and speed of a motor vehicle.",
    "definitionVn": "lái xe (ô tô, xe tải)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Drive carefully and obey the speed limits.",
      "My father taught me how to drive."
    ],
    "exampleTranslations": [
      "Hãy lái xe cẩn thận và tuân thủ giới hạn tốc độ nhé.",
      "Bố đã dạy tôi cách lái xe ô tô."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_17",
    "word": "ride",
    "phonetic": "/raɪd/",
    "definition": "Sit on and control the movement of an animal or vehicle like bicycle or motorbike.",
    "definitionVn": "cưỡi (ngựa), đi (xe đạp, xe máy)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "I ride my bike to school every morning.",
      "She learned to ride a motorcycle at eighteen."
    ],
    "exampleTranslations": [
      "Tôi đạp xe đến trường mỗi sáng.",
      "Cô ấy học lái xe máy năm mười tám tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_18",
    "word": "fly",
    "phonetic": "/flaɪ/",
    "definition": "Move through the air using wings or from an aircraft.",
    "definitionVn": "bay, đi máy bay",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "We will fly to Da Nang for our summer vacation.",
      "Birds fly high in the morning sky."
    ],
    "exampleTranslations": [
      "Chúng tôi sẽ bay đến Đà Nẵng cho kỳ nghỉ hè.",
      "Những chú chim bay cao trên bầu trời buổi sớm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_19",
    "word": "travel",
    "phonetic": "/ˈtrævl/",
    "definition": "Make a journey, typically of some length.",
    "definitionVn": "du lịch, đi lại, di chuyển",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Traveling teaches you about different cultures.",
      "They travel abroad once a year."
    ],
    "exampleTranslations": [
      "Đi du lịch giúp bạn học hỏi về các nền văn hóa khác nhau.",
      "Họ đi du lịch nước ngoài mỗi năm một lần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_20",
    "word": "helmet",
    "phonetic": "/ˈhelmɪt/",
    "definition": "A hard or padded protective hat, worn by motor riders.",
    "definitionVn": "mũ bảo hiểm (an toàn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Wearing a quality helmet saves lives on the road.",
      "Fasten your helmet strap tightly."
    ],
    "exampleTranslations": [
      "Đội mũ bảo hiểm chất lượng cứu mạng người trên đường.",
      "Cài chặt quai mũ bảo hiểm của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_21",
    "word": "van",
    "phonetic": "/væn/",
    "definition": "A medium-sized motor vehicle used for transporting goods or groups of passengers.",
    "definitionVn": "xe tải nhỏ, xe khách cỡ nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The delivery van parked outside our office building.",
      "Our family rented a comfortable van for the trip."
    ],
    "exampleTranslations": [
      "Chiếc xe tải nhỏ giao hàng đỗ bên ngoài tòa nhà văn phòng của chúng tôi.",
      "Gia đình chúng tôi đã thuê một chiếc xe van tiện nghi cho chuyến đi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_22",
    "word": "ferry",
    "phonetic": "/ˈferi/",
    "definition": "A boat or ship for conveying passengers and goods, especially across a relatively short distance.",
    "definitionVn": "tàu phà, phà qua sông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "We took the morning ferry across the wide river.",
      "The island ferry carries both passengers and cars."
    ],
    "exampleTranslations": [
      "Chúng tôi đã đi chuyến phà buổi sáng băng qua con sông rộng.",
      "Chuyến phà ra đảo chở cả hành khách lẫn xe ô tô."
    ],
    "synonyms": [
      "passenger boat",
      "water taxi"
    ],
    "antonyms": []
  },
  {
    "id": "bv_transp_23",
    "word": "tram",
    "phonetic": "/træm/",
    "definition": "A passenger vehicle powered by electricity that runs on rails along public urban streets.",
    "definitionVn": "tàu điện mặt đất, xe điện leng keng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Tourists love riding the historic yellow city tram.",
      "The electric tram stops right in front of the museum."
    ],
    "exampleTranslations": [
      "Du khách rất thích đi tàu điện màu vàng lịch sử của thành phố.",
      "Tàu điện mặt đất dừng ngay phía trước bảo tàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_transp_24",
    "word": "scooter",
    "phonetic": "/ˈskuːtər/",
    "definition": "A light two-wheeled road vehicle with an engine or electric battery and a low footboard.",
    "definitionVn": "xe tay ga, xe trượt điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "She rides her electric scooter to work every day.",
      "Renting a scooter is convenient for exploring the town."
    ],
    "exampleTranslations": [
      "Cô ấy đi xe máy tay ga điện đến chỗ làm mỗi ngày.",
      "Thuê một chiếc xe tay ga rất tiện lợi để khám phá thị trấn."
    ],
    "synonyms": [
      "moped",
      "e-scooter",
      "motor scooter"
    ],
    "antonyms": []
  },
  {
    "id": "bv_transp_25",
    "word": "ambulance",
    "phonetic": "/ˈæmbjələns/",
    "definition": "A vehicle equipped for taking sick or injured people to and from hospital, especially in emergencies.",
    "definitionVn": "xe cứu thương, xe cấp cứu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The ambulance arrived quickly at the city hospital.",
      "Drivers must give way when an ambulance approaches."
    ],
    "exampleTranslations": [
      "Xe cứu thương đã đến bệnh viện thành phố một cách nhanh chóng.",
      "Người lái xe phải nhường đường khi xe cứu thương đang tiến tới."
    ],
    "synonyms": [
      "emergency vehicle",
      "paramedic wagon"
    ],
    "antonyms": []
  }
];

export const CHUDE_PHUONG_TIEN_GIAO_THONG: VocabularyTopicPackage = {
  theme: THEME_PHUONG_TIEN_GIAO_THONG,
  vocabs: VOCABS_PHUONG_TIEN_GIAO_THONG,
};

export default CHUDE_PHUONG_TIEN_GIAO_THONG;
