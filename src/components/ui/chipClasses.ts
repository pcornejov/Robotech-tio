/**
 * Shared chip styling used by SagaFilter's saga chips and the in-page
 * section nav in MechasSagas — kept in one place so tap-target/palette
 * tweaks only need to happen once.
 */
export const baseChipClasses =
  'inline-flex items-center px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-200 border [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] focus-visible:outline-none focus-visible:border-accent md:py-2 md:text-sm'

export const selectedChipClasses =
  'border-accent bg-accent/10 text-accent shadow-[0_0_16px_rgba(255,74,28,0.2)]'

export const unselectedChipClasses =
  'border-border bg-surface text-text-secondary hover:border-primary hover:text-primary'
