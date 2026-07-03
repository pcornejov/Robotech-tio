import type { SagaId } from '../../data/episodes'

export type SagaFilterValue = 'all' | SagaId

interface SagaFilterProps {
  value: SagaFilterValue
  onChange: (value: SagaFilterValue) => void
}

const options: { value: SagaFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'macross', label: 'Macross Saga' },
  { value: 'masters', label: 'Robotech Masters' },
  { value: 'new-generation', label: 'The New Generation' },
]

const baseClasses =
  'inline-flex items-center px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-200 border [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] focus-visible:outline-none focus-visible:border-accent md:text-sm'

const selectedClasses = 'border-accent bg-accent/10 text-accent shadow-[0_0_16px_rgba(255,74,28,0.2)]'
const unselectedClasses = 'border-border bg-surface text-text-secondary hover:border-primary hover:text-primary'

/**
 * Chip-based filter for narrowing the episode grid down to a single saga.
 */
export default function SagaFilter({ value, onChange }: SagaFilterProps) {
  return (
    <div role="group" aria-label="Filtrar por saga" className="flex flex-wrap justify-center gap-2 md:gap-3">
      {options.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
