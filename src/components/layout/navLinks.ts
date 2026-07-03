export interface NavLinkItem {
  to: string
  label: string
}

/**
 * Single source of truth for the primary navigation, shared between the
 * desktop nav and the mobile drawer.
 */
export const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Inicio' },
  { to: '/capitulos', label: 'Capítulos' },
  { to: '/personajes', label: 'Personajes' },
  { to: '/mechas-sagas', label: 'Mechas y Sagas' },
]
