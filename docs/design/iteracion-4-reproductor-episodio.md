# Iteración 4 — Página de Reproductor de Episodio (`/capitulos/:order`)

Spec de diseño para reemplazar el placeholder `EpisodioComingSoon` en la ruta `/capitulos/:order`. No introduce tokens, fuentes ni componentes nuevos al sistema de diseño — reutiliza `Navbar`, `Footer`, `SectionKicker`, y el lenguaje visual de `EpisodeCard` (chamfer clip-path, badges HUD, paleta existente).

Cambio de ruta en `App.tsx`: `<Route path="/capitulos/:order" element={<EpisodioComingSoon />} />` → `<Route path="/capitulos/:order" element={<EpisodioPlayer />} />`. `EpisodioComingSoon.tsx` queda obsoleto y se puede eliminar en la implementación.

---

## 0. Resolución de datos y los tres estados de la ruta

Al entrar a `/capitulos/:order`, el `order` de la URL se parsea a número y se busca en `episodes`. Hay **tres estados** posibles, no dos — esto es clave para el diseño:

1. **`order` inválido o fuera de rango** (no numérico, o no existe ningún episodio con ese `order` en 1–85) → **Estado "No encontrado"**.
2. **`order` válido, episodio existe, pero `available === false`** (los 25 huecos: 32 y 37–60) → **Estado "No disponible"**.
3. **`order` válido y `available === true`** → **Estado "Reproductor"** (el caso feliz, descrito en las secciones 2–7).

Los estados 1 y 2 **no son lo mismo** y llevan tratamientos distintos (ver sección 1): en el estado 2 conocemos el episodio (saga, número) y podemos ofrecer navegación anterior/siguiente real; en el estado 1 no hay nada válido de qué partir.

```
order = Number(params.order)
episode = Number.isInteger(order) ? episodes.find(e => e.order === order) : undefined

if (!episode)              → Estado "No encontrado"
else if (!episode.available) → Estado "No disponible"
else                        → Estado "Reproductor"
```

---

## 1. Estados de error

### 1a. Estado "No encontrado" (`order` inválido / fuera de 1–85)

Mismo tono que `ComingSoon`, pero sin CTA de navegación anterior/siguiente (no hay episodio válido del cual partir).

```html
<div class="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 text-center md:px-8">
  <SectionKicker class="text-sm">SEÑAL PERDIDA</SectionKicker>
  <h1 class="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
    Episodio no encontrado
  </h1>
  <p class="mt-4 max-w-md font-body text-text-secondary">
    El capítulo que buscas no existe en este archivo. Verifica el número e inténtalo de nuevo.
  </p>
  <Link to="/capitulos" class="mt-6 inline-block border border-primary/60 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] md:px-8 md:py-3.5 md:text-base">
    Volver al Catálogo
  </Link>
</div>
```

### 1b. Estado "No disponible" (episodio existe, `available: false`)

Aquí sí conocemos el número y la saga, así que se muestra esa información y **se mantiene la navegación anterior/siguiente** — es la única forma de no dejar al usuario atrapado en el tramo de 24 episodios seguidos no disponibles (37–60) de Robotech Masters. La navegación avanza por número, no salta al próximo disponible (ver sección 4).

```html
<div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
  <div class="flex flex-col items-center text-center">
    <SectionKicker class="text-sm">SEÑAL INTERRUMPIDA</SectionKicker>
    <span class="mt-3 {sagaTagClasses[episode.saga]}">{sagaNames[episode.saga]}</span>
    <h1 class="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
      Episodio {String(order).padStart(2, '0')} no disponible
    </h1>
    <p class="mt-4 max-w-md font-body text-text-secondary">
      Este episodio no está disponible por el momento. Es un vacío conocido en nuestra fuente
      original — estamos trabajando para completar el archivo.
    </p>
    <Link to="/capitulos" class="mt-6 inline-block border border-primary/60 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] md:px-8 md:py-3.5 md:text-base">
      Volver al Catálogo
    </Link>
  </div>

  <!-- Mismo componente EpisodeNav que la sección 4, para no dejar al usuario varado -->
  <div class="mt-10 md:mt-14">
    <EpisodeNav currentOrder={order} />
  </div>
</div>
```

