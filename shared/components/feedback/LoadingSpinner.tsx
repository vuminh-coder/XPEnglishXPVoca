export default function LoadingSpinner() {
  return (
    <div className="flex flex-col gap-3 p-6 w-full max-w-md mx-auto">
      <div className="h-5 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="h-20 w-full rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
      <div className="h-4 w-1/2 rounded-lg bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
    </div>
  );
}
