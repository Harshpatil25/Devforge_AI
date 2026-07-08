import { motion } from 'framer-motion'
import { AppPreview } from './AppPreview'

export function HeroPreview() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }} className="relative">
      <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-violet-500/10 via-transparent to-slate-500/10 blur-3xl" />
      <AppPreview />
    </motion.div>
  )
}
