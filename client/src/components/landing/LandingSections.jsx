import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, ShieldCheck, Sparkles, ArrowUpRight, Globe2, Send } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'
import { AppPreview } from './AppPreview'
import { features, steps, faqs, footerLinks } from '../../constants/landingContent'

function FeatureCard({ feature }) {
  const Icon = feature.icon
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-100">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
    </motion.div>
  )
}

function StepItem({ step, index }) {
  const Icon = step.icon
  return (
    <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-violet-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-5 text-sm font-medium uppercase tracking-[0.22em] text-violet-400">Step {index + 1}</div>
      <h3 className="mt-2 text-xl font-semibold text-slate-100">{step.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
    </div>
  )
}

function FAQItem({ faq, open, onToggle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70">
      <button type="button" className="flex w-full items-center justify-between px-6 py-5 text-left" onClick={onToggle} aria-expanded={open}>
        <span className="text-base font-medium text-slate-100">{faq.question}</span>
        <ChevronDown className={`h-5 w-5 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] px-6 pb-5' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden text-sm leading-6 text-slate-400">{faq.answer}</div>
      </div>
    </div>
  )
}

export function LandingSections() {
  const [openFaq, setOpenFaq] = useState(0)
  return (
    <>
      <AnimatedSection id="features" className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Built for daily work" title="A practical workspace for your engineering memory" description="DevForge keeps your context close at hand so your best work compounds instead of disappearing after the last sprint." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="how-it-works" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How it works" title="A simple rhythm for building knowledge" description="Move from capture to insight without switching tools or losing context." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <StepItem key={step.title} step={step} index={index} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-4xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/20 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
          <div>
            <SectionHeading eyebrow="Workspace preview" title="A calm view into your development context" description="Every surface is designed to help you review your work quickly and make the next decision with confidence." />
            <div className="mt-8 flex flex-wrap gap-3">
              {['Projects', 'Recent bugs', 'AI summary', 'Quick actions'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">{item}</span>
              ))}
            </div>
          </div>
          <AppPreview variant="workspace" />
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-4xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/20 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div>
            <SectionHeading eyebrow="Why DevForge" title="Because good engineering memory is a multiplier" description="The difference is not hype, it is continuity." />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5">
              <h3 className="text-lg font-semibold text-slate-100">Without DevForge</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {['Forget bugs', 'Scattered notes', 'Missing documentation', 'Repeated mistakes'].map((item) => (
                  <li key={item} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-rose-400" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <h3 className="text-lg font-semibold text-slate-100">With DevForge</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {['Everything searchable', 'AI documentation', 'Developer memory', 'Organized workspace'].map((item) => (
                  <li key={item} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions that usually come up" description="A few details that matter when you are evaluating a developer workflow tool." align="center" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-violet-500/20 bg-violet-500/10 p-8 text-center shadow-lg shadow-black/20 lg:p-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Ready to build smarter?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">Create a workspace for your notes, bugs, and engineering memory and turn your experience into something searchable and useful.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500">
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-500/40 hover:text-white">
              View GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      <footer className="border-t border-white/10 bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Sparkles className="h-5 w-5 text-violet-400" />
              </span>
              <span>DevForge AI</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">A calm, practical operating system for the developer memory that usually disappears after the sprint ends.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">{group.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  {group.links.map((link) => (
                    <li key={link.label}><a href={link.href} className="transition hover:text-white">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-5 text-sm text-slate-500 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 DevForge AI</span>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 transition hover:border-violet-500/40 hover:text-white" aria-label="GitHub">
                <Globe2 className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 transition hover:border-violet-500/40 hover:text-white" aria-label="LinkedIn">
                <Send className="h-4 w-4" />
              </a>
              <a href="/" className="transition hover:text-white">Privacy</a>
              <a href="/" className="transition hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
