/**
 * Vietnamese Search & Normalization Utilities
 * Supports:
 * - Case-insensitive matching (hoa / thường)
 * - Diacritics-insensitive matching (có dấu / không dấu)
 * - Handling of Vietnamese special letters: 'đ', 'Đ' -> 'd'
 * - Semantic topic synonym expansion (IT, AI, tiền, đồ ăn, bác sĩ...)
 */

/**
 * Normalizes Vietnamese string by removing diacritical marks (accents),
 * converting 'đ'/'Đ' to 'd', and lowercasing.
 *
 * Examples:
 * - "Ăn uống" -> "an uong"
 * - "Động vật" -> "dong vat"
 * - "Sức khỏe" -> "suc khoe"
 * - "Gia đình" -> "gia dinh"
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
}

/**
 * Checks if target string matches query string:
 * - Case-insensitive
 * - Diacritics-insensitive (supports both accented and unaccented Vietnamese search)
 *
 * Examples:
 * - matchVietnameseSearch("Gia đình", "gia dinh") -> true
 * - matchVietnameseSearch("Gia đình", "GIA ĐÌNH") -> true
 * - matchVietnameseSearch("Ăn uống", "an uong") -> true
 * - matchVietnameseSearch("Food & Drinks", "food") -> true
 */
export function matchVietnameseSearch(
  target: string | undefined | null,
  query: string | undefined | null
): boolean {
  if (!target) return false;
  if (!query || !query.trim()) return true;

  const rawQ = query.trim().toLowerCase();

  // 1. Fast path: Raw lowercase match
  const rawTarget = target.toLowerCase();
  if (rawTarget.includes(rawQ)) return true;

  // 2. Diacritics-insensitive normalized match
  const normalizedQ = removeVietnameseTones(query);
  if (!normalizedQ) return true;

  const normalizedTarget = removeVietnameseTones(target);
  return normalizedTarget.includes(normalizedQ);
}

/**
 * Topic synonyms dictionary for intelligent semantic search expansion
 */
export const TOPIC_SYNONYMS: Record<string, string[]> = {
  // Công nghệ, CNTT, Lập trình, AI
  it: ["cong nghe", "thong tin", "ai", "may tinh", "phan mem", "lap trinh", "tri tue nhan tao", "technology"],
  ai: ["tri tue nhan tao", "cong nghe", "thong tin", "machine learning", "du lieu", "artificial"],
  code: ["cong nghe", "lap trinh", "phan mem", "it"],
  computer: ["may tinh", "cong nghe", "thong tin", "it"],
  "lap trinh": ["cong nghe", "it", "phan mem", "lap trinh"],
  tech: ["cong nghe", "technology", "ky thuat"],

  // Tài chính, Tiền tệ, Ngân hàng
  tien: ["tai chinh", "ngan hang", "tien te", "dau tu", "kinh te", "money"],
  money: ["tai chinh", "ngan hang", "tien te", "finance"],
  bank: ["ngan hang", "tai chinh", "banking"],
  "ngan hang": ["tai chinh", "tien te", "dau tu", "ngan hang"],
  finance: ["tai chinh", "ngan hang", "kinh te"],

  // Y tế, Sức khỏe, Bác sĩ
  "bac si": ["y te", "suc khoe", "benh vien", "y khoa", "doctor"],
  doctor: ["y te", "suc khoe", "bac si", "y khoa"],
  "benh vien": ["y te", "suc khoe", "benh vien", "hospital"],
  hospital: ["benh vien", "y te", "suc khoe"],
  thuoc: ["y te", "duoc pham", "suc khoe", "thuoc", "medicine"],

  // Ẩm thực, Ăn uống, Đồ uống
  an: ["an uong", "am thuc", "nha hang", "thuc pham", "mon an", "food"],
  food: ["an uong", "am thuc", "thuc pham", "dining"],
  drink: ["do uong", "thuc uong", "ca phe", "nuoc"],
  "do uong": ["do uong", "an uong", "nuoc giai khat"],
  "nha hang": ["nha hang", "an uong", "am thuc", "restaurant"],

  // Du lịch, Máy bay, Khách sạn
  bay: ["du lich", "san bay", "hang khong", "chuyen bay", "travel"],
  flight: ["chuyen bay", "san bay", "hang khong", "du lich"],
  "san bay": ["san bay", "du lich", "di chuyen", "airport"],
  "khach san": ["khach san", "du lich", "nghi duong", "hotel"],
  hotel: ["khach san", "du lich", "accommodation"],
  travel: ["du lich", "chuyen di", "kham pha"],

  // Thời trang, Mua sắm
  "quan ao": ["thoi trang", "mua sam", "quan ao", "trang phuc", "fashion"],
  clothes: ["quan ao", "thoi trang", "clothing"],
  fashion: ["thoi trang", "lam dep", "quan ao"],
  "mua sam": ["mua sam", "sieu thi", "cua hang", "shopping"],
  shopping: ["mua sam", "cua hang", "sieu thi"],

  // Giáo dục, Trường học
  "truong hoc": ["giao duc", "truong hoc", "hoc tap", "education", "school"],
  school: ["truong hoc", "giao duc", "hoc sinh", "sinh vien"],
  "dai hoc": ["dai hoc", "giao duc", "hoc thuat", "university"],

  // Công việc, Nghề nghiệp
  "cong viec": ["nghe nghiep", "cong viec", "van phong", "su nghiep", "job", "career"],
  job: ["nghe nghiep", "cong viec", "lam viec"],
  career: ["su nghiep", "nghe nghiep", "cong viec"],

  // Giao thông, Đi lại
  xe: ["giao thong", "phuong tien", "xe co", "di lai", "traffic"],
  car: ["o to", "xe hoi", "phuong tien"],
  "giao thong": ["phuong tien", "di lai", "xe co", "traffic"],

  // Động vật, Thú cưng
  "dong vat": ["dong vat", "thu cung", "sinh vat", "animals"],
  pet: ["thu cung", "dong vat", "cho meo"],
  animal: ["dong vat", "sinh vat", "thu cung"],
};

/**
 * Intelligent topic matcher with semantic synonym support
 */
export function matchThemeSearch(
  theme: { name: string; nameEn?: string; id?: string },
  query: string | undefined | null
): boolean {
  if (!query || !query.trim()) return true;

  // 1. Direct match on Vietnamese name, English name, or ID
  if (matchVietnameseSearch(theme.name, query)) return true;
  if (theme.nameEn && matchVietnameseSearch(theme.nameEn, query)) return true;
  if (theme.id && matchVietnameseSearch(theme.id, query)) return true;

  // 2. Semantic synonym expansion
  const normQ = removeVietnameseTones(query);
  const synonyms = TOPIC_SYNONYMS[normQ];
  if (synonyms && synonyms.length > 0) {
    const normThemeName = removeVietnameseTones(theme.name);
    const normThemeNameEn = theme.nameEn ? removeVietnameseTones(theme.nameEn) : "";

    for (const syn of synonyms) {
      if (normThemeName.includes(syn) || normThemeNameEn.includes(syn)) {
        return true;
      }
    }
  }

  return false;
}
