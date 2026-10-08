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
    "definitionVn": "xe đạp / xe máy (gọi tắt)",
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
    "word": "subway",
    "phonetic": "/ˈsʌb.weɪ/",
    "definition": "An underground electric railroad network operating in an urban area.",
    "definitionVn": "tàu điện ngầm đô thị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Riding the clean, punctual subway is the swiftest way to cross Tokyo during morning rush hour.",
      "Metropolitan commuters reload their transit cards at automated subway station turnstiles."
    ],
    "exampleTranslations": [
      "Đi tàu điện ngầm sạch sẽ, đúng giờ là cách nhanh nhất để băng qua Tokyo trong giờ cao điểm buổi sáng.",
      "Những người đi làm ở đô thị nạp lại thẻ phương tiện công cộng tại các cửa xoay tự động của ga tàu điện ngầm."
    ],
    "synonyms": [
      "metro",
      "underground train",
      "tube"
    ],
    "antonyms": []
  },
  {
    "id": "bv_transp_22",
    "word": "ferry",
    "phonetic": "/ˈfer.i/",
    "definition": "A boat or ship for conveying passengers and goods, especially across a relatively short distance.",
    "definitionVn": "phà chở khách và phương tiện qua sông/biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "We took the commuter ferry across the harbor to watch the sunset over the city skyline.",
      "Vehicle ferries transport cars and cargo trucks between the mainland and offshore islands."
    ],
    "exampleTranslations": [
      "Chúng tôi đi phà chở khách qua bến cảng để ngắm hoàng hôn buông xuống đường chân trời thành phố.",
      "Phà chở xe vận chuyển ô tô và xe tải chở hàng giữa đất liền và các đảo ngoài khơi."
    ],
    "synonyms": [
      "passenger boat",
      "water taxi"
    ],
    "antonyms": []
  },
  {
    "id": "bv_transp_23",
    "word": "helicopter",
    "phonetic": "/ˈhel.əˌkɑːp.tɚ/",
    "definition": "A type of aircraft which derives both lift and propulsion from one or more sets of horizontally revolving overhead rotors.",
    "definitionVn": "máy bay trực thăng cánh quạt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "The rescue helicopter airlifted the stranded mountaineer directly to the regional trauma hospital.",
      "Helicopter sightseeing flights offer sweeping aerial panoramas of the Grand Canyon."
    ],
    "exampleTranslations": [
      "Trực thăng cứu hộ đã vận chuyển người leo núi mắc kẹt thẳng tới bệnh viện chấn thương khu vực.",
      "Các chuyến bay ngắm cảnh bằng trực thăng mang đến toàn cảnh từ trên không tuyệt đẹp của hẻm núi Grand Canyon."
    ],
    "synonyms": [
      "chopper",
      "rotorcraft"
    ],
    "antonyms": []
  },
  {
    "id": "bv_transp_24",
    "word": "scooter",
    "phonetic": "/ˈskuː.t̬ɚ/",
    "definition": "A light two-wheeled road vehicle with an engine or electric battery and a low footboard.",
    "definitionVn": "xe tay ga, xe máy điện gọn nhẹ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Renting an electric scooter is an eco-friendly and fun method for navigating downtown alleys.",
      "Many urban commuters prefer automatic motor scooters to navigate congested traffic smoothly."
    ],
    "exampleTranslations": [
      "Thuê một chiếc xe tay ga điện là một phương pháp thân thiện với môi trường và thú vị để khám phá các con hẻm trung tâm thành phố.",
      "Nhiều người đi làm ở đô thị thích xe máy tay ga tự động để vượt qua dòng xe cộ tắc nghẽn một cách êm ái."
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
    "phonetic": "/ˈæm.bjə.ləns/",
    "definition": "A vehicle equipped for taking sick or injured people to and from hospital, especially in emergencies.",
    "definitionVn": "xe cứu thương chuyên dụng đưa bệnh nhân đi cấp cứu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_transportation",
    "themeNameVn": "Phương tiện giao thông",
    "themeNameEn": "Vehicles & Transport",
    "examples": [
      "Motorists must pull over immediately when an ambulance approaches with sounding sirens and flashing beacons.",
      "Paramedics inside the ambulance administered oxygen and stabilized the patient during transit."
    ],
    "exampleTranslations": [
      "Người lái xe phải tấp vào lề ngay lập tức khi xe cứu thương đến gần với tiếng còi hú và đèn nhấp nháy.",
      "Các nhân viên y tế bên trong xe cứu thương đã cung cấp oxy và làm ổn định tình trạng bệnh nhân trong quá trình vận chuyển."
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
