import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'

export function TechStack({ items }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Built with familiar tools" title="A product that fits into your current stack" description="The experience stays practical and developer-friendly while leaning on proven infrastructure." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <motion.article key={item.name} whileHover={{ y: -3, scale: 1.01 }} transition={{ duration: 0.2 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-100">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