`sagaTagClasses` es el mismo objeto que ya existe en `EpisodeCard.tsx` (color por saga: `text-primary` para Macross, `text-accent-dim` para Masters, `text-text-secondary` para New Generation). Se recomienda **extraerlo** a un lugar compartido (p. ej. `src/data/episodes.ts` o `src/lib/saga.ts`) porque a partir de esta iteración se usa en tres lugares: `EpisodeCard`, el estado "No disponible" y el bloque de info del reproductor (sección 3).

---

## 2. Reproductor embebido

**Decisión de diseño**: el chamfer va en el **contenedor exterior** (el "marco"), nunca directamente en el `<iframe>`. Razón: a diferencia de las miniaturas estáticas de `EpisodeCard` (donde cortar la esquina de una imagen fija no tiene costo funcional), aquí el iframe es interactivo y YouTube dibuja sus propios controles (barra de progreso, volumen, pantalla completa) hasta el borde inferior. Si el clip-path corta directamente sobre el iframe, puede recortar visualmente esos controles cerca de las esquinas. La solución es un "marco/passe-partout": el `clip-path` se aplica al contenedor con padding, y el `<iframe>` interior queda **rectangular, sin clip-path**, protegido dentro del padding.

Para que el corte del chamfer nunca toque el rectángulo interior, el padding debe ser ≥ mitad del tamaño del chamfer (con chamfer de 16px y padding de 12–16px sobra margen).

