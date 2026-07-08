export function ProjectStatusBadge({ status }) {
  const colors = {
    Planning: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
    'In Progress': 'border-sky-500/20 bg-sky-500/10 text-sky-300',
    Completed: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    Archived: 'border-slate-500/20 bg-slate-500/10 text-slate-300',
  }

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${colors[status] || colors.Planning}`}>{status}</span>
}
