import Link from "next/link";
import { Compass, Home, SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0059bb]/10 dark:bg-sky-500/10 border border-[#0059bb]/20 dark:border-sky-400/20 flex items-center justify-center">
          <SearchX className="w-8 h-8 text-[#0059bb] dark:text-sky-400" strokeWidth={1.9} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-black tracking-widest uppercase text-[#0059bb] dark:text-sky-400 font-mono">
            Lỗi 404
          </p>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Không tìm thấy trang này
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Đường dẫn bạn vừa truy cập có thể đã được di chuyển, đổi tên hoặc không còn tồn tại trong hệ thống XP English.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/dashboard"
            className="flex-1 h-11 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Về Bảng Điều Khiển</span>
          </Link>
          <Link
            href="/study/dictation"
            className="flex-1 h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Luyện Nghe Dictation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
