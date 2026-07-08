import { useState } from 'react'
import { PlusCircle, Search } from 'lucide-react'

const starterEntries = [
  { title: 'Setup checklist', content: 'Verify Supabase env vars, install deps, and start the dev servers.', category: 'Setup' },
  { title: 'Release workflow', content: 'Use feature branches, review changes, and publish after smoke testing.', category: 'Process' },
]

export default function KnowledgeBasePage() {
  const [entries, setEntries] = useState(starterEntries)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState({ title: '', content: '', category: 'Setup' })

  const visibleEntries = entries.filter((entry) => [entry.title, entry.content, entry.category].join(' ').toLowerCase().includes(query.toLowerCase()))

  const addEntry = () => {
    if (!draft.title.trim() || !draft.content.trim()) return
    setEntries((current) => [{ ...draft, title: draft.title.trim() }, ...current])
    setDraft({ title: '', content: '', category: 'Setup' })
  }

  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Knowledge Base</p>
          <h2>Reference materials and architecture notes</h2>
          <p className="hero-card__copy">Keep design decisions, runbooks, and implementation notes close at hand.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Add entry</h3>
          <div className="mt-4 grid gap-3">
            <input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="Entry title" />
            <textarea rows={4} value={draft.content} onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="Write the reference details" />
            <select value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
              <option>Setup</option>
              <option>Process</option>
              <option>Architecture</option>
            </select>
            <button type="button" onClick={addEntry} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"><PlusCircle size={16} /> Save entry</button>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
            <Search size={16} className="text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none" placeholder="Search knowledge base" />
          </div>
          <div className="mt-4 space-y-3">
            {visibleEntries.map((entry) => <div key={entry.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-white">{entry.title}</strong><span className="rounded-full bg-violet-500/10 px-2 py-1 text-xs text-violet-300">{entry.category}</span></div><p className="mt-2 text-sm text-slate-400">{entry.content}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
