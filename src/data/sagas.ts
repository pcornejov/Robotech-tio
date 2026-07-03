export interface Saga {
  kicker: string
  name: string
  description: string
  extended: string
}

export const sagas: Saga[] = [
  {
    kicker: 'SAGA 01',
    name: 'Macross Saga',
    description:
      'Primer contacto con lo desconocido. El nacimiento de la Fuerza de Defensa Robotech en medio de una guerra interestelar.',
    extended:
      'Del rescate del SDF-1 a la defensa de la Tierra: el ciclo que sienta las bases de todo lo que sigue, con el Escuadrón Skull y el mando del capitán Gloval como eje de la resistencia inicial.',
  },
  {
    kicker: 'SAGA 02',
    name: 'Robotech Masters',
    description:
      'Una segunda generación de pilotos hereda la guerra. Nuevas amenazas, nueva tecnología, mismo cielo en llamas.',
    extended:
      'El Ejército de la Tierra y la Cruz del Sur toman la primera línea, con el Escuadrón 15 como cara visible de una generación que no vivió la guerra original pero carga con su legado.',
  },
  {
    kicker: 'SAGA 03',
    name: 'The New Generation',
    description:
      'Un mundo devastado y una resistencia que se niega a rendirse. La última fase de la Guerra Robotech.',
    extended:
      'El Grupo Expedicionario, ausente durante la ofensiva de los Masters, regresa a un planeta irreconocible y debe reconstruir la resistencia casi desde cero, con apoyo mínimo del mando central.',
  },
]
