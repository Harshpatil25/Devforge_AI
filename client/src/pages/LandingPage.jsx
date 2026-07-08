import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { TechStack } from '../components/landing/TechStack'
import { FeatureGrid } from '../components/landing/FeatureGrid'
import { HowItWorks } from '../components/landing/HowItWorks'
import { ProductShowcase } from '../components/landing/ProductShowcase'
import { ComparisonSection } from '../components/landing/ComparisonSection'
import { Testimonials } from '../components/landing/Testimonials'
import { FAQ } from '../components/landing/FAQ'
import { CTA } from '../components/landing/CTA'
import { Footer } from '../components/landing/Footer'
import { features, steps, techStack } from '../constants/landingContent'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <TechStack items={techStack} />
        <FeatureGrid features={features} />
        <HowItWorks steps={steps} />
        <ProductShowcase />
        <ComparisonSection />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
