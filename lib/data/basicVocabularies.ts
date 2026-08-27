/**
 * =========================================================================
 * KHO TỪ VỰNG TIẾNG ANH CƠ BẢN (A1 - A2 ESSENTIAL VOCABULARY BANK - 60 THEMES)
 * =========================================================================
 * Toàn bộ 60 chủ đề từ vựng cơ bản nhất hàng ngày phục vụ nền tảng tiếng Anh toàn diện:
 * 1. Chào hỏi & Giao tiếp xã giao (Greetings & Polite Expressions)
 * 2. Giới thiệu bản thân & Đại từ (Self-Introduction & Pronouns)
 * 3. Số đếm & Số thứ tự (Numbers & Counting)
 * 4. Màu sắc & Hình khối (Colors & Shapes)
 * 5. Gia đình & Người thân (Family & Relatives)
 * 6. Nhà cửa & Đồ dùng sinh hoạt (Home & Daily Objects)
 * 7. Hành động & Động từ thường nhật (Daily Actions & Common Verbs)
 * 8. Ăn uống & Thực phẩm (Food & Beverages)
 * 9. Cảm xúc & Tính từ thông dụng (Emotions & Basic Adjectives)
 * 10. Thời gian, Ngày tháng & Mùa (Time, Days & Calendar)
 * 11. Động vật quen thuộc (Familiar Animals)
 * 12. Bộ phận cơ thể con người (Human Body Parts)
 * 13. Trang phục & Phụ kiện (Clothing & Accessories)
 * 14. Địa điểm & Chỉ đường (Places & Simple Directions)
 * 15. Thời tiết & Thiên nhiên (Weather & Nature Elements)
 * 16. Nghề nghiệp & Việc làm (Jobs & Occupations)
 * 17. Phương tiện giao thông (Vehicles & Transport)
 * 18. Trường học & Dụng cụ học tập (School & Stationery)
 * 19. Sở thích & Thể thao (Hobbies & Sports)
 * 20. Mua sắm & Tiền tệ (Shopping & Money)
 * 21. Cây cối & Hoa quả (Plants & Fruits)
 * 22. Sức khỏe & Y tế (Health & Medical Care)
 * 23. Dụng cụ nhà bếp & Nấu nướng (Kitchen Utensils & Cooking)
 * 24. Văn phòng & Công nghệ cơ bản (Office & Basic Tech)
 * 25. Thành phố & Công trình (City, Buildings & Facilities)
 * 26. Tính cách & Phẩm chất (Personality & Character Traits)
 * 27. Giới từ & Vị trí không gian (Prepositions & Space Positions)
 * 28. Giác quan & Cảm nhận (Senses & Perception)
 * 29. Kỳ nghỉ & Du lịch (Vacation & Tourism)
 * 30. Giải trí & Nghệ thuật (Entertainment & Arts)
 * 31. Đo lường & Kích cỡ (Measurements & Sizes)
 * 32. Dụng cụ & Sửa chữa (Tools & Home Repair)
 * 33. Thiên tai & Thời tiết khắc nghiệt (Severe Weather & Disasters)
 * 34. Địa hình & Cảnh quan tự nhiên (Landforms & Natural Landscapes)
 * 35. Sinh vật biển & Đại dương (Marine Life & Ocean Creatures)
 * 36. Côn trùng & Sâu bọ (Insects & Small Bugs)
 * 37. Gia vị & Hương vị nấu nướng (Spices, Herbs & Seasonings)
 * 38. Bánh ngọt & Tráng miệng (Bakery, Pastries & Desserts)
 * 39. Đồ uống giải khát & Trà sữa (Drinks & Beverages)
 * 40. Dọn dẹp & Việc nhà (House Cleaning & Chores)
 * 41. Phụ kiện thời trang & Trang sức (Fashion Accessories & Jewelry)
 * 42. Phòng ngủ & Giấc ngủ (Bedroom Furniture & Sleep)
 * 43. Phòng tắm & Vệ sinh (Bathroom & Toiletries)
 * 44. Cảm giác cơ thể & Nhu cầu sinh học (Bodily Sensations & Needs)
 * 45. Cảm xúc & Thái độ sống (Feelings & Attitudes)
 * 46. Mối quan hệ & Xã hội (Social Relationships & Life)
 * 47. Giao tiếp & Thư tín (Conversation & Communication)
 * 48. Hình học & Họa tiết (Geometry, Patterns & Dimensions)
 * 49. Chất liệu & Vật liệu (Materials & Substances)
 * 50. Âm thanh & Nhạc cụ (Sounds, Noises & Instruments)
 * 51. Ánh sáng & Thị giác (Light & Visual Effects)
 * 52. Vận động cơ thể & Thể dục (Body Movements & Exercises)
 * 53. Dịch vụ & Tiện ích công (Convenience Stores & Services)
 * 54. Sân bay & Nhà ga (Airport & Station Travel)
 * 55. Khách sạn & Lưu trú (Hotel & Lodging Accommodation)
 * 56. Ẩm thực đường phố & Ăn vặt (Street Food & Snacks)
 * 57. Giai đoạn cuộc đời & Tuổi tác (Life Stages & Ages)
 * 58. Lễ hội & Phong tục tập quán (Holidays, Celebrations & Customs)
 * 59. An toàn, Cảnh báo & Luật lệ (Safety, Warnings & Rules)
 * 60. Thiết bị điện tử & Gia dụng (Appliances & Electronic Gadgets)
 */

export interface BasicVocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  definitionVn: string;
  pos: "noun" | "verb" | "adj" | "adverb" | "pronoun" | "preposition" | "interjection" | "phrase";
  difficulty: 1;
  frequency: number;
  themeId: string;
  themeNameVn: string;
  themeNameEn: string;
  examples: string[];
  exampleTranslations?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface BasicTheme {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  difficulty: 1;
  totalVocabs: number;
  color: string;
  description: string;
}

export const BASIC_VOCABULARY_THEMES: BasicTheme[] = [
  {
    "id": "t_basic_greetings",
    "name": "Chào hỏi & Giao tiếp",
    "nameEn": "Greetings & Polite Words",
    "icon": "👋",
    "difficulty": 1,
    "color": "#0059bb",
    "description": "Các câu chào, tạm biệt và lời nói lịch sự thông dụng nhất hàng ngày.",
    "totalVocabs": 30
  },
  {
    "id": "t_basic_introductions",
    "name": "Giới thiệu & Đại từ",
    "nameEn": "Self-Intro & Pronouns",
    "icon": "👤",
    "difficulty": 1,
    "color": "#0284c7",
    "description": "Đại từ nhân xưng, sở hữu và từ vựng giới thiệu bản thân cơ bản.",
    "totalVocabs": 35
  },
  {
    "id": "t_basic_numbers",
    "name": "Số đếm & Thứ tự",
    "nameEn": "Numbers & Counting",
    "icon": "🔢",
    "difficulty": 1,
    "color": "#f59e0b",
    "description": "Số đếm từ 0 đến 1000, số thứ tự và cách đếm số lượng.",
    "totalVocabs": 25
  },
  {
    "id": "t_basic_colors_shapes",
    "name": "Màu sắc & Hình khối",
    "nameEn": "Colors & Shapes",
    "icon": "🎨",
    "difficulty": 1,
    "color": "#ec4899",
    "description": "Các màu sắc cơ bản và hình dạng quen thuộc trong đời sống.",
    "totalVocabs": 21
  },
  {
    "id": "t_basic_family",
    "name": "Gia đình & Người thân",
    "nameEn": "Family & Relatives",
    "icon": "👨‍👩‍👧‍👦",
    "difficulty": 1,
    "color": "#3b82f6",
    "description": "Xưng hô và mối quan hệ giữa các thành viên trong gia đình.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_home_objects",
    "name": "Nhà cửa & Đồ dùng",
    "nameEn": "Home & Daily Objects",
    "icon": "🏠",
    "difficulty": 1,
    "color": "#10b981",
    "description": "Các phòng trong nhà, đồ nội thất và vật dụng sinh hoạt hàng ngày.",
    "totalVocabs": 24
  },
  {
    "id": "t_basic_daily_verbs",
    "name": "Động từ hàng ngày",
    "nameEn": "Daily Common Verbs",
    "icon": "⚡",
    "difficulty": 1,
    "color": "#8b5cf6",
    "description": "Các hành động cơ bản nhất: ăn, uống, đi, ngủ, nói, đọc, viết, học...",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_food_drinks",
    "name": "Ăn uống & Thực phẩm",
    "nameEn": "Food & Beverages",
    "icon": "🍎",
    "difficulty": 1,
    "color": "#ef4444",
    "description": "Thức ăn, đồ uống, trái cây và các bữa ăn quen thuộc.",
    "totalVocabs": 23
  },
  {
    "id": "t_basic_emotions_adjectives",
    "name": "Cảm xúc & Tính từ",
    "nameEn": "Emotions & Adjectives",
    "icon": "😊",
    "difficulty": 1,
    "color": "#f43f5e",
    "description": "Tính từ miêu tả cảm xúc, trạng thái và đặc điểm đồ vật thông dụng.",
    "totalVocabs": 22
  },
  {
    "id": "t_basic_time_calendar",
    "name": "Thời gian & Lịch",
    "nameEn": "Time, Days & Seasons",
    "icon": "📅",
    "difficulty": 1,
    "color": "#06b6d4",
    "description": "Giờ giấc, các buổi trong ngày, thứ trong tuần, tháng và 4 mùa.",
    "totalVocabs": 22
  },
  {
    "id": "t_basic_animals",
    "name": "Động vật quen thuộc",
    "nameEn": "Familiar Animals",
    "icon": "🐶",
    "difficulty": 1,
    "color": "#14b8a6",
    "description": "Thú cưng, gia súc, gia cầm và các con vật thường gặp.",
    "totalVocabs": 22
  },
  {
    "id": "t_basic_body_parts",
    "name": "Bộ phận cơ thể",
    "nameEn": "Human Body Parts",
    "icon": "👀",
    "difficulty": 1,
    "color": "#e11d48",
    "description": "Các bộ phận chính trên cơ thể người từ đầu đến chân.",
    "totalVocabs": 22
  },
  {
    "id": "t_basic_clothes",
    "name": "Trang phục cơ bản",
    "nameEn": "Clothing & Outfits",
    "icon": "👕",
    "difficulty": 1,
    "color": "#a855f7",
    "description": "Quần áo, giày dép, nón mũ và phụ kiện mặc thường ngày.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_places_directions",
    "name": "Địa điểm & Chỉ đường",
    "nameEn": "Places & Directions",
    "icon": "🗺️",
    "difficulty": 1,
    "color": "#6366f1",
    "description": "Trường học, bệnh viện, siêu thị và các từ chỉ phương hướng cơ bản.",
    "totalVocabs": 22
  },
  {
    "id": "t_basic_weather_nature",
    "name": "Thời tiết & Thiên nhiên",
    "nameEn": "Weather & Nature",
    "icon": "🌤️",
    "difficulty": 1,
    "color": "#16a34a",
    "description": "Nắng, mưa, gió, mây, cây cỏ, sông núi và tự nhiên.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_jobs_occupations",
    "name": "Nghề nghiệp & Việc làm",
    "nameEn": "Jobs & Occupations",
    "icon": "💼",
    "difficulty": 1,
    "color": "#d97706",
    "description": "Bác sĩ, giáo viên, cảnh sát, đầu bếp và các ngành nghề phổ biến.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_transportation",
    "name": "Phương tiện giao thông",
    "nameEn": "Vehicles & Transport",
    "icon": "🚗",
    "difficulty": 1,
    "color": "#2563eb",
    "description": "Xe máy, xe buýt, ô tô, máy bay, tàu hỏa và cách đi lại.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_school_stationery",
    "name": "Trường học & Dụng cụ",
    "nameEn": "School & Stationery",
    "icon": "📚",
    "difficulty": 1,
    "color": "#4f46e5",
    "description": "Lớp học, bảng đen, thước kẻ, kéo, tập vở và kiểm tra.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_hobbies_sports",
    "name": "Sở thích & Thể thao",
    "nameEn": "Hobbies & Sports",
    "icon": "⚽",
    "difficulty": 1,
    "color": "#ea580c",
    "description": "Bóng đá, bơi lội, ca hát, đàn piano, vẽ tranh và giải trí.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_shopping_money",
    "name": "Mua sắm & Tiền tệ",
    "nameEn": "Shopping & Money",
    "icon": "💳",
    "difficulty": 1,
    "color": "#059669",
    "description": "Tiền mặt, thẻ, giá cả, hóa đơn, giảm giá và mua bán.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_plants_fruits",
    "name": "Cây cối & Hoa quả",
    "nameEn": "Plants & Fruits",
    "icon": "🌿",
    "difficulty": 1,
    "color": "#65a30d",
    "description": "Các loại cây, lá, rễ, hoa quả nhiệt đới và nông sản quen thuộc.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_health_medical",
    "name": "Sức khỏe & Y tế",
    "nameEn": "Health & Medical",
    "icon": "💊",
    "difficulty": 1,
    "color": "#dc2626",
    "description": "Sốt, ho, cảm lạnh, đau đầu, thuốc uống và cách chăm sóc bản thân.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_kitchen_utensils",
    "name": "Dụng cụ nhà bếp",
    "nameEn": "Kitchen Utensils",
    "icon": "🍳",
    "difficulty": 1,
    "color": "#b45309",
    "description": "Nồi, chảo, bát đĩa, đũa thìa, dao kéo và lò nướng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_office_tech",
    "name": "Văn phòng & Công nghệ",
    "nameEn": "Office & Basic Tech",
    "icon": "💻",
    "difficulty": 1,
    "color": "#0891b2",
    "description": "Máy tính, bàn phím, chuột, màn hình, email, wifi và mật khẩu.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_city_buildings",
    "name": "Thành phố & Công trình",
    "nameEn": "City & Buildings",
    "icon": "🏙️",
    "difficulty": 1,
    "color": "#7c3aed",
    "description": "Tòa nhà, cầu đường, quảng trường, bảo tàng và các công trình đô thị.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_personality_traits",
    "name": "Tính cách & Phẩm chất",
    "nameEn": "Personality Traits",
    "icon": "🌟",
    "difficulty": 1,
    "color": "#db2777",
    "description": "Tốt bụng, thông minh, trung thực, dũng cảm, chăm chỉ và kiên nhẫn.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_prepositions_positions",
    "name": "Giới từ & Vị trí",
    "nameEn": "Prepositions & Space",
    "icon": "📍",
    "difficulty": 1,
    "color": "#475569",
    "description": "Trong, trên, dưới, trước, sau, bên cạnh, ở giữa và xung quanh.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_senses_perceptions",
    "name": "Giác quan & Cảm nhận",
    "nameEn": "Senses & Perception",
    "icon": "👃",
    "difficulty": 1,
    "color": "#c026d3",
    "description": "Thị giác, thính giác, khứu giác, vị giác và xúc giác.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_vacation_tourism",
    "name": "Kỳ nghỉ & Du lịch",
    "nameEn": "Vacation & Tourism",
    "icon": "🏖️",
    "difficulty": 1,
    "color": "#0d9488",
    "description": "Hành lý, hộ chiếu, bãi biển, khu nghỉ dưỡng và cảnh đẹp du lịch.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_entertainment_arts",
    "name": "Giải trí & Nghệ thuật",
    "nameEn": "Entertainment & Arts",
    "icon": "🎭",
    "difficulty": 1,
    "color": "#9333ea",
    "description": "Phim ảnh, ca nhạc, hòa nhạc, tranh vẽ, ảo thuật và lễ hội.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_measurements_sizes",
    "name": "Đo lường & Kích cỡ",
    "nameEn": "Measurements & Sizes",
    "icon": "📏",
    "difficulty": 1,
    "color": "#0284c7",
    "description": "Mét, ki-lô-gam, lít, chiều cao, cân nặng, độ dài, độ dày mỏng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_tools_repair",
    "name": "Dụng cụ & Sửa chữa",
    "nameEn": "Tools & Home Repair",
    "icon": "🔨",
    "difficulty": 1,
    "color": "#ea580c",
    "description": "Búa, đinh, ốc vít, tua-vít, kìm, cưa, máy khoan và sửa đồ gia đình.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_severe_weather",
    "name": "Thiên tai & Thời tiết xấu",
    "nameEn": "Severe Weather",
    "icon": "⛈️",
    "difficulty": 1,
    "color": "#475569",
    "description": "Bão lớn, sấm sét, lũ lụt, hạn hán, lốc xoáy và an toàn trú ẩn.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_landforms_landscapes",
    "name": "Địa hình & Cảnh quan",
    "nameEn": "Landforms & Landscapes",
    "icon": "🏞️",
    "difficulty": 1,
    "color": "#15803d",
    "description": "Đồi núi, thung lũng, rừng rậm, sa mạc, hang động, vách đá, bờ biển.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_marine_life",
    "name": "Sinh vật biển & Đại dương",
    "nameEn": "Marine Life & Ocean",
    "icon": "🐋",
    "difficulty": 1,
    "color": "#0ea5e9",
    "description": "Cá voi, cá heo, cá mập, bạch tuộc, tôm cua, rạn san hô và đại dương.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_insects_bugs",
    "name": "Côn trùng & Sâu bọ",
    "nameEn": "Insects & Small Bugs",
    "icon": "🐝",
    "difficulty": 1,
    "color": "#ca8a04",
    "description": "Ong mật, kiến, muỗi, chuồn chuồn, bọ cánh cứng, bướm và bọ rùa.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_spices_herbs",
    "name": "Gia vị & Hương vị",
    "nameEn": "Spices, Herbs & Flavors",
    "icon": "🌶️",
    "difficulty": 1,
    "color": "#b91c1c",
    "description": "Hạt tiêu, ớt, gừng, tỏi, nước mắm, quế, mật ong và các vị cay đắng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_bakery_desserts",
    "name": "Bánh ngọt & Tráng miệng",
    "nameEn": "Bakery & Desserts",
    "icon": "🧁",
    "difficulty": 1,
    "color": "#db2777",
    "description": "Bánh kem, bánh quy, sandwich, bánh sừng bò, kem ly và sô-cô-la.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_drinks_beverages",
    "name": "Đồ uống & Trà sữa",
    "nameEn": "Drinks & Beverages",
    "icon": "🧋",
    "difficulty": 1,
    "color": "#d97706",
    "description": "Sinh tố, nước ép, trà sữa trân châu, trà đá, nước chanh và nước khoáng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_cleaning_chores",
    "name": "Dọn dẹp & Việc nhà",
    "nameEn": "Cleaning & House Chores",
    "icon": "🧹",
    "difficulty": 1,
    "color": "#059669",
    "description": "Quét nhà, lau sàn, giặt giũ, hút bụi, đổ rác, ủi đồ và gấp quần áo.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_fashion_accessories",
    "name": "Phụ kiện thời trang",
    "nameEn": "Fashion Accessories",
    "icon": "💍",
    "difficulty": 1,
    "color": "#9333ea",
    "description": "Nhẫn, dây chuyền, vòng tay, hoa tai, thắt lưng, khăn choàng, kính râm.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_bedroom_sleep",
    "name": "Phòng ngủ & Giấc ngủ",
    "nameEn": "Bedroom & Sleep",
    "icon": "🛏️",
    "difficulty": 1,
    "color": "#6366f1",
    "description": "Giường ngủ, nệm, gối, chăn ấm, tủ quần áo, đồng hồ báo thức và ngủ ngon.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_bathroom_toiletries",
    "name": "Phòng tắm & Vệ sinh",
    "nameEn": "Bathroom & Toiletries",
    "icon": "🚿",
    "difficulty": 1,
    "color": "#06b6d4",
    "description": "Vòi sen, bồn tắm, bồn rửa, khăn tắm, dầu gội, xà phòng, bàn chải đánh răng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_bodily_sensations",
    "name": "Cảm giác cơ thể",
    "nameEn": "Bodily Sensations",
    "icon": "🌡️",
    "difficulty": 1,
    "color": "#e11d48",
    "description": "Cơn đau, ngứa, toát mồ hôi, run rẩy, chóng mặt, buồn ngủ, no bụng, khát nước.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_feelings_attitudes",
    "name": "Cảm xúc & Thái độ",
    "nameEn": "Feelings & Attitudes",
    "icon": "💖",
    "difficulty": 1,
    "color": "#f43f5e",
    "description": "Niềm vui sướng, hy vọng, dũng cảm, tự tin, biết ơn, tò mò và yêu thương.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_relationships_social",
    "name": "Mối quan hệ & Xã hội",
    "nameEn": "Social Relationships",
    "icon": "🤝",
    "difficulty": 1,
    "color": "#2563eb",
    "description": "Bạn thân, hàng xóm, bạn cùng lớp, đồng nghiệp, sếp, lòng tin và sự tôn trọng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_conversation_communication",
    "name": "Giao tiếp & Thư tín",
    "nameEn": "Conversation & Letters",
    "icon": "✉️",
    "difficulty": 1,
    "color": "#4f46e5",
    "description": "Trò chuyện, thảo luận, thì thầm, hỏi đáp, viết thư, bưu thiếp, phong bì.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_geometry_patterns",
    "name": "Hình học & Họa tiết",
    "nameEn": "Geometry & Patterns",
    "icon": "🔷",
    "difficulty": 1,
    "color": "#7c3aed",
    "description": "Hình bầu dục, hình thoi, khối cầu, khối trụ, đường thẳng, sọc kẻ và hoa văn.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_materials_substances",
    "name": "Chất liệu & Vật liệu",
    "nameEn": "Materials & Substances",
    "icon": "🪵",
    "difficulty": 1,
    "color": "#854d0e",
    "description": "Gỗ, kim loại, nhựa, thủy tinh, giấy, bông vải, cao su, đất sét, vàng bạc.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_sounds_instruments",
    "name": "Âm thanh & Nhạc cụ",
    "nameEn": "Sounds & Instruments",
    "icon": "🎵",
    "difficulty": 1,
    "color": "#c026d3",
    "description": "Âm thanh, giai điệu, tiếng vỗ tay, chuông reo, trống, sáo, vĩ cầm, kèn.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_light_visual_effects",
    "name": "Ánh sáng & Thị giác",
    "nameEn": "Light & Visual Effects",
    "icon": "💡",
    "difficulty": 1,
    "color": "#eab308",
    "description": "Ánh nắng, bóng râm, phát sáng, lấp lánh, tia chớp, nến, trong suốt và hình ảnh.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_body_movements",
    "name": "Vận động cơ thể",
    "nameEn": "Body Movements",
    "icon": "🏃",
    "difficulty": 1,
    "color": "#16a34a",
    "description": "Đứng, ngồi, đi bộ, chạy, nhảy, leo trèo, cúi gập, kéo giãn, ném bắt và sút bóng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_convenience_services",
    "name": "Dịch vụ & Tiện ích",
    "nameEn": "Convenience Services",
    "icon": "🏪",
    "difficulty": 1,
    "color": "#0891b2",
    "description": "Cửa hàng tiện lợi, tiệm giặt ủi, cắt tóc, sửa chữa, ATM, dịch vụ công.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_airport_station_travel",
    "name": "Sân bay & Nhà ga",
    "nameEn": "Airport & Station Travel",
    "icon": "🛫",
    "difficulty": 1,
    "color": "#0284c7",
    "description": "Nhà ga sân bay, cổng lên máy bay, thẻ lên tàu, hành lý, hải quan, chuyến bay.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_hotel_accommodation",
    "name": "Khách sạn & Lưu trú",
    "nameEn": "Hotel & Lodging",
    "icon": "🏨",
    "difficulty": 1,
    "color": "#3b82f6",
    "description": "Phòng khách sạn, thẻ từ, lễ tân, sảnh lớn, thang máy, nhận phòng và trả phòng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_street_food_snacks",
    "name": "Ẩm thực đường phố",
    "nameEn": "Street Food & Snacks",
    "icon": "🍢",
    "difficulty": 1,
    "color": "#ea580c",
    "description": "Món ăn vặt vỉa hè, nem rán, phở, bánh mì, bánh xèo, bắp rang, xiên nướng.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_life_stages_age",
    "name": "Giai đoạn cuộc đời",
    "nameEn": "Life Stages & Ages",
    "icon": "🌱",
    "difficulty": 1,
    "color": "#10b981",
    "description": "Em bé, thiếu niên, người lớn, người già, sinh nhật, thời thơ ấu và trưởng thành.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_holidays_customs",
    "name": "Lễ hội & Phong tục",
    "nameEn": "Holidays & Customs",
    "icon": "🎆",
    "difficulty": 1,
    "color": "#dc2626",
    "description": "Tết cổ truyền, Năm Mới, Giáng Sinh, đám cưới, quà tặng, pháo hoa và truyền thống.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_safety_warnings_rules",
    "name": "An toàn & Luật lệ",
    "nameEn": "Safety & Warning Rules",
    "icon": "🛡️",
    "difficulty": 1,
    "color": "#15803d",
    "description": "An toàn, cảnh báo, quy tắc, luật lệ, mũ bảo hiểm, dây an toàn và lối thoát hiểm.",
    "totalVocabs": 20
  },
  {
    "id": "t_basic_appliances_gadgets",
    "name": "Thiết bị & Gia dụng",
    "nameEn": "Appliances & Gadgets",
    "icon": "📺",
    "difficulty": 1,
    "color": "#0f766e",
    "description": "Máy giặt, máy sấy, bàn là, máy hút bụi, điều hòa, ti-vi, máy ảnh và sạc pin.",
    "totalVocabs": 20
  }
];

export const BASIC_VOCABULARIES: BasicVocabularyItem[] = [
  {
    "id": "bv_greeti_01",
    "word": "hello",
    "phonetic": "/həˈloʊ/",
    "definition": "Used as a greeting when meeting someone or answering the phone.",
    "definitionVn": "xin chào (thông dụng và thân thiện nhất)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hello, nice to meet you!",
      "She picked up the phone and said, 'Hello?'"
    ],
    "exampleTranslations": [
      "Xin chào, rất vui được gặp bạn!",
      "Cô ấy nhấc máy và nói: 'Xin chào?'"
    ],
    "synonyms": [
      "hi",
      "hey",
      "greetings"
    ],
    "antonyms": [
      "goodbye",
      "bye"
    ]
  },
  {
    "id": "bv_greeti_02",
    "word": "hi",
    "phonetic": "/haɪ/",
    "definition": "An informal greeting used when speaking to friends or family.",
    "definitionVn": "chào, xin chào (thân mật)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hi! How are you doing today?",
      "Hi everyone, thanks for coming."
    ],
    "exampleTranslations": [
      "Chào bạn! Hôm nay bạn thế nào?",
      "Chào cả nhà, cảm ơn mọi người đã đến."
    ],
    "synonyms": [
      "hello",
      "hey"
    ],
    "antonyms": [
      "bye"
    ]
  },
  {
    "id": "bv_greeti_03",
    "word": "hey",
    "phonetic": "/heɪ/",
    "definition": "A casual greeting to get someone's attention or say hi.",
    "definitionVn": "này, chào nhé (thân mật)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hey! Look at this picture!",
      "Hey John, how have you been?"
    ],
    "exampleTranslations": [
      "Này! Hãy nhìn bức tranh này đi!",
      "Chào John, dạo này bạn thế nào?"
    ],
    "synonyms": [
      "hi",
      "hello"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_04",
    "word": "good morning",
    "phonetic": "/ɡʊd ˈmɔːrnɪŋ/",
    "definition": "A polite greeting used in the morning before 12:00 PM.",
    "definitionVn": "chào buổi sáng (trước 12h trưa)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good morning, class! Please take your seats.",
      "Good morning! Did you sleep well?"
    ],
    "exampleTranslations": [
      "Chào buổi sáng cả lớp! Mời các em ngồi vào chỗ.",
      "Chào buổi sáng! Bạn ngủ ngon không?"
    ],
    "synonyms": [
      "morning"
    ],
    "antonyms": [
      "good night"
    ]
  },
  {
    "id": "bv_greeti_05",
    "word": "good afternoon",
    "phonetic": "/ɡʊd ˌæftərˈnuːn/",
    "definition": "A polite greeting used from 12:00 PM to 6:00 PM.",
    "definitionVn": "chào buổi chiều (từ 12h trưa đến 6h tối)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good afternoon, ladies and gentlemen.",
      "Good afternoon! How can I help you today?"
    ],
    "exampleTranslations": [
      "Chào buổi chiều quý ông và quý bà.",
      "Chào buổi chiều! Tôi có thể giúp gì cho bạn hôm nay?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_06",
    "word": "good evening",
    "phonetic": "/ɡʊd ˈiːvnɪŋ/",
    "definition": "A polite greeting used after 6:00 PM.",
    "definitionVn": "chào buổi tối (sau 6h tối khi gặp mặt)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good evening, welcome to our restaurant.",
      "Good evening, Mr. Johnson."
    ],
    "exampleTranslations": [
      "Chào buổi tối, chào mừng quý khách đến nhà hàng.",
      "Chào buổi tối, ông Johnson."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_07",
    "word": "goodbye",
    "phonetic": "/ɡʊdˈbaɪ/",
    "definition": "Said when leaving someone or at the end of a conversation.",
    "definitionVn": "tạm biệt (lời chào chia tay)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Goodbye, have a safe trip home!",
      "She waved and said goodbye."
    ],
    "exampleTranslations": [
      "Tạm biệt nhé, chúc bạn về nhà an toàn!",
      "Cô ấy vẫy tay và nói lời tạm biệt."
    ],
    "synonyms": [
      "bye",
      "farewell"
    ],
    "antonyms": [
      "hello"
    ]
  },
  {
    "id": "bv_greeti_08",
    "word": "bye",
    "phonetic": "/baɪ/",
    "definition": "A casual way to say goodbye to friends.",
    "definitionVn": "tạm biệt, chào nhé (ngắn gọn thân mật)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Bye! See you tomorrow at school.",
      "Okay, bye for now!"
    ],
    "exampleTranslations": [
      "Tạm biệt nhé! Hẹn gặp bạn ngày mai ở trường.",
      "Được rồi, tạm biệt bạn lúc này nhé!"
    ],
    "synonyms": [
      "goodbye"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_09",
    "word": "good night",
    "phonetic": "/ɡʊd naɪt/",
    "definition": "Said before going to sleep or leaving someone late at night.",
    "definitionVn": "chúc ngủ ngon (trước khi đi ngủ)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good night, sweet dreams!",
      "Mom kissed me and said, 'Good night.'"
    ],
    "exampleTranslations": [
      "Chúc ngủ ngon, mơ giấc mơ đẹp nhé!",
      "Mẹ hôn tôi và nói: 'Chúc con ngủ ngon.'"
    ],
    "synonyms": [
      "sleep well"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_10",
    "word": "please",
    "phonetic": "/pliːz/",
    "definition": "A polite word used when making a request or asking for something.",
    "definitionVn": "làm ơn, xin vui lòng (lịch sự khi yêu cầu)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Can you give me a glass of water, please?",
      "Please close the door when you leave."
    ],
    "exampleTranslations": [
      "Làm ơn cho tôi một ly nước được không?",
      "Xin vui lòng đóng cửa khi bạn rời đi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_11",
    "word": "thank you",
    "phonetic": "/ˈθæŋk juː/",
    "definition": "Used to express gratitude and appreciation.",
    "definitionVn": "cảm ơn bạn (trang trọng & phổ biến)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thank you very much for your kind help.",
      "Here is your coffee. — Thank you!"
    ],
    "exampleTranslations": [
      "Cảm ơn bạn rất nhiều vì sự giúp đỡ tốt bụng.",
      "Cà phê của bạn đây. — Cảm ơn bạn!"
    ],
    "synonyms": [
      "thanks",
      "many thanks"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_12",
    "word": "thanks",
    "phonetic": "/θæŋks/",
    "definition": "A friendly and casual way to say thank you.",
    "definitionVn": "cảm ơn nhé (thân mật)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thanks for the ride, John!",
      "Thanks a lot for the lovely gift."
    ],
    "exampleTranslations": [
      "Cảm ơn vì đã cho tôi đi nhờ xe nhé John!",
      "Cảm ơn rất nhiều vì món quà đáng yêu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_13",
    "word": "you're welcome",
    "phonetic": "/jɔːr ˈwelkəm/",
    "definition": "A polite reply when someone thanks you.",
    "definitionVn": "không có chi, không dám (đáp lại lời cảm ơn)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thank you for helping me! — You're welcome.",
      "You're welcome anytime, my friend."
    ],
    "exampleTranslations": [
      "Cảm ơn bạn đã giúp tôi! — Không có chi.",
      "Bất cứ lúc nào bạn cần, bạn luôn được hoan nghênh."
    ],
    "synonyms": [
      "no problem",
      "my pleasure"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_14",
    "word": "no problem",
    "phonetic": "/noʊ ˈprɑːbləm/",
    "definition": "Used to say that something is easy or you are happy to help.",
    "definitionVn": "không có vấn đề gì, đừng bận tâm",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thanks for holding the door! — No problem at all.",
      "Can you help me? — Sure, no problem!"
    ],
    "exampleTranslations": [
      "Cảm ơn vì đã giữ cửa! — Không có vấn đề gì cả.",
      "Bạn giúp tôi được không? — Chắc chắn rồi, không sao cả!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_15",
    "word": "sorry",
    "phonetic": "/ˈsɑːri/",
    "definition": "Used to apologize for a mistake or show sympathy.",
    "definitionVn": "xin lỗi, tôi rất tiếc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I am so sorry for being late today.",
      "Sorry, I did not hear what you said."
    ],
    "exampleTranslations": [
      "Tôi vô cùng xin lỗi vì hôm nay đến muộn.",
      "Xin lỗi, tôi không nghe rõ điều bạn vừa nói."
    ],
    "synonyms": [
      "pardon",
      "apologies"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_16",
    "word": "excuse me",
    "phonetic": "/ɪkˈskjuːz miː/",
    "definition": "Used to get someone's attention politely or apologize when passing.",
    "definitionVn": "xin lỗi cho tôi hỏi / xin nhường đường",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Excuse me, where is the nearest station?",
      "Excuse me, could you please repeat that?"
    ],
    "exampleTranslations": [
      "Xin lỗi cho tôi hỏi, ga tàu gần nhất ở đâu vậy?",
      "Xin lỗi, bạn có thể nhắc lại được không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_17",
    "word": "pardon",
    "phonetic": "/ˈpɑːrdn/",
    "definition": "Used to ask someone to repeat what they have just said.",
    "definitionVn": "xin thứ lỗi, xin nhắc lại (khi chưa nghe rõ)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Pardon? Could you speak a little louder, please?",
      "Pardon me, is this seat taken?"
    ],
    "exampleTranslations": [
      "Xin lỗi, bạn có thể nói to hơn một chút được không?",
      "Xin thứ lỗi, chỗ này đã có ai ngồi chưa ạ?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_18",
    "word": "welcome",
    "phonetic": "/ˈwelkəm/",
    "definition": "Used to greet someone arriving in a friendly manner.",
    "definitionVn": "hoan nghênh, chào đón",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Welcome to our home in Hanoi!",
      "Welcome back, everyone!"
    ],
    "exampleTranslations": [
      "Chào mừng các bạn đến ngôi nhà của chúng tôi tại Hà Nội!",
      "Chào mừng mọi người đã quay trở lại!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_19",
    "word": "yes",
    "phonetic": "/jes/",
    "definition": "Used to express agreement, confirmation, or positive answer.",
    "definitionVn": "vâng, có, đúng, đồng ý",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Are you ready? — Yes, I am ready.",
      "Yes, please! That sounds wonderful."
    ],
    "exampleTranslations": [
      "Bạn sẵn sàng chưa? — Vâng, tôi đã sẵn sàng.",
      "Vâng, làm ơn! Nghe tuyệt vời đấy."
    ],
    "synonyms": [
      "yeah",
      "sure"
    ],
    "antonyms": [
      "no"
    ]
  },
  {
    "id": "bv_greeti_20",
    "word": "no",
    "phonetic": "/noʊ/",
    "definition": "Used to express refusal, disagreement, or negative answer.",
    "definitionVn": "không, không phải (từ chối hoặc phủ định)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Do you want more tea? — No, thank you.",
      "No, this is not my bag."
    ],
    "exampleTranslations": [
      "Bạn có muốn thêm trà không? — Không, cảm ơn bạn.",
      "Không, đây không phải túi của tôi."
    ],
    "synonyms": [
      "nope"
    ],
    "antonyms": [
      "yes"
    ]
  },
  {
    "id": "bv_greeti_21",
    "word": "okay",
    "phonetic": "/oʊˈkeɪ/",
    "definition": "Used to express agreement or that everything is fine.",
    "definitionVn": "đồng ý, được rồi, ổn",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "We will meet at 5 PM, okay? — Okay, see you!",
      "Are you feeling okay now?"
    ],
    "exampleTranslations": [
      "Chúng ta gặp nhau lúc 5h chiều nhé? — Được rồi, hẹn gặp bạn!",
      "Bây giờ bạn thấy ổn chưa?"
    ],
    "synonyms": [
      "all right",
      "fine"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_22",
    "word": "sure",
    "phonetic": "/ʃʊr/",
    "definition": "Confident; certainly or gladly agreeing.",
    "definitionVn": "chắc chắn rồi, tất nhiên",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Can you give me a hand? — Sure, of course!",
      "Are you sure about this answer?"
    ],
    "exampleTranslations": [
      "Bạn giúp tôi một tay được không? — Chắc chắn rồi, tất nhiên!",
      "Bạn có chắc chắn về câu trả lời này không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_23",
    "word": "how are you",
    "phonetic": "/haʊ ɑːr juː/",
    "definition": "A common friendly question to ask about someone's health.",
    "definitionVn": "bạn có khỏe không? dạo này bạn thế nào?",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hello Sarah, how are you? — I am fine, thanks!",
      "How are you doing these days?"
    ],
    "exampleTranslations": [
      "Chào Sarah, bạn khỏe không? — Tôi khỏe, cảm ơn!",
      "Dạo này bạn thế nào rồi?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_24",
    "word": "nice to meet you",
    "phonetic": "/naɪs tuː miːt juː/",
    "definition": "A polite phrase said when meeting someone for the first time.",
    "definitionVn": "rất vui được gặp bạn (khi gặp gỡ lần đầu)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I am David. — Nice to meet you, David!",
      "It is very nice to meet you in person."
    ],
    "exampleTranslations": [
      "Tôi là David. — Rất vui được gặp bạn, David!",
      "Rất vui được gặp mặt trực tiếp bạn."
    ],
    "synonyms": [
      "pleased to meet you"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_25",
    "word": "see you",
    "phonetic": "/siː juː/",
    "definition": "A friendly way to say goodbye until the next meeting.",
    "definitionVn": "hẹn gặp lại bạn (lời chào hẹn gặp lần sau)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I have to go now. See you soon!",
      "See you later this evening at the party."
    ],
    "exampleTranslations": [
      "Tôi phải đi bây giờ rồi. Hẹn gặp lại bạn sớm!",
      "Hẹn gặp lại bạn tối nay ở bữa tiệc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_26",
    "word": "see you later",
    "phonetic": "/siː juː ˈleɪtər/",
    "definition": "Said when parting with someone you expect to see again later.",
    "definitionVn": "hẹn gặp lại bạn sau nhé",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I have a class now, see you later!",
      "See you later at the coffee shop."
    ],
    "exampleTranslations": [
      "Tôi có tiết học bây giờ rồi, hẹn gặp lại bạn sau!",
      "Hẹn gặp lại bạn sau ở quán cà phê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_27",
    "word": "have a nice day",
    "phonetic": "/hæv ə naɪs deɪ/",
    "definition": "A polite parting phrase wishing someone a pleasant day.",
    "definitionVn": "chúc bạn một ngày tốt lành!",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thank you for shopping. Have a nice day!",
      "Goodbye and have a wonderful day ahead!"
    ],
    "exampleTranslations": [
      "Cảm ơn quý khách đã mua sắm. Chúc một ngày tốt lành!",
      "Tạm biệt và chúc bạn một ngày tuyệt vời!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_28",
    "word": "take care",
    "phonetic": "/teɪk ker/",
    "definition": "Used to say goodbye to someone in a caring way.",
    "definitionVn": "bảo trọng nhé, giữ gìn sức khỏe nhé",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Goodbye, Minh! Take care on your way home.",
      "Take care and keep in touch."
    ],
    "exampleTranslations": [
      "Tạm biệt Minh! Đi đường cẩn thận giữ gìn sức khỏe nhé.",
      "Bảo trọng và giữ liên lạc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_29",
    "word": "congratulations",
    "phonetic": "/kənˌɡrætʃuˈleɪʃnz/",
    "definition": "Used to praise someone for an achievement or good fortune.",
    "definitionVn": "xin chúc mừng (khi ai đó thành công)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Congratulations on passing your English exam!",
      "Congratulations on your new job!"
    ],
    "exampleTranslations": [
      "Xin chúc mừng bạn đã vượt qua kỳ thi tiếng Anh!",
      "Chúc mừng bạn có công việc mới nhé!"
    ],
    "synonyms": [
      "congrats",
      "well done"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_30",
    "word": "cheers",
    "phonetic": "/tʃɪrz/",
    "definition": "Used as a toast when drinking or a friendly informal goodbye/thanks.",
    "definitionVn": "cạn ly! / cảm ơn nhé / tạm biệt nhé",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Cheers to our friendship and success!",
      "Cheers mate, see you tomorrow."
    ],
    "exampleTranslations": [
      "Cạn ly chúc mừng tình bạn và thành công của chúng ta!",
      "Cảm ơn bạn nhé, hẹn gặp ngày mai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_01",
    "word": "I",
    "phonetic": "/aɪ/",
    "definition": "Used by a speaker to refer to himself or herself.",
    "definitionVn": "tôi, mình, tớ (ngôi thứ nhất số ít)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I am a student at the university.",
      "I like to read English books every day."
    ],
    "exampleTranslations": [
      "Tôi là sinh viên trường đại học.",
      "Tôi thích đọc sách tiếng Anh mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_02",
    "word": "you",
    "phonetic": "/juː/",
    "definition": "Used to refer to the person or people being spoken to.",
    "definitionVn": "bạn, các bạn, anh, chị (ngôi thứ hai)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "You are very kind and helpful.",
      "Where are you from?"
    ],
    "exampleTranslations": [
      "Bạn thật tốt bụng và nhiệt tình.",
      "Bạn đến từ đâu vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_03",
    "word": "he",
    "phonetic": "/hiː/",
    "definition": "Used to refer to a male person previously mentioned.",
    "definitionVn": "anh ấy, ông ấy, cậu ấy (ngôi thứ ba số ít nam)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "He is my English teacher.",
      "He lives in New York City."
    ],
    "exampleTranslations": [
      "Thầy ấy là giáo viên tiếng Anh của tôi.",
      "Anh ấy sống ở thành phố New York."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_04",
    "word": "she",
    "phonetic": "/ʃiː/",
    "definition": "Used to refer to a female person previously mentioned.",
    "definitionVn": "cô ấy, bà ấy, chị ấy (ngôi thứ ba số ít nữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She has a warm voice.",
      "She works at a local hospital."
    ],
    "exampleTranslations": [
      "Cô ấy có giọng nói ấm áp.",
      "Cô ấy làm việc tại bệnh viện địa phương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_05",
    "word": "we",
    "phonetic": "/wiː/",
    "definition": "Used to refer to the speaker and one or more other people.",
    "definitionVn": "chúng tôi, chúng ta (ngôi thứ nhất số nhiều)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "We are good friends since childhood.",
      "We love studying English together."
    ],
    "exampleTranslations": [
      "Chúng tôi là bạn tốt từ thuở nhỏ.",
      "Chúng tôi thích cùng nhau học tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_06",
    "word": "they",
    "phonetic": "/ðeɪ/",
    "definition": "Used to refer to two or more people or things.",
    "definitionVn": "họ, chúng nó (ngôi thứ ba số nhiều)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "They are playing soccer in the park.",
      "They are very friendly neighbors."
    ],
    "exampleTranslations": [
      "Họ đang chơi bóng đá trong công viên.",
      "Họ là những người hàng xóm rất thân thiện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_07",
    "word": "it",
    "phonetic": "/ɪt/",
    "definition": "Used to refer to an animal, thing, or situation.",
    "definitionVn": "nó, điều đó (đồ vật, con vật hoặc sự việc)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Look at that cute cat! It is sleeping.",
      "It is raining outside right now."
    ],
    "exampleTranslations": [
      "Hãy nhìn chú mèo dễ thương kia! Nó đang ngủ.",
      "Bên ngoài trời đang mưa vào lúc này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_08",
    "word": "me",
    "phonetic": "/miː/",
    "definition": "Used by a speaker to refer to himself or herself as an object.",
    "definitionVn": "tôi, mình (tân ngữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Can you help me with this exercise?",
      "Give me a call when you arrive."
    ],
    "exampleTranslations": [
      "Bạn có thể giúp tôi bài tập này không?",
      "Hãy gọi cho tôi khi bạn đến nơi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_09",
    "word": "him",
    "phonetic": "/hɪm/",
    "definition": "Used as the object of a verb or preposition to refer to a male.",
    "definitionVn": "anh ấy, cậu ấy (tân ngữ nam)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I saw him at the library yesterday.",
      "Tell him to come here, please."
    ],
    "exampleTranslations": [
      "Hôm qua tôi thấy anh ấy ở thư viện.",
      "Làm ơn bảo cậu ấy lại đây nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_10",
    "word": "her",
    "phonetic": "/hɜːr/",
    "definition": "Used as the object of a verb or preposition to refer to a female.",
    "definitionVn": "cô ấy, chị ấy (tân ngữ nữ / của cô ấy)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I gave her a bunch of flowers.",
      "This is her new backpack."
    ],
    "exampleTranslations": [
      "Tôi đã tặng cô ấy một bó hoa.",
      "Đây là chiếc ba lô mới của cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_11",
    "word": "us",
    "phonetic": "/ʌs/",
    "definition": "Used by a speaker to refer to himself or herself and one or more other people as the object of a verb.",
    "definitionVn": "chúng tôi, chúng ta (tân ngữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Join us for lunch today!",
      "The teacher gave us interesting homework."
    ],
    "exampleTranslations": [
      "Cùng đi ăn trưa với chúng tôi hôm nay nhé!",
      "Thầy giáo đã giao cho chúng tôi bài tập rất thú vị."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_12",
    "word": "them",
    "phonetic": "/ðem/",
    "definition": "Used as the object of a verb or preposition to refer to two or more people or things.",
    "definitionVn": "họ, chúng nó (tân ngữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I invited them to my birthday party.",
      "Look at those flowers; water them daily."
    ],
    "exampleTranslations": [
      "Tôi đã mời họ đến dự tiệc sinh nhật của mình.",
      "Hãy nhìn những bông hoa kia; tưới nước cho chúng hàng ngày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_13",
    "word": "my",
    "phonetic": "/maɪ/",
    "definition": "Belonging to or associated with the speaker.",
    "definitionVn": "của tôi (tính từ sở hữu)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "This is my favorite English notebook.",
      "My dream is to travel around the world."
    ],
    "exampleTranslations": [
      "Đây là cuốn sổ tay tiếng Anh yêu thích của tôi.",
      "Ước mơ của tôi là được đi du lịch vòng quanh thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_14",
    "word": "your",
    "phonetic": "/jɔːr/",
    "definition": "Belonging to or associated with the person being addressed.",
    "definitionVn": "của bạn, của các bạn",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your favorite hobby?",
      "Is this your new smartphone?"
    ],
    "exampleTranslations": [
      "Sở thích yêu thích của bạn là gì?",
      "Đây có phải điện thoại mới của bạn không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_15",
    "word": "his",
    "phonetic": "/hɪz/",
    "definition": "Belonging to or associated with a male person.",
    "definitionVn": "của anh ấy, của cậu ấy",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "His car is parked outside the gate.",
      "He loves his job as an architect."
    ],
    "exampleTranslations": [
      "Xe của anh ấy đỗ ngoài cổng.",
      "Anh ấy yêu công việc kiến trúc sư của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_16",
    "word": "our",
    "phonetic": "/ˈaʊər/",
    "definition": "Belonging to or associated with the speaker and others.",
    "definitionVn": "của chúng tôi, của chúng ta",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Welcome to our new English club!",
      "Our house has a lovely garden."
    ],
    "exampleTranslations": [
      "Chào mừng đến với câu lạc bộ tiếng Anh của chúng tôi!",
      "Nhà của chúng tôi có khu vườn xinh xắn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_17",
    "word": "their",
    "phonetic": "/ðer/",
    "definition": "Belonging to or associated with the people or things mentioned.",
    "definitionVn": "của họ, của chúng nó",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Their children go to international school.",
      "They love their cozy apartment."
    ],
    "exampleTranslations": [
      "Con cái của họ học trường quốc tế.",
      "Họ rất yêu căn hộ ấm cúng của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_18",
    "word": "this",
    "phonetic": "/ðɪs/",
    "definition": "Used to identify a specific person or thing close at hand.",
    "definitionVn": "cái này, người này, đây (ở gần)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "This is my best friend, David.",
      "This book is very interesting."
    ],
    "exampleTranslations": [
      "Đây là bạn thân nhất của tôi, David.",
      "Cuốn sách này rất thú vị."
    ],
    "synonyms": [],
    "antonyms": [
      "that"
    ]
  },
  {
    "id": "bv_introd_19",
    "word": "that",
    "phonetic": "/ðæt/",
    "definition": "Used to identify a specific person or thing observed by the speaker.",
    "definitionVn": "cái đó, người kia, đó (ở xa)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Who is that girl standing over there?",
      "That is a great idea!"
    ],
    "exampleTranslations": [
      "Cô gái đang đứng đằng kia là ai vậy?",
      "Đó là một ý kiến tuyệt vời!"
    ],
    "synonyms": [],
    "antonyms": [
      "this"
    ]
  },
  {
    "id": "bv_introd_20",
    "word": "who",
    "phonetic": "/huː/",
    "definition": "Used to ask what or which person or people.",
    "definitionVn": "ai, người nào (từ để hỏi)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Who is your English teacher?",
      "Who wants to answer the question?"
    ],
    "exampleTranslations": [
      "Ai là giáo viên tiếng Anh của bạn?",
      "Ai muốn trả lời câu hỏi này nào?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_21",
    "word": "what",
    "phonetic": "/wʌt/",
    "definition": "Asking for information specifying something.",
    "definitionVn": "cái gì, gì (từ để hỏi)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your name?",
      "What are you studying right now?"
    ],
    "exampleTranslations": [
      "Tên bạn là gì?",
      "Bạn đang học gì vào lúc này thế?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_22",
    "word": "where",
    "phonetic": "/wer/",
    "definition": "In or to what place or position.",
    "definitionVn": "ở đâu, nơi nào (từ để hỏi)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Where do you live in Vietnam?",
      "Where is the library located?"
    ],
    "exampleTranslations": [
      "Bạn sống ở đâu tại Việt Nam?",
      "Thư viện nằm ở vị trí nào vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_23",
    "word": "name",
    "phonetic": "/neɪm/",
    "definition": "A word by which a person, animal, or thing is known.",
    "definitionVn": "tên, họ tên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your name? — My name is Minh.",
      "Please write your full name here."
    ],
    "exampleTranslations": [
      "Tên bạn là gì? — Tên tôi là Minh.",
      "Vui lòng viết đầy đủ họ tên vào đây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_24",
    "word": "age",
    "phonetic": "/eɪdʒ/",
    "definition": "The length of time that a person has lived.",
    "definitionVn": "tuổi, số tuổi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She learned English at the age of six.",
      "What is your age? — I am twenty."
    ],
    "exampleTranslations": [
      "Cô ấy học tiếng Anh từ năm 6 tuổi.",
      "Bạn bao nhiêu tuổi? — Tôi 20 tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_25",
    "word": "friend",
    "phonetic": "/frend/",
    "definition": "A person whom one knows and has a bond of affection with.",
    "definitionVn": "bạn bè, người bạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She is my best friend in class.",
      "I went to the cinema with friends."
    ],
    "exampleTranslations": [
      "Cô ấy là bạn thân nhất của tôi trong lớp.",
      "Tôi đã đi xem phim cùng bạn bè."
    ],
    "synonyms": [
      "pal",
      "buddy"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_26",
    "word": "boy",
    "phonetic": "/bɔɪ/",
    "definition": "A male child or young man.",
    "definitionVn": "cậu bé, bé trai, chàng trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "The little boy is flying a colorful kite.",
      "He is a clever and polite boy."
    ],
    "exampleTranslations": [
      "Cậu bé đang thả con diều nhiều màu sắc.",
      "Cậu ấy là một chàng trai thông minh và lễ phép."
    ],
    "synonyms": [],
    "antonyms": [
      "girl"
    ]
  },
  {
    "id": "bv_introd_27",
    "word": "girl",
    "phonetic": "/ɡɜːrl/",
    "definition": "A female child or young woman.",
    "definitionVn": "cô bé, bé gái, cô gái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "The girl has long black hair.",
      "She is the smartest girl in our school."
    ],
    "exampleTranslations": [
      "Cô bé có mái tóc đen dài.",
      "Cô ấy là nữ sinh thông minh nhất trường chúng tôi."
    ],
    "synonyms": [],
    "antonyms": [
      "boy"
    ]
  },
  {
    "id": "bv_introd_28",
    "word": "man",
    "phonetic": "/mæn/",
    "definition": "An adult human male.",
    "definitionVn": "người đàn ông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "A kind man helped me carry my heavy suitcase.",
      "He is a wise and experienced man."
    ],
    "exampleTranslations": [
      "Một người đàn ông tốt bụng đã giúp tôi xách chiếc vali nặng.",
      "Ông ấy là người đàn ông thông thái và giàu kinh nghiệm."
    ],
    "synonyms": [],
    "antonyms": [
      "woman"
    ]
  },
  {
    "id": "bv_introd_29",
    "word": "woman",
    "phonetic": "/ˈwʊmən/",
    "definition": "An adult human female.",
    "definitionVn": "người phụ nữ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She is a strong and independent woman.",
      "The woman smiled warmly at the children."
    ],
    "exampleTranslations": [
      "Cô ấy là một người phụ nữ mạnh mẽ và tự lập.",
      "Người phụ nữ mỉm cười ấm áp với các em nhỏ."
    ],
    "synonyms": [],
    "antonyms": [
      "man"
    ]
  },
  {
    "id": "bv_introd_30",
    "word": "person",
    "phonetic": "/ˈpɜːrsn/",
    "definition": "A human being regarded as an individual.",
    "definitionVn": "người, con người (số ít)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She is a very friendly and positive person.",
      "Only one person can enter at a time."
    ],
    "exampleTranslations": [
      "Cô ấy là một người rất thân thiện và tích cực.",
      "Mỗi lần chỉ một người được bước vào."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_31",
    "word": "people",
    "phonetic": "/ˈpiːpl/",
    "definition": "Human beings in general or considered collectively.",
    "definitionVn": "mọi người, con người (số nhiều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Many people enjoy traveling in the summer.",
      "The people here are very welcoming."
    ],
    "exampleTranslations": [
      "Nhiều người thích đi du lịch vào mùa hè.",
      "Người dân ở đây rất hiếu khách."
    ],
    "synonyms": [
      "humans"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_32",
    "word": "student",
    "phonetic": "/ˈstjuːdnt/",
    "definition": "A person studying at a school, college, or university.",
    "definitionVn": "học sinh, sinh viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Every student should practice speaking English.",
      "She is a hard-working student."
    ],
    "exampleTranslations": [
      "Mỗi học sinh nên luyện nói tiếng Anh.",
      "Cô ấy là một học sinh rất chăm chỉ."
    ],
    "synonyms": [
      "learner",
      "pupil"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_33",
    "word": "teacher",
    "phonetic": "/ˈtiːtʃər/",
    "definition": "A person who teaches, especially in a school.",
    "definitionVn": "thầy giáo, cô giáo, giáo viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Our English teacher is very enthusiastic.",
      "Teachers inspire students to succeed."
    ],
    "exampleTranslations": [
      "Giáo viên tiếng Anh của chúng tôi rất nhiệt tình.",
      "Các thầy cô truyền cảm hứng cho học sinh thành công."
    ],
    "synonyms": [
      "instructor"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_34",
    "word": "country",
    "phonetic": "/ˈkʌntri/",
    "definition": "A nation with its own government and territory.",
    "definitionVn": "quốc gia, đất nước, quê hương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Vietnam is a beautiful country with rich culture.",
      "Which country would you like to visit?"
    ],
    "exampleTranslations": [
      "Việt Nam là đất nước tươi đẹp với nền văn hóa phong phú.",
      "Bạn muốn đến thăm quốc gia nào nhất?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_35",
    "word": "job",
    "phonetic": "/dʒɑːb/",
    "definition": "A paid position of regular employment.",
    "definitionVn": "công việc, nghề nghiệp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your dream job? — I want to be a doctor.",
      "She applied for a new job yesterday."
    ],
    "exampleTranslations": [
      "Công việc mơ ước của bạn là gì? — Tôi muốn làm bác sĩ.",
      "Hôm qua cô ấy đã nộp đơn ứng tuyển công việc mới."
    ],
    "synonyms": [
      "career",
      "occupation"
    ],
    "antonyms": []
  },
  {
    "id": "bv_number_01",
    "word": "zero",
    "phonetic": "/ˈzɪroʊ/",
    "definition": "The numerical value 0; no quantity.",
    "definitionVn": "số không (0)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "The temperature dropped to zero degrees.",
      "My phone number ends with zero."
    ],
    "exampleTranslations": [
      "Nhiệt độ đã giảm xuống không độ.",
      "Số điện thoại của tôi kết thúc bằng số 0."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_02",
    "word": "one",
    "phonetic": "/wʌn/",
    "definition": "The number 1; single unit.",
    "definitionVn": "số một (1)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "I have one brother and two sisters.",
      "Just one moment, please!"
    ],
    "exampleTranslations": [
      "Tôi có một anh trai và hai chị gái.",
      "Làm ơn đợi một lát thôi ạ!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_03",
    "word": "two",
    "phonetic": "/tuː/",
    "definition": "The number 2; a pair.",
    "definitionVn": "số hai (2)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Can I have two cups of coffee, please?",
      "There are two dogs in the garden."
    ],
    "exampleTranslations": [
      "Cho tôi hai tách cà phê được không?",
      "Có hai chú chó trong khu vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_04",
    "word": "three",
    "phonetic": "/θriː/",
    "definition": "The number 3.",
    "definitionVn": "số ba (3)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "She has three cats at home.",
      "The meeting starts in three minutes."
    ],
    "exampleTranslations": [
      "Cô ấy nuôi ba chú mèo ở nhà.",
      "Cuộc họp bắt đầu trong ba phút nữa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_05",
    "word": "four",
    "phonetic": "/fɔːr/",
    "definition": "The number 4.",
    "definitionVn": "số bốn (4)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "A table usually has four legs.",
      "There are four seasons in a year."
    ],
    "exampleTranslations": [
      "Một chiếc bàn thường có bốn chân.",
      "Có bốn mùa trong một năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_06",
    "word": "five",
    "phonetic": "/faɪv/",
    "definition": "The number 5.",
    "definitionVn": "số năm (5)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "High five! You did a great job.",
      "We take a five-minute break."
    ],
    "exampleTranslations": [
      "Đập tay nào! Bạn đã làm rất tốt.",
      "Chúng tôi nghỉ giải lao năm phút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_07",
    "word": "six",
    "phonetic": "/sɪks/",
    "definition": "The number 6.",
    "definitionVn": "số sáu (6)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "I wake up at six o'clock every morning.",
      "There are six apples in the basket."
    ],
    "exampleTranslations": [
      "Tôi thức dậy lúc 6 giờ mỗi sáng.",
      "Có sáu quả táo trong chiếc giỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_08",
    "word": "seven",
    "phonetic": "/ˈsevn/",
    "definition": "The number 7.",
    "definitionVn": "số bảy (7)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are seven days in a week.",
      "The rainbow has seven colors."
    ],
    "exampleTranslations": [
      "Có bảy ngày trong một tuần lễ.",
      "Cầu vồng có bảy sắc màu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_09",
    "word": "eight",
    "phonetic": "/eɪt/",
    "definition": "The number 8.",
    "definitionVn": "số tám (8)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "An octopus has eight arms.",
      "We sleep for eight hours a night."
    ],
    "exampleTranslations": [
      "Con bạch tuộc có tám chiếc xúc tu.",
      "Chúng ta ngủ tám tiếng mỗi đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_10",
    "word": "nine",
    "phonetic": "/naɪn/",
    "definition": "The number 9.",
    "definitionVn": "số chín (9)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Nine is my lucky number.",
      "The shop opens at nine in the morning."
    ],
    "exampleTranslations": [
      "Số chín là số may mắn của tôi.",
      "Cửa hàng mở cửa lúc 9 giờ sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_11",
    "word": "ten",
    "phonetic": "/ten/",
    "definition": "The number 10.",
    "definitionVn": "số mười (10)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "We have ten fingers on our hands.",
      "Count from one to ten, please."
    ],
    "exampleTranslations": [
      "Chúng ta có mười ngón tay.",
      "Làm ơn đếm từ một đến mười nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_12",
    "word": "eleven",
    "phonetic": "/ɪˈlevn/",
    "definition": "The number 11 (10 + 1).",
    "definitionVn": "số mười một (11)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are eleven players in a football team.",
      "The clock struck eleven."
    ],
    "exampleTranslations": [
      "Có mười một cầu thủ trong một đội bóng đá.",
      "Đồng hồ đã điểm mười một giờ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_13",
    "word": "twelve",
    "phonetic": "/twelv/",
    "definition": "The number 12; a dozen.",
    "definitionVn": "số mười hai (12), một tá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are twelve months in a year.",
      "She bought a dozen eggs (twelve eggs)."
    ],
    "exampleTranslations": [
      "Có mười hai tháng trong một năm.",
      "Cô ấy mua một tá trứng (12 quả)."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_14",
    "word": "thirteen",
    "phonetic": "/ˌθɜːrˈtiːn/",
    "definition": "The number 13 (10 + 3).",
    "definitionVn": "số mười ba (13)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "A teenager is thirteen or older.",
      "Friday the thirteenth is famous in lore."
    ],
    "exampleTranslations": [
      "Thiếu niên là người từ mười ba tuổi trở lên.",
      "Thứ Sáu ngày mười ba nổi tiếng trong văn hóa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_15",
    "word": "fifteen",
    "phonetic": "/ˌfɪfˈtiːn/",
    "definition": "The number 15 (10 + 5).",
    "definitionVn": "số mười lăm (15)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "A quarter of an hour is fifteen minutes.",
      "She is fifteen years old."
    ],
    "exampleTranslations": [
      "Một phần tư giờ là mười lăm phút.",
      "Cô ấy mười lăm tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_16",
    "word": "twenty",
    "phonetic": "/ˈtwenti/",
    "definition": "The number 20 (2 x 10).",
    "definitionVn": "số hai mươi (20)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "She celebrated her twentieth birthday.",
      "There are twenty students in the class."
    ],
    "exampleTranslations": [
      "Cô ấy tổ chức sinh nhật lần thứ hai mươi.",
      "Có hai mươi học sinh trong lớp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_17",
    "word": "thirty",
    "phonetic": "/ˈθɜːrti/",
    "definition": "The number 30 (3 x 10).",
    "definitionVn": "số ba mươi (30)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are thirty days in April.",
      "He has been teaching for thirty years."
    ],
    "exampleTranslations": [
      "Có ba mươi ngày trong tháng Tư.",
      "Thầy đã giảng dạy được ba mươi năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_18",
    "word": "fifty",
    "phonetic": "/ˈfɪfti/",
    "definition": "The number 50.",
    "definitionVn": "số năm mươi (50)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "He drove fifty kilometers to see us.",
      "This shirt costs fifty dollars."
    ],
    "exampleTranslations": [
      "Anh ấy lái xe năm mươi cây số đến thăm chúng tôi.",
      "Chiếc áo này có giá năm mươi đô la."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_19",
    "word": "hundred",
    "phonetic": "/ˈhʌndrəd/",
    "definition": "The number 100.",
    "definitionVn": "một trăm (100)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "This book has two hundred pages.",
      "I scored one hundred percent."
    ],
    "exampleTranslations": [
      "Cuốn sách này có hai trăm trang.",
      "Tôi đạt điểm tối đa một trăm phần trăm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_20",
    "word": "thousand",
    "phonetic": "/ˈθaʊznd/",
    "definition": "The number 1,000.",
    "definitionVn": "một nghìn, một ngàn (1.000)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Over one thousand people joined.",
      "It costs one thousand dollars."
    ],
    "exampleTranslations": [
      "Hơn một nghìn người đã tham gia.",
      "Nó có giá một nghìn đô la."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_21",
    "word": "first",
    "phonetic": "/fɜːrst/",
    "definition": "Coming before all others in time or order (1st).",
    "definitionVn": "thứ nhất, đầu tiên (số thứ tự)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Today is my first day at school.",
      "He won first place in the contest."
    ],
    "exampleTranslations": [
      "Hôm nay là ngày đầu tiên tôi đi học.",
      "Cậu ấy giành giải nhất trong cuộc thi."
    ],
    "synonyms": [],
    "antonyms": [
      "last"
    ]
  },
  {
    "id": "bv_number_22",
    "word": "second",
    "phonetic": "/ˈsekənd/",
    "definition": "Number two in sequence (2nd); a unit of time.",
    "definitionVn": "thứ hai (thứ tự), giây (thời gian)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "She lives on the second floor.",
      "Wait just a second, please."
    ],
    "exampleTranslations": [
      "Cô ấy sống ở tầng hai.",
      "Làm ơn đợi một giây thôi ạ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_23",
    "word": "third",
    "phonetic": "/θɜːrd/",
    "definition": "Number three in sequence (3rd); 1/3 part.",
    "definitionVn": "thứ ba (thứ tự), một phần ba",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "This is my third time visiting Da Nang.",
      "One third of students speak English."
    ],
    "exampleTranslations": [
      "Đây là lần thứ ba tôi đến Đà Nẵng.",
      "Một phần ba học sinh nói tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_24",
    "word": "last",
    "phonetic": "/læst/",
    "definition": "Coming after all others in time or order.",
    "definitionVn": "cuối cùng, sau chót",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "This is the last bus of the evening.",
      "Who was the last person to leave?"
    ],
    "exampleTranslations": [
      "Đây là chuyến xe buýt cuối cùng trong tối.",
      "Ai là người cuối cùng rời đi?"
    ],
    "synonyms": [],
    "antonyms": [
      "first"
    ]
  },
  {
    "id": "bv_number_25",
    "word": "many",
    "phonetic": "/ˈmeni/",
    "definition": "A large number of countable things or people.",
    "definitionVn": "nhiều (dùng cho danh từ đếm được)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are many flowers in the park.",
      "How many books do you read a year?"
    ],
    "exampleTranslations": [
      "Có rất nhiều bông hoa trong công viên.",
      "Bạn đọc bao nhiêu cuốn sách mỗi năm?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_01",
    "word": "red",
    "phonetic": "/red/",
    "definition": "Of a color like blood or a ripe apple.",
    "definitionVn": "màu đỏ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She wore a beautiful red dress.",
      "Red is the color of passion."
    ],
    "exampleTranslations": [
      "Cô ấy mặc chiếc váy đỏ tuyệt đẹp.",
      "Màu đỏ là màu của đam mê."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_02",
    "word": "blue",
    "phonetic": "/bluː/",
    "definition": "Of a color like that of the clear sky or ocean.",
    "definitionVn": "màu xanh da trời, xanh lam",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The sky is bright blue today.",
      "He loves wearing his blue jacket."
    ],
    "exampleTranslations": [
      "Bầu trời hôm nay xanh ngắt.",
      "Anh ấy thích mặc áo khoác màu xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_03",
    "word": "green",
    "phonetic": "/ɡriːn/",
    "definition": "Of the color of fresh grass or leaves.",
    "definitionVn": "màu xanh lá cây",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The grass in the garden is green.",
      "Green tea is good for your health."
    ],
    "exampleTranslations": [
      "Cỏ trong vườn xanh mướt.",
      "Trà xanh rất tốt cho sức khỏe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_04",
    "word": "yellow",
    "phonetic": "/ˈjeloʊ/",
    "definition": "Of a color like ripe lemons or sunshine.",
    "definitionVn": "màu vàng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Bananas turn yellow when ripe.",
      "Sunflowers have bright yellow petals."
    ],
    "exampleTranslations": [
      "Chuối chuyển sang màu vàng khi chín.",
      "Hoa hướng dương có cánh hoa vàng tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_05",
    "word": "white",
    "phonetic": "/waɪt/",
    "definition": "Of the color of milk or fresh snow.",
    "definitionVn": "màu trắng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "He wore a clean white shirt.",
      "The peaks are covered with white snow."
    ],
    "exampleTranslations": [
      "Anh ấy mặc áo sơ mi trắng sạch sẽ.",
      "Các đỉnh núi phủ đầy tuyết trắng."
    ],
    "synonyms": [],
    "antonyms": [
      "black"
    ]
  },
  {
    "id": "bv_colors_06",
    "word": "black",
    "phonetic": "/blæk/",
    "definition": "Of the darkest color without light.",
    "definitionVn": "màu đen",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She has shiny black hair.",
      "I drink black coffee without sugar."
    ],
    "exampleTranslations": [
      "Cô ấy có mái tóc đen nhánh.",
      "Tôi uống cà phê đen không đường."
    ],
    "synonyms": [],
    "antonyms": [
      "white"
    ]
  },
  {
    "id": "bv_colors_07",
    "word": "orange",
    "phonetic": "/ˈɔːrɪndʒ/",
    "definition": "Of a color between red and yellow.",
    "definitionVn": "màu cam, quả cam",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The sunset sky turned brilliant orange.",
      "She peeled a sweet orange."
    ],
    "exampleTranslations": [
      "Bầu trời hoàng hôn chuyển màu cam rực rỡ.",
      "Cô ấy bóc một quả cam ngọt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_08",
    "word": "pink",
    "phonetic": "/pɪŋk/",
    "definition": "Of a color between red and white.",
    "definitionVn": "màu hồng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Cherry blossoms have delicate pink petals.",
      "Her daughter loves wearing pink."
    ],
    "exampleTranslations": [
      "Hoa anh đào có cánh màu hồng e ấp.",
      "Con gái cô ấy thích mặc đồ màu hồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_09",
    "word": "purple",
    "phonetic": "/ˈpɜːrpl/",
    "definition": "Of a color between red and blue.",
    "definitionVn": "màu tím",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Grapes turn deep purple when ripe.",
      "She painted her bedroom wall purple."
    ],
    "exampleTranslations": [
      "Những quả nho chuyển sang màu tím đậm khi chín.",
      "Cô ấy sơn tường phòng ngủ màu tím."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_10",
    "word": "brown",
    "phonetic": "/braʊn/",
    "definition": "Of a color like that of wood or chocolate.",
    "definitionVn": "màu nâu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "He wore classic brown leather shoes.",
      "Chocolate has a rich brown color."
    ],
    "exampleTranslations": [
      "Anh ấy đi đôi giày da màu nâu cổ điển.",
      "Sô cô la có màu nâu đậm đà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_11",
    "word": "gray",
    "phonetic": "/ɡreɪ/",
    "definition": "Of a color between black and white.",
    "definitionVn": "màu xám, màu ghi",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Dark gray clouds brought heavy rain.",
      "He has stylish gray hair."
    ],
    "exampleTranslations": [
      "Mây xám xịt mang đến cơn mưa rào.",
      "Ông ấy có mái tóc màu xám rất phong độ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_12",
    "word": "gold",
    "phonetic": "/ɡoʊld/",
    "definition": "A deep yellow color or precious yellow metal.",
    "definitionVn": "màu vàng kim, vàng bạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She wore an elegant gold necklace.",
      "The morning sun was shining like gold."
    ],
    "exampleTranslations": [
      "Cô ấy đeo chiếc vòng cổ vàng quý phái.",
      "Ánh nắng ban mai tỏa sáng như vàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_13",
    "word": "silver",
    "phonetic": "/ˈsɪlvər/",
    "definition": "A precious shiny grayish-white metallic color.",
    "definitionVn": "màu bạc, ánh bạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She wore a shiny silver ring.",
      "The airplane has a sleek silver body."
    ],
    "exampleTranslations": [
      "Cô ấy đeo một chiếc nhẫn bạc sáng lấp lánh.",
      "Chiếc máy bay có thân màu bạc bóng bẩy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_14",
    "word": "circle",
    "phonetic": "/ˈsɜːrkl/",
    "definition": "A perfectly round flat geometric shape.",
    "definitionVn": "hình tròn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The students sat in a big circle.",
      "Draw a circle on the paper."
    ],
    "exampleTranslations": [
      "Học sinh ngồi thành vòng tròn lớn.",
      "Hãy vẽ một hình tròn trên giấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_15",
    "word": "square",
    "phonetic": "/skwer/",
    "definition": "A plane shape with 4 equal straight sides.",
    "definitionVn": "hình vuông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "A chessboard has 64 squares.",
      "Cut the paper into small squares."
    ],
    "exampleTranslations": [
      "Bàn cờ vua có 64 ô vuông.",
      "Hãy cắt giấy thành các ô vuông nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_16",
    "word": "triangle",
    "phonetic": "/ˈtraɪæŋɡl/",
    "definition": "A plane figure with three straight sides and three angles.",
    "definitionVn": "hình tam giác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "A road yield sign is shaped like a triangle.",
      "Pyramids have triangular sides."
    ],
    "exampleTranslations": [
      "Biển báo giao thông hình tam giác.",
      "Kim tự tháp có các mặt hình tam giác."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_17",
    "word": "rectangle",
    "phonetic": "/ˈrektæŋɡl/",
    "definition": "A plane figure with four straight sides and four right angles.",
    "definitionVn": "hình chữ nhật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "A door is shaped like a tall rectangle.",
      "The smartphone has a rectangular screen."
    ],
    "exampleTranslations": [
      "Cánh cửa có hình chữ nhật đứng.",
      "Điện thoại có màn hình hình chữ nhật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_18",
    "word": "star",
    "phonetic": "/stɑːr/",
    "definition": "A shape with five or more points; heavenly body.",
    "definitionVn": "hình ngôi sao, vì sao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The Vietnamese flag has a yellow star.",
      "Stars shine brightly in the night sky."
    ],
    "exampleTranslations": [
      "Quốc kỳ Việt Nam có ngôi sao vàng.",
      "Các vì sao tỏa sáng rực rỡ ban đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_19",
    "word": "heart",
    "phonetic": "/hɑːrt/",
    "definition": "A symmetrical shape representing love; bodily organ.",
    "definitionVn": "hình trái tim, quả tim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She drew a red heart on the birthday card.",
      "Love comes straight from the heart."
    ],
    "exampleTranslations": [
      "Cô ấy vẽ hình trái tim đỏ trên thiệp.",
      "Tình yêu bắt nguồn từ trái tim."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_20",
    "word": "round",
    "phonetic": "/raʊnd/",
    "definition": "Shaped like a circle or cylinder.",
    "definitionVn": "tròn, có dạng hình tròn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The full moon is perfectly round.",
      "We gathered around the round dining table."
    ],
    "exampleTranslations": [
      "Mặt trăng tròn vành vạnh.",
      "Chúng tôi quây quần bên bàn ăn tròn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_21",
    "word": "color",
    "phonetic": "/ˈkʌlər/",
    "definition": "The property possessed by an object of producing different sensations on the eye.",
    "definitionVn": "màu sắc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "What is your favorite color?",
      "Flowers bring vibrant colors to life."
    ],
    "exampleTranslations": [
      "Màu sắc yêu thích của bạn là gì?",
      "Những bông hoa mang màu sắc rực rỡ đến cuộc sống."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_01",
    "word": "family",
    "phonetic": "/ˈfæməli/",
    "definition": "A group consisting of parents and children living together.",
    "definitionVn": "gia đình, tổ ấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Family is the most important thing in life.",
      "We spend Sunday dinner with our family."
    ],
    "exampleTranslations": [
      "Gia đình là điều quan trọng nhất trong cuộc sống.",
      "Chúng tôi ăn tối Chủ Nhật cùng gia đình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_02",
    "word": "father",
    "phonetic": "/ˈfɑːðər/",
    "definition": "A male parent of a child.",
    "definitionVn": "bố, cha, ba",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My father works as an engineer.",
      "I love going fishing with my father."
    ],
    "exampleTranslations": [
      "Bố tôi làm kỹ sư.",
      "Tôi thích đi câu cá cùng bố."
    ],
    "synonyms": [
      "dad",
      "papa"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_03",
    "word": "mother",
    "phonetic": "/ˈmʌðər/",
    "definition": "A female parent of a child.",
    "definitionVn": "mẹ, má",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My mother cooks delicious meals.",
      "She gave her mother flowers."
    ],
    "exampleTranslations": [
      "Mẹ tôi nấu ăn rất ngon.",
      "Cô ấy tặng hoa cho mẹ."
    ],
    "synonyms": [
      "mom",
      "mama"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_04",
    "word": "parents",
    "phonetic": "/ˈpeərənts/",
    "definition": "A person's father and mother together.",
    "definitionVn": "bố mẹ, cha mẹ, phụ huynh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "I live with my parents in Hanoi.",
      "Parents always love their children."
    ],
    "exampleTranslations": [
      "Tôi sống cùng bố mẹ ở Hà Nội.",
      "Cha mẹ luôn yêu thương con cái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_05",
    "word": "brother",
    "phonetic": "/ˈbrʌðər/",
    "definition": "A boy or man who has the same parents as another.",
    "definitionVn": "anh trai, em trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My elder brother studies in Japan.",
      "I play football with my brother."
    ],
    "exampleTranslations": [
      "Anh trai tôi học ở Nhật.",
      "Tôi chơi bóng đá với em trai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_06",
    "word": "sister",
    "phonetic": "/ˈsɪstər/",
    "definition": "A girl or woman who has the same parents as another.",
    "definitionVn": "chị gái, em gái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My younger sister is very cute.",
      "Her sister plays the piano well."
    ],
    "exampleTranslations": [
      "Em gái tôi rất dễ thương.",
      "Chị gái cô ấy chơi piano rất giỏi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_07",
    "word": "son",
    "phonetic": "/sʌn/",
    "definition": "A boy or man in relation to his parents.",
    "definitionVn": "con trai (của bố mẹ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "They are proud of their smart son.",
      "He is the only son in the family."
    ],
    "exampleTranslations": [
      "Họ rất tự hào về cậu con trai thông minh.",
      "Cậu ấy là con trai duy nhất trong nhà."
    ],
    "synonyms": [],
    "antonyms": [
      "daughter"
    ]
  },
  {
    "id": "bv_family_08",
    "word": "daughter",
    "phonetic": "/ˈdɔːtər/",
    "definition": "A girl or woman in relation to her parents.",
    "definitionVn": "con gái (của bố mẹ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Their daughter is learning English.",
      "She is a loving and helpful daughter."
    ],
    "exampleTranslations": [
      "Con gái họ đang học tiếng Anh.",
      "Cô ấy là một người con gái hiếu thảo."
    ],
    "synonyms": [],
    "antonyms": [
      "son"
    ]
  },
  {
    "id": "bv_family_09",
    "word": "baby",
    "phonetic": "/ˈbeɪbi/",
    "definition": "A very young child, especially newly born.",
    "definitionVn": "em bé, trẻ sơ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "The baby smiled at his mother.",
      "We welcomed a baby girl into our home."
    ],
    "exampleTranslations": [
      "Em bé mỉm cười với mẹ.",
      "Gia đình tôi đón chào một bé gái mới sinh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_10",
    "word": "child",
    "phonetic": "/tʃaɪld/",
    "definition": "A young human being below the age of puberty.",
    "definitionVn": "đứa trẻ, con cái (số ít)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Every child deserves love and education.",
      "She played happily as a child."
    ],
    "exampleTranslations": [
      "Mọi đứa trẻ đều xứng đáng được yêu thương và học hành.",
      "Cô ấy đã chơi đùa vui vẻ thuở ấu thơ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_11",
    "word": "children",
    "phonetic": "/ˈtʃɪldrən/",
    "definition": "Plural form of child; young human beings.",
    "definitionVn": "trẻ em, các con (số nhiều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "The children are playing in the park.",
      "How many children do they have?"
    ],
    "exampleTranslations": [
      "Những đứa trẻ đang chơi trong công viên.",
      "Họ có bao nhiêu người con?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_12",
    "word": "grandfather",
    "phonetic": "/ˈɡrænfɑːðər/",
    "definition": "The father of one's father or mother.",
    "definitionVn": "ông nội, ông ngoại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Grandfather tells wonderful stories.",
      "My grandfather enjoys gardening."
    ],
    "exampleTranslations": [
      "Ông hay kể những câu chuyện tuyệt vời.",
      "Ông tôi rất thích làm vườn."
    ],
    "synonyms": [
      "grandpa"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_13",
    "word": "grandmother",
    "phonetic": "/ˈɡrænmʌðər/",
    "definition": "The mother of one's father or mother.",
    "definitionVn": "bà nội, bà ngoại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Grandmother knit a sweater for me.",
      "I visit my grandmother on Sundays."
    ],
    "exampleTranslations": [
      "Bà đan áo len cho tôi.",
      "Tôi đến thăm bà vào Chủ Nhật."
    ],
    "synonyms": [
      "grandma"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_14",
    "word": "grandparents",
    "phonetic": "/ˈɡrænpeərənts/",
    "definition": "The parents of one's father or mother.",
    "definitionVn": "ông bà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "We visit our grandparents during Tet holiday.",
      "Grandparents give endless love."
    ],
    "exampleTranslations": [
      "Chúng tôi về thăm ông bà dịp Tết.",
      "Ông bà luôn dành tình yêu thương vô bờ bến."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_15",
    "word": "uncle",
    "phonetic": "/ˈʌŋkl/",
    "definition": "The brother of one's father or mother.",
    "definitionVn": "chú, bác, cậu, dượng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My uncle took us to the zoo.",
      "Uncle Tom is very funny."
    ],
    "exampleTranslations": [
      "Chú tôi đưa chúng tôi đi vườn thú.",
      "Bác Tom rất hài hước."
    ],
    "synonyms": [],
    "antonyms": [
      "aunt"
    ]
  },
  {
    "id": "bv_family_16",
    "word": "aunt",
    "phonetic": "/ænt/",
    "definition": "The sister of one's father or mother.",
    "definitionVn": "cô, dì, bác gái, mợ, thím",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Aunt Mary baked sweet cookies.",
      "My aunt lives in Da Nang."
    ],
    "exampleTranslations": [
      "Dì Mary nướng bánh quy rất thơm.",
      "Cô tôi sống ở Đà Nẵng."
    ],
    "synonyms": [],
    "antonyms": [
      "uncle"
    ]
  },
  {
    "id": "bv_family_17",
    "word": "cousin",
    "phonetic": "/ˈkʌzn/",
    "definition": "A child of one's uncle or aunt.",
    "definitionVn": "anh chị em họ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "I spent the summer with my cousins.",
      "She and her cousin are the same age."
    ],
    "exampleTranslations": [
      "Tôi trải qua mùa hè cùng các anh em họ.",
      "Cô ấy và người chị họ bằng tuổi nhau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_18",
    "word": "husband",
    "phonetic": "/ˈhʌzbənd/",
    "definition": "A married man in relation to his spouse.",
    "definitionVn": "chồng, người chồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Her husband is a kind and caring man.",
      "They celebrated 10 years of marriage."
    ],
    "exampleTranslations": [
      "Chồng cô ấy là người chu đáo.",
      "Họ kỷ niệm 10 năm ngày cưới."
    ],
    "synonyms": [],
    "antonyms": [
      "wife"
    ]
  },
  {
    "id": "bv_family_19",
    "word": "wife",
    "phonetic": "/waɪf/",
    "definition": "A married woman in relation to her spouse.",
    "definitionVn": "vợ, người vợ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "He bought a gift for his beloved wife.",
      "His wife is an English teacher."
    ],
    "exampleTranslations": [
      "Anh ấy mua quà tặng người vợ yêu dấu.",
      "Vợ anh ấy là giáo viên tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": [
      "husband"
    ]
  },
  {
    "id": "bv_family_20",
    "word": "relative",
    "phonetic": "/ˈrelətɪv/",
    "definition": "A person connected by blood or marriage.",
    "definitionVn": "bà con, người thân họ hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "All our relatives gathered for the family reunion.",
      "She has relatives living abroad."
    ],
    "exampleTranslations": [
      "Tất cả họ hàng tề tựu trong buổi họp mặt gia đình.",
      "Cô ấy có người thân sống ở nước ngoài."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_01",
    "word": "house",
    "phonetic": "/haʊs/",
    "definition": "A building for human habitation.",
    "definitionVn": "ngôi nhà (công trình nhà ở)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "They bought a new house with a garden.",
      "Welcome to our house!"
    ],
    "exampleTranslations": [
      "Họ mua nhà mới có vườn.",
      "Chào mừng đến thăm nhà chúng tôi!"
    ],
    "synonyms": [
      "home"
    ],
    "antonyms": []
  },
  {
    "id": "bv_home_o_02",
    "word": "home",
    "phonetic": "/hoʊm/",
    "definition": "The place where one lives permanently, especially as a member of a family.",
    "definitionVn": "mái ấm gia đình, tổ ấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "There is no place like home.",
      "I feel safe and warm at home."
    ],
    "exampleTranslations": [
      "Không nơi đâu bằng mái ấm gia đình.",
      "Tôi thấy an toàn và ấm áp khi ở nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_03",
    "word": "room",
    "phonetic": "/ruːm/",
    "definition": "A division of a building enclosed by walls.",
    "definitionVn": "căn phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "My bedroom is bright and clean.",
      "There are four rooms in the flat."
    ],
    "exampleTranslations": [
      "Phòng ngủ của tôi sáng sủa.",
      "Có bốn phòng trong căn hộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_04",
    "word": "living room",
    "phonetic": "/ˈlɪvɪŋ ruːm/",
    "definition": "A room in a house for general everyday use.",
    "definitionVn": "phòng khách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "We watch TV in the living room.",
      "The living room has a comfortable sofa."
    ],
    "exampleTranslations": [
      "Chúng tôi xem tivi ở phòng khách.",
      "Phòng khách có bộ ghế sô pha êm ái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_05",
    "word": "bedroom",
    "phonetic": "/ˈbedruːm/",
    "definition": "A room used for sleeping in.",
    "definitionVn": "phòng ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "I read books in my quiet bedroom.",
      "She painted her bedroom walls sky blue."
    ],
    "exampleTranslations": [
      "Tôi đọc sách trong phòng ngủ yên tĩnh.",
      "Cô ấy sơn tường phòng ngủ màu xanh da trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_06",
    "word": "kitchen",
    "phonetic": "/ˈkɪtʃɪn/",
    "definition": "A room where food is prepared and cooked.",
    "definitionVn": "nhà bếp, phòng bếp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Mom is cooking dinner in the kitchen.",
      "The kitchen is equipped with modern tools."
    ],
    "exampleTranslations": [
      "Mẹ đang nấu bữa tối trong bếp.",
      "Gian bếp được trang bị tiện nghi hiện đại."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_07",
    "word": "bathroom",
    "phonetic": "/ˈbæθruːm/",
    "definition": "A room containing a bath or shower and usually a washbasin and toilet.",
    "definitionVn": "phòng tắm, nhà vệ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Wash your hands in the bathroom.",
      "The bathroom is very clean and dry."
    ],
    "exampleTranslations": [
      "Hãy rửa tay trong phòng tắm nhé.",
      "Phòng tắm rất sạch sẽ và khô ráo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_08",
    "word": "door",
    "phonetic": "/dɔːr/",
    "definition": "A hinged barrier at the entrance to a room or building.",
    "definitionVn": "cửa ra vào, cánh cửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Please knock on the door.",
      "He locked the front door."
    ],
    "exampleTranslations": [
      "Làm ơn gõ cửa trước khi vào.",
      "Anh ấy đã khóa cửa chính."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_09",
    "word": "window",
    "phonetic": "/ˈwɪndoʊ/",
    "definition": "An opening in a wall fitted with glass.",
    "definitionVn": "cửa sổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Open the window for fresh air.",
      "She looked out the window."
    ],
    "exampleTranslations": [
      "Mở cửa sổ cho thoáng khí nhé.",
      "Cô ấy nhìn ra ngoài cửa sổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_10",
    "word": "table",
    "phonetic": "/ˈteɪbl/",
    "definition": "A piece of furniture with a flat top and legs.",
    "definitionVn": "cái bàn (bàn ăn, bàn làm việc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Dinner is ready on the table.",
      "Put the books on the study table."
    ],
    "exampleTranslations": [
      "Bữa tối đã sẵn sàng trên bàn.",
      "Hãy để sách lên bàn học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_11",
    "word": "chair",
    "phonetic": "/tʃer/",
    "definition": "A separate seat for one person with a back.",
    "definitionVn": "cái ghế (ghế tựa)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Pull up a chair and sit down.",
      "This wooden chair is comfortable."
    ],
    "exampleTranslations": [
      "Kéo ghế lại và ngồi xuống đi.",
      "Chiếc ghế gỗ này rất thoải mái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_12",
    "word": "bed",
    "phonetic": "/bed/",
    "definition": "A piece of furniture for sleep or rest.",
    "definitionVn": "chiếc giường ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "I go to bed at 10 PM.",
      "Make your bed every morning."
    ],
    "exampleTranslations": [
      "Tôi đi ngủ lúc 10h đêm.",
      "Dọn dẹp giường ngủ mỗi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_13",
    "word": "desk",
    "phonetic": "/desk/",
    "definition": "A table used for reading, writing, or working.",
    "definitionVn": "bàn học, bàn làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "My computer is on my study desk.",
      "Keep your desk tidy and organized."
    ],
    "exampleTranslations": [
      "Máy tính đặt trên bàn học của tôi.",
      "Giữ bàn làm việc ngăn nắp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_14",
    "word": "sofa",
    "phonetic": "/ˈsoʊfə/",
    "definition": "A long comfortable seat with a back and arms.",
    "definitionVn": "ghế sô pha, ghế bành",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "We relaxed on the sofa after work.",
      "The cat loves napping on the sofa."
    ],
    "exampleTranslations": [
      "Chúng tôi thư giãn trên sô pha sau giờ làm.",
      "Chú mèo thích chợp mắt trên ghế sô pha."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_15",
    "word": "lamp",
    "phonetic": "/læmp/",
    "definition": "A device for giving light.",
    "definitionVn": "cây đèn, đèn bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Turn on the study lamp to read.",
      "She bought a modern bedside lamp."
    ],
    "exampleTranslations": [
      "Bật đèn học lên để đọc sách nhé.",
      "Cô ấy mua cây đèn ngủ đầu giường hiện đại."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_16",
    "word": "clock",
    "phonetic": "/klɑːk/",
    "definition": "An instrument to measure and indicate time.",
    "definitionVn": "đồng hồ treo tường / để bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "The wall clock says exactly 8:00 AM.",
      "My alarm clock rings every morning."
    ],
    "exampleTranslations": [
      "Đồng hồ treo tường chỉ đúng 8h sáng.",
      "Đồng hồ báo thức reng mỗi buổi sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_17",
    "word": "mirror",
    "phonetic": "/ˈmɪrər/",
    "definition": "A reflective surface, now typically of glass.",
    "definitionVn": "chiếc gương soi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "She looked at herself in the mirror.",
      "There is a large mirror in the bathroom."
    ],
    "exampleTranslations": [
      "Cô ấy ngắm mình trong gương.",
      "Có một chiếc gương lớn trong phòng tắm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_18",
    "word": "fridge",
    "phonetic": "/frɪdʒ/",
    "definition": "An appliance to keep food and drinks cold.",
    "definitionVn": "tủ lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Put the fresh milk in the fridge.",
      "The fridge is full of vegetables and fruits."
    ],
    "exampleTranslations": [
      "Cất sữa tươi vào tủ lạnh nhé.",
      "Tủ lạnh đầy ắp rau củ và hoa quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_19",
    "word": "fan",
    "phonetic": "/fæn/",
    "definition": "An apparatus with rotating blades that creates a current of air for cooling.",
    "definitionVn": "chiếc quạt máy, quạt điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Turn on the electric fan to cool down the room.",
      "The ceiling fan spins quietly."
    ],
    "exampleTranslations": [
      "Bật quạt điện lên cho mát phòng nhé.",
      "Chiếc quạt trần quay êm ru."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_20",
    "word": "key",
    "phonetic": "/kiː/",
    "definition": "A small metal instrument used to open or close a lock.",
    "definitionVn": "chìa khóa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Don't forget to take your house keys.",
      "She found the lost car key."
    ],
    "exampleTranslations": [
      "Đừng quên mang chìa khóa nhà nhé.",
      "Cô ấy đã tìm thấy chiếc chìa khóa xe bị mất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_21",
    "word": "book",
    "phonetic": "/bʊk/",
    "definition": "A written or printed work bound together.",
    "definitionVn": "cuốn sách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Reading books expands your mind.",
      "I borrowed a book from the library."
    ],
    "exampleTranslations": [
      "Đọc sách mở rộng tri thức.",
      "Tôi mượn một cuốn sách từ thư viện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_22",
    "word": "pen",
    "phonetic": "/pen/",
    "definition": "An instrument for writing with ink.",
    "definitionVn": "cây bút viết, bút mực",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Can I borrow your blue pen?",
      "She signed the paper with a black pen."
    ],
    "exampleTranslations": [
      "Tôi mượn cây bút xanh được không?",
      "Cô ấy ký tên bằng bút mực đen."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_23",
    "word": "pencil",
    "phonetic": "/ˈpensl/",
    "definition": "An instrument for writing or drawing consisting of a thin stick of graphite.",
    "definitionVn": "chiếc bút chì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Sharpen your pencil before drawing.",
      "I take notes in pencil in my textbook."
    ],
    "exampleTranslations": [
      "Hãy gọt bút chì trước khi vẽ nhé.",
      "Tôi ghi chú bằng bút chì vào sách giáo khoa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_24",
    "word": "phone",
    "phonetic": "/foʊn/",
    "definition": "A mobile smartphone or telephone device.",
    "definitionVn": "điện thoại (di động)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "My phone is ringing.",
      "I learn English on my phone."
    ],
    "exampleTranslations": [
      "Điện thoại tôi đang reo.",
      "Tôi học tiếng Anh trên điện thoại."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__01",
    "word": "be",
    "phonetic": "/biː/",
    "definition": "Exist; have a specified state or identity (am/is/are).",
    "definitionVn": "thì, là, ở (động từ to be)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I am happy to be here.",
      "They are very friendly."
    ],
    "exampleTranslations": [
      "Tôi rất vui khi được ở đây.",
      "Họ rất thân thiện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__02",
    "word": "have",
    "phonetic": "/hæv/",
    "definition": "Possess, own, or hold.",
    "definitionVn": "có, sở hữu",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I have a question for the teacher.",
      "She has two brothers."
    ],
    "exampleTranslations": [
      "Tôi có một câu hỏi cho thầy giáo.",
      "Cô ấy có hai người anh trai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__03",
    "word": "do",
    "phonetic": "/duː/",
    "definition": "Perform an action, task, or activity.",
    "definitionVn": "làm, thực hiện",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Do your homework carefully.",
      "What do you do in your free time?"
    ],
    "exampleTranslations": [
      "Hãy làm bài tập về nhà cẩn thận.",
      "Bạn thường làm gì vào thời gian rảnh?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__04",
    "word": "go",
    "phonetic": "/ɡoʊ/",
    "definition": "Move from one place to another.",
    "definitionVn": "đi, di chuyển đến nơi khác",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Let's go to school together.",
      "She goes to the gym on Mondays."
    ],
    "exampleTranslations": [
      "Cùng đi học nào.",
      "Cô ấy đi tập gym vào thứ Hai."
    ],
    "synonyms": [],
    "antonyms": [
      "come",
      "stay"
    ]
  },
  {
    "id": "bv_daily__05",
    "word": "come",
    "phonetic": "/kʌm/",
    "definition": "Move toward or arrive at a place.",
    "definitionVn": "đến, tới đây",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Come here and look at this!",
      "They came to visit us."
    ],
    "exampleTranslations": [
      "Lại đây xem cái này đi!",
      "Họ đã đến thăm chúng tôi."
    ],
    "synonyms": [],
    "antonyms": [
      "go"
    ]
  },
  {
    "id": "bv_daily__06",
    "word": "eat",
    "phonetic": "/iːt/",
    "definition": "Put food into mouth, chew and swallow.",
    "definitionVn": "ăn (thức ăn)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "We eat breakfast at 7 AM.",
      "Do you want to eat out tonight?"
    ],
    "exampleTranslations": [
      "Chúng tôi ăn sáng lúc 7h.",
      "Tối nay bạn muốn đi ăn ngoài không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__07",
    "word": "drink",
    "phonetic": "/drɪŋk/",
    "definition": "Take liquid into mouth and swallow.",
    "definitionVn": "uống (nước, đồ uống)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Drink plenty of water every day.",
      "I like to drink hot tea."
    ],
    "exampleTranslations": [
      "Uống nhiều nước mỗi ngày nhé.",
      "Tôi thích uống trà nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__08",
    "word": "sleep",
    "phonetic": "/sliːp/",
    "definition": "Rest with eyes closed and mind inactive.",
    "definitionVn": "ngủ, đi ngủ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I sleep eight hours every night.",
      "The baby is sleeping soundly."
    ],
    "exampleTranslations": [
      "Tôi ngủ 8 tiếng mỗi đêm.",
      "Em bé đang ngủ say sưa."
    ],
    "synonyms": [],
    "antonyms": [
      "wake up"
    ]
  },
  {
    "id": "bv_daily__09",
    "word": "wake up",
    "phonetic": "/weɪk ʌp/",
    "definition": "Stop sleeping and open one's eyes.",
    "definitionVn": "thức giấc, tỉnh dậy",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I wake up early at 6:00 AM.",
      "Wake up, breakfast is ready!"
    ],
    "exampleTranslations": [
      "Tôi thức dậy sớm lúc 6h sáng.",
      "Dậy đi, bữa sáng đã sẵn sàng!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__10",
    "word": "speak",
    "phonetic": "/spiːk/",
    "definition": "Say words in order to communicate.",
    "definitionVn": "nói, phát biểu (ngôn ngữ)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Do you speak English? — Yes, a little.",
      "She speaks clearly and confidently."
    ],
    "exampleTranslations": [
      "Bạn có nói tiếng Anh không? — Có, một chút.",
      "Cô ấy nói năng rõ ràng và tự tin."
    ],
    "synonyms": [
      "talk"
    ],
    "antonyms": []
  },
  {
    "id": "bv_daily__11",
    "word": "read",
    "phonetic": "/riːd/",
    "definition": "Look at and comprehend written text.",
    "definitionVn": "đọc (sách, báo, tin nhắn)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I love reading books in the evening.",
      "Can you read this sentence aloud?"
    ],
    "exampleTranslations": [
      "Tôi thích đọc sách vào buổi tối.",
      "Bạn đọc to câu này lên được không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__12",
    "word": "write",
    "phonetic": "/raɪt/",
    "definition": "Mark letters or words on a surface.",
    "definitionVn": "viết (chữ, bài, thư)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Write down new words in your notebook.",
      "She writes emails to her friend."
    ],
    "exampleTranslations": [
      "Hãy ghi từ mới vào sổ tay.",
      "Cô ấy viết email cho bạn mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__13",
    "word": "listen",
    "phonetic": "/ˈlɪsn/",
    "definition": "Give attention to sound or speech.",
    "definitionVn": "nghe, lắng nghe",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Listen carefully to the recording.",
      "I listen to English podcasts."
    ],
    "exampleTranslations": [
      "Hãy lắng nghe kỹ đoạn ghi âm nhé.",
      "Tôi nghe các podcast tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__14",
    "word": "learn",
    "phonetic": "/lɜːrn/",
    "definition": "Gain knowledge or skill by study.",
    "definitionVn": "học tập, tiếp thu kiến thức",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Learning English opens many doors.",
      "She learned how to swim quickly."
    ],
    "exampleTranslations": [
      "Học tiếng Anh mở ra nhiều cơ hội.",
      "Cô ấy học bơi rất nhanh."
    ],
    "synonyms": [
      "study"
    ],
    "antonyms": []
  },
  {
    "id": "bv_daily__15",
    "word": "walk",
    "phonetic": "/wɔːk/",
    "definition": "Move on foot at a regular pace.",
    "definitionVn": "đi bộ, dạo bước",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I walk to the park every morning.",
      "Walking is great for your heart."
    ],
    "exampleTranslations": [
      "Tôi đi bộ ra công viên mỗi sáng.",
      "Đi bộ rất tốt cho tim mạch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__16",
    "word": "run",
    "phonetic": "/rʌn/",
    "definition": "Move fast on foot.",
    "definitionVn": "chạy, chạy bộ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "He runs five kilometers every day.",
      "Run fast, or we will miss the bus!"
    ],
    "exampleTranslations": [
      "Anh ấy chạy 5km mỗi ngày.",
      "Chạy nhanh lên kẻo lỡ xe buýt!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__17",
    "word": "open",
    "phonetic": "/ˈoʊpən/",
    "definition": "Move so as to allow access; not closed.",
    "definitionVn": "mở (cửa, sách, mắt)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Open your English book to page 10.",
      "Please open the window."
    ],
    "exampleTranslations": [
      "Mở sách tiếng Anh trang 10 nhé.",
      "Làm ơn mở cửa sổ ra nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "close"
    ]
  },
  {
    "id": "bv_daily__18",
    "word": "close",
    "phonetic": "/kloʊz/",
    "definition": "Move so as to block an opening.",
    "definitionVn": "đóng lại, khép lại",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Close your eyes and make a wish.",
      "Please close the door behind you."
    ],
    "exampleTranslations": [
      "Nhắm mắt lại và ước một điều ước đi.",
      "Làm ơn đóng cửa lại khi vào nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "open"
    ]
  },
  {
    "id": "bv_daily__19",
    "word": "buy",
    "phonetic": "/baɪ/",
    "definition": "Obtain in exchange for payment.",
    "definitionVn": "mua (hàng hóa, đồ đạc)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I want to buy fresh fruits at the market.",
      "She bought a new dictionary."
    ],
    "exampleTranslations": [
      "Tôi muốn mua hoa quả tươi ở chợ.",
      "Cô ấy đã mua cuốn từ điển mới."
    ],
    "synonyms": [],
    "antonyms": [
      "sell"
    ]
  },
  {
    "id": "bv_daily__20",
    "word": "help",
    "phonetic": "/help/",
    "definition": "Make it easier for someone to do something.",
    "definitionVn": "giúp đỡ, hỗ trợ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Can you help me with this problem?",
      "She always helps her classmates."
    ],
    "exampleTranslations": [
      "Bạn có thể giúp tôi bài này không?",
      "Cô ấy luôn giúp đỡ các bạn cùng lớp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_01",
    "word": "food",
    "phonetic": "/fuːd/",
    "definition": "Any nutritious substance that people eat or drink.",
    "definitionVn": "thức ăn, thực phẩm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Vietnamese food is delicious and healthy.",
      "We shared fresh food with neighbors."
    ],
    "exampleTranslations": [
      "Món ăn Việt Nam rất ngon và bổ dưỡng.",
      "Chúng tôi chia sẻ thức ăn tươi với hàng xóm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_02",
    "word": "drink",
    "phonetic": "/drɪŋk/",
    "definition": "A liquid that can be swallowed as a refreshment.",
    "definitionVn": "đồ uống, thức uống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Would you like a cold drink?",
      "Water is the healthiest drink."
    ],
    "exampleTranslations": [
      "Bạn có muốn dùng đồ uống lạnh không?",
      "Nước lọc là thức uống lành mạnh nhất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_03",
    "word": "water",
    "phonetic": "/ˈwɔːtər/",
    "definition": "Clear liquid essential for plant and animal life.",
    "definitionVn": "nước (nước uống)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Drink enough water every day.",
      "A glass of water, please!"
    ],
    "exampleTranslations": [
      "Uống đủ nước mỗi ngày nhé.",
      "Làm ơn cho tôi một ly nước!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_04",
    "word": "rice",
    "phonetic": "/raɪs/",
    "definition": "Grains eaten cooked as a staple food.",
    "definitionVn": "cơm, gạo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Rice is the staple food in Vietnam.",
      "We had steamed rice with fish."
    ],
    "exampleTranslations": [
      "Cơm là lương thực chính ở Việt Nam.",
      "Chúng tôi ăn cơm trắng với cá."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_05",
    "word": "bread",
    "phonetic": "/bred/",
    "definition": "Food made of flour, water, and yeast baked.",
    "definitionVn": "bánh mì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "I had toasted bread with butter for breakfast.",
      "Fresh bread smells great."
    ],
    "exampleTranslations": [
      "Tôi ăn bánh mì nướng bơ cho bữa sáng.",
      "Bánh mì mới nướng thơm lừng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_06",
    "word": "noodle",
    "phonetic": "/ˈnuːdl/",
    "definition": "A strip, ring, or tube of pasta or egg dough.",
    "definitionVn": "mì, bún, phở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Pho is the most famous Vietnamese noodle soup.",
      "I love spicy beef noodles."
    ],
    "exampleTranslations": [
      "Phở là món súp mì nổi tiếng nhất của Việt Nam.",
      "Tôi thích món bún bò cay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_07",
    "word": "meat",
    "phonetic": "/miːt/",
    "definition": "The flesh of an animal as food.",
    "definitionVn": "thịt (nói chung)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "He grilled some meat for dinner.",
      "Fresh meat is available at the market."
    ],
    "exampleTranslations": [
      "Anh ấy nướng thịt cho bữa tối.",
      "Thịt tươi có sẵn ở chợ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_08",
    "word": "beef",
    "phonetic": "/biːf/",
    "definition": "The culinary name for meat from cattle.",
    "definitionVn": "thịt bò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "We ordered beef noodle soup for breakfast.",
      "Grilled beef with lemongrass is delicious."
    ],
    "exampleTranslations": [
      "Chúng tôi gọi phở bò cho bữa sáng.",
      "Bò nướng sả rất ngon miệng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_09",
    "word": "pork",
    "phonetic": "/pɔːrk/",
    "definition": "The culinary name for the meat of a domestic pig.",
    "definitionVn": "thịt lợn, thịt heo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Caramelized pork is a classic Vietnamese dish.",
      "She bought fresh pork at the butchery."
    ],
    "exampleTranslations": [
      "Thịt kho tàu là món ăn kinh điển của Việt Nam.",
      "Cô ấy mua thịt heo tươi ở quầy thịt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_10",
    "word": "chicken",
    "phonetic": "/ˈtʃɪkɪn/",
    "definition": "Domestic fowl or its meat used as food.",
    "definitionVn": "con gà, thịt gà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "We had roasted chicken and salad.",
      "Fried chicken is popular with kids."
    ],
    "exampleTranslations": [
      "Chúng tôi ăn gà quay và rau trộn.",
      "Gà rán rất được trẻ em yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_11",
    "word": "fish",
    "phonetic": "/fɪʃ/",
    "definition": "Aquatic animal eaten as seafood.",
    "definitionVn": "con cá, món cá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Eating fish is good for your brain.",
      "Steamed fish with ginger is tasty."
    ],
    "exampleTranslations": [
      "Ăn cá rất tốt cho trí não.",
      "Cá hấp gừng rất thơm ngon."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_12",
    "word": "egg",
    "phonetic": "/eɡ/",
    "definition": "An oval body produced by birds, eaten as food.",
    "definitionVn": "quả trứng (gà, vịt)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "I like fried eggs for breakfast.",
      "We need two eggs for this recipe."
    ],
    "exampleTranslations": [
      "Tôi thích trứng ốp la cho bữa sáng.",
      "Chúng ta cần hai quả trứng cho công thức này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_13",
    "word": "milk",
    "phonetic": "/mɪlk/",
    "definition": "White liquid produced by mammals.",
    "definitionVn": "sữa tươi, sữa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Drink a glass of milk every morning.",
      "Do you want milk in your coffee?"
    ],
    "exampleTranslations": [
      "Uống một ly sữa mỗi sáng nhé.",
      "Bạn có muốn thêm sữa vào cà phê không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_14",
    "word": "tea",
    "phonetic": "/tiː/",
    "definition": "A hot drink made by infusing dried crushed leaves.",
    "definitionVn": "trà, chè",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "A cup of green tea calms your mind.",
      "Would you like some iced tea?"
    ],
    "exampleTranslations": [
      "Một tách trà xanh giúp tâm trí thư thái.",
      "Bạn có muốn dùng chút trà đá không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_15",
    "word": "coffee",
    "phonetic": "/ˈkɔːfi/",
    "definition": "A hot or cold drink made from roasted coffee beans.",
    "definitionVn": "cà phê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Vietnamese iced coffee is world famous.",
      "Let's grab a cup of coffee!"
    ],
    "exampleTranslations": [
      "Cà phê sữa đá Việt Nam nổi tiếng khắp nơi.",
      "Cùng đi uống cà phê nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_16",
    "word": "sugar",
    "phonetic": "/ˈʃʊɡər/",
    "definition": "A sweet crystalline substance obtained from sugar cane.",
    "definitionVn": "đường ăn, đường ngọt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Do you take sugar in your tea?",
      "Limit sugar to protect your teeth."
    ],
    "exampleTranslations": [
      "Bạn có thêm đường vào trà không?",
      "Hạn chế ăn đường để bảo vệ răng miệng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_17",
    "word": "salt",
    "phonetic": "/sɔːlt/",
    "definition": "A white crystalline substance that gives seawater its characteristic taste.",
    "definitionVn": "muối ăn, gia vị mặn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Add a pinch of salt to the soup.",
      "Pass the salt shaker, please."
    ],
    "exampleTranslations": [
      "Thêm một chút muối vào canh nhé.",
      "Làm ơn chuyền lọ muối giúp tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_18",
    "word": "apple",
    "phonetic": "/ˈæpl/",
    "definition": "Round fruit with red or green skin and crisp flesh.",
    "definitionVn": "quả táo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "An apple a day keeps the doctor away.",
      "She ate a crunchy red apple."
    ],
    "exampleTranslations": [
      "Mỗi ngày một quả táo giúp bạn luôn khỏe mạnh.",
      "Cô ấy ăn một quả táo đỏ giòn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_19",
    "word": "banana",
    "phonetic": "/bəˈnænə/",
    "definition": "A long curved fruit which grows in clusters.",
    "definitionVn": "quả chuối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Bananas are rich in potassium and energy.",
      "He eats a ripe banana after his workout."
    ],
    "exampleTranslations": [
      "Chuối rất giàu kali và năng lượng.",
      "Anh ấy ăn một quả chuối chín sau khi tập luyện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_20",
    "word": "orange",
    "phonetic": "/ˈɔːrɪndʒ/",
    "definition": "A round juicy citrus fruit with a tough bright reddish-yellow rind.",
    "definitionVn": "quả cam",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Fresh orange juice is rich in Vitamin C.",
      "She squeezed two oranges for breakfast."
    ],
    "exampleTranslations": [
      "Nước cam tươi rất giàu Vitamin C.",
      "Cô ấy vắt hai quả cam cho bữa sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_21",
    "word": "breakfast",
    "phonetic": "/ˈbrekfəst/",
    "definition": "The first meal of the day, usually eaten in the morning.",
    "definitionVn": "bữa ăn sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Never skip breakfast before going to school.",
      "What did you eat for breakfast today?"
    ],
    "exampleTranslations": [
      "Đừng bao giờ bỏ bữa sáng trước khi đến trường.",
      "Hôm nay bạn đã ăn gì cho bữa sáng?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_22",
    "word": "lunch",
    "phonetic": "/lʌntʃ/",
    "definition": "A meal eaten in the middle of the day.",
    "definitionVn": "bữa ăn trưa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Let's have lunch together at the cafeteria.",
      "I brought a lunchbox from home."
    ],
    "exampleTranslations": [
      "Cùng nhau ăn trưa tại căng tin nhé.",
      "Tôi đã mang theo hộp cơm trưa từ nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_23",
    "word": "dinner",
    "phonetic": "/ˈdɪnər/",
    "definition": "The main meal of the day, taken either around midday or in the evening.",
    "definitionVn": "bữa ăn tối, cơm tối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Our family gathers for dinner at 7:00 PM.",
      "What is cooking for dinner tonight?"
    ],
    "exampleTranslations": [
      "Gia đình chúng tôi quây quần ăn tối lúc 7h.",
      "Tối nay có món gì ngon cho bữa tối thế?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_01",
    "word": "happy",
    "phonetic": "/ˈhæpi/",
    "definition": "Feeling or showing pleasure or contentment.",
    "definitionVn": "vui vẻ, hạnh phúc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am so happy to see you again!",
      "The kids looked happy playing."
    ],
    "exampleTranslations": [
      "Tôi rất vui được gặp lại bạn!",
      "Lũ trẻ trông thật vui vẻ khi chơi đùa."
    ],
    "synonyms": [
      "joyful",
      "glad"
    ],
    "antonyms": [
      "sad"
    ]
  },
  {
    "id": "bv_emotio_02",
    "word": "sad",
    "phonetic": "/sæd/",
    "definition": "Feeling sorrow or unhappiness.",
    "definitionVn": "buồn bã, buồn rầu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Why do you look so sad today?",
      "It was a sad and moving movie."
    ],
    "exampleTranslations": [
      "Sao hôm nay trông bạn buồn thế?",
      "Đó là một bộ phim buồn và xúc động."
    ],
    "synonyms": [
      "unhappy"
    ],
    "antonyms": [
      "happy"
    ]
  },
  {
    "id": "bv_emotio_03",
    "word": "angry",
    "phonetic": "/ˈæŋɡri/",
    "definition": "Feeling or showing strong annoyance or displeasure.",
    "definitionVn": "tức giận, giận dữ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Take a deep breath when you feel angry.",
      "He was angry about the broken promise."
    ],
    "exampleTranslations": [
      "Hãy hít thở sâu khi bạn thấy tức giận.",
      "Anh ấy giận vì lời hứa bị phá vỡ."
    ],
    "synonyms": [
      "mad"
    ],
    "antonyms": []
  },
  {
    "id": "bv_emotio_04",
    "word": "tired",
    "phonetic": "/ˈtaɪərd/",
    "definition": "In need of sleep or rest; exhausted.",
    "definitionVn": "mệt mỏi, buồn ngủ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am very tired after a long day.",
      "If you feel tired, take a rest."
    ],
    "exampleTranslations": [
      "Tôi rất mệt sau một ngày dài.",
      "Nếu thấy mệt, hãy nghỉ ngơi nhé."
    ],
    "synonyms": [
      "exhausted"
    ],
    "antonyms": []
  },
  {
    "id": "bv_emotio_05",
    "word": "hungry",
    "phonetic": "/ˈhʌŋɡri/",
    "definition": "Feeling or displaying the need for food.",
    "definitionVn": "đói bụng, thèm ăn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am hungry; let's get some lunch!",
      "Are you hungry yet?"
    ],
    "exampleTranslations": [
      "Tôi đói bụng rồi; đi ăn trưa thôi!",
      "Bạn đã thấy đói bụng chưa?"
    ],
    "synonyms": [],
    "antonyms": [
      "full"
    ]
  },
  {
    "id": "bv_emotio_06",
    "word": "thirsty",
    "phonetic": "/ˈθɜːrsti/",
    "definition": "Feeling a need to drink liquid.",
    "definitionVn": "khát nước",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am thirsty after running; give me water.",
      "Drink water whenever you feel thirsty."
    ],
    "exampleTranslations": [
      "Tôi khát nước sau khi chạy; cho tôi xin nước.",
      "Hãy uống nước bất cứ khi nào thấy khát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_07",
    "word": "scared",
    "phonetic": "/skerd/",
    "definition": "Fearful; frightened.",
    "definitionVn": "sợ hãi, hoảng sợ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Don't be scared; everything will be fine.",
      "She was scared of the dark."
    ],
    "exampleTranslations": [
      "Đừng sợ nhé; mọi chuyện sẽ ổn cả thôi.",
      "Cô ấy từng sợ bóng tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_08",
    "word": "excited",
    "phonetic": "/ɪkˈsaɪtɪd/",
    "definition": "Very enthusiastic and eager.",
    "definitionVn": "hào hứng, phấn khởi",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "The students are excited about the summer trip.",
      "I am so excited to learn English."
    ],
    "exampleTranslations": [
      "Các học sinh rất hào hứng về chuyến đi mùa hè.",
      "Tôi rất phấn khởi khi được học tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_09",
    "word": "good",
    "phonetic": "/ɡʊd/",
    "definition": "Of high quality or standard; favorable.",
    "definitionVn": "tốt, giỏi, hay, ngon",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "You did a very good job!",
      "This soup tastes really good."
    ],
    "exampleTranslations": [
      "Bạn đã làm rất tốt!",
      "Món súp này có vị rất ngon."
    ],
    "synonyms": [
      "great",
      "fine"
    ],
    "antonyms": [
      "bad"
    ]
  },
  {
    "id": "bv_emotio_10",
    "word": "bad",
    "phonetic": "/bæd/",
    "definition": "Of poor quality; unpleasant or harmful.",
    "definitionVn": "xấu, tồi tệ, có hại",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Smoking is bad for your health.",
      "I had a bad dream last night."
    ],
    "exampleTranslations": [
      "Hút thuốc có hại cho sức khỏe.",
      "Đêm qua tôi gặp ác mộng tồi tệ."
    ],
    "synonyms": [],
    "antonyms": [
      "good"
    ]
  },
  {
    "id": "bv_emotio_11",
    "word": "big",
    "phonetic": "/bɪɡ/",
    "definition": "Of considerable size or extent.",
    "definitionVn": "to lớn, bự",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "They live in a big house.",
      "Elephants are big animals."
    ],
    "exampleTranslations": [
      "Họ sống trong ngôi nhà to lớn.",
      "Voi là loài động vật to lớn."
    ],
    "synonyms": [
      "large"
    ],
    "antonyms": [
      "small"
    ]
  },
  {
    "id": "bv_emotio_12",
    "word": "small",
    "phonetic": "/smɔːl/",
    "definition": "Of a size less than normal.",
    "definitionVn": "nhỏ bé, bé nhỏ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "The kitten has small paws.",
      "Even small progress matters."
    ],
    "exampleTranslations": [
      "Mèo con có bàn chân nhỏ.",
      "Dù là tiến bộ nhỏ cũng rất đáng quý."
    ],
    "synonyms": [
      "little",
      "tiny"
    ],
    "antonyms": [
      "big"
    ]
  },
  {
    "id": "bv_emotio_13",
    "word": "hot",
    "phonetic": "/hɑːt/",
    "definition": "Having a high temperature.",
    "definitionVn": "nóng, cay nóng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "It is very hot outside today.",
      "The soup is hot, be careful!"
    ],
    "exampleTranslations": [
      "Hôm nay trời ngoài kia rất nóng.",
      "Bát súp đang nóng đấy, cẩn thận!"
    ],
    "synonyms": [],
    "antonyms": [
      "cold"
    ]
  },
  {
    "id": "bv_emotio_14",
    "word": "cold",
    "phonetic": "/koʊld/",
    "definition": "Of a low temperature.",
    "definitionVn": "lạnh, giá lạnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "It gets cold in winter.",
      "I would love a cold drink."
    ],
    "exampleTranslations": [
      "Trời trở lạnh vào mùa đông.",
      "Tôi rất muốn một ly nước lạnh."
    ],
    "synonyms": [],
    "antonyms": [
      "hot"
    ]
  },
  {
    "id": "bv_emotio_15",
    "word": "warm",
    "phonetic": "/wɔːrm/",
    "definition": "Of a comfortable degree of heat.",
    "definitionVn": "ấm áp, nồng ấm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Spring weather is pleasantly warm.",
      "She gave me a warm hug."
    ],
    "exampleTranslations": [
      "Thời tiết mùa xuân ấm áp dễ chịu.",
      "Cô ấy ôm tôi một cái thật ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_16",
    "word": "cool",
    "phonetic": "/kuːl/",
    "definition": "Fairly cold in an agreeable way.",
    "definitionVn": "mát mẻ, ngầu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Autumn breeze is fresh and cool.",
      "That new jacket looks really cool!"
    ],
    "exampleTranslations": [
      "Làn gió thu trong lành và mát mẻ.",
      "Chiếc áo khoác mới trông rất ngầu!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_17",
    "word": "new",
    "phonetic": "/nuː/",
    "definition": "Produced, introduced, or discovered recently.",
    "definitionVn": "mới, mới mẻ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I bought a new English dictionary.",
      "Welcome to our new school year!"
    ],
    "exampleTranslations": [
      "Tôi mua cuốn từ điển tiếng Anh mới.",
      "Chào mừng năm học mới của chúng ta!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_18",
    "word": "old",
    "phonetic": "/oʊld/",
    "definition": "Having lived or existed for a long time.",
    "definitionVn": "cũ, già, lâu đời",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Hanoi has an ancient and historic Old Quarter.",
      "Respect and care for old people."
    ],
    "exampleTranslations": [
      "Hà Nội có Phố Cổ cổ kính và lâu đời.",
      "Hãy kính trọng và chăm sóc người già."
    ],
    "synonyms": [],
    "antonyms": [
      "new",
      "young"
    ]
  },
  {
    "id": "bv_emotio_19",
    "word": "fast",
    "phonetic": "/fæst/",
    "definition": "Moving or capable of moving at high speed.",
    "definitionVn": "nhanh, mau lẹ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "He is a very fast runner.",
      "Time flies fast when you are having fun."
    ],
    "exampleTranslations": [
      "Cậu ấy là một vận động viên chạy rất nhanh.",
      "Thời gian trôi thật nhanh khi vui vẻ."
    ],
    "synonyms": [
      "quick"
    ],
    "antonyms": [
      "slow"
    ]
  },
  {
    "id": "bv_emotio_20",
    "word": "slow",
    "phonetic": "/sloʊ/",
    "definition": "Moving or operating, or progressing at low speed.",
    "definitionVn": "chậm chạp, từ tốn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Turtles are slow creatures.",
      "Speak a bit slower, please."
    ],
    "exampleTranslations": [
      "Rùa là loài sinh vật chậm chạp.",
      "Làm ơn nói chậm lại một chút nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "fast"
    ]
  },
  {
    "id": "bv_emotio_21",
    "word": "easy",
    "phonetic": "/ˈiːzi/",
    "definition": "Achieved without great effort; presenting few difficulties.",
    "definitionVn": "dễ dàng, đơn giản",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "This English quiz is very easy.",
      "Take it easy and don't worry."
    ],
    "exampleTranslations": [
      "Bài kiểm tra tiếng Anh này rất dễ.",
      "Cứ từ từ thư giãn, đừng lo lắng nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "hard",
      "difficult"
    ]
  },
  {
    "id": "bv_emotio_22",
    "word": "beautiful",
    "phonetic": "/ˈbjuːtɪfl/",
    "definition": "Pleasing the senses or mind aesthetically.",
    "definitionVn": "xinh đẹp, tuyệt đẹp",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "The sunrise over the sea is beautiful.",
      "She has a beautiful smile."
    ],
    "exampleTranslations": [
      "Bình minh trên biển thật tuyệt đẹp.",
      "Cô ấy có nụ cười rất xinh xắn."
    ],
    "synonyms": [
      "pretty",
      "lovely"
    ],
    "antonyms": [
      "ugly"
    ]
  },
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
  },
  {
    "id": "bv_animal_01",
    "word": "animal",
    "phonetic": "/ˈænɪml/",
    "definition": "A living organism that feeds on organic matter.",
    "definitionVn": "động vật, muông thú",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Animals are an essential part of nature.",
      "We should protect wild animals."
    ],
    "exampleTranslations": [
      "Động vật là một phần thiết yếu của tự nhiên.",
      "Chúng ta nên bảo vệ động vật hoang dã."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_02",
    "word": "pet",
    "phonetic": "/pet/",
    "definition": "A domestic or tamed animal kept for companionship.",
    "definitionVn": "thú cưng, vật nuôi trong nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Do you have any pets at home?",
      "Dogs and cats are beloved pets."
    ],
    "exampleTranslations": [
      "Bạn có nuôi thú cưng ở nhà không?",
      "Chó và mèo là những thú cưng được yêu quý."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_03",
    "word": "dog",
    "phonetic": "/dɔːɡ/",
    "definition": "A domesticated canine; man's best friend.",
    "definitionVn": "con chó",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "A dog is loyal and friendly.",
      "My dog wags its tail happily."
    ],
    "exampleTranslations": [
      "Chó rất trung thành và thân thiện.",
      "Chú chó của tôi vẫy đuôi vui sướng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_04",
    "word": "puppy",
    "phonetic": "/ˈpʌpi/",
    "definition": "A young dog.",
    "definitionVn": "chú chó con, cún con",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The playful puppy ran around the garden.",
      "We adopted a cute little puppy."
    ],
    "exampleTranslations": [
      "Chú cún con tinh nghịch chạy loanh quanh trong vườn.",
      "Chúng tôi đã nhận nuôi một chú cún con rất dễ thương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_05",
    "word": "cat",
    "phonetic": "/kæt/",
    "definition": "A small domesticated feline animal.",
    "definitionVn": "con mèo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The fluffy cat purrs when petted.",
      "Cats love sleeping in warm spots."
    ],
    "exampleTranslations": [
      "Chú mèo lông xù kêu rừ rừ khi được vuốt ve.",
      "Mèo thích ngủ ở những nơi ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_06",
    "word": "kitten",
    "phonetic": "/ˈkɪtn/",
    "definition": "A young cat.",
    "definitionVn": "mèo con",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The tiny kitten drank warm milk.",
      "Three playful kittens chased a ball of wool."
    ],
    "exampleTranslations": [
      "Chú mèo con bé xíu uống sữa ấm.",
      "Ba chú mèo con tinh nghịch đuổi theo cuộn len."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_07",
    "word": "bird",
    "phonetic": "/bɜːrd/",
    "definition": "A feathered vertebrate with wings.",
    "definitionVn": "con chim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Birds sing in the morning trees.",
      "Look at that colorful bird flying!"
    ],
    "exampleTranslations": [
      "Những chú chim hót trên cây buổi sớm.",
      "Hãy nhìn chú chim nhiều màu sắc đang bay kìa!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_08",
    "word": "fish",
    "phonetic": "/fɪʃ/",
    "definition": "A limbless water-dwelling animal with gills.",
    "definitionVn": "con cá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Fish swim smoothly in the aquarium.",
      "We saw colorful reef fish."
    ],
    "exampleTranslations": [
      "Những chú cá bơi lội trong bể kính.",
      "Chúng tôi đã thấy những chú cá rạn san hô sặc sỡ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_09",
    "word": "chicken",
    "phonetic": "/ˈtʃɪkɪn/",
    "definition": "A domestic fowl kept for eggs and meat.",
    "definitionVn": "con gà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The rooster crows early in the morning.",
      "Chickens roam freely in the farmyard."
    ],
    "exampleTranslations": [
      "Gà trống gáy sớm vào buổi sáng.",
      "Đàn gà đi kiếm ăn tự do trong sân vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_10",
    "word": "duck",
    "phonetic": "/dʌk/",
    "definition": "A waterbird with a broad blunt bill and webbed feet.",
    "definitionVn": "con vịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Ducks are swimming in the pond.",
      "The little yellow ducklings followed their mother."
    ],
    "exampleTranslations": [
      "Những con vịt đang bơi dưới ao.",
      "Những chú vịt con màu vàng đi theo mẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_11",
    "word": "pig",
    "phonetic": "/pɪɡ/",
    "definition": "An omnivorous domesticated hoofed mammal.",
    "definitionVn": "con lợn, con heo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The piglets are cute and playful.",
      "Pigs are very intelligent animals."
    ],
    "exampleTranslations": [
      "Những chú lợn con rất đáng yêu và tinh nghịch.",
      "Lợn là loài động vật rất thông minh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_12",
    "word": "cow",
    "phonetic": "/kaʊ/",
    "definition": "A fully grown female animal of a domesticated bovine.",
    "definitionVn": "con bò, bò sữa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Cows graze peacefully in the green pasture.",
      "Cows provide fresh milk for humans."
    ],
    "exampleTranslations": [
      "Những chú bò gặm cỏ thanh bình trên đồng cỏ xanh.",
      "Bò cung cấp sữa tươi cho con người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_13",
    "word": "horse",
    "phonetic": "/hɔːrs/",
    "definition": "A solid-hoofed plant-eating domesticated mammal.",
    "definitionVn": "con ngựa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "He learned to ride a brown horse.",
      "Horses can run very fast across fields."
    ],
    "exampleTranslations": [
      "Anh ấy đã học cưỡi một chú ngựa nâu.",
      "Ngựa có thể chạy rất nhanh trên cánh đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_14",
    "word": "sheep",
    "phonetic": "/ʃiːp/",
    "definition": "A domesticated ruminant animal with a thick woolly coat.",
    "definitionVn": "con cừu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Flocks of white sheep graze on the hillside.",
      "Sheep wool is used to make warm sweaters."
    ],
    "exampleTranslations": [
      "Đàn cừu trắng gặm cỏ trên sườn đồi.",
      "Lông cừu được dùng để làm áo len ấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_15",
    "word": "mouse",
    "phonetic": "/maʊs/",
    "definition": "A small rodent that typically has a pointed snout and long tail.",
    "definitionVn": "con chuột",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The little mouse ran into its tiny hole.",
      "The cat chased the swift mouse."
    ],
    "exampleTranslations": [
      "Chú chuột nhỏ chạy biến vào cái hang nhỏ.",
      "Chú mèo rượt đuổi theo con chuột nhanh nhẹn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_16",
    "word": "rabbit",
    "phonetic": "/ˈræbɪt/",
    "definition": "A burrowing, gregarious, plant-eating mammal with long ears.",
    "definitionVn": "con thỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The white rabbit has long ears and loves carrots.",
      "Rabbits can hop very quickly."
    ],
    "exampleTranslations": [
      "Chú thỏ trắng có đôi tai dài và thích ăn cà rốt.",
      "Thỏ có thể nhảy thoăn thoắt rất nhanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_17",
    "word": "monkey",
    "phonetic": "/ˈmʌŋki/",
    "definition": "A small to medium-sized primate with a long tail.",
    "definitionVn": "con khỉ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Monkeys are clever and swing from trees.",
      "We saw cheeky monkeys at the mountain temple."
    ],
    "exampleTranslations": [
      "Khỉ rất thông minh và chuyền cành thoăn thoắt.",
      "Chúng tôi thấy những chú khỉ tinh nghịch ở ngôi chùa trên núi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_18",
    "word": "tiger",
    "phonetic": "/ˈtaɪɡər/",
    "definition": "A very large solitary cat with a yellow-brown coat striped with black.",
    "definitionVn": "con hổ, cọp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The tiger is the majestic king of the jungle.",
      "Tigers have distinctive orange and black stripes."
    ],
    "exampleTranslations": [
      "Hổ là chúa tể oai phong của rừng xanh.",
      "Hổ có những vằn màu cam và đen đặc trưng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_19",
    "word": "lion",
    "phonetic": "/ˈlaɪən/",
    "definition": "A large tawny-colored cat that lives in prides, the male having a shaggy mane.",
    "definitionVn": "sư tử",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The male lion has a magnificent mane.",
      "Lions live in prides in the African savanna."
    ],
    "exampleTranslations": [
      "Sư tử đực có chiếc bờm thật uy nghi.",
      "Sư tử sống theo đàn trên thảo nguyên Châu Phi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_20",
    "word": "elephant",
    "phonetic": "/ˈelɪfənt/",
    "definition": "A very large plant-eating mammal with a long trunk and tusks.",
    "definitionVn": "con voi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Elephants are the largest land animals.",
      "The mother elephant protects her baby with care."
    ],
    "exampleTranslations": [
      "Voi là loài động vật trên cạn lớn nhất.",
      "Voi mẹ chăm sóc bảo vệ voi con rất chu đáo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_21",
    "word": "butterfly",
    "phonetic": "/ˈbʌtərflaɪ/",
    "definition": "An insect with four broad wings, often brightly colored.",
    "definitionVn": "con bướm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Colorful butterflies flutter around the blooming flowers.",
      "A caterpillar turns into a butterfly."
    ],
    "exampleTranslations": [
      "Những chú bướm nhiều màu sắc bay lượn quanh hoa nở.",
      "Sâu bướm biến thành chú bướm xinh đẹp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_22",
    "word": "turtle",
    "phonetic": "/ˈtɜːrtl/",
    "definition": "A slow-moving reptile enclosed in a scaly or leathery domed shell.",
    "definitionVn": "con rùa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The sea turtle swam gracefully in the blue ocean.",
      "Turtles can live for over a hundred years."
    ],
    "exampleTranslations": [
      "Chú rùa biển bơi lội uyển chuyển dưới đại dương xanh.",
      "Rùa có thể sống thọ hơn một trăm năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_01",
    "word": "body",
    "phonetic": "/ˈbɑːdi/",
    "definition": "The physical structure of a human or animal.",
    "definitionVn": "cơ thể, thân thể",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Exercise keeps your body strong.",
      "Drinking water is essential for your body."
    ],
    "exampleTranslations": [
      "Tập thể dục giúp cơ thể bạn khỏe mạnh.",
      "Uống nước rất cần thiết cho cơ thể."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_02",
    "word": "head",
    "phonetic": "/hed/",
    "definition": "The upper part of the human body containing the brain and face.",
    "definitionVn": "cái đầu, phần đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Wear a helmet to protect your head.",
      "She nodded her head."
    ],
    "exampleTranslations": [
      "Hãy đội mũ bảo hiểm để bảo vệ đầu.",
      "Cô ấy gật đầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_03",
    "word": "hair",
    "phonetic": "/her/",
    "definition": "Any of the fine thread-like strands growing from the skin.",
    "definitionVn": "mái tóc, tóc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She has long silky black hair.",
      "He got a haircut yesterday."
    ],
    "exampleTranslations": [
      "Cô ấy có mái tóc đen mượt mà.",
      "Hôm qua anh ấy vừa đi cắt tóc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_04",
    "word": "face",
    "phonetic": "/feɪs/",
    "definition": "The front part of a person's head from forehead to chin.",
    "definitionVn": "khuôn mặt, gương mặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She greeted everyone with a smiling face.",
      "Wash your face every morning."
    ],
    "exampleTranslations": [
      "Cô ấy chào mọi người với gương mặt tươi cười.",
      "Rửa mặt sạch sẽ mỗi buổi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_05",
    "word": "eye",
    "phonetic": "/aɪ/",
    "definition": "The organ of sight.",
    "definitionVn": "con mắt, đôi mắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She has bright brown eyes.",
      "Close your eyes and relax."
    ],
    "exampleTranslations": [
      "Cô ấy có đôi mắt nâu sáng ngời.",
      "Hãy nhắm mắt lại và thư giãn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_06",
    "word": "ear",
    "phonetic": "/ɪr/",
    "definition": "The organ of hearing and balance.",
    "definitionVn": "tai, đôi tai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "We listen to sweet music with our ears.",
      "Cover your ears if the sound is too loud."
    ],
    "exampleTranslations": [
      "Chúng ta lắng nghe âm nhạc ngọt ngào bằng đôi tai.",
      "Bịt tai lại nếu âm thanh quá to nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_07",
    "word": "nose",
    "phonetic": "/noʊz/",
    "definition": "The part projecting above the mouth on the face for smelling.",
    "definitionVn": "chiếc mũi, mũi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "I can smell fresh flowers with my nose.",
      "He wiped his nose with a tissue."
    ],
    "exampleTranslations": [
      "Tôi có thể ngửi thấy mùi hoa thơm bằng mũi.",
      "Anh ấy lau mũi bằng khăn giấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_08",
    "word": "mouth",
    "phonetic": "/maʊθ/",
    "definition": "The opening in the lower part of the human face for speaking and eating.",
    "definitionVn": "cái miệng, khẩu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Open your mouth and say 'Ah'.",
      "Cover your mouth when coughing."
    ],
    "exampleTranslations": [
      "Hãy mở miệng ra và nói 'A' nào.",
      "Hãy che miệng khi ho nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_09",
    "word": "lip",
    "phonetic": "/lɪp/",
    "definition": "Either of the two fleshy parts which form the upper and lower edges of the opening of the mouth.",
    "definitionVn": "bờ môi, làn môi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Apply lip balm to prevent dry lips.",
      "She put a finger to her lips asking for silence."
    ],
    "exampleTranslations": [
      "Thoa son dưỡng để tránh bị khô môi nhé.",
      "Cô ấy đặt ngón tay lên môi ra hiệu giữ im lặng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_10",
    "word": "tooth",
    "phonetic": "/tuːθ/",
    "definition": "Each of a set of hard, enamel-coated structures in the jaws (plural: teeth).",
    "definitionVn": "chiếc răng (số nhiều: teeth)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Brush your teeth twice a day.",
      "She has white and even teeth."
    ],
    "exampleTranslations": [
      "Đánh răng hai lần mỗi ngày nhé.",
      "Cô ấy có hàm răng trắng và đều tăm tắp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_11",
    "word": "tongue",
    "phonetic": "/tʌŋ/",
    "definition": "The fleshy muscular organ in the mouth used for tasting.",
    "definitionVn": "chiếc lưỡi, lưỡi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "We taste sweet and salty flavors with our tongue.",
      "Don't bite your tongue while eating."
    ],
    "exampleTranslations": [
      "Chúng ta nếm vị ngọt và mặn bằng lưỡi.",
      "Đừng cắn vào lưỡi khi ăn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_12",
    "word": "neck",
    "phonetic": "/nek/",
    "definition": "The part of the body connecting the head to the rest of the body.",
    "definitionVn": "cổ, chiếc cổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "She wore a warm wool scarf around her neck.",
      "Turn your neck gently to relieve tension."
    ],
    "exampleTranslations": [
      "Cô ấy quàng một chiếc khăn len ấm quanh cổ.",
      "Xoay nhẹ cổ để xua tan căng thẳng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_13",
    "word": "shoulder",
    "phonetic": "/ˈʃoʊldər/",
    "definition": "The joint connecting the arm or forelimb with the torso.",
    "definitionVn": "bờ vai, đôi vai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "He carried the heavy backpack on his shoulders.",
      "She tapped me on the shoulder."
    ],
    "exampleTranslations": [
      "Anh ấy mang chiếc ba lô nặng trên vai.",
      "Cô ấy vỗ nhẹ vào vai tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_14",
    "word": "arm",
    "phonetic": "/ɑːrm/",
    "definition": "Each of the two upper limbs of the human body.",
    "definitionVn": "cánh tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "He crossed his arms and listened carefully.",
      "She held the sleeping baby in her arms."
    ],
    "exampleTranslations": [
      "Anh ấy khoanh tay và chăm chú lắng nghe.",
      "Cô ấy ôm em bé đang ngủ trong vòng tay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_15",
    "word": "hand",
    "phonetic": "/hænd/",
    "definition": "The end part of a person's arm beyond the wrist.",
    "definitionVn": "bàn tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Wash your hands with soap before eating.",
      "Raise your hand to ask a question."
    ],
    "exampleTranslations": [
      "Rửa tay bằng xà phòng trước khi ăn.",
      "Giơ tay lên nếu muốn đặt câu hỏi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_16",
    "word": "finger",
    "phonetic": "/ˈfɪŋɡər/",
    "definition": "Each of the four slender jointed parts attached to either hand.",
    "definitionVn": "ngón tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "We have ten fingers on our two hands.",
      "She wears a sparkling ring on her finger."
    ],
    "exampleTranslations": [
      "Chúng ta có mười ngón tay trên hai bàn tay.",
      "Cô ấy đeo chiếc nhẫn lấp lánh trên ngón tay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_17",
    "word": "chest",
    "phonetic": "/tʃest/",
    "definition": "The front surface of a person's body between the neck and the stomach.",
    "definitionVn": "lồng ngực, ngực",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Take a deep breath and expand your chest.",
      "He placed his hand over his heart on his chest."
    ],
    "exampleTranslations": [
      "Hít một hơi thật sâu và căng lồng ngực ra.",
      "Anh ấy đặt tay lên tim trước ngực."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_18",
    "word": "stomach",
    "phonetic": "/ˈstʌmək/",
    "definition": "The internal organ in which the first part of digestion occurs.",
    "definitionVn": "bụng, dạ dày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "My stomach is rumbling because I am hungry.",
      "Drink warm water if your stomach hurts."
    ],
    "exampleTranslations": [
      "Bụng tôi đang kêu ùng ục vì đói.",
      "Hãy uống nước ấm nếu bị đau dạ dày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_19",
    "word": "back",
    "phonetic": "/bæk/",
    "definition": "The rear surface of the human body from the shoulders to the hips.",
    "definitionVn": "lưng, phía sau lưng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Sit straight to keep your back healthy.",
      "He carried a heavy load on his back."
    ],
    "exampleTranslations": [
      "Hãy ngồi thẳng lưng để giữ cột sống khỏe mạnh.",
      "Anh ấy cõng một gánh nặng trên lưng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_20",
    "word": "leg",
    "phonetic": "/leɡ/",
    "definition": "Each of the limbs on which a person or animal walks and stands.",
    "definitionVn": "chân, cẳng chân",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Running strengthens your leg muscles.",
      "He stretched his legs after sitting for hours."
    ],
    "exampleTranslations": [
      "Chạy bộ giúp tăng cường cơ bắp chân.",
      "Anh ấy duỗi chân sau nhiều giờ ngồi làm việc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_21",
    "word": "knee",
    "phonetic": "/niː/",
    "definition": "The joint between the thigh and the lower leg.",
    "definitionVn": "đầu gối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Bend your knees when lifting heavy objects.",
      "He scraped his knee while playing soccer."
    ],
    "exampleTranslations": [
      "Hãy gập đầu gối khi nâng vật nặng.",
      "Cậu ấy bị trầy đầu gối khi đá bóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_p_22",
    "word": "foot",
    "phonetic": "/fʊt/",
    "definition": "The lower extremity of the leg below the ankle (plural: feet).",
    "definitionVn": "bàn chân (số nhiều: feet)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_parts",
    "themeNameVn": "Bộ phận cơ thể",
    "themeNameEn": "Human Body Parts",
    "examples": [
      "Put your shoes on your feet.",
      "We walked on foot along the sandy beach."
    ],
    "exampleTranslations": [
      "Hãy xỏ giày vào chân đi nào.",
      "Chúng tôi đi bộ bằng chân trần dọc bãi cát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_01",
    "word": "clothes",
    "phonetic": "/kloʊðz/",
    "definition": "Items worn to cover the body.",
    "definitionVn": "quần áo, y phục",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Wear warm clothes in the cold winter.",
      "She folded her clean clothes neatly."
    ],
    "exampleTranslations": [
      "Hãy mặc quần áo ấm vào mùa đông lạnh nhé.",
      "Cô ấy gấp quần áo sạch thật gọn gàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_02",
    "word": "shirt",
    "phonetic": "/ʃɜːrt/",
    "definition": "A garment for the upper body with a collar and sleeves.",
    "definitionVn": "áo sơ mi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "He wore a crisp white shirt for the interview.",
      "Iron your shirt before school."
    ],
    "exampleTranslations": [
      "Anh ấy mặc áo sơ mi trắng tinh cho buổi phỏng vấn.",
      "Hãy ủi áo sơ mi trước khi đi học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_03",
    "word": "t-shirt",
    "phonetic": "/ˈtiː ʃɜːrt/",
    "definition": "A casual short-sleeved cotton shirt.",
    "definitionVn": "áo thun, áo phông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "I like wearing a comfortable cotton T-shirt.",
      "He bought a cool graphic T-shirt."
    ],
    "exampleTranslations": [
      "Tôi thích mặc áo thun cotton thoải mái.",
      "Anh ấy mua một chiếc áo phông in hình rất ngầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_04",
    "word": "pants",
    "phonetic": "/pænts/",
    "definition": "A piece of clothing covering the body from the waist to the ankles.",
    "definitionVn": "quần dài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "He bought a pair of black dress pants.",
      "These pants fit me perfectly."
    ],
    "exampleTranslations": [
      "Anh ấy đã mua một chiếc quần tây đen.",
      "Chiếc quần này vừa vặn với tôi hoàn hảo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_05",
    "word": "jeans",
    "phonetic": "/dʒiːnz/",
    "definition": "Trousers made of denim or other sturdy cotton fabric.",
    "definitionVn": "quần bò, quần jeans",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Blue jeans are popular all over the world.",
      "I wear jeans and sneakers on weekends."
    ],
    "exampleTranslations": [
      "Quần jeans xanh được ưa chuộng khắp thế giới.",
      "Tôi mặc quần jeans và đi giày thể thao vào cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_06",
    "word": "dress",
    "phonetic": "/dres/",
    "definition": "A one-piece garment for a woman or girl.",
    "definitionVn": "chiếc váy liền, đầm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "She wore a stunning red dress to the party.",
      "The summer floral dress looks lovely on her."
    ],
    "exampleTranslations": [
      "Cô ấy mặc chiếc đầm đỏ lộng lẫy đến bữa tiệc.",
      "Chiếc váy hoa mùa hè trông rất xinh xắn trên người cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_07",
    "word": "skirt",
    "phonetic": "/skɜːrt/",
    "definition": "A garment fastened around the waist and hanging down around the legs.",
    "definitionVn": "chân váy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Schoolgirls often wear pleated navy skirts.",
      "She paired her white blouse with a black skirt."
    ],
    "exampleTranslations": [
      "Các nữ sinh thường mặc chân váy xếp ly màu xanh đen.",
      "Cô ấy kết hợp áo sơ mi trắng với chân váy đen."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_08",
    "word": "jacket",
    "phonetic": "/ˈdʒækɪt/",
    "definition": "An outer garment extending either to the waist or the hips.",
    "definitionVn": "áo khoác nhẹ, áo jacket",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Zip up your jacket; it is chilly outside.",
      "He bought a stylish leather jacket."
    ],
    "exampleTranslations": [
      "Kéo khóa áo khoác lên nhé; bên ngoài trời lạnh đấy.",
      "Anh ấy đã mua một chiếc áo khoác da rất phong cách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_09",
    "word": "coat",
    "phonetic": "/koʊt/",
    "definition": "An outer garment worn outdoors, having sleeves and typically extending below the hips.",
    "definitionVn": "áo khoác dáng dài, áo choàng ấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Put on your heavy winter coat before going out.",
      "She hung her warm coat on the rack."
    ],
    "exampleTranslations": [
      "Mặc áo khoác mùa đông dày vào trước khi ra ngoài nhé.",
      "Cô ấy treo chiếc áo khoác ấm lên móc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_10",
    "word": "sweater",
    "phonetic": "/ˈswetər/",
    "definition": "A knitted garment worn on the upper body.",
    "definitionVn": "áo len, áo ấm dệt kim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Grandmother knit a soft wool sweater for me.",
      "This sweater keeps me warm and cozy."
    ],
    "exampleTranslations": [
      "Bà đã đan cho tôi một chiếc áo len mềm mại.",
      "Chiếc áo len này giữ cho tôi luôn ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_11",
    "word": "shoes",
    "phonetic": "/ʃuːz/",
    "definition": "A pair of footwear with a sturdy sole.",
    "definitionVn": "đôi giày, giày dép",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Please take off your shoes before entering.",
      "I bought a pair of running shoes."
    ],
    "exampleTranslations": [
      "Làm ơn cởi giày ra trước khi vào nhà.",
      "Tôi đã mua một đôi giày chạy bộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_12",
    "word": "socks",
    "phonetic": "/sɑːks/",
    "definition": "A garment for the foot and lower part of the leg.",
    "definitionVn": "đôi tất, đôi vớ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Wear warm socks on cold winter nights.",
      "Put on clean white socks with your sneakers."
    ],
    "exampleTranslations": [
      "Đi tất ấm vào những đêm đông lạnh nhé.",
      "Hãy đi đôi tất trắng sạch với giày thể thao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_13",
    "word": "hat",
    "phonetic": "/hæt/",
    "definition": "A shaped covering for the head worn for warmth or sun protection.",
    "definitionVn": "chiếc mũ, chiếc nón",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Wear a wide-brim hat to protect your face from the sun.",
      "He took off his hat politely."
    ],
    "exampleTranslations": [
      "Hãy đội mũ rộng vành để che nắng cho khuôn mặt nhé.",
      "Anh ấy ngả mũ chào một cách lịch sự."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_14",
    "word": "cap",
    "phonetic": "/kæp/",
    "definition": "A small, soft, flat hat with a visor.",
    "definitionVn": "mũ lưỡi trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "He wore a baseball cap backward.",
      "The red sports cap matches his outfit."
    ],
    "exampleTranslations": [
      "Cậu ấy đội chiếc mũ lưỡi trai ngược ra sau.",
      "Chiếc mũ thể thao đỏ rất hợp với trang phục của anh ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_15",
    "word": "glasses",
    "phonetic": "/ˈɡlæsɪz/",
    "definition": "A pair of lenses set in a frame worn on the face to aid sight.",
    "definitionVn": "chiếc kính mắt, mắt kính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "I need to wear my glasses to read small text.",
      "She put on her sunglasses on the beach."
    ],
    "exampleTranslations": [
      "Tôi cần đeo kính để đọc chữ nhỏ.",
      "Cô ấy đeo kính râm khi đi dạo trên bãi biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_16",
    "word": "watch",
    "phonetic": "/wɑːtʃ/",
    "definition": "A small timepiece worn typically on a strap on one's wrist.",
    "definitionVn": "đồng hồ đeo tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "My father gave me a classic wristwatch on graduation.",
      "Check your watch; it is already noon."
    ],
    "exampleTranslations": [
      "Bố tặng tôi chiếc đồng hồ đeo tay cổ điển nhân dịp tốt nghiệp.",
      "Hãy xem đồng hồ đi; đã trưa rồi đấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_17",
    "word": "bag",
    "phonetic": "/bæɡ/",
    "definition": "A container made of flexible material with an opening at the top.",
    "definitionVn": "túi xách, chiếc túi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "She carries her laptop in a leather bag.",
      "Don't forget your shopping bag."
    ],
    "exampleTranslations": [
      "Cô ấy mang máy tính trong một chiếc túi da.",
      "Đừng quên mang túi mua sắm của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_18",
    "word": "backpack",
    "phonetic": "/ˈbækpæk/",
    "definition": "A bag with shoulder straps that allow it to be carried on one's back.",
    "definitionVn": "chiếc ba lô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Students carry their books and lunch in backpacks.",
      "He packed his travel backpack for the weekend trip."
    ],
    "exampleTranslations": [
      "Học sinh mang sách và đồ ăn trưa trong ba lô.",
      "Anh ấy xếp đồ vào chiếc ba lô du lịch cho chuyến đi cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_19",
    "word": "umbrella",
    "phonetic": "/ʌmˈbrelə/",
    "definition": "A device consisting of a circular canopy of cloth on a folding metal frame to protect against rain.",
    "definitionVn": "chiếc ô, chiếc dù che mưa nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Take an umbrella; the weather forecast predicts heavy rain.",
      "She opened her yellow umbrella."
    ],
    "exampleTranslations": [
      "Hãy mang theo ô nhé; dự báo thời tiết báo trời sẽ mưa to.",
      "Cô ấy mở chiếc ô màu vàng ra."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_20",
    "word": "wear",
    "phonetic": "/wer/",
    "definition": "Have on one's body as a garment or decoration.",
    "definitionVn": "mặc, đeo, đội, mang (quần áo, phụ kiện)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "You should wear a warm jacket today.",
      "She loves wearing bright and cheerful colors."
    ],
    "exampleTranslations": [
      "Hôm nay bạn nên mặc một chiếc áo khoác ấm nhé.",
      "Cô ấy thích mặc những gam màu tươi sáng và vui tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
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
  },
  {
    "id": "bv_weathe_01",
    "word": "weather",
    "phonetic": "/ˈweðər/",
    "definition": "The state of the atmosphere at a place and time regarding heat, cloudiness, dryness, sunshine, wind, rain.",
    "definitionVn": "thời tiết, khí hậu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "What is the weather like today? — It is sunny!",
      "The weather is very pleasant in autumn."
    ],
    "exampleTranslations": [
      "Thời tiết hôm nay thế nào? — Trời nhiều nắng!",
      "Thời tiết rất dễ chịu vào mùa thu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_02",
    "word": "sun",
    "phonetic": "/sʌn/",
    "definition": "The star around which the earth orbits, providing light and warmth.",
    "definitionVn": "mặt trời, ánh nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The sun rises in the east and sets in the west.",
      "The warm sun feels great."
    ],
    "exampleTranslations": [
      "Mặt trời mọc ở hướng đông và lặn ở hướng tây.",
      "Ánh nắng ấm áp đem lại cảm giác thật tuyệt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_03",
    "word": "sunny",
    "phonetic": "/ˈsʌni/",
    "definition": "Bright with sunlight.",
    "definitionVn": "nhiều nắng, có nắng đẹp",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "It is a bright and sunny day today.",
      "Let's go for a picnic on this sunny morning."
    ],
    "exampleTranslations": [
      "Hôm nay là một ngày tươi sáng và nhiều nắng.",
      "Hãy đi dã ngoại vào buổi sáng nắng đẹp này nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_04",
    "word": "rain",
    "phonetic": "/reɪn/",
    "definition": "Moisture condensed from the atmosphere that falls visibly in separate drops.",
    "definitionVn": "cơn mưa, mưa rơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Take an umbrella; it looks like rain.",
      "The gentle rain makes everything green."
    ],
    "exampleTranslations": [
      "Hãy mang theo ô nhé; trời trông như sắp mưa đấy.",
      "Cơn mưa rào êm dịu làm mọi thứ thêm xanh tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_05",
    "word": "rainy",
    "phonetic": "/ˈreɪni/",
    "definition": "Having a great deal of rainfall.",
    "definitionVn": "mưa nhiều, ngày mưa",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "I love staying inside and reading books on rainy days.",
      "The rainy season starts in May."
    ],
    "exampleTranslations": [
      "Tôi thích ở trong nhà đọc sách vào những ngày mưa.",
      "Mùa mưa bắt đầu từ tháng Năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_06",
    "word": "wind",
    "phonetic": "/wɪnd/",
    "definition": "The perceptible natural movement of the air.",
    "definitionVn": "ngọn gió, làn gió",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "A cool wind is blowing from the sea.",
      "The strong wind blew my hat away."
    ],
    "exampleTranslations": [
      "Một làn gió mát đang thổi từ biển vào.",
      "Cơn gió mạnh đã thổi bay chiếc mũ của tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_07",
    "word": "windy",
    "phonetic": "/ˈwɪndi/",
    "definition": "Marked by or exposed to strong winds.",
    "definitionVn": "nhiều gió, lộng gió",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "It is too windy to play badminton outside.",
      "A windy day is perfect for flying kites."
    ],
    "exampleTranslations": [
      "Trời quá nhiều gió để có thể chơi cầu lông ngoài trời.",
      "Một ngày lộng gió rất hoàn hảo để thả diều."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_08",
    "word": "cloud",
    "phonetic": "/klaʊd/",
    "definition": "A visible mass of condensed water vapor floating in the atmosphere.",
    "definitionVn": "đám mây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "White fluffy clouds float in the blue sky.",
      "Dark storm clouds are gathering on the horizon."
    ],
    "exampleTranslations": [
      "Những đám mây trắng bồng bềnh trôi trên bầu trời xanh.",
      "Những đám mây đen vần vũ đang tụ lại nơi đường chân trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_09",
    "word": "cloudy",
    "phonetic": "/ˈklaʊdi/",
    "definition": "Covered with or characterized by clouds; overcast.",
    "definitionVn": "nhiều mây, râm mát",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "It is cloudy today, so it won't be too hot.",
      "The sky is overcast and cloudy."
    ],
    "exampleTranslations": [
      "Hôm nay trời nhiều mây nên sẽ không quá nóng.",
      "Bầu trời u ám và phủ đầy mây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_10",
    "word": "snow",
    "phonetic": "/snoʊ/",
    "definition": "Atmospheric water vapor frozen into ice crystals and falling in light white flakes.",
    "definitionVn": "tuyết, tuyết rơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Children love building a snowman in the fresh snow.",
      "Snow covers the mountaintops in winter."
    ],
    "exampleTranslations": [
      "Trẻ em thích đắp người tuyết trong lớp tuyết mới rơi.",
      "Tuyết bao phủ các đỉnh núi vào mùa đông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_11",
    "word": "rainbow",
    "phonetic": "/ˈreɪnboʊ/",
    "definition": "An arch of colors formed in the sky in certain circumstances, caused by the refraction and dispersion of the sun's light by rain.",
    "definitionVn": "cầu vồng (bảy sắc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "A gorgeous rainbow appeared in the sky after the rain.",
      "A rainbow has seven distinct colors."
    ],
    "exampleTranslations": [
      "Một chiếc cầu vồng tuyệt đẹp xuất hiện trên bầu trời sau cơn mưa.",
      "Cầu vồng có bảy sắc màu riêng biệt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_12",
    "word": "sky",
    "phonetic": "/skaɪ/",
    "definition": "The region of the atmosphere and outer space seen from the earth.",
    "definitionVn": "bầu trời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The sky is crystal clear and blue this morning.",
      "Stars twinkle like diamonds in the night sky."
    ],
    "exampleTranslations": [
      "Bầu trời sáng nay trong vắt và xanh ngắt.",
      "Các vì sao lấp lánh như kim cương trên bầu trời đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_13",
    "word": "star",
    "phonetic": "/stɑːr/",
    "definition": "A fixed luminous point in the night sky.",
    "definitionVn": "ngôi sao, vì sao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Look up at the millions of twinkling stars.",
      "The North Star guides travelers at night."
    ],
    "exampleTranslations": [
      "Hãy ngước nhìn hàng triệu vì sao đang lấp lánh.",
      "Sao Bắc Đẩu dẫn đường cho người lữ hành ban đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_14",
    "word": "moon",
    "phonetic": "/muːn/",
    "definition": "The natural satellite of the earth, visible by reflected light from the sun.",
    "definitionVn": "mặt trăng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The full moon shines brightly during Mid-Autumn festival.",
      "The moon reflects light from the sun."
    ],
    "exampleTranslations": [
      "Mặt trăng tròn tỏa sáng rực rỡ trong đêm rằm Trung Thu.",
      "Mặt trăng phản chiếu ánh sáng từ mặt trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_15",
    "word": "nature",
    "phonetic": "/ˈneɪtʃər/",
    "definition": "The physical world collective, including plants, animals, the landscape, and other features.",
    "definitionVn": "thiên nhiên, tự nhiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Spending time in nature reduces stress and brings joy.",
      "We must protect nature for future generations."
    ],
    "exampleTranslations": [
      "Dành thời gian hòa mình vào thiên nhiên giúp giảm căng thẳng và mang lại niềm vui.",
      "Chúng ta phải bảo vệ thiên nhiên cho các thế hệ tương lai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_16",
    "word": "tree",
    "phonetic": "/triː/",
    "definition": "A woody perennial plant, typically having a single stem or trunk.",
    "definitionVn": "cây cối, cái cây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Trees give us cool shade and produce oxygen.",
      "Planting trees helps fight climate change."
    ],
    "exampleTranslations": [
      "Cây cối cho bóng râm mát và tạo ra oxy.",
      "Trồng cây xanh giúp chống lại biến đổi khí hậu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_17",
    "word": "flower",
    "phonetic": "/ˈflaʊər/",
    "definition": "The seed-bearing part of a plant, consisting of reproductive organs typically surrounded by a brightly colored corolla.",
    "definitionVn": "bông hoa, hoa tươi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "Colorful flowers bloom beautifully in springtime.",
      "He gave his mother a fragrant bouquet of flowers."
    ],
    "exampleTranslations": [
      "Những bông hoa nhiều màu sắc đua nhau khoe sắc rực rỡ vào mùa xuân.",
      "Anh ấy tặng mẹ một bó hoa thơm ngát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_18",
    "word": "grass",
    "phonetic": "/ɡræs/",
    "definition": "Vegetation consisting of typically short plants with long narrow leaves.",
    "definitionVn": "bãi cỏ, ngọn cỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The fresh green grass is soft under our bare feet.",
      "Do not walk on the garden grass."
    ],
    "exampleTranslations": [
      "Bãi cỏ xanh tươi mềm mại dưới đôi chân trần của chúng tôi.",
      "Xin vui lòng không dẫm lên cỏ trong vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_19",
    "word": "river",
    "phonetic": "/ˈrɪvər/",
    "definition": "A large natural stream of water flowing in a channel to the sea, a lake, or another stream.",
    "definitionVn": "dòng sông, con sông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "The Red River flows through the capital city of Hanoi.",
      "Children love swimming in the calm river on hot days."
    ],
    "exampleTranslations": [
      "Sông Hồng chảy qua thủ đô Hà Nội.",
      "Lũ trẻ thích bơi lội dưới dòng sông êm đềm vào những ngày nắng nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_weathe_20",
    "word": "sea",
    "phonetic": "/siː/",
    "definition": "The expanse of salt water that covers most of the earth's surface.",
    "definitionVn": "biển, đại dương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_weather_nature",
    "themeNameVn": "Thời tiết & Thiên nhiên",
    "themeNameEn": "Weather & Nature",
    "examples": [
      "We swam in the warm blue sea during our summer vacation.",
      "The sea breeze feels incredibly fresh."
    ],
    "exampleTranslations": [
      "Chúng tôi đã bơi lội dưới làn nước biển xanh ấm áp trong kỳ nghỉ hè.",
      "Làn gió biển mang lại cảm giác vô cùng trong lành."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_01",
    "word": "doctor",
    "phonetic": "/ˈdɑːktər/",
    "definition": "A qualified practitioner of medicine; a physician.",
    "definitionVn": "bác sĩ (chữa bệnh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The doctor examined the sick child gently.",
      "I want to become a doctor to help people."
    ],
    "exampleTranslations": [
      "Bác sĩ khám cho em bé ốm rất nhẹ nhàng.",
      "Tôi muốn trở thành bác sĩ để cứu giúp mọi người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_02",
    "word": "nurse",
    "phonetic": "/nɜːrs/",
    "definition": "A person trained to care for the sick or infirm, especially in a hospital.",
    "definitionVn": "y tá, điều dưỡng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The nurse took my temperature and blood pressure.",
      "Nurses are very caring and hardworking."
    ],
    "exampleTranslations": [
      "Y tá đã đo nhiệt độ và huyết áp cho tôi.",
      "Các y tá rất chu đáo và chăm chỉ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_03",
    "word": "police",
    "phonetic": "/pəˈliːs/",
    "definition": "The civil force of a state responsible for prevention and detection of crime.",
    "definitionVn": "cảnh sát, công an",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The police officer directed traffic at the busy junction.",
      "Call the police in case of emergency."
    ],
    "exampleTranslations": [
      "Viên cảnh sát điều tiết giao thông tại ngã tư đông đúc.",
      "Hãy gọi cảnh sát trong trường hợp khẩn cấp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_04",
    "word": "firefighter",
    "phonetic": "/ˈfaɪərfaɪtər/",
    "definition": "A person whose job is to extinguish fires.",
    "definitionVn": "lính cứu hỏa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Brave firefighters put out the blaze quickly.",
      "Firefighters save lives every day."
    ],
    "exampleTranslations": [
      "Những người lính cứu hỏa dũng cảm đã dập tắt đám cháy nhanh chóng.",
      "Lính cứu hỏa cứu sinh mạng con người mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_05",
    "word": "engineer",
    "phonetic": "/ˌendʒɪˈnɪr/",
    "definition": "A person who designs, builds, or maintains engines, machines, or public works.",
    "definitionVn": "kỹ sư (xây dựng, phần mềm, cơ khí)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "He works as a software engineer in Da Nang.",
      "Engineers build bridges and smart technology."
    ],
    "exampleTranslations": [
      "Anh ấy làm kỹ sư phần mềm tại Đà Nẵng.",
      "Các kỹ sư xây dựng cầu đường và công nghệ thông minh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_06",
    "word": "architect",
    "phonetic": "/ˈɑːrkɪtekt/",
    "definition": "A person who designs buildings and in many cases also supervises their construction.",
    "definitionVn": "kiến trúc sư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The architect designed an eco-friendly modern house.",
      "She is a creative and talented architect."
    ],
    "exampleTranslations": [
      "Kiến trúc sư đã thiết kế một ngôi nhà hiện đại thân thiện với môi trường.",
      "Cô ấy là một kiến trúc sư tài năng và sáng tạo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_07",
    "word": "chef",
    "phonetic": "/ʃef/",
    "definition": "A professional cook, typically the chief cook in a restaurant or hotel.",
    "definitionVn": "bếp trưởng, đầu bếp chuyên nghiệp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The chef prepared an exquisite five-course dinner.",
      "He trained in France to become a master chef."
    ],
    "exampleTranslations": [
      "Bếp trưởng đã chuẩn bị một bữa tối năm món tinh tế.",
      "Anh ấy đã tu nghiệp tại Pháp để trở thành đầu bếp bậc thầy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_08",
    "word": "driver",
    "phonetic": "/ˈdraɪvər/",
    "definition": "A person who drives a vehicle.",
    "definitionVn": "tài xế, người lái xe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The taxi driver knew all the shortcuts in the city.",
      "Always thank your bus driver."
    ],
    "exampleTranslations": [
      "Người tài xế taxi biết mọi con đường tắt trong thành phố.",
      "Hãy luôn nói lời cảm ơn bác tài xế xe buýt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_09",
    "word": "pilot",
    "phonetic": "/ˈpaɪlət/",
    "definition": "A person who operates the flying controls of an aircraft.",
    "definitionVn": "phi công (lái máy bay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The airline pilot safely landed the airplane during the storm.",
      "His childhood dream was to be a pilot."
    ],
    "exampleTranslations": [
      "Phi công đã hạ cánh máy bay an toàn trong cơn giông bão.",
      "Ước mơ thời thơ ấu của anh ấy là làm phi công."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_10",
    "word": "singer",
    "phonetic": "/ˈsɪŋər/",
    "definition": "A person who sings, especially professionally.",
    "definitionVn": "ca sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The famous singer performed in front of thousands of fans.",
      "She has the sweet voice of a singer."
    ],
    "exampleTranslations": [
      "Người ca sĩ nổi tiếng biểu diễn trước hàng ngàn người hâm mộ.",
      "Cô ấy có giọng hát ngọt ngào của một ca sĩ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_11",
    "word": "dancer",
    "phonetic": "/ˈdænsər/",
    "definition": "A person who dances or whose profession is dancing.",
    "definitionVn": "vũ công, người khiêu vũ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Ballet dancers practice with great discipline.",
      "The dancers moved gracefully to the music."
    ],
    "exampleTranslations": [
      "Các vũ công múa ba lê luyện tập với tính kỷ luật cao.",
      "Những vũ công uyển chuyển chuyển động theo điệu nhạc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_12",
    "word": "artist",
    "phonetic": "/ˈɑːrtɪst/",
    "definition": "A person who produces paintings or drawings as a profession or hobby.",
    "definitionVn": "họa sĩ, nghệ sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The artist painted a breathtaking landscape of Ha Long Bay.",
      "Artists express emotions through their work."
    ],
    "exampleTranslations": [
      "Người họa sĩ đã vẽ phong cảnh Vịnh Hạ Long đẹp nghẹt thở.",
      "Các nghệ sĩ thể hiện cảm xúc qua tác phẩm của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_13",
    "word": "farmer",
    "phonetic": "/ˈfɑːrmər/",
    "definition": "A person who owns or manages a farm.",
    "definitionVn": "nông dân, người làm nông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Hardworking farmers grow rice and vegetables for the country.",
      "The farmer starts working at dawn."
    ],
    "exampleTranslations": [
      "Những người nông dân chăm chỉ trồng lúa và rau củ cho cả nước.",
      "Người nông dân bắt đầu làm việc từ lúc rạng đông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_14",
    "word": "worker",
    "phonetic": "/ˈwɜːrkər/",
    "definition": "A person who does a specified type of work or who works for wages.",
    "definitionVn": "công nhân, người lao động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Factory workers produce high-quality garments.",
      "Every worker deserves fair pay and safe conditions."
    ],
    "exampleTranslations": [
      "Các công nhân nhà máy sản xuất ra những bộ trang phục chất lượng cao.",
      "Mọi người lao động đều xứng đáng nhận lương công bằng và điều kiện an toàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_15",
    "word": "lawyer",
    "phonetic": "/ˈlɔːjər/",
    "definition": "A person who practices or studies law.",
    "definitionVn": "luật sư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The defense lawyer presented strong evidence in court.",
      "Consult a lawyer before signing the contract."
    ],
    "exampleTranslations": [
      "Luật sư bào chữa đã đưa ra bằng chứng thuyết phục trước tòa.",
      "Hãy tham khảo ý kiến luật sư trước khi ký hợp đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_16",
    "word": "accountant",
    "phonetic": "/əˈkaʊntənt/",
    "definition": "A person whose job is to keep or inspect financial accounts.",
    "definitionVn": "kế toán viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The accountant calculated the company's annual budget.",
      "She is a detail-oriented certified accountant."
    ],
    "exampleTranslations": [
      "Kế toán viên đã tính toán ngân sách hàng năm của công ty.",
      "Cô ấy là một kế toán viên có chứng chỉ và rất cẩn thận."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_17",
    "word": "cashier",
    "phonetic": "/kæˈʃɪr/",
    "definition": "A person handling payments and receipts in a store, bank, or other business.",
    "definitionVn": "thu ngân (người tính tiền)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The cashier scanned the groceries and gave me the receipt.",
      "Pay the cashier at counter number 3."
    ],
    "exampleTranslations": [
      "Người thu ngân quét mã hàng hóa và đưa biên lai cho tôi.",
      "Vui lòng thanh toán cho thu ngân ở quầy số 3."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_18",
    "word": "waiter",
    "phonetic": "/ˈweɪtər/",
    "definition": "A man whose job is to serve customers at their tables in a restaurant.",
    "definitionVn": "nam phục vụ bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The polite waiter brought our menu and water.",
      "We gave the friendly waiter a generous tip."
    ],
    "exampleTranslations": [
      "Người phục vụ lịch sự mang thực đơn và nước đến cho chúng tôi.",
      "Chúng tôi đã gửi tiền tip cho người phục vụ thân thiện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_19",
    "word": "waitress",
    "phonetic": "/ˈweɪtrəs/",
    "definition": "A woman whose job is to serve customers at their tables in a restaurant.",
    "definitionVn": "nữ phục vụ bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The waitress recommended the chef's special dish.",
      "She works as a waitress while studying at university."
    ],
    "exampleTranslations": [
      "Cô phục vụ bàn gợi ý món ăn đặc biệt của đầu bếp.",
      "Cô ấy làm phục vụ bàn trong lúc học đại học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_20",
    "word": "mechanic",
    "phonetic": "/məˈkænɪk/",
    "definition": "A person who repairs and maintains machinery and vehicle engines.",
    "definitionVn": "thợ sửa máy, thợ sửa xe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The mechanic fixed the motorbike engine in twenty minutes.",
      "Take your car to a certified mechanic."
    ],
    "exampleTranslations": [
      "Người thợ sửa xe đã sửa xong động cơ xe máy trong 20 phút.",
      "Hãy mang xe của bạn đến cho thợ máy có tay nghề nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
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
    "id": "bv_school_01",
    "word": "classroom",
    "phonetic": "/ˈklæsruːm/",
    "definition": "A room in a school where a class of students is taught.",
    "definitionVn": "phòng học, lớp học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "The classroom is bright and equipped with a smart board.",
      "Keep your classroom clean and tidy."
    ],
    "exampleTranslations": [
      "Phòng học sáng sủa và được trang bị bảng thông minh.",
      "Hãy giữ gìn lớp học sạch đẹp và ngăn nắp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_02",
    "word": "blackboard",
    "phonetic": "/ˈblækbɔːrd/",
    "definition": "A large board with a smooth dark surface attached to a wall for writing on with chalk.",
    "definitionVn": "bảng đen (viết phấn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "The teacher wrote the new grammar rule on the blackboard.",
      "Erase the blackboard at the end of class."
    ],
    "exampleTranslations": [
      "Thầy giáo đã viết quy tắc ngữ pháp mới lên bảng đen.",
      "Hãy lau bảng đen khi kết thúc tiết học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_03",
    "word": "chalk",
    "phonetic": "/tʃɔːk/",
    "definition": "A soft white limestone formed from the skeletal remains of marine organisms, used for writing.",
    "definitionVn": "viên phấn (viết bảng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "The teacher picked up a piece of white chalk.",
      "Coloured chalk is fun for drawing diagrams."
    ],
    "exampleTranslations": [
      "Thầy giáo nhặt một viên phấn trắng lên.",
      "Phấn màu rất thú vị để vẽ sơ đồ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_04",
    "word": "eraser",
    "phonetic": "/ɪˈreɪsər/",
    "definition": "A piece of soft rubber or plastic used to rub out something written.",
    "definitionVn": "cục tẩy, cục gôm, đồ lau bảng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Can I borrow your eraser to fix a mistake?",
      "Use an eraser to wipe the pencil marks."
    ],
    "exampleTranslations": [
      "Tôi có thể mượn cục tẩy của bạn để sửa lỗi không?",
      "Dùng cục gôm để xóa các vết bút chì nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_05",
    "word": "ruler",
    "phonetic": "/ˈruːlər/",
    "definition": "A straight strip of plastic, wood, or metal marked in centimeters or inches, used for drawing straight lines.",
    "definitionVn": "cây thước kẻ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Use a 30-centimeter ruler to draw straight lines.",
      "Measure the length with your ruler."
    ],
    "exampleTranslations": [
      "Dùng thước kẻ 30cm để vẽ các đường thẳng nhé.",
      "Đo chiều dài bằng thước kẻ của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_06",
    "word": "scissors",
    "phonetic": "/ˈsɪzərz/",
    "definition": "An instrument used for cutting cloth, paper, and other thin material.",
    "definitionVn": "cây kéo (cắt giấy, thủ công)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Be careful when handling sharp craft scissors.",
      "Cut the colored paper with scissors."
    ],
    "exampleTranslations": [
      "Hãy cẩn thận khi cầm kéo thủ công sắc bén nhé.",
      "Cắt giấy màu bằng kéo đi nào."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_07",
    "word": "glue",
    "phonetic": "/ɡluː/",
    "definition": "An adhesive substance used for sticking objects together.",
    "definitionVn": "keo dán, hồ dán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Use a glue stick to paste the picture in your notebook.",
      "Let the paper glue dry completely."
    ],
    "exampleTranslations": [
      "Dùng hồ dán thỏi để dán bức tranh vào vở nhé.",
      "Để keo dán giấy khô hoàn toàn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_08",
    "word": "notebook",
    "phonetic": "/ˈnoʊtbʊk/",
    "definition": "A book with blank or ruled pages for writing notes on.",
    "definitionVn": "cuốn sổ tay, vở ghi bài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Write every new vocabulary word in your English notebook.",
      "She bought a colorful notebook for school."
    ],
    "exampleTranslations": [
      "Ghi chép mọi từ vựng mới vào cuốn vở tiếng Anh nhé.",
      "Cô ấy đã mua một cuốn sổ tay rực rỡ để đi học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_09",
    "word": "textbook",
    "phonetic": "/ˈtekstbʊk/",
    "definition": "A book used as a standard work for the study of a particular subject.",
    "definitionVn": "sách giáo khoa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Open your English textbook to unit 3, please.",
      "The textbook contains clear diagrams and explanations."
    ],
    "exampleTranslations": [
      "Mời các em mở sách giáo khoa tiếng Anh bài 3.",
      "Sách giáo khoa có sơ đồ và giải thích rất rõ ràng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_10",
    "word": "dictionary",
    "phonetic": "/ˈdɪkʃəneri/",
    "definition": "A book or electronic resource that lists words and gives their meaning.",
    "definitionVn": "cuốn từ điển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Look up unknown words in an English-Vietnamese dictionary.",
      "An Oxford dictionary is a trusted study tool."
    ],
    "exampleTranslations": [
      "Tra cứu các từ chưa biết trong từ điển Anh - Việt nhé.",
      "Từ điển Oxford là công cụ học tập đáng tin cậy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_11",
    "word": "pencil case",
    "phonetic": "/ˈpensl keɪs/",
    "definition": "A small container for pens, pencils, and other stationery items.",
    "definitionVn": "hộp bút, bóp viết",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Keep your pens and rulers neatly inside your pencil case.",
      "She has a cute zippered pencil case."
    ],
    "exampleTranslations": [
      "Giữ bút và thước kẻ ngăn nắp trong hộp bút nhé.",
      "Cô ấy có một chiếc bóp viết kéo khóa rất dễ thương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_12",
    "word": "calculator",
    "phonetic": "/ˈkælkjuleɪtər/",
    "definition": "Something used for making mathematical calculations.",
    "definitionVn": "máy tính bỏ túi, máy tính cầm tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Scientific calculators are allowed in mathematics exams.",
      "Use the calculator to verify the sum."
    ],
    "exampleTranslations": [
      "Máy tính khoa học được phép mang vào phòng thi toán.",
      "Dùng máy tính để kiểm tra lại phép cộng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_13",
    "word": "homework",
    "phonetic": "/ˈhoʊmwɜːrk/",
    "definition": "Schoolwork that a student is required to do at home.",
    "definitionVn": "bài tập về nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Finish your English homework before dinner.",
      "Doing homework helps reinforce what you learned."
    ],
    "exampleTranslations": [
      "Hãy hoàn thành bài tập về nhà tiếng Anh trước bữa tối nhé.",
      "Làm bài tập giúp củng cố những gì bạn đã học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_14",
    "word": "exam",
    "phonetic": "/ɪɡˈzæm/",
    "definition": "A formal test of a person's knowledge or proficiency in a subject.",
    "definitionVn": "kỳ thi, bài thi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "She studied diligently and passed the English exam with flying colors.",
      "The midterm exam is next Tuesday."
    ],
    "exampleTranslations": [
      "Cô ấy đã học tập chăm chỉ và vượt qua kỳ thi tiếng Anh với điểm số xuất sắc.",
      "Kỳ thi giữa kỳ vào thứ Ba tuần sau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_15",
    "word": "lesson",
    "phonetic": "/ˈlesn/",
    "definition": "A period of learning or teaching.",
    "definitionVn": "bài học, tiết học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Today's English lesson is about daily routines.",
      "Listen attentively throughout the 45-minute lesson."
    ],
    "exampleTranslations": [
      "Bài học tiếng Anh hôm nay nói về thói quen hàng ngày.",
      "Hãy chăm chú lắng nghe trong suốt tiết học 45 phút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_16",
    "word": "grade",
    "phonetic": "/ɡreɪd/",
    "definition": "A mark indicating the quality of a student's work; a year of school.",
    "definitionVn": "điểm số, khối lớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "He received an 'A' grade on his English presentation.",
      "My younger sister is in grade 5."
    ],
    "exampleTranslations": [
      "Cậu ấy đạt điểm A trong bài thuyết trình tiếng Anh.",
      "Em gái tôi đang học lớp 5."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_17",
    "word": "recess",
    "phonetic": "/ˈriːses/",
    "definition": "A break between school classes.",
    "definitionVn": "giờ ra chơi, giờ giải lao ở trường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Students play games and eat snacks during recess.",
      "The bell rang signaling recess time."
    ],
    "exampleTranslations": [
      "Học sinh chơi trò chơi và ăn nhẹ trong giờ ra chơi.",
      "Chuông reo báo hiệu giờ giải lao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_18",
    "word": "subject",
    "phonetic": "/ˈsʌbdʒɪkt/",
    "definition": "A branch of knowledge studied or taught in a system, such as school.",
    "definitionVn": "môn học (ở trường)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "English and Science are my favorite school subjects.",
      "How many subjects are you studying this semester?"
    ],
    "exampleTranslations": [
      "Tiếng Anh và Khoa học là những môn học yêu thích nhất của tôi.",
      "Học kỳ này bạn đang học bao nhiêu môn?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_19",
    "word": "sharpener",
    "phonetic": "/ˈʃɑːrpnər/",
    "definition": "A device for sharpening pencils.",
    "definitionVn": "cái gọt bút chì, chuốt bút chì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Sharpen your blunt pencil with a pencil sharpener.",
      "I keep a small sharpener in my pencil case."
    ],
    "exampleTranslations": [
      "Gọt chiếc bút chì cùn bằng cái gọt bút chì nhé.",
      "Tôi để một cái chuốt bút chì nhỏ trong hộp bút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_20",
    "word": "marker",
    "phonetic": "/ˈmɑːrkər/",
    "definition": "A felt-tipped pen with a broad tip.",
    "definitionVn": "bút dạ quang, bút lông viết bảng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Highlight key vocabulary terms with a yellow marker.",
      "The teacher wrote with a blue whiteboard marker."
    ],
    "exampleTranslations": [
      "Tô sáng các thuật ngữ từ vựng quan trọng bằng bút dạ quang vàng.",
      "Thầy giáo đã viết bằng bút lông bảng màu xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_01",
    "word": "hobby",
    "phonetic": "/ˈhɑːbi/",
    "definition": "An activity done regularly in one's leisure time for pleasure.",
    "definitionVn": "sở thích (lúc rảnh rỗi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Reading English books is my favorite hobby.",
      "What hobbies do you enjoy on weekends?"
    ],
    "exampleTranslations": [
      "Đọc sách tiếng Anh là sở thích yêu thích của tôi.",
      "Bạn thích làm những sở thích gì vào cuối tuần?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_02",
    "word": "sport",
    "phonetic": "/spɔːrt/",
    "definition": "An activity involving physical exertion and skill.",
    "definitionVn": "môn thể thao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Playing sports keeps you fit and energetic.",
      "Football is the most popular sport in Vietnam."
    ],
    "exampleTranslations": [
      "Chơi thể thao giúp bạn khỏe mạnh và tràn đầy năng lượng.",
      "Bóng đá là môn thể thao được yêu thích nhất tại Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_03",
    "word": "game",
    "phonetic": "/ɡeɪm/",
    "definition": "A form of play or sport, especially a competitive one played according to rules.",
    "definitionVn": "trò chơi, ván đấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Let's play a fun English word-guessing game!",
      "Board games are great for family evenings."
    ],
    "exampleTranslations": [
      "Cùng chơi trò chơi đoán từ vựng tiếng Anh vui nhộn nào!",
      "Trò chơi cờ bàn rất tuyệt cho những buổi tối gia đình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_04",
    "word": "football",
    "phonetic": "/ˈfʊtbɔːl/",
    "definition": "A form of team game played with a spherical ball; soccer.",
    "definitionVn": "môn bóng đá (túc cầu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "The boys are playing football in the schoolyard.",
      "Vietnam's national football team won the championship."
    ],
    "exampleTranslations": [
      "Các cậu bé đang chơi bóng đá trong sân trường.",
      "Đội tuyển bóng đá quốc gia Việt Nam đã giành chức vô địch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_05",
    "word": "soccer",
    "phonetic": "/ˈsɑːkər/",
    "definition": "A game played by two teams of eleven players with a round ball.",
    "definitionVn": "bóng đá (cách gọi kiểu Mỹ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "He plays soccer as a forward in the local team.",
      "Soccer matches bring fans together."
    ],
    "exampleTranslations": [
      "Cậu ấy chơi bóng đá ở vị trí tiền đạo trong đội bóng địa phương.",
      "Những trận đấu bóng đá kết nối người hâm mộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_06",
    "word": "basketball",
    "phonetic": "/ˈbæskɪtbɔːl/",
    "definition": "A game played between two teams of five players who score points by tossing a ball through a netted hoop.",
    "definitionVn": "môn bóng rổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Playing basketball helps teenagers grow taller.",
      "He shot the basketball straight into the hoop."
    ],
    "exampleTranslations": [
      "Chơi bóng rổ giúp thanh thiếu niên phát triển chiều cao.",
      "Cậu ấy đã ném bóng rổ thẳng vào rổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_07",
    "word": "volleyball",
    "phonetic": "/ˈvɑːlibɔːl/",
    "definition": "A game for two teams, usually of six players, in which a large ball is hit by hand over a high net.",
    "definitionVn": "môn bóng chuyền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Beach volleyball is very fun to play in the summer.",
      "She spiked the volleyball over the net."
    ],
    "exampleTranslations": [
      "Bóng chuyền bãi biển chơi rất vui vào mùa hè.",
      "Cô ấy đã đập bóng chuyền qua lưới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_08",
    "word": "badminton",
    "phonetic": "/ˈbædmɪntən/",
    "definition": "A game with rackets in which a shuttlecock is hit back and forth across a net.",
    "definitionVn": "môn cầu lông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Badminton is popular in parks in the early morning.",
      "He bought a lightweight carbon badminton racket."
    ],
    "exampleTranslations": [
      "Cầu lông rất phổ biến ở các công viên vào sáng sớm.",
      "Anh ấy đã mua một cây vợt cầu lông carbon siêu nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_09",
    "word": "tennis",
    "phonetic": "/ˈtenɪs/",
    "definition": "A game in which two or four players strike a ball with rackets over a net.",
    "definitionVn": "môn quần vợt, tennis",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "They play tennis on clay courts every Sunday.",
      "Tennis requires agility and strong stamina."
    ],
    "exampleTranslations": [
      "Họ chơi quần vợt trên sân đất nện mỗi Chủ Nhật.",
      "Môn quần vợt đòi hỏi sự nhanh nhẹn và thể lực dẻo dai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_10",
    "word": "swimming",
    "phonetic": "/ˈswɪmɪŋ/",
    "definition": "The sport or activity of propelling oneself through water.",
    "definitionVn": "môn bơi lội, bơi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Swimming is a full-body exercise that refreshes the mind.",
      "We go swimming at the community pool."
    ],
    "exampleTranslations": [
      "Bơi lội là bài tập toàn thân giúp tinh thần sảng khoái.",
      "Chúng tôi đi bơi ở hồ bơi cộng đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_11",
    "word": "running",
    "phonetic": "/ˈrʌnɪŋ/",
    "definition": "The action or movement of a runner.",
    "definitionVn": "chạy bộ (thể dục)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Morning running builds strong cardiovascular health.",
      "She completed a 5-kilometer running marathon."
    ],
    "exampleTranslations": [
      "Chạy bộ buổi sáng xây dựng sức khỏe tim mạch vững chắc.",
      "Cô ấy đã hoàn thành cự ly chạy marathon 5km."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_12",
    "word": "cycling",
    "phonetic": "/ˈsaɪklɪŋ/",
    "definition": "The activity of riding a bicycle.",
    "definitionVn": "đạp xe đạp thể thao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Cycling around the lake is peaceful and healthy.",
      "He wears a helmet and cycling gloves."
    ],
    "exampleTranslations": [
      "Đạp xe quanh hồ rất thanh bình và tốt cho sức khỏe.",
      "Anh ấy đội mũ bảo hiểm và đeo găng tay đạp xe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_13",
    "word": "chess",
    "phonetic": "/tʃes/",
    "definition": "A board game of strategic skill for two players.",
    "definitionVn": "cờ vua (trò chơi trí tuệ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Playing chess trains strategic thinking and patience.",
      "Checkmate! That was an impressive game of chess."
    ],
    "exampleTranslations": [
      "Chơi cờ vua rèn luyện tư duy chiến lược và tính kiên nhẫn.",
      "Chiếu tướng! Đó là một ván cờ vua rất ấn tượng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_14",
    "word": "guitar",
    "phonetic": "/ɡɪˈtɑːr/",
    "definition": "A stringed musical instrument with a fretted fingerboard.",
    "definitionVn": "đàn ghi-ta, đàn guitar",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "He played an acoustic guitar while we sang around the campfire.",
      "She practices guitar chords every evening."
    ],
    "exampleTranslations": [
      "Anh ấy đệm đàn ghi-ta mộc trong khi chúng tôi cùng hát quanh lửa trại.",
      "Cô ấy luyện các hợp âm ghi-ta mỗi tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_15",
    "word": "piano",
    "phonetic": "/piˈænoʊ/",
    "definition": "A large musical instrument with a keyboard.",
    "definitionVn": "đàn dương cầm, đàn piano",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Classical piano music is soothing and elegant.",
      "She has played the piano since she was five."
    ],
    "exampleTranslations": [
      "Nhạc piano cổ điển rất du dương và trang nhã.",
      "Cô ấy đã chơi đàn piano từ năm 5 tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_16",
    "word": "singing",
    "phonetic": "/ˈsɪŋɪŋ/",
    "definition": "The activity of performing songs with the voice.",
    "definitionVn": "ca hát, việc hát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Singing English songs helps improve pronunciation naturally.",
      "She won first prize in the singing contest."
    ],
    "exampleTranslations": [
      "Hát các bài hát tiếng Anh giúp cải thiện phát âm rất tự nhiên.",
      "Cô ấy đã giành giải nhất trong cuộc thi ca hát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_17",
    "word": "dancing",
    "phonetic": "/ˈdænsɪŋ/",
    "definition": "The activity of dancing for pleasure or in order to entertain others.",
    "definitionVn": "nhảy múa, khiêu vũ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Dancing is a joyful way to express emotions and stay active.",
      "They took salsa dancing lessons."
    ],
    "exampleTranslations": [
      "Khiêu vũ là một cách tràn ngập niềm vui để thể hiện cảm xúc và vận động.",
      "Họ đã tham gia các lớp học nhảy salsa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_18",
    "word": "drawing",
    "phonetic": "/ˈdrɔːɪŋ/",
    "definition": "A picture or diagram made with a pencil, pen, or crayon rather than paint.",
    "definitionVn": "vẽ tranh, bức vẽ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Drawing cartoons is a fun creative outlet.",
      "The child showed me her colorful drawing of a house."
    ],
    "exampleTranslations": [
      "Vẽ tranh hoạt hình là một cách sáng tạo thú vị.",
      "Em bé khoe tôi bức vẽ ngôi nhà đầy màu sắc của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_19",
    "word": "painting",
    "phonetic": "/ˈpeɪntɪŋ/",
    "definition": "The action or skill of using paint, or a painted picture.",
    "definitionVn": "hội họa, bức tranh sơn dầu/thủy mặc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Oil painting requires great precision and passion.",
      "The museum displays historic watercolor paintings."
    ],
    "exampleTranslations": [
      "Vẽ tranh sơn dầu đòi hỏi sự tỉ mỉ và đam mê cao độ.",
      "Bảo tàng trưng bày những bức tranh màu nước lịch sử."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_hobbie_20",
    "word": "fishing",
    "phonetic": "/ˈfɪʃɪŋ/",
    "definition": "The activity of catching fish, either for food or as a sport.",
    "definitionVn": "câu cá (thư giãn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_hobbies_sports",
    "themeNameVn": "Sở thích & Thể thao",
    "themeNameEn": "Hobbies & Sports",
    "examples": [
      "Fishing by the quiet river is wonderfully relaxing.",
      "My grandfather loves weekend fishing trips."
    ],
    "exampleTranslations": [
      "Câu cá bên dòng sông tĩnh lặng đem lại cảm giác thư thái tuyệt vời.",
      "Ông tôi rất thích các chuyến đi câu cá cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_01",
    "word": "money",
    "phonetic": "/ˈmʌni/",
    "definition": "A current medium of exchange in the form of coins and banknotes.",
    "definitionVn": "tiền bạc, tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Save money for your future education.",
      "How much money does this book cost?"
    ],
    "exampleTranslations": [
      "Hãy tiết kiệm tiền cho việc học tập tương lai của bạn nhé.",
      "Cuốn sách này có giá bao nhiêu tiền vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_02",
    "word": "cash",
    "phonetic": "/kæʃ/",
    "definition": "Money in coins or notes, as distinct from credit cards or digital transfer.",
    "definitionVn": "tiền mặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Do you accept cash or only credit cards?",
      "I withdrew cash from the local ATM."
    ],
    "exampleTranslations": [
      "Cửa hàng chấp nhận tiền mặt hay chỉ quẹt thẻ tín dụng?",
      "Tôi đã rút tiền mặt từ cây ATM địa phương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_03",
    "word": "coin",
    "phonetic": "/kɔɪn/",
    "definition": "A flat, typically round piece of metal with an official stamp, used as money.",
    "definitionVn": "đồng tiền xu, đồng xu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "He tossed a shiny coin into the wishing fountain.",
      "Collectors treasure ancient gold coins."
    ],
    "exampleTranslations": [
      "Cậu ấy ném một đồng xu sáng bóng vào đài phun nước ước nguyện.",
      "Các nhà sưu tập trân trọng những đồng tiền vàng cổ xưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_04",
    "word": "price",
    "phonetic": "/praɪs/",
    "definition": "The amount of money expected, required, or given in payment for something.",
    "definitionVn": "mức giá, giá tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The price of this laptop is very reasonable.",
      "Check the price tag before buying."
    ],
    "exampleTranslations": [
      "Mức giá của chiếc máy tính xách tay này rất hợp lý.",
      "Hãy kiểm tra nhãn giá trước khi mua nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_05",
    "word": "bill",
    "phonetic": "/bɪl/",
    "definition": "A printed statement of the money owed for goods or services; invoice.",
    "definitionVn": "hóa đơn thanh toán, tiền hóa đơn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Can we have the bill, please?",
      "Remember to pay the electricity bill on time."
    ],
    "exampleTranslations": [
      "Làm ơn cho chúng tôi xin hóa đơn thanh toán được không?",
      "Hãy nhớ thanh toán tiền hóa đơn điện đúng hạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_06",
    "word": "receipt",
    "phonetic": "/rɪˈsiːt/",
    "definition": "A written acknowledgment of having received a specified sum of money or goods.",
    "definitionVn": "biên lai, hóa đơn mua hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Keep the sales receipt in case you want to exchange the shirt.",
      "The cashier handed me the printed receipt."
    ],
    "exampleTranslations": [
      "Hãy giữ lại biên lai mua hàng phòng khi bạn muốn đổi áo nhé.",
      "Người thu ngân đã đưa cho tôi biên lai in sẵn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_07",
    "word": "wallet",
    "phonetic": "/ˈwɑːlɪt/",
    "definition": "A pocket-sized flat folding case for holding money and plastic cards.",
    "definitionVn": "ví tiền, chiếc bóp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "He kept his driver's license and cash in his leather wallet.",
      "Don't leave your wallet unattended."
    ],
    "exampleTranslations": [
      "Anh ấy cất bằng lái xe và tiền mặt trong ví da.",
      "Đừng để ví tiền của bạn ở nơi không ai trông coi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_08",
    "word": "discount",
    "phonetic": "/ˈdɪskaʊnt/",
    "definition": "A deduction from the usual cost of something.",
    "definitionVn": "giảm giá, chiết khấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Students get a 20% discount on bus passes.",
      "The store offers big discounts during Black Friday."
    ],
    "exampleTranslations": [
      "Học sinh sinh viên được giảm giá 20% khi mua vé xe buýt.",
      "Cửa hàng giảm giá lớn trong dịp Black Friday."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_09",
    "word": "sale",
    "phonetic": "/seɪl/",
    "definition": "An event for the rapid disposal of goods at reduced prices.",
    "definitionVn": "đợt giảm giá, bán hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "These stylish sneakers are currently on sale.",
      "The summer clearance sale starts tomorrow."
    ],
    "exampleTranslations": [
      "Những đôi giày thể thao phong cách này hiện đang được giảm giá.",
      "Đợt xả hàng mùa hè bắt đầu vào ngày mai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_10",
    "word": "cheap",
    "phonetic": "/tʃiːp/",
    "definition": "Low in price; costing little money.",
    "definitionVn": "rẻ, giá rẻ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Street food in Hanoi is both delicious and cheap.",
      "It is a cheap and effective solution."
    ],
    "exampleTranslations": [
      "Ẩm thực đường phố ở Hà Nội vừa ngon vừa rẻ.",
      "Đó là một giải pháp vừa rẻ vừa hiệu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_11",
    "word": "expensive",
    "phonetic": "/ɪkˈspensɪv/",
    "definition": "Costing a lot of money.",
    "definitionVn": "đắt đỏ, đắt tiền",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Luxury sports cars are extremely expensive.",
      "Dining at five-star restaurants can be expensive."
    ],
    "exampleTranslations": [
      "Xe thể thao hạng sang cực kỳ đắt tiền.",
      "Ăn uống tại nhà hàng năm sao có thể rất đắt đỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_12",
    "word": "shop",
    "phonetic": "/ʃɑːp/",
    "definition": "A building or part of a building where goods or services are sold.",
    "definitionVn": "cửa hàng, tiệm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "She bought fresh flowers at the corner shop.",
      "Let's go shopping for clothes this weekend."
    ],
    "exampleTranslations": [
      "Cô ấy đã mua hoa tươi ở cửa hàng góc phố.",
      "Cùng đi mua sắm quần áo vào cuối tuần này nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_13",
    "word": "store",
    "phonetic": "/stɔːr/",
    "definition": "A retail establishment selling items to the public.",
    "definitionVn": "cửa hàng tiện lợi, bách hóa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The convenience store is open 24 hours a day.",
      "We bought stationery from the school store."
    ],
    "exampleTranslations": [
      "Cửa hàng tiện lợi mở cửa 24 giờ mỗi ngày.",
      "Chúng tôi đã mua văn phòng phẩm từ cửa hàng của trường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_14",
    "word": "cost",
    "phonetic": "/kɔːst/",
    "definition": "Require the payment of a specified sum of money before it can be acquired or done.",
    "definitionVn": "trị giá, có giá là (tiền)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "How much does this cup of coffee cost? — It costs two dollars.",
      "Quality education is worth the cost."
    ],
    "exampleTranslations": [
      "Tách cà phê này có giá bao nhiêu? — Giá 2 đô la.",
      "Giáo dục chất lượng rất xứng đáng với chi phí bỏ ra."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_15",
    "word": "spend",
    "phonetic": "/spend/",
    "definition": "Pay out money in buying or hiring goods or services.",
    "definitionVn": "chi tiêu, tiêu tiền, dành thời gian",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Be careful not to spend more than you earn.",
      "Spend time practicing English speaking every day."
    ],
    "exampleTranslations": [
      "Hãy cẩn thận đừng tiêu nhiều hơn số tiền bạn kiếm được.",
      "Hãy dành thời gian luyện nói tiếng Anh mỗi ngày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_16",
    "word": "change",
    "phonetic": "/tʃeɪndʒ/",
    "definition": "Coins or smaller banknotes given back as the balance of a larger sum paid.",
    "definitionVn": "tiền lẻ, tiền thối lại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Here is your coffee and your change.",
      "Do you have change for a 50-dollar note?"
    ],
    "exampleTranslations": [
      "Cà phê và tiền thối lại của quý khách đây ạ.",
      "Bạn có tiền lẻ đổi cho tờ 50 đô la không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_17",
    "word": "customer",
    "phonetic": "/ˈkʌstəmər/",
    "definition": "A person or organization that buys goods or services from a store or business.",
    "definitionVn": "khách hàng, người mua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The shop assistant greeted the customer with a warm smile.",
      "Customer satisfaction is our top priority."
    ],
    "exampleTranslations": [
      "Nhân viên bán hàng chào đón khách hàng với nụ cười ấm áp.",
      "Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_18",
    "word": "cart",
    "phonetic": "/kɑːrt/",
    "definition": "A wheeled vehicle pushed by a customer to carry shopping items.",
    "definitionVn": "xe đẩy mua hàng (siêu thị)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Put the groceries inside the shopping cart.",
      "Return your shopping cart to the designated area."
    ],
    "exampleTranslations": [
      "Hãy để hàng hóa vào trong xe đẩy mua hàng nhé.",
      "Hãy trả xe đẩy về đúng khu vực quy định."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_19",
    "word": "credit card",
    "phonetic": "/ˈkredɪt kɑːrd/",
    "definition": "A small plastic card issued by a bank allowing the holder to purchase goods on credit.",
    "definitionVn": "thẻ tín dụng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "You can tap your credit card for quick contactless payment.",
      "Keep your credit card details secure."
    ],
    "exampleTranslations": [
      "Bạn có thể chạm thẻ tín dụng để thanh toán không tiếp xúc nhanh gọn.",
      "Hãy giữ bí mật thông tin thẻ tín dụng của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_20",
    "word": "market",
    "phonetic": "/ˈmɑːrkɪt/",
    "definition": "A regular gathering of people for the purchase and sale of provisions, livestock, and other commodities.",
    "definitionVn": "chợ, nơi giao thương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The floating market in the Mekong Delta is colorful and lively.",
      "Fresh fruits are sold at the morning market."
    ],
    "exampleTranslations": [
      "Chợ nổi ở Đồng bằng sông Cửu Long rất nhiều màu sắc và sống động.",
      "Hoa quả tươi được bày bán ở chợ sớm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_01",
    "word": "plant",
    "phonetic": "/plænt/",
    "definition": "A living organism of the kind exemplified by trees, shrubs, herbs, grasses, and ferns.",
    "definitionVn": "cây cối, thực vật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Water indoor plants once a week.",
      "Plants absorb carbon dioxide and release oxygen."
    ],
    "exampleTranslations": [
      "Tưới cây trong nhà mỗi tuần một lần nhé.",
      "Thực vật hấp thụ khí cacbonic và thải ra khí oxy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_02",
    "word": "leaf",
    "phonetic": "/liːf/",
    "definition": "A flattened structure of a higher plant, typically green and blade-like (plural: leaves).",
    "definitionVn": "chiếc lá, lá cây (số nhiều: leaves)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Golden leaves fall from trees in autumn.",
      "Tea is made from dried green leaves."
    ],
    "exampleTranslations": [
      "Những chiếc lá vàng rơi rụng khỏi cành cây vào mùa thu.",
      "Trà được làm từ những chiếc lá xanh phơi khô."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_03",
    "word": "root",
    "phonetic": "/ruːt/",
    "definition": "The part of a plant which attaches it to the ground, conveying water and nourishment.",
    "definitionVn": "rễ cây, cội rễ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Deep roots help large trees stand strong in storms.",
      "Carrots are nutritious edible roots."
    ],
    "exampleTranslations": [
      "Rễ sâu giúp cây to đứng vững vàng trong bão gió.",
      "Cà rốt là loại rễ củ ăn được rất bổ dưỡng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_04",
    "word": "seed",
    "phonetic": "/siːd/",
    "definition": "The unit of reproduction of a flowering plant, capable of developing into another plant.",
    "definitionVn": "hạt giống, hạt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Plant the sunflower seed in fertile soil.",
      "Chia seeds and sunflower seeds are healthy snacks."
    ],
    "exampleTranslations": [
      "Hãy gieo hạt hoa hướng dương vào đất màu mỡ nhé.",
      "Hạt chia và hạt hướng dương là những món ăn nhẹ lành mạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_05",
    "word": "mango",
    "phonetic": "/ˈmæŋɡoʊ/",
    "definition": "A fleshy oval yellowish-red tropical fruit that is eaten ripe or used green in pickles.",
    "definitionVn": "quả xoài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sweet ripe mango is delicious in summer desserts.",
      "Green mango with chili salt is a favorite snack in Vietnam."
    ],
    "exampleTranslations": [
      "Xoài chín ngọt rất thơm ngon trong các món tráng miệng mùa hè.",
      "Xoài xanh chấm muối ớt là món ăn vặt được yêu thích ở Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_06",
    "word": "lemon",
    "phonetic": "/ˈlemən/",
    "definition": "A yellow oval citrus fruit with thick skin and fragrant, sour juice.",
    "definitionVn": "quả chanh vàng (vị chua)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Add a slice of fresh lemon to your warm honey tea.",
      "Lemon juice contains high levels of Vitamin C."
    ],
    "exampleTranslations": [
      "Thêm một lát chanh tươi vào tách trà mật ong ấm nhé.",
      "Nước cốt chanh chứa hàm lượng Vitamin C cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_07",
    "word": "lime",
    "phonetic": "/laɪm/",
    "definition": "A rounded citrus fruit similar to a lemon but smaller, greener, and more acid.",
    "definitionVn": "quả chanh xanh (chanh ta)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Squeeze fresh lime over your bowl of hot pho.",
      "Lime juice gives a refreshing tangy kick."
    ],
    "exampleTranslations": [
      "Vắt chanh xanh tươi vào tô phở nóng hổi nhé.",
      "Nước chanh xanh mang lại vị chua thanh sảng khoái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_08",
    "word": "grape",
    "phonetic": "/ɡreɪp/",
    "definition": "A berry growing in clusters on a grapevine, eaten raw or used for making wine.",
    "definitionVn": "quả nho, chùm nho",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sweet seedless green grapes are crisp and delicious.",
      "Ninh Thuan is famous for its lush grape vineyards."
    ],
    "exampleTranslations": [
      "Những quả nho xanh ngọt không hạt rất giòn và ngon.",
      "Ninh Thuận nổi tiếng với những vườn nho trĩu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_09",
    "word": "strawberry",
    "phonetic": "/ˈstrɔːberi/",
    "definition": "A sweet soft red fruit with a seed-studded surface.",
    "definitionVn": "quả dâu tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Da Lat is famous for fresh and fragrant red strawberries.",
      "She topped her yogurt with sliced strawberries."
    ],
    "exampleTranslations": [
      "Đà Lạt nổi tiếng với những quả dâu tây đỏ tươi thơm lừng.",
      "Cô ấy rắc dâu tây cắt lát lên sữa chua."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_10",
    "word": "watermelon",
    "phonetic": "/ˈwɔːtərmelən/",
    "definition": "The large fruit of a plant of the gourd family, with smooth green skin and juicy red pulp.",
    "definitionVn": "quả dưa hấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Chilled watermelon is the perfect treat on hot summer days.",
      "Watermelon is over 90 percent water."
    ],
    "exampleTranslations": [
      "Dưa hấu ướp lạnh là món quà hoàn hảo vào những ngày hè nóng nực.",
      "Dưa hấu chứa hơn 90 phần trăm là nước."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_11",
    "word": "pineapple",
    "phonetic": "/ˈpaɪnæpl/",
    "definition": "A large juicy tropical fruit consisting of aromatic edible yellow flesh surrounded by a tough segmented skin.",
    "definitionVn": "quả dứa, quả thơm, quả khóm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Fresh pineapple juice is sweet and tangy.",
      "Pineapple is rich in bromelain and aids digestion."
    ],
    "exampleTranslations": [
      "Nước ép dứa tươi có vị chua ngọt thanh mát.",
      "Quả dứa rất giàu bromelain và hỗ trợ tiêu hóa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_12",
    "word": "coconut",
    "phonetic": "/ˈkoʊkənʌt/",
    "definition": "The large, oval, brown seed of a tropical palm, containing edible white meat and clear liquid.",
    "definitionVn": "quả dừa, trái dừa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Fresh coconut water is natural, refreshing, and full of electrolytes.",
      "Ben Tre is the land of coconuts in Vietnam."
    ],
    "exampleTranslations": [
      "Nước dừa tươi rất tự nhiên, giải khát và đầy khoáng chất.",
      "Bến Tre là xứ sở dừa của Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_13",
    "word": "papaya",
    "phonetic": "/pəˈpaɪə/",
    "definition": "A tropical fruit shaped like an elongated melon, with edible orange flesh and small black seeds.",
    "definitionVn": "quả đu đủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sweet ripe papaya is gentle on the stomach.",
      "Green papaya salad with dried beef is a street classic."
    ],
    "exampleTranslations": [
      "Đu đủ chín ngọt rất lành bụng và dễ tiêu.",
      "Nộm đu đủ xanh bò khô là món ăn đường phố kinh điển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_14",
    "word": "potato",
    "phonetic": "/pəˈteɪtoʊ/",
    "definition": "A starchy plant tuber that is one of the most important food crops.",
    "definitionVn": "củ khoai tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Mashed potatoes with butter taste creamy and delicious.",
      "Bake the potatoes in the oven until golden."
    ],
    "exampleTranslations": [
      "Khoai tây nghiền với bơ có vị béo ngậy và thơm ngon.",
      "Nướng khoai tây trong lò cho đến khi vàng ươm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_15",
    "word": "tomato",
    "phonetic": "/təˈmeɪtoʊ/",
    "definition": "A glossy red or yellowish pulpy edible fruit that is typically eaten as a vegetable in salads.",
    "definitionVn": "quả cà chua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Fresh red tomatoes are rich in lycopene and antioxidants.",
      "Slice the tomatoes for the garden salad."
    ],
    "exampleTranslations": [
      "Cà chua đỏ tươi rất giàu lycopene và chất chống oxy hóa.",
      "Thái lát cà chua cho món salad vườn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_16",
    "word": "carrot",
    "phonetic": "/ˈkærət/",
    "definition": "A tapering orange-colored root eaten as a vegetable.",
    "definitionVn": "củ cà rốt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Eating crunchy carrots is great for your eyesight.",
      "Add diced carrots to the chicken soup."
    ],
    "exampleTranslations": [
      "Ăn cà rốt giòn rất tốt cho thị lực của bạn.",
      "Thêm cà rốt thái hạt lựu vào súp gà nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_17",
    "word": "onion",
    "phonetic": "/ˈʌnjən/",
    "definition": "A swollen edible bulb with a pungent taste and smell, composed of several concentric layers.",
    "definitionVn": "củ hành tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sauté chopped onions in olive oil until fragrant.",
      "Cutting raw onions may make your eyes water."
    ],
    "exampleTranslations": [
      "Xào hành tây băm với dầu ô liu cho đến khi dậy mùi thơm.",
      "Cắt hành tây sống có thể làm bạn cay mắt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_18",
    "word": "garlic",
    "phonetic": "/ˈɡɑːrlɪk/",
    "definition": "A strong-smelling pungent-tasting bulb, used as a flavoring in cookery and in herbal medicine.",
    "definitionVn": "củ tỏi (gia vị)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Garlic boosts your immune system and adds rich flavor to food.",
      "Crush two cloves of fresh garlic."
    ],
    "exampleTranslations": [
      "Tỏi giúp tăng cường hệ miễn dịch và tăng hương vị đậm đà cho món ăn.",
      "Đập dập hai tép tỏi tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_19",
    "word": "cucumber",
    "phonetic": "/ˈkjuːkʌmbər/",
    "definition": "A long, green-skinned fruit with watery flesh, usually eaten raw in salads or pickled.",
    "definitionVn": "quả dưa chuột, dưa leo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Cool sliced cucumbers are crunchy and hydrating.",
      "Place cucumber slices on your eyes to relax."
    ],
    "exampleTranslations": [
      "Dưa chuột thái lát mát lạnh rất giòn và cấp nước tốt.",
      "Đắp những lát dưa chuột lên mắt để thư giãn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_20",
    "word": "vegetable",
    "phonetic": "/ˈvedʒtəbl/",
    "definition": "A plant or part of a plant used as food.",
    "definitionVn": "rau củ, rau xanh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Eating plenty of green vegetables keeps your body healthy.",
      "Buy fresh organic vegetables at the market."
    ],
    "exampleTranslations": [
      "Ăn nhiều rau xanh giúp cơ thể luôn khỏe mạnh.",
      "Mua rau củ hữu cơ tươi ở chợ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
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
  },
  {
    "id": "bv_kitche_01",
    "word": "pot",
    "phonetic": "/pɑːt/",
    "definition": "A container, typically rounded or cylindrical and of ceramic or metal, used for cooking.",
    "definitionVn": "nồi nấu (nồi canh, nồi luộc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "A large pot of soup is simmering on the stove.",
      "Cover the cooking pot with a lid."
    ],
    "exampleTranslations": [
      "Một nồi súp lớn đang sôi lăn tăn trên bếp.",
      "Đậy nắp nồi nấu lại nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_02",
    "word": "pan",
    "phonetic": "/pæn/",
    "definition": "A metal container used for cooking food, typically with a flat base and long handle.",
    "definitionVn": "chảo rán, chảo chiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Heat a little oil in the non-stick frying pan.",
      "She flipped the fried egg neatly in the pan."
    ],
    "exampleTranslations": [
      "Làm nóng một ít dầu trong chảo chống dính nhé.",
      "Cô ấy lật quả trứng ốp la thật khéo trong chảo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_03",
    "word": "bowl",
    "phonetic": "/boʊl/",
    "definition": "A round, deep dish used for food or liquid.",
    "definitionVn": "bát, tô (đựng cơm, súp)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Serve hot noodles in a large ceramic bowl.",
      "He ate a bowl of steamed rice with chopsticks."
    ],
    "exampleTranslations": [
      "Múc mì nóng vào một chiếc tô sứ lớn nhé.",
      "Anh ấy ăn một bát cơm trắng bằng đũa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_04",
    "word": "plate",
    "phonetic": "/pleɪt/",
    "definition": "A flat dish, typically circular and made of china, from which food is eaten or served.",
    "definitionVn": "chiếc đĩa (đựng thức ăn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Place the grilled fish carefully on the white plate.",
      "Clear the dining plates after eating."
    ],
    "exampleTranslations": [
      "Đặt món cá nướng cẩn thận lên chiếc đĩa trắng nhé.",
      "Dọn dẹp đĩa ăn sau bữa ăn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_05",
    "word": "dish",
    "phonetic": "/dɪʃ/",
    "definition": "A shallow flat-bottomed container for cooking or serving food; a particular prepared food.",
    "definitionVn": "món ăn, đĩa thức ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Spring rolls are a famous traditional Vietnamese dish.",
      "Wash the dishes with warm water and soap."
    ],
    "exampleTranslations": [
      "Nem rán là món ăn truyền thống nổi tiếng của Việt Nam.",
      "Rửa chén đĩa bằng nước ấm và nước rửa chén nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_06",
    "word": "spoon",
    "phonetic": "/spuːn/",
    "definition": "An implement consisting of a small, shallow oval or round bowl on a long handle, used for eating or stirring.",
    "definitionVn": "chiếc thìa, muỗng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Stir the hot soup with a wooden spoon.",
      "Eat soup with a ceramic soup spoon."
    ],
    "exampleTranslations": [
      "Khuấy súp nóng bằng một chiếc thìa gỗ nhé.",
      "Ăn súp bằng một chiếc thìa sứ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_07",
    "word": "fork",
    "phonetic": "/fɔːrk/",
    "definition": "An implement with two or more prongs used for lifting food to the mouth or holding it when cutting.",
    "definitionVn": "chiếc nĩa, dĩa ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Use a fork and knife to cut the steak neatly.",
      "She ate her fruit salad with a small fork."
    ],
    "exampleTranslations": [
      "Dùng dao và nĩa để cắt miếng bít tết gọn gàng nhé.",
      "Cô ấy ăn món salad trái cây bằng một chiếc nĩa nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_08",
    "word": "knife",
    "phonetic": "/naɪf/",
    "definition": "An instrument composed of a blade fixed into a handle, used for cutting.",
    "definitionVn": "con dao (cắt, thái)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Always be careful when using a sharp kitchen knife.",
      "Cut the ripe apple with a fruit knife."
    ],
    "exampleTranslations": [
      "Luôn luôn cẩn thận khi sử dụng dao làm bếp sắc bén nhé.",
      "Cắt quả táo chín bằng dao gọt hoa quả nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_09",
    "word": "chopsticks",
    "phonetic": "/ˈtʃɑːpstɪks/",
    "definition": "A pair of thin, tapered sticks of wood, bamboo, or plastic, held in one hand and used for eating in Asian cuisine.",
    "definitionVn": "đôi đũa (ăn cơm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Learning to use chopsticks is an enjoyable skill.",
      "We eat pho and rice with bamboo chopsticks."
    ],
    "exampleTranslations": [
      "Học dùng đũa là một kỹ năng rất thú vị.",
      "Chúng tôi ăn phở và cơm bằng đũa tre."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_10",
    "word": "cup",
    "phonetic": "/kʌp/",
    "definition": "A small, bowl-shaped container for drinking from, typically having a handle.",
    "definitionVn": "tách, cốc có quai (uống trà, cà phê)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Would you like a cup of hot green tea?",
      "She drank a warm cup of milk before bed."
    ],
    "exampleTranslations": [
      "Bạn có muốn dùng một tách trà xanh nóng không?",
      "Cô ấy đã uống một cốc sữa ấm trước khi đi ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_11",
    "word": "glass",
    "phonetic": "/ɡlæs/",
    "definition": "A drinking container made of glass.",
    "definitionVn": "ly thủy tinh, cốc thủy tinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Drink a tall glass of fresh orange juice.",
      "She filled the glass with cold water."
    ],
    "exampleTranslations": [
      "Hãy uống một ly nước cam tươi lớn nhé.",
      "Cô ấy rót đầy nước lạnh vào chiếc ly thủy tinh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_12",
    "word": "bottle",
    "phonetic": "/ˈbɑːtl/",
    "definition": "A container with a narrow neck, used for storing drinks or other liquids.",
    "definitionVn": "chai, bình đựng nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Carry a reusable water bottle when traveling.",
      "A glass bottle of milk was delivered to the doorstep."
    ],
    "exampleTranslations": [
      "Mang theo bình nước dùng nhiều lần khi đi du lịch nhé.",
      "Một chai sữa thủy tinh đã được giao đến trước hiên nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_13",
    "word": "kettle",
    "phonetic": "/ˈketl/",
    "definition": "A container or device in which water is boiled, having a lid, spout, and handle.",
    "definitionVn": "ấm đun nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Boil fresh water in the electric kettle for tea.",
      "The stainless steel kettle whistled on the stove."
    ],
    "exampleTranslations": [
      "Đun nước sôi trong ấm điện để pha trà nhé.",
      "Chiếc ấm inox reo lên trên bếp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_14",
    "word": "stove",
    "phonetic": "/stoʊv/",
    "definition": "An apparatus for cooking or heating that operates by burning fuel or using electricity.",
    "definitionVn": "bếp nấu (bếp gas, bếp từ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Turn off the gas stove after you finish cooking.",
      "Induction stoves are safe, fast, and easy to wipe clean."
    ],
    "exampleTranslations": [
      "Tắt bếp gas sau khi bạn nấu ăn xong nhé.",
      "Bếp từ rất an toàn, nấu nhanh và dễ lau chùi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_15",
    "word": "oven",
    "phonetic": "/ˈʌvn/",
    "definition": "An enclosed compartment for cooking and heating food.",
    "definitionVn": "lò nướng (bánh, thịt)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Preheat the oven to 180 degrees before baking cookies.",
      "The roast chicken smells delicious in the oven."
    ],
    "exampleTranslations": [
      "Làm nóng lò nướng đến 180 độ trước khi nướng bánh quy nhé.",
      "Món gà quay thơm phức trong lò nướng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_16",
    "word": "microwave",
    "phonetic": "/ˈmaɪkrəweɪv/",
    "definition": "An oven that uses microwaves to cook or heat food quickly.",
    "definitionVn": "lò vi sóng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Warm up your soup in the microwave for two minutes.",
      "Use microwave-safe bowls when reheating food."
    ],
    "exampleTranslations": [
      "Làm nóng súp trong lò vi sóng trong hai phút nhé.",
      "Sử dụng bát an toàn cho lò vi sóng khi hâm nóng thức ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_17",
    "word": "cutting board",
    "phonetic": "/ˈkʌtɪŋ bɔːrd/",
    "definition": "A durable board on which to place material for cutting.",
    "definitionVn": "thớt (thái thịt, rau)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Use separate cutting boards for raw meat and vegetables.",
      "Wash the wooden cutting board thoroughly."
    ],
    "exampleTranslations": [
      "Dùng thớt riêng cho thịt sống và rau củ nhé.",
      "Rửa sạch thớt gỗ thật kỹ lưỡng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_18",
    "word": "sink",
    "phonetic": "/sɪŋk/",
    "definition": "A fixed basin with a water supply and a drain.",
    "definitionVn": "bồn rửa bát, bồn rửa tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Wash the greasy plates in the kitchen sink.",
      "Keep the kitchen sink clean and unclogged."
    ],
    "exampleTranslations": [
      "Rửa những chiếc đĩa dính dầu mỡ trong bồn rửa bát nhé.",
      "Giữ bồn rửa chén luôn sạch sẽ và thông thoáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_19",
    "word": "cook",
    "phonetic": "/kʊk/",
    "definition": "Prepare food, a dish, or a meal by combining and heating the ingredients in various ways.",
    "definitionVn": "nấu ăn, nấu nướng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "I love to cook healthy home meals for my family.",
      "Mom is cooking traditional beef pho in the kitchen."
    ],
    "exampleTranslations": [
      "Tôi rất thích tự nấu những bữa cơm gia đình bổ dưỡng cho người thân.",
      "Mẹ đang nấu phở bò truyền thống trong bếp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_20",
    "word": "bake",
    "phonetic": "/beɪk/",
    "definition": "Cook food by dry heat without direct exposure to a flame, typically in an oven.",
    "definitionVn": "nướng bánh (bằng lò)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Let's bake fresh chocolate chip cookies this Sunday.",
      "She baked a fluffy birthday cake for her brother."
    ],
    "exampleTranslations": [
      "Cùng nướng bánh quy sô cô la thơm lừng vào Chủ Nhật này nhé.",
      "Cô ấy đã nướng một chiếc bánh sinh nhật mềm xốp cho anh trai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_01",
    "word": "office",
    "phonetic": "/ˈɔːfɪs/",
    "definition": "A room, set of rooms, or building used as a place for commercial, professional, or bureaucratic work.",
    "definitionVn": "văn phòng làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Our modern office is located in the central business district.",
      "She arrives at the office at 8:30 AM."
    ],
    "exampleTranslations": [
      "Văn phòng hiện đại của chúng tôi nằm ở trung tâm kinh doanh.",
      "Cô ấy đến văn phòng lúc 8h30 sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_02",
    "word": "computer",
    "phonetic": "/kəmˈpjuːtər/",
    "definition": "An electronic device for storing and processing data.",
    "definitionVn": "máy vi tính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Computers have transformed how we work and learn.",
      "Shut down your computer before leaving the office."
    ],
    "exampleTranslations": [
      "Máy vi tính đã biến đổi cách chúng ta làm việc và học tập.",
      "Tắt máy tính trước khi rời văn phòng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_03",
    "word": "laptop",
    "phonetic": "/ˈlæptɑːp/",
    "definition": "A computer that is portable and suitable for use while traveling.",
    "definitionVn": "máy tính xách tay, laptop",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "I carry my lightweight laptop in my backpack.",
      "She opened her laptop to write an English essay."
    ],
    "exampleTranslations": [
      "Tôi mang theo chiếc laptop siêu nhẹ trong ba lô.",
      "Cô ấy mở laptop ra để viết bài luận tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_04",
    "word": "screen",
    "phonetic": "/skriːn/",
    "definition": "A flat panel or area on an electronic device on which images and data are displayed.",
    "definitionVn": "màn hình hiển thị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Adjust the screen brightness to protect your eyes.",
      "The high-resolution screen displays crisp text."
    ],
    "exampleTranslations": [
      "Điều chỉnh độ sáng màn hình để bảo vệ mắt nhé.",
      "Màn hình độ phân giải cao hiển thị chữ rất sắc nét."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_05",
    "word": "keyboard",
    "phonetic": "/ˈkiːbɔːrd/",
    "definition": "A panel of keys that operate a computer or typewriter.",
    "definitionVn": "bàn phím máy tính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Learn touch typing to type faster on your keyboard.",
      "She typed her English homework smoothly on the keyboard."
    ],
    "exampleTranslations": [
      "Học gõ 10 ngón để gõ nhanh hơn trên bàn phím nhé.",
      "Cô ấy gõ bài tập tiếng Anh thoăn thoắt trên bàn phím."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_06",
    "word": "mouse",
    "phonetic": "/maʊs/",
    "definition": "A small handheld device that is dragged across a flat surface to move the cursor on a computer screen.",
    "definitionVn": "con chuột máy tính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Click the left mouse button to open the application.",
      "A wireless ergonomic mouse is comfortable to use."
    ],
    "exampleTranslations": [
      "Nhấp chuột trái để mở ứng dụng nhé.",
      "Con chuột công thái học không dây dùng rất thoải mái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_07",
    "word": "printer",
    "phonetic": "/ˈprɪntər/",
    "definition": "A machine for printing text or pictures onto paper, especially one linked to a computer.",
    "definitionVn": "máy in (tài liệu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Print two copies of the contract on the color printer.",
      "The office printer ran out of white paper."
    ],
    "exampleTranslations": [
      "In hai bản hợp đồng trên máy in màu nhé.",
      "Máy in văn phòng vừa hết giấy trắng rồi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_08",
    "word": "paper",
    "phonetic": "/ˈpeɪpər/",
    "definition": "Material manufactured in thin sheets from the pulp of wood, used for writing or printing.",
    "definitionVn": "tờ giấy, giấy in",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Load a ream of A4 paper into the printer tray.",
      "Write down your ideas on a clean sheet of paper."
    ],
    "exampleTranslations": [
      "Nạp một ram giấy A4 vào khay máy in nhé.",
      "Hãy ghi lại những ý tưởng của bạn lên một tờ giấy trắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_09",
    "word": "file",
    "phonetic": "/faɪl/",
    "definition": "A folder or collection of information stored on a computer under a single name.",
    "definitionVn": "tệp tin, hồ sơ dữ liệu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Save your file regularly so you don't lose progress.",
      "Attach the PDF file to your email message."
    ],
    "exampleTranslations": [
      "Hãy lưu tệp tin thường xuyên để không bị mất dữ liệu nhé.",
      "Đính kèm tệp PDF vào thư email của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_10",
    "word": "email",
    "phonetic": "/ˈiːmeɪl/",
    "definition": "Messages distributed by electronic means from one computer user to one or more recipients.",
    "definitionVn": "thư điện tử, email",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Send me an email with the project details.",
      "Check your email inbox every morning."
    ],
    "exampleTranslations": [
      "Gửi email cho tôi kèm thông tin chi tiết dự án nhé.",
      "Kiểm tra hộp thư email mỗi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_11",
    "word": "internet",
    "phonetic": "/ˈɪntərnet/",
    "definition": "A global computer network providing a variety of information and communication facilities.",
    "definitionVn": "mạng in-tơ-nét, mạng toàn cầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "The internet allows us to learn English from anywhere.",
      "We search for information on the internet every day."
    ],
    "exampleTranslations": [
      "Mạng internet cho phép chúng ta học tiếng Anh từ bất cứ đâu.",
      "Chúng ta tìm kiếm thông tin trên internet mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_12",
    "word": "website",
    "phonetic": "/ˈwebsaɪt/",
    "definition": "A set of related web pages located under a single domain name.",
    "definitionVn": "trang web, trang thông tin điện tử",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Bookmark this English learning website on your browser.",
      "Our company website has an intuitive design."
    ],
    "exampleTranslations": [
      "Đánh dấu trang web học tiếng Anh này trên trình duyệt nhé.",
      "Trang web của công ty chúng tôi có thiết kế rất trực quan."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_13",
    "word": "password",
    "phonetic": "/ˈpæswɜːrd/",
    "definition": "A secret word or phrase that must be used to gain admission to a system.",
    "definitionVn": "mật khẩu, mã bảo vệ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Create a strong password with letters, numbers, and symbols.",
      "Never share your private password with anyone."
    ],
    "exampleTranslations": [
      "Tạo một mật khẩu mạnh kết hợp chữ cái, số và ký tự đặc biệt nhé.",
      "Không bao giờ chia sẻ mật khẩu riêng tư của bạn cho bất kỳ ai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_14",
    "word": "wifi",
    "phonetic": "/ˈwaɪ faɪ/",
    "definition": "A facility allowing computers, smartphones, or other devices to connect to the internet wirelessly.",
    "definitionVn": "mạng không dây, sóng Wi-Fi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "What is the Wi-Fi password for this coffee shop?",
      "Connect to the free high-speed Wi-Fi network."
    ],
    "exampleTranslations": [
      "Mật khẩu Wi-Fi của quán cà phê này là gì vậy?",
      "Kết nối với mạng Wi-Fi tốc độ cao miễn phí nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_15",
    "word": "message",
    "phonetic": "/ˈmesɪdʒ/",
    "definition": "A verbal, written, or recorded communication sent to or left for a recipient.",
    "definitionVn": "tin nhắn, thông điệp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "I received a friendly text message from my teacher.",
      "Send a message when you arrive safely."
    ],
    "exampleTranslations": [
      "Tôi đã nhận được một tin nhắn thân thiện từ giáo viên.",
      "Gửi tin nhắn khi bạn đã đến nơi an toàn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_16",
    "word": "call",
    "phonetic": "/kɔːl/",
    "definition": "An act of telephoning someone.",
    "definitionVn": "cuộc gọi (điện thoại)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "I missed a phone call from my manager.",
      "Give me a video call this evening."
    ],
    "exampleTranslations": [
      "Tôi đã lỡ một cuộc gọi từ người quản lý.",
      "Gọi video cho tôi tối nay nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_17",
    "word": "meeting",
    "phonetic": "/ˈmiːtɪŋ/",
    "definition": "An assembly of people for a particular purpose, especially formal discussion.",
    "definitionVn": "cuộc họp, buổi họp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "We have an online team meeting at 9:00 AM.",
      "The meeting ended with productive results."
    ],
    "exampleTranslations": [
      "Chúng tôi có cuộc họp nhóm trực tuyến lúc 9h sáng.",
      "Cuộc họp đã kết thúc với những kết quả rất hiệu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_18",
    "word": "project",
    "phonetic": "/ˈprɑːdʒekt/",
    "definition": "An enterprise that is carefully planned to achieve a particular aim.",
    "definitionVn": "dự án, đề án",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Our team is working on an innovative AI project.",
      "She submitted her final English project on time."
    ],
    "exampleTranslations": [
      "Nhóm chúng tôi đang thực hiện một dự án AI đổi mới sáng tạo.",
      "Cô ấy đã nộp dự án tiếng Anh cuối khóa đúng hạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_19",
    "word": "colleague",
    "phonetic": "/ˈkɑːliːɡ/",
    "definition": "A person with whom one works in a profession or business.",
    "definitionVn": "đồng nghiệp (cùng cơ quan)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "My colleagues are supportive and friendly.",
      "Collaborate closely with your teammates and colleagues."
    ],
    "exampleTranslations": [
      "Các đồng nghiệp của tôi rất nhiệt tình giúp đỡ và thân thiện.",
      "Hợp tác chặt chẽ với các bạn trong nhóm và đồng nghiệp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_20",
    "word": "desk",
    "phonetic": "/desk/",
    "definition": "A piece of furniture with a flat surface for working at in an office.",
    "definitionVn": "bàn làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Keep your office desk clean, organized, and clutter-free.",
      "She decorated her desk with a small green succulent."
    ],
    "exampleTranslations": [
      "Giữ bàn làm việc văn phòng luôn sạch sẽ, ngăn nắp và gọn gàng nhé.",
      "Cô ấy trang trí bàn làm việc bằng một cây sen đá nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_01",
    "word": "city",
    "phonetic": "/ˈsɪti/",
    "definition": "A large town.",
    "definitionVn": "thành phố, đô thị lớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Da Nang is a livable and scenic coastal city.",
      "Public transit makes traveling in the city easy."
    ],
    "exampleTranslations": [
      "Đà Nẵng là thành phố biển đáng sống và thơ mộng.",
      "Giao thông công cộng giúp việc đi lại trong thành phố rất dễ dàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_02",
    "word": "town",
    "phonetic": "/taʊn/",
    "definition": "An urban area that has a name, defined boundaries, and local government, and is generally larger than a village.",
    "definitionVn": "thị trấn, thị xã",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Hoi An is an enchanting ancient town with yellow walls.",
      "We walked through the peaceful streets of the small town."
    ],
    "exampleTranslations": [
      "Hội An là một phố cổ quyến rũ với những bức tường vàng.",
      "Chúng tôi đi dạo qua những con phố thanh bình của thị trấn nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_03",
    "word": "village",
    "phonetic": "/ˈvɪlɪdʒ/",
    "definition": "A group of houses and associated buildings, situated in a rural area.",
    "definitionVn": "ngôi làng, làng quê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Life in the peaceful countryside village is calm and fresh.",
      "Bat Trang is a traditional ceramic craft village."
    ],
    "exampleTranslations": [
      "Cuộc sống ở làng quê thanh bình rất êm đềm và trong lành.",
      "Bát Tràng là làng nghề gốm sứ truyền thống."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_04",
    "word": "building",
    "phonetic": "/ˈbɪldɪŋ/",
    "definition": "A structure with a roof and walls, such as a house or factory.",
    "definitionVn": "tòa nhà, công trình xây dựng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Landmark 81 is the tallest building in Vietnam.",
      "The office building has twenty-five floors."
    ],
    "exampleTranslations": [
      "Landmark 81 là tòa nhà cao nhất Việt Nam.",
      "Tòa nhà văn phòng có hai mươi lăm tầng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_05",
    "word": "apartment",
    "phonetic": "/əˈpɑːrtmənt/",
    "definition": "A suite of rooms forming one separate residence, typically in a block.",
    "definitionVn": "căn hộ chung cư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "They rented a modern two-bedroom apartment with a balcony.",
      "The apartment has a scenic view of the river."
    ],
    "exampleTranslations": [
      "Họ đã thuê một căn hộ hai phòng ngủ hiện đại có ban công.",
      "Căn hộ có tầm nhìn tuyệt đẹp ra bờ sông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_06",
    "word": "skyscraper",
    "phonetic": "/ˈskaɪskreɪpər/",
    "definition": "A very tall building of many stories.",
    "definitionVn": "tòa nhà chọc trời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Modern skyscrapers illuminate the night skyline of the metropolis.",
      "High-speed elevators take you to the top of the skyscraper."
    ],
    "exampleTranslations": [
      "Những tòa nhà chọc trời hiện đại thắp sáng đường chân trời đêm đô thị.",
      "Thang máy tốc độ cao đưa bạn lên đỉnh tòa nhà chọc trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_07",
    "word": "tower",
    "phonetic": "/ˈtaʊər/",
    "definition": "A tall, narrow building, either freestanding or forming part of a building.",
    "definitionVn": "tòa tháp, ngọn tháp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The clock tower in the town center rings every hour.",
      "Tourists climbed the observation tower for a panoramic view."
    ],
    "exampleTranslations": [
      "Tháp đồng hồ ở trung tâm thị trấn reo chuông mỗi giờ.",
      "Du khách trèo lên tháp quan sát để ngắm toàn cảnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_08",
    "word": "bridge",
    "phonetic": "/brɪdʒ/",
    "definition": "A structure carrying a road, path, railway, or canal across a river or ravine.",
    "definitionVn": "cây cầu (bắc qua sông)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The Dragon Bridge in Da Nang breathes fire on weekend nights.",
      "Walk across the pedestrian bridge safely."
    ],
    "exampleTranslations": [
      "Cầu Rồng ở Đà Nẵng phun lửa vào các tối cuối tuần.",
      "Đi bộ qua cầu dành cho người đi bộ an toàn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_09",
    "word": "square",
    "phonetic": "/skwer/",
    "definition": "An open, typically four-sided, area surrounded by buildings in a town.",
    "definitionVn": "quảng trường (trung tâm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Thousands gathered in Ba Dinh Square for the national celebration.",
      "Pigeons flock in the historic town square."
    ],
    "exampleTranslations": [
      "Hàng ngàn người tề tựu tại Quảng trường Ba Đình trong ngày lễ lớn.",
      "Những chú chim bồ câu tụ tập ở quảng trường cổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_10",
    "word": "museum",
    "phonetic": "/mjuˈziːəm/",
    "definition": "A building in which objects of historical, scientific, artistic, or cultural interest are stored.",
    "definitionVn": "bảo tàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The National Museum displays ancient bronze drums.",
      "Visiting a museum broadens your cultural knowledge."
    ],
    "exampleTranslations": [
      "Bảo tàng Quốc gia trưng bày những chiếc trống đồng cổ.",
      "Tham quan bảo tàng giúp mở rộng kiến thức văn hóa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_11",
    "word": "theater",
    "phonetic": "/ˈθiːətər/",
    "definition": "A building or outdoor area in which plays and other dramatic performances are given.",
    "definitionVn": "nhà hát, rạp kịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Hanoi Opera House is a magnificent classical theater.",
      "We watched a Shakespeare play at the theater."
    ],
    "exampleTranslations": [
      "Nhà hát Lớn Hà Nội là một nhà hát cổ điển tráng lệ.",
      "Chúng tôi đã xem một vở kịch của Shakespeare tại nhà hát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_12",
    "word": "stadium",
    "phonetic": "/ˈsteɪdiəm/",
    "definition": "A sports ground with tiers of seats for spectators.",
    "definitionVn": "sân vận động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "My Dinh National Stadium was packed with enthusiastic football fans.",
      "The rock concert was held at the stadium."
    ],
    "exampleTranslations": [
      "Sân vận động Quốc gia Mỹ Đình chật kín người hâm mộ bóng đá cuồng nhiệt.",
      "Buổi hòa nhạc rock được tổ chức tại sân vận động."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_13",
    "word": "post office",
    "phonetic": "/ˈpoʊst ɑːfɪs/",
    "definition": "A building where postal business is transacted and where mail is collected and sorted.",
    "definitionVn": "bưu điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Saigon Central Post Office is a famous French colonial landmark.",
      "I mailed a postcard to my pen pal at the post office."
    ],
    "exampleTranslations": [
      "Bưu điện Trung tâm Sài Gòn là công trình kiến trúc Pháp nổi tiếng.",
      "Tôi đã gửi bưu thiếp cho bạn qua thư tại bưu điện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_14",
    "word": "police station",
    "phonetic": "/pəˈliːs ˈsteɪʃn/",
    "definition": "The office or headquarters of a local police force.",
    "definitionVn": "đồn cảnh sát, trụ sở công an",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Report a lost passport immediately to the nearest police station.",
      "The police station is on the corner of the street."
    ],
    "exampleTranslations": [
      "Hãy báo việc mất hộ chiếu ngay cho đồn cảnh sát gần nhất.",
      "Đồn công an nằm ở ngay góc con đường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_15",
    "word": "fire station",
    "phonetic": "/ˈfaɪər ˈsteɪʃn/",
    "definition": "A building where fire engines are kept and where firefighters stay when on duty.",
    "definitionVn": "trạm cứu hỏa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Fire engines rushed out of the fire station with sirens blazing.",
      "The local fire station is on standby 24/7."
    ],
    "exampleTranslations": [
      "Những chiếc xe cứu hỏa lao ra khỏi trạm cứu hỏa cùng tiếng còi báo động.",
      "Trạm cứu hỏa địa phương túc trực 24/7."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_16",
    "word": "zoo",
    "phonetic": "/zuː/",
    "definition": "An establishment which maintains a collection of wild animals for study or display to the public.",
    "definitionVn": "vườn thú, sở thú",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Children love seeing giraffes and playful monkeys at the zoo.",
      "The zoo protects endangered wildlife species."
    ],
    "exampleTranslations": [
      "Trẻ em rất thích ngắm hươu cao cổ và những chú khỉ tinh nghịch ở sở thú.",
      "Vườn thú bảo tồn các loài động vật hoang dã có nguy cơ tuyệt chủng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_17",
    "word": "road",
    "phonetic": "/roʊd/",
    "definition": "A wide way leading from one place to another, especially one with a specially prepared surface.",
    "definitionVn": "con đường, đường sá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The coastal road offers stunning ocean views.",
      "Drive carefully on wet and slippery roads."
    ],
    "exampleTranslations": [
      "Con đường ven biển mở ra khung cảnh đại dương tuyệt đẹp.",
      "Hãy lái xe cẩn thận trên những cung đường ướt trơn trượt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_18",
    "word": "crosswalk",
    "phonetic": "/ˈkrɔːswɔːk/",
    "definition": "A marked part of a road where pedestrians have right of way to cross.",
    "definitionVn": "vạch kẻ đường cho người đi bộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Always cross the busy road at the pedestrian crosswalk.",
      "Vehicles must yield to people on the crosswalk."
    ],
    "exampleTranslations": [
      "Luôn luôn băng qua đường đông đúc tại vạch kẻ dành cho người đi bộ nhé.",
      "Các phương tiện phải nhường đường cho người trên vạch đi bộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_19",
    "word": "traffic light",
    "phonetic": "/ˈtræfɪk laɪt/",
    "definition": "A set of automatically operated colored lights, typically red, amber, and green, for controlling traffic.",
    "definitionVn": "đèn tín hiệu giao thông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Stop when the traffic light is red; go when it turns green.",
      "Wait patiently at the traffic light intersection."
    ],
    "exampleTranslations": [
      "Dừng lại khi đèn giao thông màu đỏ; đi khi đèn chuyển xanh.",
      "Hãy kiên nhẫn đợi ở nút giao có đèn giao thông nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_20",
    "word": "corner",
    "phonetic": "/ˈkɔːrnər/",
    "definition": "A place or angle where two or more sides or edges meet.",
    "definitionVn": "góc phố, góc đường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "There is a cozy coffee shop right on the corner.",
      "Turn right at the street corner."
    ],
    "exampleTranslations": [
      "Có một quán cà phê ấm cúng ngay tại góc phố.",
      "Hãy rẽ phải tại góc đường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_01",
    "word": "kind",
    "phonetic": "/kaɪnd/",
    "definition": "Having or showing a friendly, generous, and considerate nature.",
    "definitionVn": "tốt bụng, tử tế",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "She is always kind and helpful to her neighbors.",
      "A kind word can brighten someone's entire day."
    ],
    "exampleTranslations": [
      "Cô ấy luôn luôn tốt bụng và nhiệt tình với hàng xóm.",
      "Một lời nói tử tế có thể làm bừng sáng cả ngày của một ai đó."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_02",
    "word": "friendly",
    "phonetic": "/ˈfrendli/",
    "definition": "Kind and pleasant.",
    "definitionVn": "thân thiện, cởi mở",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Vietnamese people are well-known for being warm and friendly.",
      "Smile to create a friendly atmosphere."
    ],
    "exampleTranslations": [
      "Người Việt Nam nổi tiếng là nồng hậu và thân thiện.",
      "Hãy mỉm cười để tạo bầu không khí thân thiện nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_03",
    "word": "polite",
    "phonetic": "/pəˈlaɪt/",
    "definition": "Having or showing behavior that is respectful and considerate of other people.",
    "definitionVn": "lịch sự, lễ phép",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Always say 'please' and 'thank you' to be polite.",
      "He is a well-mannered and polite young man."
    ],
    "exampleTranslations": [
      "Luôn nói 'làm ơn' và 'cảm ơn' để thể hiện sự lịch sự nhé.",
      "Cậu ấy là một chàng trai trẻ lễ phép và cư xử đúng mực."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_04",
    "word": "honest",
    "phonetic": "/ˈɑːnɪst/",
    "definition": "Free of deceit; truthful and sincere.",
    "definitionVn": "trung thực, thật thà",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "An honest person always tells the truth.",
      "Honesty builds long-lasting trust in relationships."
    ],
    "exampleTranslations": [
      "Một người trung thực luôn luôn nói sự thật.",
      "Tính trung thực xây dựng sự tin tưởng lâu bền trong các mối quan hệ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_05",
    "word": "brave",
    "phonetic": "/breɪv/",
    "definition": "Ready to face and endure danger or pain; showing courage.",
    "definitionVn": "dũng cảm, can đảm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "The brave firefighter saved the cat from the tree.",
      "Be brave and speak English without fear of making mistakes."
    ],
    "exampleTranslations": [
      "Người lính cứu hỏa dũng cảm đã cứu chú mèo trên cây.",
      "Hãy can đảm và nói tiếng Anh mà không sợ mắc lỗi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_06",
    "word": "smart",
    "phonetic": "/smɑːrt/",
    "definition": "Having or showing a quick-witted intelligence.",
    "definitionVn": "thông minh, sáng dạ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "She found a smart and efficient solution to the math problem.",
      "Smart study habits lead to high scores."
    ],
    "exampleTranslations": [
      "Cô ấy đã tìm ra một giải pháp thông minh và hiệu quả cho bài toán.",
      "Thói quen học tập thông minh đem lại điểm số cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_07",
    "word": "clever",
    "phonetic": "/ˈklevər/",
    "definition": "Quick to understand, learn, and devise or apply ideas.",
    "definitionVn": "khéo léo, lanh lợi",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "The clever monkey figured out how to open the box.",
      "He made a clever remark that made everyone laugh."
    ],
    "exampleTranslations": [
      "Chú khỉ lanh lợi đã tìm ra cách mở chiếc hộp.",
      "Cậu ấy đã đưa ra một nhận xét khéo léo khiến mọi người bật cười."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_08",
    "word": "funny",
    "phonetic": "/ˈfʌni/",
    "definition": "Causing laughter or amusement; humorous.",
    "definitionVn": "hài hước, buồn cười",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "My uncle tells funny jokes during dinner.",
      "It was a funny and heartwarming movie."
    ],
    "exampleTranslations": [
      "Bác tôi hay kể những mẩu chuyện cười hài hước trong bữa ăn.",
      "Đó là một bộ phim hài hước và ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_09",
    "word": "calm",
    "phonetic": "/kɑːm/",
    "definition": "Not showing or feeling nervousness, anger, or other strong emotions.",
    "definitionVn": "bình tĩnh, điềm tĩnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Stay calm and breathe deeply during the test.",
      "His calm voice reassured the worried passengers."
    ],
    "exampleTranslations": [
      "Hãy giữ bình tĩnh và hít thở sâu trong bài kiểm tra nhé.",
      "Giọng nói điềm tĩnh của anh ấy đã trấn an các hành khách đang lo lắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_10",
    "word": "shy",
    "phonetic": "/ʃaɪ/",
    "definition": "Being reserved or having or showing nervousness or timidity in the company of other people.",
    "definitionVn": "nhút nhát, e thẹn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "The shy child hid behind her mother's dress.",
      "Don't be shy; introduce yourself to the class."
    ],
    "exampleTranslations": [
      "Đứa trẻ nhút nhát nấp sau tà áo của mẹ.",
      "Đừng ngại ngùng nhé; hãy tự giới thiệu bản thân trước lớp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_11",
    "word": "hardworking",
    "phonetic": "/ˌhɑːrdˈwɜːrkɪŋ/",
    "definition": "Tending to work with energy and commitment; diligent.",
    "definitionVn": "chăm chỉ, cần cù",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Hardworking students achieve their goals step by step.",
      "He is a dedicated and hardworking employee."
    ],
    "exampleTranslations": [
      "Những học sinh chăm chỉ từng bước đạt được mục tiêu của mình.",
      "Anh ấy là một nhân viên tận tụy và chăm chỉ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_12",
    "word": "lazy",
    "phonetic": "/ˈleɪzi/",
    "definition": "Unwilling to work or use energy.",
    "definitionVn": "lười biếng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Don't be lazy; review your vocabulary flashcards daily.",
      "The lazy cat slept in the warm sun all afternoon."
    ],
    "exampleTranslations": [
      "Đừng lười biếng nhé; hãy ôn flashcard từ vựng mỗi ngày.",
      "Chú mèo lười nằm ngủ dưới nắng ấm suốt cả buổi chiều."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_13",
    "word": "careful",
    "phonetic": "/ˈkerfl/",
    "definition": "Making sure of avoiding potential danger, mishap, or harm.",
    "definitionVn": "cẩn thận, chu đáo",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Be careful when crossing the busy road.",
      "Double-check your essay with a careful eye."
    ],
    "exampleTranslations": [
      "Hãy cẩn thận khi băng qua đường phố đông đúc nhé.",
      "Hãy kiểm tra lại bài luận với con mắt cẩn thận."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_14",
    "word": "careless",
    "phonetic": "/ˈkerləs/",
    "definition": "Not giving sufficient attention or thought to avoiding harm or errors.",
    "definitionVn": "bất cẩn, cẩu thả",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Avoid making careless spelling mistakes on your test.",
      "A careless driver caused a minor traffic delay."
    ],
    "exampleTranslations": [
      "Tránh mắc các lỗi chính tả bất cẩn trong bài thi nhé.",
      "Một tài xế bất cẩn đã gây ra ùn tắc giao thông nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_15",
    "word": "patient",
    "phonetic": "/ˈpeɪʃnt/",
    "definition": "Able to accept or tolerate delays, problems, or suffering without becoming annoyed or anxious.",
    "definitionVn": "kiên nhẫn, nhẫn nại",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Good teachers are patient with beginners.",
      "Be patient; learning a language takes continuous practice."
    ],
    "exampleTranslations": [
      "Những người thầy giỏi luôn kiên nhẫn với người mới bắt đầu.",
      "Hãy kiên nhẫn; học một ngôn ngữ đòi hỏi sự luyện tập liên tục."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_16",
    "word": "generous",
    "phonetic": "/ˈdʒenərəs/",
    "definition": "Showing a readiness to give more of something, especially money, than is strictly necessary or expected.",
    "definitionVn": "hào phóng, rộng lượng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "She is generous and often donates to charities.",
      "Thank you for your generous hospitality."
    ],
    "exampleTranslations": [
      "Cô ấy rất hào phóng và thường xuyên quyên góp cho các hội từ thiện.",
      "Cảm ơn vì sự tiếp đón nồng hậu và rộng lượng của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_17",
    "word": "creative",
    "phonetic": "/kriˈeɪtɪv/",
    "definition": "Relating to or involving the imagination or original ideas.",
    "definitionVn": "sáng tạo, giàu trí tưởng tượng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Children have vivid and creative imaginations.",
      "She came up with a creative advertising campaign."
    ],
    "exampleTranslations": [
      "Trẻ em có trí tưởng tượng phong phú và sáng tạo.",
      "Cô ấy đã nghĩ ra một chiến dịch quảng cáo đầy sáng tạo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_18",
    "word": "cheerful",
    "phonetic": "/ˈtʃɪrfl/",
    "definition": "Noticeably happy and optimistic.",
    "definitionVn": "tươi vui, rạng rỡ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "She greeted us with a cheerful 'Good morning!'",
      "His cheerful personality lifts everyone's spirits."
    ],
    "exampleTranslations": [
      "Cô ấy chào đón chúng tôi bằng một câu 'Chào buổi sáng!' tươi vui.",
      "Tính cách tươi vui của anh ấy nâng cao tinh thần cho tất cả mọi người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_19",
    "word": "gentle",
    "phonetic": "/ˈdʒentl/",
    "definition": "Having or showing a mild, kind, or tender temperament or character.",
    "definitionVn": "dịu dàng, nhẹ nhàng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Handle the delicate antique bowl with gentle hands.",
      "She has a gentle and soothing voice."
    ],
    "exampleTranslations": [
      "Hãy cầm chiếc bát cổ dễ vỡ bằng đôi tay nhẹ nhàng nhé.",
      "Cô ấy có một giọng nói dịu dàng và êm tai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_person_20",
    "word": "proud",
    "phonetic": "/praʊd/",
    "definition": "Feeling deep pleasure or satisfaction as a result of one's own achievements or qualities.",
    "definitionVn": "tự hào, hãnh diện",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_personality_traits",
    "themeNameVn": "Tính cách & Phẩm chất",
    "themeNameEn": "Personality Traits",
    "examples": [
      "Parents are proud of their children's achievements.",
      "Stand tall and feel proud of your hard work."
    ],
    "exampleTranslations": [
      "Cha mẹ luôn tự hào về những thành quả của con cái.",
      "Hãy ngẩng cao đầu và tự hào về sự nỗ lực chăm chỉ của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_01",
    "word": "in",
    "phonetic": "/ɪn/",
    "definition": "Expressing the situation of something that is or appears to be enclosed or surrounded by something else.",
    "definitionVn": "ở trong, bên trong",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The keys are in the backpack.",
      "I live in Vietnam."
    ],
    "exampleTranslations": [
      "Chùm chìa khóa ở trong ba lô.",
      "Tôi sống ở Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_02",
    "word": "on",
    "phonetic": "/ɑːn/",
    "definition": "Physically in contact with and supported by a surface.",
    "definitionVn": "ở trên, phía trên bề mặt",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The English book is on the study desk.",
      "A picture hangs on the wall."
    ],
    "exampleTranslations": [
      "Cuốn sách tiếng Anh ở trên bàn học.",
      "Một bức tranh treo trên tường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_03",
    "word": "at",
    "phonetic": "/æt/",
    "definition": "Expressing location or arrival in a particular place or position.",
    "definitionVn": "ở tại (địa điểm, thời điểm cụ thể)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Let's meet at the school gate at 8:00 AM.",
      "She is at work right now."
    ],
    "exampleTranslations": [
      "Cùng gặp nhau ở cổng trường lúc 8h sáng nhé.",
      "Cô ấy đang ở chỗ làm việc vào lúc này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_04",
    "word": "under",
    "phonetic": "/ˈʌndər/",
    "definition": "Extending or directly below something.",
    "definitionVn": "ở dưới, phía dưới",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The cat is sleeping under the wooden chair.",
      "Keep your shoes under the rack."
    ],
    "exampleTranslations": [
      "Chú mèo đang ngủ dưới chiếc ghế gỗ.",
      "Để giày dép ở phía dưới kệ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_05",
    "word": "above",
    "phonetic": "/əˈbʌv/",
    "definition": "At a higher level or layer than.",
    "definitionVn": "ở phía trên (không tiếp xúc bề mặt)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "A ceiling fan spins above our heads.",
      "The clock is above the whiteboard."
    ],
    "exampleTranslations": [
      "Một chiếc quạt trần quay phía trên đầu chúng tôi.",
      "Chiếc đồng hồ ở phía trên bảng trắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_06",
    "word": "behind",
    "phonetic": "/bɪˈhaɪnd/",
    "definition": "At the back of; on the farther side of.",
    "definitionVn": "ở đằng sau, phía sau",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The garden is located behind our house.",
      "Who is standing behind the door?"
    ],
    "exampleTranslations": [
      "Khu vườn nằm ở phía sau nhà chúng tôi.",
      "Ai đang đứng phía sau cánh cửa thế?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_07",
    "word": "in front of",
    "phonetic": "/ɪn frʌnt əv/",
    "definition": "Close to the front part of something.",
    "definitionVn": "ở phía trước, đằng trước",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "There is a big mango tree in front of our gate.",
      "Stand in front of the camera and smile."
    ],
    "exampleTranslations": [
      "Có một cây xoài lớn ở phía trước cổng nhà chúng tôi.",
      "Hãy đứng trước máy ảnh và mỉm cười nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_08",
    "word": "next to",
    "phonetic": "/nekst tuː/",
    "definition": "In or into a position immediately adjacent to.",
    "definitionVn": "ở bên cạnh, kế bên",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Sit next to me on the sofa.",
      "The pharmacy is right next to the clinic."
    ],
    "exampleTranslations": [
      "Hãy ngồi bên cạnh tôi trên ghế sô pha nhé.",
      "Hiệu thuốc ở ngay bên cạnh phòng khám."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_09",
    "word": "beside",
    "phonetic": "/bɪˈsaɪd/",
    "definition": "At the side of; next to.",
    "definitionVn": "bên cạnh, sát cạnh",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "She placed a glass of water beside her bed.",
      "Walk beside me in the park."
    ],
    "exampleTranslations": [
      "Cô ấy đặt một ly nước bên cạnh giường ngủ.",
      "Hãy đi bên cạnh tôi trong công viên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_10",
    "word": "between",
    "phonetic": "/bɪˈtwiːn/",
    "definition": "In the space separating two points, objects, or people.",
    "definitionVn": "ở giữa (hai đối tượng)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The coffee shop is between the bookstore and the bakery.",
      "Choose between tea and coffee."
    ],
    "exampleTranslations": [
      "Quán cà phê nằm ở giữa hiệu sách và tiệm bánh mì.",
      "Hãy chọn giữa trà và cà phê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_11",
    "word": "among",
    "phonetic": "/əˈmʌŋ/",
    "definition": "Situated more or less centrally in relation to several other things; in the middle of.",
    "definitionVn": "ở giữa, trong số (nhiều đối tượng)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "A red rose blossomed among green shrubs.",
      "He is popular among his classmates."
    ],
    "exampleTranslations": [
      "Một bông hoa hồng đỏ nở rộ giữa những bụi cây xanh.",
      "Cậu ấy rất được yêu quý trong số các bạn cùng lớp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_12",
    "word": "inside",
    "phonetic": "/ˌɪnˈsaɪd/",
    "definition": "The inner part, interior, or within.",
    "definitionVn": "bên trong, ở trong",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Please come inside; it is raining heavily.",
      "Keep the passport safe inside your bag."
    ],
    "exampleTranslations": [
      "Xin mời vào bên trong; trời đang mưa to đấy.",
      "Giữ hộ chiếu an toàn ở bên trong túi của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_13",
    "word": "outside",
    "phonetic": "/ˌaʊtˈsaɪd/",
    "definition": "The external side or surface of something.",
    "definitionVn": "bên ngoài, ở ngoài",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Children are playing joyfully outside in the yard.",
      "Wait outside for five minutes, please."
    ],
    "exampleTranslations": [
      "Lũ trẻ đang chơi đùa vui vẻ bên ngoài sân.",
      "Làm ơn hãy đợi ở bên ngoài năm phút nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_14",
    "word": "near",
    "phonetic": "/nɪr/",
    "definition": "At or to a short distance away; close to.",
    "definitionVn": "ở gần, gần sát",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Our house is near the central bus station.",
      "Is there a supermarket near here?"
    ],
    "exampleTranslations": [
      "Nhà của chúng tôi ở gần bến xe buýt trung tâm.",
      "Có siêu thị nào ở gần đây không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_15",
    "word": "far",
    "phonetic": "/fɑːr/",
    "definition": "At, to, or by a great distance.",
    "definitionVn": "ở xa, xa xôi",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The airport is not far from the city center.",
      "How far is it from Hanoi to Da Nang?"
    ],
    "exampleTranslations": [
      "Sân bay không quá xa trung tâm thành phố.",
      "Từ Hà Nội đến Đà Nẵng bao xa vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_16",
    "word": "opposite",
    "phonetic": "/ˈɑːpəzɪt/",
    "definition": "Having a position on the other or further side of something.",
    "definitionVn": "đối diện, phía đối diện",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The bank is opposite the central post office.",
      "They sat opposite each other at the dining table."
    ],
    "exampleTranslations": [
      "Ngân hàng nằm đối diện với bưu điện trung tâm.",
      "Họ ngồi đối diện nhau tại bàn ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_17",
    "word": "across",
    "phonetic": "/əˈkrɔːs/",
    "definition": "From one side to the other of something with clear limits.",
    "definitionVn": "băng qua, ở phía bên kia",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Walk across the street carefully.",
      "The bookstore is across the road."
    ],
    "exampleTranslations": [
      "Hãy băng qua đường cẩn thận nhé.",
      "Hiệu sách nằm ở phía bên kia con đường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_18",
    "word": "around",
    "phonetic": "/əˈraʊnd/",
    "definition": "Located or moving on every side; about.",
    "definitionVn": "xung quanh, vòng quanh",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "We jogged around the calm lake.",
      "There are green trees all around the campus."
    ],
    "exampleTranslations": [
      "Chúng tôi đã chạy bộ xung quanh bờ hồ êm đềm.",
      "Có cây xanh ở khắp xung quanh khuôn viên trường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_19",
    "word": "through",
    "phonetic": "/θruː/",
    "definition": "Moving in one side and out of the other side of an opening or location.",
    "definitionVn": "xuyên qua, đi qua",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The sunlight shone through the clean window.",
      "The train went through a long tunnel."
    ],
    "exampleTranslations": [
      "Ánh nắng mặt trời chiếu xuyên qua ô cửa sổ sạch sẽ.",
      "Đoàn tàu hỏa đi xuyên qua một đường hầm dài."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_20",
    "word": "into",
    "phonetic": "/ˈɪntuː/",
    "definition": "Expressing movement or action with the result that someone or something becomes enclosed or surrounded.",
    "definitionVn": "vào trong, đi vào",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Step into the classroom quietly.",
      "Pour fresh milk into the cup."
    ],
    "exampleTranslations": [
      "Bước vào trong lớp học thật nhẹ nhàng nhé.",
      "Rót sữa tươi vào trong tách nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_01",
    "word": "sense",
    "phonetic": "/sens/",
    "definition": "A faculty by which the body perceives an external stimulus; one of the faculties of sight, smell, hearing, taste, and touch.",
    "definitionVn": "giác quan (5 giác quan)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Humans perceive the world through five primary senses.",
      "A sense of humor makes life joyful."
    ],
    "exampleTranslations": [
      "Con người cảm nhận thế giới qua năm giác quan chính.",
      "Khiếu hài hước làm cho cuộc sống thêm tràn ngập niềm vui."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_02",
    "word": "sight",
    "phonetic": "/saɪt/",
    "definition": "The faculty or power of seeing.",
    "definitionVn": "thị giác, tầm nhìn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The sunset from the mountain was a breathtaking sight.",
      "Protect your sight by limiting screen time."
    ],
    "exampleTranslations": [
      "Hoàng hôn nhìn từ đỉnh núi là một cảnh tượng đẹp nghẹt thở.",
      "Bảo vệ thị lực của bạn bằng cách hạn chế thời gian nhìn màn hình nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_03",
    "word": "hearing",
    "phonetic": "/ˈhɪrɪŋ/",
    "definition": "The faculty of perceiving sounds.",
    "definitionVn": "thính giác, khả năng nghe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Dogs have an exceptionally sharp sense of hearing.",
      "Protect your hearing by avoiding excessively loud noise."
    ],
    "exampleTranslations": [
      "Loài chó có thính giác cực kỳ nhạy bén.",
      "Bảo vệ thính lực của bạn bằng cách tránh những tiếng ồn quá lớn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_04",
    "word": "taste",
    "phonetic": "/teɪst/",
    "definition": "The sensation of flavor perceived in the mouth and throat on contact with a substance.",
    "definitionVn": "vị giác, nếm vị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "This homemade soup has a delicious savory taste.",
      "Taste the food before adding more salt."
    ],
    "exampleTranslations": [
      "Món súp nấu tại nhà này có hương vị đậm đà rất ngon.",
      "Hãy nếm thử thức ăn trước khi nêm thêm muối nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_05",
    "word": "smell",
    "phonetic": "/smel/",
    "definition": "The faculty or power of perceiving odours or scents by means of the organs in the nose.",
    "definitionVn": "khứu giác, mùi hương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "I love the sweet smell of blooming jasmine flowers.",
      "The bakery has a wonderful smell of fresh bread."
    ],
    "exampleTranslations": [
      "Tôi rất thích mùi thơm ngọt ngào của những bông hoa nhài đang nở.",
      "Tiệm bánh tỏa ra mùi thơm tuyệt vời của bánh mì mới ra lò."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_06",
    "word": "touch",
    "phonetic": "/tʌtʃ/",
    "definition": "The sense by which physical contact with other bodies is perceived.",
    "definitionVn": "xúc giác, chạm vào",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The soft blanket feels gentle to the touch.",
      "Do not touch the hot cooking stove."
    ],
    "exampleTranslations": [
      "Chiếc chăn mềm mại đem lại cảm giác êm ái khi chạm vào.",
      "Đừng chạm vào bếp nấu đang nóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_07",
    "word": "see",
    "phonetic": "/siː/",
    "definition": "Perceive with the eyes for visual impression.",
    "definitionVn": "nhìn thấy, xem",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Can you see the yellow star in the sky?",
      "I am glad to see you again today."
    ],
    "exampleTranslations": [
      "Bạn có nhìn thấy ngôi sao vàng trên bầu trời không?",
      "Tôi rất vui khi được gặp lại bạn hôm nay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_08",
    "word": "look",
    "phonetic": "/lʊk/",
    "definition": "Direct one's gaze toward someone or something or in a specified direction.",
    "definitionVn": "nhìn, ngắm nhìn",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Look at this colorful photograph!",
      "Look both ways before crossing the road."
    ],
    "exampleTranslations": [
      "Hãy nhìn bức ảnh rực rỡ sắc màu này đi!",
      "Hãy nhìn cả hai bên trước khi băng qua đường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_09",
    "word": "watch",
    "phonetic": "/wɑːtʃ/",
    "definition": "Look at or observe attentively over a period of time.",
    "definitionVn": "xem, theo dõi (tivi, phim, trận đấu)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "We watch an English movie together on Friday nights.",
      "Watch how the master chef slices vegetables."
    ],
    "exampleTranslations": [
      "Chúng tôi cùng xem một bộ phim tiếng Anh vào tối thứ Sáu.",
      "Hãy quan sát cách vị bếp trưởng thái rau củ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_10",
    "word": "hear",
    "phonetic": "/hɪr/",
    "definition": "Perceive with the ear the sound made by someone or something.",
    "definitionVn": "nghe thấy (âm thanh lọt vào tai)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "I hear birds chirping outside my bedroom window.",
      "Can you hear my voice clearly over the call?"
    ],
    "exampleTranslations": [
      "Tôi nghe thấy tiếng chim hót líu lo bên ngoài cửa sổ phòng ngủ.",
      "Bạn có nghe rõ giọng của tôi qua cuộc gọi không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_11",
    "word": "feel",
    "phonetic": "/fiːl/",
    "definition": "Be aware of a person or object through touching or being touched; experience an emotion.",
    "definitionVn": "cảm thấy, cảm giác",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "I feel energetic and happy this sunny morning.",
      "Feel how soft this wool scarf is."
    ],
    "exampleTranslations": [
      "Tôi cảm thấy tràn đầy năng lượng và vui vẻ trong buổi sáng nắng đẹp này.",
      "Hãy cảm nhận chiếc khăn len này mềm mại đến mức nào nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_12",
    "word": "bright",
    "phonetic": "/braɪt/",
    "definition": "Giving out or reflecting a lot of light; shining.",
    "definitionVn": "sáng sủa, rực rỡ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The morning sun is bright and warm.",
      "She has bright and cheerful eyes."
    ],
    "exampleTranslations": [
      "Ánh nắng ban mai rực rỡ và ấm áp.",
      "Cô ấy có đôi mắt sáng ngời và vui tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_13",
    "word": "dark",
    "phonetic": "/dɑːrk/",
    "definition": "With little or no light.",
    "definitionVn": "tối tăm, bóng tối",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "It gets dark outside after 7:00 PM.",
      "Turn on the light in the dark hallway."
    ],
    "exampleTranslations": [
      "Trời bên ngoài trở nên tối sau 7h tối.",
      "Hãy bật đèn trong hành lang tối lên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_14",
    "word": "loud",
    "phonetic": "/laʊd/",
    "definition": "Producing or capable of producing much noise; easily heard.",
    "definitionVn": "to, ồn ào (âm thanh)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Don't play music too loud with headphones.",
      "A loud clap of thunder startled the room."
    ],
    "exampleTranslations": [
      "Đừng bật nhạc quá to khi đeo tai nghe nhé.",
      "Một tiếng sấm to vang lên làm giật mình cả căn phòng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_15",
    "word": "quiet",
    "phonetic": "/ˈkwaɪət/",
    "definition": "Making little or no noise.",
    "definitionVn": "yên tĩnh, êm ả",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The library is a quiet place to read and study.",
      "Please be quiet while others are sleeping."
    ],
    "exampleTranslations": [
      "Thư viện là một nơi yên tĩnh để đọc sách và học tập.",
      "Xin vui lòng giữ trật tự trong khi người khác đang ngủ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_16",
    "word": "soft",
    "phonetic": "/sɔːft/",
    "definition": "Easy to mold, cut, compress, or fold; not hard or firm to the touch.",
    "definitionVn": "mềm mại, êm ái",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "The baby is sleeping on a soft pillow.",
      "Her voice is soft and gentle."
    ],
    "exampleTranslations": [
      "Em bé đang ngủ trên một chiếc gối mềm mại.",
      "Giọng nói của cô ấy thật nhẹ nhàng và êm ái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_17",
    "word": "hard",
    "phonetic": "/hɑːrd/",
    "definition": "Solid, firm, and rigid; not easily broken, bent, or pierced.",
    "definitionVn": "cứng, rắn chắc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Diamonds are the hardest natural minerals.",
      "A walnut has a hard outer shell."
    ],
    "exampleTranslations": [
      "Kim cương là khoáng vật tự nhiên cứng nhất.",
      "Quả óc chó có lớp vỏ ngoài rất cứng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_18",
    "word": "sweet",
    "phonetic": "/swiːt/",
    "definition": "Having the pleasant taste characteristic of sugar or honey.",
    "definitionVn": "ngọt ngào, có vị ngọt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Ripe mangoes are naturally sweet and juicy.",
      "She has a sweet and caring smile."
    ],
    "exampleTranslations": [
      "Xoài chín có vị ngọt tự nhiên và mọng nước.",
      "Cô ấy có nụ cười ngọt ngào và chu đáo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_19",
    "word": "sour",
    "phonetic": "/ˈsaʊər/",
    "definition": "Having an acid taste like lemon or vinegar.",
    "definitionVn": "chua, có vị chua",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Green lemons have a sharp sour taste.",
      "Yogurt has a pleasantly sour flavor."
    ],
    "exampleTranslations": [
      "Những quả chanh xanh có vị chua gắt.",
      "Sữa chua có hương vị chua thanh dễ chịu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_senses_20",
    "word": "salty",
    "phonetic": "/ˈsɔːlti/",
    "definition": "Tasting of, containing, or preserved with salt.",
    "definitionVn": "mặn, có vị mặn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_senses_perceptions",
    "themeNameVn": "Giác quan & Cảm nhận",
    "themeNameEn": "Senses & Perception",
    "examples": [
      "Ocean seawater is naturally salty.",
      "Potato chips are crunchy and slightly salty."
    ],
    "exampleTranslations": [
      "Nước biển đại dương có vị mặn tự nhiên.",
      "Khoai tây chiên giòn rụm và hơi mặn nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_01",
    "word": "vacation",
    "phonetic": "/veɪˈkeɪʃn/",
    "definition": "An extended period of recreation, especially one spent away from home or in travelling.",
    "definitionVn": "kỳ nghỉ, đợt nghỉ phép",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We are going to Nha Trang for our summer vacation.",
      "Have a relaxing and joyful vacation!"
    ],
    "exampleTranslations": [
      "Chúng tôi sẽ đi Nha Trang cho kỳ nghỉ hè.",
      "Chúc bạn có một kỳ nghỉ thư thái và tràn ngập niềm vui!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_02",
    "word": "holiday",
    "phonetic": "/ˈhɑːlədeɪ/",
    "definition": "An extended period of leisure and recreation; public holiday.",
    "definitionVn": "ngày lễ, kỳ nghỉ lễ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Tet is the most important traditional holiday in Vietnam.",
      "What are your plans for the national holiday?"
    ],
    "exampleTranslations": [
      "Tết là ngày lễ truyền thống quan trọng nhất ở Việt Nam.",
      "Kế hoạch cho ngày nghỉ lễ quốc gia của bạn là gì?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_03",
    "word": "trip",
    "phonetic": "/trɪp/",
    "definition": "A journey or excursion, especially for pleasure.",
    "definitionVn": "chuyến đi, chuyến du ngoạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We had an unforgettable school trip to the mountain.",
      "Have a safe and pleasant trip!"
    ],
    "exampleTranslations": [
      "Chúng tôi đã có một chuyến đi dã ngoại khó quên lên vùng núi.",
      "Chúc bạn có một chuyến đi an toàn và vui vẻ!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_04",
    "word": "tour",
    "phonetic": "/tʊr/",
    "definition": "A journey for pleasure in which several different places are visited.",
    "definitionVn": "chuyến tham quan, tour du lịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We booked a guided city tour of historic Hanoi.",
      "The boat tour through Ha Long Bay was magical."
    ],
    "exampleTranslations": [
      "Chúng tôi đã đặt một tour tham quan có hướng dẫn quanh Hà Nội cổ kính.",
      "Chuyến du thuyền qua Vịnh Hạ Long thật kỳ diệu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_05",
    "word": "tourist",
    "phonetic": "/ˈtʊrɪst/",
    "definition": "A person who is traveling or visiting a place for pleasure.",
    "definitionVn": "khách du lịch, du khách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Thousands of international tourists visit Hoi An every month.",
      "The friendly locals welcomed tourists warmly."
    ],
    "exampleTranslations": [
      "Hàng ngàn du khách quốc tế đến thăm Hội An mỗi tháng.",
      "Người dân địa phương thân thiện chào đón du khách rất nồng hậu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_06",
    "word": "guide",
    "phonetic": "/ɡaɪd/",
    "definition": "A person who shows the way to others, especially one employed to show tourists around.",
    "definitionVn": "hướng dẫn viên du lịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Our tour guide shared fascinating historical stories.",
      "Follow the tour guide closely during the museum walk."
    ],
    "exampleTranslations": [
      "Hướng dẫn viên du lịch của chúng tôi đã chia sẻ những câu chuyện lịch sử hấp dẫn.",
      "Hãy đi theo sát hướng dẫn viên trong chuyến tham quan bảo tàng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_07",
    "word": "resort",
    "phonetic": "/rɪˈzɔːrt/",
    "definition": "A place that is a popular destination for vacations or recreation.",
    "definitionVn": "khu nghỉ dưỡng cao cấp, resort",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We stayed at a luxury beachfront resort with a swimming pool.",
      "Phu Quoc Island has world-class eco resorts."
    ],
    "exampleTranslations": [
      "Chúng tôi đã nghỉ tại một khu nghỉ dưỡng cao cấp ven biển có hồ bơi.",
      "Đảo Phú Quốc có những resort sinh thái đẳng cấp thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_08",
    "word": "beach",
    "phonetic": "/biːtʃ/",
    "definition": "A pebbly or sandy shore, especially by the ocean between high- and low-water marks.",
    "definitionVn": "bãi biển, bờ biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "My Khe Beach in Da Nang has golden sand and clear water.",
      "We built sandcastles on the sunny beach."
    ],
    "exampleTranslations": [
      "Bãi biển Mỹ Khê ở Đà Nẵng có bãi cát vàng và làn nước trong vắt.",
      "Chúng tôi đã xây lâu đài cát trên bãi biển đầy nắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_09",
    "word": "island",
    "phonetic": "/ˈaɪlənd/",
    "definition": "A piece of land surrounded by water.",
    "definitionVn": "hòn đảo, đảo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Phu Quoc is the largest and most famous island in Vietnam.",
      "We took a ferry to the tropical island."
    ],
    "exampleTranslations": [
      "Phú Quốc là hòn đảo lớn nhất và nổi tiếng nhất ở Việt Nam.",
      "Chúng tôi đã đi phà sang hòn đảo nhiệt đới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_10",
    "word": "mountain",
    "phonetic": "/ˈmaʊntn/",
    "definition": "A large natural elevation of the earth's surface rising abruptly from the surrounding level.",
    "definitionVn": "ngọn núi, vùng núi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Fansipan is the highest mountain peak in Indochina.",
      "Hiking in the green mountains is invigorating."
    ],
    "exampleTranslations": [
      "Fansipan là đỉnh núi cao nhất Đông Dương.",
      "Đi bộ leo núi trên những ngọn núi xanh đem lại cảm giác khoan khoái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_11",
    "word": "waterfall",
    "phonetic": "/ˈwɔːtərfɔːl/",
    "definition": "A cascade of water falling from a height, formed when a river or stream flows over a precipice.",
    "definitionVn": "thác nước (hùng vĩ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Ban Gioc Waterfall on the northern border is magnificent.",
      "The roaring sound of the waterfall is awe-inspiring."
    ],
    "exampleTranslations": [
      "Thác Bản Giốc ở biên giới phía Bắc thật hùng vĩ.",
      "Âm thanh ầm vang của thác nước khiến người ta kinh ngạc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_12",
    "word": "lake",
    "phonetic": "/leɪk/",
    "definition": "A large body of water surrounded by land.",
    "definitionVn": "hồ nước, mặt hồ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Hoan Kiem Lake is the peaceful cultural heart of Hanoi.",
      "People take strolls around the scenic lake."
    ],
    "exampleTranslations": [
      "Hồ Hoàn Kiếm là trái tim văn hóa thanh bình của Hà Nội.",
      "Mọi người đi dạo quanh hồ nước thơ mộng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_13",
    "word": "passport",
    "phonetic": "/ˈpæspɔːrt/",
    "definition": "An official document issued by a government, certifying the holder's identity and citizenship for international travel.",
    "definitionVn": "hộ chiếu (xuất nhập cảnh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Always keep your passport secure in your travel pouch.",
      "Make sure your passport is valid for at least six months."
    ],
    "exampleTranslations": [
      "Luôn giữ hộ chiếu an toàn trong túi du lịch của bạn nhé.",
      "Hãy đảm bảo hộ chiếu của bạn còn hạn ít nhất sáu tháng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_14",
    "word": "luggage",
    "phonetic": "/ˈlʌɡɪdʒ/",
    "definition": "Suitcases or other bags in which to pack personal belongings for traveling.",
    "definitionVn": "hành lý (vali, túi xách du lịch)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Check your luggage at the airline counter before boarding.",
      "Pack only essential items to keep your luggage light."
    ],
    "exampleTranslations": [
      "Ký gửi hành lý tại quầy hãng hàng không trước khi lên máy bay nhé.",
      "Chỉ gói những đồ thiết yếu để hành lý của bạn thật nhẹ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_15",
    "word": "souvenir",
    "phonetic": "/ˌsuːvəˈnɪr/",
    "definition": "A thing that is kept as a reminder of a person, place, or event.",
    "definitionVn": "quà lưu niệm, đồ lưu niệm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "I bought a silk scarf as a souvenir from Hoi An.",
      "Souvenirs help us cherish memories of our travels."
    ],
    "exampleTranslations": [
      "Tôi đã mua một chiếc khăn lụa làm quà lưu niệm từ Hội An.",
      "Những món quà lưu niệm giúp chúng ta lưu giữ kỷ niệm về những chuyến đi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_16",
    "word": "camera",
    "phonetic": "/ˈkæmrə/",
    "definition": "A device for recording visual images in the form of photographs, film, or video signals.",
    "definitionVn": "máy ảnh, máy quay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Capture beautiful vacation moments with your camera.",
      "He carried a digital camera around his neck."
    ],
    "exampleTranslations": [
      "Hãy ghi lại những khoảnh khắc kỳ nghỉ tuyệt đẹp bằng máy ảnh nhé.",
      "Anh ấy đeo một chiếc máy ảnh kỹ thuật số quanh cổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_17",
    "word": "map",
    "phonetic": "/mæp/",
    "definition": "A diagrammatic representation of an area of land or sea showing physical features.",
    "definitionVn": "bản đồ (chỉ đường)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Check the city map to find the nearest metro station.",
      "Digital maps on smartphones make navigation simple."
    ],
    "exampleTranslations": [
      "Xem bản đồ thành phố để tìm ga tàu điện ngầm gần nhất nhé.",
      "Bản đồ số trên điện thoại thông minh giúp việc chỉ đường thật đơn giản."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_18",
    "word": "ocean",
    "phonetic": "/ˈoʊʃn/",
    "definition": "A very large expanse of sea, in particular each of the main areas into which the sea is divided geographically.",
    "definitionVn": "đại dương bao la",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "The Pacific Ocean is the largest and deepest ocean on Earth.",
      "Waves crash peacefully along the ocean shore."
    ],
    "exampleTranslations": [
      "Thái Bình Dương là đại dương lớn nhất và sâu nhất trên Trái Đất.",
      "Những con sóng vỗ êm đềm dọc bờ đại dương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_19",
    "word": "hotel",
    "phonetic": "/hoʊˈtel/",
    "definition": "An establishment providing accommodation, meals, and other services for travelers and tourists.",
    "definitionVn": "khách sạn lưu trú",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We checked into a cozy hotel near the beach.",
      "The hotel offers complimentary breakfast and Wi-Fi."
    ],
    "exampleTranslations": [
      "Chúng tôi đã nhận phòng tại một khách sạn ấm cúng gần bãi biển.",
      "Khách sạn cung cấp bữa sáng và Wi-Fi miễn phí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_20",
    "word": "sightseeing",
    "phonetic": "/ˈsaɪtsiːɪŋ/",
    "definition": "The activity of visiting places of interest in a particular location.",
    "definitionVn": "ngắm cảnh, tham quan thắng cảnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We spent the whole sunny afternoon sightseeing around town.",
      "Sightseeing buses have open-top double-decker seats."
    ],
    "exampleTranslations": [
      "Chúng tôi đã dành trọn buổi chiều nắng đẹp để đi ngắm cảnh quanh thị trấn.",
      "Xe buýt ngắm cảnh có hai tầng mui trần thoáng mát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_01",
    "word": "art",
    "phonetic": "/ɑːrt/",
    "definition": "The expression or application of human creative skill and imagination, typically in a visual form.",
    "definitionVn": "nghệ thuật, mỹ thuật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Art inspires creativity and enriches the human soul.",
      "She studies fine arts at the university."
    ],
    "exampleTranslations": [
      "Nghệ thuật truyền cảm hứng sáng tạo và làm phong phú tâm hồn con người.",
      "Cô ấy học mỹ thuật tại trường đại học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_02",
    "word": "music",
    "phonetic": "/ˈmjuːzɪk/",
    "definition": "Vocal or instrumental sounds combined in such a way as to produce beauty of form, harmony, and expression of emotion.",
    "definitionVn": "âm nhạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Listening to soft acoustic music helps me focus on studying.",
      "Music connects people across languages and borders."
    ],
    "exampleTranslations": [
      "Nghe nhạc mộc nhẹ nhàng giúp tôi tập trung học bài.",
      "Âm nhạc kết nối mọi người vượt qua mọi ngôn ngữ và biên giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_03",
    "word": "song",
    "phonetic": "/sɔːŋ/",
    "definition": "A short poem or other set of words set to music or meant to be sung.",
    "definitionVn": "bài hát, ca khúc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "This catchy English song has a cheerful melody.",
      "Sing along to your favorite song."
    ],
    "exampleTranslations": [
      "Bài hát tiếng Anh bắt tai này có giai điệu rất vui tươi.",
      "Hãy hát theo bài hát yêu thích của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_04",
    "word": "movie",
    "phonetic": "/ˈmuːvi/",
    "definition": "A cinema film.",
    "definitionVn": "bộ phim (điện ảnh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Watching movies with English subtitles boosts listening skills.",
      "We saw an exciting adventure movie at the cinema."
    ],
    "exampleTranslations": [
      "Xem phim có phụ đề tiếng Anh giúp nâng cao kỹ năng nghe.",
      "Chúng tôi đã xem một bộ phim phiêu lưu hấp dẫn ở rạp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_05",
    "word": "film",
    "phonetic": "/fɪlm/",
    "definition": "A motion picture; a movie.",
    "definitionVn": "phim nhựa, tác phẩm điện ảnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "The documentary film highlighted ocean conservation efforts.",
      "He won an award for his short film."
    ],
    "exampleTranslations": [
      "Bộ phim tài liệu làm nổi bật những nỗ lực bảo tồn đại dương.",
      "Anh ấy đã giành giải thưởng cho bộ phim ngắn của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_06",
    "word": "concert",
    "phonetic": "/ˈkɑːnsərt/",
    "definition": "A musical performance given in public, typically by several performers or of several compositions.",
    "definitionVn": "buổi hòa nhạc, đại nhạc hội",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Thousands of singing fans attended the outdoor rock concert.",
      "The symphony orchestra gave a classical concert."
    ],
    "exampleTranslations": [
      "Hàng ngàn người hâm mộ cùng cất tiếng hát tham dự buổi hòa nhạc rock ngoài trời.",
      "Dàn nhạc giao hưởng đã tổ chức một buổi hòa nhạc cổ điển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_07",
    "word": "dance",
    "phonetic": "/dæns/",
    "definition": "Move rhythmically to music, typically following a set sequence of steps.",
    "definitionVn": "điệu nhảy, nhảy múa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Traditional folk dance celebrates rich cultural heritage.",
      "They danced happily at the wedding celebration."
    ],
    "exampleTranslations": [
      "Điệu múa dân gian truyền thống tôn vinh di sản văn hóa phong phú.",
      "Họ đã nhảy múa vui vẻ trong tiệc cưới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_08",
    "word": "photo",
    "phonetic": "/ˈfoʊtoʊ/",
    "definition": "A photograph.",
    "definitionVn": "bức ảnh, tấm hình",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Take a photo of this picturesque sunset.",
      "She shared family photos on her social media."
    ],
    "exampleTranslations": [
      "Hãy chụp một bức ảnh hoàng hôn thơ mộng này nhé.",
      "Cô ấy đã chia sẻ những bức ảnh gia đình trên mạng xã hội."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_09",
    "word": "picture",
    "phonetic": "/ˈpɪktʃər/",
    "definition": "A painting or drawing.",
    "definitionVn": "bức tranh, hình ảnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "A picture is worth a thousand words.",
      "Hang the colorful picture on the living room wall."
    ],
    "exampleTranslations": [
      "Một bức tranh có giá trị bằng cả ngàn lời nói.",
      "Hãy treo bức tranh rực rỡ lên tường phòng khách nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_10",
    "word": "story",
    "phonetic": "/ˈstɔːri/",
    "definition": "An account of imaginary or real people and events told for entertainment.",
    "definitionVn": "câu chuyện, truyện kể",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Grandmother tells magical bedtime stories to the children.",
      "Reading short English stories improves vocabulary naturally."
    ],
    "exampleTranslations": [
      "Bà kể những câu chuyện cổ tích diệu kỳ trước giờ ngủ cho các cháu.",
      "Đọc truyện ngắn tiếng Anh giúp tăng vốn từ vựng một cách tự nhiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_11",
    "word": "novel",
    "phonetic": "/ˈnɑːvl/",
    "definition": "A fictitious prose narrative of book length, typically representing character and action.",
    "definitionVn": "tiểu thuyết",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "He is reading a classic adventure novel.",
      "The bestselling novel was adapted into a movie."
    ],
    "exampleTranslations": [
      "Anh ấy đang đọc một cuốn tiểu thuyết phiêu lưu kinh điển.",
      "Cuốn tiểu thuyết bán chạy nhất đã được chuyển thể thành phim."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_12",
    "word": "poem",
    "phonetic": "/ˈpoʊəm/",
    "definition": "A piece of writing in which the expression of feelings and ideas is given intensity by distinctive style and rhythm.",
    "definitionVn": "bài thơ, vần thơ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "She wrote a heartfelt poem about autumn leaves.",
      "Poetry expresses deep emotions in rhythmic verses."
    ],
    "exampleTranslations": [
      "Cô ấy đã viết một bài thơ chân thành về những chiếc lá thu.",
      "Thơ ca thể hiện những cảm xúc sâu lắng bằng những vần điệu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_13",
    "word": "magic",
    "phonetic": "/ˈmædʒɪk/",
    "definition": "The power of apparently influencing events by using mysterious or supernatural forces; conjuring tricks.",
    "definitionVn": "ảo thuật, phép thuật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "The magician performed impressive card magic tricks.",
      "Children watched the magic show with wide eyes."
    ],
    "exampleTranslations": [
      "Nhà ảo thuật đã biểu diễn những màn ảo thuật với bài rất ấn tượng.",
      "Trẻ em chăm chú xem buổi biểu diễn ảo thuật với đôi mắt mở to."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_14",
    "word": "circus",
    "phonetic": "/ˈsɜːrkəs/",
    "definition": "A travelling company of acrobats, clowns, and other entertainers.",
    "definitionVn": "rạp xiếc, đoàn xiếc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Acrobats performed daring aerial stunts at the circus.",
      "The funny clowns made everyone laugh at the circus."
    ],
    "exampleTranslations": [
      "Các nghệ sĩ xiếc nhào lộn đã biểu diễn những pha mạo hiểm trên không tại rạp xiếc.",
      "Những chú hề vui nhộn khiến mọi người cười nghiêng ngả ở rạp xiếc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_15",
    "word": "party",
    "phonetic": "/ˈpɑːrti/",
    "definition": "A social gathering of invited guests, typically involving eating, drinking, and entertainment.",
    "definitionVn": "bữa tiệc, buổi liên hoan",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "We are throwing a surprise birthday party for our friend.",
      "Enjoy delicious food and upbeat music at the party."
    ],
    "exampleTranslations": [
      "Chúng tôi đang tổ chức một bữa tiệc sinh nhật bất ngờ cho bạn mình.",
      "Hãy thưởng thức đồ ăn ngon và âm nhạc sôi động tại bữa tiệc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_16",
    "word": "festival",
    "phonetic": "/ˈfestɪvl/",
    "definition": "A day or period of celebration, typically a religious commemoration or cultural gathering.",
    "definitionVn": "lễ hội, ngày hội văn hóa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "The Mid-Autumn Festival features colorful lanterns and mooncakes.",
      "Thousands join the annual music festival."
    ],
    "exampleTranslations": [
      "Lễ hội Trung Thu có những chiếc đèn lồng rực rỡ và bánh trung thu.",
      "Hàng ngàn người tham gia lễ hội âm nhạc thường niên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_17",
    "word": "celebration",
    "phonetic": "/ˌselɪˈbreɪʃn/",
    "definition": "The action of celebrating an important day or event.",
    "definitionVn": "sự ăn mừng, lễ kỷ niệm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Fireworks illuminated the sky in celebration of the New Year.",
      "Join the graduation celebration with pride."
    ],
    "exampleTranslations": [
      "Pháo hoa thắp sáng bầu trời để ăn mừng năm mới.",
      "Hãy tham gia lễ kỷ niệm tốt nghiệp với niềm tự hào nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_18",
    "word": "fun",
    "phonetic": "/fʌn/",
    "definition": "Enjoyment, amusement, or lighthearted pleasure.",
    "definitionVn": "niềm vui, sự vui vẻ, trò vui",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Learning English with games is engaging and fun.",
      "Have fun and make new friends at the camp!"
    ],
    "exampleTranslations": [
      "Học tiếng Anh qua các trò chơi rất hấp dẫn và vui vẻ.",
      "Hãy vui vẻ và kết thêm nhiều bạn mới tại trại hè nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_19",
    "word": "play",
    "phonetic": "/pleɪ/",
    "definition": "Engage in activity for enjoyment and recreation rather than a serious or practical purpose.",
    "definitionVn": "chơi đùa, đóng kịch, chơi nhạc cụ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "Children love to play outside in the sunshine.",
      "She plays the piano with great skill."
    ],
    "exampleTranslations": [
      "Trẻ em rất thích chơi đùa ngoài trời dưới ánh nắng.",
      "Cô ấy chơi đàn piano với kỹ năng rất điêu luyện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_entert_20",
    "word": "show",
    "phonetic": "/ʃoʊ/",
    "definition": "A spectacle or display, typically an artistic, musical, or dramatic performance.",
    "definitionVn": "buổi biểu diễn, chương trình biểu diễn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_entertainment_arts",
    "themeNameVn": "Giải trí & Nghệ thuật",
    "themeNameEn": "Entertainment & Arts",
    "examples": [
      "The evening water puppet show was a unique cultural experience.",
      "Enjoy the live comedy show tonight."
    ],
    "exampleTranslations": [
      "Buổi biểu diễn múa rối nước buổi tối là một trải nghiệm văn hóa độc đáo.",
      "Hãy thưởng thức chương trình hài kịch trực tiếp tối nay nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_01",
    "word": "meter",
    "phonetic": "/ˈmiːtər/",
    "definition": "The fundamental unit of length in the metric system (100 cm).",
    "definitionVn": "mét (đơn vị đo độ dài)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The swimming pool is fifty meters long.",
      "He is one meter and seventy-five centimeters tall."
    ],
    "exampleTranslations": [
      "Hồ bơi dài năm mươi mét.",
      "Anh ấy cao một mét bảy mươi lăm phân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_02",
    "word": "kilometer",
    "phonetic": "/kɪˈlɑːmɪtər/",
    "definition": "A metric unit of measurement equal to 1,000 meters.",
    "definitionVn": "ki-lô-mét, cây số (1.000m)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "She runs five kilometers around the lake every morning.",
      "The distance between the two cities is 100 kilometers."
    ],
    "exampleTranslations": [
      "Cô ấy chạy bộ 5 cây số quanh hồ mỗi sáng.",
      "Khoảng cách giữa hai thành phố là 100 ki-lô-mét."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_03",
    "word": "centimeter",
    "phonetic": "/ˈsentɪmiːtər/",
    "definition": "A metric unit of length, equal to one hundredth of a meter.",
    "definitionVn": "xăng-ti-mét, phân (cm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Use a 30-centimeter ruler to draw straight lines.",
      "The baby grew three centimeters this month."
    ],
    "exampleTranslations": [
      "Dùng thước kẻ 30 xăng-ti-mét để vẽ các đường thẳng.",
      "Em bé đã cao thêm ba phân trong tháng này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_04",
    "word": "inch",
    "phonetic": "/ɪntʃ/",
    "definition": "A unit of linear measure equal to 2.54 centimeters.",
    "definitionVn": "inch (đơn vị đo, ~2.54 cm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "My new laptop has a 14-inch display screen.",
      "The smartphone screen is 6.5 inches wide."
    ],
    "exampleTranslations": [
      "Chiếc máy tính xách tay mới của tôi có màn hình hiển thị 14 inch.",
      "Màn hình điện thoại thông minh rộng 6.5 inch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_05",
    "word": "gram",
    "phonetic": "/ɡræm/",
    "definition": "A metric unit of mass equal to one thousandth of a kilogram.",
    "definitionVn": "gam (đơn vị đo khối lượng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Add 200 grams of white sugar to the cake mixture.",
      "A single paperclip weighs about one gram."
    ],
    "exampleTranslations": [
      "Thêm 200 gam đường trắng vào hỗn hợp bánh.",
      "Một chiếc kẹp giấy nặng khoảng một gam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_06",
    "word": "kilogram",
    "phonetic": "/ˈkɪləɡræm/",
    "definition": "The SI unit of mass equivalent to 1,000 grams.",
    "definitionVn": "ki-lô-gam, ký (kg)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "I bought two kilograms of sweet fresh oranges.",
      "He lost three kilograms by exercising daily."
    ],
    "exampleTranslations": [
      "Tôi đã mua hai ki-lô-gam cam tươi ngọt.",
      "Anh ấy đã giảm ba ký nhờ tập thể dục hàng ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_07",
    "word": "liter",
    "phonetic": "/ˈliːtər/",
    "definition": "A metric unit of capacity, formerly defined as the volume of 1 kilogram of water.",
    "definitionVn": "lít (đơn vị đo thể tích chất lỏng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Drink at least two liters of fresh water every day.",
      "We bought a one-liter bottle of milk."
    ],
    "exampleTranslations": [
      "Hãy uống ít nhất hai lít nước lọc mỗi ngày nhé.",
      "Chúng tôi đã mua một chai sữa một lít."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_08",
    "word": "size",
    "phonetic": "/saɪz/",
    "definition": "The relative extent of something; a dimensions or magnitude.",
    "definitionVn": "kích cỡ, kích thước, cỡ áo/giày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "What shoe size do you wear? — I wear size 40.",
      "This shirt comes in small, medium, and large sizes."
    ],
    "exampleTranslations": [
      "Bạn đi giày cỡ bao nhiêu? — Tôi đi cỡ 40.",
      "Chiếc áo này có các cỡ nhỏ, vừa và lớn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_09",
    "word": "height",
    "phonetic": "/haɪt/",
    "definition": "The measurement from base to top or of a person standing.",
    "definitionVn": "chiều cao, độ cao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "What is your height? — I am 1.70 meters.",
      "The mountain peak reaches a height of over 3,000 meters."
    ],
    "exampleTranslations": [
      "Chiều cao của bạn là bao nhiêu? — Tôi cao 1m70.",
      "Đỉnh núi đạt độ cao hơn 3.000 mét."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_10",
    "word": "weight",
    "phonetic": "/weɪt/",
    "definition": "A body's relative mass or the quantity of matter contained by it.",
    "definitionVn": "cân nặng, trọng lượng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Check your body weight on the bathroom scale.",
      "The maximum luggage weight for the flight is 20 kg."
    ],
    "exampleTranslations": [
      "Kiểm tra cân nặng cơ thể trên cân phòng tắm nhé.",
      "Trọng lượng hành lý tối đa cho chuyến bay là 20 kg."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_11",
    "word": "length",
    "phonetic": "/leŋkθ/",
    "definition": "The measurement or extent of something from end to end.",
    "definitionVn": "chiều dài, độ dài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Measure the length of the wooden table with a tape.",
      "The total length of the river is 500 kilometers."
    ],
    "exampleTranslations": [
      "Đo chiều dài chiếc bàn gỗ bằng thước dây nhé.",
      "Tổng chiều dài của con sông là 500 cây số."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_12",
    "word": "width",
    "phonetic": "/wɪdθ/",
    "definition": "The measurement or extent of something from side to side.",
    "definitionVn": "chiều rộng, bề ngang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The width of the room allows for a king-size bed.",
      "Measure the length and width before buying carpet."
    ],
    "exampleTranslations": [
      "Chiều rộng của căn phòng cho phép đặt một chiếc giường lớn.",
      "Hãy đo chiều dài và chiều rộng trước khi mua thảm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_13",
    "word": "depth",
    "phonetic": "/depθ/",
    "definition": "The distance from the top or surface to the bottom of something.",
    "definitionVn": "độ sâu, chiều sâu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The maximum depth of the swimming pool is two meters.",
      "Divers explored the ocean depths."
    ],
    "exampleTranslations": [
      "Độ sâu tối đa của hồ bơi là hai mét.",
      "Các thợ lặn đã khám phá những vùng sâu của đại dương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_14",
    "word": "heavy",
    "phonetic": "/ˈhevi/",
    "definition": "Of great weight; difficult to lift or move.",
    "definitionVn": "nặng, nặng nề",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "This suitcase is too heavy for me to carry alone.",
      "Elephants are heavy land mammals."
    ],
    "exampleTranslations": [
      "Chiếc vali này quá nặng để tôi có thể tự xách một mình.",
      "Voi là loài động vật có vú trên cạn nặng ký."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_15",
    "word": "light",
    "phonetic": "/laɪt/",
    "definition": "Of little weight; not heavy.",
    "definitionVn": "nhẹ, nhẹ nhàng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The feather is extremely light.",
      "This new laptop is super light and portable."
    ],
    "exampleTranslations": [
      "Chiếc lông vũ cực kỳ nhẹ.",
      "Chiếc máy tính xách tay mới này siêu nhẹ và tiện mang theo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_16",
    "word": "deep",
    "phonetic": "/diːp/",
    "definition": "Extending far down from the top or surface.",
    "definitionVn": "sâu, sâu thẳm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Do not swim in deep water without a life jacket.",
      "The well is very deep and provides cool water."
    ],
    "exampleTranslations": [
      "Đừng bơi ở vùng nước sâu mà không có áo phao nhé.",
      "Chiếc giếng rất sâu và cho nguồn nước mát lạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_17",
    "word": "shallow",
    "phonetic": "/ˈʃæloʊ/",
    "definition": "Of little depth; not deep.",
    "definitionVn": "nông, cạn (vùng nước)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Children can play safely in the shallow pool.",
      "The river is shallow enough to wade across."
    ],
    "exampleTranslations": [
      "Trẻ em có thể chơi an toàn ở khu hồ bơi nông.",
      "Con sông đủ nông để có thể lội qua."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_18",
    "word": "thick",
    "phonetic": "/θɪk/",
    "definition": "With opposite sides relatively far apart; not thin.",
    "definitionVn": "dày, đậm đặc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Wear a thick wool jacket in winter.",
      "This English dictionary is very thick."
    ],
    "exampleTranslations": [
      "Hãy mặc một chiếc áo khoác len dày vào mùa đông nhé.",
      "Cuốn từ điển tiếng Anh này rất dày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_19",
    "word": "thin",
    "phonetic": "/θɪn/",
    "definition": "Having opposite surfaces or sides that are close together; of little thickness.",
    "definitionVn": "mỏng, mảnh mai",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Cut the cheese into thin slices.",
      "She wore a thin cotton shirt on the hot day."
    ],
    "exampleTranslations": [
      "Cắt phô mai thành những lát mỏng nhé.",
      "Cô ấy mặc chiếc áo cotton mỏng vào ngày nắng nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_20",
    "word": "measure",
    "phonetic": "/ˈmeʒər/",
    "definition": "Ascertain the size, amount, or degree of something by using an instrument or device.",
    "definitionVn": "đo đạc, cân đo",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Measure your ingredients accurately before baking.",
      "The doctor measured the patient's temperature."
    ],
    "exampleTranslations": [
      "Hãy đo lường các nguyên liệu chính xác trước khi nướng bánh nhé.",
      "Bác sĩ đã đo nhiệt độ cho bệnh nhân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__01",
    "word": "tool",
    "phonetic": "/tuːl/",
    "definition": "A device or implement, especially one held in the hand, used to carry out a particular function.",
    "definitionVn": "dụng cụ, công cụ cầm tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "A toolbox contains all the essential hand tools.",
      "Language is a powerful tool for communication."
    ],
    "exampleTranslations": [
      "Một hộp đồ nghề chứa tất cả các dụng cụ cầm tay thiết yếu.",
      "Ngôn ngữ là công cụ mạnh mẽ để giao tiếp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__02",
    "word": "hammer",
    "phonetic": "/ˈhæmər/",
    "definition": "A tool with a heavy metal head mounted at right angles at the end of a handle, used for hitting nails.",
    "definitionVn": "cây búa, búa đóng đinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Use a hammer to drive the steel nail into the wooden wall.",
      "Be careful not to hit your thumb with the hammer."
    ],
    "exampleTranslations": [
      "Dùng búa để đóng chiếc đinh thép vào tường gỗ nhé.",
      "Hãy cẩn thận kẻo đập búa vào ngón tay cái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__03",
    "word": "nail",
    "phonetic": "/neɪl/",
    "definition": "A small metal spike with a broadened flat head, driven into wood to join things.",
    "definitionVn": "chiếc đinh (đóng gỗ, tường)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Hang the framed picture on a sturdy wall nail.",
      "Hammer the nail straight into the board."
    ],
    "exampleTranslations": [
      "Treo bức tranh có khung lên một chiếc đinh tường chắc chắn nhé.",
      "Hãy đóng chiếc đinh thẳng đứng vào tấm ván."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__04",
    "word": "screw",
    "phonetic": "/skruː/",
    "definition": "A short, slender, sharp-pointed metal pin with a raised helical thread running around it.",
    "definitionVn": "con ốc vít, đinh ốc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Tighten the loose screw on the chair leg.",
      "Use screws to assemble the wooden bookshelf."
    ],
    "exampleTranslations": [
      "Hãy vặn chặt con ốc vít bị lỏng ở chân ghế lại.",
      "Dùng ốc vít để lắp ráp kệ sách gỗ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__05",
    "word": "screwdriver",
    "phonetic": "/ˈskruːdraɪvər/",
    "definition": "A tool with a flattened or cross-shaped tip that fits into the head of a screw to turn it.",
    "definitionVn": "tua-vít, cây vặn vít",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Use a flathead screwdriver to open the battery compartment.",
      "Every home should have a set of screwdrivers."
    ],
    "exampleTranslations": [
      "Dùng tua-vít đầu dẹp để mở ngăn chứa pin nhé.",
      "Mỗi gia đình nên có một bộ tua-vít."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__06",
    "word": "wrench",
    "phonetic": "/rentʃ/",
    "definition": "A tool used for gripping and turning nuts or bolts.",
    "definitionVn": "mỏ lết, cờ-lê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "The plumber used an adjustable wrench to tighten the leaking pipe.",
      "Loosen the wheel bolts with a tire wrench."
    ],
    "exampleTranslations": [
      "Thợ sửa ống nước đã dùng mỏ lết điều chỉnh để siết chặt đường ống bị rò rỉ.",
      "Nới lỏng bu lông bánh xe bằng cờ-lê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__07",
    "word": "pliers",
    "phonetic": "/ˈplaɪərz/",
    "definition": "Pincers with parallel, flat, and typically serrated surfaces, used for gripping small objects or bending wire.",
    "definitionVn": "cái kìm, kềm bấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Hold the thin copper wire securely with pliers.",
      "Cut the wire with the sharp edge of the pliers."
    ],
    "exampleTranslations": [
      "Giữ chặt sợi dây đồng mảnh bằng kìm nhé.",
      "Cắt dây điện bằng lưỡi sắc của kìm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__08",
    "word": "saw",
    "phonetic": "/sɔː/",
    "definition": "A hand tool for cutting wood or other hard materials, typically with a toothed blade.",
    "definitionVn": "cái cưa (cưa gỗ, kim loại)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "The carpenter cut the wooden plank with a hand saw.",
      "Keep your hands clear of the sharp saw blade."
    ],
    "exampleTranslations": [
      "Người thợ mộc đã cắt tấm ván gỗ bằng chiếc cưa tay.",
      "Giữ tay tránh xa lưỡi cưa sắc bén nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__09",
    "word": "drill",
    "phonetic": "/drɪl/",
    "definition": "A tool or machine with a rotating cutting tip or reciprocating hammer, used for making holes.",
    "definitionVn": "máy khoan, mũi khoan",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Drill a small hole in the wall to hang the shelf.",
      "An electric cordless drill is very convenient."
    ],
    "exampleTranslations": [
      "Khoan một lỗ nhỏ trên tường để treo kệ nhé.",
      "Một chiếc máy khoan điện không dây rất tiện lợi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__10",
    "word": "tape",
    "phonetic": "/teɪp/",
    "definition": "A narrow strip of material with an adhesive surface, used for sticking things together.",
    "definitionVn": "băng dính, băng keo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Seal the cardboard box with strong packaging tape.",
      "Use electrical tape to insulate the exposed wire."
    ],
    "exampleTranslations": [
      "Dán kín chiếc hộp các-tông bằng băng keo đóng gói chắc chắn.",
      "Dùng băng keo điện để bọc cách điện dây hở nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__11",
    "word": "ladder",
    "phonetic": "/ˈlædər/",
    "definition": "A structure consisting of a series of bars or steps between two upright lengths of wood or metal.",
    "definitionVn": "chiếc thang, thang nhôm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Climb the step ladder carefully to change the light bulb.",
      "Make sure the ladder is stable on the floor."
    ],
    "exampleTranslations": [
      "Leo lên chiếc thang từng bước cẩn thận để thay bóng đèn nhé.",
      "Hãy đảm bảo chiếc thang đứng vững vàng trên sàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__12",
    "word": "paint",
    "phonetic": "/peɪnt/",
    "definition": "A colored substance which is spread over a surface and dries to leave a thin decorative or protective coating.",
    "definitionVn": "sơn, nước sơn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "We bought two cans of sky-blue paint for the bedroom.",
      "The fresh paint on the door is still wet."
    ],
    "exampleTranslations": [
      "Chúng tôi đã mua hai thùng sơn màu xanh da trời cho phòng ngủ.",
      "Lớp sơn mới trên cánh cửa vẫn còn ướt đấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__13",
    "word": "brush",
    "phonetic": "/brʌʃ/",
    "definition": "An implement with a handle, consisting of bristles used for painting or cleaning.",
    "definitionVn": "cọ quét sơn, chổi cọ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Apply the wall paint smoothly with a wide paint brush.",
      "Clean the paint brush thoroughly with water after use."
    ],
    "exampleTranslations": [
      "Quét sơn tường thật mịn bằng một cây cọ quét sơn bản rộng nhé.",
      "Rửa sạch cọ sơn bằng nước thật kỹ sau khi dùng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__14",
    "word": "rope",
    "phonetic": "/roʊp/",
    "definition": "A length of strong cord made by twisting together strands of natural fibers or wire.",
    "definitionVn": "sợi dây thừng, dây chão",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Tie the luggage securely to the roof rack with strong rope.",
      "The boat was tied to the dock with a thick rope."
    ],
    "exampleTranslations": [
      "Buộc hành lý chắc chắn vào giá nóc xe bằng sợi dây thừng bền nhé.",
      "Con thuyền được buộc vào cầu cảng bằng dây chão dày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__15",
    "word": "wire",
    "phonetic": "/ˈwaɪər/",
    "definition": "Metal drawn out into the form of a thin flexible thread or rod.",
    "definitionVn": "dây kim loại, dây điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Copper wire conducts electricity very efficiently.",
      "Tie the garden fence with flexible steel wire."
    ],
    "exampleTranslations": [
      "Dây đồng dẫn điện rất hiệu quả.",
      "Buộc hàng rào vườn bằng dây thép dẻo nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__16",
    "word": "fix",
    "phonetic": "/fɪks/",
    "definition": "Mend or repair something broken or malfunctioning.",
    "definitionVn": "sửa chữa, khắc phục",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "My father knows how to fix broken bicycles.",
      "Can you fix the leaky water tap?"
    ],
    "exampleTranslations": [
      "Bố tôi biết cách sửa xe đạp bị hỏng.",
      "Bạn có thể sửa chiếc vòi nước bị rò rỉ không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__17",
    "word": "repair",
    "phonetic": "/rɪˈper/",
    "definition": "Restore something damaged, faulty, or worn to a good condition.",
    "definitionVn": "tu sửa, phục hồi",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "The technician came to repair the air conditioner.",
      "It costs less to repair than to buy new."
    ],
    "exampleTranslations": [
      "Kỹ thuật viên đã đến để sửa chữa máy điều hòa.",
      "Chi phí sửa chữa rẻ hơn so với việc mua mới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__18",
    "word": "build",
    "phonetic": "/bɪld/",
    "definition": "Construct something by putting parts or material together.",
    "definitionVn": "xây dựng, lắp ráp",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Workers are building a new modern bridge over the river.",
      "They built a treehouse in the backyard."
    ],
    "exampleTranslations": [
      "Các công nhân đang xây dựng một cây cầu hiện đại bắc qua sông.",
      "Họ đã dựng một ngôi nhà trên cây ở sân sau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__19",
    "word": "break",
    "phonetic": "/breɪk/",
    "definition": "Separate into pieces as a result of a blow, shock, or strain.",
    "definitionVn": "làm vỡ, gãy, hỏng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Handle glass cups carefully so they don't break.",
      "He accidentally broke his sunglasses."
    ],
    "exampleTranslations": [
      "Cầm những chiếc cốc thủy tinh cẩn thận kẻo vỡ nhé.",
      "Anh ấy vô tình làm gãy chiếc kính râm của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__20",
    "word": "lock",
    "phonetic": "/lɑːk/",
    "definition": "A mechanism for keeping a door, lid, etc., fastened, typically operated by a key or combination.",
    "definitionVn": "ổ khóa, khóa cửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Always lock the front door when you leave the house.",
      "The bicycle has a sturdy combination lock."
    ],
    "exampleTranslations": [
      "Hãy luôn khóa cửa trước khi bạn rời khỏi nhà nhé.",
      "Chiếc xe đạp có một ổ khóa số rất chắc chắn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_01",
    "word": "storm",
    "phonetic": "/stɔːrm/",
    "definition": "A violent disturbance of the atmosphere with strong winds and usually rain, thunder, lightning, or snow.",
    "definitionVn": "cơn giông bão, bão lớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Stay indoors during the severe tropical storm.",
      "The storm brought heavy rain and strong gusts."
    ],
    "exampleTranslations": [
      "Hãy ở trong nhà trong suốt cơn bão nhiệt đới dữ dội nhé.",
      "Cơn bão mang theo mưa to và gió giật mạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_02",
    "word": "thunder",
    "phonetic": "/ˈθʌndər/",
    "definition": "A loud rumbling or crashing noise heard after a lightning flash due to the expansion of rapidly heated air.",
    "definitionVn": "tiếng sấm, sấm sét",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Loud rolling thunder echoed across the dark sky.",
      "The dog hid under the bed because of the thunder."
    ],
    "exampleTranslations": [
      "Tiếng sấm vang rền vang vọng khắp bầu trời tăm tối.",
      "Chú chó trốn dưới gầm giường vì tiếng sấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_03",
    "word": "lightning",
    "phonetic": "/ˈlaɪtnɪŋ/",
    "definition": "The occurrence of a natural electrical discharge of very short duration and high voltage between a cloud and the ground.",
    "definitionVn": "tia sét, ánh chớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "A bright flash of lightning illuminated the entire room.",
      "Never stand under tall solitary trees during lightning."
    ],
    "exampleTranslations": [
      "Một tia chớp sáng rực thắp sáng cả căn phòng.",
      "Không bao giờ đứng dưới những cây cao đơn độc khi có sấm sét nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_04",
    "word": "flood",
    "phonetic": "/flʌd/",
    "definition": "An overflow of a large amount of water beyond its normal limits, especially over what is normally dry land.",
    "definitionVn": "lũ lụt, ngập úng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Heavy seasonal rains caused urban floods in the streets.",
      "Villagers moved to higher ground to escape the flood."
    ],
    "exampleTranslations": [
      "Mưa lớn theo mùa đã gây ngập lụt trên các tuyến phố đô thị.",
      "Dân làng đã chuyển lên vùng đất cao hơn để tránh lũ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_05",
    "word": "drought",
    "phonetic": "/draʊt/",
    "definition": "A prolonged period of abnormally low rainfall, leading to a shortage of water.",
    "definitionVn": "hạn hán, khô hạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The severe drought dried up the farmland and ponds.",
      "Save fresh water during long periods of drought."
    ],
    "exampleTranslations": [
      "Trận hạn hán khắc nghiệt đã làm khô cạn đồng ruộng và ao hồ.",
      "Hãy tiết kiệm nước sạch trong những đợt khô hạn kéo dài."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_06",
    "word": "earthquake",
    "phonetic": "/ˈɜːrθkweɪk/",
    "definition": "A sudden and violent shaking of the ground, sometimes causing great destruction, as a result of movements within the earth's crust.",
    "definitionVn": "trận động đất",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Buildings in Japan are designed to withstand earthquakes.",
      "Drop, cover, and hold on during an earthquake."
    ],
    "exampleTranslations": [
      "Các tòa nhà ở Nhật Bản được thiết kế để chống chịu động đất.",
      "Hãy cúi xuống, che chắn và bám chặt khi có động đất nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_07",
    "word": "typhoon",
    "phonetic": "/taɪˈfuːn/",
    "definition": "A tropical storm in the region of the Indian or western Pacific oceans.",
    "definitionVn": "cơn bão biển nhiệt đới",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The coastal provinces prepared defenses against the incoming typhoon.",
      "Typhoons bring heavy rains and gale-force winds."
    ],
    "exampleTranslations": [
      "Các tỉnh ven biển đã chuẩn bị phương án phòng chống cơn bão nhiệt đới sắp tới.",
      "Bão biển mang theo mưa lớn và gió giật cấp bão."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_08",
    "word": "tornado",
    "phonetic": "/tɔːrˈneɪdoʊ/",
    "definition": "A mobile, destructive vortex of violently rotating winds having the appearance of a funnel-shaped cloud.",
    "definitionVn": "cơn lốc xoáy, vòi rồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The powerful tornado damaged houses in its narrow path.",
      "Seek shelter underground if a tornado approaches."
    ],
    "exampleTranslations": [
      "Cơn lốc xoáy kinh hoàng đã tàn phá các ngôi nhà trên đường đi hẹp của nó.",
      "Hãy tìm nơi trú ẩn dưới lòng đất nếu có lốc xoáy đến gần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_09",
    "word": "fog",
    "phonetic": "/fɑːɡ/",
    "definition": "A thick cloud of tiny water droplets suspended in the atmosphere at or near the earth's surface.",
    "definitionVn": "sương mù (dày đặc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Dense morning fog blanketed the mountain town of Sapa.",
      "Turn on fog lights when driving through thick fog."
    ],
    "exampleTranslations": [
      "Lớp sương mù sớm dày đặc bao phủ thị trấn vùng núi Sa Pa.",
      "Bật đèn sương mù khi lái xe qua lớp sương mù dày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_10",
    "word": "foggy",
    "phonetic": "/ˈfɑːɡi/",
    "definition": "Full of or accompanied by fog.",
    "definitionVn": "nhiều sương mù, mờ mịt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "It is a cold and foggy morning in the valley.",
      "Drive slowly on foggy mountain passes."
    ],
    "exampleTranslations": [
      "Đó là một buổi sáng lạnh và nhiều sương mù trong thung lũng.",
      "Hãy lái xe chậm rãi trên những con đèo nhiều sương mù nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_11",
    "word": "frost",
    "phonetic": "/frɔːst/",
    "definition": "A deposit of small white ice crystals formed on the ground or other surfaces when the temperature falls below freezing point.",
    "definitionVn": "sương giá, băng giá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Delicate white frost covered the green grass at dawn.",
      "Winter frost can damage delicate young crops."
    ],
    "exampleTranslations": [
      "Lớp sương giá trắng mỏng bao phủ bãi cỏ xanh lúc rạng đông.",
      "Băng giá mùa đông có thể làm hỏng các mầm cây non."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_12",
    "word": "ice",
    "phonetic": "/aɪs/",
    "definition": "Frozen water, a brittle, transparent crystalline solid.",
    "definitionVn": "băng tuyết, đá lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Put two ice cubes into your glass of lemonade.",
      "Be careful not to slip on the smooth ice."
    ],
    "exampleTranslations": [
      "Thả hai viên đá lạnh vào ly nước chanh của bạn nhé.",
      "Hãy cẩn thận kẻo trượt chân trên lớp băng trơn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_13",
    "word": "hail",
    "phonetic": "/heɪl/",
    "definition": "Pellets of frozen rain which fall in showers from cumulonimbus clouds.",
    "definitionVn": "mưa đá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The sudden hail storm dented car roofs.",
      "Hail stones can fall at high speeds."
    ],
    "exampleTranslations": [
      "Cơn mưa đá bất ngờ đã làm móp méo nóc xe ô tô.",
      "Những viên đá mưa có thể rơi với tốc độ rất cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_14",
    "word": "heatwave",
    "phonetic": "/ˈhiːtweɪv/",
    "definition": "A prolonged period of abnormally hot weather.",
    "definitionVn": "đợt nắng nóng gay gắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Stay hydrated and avoid direct sun during the summer heatwave.",
      "The heatwave set record high temperatures."
    ],
    "exampleTranslations": [
      "Uống đủ nước và tránh ánh nắng trực tiếp trong đợt nắng nóng mùa hè nhé.",
      "Đợt nắng nóng gay gắt đã lập kỷ lục nhiệt độ cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_15",
    "word": "blizzard",
    "phonetic": "/ˈblɪzərd/",
    "definition": "A severe snowstorm with high winds and low visibility.",
    "definitionVn": "trận bão tuyết dữ dội",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The mountain roads were blocked by a ferocious winter blizzard.",
      "Stay inside your warm cabin during the blizzard."
    ],
    "exampleTranslations": [
      "Những con đường vùng núi bị chia cắt bởi trận bão tuyết mùa đông dữ dội.",
      "Hãy ở trong căn nhà gỗ ấm áp trong suốt trận bão tuyết nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_16",
    "word": "warning",
    "phonetic": "/ˈwɔːrnɪŋ/",
    "definition": "A statement or event that warns of something or that serves as cautionary advice.",
    "definitionVn": "lời cảnh báo, dự báo khẩn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "The meteorological agency issued a severe storm warning.",
      "Heed official weather warnings and prepare supplies."
    ],
    "exampleTranslations": [
      "Cơ quan khí tượng đã phát đi lời cảnh báo bão dữ dội.",
      "Hãy chú ý đến các cảnh báo thời tiết chính thức và chuẩn bị nhu yếu phẩm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_17",
    "word": "safe",
    "phonetic": "/seɪf/",
    "definition": "Protected from or not exposed to danger or risk.",
    "definitionVn": "an toàn, bình an",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Stay in a safe and sturdy shelter during the storm.",
      "We arrived home safe and sound."
    ],
    "exampleTranslations": [
      "Hãy ở trong nơi trú ẩn an toàn và kiên cố trong cơn bão nhé.",
      "Chúng tôi đã về đến nhà bình an vô sự."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_18",
    "word": "danger",
    "phonetic": "/ˈdeɪndʒər/",
    "definition": "The possibility of suffering harm or injury.",
    "definitionVn": "mối nguy hiểm, sự hiểm nguy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Do not cross flooded bridges because of high danger.",
      "Warning signs alert travelers to potential road danger."
    ],
    "exampleTranslations": [
      "Không băng qua những cây cầu ngập nước vì mối nguy hiểm rất cao.",
      "Biển cảnh báo nhắc nhở người đi đường về những hiểm nguy tiềm ẩn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_19",
    "word": "shelter",
    "phonetic": "/ˈʃeltər/",
    "definition": "A place giving temporary protection from bad weather or danger.",
    "definitionVn": "nơi trú ẩn, chỗ trú mưa bão",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Hikers found shelter in a dry mountain cave during the downpour.",
      "The community center served as an emergency shelter."
    ],
    "exampleTranslations": [
      "Những người leo núi đã tìm thấy nơi trú ẩn trong một hang đá khô ráo khi trời mưa như trút.",
      "Trung tâm cộng đồng được dùng làm nơi trú ẩn khẩn cấp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_severe_20",
    "word": "rescue",
    "phonetic": "/ˈreskjuː/",
    "definition": "Save someone from a dangerous or distressing situation.",
    "definitionVn": "giải cứu, cứu nạn",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_severe_weather",
    "themeNameVn": "Thiên tai & Thời tiết xấu",
    "themeNameEn": "Severe Weather",
    "examples": [
      "Brave rescue teams saved flood victims by boat.",
      "Helicopters carried out mountain rescue missions."
    ],
    "exampleTranslations": [
      "Các đội cứu hộ dũng cảm đã cứu các nạn nhân lũ lụt bằng thuyền.",
      "Trực thăng đã thực hiện các nhiệm vụ cứu nạn trên vùng núi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_01",
    "word": "hill",
    "phonetic": "/hɪl/",
    "definition": "A naturally raised area of land, not as high as a mountain.",
    "definitionVn": "ngọn đồi, quả đồi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Green tea hills in Moc Chau are peaceful and picturesque.",
      "We walked up the grassy hill to watch the sunset."
    ],
    "exampleTranslations": [
      "Những đồi chè xanh mướt ở Mộc Châu thật thanh bình và thơ mộng.",
      "Chúng tôi đã đi bộ lên ngọn đồi cỏ để ngắm hoàng hôn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_02",
    "word": "valley",
    "phonetic": "/ˈvæli/",
    "definition": "A low area of land between hills or mountains, typically with a river or stream flowing through it.",
    "definitionVn": "thung lũng (giữa các dãy núi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Muong Hoa Valley in Sapa is famous for golden terraced rice fields.",
      "A clear stream flows through the lush valley."
    ],
    "exampleTranslations": [
      "Thung lũng Mường Hoa ở Sa Pa nổi tiếng với những thửa ruộng bậc thang vàng óng.",
      "Một con suối trong vắt chảy qua thung lũng xanh tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_03",
    "word": "forest",
    "phonetic": "/ˈfɔːrɪst/",
    "definition": "A large area covered chiefly with trees and undergrowth.",
    "definitionVn": "khu rừng, rừng rậm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Cuc Phuong National Park preserves an ancient tropical rainforest.",
      "Birds sing melodiously in the green forest."
    ],
    "exampleTranslations": [
      "Vườn Quốc gia Cúc Phương bảo tồn một khu rừng mưa nhiệt đới cổ sinh.",
      "Những chú chim hót líu lo trong khu rừng xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_04",
    "word": "jungle",
    "phonetic": "/ˈdʒʌŋɡl/",
    "definition": "An area of land overgrown with dense forest and tangled vegetation, typically in the tropics.",
    "definitionVn": "rừng nhiệt đới rậm rạp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "The jungle of Phong Nha hides mysterious caves and underground rivers.",
      "Many exotic wild animals live in the dense jungle."
    ],
    "exampleTranslations": [
      "Rừng rậm Phong Nha ẩn chứa những hang động kỳ bí và dòng sông ngầm.",
      "Nhiều loài động vật hoang dã kỳ lạ sinh sống trong rừng rậm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_05",
    "word": "desert",
    "phonetic": "/ˈdezərt/",
    "definition": "A dry, barren area of land, especially one covered with sand, that is characteristically desolate and waterless.",
    "definitionVn": "sa mạc (cát khô cằn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "The White Sand Dunes in Mui Ne resemble a mini desert.",
      "Camels can travel long distances in the hot desert."
    ],
    "exampleTranslations": [
      "Đồi Cát Trắng ở Mũi Né trông tựa như một sa mạc thu nhỏ.",
      "Lạc đà có thể di chuyển những quãng đường dài trên sa mạc nóng bỏng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_06",
    "word": "cave",
    "phonetic": "/keɪv/",
    "definition": "A natural underground hollow space large enough for a human to enter.",
    "definitionVn": "hang động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Son Doong is the largest natural cave in the world.",
      "Stalactites hang beautifully from the ceiling of the cave."
    ],
    "exampleTranslations": [
      "Sơn Đoòng là hang động tự nhiên lớn nhất thế giới.",
      "Những khối thạch nhũ rủ xuống tuyệt đẹp từ trần hang động."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_07",
    "word": "cliff",
    "phonetic": "/klɪf/",
    "definition": "A steep, and usually high, rock face, especially at the edge of the sea.",
    "definitionVn": "vách đá dốc đứng (ven biển/núi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Seabirds nest safely on the high rocky ocean cliff.",
      "Stand back from the edge of the steep cliff."
    ],
    "exampleTranslations": [
      "Chim biển làm tổ an toàn trên vách đá cao ven đại dương.",
      "Hãy đứng lùi lại phía sau mép vách đá dựng đứng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_08",
    "word": "volcano",
    "phonetic": "/vɑːlˈkeɪnoʊ/",
    "definition": "A mountain or hill having a crater or vent through which lava and rock fragments have erupted.",
    "definitionVn": "ngọn núi lửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Volcanic soil is extremely fertile for growing crops.",
      "Mount Fuji is a famous dormant volcano in Japan."
    ],
    "exampleTranslations": [
      "Đất núi lửa cực kỳ màu mỡ để trồng trọt mùa màng.",
      "Núi Phú Sĩ là ngọn núi lửa ngủ say nổi tiếng ở Nhật Bản."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_09",
    "word": "field",
    "phonetic": "/fiːld/",
    "definition": "An area of open land, especially one planted with crops or pasture.",
    "definitionVn": "cánh đồng (lúa, hoa, cỏ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Golden rice fields stretch endlessly to the horizon.",
      "Farmers work together in the vast open fields."
    ],
    "exampleTranslations": [
      "Những cánh đồng lúa chín vàng trải dài tít tắp đến tận chân trời.",
      "Những người nông dân cùng nhau làm việc trên cánh đồng bao la."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_10",
    "word": "coast",
    "phonetic": "/koʊst/",
    "definition": "The part of the land adjoining or near the sea.",
    "definitionVn": "bờ biển, dải duyên hải",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Vietnam has a long, scenic coastline of over 3,260 kilometers.",
      "Lighthouses guide ships safely along the rocky coast."
    ],
    "exampleTranslations": [
      "Việt Nam có đường bờ biển dài và thơ mộng hơn 3.260 cây số.",
      "Hải đăng dẫn đường an toàn cho tàu bè dọc bờ biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_11",
    "word": "bay",
    "phonetic": "/beɪ/",
    "definition": "A broad inlet of the sea where the land curves inward.",
    "definitionVn": "vịnh biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Ha Long Bay is a renowned UNESCO World Natural Heritage site.",
      "Emerald waters and limestone islands characterize the bay."
    ],
    "exampleTranslations": [
      "Vịnh Hạ Long là di sản thiên nhiên thế giới nổi tiếng của UNESCO.",
      "Làn nước xanh ngọc bích và các hòn đảo đá vôi tạo nên nét đặc trưng của vịnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_12",
    "word": "canyon",
    "phonetic": "/ˈkænjən/",
    "definition": "A deep gorge, typically one with a river flowing through it.",
    "definitionVn": "hẻm núi sâu, hẻm vực",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Tu San Canyon in Ha Giang is the deepest canyon in Southeast Asia.",
      "Emerald Nho Que River winds through the rocky canyon."
    ],
    "exampleTranslations": [
      "Hẻm vực Tu Sản ở Hà Giang là hẻm núi sâu nhất Đông Nam Á.",
      "Dòng sông Nho Quế xanh ngắt uốn lượn qua hẻm núi đá."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_13",
    "word": "plain",
    "phonetic": "/pleɪn/",
    "definition": "A large area of flat land with few trees.",
    "definitionVn": "đồng bằng, bình nguyên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "The Mekong Delta plain is the rice bowl of Vietnam.",
      "Vast plains provide fertile soil for agriculture."
    ],
    "exampleTranslations": [
      "Đồng bằng sông Cửu Long là vựa lúa của Việt Nam.",
      "Những vùng đồng bằng rộng lớn cung cấp đất đai màu mỡ cho nông nghiệp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_14",
    "word": "sand",
    "phonetic": "/sænd/",
    "definition": "A loose granular substance resulting from the erosion of siliceous and other rocks.",
    "definitionVn": "bãi cát, hạt cát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Soft golden sand feels wonderful between your toes.",
      "Children built a sandcastle on the beach."
    ],
    "exampleTranslations": [
      "Cát vàng mềm mịn đem lại cảm giác tuyệt vời giữa các ngón chân.",
      "Lũ trẻ đã xây một lâu đài cát trên bãi biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_15",
    "word": "rock",
    "phonetic": "/rɑːk/",
    "definition": "The solid mineral material forming part of the surface of the earth.",
    "definitionVn": "hòn đá, tảng đá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Waves crash against the weathered coastal rocks.",
      "He climbed the steep rock with safety ropes."
    ],
    "exampleTranslations": [
      "Những con sóng vỗ mạnh vào các tảng đá ven biển bị phong hóa.",
      "Anh ấy đã leo lên tảng đá dốc với dây thừng bảo hộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_16",
    "word": "stone",
    "phonetic": "/stoʊn/",
    "definition": "Hard solid non-metallic mineral matter of which rock is made, used for building.",
    "definitionVn": "viên đá, đá lát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Ancient temples were built with sturdy carved stones.",
      "Skip smooth stones across the calm lake surface."
    ],
    "exampleTranslations": [
      "Những ngôi đền cổ xưa được xây dựng bằng những phiến đá chạm khắc kiên cố.",
      "Ném lướt những viên đá nhẵn qua mặt hồ êm đềm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_17",
    "word": "soil",
    "phonetic": "/sɔɪl/",
    "definition": "The upper layer of earth in which plants grow, a black or dark brown material.",
    "definitionVn": "đất trồng, thổ nhưỡng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Rich fertile soil is essential for healthy plant growth.",
      "Add compost to enrich garden soil naturally."
    ],
    "exampleTranslations": [
      "Đất trồng màu mỡ rất cần thiết cho sự phát triển khỏe mạnh của cây cối.",
      "Thêm phân hữu cơ để làm giàu đất vườn một cách tự nhiên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_18",
    "word": "stream",
    "phonetic": "/striːm/",
    "definition": "A small, narrow river of water.",
    "definitionVn": "con suối, dòng suối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "A clear mountain stream flows gently through the woods.",
      "We drank cool refreshing water from the clean stream."
    ],
    "exampleTranslations": [
      "Một con suối vùng núi trong vắt chảy êm ả qua cánh rừng.",
      "Chúng tôi đã uống nước mát lành từ dòng suối sạch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_19",
    "word": "pond",
    "phonetic": "/pɑːnd/",
    "definition": "A small body of still water formed naturally or by hollowing or embanking.",
    "definitionVn": "cái ao, hồ nước nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Pink lotus flowers blossom gracefully in the village pond.",
      "Colorful koi fish swim peacefully in the garden pond."
    ],
    "exampleTranslations": [
      "Những bông hoa sen hồng đua nhau khoe sắc trong ao làng.",
      "Những chú cá koi nhiều màu bơi lội thanh bình trong ao vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_20",
    "word": "landscape",
    "phonetic": "/ˈlændskeɪp/",
    "definition": "All the visible features of an area of countryside or land, often considered in terms of their aesthetic appeal.",
    "definitionVn": "phong cảnh, cảnh quan thiên nhiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Vietnam boasts breathtaking natural landscapes from north to south.",
      "The artist captured the serene rural landscape on canvas."
    ],
    "exampleTranslations": [
      "Việt Nam sở hữu những phong cảnh thiên nhiên đẹp nghẹt thở từ Bắc chí Nam.",
      "Người họa sĩ đã khắc họa cảnh quan thôn quê thanh bình lên khung vẽ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_01",
    "word": "whale",
    "phonetic": "/weɪl/",
    "definition": "A very large marine mammal with a streamlined body, breathing through a blowhole on the head.",
    "definitionVn": "cá voi (động vật biển khổng lồ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "The blue whale is the largest animal ever known to have lived on Earth.",
      "We saw a majestic whale breach above the ocean waves."
    ],
    "exampleTranslations": [
      "Cá voi xanh là loài động vật lớn nhất từng được biết đến trên Trái Đất.",
      "Chúng tôi đã thấy một chú cá voi uy nghi nhô mình lên khỏi sóng đại dương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_02",
    "word": "dolphin",
    "phonetic": "/ˈdɑːlfɪn/",
    "definition": "A small gregarious toothed whale that typically has a beaklike snout and curved dorsal fin.",
    "definitionVn": "cá heo (thông minh, thân thiện)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Dolphins are intelligent and playful marine mammals.",
      "A pod of dolphins swam alongside our tour boat."
    ],
    "exampleTranslations": [
      "Cá heo là loài động vật có vú dưới biển rất thông minh và tinh nghịch.",
      "Một đàn cá heo đã bơi song song cùng thuyền du lịch của chúng tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_03",
    "word": "shark",
    "phonetic": "/ʃɑːrk/",
    "definition": "A long-bodied chiefly marine fish, the majority being predatory.",
    "definitionVn": "cá mập",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Sharks play a vital ecological role as apex predators of the ocean.",
      "Whale sharks are gentle filter feeders."
    ],
    "exampleTranslations": [
      "Cá mập đóng vai trò sinh thái tối quan trọng với tư cách loài săn mồi đỉnh cao của đại dương.",
      "Cá mập voi là loài ăn lọc rất hiền lành."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_04",
    "word": "octopus",
    "phonetic": "/ˈɑːktəpəs/",
    "definition": "An eight-armed mollusc with a soft body, typically living on the seabed.",
    "definitionVn": "con bạch tuộc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "An octopus has eight flexible arms and three hearts.",
      "Octopuses can change color to camouflage instantly."
    ],
    "exampleTranslations": [
      "Bạch tuộc có tám xúc tu linh hoạt và ba trái tim.",
      "Bạch tuộc có thể đổi màu để ngụy trang ngay lập tức."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_05",
    "word": "squid",
    "phonetic": "/skwɪd/",
    "definition": "An elongated, fast-swimming cephalopod mollusc with ten arms.",
    "definitionVn": "con mực, mực ống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Grilled squid with chili sauce is a popular coastal snack.",
      "Squids can release dark ink to escape predators."
    ],
    "exampleTranslations": [
      "Mực nướng sa tế là món ăn vặt miền biển được ưa chuộng.",
      "Loài mực có thể phun mực đen để trốn thoát kẻ săn mồi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_06",
    "word": "crab",
    "phonetic": "/kræb/",
    "definition": "A crustacean with a broad carapace, stalked eyes, and five pairs of legs, the first pair modified as pincers.",
    "definitionVn": "con cua, con ghẹ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Ca Mau is famous for its delicious fresh mud crabs.",
      "The little crab scuttled sideways across the wet sand."
    ],
    "exampleTranslations": [
      "Cà Mau nổi tiếng với những con cua biển tươi ngon.",
      "Chú cua nhỏ bò ngang thoăn thoắt trên bãi cát ướt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_07",
    "word": "shrimp",
    "phonetic": "/ʃrɪmp/",
    "definition": "A small free-swimming crustacean with an elongated body, typically marine and frequently harvested for food.",
    "definitionVn": "con tôm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Steamed shrimp dipped in lime pepper salt is delectable.",
      "Freshwater shrimp thrive in the rivers."
    ],
    "exampleTranslations": [
      "Tôm hấp chấm muối tiêu chanh ngon tuyệt cú mèo.",
      "Tôm nước ngọt sinh trưởng tốt ở các dòng sông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_08",
    "word": "lobster",
    "phonetic": "/ˈlɑːbstər/",
    "definition": "A large marine crustacean with a cylindrical body, stalked eyes, and strong claws.",
    "definitionVn": "tôm hùm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Binh Ba Island is nicknamed the Island of Lobsters in Vietnam.",
      "Grilled lobster with garlic butter is a luxurious feast."
    ],
    "exampleTranslations": [
      "Đảo Bình Ba được mệnh danh là Đảo Tôm Hùm của Việt Nam.",
      "Tôm hùm nướng bơ tỏi là một bữa tiệc sang trọng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_09",
    "word": "jellyfish",
    "phonetic": "/ˈdʒelifɪʃ/",
    "definition": "A free-swimming marine coelenterate with a gelatinous bell- or saucer-shaped body that is typically transparent.",
    "definitionVn": "con sứa (biển)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Translucent jellyfish drift gracefully with ocean currents.",
      "Be cautious of stinging jellyfish when swimming at sea."
    ],
    "exampleTranslations": [
      "Những chú sứa trong suốt trôi dạt uyển chuyển theo dòng hải lưu.",
      "Hãy cẩn thận với sứa lửa khi bơi ở biển nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_10",
    "word": "starfish",
    "phonetic": "/ˈstɑːrfɪʃ/",
    "definition": "A marine echinoderm with five or more radiating arms.",
    "definitionVn": "sao biển, con sao biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Rach Vem Beach in Phu Quoc is famous for red starfish.",
      "Starfish can regenerate lost arms."
    ],
    "exampleTranslations": [
      "Bãi Rạch Vẹm ở Phú Quốc nổi tiếng với những chú sao biển đỏ.",
      "Sao biển có thể tái sinh những chiếc cánh bị đứt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_11",
    "word": "seal",
    "phonetic": "/siːl/",
    "definition": "A fish-eating aquatic mammal with a streamlined body and feet developed as flippers.",
    "definitionVn": "con hải cẩu, chó biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Playful seals bask under the sunshine on coastal rocks.",
      "Seals glide swiftly through freezing waters."
    ],
    "exampleTranslations": [
      "Những chú hải cẩu tinh nghịch sưởi nắng trên các tảng đá ven biển.",
      "Hải cẩu lướt đi thoăn thoắt trong làn nước băng giá."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_12",
    "word": "penguin",
    "phonetic": "/ˈpeŋɡwɪn/",
    "definition": "A flightless seabird of southern hemisphere oceans, having webbed feet and wings evolved into flippers.",
    "definitionVn": "chim cánh cụt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Penguins waddle cutely on icy shores in Antarctica.",
      "Penguins are exceptional underwater swimmers."
    ],
    "exampleTranslations": [
      "Chim cánh cụt lạch bạch bước đi đáng yêu trên bờ băng Nam Cực.",
      "Chim cánh cụt là những vận động viên bơi lội cừ khôi dưới nước."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_13",
    "word": "coral",
    "phonetic": "/ˈkɔːrəl/",
    "definition": "A hard stony substance secreted by certain marine coelenterates as an external skeleton.",
    "definitionVn": "san hô (rạn san hô)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Snorkeling above colorful coral reefs is an unforgettable experience.",
      "Coral reefs protect coastlines and support marine biodiversity."
    ],
    "exampleTranslations": [
      "Lặn ngắm những rạn san hô sặc sỡ là một trải nghiệm khó quên.",
      "Rạn san hô bảo vệ bờ biển và nuôi dưỡng đa dạng sinh học biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_14",
    "word": "seaweed",
    "phonetic": "/ˈsiːwiːd/",
    "definition": "Large algae growing in the sea or on rocks below the high-water mark.",
    "definitionVn": "rong biển, tảo biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Seaweed soup is nutritious, rich in iodine, and delicious.",
      "Dried seaweed sheets are used to wrap sushi and kimbap."
    ],
    "exampleTranslations": [
      "Canh rong biển rất bổ dưỡng, giàu i-ốt và ngon miệng.",
      "Lá rong biển khô được dùng để cuộn sushi và kimbap."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_15",
    "word": "shell",
    "phonetic": "/ʃel/",
    "definition": "The hard protective outer case of a mollusc or crustacean.",
    "definitionVn": "vỏ ốc, vỏ sò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Children collect colorful seashells along the sandy shore.",
      "Listen closely to the seashell to hear the sound of the ocean."
    ],
    "exampleTranslations": [
      "Lũ trẻ nhặt những chiếc vỏ sò nhiều màu sắc dọc bờ cát.",
      "Áp tai vào vỏ ốc để lắng nghe tiếng rì rào của đại dương nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_16",
    "word": "clam",
    "phonetic": "/klæm/",
    "definition": "A marine bivalve mollusc with shells of equal size.",
    "definitionVn": "con ngao, con nghêu, sò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Steamed clams with fragrant lemongrass and chili are tasty.",
      "Clams burrow into the wet sand at low tide."
    ],
    "exampleTranslations": [
      "Nghêu hấp sả ớt thơm lừng ăn rất ngon miệng.",
      "Ngao đào sâu vào cát ướt khi thủy triều rút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_17",
    "word": "seahorse",
    "phonetic": "/ˈsiːhɔːrs/",
    "definition": "A small marine fish with an upright posture and an equine head.",
    "definitionVn": "cá ngựa (hải mã)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "A seahorse anchors itself to seagrass with its prehensile tail.",
      "Male seahorses carry and care for the eggs until hatching."
    ],
    "exampleTranslations": [
      "Cá ngựa tự neo mình vào cỏ biển bằng chiếc đuôi quấn.",
      "Cá ngựa đực mang và chăm sóc trứng cho đến khi nở."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_18",
    "word": "ocean",
    "phonetic": "/ˈoʊʃn/",
    "definition": "A very large expanse of sea, in particular each of the main areas into which the sea is divided.",
    "definitionVn": "đại dương bao la",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "The vast blue ocean covers more than 70 percent of Earth's surface.",
      "Conserve the ocean by reducing plastic waste."
    ],
    "exampleTranslations": [
      "Đại dương xanh bao la bao phủ hơn 70 phần trăm bề mặt Trái Đất.",
      "Bảo tồn đại dương bằng cách giảm thiểu rác thải nhựa nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_19",
    "word": "swim",
    "phonetic": "/swɪm/",
    "definition": "Propel the body through water by using the limbs, or (in the case of a fish) fins and tail.",
    "definitionVn": "bơi lội",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Colorful reef fish swim in schools around the corals.",
      "I love to swim in the cool ocean water during summer."
    ],
    "exampleTranslations": [
      "Những chú cá rạn sặc sỡ bơi theo đàn quanh rạn san hô.",
      "Tôi rất thích bơi trong làn nước đại dương mát lành vào mùa hè."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_20",
    "word": "dive",
    "phonetic": "/daɪv/",
    "definition": "Plunge head first into water, or submerge under water using scuba gear.",
    "definitionVn": "lặn (ngắm san hô, lặn bình khí)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Scuba divers dive deep to explore underwater shipwrecks.",
      "We went skin diving in Nha Trang's clear marine reserve."
    ],
    "exampleTranslations": [
      "Các thợ lặn lặn sâu để khám phá xác tàu đắm dưới đáy biển.",
      "Chúng tôi đã đi lặn tự do ở khu bảo tồn biển nước trong vắt ở Nha Trang."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_01",
    "word": "insect",
    "phonetic": "/ˈɪnsekt/",
    "definition": "A small arthropod animal that has six legs and generally one or two pairs of wings.",
    "definitionVn": "côn trùng, sâu bọ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Insects are the most diverse group of animals on Earth.",
      "Many flowering plants depend on insects for pollination."
    ],
    "exampleTranslations": [
      "Côn trùng là nhóm động vật đa dạng nhất trên Trái Đất.",
      "Nhiều loài thực vật có hoa dựa vào côn trùng để thụ phấn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_02",
    "word": "bee",
    "phonetic": "/biː/",
    "definition": "A winged, flower-visiting insect that produces honey and beeswax.",
    "definitionVn": "con ong (làm mật)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Busy honeybees collect sweet nectar from colorful flowers.",
      "Bees produce pure organic honey."
    ],
    "exampleTranslations": [
      "Những chú ong chăm chỉ lấy mật ngọt từ những bông hoa rực rỡ.",
      "Ong tạo ra mật ong hữu cơ nguyên chất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_03",
    "word": "ant",
    "phonetic": "/ænt/",
    "definition": "A small insect, typically with a sting and living in a complex social colony with one or more breeding queens.",
    "definitionVn": "con kiến (chăm chỉ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Hardworking ants can carry objects many times their own weight.",
      "A line of tiny ants marched across the garden wall."
    ],
    "exampleTranslations": [
      "Những chú kiến chăm chỉ có thể vác vật nặng gấp nhiều lần trọng lượng cơ thể.",
      "Một đàn kiến nhỏ hành quân qua bức tường vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_04",
    "word": "mosquito",
    "phonetic": "/məˈskiːtoʊ/",
    "definition": "A slender long-legged fly with aquatic larvae, the bite of which can transmit malaria or dengue.",
    "definitionVn": "con muỗi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Use a mosquito net when sleeping to prevent mosquito bites.",
      "Apply insect repellent to keep mosquitoes away."
    ],
    "exampleTranslations": [
      "Hãy mắc màn khi đi ngủ để tránh bị muỗi đốt nhé.",
      "Thoa kem chống muỗi để xua đuổi muỗi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_05",
    "word": "fly",
    "phonetic": "/flaɪ/",
    "definition": "A two-winged insect of the order Diptera, especially a housefly.",
    "definitionVn": "con ruồi (nhà)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Cover food with a mesh cover to keep flies away.",
      "A fly buzzed around the bright window pane."
    ],
    "exampleTranslations": [
      "Đậy thức ăn bằng lồng bàn lưới để ngăn ruồi nhé.",
      "Một con ruồi bay vo ve quanh ô cửa sổ sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_06",
    "word": "dragonfly",
    "phonetic": "/ˈdræɡənflaɪ/",
    "definition": "A fast-flying long-bodied insect with two pairs of large, transparent wings.",
    "definitionVn": "con chuồn chuồn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Bright red dragonflies hovered gracefully above the pond.",
      "Dragonflies catch and eat mosquitoes in flight."
    ],
    "exampleTranslations": [
      "Những chú chuồn chuồn đỏ tươi bay lượn nhẹ nhàng trên mặt ao.",
      "Chuồn chuồn bắt và ăn muỗi ngay khi đang bay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_07",
    "word": "spider",
    "phonetic": "/ˈspaɪdər/",
    "definition": "An eight-legged predatory arachnid with an unsegmented body.",
    "definitionVn": "con nhện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "The spider spun an intricate circular web in the corner.",
      "Most garden spiders are harmless and eat pests."
    ],
    "exampleTranslations": [
      "Chú nhện đã dệt một mạng lưới tròn phức tạp ở góc tường.",
      "Hầu hết các loài nhện vườn đều vô hại và giúp bắt sâu bọ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_08",
    "word": "beetle",
    "phonetic": "/ˈbiːtl/",
    "definition": "An insect of an order distinguished by forewings modified as hard wing cases (elytra).",
    "definitionVn": "bọ cánh cứng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "The rhinoceros beetle has an impressive horn.",
      "We observed shiny green beetles on the tree bark."
    ],
    "exampleTranslations": [
      "Bọ cánh cứng tê giác có chiếc sừng rất ấn tượng.",
      "Chúng tôi quan sát thấy những chú bọ cánh cứng xanh bóng trên vỏ cây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_09",
    "word": "caterpillar",
    "phonetic": "/ˈkætərpɪlər/",
    "definition": "The larva of a butterfly or moth, typically having a segmented worm-like body.",
    "definitionVn": "con sâu bướm, ấu trùng bướm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A green caterpillar munched peacefully on a cabbage leaf.",
      "The caterpillar spins a cocoon and transforms into a butterfly."
    ],
    "exampleTranslations": [
      "Chú sâu bướm xanh gặm nhấm ngon lành chiếc lá bắp cải.",
      "Sâu bướm dệt kén và biến hình thành chú bướm xinh đẹp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_10",
    "word": "grasshopper",
    "phonetic": "/ˈɡræshɑːpər/",
    "definition": "A plant-eating insect with long hind legs which are used for jumping and for producing a chirping sound.",
    "definitionVn": "con cào cào, châu chấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A green grasshopper jumped high among the grass blades.",
      "Grasshoppers are active in open fields on warm summer days."
    ],
    "exampleTranslations": [
      "Chú cào cào xanh bật nhảy cao giữa các ngọn cỏ.",
      "Châu chấu hoạt động nhiều trên cánh đồng vào những ngày hè ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_11",
    "word": "cricket",
    "phonetic": "/ˈkrɪkɪt/",
    "definition": "An insect related to grasshoppers, jumping with strong hind legs and chirping loudly at night.",
    "definitionVn": "con dế mèn, chú dế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Crickets chirp melodiously outside in the summer evening.",
      "The classic tale of Men the Cricket is beloved by Vietnamese children."
    ],
    "exampleTranslations": [
      "Những chú dế mèn gáy rả rích bên ngoài trong buổi tối mùa hè.",
      "Tác phẩm kinh điển Dế Mèn Phiêu Lưu Ký được thiếu nhi Việt Nam yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_12",
    "word": "ladybug",
    "phonetic": "/ˈleɪdibʌɡ/",
    "definition": "A small circular beetle that is typically red or yellow with black spots.",
    "definitionVn": "con bọ rùa (chấm tròn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A tiny red ladybug with black dots landed on the flower petal.",
      "Ladybugs are beneficial garden friends that eat aphids."
    ],
    "exampleTranslations": [
      "Một chú bọ rùa đỏ nhỏ có chấm đen đậu trên cánh hoa.",
      "Bọ rùa là người bạn có ích trong vườn giúp bắt rệp cây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_13",
    "word": "worm",
    "phonetic": "/wɜːrm/",
    "definition": "Any of a number of creeping or burrowing invertebrate animals with long, slender soft bodies.",
    "definitionVn": "con giun đất, con sâu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Earthworms aerate and enrich the garden soil naturally.",
      "Robins look for juicy earthworms after the rain."
    ],
    "exampleTranslations": [
      "Giun đất làm tơi xốp và làm giàu đất vườn một cách tự nhiên.",
      "Chim cổ đỏ tìm kiếm những con giun béo sau cơn mưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_14",
    "word": "wasp",
    "phonetic": "/wɑːsp/",
    "definition": "A social or solitary winged insect related to bees and ants, with a narrow waist and a sting.",
    "definitionVn": "ong bắp cày, ong vò vẽ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Stay calm and move away slowly if a wasp flies near.",
      "Wasps build intricate paper-like nests under eaves."
    ],
    "exampleTranslations": [
      "Hãy giữ bình tĩnh và di chuyển chậm ra xa nếu có ong bắp cày bay lại gần.",
      "Ong vò vẽ xây những tổ như giấy rất tinh vi dưới mái hiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_15",
    "word": "moth",
    "phonetic": "/mɔːθ/",
    "definition": "A chiefly nocturnal insect related to butterflies, typically having a stout body and dull plumage.",
    "definitionVn": "con bướm đêm, ngài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Nocturnal moths are attracted to bright lights at night.",
      "The silkworm moth produces natural silk threads."
    ],
    "exampleTranslations": [
      "Những chú bướm đêm bị thu hút bởi ánh đèn sáng vào ban đêm.",
      "Ngài tằm tạo ra những sợi tơ tằm tự nhiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_16",
    "word": "snail",
    "phonetic": "/sneɪl/",
    "definition": "A mollusc with a single spiral shell into which the whole body can be withdrawn.",
    "definitionVn": "con ốc sên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "The slow snail crept across the damp garden path.",
      "The snail retreated into its protective shell."
    ],
    "exampleTranslations": [
      "Chú ốc sên chậm chạp bò qua lối đi ẩm ướt trong vườn.",
      "Ốc sên thụt vào trong chiếc vỏ bảo vệ của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_17",
    "word": "sting",
    "phonetic": "/stɪŋ/",
    "definition": "Wound or pierce with a stinger, as a bee or wasp does.",
    "definitionVn": "đốt, chích (ong, côn trùng có nọc)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A bee may sting if it feels threatened.",
      "Apply ice to soothe a painful insect sting."
    ],
    "exampleTranslations": [
      "Ong có thể đốt nếu cảm thấy bị đe dọa.",
      "Chườm đá lạnh để làm dịu vết côn trùng đốt bị đau nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_18",
    "word": "bite",
    "phonetic": "/baɪt/",
    "definition": "Use teeth or jaws to cut or puncture.",
    "definitionVn": "cắn, đốt (muỗi, kiến)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Mosquitoes bite to feed on blood.",
      "Don't scratch an itchy bug bite."
    ],
    "exampleTranslations": [
      "Muỗi đốt để hút máu.",
      "Đừng gãi vết côn trùng cắn bị ngứa nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_19",
    "word": "crawl",
    "phonetic": "/krɔːl/",
    "definition": "Move forward on the hands and knees or by dragging the body close to the ground.",
    "definitionVn": "bò, trườn (sâu bọ, em bé)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Tiny ants crawl across the kitchen counter in search of crumbs.",
      "A caterpillar crawls slowly along the stem."
    ],
    "exampleTranslations": [
      "Những chú kiến nhỏ bò qua kệ bếp để tìm vụn bánh.",
      "Một chú sâu bướm bò từ từ dọc theo cành cây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_20",
    "word": "wing",
    "phonetic": "/wɪŋ/",
    "definition": "Any of a number of specialized paired appendages by which an insect, bird, or bat is able to fly.",
    "definitionVn": "đôi cánh, cánh (côn trùng, chim)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Butterflies have vibrant colorful patterns on their wings.",
      "Dragonfly wings beat with high precision."
    ],
    "exampleTranslations": [
      "Bướm có những hoa văn rực rỡ sắc màu trên đôi cánh.",
      "Đôi cánh của chuồn chuồn đập với độ chính xác cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_01",
    "word": "spice",
    "phonetic": "/spaɪs/",
    "definition": "An aromatic or pungent vegetable substance used to flavor food, e.g. cloves, pepper, or cumin.",
    "definitionVn": "gia vị (nấu nướng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Spices enhance the natural aroma and flavor of dishes.",
      "Vietnam is a major exporter of world-class spices."
    ],
    "exampleTranslations": [
      "Gia vị làm tăng hương thơm và vị ngon tự nhiên của món ăn.",
      "Việt Nam là nước xuất khẩu các loại gia vị đẳng cấp hàng đầu thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_02",
    "word": "pepper",
    "phonetic": "/ˈpepər/",
    "definition": "A pungent, hot-tasting powder prepared from dried and ground peppercorns.",
    "definitionVn": "hạt tiêu, tiêu xay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Phu Quoc black pepper has an intense and fragrant aroma.",
      "Sprinkle a pinch of black pepper over the hot soup."
    ],
    "exampleTranslations": [
      "Tiêu đen Phú Quốc có hương thơm nồng nàn và đậm đà.",
      "Rắc một chút tiêu đen lên bát súp nóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_03",
    "word": "chili",
    "phonetic": "/ˈtʃɪli/",
    "definition": "A small hot-tasting pod of a variety of capsicum, used chopped, dried, or powdered in cooking.",
    "definitionVn": "quả ớt (vị cay nồng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Add sliced red chili to fish sauce for a spicy dip.",
      "Be careful not to touch your eyes after cutting fresh chili."
    ],
    "exampleTranslations": [
      "Thêm ớt đỏ thái lát vào nước mắm để làm nước chấm cay nhé.",
      "Cẩn thận đừng chạm vào mắt sau khi cắt ớt tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_04",
    "word": "ginger",
    "phonetic": "/ˈdʒɪndʒər/",
    "definition": "A hot, fragrant spice made from the rhizome of a plant, which may be chopped or powdered for cooking.",
    "definitionVn": "củ gừng (vị cay ấm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Warm ginger tea with honey is soothing for a sore throat.",
      "Slice fresh ginger into strips for steamed fish."
    ],
    "exampleTranslations": [
      "Trà gừng ấm với mật ong rất dịu họng khi bị đau họng.",
      "Thái gừng tươi thành sợi cho món cá hấp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_05",
    "word": "garlic",
    "phonetic": "/ˈɡɑːrlɪk/",
    "definition": "A strong-smelling pungent-tasting bulb, used as a flavoring in cookery.",
    "definitionVn": "củ tỏi (phi thơm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Ly Son purple garlic is prized for its exquisite flavor.",
      "Sauté crushed garlic in hot oil until golden brown."
    ],
    "exampleTranslations": [
      "Tỏi tía Lý Sơn được đánh giá cao nhờ hương vị tuyệt hảo.",
      "Phi tỏi đập dập trong dầu nóng cho đến khi vàng ươm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_06",
    "word": "herb",
    "phonetic": "/ɜːrb/",
    "definition": "Any plant with leaves, seeds, or flowers used for flavoring, food, medicine, or perfume.",
    "definitionVn": "rau thơm, thảo mộc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fresh Vietnamese herbs elevate noodle dishes to perfection.",
      "Grow herbs like basil and mint on your windowsill."
    ],
    "exampleTranslations": [
      "Các loại rau thơm tươi của Việt Nam nâng tầm các món bún phở đến độ hoàn hảo.",
      "Trồng các loại thảo mộc như húng quế và bạc hà bên bậu cửa sổ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_07",
    "word": "mint",
    "phonetic": "/mɪnt/",
    "definition": "An aromatic plant with peppery leaves, used of culinary and medicinal purposes.",
    "definitionVn": "lá bạc hà, rau thơm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fresh mint leaves give iced lemonade a cooling kick.",
      "Chew fresh mint for clean and refreshing breath."
    ],
    "exampleTranslations": [
      "Những lá bạc hà tươi mang lại vị the mát cho ly nước chanh đá.",
      "Nhai lá bạc hà tươi để có hơi thở thơm mát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_08",
    "word": "basil",
    "phonetic": "/ˈbæzl/",
    "definition": "An aromatic annual herb of the mint family, native to tropical Asia.",
    "definitionVn": "rau húng quế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Tear fresh Thai basil leaves into your bowl of hot pho.",
      "Sweet basil pairs wonderfully with ripe red tomatoes."
    ],
    "exampleTranslations": [
      "Ngắt những lá húng quế tươi vào tô phở nóng của bạn nhé.",
      "Húng quế ngọt kết hợp tuyệt vời với cà chua đỏ chín."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_09",
    "word": "cinnamon",
    "phonetic": "/ˈsɪnəmən/",
    "definition": "An aromatic spice made from the peeled, dried, and rolled bark of a Southeast Asian tree.",
    "definitionVn": "vỏ quế, quế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Yen Bai cinnamon is world-famous for its sweet aromatic warmth.",
      "Add a cinnamon stick when simmering traditional pho broth."
    ],
    "exampleTranslations": [
      "Quế Yên Bái nổi tiếng thế giới nhờ hương thơm ấm áp ngọt ngào.",
      "Thêm một thanh quế khi ninh nước dùng phở truyền thống nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_10",
    "word": "soy sauce",
    "phonetic": "/ˈsɔɪ sɔːs/",
    "definition": "A dark, salty sauce made from fermented soybeans.",
    "definitionVn": "nước tương, xì dầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Dip vegetarian spring rolls in light soy sauce with chili.",
      "Soy sauce adds rich umami depth to stir-fried noodles."
    ],
    "exampleTranslations": [
      "Chấm chả giò chay vào nước tương nhạt có ớt nhé.",
      "Nước tương tăng thêm vị ngọt umami đậm đà cho món mì xào."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_11",
    "word": "fish sauce",
    "phonetic": "/fɪʃ sɔːs/",
    "definition": "A liquid condiment made from fish that have been coated in salt and fermented for months.",
    "definitionVn": "nước mắm truyền thống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Traditional Phu Quoc fish sauce is the soul of Vietnamese cuisine.",
      "Balance fish sauce with lime, sugar, garlic, and chili for dipping sauce."
    ],
    "exampleTranslations": [
      "Nước mắm truyền thống Phú Quốc là linh hồn của ẩm thực Việt Nam.",
      "Pha nước mắm cùng chanh, đường, tỏi và ớt để làm nước chấm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_12",
    "word": "vinegar",
    "phonetic": "/ˈvɪnɪɡər/",
    "definition": "A sour-tasting liquid containing acetic acid, obtained by fermenting dilute alcoholic liquids.",
    "definitionVn": "giấm ăn (vị chua thanh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Garlic vinegar is a classic table condiment at pho restaurants.",
      "Mix olive oil and wine vinegar for a healthy salad dressing."
    ],
    "exampleTranslations": [
      "Giấm tỏi là gia vị để bàn kinh điển tại các quán phở.",
      "Trộn dầu ô liu và giấm rượu để làm sốt salad lành mạnh nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_13",
    "word": "oil",
    "phonetic": "/ɔɪl/",
    "definition": "A viscous liquid derived from petroleum or plants, used as fuel, lubricant, or in cooking.",
    "definitionVn": "dầu ăn, dầu thực vật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Use heart-healthy cooking oil like olive or sunflower oil.",
      "Heat a spoonful of vegetable oil in the skillet."
    ],
    "exampleTranslations": [
      "Sử dụng dầu ăn tốt cho tim mạch như dầu ô liu hoặc dầu hướng dương.",
      "Làm nóng một thìa dầu thực vật trong chảo nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_14",
    "word": "honey",
    "phonetic": "/ˈhʌni/",
    "definition": "A sweet, sticky yellowish-brown fluid made by honeybees from flower nectar.",
    "definitionVn": "mật ong nguyên chất",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Pure forest honey is a healthy natural sweetener.",
      "Drink warm water with honey and lemon every morning."
    ],
    "exampleTranslations": [
      "Mật ong rừng nguyên chất là chất làm ngọt tự nhiên rất tốt cho sức khỏe.",
      "Uống nước ấm pha mật ong và chanh mỗi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_15",
    "word": "mustard",
    "phonetic": "/ˈmʌstərd/",
    "definition": "A pungent paste prepared from the ground seeds of a mustard plant, eaten with meat.",
    "definitionVn": "mù tạt (gia vị cay nồng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Yellow mustard gives hotdogs and sandwiches a tangy kick.",
      "Mix a little spicy mustard with soy sauce for grilled seafood."
    ],
    "exampleTranslations": [
      "Mù tạt vàng mang lại hương vị chua cay cho xúc xích và bánh mì kẹp.",
      "Trộn một chút mù tạt cay với nước tương để chấm hải sản nướng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_16",
    "word": "curry",
    "phonetic": "/ˈkɜːri/",
    "definition": "A dish of meat, vegetables, etc., cooked in an Indian-style sauce of strong spices.",
    "definitionVn": "món cà ri, bột cà ri",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fragrant chicken curry with coconut milk is delicious with bread.",
      "Curry powder contains turmeric, cumin, and coriander."
    ],
    "exampleTranslations": [
      "Cà ri gà thơm lừng nấu nước cốt dừa ăn kèm bánh mì rất ngon.",
      "Bột cà ri gồm có nghệ, thì là và rau mùi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_17",
    "word": "flavor",
    "phonetic": "/ˈfleɪvər/",
    "definition": "The distinctive taste of a food or drink.",
    "definitionVn": "hương vị, mùi vị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fresh herbs give the soup a vibrant and natural flavor.",
      "What is your favorite ice cream flavor? — Vanilla!"
    ],
    "exampleTranslations": [
      "Các loại rau thơm tươi mang lại cho món súp một hương vị thơm ngon tự nhiên.",
      "Hương vị kem yêu thích của bạn là gì? — Vani!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_18",
    "word": "spicy",
    "phonetic": "/ˈspaɪsi/",
    "definition": "Flavored with or fragrant with spice; hot-tasting.",
    "definitionVn": "cay nồng, có vị cay",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Hue beef noodle soup is famously spicy and rich.",
      "Tell the waiter if you cannot eat spicy food."
    ],
    "exampleTranslations": [
      "Bún bò Huế nổi tiếng cay nồng và đậm đà.",
      "Hãy báo với người phục vụ nếu bạn không ăn được cay nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_19",
    "word": "bitter",
    "phonetic": "/ˈbɪtər/",
    "definition": "Having a sharp, pungent taste or smell; not sweet.",
    "definitionVn": "đắng, có vị đắng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Dark chocolate has a rich and slightly bitter taste.",
      "Bitter melon soup with minced pork is nutritious and cooling."
    ],
    "exampleTranslations": [
      "Sô cô la đen có vị đậm đà và hơi đắng nhẹ.",
      "Canh mướp đắng nhồi thịt băm rất bổ dưỡng và thanh nhiệt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_20",
    "word": "sweet",
    "phonetic": "/swiːt/",
    "definition": "Having the pleasant taste characteristic of sugar or honey; not salty or bitter.",
    "definitionVn": "ngọt ngào, có vị ngọt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Ripe fruits are naturally sweet and refreshing.",
      "Add a little honey if you like it sweeter."
    ],
    "exampleTranslations": [
      "Hoa quả chín có vị ngọt tự nhiên và thanh mát.",
      "Thêm một chút mật ong nếu bạn thích ngọt hơn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_01",
    "word": "cake",
    "phonetic": "/keɪk/",
    "definition": "An item of soft sweet food made from a mixture of flour, shortening, eggs, sugar, and other ingredients, baked and often decorated.",
    "definitionVn": "bánh ngọt, bánh sinh nhật, bánh kem",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "We blew out the candles on the birthday cake.",
      "She baked a delicious chocolate cake from scratch."
    ],
    "exampleTranslations": [
      "Chúng tôi đã cùng nhau thổi nến trên chiếc bánh sinh nhật.",
      "Cô ấy đã tự tay nướng một chiếc bánh sô cô la thơm ngon."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_02",
    "word": "cookie",
    "phonetic": "/ˈkʊki/",
    "definition": "A small sweet, crispy or chewy baked biscuit.",
    "definitionVn": "bánh quy, bánh cookie",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Freshly baked chocolate chip cookies smell wonderful.",
      "Dip the crunchy cookie into a glass of cold milk."
    ],
    "exampleTranslations": [
      "Bánh quy sô cô la chip mới nướng tỏa mùi thơm ngào ngạt.",
      "Chấm chiếc bánh quy giòn vào ly sữa lạnh nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_03",
    "word": "sandwich",
    "phonetic": "/ˈsænwɪtʃ/",
    "definition": "An item of food consisting of two pieces of bread with meat, cheese, or other filling between them.",
    "definitionVn": "bánh mì kẹp, bánh sandwich",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "I packed a ham and cheese sandwich for my school lunch.",
      "A grilled sandwich is quick, easy, and satisfying."
    ],
    "exampleTranslations": [
      "Tôi đã chuẩn bị một chiếc bánh mì kẹp giăm bông phô mai cho bữa trưa ở trường.",
      "Bánh sandwich nướng làm rất nhanh, dễ và no bụng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_04",
    "word": "croissant",
    "phonetic": "/krwɑːˈsɑːŋ/",
    "definition": "A crescent-shaped roll made of sweet flaky yeast dough, associated with France.",
    "definitionVn": "bánh sừng bò, bánh croissant",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "A buttery warm croissant with hot coffee is a classic breakfast.",
      "The pastry chef makes flaky French croissants."
    ],
    "exampleTranslations": [
      "Một chiếc bánh sừng bò ấm béo bơ cùng cà phê nóng là bữa sáng kinh điển.",
      "Đầu bếp làm bánh làm ra những chiếc bánh croissant giòn xốp kiểu Pháp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_05",
    "word": "donut",
    "phonetic": "/ˈdoʊnʌt/",
    "definition": "A small fried cake of sweetened dough, typically in the shape of a ring or ball with filling.",
    "definitionVn": "bánh rán vòng, bánh donut",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Children love colorful glazed donuts with sprinkles.",
      "He enjoyed a strawberry-filled donut with his tea."
    ],
    "exampleTranslations": [
      "Trẻ em rất thích những chiếc bánh donut phủ đường nhiều màu sắc.",
      "Anh ấy thưởng thức chiếc bánh donut nhân dâu tây cùng tách trà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_06",
    "word": "pancake",
    "phonetic": "/ˈpænkeɪk/",
    "definition": "A thin, flat cake of batter, fried on both sides in a pan and typically rolled up or topped with syrup.",
    "definitionVn": "bánh kếp, bánh rán chảo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Stack fluffy pancakes and pour maple syrup on top.",
      "Sunday morning pancakes are a beloved family tradition."
    ],
    "exampleTranslations": [
      "Xếp chồng những chiếc bánh kếp xốp mềm và rưới si-rô phong lên trên.",
      "Bánh pancake sáng Chủ Nhật là truyền thống được cả nhà yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_07",
    "word": "waffle",
    "phonetic": "/ˈwɑːfl/",
    "definition": "A small crisp batter cake, baked in a waffle iron and having a distinctive grid pattern.",
    "definitionVn": "bánh quế nướng tổ ong, waffle",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Crisp Belgian waffles topped with fresh berries and whipped cream taste heavenly.",
      "Bake waffles in the electric waffle maker."
    ],
    "exampleTranslations": [
      "Bánh waffle Bỉ giòn rụm phủ quả mọng tươi và kem tươi có vị ngon tuyệt trần.",
      "Nướng bánh waffle trong máy làm bánh tổ ong điện nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_08",
    "word": "pie",
    "phonetic": "/paɪ/",
    "definition": "A baked dish of fruit, meat, or vegetables, typically with a top and base of pastry.",
    "definitionVn": "bánh nướng có nhân, bánh pie",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Warm homemade apple pie with vanilla ice cream is a classic treat.",
      "She baked a savory chicken and mushroom pie."
    ],
    "exampleTranslations": [
      "Bánh pie táo nướng tại nhà ấm áp ăn kèm kem vani là món quà kinh điển.",
      "Cô ấy đã nướng một chiếc bánh pie nhân gà và nấm đậm đà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_09",
    "word": "pastry",
    "phonetic": "/ˈpeɪstri/",
    "definition": "A dough of flour, shortening, and water, used as a base and covering in baked dishes.",
    "definitionVn": "bánh ngọt nướng, bột ngàn lớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "The French bakery display is filled with delicate pastries.",
      "She mastered the art of making flaky puff pastry."
    ],
    "exampleTranslations": [
      "Tủ trưng bày của tiệm bánh Pháp ngập tràn các loại bánh ngọt tinh tế.",
      "Cô ấy đã thành thạo nghệ thuật làm bột ngàn lớp giòn xốp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_10",
    "word": "ice cream",
    "phonetic": "/ˈaɪs kriːm/",
    "definition": "A soft, sweet frozen food made with milk and cream and typically flavored with vanilla, fruit, or chocolate.",
    "definitionVn": "kem, kem que, kem ly",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Two scoops of chocolate ice cream on a crispy waffle cone, please!",
      "Eating cold ice cream on a hot summer day is pure bliss."
    ],
    "exampleTranslations": [
      "Cho tôi hai viên kem sô cô la trên ốc quế giòn nhé!",
      "Ăn kem mát lạnh vào ngày hè nóng nực đem lại cảm giác sướng rơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_11",
    "word": "chocolate",
    "phonetic": "/ˈtʃɔːklət/",
    "definition": "A food made from roasted and ground cacao seeds, typically sweetened and eaten as confectionery.",
    "definitionVn": "sô-cô-la",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Dark chocolate with 70% cocoa is rich in antioxidants.",
      "He gifted a heart-shaped box of fine chocolates on Valentine's Day."
    ],
    "exampleTranslations": [
      "Sô-cô-la đen với 70% ca cao rất giàu chất chống oxy hóa.",
      "Anh ấy đã tặng một hộp sô-cô-la hảo hạng hình trái tim vào ngày lễ Tình nhân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_12",
    "word": "candy",
    "phonetic": "/ˈkændi/",
    "definition": "A sweet food made with sugar or syrup combined with fruit, chocolate, or nuts.",
    "definitionVn": "kẹo ngọt, viên kẹo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Brush your teeth after eating sugary candy.",
      "The candy store has colorful lollipops and gummies."
    ],
    "exampleTranslations": [
      "Hãy đánh răng sau khi ăn kẹo ngọt nhé.",
      "Cửa hàng kẹo có những cây kẹo mút và kẹo dẻo rực rỡ sắc màu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_13",
    "word": "pudding",
    "phonetic": "/ˈpʊdɪŋ/",
    "definition": "A cooked sweet dish consisting of a soft, moist mass of food.",
    "definitionVn": "bánh pút-đinh, món tráng miệng mềm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Creamy mango pudding is a delightful tropical dessert.",
      "Top the caramel pudding with fresh mint."
    ],
    "exampleTranslations": [
      "Bánh pút-đinh xoài béo ngậy là món tráng miệng nhiệt đới tuyệt vời.",
      "Trang trí bánh pút-đinh caramel bằng lá bạc hà tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_14",
    "word": "cream",
    "phonetic": "/kriːm/",
    "definition": "The thick white or pale yellow fatty liquid which rises to the top when milk is left to stand.",
    "definitionVn": "kem tươi, váng sữa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Whip the heavy cream until soft peaks form.",
      "Add a spoonful of sweet cream to your strawberries."
    ],
    "exampleTranslations": [
      "Đánh bông kem tươi cho đến khi tạo thành chóp mềm nhé.",
      "Thêm một thìa kem ngọt vào đĩa dâu tây của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_15",
    "word": "butter",
    "phonetic": "/ˈbʌtər/",
    "definition": "A pale yellow edible fatty substance made by churning cream and used as a spread or in cooking.",
    "definitionVn": "bơ (làm từ sữa)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Spread creamy butter on warm toasted bread.",
      "Melt unsalted butter in the saucepan for baking."
    ],
    "exampleTranslations": [
      "Phết bơ béo ngậy lên bánh mì nướng nóng hổi nhé.",
      "Làm tan chảy bơ lạt trong chảo nhỏ để nướng bánh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_16",
    "word": "flour",
    "phonetic": "/ˈflaʊər/",
    "definition": "A powder obtained by grinding grain, typically wheat, and used to make bread, cakes, and pastry.",
    "definitionVn": "bột mì (làm bánh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Sift the wheat flour to ensure a light and fluffy cake.",
      "We need three cups of all-purpose flour for the dough."
    ],
    "exampleTranslations": [
      "Rây bột mì để đảm bảo bánh nở xốp và nhẹ nhé.",
      "Chúng ta cần ba cốc bột mì đa dụng cho phần bột bánh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_17",
    "word": "delicious",
    "phonetic": "/dɪˈlɪʃəs/",
    "definition": "Highly pleasant to the taste.",
    "definitionVn": "thơm ngon, ngon tuyệt cú mèo",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "This homemade blueberry cheesecake is absolutely delicious!",
      "Thank you for the delicious dinner!"
    ],
    "exampleTranslations": [
      "Chiếc bánh phô mai việt quất tự làm này ngon tuyệt cú mèo!",
      "Cảm ơn vì bữa tối thơm ngon nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_18",
    "word": "bakery",
    "phonetic": "/ˈbeɪkəri/",
    "definition": "A place where bread and cakes are made or sold.",
    "definitionVn": "tiệm bánh mì, tiệm bánh ngọt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "The neighborhood bakery opens early at 6:00 AM with fresh bread.",
      "Follow the sweet scent of baking to the local bakery."
    ],
    "exampleTranslations": [
      "Tiệm bánh gần nhà mở cửa sớm từ 6h sáng với bánh mì mới ra lò.",
      "Đi theo mùi thơm ngọt ngào của mẻ bánh nướng để đến tiệm bánh địa phương nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_19",
    "word": "dessert",
    "phonetic": "/dɪˈzɜːrt/",
    "definition": "The sweet course eaten at the end of a meal.",
    "definitionVn": "món tráng miệng (sau bữa ăn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "What would you like for dessert? — Fruit salad, please!",
      "Save room for dessert!"
    ],
    "exampleTranslations": [
      "Bạn muốn dùng món gì cho tráng miệng? — Cho tôi salad trái cây nhé!",
      "Nhớ để bụng ăn món tráng miệng nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_20",
    "word": "bake",
    "phonetic": "/beɪk/",
    "definition": "Cook food by dry heat without direct exposure to a flame, typically in an oven.",
    "definitionVn": "nướng bánh (bằng lò nướng)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "We love to bake chocolate chip cookies on rainy Sundays.",
      "Bake the cake at 175 degrees for thirty minutes."
    ],
    "exampleTranslations": [
      "Chúng tôi rất thích nướng bánh quy sô cô la chip vào những ngày Chủ Nhật mưa gió.",
      "Nướng bánh ở nhiệt độ 175 độ trong ba mươi phút nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
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
  },
  {
    "id": "bv_cleani_01",
    "word": "clean",
    "phonetic": "/kliːn/",
    "definition": "Free from dirt, marks, or unwanted matter.",
    "definitionVn": "sạch sẽ, lau dọn sạch",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Clean your study desk every evening before sleeping.",
      "The living room is sparkling clean."
    ],
    "exampleTranslations": [
      "Hãy dọn dẹp bàn học sạch sẽ mỗi tối trước khi đi ngủ nhé.",
      "Phòng khách sạch bóng như mới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_02",
    "word": "sweep",
    "phonetic": "/swiːp/",
    "definition": "Clean an area by brushing away dirt or litter with a broom.",
    "definitionVn": "quét (nhà, sân)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Sweep the floor with a soft broom every morning.",
      "She swept the dry autumn leaves off the porch."
    ],
    "exampleTranslations": [
      "Hãy quét nhà bằng một chiếc chổi mềm mỗi sáng nhé.",
      "Cô ấy đã quét sạch những chiếc lá thu khô khỏi hiên nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_03",
    "word": "mop",
    "phonetic": "/mɑːp/",
    "definition": "Clean or soak up liquid from a floor with a mop.",
    "definitionVn": "lau sàn, cây lau nhà",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Mop the tiled floor with warm soapy water.",
      "Wring out the wet mop before wiping."
    ],
    "exampleTranslations": [
      "Lau sàn gạch bằng nước xà phòng ấm nhé.",
      "Vắt ráo cây lau nhà ướt trước khi lau nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_04",
    "word": "wash",
    "phonetic": "/wɑːʃ/",
    "definition": "Clean with water and, typically, soap or detergent.",
    "definitionVn": "giặt giũ, rửa sạch",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Wash your hands thoroughly for twenty seconds.",
      "We wash our clothes in the washing machine on weekends."
    ],
    "exampleTranslations": [
      "Rửa tay thật kỹ trong hai mươi giây nhé.",
      "Chúng tôi giặt quần áo bằng máy giặt vào cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_05",
    "word": "vacuum",
    "phonetic": "/ˈvækjuːm/",
    "definition": "Clean with a vacuum cleaner.",
    "definitionVn": "hút bụi (bằng máy hút bụi)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Vacuum the living room carpet twice a week to remove dust.",
      "The cordless vacuum is lightweight and efficient."
    ],
    "exampleTranslations": [
      "Hút bụi thảm phòng khách hai lần một tuần để loại bỏ bụi bẩn.",
      "Máy hút bụi không dây rất nhẹ và hiệu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_06",
    "word": "dust",
    "phonetic": "/dʌst/",
    "definition": "Wipe the dust from furniture or surfaces.",
    "definitionVn": "quét bụi, laui bụi",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Dust the wooden bookshelf with a microfiber cloth.",
      "Wipe the window sills to keep them dust-free."
    ],
    "exampleTranslations": [
      "Lau bụi kệ sách gỗ bằng khăn sợi nhỏ nhé.",
      "Lau bậu cửa sổ để giữ chúng không bị bám bụi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_07",
    "word": "tidy",
    "phonetic": "/ˈtaɪdi/",
    "definition": "Bring order to a place by arranging things neatly.",
    "definitionVn": "ngăn nắp, dọn dẹp gọn gàng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Tidy up your bedroom before going out to play.",
      "Keep your stationery tidy inside your drawer."
    ],
    "exampleTranslations": [
      "Dọn dẹp phòng ngủ ngăn nắp trước khi ra ngoài chơi nhé.",
      "Giữ văn phòng phẩm gọn gàng trong ngăn kéo của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_08",
    "word": "trash",
    "phonetic": "/træʃ/",
    "definition": "Discarded matter; refuse; garbage.",
    "definitionVn": "rác thải, đồ bỏ đi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Throw used packaging into the designated trash bin.",
      "Never litter trash in public parks."
    ],
    "exampleTranslations": [
      "Vứt bao bì đã qua sử dụng vào đúng thùng rác quy định nhé.",
      "Không bao giờ xả rác bừa bãi ở công viên công cộng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_09",
    "word": "garbage",
    "phonetic": "/ˈɡɑːrbɪdʒ/",
    "definition": "Wasted or spoiled food and other household refuse.",
    "definitionVn": "rác sinh hoạt, rác thải gia đình",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Take out the household garbage every evening.",
      "Separate plastic recyclable items from organic garbage."
    ],
    "exampleTranslations": [
      "Hãy mang rác sinh hoạt ra ngoài đổ mỗi tối nhé.",
      "Phân loại đồ nhựa có thể tái chế khỏi rác hữu cơ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_10",
    "word": "bin",
    "phonetic": "/bɪn/",
    "definition": "A receptacle in which to deposit rubbish.",
    "definitionVn": "thùng rác (có nắp đậy)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Step on the pedal to open the kitchen trash bin.",
      "Put recyclable paper into the blue recycling bin."
    ],
    "exampleTranslations": [
      "Đạp chân vào bàn đạp để mở nắp thùng rác nhà bếp nhé.",
      "Để giấy tái chế vào thùng rác tái chế màu xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_11",
    "word": "broom",
    "phonetic": "/bruːm/",
    "definition": "A cleaning implement for sweeping, made of bundle of straw or twigs attached to a handle.",
    "definitionVn": "cây chổi (quét nhà)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "A traditional soft grass broom sweeps fine dust effortlessly.",
      "Hang the broom behind the kitchen door."
    ],
    "exampleTranslations": [
      "Cây chổi đót truyền thống quét sạch bụi mịn một cách dễ dàng.",
      "Treo cây chổi ở phía sau cánh cửa bếp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_12",
    "word": "sponge",
    "phonetic": "/spʌndʒ/",
    "definition": "A piece of a soft, light, porous substance used for washing, cleaning, or padding.",
    "definitionVn": "miếng bọt biển (rửa bát, lau chùi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Use a soft dishwashing sponge with soap to clean plates.",
      "Rinse and squeeze the sponge dry after use."
    ],
    "exampleTranslations": [
      "Dùng miếng bọt biển rửa chén mềm cùng xà phòng để rửa sạch đĩa.",
      "Rửa sạch và vắt khô miếng bọt biển sau khi sử dụng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_13",
    "word": "soap",
    "phonetic": "/soʊp/",
    "definition": "A substance used with water for washing and cleaning, made of natural oils or fats.",
    "definitionVn": "xà phòng, xà bông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Lather your hands with antibacterial soap under running water.",
      "Natural lavender soap has a calming fragrance."
    ],
    "exampleTranslations": [
      "Xoa xà phòng kháng khuẩn tạo bọt dưới vòi nước chảy nhé.",
      "Xà phòng hoa oải hương tự nhiên có mùi thơm thư giãn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_14",
    "word": "detergent",
    "phonetic": "/dɪˈtɜːrdʒənt/",
    "definition": "A water-soluble cleansing substance that combines with impurities and dirt to make them more soluble.",
    "definitionVn": "nước giặt, bột giặt, chất tẩy rửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Pour liquid laundry detergent into the washing machine dispenser.",
      "Eco-friendly detergents protect sensitive skin."
    ],
    "exampleTranslations": [
      "Rót nước giặt vào khay chứa của máy giặt nhé.",
      "Nước giặt thân thiện với môi trường bảo vệ làn da nhạy cảm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_15",
    "word": "towel",
    "phonetic": "/ˈtaʊəl/",
    "definition": "A piece of thick absorbent cloth or paper used for drying oneself or wiping things.",
    "definitionVn": "chiếc khăn tắm, khăn lau",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Dry your hands with a clean cotton towel.",
      "Hang the damp bath towel on the rack to dry."
    ],
    "exampleTranslations": [
      "Lau khô tay bằng một chiếc khăn cotton sạch nhé.",
      "Treo chiếc khăn tắm ẩm lên giá để khô nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_16",
    "word": "laundry",
    "phonetic": "/ˈlɔːndri/",
    "definition": "Clothes and linen that need to be washed or that have been newly washed.",
    "definitionVn": "quần áo cần giặt, việc giặt giũ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Put dirty clothes in the laundry basket.",
      "We do our family laundry on Saturday mornings."
    ],
    "exampleTranslations": [
      "Để quần áo bẩn vào trong giỏ giặt nhé.",
      "Chúng tôi giặt quần áo cho cả nhà vào sáng thứ Bảy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_17",
    "word": "iron",
    "phonetic": "/ˈaɪərn/",
    "definition": "Smooth clothes with a heated flat-bottomed iron.",
    "definitionVn": "ủi đồ, là quần áo",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Iron your white shirt before going to school or work.",
      "Be careful with the hot steam iron."
    ],
    "exampleTranslations": [
      "Ủi phẳng chiếc áo sơ mi trắng trước khi đi học hoặc đi làm nhé.",
      "Hãy cẩn thận với chiếc bàn là hơi nước nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_18",
    "word": "fold",
    "phonetic": "/foʊld/",
    "definition": "Bend something over on itself so that one part of it covers another.",
    "definitionVn": "gấp, xếp (quần áo, chăn màn)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Fold the clean clothes neatly and put them in the wardrobe.",
      "Fold your blanket every morning after waking up."
    ],
    "exampleTranslations": [
      "Gấp quần áo sạch thật gọn gàng và cất vào tủ nhé.",
      "Gấp chăn mỗi sáng sau khi thức dậy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_19",
    "word": "wipe",
    "phonetic": "/waɪp/",
    "definition": "Clean or dry something by rubbing its surface with a cloth, paper, or one's hand.",
    "definitionVn": "lau chùi, chùi sạch",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Wipe the dining table clean after every meal.",
      "Wipe away the spilled water immediately."
    ],
    "exampleTranslations": [
      "Lau sạch bàn ăn sau mỗi bữa ăn nhé.",
      "Hãy lau sạch chỗ nước bị đổ ra ngay lập tức nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_20",
    "word": "chore",
    "phonetic": "/tʃɔːr/",
    "definition": "A routine task, especially a household one.",
    "definitionVn": "việc nhà, công việc vặt hàng ngày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Sharing household chores makes family life harmonious.",
      "Washing dishes and taking out the trash are daily chores."
    ],
    "exampleTranslations": [
      "Chia sẻ công việc nhà giúp cuộc sống gia đình thêm hòa thuận.",
      "Rửa bát và đổ rác là những việc nhà hàng ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_01",
    "word": "ring",
    "phonetic": "/rɪŋ/",
    "definition": "A small circular band, typically of precious metal, worn on a finger as an ornament.",
    "definitionVn": "chiếc nhẫn (đeo tay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She wears a delicate silver ring on her finger.",
      "The wedding ring symbolizes eternal love."
    ],
    "exampleTranslations": [
      "Cô ấy đeo một chiếc nhẫn bạc thanh nhã trên ngón tay.",
      "Chiếc nhẫn cưới tượng trưng cho tình yêu vĩnh cửu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_02",
    "word": "necklace",
    "phonetic": "/ˈnekləs/",
    "definition": "An ornamental chain or string of beads, jewels, or links worn around the neck.",
    "definitionVn": "dây chuyền, vòng cổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She received a graceful pearl necklace on her graduation.",
      "The gold necklace sparkles in the light."
    ],
    "exampleTranslations": [
      "Cô ấy đã nhận được một chuỗi vòng ngọc trai trang nhã nhân ngày tốt nghiệp.",
      "Sợi dây chuyền vàng lấp lánh dưới ánh đèn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_03",
    "word": "bracelet",
    "phonetic": "/ˈbreɪslət/",
    "definition": "An ornamental band, hoop, or chain worn on the wrist or arm.",
    "definitionVn": "vòng tay, lắc tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She bought a handcrafted jade bracelet in Hoi An.",
      "The silver bracelet matches her watch."
    ],
    "exampleTranslations": [
      "Cô ấy đã mua một chiếc vòng ngọc bích thủ công ở Hội An.",
      "Chiếc lắc tay bạc rất hợp với đồng hồ của cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_04",
    "word": "earring",
    "phonetic": "/ˈɪrɪŋ/",
    "definition": "A piece of jewelry worn on the lobe or edge of the ear.",
    "definitionVn": "đôi khuyên tai, bông tai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She put on sparkling diamond stud earrings for the gala.",
      "Small gold hoop earrings are timeless."
    ],
    "exampleTranslations": [
      "Cô ấy đeo đôi khuyên tai đính kim cương lấp lánh đến dạ tiệc.",
      "Những đôi bông tai tròn bằng vàng nhỏ nhắn luôn đẹp mãi với thời gian."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_05",
    "word": "belt",
    "phonetic": "/belt/",
    "definition": "A strip of leather or other material worn around the waist to support or hold in clothes.",
    "definitionVn": "thắt lưng, dây nịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "He fastened a classic black leather belt around his trousers.",
      "Choose a belt that matches the color of your dress shoes."
    ],
    "exampleTranslations": [
      "Anh ấy thắt một chiếc dây nịt da đen cổ điển quanh quần âu.",
      "Hãy chọn một chiếc thắt lưng có màu hợp với giày tây của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_06",
    "word": "scarf",
    "phonetic": "/skɑːrf/",
    "definition": "A length of fabric worn around the neck or head for warmth, sun protection, or decoration.",
    "definitionVn": "khăn quàng cổ, khăn choàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Wrap a warm wool scarf around your neck in cold weather.",
      "She wore a lightweight silk scarf in spring."
    ],
    "exampleTranslations": [
      "Quàng một chiếc khăn len ấm quanh cổ vào mùa lạnh nhé.",
      "Cô ấy quàng chiếc khăn lụa mỏng nhẹ vào mùa xuân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_07",
    "word": "glove",
    "phonetic": "/ɡlʌv/",
    "definition": "A covering for the hand made of cloth or leather, with separate parts for each finger.",
    "definitionVn": "đôi găng tay, bao tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Wear leather gloves to keep your hands warm when riding a motorbike in winter.",
      "Put on rubber cleaning gloves before washing dishes."
    ],
    "exampleTranslations": [
      "Đeo găng tay da để giữ ấm đôi bàn tay khi đi xe máy vào mùa đông nhé.",
      "Đeo găng tay cao su trước khi rửa chén nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_08",
    "word": "handbag",
    "phonetic": "/ˈhændbæɡ/",
    "definition": "A small bag used by women to hold money and personal items.",
    "definitionVn": "túi xách tay (nữ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She carries her wallet and lipstick inside her stylish handbag.",
      "The brown leather handbag matches her outfit."
    ],
    "exampleTranslations": [
      "Cô ấy để ví tiền và son môi trong chiếc túi xách tay phong cách của mình.",
      "Chiếc túi xách da màu nâu rất hợp với trang phục của cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_09",
    "word": "sunglasses",
    "phonetic": "/ˈsʌnɡlæsɪz/",
    "definition": "Glasses tinted to protect the eyes from sunlight or glare.",
    "definitionVn": "kính râm, kính mát chống nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Wear UV-protection sunglasses when going to the sunny beach.",
      "He put on stylish dark sunglasses."
    ],
    "exampleTranslations": [
      "Hãy đeo kính râm chống tia UV khi đi dạo trên bãi biển đầy nắng nhé.",
      "Anh ấy đeo một chiếc kính mát màu tối rất phong cách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_10",
    "word": "tie",
    "phonetic": "/taɪ/",
    "definition": "A strip of material worn around the neck and tied in a knot at the front, with its ends hanging down.",
    "definitionVn": "cà-vạt, ca vát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "He wore a navy blue silk tie with his formal suit.",
      "Learn how to tie a neat Windsor knot."
    ],
    "exampleTranslations": [
      "Anh ấy đã đeo một chiếc cà vạt lụa màu xanh navy cùng bộ vest trang trọng.",
      "Hãy học cách thắt nút cà vạt kiểu Windsor gọn gàng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_11",
    "word": "zipper",
    "phonetic": "/ˈzɪpər/",
    "definition": "A fastening device consisting of two parallel tracks of teeth that can be interlocked by a sliding tab.",
    "definitionVn": "khóa kéo, dây kéo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Zip up the jacket zipper to keep out the cold wind.",
      "The backpack has sturdy metal zippers."
    ],
    "exampleTranslations": [
      "Kéo khóa kéo áo khoác lên để cản gió lạnh nhé.",
      "Chiếc ba lô có những chiếc khóa kéo kim loại rất chắc chắn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_12",
    "word": "button",
    "phonetic": "/ˈbʌtn/",
    "definition": "A small disc or knob sewn on to a garment, either to fasten it by being pushed through a buttonhole or for decoration.",
    "definitionVn": "chiếc cúc áo, khuy áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Fasten all the shirt buttons neatly.",
      "She sewed a loose button back onto her coat."
    ],
    "exampleTranslations": [
      "Cài tất cả các cúc áo sơ mi thật gọn gàng nhé.",
      "Cô ấy đã khâu chiếc khuy bị lỏng lại vào áo khoác."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_13",
    "word": "pocket",
    "phonetic": "/ˈpɑːkɪt/",
    "definition": "A small bag sewn into or on clothing so as to form a pouch for carrying small articles.",
    "definitionVn": "chiếc túi áo, túi quần",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Keep your keys safely inside your zippered pocket.",
      "He put his hands in his coat pockets to stay warm."
    ],
    "exampleTranslations": [
      "Để chùm chìa khóa an toàn trong chiếc túi có khóa kéo nhé.",
      "Anh ấy cho tay vào túi áo khoác để giữ ấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_14",
    "word": "silk",
    "phonetic": "/sɪlk/",
    "definition": "A fine, strong, soft lustrous fiber produced by silkworms in making cocoons.",
    "definitionVn": "lụa tơ tằm, tơ lụa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Van Phuc Silk Village in Hanoi is famous for high-quality Vietnamese silk.",
      "A natural silk scarf is soft and breathable."
    ],
    "exampleTranslations": [
      "Làng lụa Vạn Phúc ở Hà Nội nổi tiếng với lụa Việt Nam chất lượng cao.",
      "Một chiếc khăn lụa tự nhiên rất mềm mại và thoáng khí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_15",
    "word": "leather",
    "phonetic": "/ˈleðər/",
    "definition": "A material made from the skin of an animal by tanning or a similar process.",
    "definitionVn": "chất liệu da (da thật)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Genuine leather shoes are durable, comfortable, and elegant.",
      "He bought a handcrafted brown leather wallet."
    ],
    "exampleTranslations": [
      "Giày da thật rất bền, đi êm chân và lịch sự.",
      "Anh ấy đã mua một chiếc ví da màu nâu làm thủ công."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_16",
    "word": "wool",
    "phonetic": "/wʊl/",
    "definition": "The fine soft curly or wavy hair forming the coat of a sheep, goat, or similar animal.",
    "definitionVn": "len, lông cừu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "A thick wool sweater keeps you warm on freezing winter days.",
      "She knit a warm wool beanie hat."
    ],
    "exampleTranslations": [
      "Chiếc áo len dày giữ cho bạn ấm áp trong những ngày đông giá rét.",
      "Cô ấy đã đan một chiếc mũ len ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_17",
    "word": "umbrella",
    "phonetic": "/ʌmˈbrelə/",
    "definition": "A folding canopy supported by metal ribs on a handle, used for protection from rain or sun.",
    "definitionVn": "chiếc ô, chiếc dù che mưa nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Carry a compact folding umbrella in your backpack.",
      "She opened her colorful umbrella during the sudden downpour."
    ],
    "exampleTranslations": [
      "Mang theo một chiếc ô gập nhỏ gọn trong ba lô nhé.",
      "Cô ấy đã mở chiếc ô rực rỡ sắc màu trong cơn mưa rào bất chợt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_18",
    "word": "jewelry",
    "phonetic": "/ˈdʒuːəlri/",
    "definition": "Personal ornaments, such as necklaces, rings, or bracelets, that are typically made from or contain jewels and precious metal.",
    "definitionVn": "trang sức, nữ trang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Store valuable gold and silver jewelry in a locked velvet box.",
      "She appreciates minimalist and handmade jewelry."
    ],
    "exampleTranslations": [
      "Cất giữ đồ trang sức vàng bạc quý giá trong chiếc hộp nhung có khóa nhé.",
      "Cô ấy yêu thích những món đồ trang sức tối giản và làm thủ công."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_19",
    "word": "watch",
    "phonetic": "/wɑːtʃ/",
    "definition": "A small timepiece worn typically on a strap on one's wrist.",
    "definitionVn": "đồng hồ đeo tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Check the time on your wrist watch before entering the exam room.",
      "A smartwatch tracks your daily footsteps and heart rate."
    ],
    "exampleTranslations": [
      "Kiểm tra giờ trên đồng hồ đeo tay trước khi vào phòng thi nhé.",
      "Đồng hồ thông minh theo dõi số bước chân và nhịp tim hàng ngày của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_20",
    "word": "wallet",
    "phonetic": "/ˈwɑːlɪt/",
    "definition": "A pocket-sized flat folding case for holding money and plastic cards.",
    "definitionVn": "ví tiền, bóp tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Keep your identity card and banknotes securely inside your wallet.",
      "He took out his wallet to pay for the groceries."
    ],
    "exampleTranslations": [
      "Giữ căn cước công dân và tiền giấy an toàn trong ví nhé.",
      "Anh ấy đã lấy ví ra để thanh toán tiền mua hàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_01",
    "word": "bed",
    "phonetic": "/bed/",
    "definition": "A piece of furniture for sleep or rest, typically a framework with a mattress and coverings.",
    "definitionVn": "chiếc giường ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Make your bed neatly every morning when you wake up.",
      "A comfortable bed promotes deep, restful sleep."
    ],
    "exampleTranslations": [
      "Hãy gấp chăn dọn giường gọn gàng mỗi sáng khi thức dậy nhé.",
      "Một chiếc giường thoải mái thúc đẩy giấc ngủ sâu và ngon giấc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_02",
    "word": "mattress",
    "phonetic": "/ˈmætrəs/",
    "definition": "A fabric case filled with deformable or resilient material, used for sleeping on.",
    "definitionVn": "chiếc đệm, nệm ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "A medium-firm latex mattress supports your back properly.",
      "We bought a new memory-foam mattress for the guest room."
    ],
    "exampleTranslations": [
      "Một chiếc nệm cao su có độ cứng vừa phải nâng đỡ cột sống lưng rất tốt.",
      "Chúng tôi đã mua một chiếc đệm mút mới cho phòng ngủ cho khách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_03",
    "word": "pillow",
    "phonetic": "/ˈpɪloʊ/",
    "definition": "A rectangular cloth bag stuffed with feathers, foam, or other soft materials, used to support the head when lying or sleeping.",
    "definitionVn": "chiếc gối (kê đầu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Rest your head on a soft, supportive pillow.",
      "She fluffed the feather pillows before going to bed."
    ],
    "exampleTranslations": [
      "Tựa đầu lên một chiếc gối mềm mại và nâng đỡ êm ái nhé.",
      "Cô ấy vỗ bồng những chiếc gối lông vũ trước khi đi ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_04",
    "word": "blanket",
    "phonetic": "/ˈblæŋkɪt/",
    "definition": "A large piece of woolen or other material used as a warm covering on a bed.",
    "definitionVn": "chiếc chăn ấm, mền đắp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Pull up the warm fleece blanket on chilly winter nights.",
      "Fold the blanket neatly at the foot of the bed."
    ],
    "exampleTranslations": [
      "Kéo chiếc chăn nỉ ấm lên đắp trong những đêm đông se lạnh nhé.",
      "Gấp chiếc chăn gọn gàng ở cuối chân giường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_05",
    "word": "sheet",
    "phonetic": "/ʃiːt/",
    "definition": "A large rectangular piece of cotton or other fabric, used on a bed to lay on or under.",
    "definitionVn": "ga trải giường, drap giường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Change the bed sheets once a week for fresh hygiene.",
      "Crisp clean cotton sheets feel cool against the skin."
    ],
    "exampleTranslations": [
      "Thay ga trải giường mỗi tuần một lần để đảm bảo vệ sinh nhé.",
      "Những tấm ga trải giường bằng cotton sạch sẽ mang lại cảm giác mát mịn trên da."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_06",
    "word": "quilt",
    "phonetic": "/kwɪlt/",
    "definition": "A warm bed covering made of padding enclosed between layers of fabric and kept in place by lines of stitching.",
    "definitionVn": "chăn bông chần, chăn ấm dày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "A thick down quilt keeps you cozy even in sub-zero weather.",
      "Grandmother stitched a colorful patchwork quilt."
    ],
    "exampleTranslations": [
      "Một chiếc chăn bông lông vũ dày giữ cho bạn ấm cúng ngay cả trong thời tiết dưới 0 độ.",
      "Bà đã chần một chiếc chăn bông ghép vải nhiều màu sắc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_07",
    "word": "cushion",
    "phonetic": "/ˈkʊʃn/",
    "definition": "A soft bag of cloth stuffed with a mass of soft material, used as a comfortable support for sitting or leaning on.",
    "definitionVn": "gối tựa lưng, đệm ngồi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Place colorful decorative cushions on the bedroom armchair.",
      "Rest your back against a soft cushion while reading."
    ],
    "exampleTranslations": [
      "Đặt những chiếc gối tựa trang trí nhiều màu sắc lên ghế bành phòng ngủ nhé.",
      "Tựa lưng vào chiếc gối mềm khi đọc sách nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_08",
    "word": "wardrobe",
    "phonetic": "/ˈwɔːrdroʊb/",
    "definition": "A large, tall cabinet in which clothes may be hung or stored.",
    "definitionVn": "tủ quần áo (đứng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Hang your ironed shirts neatly inside the wooden wardrobe.",
      "Organize your winter coats inside the spacious wardrobe."
    ],
    "exampleTranslations": [
      "Treo những chiếc áo sơ mi đã ủi phẳng ngăn nắp trong tủ quần áo gỗ nhé.",
      "Sắp xếp áo khoác mùa đông gọn gàng trong chiếc tủ quần áo rộng rãi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_09",
    "word": "closet",
    "phonetic": "/ˈklɑːzɪt/",
    "definition": "A small room or cupboard in which items are stored, especially clothes.",
    "definitionVn": "tủ âm tường, phòng để quần áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "The master bedroom features a walk-in clothes closet.",
      "Store seasonal shoes in the bottom of the closet."
    ],
    "exampleTranslations": [
      "Phòng ngủ chính có một phòng để quần áo âm tường rộng rãi.",
      "Cất giày dép theo mùa ở dưới đáy tủ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_10",
    "word": "drawer",
    "phonetic": "/drɔːr/",
    "definition": "A box-like storage compartment without a lid, made to slide horizontally in and out of a piece of furniture.",
    "definitionVn": "ngăn kéo (tủ, bàn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Keep clean socks and underwear in the top dresser drawer.",
      "Slide the wooden drawer closed quietly."
    ],
    "exampleTranslations": [
      "Cất tất sạch và đồ lót trong ngăn kéo trên cùng của tủ nhé.",
      "Trượt nhẹ đóng ngăn kéo gỗ lại thật êm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_11",
    "word": "curtain",
    "phonetic": "/ˈkɜːrtn/",
    "definition": "A piece of material suspended at the top to form a screen, typically movable across a window.",
    "definitionVn": "rèm cửa sổ, màn che",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Draw the blackout curtains to block morning light for sleeping.",
      "She opened the window curtains to let in fresh sunlight."
    ],
    "exampleTranslations": [
      "Kéo rèm cản sáng để che ánh nắng sớm cho giấc ngủ nhé.",
      "Cô ấy mở rèm cửa sổ để đón ánh nắng sớm trong lành."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_12",
    "word": "alarm clock",
    "phonetic": "/əˈlɑːrm klɑːk/",
    "definition": "A clock that can be set to sound an alarm at a desired time.",
    "definitionVn": "đồng hồ báo thức",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Set your alarm clock for 6:30 AM so you are not late for class.",
      "The alarm clock rang cheerfully on the bedside table."
    ],
    "exampleTranslations": [
      "Đặt đồng hồ báo thức lúc 6h30 sáng để không bị muộn học nhé.",
      "Chiếc đồng hồ báo thức reo vang vui vẻ trên bàn đầu giường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_13",
    "word": "nightstand",
    "phonetic": "/ˈnaɪtstænd/",
    "definition": "A small, low bedside table, typically having drawers.",
    "definitionVn": "bàn đầu giường, tab đầu giường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Keep a lamp, your book, and a glass of water on your nightstand.",
      "Charge your smartphone on the bedside nightstand."
    ],
    "exampleTranslations": [
      "Đặt đèn ngủ, cuốn sách và một ly nước trên bàn đầu giường nhé.",
      "Sạc điện thoại trên chiếc tab đầu giường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_14",
    "word": "sleep",
    "phonetic": "/sliːp/",
    "definition": "A natural periodic state of rest for mind and body.",
    "definitionVn": "ngủ, giấc ngủ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Aim to sleep for eight hours of quality rest every night.",
      "Turn off digital screens thirty minutes before going to sleep."
    ],
    "exampleTranslations": [
      "Hãy hướng tới việc ngủ đủ 8 tiếng nghỉ ngơi chất lượng mỗi đêm nhé.",
      "Tắt các màn hình điện tử 30 phút trước khi đi ngủ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_15",
    "word": "dream",
    "phonetic": "/driːm/",
    "definition": "A series of thoughts, images, and sensations occurring in a person's mind during sleep.",
    "definitionVn": "giấc mơ, giấc chiêm bao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "I had a pleasant and colorful dream about traveling last night.",
      "Follow your dreams with determination."
    ],
    "exampleTranslations": [
      "Đêm qua tôi đã có một giấc mơ đẹp và ngập tràn màu sắc về việc đi du lịch.",
      "Hãy theo đuổi những ước mơ của bạn với lòng quyết tâm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_16",
    "word": "yawn",
    "phonetic": "/jɔːn/",
    "definition": "Involuntarily open one's mouth wide and inhale deeply due to tiredness or boredom.",
    "definitionVn": "ngáp (khi buồn ngủ)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Cover your mouth with your hand when you yawn politely.",
      "The sleepy child gave a big yawn and rubbed her eyes."
    ],
    "exampleTranslations": [
      "Hãy lấy tay che miệng khi ngáp để lịch sự nhé.",
      "Đứa trẻ buồn ngủ ngáp một cái thật to và dụi mắt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_17",
    "word": "nap",
    "phonetic": "/næp/",
    "definition": "A short sleep, especially during the day.",
    "definitionVn": "giấc ngủ trưa, chợp mắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "A short 20-minute power nap in the afternoon boosts energy and focus.",
      "The cat took a cozy nap in the sunlit patch."
    ],
    "exampleTranslations": [
      "Một giấc chợp mắt ngắn 20 phút vào buổi trưa giúp tăng cường năng lượng và sự tập trung.",
      "Chú mèo ngủ một giấc ngon lành dưới vạt nắng ấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_18",
    "word": "wake up",
    "phonetic": "/weɪk ʌp/",
    "definition": "Emerge or cause to emerge from sleep; stop sleeping.",
    "definitionVn": "thức giấc, tỉnh dậy",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "I wake up refreshed and energized every morning at 6:00 AM.",
      "Wake up, breakfast is ready on the table!"
    ],
    "exampleTranslations": [
      "Tôi thức giấc sảng khoái và tràn đầy năng lượng mỗi sáng lúc 6h.",
      "Dậy đi nào, bữa sáng đã sẵn sàng trên bàn rồi!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_19",
    "word": "snore",
    "phonetic": "/snɔːr/",
    "definition": "Breathe with a snorting or grunting sound while asleep.",
    "definitionVn": "ngáy (khi ngủ say)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "He slept so soundly that he started to snore gently.",
      "Sleeping on your side can reduce snoring."
    ],
    "exampleTranslations": [
      "Anh ấy ngủ say đến mức bắt đầu ngáy nhè nhẹ.",
      "Nằm nghiêng có thể giúp giảm tiếng ngáy khi ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_20",
    "word": "cozy",
    "phonetic": "/ˈkoʊzi/",
    "definition": "Giving a feeling of comfort, warmth, and relaxation.",
    "definitionVn": "ấm cúng, êm ái dễ chịu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "My bedroom is small, quiet, and very cozy.",
      "Curling up with a good book under a blanket is so cozy."
    ],
    "exampleTranslations": [
      "Phòng ngủ của tôi nhỏ nhắn, yên tĩnh và vô cùng ấm cúng.",
      "Cuộn mình đọc một cuốn sách hay dưới chăn ấm thật êm ái dễ chịu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_01",
    "word": "bathroom",
    "phonetic": "/ˈbæθruːm/",
    "definition": "A room containing a toilet, sink, and typically also a bath or shower.",
    "definitionVn": "phòng tắm, phòng vệ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Keep the bathroom clean, dry, and well-ventilated.",
      "Wash your hands thoroughly in the bathroom before eating."
    ],
    "exampleTranslations": [
      "Giữ phòng tắm luôn sạch sẽ, khô ráo và thoáng khí nhé.",
      "Rửa tay thật sạch trong phòng tắm trước khi ăn cơm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_02",
    "word": "shower",
    "phonetic": "/ˈʃaʊər/",
    "definition": "An apparatus which produces a spray of water for bathing.",
    "definitionVn": "vòi hoa sen, tắm vòi sen",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Taking a warm shower in the evening washes away daily fatigue.",
      "Step into the shower and turn on the water."
    ],
    "exampleTranslations": [
      "Tắm vòi sen nước ấm vào buổi tối giúp xua tan mệt mỏi trong ngày.",
      "Bước vào buồng tắm và bật vòi hoa sen lên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_03",
    "word": "bathtub",
    "phonetic": "/ˈbæθtʌb/",
    "definition": "A tub, usually installed in a bathroom, in which to bathe.",
    "definitionVn": "bồn tắm (nằm ngâm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Soak in a warm bubble bathtub to relax tense muscles.",
      "Fill the bathtub with soothing warm water."
    ],
    "exampleTranslations": [
      "Ngâm mình trong bồn tắm bọt nước ấm để thư giãn cơ bắp căng thẳng nhé.",
      "Xả đầy nước ấm êm dịu vào bồn tắm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_04",
    "word": "toilet",
    "phonetic": "/ˈtɔɪlət/",
    "definition": "A fixed receptacle consisting of a bowl and a flushing mechanism, used for urination and defecation.",
    "definitionVn": "bồn cầu, bệ vệ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Flush the toilet and put the lid down after use.",
      "Always keep the toilet bowl disinfected and clean."
    ],
    "exampleTranslations": [
      "Nhấn xả nước bồn cầu và đậy nắp lại sau khi sử dụng nhé.",
      "Luôn luôn giữ bồn cầu được khử khuẩn sạch sẽ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_05",
    "word": "sink",
    "phonetic": "/sɪŋk/",
    "definition": "A fixed basin with a water supply and a drain, used for washing hands and face.",
    "definitionVn": "bồn rửa mặt, lavabo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Wash your face with gentle cleanser over the bathroom sink.",
      "Clean the white ceramic sink regularly."
    ],
    "exampleTranslations": [
      "Rửa mặt bằng sữa rửa mặt dịu nhẹ trên bồn rửa mặt nhé.",
      "Lau chùi bồn rửa mặt bằng sứ trắng thường xuyên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_06",
    "word": "faucet",
    "phonetic": "/ˈfɔːsɪt/",
    "definition": "A device by which a flow of liquid from a pipe can be controlled; a tap.",
    "definitionVn": "vòi nước (vặn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Turn off the faucet tightly while brushing your teeth to save water.",
      "The chrome faucet shines brightly."
    ],
    "exampleTranslations": [
      "Khóa chặt vòi nước trong khi đánh răng để tiết kiệm nước nhé.",
      "Chiếc vòi nước mạ crom sáng bóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_07",
    "word": "towel",
    "phonetic": "/ˈtaʊəl/",
    "definition": "A piece of thick absorbent cloth used for drying oneself after washing.",
    "definitionVn": "chiếc khăn tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Dry your skin gently with a soft fluffy cotton towel.",
      "Hang the damp towel on the rack to air out."
    ],
    "exampleTranslations": [
      "Lau khô da nhẹ nhàng bằng một chiếc khăn cotton mềm xốp nhé.",
      "Treo chiếc khăn ẩm lên giá để thoáng khí nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_08",
    "word": "shampoo",
    "phonetic": "/ʃæmˈpuː/",
    "definition": "A liquid preparation for washing the hair.",
    "definitionVn": "dầu gội đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Massage herbal shampoo gently into your scalp.",
      "Rinse out all the shampoo lather with warm water."
    ],
    "exampleTranslations": [
      "Mát-xa dầu gội thảo dược nhẹ nhàng lên da đầu nhé.",
      "Xả sạch bọt dầu gội bằng nước ấm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_09",
    "word": "soap",
    "phonetic": "/soʊp/",
    "definition": "A substance used with water for washing and cleaning, made of natural oils or fats.",
    "definitionVn": "xà phòng, bánh xà bông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Wash your hands with antibacterial soap for 20 seconds.",
      "Natural handmade goat milk soap is moisturizing."
    ],
    "exampleTranslations": [
      "Rửa tay bằng xà phòng kháng khuẩn trong 20 giây nhé.",
      "Xà phòng sữa dê thủ công tự nhiên giúp dưỡng ẩm rất tốt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_10",
    "word": "toothpaste",
    "phonetic": "/ˈtuːθpeɪst/",
    "definition": "A paste used on a toothbrush for cleaning the teeth.",
    "definitionVn": "kem đánh răng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Squeeze a pea-sized amount of fluoride toothpaste onto your brush.",
      "Mint toothpaste leaves your breath fresh and cool."
    ],
    "exampleTranslations": [
      "Bóp một lượng kem đánh răng có chứa fluor bằng hạt đậu lên bàn chải nhé.",
      "Kem đánh răng vị bạc hà giúp hơi thở thơm tho và mát lạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_11",
    "word": "toothbrush",
    "phonetic": "/ˈtuːθbrʌʃ/",
    "definition": "A small brush with a long handle, used for cleaning the teeth.",
    "definitionVn": "bàn chải đánh răng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Replace your toothbrush every three months for optimal oral health.",
      "Brush your teeth with soft bristles twice a day."
    ],
    "exampleTranslations": [
      "Thay bàn chải đánh răng mỗi ba tháng một lần để chăm sóc răng miệng tốt nhất nhé.",
      "Đánh răng bằng lông bàn chải mềm hai lần một ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_12",
    "word": "hairdryer",
    "phonetic": "/ˈherdraɪər/",
    "definition": "An electrical device for blowing hot or warm air over damp hair to dry it.",
    "definitionVn": "máy sấy tóc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Blow-dry your wet hair on a cool setting with the hairdryer.",
      "Unplug the hairdryer after you finish styling."
    ],
    "exampleTranslations": [
      "Sấy khô tóc ướt ở chế độ mát bằng máy sấy tóc nhé.",
      "Rút phích cắm máy sấy tóc sau khi tạo kiểu xong nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_13",
    "word": "comb",
    "phonetic": "/koʊm/",
    "definition": "A strip of plastic, metal, or wood with a row of narrow teeth, used for untangling or styling the hair.",
    "definitionVn": "cây lược (chải tóc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Gently untangle your hair with a wide-tooth wooden comb.",
      "Comb your hair neatly before going to school."
    ],
    "exampleTranslations": [
      "Gỡ rối tóc nhẹ nhàng bằng một chiếc lược gỗ răng thưa nhé.",
      "Chải tóc thật gọn gàng trước khi đi học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_14",
    "word": "brush",
    "phonetic": "/brʌʃ/",
    "definition": "An implement with a handle, consisting of bristles, used for hair styling or teeth cleaning.",
    "definitionVn": "bàn chải tóc, cọ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Brush your hair smoothly from roots to tips.",
      "A soft round hair brush adds volume to hair."
    ],
    "exampleTranslations": [
      "Chải tóc suôn mượt từ chân đến ngọn nhé.",
      "Một chiếc bàn chải tóc tròn mềm giúp tạo độ bồng bềnh cho mái tóc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_15",
    "word": "razor",
    "phonetic": "/ˈreɪzər/",
    "definition": "An instrument with a sharp blade or combination of blades, used to remove unwanted body hair, especially facial hair.",
    "definitionVn": "dao cạo râu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Apply shaving cream before using a safety razor.",
      "Keep sharp razors safely away from small children."
    ],
    "exampleTranslations": [
      "Thoa bọt cạo râu trước khi dùng dao cạo an toàn nhé.",
      "Để dao cạo sắc bén xa tầm với của trẻ nhỏ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_16",
    "word": "tissue",
    "phonetic": "/ˈtɪʃuː/",
    "definition": "A piece of soft, absorbent paper used as a disposable handkerchief or wipe.",
    "definitionVn": "khăn giấy, giấy ăn rút",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Use a soft tissue to wipe your nose when you sneeze.",
      "Always carry a small pocket pack of tissues."
    ],
    "exampleTranslations": [
      "Dùng khăn giấy mềm để lau mũi khi hắt xì nhé.",
      "Hãy luôn mang theo một gói khăn giấy bỏ túi nhỏ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_17",
    "word": "bath",
    "phonetic": "/bæθ/",
    "definition": "An act of washing oneself in a bath or under a shower.",
    "definitionVn": "tắm rửa, bồn tắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Take a warm relaxing bath before going to bed.",
      "The baby giggled happily during her warm evening bath."
    ],
    "exampleTranslations": [
      "Tắm nước ấm thư giãn trước khi đi ngủ nhé.",
      "Em bé khúc khích cười vui vẻ trong giờ tắm nước ấm buổi tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_18",
    "word": "wash",
    "phonetic": "/wɑːʃ/",
    "definition": "Clean with water and, typically, soap or detergent.",
    "definitionVn": "rửa, tắm rửa, giặt giũ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Wash your hands with soap before preparing meals.",
      "She washed her face with cold water to wake up."
    ],
    "exampleTranslations": [
      "Rửa tay bằng xà phòng trước khi chuẩn bị bữa ăn nhé.",
      "Cô ấy rửa mặt bằng nước lạnh để tỉnh táo hơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_19",
    "word": "dry",
    "phonetic": "/draɪ/",
    "definition": "Free from moisture or liquid; not wet or moist.",
    "definitionVn": "khô ráo, lau khô",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Dry your wet hands completely with a clean towel.",
      "Hang the bath mat out in the sun to dry."
    ],
    "exampleTranslations": [
      "Lau khô đôi bàn tay ướt hoàn toàn bằng khăn sạch nhé.",
      "Phơi thảm phòng tắm ngoài nắng cho khô nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bathro_20",
    "word": "hygiene",
    "phonetic": "/ˈhaɪdʒiːn/",
    "definition": "Conditions or practices conducive to maintaining health and preventing disease, especially through cleanliness.",
    "definitionVn": "vệ sinh cá nhân, vệ sinh phòng dịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bathroom_toiletries",
    "themeNameVn": "Phòng tắm & Vệ sinh",
    "themeNameEn": "Bathroom & Toiletries",
    "examples": [
      "Good personal hygiene protects you and your family from illnesses.",
      "Teach children proper handwashing hygiene from an early age."
    ],
    "exampleTranslations": [
      "Vệ sinh cá nhân tốt giúp bảo vệ bạn và gia đình khỏi bệnh tật.",
      "Dạy trẻ nhỏ thói quen vệ sinh rửa tay đúng cách từ sớm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_01",
    "word": "pain",
    "phonetic": "/peɪn/",
    "definition": "Physical suffering or discomfort caused by illness or injury.",
    "definitionVn": "cơn đau, nỗi đau đớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Tell the doctor exactly where you feel the sharp pain.",
      "Gentle stretching relieves muscular back pain."
    ],
    "exampleTranslations": [
      "Hãy nói cho bác sĩ biết chính xác chỗ bạn cảm thấy đau nhói nhé.",
      "Kéo giãn cơ nhẹ nhàng giúp giảm đau lưng cơ bắp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_02",
    "word": "itch",
    "phonetic": "/ɪtʃ/",
    "definition": "An uncomfortable sensation on the skin that causes a desire to scratch.",
    "definitionVn": "ngứa ngáy, cơn ngứa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Apply soothing lotion to relieve the itchy insect bite.",
      "Do not scratch the itch with dirty fingernails."
    ],
    "exampleTranslations": [
      "Thoa kem làm dịu để giảm cơn ngứa do côn trùng cắn nhé.",
      "Đừng gãi chỗ ngứa bằng móng tay bẩn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_03",
    "word": "sweat",
    "phonetic": "/swet/",
    "definition": "Moisture exuded through the pores of the skin, typically in profuse drops as a reaction to heat or physical exertion.",
    "definitionVn": "mồ hôi, toát mồ hôi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Wipe the sweat from your forehead with a towel after running.",
      "Sweating helps cool the body down naturally."
    ],
    "exampleTranslations": [
      "Lau mồ hôi trên trán bằng khăn sau khi chạy bộ nhé.",
      "Toát mồ hôi giúp làm mát cơ thể một cách tự nhiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_04",
    "word": "shiver",
    "phonetic": "/ˈʃɪvər/",
    "definition": "Shake slightly and uncontrollably as a result of being cold, frightened, or excited.",
    "definitionVn": "run rẩy (vì lạnh, sợ)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "He began to shiver in the cold winter rain.",
      "Put on a warm wool coat so you don't shiver."
    ],
    "exampleTranslations": [
      "Cậu ấy bắt đầu run lên bần bật trong cơn mưa đông lạnh giá.",
      "Mặc áo khoác len ấm vào để không bị run rẩy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_05",
    "word": "dizzy",
    "phonetic": "/ˈdɪzi/",
    "definition": "Having or involving a sensation of spinning around and losing one's balance.",
    "definitionVn": "chóng mặt, hoa mắt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Sit down and drink water if you feel dizzy in the hot sun.",
      "Standing up too quickly can make you feel slightly dizzy."
    ],
    "exampleTranslations": [
      "Hãy ngồi xuống và uống nước nếu bạn thấy chóng mặt dưới nắng gắt nhé.",
      "Đứng dậy quá nhanh có thể làm bạn thấy hơi hoa mắt chóng mặt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_06",
    "word": "sleepy",
    "phonetic": "/ˈsliːpi/",
    "definition": "Needing or ready for sleep.",
    "definitionVn": "buồn ngủ, ngái ngủ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "I feel sleepy after studying for three hours straight.",
      "The warm glass of milk made the child sleepy."
    ],
    "exampleTranslations": [
      "Tôi thấy buồn ngủ sau khi học bài suốt ba tiếng liên tục.",
      "Ly sữa ấm đã làm cho đứa trẻ cảm thấy buồn ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_07",
    "word": "exhausted",
    "phonetic": "/ɪɡˈzɔːstɪd/",
    "definition": "Completely drained of physical or mental energy; extremely tired.",
    "definitionVn": "kiệt sức, mệt lử",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "The marathon runner collapsed across the finish line, completely exhausted.",
      "Rest well tonight if you feel exhausted."
    ],
    "exampleTranslations": [
      "Vận động viên marathon ngã quỵ qua vạch đích, hoàn toàn kiệt sức.",
      "Hãy nghỉ ngơi thật tốt tối nay nếu bạn thấy mệt lử nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_08",
    "word": "full",
    "phonetic": "/fʊl/",
    "definition": "Having eaten to one's satisfaction or capacity.",
    "definitionVn": "no bụng, no nê",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "I am completely full; thank you for the wonderful meal!",
      "Don't eat too fast so you know when you are comfortably full."
    ],
    "exampleTranslations": [
      "Tôi đã no căng bụng rồi; cảm ơn vì bữa ăn tuyệt vời nhé!",
      "Đừng ăn quá nhanh để bạn biết khi nào mình đã no vừa vặn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_09",
    "word": "hungry",
    "phonetic": "/ˈhʌŋɡri/",
    "definition": "Feeling or displaying the need for food.",
    "definitionVn": "đói bụng, cồn cào",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "My stomach is rumbling because I am so hungry.",
      "Let's grab a healthy snack if you are hungry."
    ],
    "exampleTranslations": [
      "Bụng tôi đang réo ùng ục vì tôi quá đói rồi.",
      "Cùng kiếm món ăn nhẹ lành mạnh nếu bạn đang đói nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_10",
    "word": "thirsty",
    "phonetic": "/ˈθɜːrsti/",
    "definition": "Feeling a need to drink liquid.",
    "definitionVn": "khát nước, háo nước",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "After a long walk in the sun, we were incredibly thirsty.",
      "Carry a water bottle so you never get thirsty."
    ],
    "exampleTranslations": [
      "Sau chuyến đi bộ dài dưới nắng, chúng tôi vô cùng khát nước.",
      "Mang theo bình nước để bạn không bao giờ bị khát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_11",
    "word": "numb",
    "phonetic": "/nʌm/",
    "definition": "Deprived of the power of sensation; unable to feel anything.",
    "definitionVn": "tê cóng, tê bì (tay chân)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "My fingers were numb from holding ice cubes.",
      "Rub your hands together to warm up numb fingers."
    ],
    "exampleTranslations": [
      "Các ngón tay của tôi bị tê cóng vì cầm đá viên.",
      "Xoa hai bàn tay vào nhau để làm ấm những ngón tay bị tê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_12",
    "word": "breath",
    "phonetic": "/breθ/",
    "definition": "The air taken into the lungs and then expelled during breathing.",
    "definitionVn": "hơi thở, nhịp thở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Take a slow, deep breath to calm your mind.",
      "Hold your breath for a few seconds underwater."
    ],
    "exampleTranslations": [
      "Hãy hít một hơi thật sâu và chậm rãi để tâm trí bình tĩnh lại nhé.",
      "Nín thở vài giây khi ở dưới nước nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_13",
    "word": "cough",
    "phonetic": "/kɔːf/",
    "definition": "Expel air from the lungs with a sudden sharp sound.",
    "definitionVn": "ho, tiếng ho",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Cover your mouth with your elbow when you cough.",
      "Drink warm honey water to soothe a persistent cough."
    ],
    "exampleTranslations": [
      "Hãy lấy khuỷu tay che miệng khi ho nhé.",
      "Uống nước mật ong ấm để làm dịu cơn ho dai dẳng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_14",
    "word": "sneeze",
    "phonetic": "/sniːz/",
    "definition": "Make a sudden involuntary expulsion of air through the nose and mouth.",
    "definitionVn": "hắt xì hơi, hắt hơi",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Say 'Bless you!' when someone sneezes politely.",
      "Cover your nose with a clean tissue when you sneeze."
    ],
    "exampleTranslations": [
      "Hãy nói 'Bless you!' khi ai đó hắt xì hơi thật lịch sự nhé.",
      "Che mũi bằng khăn giấy sạch khi bạn hắt hơi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_15",
    "word": "yawn",
    "phonetic": "/jɔːn/",
    "definition": "Involuntarily open one's mouth wide and inhale deeply due to tiredness.",
    "definitionVn": "ngáp ngủ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Yawning is a natural sign that your body needs sleep.",
      "She stifled a yawn during the long afternoon lecture."
    ],
    "exampleTranslations": [
      "Ngáp là dấu hiệu tự nhiên cho thấy cơ thể bạn cần được ngủ nghỉ.",
      "Cô ấy kìm một cái ngáp trong bài giảng dài buổi chiều."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_16",
    "word": "cry",
    "phonetic": "/kraɪ/",
    "definition": "Shed tears, typically as an expression of distress, pain, or sorrow.",
    "definitionVn": "khóc, rơi nước mắt",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "It is okay to cry and let out your emotions when you are sad.",
      "The baby cried because she was hungry."
    ],
    "exampleTranslations": [
      "Khóc và giải tỏa cảm xúc khi bạn buồn là chuyện hoàn toàn bình thường.",
      "Em bé khóc vì em bị đói."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_17",
    "word": "laugh",
    "phonetic": "/læf/",
    "definition": "Make the spontaneous sounds and movements of the face and body that are the instinctive expressions of lively amusement.",
    "definitionVn": "cười, cười vang vui vẻ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Laughing together with friends is the best medicine for the soul.",
      "The hilarious comedy made everyone laugh out loud."
    ],
    "exampleTranslations": [
      "Cùng cười vang với bạn bè là liều thuốc tốt nhất cho tâm hồn.",
      "Vở hài kịch vui nhộn khiến mọi người cười nghiêng ngả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_18",
    "word": "relax",
    "phonetic": "/rɪˈlæks/",
    "definition": "Make or become less tense or anxious.",
    "definitionVn": "thư giãn, thả lỏng cơ thể",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Take a warm bath and listen to acoustic music to relax.",
      "Relax your shoulders and breathe deeply."
    ],
    "exampleTranslations": [
      "Tắm nước ấm và nghe nhạc mộc để thư giãn nhé.",
      "Thả lỏng đôi vai và hít thở thật sâu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_19",
    "word": "freeze",
    "phonetic": "/friːz/",
    "definition": "Be turned into ice or another solid as a result of extreme cold; be very cold.",
    "definitionVn": "đóng băng, lạnh cóng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "Water freezes into solid ice at zero degrees Celsius.",
      "Put on thick mittens before your hands freeze."
    ],
    "exampleTranslations": [
      "Nước đóng băng thành đá rắn ở 0 độ C.",
      "Đeo găng tay dày vào trước khi đôi tay bạn bị lạnh cóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bodily_20",
    "word": "warm",
    "phonetic": "/wɔːrm/",
    "definition": "Of or at a fairly or comfortably high temperature.",
    "definitionVn": "ấm áp, làm ấm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bodily_sensations",
    "themeNameVn": "Cảm giác cơ thể",
    "themeNameEn": "Bodily Sensations",
    "examples": [
      "A cup of warm ginger tea feels comforting on a rainy day.",
      "Warm your hands near the heater."
    ],
    "exampleTranslations": [
      "Một tách trà gừng ấm đem lại cảm giác dễ chịu trong ngày mưa.",
      "Làm ấm đôi bàn tay gần lò sưởi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_01",
    "word": "joy",
    "phonetic": "/dʒɔɪ/",
    "definition": "A feeling of great pleasure and happiness.",
    "definitionVn": "niềm vui sướng, hân hoan",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Children's laughter brings pure joy to the family home.",
      "She jumped for joy when she received the scholarship."
    ],
    "exampleTranslations": [
      "Tiếng cười của trẻ thơ mang lại niềm vui sướng thuần khiết cho tổ ấm gia đình.",
      "Cô ấy nhảy cẫng lên vì vui sướng khi nhận được học bổng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_02",
    "word": "hope",
    "phonetic": "/hoʊp/",
    "definition": "A feeling of expectation and desire for a certain thing to happen.",
    "definitionVn": "hy vọng, niềm hy vọng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Never lose hope even in challenging times.",
      "We hope for a bright and peaceful future for all."
    ],
    "exampleTranslations": [
      "Đừng bao giờ đánh mất hy vọng ngay cả trong những thời điểm khó khăn.",
      "Chúng ta hy vọng vào một tương lai tươi sáng và hòa bình cho tất cả mọi người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_03",
    "word": "fear",
    "phonetic": "/fɪr/",
    "definition": "An unpleasant emotion caused by the belief that someone or something is dangerous, likely to cause pain.",
    "definitionVn": "nỗi sợ hãi, e sợ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Courage is not the absence of fear, but triumph over it.",
      "She overcame her fear of public speaking."
    ],
    "exampleTranslations": [
      "Dũng cảm không phải là không có nỗi sợ, mà là chiến thắng nỗi sợ đó.",
      "Cô ấy đã vượt qua nỗi sợ nói trước đám đông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_04",
    "word": "surprise",
    "phonetic": "/sərˈpraɪz/",
    "definition": "An unexpected or astonishing event, fact, or thing.",
    "definitionVn": "sự ngạc nhiên, điều bất ngờ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "The surprise birthday party made him smile broadly.",
      "Her fluent English accent took everyone by surprise."
    ],
    "exampleTranslations": [
      "Bữa tiệc sinh nhật bất ngờ đã khiến anh ấy cười tươi rạng rỡ.",
      "Khả năng nói tiếng Anh lưu loát của cô ấy khiến mọi người vô cùng ngạc nhiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_05",
    "word": "wonder",
    "phonetic": "/ˈwʌndər/",
    "definition": "A feeling of surprise mingled with admiration, caused by something beautiful or unexpected.",
    "definitionVn": "sự kỳ diệu, kinh ngạc ngưỡng mộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Children look at the starry night sky with wide-eyed wonder.",
      "Ha Long Bay is one of the natural wonders of the world."
    ],
    "exampleTranslations": [
      "Trẻ em ngước nhìn bầu trời đêm đầy sao với sự kinh ngạc tròn xoe đôi mắt.",
      "Vịnh Hạ Long là một trong những kỳ quan thiên nhiên của thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_06",
    "word": "proud",
    "phonetic": "/praʊd/",
    "definition": "Feeling deep pleasure or satisfaction as a result of one's own achievements or qualities.",
    "definitionVn": "tự hào, hãnh diện",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Parents are deeply proud of their children's achievements.",
      "Feel proud of the English progress you make every single day."
    ],
    "exampleTranslations": [
      "Cha mẹ vô cùng tự hào về những thành tựu của con cái.",
      "Hãy tự hào về những tiến bộ tiếng Anh mà bạn đạt được mỗi ngày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_07",
    "word": "jealous",
    "phonetic": "/ˈdʒeləs/",
    "definition": "Feeling or showing envy of someone or their achievements and advantages.",
    "definitionVn": "ghen tị, đố kỵ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Don't feel jealous of others; focus on your own personal growth.",
      "He was jealous of his friend's new bicycle."
    ],
    "exampleTranslations": [
      "Đừng ghen tị với người khác; hãy tập trung vào sự phát triển của chính mình.",
      "Cậu ấy từng ghen tị với chiếc xe đạp mới của bạn mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_08",
    "word": "lonely",
    "phonetic": "/ˈloʊnli/",
    "definition": "Sad because one has no friends or company.",
    "definitionVn": "cô đơn, lẻ loi",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Reach out to a friendly community when you feel lonely.",
      "A good book keeps you from feeling lonely."
    ],
    "exampleTranslations": [
      "Hãy kết nối với một cộng đồng thân thiện khi bạn thấy cô đơn nhé.",
      "Một cuốn sách hay giúp bạn không cảm thấy lẻ loi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_09",
    "word": "nervous",
    "phonetic": "/ˈnɜːrvəs/",
    "definition": "Easily agitated or alarmed; anxious about something.",
    "definitionVn": "lo lắng, hồi hộp",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Take three deep breaths if you feel nervous before a presentation.",
      "It is normal to feel nervous on your first day of school."
    ],
    "exampleTranslations": [
      "Hãy hít ba hơi thật sâu nếu bạn thấy hồi hộp trước bài thuyết trình nhé.",
      "Cảm thấy lo lắng trong ngày đầu đi học là chuyện hoàn toàn bình thường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_10",
    "word": "confident",
    "phonetic": "/ˈkɑːnfɪdənt/",
    "definition": "Feeling or showing confidence in oneself; self-assured.",
    "definitionVn": "tự tin, bản lĩnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Practice speaking daily to become a confident English communicator.",
      "She walked onto the stage with a confident smile."
    ],
    "exampleTranslations": [
      "Hãy luyện nói hàng ngày để trở thành một người giao tiếp tiếng Anh tự tin nhé.",
      "Cô ấy bước lên sân khấu với một nụ cười đầy tự tin."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_11",
    "word": "calm",
    "phonetic": "/kɑːm/",
    "definition": "Not showing or feeling nervousness, anger, or other strong emotions.",
    "definitionVn": "điềm tĩnh, bình tĩnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Stay calm and think clearly during challenging situations.",
      "The captain remained calm throughout the storm."
    ],
    "exampleTranslations": [
      "Hãy giữ điềm tĩnh và suy nghĩ sáng suốt trong các tình huống thử thách nhé.",
      "Người thuyền trưởng vẫn bình tĩnh suốt cơn giông bão."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_12",
    "word": "grateful",
    "phonetic": "/ˈɡreɪtfl/",
    "definition": "Feeling or showing an appreciation of kindness; thankful.",
    "definitionVn": "biết ơn, trân trọng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "I am deeply grateful for my teacher's kind guidance.",
      "Being grateful for small daily blessings brings lasting happiness."
    ],
    "exampleTranslations": [
      "Tôi vô cùng biết ơn sự chỉ bảo tận tình của thầy giáo.",
      "Biết ơn những điều giản dị mỗi ngày mang lại hạnh phúc bền lâu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_13",
    "word": "bored",
    "phonetic": "/bɔːrd/",
    "definition": "Feeling weary and restless through lack of interest.",
    "definitionVn": "buồn chán, chán ngắt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "If you are feeling bored, pick up a good English novel to read.",
      "The long wait made the children bored."
    ],
    "exampleTranslations": [
      "Nếu bạn thấy buồn chán, hãy cầm một cuốn tiểu thuyết tiếng Anh hay lên đọc nhé.",
      "Thời gian chờ đợi lâu làm lũ trẻ thấy chán ngắt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_14",
    "word": "anxious",
    "phonetic": "/ˈæŋkʃəs/",
    "definition": "Experiencing worry, unease, or nervousness, typically about an imminent event or something with an uncertain outcome.",
    "definitionVn": "lo âu, bồn chồn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Students often feel anxious before major exam results are released.",
      "Meditation helps ease anxious thoughts."
    ],
    "exampleTranslations": [
      "Học sinh thường thấy lo âu bồn chồn trước khi công bố kết quả kỳ thi lớn.",
      "Thiền định giúp xoa dịu những suy nghĩ lo âu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_15",
    "word": "embarrassed",
    "phonetic": "/ɪmˈbærəst/",
    "definition": "Feeling awkward, self-conscious, or ashamed.",
    "definitionVn": "ngượng ngùng, xấu hổ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Don't feel embarrassed when you make a mistake; it is part of learning.",
      "She blushed and felt embarrassed when she tripped."
    ],
    "exampleTranslations": [
      "Đừng ngượng ngùng khi mắc lỗi nhé; đó là một phần của việc học tập.",
      "Cô ấy đỏ mặt ngượng ngùng khi bị vấp ngã."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_16",
    "word": "satisfied",
    "phonetic": "/ˈsætɪsfaɪd/",
    "definition": "Contented; pleased with what has been achieved or done.",
    "definitionVn": "hài lòng, thỏa mãn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "The customer was completely satisfied with the quality service.",
      "He gave a satisfied nod after tasting the dish."
    ],
    "exampleTranslations": [
      "Vị khách hàng hoàn toàn hài lòng với dịch vụ chất lượng.",
      "Anh ấy gật đầu hài lòng sau khi nếm thử món ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_17",
    "word": "disappointed",
    "phonetic": "/ˌdɪsəˈpɔɪntɪd/",
    "definition": "Sad or displeased because someone or something has failed to fulfill one's hopes or expectations.",
    "definitionVn": "thất vọng, buồn lòng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Don't be disappointed by a setback; try again with more practice.",
      "He was disappointed when the football match was canceled."
    ],
    "exampleTranslations": [
      "Đừng thất vọng bởi một lần vấp ngã nhé; hãy thử lại với sự luyện tập chăm chỉ hơn.",
      "Anh ấy rất thất vọng khi trận bóng đá bị hủy bỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_18",
    "word": "enthusiastic",
    "phonetic": "/ɪnˌθuːziˈæstɪk/",
    "definition": "Having or showing intense and eager enjoyment, interest, or approval.",
    "definitionVn": "hào hứng, nhiệt huyết",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "The students are enthusiastic about the English speaking contest.",
      "She greeted new members with an enthusiastic welcome."
    ],
    "exampleTranslations": [
      "Các bạn học sinh rất hào hứng với cuộc thi hùng biện tiếng Anh.",
      "Cô ấy chào đón các thành viên mới bằng sự nồng nhiệt đầy nhiệt huyết."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_19",
    "word": "curious",
    "phonetic": "/ˈkjʊriəs/",
    "definition": "Eager to know or learn something.",
    "definitionVn": "tò mò, ham học hỏi",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Children are naturally curious about the world around them.",
      "Stay curious and ask questions to expand your mind."
    ],
    "exampleTranslations": [
      "Trẻ em vốn có tính tò mò tự nhiên về thế giới xung quanh.",
      "Hãy luôn tò mò và đặt câu hỏi để mở mang trí tuệ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_feelin_20",
    "word": "love",
    "phonetic": "/lʌv/",
    "definition": "An intense feeling of deep affection.",
    "definitionVn": "tình yêu thương, yêu quý",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_feelings_attitudes",
    "themeNameVn": "Cảm xúc & Thái độ",
    "themeNameEn": "Feelings & Attitudes",
    "examples": [
      "Love and kindness make the world a warmer place.",
      "Family love provides unconditional support throughout life."
    ],
    "exampleTranslations": [
      "Tình yêu thương và lòng nhân ái làm cho thế giới trở nên ấm áp hơn.",
      "Tình yêu gia đình đem lại sự chở che vô điều kiện suốt cuộc đời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_01",
    "word": "best friend",
    "phonetic": "/best frend/",
    "definition": "A person's closest and dearest friend.",
    "definitionVn": "bạn thân nhất, tri kỷ",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My best friend always supports me through thick and thin.",
      "We have been best friends since primary school."
    ],
    "exampleTranslations": [
      "Bạn thân nhất của tôi luôn sát cánh bên tôi dù lúc vui hay buồn.",
      "Chúng tôi là bạn thân nhất từ thuở tiểu học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_02",
    "word": "neighbor",
    "phonetic": "/ˈneɪbər/",
    "definition": "A person living near or next door to the speaker or person referred to.",
    "definitionVn": "người hàng xóm, láng giềng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Friendly neighbors make the community feel like home.",
      "Our neighbor helped water our plants while we were on vacation."
    ],
    "exampleTranslations": [
      "Những người hàng xóm thân thiện làm cho khu phố ấm cúng như tổ ấm.",
      "Hàng xóm đã giúp tưới cây cho chúng tôi khi chúng tôi đi nghỉ mát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_03",
    "word": "partner",
    "phonetic": "/ˈpɑːrtnər/",
    "definition": "A person with whom one is associated in a relationship or activity.",
    "definitionVn": "bạn đồng hành, đối tác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Practice speaking English with your study partner every day.",
      "They are reliable business partners."
    ],
    "exampleTranslations": [
      "Hãy luyện nói tiếng Anh với người bạn đồng hành của bạn mỗi ngày nhé.",
      "Họ là những đối tác kinh doanh đáng tin cậy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_04",
    "word": "classmate",
    "phonetic": "/ˈklæsmeɪt/",
    "definition": "A fellow member of a class at school, college, or university.",
    "definitionVn": "bạn cùng lớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My classmates and I worked on a group project together.",
      "Help your classmates when they struggle with a lesson."
    ],
    "exampleTranslations": [
      "Tôi và các bạn cùng lớp đã cùng nhau làm một dự án nhóm.",
      "Hãy giúp đỡ các bạn cùng lớp khi họ gặp khó khăn trong bài học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_05",
    "word": "roommate",
    "phonetic": "/ˈruːmmeɪt/",
    "definition": "A person with whom one shares a room or apartment.",
    "definitionVn": "bạn cùng phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My university roommate is tidy, polite, and considerate.",
      "We share grocery expenses with our roommates."
    ],
    "exampleTranslations": [
      "Bạn cùng phòng đại học của tôi rất ngăn nắp, lễ phép và biết nghĩ cho người khác.",
      "Chúng tôi chia sẻ tiền mua đồ ăn cùng các bạn cùng phòng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_06",
    "word": "colleague",
    "phonetic": "/ˈkɑːliːɡ/",
    "definition": "A person with whom one works in a profession or business.",
    "definitionVn": "đồng nghiệp (ở công sở)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "My colleagues gave me a warm welcome on my first day at work.",
      "Collaborate effectively with your work colleagues."
    ],
    "exampleTranslations": [
      "Các đồng nghiệp đã chào đón tôi rất nồng nhiệt trong ngày đầu đi làm.",
      "Hãy hợp tác hiệu quả với các đồng nghiệp tại nơi làm việc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_07",
    "word": "boss",
    "phonetic": "/bɔːs/",
    "definition": "A person in charge of an employee or an organization.",
    "definitionVn": "sếp, người quản lý, thủ trưởng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "A good boss inspires and empowers team members.",
      "She discussed her project proposal with her boss."
    ],
    "exampleTranslations": [
      "Một người sếp tốt luôn truyền cảm hứng và trao quyền cho các thành viên trong nhóm.",
      "Cô ấy đã thảo luận đề xuất dự án với sếp của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_08",
    "word": "guest",
    "phonetic": "/ɡest/",
    "definition": "A person who is invited to visit the home of or take part in an activity organized by another.",
    "definitionVn": "khách mời, khách quý",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "We welcomed dinner guests with warm tea and fruits.",
      "Treat every guest with genuine Vietnamese hospitality."
    ],
    "exampleTranslations": [
      "Chúng tôi chào đón khách mời ăn tối bằng trà ấm và hoa quả.",
      "Hãy đối đãi với mọi vị khách bằng lòng hiếu khách chân thành của người Việt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_09",
    "word": "host",
    "phonetic": "/hoʊst/",
    "definition": "A person who receives or entertains other people as guests.",
    "definitionVn": "chủ nhà, người đăng cai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "The gracious host made sure everyone was comfortable.",
      "Vietnam proudly hosted the international sports tournament."
    ],
    "exampleTranslations": [
      "Người chủ nhà ân cần đảm bảo cho tất cả mọi người đều cảm thấy thoải mái.",
      "Việt Nam tự hào là nước đăng cai giải thể thao quốc tế."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_10",
    "word": "stranger",
    "phonetic": "/ˈstreɪndʒər/",
    "definition": "A person whom one does not know or with whom one is not familiar.",
    "definitionVn": "người lạ, người chưa quen",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Never accept rides or gifts from strangers.",
      "A kind stranger helped me find the right bus stop."
    ],
    "exampleTranslations": [
      "Không bao giờ đi nhờ xe hoặc nhận quà từ người lạ nhé.",
      "Một người lạ tốt bụng đã giúp tôi tìm đúng trạm dừng xe buýt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_11",
    "word": "crowd",
    "phonetic": "/kraʊd/",
    "definition": "A large number of people gathered together in a disorganized or unruly way.",
    "definitionVn": "đám đông, dòng người",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "A cheerful crowd gathered to watch the festive fireworks.",
      "Stay close to your family in busy crowds."
    ],
    "exampleTranslations": [
      "Một đám đông vui tươi đã tụ họp lại để ngắm pháo hoa rực rỡ.",
      "Hãy ở gần gia đình khi đi giữa những đám đông đông đúc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_12",
    "word": "couple",
    "phonetic": "/ˈkʌpl/",
    "definition": "Two people who are married, engaged, or otherwise closely associated romantically.",
    "definitionVn": "cặp đôi, đôi vợ chồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "The young couple took wedding photos near the lake.",
      "The couple celebrated their silver wedding anniversary."
    ],
    "exampleTranslations": [
      "Cặp đôi trẻ chụp ảnh cưới bên bờ hồ.",
      "Đôi vợ chồng đã kỷ niệm đám cưới bạc của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_13",
    "word": "team",
    "phonetic": "/tiːm/",
    "definition": "A group of players forming one side in a competitive game or sport; a group of people working together.",
    "definitionVn": "đội, nhóm làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Teamwork divides the task and multiplies the success.",
      "Our football team practiced hard for the final."
    ],
    "exampleTranslations": [
      "Làm việc nhóm giúp chia sẻ gánh nặng công việc và nhân đôi thành công.",
      "Đội bóng đá của chúng tôi đã tập luyện chăm chỉ cho trận chung kết."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_14",
    "word": "group",
    "phonetic": "/ɡruːp/",
    "definition": "A number of people or things that are located close together or are considered or classed together.",
    "definitionVn": "hội nhóm, nhóm người",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Join an English speaking group to practice daily.",
      "The study group meets at the library on Saturdays."
    ],
    "exampleTranslations": [
      "Tham gia một nhóm luyện nói tiếng Anh để thực hành mỗi ngày nhé.",
      "Nhóm học tập họp mặt tại thư viện vào các ngày thứ Bảy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_15",
    "word": "trust",
    "phonetic": "/trʌst/",
    "definition": "Firm belief in the reliability, truth, ability, or strength of someone or something.",
    "definitionVn": "sự tin tưởng, lòng tin",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Trust is the solid foundation of all lasting friendships.",
      "Always keep your promises to maintain trust."
    ],
    "exampleTranslations": [
      "Lòng tin là nền tảng vững chắc của mọi tình bạn lâu bền.",
      "Hãy luôn giữ lời hứa để duy trì sự tin tưởng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_16",
    "word": "respect",
    "phonetic": "/rɪˈspekt/",
    "definition": "A feeling of deep admiration for someone or something elicited by their abilities, qualities, or achievements.",
    "definitionVn": "sự kính trọng, tôn trọng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Show respect to elders, teachers, and parents.",
      "Mutual respect makes collaboration smooth."
    ],
    "exampleTranslations": [
      "Hãy thể hiện sự kính trọng đối với người lớn tuổi, thầy cô và cha mẹ nhé.",
      "Sự tôn trọng lẫn nhau giúp việc hợp tác trở nên suôn sẻ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_17",
    "word": "share",
    "phonetic": "/ʃer/",
    "definition": "Have a portion of something with another or others.",
    "definitionVn": "chia sẻ, san sẻ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Sharing knowledge and experiences enriches everyone.",
      "Children learned to share their toys generously."
    ],
    "exampleTranslations": [
      "Chia sẻ kiến thức và kinh nghiệm làm phong phú thêm cho tất cả mọi người.",
      "Trẻ em đã học được cách chia sẻ đồ chơi một cách rộng lượng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_18",
    "word": "care",
    "phonetic": "/ker/",
    "definition": "Feel concern or interest; attach importance to something.",
    "definitionVn": "quan tâm, chăm sóc",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "True friends care about each other's feelings and wellbeing.",
      "Care for nature by reducing waste."
    ],
    "exampleTranslations": [
      "Những người bạn chân chính luôn quan tâm đến cảm xúc và sức khỏe của nhau.",
      "Hãy chăm sóc thiên nhiên bằng cách giảm thiểu rác thải nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_19",
    "word": "meet",
    "phonetic": "/miːt/",
    "definition": "Arrange or happen to come into the presence or company of someone.",
    "definitionVn": "gặp gỡ, hẹn gặp",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Let's meet at the bookstore at 3:00 PM.",
      "I was thrilled to meet my favorite English author in person."
    ],
    "exampleTranslations": [
      "Cùng gặp nhau ở hiệu sách lúc 3h chiều nhé.",
      "Tôi đã vô cùng phấn khởi khi được gặp trực tiếp tác giả tiếng Anh yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_relati_20",
    "word": "relationship",
    "phonetic": "/rɪˈleɪʃnʃɪp/",
    "definition": "The way in which two or more concepts, objects, or people are connected, or the state of being connected.",
    "definitionVn": "mối quan hệ, tình cảm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_relationships_social",
    "themeNameVn": "Mối quan hệ & Xã hội",
    "themeNameEn": "Social Relationships",
    "examples": [
      "Cultivate healthy and supportive relationships in life.",
      "Open communication strengthens any relationship."
    ],
    "exampleTranslations": [
      "Hãy vun đắp những mối quan hệ lành mạnh và tương trợ trong cuộc sống nhé.",
      "Giao tiếp cởi mở giúp củng cố mọi mối quan hệ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_01",
    "word": "talk",
    "phonetic": "/tɔːk/",
    "definition": "Speak in order to give information or express ideas.",
    "definitionVn": "nói chuyện, trò chuyện",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Let's sit down and talk about your study plan.",
      "Talking to native speakers boosts your confidence."
    ],
    "exampleTranslations": [
      "Cùng ngồi xuống và trò chuyện về kế hoạch học tập của bạn nhé.",
      "Nói chuyện với người bản ngữ giúp tăng cường sự tự tin của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_02",
    "word": "chat",
    "phonetic": "/tʃæt/",
    "definition": "Talk in a friendly and informal way.",
    "definitionVn": "tán gẫu, tán chuyện thân mật",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "We chatted over coffee about our favorite hobbies.",
      "Send a quick online message to chat with friends."
    ],
    "exampleTranslations": [
      "Chúng tôi tán gẫu bên ly cà phê về những sở thích yêu thích.",
      "Gửi một tin nhắn trực tuyến nhanh để trò chuyện với bạn bè nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_03",
    "word": "discuss",
    "phonetic": "/dɪˈskʌs/",
    "definition": "Talk about something with another person or in a group.",
    "definitionVn": "thảo luận, bàn bạc",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "The students discussed the English reading topic lively.",
      "We need to discuss our travel budget."
    ],
    "exampleTranslations": [
      "Các học sinh đã thảo luận sôi nổi về chủ đề bài đọc tiếng Anh.",
      "Chúng ta cần bàn bạc về ngân sách chuyến đi du lịch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_04",
    "word": "whisper",
    "phonetic": "/ˈwɪspər/",
    "definition": "Speak very softly using one's breath without one's vocal cords.",
    "definitionVn": "thì thầm, nói nhỏ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Whisper quietly in the library so you do not disturb readers.",
      "She leaned in and whispered a secret."
    ],
    "exampleTranslations": [
      "Hãy nói thì thầm trong thư viện để không làm phiền bạn đọc nhé.",
      "Cô ấy ghé sát tai và thì thầm một bí mật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_05",
    "word": "shout",
    "phonetic": "/ʃaʊt/",
    "definition": "Utter a loud call or cry, typically as an expression of a strong emotion.",
    "definitionVn": "hét to, la hét, reo hò",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Fans shouted excitedly when the national team scored.",
      "There is no need to shout; I can hear you clearly."
    ],
    "exampleTranslations": [
      "Người hâm mộ reo hò phấn khích khi đội tuyển quốc gia ghi bàn.",
      "Không cần phải nói to hét lên đâu; tôi nghe bạn rất rõ rồi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_06",
    "word": "ask",
    "phonetic": "/æsk/",
    "definition": "Say something in order to obtain information or request someone to do something.",
    "definitionVn": "hỏi, đặt câu hỏi, yêu cầu",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Always ask the teacher if you don't understand a grammar point.",
      "May I ask you a quick question?"
    ],
    "exampleTranslations": [
      "Hãy luôn hỏi thầy cô nếu bạn không hiểu một điểm ngữ pháp nào nhé.",
      "Tôi có thể hỏi bạn một câu hỏi nhanh được không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_07",
    "word": "answer",
    "phonetic": "/ˈænsər/",
    "definition": "A thing said, written, or done to deal with or as a reaction to a question.",
    "definitionVn": "câu trả lời, lời giải đáp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Raise your hand to give the correct answer.",
      "The teacher explained the detailed answer clearly."
    ],
    "exampleTranslations": [
      "Hãy giơ tay để đưa ra câu trả lời chính xác nhé.",
      "Thầy giáo đã giải thích câu trả lời chi tiết rất rõ ràng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_08",
    "word": "reply",
    "phonetic": "/rɪˈplaɪ/",
    "definition": "Say or write something as an answer to someone.",
    "definitionVn": "hồi đáp, trả lời thư/tin nhắn",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Please reply to the invitation email by Friday.",
      "She replied promptly with a warm message."
    ],
    "exampleTranslations": [
      "Làm ơn hồi đáp thư mời qua email trước thứ Sáu nhé.",
      "Cô ấy đã trả lời lại ngay lập tức bằng một tin nhắn ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_09",
    "word": "explain",
    "phonetic": "/ɪkˈspleɪn/",
    "definition": "Make an idea, situation, or problem clear to someone by describing it in more detail.",
    "definitionVn": "giải thích, diễn giải",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Can you explain the meaning of this new vocabulary word?",
      "The teacher explained the formula step by step."
    ],
    "exampleTranslations": [
      "Bạn có thể giải thích ý nghĩa của từ vựng mới này không?",
      "Thầy giáo đã giải thích công thức từng bước một."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_10",
    "word": "letter",
    "phonetic": "/ˈletər/",
    "definition": "A written, typed, or printed communication, sent in an envelope by post or messenger.",
    "definitionVn": "lá thư (tay), thư tín",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Writing a handwritten letter to a friend is heartfelt and personal.",
      "I received a cheerful letter from my pen pal."
    ],
    "exampleTranslations": [
      "Viết một lá thư tay gửi cho bạn bè thật chân thành và ấm áp.",
      "Tôi đã nhận được một lá thư vui tươi từ người bạn qua thư."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_11",
    "word": "postcard",
    "phonetic": "/ˈpoʊstkɑːrd/",
    "definition": "A card for sending a message by post without an envelope, typically having an illustration on one side.",
    "definitionVn": "tấm bưu thiếp, bưu ảnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Send a scenic postcard of Da Nang to your family.",
      "She collects vintage travel postcards."
    ],
    "exampleTranslations": [
      "Gửi một tấm bưu thiếp phong cảnh Đà Nẵng về cho gia đình nhé.",
      "Cô ấy sưu tầm những tấm bưu thiếp du lịch cổ điển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_12",
    "word": "stamp",
    "phonetic": "/stæmp/",
    "definition": "A small adhesive piece of paper issued by a post office to be pasted on an item of mail to prove payment of postage.",
    "definitionVn": "con tem (bưu chính)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Stick a colorful postage stamp on the top right corner of the envelope.",
      "Philatelists collect rare and historic stamps."
    ],
    "exampleTranslations": [
      "Dán con tem bưu chính nhiều màu vào góc trên bên phải phong bì nhé.",
      "Những người sưu tầm tem sưu tầm những con tem hiếm và có giá trị lịch sử."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_13",
    "word": "envelope",
    "phonetic": "/ˈenvəloʊp/",
    "definition": "A flat paper container with a sealable flap, used to enclose a letter or document.",
    "definitionVn": "chiếc phong bì, bao thư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Seal the letter securely inside the paper envelope.",
      "Red envelopes bring good luck during Tet holiday."
    ],
    "exampleTranslations": [
      "Dán kín lá thư cẩn thận bên trong chiếc phong bì giấy nhé.",
      "Bao lì xì đỏ mang lại may mắn trong dịp Tết."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_14",
    "word": "message",
    "phonetic": "/ˈmesɪdʒ/",
    "definition": "A verbal, written, or recorded communication sent to or left for a recipient.",
    "definitionVn": "tin nhắn, thông điệp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Leave a voice message if I cannot pick up the phone.",
      "The inspiring book delivers a powerful message of hope."
    ],
    "exampleTranslations": [
      "Hãy để lại tin nhắn thoại nếu tôi không thể nhấc máy nhé.",
      "Cuốn sách truyền cảm hứng gửi gắm một thông điệp mạnh mẽ về niềm hy vọng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_15",
    "word": "voice",
    "phonetic": "/vɔɪs/",
    "definition": "The sound produced in a person's larynx and uttered through the mouth, as speech or song.",
    "definitionVn": "giọng nói, giọng hát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "She has a clear, melodious, and soothing speaking voice.",
      "Speak with a confident and audible voice."
    ],
    "exampleTranslations": [
      "Cô ấy có một giọng nói trong trẻo, du dương và êm tai.",
      "Hãy nói bằng một giọng tự tin và vừa đủ nghe nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_16",
    "word": "dialogue",
    "phonetic": "/ˈdaɪəlɔːɡ/",
    "definition": "A conversation between two or more people as a feature of a book, play, or film.",
    "definitionVn": "đoạn đối thoại, cuộc đàm thoại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Practice reading English dialogue scripts with a partner.",
      "Open dialogue resolves misunderstandings effectively."
    ],
    "exampleTranslations": [
      "Hãy thực hành đọc các đoạn kịch bản đối thoại tiếng Anh với bạn nhé.",
      "Đối thoại cởi mở giúp giải quyết những hiểu lầm một cách hiệu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_17",
    "word": "topic",
    "phonetic": "/ˈtɑːpɪk/",
    "definition": "A matter dealt with in a text, discourse, or conversation; a subject.",
    "definitionVn": "chủ đề thảo luận, đề tài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Today's English speaking topic is about eco-friendly habits.",
      "Choose an interesting topic for your essay."
    ],
    "exampleTranslations": [
      "Chủ đề nói tiếng Anh hôm nay là về những thói quen thân thiện với môi trường.",
      "Hãy chọn một đề tài thú vị cho bài luận của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_18",
    "word": "opinion",
    "phonetic": "/əˈpɪnjən/",
    "definition": "A view or judgment formed about something, not necessarily based on fact or knowledge.",
    "definitionVn": "quan điểm, ý kiến cá nhân",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "In my opinion, daily reading is the key to expanding vocabulary.",
      "Express your opinion politely and respectfully."
    ],
    "exampleTranslations": [
      "Theo quan điểm của tôi, việc đọc sách mỗi ngày là chìa khóa để mở rộng vốn từ.",
      "Hãy bày tỏ ý kiến cá nhân một cách lịch sự và tôn trọng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_19",
    "word": "advice",
    "phonetic": "/ədˈvaɪs/",
    "definition": "Guidance or recommendations offered with regard to prudent future action.",
    "definitionVn": "lời khuyên, lời chỉ dẫn bổ ích",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "Follow the teacher's valuable advice to improve your pronunciation.",
      "Can you give me some advice on learning new words?"
    ],
    "exampleTranslations": [
      "Hãy làm theo lời khuyên quý giá của thầy cô để cải thiện phát âm nhé.",
      "Bạn có thể cho tôi vài lời khuyên về việc học từ mới không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conver_20",
    "word": "greeting",
    "phonetic": "/ˈɡriːtɪŋ/",
    "definition": "A polite word or sign of welcome or recognition.",
    "definitionVn": "lời chào hỏi, sự chào đón",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_conversation_communication",
    "themeNameVn": "Giao tiếp & Thư tín",
    "themeNameEn": "Conversation & Letters",
    "examples": [
      "A warm smile and a friendly greeting brighten everyone's day.",
      "Send festival greetings to friends and family."
    ],
    "exampleTranslations": [
      "Một nụ cười ấm áp và lời chào thân thiện làm bừng sáng cả ngày của mọi người.",
      "Gửi những lời chúc mừng lễ hội đến bạn bè và người thân nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_01",
    "word": "oval",
    "phonetic": "/ˈoʊvl/",
    "definition": "Having a rounded and slightly elongated outline or shape, like that of an egg.",
    "definitionVn": "hình bầu dục, hình ô-van",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A chicken egg has a smooth oval shape.",
      "The dining mirror is enclosed in an elegant oval wooden frame."
    ],
    "exampleTranslations": [
      "Quả trứng gà có hình bầu dục nhẵn nhụi.",
      "Chiếc gương phòng ăn được đóng trong một khung gỗ hình bầu dục trang nhã."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_02",
    "word": "diamond",
    "phonetic": "/ˈdaɪəmənd/",
    "definition": "A figure with four equal sides forming two opposite acute angles and two obtuse angles; rhombus.",
    "definitionVn": "hình thoi, viên kim cương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A traditional paper kite is shaped like a bright diamond.",
      "The playing cards have red diamond suits."
    ],
    "exampleTranslations": [
      "Chiếc diều giấy truyền thống có hình thoi rực rỡ.",
      "Những lá bài tây có chất hình quả trám đỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_03",
    "word": "cube",
    "phonetic": "/kjuːb/",
    "definition": "A symmetrical three-dimensional shape, either solid or hollow, contained by six equal squares.",
    "definitionVn": "hình lập phương, khối vuông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A Rubik's puzzle is a famous multicolored cube.",
      "Drop an ice cube into your glass of fresh juice."
    ],
    "exampleTranslations": [
      "Khối rubik là một khối lập phương nhiều màu nổi tiếng.",
      "Thả một viên đá hình lập phương vào ly nước ép tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_04",
    "word": "sphere",
    "phonetic": "/sfɪr/",
    "definition": "A round solid figure in which every point on the surface is equidistant from the center.",
    "definitionVn": "hình cầu, khối cầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The Earth is an oblate sphere orbiting the sun.",
      "A basketball is a hollow rubber sphere."
    ],
    "exampleTranslations": [
      "Trái Đất là một khối cầu dẹt quay quanh mặt trời.",
      "Quả bóng rổ là một khối cầu cao su rỗng ruột."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_05",
    "word": "cylinder",
    "phonetic": "/ˈsɪlɪndər/",
    "definition": "A solid geometrical figure with straight parallel sides and a circular or oval cross section.",
    "definitionVn": "hình trụ, khối trụ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A soda can and a water bottle have cylindrical shapes.",
      "The ancient temple was supported by tall stone cylinders."
    ],
    "exampleTranslations": [
      "Lon nước ngọt và chai nước có hình dạng khối trụ.",
      "Ngôi đền cổ được nâng đỡ bởi những cột trụ đá cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_06",
    "word": "line",
    "phonetic": "/laɪn/",
    "definition": "A long, narrow mark or band on a surface.",
    "definitionVn": "đường thẳng, nét kẻ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Draw a straight line across the page with your ruler.",
      "Stand in an orderly line to board the bus."
    ],
    "exampleTranslations": [
      "Vẽ một đường thẳng qua trang giấy bằng thước kẻ nhé.",
      "Hãy xếp thành một hàng ngay ngắn để lên xe buýt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_07",
    "word": "point",
    "phonetic": "/pɔɪnt/",
    "definition": "A small, round mark on a surface; a dot.",
    "definitionVn": "điểm, dấu chấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Every sentence begins with a capital letter and ends with a point.",
      "Mark the location with a red point on the map."
    ],
    "exampleTranslations": [
      "Mỗi câu bắt đầu bằng một chữ cái viết hoa và kết thúc bằng một dấu chấm.",
      "Đánh dấu vị trí bằng một chấm đỏ trên bản đồ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_08",
    "word": "curve",
    "phonetic": "/kɜːrv/",
    "definition": "A line or outline which gradually deviates from being straight for some or all of its length.",
    "definitionVn": "đường cong, khúc cua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Drive slowly when navigating the sharp mountain road curve.",
      "A rainbow forms a magnificent multicolored curve in the sky."
    ],
    "exampleTranslations": [
      "Hãy lái xe chậm khi đi qua khúc cua đường đèo dốc nhé.",
      "Cầu vồng tạo thành một đường cong nhiều màu sắc tuyệt đẹp trên bầu trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_09",
    "word": "straight",
    "phonetic": "/streɪt/",
    "definition": "Extending or moving continuously in one direction only; without a curve or bend.",
    "definitionVn": "thẳng tắp, ngay thẳng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Sit with a straight back to protect your spinal posture.",
      "Walk straight ahead for two blocks to reach the park."
    ],
    "exampleTranslations": [
      "Hãy ngồi thẳng lưng để bảo vệ tư thế cột sống nhé.",
      "Hãy đi thẳng về phía trước hai dãy nhà là đến công viên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_10",
    "word": "stripe",
    "phonetic": "/straɪp/",
    "definition": "A long narrow band or strip, typically of the same width throughout its length.",
    "definitionVn": "sọc kẻ, đường kẻ sọc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Zebras have distinctive black and white stripes.",
      "He wore a fashionable navy shirt with white vertical stripes."
    ],
    "exampleTranslations": [
      "Ngựa vằn có những đường kẻ sọc đen trắng rất đặc trưng.",
      "Anh ấy mặc một chiếc áo sơ mi màu xanh navy kẻ sọc trắng rất thời trang."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_11",
    "word": "dot",
    "phonetic": "/dɑːt/",
    "definition": "A small round mark or spot.",
    "definitionVn": "chấm tròn, đốm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A ladybug has charming black dots on its bright red wings.",
      "Connect the numbered dots to reveal the hidden picture."
    ],
    "exampleTranslations": [
      "Chú bọ rùa có những đốm đen duyên dáng trên đôi cánh đỏ rực.",
      "Nối các chấm có đánh số để mở ra bức tranh ẩn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_12",
    "word": "pattern",
    "phonetic": "/ˈpætərn/",
    "definition": "A repeated decorative design on fabric, paper, or other materials.",
    "definitionVn": "hoa văn, họa tiết lặp lại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The traditional brocade fabric has intricate geometric patterns.",
      "Look for patterns in English grammar rules to learn faster."
    ],
    "exampleTranslations": [
      "Vải thổ cẩm truyền thống có những hoa văn hình học tinh xảo.",
      "Hãy tìm những quy luật lặp lại trong ngữ pháp tiếng Anh để học nhanh hơn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_13",
    "word": "flat",
    "phonetic": "/flæt/",
    "definition": "Having a level surface; without raised areas or indentations.",
    "definitionVn": "phẳng, bằng phẳng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Place the computer monitor on a stable flat desk.",
      "The plains of the delta are flat and fertile."
    ],
    "exampleTranslations": [
      "Đặt màn hình máy tính lên chiếc bàn phẳng chắc chắn nhé.",
      "Đồng bằng châu thổ rất bằng phẳng và màu mỡ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_14",
    "word": "narrow",
    "phonetic": "/ˈnæroʊ/",
    "definition": "Of small width in relation to length; not wide.",
    "definitionVn": "chật hẹp, nhỏ hẹp",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Hanoi Old Quarter is famous for its charming narrow alleys.",
      "The footpath across the stream is narrow but safe."
    ],
    "exampleTranslations": [
      "Phố Cổ Hà Nội nổi tiếng với những con ngõ nhỏ hẹp duyên dáng.",
      "Lối mòn đi bộ qua suối nhỏ hẹp nhưng an toàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_15",
    "word": "wide",
    "phonetic": "/waɪd/",
    "definition": "Of great or more than average width; broad.",
    "definitionVn": "rộng lớn, thênh thang",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The city avenue is wide with three lanes of traffic.",
      "Open your mouth wide for the dentist to examine."
    ],
    "exampleTranslations": [
      "Đại lộ thành phố rộng lớn với ba làn xe chạy.",
      "Hãy mở rộng miệng để nha sĩ kiểm tra nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_16",
    "word": "thick",
    "phonetic": "/θɪk/",
    "definition": "With opposite sides relatively far apart; having significant depth.",
    "definitionVn": "dày cộm, đậm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A thick winter coat shields against cold winds.",
      "Spread a thick layer of peanut butter on bread."
    ],
    "exampleTranslations": [
      "Chiếc áo khoác mùa đông dày cộm chắn gió lạnh.",
      "Phết một lớp bơ đậu phộng dày lên bánh mì nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_17",
    "word": "thin",
    "phonetic": "/θɪn/",
    "definition": "Having opposite surfaces close together; slender.",
    "definitionVn": "mỏng mảnh, thon gọn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The modern smartphone is ultra-thin and lightweight.",
      "Slice the cucumber into thin crunchy rounds."
    ],
    "exampleTranslations": [
      "Chiếc điện thoại thông minh hiện đại siêu mỏng và nhẹ.",
      "Thái dưa chuột thành những lát tròn mỏng giòn rụm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_18",
    "word": "shape",
    "phonetic": "/ʃeɪp/",
    "definition": "The external form, contours, or outline of someone or something.",
    "definitionVn": "hình dạng, dáng dấp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Children learn different geometric shapes in math class.",
      "Clouds take on imaginative shapes in the sky."
    ],
    "exampleTranslations": [
      "Trẻ em học các hình dạng hình học khác nhau trong giờ toán.",
      "Những đám mây tạo thành những hình thù giàu trí tưởng tượng trên bầu trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_19",
    "word": "circle",
    "phonetic": "/ˈsɜːrkl/",
    "definition": "A round plane figure whose boundary consists of points equidistant from a fixed center.",
    "definitionVn": "hình tròn (hoàn hảo)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The students sat in a friendly circle to play word games.",
      "The full moon is a glowing golden circle."
    ],
    "exampleTranslations": [
      "Các bạn học sinh ngồi thành một vòng tròn thân thiện để chơi trò đố chữ.",
      "Mặt trăng tròn vành vạnh là một khối tròn vàng rực rỡ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_20",
    "word": "square",
    "phonetic": "/skwer/",
    "definition": "A plane figure with four equal straight sides and four right angles.",
    "definitionVn": "hình vuông (bốn cạnh đều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A standard chessboard has sixty-four black and white squares.",
      "Cut the paper into neat little squares for flashcards."
    ],
    "exampleTranslations": [
      "Bàn cờ vua tiêu chuẩn có sáu mươi tư ô vuông đen trắng.",
      "Cắt giấy thành những ô vuông nhỏ ngay ngắn để làm flashcard nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_01",
    "word": "wood",
    "phonetic": "/wʊd/",
    "definition": "The hard fibrous material that forms the main substance of the trunk or branches of a tree.",
    "definitionVn": "gỗ, chất liệu gỗ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Solid oak wood is used to build durable furniture.",
      "A fire of dry wood kept the cabin warm all night."
    ],
    "exampleTranslations": [
      "Gỗ sồi nguyên khối được dùng để đóng đồ nội thất bền đẹp.",
      "Ngọn lửa từ củi gỗ khô giữ cho căn nhà gỗ ấm cúng suốt đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_02",
    "word": "metal",
    "phonetic": "/ˈmetl/",
    "definition": "A solid material that is typically hard, shiny, malleable, and conducts electricity and heat.",
    "definitionVn": "kim loại (sắt, thép, nhôm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "The bridge structure is reinforced with strong metal beams.",
      "Gold and silver are precious metals used for jewelry."
    ],
    "exampleTranslations": [
      "Cấu trúc cây cầu được gia cố bằng những thanh kim loại chắc chắn.",
      "Vàng và bạc là những kim loại quý được dùng làm trang sức."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_03",
    "word": "plastic",
    "phonetic": "/ˈplæstɪk/",
    "definition": "A synthetic material made from a wide range of organic polymers that can be molded into shape.",
    "definitionVn": "nhựa, chất dẻo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Reduce single-use plastic bottles to protect the environment.",
      "Recycle plastic containers properly."
    ],
    "exampleTranslations": [
      "Giảm thiểu chai nhựa dùng một lần để bảo vệ môi trường nhé.",
      "Tái chế các hộp nhựa đúng quy định nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_04",
    "word": "glass",
    "phonetic": "/ɡlæs/",
    "definition": "A hard, brittle, typically transparent substance made by fusing sand with soda and lime.",
    "definitionVn": "thủy tinh, kính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Windows are made of clear, insulated glass.",
      "Handle delicate glass cups with care."
    ],
    "exampleTranslations": [
      "Cửa sổ được làm bằng kính cách nhiệt trong suốt.",
      "Cầm những chiếc ly thủy tinh mỏng manh thật cẩn thận nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_05",
    "word": "paper",
    "phonetic": "/ˈpeɪpər/",
    "definition": "Material manufactured in thin sheets from the pulp of wood or other fibrous substances.",
    "definitionVn": "giấy, chất liệu giấy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Books and notebooks are made of recyclable white paper.",
      "Save paper by using digital documents when possible."
    ],
    "exampleTranslations": [
      "Sách và vở ghi chép được làm từ giấy trắng có thể tái chế.",
      "Tiết kiệm giấy bằng cách dùng tài liệu số khi có thể nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_06",
    "word": "cotton",
    "phonetic": "/ˈkɑːtn/",
    "definition": "A soft white fibrous substance that surrounds the seeds of a tropical and subtropical plant.",
    "definitionVn": "vải sợi bông, cotton",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Breathable cotton T-shirts are comfortable in hot summer weather.",
      "Organic cotton is gentle on sensitive skin."
    ],
    "exampleTranslations": [
      "Áo thun cotton thoáng khí rất thoải mái trong thời tiết hè nóng nực.",
      "Bông hữu cơ rất dịu nhẹ với làn da nhạy cảm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_07",
    "word": "rubber",
    "phonetic": "/ˈrʌbər/",
    "definition": "A tough elastic polymeric substance made from the latex of a tropical plant or synthetically.",
    "definitionVn": "cao su (dẻo, đàn hồi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Tires and shoe soles are made of durable natural rubber.",
      "Natural latex rubber pillows support the neck well."
    ],
    "exampleTranslations": [
      "Lốp xe và đế giày được làm từ cao su tự nhiên bền chắc.",
      "Gối cao su thiên nhiên nâng đỡ cổ rất tốt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_08",
    "word": "clay",
    "phonetic": "/kleɪ/",
    "definition": "A stiff, sticky fine-grained earth, typically yellow, red, or bluish-gray in color and often used for pottery.",
    "definitionVn": "đất sét (làm gốm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Bat Trang artisans craft exquisite teapots from fine clay.",
      "Children molded animals out of colorful modeling clay."
    ],
    "exampleTranslations": [
      "Các nghệ nhân Bát Tràng chế tác những ấm trà tuyệt xảo từ đất sét mịn.",
      "Trẻ em nặn các con thú từ đất sét nặn nhiều màu sắc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_09",
    "word": "stone",
    "phonetic": "/stoʊn/",
    "definition": "Hard solid non-metallic mineral matter of which rock is made.",
    "definitionVn": "đá tự nhiên, phiến đá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "The ancient temple was carved from solid mountain stone.",
      "Decorative marble stone adds elegance to floors."
    ],
    "exampleTranslations": [
      "Ngôi đền cổ được tạc từ đá núi nguyên khối.",
      "Đá cẩm thạch trang trí mang lại nét trang nhã cho sàn nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_10",
    "word": "iron",
    "phonetic": "/ˈaɪərn/",
    "definition": "A strong, hard magnetic silvery-gray metal.",
    "definitionVn": "sắt, kim loại sắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Wrought iron gates in the park have intricate floral designs.",
      "Iron is an essential mineral for red blood cells."
    ],
    "exampleTranslations": [
      "Những cánh cổng sắt uốn trong công viên có hoa văn hoa lá tinh xảo.",
      "Sắt là khoáng chất thiết yếu cho các tế bào hồng cầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_11",
    "word": "steel",
    "phonetic": "/stiːl/",
    "definition": "A hard, strong, gray or bluish-gray alloy of iron with carbon and usually other elements.",
    "definitionVn": "thép, inox không gỉ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Stainless steel kitchen cutlery does not rust.",
      "Modern skyscrapers have sturdy steel skeletons."
    ],
    "exampleTranslations": [
      "Dao kéo nhà bếp bằng thép không gỉ không bị hoen gỉ.",
      "Những tòa nhà chọc trời hiện đại có khung thép kiên cố."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_12",
    "word": "gold",
    "phonetic": "/ɡoʊld/",
    "definition": "A yellow precious metal, the chemical element of atomic number 79.",
    "definitionVn": "vàng (kim loại quý)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Gold wedding rings remain shiny forever without tarnishing.",
      "Olympic champions proudly wear gold medals."
    ],
    "exampleTranslations": [
      "Nhẫn cưới bằng vàng luôn sáng bóng mãi mà không bị xỉn màu.",
      "Các nhà vô địch Olympic tự hào đeo huy chương vàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_13",
    "word": "silver",
    "phonetic": "/ˈsɪlvər/",
    "definition": "A precious shiny grayish-white metallic chemical element.",
    "definitionVn": "bạc (kim loại quý)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Silver earrings complement almost any outfit elegantly.",
      "Traditional artisans in Hue craft delicate silver filigree."
    ],
    "exampleTranslations": [
      "Khuyên tai bạc tôn lên hầu như mọi bộ trang phục một cách trang nhã.",
      "Nghệ nhân truyền thống ở Huế chế tác đồ bạc chạm trổ tinh tế."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_14",
    "word": "ceramic",
    "phonetic": "/səˈræmɪk/",
    "definition": "Made of clay and permanently hardened by heat.",
    "definitionVn": "gốm sứ (đồ gốm nung)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Drink hot tea from a handmade ceramic mug.",
      "Ceramic tiles keep floors cool in tropical climates."
    ],
    "exampleTranslations": [
      "Uống trà nóng từ một chiếc cốc gốm thủ công nhé.",
      "Gạch men gốm sứ giữ cho sàn nhà mát mẻ trong khí hậu nhiệt đới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_15",
    "word": "leather",
    "phonetic": "/ˈleðər/",
    "definition": "Material made from the skin of an animal by tanning.",
    "definitionVn": "chất liệu da",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "A genuine leather jacket softens and looks better with age.",
      "He polished his black leather shoes until they shone."
    ],
    "exampleTranslations": [
      "Một chiếc áo khoác da thật sẽ mềm mại và đẹp hơn theo năm tháng.",
      "Anh ấy đánh bóng đôi giày da đen cho đến khi sáng bóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_16",
    "word": "silk",
    "phonetic": "/sɪlk/",
    "definition": "A fine, strong, soft lustrous fiber produced by silkworms.",
    "definitionVn": "lụa tơ tằm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Traditional Vietnamese Ao Dai made of silk is elegant and graceful.",
      "Silk pillowcases are gentle on skin and hair."
    ],
    "exampleTranslations": [
      "Áo dài truyền thống Việt Nam may bằng lụa tơ tằm thật thướt tha và trang nhã.",
      "Vỏ gối lụa rất dịu nhẹ cho làn da và mái tóc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_17",
    "word": "wool",
    "phonetic": "/wʊl/",
    "definition": "The fine soft curly hair forming the coat of a sheep, used for textile.",
    "definitionVn": "sợi len, lông cừu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "A thick wool scarf keeps you warm against winter chills.",
      "Merino wool is super soft and breathable."
    ],
    "exampleTranslations": [
      "Chiếc khăn len dày giữ ấm cho bạn trước những đợt gió lạnh mùa đông.",
      "Len cừu Merino siêu mềm mại và thoáng khí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_18",
    "word": "fabric",
    "phonetic": "/ˈfæbrɪk/",
    "definition": "Cloth or other material produced by weaving or knitting fibers.",
    "definitionVn": "vải vóc, chất liệu vải",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Choose breathable natural fabric for summer clothing.",
      "The sofa is upholstered in durable linen fabric."
    ],
    "exampleTranslations": [
      "Hãy chọn chất liệu vải tự nhiên thoáng khí cho quần áo mùa hè nhé.",
      "Chiếc ghế sô pha được bọc bằng chất liệu vải lanh bền chắc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_19",
    "word": "material",
    "phonetic": "/məˈtɪriəl/",
    "definition": "The matter from which a thing is or can be made.",
    "definitionVn": "vật liệu, chất liệu chế tạo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Eco-friendly building materials help reduce carbon footprint.",
      "Recycle plastic materials to protect oceans."
    ],
    "exampleTranslations": [
      "Các vật liệu xây dựng thân thiện với môi trường giúp giảm lượng khí thải carbon.",
      "Tái chế các vật liệu nhựa để bảo vệ đại dương nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_20",
    "word": "hard",
    "phonetic": "/hɑːrd/",
    "definition": "Solid, firm, and rigid; not easily broken, bent, or pierced.",
    "definitionVn": "cứng rắn, bền chắc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Diamonds are the hardest natural substance known.",
      "Granite is a hard and durable stone for kitchen counters."
    ],
    "exampleTranslations": [
      "Kim cương là chất liệu tự nhiên cứng nhất từng được biết đến.",
      "Đá hoa cương là loại đá cứng và bền cho mặt bếp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_01",
    "word": "sound",
    "phonetic": "/saʊnd/",
    "definition": "Vibrations that travel through the air or another medium and can be heard when they reach a person's ear.",
    "definitionVn": "âm thanh, tiếng động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The peaceful sound of gentle rain helps me sleep.",
      "Sound travels through air in invisible waves."
    ],
    "exampleTranslations": [
      "Âm thanh êm đềm của cơn mưa rào nhẹ giúp tôi ngủ ngon.",
      "Âm thanh truyền qua không khí dưới dạng những làn sóng vô hình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_02",
    "word": "noise",
    "phonetic": "/nɔɪz/",
    "definition": "A sound, especially one that is loud or unpleasant or that causes disturbance.",
    "definitionVn": "tiếng ồn, âm thanh khó chịu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Wear noise-canceling headphones to study quietly.",
      "Loud traffic noise can disrupt concentration."
    ],
    "exampleTranslations": [
      "Đeo tai nghe chống ồn để học tập yên tĩnh nhé.",
      "Tiếng ồn xe cộ lớn có thể làm gián đoạn sự tập trung."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_03",
    "word": "melody",
    "phonetic": "/ˈmelədi/",
    "definition": "A sequence of single notes that is musically satisfying; a tune.",
    "definitionVn": "giai điệu (du dương)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The gentle acoustic guitar melody calmed the room.",
      "Hum along to the cheerful melody of the song."
    ],
    "exampleTranslations": [
      "Giai điệu đàn ghi-ta mộc êm dịu làm dịu bầu không khí căn phòng.",
      "Ngâm nga theo giai điệu vui tươi của bài hát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_04",
    "word": "voice",
    "phonetic": "/vɔɪs/",
    "definition": "The sound produced in a person's larynx and uttered through the mouth.",
    "definitionVn": "giọng nói, giọng hát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The singer has a remarkably powerful and soulful voice.",
      "Speak with a warm and polite voice."
    ],
    "exampleTranslations": [
      "Người ca sĩ có một giọng hát nội lực và truyền cảm xuất sắc.",
      "Hãy nói bằng một giọng ấm áp và lịch sự nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_05",
    "word": "whisper",
    "phonetic": "/ˈwɪspər/",
    "definition": "A soft, quiet murmur of voices.",
    "definitionVn": "tiếng thì thầm, tiếng nói nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "She spoke in a gentle whisper so she wouldn't wake the sleeping baby.",
      "The wind made a soft whisper through the pine trees."
    ],
    "exampleTranslations": [
      "Cô ấy nói bằng một tiếng thì thầm nhẹ nhàng để không đánh thức em bé đang ngủ.",
      "Gió tạo nên tiếng thì thầm êm ả qua rặng thông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_06",
    "word": "shout",
    "phonetic": "/ʃaʊt/",
    "definition": "A loud call or cry, typically as an expression of a strong emotion or to grab attention.",
    "definitionVn": "tiếng la hét, tiếng reo to",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "A joyful shout arose from the stadium when the goal was scored.",
      "Give a shout if you need any help."
    ],
    "exampleTranslations": [
      "Một tiếng reo hò vui sướng vang lên từ sân vận động khi bàn thắng được ghi.",
      "Hãy gọi to một tiếng nếu bạn cần giúp đỡ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_07",
    "word": "clap",
    "phonetic": "/klæp/",
    "definition": "Strike the palms of one's hands together repeatedly, typically in order to applaud.",
    "definitionVn": "vỗ tay, tiếng vỗ tay",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The audience clapped enthusiastically after the concert.",
      "Clap your hands to the beat of the music."
    ],
    "exampleTranslations": [
      "Khán giả đã vỗ tay nhiệt liệt sau buổi hòa nhạc.",
      "Hãy vỗ tay theo nhịp điệu của âm nhạc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_08",
    "word": "snap",
    "phonetic": "/snæp/",
    "definition": "Make a sudden sharp cracking sound, as with one's fingers.",
    "definitionVn": "búng tay, tiếng tách",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "He snapped his fingers to the jazz rhythm.",
      "The dry branch snapped with a loud crack."
    ],
    "exampleTranslations": [
      "Anh ấy búng tay theo nhịp điệu nhạc jazz.",
      "Cành cây khô gãy đánh tách một tiếng to."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_09",
    "word": "ring",
    "phonetic": "/rɪŋ/",
    "definition": "Make a clear resonant or vibrating sound, as a bell or phone.",
    "definitionVn": "rung chuông, đổ chuông",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The school bell rings at exactly 7:30 AM.",
      "My phone is ringing; let me answer it."
    ],
    "exampleTranslations": [
      "Chuông trường học reo vào đúng 7h30 sáng.",
      "Điện thoại tôi đang đổ chuông; để tôi nghe máy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_10",
    "word": "bang",
    "phonetic": "/bæŋ/",
    "definition": "A sudden loud, sharp noise, as of an explosion or door slamming.",
    "definitionVn": "tiếng nổ lớn, tiếng đập mạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The door slammed shut with a loud bang in the gust of wind.",
      "Fireworks went off with a colorful bang."
    ],
    "exampleTranslations": [
      "Cánh cửa đóng sầm lại đánh 'rầm' một tiếng lớn trong cơn gió giật.",
      "Pháo hoa nổ vang với những tiếng nổ rực rỡ sắc màu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_11",
    "word": "buzz",
    "phonetic": "/bʌz/",
    "definition": "A low, continuous humming or murmuring sound, made for example by a bee or machinery.",
    "definitionVn": "tiếng vo ve (ong, côn trùng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The gentle buzz of honeybees filled the blooming garden.",
      "My phone gave a silent vibration buzz."
    ],
    "exampleTranslations": [
      "Tiếng vo ve êm ả của bầy ong mật ngập tràn khu vườn hoa nở.",
      "Điện thoại của tôi rung lên một tiếng rung nhẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_12",
    "word": "echo",
    "phonetic": "/ˈekoʊ/",
    "definition": "A sound or sounds caused by the reflection of sound waves from a surface back to the listener.",
    "definitionVn": "tiếng vang, âm vang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Your voice creates a clear echo inside the large mountain cave.",
      "His shout echoed through the empty hall."
    ],
    "exampleTranslations": [
      "Giọng nói của bạn tạo nên tiếng vang rõ rệt trong hang núi lớn.",
      "Tiếng hét của anh ấy vang vọng khắp đại sảnh vắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_13",
    "word": "drum",
    "phonetic": "/drʌm/",
    "definition": "A percussion instrument sounded by being struck with sticks or the hands.",
    "definitionVn": "cái trống, trống nhạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The traditional festival opening featured roaring bronze drums.",
      "He plays the drums in a student rock band."
    ],
    "exampleTranslations": [
      "Lễ khai mạc lễ hội truyền thống vang lừng tiếng trống đồng.",
      "Cậu ấy chơi trống trong một ban nhạc rock sinh viên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_14",
    "word": "flute",
    "phonetic": "/fluːt/",
    "definition": "A wind instrument made from a tube with holes that are stopped by the fingers.",
    "definitionVn": "cây sáo, sáo trúc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The sweet, peaceful melody of a bamboo flute echoed across the rice fields.",
      "She plays the classical silver flute beautifully."
    ],
    "exampleTranslations": [
      "Giai điệu ngọt ngào, thanh bình của cây sáo trúc vang vọng khắp cánh đồng lúa.",
      "Cô ấy thổi cây sáo bạc cổ điển rất hay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_15",
    "word": "violin",
    "phonetic": "/ˌvaɪəˈlɪn/",
    "definition": "A stringed musical instrument of treble pitch, played with a horsehair bow.",
    "definitionVn": "đàn vĩ cầm, đàn violin",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The violin soloist played a moving classical piece.",
      "She practices violin scales for one hour every day."
    ],
    "exampleTranslations": [
      "Nghệ sĩ độc tấu vĩ cầm đã biểu diễn một bản nhạc cổ điển đầy xúc động.",
      "Cô ấy luyện các gam vĩ cầm một tiếng mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_16",
    "word": "trumpet",
    "phonetic": "/ˈtrʌmpɪt/",
    "definition": "A brass musical instrument with a flared bell and three valves.",
    "definitionVn": "kèn trom-pét (kèn đồng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "The bright, triumphant sound of the trumpet announced the ceremony.",
      "Jazz trumpeters play with incredible passion."
    ],
    "exampleTranslations": [
      "Âm thanh rộn rã, hùng tráng của chiếc kèn trumpet đã mở màn cho buổi lễ.",
      "Các nghệ sĩ thổi kèn trumpet nhạc jazz chơi với niềm đam mê cháy bỏng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_17",
    "word": "guitar",
    "phonetic": "/ɡɪˈtɑːr/",
    "definition": "A stringed musical instrument with a fretted fingerboard.",
    "definitionVn": "đàn ghi-ta, guitar",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Singing together around an acoustic guitar is so much fun.",
      "He learned to strum chords on his classical guitar."
    ],
    "exampleTranslations": [
      "Cùng nhau hát quanh cây đàn ghi-ta mộc chơi rất vui.",
      "Anh ấy đã học cách gảy hợp âm trên cây đàn ghi-ta cổ điển của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_18",
    "word": "piano",
    "phonetic": "/piˈænoʊ/",
    "definition": "A large musical instrument with a keyboard.",
    "definitionVn": "đàn dương cầm, piano",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Playing the piano trains focus, coordination, and patience.",
      "The grand piano produces a rich, resonant tone."
    ],
    "exampleTranslations": [
      "Chơi đàn piano rèn luyện sự tập trung, khéo léo và kiên nhẫn.",
      "Cây đại dương cầm phát ra âm thanh trầm hùng và ngân vang."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_19",
    "word": "loud",
    "phonetic": "/laʊd/",
    "definition": "Producing or capable of producing much noise; easily heard.",
    "definitionVn": "to, ồn ào (âm thanh)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "Do not play loud music with earphones to protect hearing.",
      "The thunder was loud and startled the cat."
    ],
    "exampleTranslations": [
      "Đừng bật nhạc quá to khi nghe tai nghe để bảo vệ thính giác nhé.",
      "Tiếng sấm nổ to làm chú mèo giật mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_sounds_20",
    "word": "quiet",
    "phonetic": "/ˈkwaɪət/",
    "definition": "Making little or no noise; peaceful.",
    "definitionVn": "yên tĩnh, êm ả",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_sounds_instruments",
    "themeNameVn": "Âm thanh & Nhạc cụ",
    "themeNameEn": "Sounds & Instruments",
    "examples": [
      "A quiet study room improves reading speed and comprehension.",
      "The early morning countryside is serene and quiet."
    ],
    "exampleTranslations": [
      "Một phòng học yên tĩnh giúp nâng cao tốc độ đọc và khả năng hiểu bài.",
      "Vùng quê buổi sớm mai thật thanh bình và tĩnh lặng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__01",
    "word": "light",
    "phonetic": "/laɪt/",
    "definition": "The natural agent that stimulates sight and makes things visible.",
    "definitionVn": "ánh sáng, tia sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Natural sunlight floods the living room in the morning.",
      "Turn on the desk light to read clearly."
    ],
    "exampleTranslations": [
      "Ánh nắng mặt trời tự nhiên tràn ngập phòng khách vào buổi sáng.",
      "Bật đèn bàn lên để đọc sách rõ ràng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__02",
    "word": "shadow",
    "phonetic": "/ˈʃædoʊ/",
    "definition": "A dark area or shape produced by a body coming between rays of light and a surface.",
    "definitionVn": "bóng râm, chiếc bóng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "We rested in the cool shadow of a massive banyan tree.",
      "Your shadow gets longer as the sun sets."
    ],
    "exampleTranslations": [
      "Chúng tôi nghỉ ngơi dưới bóng râm mát rượi của cây đa cổ thụ.",
      "Bóng của bạn dài dần ra khi mặt trời lặn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__03",
    "word": "dark",
    "phonetic": "/dɑːrk/",
    "definition": "With little or no light; of deep color.",
    "definitionVn": "bóng tối, tối mịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Stars twinkle brightly in the pitch dark night sky.",
      "Cats see remarkably well in the dark."
    ],
    "exampleTranslations": [
      "Các vì sao lấp lánh rực rỡ trên bầu trời đêm tối mịt.",
      "Mèo nhìn rất tốt trong bóng tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__04",
    "word": "bright",
    "phonetic": "/braɪt/",
    "definition": "Giving out or reflecting a lot of light; shining.",
    "definitionVn": "sáng rực, tươi sáng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The morning sun is bright and cheerful.",
      "She has a bright future ahead of her."
    ],
    "exampleTranslations": [
      "Ánh nắng ban mai rực rỡ và tươi vui.",
      "Cô ấy có một tương lai tươi sáng rộng mở phía trước."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__05",
    "word": "glow",
    "phonetic": "/ɡloʊ/",
    "definition": "Give out steady light without flame.",
    "definitionVn": "phát sáng, tỏa sáng êm dịu",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Fireflies glow magically in the summer evening woods.",
      "The warm fireplace gave a cozy golden glow."
    ],
    "exampleTranslations": [
      "Những chú đom đóm phát sáng kỳ diệu trong cánh rừng đêm mùa hè.",
      "Lò sưởi ấm áp tỏa ra ánh sáng vàng êm đềm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__06",
    "word": "shine",
    "phonetic": "/ʃaɪn/",
    "definition": "Give out or reflect light; be bright.",
    "definitionVn": "chiếu sáng, tỏa ánh hào quang",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The sun shines warmly over the peaceful beach.",
      "Polish your leather shoes so they shine."
    ],
    "exampleTranslations": [
      "Mặt trời chiếu sáng ấm áp trên bãi biển thanh bình.",
      "Đánh bóng đôi giày da của bạn để chúng sáng bóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__07",
    "word": "sparkle",
    "phonetic": "/ˈspɑːrkl/",
    "definition": "Shine brightly with flashes of light; glitter.",
    "definitionVn": "lấp lánh, lóng lánh",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Morning dew drops sparkle like diamonds on grass blades.",
      "The blue sea sparkles under the midday sun."
    ],
    "exampleTranslations": [
      "Những giọt sương mai lấp lánh như kim cương trên ngọn cỏ.",
      "Biển xanh lóng lánh dưới ánh mặt trời ban trưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__08",
    "word": "flash",
    "phonetic": "/flæʃ/",
    "definition": "A sudden brief burst of bright light.",
    "definitionVn": "ánh chớp, tia sáng lóe lên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "A sudden flash of lightning illuminated the stormy sky.",
      "The camera flash captured the group smile."
    ],
    "exampleTranslations": [
      "Một tia chớp bất chợt lóe lên thắp sáng bầu trời giông bão.",
      "Đèn flash máy ảnh đã bắt trọn nụ cười của cả nhóm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__09",
    "word": "beam",
    "phonetic": "/biːm/",
    "definition": "A ray or shaft of light.",
    "definitionVn": "chùm sáng, luồng sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "A beam of sunlight streamed through the window curtains.",
      "The lighthouse sends out a rotating beam of light."
    ],
    "exampleTranslations": [
      "Một luồng ánh nắng mặt trời chiếu xuyên qua rèm cửa sổ.",
      "Ngọn hải đăng phát ra một luồng sáng xoay tròn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__10",
    "word": "sunlight",
    "phonetic": "/ˈsʌnlaɪt/",
    "definition": "Light from the sun.",
    "definitionVn": "ánh nắng mặt trời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Morning sunlight helps the body produce Vitamin D naturally.",
      "Plants need water and sunlight to thrive."
    ],
    "exampleTranslations": [
      "Ánh nắng mặt trời buổi sớm giúp cơ thể tạo ra Vitamin D một cách tự nhiên.",
      "Cây cối cần nước và ánh nắng để phát triển tươi tốt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__11",
    "word": "moonlight",
    "phonetic": "/ˈmuːnlaɪt/",
    "definition": "The light of the moon.",
    "definitionVn": "ánh trăng, ánh nguyệt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The calm lake reflected silver moonlight on Mid-Autumn night.",
      "Walking on the beach by moonlight is romantic."
    ],
    "exampleTranslations": [
      "Mặt hồ êm đềm phản chiếu ánh trăng bạc trong đêm rằm Trung Thu.",
      "Đi dạo trên bãi biển dưới ánh trăng thật lãng mạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__12",
    "word": "lamp",
    "phonetic": "/læmp/",
    "definition": "A device for giving light, consisting of an electric bulb or tube with a shade or cover.",
    "definitionVn": "chiếc đèn bàn, đèn chiếu sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Switch on the desk study lamp to protect your eyesight.",
      "The bedside lamp gives a soft and gentle warm light."
    ],
    "exampleTranslations": [
      "Bật chiếc đèn bàn học lên để bảo vệ thị lực của bạn nhé.",
      "Cây đèn đầu giường tỏa ra ánh sáng ấm áp nhẹ nhàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__13",
    "word": "candle",
    "phonetic": "/ˈkændl/",
    "definition": "A cylinder or block of wax with a central wick which is lit to produce light as it burns.",
    "definitionVn": "cây nến, ngọn nến",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Light the aromatic scented candle to create a relaxing atmosphere.",
      "She blew out all twenty candles on her birthday cake."
    ],
    "exampleTranslations": [
      "Thắp cây nến thơm để tạo bầu không khí thư thái nhé.",
      "Cô ấy đã thổi tắt cả hai mươi ngọn nến trên chiếc bánh sinh nhật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__14",
    "word": "clear",
    "phonetic": "/klɪr/",
    "definition": "Transparent; unclouded; easily seen through.",
    "definitionVn": "trong suốt, trong trẻo, rõ ràng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "The sea water in Phu Quoc is crystal clear and blue.",
      "Speak with a clear voice so everyone understands."
    ],
    "exampleTranslations": [
      "Nước biển ở Phú Quốc trong vắt và xanh biếc.",
      "Hãy nói bằng một giọng rõ ràng để mọi người cùng hiểu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__15",
    "word": "transparent",
    "phonetic": "/trænsˈpærənt/",
    "definition": "Allowing light to pass through so that objects behind can be distinctly seen.",
    "definitionVn": "trong suốt (nhìn thấu qua được)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Clean glass is completely transparent.",
      "The water in the mountain stream is so transparent you can see pebbles on the bottom."
    ],
    "exampleTranslations": [
      "Kính sạch thì hoàn toàn trong suốt.",
      "Nước suối vùng núi trong suốt đến mức bạn có thể nhìn thấy sỏi dưới đáy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__16",
    "word": "shiny",
    "phonetic": "/ˈʃaɪni/",
    "definition": "Reflecting light, typically because clean, polished, or smooth.",
    "definitionVn": "sáng bóng, bóng loáng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "He tossed a shiny silver coin into the fountain.",
      "Her clean black hair looks shiny and healthy."
    ],
    "exampleTranslations": [
      "Cậu ấy ném một đồng xu bạc sáng bóng vào đài phun nước.",
      "Mái tóc đen sạch của cô ấy trông bóng mượt và chắc khỏe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__17",
    "word": "dim",
    "phonetic": "/dɪm/",
    "definition": "Not shining brightly or clearly.",
    "definitionVn": "lờ mờ, ánh sáng mờ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Reading in dim light can cause eye strain; turn on a lamp.",
      "The stars appeared dim through the clouds."
    ],
    "exampleTranslations": [
      "Đọc sách trong ánh sáng lờ mờ có thể gây mỏi mắt; hãy bật đèn lên nhé.",
      "Những vì sao hiện lên lờ mờ qua làn mây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__18",
    "word": "reflection",
    "phonetic": "/rɪˈflekʃn/",
    "definition": "The throwing back by a body or surface of light, heat, or sound without absorbing it; an image seen in a mirror or water.",
    "definitionVn": "hình ảnh phản chiếu, sự phản chiếu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Look at your smiling reflection in the mirror.",
      "The calm river captured the mirror reflection of green mountains."
    ],
    "exampleTranslations": [
      "Hãy nhìn hình ảnh phản chiếu nụ cười của bạn trong gương nhé.",
      "Dòng sông phẳng lặng thu trọn hình ảnh phản chiếu như gương của núi xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__19",
    "word": "view",
    "phonetic": "/vjuː/",
    "definition": "The ability to see something or to be seen from a particular position; a sight or panorama.",
    "definitionVn": "tầm nhìn, khung cảnh ngắm nhìn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Our hotel room balcony offers a breathtaking panoramic ocean view.",
      "Climb to the rooftop for a scenic city view."
    ],
    "exampleTranslations": [
      "Ban công phòng khách sạn mở ra tầm nhìn toàn cảnh đại dương đẹp ngỡ ngàng.",
      "Trèo lên sân thượng để ngắm khung cảnh thành phố nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_light__20",
    "word": "color",
    "phonetic": "/ˈkʌlər/",
    "definition": "The visual perceptual property corresponding in humans to the categories called red, blue, yellow, etc.",
    "definitionVn": "màu sắc, sắc màu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_light_visual_effects",
    "themeNameVn": "Ánh sáng & Thị giác",
    "themeNameEn": "Light & Visual Effects",
    "examples": [
      "Autumn leaves paint the forest in rich shades of vibrant color.",
      "What is your favorite color? — Sky blue!"
    ],
    "exampleTranslations": [
      "Những chiếc lá thu nhuộm cả khu rừng trong những sắc màu rực rỡ.",
      "Màu sắc yêu thích của bạn là gì? — Màu xanh da trời!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_01",
    "word": "stand",
    "phonetic": "/stænd/",
    "definition": "Have or maintain an upright position, supported by one's feet.",
    "definitionVn": "đứng, đứng dậy",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Stand up straight with your shoulders relaxed.",
      "Please stand in line orderly to board."
    ],
    "exampleTranslations": [
      "Hãy đứng thẳng người với đôi vai thả lỏng nhé.",
      "Xin vui lòng đứng xếp hàng ngay ngắn để lên xe nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_02",
    "word": "sit",
    "phonetic": "/sɪt/",
    "definition": "Adopt or be in a position in which one's weight is supported by one's buttocks rather than one's feet.",
    "definitionVn": "ngồi, ngồi xuống",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Pull up a chair and sit comfortably.",
      "Sit upright while studying at your desk."
    ],
    "exampleTranslations": [
      "Kéo ghế lại và ngồi thật thoải mái nhé.",
      "Hãy ngồi thẳng lưng khi học bài tại bàn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_03",
    "word": "walk",
    "phonetic": "/wɔːk/",
    "definition": "Move at a regular pace by lifting and setting down each foot in turn.",
    "definitionVn": "đi bộ, dạo bộ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Walking 10,000 steps daily builds heart health.",
      "We walk around the lake every evening."
    ],
    "exampleTranslations": [
      "Đi bộ 10.000 bước mỗi ngày tăng cường sức khỏe tim mạch.",
      "Chúng tôi đi dạo quanh hồ vào mỗi buổi tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_04",
    "word": "run",
    "phonetic": "/rʌn/",
    "definition": "Move at a speed faster than a walk, never having both feet on the ground at the same time.",
    "definitionVn": "chạy, chạy bộ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "He runs five kilometers every morning before breakfast.",
      "Run fast, or you will miss the morning train!"
    ],
    "exampleTranslations": [
      "Anh ấy chạy 5 cây số mỗi sáng trước bữa điểm tâm.",
      "Chạy nhanh lên kẻo bạn sẽ lỡ chuyến tàu sáng đấy!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_05",
    "word": "jump",
    "phonetic": "/dʒʌmp/",
    "definition": "Push oneself off a surface and into the air by using the muscles in one's legs and feet.",
    "definitionVn": "nhảy lên, bật nhảy",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Jump for joy when you achieve a personal goal.",
      "The children jumped happily on the trampoline."
    ],
    "exampleTranslations": [
      "Nhảy cẫng lên vì vui sướng khi bạn đạt được mục tiêu cá nhân nhé.",
      "Lũ trẻ nhảy nhót vui vẻ trên bạt nhún lò xo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_06",
    "word": "hop",
    "phonetic": "/hɑːp/",
    "definition": "Move by jumping on one foot or, in the case of a small animal, jumping with all feet together.",
    "definitionVn": "nhảy lò cò, nhảy cẫng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "The cute bunny rabbit hopped across the grassy lawn.",
      "Children love playing the hopscotch hopping game."
    ],
    "exampleTranslations": [
      "Chú thỏ xinh xắn nhảy lò cò qua bãi cỏ xanh.",
      "Trẻ em rất thích chơi trò chơi nhảy lò cò ô ăn quan."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_07",
    "word": "crawl",
    "phonetic": "/krɔːl/",
    "definition": "Move forward on the hands and knees or by dragging the body close to the ground.",
    "definitionVn": "bò, trườn (em bé, người)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "The nine-month-old baby learned to crawl fast across the rug.",
      "The soldiers crawled quietly through the tall grass."
    ],
    "exampleTranslations": [
      "Em bé chín tháng tuổi đã học cách bò rất nhanh trên thảm.",
      "Các chiến sĩ bò nhẹ nhàng qua bãi cỏ cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_08",
    "word": "climb",
    "phonetic": "/klaɪm/",
    "definition": "Go or come up a slope, incline, or stairs, especially using the feet and hands.",
    "definitionVn": "leo trèo, leo núi, leo thang",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "We climbed to the mountain summit to admire the sunrise.",
      "Be careful when you climb the wooden ladder."
    ],
    "exampleTranslations": [
      "Chúng tôi đã leo lên đỉnh núi để chiêm ngưỡng bình minh.",
      "Hãy cẩn thận khi bạn leo lên chiếc thang gỗ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_09",
    "word": "bend",
    "phonetic": "/bend/",
    "definition": "Shape or force something into a curve or angle; incline the body downward.",
    "definitionVn": "cúi người, gập người, uốn cong",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Bend your knees when lifting heavy grocery boxes.",
      "Bend forward gently to stretch your hamstrings."
    ],
    "exampleTranslations": [
      "Hãy gập đầu gối khi nâng các thùng hàng nặng nhé.",
      "Cúi gập người về phía trước nhẹ nhàng để kéo giãn cơ đùi sau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_10",
    "word": "stretch",
    "phonetic": "/stretʃ/",
    "definition": "Straighten or extend one's body or a part of one's body to its full length.",
    "definitionVn": "kéo giãn cơ, vươn vai",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Stretch your arms and back after sitting at your desk for an hour.",
      "Daily stretching keeps your joints flexible."
    ],
    "exampleTranslations": [
      "Vươn vai và giãn lưng sau khi ngồi tại bàn học suốt một tiếng nhé.",
      "Kéo giãn cơ hàng ngày giữ cho các khớp xương luôn linh hoạt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_11",
    "word": "lift",
    "phonetic": "/lɪft/",
    "definition": "Raise to a higher position or level.",
    "definitionVn": "nâng lên, nhấc lên",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Lift with your legs, not with your lower back.",
      "He lifted the heavy barbell with proper form."
    ],
    "exampleTranslations": [
      "Hãy dùng sức của đôi chân để nâng, đừng dùng sức của lưng dưới nhé.",
      "Anh ấy đã nhấc thanh tạ nặng đúng kỹ thuật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_12",
    "word": "push",
    "phonetic": "/pʊʃ/",
    "definition": "Exert force on someone or something in order to move them away from oneself.",
    "definitionVn": "đẩy, xô đẩy",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Push the shopping cart smoothly down the supermarket aisle.",
      "Push open the glass door to enter the café."
    ],
    "exampleTranslations": [
      "Đẩy xe mua hàng nhẹ nhàng dọc lối đi siêu thị nhé.",
      "Đẩy cửa kính ra để bước vào quán cà phê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_13",
    "word": "pull",
    "phonetic": "/pʊl/",
    "definition": "Exert force on someone or something so as to cause movement toward oneself.",
    "definitionVn": "kéo lại gần, kéo cửa",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Pull the door handle toward you to open.",
      "The horse pulled the wooden carriage along the road."
    ],
    "exampleTranslations": [
      "Kéo tay nắm cửa về phía bạn để mở nhé.",
      "Chú ngựa kéo chiếc xe ngựa gỗ dọc theo con đường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_14",
    "word": "throw",
    "phonetic": "/θroʊ/",
    "definition": "Propel something with force through the air by a movement of the arm and hand.",
    "definitionVn": "ném, quăng (bóng)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Throw the basketball straight into the hoop.",
      "Never throw plastic litter onto the street."
    ],
    "exampleTranslations": [
      "Ném bóng rổ thẳng vào trong rổ nhé.",
      "Không bao giờ ném rác nhựa ra đường phố nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_15",
    "word": "catch",
    "phonetic": "/kætʃ/",
    "definition": "Intercept and hold something which has been thrown, propelled, or dropped.",
    "definitionVn": "bắt lấy, đón lấy (bóng)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Catch the tennis ball with both hands.",
      "Run fast and catch the morning bus!"
    ],
    "exampleTranslations": [
      "Bắt quả bóng tennis bằng cả hai tay nhé.",
      "Chạy nhanh lên và đón kịp chuyến xe buýt buổi sáng nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_16",
    "word": "kick",
    "phonetic": "/kɪk/",
    "definition": "Strike or propel forcibly with the foot.",
    "definitionVn": "sút bóng, đá (bằng chân)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "He kicked the football past the goalkeeper into the net.",
      "Practice kicking drills to build leg power."
    ],
    "exampleTranslations": [
      "Cậu ấy đã sút quả bóng vượt qua thủ môn vào thẳng lưới.",
      "Luyện tập các bài tập sút bóng để tăng cường lực chân nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_17",
    "word": "kneel",
    "phonetic": "/niːl/",
    "definition": "Fall or rest on the knees.",
    "definitionVn": "quỳ gối, quỳ xuống",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Kneel on a soft yoga mat when performing stretching exercises.",
      "He knelt down to tie his shoelace."
    ],
    "exampleTranslations": [
      "Quỳ trên thảm tập yoga mềm khi thực hiện các bài tập kéo giãn nhé.",
      "Cậu ấy đã quỳ xuống để buộc lại dây giày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_18",
    "word": "wave",
    "phonetic": "/weɪv/",
    "definition": "Move one's hand to and fro in greeting or as a signal.",
    "definitionVn": "vẫy tay (chào hỏi)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Wave goodbye with a warm and friendly smile.",
      "She waved her hand to get her friend's attention."
    ],
    "exampleTranslations": [
      "Vẫy tay chào tạm biệt với một nụ cười ấm áp và thân thiện nhé.",
      "Cô ấy vẫy tay để thu hút sự chú ý của bạn mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_19",
    "word": "nod",
    "phonetic": "/nɑːd/",
    "definition": "Lower and raise one's head slightly and briefly, especially in greeting, assent, or understanding.",
    "definitionVn": "gật đầu (đồng ý, chào)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "He nodded his head in agreement with the teacher's point.",
      "Nod politely when greeting someone in a quiet hall."
    ],
    "exampleTranslations": [
      "Cậu ấy gật đầu đồng ý với quan điểm của thầy giáo.",
      "Gật đầu lịch sự khi chào hỏi ai đó trong hội trường yên tĩnh nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_body_m_20",
    "word": "exercise",
    "phonetic": "/ˈeksərsaɪz/",
    "definition": "Activity requiring physical effort, carried out to sustain or improve health and fitness.",
    "definitionVn": "tập thể dục, rèn luyện thân thể",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_body_movements",
    "themeNameVn": "Vận động cơ thể",
    "themeNameEn": "Body Movements",
    "examples": [
      "Exercise regularly thirty minutes a day to stay vibrant.",
      "Morning exercise boosts your energy for the entire day."
    ],
    "exampleTranslations": [
      "Hãy tập thể dục đều đặn 30 phút mỗi ngày để luôn tràn đầy năng lượng.",
      "Tập thể dục buổi sáng nâng cao sinh lực cho cả ngày dài."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_01",
    "word": "store",
    "phonetic": "/stɔːr/",
    "definition": "A retail establishment selling items to the public.",
    "definitionVn": "cửa hàng, tiệm bách hóa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "The convenience store is open 24/7 for daily necessities.",
      "Buy snacks and drinks at the corner store."
    ],
    "exampleTranslations": [
      "Cửa hàng tiện lợi mở cửa 24/7 phục vụ các nhu yếu phẩm hàng ngày.",
      "Mua đồ ăn nhẹ và nước uống tại cửa hàng góc phố nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_02",
    "word": "laundry",
    "phonetic": "/ˈlɔːndri/",
    "definition": "A business establishment where clothes are washed and ironed.",
    "definitionVn": "tiệm giặt ủi, tiệm giặt sấy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Drop off your winter duvets at the laundromat laundry service.",
      "The 24-hour self-service coin laundry is very handy."
    ],
    "exampleTranslations": [
      "Gửi những chiếc chăn mùa đông tại tiệm giặt ủi nhé.",
      "Tiệm giặt sấy tự động bỏ xu 24h rất tiện lợi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_03",
    "word": "barber",
    "phonetic": "/ˈbɑːrbər/",
    "definition": "A person whose business is cutting and dressing people's, especially men's, hair.",
    "definitionVn": "thợ cắt tóc nam, hiệu cắt tóc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "He gets a neat haircut at the local barber shop once a month.",
      "The skilled barber trimmed his beard with precision."
    ],
    "exampleTranslations": [
      "Anh ấy đi cắt tóc gọn gàng ở hiệu cắt tóc nam địa phương mỗi tháng một lần.",
      "Người thợ cắt tóc lành nghề đã tỉa râu cho anh ấy rất chuẩn xác."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_04",
    "word": "salon",
    "phonetic": "/səˈlɑːn/",
    "definition": "An establishment where a hairdresser, beautician, or couturier conducts business.",
    "definitionVn": "thẩm mỹ viện, salon làm tóc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "She visited the beauty salon for a new hairstyle.",
      "The hair salon uses organic shampoo and conditioning products."
    ],
    "exampleTranslations": [
      "Cô ấy đã đến salon làm đẹp để làm một kiểu tóc mới.",
      "Salon tóc sử dụng các sản phẩm dầu gội và dầu xả hữu cơ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_05",
    "word": "repair",
    "phonetic": "/rɪˈper/",
    "definition": "A place or service where broken or damaged goods are mended.",
    "definitionVn": "tiệm sửa chữa, dịch vụ bảo trì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Take your punctured motorbike tire to the roadside repair shop.",
      "The smartphone repair shop fixed my screen in an hour."
    ],
    "exampleTranslations": [
      "Mang lốp xe máy bị thủng đến tiệm sửa xe ven đường nhé.",
      "Tiệm sửa điện thoại thông minh đã thay màn hình cho tôi trong một tiếng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_06",
    "word": "ATM",
    "phonetic": "/ˌeɪ tiː ˈem/",
    "definition": "Automated Teller Machine, an electronic banking outlet for withdrawing cash.",
    "definitionVn": "cây rút tiền tự động ATM",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Withdraw local cash securely from the 24-hour bank ATM.",
      "Remember to take your card after completing the ATM transaction."
    ],
    "exampleTranslations": [
      "Rút tiền mặt nội địa an toàn từ cây ATM ngân hàng 24h nhé.",
      "Hãy nhớ lấy lại thẻ sau khi hoàn thành giao dịch tại cây ATM."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_07",
    "word": "police",
    "phonetic": "/pəˈliːs/",
    "definition": "The civil force of a state, responsible for the prevention and detection of crime.",
    "definitionVn": "lực lượng cảnh sát, công an",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Police officers patrol the neighborhood to ensure safety and order.",
      "Call the emergency police number 113 if you need urgent help."
    ],
    "exampleTranslations": [
      "Các chiến sĩ công an tuần tra khu phố để đảm bảo an ninh trật tự.",
      "Hãy gọi số khẩn cấp công an 113 nếu bạn cần trợ giúp khẩn cấp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_08",
    "word": "fire",
    "phonetic": "/ˈfaɪər/",
    "definition": "A public emergency service that extinguishes fires and rescues people.",
    "definitionVn": "đội cứu hỏa, phòng cháy chữa cháy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Call the fire rescue service hotline 114 in case of a blaze.",
      "Firefighters arrived rapidly with their red fire engine."
    ],
    "exampleTranslations": [
      "Hãy gọi đường dây nóng cứu hỏa 114 trong trường hợp có hỏa hoạn.",
      "Lính cứu hỏa đã đến nhanh chóng cùng chiếc xe chữa cháy màu đỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_09",
    "word": "clinic",
    "phonetic": "/ˈklɪnɪk/",
    "definition": "An establishment or hospital department where outpatients are given medical treatment or advice.",
    "definitionVn": "phòng khám y tế (ngoại trú)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "The community health clinic provides vaccinations and regular checkups.",
      "Visit the dental clinic for a routine check."
    ],
    "exampleTranslations": [
      "Phòng khám y tế cộng đồng cung cấp dịch vụ tiêm chủng và khám định kỳ.",
      "Hãy đến phòng khám nha khoa để kiểm tra răng định kỳ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_10",
    "word": "library",
    "phonetic": "/ˈlaɪbreri/",
    "definition": "A public building or room containing collections of books for reading or borrowing.",
    "definitionVn": "thư viện công cộng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "The city public library has thousands of free English books.",
      "Borrow books with your digital library membership card."
    ],
    "exampleTranslations": [
      "Thư viện công cộng thành phố có hàng ngàn đầu sách tiếng Anh miễn phí.",
      "Mượn sách bằng thẻ thành viên thư viện số của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_11",
    "word": "park",
    "phonetic": "/pɑːrk/",
    "definition": "A large public green area in a town used for recreation.",
    "definitionVn": "công viên công cộng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Families relax and jog in the green city park on weekends.",
      "Public parks improve urban air quality and wellbeing."
    ],
    "exampleTranslations": [
      "Các gia đình thư giãn và chạy bộ trong công viên cây xanh vào cuối tuần.",
      "Công viên công cộng giúp cải thiện chất lượng không khí và sức khỏe đô thị."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_12",
    "word": "service",
    "phonetic": "/ˈsɜːrvɪs/",
    "definition": "The action of helping or doing work for someone; a public utility.",
    "definitionVn": "dịch vụ công, sự phục vụ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Excellent customer service leaves a positive lasting impression.",
      "Public transportation is an essential city service."
    ],
    "exampleTranslations": [
      "Dịch vụ khách hàng xuất sắc để lại ấn tượng tốt đẹp lâu dài.",
      "Giao thông công cộng là một dịch vụ thiết yếu của thành phố."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_13",
    "word": "open",
    "phonetic": "/ˈoʊpən/",
    "definition": "Allowing access, passage, or a view; not closed.",
    "definitionVn": "mở cửa (hoạt động)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "The pharmacy is open 24 hours every day.",
      "What time does the supermarket open in the morning?"
    ],
    "exampleTranslations": [
      "Hiệu thuốc mở cửa 24 giờ mỗi ngày.",
      "Siêu thị mở cửa lúc mấy giờ vào buổi sáng vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_14",
    "word": "close",
    "phonetic": "/kloʊz/",
    "definition": "Having an end; not open for business.",
    "definitionVn": "đóng cửa (nghỉ)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "The post office closes at 5:00 PM on weekdays.",
      "The bank is closed on Sundays."
    ],
    "exampleTranslations": [
      "Bưu điện đóng cửa lúc 5h chiều các ngày trong tuần.",
      "Ngân hàng đóng cửa vào ngày Chủ Nhật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_15",
    "word": "helper",
    "phonetic": "/ˈhelpər/",
    "definition": "A person who helps someone else, especially a worker.",
    "definitionVn": "người giúp đỡ, trợ lý",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "The friendly store helper helped me find the right aisle.",
      "Community volunteers are invaluable helpers."
    ],
    "exampleTranslations": [
      "Người phụ việc thân thiện ở cửa hàng đã giúp tôi tìm đúng lối đi.",
      "Những tình nguyện viên cộng đồng là những người giúp đỡ vô giá."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_16",
    "word": "counter",
    "phonetic": "/ˈkaʊntər/",
    "definition": "A long flat-topped fixture across which business is conducted with customers.",
    "definitionVn": "quầy phục vụ, quầy giao dịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Order your favorite coffee drink at the front service counter.",
      "Pay for your items at the cashier counter."
    ],
    "exampleTranslations": [
      "Gọi món đồ uống cà phê yêu thích tại quầy dịch vụ phía trước nhé.",
      "Thanh toán các món đồ của bạn tại quầy thu ngân nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_17",
    "word": "receipt",
    "phonetic": "/rɪˈsiːt/",
    "definition": "A written acknowledgment of having received a specified sum of money or goods.",
    "definitionVn": "hóa đơn, biên lai thanh toán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Always check your printed store receipt before leaving.",
      "Keep the receipt if you need an item warranty."
    ],
    "exampleTranslations": [
      "Hãy luôn kiểm tra biên lai cửa hàng đã in trước khi rời đi nhé.",
      "Hãy giữ lại hóa đơn nếu bạn cần bảo hành sản phẩm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_18",
    "word": "discount",
    "phonetic": "/ˈdɪskaʊnt/",
    "definition": "A deduction from the usual cost of something.",
    "definitionVn": "mã giảm giá, chiết khấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Students receive a 15% discount on stationery supplies.",
      "Scan your membership app for exclusive store discounts."
    ],
    "exampleTranslations": [
      "Học sinh sinh viên được giảm giá 15% khi mua văn phòng phẩm.",
      "Quét ứng dụng thành viên của bạn để nhận giảm giá độc quyền nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_19",
    "word": "package",
    "phonetic": "/ˈpækɪdʒ/",
    "definition": "An object or group of objects wrapped in paper or packed in a box.",
    "definitionVn": "bưu kiện, gói hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Pick up your delivered parcel package at the convenience store.",
      "The courier delivered the package safely."
    ],
    "exampleTranslations": [
      "Nhận gói hàng bưu kiện đã giao tại cửa hàng tiện lợi nhé.",
      "Người giao hàng đã chuyển phát gói bưu phẩm an toàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_conven_20",
    "word": "market",
    "phonetic": "/ˈmɑːrkɪt/",
    "definition": "A regular gathering of people for the purchase and sale of provisions, livestock, and other commodities.",
    "definitionVn": "chợ dân sinh, chợ truyền thống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_convenience_services",
    "themeNameVn": "Dịch vụ & Tiện ích",
    "themeNameEn": "Convenience Services",
    "examples": [
      "Local morning markets offer fresh organic produce at honest prices.",
      "Ben Thanh Market is a vibrant shopping hub."
    ],
    "exampleTranslations": [
      "Các khu chợ sớm địa phương cung cấp nông sản hữu cơ tươi với giá thành hợp lý.",
      "Chợ Bến Thành là trung tâm mua sắm sôi động."
    ],
    "synonyms": [],
    "antonyms": []
  },
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
  },
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
  },
  {
    "id": "bv_street_01",
    "word": "street food",
    "phonetic": "/striːt fuːd/",
    "definition": "Ready-to-eat food or drink sold by a hawker or vendor in a street or other public place.",
    "definitionVn": "ẩm thực đường phố, món ăn vỉa hè",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Vietnamese street food is celebrated worldwide for fresh herbs and rich flavors.",
      "Explore the night street food market in Hanoi Old Quarter."
    ],
    "exampleTranslations": [
      "Ẩm thực đường phố Việt Nam được ca ngợi khắp thế giới nhờ rau thơm tươi và hương vị đậm đà.",
      "Khám phá khu chợ đêm ẩm thực đường phố ở Phố Cổ Hà Nội nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_02",
    "word": "snack",
    "phonetic": "/snæk/",
    "definition": "A small amount of food eaten between meals.",
    "definitionVn": "món ăn nhẹ, đồ ăn vặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Fresh fruit slices are healthy afternoon snacks.",
      "Grab a light snack before starting your evening study session."
    ],
    "exampleTranslations": [
      "Những lát trái cây tươi là món ăn vặt buổi chiều lành mạnh.",
      "Kiếm một món ăn nhẹ trước khi bắt đầu buổi học tối nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_03",
    "word": "spring roll",
    "phonetic": "/sprɪŋ roʊl/",
    "definition": "An Asian snack consisting of pastry filled with minced vegetables and meat, rolled and fried or served fresh.",
    "definitionVn": "nem rán, chả giò, gỏi cuốn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crispy fried spring rolls dipped in sweet-and-sour fish sauce are irresistible.",
      "Fresh summer spring rolls are light and healthy."
    ],
    "exampleTranslations": [
      "Nem rán giòn rụm chấm nước mắm chua ngọt ngon không cưỡng lại được.",
      "Gỏi cuốn tôm thịt thanh mát và tốt cho sức khỏe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_04",
    "word": "pho",
    "phonetic": "/fɜːr/",
    "definition": "A Vietnamese soup consisting of broth, rice noodles, herbs, and meat (usually beef or chicken).",
    "definitionVn": "món phở truyền thống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "A steaming hot bowl of beef pho is the quintessential Vietnamese breakfast.",
      "Squeeze fresh lime and add herbs to your pho."
    ],
    "exampleTranslations": [
      "Tô phở bò nóng hổi bốc khói là bữa ăn sáng tinh túy của người Việt.",
      "Vắt chanh tươi và thêm rau thơm vào bát phở nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_05",
    "word": "banh mi",
    "phonetic": "/ˈbɑːn miː/",
    "definition": "A Vietnamese baguette sandwich filled with pork, pâté, pickled vegetables, cilantro, and chili.",
    "definitionVn": "bánh mì kẹp Việt Nam",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crisp Vietnamese banh mi is world-famous as the ultimate sandwich.",
      "Buy a hot banh mi with egg and pate from the street cart."
    ],
    "exampleTranslations": [
      "Bánh mì Việt Nam giòn rụm nổi tiếng khắp thế giới như món bánh kẹp đỉnh cao.",
      "Mua một chiếc bánh mì trứng pa-tê nóng giòn từ xe đẩy vỉa hè nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_06",
    "word": "pancake",
    "phonetic": "/ˈpænkeɪk/",
    "definition": "A thin crispy savory crepe such as Vietnamese Banh Xeo.",
    "definitionVn": "bánh xèo giòn rụm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crispy Vietnamese sizzling pancakes (Banh Xeo) are stuffed with shrimp, pork, and bean sprouts.",
      "Wrap banh xeo in mustard leaves and dip in sauce."
    ],
    "exampleTranslations": [
      "Bánh xèo giòn rụm của Việt Nam được nhân đầy tôm, thịt và giá đỗ.",
      "Cuốn bánh xèo trong lá cải cay và chấm nước mắm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_07",
    "word": "popcorn",
    "phonetic": "/ˈpɑːpkɔːrn/",
    "definition": "Corn kernels that pop open and puff up when heated, eaten as a snack with butter or caramel.",
    "definitionVn": "bắp rang bơ, bỏng ngô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "A large bucket of sweet butter popcorn is a must-have at the cinema.",
      "Freshly popped popcorn smells buttery and delicious."
    ],
    "exampleTranslations": [
      "Một hộp bắp rang bơ ngọt lớn là món không thể thiếu ở rạp chiếu phim.",
      "Bắp rang bơ mới nổ có mùi thơm bơ béo ngậy rất ngon."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_08",
    "word": "chips",
    "phonetic": "/tʃɪps/",
    "definition": "Crispy slices of potato that have been deep-fried or baked until crunchy.",
    "definitionVn": "khoai tây chiên giòn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crispy potato chips seasoned with sea salt are crunchy snacks.",
      "Enjoy chips and guacamole with friends."
    ],
    "exampleTranslations": [
      "Khoai tây chiên giòn rụm rắc muối biển là món ăn nhẹ giòn tan.",
      "Thưởng thức khoai tây chiên và sốt quả bơ cùng bạn bè nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_09",
    "word": "nuts",
    "phonetic": "/nʌts/",
    "definition": "Hard-shelled seeds of certain plants, typically edible and rich in healthy fats and proteins.",
    "definitionVn": "các loại hạt (hạnh nhân, óc chó, điều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Roasted cashew nuts from Binh Phuoc are crunchy and buttery.",
      "Eating a handful of mixed nuts daily is heart-healthy."
    ],
    "exampleTranslations": [
      "Hạt điều rang Bình Phước rất giòn và béo bùi.",
      "Ăn một nắm các loại hạt hỗn hợp mỗi ngày rất tốt cho tim mạch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_10",
    "word": "peanut",
    "phonetic": "/ˈpiːnʌt/",
    "definition": "The edible seed of a South American plant, which ripens underground in a pod.",
    "definitionVn": "hạt đậu phộng, hạt lạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Boiled peanuts and roasted salted peanuts are classic roadside snacks.",
      "Sprinkle crushed roasted peanuts over sweet desserts."
    ],
    "exampleTranslations": [
      "Đậu phộng luộc và lạc rang muối là những món ăn vặt vỉa hè kinh điển.",
      "Rắc đậu phộng rang giã nhỏ lên các món chè ngọt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_11",
    "word": "corn",
    "phonetic": "/kɔːrn/",
    "definition": "A North American cereal plant that yields large grains, or kernels, set in rows on a cob.",
    "definitionVn": "bắp ngô, ngô nướng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Sweet grilled corn brushed with scallion oil is an addictive street snack.",
      "Steamed sweet corn is fragrant and nutritious."
    ],
    "exampleTranslations": [
      "Bắp ngô nướng quết mỡ hành là món ăn vặt đường phố gây nghiện.",
      "Bắp ngô ngọt hấp thơm lừng và bổ dưỡng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_12",
    "word": "sausage",
    "phonetic": "/ˈsɔːsɪdʒ/",
    "definition": "An item of food in the form of a cylindrical length of minced meat encased in a skin.",
    "definitionVn": "xúc xích, lạp xưởng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Grilled skewers of sausages smell mouthwatering at the night market.",
      "Kids enjoy fried sausages with ketchup."
    ],
    "exampleTranslations": [
      "Những xiên xúc xích nướng thơm nức mũi tại khu chợ đêm.",
      "Trẻ con rất thích xúc xích chiên chấm sốt cà chua."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_13",
    "word": "skewers",
    "phonetic": "/ˈskjuːərz/",
    "definition": "A long piece of wood or metal used for holding pieces of food together during grilling.",
    "definitionVn": "xiên que nướng, thịt xiên nướng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Charcoal-grilled pork skewers seasoned with lemongrass are incredibly savory.",
      "Street vendors grill chicken skewers over hot coals."
    ],
    "exampleTranslations": [
      "Thịt lợn xiên que nướng than hoa tẩm ướp sả thơm ngon đậm đà.",
      "Những người bán hàng rong nướng xiên gà trên than hồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_14",
    "word": "dumpling",
    "phonetic": "/ˈdʌmplɪŋ/",
    "definition": "A small savory ball of dough, typically steamed or fried with meat filling.",
    "definitionVn": "há cảo, sủi cảo, bánh bao nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Steamed shrimp dumplings in bamboo baskets are delicate and juicy.",
      "Dip fried pork dumplings in chili soy sauce."
    ],
    "exampleTranslations": [
      "Há cảo tôm hấp trong xửng tre vừa mềm vừa mọng nước.",
      "Chấm sủi cảo thịt heo chiên vào nước tương ớt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_15",
    "word": "sauce",
    "phonetic": "/sɔːs/",
    "definition": "A liquid or semi-liquid substance served with food to add moistness and flavor.",
    "definitionVn": "nước sốt, nước chấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Sweet chili sauce and garlic mayonnaise are delicious dipping sauces.",
      "Pour savory gravy sauce over the grilled meat."
    ],
    "exampleTranslations": [
      "Nước sốt ớt ngọt và xốt mayonnaise tỏi là những loại nước chấm rất ngon.",
      "Rưới nước sốt đậm đà lên món thịt nướng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_16",
    "word": "chili",
    "phonetic": "/ˈtʃɪli/",
    "definition": "A small hot-tasting pod used to add heat to food.",
    "definitionVn": "ớt cay, sa tế ớt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Add a spoonful of roasted chili oil to your spicy soup.",
      "Fresh red chili peppers give a fiery punch to dishes."
    ],
    "exampleTranslations": [
      "Thêm một thìa ớt sa tế vào tô súp cay của bạn nhé.",
      "Những quả ớt đỏ tươi mang lại vị cay nồng bùng nổ cho món ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_17",
    "word": "tasty",
    "phonetic": "/ˈteɪsti/",
    "definition": "Having a pleasant, distinct flavor; delicious.",
    "definitionVn": "ngon miệng, đậm đà",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "This roadside noodle soup is exceptionally tasty and cheap.",
      "Try these tasty handmade rice crackers."
    ],
    "exampleTranslations": [
      "Bát bún vỉa hè này đặc biệt thơm ngon và giá lại rất rẻ.",
      "Hãy nếm thử những chiếc bánh gạo thủ công thơm ngon này nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_18",
    "word": "crispy",
    "phonetic": "/ˈkrɪspi/",
    "definition": "Pleasantly thin, dry, and easily broken; crunchy.",
    "definitionVn": "giòn tan, giòn rụm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "The golden banh mi crust is delightfully crispy on the outside.",
      "Enjoy crispy fried chicken fresh out of the fryer."
    ],
    "exampleTranslations": [
      "Vỏ bánh mì vàng ươm giòn rụm thích thú ở bên ngoài.",
      "Thưởng thức gà rán giòn tan vừa mới vớt ra khỏi chảo nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_19",
    "word": "vendor",
    "phonetic": "/ˈvendər/",
    "definition": "A person or company offering something for sale, especially a trader in the street.",
    "definitionVn": "người bán hàng rong, tiểu thương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Street food vendors wake up early to prepare fresh ingredients.",
      "The friendly fruit vendor offered a sweet sample."
    ],
    "exampleTranslations": [
      "Những người bán hàng ăn đường phố dậy từ sớm để chuẩn bị nguyên liệu tươi ngon.",
      "Người bán hoa quả thân thiện đã mời ăn thử một miếng ngọt lịm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_20",
    "word": "stall",
    "phonetic": "/stɔːl/",
    "definition": "A stand, booth, or compartment for the sale of goods in a market.",
    "definitionVn": "quầy hàng, sạp hàng ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "We sat on little plastic stools around the busy street food stall.",
      "The noodle stall has served customers for over thirty years."
    ],
    "exampleTranslations": [
      "Chúng tôi ngồi trên những chiếc ghế nhựa nhỏ quanh quầy ăn vỉa hè đông đúc.",
      "Sạp bún phở đã phục vụ thực khách hơn ba mươi năm qua."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_01",
    "word": "baby",
    "phonetic": "/ˈbeɪbi/",
    "definition": "A very young child, especially one newly or recently born.",
    "definitionVn": "em bé, trẻ sơ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The newborn baby slept peacefully in her mother's warm arms.",
      "Babies smile when they recognize their parents' voices."
    ],
    "exampleTranslations": [
      "Em bé mới sinh ngủ bình yên trong vòng tay ấm áp của mẹ.",
      "Các em bé mỉm cười khi nhận ra giọng nói của bố mẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_02",
    "word": "infant",
    "phonetic": "/ˈɪnfənt/",
    "definition": "A very young child or baby in the earliest stage of development.",
    "definitionVn": "trẻ nhỏ dưới 1 tuổi, nhũ nhi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Infants need adequate sleep, gentle care, and proper nutrition.",
      "Regular health checkups ensure healthy infant growth."
    ],
    "exampleTranslations": [
      "Trẻ nhỏ cần ngủ đủ giấc, được chăm sóc ân cần và dinh dưỡng hợp lý.",
      "Khám sức khỏe định kỳ đảm bảo sự phát triển khỏe mạnh của trẻ nhũ nhi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_03",
    "word": "toddler",
    "phonetic": "/ˈtɑːdlər/",
    "definition": "A young child who is just beginning to walk (usually aged 1 to 3).",
    "definitionVn": "trẻ chập chững biết đi (1-3 tuổi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The energetic toddler took his first wobbly steps across the rug.",
      "Toddlers are endlessly curious about exploring their surroundings."
    ],
    "exampleTranslations": [
      "Đứa trẻ đang tập đi chập chững bước những bước đầu tiên trên thảm.",
      "Trẻ ở độ tuổi tập đi vô cùng tò mò khám phá thế giới xung quanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_04",
    "word": "child",
    "phonetic": "/tʃaɪld/",
    "definition": "A young human being below the age of full physical development (plural: children).",
    "definitionVn": "đứa trẻ, thiếu nhi (số ít)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Every child deserves love, protection, and a quality education.",
      "She had a joyful and imaginative imagination as a child."
    ],
    "exampleTranslations": [
      "Mọi đứa trẻ đều xứng đáng được yêu thương, bảo vệ và có nền giáo dục chất lượng.",
      "Cô ấy có trí tưởng tượng phong phú và vui tươi thuở ấu thơ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_05",
    "word": "teenager",
    "phonetic": "/ˈtiːneɪdʒər/",
    "definition": "A person aged between 13 and 19 years old.",
    "definitionVn": "thanh thiếu niên (13 - 19 tuổi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Teenagers develop independence, critical thinking, and new passions.",
      "She is an ambitious teenager aiming to study abroad."
    ],
    "exampleTranslations": [
      "Thanh thiếu niên phát triển tính tự lập, tư duy phản biện và những đam mê mới.",
      "Cô ấy là một thiếu niên đầy hoài bão với mục tiêu đi du học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_06",
    "word": "youth",
    "phonetic": "/juːθ/",
    "definition": "The period between childhood and adult age; young people collectively.",
    "definitionVn": "tuổi trẻ, giới trẻ, thanh xuân",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Youth is a precious time to learn, explore, and build character.",
      "The energetic youth volunteer in community green projects."
    ],
    "exampleTranslations": [
      "Tuổi trẻ là quãng thời gian quý giá để học tập, khám phá và rèn luyện nhân cách.",
      "Giới trẻ năng động tình nguyện tham gia các dự án xanh của cộng đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_07",
    "word": "adult",
    "phonetic": "/əˈdʌlt/",
    "definition": "A person who is fully grown or developed.",
    "definitionVn": "người trưởng thành, người lớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Adults take on responsibilities for career, family, and society.",
      "Learning continues throughout your entire adult life."
    ],
    "exampleTranslations": [
      "Người trưởng thành gánh vác trách nhiệm với sự nghiệp, gia đình và xã hội.",
      "Việc học tập vẫn tiếp tục diễn ra trong suốt cuộc đời người lớn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_08",
    "word": "elderly",
    "phonetic": "/ˈeldərli/",
    "definition": "Of a person, old or aging; past middle age.",
    "definitionVn": "người cao tuổi, người già",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Respect, assist, and care for elderly citizens in society.",
      "The elderly couple took a gentle walk around the morning park."
    ],
    "exampleTranslations": [
      "Hãy kính trọng, giúp đỡ và chăm sóc những người cao tuổi trong xã hội.",
      "Đôi vợ chồng già đi dạo nhẹ nhàng quanh công viên buổi sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_09",
    "word": "birth",
    "phonetic": "/bɜːrθ/",
    "definition": "The emergence of a baby or other young from the body of its mother.",
    "definitionVn": "sự ra đời, sự sinh nở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The family celebrated the joyful birth of their twin daughters.",
      "Record your date and place of birth on official forms."
    ],
    "exampleTranslations": [
      "Gia đình đã tổ chức ăn mừng sự chào đời tràn ngập niềm vui của hai cô con gái sinh đôi.",
      "Ghi ngày và nơi sinh của bạn vào các mẫu đơn chính thức nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_10",
    "word": "birthday",
    "phonetic": "/ˈbɜːrθdeɪ/",
    "definition": "The anniversary of the day on which a person was born.",
    "definitionVn": "ngày sinh nhật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Happy Birthday! Wishing you good health, joy, and success!",
      "We surprised him with a birthday cake and gifts."
    ],
    "exampleTranslations": [
      "Chúc mừng sinh nhật! Chúc bạn dồi dào sức khỏe, niềm vui và thành công!",
      "Chúng tôi đã làm anh ấy bất ngờ với chiếc bánh sinh nhật và quà tặng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_11",
    "word": "childhood",
    "phonetic": "/ˈtʃaɪldhʊd/",
    "definition": "The state or period of being a child.",
    "definitionVn": "thời thơ ấu, tuổi ấu thơ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Memories of a happy childhood in the countryside stay in our hearts forever.",
      "I spent my early childhood reading storybooks."
    ],
    "exampleTranslations": [
      "Những kỷ niệm về tuổi thơ êm đềm ở làng quê sẽ mãi in sâu trong tim chúng ta.",
      "Tôi đã trải qua thời thơ ấu đọc những cuốn truyện tranh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_12",
    "word": "grow",
    "phonetic": "/ɡroʊ/",
    "definition": "Undergo natural development by increasing in size and changing physically.",
    "definitionVn": "lớn lên, trưởng thành, phát triển",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Children grow taller and stronger through sports and balanced meals.",
      "Never stop learning and growing as a person."
    ],
    "exampleTranslations": [
      "Trẻ em lớn lên cao hơn và khỏe mạnh hơn qua thể thao và bữa ăn cân bằng.",
      "Đừng bao giờ ngừng học hỏi và hoàn thiện bản thân nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_13",
    "word": "age",
    "phonetic": "/eɪdʒ/",
    "definition": "The length of time that a person has lived or a thing has existed.",
    "definitionVn": "tuổi tác, số tuổi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Age is just a number when it comes to pursuing your dreams.",
      "She started learning English at the early age of six."
    ],
    "exampleTranslations": [
      "Tuổi tác chỉ là con số khi bạn theo đuổi những ước mơ của mình.",
      "Cô ấy bắt đầu học tiếng Anh từ năm lên sáu tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_14",
    "word": "young",
    "phonetic": "/jʌŋ/",
    "definition": "Having lived or existed for only a short time; not old.",
    "definitionVn": "trẻ trung, tươi trẻ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Young minds are full of boundless curiosity and creative energy.",
      "Stay young at heart by keeping a positive attitude."
    ],
    "exampleTranslations": [
      "Tâm hồn trẻ thơ tràn đầy sự tò mò vô tận và năng lượng sáng tạo.",
      "Hãy giữ cho tâm hồn luôn tươi trẻ bằng một thái độ sống tích cực nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_15",
    "word": "old",
    "phonetic": "/oʊld/",
    "definition": "Having lived for a long time; no longer young.",
    "definitionVn": "già, cao tuổi, lâu năm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The wise old teacher shared inspiring stories with his students.",
      "Respect and care for old people in the community."
    ],
    "exampleTranslations": [
      "Người thầy giáo già thông thái đã chia sẻ những câu chuyện truyền cảm hứng cho học trò.",
      "Hãy kính trọng và chăm sóc người già trong cộng đồng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_16",
    "word": "mature",
    "phonetic": "/məˈtʃʊr/",
    "definition": "Fully developed physically; having reached an advanced stage of mental development.",
    "definitionVn": "chín chắn, trưởng thành",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "She handles unexpected difficulties with a mature and calm mindset.",
      "He grew into a mature, responsible young adult."
    ],
    "exampleTranslations": [
      "Cô ấy xử lý những khó khăn bất ngờ với một tâm thế chín chắn và điềm tĩnh.",
      "Cậu ấy đã trưởng thành thành một thanh niên có trách nhiệm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_17",
    "word": "generation",
    "phonetic": "/ˌdʒenəˈreɪʃn/",
    "definition": "All of the people born and living at about the same time, regarded collectively.",
    "definitionVn": "thế hệ (con người)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "The younger generation embraces technology and global connectivity.",
      "Three generations live harmoniously under one roof."
    ],
    "exampleTranslations": [
      "Thế hệ trẻ đón nhận công nghệ và sự kết nối toàn cầu.",
      "Ba thế hệ cùng chung sống hòa thuận dưới một mái nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_18",
    "word": "life",
    "phonetic": "/laɪf/",
    "definition": "The condition that distinguishes animals and plants from inorganic matter; existence.",
    "definitionVn": "cuộc sống, cuộc đời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "Live a meaningful life filled with learning, love, and contribution.",
      "English opens doors to a broader, brighter life."
    ],
    "exampleTranslations": [
      "Hãy sống một cuộc đời ý nghĩa ngập tràn học hỏi, yêu thương và cống hiến.",
      "Tiếng Anh mở ra cánh cửa dẫn tới một cuộc sống tươi sáng và rộng mở hơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_19",
    "word": "graduate",
    "phonetic": "/ˈɡrædʒueɪt/",
    "definition": "Successfully complete an academic degree, course of training, or high school.",
    "definitionVn": "tốt nghiệp (ra trường)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "She will graduate from the university with high academic honors.",
      "We celebrated happily on the day we graduated."
    ],
    "exampleTranslations": [
      "Cô ấy sẽ tốt nghiệp đại học với bằng danh dự cao quý.",
      "Chúng tôi đã cùng nhau ăn mừng vui vẻ trong ngày tốt nghiệp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_life_s_20",
    "word": "retire",
    "phonetic": "/rɪˈtaɪər/",
    "definition": "Leave one's job and cease to work, typically upon reaching the normal age for leaving employment.",
    "definitionVn": "nghỉ hưu, về hưu",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_life_stages_age",
    "themeNameVn": "Giai đoạn cuộc đời",
    "themeNameEn": "Life Stages & Ages",
    "examples": [
      "After forty dedicated years of teaching, the professor will retire next month.",
      "Retirees enjoy gardening and traveling."
    ],
    "exampleTranslations": [
      "Sau bốn mươi năm tận tụy cống hiến cho sự nghiệp trồng người, vị giáo sư sẽ về hưu vào tháng tới.",
      "Những người về hưu thích làm vườn và đi du lịch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_01",
    "word": "holiday",
    "phonetic": "/ˈhɑːlədeɪ/",
    "definition": "An extended period of leisure and recreation, especially one spent away from home; a public celebration.",
    "definitionVn": "ngày lễ, kỳ nghỉ lễ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Tet is the most cherished traditional holiday in Vietnam.",
      "What are your family's travel plans for the upcoming holiday?"
    ],
    "exampleTranslations": [
      "Tết là ngày nghỉ lễ truyền thống được trân quý nhất tại Việt Nam.",
      "Kế hoạch du lịch của gia đình bạn trong kỳ nghỉ lễ sắp tới là gì?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_02",
    "word": "festival",
    "phonetic": "/ˈfestɪvl/",
    "definition": "A day or period of celebration, typically a religious commemoration or cultural gathering.",
    "definitionVn": "lễ hội truyền thống, ngày hội",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "The Mid-Autumn Festival features colorful star lanterns, lion dances, and mooncakes.",
      "Thousands join the cultural boat racing festival."
    ],
    "exampleTranslations": [
      "Lễ hội Trung Thu có rước đèn ông sao rực rỡ, múa lân và bánh trung thu.",
      "Hàng ngàn người tham gia ngày hội đua thuyền truyền thống."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_03",
    "word": "celebration",
    "phonetic": "/ˌselɪˈbreɪʃn/",
    "definition": "The action of celebrating an important day or event.",
    "definitionVn": "sự ăn mừng, lễ kỷ niệm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Join the nationwide celebration of Independence Day on September 2nd.",
      "Family reunions are the heart of the festive celebration."
    ],
    "exampleTranslations": [
      "Tham gia lễ kỷ niệm Quốc khánh trên toàn quốc vào ngày 2 tháng 9 nhé.",
      "Những buổi sum họp gia đình là trái tim của ngày lễ ăn mừng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_04",
    "word": "Tet",
    "phonetic": "/tet/",
    "definition": "The Vietnamese Lunar New Year, the most important cultural celebration in Vietnam.",
    "definitionVn": "Tết Nguyên Đán (cổ truyền)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "During Tet, families gather to make square sticky rice cakes (Banh Chung).",
      "Wishing everyone peace, prosperity, and happiness for Tet!"
    ],
    "exampleTranslations": [
      "Trong dịp Tết, cả nhà quây quần gói bánh chưng vuông vức.",
      "Kính chúc mọi nhà bình an, thịnh vượng và hạnh phúc trong dịp Tết!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_05",
    "word": "New Year",
    "phonetic": "/nuː jɪr/",
    "definition": "The start of a new calendar year, celebrated at midnight on December 31st or Lunar New Year.",
    "definitionVn": "Năm Mới, thời khắc chuyển giao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Count down together to welcome the promising New Year!",
      "Happy New Year to you and your loved ones!"
    ],
    "exampleTranslations": [
      "Cùng nhau đếm ngược chào đón một Năm Mới đầy hứa hẹn nào!",
      "Chúc mừng Năm Mới đến bạn và những người thân yêu!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_06",
    "word": "Christmas",
    "phonetic": "/ˈkrɪsməs/",
    "definition": "The annual Christian festival celebrating Christ's birth, held on December 25th in the Western Church.",
    "definitionVn": "Lễ Giáng Sinh, Noel",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Decorate the green Christmas tree with shiny ornaments and sparkling lights.",
      "Merry Christmas and happy holidays to all!"
    ],
    "exampleTranslations": [
      "Trang trí cây thông Giáng Sinh xanh bằng những quả cầu lấp lánh và ánh đèn rực rỡ nhé.",
      "Chúc mọi người một mùa Giáng Sinh an lành và kỳ nghỉ vui vẻ!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_07",
    "word": "wedding",
    "phonetic": "/ˈwedɪŋ/",
    "definition": "A marriage ceremony, especially considered as including the associated celebrations.",
    "definitionVn": "lễ cưới, đám cưới",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "The bride and groom smiled radiantly on their wedding day.",
      "We attended our close friend's wedding celebration."
    ],
    "exampleTranslations": [
      "Cô dâu và chú rể mỉm cười rạng rỡ trong ngày cưới của họ.",
      "Chúng tôi đã tham dự lễ cưới của người bạn thân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_08",
    "word": "anniversary",
    "phonetic": "/ˌænɪˈvɜːrsəri/",
    "definition": "The date on which an event took place in a previous year.",
    "definitionVn": "ngày kỷ niệm, lễ kỷ niệm năm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "They celebrated their twenty-fifth wedding anniversary with family.",
      "The school celebrated the 50th anniversary of its founding."
    ],
    "exampleTranslations": [
      "Họ đã kỷ niệm 25 năm ngày cưới cùng gia đình.",
      "Trường học đã tổ chức lễ kỷ niệm 50 năm ngày thành lập."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_09",
    "word": "party",
    "phonetic": "/ˈpɑːrti/",
    "definition": "A social gathering of invited guests, typically involving eating, drinking, and entertainment.",
    "definitionVn": "bữa tiệc, buổi liên hoan",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "We hosted a fun surprise farewell party for our classmate.",
      "Dance and enjoy delicious food at the year-end party."
    ],
    "exampleTranslations": [
      "Chúng tôi đã tổ chức một bữa tiệc chia tay bất ngờ vui nhộn cho người bạn cùng lớp.",
      "Khiêu vũ và thưởng thức đồ ăn ngon tại tiệc tất niên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_10",
    "word": "gift",
    "phonetic": "/ɡɪft/",
    "definition": "A thing given willingly to someone without payment; a present.",
    "definitionVn": "món quà, quà tặng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "She wrapped the thoughtful birthday gift with a red ribbon.",
      "A meaningful book is the greatest gift of knowledge."
    ],
    "exampleTranslations": [
      "Cô ấy đã gói món quà sinh nhật chu đáo bằng một chiếc nơ đỏ.",
      "Một cuốn sách ý nghĩa là món quà tri thức tuyệt vời nhất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_11",
    "word": "present",
    "phonetic": "/ˈpreznt/",
    "definition": "A thing given to someone as a gift.",
    "definitionVn": "món quà biếu, phần quà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Children unwrapped their colorful presents with excitement on Christmas morning.",
      "He gave his mother a lovely present on Women's Day."
    ],
    "exampleTranslations": [
      "Trẻ em háo hức mở những hộp quà nhiều màu sắc vào sáng Giáng Sinh.",
      "Anh ấy đã tặng mẹ một món quà đáng yêu nhân ngày Phụ nữ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_12",
    "word": "fireworks",
    "phonetic": "/ˈfaɪərwɜːrks/",
    "definition": "A device containing gunpowder and other combustible chemicals which causes spectacular explosions when ignited.",
    "definitionVn": "pháo hoa (đêm giao thừa/lễ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Spectacular fireworks illuminated the night sky over Hoan Kiem Lake.",
      "Crowds cheered as the midnight fireworks began."
    ],
    "exampleTranslations": [
      "Màn pháo hoa rực rỡ đã thắp sáng bầu trời đêm trên Hồ Hoàn Kiếm.",
      "Đám đông hò reo khi những chùm pháo hoa lúc nửa đêm bắt đầu bung tỏa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_13",
    "word": "lantern",
    "phonetic": "/ˈlæntərn/",
    "definition": "A lamp with a transparent case protecting the flame or electric bulb, typically with a handle.",
    "definitionVn": "đèn lồng, đèn Trung Thu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Hoi An Ancient Town glows magically with thousands of silk lanterns at night.",
      "Children parade star-shaped lanterns during Mid-Autumn."
    ],
    "exampleTranslations": [
      "Phố Cổ Hội An tỏa sáng kỳ ảo với hàng ngàn chiếc đèn lồng lụa về đêm.",
      "Trẻ em rước đèn ông sao trong đêm Trung Thu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_14",
    "word": "parade",
    "phonetic": "/pəˈreɪd/",
    "definition": "A public procession, especially one celebrating a special day or event.",
    "definitionVn": "cuộc diễu hành, lễ diễu hành",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Thousands marched in the grand National Day parade in Ba Dinh Square.",
      "Marching bands played upbeat music during the festival parade."
    ],
    "exampleTranslations": [
      "Hàng ngàn người đã diễu hành trong lễ diễu binh Quốc khánh trọng thể tại Quảng trường Ba Đình.",
      "Các ban nhạc diễu hành chơi nhạc vui tươi trong lễ hội."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_15",
    "word": "costume",
    "phonetic": "/ˈkɑːstuːm/",
    "definition": "A set of clothes in a style typical of a particular country or historical period.",
    "definitionVn": "trang phục truyền thống, trang phục hóa trang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Ethnic groups wear magnificent hand-embroidered traditional costumes.",
      "Children dressed up in superhero costumes for the school play."
    ],
    "exampleTranslations": [
      "Các dân tộc diện những bộ trang phục truyền thống thêu tay tuyệt mỹ.",
      "Trẻ em hóa trang thành các siêu anh hùng cho vở kịch của trường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_16",
    "word": "tradition",
    "phonetic": "/trəˈdɪʃn/",
    "definition": "The transmission of customs or beliefs from generation to generation.",
    "definitionVn": "truyền thống, nét văn hóa lâu đời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Vietnamese tradition values filial piety, hospitality, and hard work.",
      "Passing down cultural traditions keeps heritage alive."
    ],
    "exampleTranslations": [
      "Truyền thống của người Việt luôn đề cao chữ hiếu, lòng hiếu khách và sự chăm chỉ.",
      "Việc truyền dạy các truyền thống văn hóa giữ cho di sản sống mãi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_17",
    "word": "custom",
    "phonetic": "/ˈkʌstəm/",
    "definition": "A traditional and widely accepted way of behaving or doing something that is specific to a particular society.",
    "definitionVn": "phong tục, tập quán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Giving lucky money in red envelopes is a beloved Lunar New Year custom.",
      "Learn local customs when traveling abroad."
    ],
    "exampleTranslations": [
      "Mừng tuổi bằng bao lì xì đỏ là phong tục được yêu thích trong dịp Tết Nguyên Đán.",
      "Hãy tìm hiểu các phong tục địa phương khi đi du lịch nước ngoài nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_18",
    "word": "wish",
    "phonetic": "/wɪʃ/",
    "definition": "Feel or express a strong desire or hope for someone's well-being or success.",
    "definitionVn": "lời chúc, ước nguyện",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "We wish you good health, prosperity, and joy for the new year.",
      "Make a wish before blowing out your birthday candles."
    ],
    "exampleTranslations": [
      "Chúng tôi kính chúc bạn dồi dào sức khỏe, an khang và niềm vui trong năm mới.",
      "Hãy ước một điều ước trước khi thổi nến sinh nhật nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_19",
    "word": "congratulate",
    "phonetic": "/kənˈɡrætʃuleɪt/",
    "definition": "Praise someone and say that one is pleased about a job, achievement, or special event.",
    "definitionVn": "chúc mừng, tán dương",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Friends gathered to congratulate him on passing his IELTS exam with a high score.",
      "Congratulate the newlyweds on their marriage."
    ],
    "exampleTranslations": [
      "Bạn bè đã tụ họp để chúc mừng anh ấy đạt điểm cao trong kỳ thi IELTS.",
      "Chúc mừng đôi tân lang tân nương nhân ngày cưới nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_20",
    "word": "feast",
    "phonetic": "/fiːst/",
    "definition": "A large meal, typically one in celebration of something.",
    "definitionVn": "bữa tiệc thịnh soạn, mâm cỗ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "The family enjoyed a lavish traditional feast on New Year's Eve.",
      "A festive feast brings relatives together around the table."
    ],
    "exampleTranslations": [
      "Cả gia đình cùng thưởng thức một mâm cỗ truyền thống thịnh soạn trong đêm Giao thừa.",
      "Một bữa tiệc lễ hội gắn kết họ hàng quây quần bên bàn ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_01",
    "word": "safe",
    "phonetic": "/seɪf/",
    "definition": "Protected from or not exposed to danger or risk.",
    "definitionVn": "an toàn, không nguy hiểm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Always wear a helmet to stay safe on the road.",
      "The school campus is a safe and supportive learning environment."
    ],
    "exampleTranslations": [
      "Hãy luôn đội mũ bảo hiểm để giữ an toàn trên đường nhé.",
      "Khuôn viên trường học là môi trường học tập an toàn và đầy yêu thương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_02",
    "word": "danger",
    "phonetic": "/ˈdeɪndʒər/",
    "definition": "The possibility of suffering harm or injury.",
    "definitionVn": "mối nguy hiểm, sự hiểm nghèo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Warning signs alert hikers to potential mountain trail danger.",
      "Do not swim in deep rivers alone due to high danger."
    ],
    "exampleTranslations": [
      "Biển báo cảnh báo người đi bộ về mối nguy hiểm tiềm ẩn trên đường mòn vùng núi.",
      "Không bơi ở những con sông sâu một mình vì mối nguy hiểm rất cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_03",
    "word": "warning",
    "phonetic": "/ˈwɔːrnɪŋ/",
    "definition": "A statement or event that warns of something or serves as cautionary advice.",
    "definitionVn": "lời cảnh báo, biển cảnh báo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Heed weather warnings and stay indoors during thunderstorms.",
      "The yellow warning sign indicates a slippery floor."
    ],
    "exampleTranslations": [
      "Hãy chú ý đến các cảnh báo thời tiết và ở trong nhà khi có giông bão nhé.",
      "Biển cảnh báo màu vàng báo hiệu sàn nhà đang trơn trượt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_04",
    "word": "caution",
    "phonetic": "/ˈkɔːʃn/",
    "definition": "Care taken to avoid danger or mistakes.",
    "definitionVn": "sự cẩn trọng, cẩn thận",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Proceed with caution when driving on wet mountain passes.",
      "Exercise caution when crossing busy multi-lane streets."
    ],
    "exampleTranslations": [
      "Hãy di chuyển cẩn trọng khi lái xe trên các con đèo ướt nhé.",
      "Hãy hết sức cẩn thận khi băng qua những con phố nhiều làn xe đông đúc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_05",
    "word": "risk",
    "phonetic": "/rɪsk/",
    "definition": "A situation involving exposure to danger.",
    "definitionVn": "rủi ro, nguy cơ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Regular exercise lowers the risk of cardiovascular disease.",
      "Never take unnecessary risks on the road."
    ],
    "exampleTranslations": [
      "Tập thể dục đều đặn giúp làm giảm nguy cơ mắc bệnh tim mạch.",
      "Không bao giờ mạo hiểm chấp nhận những rủi ro không đáng có trên đường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_06",
    "word": "rule",
    "phonetic": "/ruːl/",
    "definition": "One of a set of explicit or understood regulations or principles governing conduct.",
    "definitionVn": "quy tắc, luật lệ, nội quy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Follow library rules and keep your voice quiet.",
      "Obey all traffic safety rules to protect yourself and others."
    ],
    "exampleTranslations": [
      "Tuân thủ nội quy thư viện và giữ trật tự nhé.",
      "Hãy chấp hành mọi luật an toàn giao thông để bảo vệ bản thân và mọi người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_07",
    "word": "law",
    "phonetic": "/lɔː/",
    "definition": "The system of rules which a particular country or community recognizes as regulating the actions of its members.",
    "definitionVn": "pháp luật, luật pháp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Everyone must abide by the law equally.",
      "Traffic laws require drivers to stop at red lights."
    ],
    "exampleTranslations": [
      "Mọi người đều phải bình đẳng tuân theo pháp luật.",
      "Luật giao thông yêu cầu người lái xe phải dừng lại khi đèn đỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_08",
    "word": "stop",
    "phonetic": "/stɑːp/",
    "definition": "Come to an end; cease moving.",
    "definitionVn": "dừng lại, dừng hẳn",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Stop your vehicle completely at the red traffic light.",
      "Stop and look both ways before stepping off the curb."
    ],
    "exampleTranslations": [
      "Hãy dừng hẳn phương tiện khi có đèn giao thông màu đỏ nhé.",
      "Dừng lại và quan sát cả hai bên trước khi bước xuống lòng đường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_09",
    "word": "yield",
    "phonetic": "/jiːld/",
    "definition": "Give way to arguments, demands, or traffic.",
    "definitionVn": "nhường đường, nhường quyền ưu tiên",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Drivers must yield the right of way to pedestrians on the crosswalk.",
      "Yield to emergency ambulances with flashing sirens."
    ],
    "exampleTranslations": [
      "Người lái xe phải nhường đường cho người đi bộ trên vạch kẻ đường.",
      "Hãy nhường đường cho xe cấp cứu đang bật còi ưu tiên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_10",
    "word": "crosswalk",
    "phonetic": "/ˈkrɔːswɔːk/",
    "definition": "A marked part of a road where pedestrians have right of way to cross.",
    "definitionVn": "vạch kẻ đường cho người đi bộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Always cross the busy avenue at the pedestrian crosswalk.",
      "Wait until vehicles stop before stepping onto the crosswalk."
    ],
    "exampleTranslations": [
      "Hãy luôn băng qua đại lộ đông đúc tại vạch kẻ đường cho người đi bộ nhé.",
      "Hãy đợi cho đến khi các xe dừng hẳn trước khi bước lên vạch đi bộ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_11",
    "word": "helmet",
    "phonetic": "/ˈhelmɪt/",
    "definition": "A hard or padded protective hat, worn by motor riders or construction workers.",
    "definitionVn": "mũ bảo hiểm (an toàn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Fasten your certified helmet strap securely before riding a motorbike.",
      "Wearing a helmet reduces head injury risk dramatically."
    ],
    "exampleTranslations": [
      "Cài chặt quai mũ bảo hiểm đạt chuẩn trước khi đi xe máy nhé.",
      "Đội mũ bảo hiểm giúp giảm đáng kể nguy cơ chấn thương vùng đầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_12",
    "word": "seatbelt",
    "phonetic": "/ˈsiːtbelt/",
    "definition": "A belt securing a person to a seat in a vehicle or aircraft in case of an accident.",
    "definitionVn": "dây an toàn (trên xe, máy bay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Buckle your seatbelt as soon as you sit in a car.",
      "The law requires all passengers in vehicles to wear seatbelts."
    ],
    "exampleTranslations": [
      "Cài dây an toàn ngay khi bạn ngồi vào ghế ô tô nhé.",
      "Pháp luật quy định tất cả hành khách trên xe đều phải thắt dây an toàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_13",
    "word": "exit",
    "phonetic": "/ˈeɡzɪt/",
    "definition": "A way out, especially of a public building, room, or passenger vehicle.",
    "definitionVn": "lối thoát hiểm, cửa ra",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Emergency exit signs glow bright green in the dark.",
      "Locate the nearest emergency exit when you enter a building."
    ],
    "exampleTranslations": [
      "Biển báo lối thoát hiểm phát sáng màu xanh lá cây trong bóng tối.",
      "Hãy xác định lối thoát hiểm gần nhất khi bạn bước vào một tòa nhà nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_14",
    "word": "emergency",
    "phonetic": "/iˈmɜːrdʒənsi/",
    "definition": "A serious, unexpected, and often dangerous situation requiring immediate action.",
    "definitionVn": "tình huống khẩn cấp, trường hợp cấp cứu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Dial emergency hotline numbers immediately in crisis situations.",
      "Keep an emergency first-aid kit in your home."
    ],
    "exampleTranslations": [
      "Hãy gọi các số đường dây nóng khẩn cấp ngay lập tức trong các tình huống nguy cấp.",
      "Giữ một bộ dụng cụ sơ cứu khẩn cấp trong nhà của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_15",
    "word": "fire extinguisher",
    "phonetic": "/ˈfaɪər ɪkˈstɪŋɡwɪʃər/",
    "definition": "A portable device that discharges a jet of water, foam, or gas to extinguish a fire.",
    "definitionVn": "bình chữa cháy (cầm tay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Every floor has a red fire extinguisher mounted on the wall.",
      "Learn how to operate a fire extinguisher using the PASS technique."
    ],
    "exampleTranslations": [
      "Mỗi tầng đều có một bình chữa cháy màu đỏ gắn trên tường.",
      "Hãy học cách sử dụng bình chữa cháy theo đúng kỹ thuật nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_16",
    "word": "first aid",
    "phonetic": "/fɜːrst eɪd/",
    "definition": "Help given to a sick or injured person until full medical treatment is available.",
    "definitionVn": "sơ cứu ban đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Knowing basic first aid skills can save someone's life in an accident.",
      "Clean the scrape and apply first aid ointment."
    ],
    "exampleTranslations": [
      "Biết những kỹ năng sơ cứu cơ bản có thể cứu mạng một ai đó trong tai nạn.",
      "Rửa sạch vết trầy và bôi thuốc mỡ sơ cứu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_17",
    "word": "protect",
    "phonetic": "/prəˈtekt/",
    "definition": "Keep safe from harm or injury.",
    "definitionVn": "bảo vệ, che chở",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Wear sunscreen and sunglasses to protect your skin and eyes.",
      "Parents protect their children with loving care."
    ],
    "exampleTranslations": [
      "Thoa kem chống nắng và đeo kính râm để bảo vệ làn da và đôi mắt nhé.",
      "Cha mẹ che chở bảo vệ con cái bằng tình yêu thương ân cần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_18",
    "word": "prevent",
    "phonetic": "/prɪˈvent/",
    "definition": "Keep something from happening or arising.",
    "definitionVn": "ngăn chặn, phòng ngừa",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Proper handwashing helps prevent the spread of infectious illnesses.",
      "Prevention is always better and wiser than cure."
    ],
    "exampleTranslations": [
      "Rửa tay đúng cách giúp phòng ngừa sự lây lan của các bệnh truyền nhiễm.",
      "Phòng ngừa luôn luôn tốt hơn và khôn ngoan hơn chữa trị."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_19",
    "word": "guard",
    "phonetic": "/ɡɑːrd/",
    "definition": "Watch over in order to protect or control.",
    "definitionVn": "người bảo vệ, canh gác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "The security guard greeted students at the school entrance.",
      "Lighthouses guard ships against dangerous rocky reefs."
    ],
    "exampleTranslations": [
      "Bác bảo vệ chào đón các bạn học sinh tại cổng trường.",
      "Những ngọn hải đăng canh gác bảo vệ tàu bè khỏi các rạn đá ngầm nguy hiểm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_20",
    "word": "security",
    "phonetic": "/sɪˈkjʊrəti/",
    "definition": "The state of being free from danger or threat; safety precautions.",
    "definitionVn": "sự an ninh, an toàn bảo mật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Strong passwords enhance your digital account security.",
      "Airport security screens all luggage for passenger safety."
    ],
    "exampleTranslations": [
      "Mật khẩu mạnh nâng cao tính an toàn bảo mật cho tài khoản số của bạn.",
      "An ninh sân bay kiểm tra mọi hành lý vì sự an toàn của hành khách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_01",
    "word": "machine",
    "phonetic": "/məˈʃiːn/",
    "definition": "An apparatus using mechanical power and having several parts, each with a definite function.",
    "definitionVn": "máy móc, cỗ máy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Washing machines save hours of household labor every week.",
      "Modern automated machines improve manufacturing efficiency."
    ],
    "exampleTranslations": [
      "Máy giặt giúp tiết kiệm hàng giờ làm việc nhà mỗi tuần.",
      "Các loại máy móc tự động hiện đại giúp nâng cao hiệu quả sản xuất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_02",
    "word": "appliance",
    "phonetic": "/əˈplaɪəns/",
    "definition": "A device or piece of equipment designed to perform a specific task, typically a domestic one.",
    "definitionVn": "thiết bị gia dụng (trong nhà)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Energy-efficient home appliances help lower electricity bills.",
      "Kitchen appliances make cooking fast and enjoyable."
    ],
    "exampleTranslations": [
      "Các thiết bị gia dụng tiết kiệm điện giúp giảm tiền điện hàng tháng.",
      "Các thiết bị nhà bếp giúp việc nấu nướng nhanh và thú vị hơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_03",
    "word": "fridge",
    "phonetic": "/frɪdʒ/",
    "definition": "A refrigerator; an appliance or compartment which is artificially kept cool and used to store food and drink.",
    "definitionVn": "tủ lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Store fresh milk, vegetables, and leftovers in the fridge.",
      "The double-door fridge keeps food crisp and fresh."
    ],
    "exampleTranslations": [
      "Cất giữ sữa tươi, rau củ và thức ăn thừa trong tủ lạnh nhé.",
      "Chiếc tủ lạnh hai cánh giữ cho thực phẩm luôn tươi giòn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_04",
    "word": "washing machine",
    "phonetic": "/ˈwɑːʃɪŋ məˌʃiːn/",
    "definition": "A machine for washing clothes, bed linen, etc.",
    "definitionVn": "máy giặt quần áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Load dirty laundry into the front-load washing machine.",
      "The eco-friendly washing machine uses less water and detergent."
    ],
    "exampleTranslations": [
      "Cho quần áo bẩn vào máy giặt cửa trước nhé.",
      "Máy giặt thân thiện với môi trường sử dụng ít nước và bột giặt hơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_05",
    "word": "dryer",
    "phonetic": "/ˈdraɪər/",
    "definition": "A machine for drying something, especially clothes after washing.",
    "definitionVn": "máy sấy quần áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Tumble clothes in the electric clothes dryer on rainy days.",
      "Clean the lint filter of the dryer after every cycle."
    ],
    "exampleTranslations": [
      "Sấy quần áo trong máy sấy quần áo chạy điện vào những ngày mưa nhé.",
      "Làm sạch bộ lọc xơ vải của máy sấy sau mỗi mẻ sấy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_06",
    "word": "iron",
    "phonetic": "/ˈaɪərn/",
    "definition": "A handheld appliance with a flat metal base that is heated to smooth clothes.",
    "definitionVn": "bàn là, bàn ủi quần áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Use a steam iron to smooth out wrinkles on your cotton shirt.",
      "Unplug the hot iron immediately after use."
    ],
    "exampleTranslations": [
      "Dùng bàn là hơi nước để ủi phẳng các nếp nhăn trên áo sơ mi cotton nhé.",
      "Rút phích cắm bàn là nóng ngay sau khi sử dụng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_07",
    "word": "vacuum",
    "phonetic": "/ˈvækjuːm/",
    "definition": "An electrical apparatus that by means of suction collects dust and small particles from floors.",
    "definitionVn": "máy hút bụi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "The robotic vacuum cleaner cleans living room floors automatically.",
      "Empty the vacuum dust container regularly."
    ],
    "exampleTranslations": [
      "Robot hút bụi tự động lau dọn sàn phòng khách.",
      "Đổ bụi trong hộp chứa bụi của máy hút bụi thường xuyên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_08",
    "word": "fan",
    "phonetic": "/fæn/",
    "definition": "An apparatus with rotating blades that creates a current of air for cooling or ventilation.",
    "definitionVn": "chiếc quạt điện, quạt máy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Turn on the standing electric fan to cool the room.",
      "The ceiling fan circulates cool air throughout the house."
    ],
    "exampleTranslations": [
      "Bật chiếc quạt cây điện lên để làm mát phòng nhé.",
      "Chiếc quạt trần lưu thông không khí mát mẻ khắp căn nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_09",
    "word": "air conditioner",
    "phonetic": "/ˈer kənˌdɪʃənər/",
    "definition": "An apparatus for cooling and dehumidifying the air in a room or vehicle.",
    "definitionVn": "máy điều hòa không khí, máy lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Set the air conditioner to an eco-friendly 26 degrees Celsius.",
      "Clean the air conditioner filters before summer."
    ],
    "exampleTranslations": [
      "Cài đặt máy điều hòa ở nhiệt độ 26 độ C tiết kiệm điện nhé.",
      "Vệ sinh màng lọc máy điều hòa trước mùa hè nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_10",
    "word": "heater",
    "phonetic": "/ˈhiːtər/",
    "definition": "A device for warming the air or water.",
    "definitionVn": "máy sưởi, bình nóng lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Turn on the ceramic room heater on freezing winter nights.",
      "The bathroom water heater provides instant hot water."
    ],
    "exampleTranslations": [
      "Bật máy sưởi phòng bằng gốm vào những đêm đông giá rét nhé.",
      "Bình nóng lạnh phòng tắm cung cấp nước nóng tức thì."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_11",
    "word": "television",
    "phonetic": "/ˈtelɪvɪʒn/",
    "definition": "A system for transmitting visual images and sound; a TV set.",
    "definitionVn": "ti-vi, máy truyền hình",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Our family gathers in the living room to watch evening news on television.",
      "Smart televisions stream educational English documentaries."
    ],
    "exampleTranslations": [
      "Gia đình chúng tôi quây quần ở phòng khách xem thời sự buổi tối trên ti-vi.",
      "Ti-vi thông minh phát các bộ phim tài liệu tiếng Anh mang tính giáo dục."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_12",
    "word": "radio",
    "phonetic": "/ˈreɪdioʊ/",
    "definition": "The transmission and reception of electromagnetic waves of radio frequency; a receiving set.",
    "definitionVn": "đài phát thanh, máy radio",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Grandfather listens to news broadcasts on his vintage transistor radio.",
      "Listen to English radio stations to improve listening comprehension."
    ],
    "exampleTranslations": [
      "Ông nghe các bản tin thời sự trên chiếc đài radio bán dẫn cổ điển.",
      "Nghe các đài phát thanh tiếng Anh để cải thiện khả năng nghe hiểu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_13",
    "word": "speaker",
    "phonetic": "/ˈspiːkər/",
    "definition": "An apparatus that converts electrical impulses into sound.",
    "definitionVn": "chiếc loa (nghe nhạc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Connect your smartphone to the Bluetooth speaker for rich sound.",
      "The speaker produces crystal-clear acoustic audio."
    ],
    "exampleTranslations": [
      "Kết nối điện thoại thông minh với loa Bluetooth để có âm thanh sống động.",
      "Chiếc loa phát ra âm thanh mộc trong trẻo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_14",
    "word": "camera",
    "phonetic": "/ˈkæmrə/",
    "definition": "A device for recording visual images in the form of photographs, film, or video signals.",
    "definitionVn": "máy ảnh, máy quay phim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Capture unforgettable travel memories with a high-resolution camera.",
      "The mirrorless camera is compact and powerful."
    ],
    "exampleTranslations": [
      "Ghi lại những kỷ niệm du lịch khó quên bằng một chiếc máy ảnh độ phân giải cao.",
      "Chiếc máy ảnh không gương lật nhỏ gọn và mạnh mẽ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_15",
    "word": "charger",
    "phonetic": "/ˈtʃɑːrdʒər/",
    "definition": "A device for charging a storage battery.",
    "definitionVn": "cục sạc, dây sạc pin",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Don't forget to pack your fast USB-C phone charger.",
      "Unplug the battery charger when charging is complete."
    ],
    "exampleTranslations": [
      "Đừng quên mang theo củ sạc nhanh USB-C cho điện thoại nhé.",
      "Rút cục sạc pin ra khi đã sạc đầy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_16",
    "word": "battery",
    "phonetic": "/ˈbætəri/",
    "definition": "A container consisting of one or more cells, in which chemical energy is converted into electricity.",
    "definitionVn": "cục pin, ắc quy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Rechargeable batteries are eco-friendly and save money.",
      "My laptop battery lasts up to ten hours of continuous work."
    ],
    "exampleTranslations": [
      "Pin có thể sạc lại rất thân thiện với môi trường và tiết kiệm tiền.",
      "Pin máy tính xách tay của tôi dùng được tới mười tiếng làm việc liên tục."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_17",
    "word": "plug",
    "phonetic": "/plʌɡ/",
    "definition": "A device for making an electrical connection, especially having two or three pins.",
    "definitionVn": "phích cắm điện, ổ cắm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Insert the electric plug securely into the wall socket.",
      "Never touch an electrical plug with wet hands."
    ],
    "exampleTranslations": [
      "Cắm phích cắm điện chắc chắn vào ổ cắm trên tường nhé.",
      "Không bao giờ chạm vào phích cắm điện khi tay đang ướt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_18",
    "word": "cable",
    "phonetic": "/ˈkeɪbl/",
    "definition": "An insulated wire or group of wires for transmitting electricity or electronic signals.",
    "definitionVn": "dây cáp (cáp sạc, cáp mạng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Connect your laptop to the monitor using an HDMI cable.",
      "A braided charging cable is durable and tangle-free."
    ],
    "exampleTranslations": [
      "Kết nối máy tính xách tay với màn hình bằng dây cáp HDMI nhé.",
      "Một sợi cáp sạc bọc dù rất bền và không bị rối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_19",
    "word": "remote",
    "phonetic": "/rɪˈmoʊt/",
    "definition": "A remote control device for operating electrical equipment from a distance.",
    "definitionVn": "chiếc điều khiển từ xa, remote",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Use the remote control to change the television channel.",
      "Keep the air conditioner remote in its wall bracket."
    ],
    "exampleTranslations": [
      "Dùng điều khiển từ xa để chuyển kênh ti-vi nhé.",
      "Để điều khiển máy lạnh trong giá đỡ trên tường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_applia_20",
    "word": "switch",
    "phonetic": "/swɪtʃ/",
    "definition": "A device for making and breaking the connection in an electric circuit.",
    "definitionVn": "công tắc điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_appliances_gadgets",
    "themeNameVn": "Thiết bị & Gia dụng",
    "themeNameEn": "Appliances & Gadgets",
    "examples": [
      "Flip the wall switch to turn off the room lights before leaving.",
      "Smart switches can be controlled via mobile apps."
    ],
    "exampleTranslations": [
      "Bật tắt công tắc trên tường để tắt đèn phòng trước khi rời đi nhé.",
      "Công tắc thông minh có thể được điều khiển qua ứng dụng di động."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

/**
 * Helper to get basic vocabularies filtered by themeId or keyword
 */
export function getBasicVocabulariesByTheme(themeId: string): BasicVocabularyItem[] {
  return BASIC_VOCABULARIES.filter((v) => v.themeId === themeId);
}

export function searchBasicVocabularies(query: string): BasicVocabularyItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return BASIC_VOCABULARIES;
  return BASIC_VOCABULARIES.filter(
    (v) =>
      v.word.toLowerCase().includes(q) ||
      v.definitionVn.toLowerCase().includes(q) ||
      v.definition.toLowerCase().includes(q) ||
      v.themeNameVn.toLowerCase().includes(q)
  );
}
