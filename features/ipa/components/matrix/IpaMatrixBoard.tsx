"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  Layers,
  Volume2,
  SlidersHorizontal,
  Mic,
} from "lucide-react";
import {
  ALL_IPA_SOUNDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  IpaSound,
} from "../../data/ipaData";
import { IpaSoundCardV2 } from "./IpaSoundCardV2";
import { IpaSoundDetailModal } from "./IpaSoundDetailModal";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";

export interface IpaMatrixBoardProps {
  onGoToPracticeLab?: (sound: IpaSound) => void;
  className?: string;
}

type CategoryTab = "all" | "vowels" | "consonants";

export const IpaMatrixBoard: React.FC<IpaMatrixBoardProps> = ({
  onGoToPracticeLab,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSound, setSelectedSound] = useState<IpaSound | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Linguistic 4x3 Monophthong Quadrilateral (Front to Back, High to Low)
  const monophthongsOrdered = useMemo(() => {
    const idOrder = [
      // Row 1 (High / Close)
      "v_i_long", "v_i_short", "v_u_short", "v_u_long",
      // Row 2 (Mid)
      "v_e", "v_schwa", "v_er_long", "v_o_long",
      // Row 3 (Low / Open)
      "v_ae", "v_caret", "v_a_long", "v_o_short",
    ];
    return idOrder
      .map((id) => MONOPHTHONGS.find((s) => s.id === id))
      .filter(Boolean) as IpaSound[];
  }, []);

  // Linguistic 4x2 Diphthongs
  const diphthongsOrdered = useMemo(() => {
    const idOrder = [
      // Row 1 (Centring & /ɪ/ closing)
      "d_ear", "d_ay", "d_cure", "d_oy",
      // Row 2 (/ʊ/ closing & Centring)
      "d_oh", "d_air", "d_eye", "d_ow",
    ];
    return idOrder
      .map((id) => DIPHTHONGS.find((s) => s.id === id))
      .filter(Boolean) as IpaSound[];
  }, []);

  // Linguistic 16 Paired Consonants (8 Voiceless/Voiced pairs: 4 columns x 4 rows)
  const pairedConsonants = useMemo(() => {
    const idOrder = [
      // Row 1: Plosives (/p/-/b/, /t/-/d/)
      "c_p", "c_b", "c_t", "c_d",
      // Row 2: Affricates & Velars (/tʃ/-/dʒ/, /k/-/g/)
      "c_ch", "c_j", "c_k", "c_g",
      // Row 3: Fricatives 1 (/f/-/v/, /θ/-/ð/)
      "c_f", "c_v", "c_th_unvoiced", "c_th_voiced",
      // Row 4: Fricatives 2 (/s/-/z/, /ʃ/-/ʒ/)
      "c_s", "c_z", "c_sh", "c_zh",
    ];
    return idOrder
      .map((id) => CONSONANTS.find((s) => s.id === id))
      .filter(Boolean) as IpaSound[];
  }, []);

  // Linguistic 8 Single Consonants (Nasals, Approximants, Glides & Glottal: 4 columns x 2 rows)
  const singleConsonants = useMemo(() => {
    const idOrder = [
      // Row 1: Nasals (/m/, /n/, /ŋ/) + Glottal (/h/)
      "c_m", "c_n", "c_ng", "c_h",
      // Row 2: Liquids & Approximants (/l/, /r/, /w/, /j/)
      "c_l", "c_r", "c_w", "c_j_glide",
    ];
    return idOrder
      .map((id) => CONSONANTS.find((s) => s.id === id))
      .filter(Boolean) as IpaSound[];
  }, []);

  // Filtered search results
  const isSearching = searchQuery.trim().length > 0;
  const filteredSearchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_IPA_SOUNDS.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.keyWord.toLowerCase().includes(q) ||
        s.vietnameseGuide.toLowerCase().includes(q) ||
        s.examples.some((ex) => ex.word.toLowerCase().includes(q))
    );
  }, [searchQuery, isSearching]);

  const handleSelectSound = (sound: IpaSound) => {
    if (onGoToPracticeLab) {
      onGoToPracticeLab(sound);
    } else {
      setSelectedSound(sound);
      setIsModalOpen(true);
    }
  };

  const handleOpenDetailModal = (sound: IpaSound) => {
    setSelectedSound(sound);
    setIsModalOpen(true);
  };

  return (
    <div className={`space-y-5 select-none ${className}`}>
      {/* 1. TOP TOOLBAR: CATEGORY TABS + SPEED TOGGLE + SEARCH INPUT */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left: Category Segmented Switcher with Clear Meaningful Icons */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-white/5 overflow-x-auto hide-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "all"
                ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0 text-[#0059bb] dark:text-sky-400" />
            <span>Tất cả</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vowels")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "vowels"
                ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 shrink-0 text-sky-500" />
            <span>Nguyên âm</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("consonants")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "consonants"
                ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Mic className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Phụ âm</span>
          </button>
        </div>

        {/* Right: Audio Speed Selector + Search Box */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Speed Toggle */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-white/5 text-xs">
            <SlidersHorizontal className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-[11px] font-medium text-slate-400 px-0.5 hidden sm:inline">
              Tốc độ:
            </span>
            <button
              type="button"
              onClick={() => setPlaybackRate(1.0)}
              className={`px-2 py-1 rounded-md font-bold text-[11px] transition-all cursor-pointer ${
                playbackRate === 1.0
                  ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              1.0x
            </button>
            <button
              type="button"
              onClick={() => setPlaybackRate(0.8)}
              className={`px-2 py-1 rounded-md font-bold text-[11px] transition-all cursor-pointer ${
                playbackRate === 0.8
                  ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
              title="Phát chậm để nghe rõ khẩu hình"
            >
              0.8x Chậm
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm âm (i:, th) hoặc từ..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SEARCH MODE VIEW */}
      {isSearching ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 font-display">
              Kết quả tìm kiếm cho: "{searchQuery}" ({filteredSearchResults.length} âm)
            </h3>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-[#0059bb] hover:underline cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>

          {filteredSearchResults.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Không tìm thấy âm nào khớp với từ khóa tìm kiếm.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2.5 sm:gap-3">
              {filteredSearchResults.map((sound) => (
                <IpaSoundCardV2
                  key={sound.id}
                  sound={sound}
                  isSelected={selectedSound?.id === sound.id}
                  rate={playbackRate}
                  onSelect={handleSelectSound}
                  onOpenDetail={handleOpenDetailModal}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 3. SYMMETRICAL ACOUSTIC SOUNDBOARD STUDIO CANVAS */
        <div className="space-y-6">
          {/* ──────────────────────────────────────────────────────── */}
          {/* SECTION A: NGUYÊN ÂM (VOWELS: 12 Monophthongs + 8 Diphthongs) */}
          {/* ──────────────────────────────────────────────────────── */}
          {(activeTab === "all" || activeTab === "vowels") && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
              {/* Header with Dashboard Icon Well */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/50 flex items-center justify-center shrink-0 shadow-2xs">
                    <Volume2 className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      Bảng Nguyên Âm
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Sắp xếp theo độ mở khẩu hình & vị trí lưỡi (Cao ➔ Vừa ➔ Thấp)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0059bb]" /> Âm dài
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" /> Âm ngắn
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" /> Âm đôi
                  </span>
                </div>
              </div>

              {/* Sub-grid 1: 12 Monophthongs (Symmetrical 4-columns x 3-rows) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0059bb]" />
                    <span>Nguyên âm đơn</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    High ➔ Mid ➔ Low
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {monophthongsOrdered.map((sound) => (
                    <IpaSoundCardV2
                      key={sound.id}
                      sound={sound}
                      isSelected={selectedSound?.id === sound.id}
                      rate={playbackRate}
                      onSelect={handleSelectSound}
                      onOpenDetail={handleOpenDetailModal}
                    />
                  ))}
                </div>
              </div>

              {/* Sub-grid 2: 8 Diphthongs (Symmetrical 4-columns x 2-rows) */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span>Nguyên âm đôi</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Chuyển động lướt giữa 2 nguyên âm
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {diphthongsOrdered.map((sound) => (
                    <IpaSoundCardV2
                      key={sound.id}
                      sound={sound}
                      isSelected={selectedSound?.id === sound.id}
                      rate={playbackRate}
                      onSelect={handleSelectSound}
                      onOpenDetail={handleOpenDetailModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECTION B: PHỤ ÂM (CONSONANTS: 16 Paired + 8 Single) */}
          {/* ──────────────────────────────────────────────────────── */}
          {(activeTab === "all" || activeTab === "consonants") && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
              {/* Header with Dashboard Icon Well */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center justify-center shrink-0 shadow-2xs">
                    <Mic className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      Bảng Phụ Âm
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Sắp xếp theo cơ chế thanh quản & phương thức cấu âm (Hữu thanh / Vô thanh)
                    </p>
                  </div>
                </div>

                {/* Voicing Legend */}
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Hữu thanh (Rung cổ)
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Vô thanh (Bật hơi)
                  </span>
                </div>
              </div>

              {/* Sub-grid 1: 16 Paired Consonants (Symmetrical 4-columns x 4-rows) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Phụ âm có cặp đối xứng</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    8 Cặp: Vô thanh ➔ Hữu thanh
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {pairedConsonants.map((sound) => (
                    <IpaSoundCardV2
                      key={sound.id}
                      sound={sound}
                      isSelected={selectedSound?.id === sound.id}
                      rate={playbackRate}
                      onSelect={handleSelectSound}
                      onOpenDetail={handleOpenDetailModal}
                    />
                  ))}
                </div>
              </div>

              {/* Sub-grid 2: 8 Single Consonants (Symmetrical 4-columns x 2-rows) */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Phụ âm đơn lẻ & Bán nguyên âm</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Âm mũi, âm cạnh lưỡi, âm lướt & âm thanh hầu
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {singleConsonants.map((sound) => (
                    <IpaSoundCardV2
                      key={sound.id}
                      sound={sound}
                      isSelected={selectedSound?.id === sound.id}
                      rate={playbackRate}
                      onSelect={handleSelectSound}
                      onOpenDetail={handleOpenDetailModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. DEEP SOUND ANATOMICAL DETAIL MODAL */}
      <IpaSoundDetailModal
        sound={selectedSound}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGoToPracticeLab={onGoToPracticeLab}
      />
    </div>
  );
};

