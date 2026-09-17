"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, X, RefreshCw, Clock } from "lucide-react";
import { PastSession } from "../types";

interface AiConversationHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pastSessions: PastSession[];
  selectedPastSession: PastSession | null;
  onSelectPastSession: (session: PastSession | null) => void;
  isLoadingHistory: boolean;
}

export function AiConversationHistoryDrawer({
  isOpen,
  onClose,
  pastSessions,
  selectedPastSession,
  onSelectPastSession,
  isLoadingHistory,
}: AiConversationHistoryDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col min-h-0"
          >
            {/* Drawer Header */}
            <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-950/60 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center border border-fuchsia-200/60">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Lịch Sử Luyện Viết AI
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {pastSessions.length} buổi học đã lưu
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectPastSession(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                title="Đóng ngăn kéo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
              {isLoadingHistory ? (
                <div className="flex items-center justify-center py-12 gap-2 text-xs font-bold text-slate-500">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#0059bb]" />
                  <span>Đang tải lịch sử...</span>
                </div>
              ) : selectedPastSession ? (
                /* Detail View of a Selected Past Session */
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => onSelectPastSession(null)}
                    className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ← Quay lại danh sách buổi học
                  </button>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-500">
                        {selectedPastSession.createdAt
                          ? new Date(selectedPastSession.createdAt).toLocaleString("vi-VN")
                          : "Gần đây"}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-300 font-mono">
                        Hạng {selectedPastSession.grade || "A"} • {selectedPastSession.overallScore || 85}/100
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Chủ đề: {selectedPastSession.topicId?.toUpperCase() || "NHÀ HÀNG"}
                    </p>
                  </div>

                  {/* Message Transcript */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Kịch bản đối thoại ({selectedPastSession.messages?.length || 0} câu):
                    </div>
                    {selectedPastSession.messages?.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-xs space-y-1.5 ${
                          m.role === "ai"
                            ? "bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-slate-900 dark:text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                        }`}
                      >
                        <span className="font-bold text-[#0059bb] dark:text-sky-400">
                          {m.role === "ai" ? "AI Tutor" : "Bạn"}
                        </span>
                        <p className="leading-relaxed">{m.text}</p>
                        {m.vietnameseTranslation && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5 border-t border-slate-200/60 dark:border-slate-800">
                            [Dịch] {m.vietnameseTranslation}
                          </p>
                        )}
                        {m.grammarCorrection?.hasError && (
                          <div className="p-2 rounded bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs">
                            <strong>Sửa ngữ pháp:</strong> {m.grammarCorrection.corrected}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : pastSessions.length > 0 ? (
                /* List View of All Past Sessions */
                <div className="space-y-2.5">
                  {pastSessions.map((session, idx) => (
                    <div
                      key={session.sessionId || idx}
                      onClick={() => onSelectPastSession(session)}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] dark:hover:border-sky-500 shadow-2xs cursor-pointer transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                            Chủ đề {session.topicId?.toUpperCase() || "HỘI THOẠI"}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold font-mono bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60">
                          {session.overallScore || 85}/100 (Hạng {session.grade || "A"})
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.timeSpentSeconds ? `${Math.ceil(session.timeSpentSeconds / 60)} phút` : "1 phút"}
                        </span>
                        <span>+{session.xpEarned || 35} XP</span>
                        <span className="text-slate-400">
                          {session.createdAt ? new Date(session.createdAt).toLocaleDateString("vi-VN") : "Hôm nay"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 text-slate-400">
                  <History className="w-8 h-8 stroke-1 text-slate-300 dark:text-slate-600" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Chưa có lịch sử buổi học
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Khi bạn hoàn thành và bấm "Chấm điểm" một buổi luyện viết, toàn bộ kịch bản sẽ được lưu tại đây.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
