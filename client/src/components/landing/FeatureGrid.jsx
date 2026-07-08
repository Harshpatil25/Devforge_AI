import { SectionHeading } from './SectionHeading'
import { FeatureCard } from './FeatureCard'

export function FeatureGrid({ features }) {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Features" title="A practical workspace for engineering memory" description="Every capability is designed to reduce context switching and help you move from observation to action faster." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  )
}
