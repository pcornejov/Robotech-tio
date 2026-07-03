import { Link } from 'react-router-dom'
import { episodes } from '../../data/episodes'

interface EpisodeNavProps {
  currentOrder: number
}

/**
 * Previous/next navigation by episode number (not by availability — the
 * destination page already knows how to render its own "not available"
 * state). Used both by the player's happy path and by the "not available"
 * error state, so a viewer is never stranded inside the Robotech Masters
 * gap (episodes 37-60).
 */
export default function EpisodeNav({ currentOrder }: EpisodeNavProps) {
  const prevEp = episodes.find((e) => e.order === currentOrder - 1)
  const nextEp = episodes.find((e) => e.order === currentOrder + 1)

  return (
    <nav
      aria-label="Navegación entre episodios"
      className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-5 md:mt-10 md:gap-4 md:pt-6"
    >
      {currentOrder > 1 ? (
        <Link
          to={`/capitulos/${currentOrder - 1}`}
          aria-label={`Ir al episodio anterior: Episodio ${currentOrder - 1}${prevEp?.available ? `, ${prevEp.title}` : ', no disponible'}`}
          className="group flex items-center gap-2 border border-border bg-surface px-3 py-3 font-body transition-colors duration-200 hover:border-primary [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] focus-visible:outline-none focus-visible:border-primary md:px-4 md:py-4"
        >
          <span aria-hidden="true" className="text-lg text-text-secondary group-hover:text-primary">
            ←
          </span>
          <span className="flex min-w-0 flex-col items-start">
            <span className="text-[10px] uppercase tracking-wide text-text-secondary">Anterior</span>
            <span className="truncate text-sm uppercase text-text-primary group-hover:text-primary md:text-base">
              Episodio {String(currentOrder - 1).padStart(2, '0')}
            </span>
          </span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}

      {currentOrder < 85 ? (
        <Link
          to={`/capitulos/${currentOrder + 1}`}
          aria-label={`Ir al episodio siguiente: Episodio ${currentOrder + 1}${nextEp?.available ? `, ${nextEp.title}` : ', no disponible'}`}
          className="group flex items-center justify-end gap-2 border border-border bg-surface px-3 py-3 font-body transition-colors duration-200 hover:border-primary [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] focus-visible:outline-none focus-visible:border-primary md:px-4 md:py-4"
        >
          <span className="flex min-w-0 flex-col items-end">
            <span className="text-[10px] uppercase tracking-wide text-text-secondary">Siguiente</span>
            <span className="truncate text-sm uppercase text-text-primary group-hover:text-primary md:text-base">
              Episodio {String(currentOrder + 1).padStart(2, '0')}
            </span>
          </span>
          <span aria-hidden="true" className="text-lg text-text-secondary group-hover:text-primary">
            →
          </span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </nav>
  )
}
