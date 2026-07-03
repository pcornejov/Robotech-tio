import SectionKicker from '../ui/SectionKicker'
import SagaCard from './SagaCard'
import { sagas } from '../../data/sagas'

/**
 * Home teaser for the three Robotech sagas, between Hero and Why.
 */
export default function SagasSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="text-center">
        <SectionKicker className="text-sm">TRES SAGAS, UNA GUERRA</SectionKicker>
        <h2 className="mt-2 font-display text-2xl uppercase text-text-primary md:text-3xl lg:text-4xl">
          Las Sagas de Robotech
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-text-secondary">
          Tres generaciones. Tres guerras. Un mismo legado.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 md:mt-12">
        {sagas.map((saga) => (
          <SagaCard key={saga.name} {...saga} />
        ))}
      </div>
    </section>
  )
}
