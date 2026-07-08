export function FilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      <select value={filters.status || ''} onChange={(event) => onChange({ ...filters, status: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="">All statuses</option>
        <option value="Open">Open</option>
        <option value="Solved">Solved</option>
        <option value="Recurring">Recurring</option>
        <option value="Archived">Archived</option>
      </select>
      <select value={filters.severity || ''} onChange={(event) => onChange({ ...filters, severity: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="">All severities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
      <input value={filters.technology || ''} onChange={(event) => onChange({ ...filters, technology: event.target.value })} placeholder="Technology" className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none" />
      <select value={filters.favorite || ''} onChange={(event) => onChange({ ...filters, favorite: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="">All bugs</option>
        <option value="true">Favorites</option>
      </select>
      <select value={filters.archived || 'false'} onChange={(event) => onChange({ ...filters, archived: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="false">Active</option>
        <option value="true">Archived</option>
        <option value="all">All</option>
      </select>
      <select value={filters.sort || 'newest'} onChange={(event) => onChange({ ...filters, sort: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="critical">Most Critical</option>
        <option value="updated">Recently Updated</option>
      </select>
    </div>
  )
}
