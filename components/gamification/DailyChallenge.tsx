export default function DailyChallenge({ title, desc, progress, required, xp }: { title: string, desc: string, progress: number, required: number, xp: number }) {
  const percent = Math.min(100, Math.round((progress / required) * 100));
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start gap-4 mb-2">
        <div>
          <h4 className="font-bold text-sm">{title}</h4>
          <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
        <span className="text-xs text-orange-500 font-bold">+{xp} XP</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-xs font-bold">{progress}/{required}</span>
      </div>
    </div>
  );
}