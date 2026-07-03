import type { Mecha } from '../../data/mechas'
import { factionAccent } from '../../data/factions'

interface MechaCardProps {
  mecha: Mecha
}

/**
 * Grid card for a single mecha. Purely informational — not a Link, does not
 * navigate anywhere. Mirrors the visual language of CharacterCard but with a
 * geometric silhouette placeholder instead of a monogram.
 */
export default function MechaCard({ mecha }: MechaCardProps) {
  const { codigo, nombre, faccionKey, faccionLabel, descripcion, modos } = mecha
  const accent = factionAccent[faccionKey]

  return (
    <article
      aria-label={`${nombre}, ${faccionLabel}`}
      className={`group relative overflow-hidden border border-border bg-surface [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] transition-[border-color,box-shadow] duration-200 ${accent.border} ${accent.glow}`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${accent.tint}`}>
        <div className="absolute inset-0 opacity-[0.15] bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,#2A3441_3px,#2A3441_4px)]" />
        <span className={`absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 ${accent.borderSolid}/60`} />
        <span className={`absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 ${accent.borderSolid}/60`} />
        <span className={`absolute left-2 bottom-2 h-3 w-3 border-l-2 border-b-2 ${accent.borderSolid}/60`} />
        <span className={`absolute right-2 bottom-2 h-3 w-3 border-r-2 border-b-2 ${accent.borderSolid}/60`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center md:h-20 md:w-20">
            <div className={`h-10 w-10 rotate-45 border-2 bg-background/40 md:h-12 md:w-12 ${accent.borderSolid}/70`} />
            <div className={`absolute h-[3px] w-full ${accent.bgSolid}/70`} />
          </div>
        </div>
        <span
          className={`absolute left-2 top-2 border border-border bg-background/80 px-2 py-0.5 font-display text-[10px] uppercase tracking-wide backdrop-blur-sm [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] ${accent.text}`}
        >
          {codigo}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/85 to-transparent px-3 pb-3 pt-8 md:px-4 md:pb-4">
          <h3 className="font-display text-sm uppercase leading-snug text-text-primary transition-colors duration-200 group-hover:text-accent md:text-base">
            {nombre}
          </h3>
          <p className={`mt-1 font-body text-xs md:text-sm ${accent.text}`}>{faccionLabel}</p>
        </div>
      </div>

      <div className="border-t border-border p-3 md:p-4">
        <p className="font-body text-xs leading-relaxed text-text-secondary md:text-sm">{descripcion}</p>
        {modos && modos.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {modos.map((modo) => (
              <span
                key={modo}
                className="border border-border px-1.5 py-0.5 font-display text-[9px] uppercase tracking-wide text-text-secondary"
              >
                {modo}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
