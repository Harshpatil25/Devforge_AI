import { Archive, Eye, Heart, PencilLine, Sparkles, Trash2 } from 'lucide-react'
import { SeverityBadge } from './SeverityBadge'
import { StatusBadge } from './StatusBadge'

export function BugTable({ bugs, onView, onEdit, onDelete, onDuplicate, onArchive, onFavorite }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/70">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-white/10 bg-slate-950/70 text-slate-400">
          <tr>
            <th className="px-4 py-3">Bug</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tech</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id} className="border-b border-white/5 text-slate-300">
              <td className="px-4 py-3">
                <div className="font-medium text-white">{bug.title}</div>
                <div className="mt-1 text-xs text-slate-500">{bug.programmingLanguage}</div>
              </td>
              <td className="px-4 py-3"><SeverityBadge severity={bug.severity} /></td>
              <td className="px-4 py-3"><StatusBadge status={bug.status} /></td>
              <td className="px-4 py-3">{(bug.technology || []).join(', ') || '—'}</td>
              <td className="px-4 py-3">{new Date(bug.updatedAt || bug.updated_at || Date.now()).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => onView(bug)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Eye className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onEdit(bug)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><PencilLine className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onDuplicate(bug)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Sparkles className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onArchive(bug)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Archive className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onFavorite(bug)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Heart className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onDelete(bug)} className="rounded-full border border-white/10 p-2 text-rose-400 transition hover:text-rose-300"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
