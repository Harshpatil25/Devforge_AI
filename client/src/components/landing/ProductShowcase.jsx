import { motion } from 'framer-motion'
import { BrainCircuit, Bug, Sparkles, FolderKanban, PanelLeft, Activity } from 'lucide-react'

const showcaseItems = [
  { title: 'Workspace sidebar', description: 'Navigate projects, memory, bugs, and AI actions from one focused surface.', icon: PanelLeft },
  { title: 'Project cards', description: 'Review status, context, and next steps in compact, readable cards.', icon: FolderKanban },
  { title: 'Recent bugs', description: 'Spot recurring issues and keep the context around them close by.', icon: Bug },
  { title: 'AI generator', description: 'Turn current work into documentation, summaries, and follow-ups quickly.', icon: Sparkles },
  { title: 'Developer memory', description: 'Save notes that stay searchable long after the sprint ends.', icon: BrainCircuit },
  { title: 'Activity feed', description: 'See what changed, what is in motion, and where to focus next.', icon: Activity },
]

export function ProductShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.16)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-400">Product showcase</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">A workspace that feels like a tool you already trust.</h2>
          <p className="mt-4 text-base leading-7 text-slate-500">The interface stays calm and readable so your focus remains on the work rather than on the product itself.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }} className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {showcaseItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
