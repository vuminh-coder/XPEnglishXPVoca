const fs = require('fs');
const path = require('path');

const THEMES = [
  // --- 15 CHỦ ĐỀ HIỆN TẠI (1 -> 15) ---
  { id: "t_basic_greetings", name: "Chào hỏi & Giao tiếp", nameEn: "Greetings & Polite Words", icon: "👋", difficulty: 1, color: "#0059bb", description: "Các câu chào, tạm biệt và lời nói lịch sự thông dụng nhất hàng ngày." },
  { id: "t_basic_introductions", name: "Giới thiệu & Đại từ", nameEn: "Self-Intro & Pronouns", icon: "👤", difficulty: 1, color: "#0284c7", description: "Đại từ nhân xưng, sở hữu và từ vựng giới thiệu bản thân cơ bản." },
  { id: "t_basic_numbers", name: "Số đếm & Thứ tự", nameEn: "Numbers & Counting", icon: "🔢", difficulty: 1, color: "#f59e0b", description: "Số đếm từ 0 đến 1000, số thứ tự và cách đếm số lượng." },
  { id: "t_basic_colors_shapes", name: "Màu sắc & Hình khối", nameEn: "Colors & Shapes", icon: "🎨", difficulty: 1, color: "#ec4899", description: "Các màu sắc cơ bản và hình dạng quen thuộc trong đời sống." },
  { id: "t_basic_family", name: "Gia đình & Người thân", nameEn: "Family & Relatives", icon: "👨‍👩‍👧‍👦", difficulty: 1, color: "#3b82f6", description: "Xưng hô và mối quan hệ giữa các thành viên trong gia đình." },
  { id: "t_basic_home_objects", name: "Nhà cửa & Đồ dùng", nameEn: "Home & Daily Objects", icon: "🏠", difficulty: 1, color: "#10b981", description: "Các phòng trong nhà, đồ nội thất và vật dụng sinh hoạt hàng ngày." },
  { id: "t_basic_daily_verbs", name: "Động từ hàng ngày", nameEn: "Daily Common Verbs", icon: "⚡", difficulty: 1, color: "#8b5cf6", description: "Các hành động cơ bản nhất: ăn, uống, đi, ngủ, nói, đọc, viết, học..." },
  { id: "t_basic_food_drinks", name: "Ăn uống & Thực phẩm", nameEn: "Food & Beverages", icon: "🍎", difficulty: 1, color: "#ef4444", description: "Thức ăn, đồ uống, trái cây và các bữa ăn quen thuộc." },
  { id: "t_basic_emotions_adjectives", name: "Cảm xúc & Tính từ", nameEn: "Emotions & Adjectives", icon: "😊", difficulty: 1, color: "#f43f5e", description: "Tính từ miêu tả cảm xúc, trạng thái và đặc điểm đồ vật thông dụng." },
  { id: "t_basic_time_calendar", name: "Thời gian & Lịch", nameEn: "Time, Days & Seasons", icon: "📅", difficulty: 1, color: "#06b6d4", description: "Giờ giấc, các buổi trong ngày, thứ trong tuần, tháng và 4 mùa." },
  { id: "t_basic_animals", name: "Động vật quen thuộc", nameEn: "Familiar Animals", icon: "🐶", difficulty: 1, color: "#14b8a6", description: "Thú cưng, gia súc, gia cầm và các con vật thường gặp." },
  { id: "t_basic_body_parts", name: "Bộ phận cơ thể", nameEn: "Human Body Parts", icon: "👀", difficulty: 1, color: "#e11d48", description: "Các bộ phận chính trên cơ thể người từ đầu đến chân." },
  { id: "t_basic_clothes", name: "Trang phục cơ bản", nameEn: "Clothing & Outfits", icon: "👕", difficulty: 1, color: "#a855f7", description: "Quần áo, giày dép, nón mũ và phụ kiện mặc thường ngày." },
  { id: "t_basic_places_directions", name: "Địa điểm & Chỉ đường", nameEn: "Places & Directions", icon: "🗺️", difficulty: 1, color: "#6366f1", description: "Trường học, bệnh viện, siêu thị và các từ chỉ phương hướng cơ bản." },
  { id: "t_basic_weather_nature", name: "Thời tiết & Thiên nhiên", nameEn: "Weather & Nature", icon: "🌤️", difficulty: 1, color: "#16a34a", description: "Nắng, mưa, gió, mây, cây cỏ, sông núi và tự nhiên." },

  // --- 15 CHỦ ĐỀ (16 -> 30) ---
  { id: "t_basic_jobs_occupations", name: "Nghề nghiệp & Việc làm", nameEn: "Jobs & Occupations", icon: "💼", difficulty: 1, color: "#d97706", description: "Bác sĩ, giáo viên, cảnh sát, đầu bếp và các ngành nghề phổ biến." },
  { id: "t_basic_transportation", name: "Phương tiện giao thông", nameEn: "Vehicles & Transport", icon: "🚗", difficulty: 1, color: "#2563eb", description: "Xe máy, xe buýt, ô tô, máy bay, tàu hỏa và cách đi lại." },
  { id: "t_basic_school_stationery", name: "Trường học & Dụng cụ", nameEn: "School & Stationery", icon: "📚", difficulty: 1, color: "#4f46e5", description: "Lớp học, bảng đen, thước kẻ, kéo, tập vở và kiểm tra." },
  { id: "t_basic_hobbies_sports", name: "Sở thích & Thể thao", nameEn: "Hobbies & Sports", icon: "⚽", difficulty: 1, color: "#ea580c", description: "Bóng đá, bơi lội, ca hát, đàn piano, vẽ tranh và giải trí." },
  { id: "t_basic_shopping_money", name: "Mua sắm & Tiền tệ", nameEn: "Shopping & Money", icon: "💳", difficulty: 1, color: "#059669", description: "Tiền mặt, thẻ, giá cả, hóa đơn, giảm giá và mua bán." },
  { id: "t_basic_plants_fruits", name: "Cây cối & Hoa quả", nameEn: "Plants & Fruits", icon: "🌿", difficulty: 1, color: "#65a30d", description: "Các loại cây, lá, rễ, hoa quả nhiệt đới và nông sản quen thuộc." },
  { id: "t_basic_health_medical", name: "Sức khỏe & Y tế", nameEn: "Health & Medical", icon: "💊", difficulty: 1, color: "#dc2626", description: "Sốt, ho, cảm lạnh, đau đầu, thuốc uống và cách chăm sóc bản thân." },
  { id: "t_basic_kitchen_utensils", name: "Dụng cụ nhà bếp", nameEn: "Kitchen Utensils", icon: "🍳", difficulty: 1, color: "#b45309", description: "Nồi, chảo, bát đĩa, đũa thìa, dao kéo và lò nướng." },
  { id: "t_basic_office_tech", name: "Văn phòng & Công nghệ", nameEn: "Office & Basic Tech", icon: "💻", difficulty: 1, color: "#0891b2", description: "Máy tính, bàn phím, chuột, màn hình, email, wifi và mật khẩu." },
  { id: "t_basic_city_buildings", name: "Thành phố & Công trình", nameEn: "City & Buildings", icon: "🏙️", difficulty: 1, color: "#7c3aed", description: "Tòa nhà, cầu đường, quảng trường, bảo tàng và các công trình đô thị." },
  { id: "t_basic_personality_traits", name: "Tính cách & Phẩm chất", nameEn: "Personality Traits", icon: "🌟", difficulty: 1, color: "#db2777", description: "Tốt bụng, thông minh, trung thực, dũng cảm, chăm chỉ và kiên nhẫn." },
  { id: "t_basic_prepositions_positions", name: "Giới từ & Vị trí", nameEn: "Prepositions & Space", icon: "📍", difficulty: 1, color: "#475569", description: "Trong, trên, dưới, trước, sau, bên cạnh, ở giữa và xung quanh." },
  { id: "t_basic_senses_perceptions", name: "Giác quan & Cảm nhận", nameEn: "Senses & Perception", icon: "👃", difficulty: 1, color: "#c026d3", description: "Thị giác, thính giác, khứu giác, vị giác và xúc giác." },
  { id: "t_basic_vacation_tourism", name: "Kỳ nghỉ & Du lịch", nameEn: "Vacation & Tourism", icon: "🏖️", difficulty: 1, color: "#0d9488", description: "Hành lý, hộ chiếu, bãi biển, khu nghỉ dưỡng và cảnh đẹp du lịch." },
  { id: "t_basic_entertainment_arts", name: "Giải trí & Nghệ thuật", nameEn: "Entertainment & Arts", icon: "🎭", difficulty: 1, color: "#9333ea", description: "Phim ảnh, ca nhạc, hòa nhạc, tranh vẽ, ảo thuật và lễ hội." },

  // --- 30 CHỦ ĐỀ MỚI BỔ SUNG (31 -> 60) ---
  { id: "t_basic_measurements_sizes", name: "Đo lường & Kích cỡ", nameEn: "Measurements & Sizes", icon: "📏", difficulty: 1, color: "#0284c7", description: "Mét, ki-lô-gam, lít, chiều cao, cân nặng, độ dài, độ dày mỏng." },
  { id: "t_basic_tools_repair", name: "Dụng cụ & Sửa chữa", nameEn: "Tools & Home Repair", icon: "🔨", difficulty: 1, color: "#ea580c", description: "Búa, đinh, ốc vít, tua-vít, kìm, cưa, máy khoan và sửa đồ gia đình." },
  { id: "t_basic_severe_weather", name: "Thiên tai & Thời tiết xấu", nameEn: "Severe Weather", icon: "⛈️", difficulty: 1, color: "#475569", description: "Bão lớn, sấm sét, lũ lụt, hạn hán, lốc xoáy và an toàn trú ẩn." },
  { id: "t_basic_landforms_landscapes", name: "Địa hình & Cảnh quan", nameEn: "Landforms & Landscapes", icon: "🏞️", difficulty: 1, color: "#15803d", description: "Đồi núi, thung lũng, rừng rậm, sa mạc, hang động, vách đá, bờ biển." },
  { id: "t_basic_marine_life", name: "Sinh vật biển & Đại dương", nameEn: "Marine Life & Ocean", icon: "🐋", difficulty: 1, color: "#0ea5e9", description: "Cá voi, cá heo, cá mập, bạch tuộc, tôm cua, rạn san hô và đại dương." },
  { id: "t_basic_insects_bugs", name: "Côn trùng & Sâu bọ", nameEn: "Insects & Small Bugs", icon: "🐝", difficulty: 1, color: "#ca8a04", description: "Ong mật, kiến, muỗi, chuồn chuồn, bọ cánh cứng, bướm và bọ rùa." },
  { id: "t_basic_spices_herbs", name: "Gia vị & Hương vị", nameEn: "Spices, Herbs & Flavors", icon: "🌶️", difficulty: 1, color: "#b91c1c", description: "Hạt tiêu, ớt, gừng, tỏi, nước mắm, quế, mật ong và các vị cay đắng." },
  { id: "t_basic_bakery_desserts", name: "Bánh ngọt & Tráng miệng", nameEn: "Bakery & Desserts", icon: "🧁", difficulty: 1, color: "#db2777", description: "Bánh kem, bánh quy, sandwich, bánh sừng bò, kem ly và sô-cô-la." },
  { id: "t_basic_drinks_beverages", name: "Đồ uống & Trà sữa", nameEn: "Drinks & Beverages", icon: "🧋", difficulty: 1, color: "#d97706", description: "Sinh tố, nước ép, trà sữa trân châu, trà đá, nước chanh và nước khoáng." },
  { id: "t_basic_cleaning_chores", name: "Dọn dẹp & Việc nhà", nameEn: "Cleaning & House Chores", icon: "🧹", difficulty: 1, color: "#059669", description: "Quét nhà, lau sàn, giặt giũ, hút bụi, đổ rác, ủi đồ và gấp quần áo." },
  { id: "t_basic_fashion_accessories", name: "Phụ kiện thời trang", nameEn: "Fashion Accessories", icon: "💍", difficulty: 1, color: "#9333ea", description: "Nhẫn, dây chuyền, vòng tay, hoa tai, thắt lưng, khăn choàng, kính râm." },
  { id: "t_basic_bedroom_sleep", name: "Phòng ngủ & Giấc ngủ", nameEn: "Bedroom & Sleep", icon: "🛏️", difficulty: 1, color: "#6366f1", description: "Giường ngủ, nệm, gối, chăn ấm, tủ quần áo, đồng hồ báo thức và ngủ ngon." },
  { id: "t_basic_bathroom_toiletries", name: "Phòng tắm & Vệ sinh", nameEn: "Bathroom & Toiletries", icon: "🚿", difficulty: 1, color: "#06b6d4", description: "Vòi sen, bồn tắm, bồn rửa, khăn tắm, dầu gội, xà phòng, bàn chải đánh răng." },
  { id: "t_basic_bodily_sensations", name: "Cảm giác cơ thể", nameEn: "Bodily Sensations", icon: "🌡️", difficulty: 1, color: "#e11d48", description: "Cơn đau, ngứa, toát mồ hôi, run rẩy, chóng mặt, buồn ngủ, no bụng, khát nước." },
  { id: "t_basic_feelings_attitudes", name: "Cảm xúc & Thái độ", nameEn: "Feelings & Attitudes", icon: "💖", difficulty: 1, color: "#f43f5e", description: "Niềm vui sướng, hy vọng, dũng cảm, tự tin, biết ơn, tò mò và yêu thương." },
  { id: "t_basic_relationships_social", name: "Mối quan hệ & Xã hội", nameEn: "Social Relationships", icon: "🤝", difficulty: 1, color: "#2563eb", description: "Bạn thân, hàng xóm, bạn cùng lớp, đồng nghiệp, sếp, lòng tin và sự tôn trọng." },
  { id: "t_basic_conversation_communication", name: "Giao tiếp & Thư tín", nameEn: "Conversation & Letters", icon: "✉️", difficulty: 1, color: "#4f46e5", description: "Trò chuyện, thảo luận, thì thầm, hỏi đáp, viết thư, bưu thiếp, phong bì." },
  { id: "t_basic_geometry_patterns", name: "Hình học & Họa tiết", nameEn: "Geometry & Patterns", icon: "🔷", difficulty: 1, color: "#7c3aed", description: "Hình bầu dục, hình thoi, khối cầu, khối trụ, đường thẳng, sọc kẻ và hoa văn." },
  { id: "t_basic_materials_substances", name: "Chất liệu & Vật liệu", nameEn: "Materials & Substances", icon: "🪵", difficulty: 1, color: "#854d0e", description: "Gỗ, kim loại, nhựa, thủy tinh, giấy, bông vải, cao su, đất sét, vàng bạc." },
  { id: "t_basic_sounds_instruments", name: "Âm thanh & Nhạc cụ", nameEn: "Sounds & Instruments", icon: "🎵", difficulty: 1, color: "#c026d3", description: "Âm thanh, giai điệu, tiếng vỗ tay, chuông reo, trống, sáo, vĩ cầm, kèn." },
  { id: "t_basic_light_visual_effects", name: "Ánh sáng & Thị giác", nameEn: "Light & Visual Effects", icon: "💡", difficulty: 1, color: "#eab308", description: "Ánh nắng, bóng râm, phát sáng, lấp lánh, tia chớp, nến, trong suốt và hình ảnh." },
  { id: "t_basic_body_movements", name: "Vận động cơ thể", nameEn: "Body Movements", icon: "🏃", difficulty: 1, color: "#16a34a", description: "Đứng, ngồi, đi bộ, chạy, nhảy, leo trèo, cúi gập, kéo giãn, ném bắt và sút bóng." },
  { id: "t_basic_convenience_services", name: "Dịch vụ & Tiện ích", nameEn: "Convenience Services", icon: "🏪", difficulty: 1, color: "#0891b2", description: "Cửa hàng tiện lợi, tiệm giặt ủi, cắt tóc, sửa chữa, ATM, dịch vụ công." },
  { id: "t_basic_airport_station_travel", name: "Sân bay & Nhà ga", nameEn: "Airport & Station Travel", icon: "🛫", difficulty: 1, color: "#0284c7", description: "Nhà ga sân bay, cổng lên máy bay, thẻ lên tàu, hành lý, hải quan, chuyến bay." },
  { id: "t_basic_hotel_accommodation", name: "Khách sạn & Lưu trú", nameEn: "Hotel & Lodging", icon: "🏨", difficulty: 1, color: "#3b82f6", description: "Phòng khách sạn, thẻ từ, lễ tân, sảnh lớn, thang máy, nhận phòng và trả phòng." },
  { id: "t_basic_street_food_snacks", name: "Ẩm thực đường phố", nameEn: "Street Food & Snacks", icon: "🍢", difficulty: 1, color: "#ea580c", description: "Món ăn vặt vỉa hè, nem rán, phở, bánh mì, bánh xèo, bắp rang, xiên nướng." },
  { id: "t_basic_life_stages_age", name: "Giai đoạn cuộc đời", nameEn: "Life Stages & Ages", icon: "🌱", difficulty: 1, color: "#10b981", description: "Em bé, thiếu niên, người lớn, người già, sinh nhật, thời thơ ấu và trưởng thành." },
  { id: "t_basic_holidays_customs", name: "Lễ hội & Phong tục", nameEn: "Holidays & Customs", icon: "🎆", difficulty: 1, color: "#dc2626", description: "Tết cổ truyền, Năm Mới, Giáng Sinh, đám cưới, quà tặng, pháo hoa và truyền thống." },
  { id: "t_basic_safety_warnings_rules", name: "An toàn & Luật lệ", nameEn: "Safety & Warning Rules", icon: "🛡️", difficulty: 1, color: "#15803d", description: "An toàn, cảnh báo, quy tắc, luật lệ, mũ bảo hiểm, dây an toàn và lối thoát hiểm." },
  { id: "t_basic_appliances_gadgets", name: "Thiết bị & Gia dụng", nameEn: "Appliances & Gadgets", icon: "📺", difficulty: 1, color: "#0f766e", description: "Máy giặt, máy sấy, bàn là, máy hút bụi, điều hòa, ti-vi, máy ảnh và sạc pin." }
];

