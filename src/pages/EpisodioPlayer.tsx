import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import EpisodeNav from '../components/episode/EpisodeNav'
import EpisodeSidebar from '../components/episode/EpisodeSidebar'
import SectionKicker from '../components/ui/SectionKicker'
import type { SagaId } from '../data/episodes'
import { episodes, sagaNames, sagaTagClasses } from '../data/episodes'

/**
 * "Volver al Catálogo" outline button. Rendered as a plain `Link` (never a
 * `Button` nested inside a `Link`) since it needs to be a single anchor
 * element, not a button-inside-a-link.
 */
function CatalogOutlineLink({ children }: { children: ReactNode }) {
  return (
    <Link
      to="/capitulos"
      className="mt-6 inline-block border border-primary/60 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] md:px-8 md:py-3.5 md:text-base"
    >
      {children}
    </Link>
  )
}

/** Estado "No encontrado": `order` inválido o fuera de rango 1-85. */
function NotFoundState() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 text-center md:px-8">
      <SectionKicker className="text-sm">SEÑAL PERDIDA</SectionKicker>
      <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
        Episodio no encontrado
      </h1>
      <p className="mt-4 max-w-md font-body text-text-secondary">
        El capítulo que buscas no existe en este archivo. Verifica el número e inténtalo de nuevo.
      </p>
      <CatalogOutlineLink>Volver al Catálogo</CatalogOutlineLink>
    </div>
  )
}

/** Estado "No disponible": episodio existe pero `available === false`. */
function NotAvailableState({ order, saga }: { order: number; saga: SagaId }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
      <div className="flex flex-col items-center text-center">
        <SectionKicker className="text-sm">SEÑAL INTERRUMPIDA</SectionKicker>
        <span className={`mt-3 ${sagaTagClasses[saga]}`}>{sagaNames[saga]}</span>
        <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
          Episodio {String(order).padStart(2, '0')} no disponible
        </h1>
        <p className="mt-4 max-w-md font-body text-text-secondary">
          Este episodio no está disponible por el momento. Es un vacío conocido en nuestra fuente
          original — estamos trabajando para completar el archivo.
        </p>
        <CatalogOutlineLink>Volver al Catálogo</CatalogOutlineLink>
      </div>

      <div className="mt-10 md:mt-14">
        <EpisodeNav currentOrder={order} />
      </div>
    </div>
  )
}

/**
 * `/capitulos/:order` — resolves the URL param against `episodes` and
 * renders one of three states: not found, not available, or the player.
 */
export default function EpisodioPlayer() {
  const { order: orderParam } = useParams<{ order: string }>()
  const order = Number(orderParam)
  const episode = Number.isInteger(order) ? episodes.find((e) => e.order === order) : undefined

  if (!episode) {
    return <NotFoundState />
  }

  if (!episode.available) {
    return <NotAvailableState order={episode.order} saga={episode.saga} />
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10 lg:px-16 lg:py-12">
      <Link
        to="/capitulos"
        className="inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:text-primary"
      >
        <span aria-hidden="true">←</span>
        Volver al Catálogo
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 md:mt-6 lg:grid-cols-12 lg:gap-10 lg:items-start">
        <div className="lg:col-span-8">
          <div className="relative border border-border bg-surface-alt p-3 md:p-4 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="aspect-video w-full overflow-hidden bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${episode.id}`}
                title={`Robotech — Episodio ${String(episode.order).padStart(2, '0')}: ${episode.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div className="mt-5 md:mt-6">
            <SectionKicker className="text-xs md:text-sm">
              {`EPISODIO ${String(episode.order).padStart(2, '0')}`}
            </SectionKicker>
            <h1 className="mt-1.5 font-display text-2xl uppercase leading-tight text-text-primary md:text-4xl">
              {episode.title}
            </h1>
            <span className={`mt-2 inline-block ${sagaTagClasses[episode.saga]} text-xs md:text-sm`}>
              {sagaNames[episode.saga]}
            </span>
          </div>

          <EpisodeNav currentOrder={episode.order} />
        </div>

        <EpisodeSidebar currentEpisode={episode} />
      </div>

      <div className="mt-12 flex justify-center border-t border-border pt-10 md:mt-16 md:pt-12">
        <Link
          to="/capitulos"
          className="inline-block border border-primary/60 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] md:px-8 md:py-3.5 md:text-base"
        >
          Ver Todos los Capítulos
        </Link>
      </div>
    </div>
  )
}