```html
<div class="relative border border-border bg-surface-alt p-3 md:p-4 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
  <div class="aspect-video w-full overflow-hidden bg-black">
    <iframe
      class="h-full w-full"
      src={`https://www.youtube-nocookie.com/embed/${episode.id}`}
      title={`Robotech — Episodio ${String(episode.order).padStart(2, '0')}: ${episode.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </div>
</div>
```

Notas:
- **No** se superpone ningún badge tipo "EP. 07" sobre el iframe (a diferencia de `EpisodeCard`, que sí superpone el badge sobre la miniatura). Ahí el video no se está reproduciendo; acá sí, y tapar parte del frame con UI decorativa mientras el usuario mira el episodio es mala UX. El número de episodio vive únicamente en el bloque de info debajo (sección 3).
- No se agrega glow permanente al marco (se reserva el glow de `shadow-[0_0_*_rgba(...)]` para estados hover/focus en el resto del sitio); el marco es estático, `border-border` + `bg-surface-alt` bastan para separarlo del fondo.
- `loading="lazy"` **no** se usa aquí: es el contenido principal de la página, no hay razón para diferirlo.

---

## 3. Info del episodio

Va inmediatamente debajo del marco del reproductor, dentro de la misma columna principal.

```html
<div class="mt-5 md:mt-6">
  <SectionKicker class="text-xs md:text-sm">
    {`EPISODIO ${String(episode.order).padStart(2, '0')}`}
  </SectionKicker>
  <h1 class="mt-1.5 font-display text-2xl uppercase leading-tight text-text-primary md:text-4xl">
    {episode.title}
  </h1>
  <span class="mt-2 inline-block {sagaTagClasses[episode.saga]} text-xs md:text-sm">
    {sagaNames[episode.saga]}
  </span>
</div>
```

`h1` es el único `<h1>` de la página (el título del episodio). `SectionKicker` ya envuelve el texto entre `[ ]` según su propio contrato — no agregar corchetes manualmente.

---

## 4. Navegación Anterior / Siguiente

Componente `EpisodeNav` (reutilizable también en el estado "No disponible", sección 1b). Navega **por número de episodio**, no por disponibilidad: `order - 1` y `order + 1` sin filtrar por `available`, porque el destino ya sabe manejar su propio estado "No disponible" si corresponde.

Layout en grid de 2 columnas fijas (no `flex` con `justify-between`) para que "Anterior" quede siempre a la izquierda y "Siguiente" siempre a la derecha, sin saltos quando falta uno de los dos lados.

```html
<nav aria-label="Navegación entre episodios" class="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-5 md:mt-10 md:gap-4 md:pt-6">

  <!-- Slot izquierdo: Anterior -->
  {order > 1 ? (
    <Link
      to={`/capitulos/${order - 1}`}
      aria-label={`Ir al episodio anterior: Episodio ${order - 1}${prevEp?.available ? `, ${prevEp.title}` : ', no disponible'}`}
      class="group flex items-center gap-2 border border-border bg-surface px-3 py-3 font-body transition-colors duration-200 hover:border-primary [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] focus-visible:outline-none focus-visible:border-primary md:px-4 md:py-4"
    >
      <span aria-hidden="true" class="text-lg text-text-secondary group-hover:text-primary">←</span>
      <span class="flex min-w-0 flex-col items-start">
        <span class="text-[10px] uppercase tracking-wide text-text-secondary">Anterior</span>
        <span class="truncate text-sm uppercase text-text-primary group-hover:text-primary md:text-base">
          Episodio {String(order - 1).padStart(2, '0')}
        </span>
      </span>
    </Link>
  ) : (
    <div aria-hidden="true" />
  )}

  <!-- Slot derecho: Siguiente (contenido alineado a la derecha) -->
  {order < 85 ? (
    <Link
      to={`/capitulos/${order + 1}`}
      aria-label={`Ir al episodio siguiente: Episodio ${order + 1}${nextEp?.available ? `, ${nextEp.title}` : ', no disponible'}`}
      class="group flex items-center justify-end gap-2 border border-border bg-surface px-3 py-3 font-body transition-colors duration-200 hover:border-primary [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] focus-visible:outline-none focus-visible:border-primary md:px-4 md:py-4"
    >
      <span class="flex min-w-0 flex-col items-end">
        <span class="text-[10px] uppercase tracking-wide text-text-secondary">Siguiente</span>
        <span class="truncate text-sm uppercase text-text-primary group-hover:text-primary md:text-base">
          Episodio {String(order + 1).padStart(2, '0')}
        </span>
      </span>
      <span aria-hidden="true" class="text-lg text-text-secondary group-hover:text-primary">→</span>
    </Link>
  ) : (
    <div aria-hidden="true" />
  )}
</nav>
```

Reglas de borde:
- **Episodio 1**: no existe "Anterior" → el slot izquierdo se deja vacío (`<div aria-hidden="true" />`, sin caja visible, sin texto "no hay anterior"). El grid conserva las dos columnas así que "Siguiente" no se recentra ni se mueve.
- **Episodio 85**: análogo, slot derecho vacío.
- El texto visible del botón **no** dice el título del episodio adyacente (puede ser larguísimo o el episodio puede no estar disponible y no tener título) — solo "Episodio NN". El título completo si existe va en el `aria-label`, junto con el estado de disponibilidad, así un lector de pantalla anuncia contexto real y no solo "Anterior / flecha".

---

## 5. Sidebar "Más episodios" (misma saga)

**Decisión de layout**: en desktop (`lg:` y superior) va como sidebar a la derecha del reproductor, porque el video 16:9 ya ocupa el ancho útil y una lista vertical angosta aprovecha el espacio sobrante sin competir por atención. En mobile y tablet (`< lg`) va apilada debajo de todo el bloque principal (reproductor + info + nav), nunca al costado ni antes del video — el video es la razón de la visita.

Selección de episodios (hasta 8, misma saga, excluyendo el actual): prioriza los que siguen en el orden narrativo y completa con los anteriores si el actual está cerca del final de la saga, pero **la lista se muestra siempre en orden cronológico ascendente**:

```
sameSaga = episodes.filter(e => e.saga === current.saga && e.order !== current.order)
after     = sameSaga.filter(e => e.order > current.order)                      // ascendente
before    = sameSaga.filter(e => e.order < current.order).reverse()            // más cercano primero
related   = [...after, ...before].slice(0, 8).sort((a, b) => a.order - b.order)
```

Esto significa: si estás en el episodio 10 de Macross, ves 11–18. Si estás en el 34 (cerca del final de Macross, con el 32 no disponible), ves los que siguen disponibles/no dentro de la saga y completa hacia atrás sin excluir a los `available:false` — la fila de "no disponible" se muestra igual, dimmed, consistente con el catálogo.

```html
<aside aria-label="Más episodios de la saga" class="mt-10 lg:mt-0 lg:sticky lg:top-24">
  <SectionKicker class="text-xs">MÁS EPISODIOS</SectionKicker>
  <h2 class="mt-1 font-display text-lg uppercase text-text-primary md:text-xl">
    {sagaNames[episode.saga]}
  </h2>

  <ul class="mt-4 space-y-2 md:space-y-3">
    {related.map(ep => (
      <li key={ep.order}>
        {ep.available ? (
          <Link
            to={`/capitulos/${ep.order}`}
            class="group flex gap-3 border border-border bg-surface p-2 transition-colors duration-200 hover:border-primary [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] focus-visible:outline-none focus-visible:border-primary"
          >
            <div class="relative aspect-video w-24 flex-shrink-0 overflow-hidden bg-surface-alt md:w-28">
              <img
                src={`https://i.ytimg.com/vi/${ep.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-[0.6]"
              />
            </div>
            <div class="flex min-w-0 flex-col justify-center py-0.5">
              <span class="font-display text-[10px] uppercase tracking-wide text-accent">
                EP. {String(ep.order).padStart(2, '0')}
              </span>
              <p class="mt-0.5 line-clamp-2 font-body text-xs uppercase leading-snug text-text-primary group-hover:text-accent md:text-sm">
                {ep.title}
              </p>
            </div>
          </Link>
        ) : (
          <div aria-disabled="true" class="flex select-none gap-3 border border-border/60 bg-surface/60 p-2 opacity-50 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]">
            <div class="flex aspect-video w-24 flex-shrink-0 items-center justify-center bg-surface-alt md:w-28">
              <span class="font-display text-[10px] uppercase tracking-wide text-text-secondary/60">
                EP. {String(ep.order).padStart(2, '0')}
              </span>
            </div>
            <div class="flex flex-col justify-center py-0.5">
              <p class="font-body text-xs uppercase tracking-wide text-text-secondary">No disponible</p>
            </div>
          </div>
        )}
      </li>
    ))}
  </ul>
