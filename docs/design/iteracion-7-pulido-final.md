# Iteración 7 (final) — Pulido general

Spec de auditoría y diseño para el pulido final de Robotech Archivo. No introduce dependencias
nuevas (nada de `react-helmet`, librerías de íconos, etc.) ni cambia el sistema de diseño — todo
se resuelve con Tailwind, HTML semántico y los tokens de color/tipografía ya existentes en
`tailwind.config.js`, salvo un único token de color nuevo justificado en la sección 4 (contraste).

Todos los hallazgos de este documento están verificados leyendo el código real del repo
(`src/**`, `index.html`, `public/`) a fecha de iteración 6 — nada está inventado; donde no
encontré problemas lo digo explícitamente en vez de rellenar la sección.

---

## 1. Buscador de capítulos

**Archivos**: nuevo componente `src/components/catalog/EpisodeSearch.tsx`, cambios en
`src/pages/Capitulos.tsx`.

### Dónde va

Justo **encima** de `SagaFilter`, centrado, como un segundo bloque dentro del mismo header de la
página — no al lado de los chips (a 320px de ancho no entran uno junto al otro sin apretarse).
Estructura final del header de `Capitulos.tsx`:

```
SectionKicker "ARCHIVO COMPLETO"
h1 "Capítulos"
p  "85 episodios, 3 sagas..."
[ EpisodeSearch ]        ← nuevo, mt-8 md:mt-10
[ SagaFilter ]            ← ya existe, mt-4 md:mt-5 (antes era mt-8/mt-10 respecto al párrafo;
                              ahora ese margen lo hereda el buscador y el filtro queda pegado
                              debajo de él con menos separación)
[ grid de episodios ]
```

### Componente `EpisodeSearch.tsx`

Input de texto libre con la misma estética HUD (chamfer, borde, `focus-visible:border-primary`)
que el resto del sitio. Incluye label visualmente oculto (accesibilidad), y un botón "limpiar"
que sólo aparece cuando hay texto:

```tsx
import type { ChangeEvent } from 'react'

interface EpisodeSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function EpisodeSearch({ value, onChange }: EpisodeSearchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <label htmlFor="episode-search" className="sr-only">
        Buscar episodio por título o número
      </label>
      <input
        id="episode-search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Buscar por título o número…"
        autoComplete="off"
        className="w-full border border-border bg-surface px-4 py-2.5 font-body text-sm text-text-primary placeholder:text-text-secondary [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_16px_rgba(58,143,183,0.2)] md:text-base"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 font-display text-sm text-text-secondary transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
```

Notas de diseño:
- `type="search"` (no `text`) por semántica correcta y para que móviles muestren teclado con
  tecla "buscar"/"listo".
- Sin ícono de lupa: no hay librería de íconos en el proyecto y un emoji 🔍 desentonaría con el
  lenguaje visual (glifos unicode simples tipo `←`/`→`/`▶`, nunca emoji). El placeholder solo es
  suficiente.
- `max-w-sm` centra el input sin que ocupe todo el ancho en desktop; en mobile ya es `w-full`
  dentro de ese `max-w-sm`, así que se ve bien en 320px también.

### Lógica de filtrado combinado en `Capitulos.tsx`

