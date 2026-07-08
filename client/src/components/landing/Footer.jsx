import { Globe2, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footerLinks } from '../../constants/landingContent'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-violet-300">D</span>
            <span>DevForge AI</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-500">A calm, practical operating system for the engineering memory that usually disappears after the sprint ends.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? <a href={link.href} className="transition hover:text-slate-100">{link.label}</a> : <a href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-slate-100">{link.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-5 text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 DevForge AI</span>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-slate-800 p-2 transition hover:border-violet-500/30 hover:text-slate-100" aria-label="GitHub">
              <Globe2 className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-slate-800 p-2 transition hover:border-violet-500/30 hover:text-slate-100" aria-label="LinkedIn">
              <Send className="h-4 w-4" />
            </a>
            <a href="mailto:hello@devforge.ai" className="transition hover:text-slate-100">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
