import { ArrowRight, Bot, Bug, Clock3, Compass, Sparkles } from 'lucide-react'

export function AppPreview({ variant = 'hero' }) {
  const isWorkspace = variant === 'workspace'

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl shadow-black/30">
      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-slate-950">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="ml-3 text-slate-400">DevForge Workspace</span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[176px_1fr]">
          <aside className="border-r border-white/10 bg-slate-900/80 p-4">
            <div className="text-sm font-semibold text-slate-100">Projects</div>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              {['Nova API', 'Insight UI', 'Bug Lab'].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3 text-sm text-violet-200">
              <div className="font-medium">Today</div>
              <div className="mt-1 text-violet-100/80">3 memos · 2 regressions</div>
            </div>
          </aside>

          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
              <div>
                <div className="text-sm font-medium text-slate-100">{isWorkspace ? 'Today’s session' : 'Recent context'}</div>
                <div className="text-sm text-slate-400">{isWorkspace ? '5 notes synced with AI summary' : 'Bug fix and migration notes ready'}</div>
              </div>
              <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm text-violet-200">
                {isWorkspace ? 'Synced' : 'Ready'}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                  <Bug className="h-4 w-4 text-amber-400" />
                  Recent Bugs
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-400">
                  <div className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2">Auth token refresh race</div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2">Data pagination edge case</div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                  <Bot className="h-4 w-4 text-emerald-400" />
                  AI Summary
                </div>
                <div className="mt-3 text-sm leading-6 text-slate-400">
                  Suggested a changelog entry and linked it to the regression notes from last week.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                  <Compass className="h-4 w-4 text-violet-400" />
                  Quick Actions
                </div>
                <div className="text-sm text-slate-500">{isWorkspace ? 'Now' : 'Next'}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Capture note', 'Generate docs', 'Review bugs'].map((action) => (
                  <button key={action} type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-300 transition hover:border-violet-500/40 hover:text-white">
                    <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                    {action}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Clock3 className="h-4 w-4" />
                <span>Last saved 2 minutes ago</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