```tsx
import { useMemo, useState } from 'react'
import EpisodeCard from '../components/catalog/EpisodeCard'
import EpisodeSearch from '../components/catalog/EpisodeSearch'
import SagaFilter, { type SagaFilterValue } from '../components/catalog/SagaFilter'
import SectionKicker from '../components/ui/SectionKicker'
import { episodes } from '../data/episodes'

export default function Capitulos() {
  const [saga, setSaga] = useState<SagaFilterValue>('all')
  const [query, setQuery] = useState('')

  const filteredEpisodes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return episodes.filter((episode) => {
      if (saga !== 'all' && episode.saga !== saga) return false
      if (!normalizedQuery) return true

      const titleMatch = episode.title?.toLowerCase().includes(normalizedQuery) ?? false
      const orderMatch =
        String(episode.order).includes(normalizedQuery) ||
        String(episode.order).padStart(2, '0').includes(normalizedQuery)

      return titleMatch || orderMatch
    })
  }, [saga, query])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-16 lg:py-20">
      <div className="text-center">
        <SectionKicker className="text-sm">ARCHIVO COMPLETO</SectionKicker>
        <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
          Capítulos
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-text-secondary">
          85 episodios, 3 sagas. La guerra completa, capítulo a capítulo.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <EpisodeSearch value={query} onChange={setQuery} />
      </div>

      <div className="mt-4 md:mt-5">
        <SagaFilter value={saga} onChange={setSaga} />
      </div>

      <p className="sr-only" aria-live="polite">
        {filteredEpisodes.length} episodio{filteredEpisodes.length === 1 ? '' : 's'} encontrado
        {filteredEpisodes.length === 1 ? '' : 's'}
      </p>

      {filteredEpisodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="font-body text-text-secondary">
            {query
              ? <>No encontramos episodios que coincidan con “{query}”.</>
              : 'No hay episodios disponibles en esta saga por ahora.'}
          </p>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-3 font-body text-sm text-primary hover:text-accent focus-visible:outline-none focus-visible:text-accent"
            >
              Limpiar búsqueda
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard key={episode.order} episode={episode} />
          ))}
        </div>
      )}
    </div>
  )
}
```

Detalles de comportamiento:
- Filtrado 100% client-side, sin debounce — 85 items es trivial para `Array.filter` en cada
  keystroke, un `setTimeout`/debounce añadiría complejidad sin beneficio perceptible.
- Búsqueda por **número** acepta tanto `"7"` como `"07"` (compara contra ambas formas del
  `order`), y por **título** con `includes` case-insensitive simple (no hace falta normalizar
  acentos/ñ para 85 títulos curados a mano).
- Episodios no disponibles (`title: null`) no rompen la búsqueda por texto: el `?.` con fallback
  `?? false` los excluye de un match por título, pero siguen matcheando por número si el usuario
  busca "37", por ejemplo — coherente con que `EpisodeCard` ya sabe renderizar su placeholder
  "No disponible" para esos casos.
- El bloque `aria-live="polite"` anuncia a lectores de pantalla cuántos resultados quedan tras
  cada cambio de filtro/búsqueda, sin alterar el layout visual (`sr-only`).
- El estado vacío reutiliza el bloque ya existente, solo cambia el copy condicionalmente según si
  hay una búsqueda activa, y agrega un botón "Limpiar búsqueda" quick-exit cuando aplica.

---

## 2. Auditoría responsive / mobile

Revisé cada página y componente contra el rango 320–375px. Tres hallazgos reales, el resto del
sitio ya maneja bien mobile (grids con `grid-cols-2` en catálogos, `truncate`/`line-clamp-2`/
`min-w-0` ya presentes donde hacen falta en `EpisodeNav.tsx` y `EpisodeSidebar.tsx`, botones
`Button.tsx` con `py-3` que ya cumplen tamaño de tap objetivo, etc.).

### 2a. Riesgo de wrap/clipping del wordmark en el Navbar a 320–360px

**Archivo**: `src/components/layout/Navbar.tsx`, línea 36.

El wordmark se renderiza con `<Wordmark className="text-lg font-bold tracking-widest ...">`
dentro de una fila de altura fija (`h-14`, sin `overflow-visible` ni auto-altura) y sin
`whitespace-nowrap`. En una pantalla de 320px, el contenedor deja disponibles ~232px de ancho
para el wordmark después de restar `px-6` (48px) y el botón hamburguesa (40px). "ROBOTECH
ARCHIVO" en Orbitron bold con `tracking-widest` (0.1em extra por carácter) está muy cerca de ese
límite. Si el texto llega a envolver en dos líneas, la fila de `h-14` con `items-center` no tiene
protección — el texto se saldría verticalmente del navbar en vez de recortarse, empujando o
solapando visualmente el botón hamburguesa y cruzando el `border-b` del header.

No pude renderizar el sitio para confirmar el corte exacto en píxeles, pero el fix es de costo
cero y correcto en cualquier caso: forzar una sola línea y reducir el tracking en el breakpoint
más chico.

