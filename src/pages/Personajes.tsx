import { useMemo, useState } from 'react'
import CharacterCard from '../components/catalog/CharacterCard'
import SagaFilter, { type SagaFilterValue } from '../components/catalog/SagaFilter'
import SectionKicker from '../components/ui/SectionKicker'
import { characters } from '../data/characters'

/**
 * Character dossier: the twelve protagonists of the three sagas, filterable
 * by saga via the same chip group used on the episode archive.
 */
export default function Personajes() {
  const [saga, setSaga] = useState<SagaFilterValue>('all')

  const filteredCharacters = useMemo(
    () => (saga === 'all' ? characters : characters.filter((character) => character.saga === saga)),
    [saga],
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-16 lg:py-20">
      <div className="text-center">
        <SectionKicker className="text-sm">DOSIER DE PERSONAL</SectionKicker>
        <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
          Personajes
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-text-secondary">
          Pilotos, oficiales y civiles que protagonizan las tres sagas de la Guerra Robotech.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <SagaFilter value={saga} onChange={setSaga} />
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="font-body text-text-secondary">
            No hay personajes disponibles en esta saga por ahora.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:mt-10 md:grid-cols-3 lg:grid-cols-4">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  )
}
