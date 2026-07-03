export type FactionKey = 'rdf' | 'zentradi' | 'masters' | 'invid'

export interface Faction {
  faccionKey: FactionKey
  nombre: string
  sagas: string
  descripcion: string
}

export const factions: Faction[] = [
  {
    faccionKey: 'rdf',
    nombre: 'Fuerza de Defensa Robotech (RDF)',
    sagas: 'Macross Saga · Robotech Masters · The New Generation',
    descripcion:
      'Fuerza militar humana surgida a partir del descubrimiento y la reconstrucción de la nave alienígena que da origen al SDF-1. Reúne a pilotos, oficiales e ingenieros bajo un mismo mando para responder a una amenaza que supera cualquier conflicto terrestre previo. Sus sucesoras — la Cruz del Sur y el Grupo Expedicionario — sostienen la defensa humana en las dos generaciones siguientes de la guerra.',
  },
  {
    faccionKey: 'zentradi',
    nombre: 'Zentradi',
    sagas: 'Macross Saga',
    descripcion:
      'Vasta fuerza militar alienígena, organizada en clanes de guerra y criada exclusivamente para el combate. Su primer contacto con la humanidad, motivado por la nave SDF-1, desata la guerra que da origen a todo el conflicto Robotech. Su exposición a la cultura humana termina siendo tan determinante como la guerra misma.',
  },
  {
    faccionKey: 'masters',
    nombre: 'Robotech Masters',
    sagas: 'Robotech Masters',
    descripcion:
      'Civilización alienígena creadora original del Protoculture y de la tecnología detrás de los Zentradi. Llegan a la Tierra años después del primer conflicto en busca de recuperar esa tecnología perdida, liderando una segunda oleada de la guerra con un mando más jerárquico y rígido que el de sus antiguas tropas clon.',
  },
  {
    faccionKey: 'invid',
    nombre: 'Invid',
    sagas: 'The New Generation',
    descripcion:
      'Especie alienígena que ocupa la Tierra atraída por el Protoculture, transformando el planeta en un territorio bajo control extranjero. Su presencia da origen a la resistencia dispersa y fragmentada que caracteriza la última fase de la guerra.',
  },
]

export interface FactionAccent {
  text: string
  border: string
  borderSolid: string
  bgSolid: string
  glow: string
  tint: string
}

/**
 * Per-faction accent tokens used by MechaCard and FactionCard. Classes are
 * resolved here (not derived via `.replace()` in JSX) so Tailwind's static
 * class scanner can find every variant.
 */
export const factionAccent: Record<FactionKey, FactionAccent> = {
  rdf: {
    text: 'text-primary',
    border: 'hover:border-primary',
    borderSolid: 'border-primary',
    bgSolid: 'bg-primary',
    glow: 'hover:shadow-[0_0_20px_rgba(58,143,183,0.25)]',
    tint: 'bg-primary/5',
  },
  zentradi: {
    text: 'text-accent',
    border: 'hover:border-accent',
    borderSolid: 'border-accent',
    bgSolid: 'bg-accent',
    glow: 'hover:shadow-[0_0_20px_rgba(255,74,28,0.25)]',
    tint: 'bg-accent/5',
  },
  masters: {
    text: 'text-accent-dim',
    border: 'hover:border-accent-dim',
    borderSolid: 'border-accent-dim',
    bgSolid: 'bg-accent-dim',
    glow: 'hover:shadow-[0_0_20px_rgba(184,51,15,0.25)]',
    tint: 'bg-accent-dim/5',
  },
  invid: {
    text: 'text-text-secondary',
    border: 'hover:border-text-secondary',
    borderSolid: 'border-text-secondary',
    bgSolid: 'bg-text-secondary',
    glow: 'hover:shadow-[0_0_18px_rgba(140,155,172,0.2)]',
    tint: 'bg-surface-alt',
  },
}
