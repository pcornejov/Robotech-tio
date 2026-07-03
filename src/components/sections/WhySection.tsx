import SectionKicker from '../ui/SectionKicker'
import WhyCard from './WhyCard'

const reasons = [
  {
    title: 'Todo en un solo lugar',
    description:
      'Los capítulos completos de las tres sagas, organizados y listos para ver, sin buscar en mil sitios distintos.',
  },
  {
    title: 'Sin anuncios, sin registro',
    description: 'Gratis para siempre. No pedimos tu correo ni te interrumpimos con publicidad.',
  },
  {
    title: 'Hecho por fans, en español',
    description: 'Un archivo pensado por y para la comunidad hispanohablante de Robotech.',
  },
  {
    title: 'Lore para reconectar con la saga',
    description:
      'Personajes, mechas y contexto de cada saga, para revivir la historia completa.',
  },
]

/**
 * Home section explaining the site's value proposition, between Sagas
 * and the final CTA.
 */
export default function WhySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="text-center">
        <SectionKicker className="text-sm">NUESTRA MISIÓN</SectionKicker>
        <h2 className="mt-2 font-display text-2xl uppercase text-text-primary md:text-3xl lg:text-4xl">
          ¿Por qué este Archivo?
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {reasons.map((reason) => (
          <WhyCard key={reason.title} {...reason} />
        ))}
      </div>
    </section>
  )
}
