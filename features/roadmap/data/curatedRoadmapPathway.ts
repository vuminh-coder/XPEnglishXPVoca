import { ZiczacPathStep, ZiczacUnitGroup } from "../types";

export interface UnitCurriculumConfig {
  unitNumber: number;
  themeId: string;
  themeIcon: string;
  title: string;
  titleEn: string;
  subtitle: string;
  colorTheme: "blue" | "emerald" | "purple" | "amber" | "rose";
  grammarTip: string;
  objectives: string[];
  keyPhrases: { phrase: string; translation: string }[];
}

/**
 * 24 Flagship Vocabulary Thematic Units
 * Sourced directly from our repository (features/vocabulary/data/topics/)
 * Divided across 4 pedagogical progression sections:
 * - Section 1 (A1 Starter): Units 1 - 6
 * - Section 2 (A1+ Explorer): Units 7 - 12
 * - Section 3 (A2 Connector): Units 13 - 18
 * - Section 4 (A2+ Champion): Units 19 - 24
 */
export const UNIT_CURRICULUM_CONFIGS: UnitCurriculumConfig[] = [
  // =========================================================================
  // PHẦN 1: NHẬP MÔN & GIAO TIẾP NỀN TẢNG (A1 Starter - Units 1 to 6)
  // =========================================================================
  {
    unitNumber: 1,
    themeId: "t_basic_greetings",
    themeIcon: "👋",
    title: "Chào Hỏi & Giao Tiếp Lịch Sự",
    titleEn: "Greetings & Polite Communication",
    subtitle: "Nạp 30 từ vựng chào hỏi, đại từ nhân xưng & cấu trúc mở đầu hội thoại lịch thiệp",
    colorTheme: "blue",
    grammarTip:
      "Đại từ nhân xưng (I, You, We, They, He, She, It) & Động từ To Be (am/is/are). Sử dụng 'am' với I, 'is' với He/She/It và danh từ số ít, 'are' với You/We/They và danh từ số nhiều.",
    objectives: [
      "Nắm vững 30 từ vựng và mẫu câu chào hỏi thông dụng nhất.",
      "Phản xạ nối cặp từ chào hỏi Anh - Việt dưới 2 giây.",
      "Ghép câu chào hỏi và hỏi thăm sức khỏe chuẩn trật tự từ.",
      "Nghe đàm thoại và phân biệt cách chào thân mật và trang trọng.",
    ],
    keyPhrases: [
      { phrase: "Nice to meet you", translation: "Rất vui được gặp bạn" },
      { phrase: "How are you doing?", translation: "Dạo này bạn thế nào?" },
      { phrase: "Have a great day!", translation: "Chúc bạn một ngày tuyệt vời!" },
      { phrase: "See you later", translation: "Hẹn gặp lại bạn sau" },
    ],
  },
  {
    unitNumber: 2,
    themeId: "t_basic_introductions",
    themeIcon: "👤",
    title: "Giới Thiệu Bản Thân & Đại Từ",
    titleEn: "Self Introduction & Personal Pronouns",
    subtitle: "Làm chủ đại từ sở hữu, mẫu câu giới thiệu tên tuổi, quê quán và quốc tịch",
    colorTheme: "emerald",
    grammarTip:
      "Câu hỏi thông tin cá nhân: 'What is your name?', 'Where are you from?', 'How old are you?'. Sử dụng giới từ 'from' khi nói về xuất xứ và 'in' khi nói về địa điểm sinh sống.",
    objectives: [
      "Thuộc 30 từ vựng về thông tin cá nhân và đại từ nhân xưng.",
      "Nối nhanh các cặp đại từ chủ ngữ, tân ngữ và tính từ sở hữu.",
      "Ghép hoàn chỉnh đoạn tự giới thiệu bản thân 3 câu chuẩn ngữ pháp.",
      "Luyện nói Shadowing câu giới thiệu bản thân tự nhiên và tự tin.",
    ],
    keyPhrases: [
      { phrase: "I come from Vietnam", translation: "Tôi đến từ Việt Nam" },
      { phrase: "I am twenty years old", translation: "Tôi hai mươi tuổi" },
      { phrase: "My native language is Vietnamese", translation: "Tiếng mẹ đẻ của tôi là tiếng Việt" },
      { phrase: "Pleased to make your acquaintance", translation: "Hân hạnh được làm quen với bạn" },
    ],
  },
  {
    unitNumber: 3,
    themeId: "t_basic_numbers",
    themeIcon: "🔢",
    title: "Số Đếm, Tuổi Tác & Thời Gian",
    titleEn: "Numbers, Age & Telling Time",
    subtitle: "Nắm chắc số đếm, số thứ tự, cách đọc số điện thoại và diễn đạt thời gian chính xác",
    colorTheme: "amber",
    grammarTip:
      "Phân biệt số đếm (one, two, three) dùng để đếm số lượng và số thứ tự (first, second, third) dùng cho ngày tháng, số thứ tự và tầng nhà. Cách nói giờ hơn dùng 'past', giờ kém dùng 'to'.",
    objectives: [
      "Thành thạo 35 từ vựng số đếm, số thứ tự và mốc thời gian.",
      "Phản xạ nối số với cách đọc tiếng Anh không bị nhầm lẫn đuôi -teen và -ty.",
      "Ghép câu hỏi giờ và thông báo thời gian họp, học tập.",
      "Nghe chính tả bắt số điện thoại và mốc thời gian chuẩn xác 100%.",
    ],
    keyPhrases: [
      { phrase: "What time is it?", translation: "Bây giờ là mấy giờ rồi?" },
      { phrase: "It is half past eight", translation: "Bây giờ là tám giờ rưỡi" },
      { phrase: "On the first of May", translation: "Vào ngày mùng một tháng Năm" },
      { phrase: "Ten minutes to nine", translation: "Chín giờ kém mười phút" },
    ],
  },
  {
    unitNumber: 4,
    themeId: "t_basic_colors_shapes",
    themeIcon: "🎨",
    title: "Màu Sắc & Nhận Diện Hình Khối",
    titleEn: "Colors & Geometric Shapes",
    subtitle: "Miêu tả trực quan đồ vật bằng màu sắc, sắc thái đậm nhạt và các hình khối cơ bản",
    colorTheme: "purple",
    grammarTip:
      "Vị trí của tính từ miêu tả: Tính từ luôn đứng trước danh từ ('a red apple', 'a round table') hoặc đứng sau động từ liên kết như to be, seem, look ('The sky is blue', 'It looks square').",
    objectives: [
      "Ghi nhớ 30 từ vựng chỉ màu sắc cơ bản, màu phối và hình khối học thuật.",
      "Nối từ siêu tốc giữa tên màu sắc/hình dạng với đồ vật đặc trưng.",
      "Ghép câu miêu tả đồ vật kết hợp cả màu sắc và hình dáng chuẩn thứ tự tính từ.",
      "Luyện nghe đàm thoại chọn đúng vật phẩm theo miêu tả màu sắc.",
    ],
    keyPhrases: [
      { phrase: "in bright colors", translation: "với màu sắc rực rỡ tươi sáng" },
      { phrase: "in the shape of a circle", translation: "có hình dạng một vòng tròn" },
      { phrase: "dark blue background", translation: "phông nền màu xanh đậm" },
      { phrase: "rectangular frame", translation: "khung hình chữ nhật" },
    ],
  },
  {
    unitNumber: 5,
    themeId: "t_basic_family",
    themeIcon: "👨‍👩‍👧",
    title: "Gia Đình & Người Thân",
    titleEn: "Family Members & Relatives",
    subtitle: "Học từ vựng xưng hô gia đình 3 thế hệ, cây phả hệ và tính từ sở hữu quan hệ thân tộc",
    colorTheme: "blue",
    grammarTip:
      "Sở hữu cách danh từ: Thêm ''s' sau danh từ số ít ('my brother's bike') và chỉ thêm dấu phẩy ''' sau danh từ số nhiều có đuôi -s ('my parents' house').",
    objectives: [
      "Nạp vững 35 từ vựng về các thành viên gia đình và mối quan hệ họ hàng.",
      "Nối cặp từ xưng hô tương ứng: cha-mẹ, anh-em, ông-bà.",
      "Ghép câu miêu tả nghề nghiệp và tính cách của các thành viên gia đình.",
      "Luyện đọc mẩu chuyện gia đình ấm áp và trả lời câu hỏi đọc hiểu.",
    ],
    keyPhrases: [
      { phrase: "nuclear family", translation: "gia đình hạt nhân (bố mẹ và con cái)" },
      { phrase: "take after someone", translation: "giống ai đó trong gia đình (ngoại hình/tính cách)" },
      { phrase: "close-knit family", translation: "gia đình gắn bó khăng khít" },
      { phrase: "grow up with", translation: "lớn lên cùng với ai đó" },
    ],
  },
  {
    unitNumber: 6,
    themeId: "t_basic_daily_verbs",
    themeIcon: "⏰",
    title: "Động Từ Sinh Hoạt Hằng Ngày",
    titleEn: "Daily Routines & Action Verbs",
    subtitle: "Làm chủ 35 động từ hành động tần suất cao nhất từ lúc thức dậy đến khi đi ngủ",
    colorTheme: "rose",
    grammarTip:
      "Thì Hiện tại đơn (Present Simple) diễn tả thói quen sinh hoạt lặp đi lặp lại. Chú ý thêm '-s' hoặc '-es' khi chủ ngữ là ngôi thứ ba số ít (he, she, it): 'He wakes up at 6 AM', 'She brushes her teeth'.",
    objectives: [
      "Nắm trọn 35 động từ sinh hoạt và cụm động từ thói quen hằng ngày.",
      "Nối nhanh hành động với khung giờ thích hợp trong ngày.",
      "Ghép câu lịch trình sinh hoạt một ngày hoàn chỉnh với trạng từ chỉ tần suất.",
      "Vượt qua Cột Mốc Đánh Giá kết thúc Phần 1 Khởi Đầu A1.",
    ],
    keyPhrases: [
      { phrase: "wake up early", translation: "thức dậy sớm vào buổi sáng" },
      { phrase: "brush my teeth", translation: "đánh răng vệ sinh cá nhân" },
      { phrase: "get dressed for work", translation: "thay đồ chuẩn bị đi làm" },
      { phrase: "go to bed on time", translation: "đi ngủ đúng giờ giấc" },
    ],
  },

  // =========================================================================
  // PHẦN 2: ĐỜI SỐNG, ẨM THỰC & MÔI TRƯỜNG QUANH TA (A1+ Explorer - Units 7 to 12)
  // =========================================================================
  {
    unitNumber: 7,
    themeId: "t_basic_home_objects",
    themeIcon: "🏠",
    title: "Nhà Cửa & Đồ Dùng Sinh Hoạt",
    titleEn: "House, Furniture & Home Appliances",
    subtitle: "Khám phá các gian phòng, nội thất, thiết bị gia dụng và giới từ chỉ vị trí trong nhà",
    colorTheme: "blue",
    grammarTip:
      "Cấu trúc 'There is / There are' kết hợp với giới từ nơi chốn (in, on, under, behind, next to). 'There is' dùng cho danh từ số ít hoặc không đếm được; 'There are' dùng cho danh từ số nhiều.",
    objectives: [
      "Học 30 từ vựng về các phòng trong nhà và đồ nội thất gia dụng.",
      "Nối đồ vật với đúng vị trí gian phòng tương ứng.",
      "Ghép câu miêu tả căn nhà mơ ước sử dụng There is / There are.",
      "Nghe đoạn đàm thoại tìm đồ vật bị thất lạc trong nhà.",
    ],
    keyPhrases: [
      { phrase: "feel right at home", translation: "cảm thấy thoải mái như ở nhà" },
      { phrase: "make yourself at home", translation: "cứ tự nhiên như ở nhà nhé" },
      { phrase: "do household chores", translation: "làm công việc nhà hằng ngày" },
      { phrase: "in the living room", translation: "ở ngay trong phòng khách" },
    ],
  },
  {
    unitNumber: 8,
    themeId: "t_basic_food_drinks",
    themeIcon: "🍔",
    title: "Ẩm Thực, Món Ăn & Thức Uống",
    titleEn: "Food, Cuisine & Beverages",
    subtitle: "Tự tin gọi món tại nhà hàng, gọi đồ uống và khám phá từ vựng ẩm thực phong phú",
    colorTheme: "emerald",
    grammarTip:
      "Danh từ đếm được (apple, egg) và không đếm được (water, rice, bread). Sử dụng 'How many' với danh từ đếm được số nhiều và 'How much' với danh từ không đếm được.",
    objectives: [
      "Nạp 35 từ vựng về các nhóm thực phẩm, món ăn và đồ uống thịnh hành.",
      "Nối món ăn với hương vị và đặc tính tương ứng.",
      "Ghép câu gọi món lịch sự trong nhà hàng với cấu trúc 'I would like...'.",
      "Luyện nghe đàm thoại tương tác với bồi bàn và yêu cầu thanh toán.",
    ],
    keyPhrases: [
      { phrase: "Can I see the menu, please?", translation: "Cho tôi xem thực đơn được không?" },
      { phrase: "I would like to order", translation: "Tôi muốn gọi món..." },
      { phrase: "Could we have the bill, please?", translation: "Làm ơn tính tiền giúp chúng tôi" },
      { phrase: "What do you recommend?", translation: "Bạn gợi ý món nào ngon nhất?" },
    ],
  },
  {
    unitNumber: 9,
    themeId: "t_basic_kitchen_utensils",
    themeIcon: "🍳",
    title: "Nấu Nướng & Dụng Cụ Bếp",
    titleEn: "Cooking Methods & Kitchenware",
    subtitle: "Học các phương pháp chế biến món ăn, dụng cụ làm bếp và câu mệnh lệnh hướng dẫn",
    colorTheme: "amber",
    grammarTip:
      "Câu mệnh lệnh (Imperatives) trong công thức nấu ăn: Sử dụng động từ nguyên thể không chia đứng đầu câu ('Boil the water', 'Chop the vegetables finely', 'Do not overcook').",
    objectives: [
      "Nắm 30 từ vựng về kỹ thuật nấu nướng và đồ dùng phòng bếp.",
      "Nối phương pháp chế biến (fry, bake, boil) với nguyên liệu phù hợp.",
      "Ghép câu hướng dẫn các bước thực hiện một công thức nấu ăn ngon.",
      "Luyện nói Shadowing các khẩu lệnh làm bếp cùng đầu bếp bản xứ.",
    ],
    keyPhrases: [
      { phrase: "cook a delicious meal", translation: "nấu một bữa ăn thơm ngon" },
      { phrase: "heat the pan on medium", translation: "làm nóng chảo ở mức lửa vừa" },
      { phrase: "cut into small pieces", translation: "cắt thành các miếng nhỏ vừa ăn" },
      { phrase: "stir frequently", translation: "khuấy đều tay liên tục" },
    ],
  },
  {
    unitNumber: 10,
    themeId: "t_basic_emotions_adjectives",
    themeIcon: "😊",
    title: "Cảm Xúc, Tâm Trạng & Tính Cách",
    titleEn: "Emotions, Feelings & Personality",
    subtitle: "Biểu đạt tâm tư tình cảm, cảm xúc nội tâm và nhận xét tính cách con người sâu sắc",
    colorTheme: "purple",
    grammarTip:
      "Phân biệt tính từ đuôi -ed và -ing: Tính từ đuôi '-ed' diễn tả cảm xúc của người trải nghiệm ('I feel excited'); tính từ đuôi '-ing' diễn tả tính chất của sự vật tạo ra cảm xúc đó ('The movie is exciting').",
    objectives: [
      "Thuộc 30 tính từ cảm xúc tích cực, tiêu cực và tính cách con người.",
      "Nối nhanh các cặp tính từ đồng nghĩa hoặc trái nghĩa về tâm trạng.",
      "Ghép câu chia sẻ tâm trạng và an ủi, động viên bạn bè.",
      "Đọc hiểu mẩu truyện ngắn về sự thấu hiểu cảm xúc trong tình bạn.",
    ],
    keyPhrases: [
      { phrase: "feel over the moon", translation: "vui sướng tột cùng, ngập tràn hạnh phúc" },
      { phrase: "under the weather", translation: "hơi mệt mỏi, khó ở trong người" },
      { phrase: "in high spirits", translation: "tinh thần phấn chấn, tràn đầy năng lượng" },
      { phrase: "calm down", translation: "bình tĩnh lại, hạ hỏa" },
    ],
  },
  {
    unitNumber: 11,
    themeId: "t_basic_time_calendar",
    themeIcon: "📅",
    title: "Thời Gian, Lịch Trình & Các Mùa",
    titleEn: "Calendar, Months & Four Seasons",
    subtitle: "Làm chủ thứ ngày tháng, 4 mùa trong năm và cách đặt lịch hẹn chuẩn xác",
    colorTheme: "blue",
    grammarTip:
      "Giới từ thời gian: Dùng 'at' với mốc giờ cụ thể ('at 7 o'clock'); 'on' với ngày trong tuần và ngày tháng cụ thể ('on Monday', 'on April 15th'); 'in' với tháng, năm, mùa và thế kỷ ('in May', 'in summer', 'in 2026').",
    objectives: [
      "Nắm trọn 30 từ vựng thứ ngày, 12 tháng và 4 mùa thiên nhiên.",
      "Phản xạ nối các tháng vào đúng mùa tương ứng trong năm.",
      "Ghép câu đặt lịch hẹn công việc và lên kế hoạch nghỉ lễ.",
      "Luyện nghe chính tả các thông báo đổi giờ họp và dời lịch trình.",
    ],
    keyPhrases: [
      { phrase: "at the weekend", translation: "vào dịp cuối tuần" },
      { phrase: "on Monday morning", translation: "vào sáng thứ Hai đầu tuần" },
      { phrase: "in the summer holiday", translation: "trong kỳ nghỉ hè" },
      { phrase: "around the clock", translation: "suốt ngày đêm, 24/7 liên tục" },
    ],
  },
  {
    unitNumber: 12,
    themeId: "t_basic_animals",
    themeIcon: "🐾",
    title: "Động Vật, Thú Cưng & Thiên Nhiên",
    titleEn: "Animals, Pets & Wildlife",
    subtitle: "Khám phá thế giới động vật muôn màu, thú cưng gia đình và bảo tồn thiên nhiên",
    colorTheme: "rose",
    grammarTip:
      "So sánh hơn và So sánh nhất: Tính từ ngắn thêm đuôi '-er/-est' ('faster than', 'the fastest'); tính từ dài dùng 'more... than' và 'the most...' ('more intelligent than', 'the most dangerous').",
    objectives: [
      "Học 35 từ vựng về động vật hoang dã, thú nuôi và môi trường sống.",
      "Nối tên con vật với tiếng kêu hoặc tập tính sinh thái.",
      "Ghép câu so sánh đặc điểm, kích thước và tốc độ giữa các loài vật.",
      "Chinh phục Cột Mốc Đánh Giá Tổng Hợp hoàn thành Phần 2 Khám Phá A1+.",
    ],
    keyPhrases: [
      { phrase: "man's best friend", translation: "người bạn tốt nhất của con người (chú chó)" },
      { phrase: "wild animals in nature", translation: "động vật hoang dã trong tự nhiên" },
      { phrase: "take good care of pets", translation: "chăm sóc chu đáo cho thú cưng" },
      { phrase: "endangered species", translation: "các loài động vật có nguy cơ tuyệt chủng" },
    ],
  },

  // =========================================================================
  // PHẦN 3: CON NGƯỜI, THÀNH PHỐ & XÃ HỘI (A2 Connector - Units 13 to 18)
  // =========================================================================
  {
    unitNumber: 13,
    themeId: "t_basic_body_parts",
    themeIcon: "💪",
    title: "Cơ Thể, Vóc Dáng & Ngoại Hình",
    titleEn: "Human Body, Health & Physical Appearance",
    subtitle: "Học từ vựng bộ phận cơ thể con người, chiều cao, vóc dáng và miêu tả khuôn mặt",
    colorTheme: "blue",
    grammarTip:
      "Cấu trúc miêu tả ngoại hình: Dùng 'have/has + danh từ' ('She has wavy hair and blue eyes'); dùng 'be + tính từ' ('He is tall and athletic').",
    objectives: [
      "Ghi nhớ 35 từ vựng về bộ phận cơ thể và đặc điểm diện mạo.",
      "Nối các giác quan và bộ phận cơ thể với chức năng sinh học.",
      "Ghép câu miêu tả nhận diện nhân vật chi tiết từ đầu đến chân.",
      "Luyện nghe đàm thoại nhận diện người qua miêu tả của cảnh sát hoặc bạn bè.",
    ],
    keyPhrases: [
      { phrase: "in good physical shape", translation: "có thể hình khỏe khoắn, cân đối" },
      { phrase: "tall and athletic", translation: "cao ráo và mang dáng dấp thể thao" },
      { phrase: "expressive eyes", translation: "đôi mắt có hồn, giàu biểu cảm" },
      { phrase: "from head to toe", translation: "từ đầu đến chân, toàn diện" },
    ],
  },
  {
    unitNumber: 14,
    themeId: "t_basic_clothes",
    themeIcon: "👕",
    title: "Trang Phục, Quần Áo & Phụ Kiện",
    titleEn: "Clothes, Fashion & Accessories",
    subtitle: "Làm chủ từ vựng thời trang, phụ kiện cá nhân, chọn size và thử đồ chuẩn gu",
    colorTheme: "emerald",
    grammarTip:
      "Thì Hiện tại tiếp diễn (Present Continuous) miêu tả trang phục đang mặc trên người: 'He is wearing a navy suit', 'She is carrying a leather handbag'.",
    objectives: [
      "Nắm vững 35 từ vựng về các loại trang phục theo mùa và phụ kiện thời trang.",
      "Nối trang phục với dịp lễ hoặc thời tiết phù hợp.",
      "Ghép câu hỏi kích cỡ, xin thử đồ trong phòng thay đồ cửa hàng.",
      "Luyện nói Shadowing đàm thoại tư vấn phối đồ sành điệu.",
    ],
    keyPhrases: [
      { phrase: "dress up for the party", translation: "lên đồ diện đẹp để dự tiệc" },
      { phrase: "try on clothes in the fitting room", translation: "thử quần áo trong phòng thay đồ" },
      { phrase: "match your shoes", translation: "phối màu ăn ý với đôi giày của bạn" },
      { phrase: "casual daily wear", translation: "trang phục đời thường giản dị, thoải mái" },
    ],
  },
  {
    unitNumber: 15,
    themeId: "t_basic_places_directions",
    themeIcon: "🧭",
    title: "Thành Phố, Địa Điểm & Chỉ Đường",
    titleEn: "City Locations, Navigation & Giving Directions",
    subtitle: "Hỏi đường tự tin tại các thành phố lớn, hiểu bản đồ và các biển chỉ dẫn giao thông",
    colorTheme: "amber",
    grammarTip:
      "Các mẫu câu chỉ đường thông dụng: 'Go straight ahead', 'Turn left/right at the corner', 'Take the second turning on your left', 'It is opposite the bank'.",
    objectives: [
      "Thuộc 30 từ vựng về địa danh thành phố và hướng dẫn di chuyển.",
      "Nối các biển báo giao thông với chỉ dẫn hành động đúng luật.",
      "Ghép câu hỏi đường lịch thiệp bằng cấu trúc 'Excuse me, could you tell me...'.",
      "Nghe đàm thoại chỉ đường và xác định điểm đến trên bản đồ thực tế.",
    ],
    keyPhrases: [
      { phrase: "turn left at the intersection", translation: "rẽ trái ở ngay ngã tư giao lộ" },
      { phrase: "cross the pedestrian crossing", translation: "băng qua vạch dành cho người đi bộ" },
      { phrase: "on your right-hand side", translation: "ở ngay phía bên tay phải của bạn" },
      { phrase: "within walking distance", translation: "trong cự ly có thể đi bộ được rất gần" },
    ],
  },
  {
    unitNumber: 16,
    themeId: "t_basic_transportation",
    themeIcon: "🚗",
    title: "Phương Tiện Giao Thông & Đi Lại",
    titleEn: "Transportation, Vehicles & Commuting",
    subtitle: "Sử dụng thành thạo các phương tiện công cộng, đặt vé xe buýt, tàu hỏa và taxi",
    colorTheme: "purple",
    grammarTip:
      "Giới từ đi với phương tiện: Dùng 'by' + phương tiện khi nói chung ('by car, by train, by plane'); nhưng dùng 'on' với xe buýt, tàu hỏa, máy bay ('on the bus') và 'in' với ô tô cá nhân, taxi ('in a taxi').",
    objectives: [
      "Học 30 từ vựng về hệ thống phương tiện giao thông và vé đi lại.",
      "Nối phương tiện với địa điểm xuất phát: bến xe, ga tàu, bến cảng.",
      "Ghép câu hỏi lịch tàu xe, giá vé một chiều và vé khứ hồi.",
      "Luyện nghe đàm thoại đặt chuyến xe taxi công nghệ tiện lợi.",
    ],
    keyPhrases: [
      { phrase: "catch the morning bus", translation: "bắt kịp chuyến xe buýt buổi sáng" },
      { phrase: "get on the subway train", translation: "bước lên chuyến tàu điện ngầm" },
      { phrase: "traffic congestion during rush hour", translation: "tắc đường kẹt xe trong giờ cao điểm" },
      { phrase: "public transport system", translation: "hệ thống giao thông công cộng" },
    ],
  },
  {
    unitNumber: 17,
    themeId: "t_basic_weather_nature",
    themeIcon: "⛅",
    title: "Thời Tiết, Khí Hậu & Thiên Nhiên",
    titleEn: "Weather, Climate & Natural Phenomena",
    subtitle: "Đọc hiểu bản tin dự báo thời tiết, miêu tả các kiểu thời tiết và biến đổi khí hậu",
    colorTheme: "blue",
    grammarTip:
      "Đại từ giả chủ ngữ 'It' để nói về thời tiết và nhiệt độ: 'It is sunny today', 'It was pouring with rain yesterday', 'It will be cold tomorrow'.",
    objectives: [
      "Nắm vững 30 từ vựng chỉ hiện tượng thời tiết và nhiệt độ môi trường.",
      "Nối các hiện tượng thời tiết với đồ vật bảo hộ: ô dù, áo mưa, kính râm.",
      "Ghép câu đưa ra lời khuyên chuẩn bị trang phục phù hợp với dự báo thời tiết.",
      "Đọc hiểu bài báo về hiện tượng thời tiết cực đoan trên thế giới.",
    ],
    keyPhrases: [
      { phrase: "weather forecast for tomorrow", translation: "bản tin dự báo thời tiết cho ngày mai" },
      { phrase: "heavy pouring rain", translation: "mưa to như trút nước" },
      { phrase: "sunny and warm weather", translation: "tiết trời ấm áp, nắng đẹp" },
      { phrase: "protect the environment", translation: "bảo vệ môi trường tự nhiên" },
    ],
  },
  {
    unitNumber: 18,
    themeId: "t_basic_shopping_money",
    themeIcon: "🛍️",
    title: "Mua Sắm, Giá Cả & Tiền Tệ",
    titleEn: "Shopping, Prices, Currency & Discounts",
    subtitle: "Tự tin mặc cả, hỏi giá, thanh toán bằng thẻ và săn ưu đãi tại trung tâm thương mại",
    colorTheme: "rose",
    grammarTip:
      "Động từ khuyết thiếu thể hiện sự lịch sự khi mua bán: 'Can I help you?', 'Could you show me a smaller size?', 'Would you like to pay in cash or by credit card?'.",
    objectives: [
      "Thuộc 30 từ vựng về hóa đơn, tiền tệ, chương trình giảm giá và thanh toán.",
      "Nối phương thức thanh toán với các thao tác quẹt thẻ hoặc quét mã QR.",
      "Ghép câu thương lượng giá cả và hỏi chính sách đổi trả hàng hóa.",
      "Vượt qua Cột Mốc Đánh Giá hoàn thành Phần 3 Kết Nối A2.",
    ],
    keyPhrases: [
      { phrase: "How much does this cost?", translation: "Cái này có giá bao nhiêu tiền vậy?" },
      { phrase: "Do you accept credit cards?", translation: "Cửa hàng có chấp nhận thanh toán qua thẻ không?" },
      { phrase: "Is there any discount?", translation: "Món này có chương trình giảm giá nào không?" },
      { phrase: "keep the purchase receipt", translation: "giữ lại hóa đơn mua hàng để đối chiếu" },
    ],
  },

  // =========================================================================
  // PHẦN 4: HỌC TẬP, CÔNG SỞ & TRẢI NGHIỆM THẾ GIỚI (A2+ Champion - Units 19 to 24)
  // =========================================================================
  {
    unitNumber: 19,
    themeId: "t_basic_school_stationery",
    themeIcon: "🎓",
    title: "Trường Học, Giáo Dục & Học Tập",
    titleEn: "School, Education & Academic Subjects",
    subtitle: "Học từ vựng môn học, dụng cụ học đường, thi cử và môi trường giảng đường",
    colorTheme: "blue",
    grammarTip:
      "Động từ khuyết thiếu chỉ sự bắt buộc và khuyên nhủ trong học tập: 'must' (bắt buộc theo quy định), 'have to' (phải làm vì hoàn cảnh), 'should' (nên làm như một lời khuyên chân thành).",
    objectives: [
      "Nạp 30 từ vựng về trường lớp, môn học và chứng chỉ học thuật.",
      "Nối các ngành học với môn chuyên ngành tương ứng.",
      "Ghép câu thảo luận về kế hoạch ôn thi và nộp bài tập đúng hạn.",
      "Luyện nghe bài giảng của giáo viên và ghi chép nhanh thông tin cốt lõi.",
    ],
    keyPhrases: [
      { phrase: "attend lecture classes", translation: "tham dự các buổi học trên giảng đường" },
      { phrase: "hand in homework on time", translation: "nộp bài tập về nhà đúng thời hạn" },
      { phrase: "prepare for the final exam", translation: "chuẩn bị kỹ lưỡng cho kỳ thi cuối kỳ" },
      { phrase: "graduate with honors", translation: "tốt nghiệp với tấm bằng loại ưu" },
    ],
  },
  {
    unitNumber: 20,
    themeId: "t_basic_jobs_occupations",
    themeIcon: "💼",
    title: "Nghề Nghiệp & Việc Làm Công Sở",
    titleEn: "Professions, Careers & Workplace",
    subtitle: "Khám phá các ngành nghề hấp dẫn, chuẩn bị phỏng vấn xin việc và đời sống công sở",
    colorTheme: "emerald",
    grammarTip:
      "Mạo từ 'a/an' với danh từ chỉ nghề nghiệp: 'She is an accountant', 'He works as a software engineer'. Cấu trúc hỏi nghề: 'What do you do for a living?'.",
    objectives: [
      "Học trọn 35 từ vựng về các vị trí công việc, phòng ban và chức danh doanh nghiệp.",
      "Nối ngành nghề với nhiệm vụ chuyên môn đặc trưng.",
      "Ghép câu giới thiệu kinh nghiệm làm việc và kỹ năng thế mạnh trong CV.",
      "Luyện nói Shadowing câu trả lời phỏng vấn xin việc ấn tượng.",
    ],
    keyPhrases: [
      { phrase: "apply for a dream job", translation: "nộp hồ sơ ứng tuyển công việc mơ ước" },
      { phrase: "attend job interviews", translation: "tham gia các buổi phỏng vấn tuyển dụng" },
      { phrase: "work in a collaborative team", translation: "làm việc trong một đội ngũ gắn kết, hỗ trợ" },
      { phrase: "career advancement opportunities", translation: "cơ hội thăng tiến rộng mở trong sự nghiệp" },
    ],
  },
  {
    unitNumber: 21,
    themeId: "t_basic_hobbies_sports",
    themeIcon: "⚽",
    title: "Thể Thao, Sở Thích & Rèn Luyện",
    titleEn: "Sports, Fitness, Hobbies & Recreation",
    subtitle: "Làm chủ từ vựng các bộ môn thể thao, thi đấu giải trí và duy trì lối sống lành mạnh",
    colorTheme: "amber",
    grammarTip:
      "Quy tắc động từ đi với thể thao: Dùng 'play' với các môn thể thao đối kháng có bóng ('play football, play tennis'); dùng 'go' với các môn kết thúc bằng -ing ('go swimming, go cycling'); dùng 'do' với võ thuật và tập luyện thể dục ('do yoga, do martial arts').",
    objectives: [
      "Nắm 35 từ vựng về các môn thể thao Olympic, dụng cụ thi đấu và sở thích cá nhân.",
      "Phân biệt và nối chuẩn xác 3 nhóm động từ: Play, Go, Do với từng bộ môn.",
      "Ghép câu rủ bạn bè cùng chơi thể thao nâng cao sức khỏe vào cuối tuần.",
      "Đọc hiểu bài viết về tinh thần đồng đội và chiến thắng thể thao.",
    ],
    keyPhrases: [
      { phrase: "stay fit and healthy", translation: "giữ gìn vóc dáng cân đối và cơ thể khỏe mạnh" },
      { phrase: "win the championship trophy", translation: "giành được cúp vô địch chung cuộc" },
      { phrase: "work out at the fitness gym", translation: "tập luyện chăm chỉ tại phòng gym" },
      { phrase: "personal hobby and interest", translation: "sở thích và niềm đam mê cá nhân" },
    ],
  },
  {
    unitNumber: 22,
    themeId: "t_basic_health_medical",
    themeIcon: "🏥",
    title: "Sức Khỏe, Khám Bệnh & Y Tế",
    titleEn: "Health, Medicine & Doctor Consultations",
    subtitle: "Miêu tả triệu chứng ốm đau, đi khám bác sĩ, mua thuốc tại tiệm thuốc tây",
    colorTheme: "purple",
    grammarTip:
      "Cấu trúc diễn tả triệu chứng bệnh: 'I have a + bệnh' ('I have a headache / sore throat / fever'); 'My + bộ phận + hurts' ('My back hurts'). Lời dặn dò bác sĩ: 'You should rest and drink plenty of water'.",
    objectives: [
      "Thuộc 35 từ vựng về triệu chứng thông thường, đơn thuốc và phòng khám y tế.",
      "Nối triệu chứng bệnh với lời khuyên điều trị phù hợp.",
      "Ghép câu đàm thoại miêu tả bệnh tình với bác sĩ hoặc dược sĩ.",
      "Luyện nghe đoạn hội thoại tư vấn chăm sóc sức khỏe phòng ngừa dịch bệnh.",
    ],
    keyPhrases: [
      { phrase: "make a doctor appointment", translation: "đặt lịch hẹn khám bệnh với bác sĩ" },
      { phrase: "take prescribed medicine", translation: "uống thuốc đúng theo đơn chỉ định" },
      { phrase: "get enough restful sleep", translation: "ngủ đủ giấc để cơ thể phục hồi năng lượng" },
      { phrase: "recover from an illness", translation: "bình phục hoàn toàn sau một trận ốm" },
    ],
  },
  {
    unitNumber: 23,
    themeId: "t_basic_hotel_accommodation",
    themeIcon: "🏨",
    title: "Khách Sạn & Dịch Vụ Lưu Trú",
    titleEn: "Hotels, Accommodations & Hospitality",
    subtitle: "Check-in khách sạn quốc tế, yêu cầu dịch vụ phòng và giải quyết phát sinh lưu trú",
    colorTheme: "blue",
    grammarTip:
      "Thì Quá khứ đơn (Past Simple) khi nhận xét trải nghiệm lưu trú và phản ánh chất lượng dịch vụ: 'We enjoyed our stay', 'The room was very spacious', 'The staff assisted us promptly'.",
    objectives: [
      "Nắm 30 từ vựng về các loại phòng, tiện nghi khách sạn và thủ tục lưu trú.",
      "Nối các tiện ích phòng (minibar, safe, balcony) với công dụng tương ứng.",
      "Ghép câu làm thủ tục nhận phòng (check-in) và trả phòng (check-out) nhanh chóng.",
      "Luyện nghe đàm thoại gọi dịch vụ dọn phòng hoặc gọi bữa sáng tại giường.",
    ],
    keyPhrases: [
      { phrase: "book a double room in advance", translation: "đặt trước phòng đôi tiện nghi" },
      { phrase: "check in at the hotel front desk", translation: "làm thủ tục nhận phòng tại quầy lễ tân" },
      { phrase: "complimentary breakfast buffet", translation: "bữa sáng tự chọn miễn phí đi kèm" },
      { phrase: "room service available 24/7", translation: "dịch vụ phòng phục vụ 24/7 chu đáo" },
    ],
  },
  {
    unitNumber: 24,
    themeId: "t_basic_airport_station_travel",
    themeIcon: "✈️",
    title: "Sân Bay & Du Lịch Thế Giới",
    titleEn: "Airports, Global Travel & Grand Mastery",
    subtitle: "Thực chiến tại sân bay quốc tế, qua cửa an ninh, lên máy bay và hoàn thành lộ trình",
    colorTheme: "rose",
    grammarTip:
      "Thì Tương lai gần ('be going to') và Tương lai đơn ('will') để diễn đạt kế hoạch chuyến bay, lịch trình di chuyển và lời chúc hành trình an toàn: 'Our flight is going to depart soon', 'Have a wonderful trip!'.",
    objectives: [
      "Làm chủ 30 từ vựng về thủ tục sân bay, vé máy bay và du lịch quốc tế.",
      "Nối ký hiệu cổng bay, khu vực soi chiếu an ninh với biển báo quốc tế.",
      "Ghép câu giao tiếp tự tin khi xuất trình hộ chiếu và qua hải quan.",
      "Chinh phục Cột Mốc Hoàng Gia: Đạt điểm số cao ở bài thi Full Test toàn diện 24 Unit!",
    ],
    keyPhrases: [
      { phrase: "boarding pass and passport", translation: "thẻ lên máy bay và hộ chiếu cá nhân" },
      { phrase: "flight is now boarding at Gate 12", translation: "chuyến bay đang bắt đầu mở cổng lên tàu bay số 12" },
      { phrase: "enjoy your overseas journey", translation: "tận hưởng chuyến du hành nước ngoài tuyệt vời" },
      { phrase: "safe travels and see you soon", translation: "thượng lộ bình an và sớm gặp lại nhé" },
    ],
  },
];

