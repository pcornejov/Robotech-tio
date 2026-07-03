import Wordmark from '../ui/Wordmark'
import Button from '../ui/Button'

/**
 * Landing hero. The CTA has no catalog page to link to yet (iteration 1),
 * so it smooth-scrolls down to the footer as a placeholder interaction.
 */
export default function Hero() {
  const handleCtaClick = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-6 text-center md:min-h-[85vh]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(58,143,183,0.18), rgba(10,14,20,0) 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center space-y-4 md:space-y-6">
        <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-primary">
          [ ARCHIVO DE LA GUERRA ROBOTECH ]
        </p>

        <Wordmark
          as="h1"
          className="text-4xl font-black leading-tight tracking-wide md:text-6xl lg:text-7xl"
        />

        <p className="max-w-md font-body text-base font-medium text-text-secondary md:text-lg">
          Todos los capítulos de la saga. Toda la historia de la Fuerza de Defensa Robotech, en un
          solo lugar.
        </p>

        <Button className="mt-8" onClick={handleCtaClick}>
          Ver Capítulos
        </Button>
      </div>
    </section>
  )
}
