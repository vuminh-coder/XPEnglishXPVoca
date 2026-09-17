"use client";

import React from "react";
import { Settings, X, User, FileText, Sparkles, Save } from "lucide-react";
import { Button } from "@/shared/components/ui";

interface ProfileEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  setFullName: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
  selectedEmoji: string;
  setSelectedEmoji: (val: string) => void;
  availableEmojis: readonly string[];
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileEditDrawer: React.FC<ProfileEditDrawerProps> = ({
  isOpen,
  onClose,
  fullName,
  setFullName,
  bio,
  setBio,
  selectedEmoji,
  setSelectedEmoji,
  availableEmojis,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
            <Settings className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
            Cài Đặt Thông Tin Hồ Sơ
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* External Float Label (Rule 6) */}
          <div className="space-y-1.5">
            <label
              htmlFor="fullname-input"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display"
            >
              <User className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" /> Họ và tên hiển thị
            </label>
            <input
              id="fullname-input"
              type="text"
              className="w-full h-10 px-3.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
              placeholder="Nhập họ và tên..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="bio-input"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" /> Tiểu sử ngắn (Bio)
            </label>
            <input
              id="bio-input"
              type="text"
              className="w-full h-10 px-3.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb] transition-all"
              placeholder="Viết một câu giới thiệu ngắn..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        {/* Avatar Emoji Selector with Circular Live Preview */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Chọn Avatar Biểu Tượng Emoji
          </label>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
            {/* Circular Preview Ring */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-400 to-amber-300 p-0.5 shadow-md ring-2 ring-[#0059bb]/30">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-2xl select-none">
                  {selectedEmoji}
                </div>
              </div>
            </div>

            {/* Circular Emoji Option Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap flex-1">
              {availableEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-9 h-9 rounded-full text-base flex items-center justify-center transition-all cursor-pointer ${
                    selectedEmoji === emoji
                      ? "bg-[#0059bb] text-white shadow-md ring-2 ring-offset-2 ring-[#0059bb] scale-110"
                      : "bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-600 hover:scale-105"
                  }`}
                  title={`Chọn avatar ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Action Button (Rule 18 & 19) */}
        <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="h-9 px-4 text-xs font-bold rounded-xl"
          >
            Hủy bỏ
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="h-9 px-5 text-xs font-bold rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 cursor-pointer font-display"
          >
            <Save className="w-3.5 h-3.5" /> Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
};
