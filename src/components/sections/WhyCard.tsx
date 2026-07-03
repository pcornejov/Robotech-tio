interface WhyCardProps {
  title: string
  description: string
}

/**
 * Lightweight bullet-style card for the "¿Por qué este Archivo?" section.
 * No border box, no link, no hover state — just a top accent rule.
 */
export default function WhyCard({ title, description }: WhyCardProps) {
  return (
    <div className="border-t-2 border-accent bg-transparent pt-4">
      <h3 className="font-display text-base uppercase text-text-primary md:text-lg">{title}</h3>
      <p className="mt-2 font-body text-sm leading-snug text-text-secondary">{description}</p>
    </div>
  )
}