</aside>
```

`img alt=""` a propósito: el número/título ya está en texto visible al lado (evita redundancia para lectores de pantalla); si se prefiere, usar `alt={ep.title}` y quitar la duplicación visual del `<p>` — pero para consistencia con `EpisodeCard` (que también usa `alt={episode.title ?? ''}`) se deja el texto visible como fuente principal de la información.

---

## 6. Botón "Volver al catálogo"

Dos apariciones, roles distintos:

1. **Breadcrumb superior**, arriba del reproductor, salida rápida sin scrollear:
```html
<Link
  to="/capitulos"
  class="inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:text-primary"
>
  <span aria-hidden="true">←</span>
  Volver al Catálogo
</Link>
```

2. **CTA de cierre**, al final de la página (debajo del grid principal + sidebar), como salida natural tras terminar de mirar:
```html
<div class="mt-12 flex justify-center border-t border-border pt-10 md:mt-16 md:pt-12">
  <Link
    to="/capitulos"
    class="inline-block border border-primary/60 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(58,143,183,0.25)] focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(58,143,183,0.25)] md:px-8 md:py-3.5 md:text-base"
  >
    Ver Todos los Capítulos
  </Link>
</div>
```

Nota: **no** anidar el componente `Button` (que renderiza un `<button>`) dentro de `Link` (que renderiza un `<a>`) — HTML no permite elementos interactivos anidados y duplica paradas de foco para teclado/lector de pantalla. Por eso ambos CTAs de esta página son un `Link` con las clases de botón copiadas directamente (variante "outline" en `primary`, distinta del `Button` accent-filled que ya existe, para no competir visualmente con los CTAs principales del resto del sitio).

---

## 7. Layout responsive completo

Contenedor de página, igual criterio de ancho que `Capitulos.tsx`:

```html
<div class="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10 lg:px-16 lg:py-12">

  <!-- 6.1: breadcrumb -->
  <Link to="/capitulos">← Volver al Catálogo</Link>

  <div class="mt-4 grid grid-cols-1 gap-8 md:mt-6 lg:grid-cols-12 lg:gap-10 lg:items-start">

    <!-- Columna principal: reproductor + info + nav -->
    <div class="lg:col-span-8">
      <!-- sección 2: marco + iframe -->
      <!-- sección 3: info del episodio -->
      <!-- sección 4: EpisodeNav -->
    </div>

    <!-- Sidebar: más episodios -->
    <!-- sección 5 -->

  </div>

  <!-- sección 6.2: CTA de cierre -->
