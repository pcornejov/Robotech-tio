import { Link } from 'react-router-dom'
import SectionKicker from '../components/ui/SectionKicker'

/**
 * Catch-all 404 page for any route that doesn't match a declared path.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <SectionKicker className="text-sm">SEÑAL PERDIDA</SectionKicker>
      <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md font-body text-text-secondary">
        La ruta que buscas no existe en este archivo. Verifica la dirección e inténtalo de nuevo.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block border border-primary/60 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] md:px-8 md:py-3.5 md:text-base"
      >
        Volver al Inicio
      </Link>
    </div>
  )
}
