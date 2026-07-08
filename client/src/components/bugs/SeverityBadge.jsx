export function SeverityBadge({ severity }) {
  const styles = {
    Low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    Medium: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    High: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
    Critical: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  }

  return <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles[severity] || styles.Medium}`}>{severity}</span>
}
