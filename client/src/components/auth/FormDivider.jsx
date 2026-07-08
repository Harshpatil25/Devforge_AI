export function FormDivider({ label = 'or continue with' }) {
  return (
    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
      <div className="h-px flex-1 bg-white/10" />
      <span>{label}</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  )
}
