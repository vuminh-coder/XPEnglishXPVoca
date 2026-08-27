import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2, Shield } from "lucide-react";

export const metadata = {
  title: "Chính Sách Quyền Riêng Tư (Privacy Policy) - XP English | XP Voca",
  description: "Chính sách bảo mật quyền riêng tư và cam kết bảo vệ dữ liệu học viên nền tảng XP English | XP Voca.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
          </Link>
          <span className="text-xs text-slate-400 font-mono">Cập nhật: Tháng 8/2026</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-sky-400 rounded-xs text-xs font-bold border border-blue-200/50 dark:border-blue-900/40">
            <ShieldCheck className="w-4 h-4" /> Chính Sách Bảo Mật Quyền Riêng Tư
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Chính Sách Quyền Riêng Tư (Privacy Policy)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            XP English | XP Voca cam kết tôn trọng và bảo vệ tuyệt đối quyền riêng tư cũng như dữ liệu cá nhân của mọi học viên trên toàn cầu.
          </p>
        </div>

        {/* Content sections in Micro-Sharp Card */}
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xs shadow-2xs space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2 h-2 rounded-full bg-[#0059bb]" /> 1. Dữ Liệu Thu Thập Khi Đăng Nhập
            </h2>
            <p>
              Khi bạn sử dụng tính năng Đăng nhập bằng Google hoặc Facebook trên XP English, hệ thống chỉ thu thập các thông tin công khai cơ bản được bạn đồng ý cấp quyền: Họ tên, Địa chỉ Email công khai và Ảnh đại diện (Avatar) để thiết lập hồ sơ học tập cá nhân.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2 h-2 rounded-full bg-[#0059bb]" /> 2. Mục Đích Sử Dụng Dữ Liệu
            </h2>
            <p>
              Dữ liệu của bạn được thu thập nhằm mục đích phục vụ trực tiếp quá trình học tập:
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xs border border-slate-200/60 dark:border-white/5 space-y-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Lưu trữ tiến độ từ vựng Spaced Repetition, kết quả luyện thi TOEIC/IELTS và điểm thưởng XP.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hiển thị tên và ảnh đại diện trên Bảng Xếp Hạng tuần và Phòng Học Nhóm (Study Rooms).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Bảo mật phiên đăng nhập và hỗ trợ khôi phục mật khẩu tài khoản khi cần thiết.</span>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2 h-2 rounded-full bg-[#0059bb]" /> 3. Cam Kết Bảo Mật & Không Chia Sẻ Dữ Liệu
            </h2>
            <p>
              Chúng tôi cam kết tuyệt đối không bán, cho thuê hoặc chia sẻ dữ liệu cá nhân của học viên cho bất kỳ bên thứ ba nào vì mục đích quảng cáo hoặc tiếp thị. Toàn bộ mật khẩu được mã hóa một chiều bằng thuật toán PBKDF2 (HMAC-SHA512) và token JWT được lưu trữ an toàn trong HTTP-Only Cookie.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2 h-2 rounded-full bg-[#0059bb]" /> 4. Quyền Kiểm Soát & Yêu Cầu Xóa Dữ Liệu (Data Deletion)
            </h2>
            <p>
              Bạn có toàn quyền kiểm tra, chỉnh sửa hoặc yêu cầu xóa vĩnh viễn toàn bộ dữ liệu tài khoản bất kỳ lúc nào tại mục Cài đặt hoặc gửi yêu cầu xóa dữ liệu tới địa chỉ email: <strong className="text-[#0059bb] dark:text-sky-400">privacy@xpenglish.com</strong>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400">
          © 2026 XP English | XP Voca. Đã bảo lưu mọi quyền.
        </div>

      </div>
    </div>
  );
}
