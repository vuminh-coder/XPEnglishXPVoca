"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { User, FileText, Target, Save, CheckCircle2 } from "lucide-react";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

function ClerkSettings() {
  const { user, isLoaded } = useUser();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [dailyGoal, setDailyGoal] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setBio((user.publicMetadata?.bio as string) || "");
    }
  }, [user]);

  if (!isLoaded) return <div className="p-8 text-center text-xs font-bold text-muted">Đang tải...</div>;
  if (!user) return <div className="p-8 text-center text-red-500 font-bold">Không tìm thấy tài khoản người dùng.</div>;

  const handleSaveSettings = async () => {
    try {
      await user.update({
        firstName: fullName.split(" ")[0] || "",
        lastName: fullName.split(" ").slice(1).join(" ") || "",
      });
      setToast("Đã cập nhật cấu hình học tập thành công!");
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Error saving clerk profile settings:", err);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {toast && (
        <div className="fixed bottom-6 right-6 z-[600] bezel animate-fade-in-up">
          <div className="bezel-inner bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{toast}</div>
          </div>
        </div>
      )}

      <div className="page-header animate-fade-in-down mb-8 text-center">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cài đặt cấu hình</h1>
        <p className="page-subtitle text-muted max-w-xl mx-auto" style={{ marginTop: '6px' }}>
          Quản lý các thiết lập học tập cá nhân và tài khoản của bạn.
        </p>
      </div>

      <div className="bezel animate-fade-in-up">
        <div className="bezel-inner p-6 bg-white dark:bg-neutral-900 flex flex-col gap-6">
          <div>
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Hồ sơ công khai
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Họ và tên
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Tiểu sử ngắn (Bio)
                </label>
                <textarea
                  className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] resize-none min-h-[80px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-black/[0.04] dark:border-white/[0.04]"></div>

          <div>
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Mục tiêu học tập
            </h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Mục tiêu từ vựng hàng ngày
              </label>
              <select
                className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] cursor-pointer"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
              >
                <option value={5}>Dễ dàng (5 từ / ngày)</option>
                <option value={10}>Trung bình (10 từ / ngày)</option>
                <option value={15}>Chăm chỉ (15 từ / ngày)</option>
                <option value={20}>Thử thách (20 từ / ngày)</option>
              </select>
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold py-2.5 w-full tactile shadow-sm mt-2"
            onClick={handleSaveSettings}
          >
            <Save className="w-3.5 h-3.5" strokeWidth={2} /> Lưu cấu hình
          </button>
        </div>
      </div>
    </div>
  );
}

function LocalSettings() {
  const { user, updateProfile } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [dailyGoal, setDailyGoal] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  if (!user) return <div className="p-8 text-center text-red-500 font-bold">Không tìm thấy tài khoản người dùng.</div>;

  const handleSaveSettings = () => {
    updateProfile(fullName, bio);
    setToast("Đã cập nhật cấu hình học tập thành công!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {toast && (
        <div className="fixed bottom-6 right-6 z-[600] bezel animate-fade-in-up">
          <div className="bezel-inner bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{toast}</div>
          </div>
        </div>
      )}

      <div className="page-header animate-fade-in-down mb-8 text-center">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cài đặt cấu hình</h1>
        <p className="page-subtitle text-muted max-w-xl mx-auto" style={{ marginTop: '6px' }}>
          Quản lý các thiết lập học tập cá nhân và tài khoản của bạn.
        </p>
      </div>

      <div className="bezel animate-fade-in-up">
        <div className="bezel-inner p-6 bg-white dark:bg-neutral-900 flex flex-col gap-6">
          <div>
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Hồ sơ công khai
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Họ và tên
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Tiểu sử ngắn (Bio)
                </label>
                <textarea
                  className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] resize-none min-h-[80px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-black/[0.04] dark:border-white/[0.04]"></div>

          <div>
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Mục tiêu học tập
            </h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Mục tiêu từ vựng hàng ngày
              </label>
              <select
                className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] cursor-pointer"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
              >
                <option value={5}>Dễ dàng (5 từ / ngày)</option>
                <option value={10}>Trung bình (10 từ / ngày)</option>
                <option value={15}>Chăm chỉ (15 từ / ngày)</option>
                <option value={20}>Thử thách (20 từ / ngày)</option>
              </select>
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold py-2.5 w-full tactile shadow-sm mt-2"
            onClick={handleSaveSettings}
          >
            <Save className="w-3.5 h-3.5" strokeWidth={2} /> Lưu cấu hình
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [clerkEnabled, setClerkEnabled] = useState(true);

  useEffect(() => {
    setClerkEnabled(checkIsClerkEnabled());
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8 text-center text-xs font-bold text-muted">Đang tải...</div>;

  return clerkEnabled ? <ClerkSettings /> : <LocalSettings />;
}
