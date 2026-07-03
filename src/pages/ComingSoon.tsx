import { Link } from 'react-router-dom'
import SectionKicker from '../components/ui/SectionKicker'

interface ComingSoonProps {
  title: string
}

/**
 * Placeholder page for sections that don't have real content yet.
 */
export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <SectionKicker className="text-sm">PRÓXIMAMENTE</SectionKicker>
      <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md font-body text-text-secondary">
        Esta sección está en construcción. Vuelve pronto para ver el contenido completo.
      </p>
      <Link to="/" className="mt-6 font-body text-primary hover:text-accent">
        Volver al Inicio
      </Link>
    </div>
  )
}
