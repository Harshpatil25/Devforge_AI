import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'

const testimonials = [
  {
    quote: 'It feels like the missing layer between my editor and the decisions I make every week.',
    author: 'Mina, Staff Engineer',
  },
  {
    quote: 'I finally have a place where bugs, documentation, and product context stay connected.',
    author: 'Daniel, Product Engineer',
  },
  {
    quote: 'The experience is calm, fast, and useful. It does not feel like another AI dashboard.',
    author: 'Sara, Technical Lead',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Testimonials" title="Trusted by developers who care about clarity" description="A thoughtful workspace for teams that want to preserve context over time." />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.article key={testimonial.author} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-base leading-7 text-slate-300">“{testimonial.quote}”</p>
            <p className="mt-6 text-sm font-medium text-slate-100">{testimonial.author}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
