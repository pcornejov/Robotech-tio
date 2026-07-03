import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/capitulos" element={<ComingSoon title="Capítulos" />} />
        <Route path="/personajes" element={<ComingSoon title="Personajes" />} />
        <Route path="/mechas-sagas" element={<ComingSoon title="Mechas y Sagas" />} />
      </Route>
    </Routes>
  )
}

export default App
