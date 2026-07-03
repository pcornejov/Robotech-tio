interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
  controlsId: string
}

/**
 * Hamburger toggle for the mobile nav drawer. The three bars morph into
 * an X (and turn accent-colored) when the drawer is open.
 */
export default function MobileMenuButton({ isOpen, onClick, controlsId }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-border [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] md:hidden"
    >
      <span
        className={`h-0.5 w-5 bg-text-primary transition-all duration-200 ${
          isOpen ? 'translate-y-[7px] rotate-45 bg-accent' : ''
        }`}
      />
      <span
        className={`h-0.5 w-5 bg-text-primary transition-all duration-200 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`h-0.5 w-5 bg-text-primary transition-all duration-200 ${
          isOpen ? '-translate-y-[7px] -rotate-45 bg-accent' : ''
        }`}
      />
    </button>
  )
}
