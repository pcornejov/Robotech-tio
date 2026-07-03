interface SectionKickerProps {
  children: string
  className?: string
}

/**
 * Small uppercase "[ ... ]" label used above section titles across the
 * site (Hero, Sagas, Why, FinalCta, NotFound).
 *
 * `className` must include the text size (e.g. `text-sm` for section
 * headers, `text-xs` for card kickers) since callers need different
 * sizes and duplicating a conflicting text-size utility in the base
 * classes would create Tailwind ordering ambiguity.
 */
export default function SectionKicker({ children, className = '' }: SectionKickerProps) {
  return (
    <p className={`font-body font-medium uppercase tracking-[0.2em] text-primary ${className}`}>
      [ {children} ]
    </p>
  )
}
