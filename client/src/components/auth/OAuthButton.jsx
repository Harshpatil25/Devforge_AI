export function OAuthButton({ onClick, loading, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  )
}
