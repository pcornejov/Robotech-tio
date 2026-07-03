import Wordmark from '../ui/Wordmark'

/**
 * Sticky top navbar. Mobile shows only the wordmark; desktop reserves
 * empty space on the right for future nav links.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface">
      <div className="mx-auto flex h-14 items-center justify-between px-6 md:h-[72px] md:px-8 lg:px-16">
        <Wordmark className="text-lg font-bold tracking-widest md:text-xl" />
        <div aria-hidden="true" className="hidden md:block" />
      </div>
    </header>
  )
}
