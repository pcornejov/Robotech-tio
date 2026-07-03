import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import Capitulos from './pages/Capitulos'
import EpisodioPlayer from './pages/EpisodioPlayer'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/capitulos" element={<Capitulos />} />
        <Route path="/capitulos/:order" element={<EpisodioPlayer />} />
        <Route path="/personajes" element={<ComingSoon title="Personajes" />} />
        <Route path="/mechas-sagas" element={<ComingSoon title="Mechas y Sagas" />} />
      </Route>
    </Routes>
  )
}

export default App
