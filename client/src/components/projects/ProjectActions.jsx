import { Sparkles, Share2, UploadCloud } from 'lucide-react'

export function ProjectActions({ onCreate, onImport, onGenerate, onShare }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={onCreate} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:text-white">Create project</button>
      <button type="button" onClick={onImport} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:text-white">Import GitHub Repo</button>
      <button type="button" onClick={onGenerate} className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-300 transition hover:text-white"><Sparkles className="h-4 w-4" /> Generate README</button>
      <button type="button" onClick={onShare} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:text-white"><Share2 className="h-4 w-4" /> Share project</button>
    </div>
  )
}
