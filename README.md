# Robotech Archivo

Sitio de fans hispanohablante para ver los capítulos de la saga Robotech, con la historia de la
Fuerza de Defensa Robotech en un solo lugar.

Este es un proyecto **no oficial** hecho por fans, sin fines de lucro y sin afiliación con
Harmony Gold USA ni Tatsunoko Production Co., Ltd. Robotech y todos los personajes, mechas y
elementos relacionados son propiedad de sus respectivos dueños. Los videos se muestran embebidos
directamente desde YouTube.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/) (`HashRouter`, listo para agregar rutas en futuras
  iteraciones)
- Deploy automático a GitHub Pages vía GitHub Actions

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

El resultado se genera en `dist/`. El sitio está configurado para publicarse en
`https://pcornejov.github.io/robotech-tio/` (ver `base` en `vite.config.ts`).

## Deploy

El workflow en `.github/workflows/deploy.yml` construye y publica el sitio a GitHub Pages en
cada push a `main`.
