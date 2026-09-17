"use client";

import React from "react";
import { UserPlus, UserCheck, Check, X } from "lucide-react";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { FriendRequest } from "../../types";

interface PendingRequestsListProps {
  requests: FriendRequest[];
  onProcessRequest: (requestId: string, action: "ACCEPT" | "DECLINE") => void;
}

export const PendingRequestsList: React.FC<PendingRequestsListProps> = ({
  requests,
  onProcessRequest,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-2 font-display">
          <UserPlus className="w-4 h-4" /> Lời Mời Kết Bạn Đang Chờ ({requests.length}):
        </h3>
      </div>

      {requests.length === 0 ? (
        <div className="p-8 text-center space-y-2">
          <UserCheck className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
            Không có lời mời kết bạn nào
          </div>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Bạn đã xử lý hết tất cả các yêu cầu kết nối!
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {requests.map((req) => {
            const cleanSenderName = formatCleanName(req.sender?.fullName || req.sender?.username);
            return (
              <div
                key={req.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <UserAvatar
                    avatar={req.sender?.avatar}
                    avatarUrl={req.sender?.avatarUrl}
                    imageUrl={req.sender?.imageUrl}
                    emoji={req.sender?.avatarEmoji}
                    name={cleanSenderName}
                    size="w-9 h-9 sm:w-10 sm:h-10"
                  />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {cleanSenderName}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      Muốn kết nối đồng hành học tập
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onProcessRequest(req.id, "ACCEPT")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Đồng ý
                  </button>
                  <button
                    onClick={() => onProcessRequest(req.id, "DECLINE")}
                    className="px-3 py-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Từ chối
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
