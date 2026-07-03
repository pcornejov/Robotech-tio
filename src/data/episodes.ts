export type SagaId = 'macross' | 'masters' | 'new-generation'

export interface Episode {
  order: number
  id: string | null
  title: string | null
  saga: SagaId
  available: boolean
}

/**
 * Fuente: playlist pública de YouTube (85 capítulos totales). 25 episodios
 * (32 y 37-60, correspondientes a Robotech Masters) figuran como no
 * disponibles en la playlist de origen y no tienen id/título reales.
 */
export const episodes: Episode[] = [
  { order: 1, id: 'MfD32wXP7gY', title: 'El Señuelo', saga: 'macross', available: true },
  { order: 2, id: 'q59c_FDgvAI', title: 'Cuenta Regresiva', saga: 'macross', available: true },
  { order: 3, id: 'DVmhOXeHuk4', title: 'Pliegue Espacial', saga: 'macross', available: true },
  { order: 4, id: 'l_vAnAdYil8', title: 'La Larga Espera', saga: 'macross', available: true },
  { order: 5, id: 'qZKyZ4hmVDQ', title: 'Transformación', saga: 'macross', available: true },
  { order: 6, id: 'jELaRCkESsE', title: 'Blitzkrieg', saga: 'macross', available: true },
  { order: 7, id: 'pf3gKfTY6oQ', title: 'Hasta la vista, Marte', saga: 'macross', available: true },
  { order: 8, id: 'blO5NUlRgyY', title: 'Dulces Dieciséis', saga: 'macross', available: true },
  { order: 9, id: 'HarDT-jOkPM', title: 'Señorita Macross', saga: 'macross', available: true },
  { order: 10, id: '50SAyx2Jp8U', title: 'Juego a ciegas', saga: 'macross', available: true },
  { order: 11, id: '-n-bFlJ67w8', title: 'Primer contacto', saga: 'macross', available: true },
  { order: 12, id: 'zcX6mikOx-c', title: 'El gran escape', saga: 'macross', available: true },
  { order: 13, id: 'sZhxEpcJLy8', title: 'Viento azul', saga: 'macross', available: true },
  { order: 14, id: 'RxKGPhusXlo', title: 'El informe de Gloval', saga: 'macross', available: true },
  { order: 15, id: 'rXJWqF6F-eA', title: 'El regreso a casa', saga: 'macross', available: true },
  { order: 16, id: '1qv141rFx0w', title: 'Grito de batalla', saga: 'macross', available: true },
  { order: 17, id: 'lyKIIp7oi2A', title: 'Fantasmas', saga: 'macross', available: true },
  { order: 18, id: 'X4GRp5MJw3I', title: 'Adiós, buen amigo', saga: 'macross', available: true },
  { order: 19, id: 'p3SxQjGVyoE', title: 'Punto de ebullición', saga: 'macross', available: true },
  { order: 20, id: '4aoEvutnyHY', title: 'El paraíso perdido', saga: 'macross', available: true },
  { order: 21, id: '4X2KRe_Tc5A', title: 'Un nuevo romance', saga: 'macross', available: true },
  { order: 22, id: 'zFlANWH6RmE', title: 'Himno de batalla', saga: 'macross', available: true },
  { order: 23, id: 'yYpQLlU7GYM', title: 'Temerario', saga: 'macross', available: true },
  { order: 24, id: 'HgBNYaofFvs', title: 'La confrontación', saga: 'macross', available: true },
  { order: 25, id: 'sSFOJj_QRZs', title: 'Campanas nupciales', saga: 'macross', available: true },
  { order: 26, id: 'kukElokdNjc', title: 'El mensajero', saga: 'macross', available: true },
  { order: 27, id: 'BOyeG04wy88', title: 'La fuerza de las armas', saga: 'macross', available: true },
  { order: 28, id: 'FdJqllUr8kU', title: 'El blues de la reconstrucción', saga: 'macross', available: true },
  { order: 29, id: '6RUE1lIYxrA', title: 'Los maestros de la robotecnia', saga: 'macross', available: true },
  { order: 30, id: '9Ox191GKNl8', title: 'Viva Miriya', saga: 'macross', available: true },
  { order: 31, id: 'a5cfbDlAgOI', title: 'La Venganza de Khyron', saga: 'macross', available: true },
  { order: 32, id: null, title: null, saga: 'macross', available: false },
  { order: 33, id: '4A0R37-PR64', title: 'Una noche lluviosa', saga: 'macross', available: true },
  { order: 34, id: 'SpKSPjdJPh0', title: 'Tiempo privado', saga: 'macross', available: true },
  { order: 35, id: 'rs7B8XPKBCA', title: 'Saludos de estación', saga: 'macross', available: true },
  { order: 36, id: 'WKkeu6G8YeY', title: 'Hasta las estrellas', saga: 'macross', available: true },
  { order: 37, id: null, title: null, saga: 'masters', available: false },
  { order: 38, id: null, title: null, saga: 'masters', available: false },
  { order: 39, id: null, title: null, saga: 'masters', available: false },
  { order: 40, id: null, title: null, saga: 'masters', available: false },
  { order: 41, id: null, title: null, saga: 'masters', available: false },
  { order: 42, id: null, title: null, saga: 'masters', available: false },
  { order: 43, id: null, title: null, saga: 'masters', available: false },
  { order: 44, id: null, title: null, saga: 'masters', available: false },
  { order: 45, id: null, title: null, saga: 'masters', available: false },
  { order: 46, id: null, title: null, saga: 'masters', available: false },
  { order: 47, id: null, title: null, saga: 'masters', available: false },
  { order: 48, id: null, title: null, saga: 'masters', available: false },
  { order: 49, id: null, title: null, saga: 'masters', available: false },
  { order: 50, id: null, title: null, saga: 'masters', available: false },
  { order: 51, id: null, title: null, saga: 'masters', available: false },
  { order: 52, id: null, title: null, saga: 'masters', available: false },
  { order: 53, id: null, title: null, saga: 'masters', available: false },
  { order: 54, id: null, title: null, saga: 'masters', available: false },
  { order: 55, id: null, title: null, saga: 'masters', available: false },
  { order: 56, id: null, title: null, saga: 'masters', available: false },
  { order: 57, id: null, title: null, saga: 'masters', available: false },
  { order: 58, id: null, title: null, saga: 'masters', available: false },
  { order: 59, id: null, title: null, saga: 'masters', available: false },
  { order: 60, id: null, title: null, saga: 'masters', available: false },
  { order: 61, id: 'iVRxcyKduN0', title: 'La invasión Invid', saga: 'new-generation', available: true },
  { order: 62, id: 'iANLaBY3sUY', title: 'La ciudad perdida', saga: 'new-generation', available: true },
  { order: 63, id: '_M5SdzwWj3k', title: 'El soldado solitario', saga: 'new-generation', available: true },
  { order: 64, id: 'C1ZZ1dyc0jY', title: 'Supervivencia', saga: 'new-generation', available: true },
  { order: 65, id: 'rlayW1xOlf8', title: 'A escena', saga: 'new-generation', available: true },
  { order: 66, id: 'A95NmXLVx0o', title: 'Tiempos duros', saga: 'new-generation', available: true },
  { order: 67, id: 'DzxaXmS9QWU', title: 'Héroe de papel', saga: 'new-generation', available: true },
  { order: 68, id: 'r_u5WWoKj5Q', title: 'Elogio', saga: 'new-generation', available: true },
  { order: 69, id: 'jlCnG4vszuY', title: 'El foso del génesis', saga: 'new-generation', available: true },
  { order: 70, id: 'DqJIpc8WfV8', title: 'Bienvenida Marlene', saga: 'new-generation', available: true },
  { order: 71, id: 'ZBtqZgqCl50', title: 'La ruta secreta', saga: 'new-generation', available: true },
  { order: 72, id: '0BN1L6sKVZA', title: 'La fortaleza', saga: 'new-generation', available: true },
  { order: 73, id: 'EsE2rMvcIws', title: 'Tormenta de arena', saga: 'new-generation', available: true },
  { order: 74, id: '4O4LQNQsbcE', title: 'La boda de Annie', saga: 'new-generation', available: true },
  { order: 75, id: 'SNhLKn4KEb4', title: 'Caminos separados', saga: 'new-generation', available: true },
  { order: 76, id: 'YfdGVQpbyFo', title: 'Metamorfosis', saga: 'new-generation', available: true },
  { order: 77, id: 'LZVa7XEEDe0', title: 'Sol de medianoche', saga: 'new-generation', available: true },
  { order: 78, id: 'pjQaXd-Ci6U', title: 'El pueblo fantasma', saga: 'new-generation', available: true },
  { order: 79, id: 'wCGEygbLer8', title: 'Congelación', saga: 'new-generation', available: true },
  { order: 80, id: 'hNAJlLMFE_g', title: 'Blues de cumpleaños', saga: 'new-generation', available: true },
  { order: 81, id: 'TV6nUAJnH3Q', title: 'El Pistolero', saga: 'new-generation', available: true },
  { order: 82, id: 't4B398j15Dg', title: 'La gran Manzana', saga: 'new-generation', available: true },
  { order: 83, id: 'ndgKeYastLI', title: 'Punto Reflex', saga: 'new-generation', available: true },
  { order: 84, id: 'xH1xDHUp3GA', title: 'Oscuro final', saga: 'new-generation', available: true },
  { order: 85, id: 'xOUL4NVAt2k', title: 'Sinfonía de luz', saga: 'new-generation', available: true },
]

export const sagaNames: Record<SagaId, string> = {
  macross: 'Macross Saga',
  masters: 'Robotech Masters',
  'new-generation': 'The New Generation',
}

/**
 * Saga tag text color, shared across EpisodeCard, the episode player's
 * error states and its info block.
 */
export const sagaTagClasses: Record<SagaId, string> = {
  macross: 'inline-block text-[10px] font-semibold uppercase tracking-wide text-primary',
  masters: 'inline-block text-[10px] font-semibold uppercase tracking-wide text-accent-dim',
  'new-generation': 'inline-block text-[10px] font-semibold uppercase tracking-wide text-text-secondary',
}
