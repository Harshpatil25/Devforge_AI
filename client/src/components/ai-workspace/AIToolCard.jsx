import { Sparkles } from 'lucide-react'

export function AIToolCard({ tool, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(tool)} className="rounded-[22px] border border-white/10 bg-slate-900/80 p-4 text-left transition hover:border-violet-500/30 hover:bg-slate-800/80">
      <div className="flex items-center gap-2 text-sm font-medium text-violet-300">
        <Sparkles className="h-4 w-4" /> {tool.title}
      </div>
      <p className="mt-2 text-sm text-slate-400">{tool.description}</p>
    </button>
  )
}
