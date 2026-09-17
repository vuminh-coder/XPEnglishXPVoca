import {
  Gift,
  ShieldCheck,
  GraduationCap,
  Zap,
  Crown,
  Compass,
} from "lucide-react";
import { PlanKey, PlanConfig, SuccessStory, FaqItem } from "../types";

export const PLANS: Record<PlanKey, PlanConfig> = {
  yearly: {
    key: "yearly",
    name: "Gói 1 Năm (Pro VIP Pass)",
    badge: "TIẾT KIỆM 45% • LỰA CHỌN PHỔ BIẾN NHẤT",
    badgeType: "hot",
    pricePerMonthFormatted: "69.000 đ",
    pricePerMonthNum: 69000,
    totalPriceFormatted: "828.000 đ",
    totalPriceNum: 828000,
    durationLabel: "Thanh toán 1 năm (12 tháng + 3 tháng tặng kèm)",
    billingDuration: "12 tháng học + 3 tháng tặng kèm",
    dailyCostNote: "Chỉ ~2.300 đ / ngày cho toàn bộ lộ trình",
    savingsLabel: "Tiết kiệm ngay 360.000 đ so với thanh toán từng tháng",
    originalPriceFormatted: "1.188.000 đ",
    savingsFormatted: "Tiết kiệm 360.000 đ (45%)",
    gifts: [
      { icon: Gift, text: "Tặng thêm 3 tháng học miễn phí toàn diện (Trị giá 297.000 đ)" },
      { icon: ShieldCheck, text: "Tặng 3 Khiên Kim Cương bảo vệ ngọn lửa Streak" },
      { icon: GraduationCap, text: "Trang bị Nón Cử Nhân Cú Vàng độc quyền cho Avatar" },
    ],
    keyHighlights: [
      "Mở khóa toàn bộ 100+ chủ đề từ vựng Oxford, TOEIC & IELTS",
      "Ngân hàng 37+ đề thi thử có giải thích chi tiết đáp án và bẫy đề",
      "Gia sư AI Speaking & Writing sửa phát âm IPA và ngữ điệu 24/7",
      "Thuật toán ghi nhớ ngắt quãng SM-2 không giới hạn số lượng từ",
      "Tự động kích hoạt khiên bảo vệ chuỗi học tập Streak vĩnh viễn",
      "Hệ số nhân đôi X2 XP ở tất cả bài học, minigame & đấu trường PvP",
    ],
  },
  monthly: {
    key: "monthly",
    name: "Gói 1 Tháng (Linh Hoạt)",
    badge: "LINH HOẠT TỪNG THÁNG",
    badgeType: "flex",
    pricePerMonthFormatted: "99.000 đ",
    pricePerMonthNum: 99000,
    totalPriceFormatted: "99.000 đ",
    totalPriceNum: 99000,
    durationLabel: "Thanh toán từng tháng linh hoạt, hủy bất cứ lúc nào",
    billingDuration: "30 ngày học toàn diện",
    dailyCostNote: "Chỉ ~3.300 đ / ngày trải nghiệm không ràng buộc",
    savingsLabel: "Linh hoạt từng tháng, hủy gia hạn bất kỳ lúc nào",
    gifts: [
      { icon: ShieldCheck, text: "Tặng 1 Khiên Bảo Hộ Lửa Streak" },
      { icon: Zap, text: "Tặng Thẻ Nhân Đôi XP trong 7 ngày" },
    ],
    keyHighlights: [
      "Mở khóa toàn bộ tính năng Pro trong 30 ngày",
      "Luyện tập Gia sư AI Speaking & Writing không giới hạn",
      "Làm toàn bộ 37+ đề thi TOEIC/IELTS có giải thích",
      "Tự động bảo vệ chuỗi Streak trong tháng",
    ],
  },
  lifetime: {
    key: "lifetime",
    name: "Gói Trọn Đời (Master Lifetime)",
    badge: "ĐẶC QUYỀN 1 LẦN DUY NHẤT • TRỌN ĐỜI",
    badgeType: "vip",
    pricePerMonthFormatted: "1.490.000 đ",
    pricePerMonthNum: 1490000,
    totalPriceFormatted: "1.490.000 đ",
    totalPriceNum: 1490000,
    durationLabel: "Sở hữu vĩnh viễn trọn đời, không bao giờ phải gia hạn",
    billingDuration: "Sở hữu vĩnh viễn trọn đời",
    dailyCostNote: "Đầu tư 1 lần duy nhất cho tương lai sự nghiệp",
    savingsLabel: "Đặc quyền nhận mọi bản cập nhật bài học và đề thi mới vĩnh viễn",
    gifts: [
      { icon: Crown, text: "Huy hiệu Vương Miện Vàng Golden Crown độc quyền" },
      { icon: ShieldCheck, text: "Bảo hộ Streak Vĩnh Viễn Không Bao Giờ Mất Chuỗi" },
      { icon: Zap, text: "Ưu tiên máy chủ AI tốc độ cao nhất (Ultra Low Latency)" },
      { icon: Compass, text: "1 buổi định hướng lộ trình học 1-on-1 cùng Mentor" },
    ],
    keyHighlights: [
      "Toàn bộ quyền lợi của gói Pro VIP trọn đời vĩnh viễn",
      "Tự động nhận tất cả bộ đề TOEIC/IELTS cập nhật mới",
      "Truy cập sớm các tính năng AI thế hệ mới nhất",
      "Quyền truy cập phòng học VIP Master Class",
    ],
  },
};

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    name: "Nguyễn Hoàng Nam",
    role: "Sinh viên ĐH Bách Khoa Hà Nội",
    badge: "Tăng 280 điểm TOEIC sau 2 tháng",
    initials: "HN",
    quote: "Tính năng Dictation chép chính tả kết hợp 37+ đề thi chuẩn có AI giải thích chi tiết từng câu bẫy giúp mình đạt 890 TOEIC ngay lần thi đầu tiên.",
    rating: 5,
  },
  {
    name: "Trần Thu Trang",
    role: "Chuyên viên Marketing",
    badge: "Speaking 6.0 ➔ 7.5 IELTS",
    initials: "TT",
    quote: "Gia sư AI Speaking thực sự giúp mình vượt qua nỗi sợ nói tiếng Anh. AI chấm điểm IPA từng âm tiết và sửa ngữ điệu tự nhiên như người bản xứ.",
    rating: 5,
  },
  {
    name: "Lê Minh Đức",
    role: "Học sinh THPT Chuyên",
    badge: "Nhớ 2.400+ từ vựng SM-2",
    initials: "MĐ",
    quote: "Gói Pro có X2 XP và thuật toán SM-2 giúp mình ghi nhớ hơn 2.400 từ vựng học thuật mà không hề bị quên, luôn duy trì Top 1 Bảng Vàng vinh danh.",
    rating: 5,
  },
];

