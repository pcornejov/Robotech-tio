import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Capitulos from './pages/Capitulos'
import EpisodioPlayer from './pages/EpisodioPlayer'
import Personajes from './pages/Personajes'
import MechasSagas from './pages/MechasSagas'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/capitulos" element={<Capitulos />} />
        <Route path="/capitulos/:order" element={<EpisodioPlayer />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/mechas-sagas" element={<MechasSagas />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
