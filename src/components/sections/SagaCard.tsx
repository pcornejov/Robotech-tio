import { Link } from 'react-router-dom'
import SectionKicker from '../ui/SectionKicker'

interface SagaCardProps {
  kicker: string
  name: string
  description: string
}

/**
 * Clickable teaser card for one of the three Robotech sagas. The whole
 * card links to the (placeholder) Mechas y Sagas page.
 */
export default function SagaCard({ kicker, name, description }: SagaCardProps) {
  return (
    <Link
      to="/mechas-sagas"
      className="block border border-border bg-surface p-6 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none lg:p-8"
    >
      <SectionKicker className="text-xs">{kicker}</SectionKicker>
      <h3 className="mt-2 font-display text-xl uppercase text-text-primary md:text-2xl">
        {name}
      </h3>
      <p className="mt-3 font-body text-sm leading-snug text-text-secondary">{description}</p>
    </Link>
  )
}
