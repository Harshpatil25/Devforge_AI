import { motion } from 'framer-motion'

export function FeatureCard({ feature }) {
  const Icon = feature.icon

  return (
    <motion.article whileHover={{ y: -3, scale: 1.01 }} transition={{ duration: 0.2 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-100">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
    </motion.article>
  )
}
