export function AuthCard({ title, description, children, footer }) {
  return (
    <div className="w-full rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {children}
      {footer ? <div className="mt-6 text-sm text-slate-400">{footer}</div> : null}
    </div>
  )
}
