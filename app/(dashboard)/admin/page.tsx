"use client";
import React, { useState } from "react";
import { MOCK_THEMES } from "@/lib/constants";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { Card, Button, Badge } from "@/components/ui";
import {
  Users,
  BookOpen,
  FileText,
  Zap,
  TrendingUp,
  Database,
  Plus,
  BarChart3,
  Layers,
} from "lucide-react";

export default function AdminPage() {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [vocabs, setVocabs] = useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/vocabulary?limit=10")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setVocabs(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Form states
  const [word, setWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [pos, setPos] = useState("noun");
  const [defVn, setDefVn] = useState("");
  const [defEn, setDefEn] = useState("");
  const [example, setExample] = useState("");
  const [themeId, setThemeId] = useState("t1");

  // Mock platform stats
  const platformStats = [
    { label: "Người dùng", value: "1,247", icon: Users, accent: "text-sky-500 bg-sky-50 dark:bg-sky-950/30", trend: "+12%" },
    { label: "Tổng từ vựng", value: String(3903 + vocabs.length), icon: BookOpen, accent: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30", trend: "+5" },
    { label: "Bài thi đã tạo", value: "24", icon: FileText, accent: "text-violet-500 bg-violet-50 dark:bg-violet-950/30", trend: "+3" },
    { label: "XP Platform", value: "284K", icon: Zap, accent: "text-amber-500 bg-amber-50 dark:bg-amber-950/30", trend: "+8.2%" },
  ];

  // Mock daily active users chart
  const dailyActive = [
    { day: "T2", users: 89 },
    { day: "T3", users: 124 },
    { day: "T4", users: 97 },
    { day: "T5", users: 156 },
    { day: "T6", users: 142 },
    { day: "T7", users: 178 },
    { day: "CN", users: 201 },
  ];
  const maxDau = Math.max(...dailyActive.map((d) => d.users), 1);

  // Theme stats
  const themeStats = MOCK_THEMES.map((theme) => ({
    ...theme,
    wordCount: vocabs.filter((v) => v.themeId === theme.id).length,
  }));

  const inputClass =
    "w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors";

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();

    if (vocabs.some((v) => v.word.toLowerCase() === word.toLowerCase())) {
      addToast({ type: "warning", title: "Từ đã tồn tại!", message: `"${word}" đã có trong cơ sở dữ liệu.` });
      return;
    }

    const newVocab = {
      id: "v_" + Date.now(),
      word,
      phonetic,
      definition: defEn,
      definitionVn: defVn,
      pos,
      difficulty: 3,
      frequency: 5,
      themeId,
      examples: [example],
      synonyms: [],
      antonyms: [],
    };

    setVocabs([...vocabs, newVocab]);
    setWord("");
    setPhonetic("");
    setDefVn("");
    setDefEn("");
    setExample("");
    awardXp(20);
    addToast({ type: "success", title: "Đã thêm từ vựng!", message: `"${word}" đã được thêm vào hệ thống. +20 XP` });
  };

  return (
    <div className="animate-fade-in space-y-6 pb-20 md:pb-6">
      {/* Page Header */}
      <div className="page-header animate-fade-in-down">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h1 className="page-title text-2xl font-extrabold tracking-tight">Bảng quản trị</h1>
            <p className="page-subtitle text-muted mt-0.5">Tổng quan nền tảng và quản lý nội dung.</p>
          </div>
        </div>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant="bezel" hoverable className="p-5">
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant="success" className="text-[10px]">
                  <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                  {stat.trend}
                </Badge>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Active Users Chart */}
        <Card variant="bezel" className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" /> Người dùng hoạt động
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">DAU trong 7 ngày qua</h3>
            </div>
            <Badge variant="primary">Tuần này</Badge>
          </div>
          <div className="flex items-end justify-between gap-3 h-40">
            {dailyActive.map((d, i) => {
              const heightPercent = Math.max(8, (d.users / maxDau) * 100);
              const isMax = d.users === maxDau;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-black text-slate-500">{d.users}</span>
                  <div
                    className={`w-full rounded-t-xl transition-all duration-700 ${
                      isMax
                        ? "bg-gradient-to-t from-indigo-500 to-violet-400 shadow-sm shadow-indigo-500/20"
                        : "bg-slate-200 dark:bg-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-600"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className={`text-[11px] font-bold ${isMax ? "text-indigo-600" : "text-slate-400"}`}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Content Overview */}
        <Card variant="bezel" className="p-6">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" /> Nội dung theo chủ đề
          </span>
          <div className="space-y-3 mt-4">
            {themeStats.map((theme) => (
              <div key={theme.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm">{theme.icon}</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{theme.name}</span>
                </div>
                <Badge variant="neutral" className="text-[10px] shrink-0">{theme.wordCount} từ</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add Word Form + Word List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Word Form */}
        <Card variant="bezel" className="p-6">
          <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Thêm từ vựng mới
          </h3>
          <form onSubmit={handleAddWord} className="space-y-3">
            <input type="text" className={inputClass} value={word} onChange={(e) => setWord(e.target.value)} required placeholder="Từ tiếng Anh" />
            <input type="text" className={inputClass} value={phonetic} onChange={(e) => setPhonetic(e.target.value)} required placeholder="Phiên âm /..." />
            <select className={`${inputClass} cursor-pointer`} value={pos} onChange={(e) => setPos(e.target.value)}>
              <option value="noun">Danh từ (Noun)</option>
              <option value="verb">Động từ (Verb)</option>
              <option value="adjective">Tính từ (Adjective)</option>
              <option value="adverb">Trạng từ (Adverb)</option>
            </select>
            <input type="text" className={inputClass} value={defVn} onChange={(e) => setDefVn(e.target.value)} required placeholder="Nghĩa tiếng Việt" />
            <textarea className={`${inputClass} resize-none min-h-[60px]`} value={defEn} onChange={(e) => setDefEn(e.target.value)} required placeholder="Định nghĩa tiếng Anh" />
            <input type="text" className={inputClass} value={example} onChange={(e) => setExample(e.target.value)} required placeholder="Ví dụ minh họa" />
            <select className={`${inputClass} cursor-pointer`} value={themeId} onChange={(e) => setThemeId(e.target.value)}>
              {MOCK_THEMES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <Button variant="primary" size="sm" className="w-full justify-center" type="submit">
              <Plus className="w-3.5 h-3.5 mr-1" /> Thêm từ vựng
            </Button>
          </form>
        </Card>

        {/* Words List Table */}
        <Card variant="bezel" className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between">
            <span className="text-xs font-black text-slate-700 dark:text-slate-200">
              Danh sách từ vựng ({vocabs.length})
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
                    <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02] text-xs text-slate-500 hidden sm:table-cell">{v.phonetic}</td>
                    <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02]">
                      <Badge variant="primary" className="text-[10px]">{v.pos}</Badge>
                    </td>
                    <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02] text-xs text-slate-600 dark:text-slate-400">{v.definitionVn}</td>
                    <td className="p-3 border-b border-black/[0.02] dark:border-white/[0.02] text-xs text-slate-500 hidden md:table-cell">
                      {MOCK_THEMES.find((t) => t.id === v.themeId)?.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
