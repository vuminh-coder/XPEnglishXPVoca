'use client';
import { getXpProgress } from '@/lib/utils/calculateXP';

export default function XPBar({ level, xp }: { level: number, xp: number }) {
  const { current, total, percent } = getXpProgress(level, xp);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Tiến trình đến cấp {level + 1}</span>
        <span>{current}/{total} XP</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500" 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}