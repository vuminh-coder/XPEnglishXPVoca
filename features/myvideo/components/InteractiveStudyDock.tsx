"use client";
import React from "react";
import { BookOpen, Brain, ListVideo } from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";
import { WordLookupData } from "./shared/WordLookupCard";
import { SubtitlesTabPane } from "./study-dock/SubtitlesTabPane";
import { DictationTabPane } from "./study-dock/DictationTabPane";
import { PlaylistTabPane } from "./study-dock/PlaylistTabPane";

export interface InteractiveStudyDockProps {
  activeVideo: YouTubeVideoItem;
  savedVideos: YouTubeVideoItem[];
  rightPanelTab: "subtitles" | "dictation" | "playlist";
  setRightPanelTab: (tab: "subtitles" | "dictation" | "playlist") => void;
  // Subtitles Tab Props
  wordLookupData: WordLookupData | null;
  setWordLookupData: (data: any) => void;
  handleWordClick: (word: string) => void;
  handleSaveWordToNotebook: () => void;
  subViewMode: "rolling" | "full";
  setSubViewMode: (mode: "rolling" | "full") => void;
  activeSubIndex: number;
  activeWordIndex: number;
  isCueSpeaking: boolean;
  handleSeekTo: (seconds: number, index: number) => void;
  // Dictation Tab Props
  currentSubIndex: number;
  setCurrentSubIndex: (idx: number) => void;
  dictationInput: string;
  setDictationInput: (val: string) => void;
  dictationAnswered: boolean;
  dictationCorrect: boolean | null;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  handleCheckDictation: () => void;
  handleNextDictation: () => void;
  // Shadowing Tab Props
  isRecording: boolean;
  waveformBars: number[];
  shadowingScore: number | null;
  toggleShadowingRecord: () => void;
  // Playlist Tab Props
  onSelectVideo: (video: YouTubeVideoItem) => void;
}

export const InteractiveStudyDock: React.FC<InteractiveStudyDockProps> = ({
  activeVideo,
  savedVideos,
  rightPanelTab,
  setRightPanelTab,
  wordLookupData,
  setWordLookupData,
  handleWordClick,
  handleSaveWordToNotebook,
  subViewMode,
  setSubViewMode,
  activeSubIndex,
  activeWordIndex,
  isCueSpeaking,
  handleSeekTo,
  currentSubIndex,
  setCurrentSubIndex,
  dictationInput,
  setDictationInput,
  dictationAnswered,
  dictationCorrect,
  showHint,
  setShowHint,
  handleCheckDictation,
  handleNextDictation,
  isRecording,
  waveformBars,
  shadowingScore,
  toggleShadowingRecord,
  onSelectVideo,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 overflow-hidden flex flex-col h-full min-h-0">
        {/* Header Tabs Segmented Dock */}
        <div className="p-1.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setRightPanelTab("subtitles")}
            className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              rightPanelTab === "subtitles"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Phụ Đề Tra Từ
          </button>
          <button
            type="button"
            onClick={() => setRightPanelTab("dictation")}
            className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              rightPanelTab === "dictation"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-500" /> Dictation AI
          </button>
          <button
            type="button"
            onClick={() => setRightPanelTab("playlist")}
            className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              rightPanelTab === "playlist"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ListVideo className="w-3.5 h-3.5" /> Playlist ({savedVideos.length})
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-3.5 sm:p-4 space-y-3 overflow-y-auto flex-1 min-h-0">
          {/* TAB 1: PHỤ ĐỀ SONG NGỮ 1-CLICK TRA TỪ */}
          {rightPanelTab === "subtitles" && (
            <SubtitlesTabPane
              activeVideo={activeVideo}
              subViewMode={subViewMode}
              setSubViewMode={setSubViewMode}
              activeSubIndex={activeSubIndex}
              activeWordIndex={activeWordIndex}
              isCueSpeaking={isCueSpeaking}
              handleSeekTo={handleSeekTo}
              handleWordClick={handleWordClick}
              wordLookupData={wordLookupData}
              setWordLookupData={setWordLookupData}
              handleSaveWordToNotebook={handleSaveWordToNotebook}
            />
          )}

          {/* TAB 2: DICTATION & SHADOWING AI */}
          {rightPanelTab === "dictation" && (
            <DictationTabPane
              activeVideo={activeVideo}
              currentSubIndex={currentSubIndex}
              setCurrentSubIndex={setCurrentSubIndex}
              activeSubIndex={activeSubIndex}
              dictationInput={dictationInput}
              setDictationInput={setDictationInput}
              dictationAnswered={dictationAnswered}
              dictationCorrect={dictationCorrect}
              showHint={showHint}
              setShowHint={setShowHint}
              handleCheckDictation={handleCheckDictation}
              handleNextDictation={handleNextDictation}
              isRecording={isRecording}
              waveformBars={waveformBars}
              shadowingScore={shadowingScore}
              toggleShadowingRecord={toggleShadowingRecord}
            />
          )}

          {/* TAB 3: PLAYLIST VIDEO ĐÃ LƯU */}
          {rightPanelTab === "playlist" && (
            <PlaylistTabPane
              savedVideos={savedVideos}
              activeVideo={activeVideo}
              onSelectVideo={onSelectVideo}
            />
          )}
        </div>
      </div>
    </div>
  );
};
