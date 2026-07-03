import type { FactionKey } from './factions'

export interface Mecha {
  codigo: string
  nombre: string
  faccionKey: FactionKey
  faccionLabel: string
  descripcion: string
  modos?: string[]
}

export const mechas: Mecha[] = [
  {
    codigo: 'VF-1',
    nombre: 'VF-1 Valkyrie',
    faccionKey: 'rdf',
    faccionLabel: 'RDF',
    modos: ['FIGHTER', 'GUARDIAN', 'BATTLOID'],
    descripcion:
      'Caza de combate transformable, columna vertebral de las escuadrillas aéreas de la RDF durante la Guerra Macross. Alterna entre un modo de vuelo veloz, un modo de asistencia en tierra y un modo de combate cuerpo a cuerpo, adaptándose a la distancia del enemigo en cada enfrentamiento. Es el mecha más reconocible de la flota humana.',
  },
  {
    codigo: 'REGULT',
    nombre: 'Regult',
    faccionKey: 'zentradi',
    faccionLabel: 'Zentradi',
    descripcion:
      'Unidad de infantería mecanizada producida en masa por la flota Zentradi, pensada para el combate terrestre y el asalto en gran número. Su diseño prioriza la cantidad y la coordinación en enjambre por sobre la sofisticación individual, reflejo de una cultura militar construida en torno a la guerra continua.',
  },
  {
    codigo: 'GLAUG',
    nombre: 'Glaug — Pod de Mando Zentradi',
    faccionKey: 'zentradi',
    faccionLabel: 'Zentradi',
    descripcion:
      'Variante de mando del armamento estándar zentradi, reservada a oficiales al frente de un escuadrón de batalla. Ofrece mejor blindaje y sistemas de coordinación táctica que las unidades rasas, marcando visualmente la jerarquía rígida de las fuerzas Zentradi en el campo.',
  },
  {
    codigo: 'ALPHA',
    nombre: 'Alpha Fighter',
    faccionKey: 'rdf',
    faccionLabel: 'RDF — Cruz del Sur',
    modos: ['FIGHTER', 'BATTLOID'],
    descripcion:
      'Caza transformable de segunda generación empleado por los escuadrones terrestres de la Cruz del Sur durante la ofensiva de los Robotech Masters. Hereda el concepto Veritech pero está optimizado para la defensa planetaria coordinada, combinando con frecuencia con unidades de apoyo blindado.',
  },
  {
    codigo: 'BIOROID',
    nombre: 'Bioroid',
    faccionKey: 'masters',
    faccionLabel: 'Robotech Masters',
    descripcion:
      'Mecha de combate estándar de las fuerzas de los Robotech Masters, pilotado por los clones enviados a recuperar el Protoculture perdido en la Tierra. Su silueta compacta y su blindaje pesado lo diferencian claramente del diseño más esbelto de los Veritech humanos.',
  },
  {
    codigo: 'CYCLONE',
    nombre: 'Cyclone',
    faccionKey: 'rdf',
    faccionLabel: 'Grupo Expedicionario (RDF)',
    modos: ['CICLO', 'ARMADURA'],
    descripcion:
      'Vehículo blindado transformable de uso individual, capaz de pasar de un modo de desplazamiento rápido a una armadura de combate cuerpo a cuerpo. Es el equipo característico del pequeño escuadrón liderado por Scott Bernard en su travesía por una Tierra ocupada por los Invid.',
  },
]
