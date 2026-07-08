import { Plus } from 'lucide-react'

export function ProjectHeader({ onCreate }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-violet-300">Projects workspace</p>
        <h2 className="text-2xl font-semibold text-white">Build, track, and ship with AI context.</h2>
      </div>
      <button type="button" onClick={onCreate} className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">
        <Plus className="h-4 w-4" /> New project
      </button>
    </div>
  )
}
