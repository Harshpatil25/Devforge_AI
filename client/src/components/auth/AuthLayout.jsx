import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export function AuthLayout({ children, title, description, footer }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 lg:p-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Sparkles className="h-5 w-5 text-violet-400" />
              </span>
              <span>DevForge AI</span>
            </Link>
            <h1 className="mt-10 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A calmer way to keep your engineering memory intact.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">Capture bugs, preserve context, generate documentation, and keep your development knowledge searchable over time.</p>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-400">
            <p className="font-medium text-slate-200">Why teams use DevForge</p>
            <ul className="mt-3 space-y-2">
              <li>• Searchable project context and notes</li>
              <li>• Bug history that stays useful</li>
              <li>• AI-generated docs from your own workflow</li>
            </ul>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </div>
            {children}
            {footer ? <div className="mt-6 text-sm text-slate-400">{footer}</div> : null}
          </div>
        </section>
      </div>
    </div>
  )
}
