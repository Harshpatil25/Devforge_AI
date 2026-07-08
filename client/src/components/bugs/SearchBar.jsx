export function SearchBar({ value, onChange, placeholder = 'Search bugs' }) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-400">
      <span className="text-slate-500">⌕</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent outline-none placeholder:text-slate-500" />
    </label>
  )
}
