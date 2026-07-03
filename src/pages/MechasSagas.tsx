import SectionKicker from '../components/ui/SectionKicker'
import MechaCard from '../components/catalog/MechaCard'
import FactionCard from '../components/catalog/FactionCard'
import { baseChipClasses, unselectedChipClasses } from '../components/ui/chipClasses'
import { mechas } from '../data/mechas'
import { factions } from '../data/factions'
import { sagas } from '../data/sagas'

/**
 * Archive page for the mecha roster, the four factions, and the three-saga
 * timeline. The nav below the header is a set of in-page anchors, not a
 * filter — every section is always rendered.
 */
export default function MechasSagas() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-16 lg:py-20">
      <div className="text-center">
        <SectionKicker className="text-sm">ARCHIVO TÉCNICO Y HISTÓRICO</SectionKicker>
        <h1 className="mt-2 font-display text-3xl uppercase text-text-primary md:text-5xl">
          Mechas, Facciones y Sagas
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-text-secondary">
          El equipo, los bandos y la línea de tiempo completa de la Guerra Robotech.
        </p>
      </div>

      <nav
        aria-label="Secciones de esta página"
        className="sticky top-14 z-40 -mx-6 border-b border-border bg-background/95 px-6 py-3 backdrop-blur-sm md:top-[72px] md:-mx-8 md:px-8 lg:-mx-16 lg:px-16"
      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          <a
            href="#mechas"
            className={`${baseChipClasses} ${unselectedChipClasses}`}
          >
            Mechas
          </a>
          <a
            href="#facciones"
            className={`${baseChipClasses} ${unselectedChipClasses}`}
          >
            Facciones
          </a>
          <a
            href="#sagas"
            className={`${baseChipClasses} ${unselectedChipClasses}`}
          >
            Sagas / Timeline
          </a>
        </div>
      </nav>

      <section id="mechas" className="scroll-mt-28 pt-12 md:scroll-mt-32 md:pt-16">
        <SectionKicker className="text-xs">EQUIPO DE COMBATE</SectionKicker>
        <h2 className="mt-2 font-display text-2xl uppercase text-text-primary md:text-3xl">
          Mechas y Vehículos
        </h2>
        <p className="mt-2 max-w-lg font-body text-sm text-text-secondary md:text-base">
          Seis unidades representativas del equipo de combate a lo largo de las tres sagas, de la
          aviación transformable de la RDF a la maquinaria de las fuerzas alienígenas.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:mt-10">
          {mechas.map((mecha) => (
            <MechaCard key={mecha.codigo} mecha={mecha} />
          ))}
        </div>
      </section>

      <section id="facciones" className="scroll-mt-28 pt-12 md:scroll-mt-32 md:pt-16">
        <SectionKicker className="text-xs">BANDOS EN CONFLICTO</SectionKicker>
        <h2 className="mt-2 font-display text-2xl uppercase text-text-primary md:text-3xl">
          Facciones
        </h2>
        <p className="mt-2 max-w-lg font-body text-sm text-text-secondary md:text-base">
          Cuatro fuerzas, tres generaciones de guerra. Quién combate, por qué, y en qué saga
          protagoniza el conflicto.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 md:mt-10">
          {factions.map((faction) => (
            <FactionCard key={faction.faccionKey} faction={faction} />
          ))}
        </div>
      </section>

      <section id="sagas" className="scroll-mt-28 pt-12 md:scroll-mt-32 md:pt-16">
        <SectionKicker className="text-xs">LÍNEA DE TIEMPO</SectionKicker>
        <h2 className="mt-2 font-display text-2xl uppercase text-text-primary md:text-3xl">
          Las Tres Sagas
        </h2>
        <p className="mt-2 max-w-lg font-body text-sm text-text-secondary md:text-base">
          Tres generaciones. Tres guerras. Un mismo legado, contado en orden.
        </p>

        <div className="relative mt-8 md:mt-10">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-[19px]" aria-hidden="true" />
          <ol className="space-y-8 md:space-y-10">
            {sagas.map((saga, i) => (
              <li key={saga.name} className="relative pl-10 md:pl-14">
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center border-2 border-accent bg-background font-display text-xs font-bold text-accent [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] md:h-10 md:w-10 md:text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="border border-border bg-surface p-5 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] md:p-6">
                  <SectionKicker className="text-xs">{saga.kicker}</SectionKicker>
                  <h3 className="mt-2 font-display text-xl uppercase text-text-primary md:text-2xl">
                    {saga.name}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary md:text-base">
                    {saga.description}
                  </p>
                  <p className="mt-3 border-t border-border pt-3 font-body text-xs leading-relaxed text-text-secondary md:text-sm">
                    {saga.extended}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
