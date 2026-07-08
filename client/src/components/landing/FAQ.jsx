import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { faqs } from '../../constants/landingContent'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="FAQ" title="Questions that usually come up" description="A few details that matter when evaluating a developer workflow tool." align="center" />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-900/70">
              <button type="button" className="flex w-full items-center justify-between px-5 py-4 text-left" onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen}>
                <span className="text-base font-medium text-slate-100">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-slate-500 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-6 text-slate-500">{faq.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
