'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { Heart, MessageCircle, Send } from 'lucide-react';

export default function CommunityPage() {
  const { user, awardXp } = useAuthStore();

  const [posts, setPosts] = useState([
    {
      id: 'p1',
      author: 'Minh Thư (@minhthu)',
      avatarEmoji: '🦋',
      meta: '10:00 · Language Legend',
      content: 'Hôm nay mình đã học xong chủ đề Business! Từ "Stakeholder" thật sự rất quan trọng trong công việc. Các bạn đã học từ này chưa?',
      vocabTags: ['Stakeholder: Bên liên quan'],
      likes: 24,
      commentsCount: 2,
      liked: false,
      comments: [
        { id: 'c1', author: 'TuanDepTrai', avatarEmoji: '🐱', content: 'Hay quá chị! Mình cũng đang học chủ đề này.' },
        { id: 'c2', author: 'ThanhHa', avatarEmoji: '🌸', content: 'Stakeholder là từ mình hay gặp trong meetings. Rất hữu ích!' }
      ]
    },
    {
      id: 'p2',
      author: 'Vũ Văn Minh (@Aministrator)',
      avatarEmoji: '🦉',
      meta: '08:15 · Word Wizard',
      content: '15 ngày streak rồi! Cảm ơn XP Voca đã giúp mình duy trì thói quen học từ vựng mỗi ngày. Tip của mình: hãy học vào buổi sáng, khi đầu óc còn tỉnh táo nhất!',
      vocabTags: [],
      likes: 42,
      commentsCount: 0,
      liked: false,
      comments: []
    }
  ]);

  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  const handleCreatePost = () => {
    if (!postText.trim() || !user) return;
    const newPost = {
      id: 'p_' + Date.now(),
      author: `${user.fullName} (@${user.username})`,
      avatarEmoji: user.avatarEmoji,
      meta: 'Vừa xong · ' + user.title,
      content: postText,
      vocabTags: [],
      likes: 0,
      commentsCount: 0,
      liked: false,
      comments: [] as { id: string; author: string; avatarEmoji: string; content: string }[]
    };
    setPosts([newPost, ...posts]);
    setPostText('');
    awardXp(20);
  };

  const handleLikePost = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.liked ? p.likes - 1 : p.likes + 1,
          liked: !p.liked
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId] || '';
    if (!text.trim() || !user) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newC = {
          id: 'c_' + Date.now(),
          author: user.username,
          avatarEmoji: user.avatarEmoji,
          content: text
        };
        return {
          ...p,
          comments: [...p.comments, newC],
          commentsCount: p.commentsCount + 1
        };
      }
      return p;
    }));

    setCommentText({ ...commentText, [postId]: '' });
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cộng đồng học tập</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Nơi giao lưu chia sẻ kinh nghiệm học từ vựng tiếng Anh hiệu quả cùng các thành viên khác.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-8 bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full w-fit border border-black/[0.03] dark:border-white/[0.03] animate-scale-in">
        <div className="px-4 py-2 text-xs font-bold rounded-full bg-white dark:bg-neutral-900 text-primary-c shadow-sm">Bảng tin</div>
        <Link href="/community/leaderboard" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng xếp hạng</Link>
        <Link href="/community/friends" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bạn bè</Link>
        <Link href="/community/groups" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Nhóm học tập</Link>
      </div>

      <div className="animate-fade-in-up flex flex-col gap-6">
        {/* Create Post — Double-Bezel */}
        <div className="bezel">
          <div className="bezel-inner p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                <span>{user?.avatarEmoji}</span>
              </div>
              <textarea 
                className="flex-1 bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 resize-none min-h-[80px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" 
                style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                placeholder="Bạn muốn chia sẻ mẹo học tập hay từ vựng mới nào hôm nay?"
                value={postText}
                onChange={e => setPostText(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button 
                className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold py-2 px-5 tactile shadow-sm disabled:opacity-40" 
                onClick={handleCreatePost}
                disabled={!postText.trim()}
              >
                <Send className="w-3.5 h-3.5" strokeWidth={2} /> Chia sẻ bài viết
              </button>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="flex flex-col gap-5">
          {posts.map(p => (
            <div key={p.id} className="bezel">
              <div className="bezel-inner p-5">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-lg border border-black/5 dark:border-white/5 flex-shrink-0">
                    <span>{p.avatarEmoji}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{p.author}</div>
                    <div className="text-[10px] text-muted font-medium">{p.meta}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
                  {p.content}
                </div>
                
                {/* Vocab Tags */}
                {p.vocabTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.vocabTags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-900/30">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="flex gap-4 pb-3 border-b border-black/[0.04] dark:border-white/[0.04] mb-3 text-[11px] text-muted font-semibold tracking-wide">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" strokeWidth={1.8} /> {p.likes} Thích</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" strokeWidth={1.8} /> {p.commentsCount} Bình luận</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl tactile border ${
                      p.liked 
                        ? 'bg-red-50 dark:bg-red-950/20 text-red-500 border-red-200/50 dark:border-red-900/30' 
                        : 'bg-neutral-50/60 dark:bg-neutral-900/40 border-black/[0.04] dark:border-white/[0.04] text-muted'
                    }`}
                    style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                    onClick={() => handleLikePost(p.id)}
                  >
                    <Heart className={`w-3.5 h-3.5 ${p.liked ? 'fill-red-500' : ''}`} strokeWidth={1.8} /> {p.liked ? 'Đã thích' : 'Thích'}
                  </button>
                  <button 
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.04] dark:border-white/[0.04] text-muted tactile"
                    style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                    onClick={() => setActiveCommentId(activeCommentId === p.id ? null : p.id)}
                  >
                    <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.8} /> Bình luận
                  </button>
                </div>

                {/* Comments */}
                <div className={`mt-4 pt-4 border-t border-black/[0.04] dark:border-white/[0.04] ${activeCommentId === p.id ? 'block animate-fade-in-up' : 'hidden'}`}>
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      className="flex-1 text-xs py-2 px-4 rounded-full bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/[0.04] dark:border-white/[0.04] text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" 
                      style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                      placeholder="Viết bình luận..." 
                      value={commentText[p.id] || ''}
                      onChange={e => setCommentText({ ...commentText, [p.id]: e.target.value })}
                      onKeyPress={e => e.key === 'Enter' && handleAddComment(p.id)}
                    />
                    <button 
                      className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold py-2 px-4 tactile disabled:opacity-40" 
                      onClick={() => handleAddComment(p.id)}
                      disabled={!(commentText[p.id] || '').trim()}
                    >
                      <Send className="w-3 h-3" strokeWidth={2} /> Gửi
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {p.comments.map(c => (
                      <div key={c.id} className="flex gap-3 bg-neutral-50/40 dark:bg-neutral-900/20 p-3 rounded-xl border border-black/[0.02] dark:border-white/[0.02]">
                        <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs flex-shrink-0 border border-black/5 dark:border-white/5">
                          <span>{c.avatarEmoji || '👤'}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-extrabold text-gray-950 dark:text-white leading-tight">@{c.author}</div>
                          <div className="text-xs text-muted mt-1 leading-relaxed">{c.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}