```tsx
<Wordmark className="whitespace-nowrap text-base tracking-wide sm:text-lg sm:tracking-widest md:text-xl" />
```

### 2b. Tap target del botón hamburguesa

**Archivo**: `src/components/layout/MobileMenuButton.tsx`, línea 19.

`h-10 w-10` = 40×40px. Cumple el mínimo AA de 24×24px (WCAG 2.5.8) pero queda por debajo del
tamaño de 44×44px recomendado para el único botón de navegación en mobile. Fix simple:

```tsx
className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-border [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] md:hidden"
```
(`h-10 w-10` → `h-11 w-11`, 44×44px.)

### 2c. Tap target de los chips (`SagaFilter` y nav interna de `MechasSagas`)

**Archivos**: `src/components/catalog/SagaFilter.tsx` línea 17-18, `src/pages/MechasSagas.tsx`
líneas 33/39/45.

`px-4 py-2` + `text-xs` (line-height 1rem/16px) da ~32-34px de alto de tap real. Pasa el mínimo
AA pero es ajustado para chips que se usan en tres páginas (`Capitulos`, `Personajes`,
`MechasSagas`). Subir el padding vertical en mobile sin tocar la densidad en desktop:

```
px-4 py-2.5 md:py-2
```

Aplicar este cambio en `SagaFilter.tsx` (`baseClasses`) y en los tres `<a>` de la nav interna de
`MechasSagas.tsx` — ver también 6d para consolidar ambos en un solo lugar en vez de mantener dos
copias del mismo string de clases.

---

## 3. SEO / meta tags

**Archivo**: `index.html`.

Estado actual: `<title>` y `<meta name="description">` estáticos ya están bien redactados
(español, describen el sitio con claridad). Favicon SVG presente en `public/favicon.svg` y
correctamente resuelto contra el `base: '/Robotech-tio/'` de Vite (confirmado en
`dist/index.html` tras build: `href="/Robotech-tio/favicon.svg"`) — **no requiere cambios**. No
existe `robots.txt` ni `sitemap.xml`, y no hay ningún meta tag Open Graph/Twitter Card.

Dado que es una SPA con `HashRouter` (rutas `/#/capitulos`, etc.), no hay forma de servir meta
tags distintos por ruta sin JS del lado del crawler o una librería nueva — fuera de alcance por
decisión explícita. Todo lo de abajo es meta estático global en `<head>`, suficiente para que
compartir el link raíz (`https://pcornejov.github.io/Robotech-tio/`) en redes/chats se vea bien.

### Cambios en `<head>`

```html
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#0A0E14" />
<meta
  name="description"
  content="Robotech Archivo: sitio de fans hispanohablante para ver todos los capítulos de la saga Robotech, con la historia completa de la Fuerza de Defensa Robotech en un solo lugar."
/>
<title>Robotech Archivo</title>
<link rel="canonical" href="https://pcornejov.github.io/Robotech-tio/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Robotech Archivo" />
<meta property="og:title" content="Robotech Archivo" />
<meta
  property="og:description"
  content="Todos los capítulos de la saga Robotech, en español, en un solo lugar. Sitio de fans, sin anuncios, sin registro."
/>
<meta property="og:url" content="https://pcornejov.github.io/Robotech-tio/" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Robotech Archivo" />
<meta
  name="twitter:description"
  content="Todos los capítulos de la saga Robotech, en español, en un solo lugar."
/>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### Decisiones explícitas

- **`og:image`: se omite a propósito.** No existe ningún asset gráfico propio del sitio (solo el
  favicon SVG, que además la mayoría de crawlers de redes sociales no aceptan como preview image
  — quieren PNG/JPG de ~1200×630). Generar uno implicaría usar arte de Robotech con copyright, lo
  cual contradice el propio disclaimer del sitio ("sin afiliación... sin fines de lucro"). Sin
  `og:image`, las plataformas muestran un preview de solo texto (título + descripción) — es una
  degradación aceptable para un sitio de fans pequeño. Si en el futuro se diseña un logo/wordmark
  propio en PNG, ahí sí vale la pena agregarlo.
- **`robots.txt`: sí, mínimo.** Costo cero, evita cualquier ambigüedad para crawlers. Crear
  `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  ```
- **`sitemap.xml`: se omite, a propósito.** Es una SPA 100% client-side con `HashRouter` — los
  fragmentos `#/capitulos/12` no son URLs indexables de forma estándar (Google ya no procesa
  `#!`/hash-fragment sitemaps desde hace años, y requeriría ejecutar JS para descubrir contenido
  igual). Para un sitio de fans de este tamaño, mantener a mano un sitemap de 85+ URLs que los
  buscadores no van a indexar de forma confiable no se justifica. La página raíz ya es indexable
  vía `robots.txt` + meta description, que es lo único que realísticamente aparecerá en
  resultados de búsqueda.

