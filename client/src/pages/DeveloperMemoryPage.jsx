import { useState } from 'react'
import { PlusCircle, Sparkles } from 'lucide-react'

const initialNotes = [
  { title: 'Auth flow', body: 'Use the callback route to finalize OAuth sessions.', tag: 'Auth' },
  { title: 'Bug triage', body: 'Capture steps to reproduce and root cause before coding.', tag: 'Debugging' },
]

export default function DeveloperMemoryPage() {
  const [notes, setNotes] = useState(initialNotes)
  const [draft, setDraft] = useState({ title: '', body: '', tag: 'Work' })

  const addNote = () => {
    if (!draft.title.trim() || !draft.body.trim()) return
    setNotes((current) => [{ title: draft.title, body: draft.body, tag: draft.tag }, ...current])
    setDraft({ title: '', body: '', tag: 'Work' })
  }

  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Developer Memory</p>
          <h2>Keep decisions and lessons close at hand</h2>
          <p className="hero-card__copy">Capture the reasoning behind solutions so the next implementation is easier and faster.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Add a memory</h3>
          <div className="mt-4 grid gap-3">
            <input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="Topic or lesson" />
            <textarea rows={4} value={draft.body} onChange={(event) => setDraft((current) => ({ ...current, body: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="What should be remembered?" />
            <select value={draft.tag} onChange={(event) => setDraft((current) => ({ ...current, tag: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
              <option>Work</option>
              <option>Auth</option>
              <option>Debugging</option>
              <option>Design</option>
            </select>
            <button type="button" onClick={addNote} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"><PlusCircle size={16} /> Save memory</button>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Saved memories</h3>
          <div className="mt-4 space-y-3">
            {notes.map((note) => <div key={note.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-white">{note.title}</strong><span className="rounded-full bg-violet-500/10 px-2 py-1 text-xs text-violet-300">{note.tag}</span></div><p className="mt-2 text-sm text-slate-400">{note.body}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
