import { NavLink } from 'react-router-dom'
import { navLinks } from './navLinks'

interface MobileMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  id: string
}

/**
 * Mobile nav drawer + its backdrop. Kept mounted at all times and
 * animated with opacity/translate so the open/close transition can run;
 * `pointer-events-none` keeps it inert while hidden.
 */
export default function MobileMenuDrawer({ isOpen, onClose, id }: MobileMenuDrawerProps) {
  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 top-14 z-40 bg-background/70 transition-opacity duration-200 ease-out md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <nav
        id={id}
        aria-label="Navegación principal móvil"
        className={`absolute top-full left-0 z-50 w-full border-b border-border bg-surface-alt [clip-path:polygon(0_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%)] transition-all duration-200 ease-out md:hidden ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        {navLinks.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `block border-l-2 py-4 pl-4 pr-6 font-body text-base uppercase tracking-wide transition-colors duration-150 ${
                index !== navLinks.length - 1 ? 'border-b border-b-border' : ''
              } ${isActive ? 'border-l-accent text-accent' : 'border-l-transparent text-text-secondary'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
