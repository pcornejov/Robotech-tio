import Hero from '../components/sections/Hero'
import SagasSection from '../components/sections/SagasSection'
import WhySection from '../components/sections/WhySection'
import FinalCta from '../components/sections/FinalCta'

/**
 * Home page: Hero + Sagas teaser + Why + final CTA.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SagasSection />
      <WhySection />
      <FinalCta />
    </>
  )
}
