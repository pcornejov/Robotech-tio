import { useMemo, useState } from 'react'
import EpisodeCard from '../components/catalog/EpisodeCard'
import EpisodeSearch from '../components/catalog/EpisodeSearch'
import SagaFilter, { type SagaFilterValue } from '../components/catalog/SagaFilter'
import SectionKicker from '../components/ui/SectionKicker'
import { episodes } from '../data/episodes'

/**
 * Full episode archive: 85 chapters across the three sagas, filterable by
 * saga via a chip group and by free-text search (title or episode number).
 */
export default function Capitulos() {
  const [saga, setSaga] = useState<SagaFilterValue>('all')
  const [query, setQuery] = useState('')

  const filteredEpisodes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return episodes.filter((episode) => {
      if (saga !== 'all' && episode.saga !== saga) return false
      if (!normalizedQuery) return true

      const titleMatch = episode.title?.toLowerCase().includes(normalizedQuery) ?? false
      const orderMatch =
        String(episode.order).includes(normalizedQuery) ||
        String(episode.order).padStart(2, '0').includes(normalizedQuery)

      return titleMatch || orderMatch
    })
  }, [saga, query])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-16 lg:py-20">
      <div className="text-center">
        <SectionKicker className="text-sm">ARCHIVO COMPLETO</SectionKicker>
        <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
          Capítulos
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-text-secondary">
          85 episodios, 3 sagas. La guerra completa, capítulo a capítulo.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <EpisodeSearch value={query} onChange={setQuery} />
      </div>

      <div className="mt-4 md:mt-5">
        <SagaFilter value={saga} onChange={setSaga} />
      </div>

      <p className="sr-only" aria-live="polite">
        {filteredEpisodes.length} episodio{filteredEpisodes.length === 1 ? '' : 's'} encontrado
        {filteredEpisodes.length === 1 ? '' : 's'}
      </p>

      {filteredEpisodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="font-body text-text-secondary">
            {query
              ? <>No encontramos episodios que coincidan con &ldquo;{query}&rdquo;.</>
              : 'No hay episodios disponibles en esta saga por ahora.'}
          </p>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-3 font-body text-sm text-primary hover:text-accent focus-visible:outline-none focus-visible:text-accent"
            >
              Limpiar búsqueda
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard key={episode.order} episode={episode} />
          ))}
        </div>
      )}
    </div>
  )
}
