export function RelatedBugCard({ bug, onClick }) {
  return (
    <button type="button" onClick={onClick} className="w-full rounded-[20px] border border-white/10 bg-slate-950/60 p-4 text-left transition hover:border-violet-500/30">
      <div className="text-sm font-medium text-white">{bug.title}</div>
      <div className="mt-2 text-sm text-slate-400">{bug.shortDescription || bug.detailedDescription}</div>
    </button>
  )
}
