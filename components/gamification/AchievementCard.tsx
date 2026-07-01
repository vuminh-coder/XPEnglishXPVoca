import { Achievement } from '@/types';

export default function AchievementCard({ ach, unlocked }: { ach: Achievement, unlocked: boolean }) {
  return (
    <div className={`p-4 border rounded-2xl transition-all duration-300 ${unlocked ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800' : 'bg-gray-50 dark:bg-gray-950 opacity-40 grayscale'}`}>
      <div className="text-4xl mb-2">{ach.icon}</div>
      <div className="font-bold text-sm">{ach.name}</div>
      <p className="text-xs text-gray-500 mt-1">{ach.description}</p>
      <div className="mt-3 text-xs text-orange-500 font-bold">+{ach.xpBonus} XP</div>
    </div>
  );
}