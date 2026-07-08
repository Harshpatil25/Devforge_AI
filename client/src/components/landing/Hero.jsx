import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroPreview } from './HeroPreview'

const stats = [
  { value: '120+', label: 'Projects managed' },
  { value: '3.2k', label: 'Bugs documented' },
  { value: '8.4k', label: 'AI generations' },
  { value: '50+', label: 'Developers helped' },
]

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-24">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
          <BadgeCheck className="h-4 w-4 text-violet-400" />
          Developer memory for modern product teams
        </div>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
          Your AI-powered second brain for software development.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
          Capture projects, remember bugs, organize learning, generate documentation with AI, and keep every part of your development journey searchable.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500">
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-500/30 hover:text-white">
            View demo
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xl font-semibold text-slate-100">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <HeroPreview />
    </section>
  )
}
