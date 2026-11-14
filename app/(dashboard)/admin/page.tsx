"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MOCK_THEMES } from "@/features/vocabulary/data/mockThemes";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { Card, Button, Badge } from "@/shared/components/ui";
import {
  Users,
  BookOpen,
  FileText,
  Zap,
  Database,
  Plus,
  BarChart3,
  Layers,
  ShieldAlert,
  Crown,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

interface AdminVocabItem {
  id: string;
  word: string;
  phonetic?: string | null;
  definition: string;
  definitionVn: string;
  pos: string;
  difficulty: number;
  themeId: string;
}

interface PendingOrderItem {
  id: string;
  userId: string;
  planKey: string;
  amount: number;
  currency: string;
  transferSyntax: string;
  status: string;
  createdAt: string;
  user: {
    username: string | null;
    fullName: string | null;
    email: string | null;
  };
}

interface DailyActivePoint {
  date: string;
  day: string;
  users: number;
}

interface ThemeStatItem {
  id: string;
  name: string;
  icon: string;
  dbCount: number;
  bankCount: number;
}

export default function AdminPage() {
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [isLoading, setIsLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVocabDb: 0,
    totalExamAttempts: 0,
    totalPlatformXp: 0,
  });
  const [dailyActive, setDailyActive] = useState<DailyActivePoint[]>([]);
  const [pendingOrders, setPendingOrders] = useState<PendingOrderItem[]>([]);
  const [themeStats, setThemeStats] = useState<ThemeStatItem[]>([]);
  const [vocabs, setVocabs] = useState<AdminVocabItem[]>([]);
  const [approvingOrderId, setApprovingOrderId] = useState<string | null>(null);
  const [submittingVocab, setSubmittingVocab] = useState(false);

  // Form states
  const [word, setWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [pos, setPos] = useState("noun");
  const [defVn, setDefVn] = useState("");
  const [defEn, setDefEn] = useState("");
  const [example, setExample] = useState("");
  const [themeId, setThemeId] = useState(MOCK_THEMES[0]?.id || "t1");

  const isAdmin = user?.role === "ADMIN";

  const loadOverview = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/overview", { credentials: "include" });
      if (res.status === 401 || res.status === 403) {
        setForbidden(true);
        return;
      }
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setForbidden(false);
        setStats(json.data.stats);
        setDailyActive(json.data.dailyActive || []);
        setPendingOrders(json.data.pendingOrders || []);
        setThemeStats(json.data.themeStats || []);
        setVocabs(json.data.vocabs || []);
      }
    } catch {
      addToast({
        type: "error",
        title: "Không thể tải bảng quản trị",
        message: "Vui lòng kiểm tra kết nối máy chủ.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "ADMIN") {
      setForbidden(true);
      setIsLoading(false);
      return;
    }
    loadOverview();
  }, [user, loadOverview]);

  const inputClass =
    "w-full py-2.5 px-3.5 text-xs font-medium rounded-xl bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0059bb] transition-colors";
  const labelClass = "block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1";

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingVocab) return;

    setSubmittingVocab(true);
    try {
      const res = await fetch("/api/admin/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          word,
          phonetic,
          pos,
          definitionVn: defVn,
          definition: defEn,
          example,
          themeId,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        addToast({
          type: "warning",
          title: "Không thể thêm từ vựng",
          message: json.error || "Vui lòng kiểm tra lại dữ liệu nhập.",
        });
        return;
      }

      if (json.data) {
        setVocabs((prev) => [json.data, ...prev]);
        setStats((prev) => ({ ...prev, totalVocabDb: prev.totalVocabDb + 1 }));
      }
      setWord("");
      setPhonetic("");
      setDefVn("");
      setDefEn("");
      setExample("");
      addToast({
        type: "success",
        title: "Đã lưu từ vựng vào DB",
        message: json.message || `"${word}" đã được thêm thành công.`,
      });
    } catch {
      addToast({
        type: "error",
        title: "Lỗi kết nối",
        message: "Không thể gửi yêu cầu lưu từ vựng.",
      });
    } finally {
      setSubmittingVocab(false);
    }
  };

  const handleApproveOrder = async (order: PendingOrderItem) => {
    if (approvingOrderId) return;
    setApprovingOrderId(order.id);
    try {
      const res = await fetch("/api/subscription/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orderId: order.id,
          userId: order.userId,
          planKey: order.planKey,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        addToast({
          type: "error",
          title: "Duyệt đơn thất bại",
          message: json.error || "Không thể kích hoạt gói VIP.",
        });
        return;
      }

      setPendingOrders((prev) => prev.filter((item) => item.id !== order.id));
      addToast({
        type: "success",
        title: "Đã duyệt kích hoạt VIP",
        message: json.message || `Đã kích hoạt gói ${order.planKey} cho ${order.user.fullName || order.user.username || order.userId}.`,
      });
    } catch {
      addToast({
        type: "error",
        title: "Lỗi mạng",
        message: "Không thể kết nối máy chủ đối soát.",
      });
    } finally {
      setApprovingOrderId(null);
    }
  };

  if (!isLoading && (forbidden || !isAdmin)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card variant="bezel" className="max-w-md w-full p-8 text-center space-y-4 rounded-2xl">
          <div className="w-14 h-14 mx-auto rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">
            Không có quyền truy cập
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Khu vực Quản trị Hệ thống chỉ dành cho tài khoản có vai trò Quản trị viên (ADMIN).
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0059bb] text-white text-xs font-bold hover:bg-[#004696] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay về Trang chủ
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const maxDau = Math.max(...dailyActive.map((d) => d.users), 1);

  const platformStats = [
    {
      label: "Người dùng hệ thống",
      value: stats.totalUsers.toLocaleString("vi-VN"),
      icon: Users,
      accent: "text-[#0059bb] bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Từ vựng trong DB",
      value: stats.totalVocabDb.toLocaleString("vi-VN"),
      icon: BookOpen,
      accent: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      label: "Lượt thi đã nộp",
      value: stats.totalExamAttempts.toLocaleString("vi-VN"),
      icon: FileText,
      accent: "text-violet-600 bg-violet-50 dark:bg-violet-950/30",
    },
    {
      label: "Tổng XP toàn nền tảng",
      value: stats.totalPlatformXp.toLocaleString("vi-VN"),
      icon: Zap,
      accent: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
    },
  ];

  return (
    <div className="space-y-4 pb-20 md:pb-6 font-sans antialiased" suppressHydrationWarning>
      <AppTopHeader>
        <HeaderPillContainer>
          <HeaderPillItem
            active
            icon={<Database className="w-3.5 h-3.5 text-[#0059bb]" />}
            label="Bảng Quản Trị"
          />
          <HeaderPillItem
            href="/vocabulary"
            icon={<BookOpen className="w-3.5 h-3.5" />}
            label="Từ Vựng Hệ Thống"
          />
          <HeaderPillItem
            href="/analytics"
            icon={<BarChart3 className="w-3.5 h-3.5" />}
            label="Thống Kê Platform"
            hideOnSmall
          />
        </HeaderPillContainer>
      </AppTopHeader>

      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        {/* HERO STAGE */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0059bb] text-white shadow-md shadow-[#0059bb]/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30">
                  Administrator Portal
                </span>
                <span className="text-[11px] font-semibold text-blue-100">
                  Dữ liệu trực tiếp từ PostgreSQL
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-display">
                Bảng Quản Trị Hệ Thống
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                Giám sát người dùng hoạt động thực tế, duyệt đơn nâng cấp VIP chuyển khoản thủ công và quản lý kho từ vựng.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-3 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider">RBAC Verified</div>
                <div className="text-[11px] text-blue-100">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* SKELETON LOADING OR PLATFORM STATS */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <Card key={idx} variant="bezel" className="p-5 rounded-2xl animate-pulse space-y-3">
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-neutral-800" />
                <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-neutral-800" />
                <div className="h-3 w-32 rounded bg-slate-200 dark:bg-neutral-800" />
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {platformStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} variant="bezel" hoverable className="p-5 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.accent}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="neutral" className="text-[10px]">Live DB</Badge>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* PENDING VIP APPROVALS */}
            <Card variant="bezel" className="p-5 sm:p-6 rounded-2xl">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Crown className="h-3.5 w-3.5" /> Đối soát đơn nâng cấp VIP
                  </span>
                  <h2 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                    Đơn chờ phê duyệt ({pendingOrders.length})
                  </h2>
                </div>
                <Button variant="secondary" size="sm" onClick={loadOverview}>
                  Làm mới
                </Button>
              </div>

              {pendingOrders.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 p-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  Hiện không có đơn nâng cấp VIP nào đang chờ đối soát.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-neutral-900/40"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {order.user.fullName || "Học viên"} (@{order.user.username || order.userId})
                          </span>
                          <Badge variant="warning" className="text-[10px]">
                            {order.planKey.toUpperCase()} · {order.amount.toLocaleString("vi-VN")}₫
                          </Badge>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          Nội dung CK: <strong className="text-slate-800 dark:text-slate-200">{order.transferSyntax}</strong> · {order.user.email}
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={approvingOrderId === order.id}
                        onClick={() => handleApproveOrder(order)}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                        {approvingOrderId === order.id ? "Đang duyệt..." : "Duyệt kích hoạt VIP"}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Real 7-day DAU Chart */}
              <Card variant="bezel" className="lg:col-span-2 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5" /> Người dùng hoạt động
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                      DAU thực tế trong 7 ngày qua
                    </h3>
                  </div>
                  <Badge variant="primary">7 ngày</Badge>
                </div>
                <div className="flex items-end justify-between gap-3 h-40">
                  {dailyActive.map((d) => {
                    const heightPercent = Math.max(8, (d.users / maxDau) * 100);
                    const isMax = d.users > 0 && d.users === maxDau;
                    return (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-[10px] font-black text-slate-500">{d.users}</span>
                        <div
                          className={`w-full rounded-t-xl transition-all duration-500 ${
                            isMax
                              ? "bg-[#0059bb] shadow-sm shadow-[#0059bb]/20"
                              : "bg-slate-200 dark:bg-neutral-700"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className={`text-[11px] font-bold ${isMax ? "text-[#0059bb]" : "text-slate-400"}`}>
                          {d.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Theme Content Overview */}
              <Card variant="bezel" className="p-6 rounded-2xl">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> Nội dung theo chủ đề
                </span>
                <div className="space-y-3 mt-4 max-h-48 overflow-y-auto pr-1">
                  {themeStats.map((theme) => (
                    <div key={theme.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm">{theme.icon}</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                          {theme.name}
                        </span>
                      </div>
                      <Badge variant="neutral" className="text-[10px] shrink-0">
                        {theme.dbCount} DB / {theme.bankCount} kho
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Add Word Form + Word List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card variant="bezel" className="p-5 rounded-2xl">
                <h3 className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-[0.12em] mb-4 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Thêm từ vựng vào DB
                </h3>
                <form onSubmit={handleAddWord} className="space-y-3.5">
                  <div>
                    <label htmlFor="admin-word" className={labelClass}>Từ tiếng Anh</label>
                    <input
                      id="admin-word"
                      type="text"
                      className={inputClass}
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                      required
                      placeholder="Ví dụ: resilient"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-phonetic" className={labelClass}>Phiên âm IPA</label>
                    <input
                      id="admin-phonetic"
                      type="text"
                      className={inputClass}
                      value={phonetic}
                      onChange={(e) => setPhonetic(e.target.value)}
                      placeholder="Ví dụ: /rɪˈzɪliənt/"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-pos" className={labelClass}>Loại từ</label>
                    <select id="admin-pos" className={`${inputClass} cursor-pointer`} value={pos} onChange={(e) => setPos(e.target.value)}>
                      <option value="noun">Danh từ (Noun)</option>
                      <option value="verb">Động từ (Verb)</option>
                      <option value="adjective">Tính từ (Adjective)</option>
                      <option value="adverb">Trạng từ (Adverb)</option>
                      <option value="phrase">Cụm từ (Phrase)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="admin-def-vn" className={labelClass}>Nghĩa tiếng Việt</label>
                    <input
                      id="admin-def-vn"
                      type="text"
                      className={inputClass}
                      value={defVn}
                      onChange={(e) => setDefVn(e.target.value)}
                      required
                      placeholder="Ví dụ: Kiên cường, mau hồi phục"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-def-en" className={labelClass}>Định nghĩa tiếng Anh</label>
                    <textarea
                      id="admin-def-en"
                      className={`${inputClass} resize-none min-h-[60px]`}
                      value={defEn}
                      onChange={(e) => setDefEn(e.target.value)}
                      required
                      placeholder="Able to recover quickly from difficulties"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-example" className={labelClass}>Ví dụ minh họa</label>
                    <input
                      id="admin-example"
                      type="text"
                      className={inputClass}
                      value={example}
                      onChange={(e) => setExample(e.target.value)}
                      required
                      placeholder="She remained resilient throughout the challenge."
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-theme" className={labelClass}>Chủ đề</label>
                    <select id="admin-theme" className={`${inputClass} cursor-pointer`} value={themeId} onChange={(e) => setThemeId(e.target.value)}>
                      {MOCK_THEMES.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center bg-[#0059bb] hover:bg-[#004696]"
                    type="submit"
                    disabled={submittingVocab}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    {submittingVocab ? "Đang lưu từ vựng..." : "Lưu từ vựng vào DB"}
                  </Button>
                </form>
              </Card>

              <Card variant="bezel" className="lg:col-span-2 p-0 overflow-hidden rounded-2xl">
                <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-200">
                    Từ vựng đã lưu trong DB ({vocabs.length})
                  </span>
                  <Badge variant="neutral">{MOCK_THEMES.length} chủ đề</Badge>
                </div>
                <div style={{ maxHeight: "480px", overflowY: "auto" }}>
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-white dark:bg-neutral-900 z-10">
                      <tr>
                        <th className="p-3 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-black/[0.04] dark:border-white/[0.04]">Từ</th>
                        <th className="p-3 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-black/[0.04] dark:border-white/[0.04] hidden sm:table-cell">Phiên âm</th>
                        <th className="p-3 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-black/[0.04] dark:border-white/[0.04]">Loại</th>
                        <th className="p-3 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-black/[0.04] dark:border-white/[0.04]">Nghĩa VN</th>
                        <th className="p-3 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-black/[0.04] dark:border-white/[0.04] hidden md:table-cell">Chủ đề</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vocabs.slice(0, 50).map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                          <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02] text-xs font-bold text-slate-800 dark:text-slate-200">{v.word}</td>
                          <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02] text-xs text-slate-500 hidden sm:table-cell">{v.phonetic || "—"}</td>
                          <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02]">
                            <Badge variant="primary" className="text-[10px]">{v.pos}</Badge>
                          </td>
                          <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02] text-xs text-slate-600 dark:text-slate-400">{v.definitionVn}</td>
                          <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02] text-xs text-slate-500 hidden md:table-cell">
                            {MOCK_THEMES.find((t) => t.id === v.themeId)?.name || v.themeId}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