---

## 4. Accesibilidad

### 4a. [ALTO] Los links del drawer mobile siguen siendo focuseables/anunciados por lectores de pantalla cuando el menú está cerrado

**Archivo**: `src/components/layout/MobileMenuDrawer.tsx`, líneas 25-32.

Cuando `isOpen === false`, el `<nav>` del drawer se oculta solo visualmente
(`pointer-events-none -translate-y-2 opacity-0`) — pero sigue estando en el DOM sin
`display: none`, sin `aria-hidden` y sin nada que lo saque del orden de tabulación. Esto significa
que en **cualquier viewport mobile, en todo momento** (no solo cuando alguien abre el menú), un
usuario de teclado que hace Tab después del botón hamburguesa cae en 4 links invisibles
("Inicio", "Capítulos", "Personajes", "Mechas y Sagas") antes de llegar al contenido real de la
página. Un lector de pantalla también los anuncia como presentes, aunque no se vean. Es un bug
real de navegación por teclado, no solo estético.

React 19 (ya está en `package.json`, `react ^19.2.7`) soporta el atributo HTML `inert` de forma
nativa como prop. Es el fix correcto: cuando está `inert`, el navegador saca automáticamente todo
el subárbol del orden de tabulación y del árbol de accesibilidad, sin tocar la animación CSS de
opacity/translate que ya existe.

```tsx
<nav
  id={id}
  aria-label="Navegación principal móvil"
  aria-hidden={!isOpen}
  inert={!isOpen}
  className={`absolute top-full left-0 z-50 w-full border-b border-border bg-surface-alt [clip-path:polygon(0_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%)] transition-all duration-200 ease-out md:hidden ${
    isOpen
      ? 'translate-y-0 opacity-100'
      : 'pointer-events-none -translate-y-2 opacity-0'
  }`}
>
```

(`aria-hidden` se deja además de `inert` por compatibilidad amplia — no estorba, `inert` ya
implica semántica equivalente en navegadores modernos.)

### 4b. [ALTO] Falta un link "Saltar al contenido"

**Archivo**: `src/components/layout/Layout.tsx`.

No existe ningún skip link. Un usuario de teclado tiene que pasar por el wordmark y los 4 links
del nav en cada página antes de llegar al contenido. Agregar un link visualmente oculto que
aparece al recibir foco, primero en el DOM:

```tsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:font-body focus-visible:text-sm focus-visible:font-semibold focus-visible:uppercase focus-visible:tracking-wide focus-visible:text-background focus-visible:outline-none focus-visible:[clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

`sr-only`/`not-sr-only` son utilidades incluidas por defecto en Tailwind — no requiere plugin
nuevo.

### 4c. [MEDIO] Contraste: `text-accent-dim` (etiquetas "Robotech Masters") no cumple AA

**Archivos**: `src/data/episodes.ts` línea 116, `src/data/characters.ts` línea 136,
`src/data/factions.ts` línea 73.

`accent-dim` (`#B8330F`) se usa como **color de texto** (no solo de borde/fondo translúcido) para
toda etiqueta "Robotech Masters" en el sitio: el tag de saga en `EpisodeCard`/`EpisodioPlayer`, el
texto de saga en `CharacterCard`, y el texto de facción en `MechaCard`/`FactionCard`/
`MechasSagas`. Calculando el ratio de contraste WCAG:

