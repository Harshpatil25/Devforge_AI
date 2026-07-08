import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-8 text-center lg:p-12">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Start building with memory.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">Create a workspace for your notes, bugs, and project context and make your best work easier to find later.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500">
            Create free account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-500/30 hover:text-white">
            View GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
