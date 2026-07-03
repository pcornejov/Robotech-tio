import type { SagaId } from '../../data/episodes'
import { baseChipClasses, selectedChipClasses, unselectedChipClasses } from '../ui/chipClasses'

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
            className={`${baseChipClasses} ${isSelected ? selectedChipClasses : unselectedChipClasses}`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
