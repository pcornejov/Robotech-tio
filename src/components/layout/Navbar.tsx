import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Wordmark from '../ui/Wordmark'
import MobileMenuButton from './MobileMenuButton'
import MobileMenuDrawer from './MobileMenuDrawer'
import { navLinks } from './navLinks'

const MOBILE_MENU_ID = 'mobile-nav-drawer'

/**
 * Sticky top navbar. Desktop (>=768px) shows the real nav links;
 * mobile shows a hamburger that toggles a drawer with the same links.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface">
      <div className="relative mx-auto flex h-14 items-center justify-between px-6 md:h-[72px] md:px-8 lg:px-16">
        <Wordmark className="text-lg font-bold tracking-widest md:text-xl" />

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative pb-1 font-body text-sm font-medium uppercase tracking-wide transition-colors duration-150 hover:text-primary focus-visible:text-primary focus-visible:outline-none ${
                      isActive
                        ? 'border-b-2 border-accent text-accent focus-visible:border-primary'
                        : 'border-b-2 border-transparent text-text-secondary focus-visible:border-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenuButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          controlsId={MOBILE_MENU_ID}
        />

        <MobileMenuDrawer
          id={MOBILE_MENU_ID}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  )
}
