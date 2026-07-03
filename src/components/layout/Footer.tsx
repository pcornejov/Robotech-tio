/**
 * Site footer: credit line followed by the fan-site disclaimer, stacked
 * and centered.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-6 md:py-8">
      <div className="mx-auto max-w-2xl space-y-2 text-center font-body text-xs text-text-secondary md:text-sm">
        <p>Robotech Archivo · Sitio de fans hecho por y para la comunidad hispanohablante.</p>
        <p>
          Este es un sitio no oficial creado por fans, sin fines de lucro. Robotech y todos los
          personajes, mechas y elementos relacionados son propiedad de Harmony Gold USA y
          Tatsunoko Production Co., Ltd. Este sitio no tiene afiliación, patrocinio ni respaldo de
          dichas empresas. Los videos se muestran embebidos directamente desde YouTube.
        </p>
      </div>
    </footer>
  )
}
