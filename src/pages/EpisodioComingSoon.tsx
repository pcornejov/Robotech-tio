import { useParams } from 'react-router-dom'
import ComingSoon from './ComingSoon'

export default function EpisodioComingSoon() {
  const { order } = useParams<{ order: string }>()
  return <ComingSoon title={`Episodio ${order}`} />
}
