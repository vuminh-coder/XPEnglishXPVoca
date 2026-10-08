import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 10: Thời gian & Lịch (Time, Days & Seasons)
 * Mã chủ đề: t_basic_time_calendar
 * Tổng số từ vựng: 22 từ
 */
export const THEME_THOI_GIAN_LICH: BasicTheme = {
  "id": "t_basic_time_calendar",
  "name": "Thời gian & Lịch",
  "nameEn": "Time, Days & Seasons",
  "icon": "📅",
  "difficulty": 1,
  "color": "#06b6d4",
  "description": "Giờ giấc, các buổi trong ngày, thứ trong tuần, tháng và 4 mùa.",
  "totalVocabs": 22
};

export const VOCABS_THOI_GIAN_LICH: BasicVocabularyItem[] = [
  {
    "id": "bv_time_c_01",
    "word": "time",
    "phonetic": "/taɪm/",
    "definition": "The indefinite continued progress of existence.",
    "definitionVn": "thời gian, giờ giấc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "What time is it now? — It is 8:00 AM.",
      "Spend time studying English every day."
    ],
    "exampleTranslations": [
      "Bây giờ là mấy giờ? — 8h sáng.",
      "Dành thời gian học tiếng Anh mỗi ngày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_02",
    "word": "now",
    "phonetic": "/naʊ/",
    "definition": "At the present time or moment.",
    "definitionVn": "bây giờ, ngay lúc này",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "We are ready to start now.",
      "Where are you living now?"
    ],
    "exampleTranslations": [
      "Chúng ta sẵn sàng bắt đầu ngay bây giờ.",
      "Bây giờ bạn đang sống ở đâu?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_03",
    "word": "today",
    "phonetic": "/təˈdeɪ/",
    "definition": "On or in the course of this present day.",
    "definitionVn": "hôm nay (ngày hiện tại)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Today is a great day to learn.",
      "What are your plans for today?"
    ],
    "exampleTranslations": [
      "Hôm nay là ngày tuyệt vời để học tập.",
      "Kế hoạch hôm nay của bạn là gì?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_04",
    "word": "tomorrow",
    "phonetic": "/təˈmɑːroʊ/",
    "definition": "On the day after today.",
    "definitionVn": "ngày mai (ngày kế tiếp)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "See you tomorrow morning at 8!",
      "I have an exam tomorrow."
    ],
    "exampleTranslations": [
      "Hẹn gặp lại sáng mai lúc 8h nhé!",
      "Ngày mai tôi có bài thi."
    ],
    "synonyms": [],
    "antonyms": [
      "yesterday"
    ]
  },
  {
    "id": "bv_time_c_05",
    "word": "yesterday",
    "phonetic": "/ˈjestərdeɪ/",
    "definition": "On the day before today.",
    "definitionVn": "hôm qua (ngày đã qua)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "I visited grandparents yesterday.",
      "Yesterday was rainy."
    ],
    "exampleTranslations": [
      "Hôm qua tôi đi thăm ông bà.",
      "Hôm qua trời mưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_06",
    "word": "morning",
    "phonetic": "/ˈmɔːrnɪŋ/",
    "definition": "The period between sunrise and noon.",
    "definitionVn": "buổi sáng (từ rạng đông đến trưa)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "I jog in the fresh morning air.",
      "She drinks warm tea in the morning."
    ],
    "exampleTranslations": [
      "Tôi chạy bộ trong sớm mai.",
      "Cô ấy uống trà ấm vào buổi sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_07",
    "word": "afternoon",
    "phonetic": "/ˌæftərˈnuːn/",
    "definition": "The time from noon until evening.",
    "definitionVn": "buổi chiều (từ trưa đến tối)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Let's meet tomorrow afternoon.",
      "I usually study in the afternoon."
    ],
    "exampleTranslations": [
      "Hãy gặp nhau vào chiều mai nhé.",
      "Tôi thường học bài vào buổi chiều."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_08",
    "word": "evening",
    "phonetic": "/ˈiːvnɪŋ/",
    "definition": "The period between afternoon and night.",
    "definitionVn": "buổi tối (sau 6h chiều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "We have dinner together in the evening.",
      "Have a pleasant evening!"
    ],
    "exampleTranslations": [
      "Chúng tôi ăn tối cùng nhau vào buổi tối.",
      "Chúc bạn một buổi tối vui vẻ!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_09",
    "word": "night",
    "phonetic": "/naɪt/",
    "definition": "The period of darkness from sunset to sunrise.",
    "definitionVn": "ban đêm, đêm muộn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Stars shine in the night sky.",
      "Good night and sleep well!"
    ],
    "exampleTranslations": [
      "Các vì sao tỏa sáng trên bầu trời đêm.",
      "Chúc ngủ ngon và ngủ thật ngon nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_10",
    "word": "hour",
    "phonetic": "/ˈaʊər/",
    "definition": "A period of sixty minutes.",
    "definitionVn": "giờ, tiếng đồng hồ (60 phút)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "The flight takes two hours.",
      "I practice English one hour every day."
    ],
    "exampleTranslations": [
      "Chuyến bay kéo dài hai tiếng.",
      "Tôi luyện tiếng Anh một tiếng mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_11",
    "word": "minute",
    "phonetic": "/ˈmɪnɪt/",
    "definition": "A period of sixty seconds.",
    "definitionVn": "phút (60 giây)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Wait for me for five minutes.",
      "The lesson starts in ten minutes."
    ],
    "exampleTranslations": [
      "Đợi tôi năm phút nhé.",
      "Bài học bắt đầu trong mười phút nữa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_12",
    "word": "day",
    "phonetic": "/deɪ/",
    "definition": "A period of 24 hours.",
    "definitionVn": "ngày (24 giờ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Have a wonderful day!",
      "There are seven days in a week."
    ],
    "exampleTranslations": [
      "Chúc một ngày tuyệt vời!",
      "Có bảy ngày trong một tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_13",
    "word": "week",
    "phonetic": "/wiːk/",
    "definition": "A period of seven days.",
    "definitionVn": "tuần lễ (7 ngày)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "I practice speaking three times a week.",
      "Next week we go on vacation."
    ],
    "exampleTranslations": [
      "Tôi luyện nói ba lần một tuần.",
      "Tuần tới chúng tôi đi nghỉ mát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_14",
    "word": "month",
    "phonetic": "/mʌnθ/",
    "definition": "Each of the twelve named periods into which a year is divided.",
    "definitionVn": "tháng (trong năm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "There are twelve months in a year.",
      "My birthday is next month."
    ],
    "exampleTranslations": [
      "Có mười hai tháng trong một năm.",
      "Sinh nhật của tôi vào tháng sau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_15",
    "word": "year",
    "phonetic": "/jɪr/",
    "definition": "The time taken by the earth to make one revolution around the sun (365 days).",
    "definitionVn": "năm (365 ngày)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Happy New Year everyone!",
      "I have studied English for three years."
    ],
    "exampleTranslations": [
      "Chúc mừng năm mới mọi người!",
      "Tôi đã học tiếng Anh được ba năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_16",
    "word": "weekend",
    "phonetic": "/ˈwiːkend/",
    "definition": "Saturday and Sunday, when most people do not work.",
    "definitionVn": "cuối tuần (thứ Bảy & Chủ Nhật)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "What are you doing this weekend?",
      "We love relaxing on the weekend."
    ],
    "exampleTranslations": [
      "Cuối tuần này bạn làm gì?",
      "Chúng tôi thích thư giãn vào cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_17",
    "word": "Monday",
    "phonetic": "/ˈmʌndeɪ/",
    "definition": "The first day of the working week.",
    "definitionVn": "thứ Hai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "School starts on Monday morning.",
      "I have an English test this Monday."
    ],
    "exampleTranslations": [
      "Trường học bắt đầu vào sáng thứ Hai.",
      "Tôi có bài thi tiếng Anh vào thứ Hai này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_18",
    "word": "Friday",
    "phonetic": "/ˈfraɪdeɪ/",
    "definition": "The day of the week before Saturday.",
    "definitionVn": "thứ Sáu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Thank goodness it's Friday!",
      "We are having a team dinner on Friday."
    ],
    "exampleTranslations": [
      "Thật tuyệt vời vì hôm nay đã là thứ Sáu!",
      "Chúng tôi có buổi liên hoan vào thứ Sáu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_19",
    "word": "Saturday",
    "phonetic": "/ˈsætərdeɪ/",
    "definition": "The day of the week between Friday and Sunday.",
    "definitionVn": "thứ Bảy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "We go swimming every Saturday morning.",
      "Saturday night is great for movie watching."
    ],
    "exampleTranslations": [
      "Chúng tôi đi bơi vào mỗi sáng thứ Bảy.",
      "Tối thứ Bảy rất tuyệt để xem phim."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_20",
    "word": "Sunday",
    "phonetic": "/ˈsʌndeɪ/",
    "definition": "The day of the week after Saturday, regarded as a day of rest.",
    "definitionVn": "Chủ Nhật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Sunday is a relaxing family day.",
      "We go to the church or park on Sunday."
    ],
    "exampleTranslations": [
      "Chủ Nhật là ngày nghỉ ngơi của gia đình.",
      "Chúng tôi đi dạo công viên vào Chủ Nhật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_21",
    "word": "summer",
    "phonetic": "/ˈsʌmər/",
    "definition": "The warmest season of the year.",
    "definitionVn": "mùa hè, mùa hạ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "Summer is great for beach vacations.",
      "Students enjoy their summer break."
    ],
    "exampleTranslations": [
      "Mùa hè rất tuyệt để đi biển nghỉ mát.",
      "Học sinh tận hưởng kỳ nghỉ hè."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_time_c_22",
    "word": "winter",
    "phonetic": "/ˈwɪntər/",
    "definition": "The coldest season of the year.",
    "definitionVn": "mùa đông, mùa đông giá rét",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_time_calendar",
    "themeNameVn": "Thời gian & Lịch",
    "themeNameEn": "Time, Days & Seasons",
    "examples": [
      "We wear cozy warm sweaters in the winter.",
      "Winter brings snow in temperate countries."
    ],
    "exampleTranslations": [
      "Chúng tôi mặc áo len ấm áp vào mùa đông.",
      "Mùa đông mang tuyết rơi ở các xứ ôn đới."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_THOI_GIAN_LICH: VocabularyTopicPackage = {
  theme: THEME_THOI_GIAN_LICH,
  vocabs: VOCABS_THOI_GIAN_LICH,
};

export default CHUDE_THOI_GIAN_LICH;
