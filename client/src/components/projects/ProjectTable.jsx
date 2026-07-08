import { Archive, Eye, Heart, PencilLine, Sparkles, Trash2 } from 'lucide-react'
import { ProjectStatusBadge } from './ProjectStatusBadge'

export function ProjectTable({ projects, onView, onEdit, onDelete, onDuplicate, onArchive, onFavorite }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/70">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-white/10 bg-slate-950/70 text-slate-400">
          <tr>
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tech</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-white/5 text-slate-300">
              <td className="px-4 py-3">
                <div className="font-medium text-white">{project.title}</div>
                <div className="mt-1 text-xs text-slate-500">{project.category}</div>
              </td>
              <td className="px-4 py-3"><ProjectStatusBadge status={project.status} /></td>
              <td className="px-4 py-3">{project.techStack?.join(', ') || '—'}</td>
              <td className="px-4 py-3">{new Date(project.updatedAt || project.updated_at || Date.now()).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => onView(project)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Eye className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onEdit(project)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><PencilLine className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onDuplicate(project)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Sparkles className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onArchive(project)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Archive className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onFavorite(project)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white"><Heart className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onDelete(project)} className="rounded-full border border-white/10 p-2 text-rose-400 transition hover:text-rose-300"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
