import { Copy, Download, Heart, Save, Sparkles } from 'lucide-react'

export function OutputViewer({ output, onCopy, onDownload, onSave, onFavorite, favorite, loading }) {
  if (loading) {
    return <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-400">Generating content…</div>
  }

  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-medium text-violet-300">Output</div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onCopy} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300"> <Copy className="h-4 w-4" /> Copy</button>
          <button type="button" onClick={onDownload} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300"> <Download className="h-4 w-4" /> Download</button>
          <button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300"> <Save className="h-4 w-4" /> Save</button>
          <button type="button" onClick={onFavorite} className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm ${favorite ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-white/10 bg-slate-950/70 text-slate-300'}`}><Heart className="h-4 w-4" /> Favorite</button>
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-300 whitespace-pre-wrap">
        {output || 'Generate an output to begin.'}
      </div>
    </div>
  )
}
