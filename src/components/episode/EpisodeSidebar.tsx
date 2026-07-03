import { Link } from 'react-router-dom'
import type { Episode } from '../../data/episodes'
import { episodes, sagaNames } from '../../data/episodes'
import SectionKicker from '../ui/SectionKicker'

interface EpisodeSidebarProps {
  currentEpisode: Episode
}

/**
 * Up to 8 episodes from the same saga, excluding the current one.
 * Prioritizes what comes next in narrative order, then fills in with the
 * closest earlier episodes if the current one is near the end of its saga
 * — but the rendered list is always sorted back into ascending order.
 */
function getRelatedEpisodes(current: Episode): Episode[] {
  const sameSaga = episodes.filter((e) => e.saga === current.saga && e.order !== current.order)
  const after = sameSaga.filter((e) => e.order > current.order)
  const before = sameSaga.filter((e) => e.order < current.order).reverse()
  return [...after, ...before].slice(0, 8).sort((a, b) => a.order - b.order)
}

export default function EpisodeSidebar({ currentEpisode }: EpisodeSidebarProps) {
  const related = getRelatedEpisodes(currentEpisode)

  return (
    <aside aria-label="Más episodios de la saga" className="mt-10 lg:mt-0 lg:sticky lg:top-24">
      <SectionKicker className="text-xs">MÁS EPISODIOS</SectionKicker>
      <h2 className="mt-1 font-display text-lg uppercase text-text-primary md:text-xl">
        {sagaNames[currentEpisode.saga]}
      </h2>

      <ul className="mt-4 space-y-2 md:space-y-3">
        {related.map((ep) => (
          <li key={ep.order}>
            {ep.available ? (
              <Link
                to={`/capitulos/${ep.order}`}
                className="group flex gap-3 border border-border bg-surface p-2 transition-colors duration-200 hover:border-primary [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] focus-visible:outline-none focus-visible:border-primary"
              >
                <div className="relative aspect-video w-24 flex-shrink-0 overflow-hidden bg-surface-alt md:w-28">
                  <img
                    src={`https://i.ytimg.com/vi/${ep.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-[0.6]"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center py-0.5">
                  <span className="font-display text-[10px] uppercase tracking-wide text-accent">
                    EP. {String(ep.order).padStart(2, '0')}
                  </span>
                  <p className="mt-0.5 line-clamp-2 font-body text-xs uppercase leading-snug text-text-primary group-hover:text-accent md:text-sm">
                    {ep.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div
                aria-disabled="true"
                className="flex select-none gap-3 border border-border/60 bg-surface/60 p-2 opacity-50 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
              >
                <div className="flex aspect-video w-24 flex-shrink-0 items-center justify-center bg-surface-alt md:w-28">
                  <span className="font-display text-[10px] uppercase tracking-wide text-text-secondary">
                    EP. {String(ep.order).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-col justify-center py-0.5">
                  <p className="font-body text-xs uppercase tracking-wide text-text-secondary">No disponible</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}
