export default function StreakCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-xl">
      <span className="text-2xl animate-bounce">🔥</span>
      <div>
        <div className="font-black text-xl leading-none">{count} Ngày</div>
        <div className="text-[12px] text-gray-500 font-semibold uppercase tracking-wider">Học liên tiếp</div>
      </div>
    </div>
  );
}