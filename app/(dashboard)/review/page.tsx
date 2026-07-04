'use client';
import React from 'react';
import Link from 'next/link';
import { MOCK_VOCABULARIES } from '@/lib/constants/vocabularies';
import { Calendar, Zap, PartyPopper, ArrowRight, Clock } from 'lucide-react';

export default function ReviewPage() {
  const dueReviews = MOCK_VOCABULARIES.slice(0, 3);

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Lịch ôn tập định kỳ</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Sử dụng thuật toán lặp lại ngắt quãng (Spaced Repetition) để phân tích tần suất ôn tập từ vựng khoa học nhất.
        </p>
      </div>

      {/* Calendar — Double-Bezel */}
      <div className="bezel mb-6 animate-scale-in">
        <div className="bezel-inner p-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.04] dark:border-white/[0.04] mb-5">
            <div className="flex items-center gap-3">
              <div className="icon-well bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500">
                <Calendar className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                Tháng 6, 2026
              </h3>
            </div>
            <span className="text-[11px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-200/50 dark:border-emerald-900/30">
              Spaced Repetition Active
            </span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
              <div key={d} className="text-[12px] font-bold text-muted uppercase tracking-wider py-1">{d}</div>
            ))}

            {Array(27).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-xl flex items-center justify-center text-xs font-bold text-gray-400 dark:text-neutral-700 opacity-40 select-none"
                style={{ transition: 'background 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
              >
                {i + 4}
              </div>
            ))}
            
            {/* Today */}
            <div className="aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-black relative select-none bg-gradient-to-tr from-cyan-400 to-blue-500 text-white shadow-sm cursor-pointer tactile">
              <span>28</span>
              <span className="w-1.5 h-1.5 bg-amber-300 rounded-full absolute bottom-1.5 animate-pulse"></span>
            </div>

            <div className="aspect-square rounded-xl flex items-center justify-center text-xs font-bold text-gray-900 dark:text-gray-100 cursor-pointer tactile">29</div>
            <div className="aspect-square rounded-xl flex items-center justify-center text-xs font-bold text-gray-900 dark:text-gray-100 cursor-pointer tactile">30</div>
          </div>
        </div>
      </div>

      {/* Due list — Double-Bezel */}
      <div className="bezel animate-fade-in-up">
        <div className="bezel-inner p-6">
          <div className="flex justify-between items-center pb-4 border-b border-black/[0.04] dark:border-white/[0.04] mb-5">
            <div>
              <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em]">
                Từ vựng cần ôn tập hôm nay ({dueReviews.length})
              </h3>
              <p className="text-[12px] text-muted font-medium mt-0.5">Hoàn thành để duy trì chuỗi trí nhớ tốt.</p>
            </div>
            {dueReviews.length > 0 && (
              <Link href="/study/practice" className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold py-2 px-5 tactile shadow-sm">
                <Zap className="w-3.5 h-3.5" strokeWidth={2} /> Ôn tập ngay
              </Link>
            )}
          </div>

          {dueReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <PartyPopper className="w-12 h-12 text-muted mb-4" strokeWidth={1.2} />
              <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-1">Tuyệt vời! Đã hoàn thành ôn tập</div>
              <p className="text-xs text-muted max-w-xs mb-6 leading-relaxed">Bạn đã hoàn thành xuất sắc các lịch trình ôn tập. Hãy tiếp tục học thêm từ vựng mới!</p>
              <Link href="/vocabulary" className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold px-6 py-2.5 shadow-md tactile">
                Học từ mới <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dueReviews.map(v => (
                <div key={v.id} className="bezel lift group">
                  <div className="bezel-inner p-4">
                    <div className="flex justify-between items-center mb-2.5">
                      <div>
                        <span className="font-extrabold text-base text-primary-600 dark:text-cyan-400 group-hover:text-cyan-500" style={{ transition: 'color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>{v.word}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 rounded-full uppercase ml-2">{v.pos}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-amber-500 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full font-bold uppercase border border-amber-200/50 dark:border-amber-900/30">
                        <Clock className="w-3 h-3" strokeWidth={1.8} /> Đến hạn
                      </span>
                    </div>
                    <div className="text-xs text-gray-900 dark:text-gray-100 font-semibold mb-1">{v.definitionVn}</div>
                    <div className="text-[12px] text-muted leading-relaxed line-clamp-2">{v.definition}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