/** Bài nghe chính tả cụ thể theo chủ đề (video lessons có sẵn); chủ đề khác về danh mục audio. */
const DICTATION_LESSON_BY_THEME: Record<string, string> = {
  t_basic_food_drinks: "vid_travel_restaurant_ordering",
  t_basic_kitchen_utensils: "vid_oxford_food_cooking",
  t_basic_jobs_occupations: "vid_careervidz_interview",
  t_basic_health_medical: "vid_medical_consultation",
  t_basic_hotel_accommodation: "vid_travel_hotel_checkin",
  t_basic_airport_station_travel: "vid_airport_checkin",
};

/** Bài đọc hiểu (r1…r40, mức A1–B1) cho các Unit lẻ theo chủ đề. */
const READING_PASSAGE_BY_THEME: Record<string, string> = {
  t_basic_greetings: "r2",
  t_basic_numbers: "r1",
  t_basic_family: "r5",
  t_basic_home_objects: "r6",
  t_basic_kitchen_utensils: "r8",
  t_basic_time_calendar: "r7",
  t_basic_body_parts: "r29",
  t_basic_places_directions: "r4",
  t_basic_weather_nature: "r37",
  t_basic_school_stationery: "r36",
  t_basic_hobbies_sports: "r27",
  t_basic_hotel_accommodation: "r30",
};