export const FAQS: FaqItem[] = [
  {
    q: "Sau khi quét mã VietQR, tài khoản của tôi được nâng cấp trong bao lâu?",
    a: "Hệ thống tích hợp cổng thanh toán VietQR Napas 24/7 tự động. Ngay sau khi chuyển khoản thành công (thường từ 10 - 30 giây), tài khoản của bạn sẽ tự động chuyển sang trạng thái VIP Pro ngay lập tức mà không cần chờ duyệt thủ công.",
  },
  {
    q: "Chính sách hoàn tiền 100% trong 7 ngày hoạt động như thế nào?",
    a: "Chúng tôi cam kết hoàn tiền 100% học phí nếu bạn cảm thấy chương trình không phù hợp trong 7 ngày đầu tiên trải nghiệm, không cần điều kiện phức tạp.",
  },
  {
    q: "Tôi có thể dùng tài khoản Premium trên bao nhiêu thiết bị?",
    a: "Bạn có thể đăng nhập đồng bộ toàn bộ tiến độ học tập trên không giới hạn thiết bị: Điện thoại iOS, Android, Máy tính bảng, Laptop và PC cùng lúc.",
  },
  {
    q: "Gói Trọn Đời (Lifetime) có phát sinh thêm chi phí nào khi có đề thi mới không?",
    a: "Hoàn toàn KHÔNG. Bạn thanh toán 1 lần duy nhất để sở hữu vĩnh viễn và tự động nhận mọi bản cập nhật bài học, đề thi TOEIC/IELTS mới nhất trong tương lai.",
  },
  {
    q: "Tiến độ từ vựng và số Vàng hiện tại của tôi có được bảo lưu không?",
    a: "Toàn bộ chuỗi Streak, số điểm Vàng, danh sách từ vựng và lịch sử thi thử của bạn đều được giữ nguyên 100% và nhận thêm quà tặng khi kích hoạt gói VIP.",
  },
];

export const WAVEFORM_BAR_HEIGHTS = [
  40, 75, 95, 60, 85, 100, 70, 90, 65, 80, 100, 85, 60, 90, 75, 50,
];
