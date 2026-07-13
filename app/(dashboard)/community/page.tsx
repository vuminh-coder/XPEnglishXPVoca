'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { Heart, MessageCircle, Send, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui';

const INITIAL_COMMENTS = 15;
const LOAD_MORE_COMMENTS = 10;

export default function CommunityPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, number>>({});

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
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: postText.trim() }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPosts(prev => [data.data, ...prev]);
        setPostText('');
        awardXp(20);
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể đăng bài viết" });
      }
    } catch (err) {
      console.error("Error creating post:", err);
      addToast({ type: "error", title: "Lỗi", message: "Đã xảy ra lỗi khi tạo bài viết" });
    }
  };

  const handleLikePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}/like`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success && data.data) {
        const { liked, likesCount } = data.data;
        setPosts(prev => prev.map(p => {
          if (p.id === id) {
            return { ...p, likes: likesCount, liked };
          }
          return p;
        }));
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
        const newComment = data.data;
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
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="page-header animate-fade-in-down mb-6 text-center">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cộng đồng học tập</h1>
        <p className="page-subtitle text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-medium mt-1">
          Nơi giao lưu chia sẻ kinh nghiệm học từ vựng tiếng Anh hiệu quả cùng các thành viên khác.
        </p>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-1.5 justify-center mb-6 bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full w-fit mx-auto border border-black/[0.03] dark:border-white/[0.03] animate-scale-in">
        <div className="px-4 py-2 text-xs font-bold rounded-full bg-white dark:bg-neutral-900 text-sky-600 dark:text-sky-400 shadow-sm">Bảng tin</div>
        <Link href="/community/leaderboard" className="px-4 py-2 text-xs font-bold rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350 transition-all duration-300">Bảng xếp hạng</Link>
        <Link href="/community/friends" className="px-4 py-2 text-xs font-bold rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350 transition-all duration-300">Bạn bè</Link>
        <Link href="/community/groups" className="px-4 py-2 text-xs font-bold rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350 transition-all duration-300">Nhóm học tập</Link>
      </div>

      <div className="animate-fade-in-up flex flex-col gap-6">
        {/* Create Post — Double-Bezel */}
        <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
          <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-lg shadow-sm flex-shrink-0 border border-black/5 dark:border-white/5">
                <span>{user?.avatarEmoji}</span>
              </div>
              <textarea 
                className="flex-1 bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 resize-none min-h-[80px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] font-medium" 
                style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                placeholder="Bạn muốn chia sẻ mẹo học tập hay từ vựng mới nào hôm nay?"
                value={postText}
                onChange={e => setPostText(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                variant="primary"
                size="sm"
                onClick={handleCreatePost}
                disabled={!postText.trim()}
                className="font-bold flex items-center gap-1.5 text-white dark:text-white"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={1.3} /> Chia sẻ bài viết
              </Button>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="flex flex-col gap-5">
          {loading ? (
            <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
              <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-12 text-center text-xs font-bold text-slate-400 animate-pulse">
                Đang tải bài viết từ cộng đồng...
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
              <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-12 text-center flex flex-col items-center">
                <MessageCircle className="w-12 h-12 text-slate-400 mb-4" strokeWidth={1.3} />
                <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-1">Chưa có bài viết nào</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed font-semibold">Hãy chia sẻ mẹo học tập hoặc từ vựng mới đầu tiên của bạn để giao lưu cùng cộng đồng nhé!</p>
              </div>
            </div>
          ) : (
            posts.map(p => {
              const allComments = p.comments || [];
              const totalComments = p.commentsCount || allComments.length;
              const limit = getVisibleCount(p.id);
              const shownComments = allComments.slice(0, limit);
              const hiddenCount = allComments.length - shownComments.length;
              const serverHiddenCount = totalComments - allComments.length;

              return (
                <div key={p.id} className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[2rem]">
                  <div className="bezel-inner rounded-[calc(2rem-6px)] bg-white dark:bg-[#0c0c0e] p-5">
                    {/* Post Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-lg border border-black/5 dark:border-white/5 flex-shrink-0">
                        <span>{p.avatarEmoji}</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-gray-100">@{p.author}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">{p.meta}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-4 font-medium">
                      {p.content}
                    </div>
                    
                    {/* Vocab Tags */}
                    {p.vocabTags && p.vocabTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.vocabTags.map((tag: string, idx: number) => (
                          <span key={idx} className="text-[10px] font-black uppercase tracking-wider py-1 px-2.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-900/30">{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex gap-4 pb-3 border-b border-black/[0.04] dark:border-white/[0.04] mb-3 text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500" strokeWidth={1.3} /> {p.likes} Thích</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-sky-500" strokeWidth={1.3} /> {totalComments} Bình luận</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button 
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl tactile border ${
                          p.liked 
                            ? 'bg-red-50 dark:bg-red-950/20 text-red-500 border-red-200/50 dark:border-red-900/30' 
                            : 'bg-neutral-50/60 dark:bg-neutral-900/40 border-black/[0.04] dark:border-white/[0.04] text-slate-500'
                        }`}
                        style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                        onClick={() => handleLikePost(p.id)}
                      >
                        <Heart className={`w-3.5 h-3.5 ${p.liked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} strokeWidth={1.3} /> {p.liked ? 'Đã thích' : 'Thích'}
                      </button>
                      <button 
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.04] dark:border-white/[0.04] text-slate-500 tactile"
                        style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                        onClick={() => setActiveCommentId(activeCommentId === p.id ? null : p.id)}
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.3} /> Bình luận
                      </button>
                    </div>

                    {/* Comments section */}
                    <div className={`mt-4 pt-4 border-t border-black/[0.04] dark:border-white/[0.04] ${activeCommentId === p.id ? 'block animate-fade-in-up' : 'hidden'}`}>
                      <div className="flex gap-2 mb-4">
                        <input 
                          type="text" 
                          className="flex-1 text-xs py-2 px-4 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.04] dark:border-white/[0.04] text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] font-medium" 
                          style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                          placeholder="Viết bình luận của bạn..." 
                          value={commentText[p.id] || ''}
                          onChange={e => setCommentText(prev => ({ ...prev, [p.id]: e.target.value }))}
                          onKeyDown={e => e.key === 'Enter' && handleAddComment(p.id)}
                        />
                        <Button 
                          variant="primary"
                          size="sm"
                          onClick={() => handleAddComment(p.id)}
                          disabled={!(commentText[p.id] || '').trim()}
                          className="font-bold py-2 px-4 flex items-center gap-1.5 text-white dark:text-white"
                        >
                          <Send className="w-3 h-3" strokeWidth={1.3} /> Gửi
                        </Button>
                      </div>

                      {serverHiddenCount > 0 && (
                        <div className="text-center mb-3">
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider italic">
                            Có {serverHiddenCount} bình luận cũ hơn không được hiển thị
                          </span>
                        </div>
                      )}
                      
                      <div className="flex flex-col gap-3">
                        {shownComments.map((c: any) => (
                          <div key={c.id} className="flex gap-3 bg-neutral-50/40 dark:bg-neutral-900/20 p-3 rounded-xl border border-black/[0.02] dark:border-white/[0.02]">
                            <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs flex-shrink-0 border border-black/5 dark:border-white/5 font-display">
                              <span>{c.avatarEmoji || '👤'}</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-[10px] font-black text-slate-900 dark:text-white leading-tight">@{c.author}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-300 mt-1 leading-relaxed font-medium">{c.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {hiddenCount > 0 && (
                        <button 
                          className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 text-[10px] font-black uppercase tracking-wider text-cyan-500 hover:text-cyan-600 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/10 rounded-xl transition-all duration-300"
                          onClick={() => handleShowMoreComments(p.id)}
                        >
                          <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.3} />
                          Xem thêm {Math.min(hiddenCount, LOAD_MORE_COMMENTS)} bình luận ({hiddenCount} còn ẩn)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}