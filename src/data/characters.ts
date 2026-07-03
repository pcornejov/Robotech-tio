import type { SagaId } from './episodes'

export interface Character {
  id: string
  name: string
  initials: string
  role: string
  saga: SagaId
  bio: string
  factionBadge?: string
}

export const characters: Character[] = [
  {
    id: 'rick-hunter',
    name: 'Rick Hunter',
    initials: 'RH',
    role: 'Piloto Veritech — Escuadrón Skull',
    saga: 'macross',
    bio: 'Piloto civil de acrobacias aéreas que termina alistado en la Fuerza de Defensa Robotech tras el ataque al SDF-1. Su trayectoria, de civil imprudente a oficial del Escuadrón Skull, atraviesa buena parte del primer ciclo de la guerra.',
  },
  {
    id: 'lisa-hayes',
    name: 'Lisa Hayes',
    initials: 'LH',
    role: 'Primera Oficial — Puente del SDF-1',
    saga: 'macross',
    bio: 'Oficial de puente a cargo de la coordinación táctica del SDF-1 durante los primeros enfrentamientos con la flota Zentradi. Su disciplina y criterio la posicionan como una de las figuras de mando más sólidas de la nave.',
  },
  {
    id: 'lynn-minmei',
    name: 'Lynn Minmei',
    initials: 'LM',
    role: 'Cantante — Ícono cultural civil',
    saga: 'macross',
    bio: 'Joven civil que se convierte en cantante popular entre la tripulación y los refugiados del SDF-1. Su música se vuelve un factor inesperado dentro del conflicto con los Zentradi, hasta entonces ajenos a la cultura humana.',
  },
  {
    id: 'roy-fokker',
    name: 'Roy Fokker',
    initials: 'RF',
    role: 'Comandante — Escuadrón Skull',
    saga: 'macross',
    bio: 'Comandante veterano al frente del Escuadrón Skull y mentor directo de varios pilotos jóvenes de la RDF, incluido Rick Hunter. Su experiencia de combate lo convierte en referencia táctica durante los primeros compases de la guerra.',
  },
  {
    id: 'max-sterling',
    name: 'Max Sterling',
    initials: 'MS',
    role: 'Piloto Veritech de élite — Escuadrón Skull',
    saga: 'macross',
    bio: 'Piloto de precisión reconocido dentro del Escuadrón Skull por su habilidad excepcional en combate Veritech. Su enfrentamiento en batalla con la piloto Zentradi Miriya deriva en uno de los vínculos más singulares de la guerra.',
  },
  {
    id: 'miriya-sterling',
    name: 'Miriya Parina',
    initials: 'MP',
    role: 'Ex piloto de élite — Fuerzas Zentradi',
    saga: 'macross',
    factionBadge: 'Ex-Zentradi',
    bio: 'Piloto de élite de la flota Zentradi, entrenada para el combate desde su creación. Su enfrentamiento directo con Max Sterling marca un quiebre en su trayectoria y la acerca, con el tiempo, a las fuerzas humanas.',
  },
  {
    id: 'dana-sterling',
    name: 'Dana Sterling',
    initials: 'DS',
    role: 'Comandante — Escuadrón 15 (Cadetes Marrones)',
    saga: 'masters',
    factionBadge: 'Cruz del Sur',
    bio: 'Al mando del Escuadrón 15 del Ejército de la Tierra, lidera a un grupo de cadetes jóvenes durante la ofensiva de los Robotech Masters. Su carácter decidido y su origen singular la distinguen dentro de la cadena de mando.',
  },
  {
    id: 'bowie-grant',
    name: 'Bowie Grant',
    initials: 'BG',
    role: 'Piloto y músico — Escuadrón 15',
    saga: 'masters',
    bio: 'Integrante del Escuadrón 15 con formación tanto militar como musical. Su perfil sensible contrasta con la dureza del frente de batalla contra los clones Robotech Masters.',
  },
  {
    id: 'zor-prime',
    name: 'Zor Prime',
    initials: 'ZP',
    role: 'Clon de mando — Robotech Masters',
    saga: 'masters',
    factionBadge: 'Robotech Masters',
    bio: 'Clon creado por los Robotech Masters y enviado a la Tierra como parte de su ofensiva. Su contacto con recuerdos ligados al Protoculture original genera una tensión creciente entre su misión y su identidad.',
  },
  {
    id: 'scott-bernard',
    name: 'Scott Bernard',
    initials: 'SB',
    role: 'Líder — Escuadrón Cometa Fantasma',
    saga: 'new-generation',
    bio: 'Oficial del Grupo Expedicionario que regresa a una Tierra ocupada por los Invid al mando de un pequeño escuadrón de reconocimiento. Su determinación por cumplir la misión lo convierte en el eje narrativo de este ciclo.',
  },
  {
    id: 'rand',
    name: 'Rand',
    initials: 'RA',
    role: 'Explorador y mecánico — Grupo de Scott Bernard',
    saga: 'new-generation',
    bio: 'Sobreviviente civil de la Tierra ocupada que se une al grupo de Scott Bernard como guía y mecánico. Su conocimiento del terreno resulta clave para moverse en un planeta bajo control Invid.',
  },
  {
    id: 'annie-labelle',
    name: 'Annie LaBelle',
    initials: 'AL',
    role: 'Integrante más joven — Grupo de Scott Bernard',
    saga: 'new-generation',
    bio: 'La más joven del grupo liderado por Scott Bernard, se suma a la resistencia tras perder su hogar en la ocupación Invid. Su energía y curiosidad aportan un contrapunto al tono sombrío del frente de batalla.',
  },
]

interface SagaAccent {
  text: string
  border: string
  glow: string
  ghostText: string
  tint: string
}

/**
 * Per-saga accent tokens used by CharacterCard for the border/glow hover
 * state, ghost-letter watermark, and portrait background tint.
 */
export const sagaAccent: Record<SagaId, SagaAccent> = {
  macross: {
    text: 'text-primary',
    border: 'hover:border-primary',
    glow: 'hover:shadow-[0_0_20px_rgba(58,143,183,0.25)]',
    ghostText: 'text-primary/10',
    tint: 'bg-primary/5',
  },
  masters: {
    text: 'text-accent-dim-text',
    border: 'hover:border-accent-dim',
    glow: 'hover:shadow-[0_0_20px_rgba(184,51,15,0.25)]',
    ghostText: 'text-accent-dim/10',
    tint: 'bg-accent-dim/5',
  },
  'new-generation': {
    text: 'text-text-secondary',
    border: 'hover:border-text-secondary',
    glow: 'hover:shadow-[0_0_18px_rgba(140,155,172,0.2)]',
    ghostText: 'text-text-secondary/10',
    tint: 'bg-surface-alt',
  },
}
