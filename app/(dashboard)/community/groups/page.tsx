'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Target, Laptop, Briefcase, MessageCircle, Plus, Users, Globe, ArrowRight } from 'lucide-react';
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'g1': <Target className="w-6 h-6 text-cyan-500" strokeWidth={1.8} />,
  'g2': <Laptop className="w-6 h-6 text-blue-500" strokeWidth={1.8} />,
  'g3': <Briefcase className="w-6 h-6 text-amber-500" strokeWidth={1.8} />,
  'g4': <MessageCircle className="w-6 h-6 text-purple-500" strokeWidth={1.8} />,
};

export default function GroupsPage() {
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load groups on mount
  const loadGroups = () => {
    setLoading(true);
    fetch("/api/groups")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setGroups(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    loadGroups();
  }, []);

  const handleJoinGroup = async (id: string) => {
    try {
      const res = await fetch(`/api/groups/${id}/join`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success && data.data) {
        const { joined, memberCount } = data.data;
        addToast({ type: "success", title: joined ? "Tham gia thành công!" : "Rời nhóm", message: joined ? "Đã tham gia nhóm thành công!" : "Đã rời nhóm thành công." });
        setGroups(
          groups.map((g) => {
            if (g.id === id) {
              return { ...g, memberCount, joined };
            }
            return g;
          })
        );
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể thực hiện hành động" });
      }
    } catch (err) {
      console.error("Error toggling group member:", err);
    }
  };

  const handleCreateGroup = async () => {
    if (!user) return;
    if (user.level < 15) {
      addToast({ type: "warning", title: "Chưa đủ cấp độ", message: "Khởi tạo nhóm mới yêu cầu cấp độ 15!" });
      return;
    }

    const name = prompt("Nhập tên nhóm học tập mới:");
    if (!name || !name.trim()) return;

    const description = prompt("Nhập mô tả nhóm học tập:");
    const themeName = prompt("Nhập tên chủ đề (ví dụ: Technology, IELTS, Business):");

    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description || "",
          themeName: themeName || "General",
          accent: "blue",
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        addToast({ type: "success", title: "Tạo nhóm thành công!", message: `Đã khởi tạo nhóm ${name}` });
        loadGroups();
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể khởi tạo nhóm" });
      }
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  const accentMap: Record<string, string> = {
    cyan: 'bg-cyan-50 dark:bg-cyan-950/30',
    blue: 'bg-blue-50 dark:bg-blue-950/30',
    amber: 'bg-amber-50 dark:bg-amber-950/30',
    purple: 'bg-purple-50 dark:bg-purple-950/30',
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cộng đồng học tập</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Tham gia các nhóm thảo luận chuyên môn để cùng chia sẻ bài tập và hỗ trợ nhau cải thiện tiếng Anh.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-8 bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full w-fit border border-black/[0.03] dark:border-white/[0.03] animate-scale-in">
        <Link href="/community" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng tin</Link>
        <Link href="/community/leaderboard" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng xếp hạng</Link>
        <Link href="/community/friends" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bạn bè</Link>
        <div className="px-4 py-2 text-xs font-bold rounded-full bg-white dark:bg-neutral-900 text-primary-c shadow-sm">Nhóm học tập</div>
      </div>

      <div className="animate-fade-in-up flex flex-col gap-6">
        {/* Intro Banner — Double-Bezel */}
        <div className="bezel">
          <div className="bezel-inner p-5 flex justify-between items-center bg-white dark:bg-neutral-900">
            <div>
              <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-1">
                Nhóm học tập cộng đồng
              </h3>
              <p className="text-xs text-muted">Tham gia nhóm để giao lưu từ vựng cùng sở thích học thuật.</p>
            </div>
            <button className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold py-2.5 px-5 tactile shadow-sm" onClick={handleCreateGroup}>
              <Plus className="w-4 h-4" strokeWidth={2.5} /> Tạo nhóm mới
            </button>
          </div>
        </div>

        {/* Groups Grid — Double-Bezel cards */}
        {loading ? (
          <div className="bezel">
            <div className="bezel-inner p-12 text-center text-xs font-bold text-muted animate-pulse">
              Đang tải danh sách nhóm học tập...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map(g => (
              <div key={g.id} className="bezel lift group">
                <div className="bezel-inner p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className={`icon-well ${accentMap[g.accent] || 'bg-blue-50 dark:bg-blue-950/30'} w-12 h-12 rounded-2xl border border-black/[0.03] dark:border-white/[0.03]`} style={{ transition: 'transform 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                        {GROUP_ICONS[g.id] || <Globe className="w-6 h-6 text-gray-500" strokeWidth={1.8} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1 leading-tight group-hover:text-cyan-500" style={{ transition: 'color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                          {g.name}
                        </h3>
                        <span className="inline-block text-[11px] font-bold py-0.5 px-2 bg-neutral-100 dark:bg-neutral-800 text-muted rounded-full border border-black/5 dark:border-white/5 uppercase">
                          {g.themeName}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted leading-relaxed mb-4">{g.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-black/[0.04] dark:border-white/[0.04]">
                    <span className="flex items-center gap-1.5 text-[12px] text-muted font-bold uppercase tracking-wider">
                      <Users className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> {g.memberCount}/{g.maxMembers} thành viên
                    </span>
                    <button 
                      className={`flex items-center gap-1 px-4 py-1.5 text-[12px] font-bold rounded-full tactile border ${
                        g.joined 
                          ? 'bg-neutral-100 dark:bg-neutral-850 text-red-500 border-black/5 dark:border-white/5' 
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                      }`}
                      onClick={() => handleJoinGroup(g.id)}
                    >
                      {g.joined ? 'Rời nhóm' : 'Tham gia'} {!g.joined && <ArrowRight className="w-3 h-3 ml-0.5" strokeWidth={2} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}