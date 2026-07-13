"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
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
} from "lucide-react";
import { Button, Badge } from "@/components/ui";

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
    return <div className="p-8 text-center text-xs font-bold text-muted">Đang tải...</div>;
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

  const inputClass = "w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all";

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Page Header */}
      <div className="page-header animate-fade-in-down text-center mb-6">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cài đặt cấu hình</h1>
        <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1.5 max-w-xl mx-auto text-xs md:text-sm font-medium">
          Quản lý hồ sơ cá nhân, thiết lập học tập và tùy chỉnh chế độ hiển thị.
        </p>
      </div>

      {/* Section 1: Profile (Rule 10: Double Bezel Concentric radius math) */}
      <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
        <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-6 space-y-5">
          <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-neutral-850 pb-2">
            <User className="w-3.5 h-3.5" strokeWidth={1.3} /> Hồ sơ công khai
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Họ và tên</label>
              <input type="text" className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" strokeWidth={1.3} /> Tiểu sử ngắn (Bio)
              </label>
              <textarea
                className={`${inputClass} resize-none min-h-[80px] font-medium`}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Viết vài dòng giới thiệu về bản thân..."
              />
            </div>
            <Button variant="primary" size="sm" onClick={handleSaveProfile} className="w-full font-bold text-white dark:text-white">
              <Save className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.3} /> Lưu hồ sơ
            </Button>
          </div>
        </div>
      </div>

      {/* Section 2: Study Goals (Rule 10: Double Bezel Concentric radius math) */}
      <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
        <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-6 space-y-5">
          <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-neutral-850 pb-2">
            <Target className="w-3.5 h-3.5" strokeWidth={1.3} /> Mục tiêu học tập
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Mục tiêu từ vựng / ngày</label>
              <select
                className={`${inputClass} cursor-pointer`}
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
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.3} /> Thời gian học / ngày
              </label>
              <select
                className={`${inputClass} cursor-pointer`}
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
      </div>

      {/* Section 3: Notifications (Rule 10: Double Bezel Concentric radius math) */}
      <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
        <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-6 space-y-5">
          <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-neutral-850 pb-2">
            <Bell className="w-3.5 h-3.5" strokeWidth={1.3} /> Cài đặt thông báo
          </h3>
          <div className="space-y-3">
            {[
              { key: "notifyXp" as const, label: "Thông báo nhận XP", desc: "Hiển thị popup khi bạn kiếm được điểm kinh nghiệm" },
              { key: "notifyChallenge" as const, label: "Nhiệm vụ hàng ngày", desc: "Nhắc nhở khi có nhiệm vụ mới hoặc hoàn thành nhiệm vụ" },
              { key: "notifyStreak" as const, label: "Nhắc streak", desc: "Cảnh báo khi sắp mất chuỗi ngày học liên tục" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50/50 dark:bg-neutral-800/30">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </div>
                <button
                  onClick={() => updateSetting(item.key, !settings[item.key])}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    settings[item.key] ? "bg-emerald-500" : "bg-slate-300 dark:bg-neutral-700"
                  }`}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      settings[item.key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Appearance (Rule 10: Double Bezel Concentric radius math) */}
      <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
        <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-6 space-y-5">
          <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-neutral-850 pb-2">
            <Palette className="w-3.5 h-3.5" strokeWidth={1.3} /> Giao diện
          </h3>
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50/50 dark:bg-neutral-800/30">
            <div className="flex items-center gap-3">
              {settings.darkMode ? <Moon className="h-5 w-5 text-indigo-400" strokeWidth={1.3} /> : <Sun className="h-5 w-5 text-amber-500" strokeWidth={1.3} />}
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {settings.darkMode ? "Chế độ tối (Dark Mode)" : "Chế độ sáng (Light Mode)"}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Chuyển đổi giao diện sáng / tối</div>
              </div>
            </div>
            <button
              onClick={() => updateSetting("darkMode", !settings.darkMode)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.darkMode ? "bg-indigo-500" : "bg-slate-300 dark:bg-neutral-700"
              }`}
              aria-label="Toggle Dark Mode"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section 5: Account Actions (Rule 10: Double Bezel Concentric radius math) */}
      <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
        <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-6 space-y-4">
          <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-neutral-850 pb-2">
            <Shield className="w-3.5 h-3.5" strokeWidth={1.3} /> Tài khoản & Dữ liệu
          </h3>
          <div className="space-y-3">
            <Button variant="bezel" size="sm" onClick={handleSaveSettings} className="w-full justify-center font-bold">
              <Save className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.3} /> Lưu tất cả cài đặt
            </Button>
            <Button variant="secondary" size="sm" onClick={handleClearCache} className="w-full justify-center font-bold">
              <Trash2 className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.3} /> Xóa dữ liệu cache
            </Button>
            <Button variant="danger" size="sm" onClick={handleLogout} className="w-full justify-center font-bold text-white dark:text-white">
              <LogOut className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.3} /> Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
