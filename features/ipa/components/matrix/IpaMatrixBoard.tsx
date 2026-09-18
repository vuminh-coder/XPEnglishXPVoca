"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Layers, Music, Sparkles } from "lucide-react";
import {
  ALL_IPA_SOUNDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  IpaSound,
} from "../../data/ipaData";
import { IpaSoundCardV2 } from "./IpaSoundCardV2";
import { IpaSoundDetailModal } from "./IpaSoundDetailModal";

export interface IpaMatrixBoardProps {
  onGoToPracticeLab?: (sound: IpaSound) => void;
  className?: string;
}

export const IpaMatrixBoard: React.FC<IpaMatrixBoardProps> = ({
  onGoToPracticeLab,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSound, setSelectedSound] = useState<IpaSound | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group Monophthongs into Long and Short
  const longMonophthongs = useMemo(
    () => MONOPHTHONGS.filter((s) => s.vowelLength === "long"),
    []
  );
  const shortMonophthongs = useMemo(
    () => MONOPHTHONGS.filter((s) => s.vowelLength === "short"),
    []
  );

  // Paired Consonants (16 sounds / 8 pairs) & Single Consonants (8 sounds)
  const pairedConsonants = useMemo(() => {
    const pairIds = [
      ["c_p", "c_b"],
      ["c_t", "c_d"],
      ["c_k", "c_g"],
      ["c_f", "c_v"],
      ["c_th_thin", "c_th_this"],
      ["c_s", "c_z"],
      ["c_sh", "c_zh"],
      ["c_ch", "c_j"],
    ];
    return pairIds
      .map(([id1, id2]) => {
        const s1 = CONSONANTS.find((c) => c.id === id1);
        const s2 = CONSONANTS.find((c) => c.id === id2);
        return s1 && s2 ? [s1, s2] : null;
      })
      .filter(Boolean) as [IpaSound, IpaSound][];
  }, []);

  const singleConsonants = useMemo(() => {
    const singleIds = ["c_m", "c_n", "c_ng", "c_h", "c_l", "c_r", "c_w", "c_y"];
    return singleIds
      .map((id) => CONSONANTS.find((c) => c.id === id))
      .filter(Boolean) as IpaSound[];
  }, []);

  // Filtered search sounds
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

  const handleSoundClick = (sound: IpaSound) => {
    setSelectedSound(sound);
    setIsModalOpen(true);
  };

  return (
    <div className={`space-y-6 select-none ${className}`}>
      {/* Search Bar & Sub-Header Tooling */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display">
            Bảng 44 Âm Chuẩn Quốc Tế
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            (12 Nguyên âm đơn • 8 Nguyên âm đôi • 24 Phụ âm)
          </span>
        </div>

        {/* Search Input Box (Rule 15 Wadhah Aloui Box Border) */}
        <div className="relative min-w-[260px] sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm âm (i:, th) hoặc từ (sheep)..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* SEARCH RESULTS VIEW */}
      {isSearching ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display">
              Kết quả tìm kiếm cho: "{searchQuery}" ({filteredSearchResults.length})
            </h3>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-[#0059bb] hover:underline cursor-pointer"
            >
              Xóa tìm kiếm
            </button>
          </div>

          {filteredSearchResults.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Không tìm thấy âm nào khớp với từ khóa tìm kiếm.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {filteredSearchResults.map((sound) => (
                <IpaSoundCardV2
                  key={sound.id}
                  sound={sound}
                  onSelect={handleSoundClick}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* STANDARD SCIENTIFIC 3-TIER IPA MATRIX VIEW */
        <div className="space-y-6">
          {/* ──────────────────────────────────────────────────────── */}
          {/* SECTION 1: NGUYÊN ÂM ĐƠN (MONOPHTHONGS - 12 ÂM) */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0059bb]" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  1. Nguyên Âm Đơn (Monophthongs • 12 âm)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                5 âm dài • 7 âm ngắn
              </span>
            </div>

            {/* Row 1A: Long Vowels (5 sounds) */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0059bb]" />
                <span>Nguyên âm dài (Có dấu hai chấm <strong>:</strong> kéo dài hơi)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
                {longMonophthongs.map((sound) => (
                  <IpaSoundCardV2
                    key={sound.id}
                    sound={sound}
                    onSelect={handleSoundClick}
                  />
                ))}
              </div>
            </div>

            {/* Row 1B: Short Vowels (7 sounds) */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Nguyên âm ngắn (Dứt khoát, ngắt âm nhanh)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
                {shortMonophthongs.map((sound) => (
                  <IpaSoundCardV2
                    key={sound.id}
                    sound={sound}
                    onSelect={handleSoundClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECTION 2: NGUYÊN ÂM ĐÔI (DIPHTHONGS - 8 ÂM) */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  2. Nguyên Âm Đôi (Diphthongs • 8 âm)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Chuyển động lướt giữa 2 nguyên âm đơn
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {DIPHTHONGS.map((sound) => (
                <IpaSoundCardV2
                  key={sound.id}
                  sound={sound}
                  onSelect={handleSoundClick}
                />
              ))}
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECTION 3: PHỤ ÂM (CONSONANTS - 24 ÂM) */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  3. Phụ Âm (Consonants • 24 âm)
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Hữu thanh (Voiced)
                </span>
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Vô thanh (Voiceless)
                </span>
              </div>
            </div>

            {/* 3A: 8 Paired Consonants (16 sounds) */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                16 Phụ Âm Đi Theo Cặp (Xếp liền kề: Vô thanh ➔ Hữu thanh)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
                {pairedConsonants.flatMap(([s1, s2]) => [s1, s2]).map((sound) => (
                  <IpaSoundCardV2
                    key={sound.id}
                    sound={sound}
                    onSelect={handleSoundClick}
                  />
                ))}
              </div>
            </div>

            {/* 3B: 8 Single Consonants */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                8 Phụ Âm Đơn Lẻ Khác (Âm mũi, âm tiếp cận, âm lướt)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-3">
                {singleConsonants.map((sound) => (
                  <IpaSoundCardV2
                    key={sound.id}
                    sound={sound}
                    onSelect={handleSoundClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Sound Detail Modal */}
      <IpaSoundDetailModal
        sound={selectedSound}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGoToPracticeLab={onGoToPracticeLab}
      />
    </div>
  );
};