| Par | Contraste calculado | Mínimo AA (texto normal) |
|---|---|---|
| `text-accent-dim` sobre `background` (#0A0E14) | ≈ 3.2:1 | 4.5:1 — **falla** |
| `text-accent-dim` sobre `surface` (#131A24) | ≈ 2.9:1 | 4.5:1 — **falla** |

Es un fallo sistemático porque toca cinco componentes distintos, todos con texto pequeño
(10-14px), no "texto grande" que permitiría el umbral relajado de 3:1.

Fix: no tocar `accent-dim` en sí (sigue siendo válido para bordes y fondos translúcidos tipo
`accent-dim/10`, donde no aplica contraste de texto). Agregar un token nuevo, más claro,
exclusivamente para uso como color de texto, y usarlo en los tres lugares de arriba.

`tailwind.config.js`:
```js
colors: {
  // ...existentes
  'accent-dim': '#B8330F',
  'accent-dim-text': '#D2662E', // variante clara de accent-dim, ~5:1 sobre background/surface — solo para texto
  // ...
}
```

Reemplazar `text-accent-dim` → `text-accent-dim-text` en las tres líneas de datos mencionadas
arriba (`sagaTagClasses.masters`, `sagaAccent.masters.text`, `factionAccent.masters.text`). No
tocar `border-accent-dim`, `bg-accent-dim`, ni los `hover:shadow-[...]` que usan el rgba original
— esos siguen siendo `accent-dim` sin cambios.

`#D2662E` da aproximadamente 5.2:1 sobre `background` y 4.7:1 sobre `surface` según el cálculo
manual — verificar con una herramienta real (WebAIM Contrast Checker u otra) antes de mergear,
por si el redondeo manual introdujo algún error; el objetivo es quedar cómodamente sobre 4.5:1 en
ambos fondos.

### 4d. [MEDIO] `text-text-secondary/60` duplicado con `opacity-50` del padre en badges "No disponible"

**Archivos**: `src/components/catalog/EpisodeCard.tsx` líneas 26 y 31,
`src/components/episode/EpisodeSidebar.tsx` línea 65.

Estos tres `<span>` (el badge "EP. XX" y el tag de saga en el placeholder de episodio no
disponible) usan `text-text-secondary/60`, y ese `<span>` vive dentro de un contenedor padre que
**ya** tiene `opacity-50` aplicado (`EpisodeCard.tsx` línea 20-22, `EpisodeSidebar.tsx` línea 60-62).
El resultado es doble atenuación (0.6 × 0.5 ≈ 0.3 de opacidad efectiva sobre el color base), y
solo con el `/60` propio el contraste ya cae a ~3.1:1 antes de sumarle la opacidad del padre — muy
por debajo de AA. El propósito de "se ve apagado/deshabilitado" ya lo cumple `opacity-50` del
contenedor; el `/60` extra en el texto es redundante y hace el label casi ilegible.

Fix: quitar el sufijo `/60` de las tres clases, dejar `text-text-secondary` a fuerza completa (que
ya está verificado AA-compliant) y que solo el `opacity-50` del padre controle el atenuado:

- `EpisodeCard.tsx` línea 26: `text-text-secondary/60` → `text-text-secondary`
- `EpisodeCard.tsx` línea 31: `` `${sagaTagClasses[episode.saga]} text-text-secondary/60` `` →
  `` `${sagaTagClasses[episode.saga]} text-text-secondary` ``
- `EpisodeSidebar.tsx` línea 65: `text-text-secondary/60` → `text-text-secondary`

### 4e. [BAJO] Contraste borderline: `text-text-secondary/80` en `MechasSagas.tsx`

**Archivo**: `src/pages/MechasSagas.tsx`, línea 111 (párrafo `extended` de cada saga en el
timeline).

`text-text-secondary/80` sobre `bg-surface` da ≈4.40:1 — justo debajo del mínimo AA de 4.5:1 para
texto normal (es `text-xs md:text-sm`, no texto grande). Es el único lugar del sitio que usa esa
variante de opacidad sobre `text-secondary`. Fix: quitar el modificador de opacidad, usar
`text-text-secondary` a secas (≈6.2:1 sobre `surface`, cómodamente AA):

```
text-text-secondary/80 → text-text-secondary
```

### 4f. Lo que ya está bien (revisado, sin cambios)

- `Layout.tsx` ya usa `<main>` semántico envolviendo el `<Outlet />` (no un `<div>` genérico).
- Landmarks correctos en el resto del sitio: `<header>`/`<footer>` en `Navbar`/`Footer`, `<nav
  aria-label>` en navegación desktop y mobile, `<aside aria-label>` en `EpisodeSidebar`, `<nav
  aria-label>` en `EpisodeNav` y en la nav interna de `MechasSagas`.
- `focus-visible` está implementado de forma consistente en todos los elementos interactivos
  revisados: `Button`, `SagaFilter`, `NavLink` del navbar y del drawer, `EpisodeCard`,
  `EpisodeNav`, `CatalogOutlineLink`, links del footer/sidebar. No encontré ningún elemento
  clickeable sin estado de foco visible.
- `text-secondary` sobre `background` y sobre `surface` a fuerza completa (sin modificador de
  opacidad) ya está verificado AA en iteración 1 y se confirma aquí también (~6-7:1 en ambos
  casos). `text-primary` y `text-accent` a fuerza completa también pasan AA cómodamente
  (≈4.8-5.8:1 según el fondo) en todos los usos revisados.
- Los dos `<nav aria-label="Navegación principal...">` (desktop y mobile) nunca están expuestos
  ambos a la vez a un mismo tamaño de viewport: el desktop usa `hidden md:block` y el drawer usa
  `md:hidden`, así que a cualquier breakpoint solo uno de los dos existe visualmente — no hay
  landmark duplicado audible en un mismo momento (una vez aplicado el fix de 4a para cuando el
  drawer mobile está cerrado).

---

## 5. Loading states / performance

**Archivos revisados**: `src/components/catalog/EpisodeCard.tsx`,
`src/components/episode/EpisodeSidebar.tsx`, `src/pages/EpisodioPlayer.tsx`.

- `loading="lazy"` **sí está aplicado** en las 85 miniaturas del catálogo (`EpisodeCard.tsx`
  línea 51) y en las miniaturas relacionadas del sidebar del reproductor (`EpisodeSidebar.tsx`
  línea 45), tal como pedía la spec de iteración 3. Confirmado, sin acción requerida.
- Ambos `<img>` además tienen `decoding="async"`, un extra correcto que no estaba pedido pero ya
  está bien.
- **Layout shift**: ninguna de las miniaturas necesita `width`/`height` explícitos porque ya
  están envueltas en contenedores `aspect-video` (`EpisodeCard.tsx` línea 47, `EpisodeSidebar.tsx`
  línea 41) que reservan el espacio antes de que la imagen cargue. Lo mismo aplica al iframe del
  reproductor en `EpisodioPlayer.tsx` (envuelto en `aspect-video` también). No hay CLS que
  corregir aquí — ya está resuelto estructuralmente, no hace falta agregar atributos extra a los
  `<img>`.
- **[BAJO, opcional]** Las 85 miniaturas usan `loading="lazy"` de forma uniforme, incluidas las
  primeras que están por encima del pliegue en la carga inicial del catálogo. Cargar "lazy" una
  imagen visible desde el primer render puede retrasar levemente el LCP comparado con cargar
  eager solo la primera fila. Para un catálogo de 85 ítems es una decisión razonable tal cual está
  (mucho mejor que cargar las 85 eager), así que esto es una optimización opcional, no un
  problema: si se quiere exprimir el LCP, se podría condicionar `loading` según el índice (p. ej.
  `loading={index < 5 ? 'eager' : 'lazy'}` en el `.map` de `Capitulos.tsx`), pero no es necesario
  para este pulido final.

---

## 6. Cosas rotas o inconsistentes

Cuatro hallazgos reales, verificados leyendo el código — no encontré nada más allá de esto (revisé
también estilos de botones, imports no usados en el resto de componentes, y todos los `to=`/
`href=` internos contra las rutas de `App.tsx`, y no hay más links rotos).

### 6a. [ALTO] No existe ruta catch-all — cualquier URL inválida renderiza una página completamente en blanco

**Archivo**: `src/App.tsx`.

Las rutas declaradas son exactamente `/`, `/capitulos`, `/capitulos/:order`, `/personajes`,
`/mechas-sagas`. No hay ningún `<Route path="*">`. Con `react-router` v7, si ninguna ruta
matchea, `<Routes>` no renderiza nada — ni siquiera el `Layout` (que solo se monta si alguno de
sus hijos matchea). Resultado real: entrar a `/#/capitulo` (typo), `/#/foo`, o cualquier link
viejo/roto deja al usuario en una página vacía sin navbar, sin footer, sin ningún link de vuelta —
solo el fondo oscuro heredado del `body` global.

Esto conecta directamente con 6b: `ComingSoon.tsx` ya existe y ya no se usa en ningún lado — es la
base perfecta para convertirlo en un 404 real en vez de borrarlo sin más.

Fix — renombrar `src/pages/ComingSoon.tsx` a `src/pages/NotFound.tsx` (o mantener el nombre de
archivo y solo cambiar el contenido, a preferencia del agente de código) con copy genérico de
"ruta no encontrada", reusando el mismo tono ya establecido en `EpisodioPlayer.tsx` para su
`NotFoundState` ("SEÑAL PERDIDA"):

```tsx
import { Link } from 'react-router-dom'
import SectionKicker from '../components/ui/SectionKicker'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <SectionKicker className="text-sm">SEÑAL PERDIDA</SectionKicker>
      <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md font-body text-text-secondary">
        La ruta que buscas no existe en este archivo. Verifica la dirección e inténtalo de nuevo.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block border border-primary/60 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] md:px-8 md:py-3.5 md:text-base"
      >
        Volver al Inicio
      </Link>
    </div>
  )
}
```

Y en `App.tsx`, agregar la ruta catch-all como último hijo del `Layout`:

```tsx
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/capitulos" element={<Capitulos />} />
  <Route path="/capitulos/:order" element={<EpisodioPlayer />} />
  <Route path="/personajes" element={<Personajes />} />
  <Route path="/mechas-sagas" element={<MechasSagas />} />
  <Route path="*" element={<NotFound />} />
</Route>
```

Actualizar también el comentario de `SectionKicker.tsx` línea 8 (lista de consumidores) para
reemplazar "ComingSoon" por "NotFound".

### 6b. [ALTO, parte de 6a] `ComingSoon.tsx` es código muerto

**Archivo**: `src/pages/ComingSoon.tsx`.

Confirmado por grep: no hay ningún `import ComingSoon` en todo `src/`. Era el placeholder usado
antes de que las iteraciones 4-6 implementaran `EpisodioPlayer`, `Personajes` y `MechasSagas` de
verdad (la spec de iteración 4 ya avisaba de esto para `EpisodioComingSoon.tsx`, y quedó la misma
situación con este archivo genérico). Se resuelve solo con el fix de 6a (repurpose a `NotFound`)
— no queda código muerto en el repo después de aplicar 6a.

### 6c. [MEDIO] Color de facción incorrecto para el mecha Cyclone

**Archivo**: `src/data/mechas.ts`, línea 58.

```ts
{
  codigo: 'CYCLONE',
  nombre: 'Cyclone',
  faccionKey: 'invid',                              // ← esto
  faccionLabel: 'Grupo Expedicionario (RDF)',        // ← pero esto dice RDF
  ...
}
```

`MechaCard` deriva todo su acento visual (color de texto, glow de hover, esquinas) de
`factionAccent[faccionKey]`, no del `faccionLabel`. El Cyclone es equipo del Grupo Expedicionario
—una facción RDF, como dice su propio `faccionLabel`— pero al tener `faccionKey: 'invid'` se
renderiza con el gris apagado de la facción Invid en vez del azul RDF que usan `VF-1 Valkyrie` y
`Alpha Fighter`, las otras dos unidades RDF de la lista. Es una inconsistencia visual real: el
mismo texto "RDF" aparece en dos colores distintos según la tarjeta.

Fix: cambiar la key, mantener el label tal cual (ya es correcto):

```ts
faccionKey: 'rdf',
faccionLabel: 'Grupo Expedicionario (RDF)',
```

### 6d. [BAJO] Duplicación de estilos de chip entre `SagaFilter.tsx` y `MechasSagas.tsx`

**Archivos**: `src/components/catalog/SagaFilter.tsx` líneas 17-21,
`src/pages/MechasSagas.tsx` líneas 33/39/45.

La nav interna de `MechasSagas.tsx` (los tres `<a href="#mechas">` etc.) repite a mano el mismo
string de clases que `baseClasses`/`unselectedClasses` de `SagaFilter.tsx`, en vez de
importarlas. Hoy renderizan igual, pero es una segunda copia del mismo estilo — el fix de tap
target (2c) hay que aplicarlo dos veces si no se consolida, y cualquier ajuste futuro de paleta
corre el mismo riesgo. Fix: exportar `baseClasses`/`unselectedClasses` desde `SagaFilter.tsx` (o
moverlas a un archivo compartido, p. ej. `src/components/ui/chipClasses.ts`) e importarlas en
`MechasSagas.tsx` para los tres `<a>` de esa nav.

### 6e. [BAJO] Comentario desactualizado en `SagaCard.tsx`

**Archivo**: `src/components/sections/SagaCard.tsx`, líneas 11-12.

El docstring dice "The whole card links to the (placeholder) Mechas y Sagas page" — pero desde la
iteración 6, `/mechas-sagas` es una página real y completa (`MechasSagas.tsx`), no un placeholder.
No afecta el comportamiento, solo puede confundir a quien lea el comentario después. Fix: quitar
"(placeholder)" del comentario.

---

## Resumen priorizado

**Alto impacto**
1. `MobileMenuDrawer.tsx` — links del menú mobile siguen siendo focuseables/anunciados por
   lectores de pantalla cuando el drawer está cerrado (sección 4a).
2. `App.tsx` — no hay ruta catch-all; cualquier URL inválida renderiza una página en blanco sin
   navbar/footer (sección 6a), y se resuelve reusando el código muerto de `ComingSoon.tsx`
   (sección 6b).
3. `text-accent-dim` como color de texto no cumple contraste AA (~2.9-3.2:1) en cinco componentes
   distintos que muestran la etiqueta "Robotech Masters" (sección 4c).

**Medio impacto**
4. Buscador de capítulos — feature nueva completa, combinable con el filtro de saga existente
   (sección 1).
5. Falta skip-to-content link (sección 4b).
6. Riesgo de wrap/clipping del wordmark del Navbar en 320-360px por falta de `whitespace-nowrap`
   (sección 2a).
7. Doble atenuación de opacidad (`/60` de texto + `opacity-50` del padre) hace casi ilegibles los
   badges "No disponible" en `EpisodeCard`/`EpisodeSidebar` (sección 4d).
8. Mejoras de SEO/meta: Open Graph, Twitter Card, `theme-color`, `robots.txt`, `canonical`
   (sección 3).
9. Mecha Cyclone con `faccionKey: 'invid'` en vez de `'rdf'` — color de facción incorrecto
   (sección 6c).

**Bajo impacto**
10. Contraste borderline de `text-text-secondary/80` en `MechasSagas.tsx` (~4.40:1, sección 4e).
11. Tap target del botón hamburguesa 40px en vez de 44px (sección 2b).
12. Tap target de los chips de `SagaFilter`/`MechasSagas` ~32-34px, pasa AA mínimo pero es
    ajustado (sección 2c).
13. Duplicación de clases de chip entre `SagaFilter.tsx` y `MechasSagas.tsx` (sección 6d).
14. Comentario desactualizado "(placeholder)" en `SagaCard.tsx` (sección 6e).
15. Eager-load opcional de la primera fila de miniaturas del catálogo para LCP (sección 5,
    opcional, no obligatorio).
