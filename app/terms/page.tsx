import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Điều Khoản Dịch Vụ (Terms of Service) - XP English | XP Voca",
  description: "Điều khoản sử dụng dịch vụ và quy định nền tảng học tập tiếng Anh XP English | XP Voca.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-800 dark:text-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/90 dark:border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
          </Link>
          <span className="text-xs text-slate-400 font-mono">Cập nhật: Tháng 8/2026</span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 rounded-xl text-xs font-bold border border-blue-200/80 dark:border-blue-800 shadow-2xs">
            <ShieldCheck className="w-4 h-4" /> Điều Khoản Dịch Vụ
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Quy Định & Điều Khoản Sử Dụng Nền Tảng XP English | XP Voca
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Vui lòng đọc kỹ các điều khoản này trước khi đăng ký tài khoản và trải nghiệm các dịch vụ học tập trên nền tảng của chúng tôi.
          </p>
        </div>

        {/* Content sections */}
        <div className="p-6 sm:p-8 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-md space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0059bb]" /> 1. Chấp Thuận Điều Khoản
            </h2>
            <p>
              Bằng việc truy cập hoặc sử dụng trang web XP English | XP Voca, bạn đồng ý tuân thủ toàn bộ các quy định và điều khoản được nêu tại đây. Nếu bạn không đồng ý với bất kỳ phần nào, vui lòng ngừng sử dụng dịch vụ.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0059bb]" /> 2. Tài Khoản Học Viên & Bảo Mật
            </h2>
            <p>
              Người dùng có trách nhiệm bảo mật thông tin đăng nhập cá nhân (Email, Mật khẩu hoặc tài khoản liên kết Google/Facebook). Mọi hoạt động phát sinh từ tài khoản của bạn sẽ do bạn chịu trách nhiệm. Chúng tôi không yêu cầu bạn cung cấp mật khẩu qua bất kỳ kênh hỗ trợ nào.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0059bb]" /> 3. Quyền Sở Hữu Trí Tuệ & Nội Dung
            </h2>
            <p>
              Tất cả tài liệu bài học, thuật toán Spaced Repetition, kho đề thi TOEIC/IELTS và hệ thống phân tích AI thuộc quyền sở hữu của XP English | XP Voca. Người dùng được cấp quyền truy cập phục vụ mục đích học tập cá nhân phi thương mại. Nghiêm cấm sao chép, trích xuất dữ liệu hàng loạt nhằm mục đích thương mại khi chưa có sự đồng ý bằng văn bản.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0059bb]" /> 4. Quy Tắc Ứng Xử Cộng Đồng
            </h2>
            <p>
              Trong các phòng học nhóm (Study Rooms), bảng tin cộng đồng (Community Feed) và nhóm thảo luận, học viên cần tôn trọng lẫn nhau. Nghiêm cấm các hành vi phát ngôn thù hận, quấy rối, gian lận trong đấu trường PvP hoặc spam tin nhắn quảng cáo.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0059bb]" /> 5. Liên Hệ Hỗ Trợ
            </h2>
            <p>
              Nếu bạn có bất kỳ thắc mắc hoặc yêu cầu hỗ trợ nào về điều khoản dịch vụ, vui lòng liên hệ qua email quản trị hệ thống tại: <strong className="text-[#0059bb] dark:text-sky-400">support@xpenglish.com</strong>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 font-medium">
          © 2026 XP English | XP Voca. Đã bảo lưu mọi quyền.
        </div>

      </div>
    </div>
  );
}
