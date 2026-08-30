"use client";
import React, { useState, useEffect } from "react";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  User,
  FileText,
  Target,
  Save,
  Moon,
  Sun,
  Palette,
  Bell,
  Shield,
  Trash2,
  LogOut,
  Clock,
  Settings as SettingsIcon,
} from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

interface UserSettings {
  dailyGoal: number;
  dailyMinutes: number;
  darkMode: boolean;
  notifyXp: boolean;
  notifyChallenge: boolean;
  notifyStreak: boolean;
}

function loadSettings(): UserSettings {
  if (typeof window === "undefined") {
    return { dailyGoal: 10, dailyMinutes: 15, darkMode: false, notifyXp: true, notifyChallenge: true, notifyStreak: true };
  }
  const stored = localStorage.getItem("xp_user_settings");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch { /* fall through */ }
  }
  return { dailyGoal: 10, dailyMinutes: 15, darkMode: false, notifyXp: true, notifyChallenge: true, notifyStreak: true };
}

function saveSettings(settings: UserSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem("xp_user_settings", JSON.stringify(settings));
  }
}

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [settings, setSettings] = useState<UserSettings>(loadSettings());

  useEffect(() => {
    setMounted(true);
    if (user) {
      setFullName(user.fullName);
      setBio(user.bio || "");
    }
    setSettings(loadSettings());
  }, [user]);

  if (!mounted || !user) {
    return (
      <div className="space-y-6 pb-20 font-sans animate-pulse">
        <div className="h-14 w-full bg-white dark:bg-[#0c0c0f] rounded-xl border border-slate-200 dark:border-slate-800" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-48 bg-white dark:bg-[#0c0c0f] rounded-2xl border border-slate-200 dark:border-slate-800" />
          <div className="h-48 bg-white dark:bg-[#0c0c0f] rounded-2xl border border-slate-200 dark:border-slate-800" />
        </div>
      </div>
    );
  }

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSaveProfile = () => {
    updateProfile(fullName, bio);
    addToast({ type: "success", title: "Đã lưu hồ sơ!", message: "Hồ sơ cá nhân đã được cập nhật thành công." });
  };

  const handleSaveSettings = () => {
    saveSettings(settings);
    addToast({ type: "success", title: "Đã lưu cài đặt!", message: "Tất cả thiết lập đã được lưu vào bộ nhớ." });
  };

  const handleClearCache = () => {
    localStorage.removeItem("xp_daily_challenges");
    localStorage.removeItem("xp_user_settings");
    addToast({ type: "info", title: "Đã xóa cache!", message: "Dữ liệu tạm đã được dọn dẹp." });
  };

  const handleLogout = () => {
    logout();
    addToast({ type: "info", title: "Đã đăng xuất!" });
  };

  const inputClass = "w-full h-11 px-4 text-xs sm:text-sm font-medium rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 transition-all";

  return (
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 dark:text-slate-200" suppressHydrationWarning>
      {/* ─── APP TOP HEADER (56px Baseline) ─── */}
      <AppTopHeader
        rightDesktopContent={
          <HeaderPillContainer>
            <HeaderPillItem
              label="Lưu Cài Đặt"
              icon={<Save className="w-4 h-4 text-emerald-500" />}
              onClick={handleSaveSettings}
            />
          </HeaderPillContainer>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            label="Cài Đặt Cấu Hình"
            icon={<SettingsIcon className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />}
            active
          />
          <HeaderPillItem
            label="Hồ Sơ Cá Nhân"
            icon={<User className="w-4 h-4 text-slate-500" />}
            href="/profile"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      <PageEntranceWrapper className="max-w-3xl mx-auto space-y-6">
        {/* Section 1: Profile */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md space-y-5">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 font-display">
            <User className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Hồ Sơ Cá Nhân
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Họ và tên</label>
              <input type="text" className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Tiểu sử ngắn (Bio)
              </label>
              <textarea
                className="w-full p-4 text-xs sm:text-sm font-medium rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 transition-all resize-none min-h-[90px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Viết vài dòng giới thiệu về bản thân và mục tiêu học tiếng Anh..."
              />
            </div>
            <button
              type="button"
              onClick={handleSaveProfile}
              className="h-11 px-5 bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs sm:text-sm font-bold rounded-xl active:scale-95 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Lưu hồ sơ cá nhân
            </button>
          </div>
        </div>

        {/* Section 2: Study Goals */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md space-y-5">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 font-display">
            <Target className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Mục Tiêu Học Tập
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mục tiêu từ vựng / ngày</label>
              <select
                className={`${inputClass} cursor-pointer font-bold`}
                value={settings.dailyGoal}
                onChange={(e) => updateSetting("dailyGoal", Number(e.target.value))}
              >
                <option value={5}>Dễ dàng (5 từ / ngày)</option>
                <option value={10}>Trung bình (10 từ / ngày)</option>
                <option value={15}>Chăm chỉ (15 từ / ngày)</option>
                <option value={20}>Thử thách (20 từ / ngày)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Thời gian học / ngày
              </label>
              <select
                className={`${inputClass} cursor-pointer font-bold`}
                value={settings.dailyMinutes}
                onChange={(e) => updateSetting("dailyMinutes", Number(e.target.value))}
              >
                <option value={5}>5 phút</option>
                <option value={10}>10 phút</option>
                <option value={15}>15 phút</option>
                <option value={30}>30 phút</option>
                <option value={60}>60 phút</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Notifications */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md space-y-5">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 font-display">
            <Bell className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Cài Đặt Thông Báo
          </h3>
          <div className="space-y-3">
            {[
              { key: "notifyXp" as const, label: "Thông báo nhận XP", desc: "Hiển thị thông báo khi bạn hoàn thành bài học và nhận điểm thưởng" },
              { key: "notifyChallenge" as const, label: "Nhiệm vụ hàng ngày", desc: "Nhắc nhở khi có nhiệm vụ mới hoặc hoàn thành thử thách ngày" },
              { key: "notifyStreak" as const, label: "Nhắc nhở Chuỗi Streak", desc: "Cảnh báo trước khi ngọn lửa Streak bị đóng băng do quên học" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">{item.desc}</div>
                </div>
                <button
                  onClick={() => updateSetting(item.key, !settings[item.key])}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
                    settings[item.key] ? "bg-[#0059bb]" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      settings[item.key] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Appearance */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md space-y-5">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 font-display">
            <Palette className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Chế Độ Hiển Thị
          </h3>
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {settings.darkMode ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {settings.darkMode ? "Chế độ tối (Dark Mode)" : "Chế độ sáng (Light Mode)"}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">Chuyển đổi giao diện sáng / tối để bảo vệ mắt</div>
              </div>
            </div>
            <button
              onClick={() => updateSetting("darkMode", !settings.darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
                settings.darkMode ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
              aria-label="Toggle Dark Mode"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 5: Account Actions */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md space-y-4">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 font-display">
            <Shield className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Tài Khoản & Dữ Liệu
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleClearCache}
              className="h-11 px-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-2xs"
            >
              <Trash2 className="w-4 h-4 text-slate-500" /> Xóa dữ liệu cache
            </button>
            <button
              onClick={handleLogout}
              className="h-11 px-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-2xs"
            >
              <LogOut className="w-4 h-4" /> Đăng xuất tài khoản
            </button>
          </div>
        </div>
      </PageEntranceWrapper>
    </div>
  );
}
