import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { navLinks } from '../../constants/landingContent'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.replace('#', '')).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActiveSection(visible.target.id)
        }
      },
      { threshold: [0.3, 0.6] },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-violet-300">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>DevForge AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a key={link.href} href={link.href} className={`transition ${isActive ? 'text-slate-100' : 'hover:text-slate-100'}`}>
                {link.label}
              </a>
            )
          })}
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-slate-100">GitHub</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-500/30 hover:text-white">
            Sign in
          </Link>
          <Link to="/register" className="rounded-full border border-violet-500/30 bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500">
            Get started
          </Link>
        </div>

        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-200 md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle navigation">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-slate-800 bg-slate-950/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2 text-sm text-slate-300">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg px-2 py-2 transition hover:bg-slate-900 hover:text-white" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-lg px-2 py-2 transition hover:bg-slate-900 hover:text-white" onClick={() => setOpen(false)}>GitHub</a>
            <Link to="/login" className="rounded-lg px-2 py-2 transition hover:bg-slate-900 hover:text-white" onClick={() => setOpen(false)}>Sign in</Link>
            <Link to="/register" className="rounded-full border border-violet-500/30 bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500" onClick={() => setOpen(false)}>Get started</Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