// Helper to generate full data
const fsData = require('./generate_basic_data_part.js');

const RAW_THEMES_DATA = fsData.RAW_THEMES_DATA;

const computedThemes = THEMES.map(theme => {
  const items = RAW_THEMES_DATA[theme.id] || [];
  return {
    ...theme,
    totalVocabs: items.length
  };
});

const allItems = [];
Object.entries(RAW_THEMES_DATA).forEach(([themeId, items]) => {
  const theme = THEMES.find(t => t.id === themeId);
  const themePrefix = themeId.replace('t_basic_', '').substring(0, 6);
  items.forEach((item, idx) => {
    const numStr = String(idx + 1).padStart(2, '0');
    allItems.push({
      id: `bv_${themePrefix}_${numStr}`,
      word: item.word,
      phonetic: item.phonetic,
      definition: item.def,
      definitionVn: item.defVn,
      pos: item.pos,
      difficulty: 1,
      frequency: 5,
      themeId: themeId,
      themeNameVn: theme ? theme.name : "",
      themeNameEn: theme ? theme.nameEn : "",
      examples: item.ex,
      exampleTranslations: item.exVn,
      synonyms: item.syn || [],
      antonyms: item.ant || []
    });
  });
});

const content = `/**
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

export const BASIC_VOCABULARY_THEMES: BasicTheme[] = ${JSON.stringify(computedThemes, null, 2)};

export const BASIC_VOCABULARIES: BasicVocabularyItem[] = ${JSON.stringify(allItems, null, 2)};

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
`;

const targetPath = path.join(__dirname, '..', 'lib', 'data', 'basicVocabularies.ts');
fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Successfully generated ${allItems.length} basic vocabulary items across ${computedThemes.length} themes into ${targetPath}`);
