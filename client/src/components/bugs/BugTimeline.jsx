export function BugTimeline({ history = [] }) {
  return (
    <div className="space-y-3">
      {history.length === 0 ? <p className="text-sm text-slate-400">No activity history yet.</p> : history.map((item, index) => (
        <div key={`${item.label}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
          <div className="text-sm font-medium text-white">{item.label}</div>
          <div className="mt-1 text-sm text-slate-400">{item.detail}</div>
        </div>
      ))}
    </div>
  )
}
