import { ReadingPassage } from "./types";

export const passage_r3: ReadingPassage = {
  "id": "r3",
  "title": "Flight Delay and Gate Change Notice",
  "category": "Travel",
  "level": "A1",
  "icon": "✈️",
  "coverImage": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80",
  "duration": "3 min",
  "wordCount": 105,
  "passage": "Attention all passengers traveling on SkyWings Flight SW-428 to Chicago O'Hare:\n\nDue to severe weather conditions along the flight route, Departure Flight SW-428 originally scheduled for 4:15 PM has been delayed by 45 minutes. The estimated departure time is now 5:00 PM.\n\nAdditionally, please note that the departure gate has been moved from Gate B12 to Gate C08 in Terminal 2. Boarding will begin at 4:35 PM.\n\nPassengers requiring special assistance or traveling with small children are requested to board first. Complimentary beverage vouchers can be claimed at the Customer Service Desk near Gate C02.\n\nWe apologize for any inconvenience caused.",
  "translation": "Xin hành khách trên chuyến bay SkyWings SW-428 đi Chicago O'Hare lưu ý:\n\nDo điều kiện thời tiết xấu dọc đường bay, Chuyến bay SW-428 khởi hành ban đầu lúc 4:15 chiều bị hoãn 45 phút. Giờ khởi hành dự kiến mới là 5:00 chiều.\n\nNgoài ra, cửa khởi hành đã được chuyển từ Cổng B12 sang Cổng C08 tại Nhà ga số 2. Việc lên máy bay sẽ bắt đầu lúc 4:35 chiều.\n\nHành khách cần hỗ trợ đặc biệt hoặc đi cùng trẻ nhỏ được ưu tiên lên trước. Phiếu đồ uống miễn phí có thể nhận tại Quầy Chăm sóc Khách hàng gần Cổng C02.\n\nChúng tôi thành thật xin lỗi vì sự bất tiện này.",
  "vocabularies": [
    {
      "word": "delay",
      "ipa": "/dɪˈleɪ/",
      "pos": "v, n",
      "meaning": "trì hoãn, chậm trễ"
    },
    {
      "word": "assistance",
      "ipa": "/əˈsɪstəns/",
      "pos": "n",
      "meaning": "sự hỗ trợ, giúp đỡ"
    },
    {
      "word": "complimentary",
      "ipa": "/ˌkɒmplɪˈmentri/",
      "pos": "adj",
      "meaning": "miễn phí (quà tặng kèm)"
    },
    {
      "word": "voucher",
      "ipa": "/ˈvaʊtʃər/",
      "pos": "n",
      "meaning": "phiếu ưu đãi, phiếu đổi thưởng"
    }
  ],
  "questions": [
    {
      "id": "q3_1",
      "text": "What is the primary message of this airport announcement?",
      "options": [
        "Flight SW-428 has been delayed and moved to a different gate",
        "All flights to Chicago have been permanently cancelled",
        "Terminal 2 is undergoing emergency maintenance",
        "Passengers must collect their checked baggage immediately"
      ],
      "correct": 0,
      "explanation": "Thông báo tập trung vào việc chuyến bay SW-428 đi Chicago O'Hare bị trễ giờ khởi hành và thay đổi cửa ra máy bay: 'Flight SW-428... has been delayed by 45 minutes... departure gate has been moved from Gate B12 to Gate C08 in Terminal 2.'"
    },
    {
      "id": "q3_2",
      "text": "What caused the departure delay of Flight SW-428?",
      "options": [
        "Mechanical engine failure on the aircraft",
        "Severe weather conditions along the flight route",
        "Airport staff strikes in Chicago",
        "Air traffic control radar failure"
      ],
      "correct": 1,
      "explanation": "Lý do chậm chuyến bay được công bố: 'Due to severe weather conditions along the flight route, Departure Flight SW-428 originally scheduled for 4:15 PM has been delayed by 45 minutes.'"
    },
    {
      "id": "q3_3",
      "text": "What is the new estimated departure time for this flight?",
      "options": [
        "4:35 PM",
        "4:45 PM",
        "5:00 PM",
        "5:15 PM"
      ],
      "correct": 2,
      "explanation": "Thời gian khởi hành mới dự kiến: 'The estimated departure time is now 5:00 PM.' (Giờ lên máy bay boarding là 4:35 PM, còn cất cánh ước tính là 5:00 PM)."
    },
    {
      "id": "q3_4",
      "text": "In the announcement, the word 'complimentary' is closest in meaning to:",
      "options": [
        "expensive",
        "free of charge",
        "mandatory",
        "reserved"
      ],
      "correct": 1,
      "explanation": "Từ 'complimentary' trong ngành dịch vụ có nghĩa là miễn phí. 'Complimentary beverage vouchers' là phiếu đồ uống miễn phí để đền bù việc hành khách phải chờ đợi."
    },
    {
      "id": "q3_5",
      "text": "Where can delayed passengers claim their complimentary beverage vouchers?",
      "options": [
        "At Gate B12 in Terminal 1",
        "Inside the airline departure lounge",
        "At the Customer Service Desk near Gate C02",
        "Directly from flight attendants upon boarding"
      ],
      "correct": 2,
      "explanation": "Địa điểm nhận phiếu đồ uống: 'Complimentary beverage vouchers can be claimed at the Customer Service Desk near Gate C02.'"
    }
  ]};
