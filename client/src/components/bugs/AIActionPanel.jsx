import { Sparkles } from 'lucide-react'

const actions = [
  'Explain Error',
  'Suggest Possible Causes',
  'Improve Solution',
  'Generate Better Documentation',
  'Summarize Bug',
  'Find Similar Bugs',
  'Create Learning Notes',
  'Generate Interview Explanation',
]

export function AIActionPanel({ onAction }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-violet-300">
        <Sparkles className="h-4 w-4" /> AI debugging actions
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((action) => (
          <button key={action} type="button" onClick={() => onAction(action)} className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-sm text-violet-200 transition hover:text-white">{action}</button>
        ))}
      </div>
    </div>
  )
}
