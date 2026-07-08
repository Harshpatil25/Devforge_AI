import { AnimatePresence, motion } from 'framer-motion'
import { Archive, ExternalLink, Heart, MoreHorizontal, PencilLine, Sparkles, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { SeverityBadge } from './SeverityBadge'
import { StatusBadge } from './StatusBadge'

export function BugCard({ bug, onView, onEdit, onDelete, onDuplicate, onArchive, onFavorite }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="group rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{bug.programmingLanguage || 'Debugging'}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{bug.title}</h3>
        </div>
        <button type="button" onClick={() => onFavorite(bug)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-amber-300">
          {bug.favorite ? <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> : <Heart className="h-4 w-4" />}
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">{bug.shortDescription || bug.detailedDescription}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <SeverityBadge severity={bug.severity} />
        <StatusBadge status={bug.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(bug.technology || []).slice(0, 3).map((item) => <span key={item} className="rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1 text-[11px] text-slate-300">{item}</span>)}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-slate-500">{new Date(bug.createdAt || Date.now()).toLocaleDateString()}</div>
        <div className="relative">
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <AnimatePresence>
            {menuOpen ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute right-0 z-20 mt-2 w-44 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm shadow-2xl">
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-300 transition hover:bg-white/5" onClick={() => { onView(bug); setMenuOpen(false) }}>
                  <ExternalLink className="h-4 w-4" /> Open
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-300 transition hover:bg-white/5" onClick={() => { onEdit(bug); setMenuOpen(false) }}>
                  <PencilLine className="h-4 w-4" /> Edit
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-300 transition hover:bg-white/5" onClick={() => { onDuplicate(bug); setMenuOpen(false) }}>
                  <Sparkles className="h-4 w-4" /> Duplicate
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-300 transition hover:bg-white/5" onClick={() => { onArchive(bug); setMenuOpen(false) }}>
                  <Archive className="h-4 w-4" /> {bug.archived ? 'Restore' : 'Archive'}
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-rose-300 transition hover:bg-white/5" onClick={() => { onDelete(bug); setMenuOpen(false) }}>
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