/**
 * Deterministically generates all stages (chặng) for each Unit.
 * Each Unit consists of 6 structured pedagogical stages:
 * Stage 1: VOCAB - Nạp từ vựng cốt lõi Flashcards & IPA
 * Stage 2: MATCH - Nối cặp từ phản xạ nhanh song ngữ Anh - Việt
 * Stage 3: SENTENCE - Ghép từ thành câu tiếng Anh hoàn chỉnh (Word Bank Builder)
 * Stage 4: LISTENING - Nghe đàm thoại & bắt âm chính tả theo chủ đề
 * Stage 5: STORY / SPEAKING - Đọc hiểu mẩu truyện hoặc Luyện nói Shadowing
 * Stage 6: CHECKPOINT - Cột mốc thi thử tổng hợp làm chủ toàn Unit
 */
const generateCuratedRoadmapSteps = (): ZiczacPathStep[] => {
  const allSteps: ZiczacPathStep[] = [];
  let currentStepNumber = 1;

  UNIT_CURRICULUM_CONFIGS.forEach((unit) => {
    const uNum = unit.unitNumber;

    // Stage 1: VOCAB (Nạp từ cốt lõi)
    allSteps.push({
      id: `step-${currentStepNumber}`,
      stepNumber: currentStepNumber,
      unitNumber: uNum,
      unitTitle: `Unit ${uNum}: ${unit.title}`,
      title: `Từ Vựng Cốt Lõi: ${unit.title}`,
      description: `Nắm vững các từ vựng căn bản của chủ đề ${unit.title} bằng phương pháp Flashcard Spaced Repetition kết hợp phiên âm IPA chuẩn xác.`,
      skillType: "VOCAB",
      isCheckpoint: false,
      practicePath: `/vocabulary/${unit.themeId}`,
      xpReward: 25,
      coinsReward: 10,
      durationMinutes: 15,
      difficulty: "Dễ",
      tips: [
        "Luyện phát âm chuẩn phiên âm IPA của từng từ trước khi ghi nhớ nghĩa.",
        "Đặt ít nhất 1 câu ví dụ thực tế cho mỗi từ vựng mới học.",
      ],
      totalSessions: 3,
      dailyTargetWords: 20,
      totalTargetWords: 300,
      dailyPlanBreakdown: [
        {
          timeSlot: "5 phút đầu",
          activity: "Nạp từ mới Flashcard",
          detail: `Học các từ cốt lõi chủ đề ${unit.title} với phiên âm IPA, audio bản xứ và ảnh minh họa.`,
        },
        {
          timeSlot: "7 phút giữa",
          activity: "Khắc sâu phản xạ",
          detail: "Trắc nghiệm chọn nghĩa nhanh, nối từ ngữ cảnh và gõ chính tả nhận diện âm đuôi.",
        },
        {
          timeSlot: "3 phút cuối",
          activity: "Ứng dụng ngữ cảnh",
          detail: "Đọc hiểu 2 mẩu hội thoại áp dụng từ mới và tự động đồng bộ vào hàng đợi SM-2.",
        },
      ],
    });
    currentStepNumber++;

    // Stage 2: MATCH (Nối từ phản xạ Anh - Việt)
    allSteps.push({
      id: `step-${currentStepNumber}`,
      stepNumber: currentStepNumber,
      unitNumber: uNum,
      unitTitle: `Unit ${uNum}: ${unit.title}`,
      title: `Nối Cặp Từ Phản Xạ: ${unit.title}`,
      description: `Rèn luyện tốc độ nhận diện mặt chữ và phản xạ song ngữ Anh - Việt tức thì dưới 2 giây/từ không cần suy nghĩ lâu.`,
      skillType: "MATCH",
      isCheckpoint: false,
      practicePath: `/study/word-link?theme=${unit.themeId}&unit=${uNum}`,
      xpReward: 30,
      coinsReward: 15,
      durationMinutes: 15,
      difficulty: "Dễ",
      tips: [
        "Quét nhanh toàn bộ lưới thẻ trước khi bắt đầu bấm chọn cặp.",
        "Nhẩm to từ vựng tiếng Anh khi chạm vào nghĩa tiếng Việt để kích hoạt trí nhớ thính giác.",
      ],
      totalSessions: 3,
      dailyPlanBreakdown: [
        {
          timeSlot: "5 phút đầu",
          activity: "Quét mặt chữ",
          detail: `Lướt nhanh 10 cặp từ cơ bản theo chủ đề ${unit.title} để ghi nhớ vị trí và mặt chữ.`,
        },
        {
          timeSlot: "7 phút giữa",
          activity: "Thử thách nối siêu tốc",
          detail: "Chạm nối các cặp từ chính xác với mục tiêu không phạm lỗi sai dưới 2 giây.",
        },
        {
          timeSlot: "3 phút cuối",
          activity: "Rà soát từ khó",
          detail: "Lưu lại các từ ghép nhầm để hệ thống ưu tiên lặp lại ở phiên sau.",
        },
      ],
    });
    currentStepNumber++;

    // Stage 3: SENTENCE (Ghép từ thành câu tiếng Anh - Word Bank Builder)
    allSteps.push({
      id: `step-${currentStepNumber}`,
      stepNumber: currentStepNumber,
      unitNumber: uNum,
      unitTitle: `Unit ${uNum}: ${unit.title}`,
      title: `Ghép Từ Thành Câu: ${unit.title}`,
      description: `Sắp xếp các khối từ vựng (Word Bank Tiles) thành câu hoàn chỉnh chuẩn ngữ pháp theo chủ đề ${unit.title}.`,
      skillType: "SENTENCE",
      isCheckpoint: false,
      practicePath: `/study/sentence-builder?theme=${unit.themeId}&unit=${uNum}`,
      xpReward: 35,
      coinsReward: 15,
      durationMinutes: 15,
      difficulty: "Trung bình",
      tips: [
        "Xác định chủ ngữ (S) và động từ chính (V) của câu trước khi ghép các thành phần phụ.",
        "Chú ý mạo từ (a/an/the) và giới từ đi kèm động từ.",
      ],
      totalSessions: 3,
      dailyPlanBreakdown: [
        {
          timeSlot: "5 phút đầu",
          activity: "Phân tích câu mẫu",
          detail: `Nắm rõ cấu trúc câu điển hình của chủ đề ${unit.title} cùng trợ lý AI.`,
        },
        {
          timeSlot: "7 phút giữa",
          activity: "Ghép câu tương tác",
          detail: "Kéo thả các khối từ (Word Bank Tiles) tạo thành câu văn trôi chảy, đúng trật tự từ.",
        },
        {
          timeSlot: "3 phút cuối",
          activity: "Kiểm tra ngữ điệu",
          detail: "Đọc to câu vừa ghép hoàn chỉnh để rèn luyện sự tự tin khi nói tiếng Anh.",
        },
      ],
    });
    currentStepNumber++;

    // Stage 4: LISTENING (Nghe đàm thoại & chính tả)
    allSteps.push({
      id: `step-${currentStepNumber}`,
      stepNumber: currentStepNumber,
      unitNumber: uNum,
      unitTitle: `Unit ${uNum}: ${unit.title}`,
      title: `Nghe Đàm Thoại & Chính Tả: ${unit.title}`,
      description: `Luyện đôi tai bắt âm nhạy bén, nhận diện âm đuôi và gõ chính tả câu đàm thoại thực tế theo chủ đề ${unit.title}.`,
      skillType: "LISTENING",
      isCheckpoint: false,
      practicePath: DICTATION_LESSON_BY_THEME[unit.themeId]
        ? `/study/dictation?id=${DICTATION_LESSON_BY_THEME[unit.themeId]}`
        : "/study/dictation/audio",
      xpReward: 30,
      coinsReward: 15,
      durationMinutes: 20,
      difficulty: "Trung bình",
      tips: [
        "Nghe trọn vẹn cả câu trước khi gõ để nắm ngữ cảnh bài nói.",
        "Chú ý các âm nối và nuốt âm thường gặp trong giao tiếp tự nhiên.",
      ],
      totalSessions: 3,
      dailyPlanBreakdown: [
        {
          timeSlot: "5 phút đầu",
          activity: "Bắt ý chính",
          detail: "Nghe toàn bộ đoạn hội thoại 1 lần ở tốc độ bình thường để nắm đại ý.",
        },
        {
          timeSlot: "7 phút giữa",
          activity: "Chính tả từng câu",
          detail: "Nghe từng câu ngắn và gõ chính xác các từ vựng còn khuyết vào chỗ trống.",
        },
        {
          timeSlot: "3 phút cuối",
          activity: "Soát lỗi chi tiết",
          detail: "Xem lại phụ đề song ngữ và ghi chú các hiện tượng nối âm then chốt.",
        },
      ],
    });
    currentStepNumber++;

    // Stage 5: STORY or SPEAKING (Đọc hiểu hoặc Luyện nói Shadowing)
    const isSpeakingUnit = uNum % 2 === 0;
    allSteps.push({
      id: `step-${currentStepNumber}`,
      stepNumber: currentStepNumber,
      unitNumber: uNum,
      unitTitle: `Unit ${uNum}: ${unit.title}`,
      title: isSpeakingUnit
        ? `Luyện Nói Shadowing: ${unit.title}`
        : `Đọc Hiểu Mẩu Truyện: ${unit.title}`,
      description: isSpeakingUnit
        ? `Luyện nhại giọng ngữ điệu tự nhiên cùng micro AI và ghi nhớ câu đàm thoại chủ đề ${unit.title}.`
        : `Khám phá mẩu truyện ngắn sinh động áp dụng vốn từ vựng chủ đề ${unit.title} vào tình huống thực tế.`,
      skillType: isSpeakingUnit ? "SPEAKING" : "STORY",
      isCheckpoint: false,
      practicePath: isSpeakingUnit
        ? "/study/shadowing/audio"
        : `/study/reading/${READING_PASSAGE_BY_THEME[unit.themeId] || "r1"}`,
      xpReward: 35,
      coinsReward: 15,
      durationMinutes: 15,
      difficulty: "Trung bình",
      tips: [
        isSpeakingUnit
          ? "Tập trung nhại lại ngữ điệu lên xuống và nhấn trọng âm của người bản xứ."
          : "Đọc lướt bắt ý chính trước khi trả lời câu hỏi đọc hiểu chi tiết.",
        "Ghi nhớ các cụm từ đắt giá xuất hiện trong ngữ cảnh thực tế.",
      ],
      totalSessions: 3,
      dailyPlanBreakdown: [
        {
          timeSlot: "5 phút đầu",
          activity: isSpeakingUnit ? "Nghe phát âm mẫu" : "Đọc lướt văn bản",
          detail: isSpeakingUnit
            ? "Lắng nghe câu mẫu của người bản ngữ và chú ý ngắt nghỉ đúng chỗ."
            : "Đọc nhanh văn bản mẩu truyện để nắm mạch cảm xúc câu chuyện.",
        },
        {
          timeSlot: "7 phút giữa",
          activity: isSpeakingUnit ? "Thu âm nhại giọng" : "Trả lời đọc hiểu",
          detail: isSpeakingUnit
            ? "Bật micro AI và thu âm nhại giọng theo nhịp độ tự nhiên."
            : "Hoàn thành 3 câu hỏi trắc nghiệm kiểm tra khả năng suy luận ngữ cảnh.",
        },
        {
          timeSlot: "3 phút cuối",
          activity: "Tổng kết cụm từ hay",
          detail: "Ghi chép 2 cụm từ diễn đạt tự nhiên vào sổ tay cá nhân.",
        },
      ],
    });
    currentStepNumber++;

    // Stage 6: CHECKPOINT (Cột mốc thi thử tổng hợp làm chủ Unit)
    allSteps.push({
      id: `step-${currentStepNumber}`,
      stepNumber: currentStepNumber,
      unitNumber: uNum,
      unitTitle: `Unit ${uNum}: ${unit.title}`,
      title: `CỘT MỐC UNIT ${uNum}: Đánh Giá Chủ Đề ${unit.title}`,
      description: `Bài kiểm tra Mini-Test trắc nghiệm tổng hợp 15 câu kiểm tra toàn diện 4 kỹ năng của Unit ${uNum} để mở khóa Unit tiếp theo.`,
      skillType: "CHECKPOINT",
      isCheckpoint: true,
      checkpointReviewScope: `Kiểm tra toàn diện Chặng 1 đến 5: Từ vựng cốt lõi, Nối từ phản xạ, Ghép câu, Nghe chính tả và Đọc hiểu/Luyện nói chủ đề ${unit.title}.`,
      practicePath: `/study/practice?mode=checkpoint&unit=${uNum}&theme=${unit.themeId}`,
      xpReward: 120,
      coinsReward: 60,
      durationMinutes: 25,
      difficulty: "Khó",
      tips: [
        "Xem lại phần Sổ tay hướng dẫn (Guidebook) trước khi bấm Bắt đầu thi thử.",
        "Phân bổ thời gian hợp lý: khoảng 1 phút cho mỗi câu trắc nghiệm.",
      ],
      totalSessions: 3,
      dailyPlanBreakdown: [
        {
          timeSlot: "5 phút đầu",
          activity: "Ôn tập Guidebook",
          detail: "Đọc lại các quy tắc ngữ pháp trọng tâm và 4 cụm từ then chốt của Unit.",
        },
        {
          timeSlot: "15 phút giữa",
          activity: "Thi thử Mini-Test",
          detail: "Tập trung giải quyết 15 câu hỏi trắc nghiệm 4 kỹ năng không dùng tài liệu.",
        },
        {
          timeSlot: "5 phút cuối",
          activity: "Nhận kết quả & Mở khóa",
          detail: "Xem bảng phân tích điểm mạnh/yếu, nhận thưởng XP/Coins và mở khóa Unit kế tiếp.",
        },
      ],
    });
    currentStepNumber++;
  });

  return allSteps;
};

