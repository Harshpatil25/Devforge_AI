import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'

export function HowItWorks({ steps }) {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="How it works" title="A simple rhythm for building knowledge" description="Capture, structure, search, and improve without leaving the flow of work." />
      <div className="mt-10 grid gap-5 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.article key={step.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/80 text-violet-300">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">Step {index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{step.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
