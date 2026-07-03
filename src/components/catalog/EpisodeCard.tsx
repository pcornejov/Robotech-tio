import { Link } from 'react-router-dom'
import type { Episode } from '../../data/episodes'
import { sagaNames, sagaTagClasses } from '../../data/episodes'
import Wordmark from '../ui/Wordmark'

interface EpisodeCardProps {
  episode: Episode
}

/**
 * Grid card for a single episode. Renders a clickable thumbnail card when
 * the episode is available, or a dimmed, non-interactive placeholder when
 * it isn't (Robotech Masters gap in the source playlist).
 */
export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const episodeLabel = `EP. ${String(episode.order).padStart(2, '0')}`

  if (!episode.available) {
    return (
      <div
        aria-disabled="true"
        className="block cursor-default select-none overflow-hidden border border-border/60 bg-surface/60 opacity-50 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]"
      >
        <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[repeating-linear-gradient(135deg,#1C2530_0px,#1C2530_10px,#131A24_10px,#131A24_20px)]">
          <Wordmark className="scale-75 text-sm opacity-20" />
          <span className="absolute left-2 top-2 border border-border bg-background/60 px-2 py-0.5 font-display text-[11px] uppercase tracking-wide text-text-secondary">
            {episodeLabel}
          </span>
        </div>
        <div className="p-3 md:p-4">
          <span className={`${sagaTagClasses[episode.saga]} text-text-secondary`}>
            {sagaNames[episode.saga]}
          </span>
          <p className="mt-1.5 font-body text-sm uppercase tracking-wide text-text-secondary">
            No disponible
          </p>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={`/capitulos/${episode.order}`}
      className="group block overflow-hidden border border-border bg-surface [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-alt">
        <img
          src={`https://i.ytimg.com/vi/${episode.id}/hqdefault.jpg`}
          alt={episode.title ?? ''}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-[0.45]"
        />
        <span className="absolute left-2 top-2 border border-accent/50 bg-background/80 px-2 py-0.5 font-display text-[11px] uppercase tracking-wide text-accent backdrop-blur-sm [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]">
          {episodeLabel}
        </span>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-background/60 text-accent shadow-[0_0_16px_rgba(255,74,28,0.4)]">
            ▶
          </span>
        </span>
      </div>
      <div className="p-3 md:p-4">
        <span className={sagaTagClasses[episode.saga]}>{sagaNames[episode.saga]}</span>
        <h3 className="mt-1.5 line-clamp-2 font-display text-sm uppercase leading-snug text-text-primary transition-colors duration-200 group-hover:text-accent md:text-base">
          {episode.title}
        </h3>
      </div>
    </Link>
  )
}