/**
 * CURATED MASTER ROADMAP PATHWAY
 * Toàn bộ 144 chặng học tập chia làm 24 Unit chủ đề từ vựng chuyên sâu (6 chặng/Unit).
 */
export const CURATED_ROADMAP_STEPS: ZiczacPathStep[] = generateCuratedRoadmapSteps();

/**
 * Groups CURATED_ROADMAP_STEPS by Unit and attaches unit header metadata,
 * colorTheme, and comprehensive Guidebook content.
 */
export const getCuratedUnitGroups = (): ZiczacUnitGroup[] => {
  const unitsMap = new Map<number, ZiczacUnitGroup>();

  // Initialize unit groups from curriculum configs
  UNIT_CURRICULUM_CONFIGS.forEach((config) => {
    unitsMap.set(config.unitNumber, {
      unitNumber: config.unitNumber,
      unitTitle: `Unit ${config.unitNumber}: ${config.title}`,
      unitSubtitle: config.subtitle,
      colorTheme: config.colorTheme,
      themeId: config.themeId,
      themeIcon: config.themeIcon,
      guidebookObjectives: config.objectives,
      guidebookGrammarTip: config.grammarTip,
      guidebookKeyPhrases: config.keyPhrases,
      steps: [],
    });
  });

  // Attach steps to their corresponding unit
  CURATED_ROADMAP_STEPS.forEach((step) => {
    const group = unitsMap.get(step.unitNumber);
    if (group) {
      group.steps.push(step);
    }
  });

  return Array.from(unitsMap.values());
};
