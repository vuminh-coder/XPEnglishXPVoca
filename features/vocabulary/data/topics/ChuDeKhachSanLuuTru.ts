import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 55: Khách sạn & Lưu trú (Hotel & Lodging)
 * Mã chủ đề: t_basic_hotel_accommodation
 * Tổng số từ vựng: 20 từ
 */
export const THEME_KHACH_SAN_LUU_TRU: BasicTheme = {
  "id": "t_basic_hotel_accommodation",
  "name": "Khách sạn & Lưu trú",
  "nameEn": "Hotel & Lodging",
  "icon": "🏨",
  "difficulty": 1,
  "color": "#3b82f6",
  "description": "Phòng khách sạn, thẻ từ, lễ tân, sảnh lớn, thang máy, nhận phòng và trả phòng.",
  "totalVocabs": 20
};

export const VOCABS_KHACH_SAN_LUU_TRU: BasicVocabularyItem[] = [
  {
    "id": "bv_hotel__01",
    "word": "hotel",
    "phonetic": "/hoʊˈtel/",
    "definition": "An establishment providing accommodation, meals, and other services for travelers.",
    "definitionVn": "khách sạn (lưu trú)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "We booked a cozy beachfront boutique hotel in Da Nang.",
      "The hotel offers complimentary high-speed Wi-Fi."
    ],
    "exampleTranslations": [
      "Chúng tôi đã đặt một khách sạn nhỏ xinh ven biển ở Đà Nẵng.",
      "Khách sạn cung cấp Wi-Fi tốc độ cao miễn phí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__02",
    "word": "hostel",
    "phonetic": "/ˈhɑːstl/",
    "definition": "An establishment which provides inexpensive food and lodging for a specific group of people, such as students or backpackers.",
    "definitionVn": "nhà nghỉ tập thể, hostel giá rẻ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Backpackers love staying in friendly, budget-friendly youth hostels.",
      "The hostel common room is great for meeting travelers."
    ],
    "exampleTranslations": [
      "Dân du lịch bụi rất thích ở những nhà nghỉ thanh niên thân thiện, giá rẻ.",
      "Phòng sinh hoạt chung của hostel rất tuyệt để kết bạn bốn phương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__03",
    "word": "resort",
    "phonetic": "/rɪˈzɔːrt/",
    "definition": "A place that is a popular destination for vacations or recreation.",
    "definitionVn": "khu nghỉ dưỡng cao cấp, resort",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "The luxury beach resort features private villas and infinity pools.",
      "Relax completely at an eco-friendly tropical resort."
    ],
    "exampleTranslations": [
      "Khu nghỉ dưỡng bãi biển cao cấp có các biệt thự riêng và hồ bơi vô cực.",
      "Thư giãn hoàn toàn tại một resort nhiệt đới thân thiện với môi trường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__04",
    "word": "room",
    "phonetic": "/ruːm/",
    "definition": "A space that can be occupied which is partitioned in a hotel.",
    "definitionVn": "phòng khách sạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Our hotel room has a magnificent panoramic sea view.",
      "Keep your room keycard safe in your wallet."
    ],
    "exampleTranslations": [
      "Phòng khách sạn của chúng tôi có tầm nhìn toàn cảnh biển tuyệt đẹp.",
      "Giữ thẻ từ phòng khách sạn an toàn trong ví nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__05",
    "word": "suite",
    "phonetic": "/swiːt/",
    "definition": "A set of connected rooms, especially in a hotel, forming one comprehensive unit.",
    "definitionVn": "phòng suite hạng sang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "The executive ocean suite includes a separate living room and terrace.",
      "The presidential suite is furnished with luxury decor."
    ],
    "exampleTranslations": [
      "Phòng suite hạng thương gia hướng biển có phòng khách riêng và sân hiên.",
      "Phòng tổng thống được trang bị nội thất xa hoa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__06",
    "word": "single room",
    "phonetic": "/ˈsɪŋɡl ruːm/",
    "definition": "A hotel room designed for one person, with a single bed.",
    "definitionVn": "phòng đơn (cho 1 người)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "I booked a quiet single room for my business trip.",
      "Single rooms come with an en-suite private bathroom."
    ],
    "exampleTranslations": [
      "Tôi đã đặt một phòng đơn yên tĩnh cho chuyến công tác của mình.",
      "Phòng đơn có sẵn phòng tắm riêng khép kín."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__07",
    "word": "double room",
    "phonetic": "/ˈdʌbl ruːm/",
    "definition": "A hotel room designed for two people, typically with a double bed.",
    "definitionVn": "phòng đôi (cho 2 người)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "The couple stayed in a comfortable double room.",
      "Double rooms feature a king-size bed and scenic balcony."
    ],
    "exampleTranslations": [
      "Đôi vợ chồng nghỉ tại một phòng đôi tiện nghi.",
      "Phòng đôi có giường cỡ lớn và ban công ngắm cảnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__08",
    "word": "keycard",
    "phonetic": "/ˈkiːkɑːrd/",
    "definition": "A plastic card with a magnetic strip or chip for opening a hotel door.",
    "definitionVn": "thẻ từ mở cửa phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Tap your electronic keycard on the door sensor to enter.",
      "Insert the keycard in the slot to turn on the room lights."
    ],
    "exampleTranslations": [
      "Chạm thẻ từ điện tử lên cảm biến cửa để vào phòng nhé.",
      "Cắm thẻ từ vào khe cắm để bật đèn trong phòng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__09",
    "word": "reception",
    "phonetic": "/rɪˈsepʃn/",
    "definition": "The area in a hotel where guests are received and reservations handled.",
    "definitionVn": "quầy lễ tân (khách sạn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Please report to the front reception desk for check-in.",
      "The 24-hour reception staff speaks fluent English."
    ],
    "exampleTranslations": [
      "Vui lòng đến quầy lễ tân phía trước để làm thủ tục nhận phòng nhé.",
      "Nhân viên lễ tân trực 24/7 nói tiếng Anh rất lưu loát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__10",
    "word": "lobby",
    "phonetic": "/ˈlɑːbi/",
    "definition": "A room providing a space out of which one or more other rooms or corridors lead; an entrance hall.",
    "definitionVn": "sảnh lớn (khách sạn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "We waited in the comfortable hotel lobby for our tour bus.",
      "The grand lobby is decorated with fresh lotus flowers."
    ],
    "exampleTranslations": [
      "Chúng tôi đã ngồi đợi ở sảnh khách sạn tiện nghi cho chuyến xe du lịch.",
      "Sảnh lớn trang hoàng lộng lẫy bằng những bông hoa sen tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__11",
    "word": "elevator",
    "phonetic": "/ˈelɪveɪtər/",
    "definition": "A platform or compartment housed in a shaft for raising and lowering people between floors.",
    "definitionVn": "thang máy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Take the glass elevator up to the 15th floor.",
      "Press the elevator call button to go up."
    ],
    "exampleTranslations": [
      "Đi thang máy kính lên tầng 15 nhé.",
      "Nhấn nút gọi thang máy để đi lên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__12",
    "word": "stairs",
    "phonetic": "/sterz/",
    "definition": "A set of steps leading from one floor of a building to another.",
    "definitionVn": "cầu thang bộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Walking up the stairs is great daily cardio exercise.",
      "Emergency fire escape stairs are located at the end of the hall."
    ],
    "exampleTranslations": [
      "Đi bộ lên cầu thang là bài tập tim mạch tuyệt vời hàng ngày.",
      "Cầu thang thoát hiểm khẩn cấp nằm ở cuối hành lang."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__13",
    "word": "bellboy",
    "phonetic": "/ˈbelbɔɪ/",
    "definition": "An attendant in a hotel who carries luggage and does errands for guests.",
    "definitionVn": "nhân viên mang vác hành lý, phụ việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "The polite bellboy helped carry our heavy luggage to the room.",
      "Tip the bellboy for his courteous assistance."
    ],
    "exampleTranslations": [
      "Người phụ việc lịch sự đã giúp mang hành lý nặng lên tận phòng cho chúng tôi.",
      "Gửi tiền tip cho người phụ việc vì sự hỗ trợ ân cần của anh ấy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__14",
    "word": "housekeeping",
    "phonetic": "/ˈhaʊskiːpɪŋ/",
    "definition": "The department that maintains the cleanliness and tidiness of hotel rooms.",
    "definitionVn": "bộ phận buồng phòng, dọn phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Housekeeping provides fresh clean towels and bed sheets daily.",
      "Hang the 'Do Not Disturb' sign if you do not need housekeeping."
    ],
    "exampleTranslations": [
      "Bộ phận buồng phòng cung cấp khăn tắm sạch và ga trải giường mới mỗi ngày.",
      "Treo biển 'Xin đừng làm phiền' nếu bạn không cần dọn phòng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__15",
    "word": "check-in",
    "phonetic": "/ˈtʃek ɪn/",
    "definition": "The process of registering on arrival at a hotel.",
    "definitionVn": "nhận phòng, làm thủ tục vào ở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Hotel standard check-in time is at 2:00 PM.",
      "Present your passport and reservation voucher at check-in."
    ],
    "exampleTranslations": [
      "Thời gian nhận phòng tiêu chuẩn của khách sạn là lúc 2h chiều.",
      "Xuất trình hộ chiếu và phiếu đặt phòng khi làm thủ tục nhận phòng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__16",
    "word": "check-out",
    "phonetic": "/ˈtʃek aʊt/",
    "definition": "The process of paying one's bill and leaving a hotel.",
    "definitionVn": "trả phòng, thanh toán rời đi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Check-out time is before 12:00 PM on the day of departure.",
      "Return your room keycards at the reception counter during check-out."
    ],
    "exampleTranslations": [
      "Thời gian trả phòng là trước 12h trưa trong ngày khởi hành.",
      "Gửi lại thẻ từ mở cửa tại quầy lễ tân khi làm thủ tục trả phòng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__17",
    "word": "bill",
    "phonetic": "/bɪl/",
    "definition": "A printed statement of the money owed for goods or services.",
    "definitionVn": "hóa đơn thanh toán (tiền phòng/dịch vụ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "Review your itemized hotel bill before settling payment.",
      "You can charge dinner meals to your room bill."
    ],
    "exampleTranslations": [
      "Kiểm tra kỹ hóa đơn phòng chi tiết trước khi thanh toán nhé.",
      "Bạn có thể tính tiền các bữa ăn tối vào hóa đơn phòng của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__18",
    "word": "reservation",
    "phonetic": "/ˌrezərˈveɪʃn/",
    "definition": "An arrangement by which accommodation, meals, or travel tickets are secured in advance.",
    "definitionVn": "sự đặt phòng trước, đặt chỗ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "I have a hotel room reservation under the name Vu Minh.",
      "Book your room in advance during high tourist season."
    ],
    "exampleTranslations": [
      "Tôi có một phòng đã đặt trước dưới tên Vũ Minh.",
      "Hãy đặt phòng trước trong mùa du lịch cao điểm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__19",
    "word": "comfortable",
    "phonetic": "/ˈkʌmftəbl/",
    "definition": "Providing physical ease and relaxation.",
    "definitionVn": "tiện nghi, êm ái thoải mái",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "The hotel bed is spacious, soft, and extremely comfortable.",
      "Enjoy a comfortable and restful night's sleep."
    ],
    "exampleTranslations": [
      "Giường khách sạn rộng rãi, mềm mại và vô cùng êm ái.",
      "Chúc bạn có một giấc ngủ đêm êm ái và phục hồi sức khỏe nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hotel__20",
    "word": "stay",
    "phonetic": "/steɪ/",
    "definition": "Live somewhere temporarily as a visitor or guest.",
    "definitionVn": "lưu trú, kỳ nghỉ lại",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hotel_accommodation",
    "themeNameVn": "Khách sạn & Lưu trú",
    "themeNameEn": "Hotel & Lodging",
    "examples": [
      "We plan to stay in Hoi An for three unforgettable nights.",
      "How was your stay at our seaside hotel?"
    ],
    "exampleTranslations": [
      "Chúng tôi dự định lưu trú tại Hội An trong ba đêm khó quên.",
      "Kỳ nghỉ lưu trú của quý khách tại khách sạn ven biển thế nào ạ?"
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_KHACH_SAN_LUU_TRU: VocabularyTopicPackage = {
  theme: THEME_KHACH_SAN_LUU_TRU,
  vocabs: VOCABS_KHACH_SAN_LUU_TRU,
};

export default CHUDE_KHACH_SAN_LUU_TRU;
