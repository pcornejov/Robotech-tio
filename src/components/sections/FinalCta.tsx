import { useNavigate } from 'react-router-dom'
import SectionKicker from '../ui/SectionKicker'
import Button from '../ui/Button'

/**
 * Full-width CTA band before the footer. `Button` only renders a native
 * <button>, so navigation is done via `useNavigate` instead of wrapping
 * it in a <Link> (which would nest interactive elements invalidly).
 */
export default function FinalCta() {
  const navigate = useNavigate()

  return (
    <section className="border-y border-border bg-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center md:px-8 md:py-20 lg:px-16 lg:py-24">
        <SectionKicker className="text-sm">TRANSMISIÓN ENTRANTE</SectionKicker>
        <h2 className="mt-2 font-display text-2xl uppercase text-text-primary md:text-3xl">
          ¿Listo para volver al frente?
        </h2>
        <p className="mt-3 font-body text-text-secondary">
          Activa tu escuadrón y empieza desde el episodio 1.
        </p>
        <Button
          className="mt-8 mx-auto w-full max-w-xs md:w-auto md:max-w-none"
          onClick={() => navigate('/capitulos')}
        >
          Ver Capítulos
        </Button>
      </div>
    </section>
  )
}
