import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Shared page shell: Navbar + routed page content + Footer.
 */
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