</div>
```

- **Mobile / tablet (`< lg`, hasta 1023px)**: una sola columna. Orden en el DOM (y visual): breadcrumb → marco de video (ancho completo, 16:9) → título/info → nav anterior/siguiente → sidebar "Más episodios" (se apila debajo, ancho completo) → CTA de cierre. No se necesita ningún `order-*` de Tailwind: el DOM ya está en este orden porque la columna principal se declara antes que el `<aside>`.
- **Desktop (`lg:` en adelante, ≥1024px)**: `grid-cols-12`, columna principal `lg:col-span-8` (video+info+nav), sidebar `lg:col-span-4`. El sidebar usa `lg:sticky lg:top-24` para quedar visible mientras el usuario mira el video (top-24 deja aire bajo la navbar sticky de 72px en desktop). `lg:items-start` en el grid evita que el sidebar se estire a la altura de la columna principal.
- Breakpoint de corte en `lg` (1024px) y no en `md` (768px) porque en tablet vertical un sidebar de episodios comprimido a 4/12 columnas (~250px) queda demasiado angosto para las miniaturas de 96–112px + texto; mejor apilarlo a ancho completo hasta que haya espacio real.

---

## 8. Accesibilidad — checklist

- `<iframe>` con `title` descriptivo: `` `Robotech — Episodio ${NN}: ${título}` `` (sección 2).
- Botones Anterior/Siguiente son `<Link>` con `aria-label` que incluye número **y** título/estado del episodio destino, no solo "Anterior" (sección 4). Las flechas `←`/`→` llevan `aria-hidden="true"`.
- `<nav aria-label="Navegación entre episodios">` envolviendo el bloque anterior/siguiente; `<aside aria-label="Más episodios de la saga">` envolviendo el sidebar — dos landmarks distintos, no confundir.
- Un solo `<h1>` por página: el título del episodio (estado Reproductor) o el título del mensaje de error (estados 1a/1b). El sidebar usa `<h2>` para el nombre de la saga.
- Todos los elementos interactivos (`Link`, breadcrumb, CTAs) llevan `focus-visible:outline-none focus-visible:border-primary` (o el glow equivalente) — nunca quitar el outline por defecto sin reemplazo visible, consistente con el resto del sitio (`SagaFilter`, `EpisodeCard`).
- Miniaturas del sidebar: `alt=""` porque el título ya es texto visible adyacente (evita anuncio duplicado); si se prefiere describir la imagen, usar `alt={ep.title}` y no `alt=""` — decisión de implementación, no cambia el layout.
- Estado "No disponible" en items del sidebar: `aria-disabled="true"`, no son `Link` (no se puede navegar a un episodio sin video), coherente con el tratamiento ya usado en `EpisodeCard` para `available: false`.
