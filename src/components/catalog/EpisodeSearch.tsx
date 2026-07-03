import type { ChangeEvent } from 'react'

interface EpisodeSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function EpisodeSearch({ value, onChange }: EpisodeSearchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <label htmlFor="episode-search" className="sr-only">
        Buscar episodio por título o número
      </label>
      <input
        id="episode-search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Buscar por título o número…"
        autoComplete="off"
        className="w-full border border-border bg-surface px-4 py-2.5 font-body text-sm text-text-primary placeholder:text-text-secondary [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_16px_rgba(58,143,183,0.2)] md:text-base"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 font-display text-sm text-text-secondary transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
