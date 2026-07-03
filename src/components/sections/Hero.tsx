import { useNavigate } from 'react-router-dom'
import Wordmark from '../ui/Wordmark'
import Button from '../ui/Button'

/**
 * Landing hero. The CTA links to the Capítulos page. `Button` only
 * renders a native <button>, so navigation is done via `useNavigate`
 * instead of wrapping it in a <Link> (which would nest interactive
 * elements invalidly).
 */
export default function Hero() {
  const navigate = useNavigate()

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

        <Button className="mt-8" onClick={() => navigate('/capitulos')}>
          Ver Capítulos
        </Button>
      </div>
    </section>
  )
}
