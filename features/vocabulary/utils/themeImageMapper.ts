// Curated High-Resolution Photography Assets for XP English Vocabulary Themes

export interface ThemeCoverDef {
  keywords: string[];
  imageUrl: string;
}

// 1. Curated Semantic Theme Photography (100% Text-Free, High Aesthetic Standards)
const SEMANTIC_THEME_COVERS: ThemeCoverDef[] = [
  // Ẩm thực, Ăn uống, Nấu nướng, Đồ ngọt, Trà sữa
  {
    keywords: ["ẩm thực", "ăn uống", "thực phẩm", "món ăn", "food", "dining", "nấu ăn", "bánh", "dessert", "đồ uống", "trà sữa", "beverage", "nha bep", "kitchen"],
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
  },
  // Công nghệ, CNTT, AI, Máy tính, Văn phòng
  {
    keywords: ["cntt", "ai", "công nghệ", "it", "tech", "máy tính", "computer", "lập trình", "software", "thiết bị", "văn phòng", "office"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
  },
  // Y tế, Sức khỏe, Bác sĩ, Dược phẩm, Cơ thể
  {
    keywords: ["y tế", "sức khỏe", "y khoa", "healthcare", "bác sĩ", "doctor", "bệnh", "cơ thể", "body", "cảm giác", "dược", "medical"],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80",
  },
  // Tài chính, Tiền tệ, Ngân hàng, Mua sắm, Kinh doanh
  {
    keywords: ["tài chính", "tiền tệ", "ngân hàng", "mua sắm", "shopping", "kinh doanh", "business", "finance", "money", "đầu tư", "thương mại"],
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80",
  },
  // Du lịch, Nghỉ dưỡng, Khách sạn, Kỳ nghỉ, Sân bay, Vé máy bay
  {
    keywords: ["du lịch", "kỳ nghỉ", "travel", "vacation", "khách sạn", "hotel", "sân bay", "airport", "chuyến đi", "resort", "hành lý"],
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=80",
  },
  // Hàng không, Phương tiện giao thông, Xe cộ, Đường sá
  {
    keywords: ["phương tiện", "giao thông", "xe", "transport", "traffic", "chỉ đường", "đường", "road", "ô tô", "máy bay", "tàu"],
    imageUrl: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=700&q=80",
  },
  // Thời trang, Trang phục, Phụ kiện, Quần áo
  {
    keywords: ["thời trang", "trang phục", "phụ kiện", "fashion", "clothes", "quần áo", "giày", "dép", "outfit", "vải", "chất liệu"],
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
  },
  // Thiên nhiên, Thời tiết, Cảnh quan, Địa hình, Cây cối
  {
    keywords: ["thiên nhiên", "thời tiết", "nature", "weather", "cảnh quan", "địa hình", "cây cối", "hoa", "rừng", "forest", "núi", "mountain"],
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=80",
  },
  // Động vật, Côn trùng, Sinh vật biển
  {
    keywords: ["động vật", "con vật", "animal", "chó", "mèo", "pet", "côn trùng", "sinh vật", "biển", "đại dương", "marine"],
    imageUrl: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=700&q=80",
  },
  // Thể thao, Vận động, Sở thích, Rèn luyện
  {
    keywords: ["thể thao", "vận động", "sports", "fitness", "gym", "bóng", "sở thích", "hobby", "chạy", "running", "bơi"],
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",
  },
  // Trường học, Giáo dục, Dụng cụ học tập, Sách vở
  {
    keywords: ["trường học", "giáo dục", "học tập", "school", "education", "sách", "book", "học sinh", "sinh viên", "đại học", "dụng cụ"],
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80",
  },
  // Âm nhạc, Nhạc cụ, Âm thanh, Giải trí, Nghệ thuật
  {
    keywords: ["âm nhạc", "nhạc cụ", "music", "guitar", "piano", "nghệ thuật", "art", "âm thanh", "sound", "giải trí", "hát"],
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80",
  },
  // Gia đình, Người thân, Mối quan hệ, Giao tiếp, Chào hỏi
  {
    keywords: ["gia đình", "người thân", "family", "mối quan hệ", "bạn bè", "chào hỏi", "giao tiếp", "communication", "tình cảm", "cuộc đời"],
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80",
  },
  // Nhà cửa, Phòng ngủ, Phòng tắm, Thiết bị gia dụng, Dọn dẹp
  {
    keywords: ["nhà cửa", "đồ dùng", "phòng ngủ", "giấc ngủ", "phòng tắm", "nội thất", "home", "house", "dọn dẹp", "gia dụng", "cleaning"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
  },
  // Nghề nghiệp, Việc làm, Nơi làm việc, Phỏng vấn
  {
    keywords: ["nghề nghiệp", "việc làm", "job", "career", "công việc", "work", "nhân viên", "phỏng vấn", "chuyên môn"],
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80",
  },
  // Thành phố, Đô thị, Công trình, Kiến trúc
  {
    keywords: ["thành phố", "công trình", "city", "building", "đô thị", "kiến trúc", "tòa nhà", "địa điểm", "location"],
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=700&q=80",
  },
  // Cảm xúc, Thái độ, Tính cách, Phẩm chất
  {
    keywords: ["cảm xúc", "thái độ", "tính cách", "phẩm chất", "emotion", "feeling", "personality", "tâm trạng"],
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80",
  },
  // Thời gian, Lịch, Lễ hội, Phong tục
  {
    keywords: ["thời gian", "lịch", "time", "calendar", "lễ hội", "phong tục", "festival", "holiday", "năm mới", "ngày"],
    imageUrl: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=700&q=80",
  },
  // Luật pháp, An toàn, Quy định
  {
    keywords: ["luật", "an toàn", "law", "safety", "luật lệ", "quy định", "tư pháp", "bảo vệ"],
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80",
  },
  // Đo lường, Số đếm, Kích cỡ, Hình khối
  {
    keywords: ["đo lường", "số đếm", "kích cỡ", "hình khối", "màu sắc", "number", "size", "shape", "color"],
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80",
  },
];

// 2. Curated Base Photo Array for Deterministic Universal Distribution
export const UNIVERSAL_VOCAB_COVERS = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a465e7d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1542744836-56360c704944?auto=format&fit=crop&w=700&q=80",
];

/**
 * Deterministically resolves a high-aesthetic cover image for ANY vocabulary theme.
 * Step 1: Semantic keyword matching against the theme name & English name.
 * Step 2: Fallback to deterministic hash algorithm across curated universal covers.
 */
export function getThemeCoverImage(theme: {
  id?: string;
  name?: string;
  nameEn?: string;
}): string {
  const nameLower = (theme.name || "").toLowerCase();
  const nameEnLower = (theme.nameEn || "").toLowerCase();
  const idLower = (theme.id || "").toLowerCase();
  const fullText = `${nameLower} ${nameEnLower} ${idLower}`;

  // 1. Semantic Match
  for (const item of SEMANTIC_THEME_COVERS) {
    if (item.keywords.some((kw) => fullText.includes(kw))) {
      return item.imageUrl;
    }
  }

  // 2. Deterministic Hash Fallback
  const key = theme.id || theme.name || "xp_english_theme_default";
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) + hash) + key.charCodeAt(i);
  }
  const positiveHash = Math.abs(hash);
  const index = positiveHash % UNIVERSAL_VOCAB_COVERS.length;
  return UNIVERSAL_VOCAB_COVERS[index];
}
