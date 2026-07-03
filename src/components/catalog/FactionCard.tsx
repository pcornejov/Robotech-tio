import type { Faction } from '../../data/factions'
import { factionAccent } from '../../data/factions'

interface FactionCardProps {
  faction: Faction
}

/**
 * Grid card for a single faction, with a solid left accent bar in place of
 * the border/glow treatment used elsewhere for portrait cards.
 */
export default function FactionCard({ faction }: FactionCardProps) {
  const { faccionKey, nombre, sagas, descripcion } = faction
  const accent = factionAccent[faccionKey]

  return (
    <article
      aria-label={nombre}
      className={`group relative border border-border bg-surface p-5 pl-6 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] transition-[border-color,box-shadow] duration-200 md:p-6 md:pl-7 ${accent.border} ${accent.glow}`}
    >
      <span className={`absolute left-0 top-0 h-full w-1 ${accent.bgSolid}`} aria-hidden="true" />
      <h3 className="font-display text-lg uppercase text-text-primary md:text-xl">{nombre}</h3>
      <p className={`mt-1 font-body text-xs font-semibold uppercase tracking-wide ${accent.text}`}>{sagas}</p>
      <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary md:text-base">{descripcion}</p>
    </article>
  )
}
