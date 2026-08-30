'use client';
import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { PageEntranceWrapper } from '@/shared/components/feedback/PageEntranceAnimation';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  ChevronDown, 
  Trophy, 
  Users, 
  UserPlus, 
  Flame, 
  Sparkles, 
  ArrowRight,
  MessageSquare,
  PenSquare,
  Zap,
} from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { UserAvatar, formatCleanName } from '@/shared/components/feedback/UserAvatar';
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from '@/shared/components/layout/AppTopHeader';

const INITIAL_COMMENTS = 3;
const LOAD_MORE_COMMENTS = 5;

export default function CommunityPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, number>>({});
  const postInputRef = useRef<HTMLTextAreaElement | null>(null);

  const currentUserAvatar = (user as any)?.avatar || (user as any)?.avatarUrl || user?.imageUrl;
  const currentUserName = formatCleanName(user?.fullName || user?.username || user?.email);

  // Load posts on mount
  React.useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setPosts(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const getVisibleCount = useCallback((postId: string) => {
    return visibleComments[postId] || INITIAL_COMMENTS;
  }, [visibleComments]);

  const handleShowMoreComments = useCallback((postId: string) => {
    setVisibleComments(prev => ({
      ...prev,
      [postId]: (prev[postId] || INITIAL_COMMENTS) + LOAD_MORE_COMMENTS,
    }));
  }, []);

  const handleCreatePost = async () => {
    if (!postText.trim() || !user) return;

    const currentContent = postText.trim();
    setPostText('');
    awardXp(20);
    addToast({ type: "success", title: "Thành công", message: "Đã đăng bài viết! Nhận +20 XP 🎉" });

    // OPTIMISTIC DRAFT POST (0ms INSTANT RENDER)
    const tempId = `temp-${Date.now()}`;
    const hashtagRegex = /#[\wÀ-ỹ]+/g;
    const tags = currentContent.match(hashtagRegex) || [];

    const tempPost = {
      id: tempId,
      author: currentUserName,
      avatar: currentUserAvatar,
      authorAvatar: currentUserAvatar,
      avatarEmoji: user.avatarEmoji || "🦉",
      meta: "Vừa xong · " + (user.title || "Member"),
      content: currentContent,
      vocabTags: Array.from(new Set(tags)),
      likes: 0,
      commentsCount: 0,
      liked: false,
      comments: [],
    };

    setPosts(prev => [tempPost, ...prev]);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: currentContent }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPosts(prev => prev.map(p => p.id === tempId ? {
          ...data.data,
          author: currentUserName,
          avatar: currentUserAvatar,
          authorAvatar: currentUserAvatar
        } : p));
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleLikePost = async (id: string) => {
    // OPTIMISTIC UPDATE: Instant 0ms toggle local state
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const nextLiked = !p.liked;
        const nextLikes = nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1);
        return { ...p, liked: nextLiked, likes: nextLikes };
      }
      return p;
    }));

    try {
      const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (data.success && data.data) {
        const { liked, likesCount } = data.data;
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likesCount, liked } : p));
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleAddComment = async (postId: string) => {
    const text = commentText[postId] || '';
    if (!text.trim() || !user) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.trim() }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        const newComment = {
          ...data.data,
          author: currentUserName,
          avatar: currentUserAvatar,
          authorAvatar: currentUserAvatar,
          avatarEmoji: user.avatarEmoji || "👤"
        };
        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [...(p.comments || []), newComment],
              commentsCount: (p.commentsCount || 0) + 1
            };
          }
          return p;
        }));
        setCommentText(prev => ({ ...prev, [postId]: '' }));
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể gửi bình luận" });
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      addToast({ type: "error", title: "Lỗi", message: "Đã xảy ra lỗi khi bình luận" });
    }
  };

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        rightDesktopContent={
          <button
            onClick={() => {
              postInputRef.current?.scrollIntoView({ behavior: 'smooth' });
              postInputRef.current?.focus();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Đăng Bài Viết +20 XP</span>
          </button>
        }
      >
        <HeaderPillContainer>
          <Link href="/community">
            <HeaderPillItem
              active={true}
              icon={<MessageSquare className="w-3.5 h-3.5" />}
              label="Bảng Tin"
            />
          </Link>
          <Link href="/community/leaderboard">
            <HeaderPillItem
              active={false}
              icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
              label="Xếp Hạng"
            />
          </Link>
          <Link href="/community/friends">
            <HeaderPillItem
              active={false}
              icon={<UserPlus className="w-3.5 h-3.5 text-sky-500" />}
              label="Bạn Bè"
            />
          </Link>
          <Link href="/community/groups">
            <HeaderPillItem
              active={false}
              icon={<Users className="w-3.5 h-3.5 text-indigo-500" />}
              label="Nhóm Học"
            />
          </Link>
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1">
        
        {/* HERO SPOTLIGHT BANNER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-8 -top-8 w-44 h-44 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/25 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> 1,240+ Học Viên Online
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 shrink-0">
                Thưởng +20 XP / Bài đăng
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                <span>Cộng Đồng Học Tập XP English</span>
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              </h1>
              <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
                Nơi giao lưu, chia sẻ mẹo luyện thi TOEIC/IELTS, phương pháp ghi nhớ từ vựng và cùng nhau tiến bộ mỗi ngày!
              </p>
            </div>
          </div>
        </div>

        {/* 3. BENTO GRID LAYOUT (MAIN FEED ~66% + SIDEBAR WIDGETS ~34%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT COLUMN: COMMUNITY FEED & CREATE POST (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* CREATE POST CARD */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="flex items-start gap-3">
                <UserAvatar
                  avatar={currentUserAvatar}
                  avatarUrl={currentUserAvatar}
                  imageUrl={currentUserAvatar}
                  emoji={user?.avatarEmoji}
                  name={currentUserName}
                  size="w-9 h-9 sm:w-10 sm:h-10"
                />
                <textarea
                  ref={postInputRef}
                  rows={2}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Chia sẻ mẹo học từ vựng, thắc mắc bài tập hoặc động lực hôm nay..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb] resize-none font-medium leading-relaxed transition-all"
                />
              </div>

              {/* Quick Tag Chips & Submit Action */}
              <div className="flex flex-row items-center justify-between gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 font-display">Gợi ý:</span>
                  <button
                    onClick={() => setPostText((prev) => (prev ? `${prev} #MeoHocTuVung` : '#MeoHocTuVung '))}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb]/10 text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer"
                  >
                    #MeoHocTuVung
                  </button>
                  <button
                    onClick={() => setPostText((prev) => (prev ? `${prev} #LuyenThiTOEIC` : '#LuyenThiTOEIC '))}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb]/10 text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer"
                  >
                    #LuyenThiTOEIC
                  </button>
                  <button
                    onClick={() => setPostText((prev) => (prev ? `${prev} #IELTSWriting` : '#IELTSWriting '))}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb]/10 text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer hidden xs:inline-block"
                  >
                    #IELTSWriting
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreatePost}
                  disabled={!postText.trim()}
                  className="font-bold py-2 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Chia sẻ (+20 XP)</span>
                </Button>
              </div>
            </div>

            {/* POSTS FEED STREAM */}
            <div className="space-y-4">
              {loading ? (
                /* SKELETON LOADING CARDS */
                <div className="space-y-4 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                        <div className="space-y-1.5 flex-1">
                          <div className="w-36 h-4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                          <div className="w-24 h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                        <div className="w-3/4 h-4 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                /* EMPTY STATE */
                <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs text-center space-y-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto text-xl border border-blue-200/60 dark:border-blue-900/40 shadow-2xs">
                    💬
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Chưa có bài viết nào trên bảng tin
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                    Hãy trở thành người đầu tiên chia sẻ mẹo học tập hoặc từ vựng mới để nhận +20 XP thưởng nhé!
                  </p>
                </div>
              ) : (
                posts.map((p) => {
                  const allComments = p.comments || [];
                  const totalComments = p.commentsCount || allComments.length;
                  const limit = getVisibleCount(p.id);
                  const shownComments = allComments.slice(0, limit);
                  const hiddenCount = allComments.length - shownComments.length;
                  const serverHiddenCount = totalComments - allComments.length;

                  const authorCleanName = formatCleanName(p.author);
                  const isUserPost = p.author === user?.fullName || p.author === user?.username || p.author === user?.email || authorCleanName === currentUserName;
                  const postAvatar = p.authorAvatar || p.avatar || p.avatarUrl || (isUserPost ? currentUserAvatar : undefined);

                  return (
                    <div
                      key={p.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                    >
                      {/* Post Author Header */}
                      <div className="flex items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar
                            avatar={postAvatar}
                            avatarUrl={postAvatar}
                            imageUrl={postAvatar}
                            emoji={p.avatarEmoji}
                            name={authorCleanName}
                            size="w-9 h-9 sm:w-10 sm:h-10"
                          />
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                              <span>{authorCleanName}</span>
                              <span className="px-1.5 py-0.2 rounded-md text-[9px] font-black uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/40">
                                Member
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {p.meta || 'Vừa xong'}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 shrink-0 font-mono">
                          +20 XP
                        </span>
                      </div>

                      {/* Post Content Text */}
                      <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {p.content}
                      </div>

                      {/* Vocab Tags */}
                      {p.vocabTags && p.vocabTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {p.vocabTags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-[10px] sm:text-[11px] font-bold py-0.5 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Reaction Stats Bar */}
                      <div className="flex items-center gap-4 py-2 border-y border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 font-display">
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {p.likes || 0} Lượt thích
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" /> {totalComments} Bình luận
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => handleLikePost(p.id)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            p.liked
                              ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 border-rose-200 dark:border-rose-900/40 shadow-2xs'
                              : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${p.liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{p.liked ? 'Đã thích' : 'Thích'}</span>
                        </button>

                        <button
                          onClick={() => setActiveCommentId(activeCommentId === p.id ? null : p.id)}
                          className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 hover:bg-[#0059bb] hover:text-white dark:hover:bg-[#0059bb] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                          <span>Bình luận</span>
                        </button>
                      </div>

                      {/* Expandable Comments Section */}
                      {activeCommentId === p.id && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          {/* Comment Input */}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={commentText[p.id] || ''}
                              onChange={(e) => setCommentText((prev) => ({ ...prev, [p.id]: e.target.value }))}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(p.id)}
                              placeholder="Viết bình luận của bạn..."
                              className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb] font-medium"
                            />
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleAddComment(p.id)}
                              disabled={!commentText[p.id]?.trim()}
                              className="py-2.5 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                            >
                              <Send className="w-3.5 h-3.5" /> Gửi
                            </Button>
                          </div>

                          {serverHiddenCount > 0 && (
                            <div className="text-center">
                              <span className="text-[11px] text-slate-400 font-bold italic font-display">
                                Có {serverHiddenCount} bình luận cũ hơn không hiển thị
                              </span>
                            </div>
                          )}

                          {/* Comment List Stream */}
                          <div className="space-y-2">
                            {shownComments.map((c: any) => {
                              const commentCleanName = formatCleanName(c.author);
                              const isCommentUser = c.author === user?.fullName || c.author === user?.username || c.author === user?.email || commentCleanName === currentUserName;
                              const commentAvatar = c.authorAvatar || c.avatar || c.avatarUrl || (isCommentUser ? currentUserAvatar : undefined);

                              return (
                                <div
                                  key={c.id}
                                  className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-1"
                                >
                                  <div className="flex items-center gap-2">
                                    <UserAvatar
                                      avatar={commentAvatar}
                                      avatarUrl={commentAvatar}
                                      imageUrl={commentAvatar}
                                      emoji={c.avatarEmoji}
                                      name={commentCleanName}
                                      size="w-6 h-6"
                                    />
                                    <span className="font-bold text-slate-900 dark:text-white font-display text-xs">
                                      {commentCleanName}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed pl-8">
                                    {c.content}
                                  </p>
                                </div>
                              );
                            })}
                          </div>

                          {hiddenCount > 0 && (
                            <button
                              onClick={() => handleShowMoreComments(p.id)}
                              className="w-full py-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center justify-center gap-1 cursor-pointer font-display"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                              Xem thêm {Math.min(hiddenCount, LOAD_MORE_COMMENTS)} bình luận ({hiddenCount} còn ẩn)
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: BENTO SIDEBAR WIDGETS (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 sticky top-4">
            
            {/* BENTO WIDGET 1: TOP 3 LEADERBOARD SPOTLIGHT */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0 shadow-2xs">
                    <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Top 3 Học Viên Tuần
                  </h3>
                </div>

                <Link
                  href="/community/leaderboard"
                  className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 font-display"
                >
                  Xem tất cả <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-bold shrink-0">🥇</span>
                    <UserAvatar
                      avatar={currentUserAvatar}
                      name={currentUserName}
                      size="w-6 h-6"
                    />
                    <span className="font-bold text-slate-900 dark:text-white truncate">{currentUserName}</span>
                  </div>
                  <span className="font-black text-amber-600 dark:text-amber-400 text-xs font-mono shrink-0">{(user?.totalXp || 1450).toLocaleString()} XP</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-bold shrink-0">🥈</span>
                    <UserAvatar name="Thanh Hằng" size="w-6 h-6" />
                    <span className="font-bold text-slate-900 dark:text-white truncate">Thanh Hằng</span>
                  </div>
                  <span className="font-bold text-slate-600 dark:text-slate-400 text-xs font-mono shrink-0">1,280 XP</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-bold shrink-0">🥉</span>
                    <UserAvatar name="Hoàng Nam" size="w-6 h-6" />
                    <span className="font-bold text-slate-900 dark:text-white truncate">Hoàng Nam</span>
                  </div>
                  <span className="font-bold text-slate-600 dark:text-slate-400 text-xs font-mono shrink-0">1,120 XP</span>
                </div>
              </div>
            </div>

            {/* BENTO WIDGET 2: ACTIVE STUDY GROUPS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-4 h-4 text-indigo-500" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Nhóm Học Nổi Bật
                  </h3>
                </div>

                <Link
                  href="/community/groups"
                  className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 font-display"
                >
                  Tham gia <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white truncate">CLB IELTS Speaking 7.0+</span>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.2 rounded-md font-mono shrink-0">320 TV</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Luyện nói hàng ngày cùng phòng nói AI</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white truncate">Hội Cày 3000 Từ Vựng TOEIC</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded-md font-mono shrink-0">540 TV</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Thi đấu Flashcard & Streak mỗi tuần</p>
                </div>
              </div>
            </div>

            {/* BENTO WIDGET 3: AI COMMUNITY DAILY TIP */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                <Sparkles className="w-4 h-4" /> Mẹo AI Ghi Nhớ Nhanh Hàng Ngày
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                "Hãy tự đặt 1 câu áp dụng ngay từ vựng mới học vào bài đăng cộng đồng để duy trì thói quen ghi nhớ chủ động (Active Recall)."
              </p>
            </div>

          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}