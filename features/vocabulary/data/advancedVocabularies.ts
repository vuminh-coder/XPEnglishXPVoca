import { MOCK_VOCABULARIES } from "@/prisma/mock-vocabularies";

export interface AdvancedVocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  definitionVn: string;
  pos: string;
  difficulty: number;
  frequency: number;
  themeId: string;
  examples: string[];
  exampleTranslations?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface AdvancedTheme {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  difficulty: number;
  totalVocabs: number;
  color: string;
  category?: "academic" | "business" | "specialized" | "general_advanced";
}

/**
 * Danh sách 155 Chủ đề từ vựng Trung cấp & Nâng cao Chuẩn Quốc Tế (B1 - C2 / TOEIC / IELTS)
 */
export const ADVANCED_VOCABULARY_THEMES: AdvancedTheme[] = [
  {
    "id": "t1",
    "name": "Gia Đình & Người Thân",
    "nameEn": "Family & Relatives",
    "icon": "👨‍👩‍👧‍👦",
    "difficulty": 2,
    "totalVocabs": 40,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t2",
    "name": "Nhà Cửa & Phòng Ốc",
    "nameEn": "House & Rooms",
    "icon": "🏡",
    "difficulty": 2,
    "totalVocabs": 48,
    "color": "#059669",
    "category": "general_advanced"
  },
  {
    "id": "t3",
    "name": "Thực Phẩm & Bữa Ăn",
    "nameEn": "Food & Meals",
    "icon": "🍲",
    "difficulty": 2,
    "totalVocabs": 50,
    "color": "#d97706",
    "category": "general_advanced"
  },
  {
    "id": "t4",
    "name": "Nghề Nghiệp & Việc Làm",
    "nameEn": "Jobs & Careers",
    "icon": "💼",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#4f46e5",
    "category": "business"
  },
  {
    "id": "t5",
    "name": "Trường Học & Giảng Đường",
    "nameEn": "School & Education",
    "icon": "🏫",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#7c3aed",
    "category": "academic"
  },
  {
    "id": "t6",
    "name": "Quần Áo & Thời Trang",
    "nameEn": "Clothing & Fashion",
    "icon": "👗",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#db2777",
    "category": "general_advanced"
  },
  {
    "id": "t7",
    "name": "Thời Tiết & Khí Hậu",
    "nameEn": "Weather & Climate",
    "icon": "🌤️",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "academic"
  },
  {
    "id": "t8",
    "name": "Phương Tiện Giao Thông",
    "nameEn": "Transportation & Vehicles",
    "icon": "🚗",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#ea580c",
    "category": "general_advanced"
  },
  {
    "id": "t9",
    "name": "Động Vật Quen Thuộc",
    "nameEn": "Animals & Pets",
    "icon": "🐾",
    "difficulty": 2,
    "totalVocabs": 35,
    "color": "#16a34a",
    "category": "general_advanced"
  },
  {
    "id": "t10",
    "name": "Thói Quen Hàng Ngày",
    "nameEn": "Daily Routine",
    "icon": "⏰",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#f59e0b",
    "category": "general_advanced"
  },
  {
    "id": "t11",
    "name": "Màu Sắc & Sắc Thái",
    "nameEn": "Colors & Shades",
    "icon": "🎨",
    "difficulty": 2,
    "totalVocabs": 15,
    "color": "#ec4899",
    "category": "general_advanced"
  },
  {
    "id": "t12",
    "name": "Cơ Thể & Vóc Dáng",
    "nameEn": "Human Body & Anatomy",
    "icon": "🧍",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#6366f1",
    "category": "specialized"
  },
  {
    "id": "t13",
    "name": "Số Đếm & Số Lượng",
    "nameEn": "Numbers & Quantities",
    "icon": "🔢",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0891b2",
    "category": "general_advanced"
  },
  {
    "id": "t14",
    "name": "Thời Gian & Lịch Trình",
    "nameEn": "Time & Scheduling",
    "icon": "📅",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0d9488",
    "category": "general_advanced"
  },
  {
    "id": "t15",
    "name": "Đồ Dùng Sinh Hoạt",
    "nameEn": "Daily Objects & Items",
    "icon": "📦",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#64748b",
    "category": "general_advanced"
  },
  {
    "id": "t16",
    "name": "Trái Cây & Hoa Quả",
    "nameEn": "Fruits & Berries",
    "icon": "🍎",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#dc2626",
    "category": "general_advanced"
  },
  {
    "id": "t17",
    "name": "Rau Củ & Nông Sản",
    "nameEn": "Vegetables & Produce",
    "icon": "🥕",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#15803d",
    "category": "general_advanced"
  },
  {
    "id": "t18",
    "name": "Đồ Uống & Nước Giải Khát",
    "nameEn": "Beverages & Drinks",
    "icon": "☕",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#b45309",
    "category": "general_advanced"
  },
  {
    "id": "t19",
    "name": "Thể Thao & Rèn Luyện",
    "nameEn": "Sports & Fitness",
    "icon": "⚽",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#2563eb",
    "category": "general_advanced"
  },
  {
    "id": "t20",
    "name": "Giải Trí & Phim Ảnh",
    "nameEn": "Entertainment & Cinema",
    "icon": "🎬",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#9333ea",
    "category": "general_advanced"
  },
  {
    "id": "t21",
    "name": "Y Tế & Bệnh Viện",
    "nameEn": "Healthcare & Clinics",
    "icon": "🏥",
    "difficulty": 2,
    "totalVocabs": 40,
    "color": "#e11d48",
    "category": "specialized"
  },
  {
    "id": "t22",
    "name": "Doanh Nghiệp & Quản Trị",
    "nameEn": "Business & Management",
    "icon": "🏢",
    "difficulty": 2,
    "totalVocabs": 40,
    "color": "#059669",
    "category": "business"
  },
  {
    "id": "t23",
    "name": "Công Nghệ & Kỹ Thuật Số",
    "nameEn": "Technology & Digital Systems",
    "icon": "💻",
    "difficulty": 2,
    "totalVocabs": 38,
    "color": "#0284c7",
    "category": "specialized"
  },
  {
    "id": "t24",
    "name": "Môi Trường & Sinh Thái",
    "nameEn": "Environment & Ecosystems",
    "icon": "🌿",
    "difficulty": 2,
    "totalVocabs": 35,
    "color": "#16a34a",
    "category": "academic"
  },
  {
    "id": "t25",
    "name": "Giáo Dục Đại Học",
    "nameEn": "Higher Education & Academics",
    "icon": "🎓",
    "difficulty": 2,
    "totalVocabs": 35,
    "color": "#4f46e5",
    "category": "academic"
  },
  {
    "id": "t26",
    "name": "Tâm Lý & Cảm Xúc",
    "nameEn": "Psychology & Emotions",
    "icon": "🧠",
    "difficulty": 2,
    "totalVocabs": 35,
    "color": "#db2777",
    "category": "academic"
  },
  {
    "id": "t27",
    "name": "Du Lịch & Khám Phá",
    "nameEn": "Travel & Exploration",
    "icon": "✈️",
    "difficulty": 2,
    "totalVocabs": 40,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t28",
    "name": "Mạng Xã Hội & Truyền Thông",
    "nameEn": "Social Media & Networks",
    "icon": "📱",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#ec4899",
    "category": "specialized"
  },
  {
    "id": "t29",
    "name": "Giao Tiếp & Hội Thoại",
    "nameEn": "Communication & Dialogue",
    "icon": "💬",
    "difficulty": 2,
    "totalVocabs": 35,
    "color": "#8b5cf6",
    "category": "general_advanced"
  },
  {
    "id": "t30",
    "name": "Văn Học & Nghệ Thuật Ngôn Từ",
    "nameEn": "Literature & Creative Writing",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 30,
    "color": "#b45309",
    "category": "academic"
  },
  {
    "id": "t31",
    "name": "Chuyên Đề Từ Vựng 31",
    "nameEn": "Specialized Vocabulary Theme 31",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t32",
    "name": "Chuyên Đề Từ Vựng 32",
    "nameEn": "Specialized Vocabulary Theme 32",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t33",
    "name": "Chuyên Đề Từ Vựng 33",
    "nameEn": "Specialized Vocabulary Theme 33",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t34",
    "name": "Chuyên Đề Từ Vựng 34",
    "nameEn": "Specialized Vocabulary Theme 34",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t35",
    "name": "Chuyên Đề Từ Vựng 35",
    "nameEn": "Specialized Vocabulary Theme 35",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t36",
    "name": "Chuyên Đề Từ Vựng 36",
    "nameEn": "Specialized Vocabulary Theme 36",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t37",
    "name": "Chuyên Đề Từ Vựng 37",
    "nameEn": "Specialized Vocabulary Theme 37",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t38",
    "name": "Chuyên Đề Từ Vựng 38",
    "nameEn": "Specialized Vocabulary Theme 38",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t39",
    "name": "Chuyên Đề Từ Vựng 39",
    "nameEn": "Specialized Vocabulary Theme 39",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t40",
    "name": "Chuyên Đề Từ Vựng 40",
    "nameEn": "Specialized Vocabulary Theme 40",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t41",
    "name": "Chuyên Đề Từ Vựng 41",
    "nameEn": "Specialized Vocabulary Theme 41",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t42",
    "name": "Chuyên Đề Từ Vựng 42",
    "nameEn": "Specialized Vocabulary Theme 42",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t43",
    "name": "Chuyên Đề Từ Vựng 43",
    "nameEn": "Specialized Vocabulary Theme 43",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t44",
    "name": "Chuyên Đề Từ Vựng 44",
    "nameEn": "Specialized Vocabulary Theme 44",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t45",
    "name": "Chuyên Đề Từ Vựng 45",
    "nameEn": "Specialized Vocabulary Theme 45",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t46",
    "name": "Chuyên Đề Từ Vựng 46",
    "nameEn": "Specialized Vocabulary Theme 46",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t47",
    "name": "Chuyên Đề Từ Vựng 47",
    "nameEn": "Specialized Vocabulary Theme 47",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 24,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t48",
    "name": "Chuyên Đề Từ Vựng 48",
    "nameEn": "Specialized Vocabulary Theme 48",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t49",
    "name": "Chuyên Đề Từ Vựng 49",
    "nameEn": "Specialized Vocabulary Theme 49",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t50",
    "name": "Chuyên Đề Từ Vựng 50",
    "nameEn": "Specialized Vocabulary Theme 50",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t51",
    "name": "Chuyên Đề Từ Vựng 51",
    "nameEn": "Specialized Vocabulary Theme 51",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t52",
    "name": "Chuyên Đề Từ Vựng 52",
    "nameEn": "Specialized Vocabulary Theme 52",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t53",
    "name": "Chuyên Đề Từ Vựng 53",
    "nameEn": "Specialized Vocabulary Theme 53",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t54",
    "name": "Chuyên Đề Từ Vựng 54",
    "nameEn": "Specialized Vocabulary Theme 54",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 24,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t55",
    "name": "Chuyên Đề Từ Vựng 55",
    "nameEn": "Specialized Vocabulary Theme 55",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t56",
    "name": "Chuyên Đề Từ Vựng 56",
    "nameEn": "Specialized Vocabulary Theme 56",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t57",
    "name": "Chuyên Đề Từ Vựng 57",
    "nameEn": "Specialized Vocabulary Theme 57",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t58",
    "name": "Chuyên Đề Từ Vựng 58",
    "nameEn": "Specialized Vocabulary Theme 58",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t59",
    "name": "Chuyên Đề Từ Vựng 59",
    "nameEn": "Specialized Vocabulary Theme 59",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t60",
    "name": "Chuyên Đề Từ Vựng 60",
    "nameEn": "Specialized Vocabulary Theme 60",
    "icon": "📖",
    "difficulty": 2,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t61",
    "name": "Chuyên Đề Từ Vựng 61",
    "nameEn": "Specialized Vocabulary Theme 61",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t62",
    "name": "Chuyên Đề Từ Vựng 62",
    "nameEn": "Specialized Vocabulary Theme 62",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t63",
    "name": "Chuyên Đề Từ Vựng 63",
    "nameEn": "Specialized Vocabulary Theme 63",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t64",
    "name": "Chuyên Đề Từ Vựng 64",
    "nameEn": "Specialized Vocabulary Theme 64",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t65",
    "name": "Chuyên Đề Từ Vựng 65",
    "nameEn": "Specialized Vocabulary Theme 65",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t66",
    "name": "Chuyên Đề Từ Vựng 66",
    "nameEn": "Specialized Vocabulary Theme 66",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t67",
    "name": "Chuyên Đề Từ Vựng 67",
    "nameEn": "Specialized Vocabulary Theme 67",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 24,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t68",
    "name": "Chuyên Đề Từ Vựng 68",
    "nameEn": "Specialized Vocabulary Theme 68",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t69",
    "name": "Chuyên Đề Từ Vựng 69",
    "nameEn": "Specialized Vocabulary Theme 69",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 24,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t70",
    "name": "Chuyên Đề Từ Vựng 70",
    "nameEn": "Specialized Vocabulary Theme 70",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t71",
    "name": "Chuyên Đề Từ Vựng 71",
    "nameEn": "Specialized Vocabulary Theme 71",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t72",
    "name": "Chuyên Đề Từ Vựng 72",
    "nameEn": "Specialized Vocabulary Theme 72",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t73",
    "name": "Chuyên Đề Từ Vựng 73",
    "nameEn": "Specialized Vocabulary Theme 73",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t74",
    "name": "Chuyên Đề Từ Vựng 74",
    "nameEn": "Specialized Vocabulary Theme 74",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t75",
    "name": "Chuyên Đề Từ Vựng 75",
    "nameEn": "Specialized Vocabulary Theme 75",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 24,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t76",
    "name": "Chuyên Đề Từ Vựng 76",
    "nameEn": "Specialized Vocabulary Theme 76",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t77",
    "name": "Chuyên Đề Từ Vựng 77",
    "nameEn": "Specialized Vocabulary Theme 77",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t78",
    "name": "Chuyên Đề Từ Vựng 78",
    "nameEn": "Specialized Vocabulary Theme 78",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t79",
    "name": "Chuyên Đề Từ Vựng 79",
    "nameEn": "Specialized Vocabulary Theme 79",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t80",
    "name": "Chuyên Đề Từ Vựng 80",
    "nameEn": "Specialized Vocabulary Theme 80",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t81",
    "name": "Chuyên Đề Từ Vựng 81",
    "nameEn": "Specialized Vocabulary Theme 81",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t82",
    "name": "Chuyên Đề Từ Vựng 82",
    "nameEn": "Specialized Vocabulary Theme 82",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t83",
    "name": "Chuyên Đề Từ Vựng 83",
    "nameEn": "Specialized Vocabulary Theme 83",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t84",
    "name": "Chuyên Đề Từ Vựng 84",
    "nameEn": "Specialized Vocabulary Theme 84",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t85",
    "name": "Chuyên Đề Từ Vựng 85",
    "nameEn": "Specialized Vocabulary Theme 85",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t86",
    "name": "Chuyên Đề Từ Vựng 86",
    "nameEn": "Specialized Vocabulary Theme 86",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t87",
    "name": "Chuyên Đề Từ Vựng 87",
    "nameEn": "Specialized Vocabulary Theme 87",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t88",
    "name": "Chuyên Đề Từ Vựng 88",
    "nameEn": "Specialized Vocabulary Theme 88",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t89",
    "name": "Chuyên Đề Từ Vựng 89",
    "nameEn": "Specialized Vocabulary Theme 89",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 20,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t90",
    "name": "Chuyên Đề Từ Vựng 90",
    "nameEn": "Specialized Vocabulary Theme 90",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 24,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t91",
    "name": "Chuyên Đề Từ Vựng 91",
    "nameEn": "Specialized Vocabulary Theme 91",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t92",
    "name": "Chuyên Đề Từ Vựng 92",
    "nameEn": "Specialized Vocabulary Theme 92",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t93",
    "name": "Chuyên Đề Từ Vựng 93",
    "nameEn": "Specialized Vocabulary Theme 93",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t94",
    "name": "Chuyên Đề Từ Vựng 94",
    "nameEn": "Specialized Vocabulary Theme 94",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t95",
    "name": "Chuyên Đề Từ Vựng 95",
    "nameEn": "Specialized Vocabulary Theme 95",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t96",
    "name": "Chuyên Đề Từ Vựng 96",
    "nameEn": "Specialized Vocabulary Theme 96",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t97",
    "name": "Chuyên Đề Từ Vựng 97",
    "nameEn": "Specialized Vocabulary Theme 97",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t98",
    "name": "Chuyên Đề Từ Vựng 98",
    "nameEn": "Specialized Vocabulary Theme 98",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t99",
    "name": "Chuyên Đề Từ Vựng 99",
    "nameEn": "Specialized Vocabulary Theme 99",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 24,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t100",
    "name": "Chuyên Đề Từ Vựng 100",
    "nameEn": "Specialized Vocabulary Theme 100",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t101",
    "name": "Chuyên Đề Từ Vựng 101",
    "nameEn": "Specialized Vocabulary Theme 101",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t102",
    "name": "Chuyên Đề Từ Vựng 102",
    "nameEn": "Specialized Vocabulary Theme 102",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t103",
    "name": "Chuyên Đề Từ Vựng 103",
    "nameEn": "Specialized Vocabulary Theme 103",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 35,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t104",
    "name": "Chuyên Đề Từ Vựng 104",
    "nameEn": "Specialized Vocabulary Theme 104",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 32,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t105",
    "name": "Chuyên Đề Từ Vựng 105",
    "nameEn": "Specialized Vocabulary Theme 105",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 29,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t106",
    "name": "Chuyên Đề Từ Vựng 106",
    "nameEn": "Specialized Vocabulary Theme 106",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t107",
    "name": "Chuyên Đề Từ Vựng 107",
    "nameEn": "Specialized Vocabulary Theme 107",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t108",
    "name": "Chuyên Đề Từ Vựng 108",
    "nameEn": "Specialized Vocabulary Theme 108",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t109",
    "name": "Chuyên Đề Từ Vựng 109",
    "nameEn": "Specialized Vocabulary Theme 109",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t110",
    "name": "Chuyên Đề Từ Vựng 110",
    "nameEn": "Specialized Vocabulary Theme 110",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t111",
    "name": "Chuyên Đề Từ Vựng 111",
    "nameEn": "Specialized Vocabulary Theme 111",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 32,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t112",
    "name": "Chuyên Đề Từ Vựng 112",
    "nameEn": "Specialized Vocabulary Theme 112",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t113",
    "name": "Chuyên Đề Từ Vựng 113",
    "nameEn": "Specialized Vocabulary Theme 113",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 29,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t114",
    "name": "Chuyên Đề Từ Vựng 114",
    "nameEn": "Specialized Vocabulary Theme 114",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t115",
    "name": "Chuyên Đề Từ Vựng 115",
    "nameEn": "Specialized Vocabulary Theme 115",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t116",
    "name": "Chuyên Đề Từ Vựng 116",
    "nameEn": "Specialized Vocabulary Theme 116",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t117",
    "name": "Chuyên Đề Từ Vựng 117",
    "nameEn": "Specialized Vocabulary Theme 117",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t118",
    "name": "Chuyên Đề Từ Vựng 118",
    "nameEn": "Specialized Vocabulary Theme 118",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t119",
    "name": "Chuyên Đề Từ Vựng 119",
    "nameEn": "Specialized Vocabulary Theme 119",
    "icon": "📖",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t120",
    "name": "Kinh Doanh & Thương Mại Quốc Tế",
    "nameEn": "Business & International Trade",
    "icon": "💼",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#d97706",
    "category": "business"
  },
  {
    "id": "t121",
    "name": "Tài Chính & Kinh Tế Toàn Cầu",
    "nameEn": "Economics & Global Finance",
    "icon": "📊",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#059669",
    "category": "business"
  },
  {
    "id": "t122",
    "name": "Khoa Học Vũ Trụ & Thiên Văn",
    "nameEn": "Space Science & Astronomy",
    "icon": "🚀",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#6366f1",
    "category": "specialized"
  },
  {
    "id": "t123",
    "name": "Công Nghệ Thông Tin & Phần Mềm",
    "nameEn": "Information Technology",
    "icon": "💾",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#0284c7",
    "category": "specialized"
  },
  {
    "id": "t124",
    "name": "Kỹ Thuật & Đổi Mới Sáng Tạo",
    "nameEn": "Engineering & Innovation",
    "icon": "⚙️",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#475569",
    "category": "specialized"
  },
  {
    "id": "t125",
    "name": "Y Tế & Dược Phẩm Sinh Học",
    "nameEn": "Healthcare & Pharmaceuticals",
    "icon": "💊",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#dc2626",
    "category": "specialized"
  },
  {
    "id": "t126",
    "name": "Luật Pháp & Hệ Thống Tư Pháp",
    "nameEn": "Law & Judicial System",
    "icon": "🏛️",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#4338ca",
    "category": "specialized"
  },
  {
    "id": "t127",
    "name": "Môi Trường & Biến Đổi Khí Hậu",
    "nameEn": "Climate Change & Ecology",
    "icon": "🌱",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#15803d",
    "category": "academic"
  },
  {
    "id": "t128",
    "name": "Bất Động Sản & Quy Hoạch",
    "nameEn": "Real Estate & Property",
    "icon": "🏢",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#b45309",
    "category": "business"
  },
  {
    "id": "t129",
    "name": "Bảo Hiểm & Quản Trị Rủi Ro",
    "nameEn": "Insurance & Risk Management",
    "icon": "🛡️",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#2563eb",
    "category": "business"
  },
  {
    "id": "t130",
    "name": "Logistics & Chuỗi Cung Ứng",
    "nameEn": "Logistics & Supply Chain",
    "icon": "🚚",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#0891b2",
    "category": "business"
  },
  {
    "id": "t131",
    "name": "Năng Lượng Tái Tạo & Điện Gió",
    "nameEn": "Renewable Energy & Wind Power",
    "icon": "⚡",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#eab308",
    "category": "specialized"
  },
  {
    "id": "t132",
    "name": "Nông Nghiệp Công Nghệ Cao",
    "nameEn": "High-Tech Agritech",
    "icon": "🌾",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#84cc16",
    "category": "specialized"
  },
  {
    "id": "t133",
    "name": "Giáo Dục Đại Học & Nghiên Cứu",
    "nameEn": "Higher Education & Academia",
    "icon": "🎓",
    "difficulty": 3,
    "totalVocabs": 30,
    "color": "#4f46e5",
    "category": "academic"
  },
  {
    "id": "t134",
    "name": "Phương Pháp Nghiên Cứu Khoa Học",
    "nameEn": "Research Methodology",
    "icon": "📝",
    "difficulty": 3,
    "totalVocabs": 28,
    "color": "#7c3aed",
    "category": "academic"
  },
  {
    "id": "t135",
    "name": "Tâm Lý Học Học Thuật",
    "nameEn": "Academic Psychology",
    "icon": "🧠",
    "difficulty": 3,
    "totalVocabs": 27,
    "color": "#db2777",
    "category": "academic"
  },
  {
    "id": "t136",
    "name": "Xã Hội Học & Hành Vi Con Người",
    "nameEn": "Sociology & Human Behavior",
    "icon": "👥",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#0284c7",
    "category": "academic"
  },
  {
    "id": "t137",
    "name": "Thiên Tai & Khí Tượng Học",
    "nameEn": "Meteorology & Disasters",
    "icon": "🌪️",
    "difficulty": 3,
    "totalVocabs": 20,
    "color": "#dc2626",
    "category": "academic"
  },
  {
    "id": "t138",
    "name": "Lễ Hội & Văn Hóa Quốc Tế",
    "nameEn": "Global Festivals & Heritage",
    "icon": "🎉",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#c084fc",
    "category": "general_advanced"
  },
  {
    "id": "t139",
    "name": "Thời Trang Cao Cấp & May Mặc",
    "nameEn": "Haute Couture & Costumes",
    "icon": "🎭",
    "difficulty": 3,
    "totalVocabs": 24,
    "color": "#fb7185",
    "category": "general_advanced"
  },
  {
    "id": "t140",
    "name": "Môn Học Chuyên Sâu",
    "nameEn": "Advanced Academic Subjects",
    "icon": "📚",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#818cf8",
    "category": "academic"
  },
  {
    "id": "t141",
    "name": "Nghệ Thuật Thị Giác & Triển Lãm",
    "nameEn": "Visual Arts & Curation",
    "icon": "🖼️",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#f472b6",
    "category": "general_advanced"
  },
  {
    "id": "t142",
    "name": "Kiến Trúc & Thiết Kế Đô Thị",
    "nameEn": "Architecture & Urban Planning",
    "icon": "🏛️",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#2dd4bf",
    "category": "specialized"
  },
  {
    "id": "t143",
    "name": "Truyền Thông Đa Phương Tiện & Báo Chí",
    "nameEn": "Mass Media & Journalism",
    "icon": "📱",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#f43f5e",
    "category": "specialized"
  },
  {
    "id": "t144",
    "name": "Dụng Cụ Học Tập & Thiết Bị Nghiên Cứu",
    "nameEn": "Advanced Educational Tools",
    "icon": "✏️",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#34d399",
    "category": "academic"
  },
  {
    "id": "t145",
    "name": "Ẩm Thực Cao Cấp & Nhà Hàng",
    "nameEn": "Fine Dining & Gastronomy",
    "icon": "🍽️",
    "difficulty": 3,
    "totalVocabs": 25,
    "color": "#fbbf24",
    "category": "general_advanced"
  },
  {
    "id": "t146",
    "name": "CNTT & Trí Tuệ Nhân Tạo",
    "nameEn": "IT & Artificial Intelligence",
    "icon": "💻",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#0284c7",
    "category": "specialized"
  },
  {
    "id": "t147",
    "name": "Y Tế & Chăm Sóc Sức Khỏe",
    "nameEn": "Healthcare & Medicine",
    "icon": "🏥",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#e11d48",
    "category": "specialized"
  },
  {
    "id": "t148",
    "name": "Tài Chính & Ngân Hàng",
    "nameEn": "Finance & Banking",
    "icon": "📈",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#059669",
    "category": "business"
  },
  {
    "id": "t149",
    "name": "Luật Pháp & Pháp Lý",
    "nameEn": "Law & Jurisprudence",
    "icon": "⚖️",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#4f46e5",
    "category": "specialized"
  },
  {
    "id": "t150",
    "name": "Môi Trường & Sinh Thái",
    "nameEn": "Environment & Ecosystem",
    "icon": "🌿",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#16a34a",
    "category": "academic"
  },
  {
    "id": "t151",
    "name": "Marketing & Truyền Thông",
    "nameEn": "Marketing & Strategic Media",
    "icon": "📢",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#d97706",
    "category": "business"
  },
  {
    "id": "t152",
    "name": "Du Lịch & Hàng Không",
    "nameEn": "Aviation & Hospitality",
    "icon": "✈️",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#0284c7",
    "category": "general_advanced"
  },
  {
    "id": "t153",
    "name": "Khoa Học & Nghiên Cứu",
    "nameEn": "Science & Scientific Research",
    "icon": "🔬",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#7c3aed",
    "category": "academic"
  },
  {
    "id": "t154",
    "name": "Nghệ Thuật & Thiết Kế",
    "nameEn": "Art, Aesthetics & Design",
    "icon": "🎨",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#db2777",
    "category": "general_advanced"
  },
  {
    "id": "t155",
    "name": "Thể Thao & Huấn Luyện",
    "nameEn": "Professional Sports & Athletics",
    "icon": "⚽",
    "difficulty": 3,
    "totalVocabs": 10,
    "color": "#ea580c",
    "category": "general_advanced"
  }
];

/**
 * Toàn bộ danh sách từ vựng nâng cao (3992 từ chuẩn 100% không trùng lặp)
 */
export const ADVANCED_VOCABULARIES: AdvancedVocabularyItem[] = MOCK_VOCABULARIES as AdvancedVocabularyItem[];

/**
 * Helper to get advanced vocabularies filtered by themeId
 */
export function getAdvancedVocabulariesByTheme(themeId: string): AdvancedVocabularyItem[] {
  return ADVANCED_VOCABULARIES.filter((v) => v.themeId === themeId);
}

/**
 * Helper to search advanced vocabularies by keyword
 */
export function searchAdvancedVocabularies(query: string): AdvancedVocabularyItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return ADVANCED_VOCABULARIES;
  return ADVANCED_VOCABULARIES.filter(
    (v) =>
      v.word.toLowerCase().includes(q) ||
      (v.definitionVn && v.definitionVn.toLowerCase().includes(q)) ||
      (v.definition && v.definition.toLowerCase().includes(q))
  );
}
