import { AnimatePresence, motion } from 'framer-motion'
import { Archive, ExternalLink, GitBranch, Heart, MoreHorizontal, PencilLine, Sparkles, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ProjectStatusBadge } from './ProjectStatusBadge'

export function ProjectCard({ project, onView, onEdit, onDelete, onDuplicate, onArchive, onFavorite, onAi }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="group rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{project.category || 'Product'}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
        </div>
        <button type="button" onClick={() => onFavorite(project)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-amber-300">
          {project.favorite ? <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> : <Heart className="h-4 w-4" />}
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <ProjectStatusBadge status={project.status} />
        {project.techStack?.slice(0, 3).map((tech) => (
          <span key={tech} className="rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1 text-[11px] text-slate-300">{tech}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.githubRepoUrl ? (
          <a href={project.githubRepoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 transition hover:text-white">
            <GitBranch className="h-4 w-4" /> GitHub
          </a>
        ) : null}
        {project.liveDemoUrl ? (
          <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 transition hover:text-white">
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button type="button" onClick={() => onView(project)} className="text-sm font-medium text-violet-300 transition hover:text-white">Open project</button>
        <div className="relative">
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <AnimatePresence>
            {menuOpen ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute right-0 z-20 mt-2 w-44 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm shadow-2xl">
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-300 transition hover:bg-white/5" onClick={() => { onEdit(project); setMenuOpen(false) }}>
                  <PencilLine className="h-4 w-4" /> Edit
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-300 transition hover:bg-white/5" onClick={() => { onDuplicate(project); setMenuOpen(false) }}>
                  <Sparkles className="h-4 w-4" /> Duplicate
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-300 transition hover:bg-white/5" onClick={() => { onArchive(project); setMenuOpen(false) }}>
                  <Archive className="h-4 w-4" /> {project.archived ? 'Restore' : 'Archive'}
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-rose-300 transition hover:bg-white/5" onClick={() => { onDelete(project); setMenuOpen(false) }}>
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
