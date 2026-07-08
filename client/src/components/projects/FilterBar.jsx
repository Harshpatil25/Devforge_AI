export function FilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      <select value={filters.status || ''} onChange={(event) => onChange({ ...filters, status: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="">All statuses</option>
        <option value="Planning">Planning</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Archived">Archived</option>
      </select>
      <input value={filters.tech || ''} onChange={(event) => onChange({ ...filters, tech: event.target.value })} placeholder="Technology" className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none" />
      <select value={filters.favorite || ''} onChange={(event) => onChange({ ...filters, favorite: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="">All projects</option>
        <option value="true">Favorites</option>
      </select>
      <select value={filters.archived || 'false'} onChange={(event) => onChange({ ...filters, archived: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="false">Active</option>
        <option value="true">Archived</option>
        <option value="all">All</option>
      </select>
      <select value={filters.sort || 'updated'} onChange={(event) => onChange({ ...filters, sort: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
        <option value="updated">Most updated</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  )
}
