import { motion } from 'framer-motion'
import { CheckCircle2, CircleAlert } from 'lucide-react'

const without = [
  'Scattered notes across tools',
  'Forgotten bugs and context loss',
  'Repeated mistakes from poor recall',
  'Documentation that never gets written',
]

const withDevforge = [
  'Everything searchable in one workspace',
  'AI-generated documentation and summaries',
  'Centralized project and bug context',
  'A durable developer memory over time',
]

export function ComparisonSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 lg:grid-cols-[1fr_1fr] lg:p-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }} className="rounded-[24px] border border-rose-500/20 bg-rose-500/10 p-6">
          <div className="flex items-center gap-2 text-rose-300">
            <CircleAlert className="h-5 w-5" />
            <h3 className="text-lg font-semibold text-slate-100">Without DevForge AI</h3>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
            {without.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CircleAlert className="mt-0.5 h-4 w-4 text-rose-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: 0.06 }} className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-6">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="text-lg font-semibold text-slate-100">With DevForge AI</h3>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
            {withDevforge.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
