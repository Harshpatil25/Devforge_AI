export function StatusBadge({ status }) {
  const styles = {
    Open: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    Solved: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    Recurring: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
    Archived: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
  }

  return <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles[status] || styles.Open}`}>{status}</span>
}
