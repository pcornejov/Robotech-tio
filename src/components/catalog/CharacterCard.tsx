import type { Character } from '../../data/characters'
import { sagaAccent } from '../../data/characters'
import { sagaNames, type SagaId } from '../../data/episodes'

interface CharacterCardProps {
  character: Character
}

/**
 * Monogram border color per saga, matching the text accent but applied as a
 * translucent border around the central initials badge.
 */
const monogramBorderClasses: Record<SagaId, string> = {
  macross: 'border-primary/40',
  masters: 'border-accent-dim/40',
  'new-generation': 'border-text-secondary/40',
}

/**
 * Grid card for a single character. Renders an abstract portrait — no real
 * artwork available — built from a monogram, a ghost-letter watermark and a
 * saga-tinted scanline texture. Non-interactive: there is no character
 * detail page in this iteration, so the hover state is purely decorative.
 */
export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, initials, role, saga, bio, factionBadge } = character
  const accent = sagaAccent[saga]

  return (
    <article
      aria-label={`${name}, ${role}`}
      className={`group relative overflow-hidden border border-border bg-surface [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] transition-[border-color,box-shadow] duration-200 ${accent.border} ${accent.glow}`}
    >
      <div className={`relative aspect-[3/4] overflow-hidden ${accent.tint}`}>
        <div className="absolute inset-0 opacity-[0.15] bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,#2A3441_3px,#2A3441_4px)]" />

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -bottom-4 -right-2 font-display font-black leading-none select-none text-[7rem] md:text-[8rem] ${accent.ghostText}`}
        >
          {name.charAt(0)}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex h-20 w-20 items-center justify-center border ${monogramBorderClasses[saga]} [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] bg-background/40 backdrop-blur-[1px] md:h-24 md:w-24`}
          >
            <span className={`font-display font-black text-2xl md:text-3xl ${accent.text}`}>{initials}</span>
          </div>
        </div>

        <span
          className={`absolute left-2 top-2 border border-border bg-background/80 px-2 py-0.5 font-display text-[10px] uppercase tracking-wide backdrop-blur-sm [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] ${accent.text}`}
        >
          {sagaNames[saga]}
        </span>

        {factionBadge ? (
          <span className="absolute right-2 top-2 border border-accent/50 bg-background/80 px-2 py-0.5 font-display text-[10px] uppercase tracking-wide text-accent backdrop-blur-sm [clip-path:polygon(0_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_0)]">
            {factionBadge}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/85 to-transparent px-3 pb-3 pt-8 md:px-4 md:pb-4">
          <h3 className="font-display text-sm uppercase leading-snug text-text-primary transition-colors duration-200 group-hover:text-accent md:text-base">
            {name}
          </h3>
          <p className="mt-1 font-body text-xs text-text-secondary md:text-sm">{role}</p>
        </div>
      </div>

      <div className="border-t border-border p-3 md:p-4">
        <p className="font-body text-xs leading-relaxed text-text-secondary md:text-sm">{bio}</p>
      </div>
    </article>
  )
}
