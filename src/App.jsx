import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import WomanHome from './pages/WomanHome'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import WomanCollection from './pages/WomanCollection'
import WomanContact from './pages/WomanContact'


const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8001/adminpanel/'
  }, [])
  return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)', color: 'var(--cream)' }}>Redirecting to Admin Panel...</div>
}

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const isWomanPage = location.pathname.startsWith('/woman')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.classList.add('loaded')
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isWomanPage) {
      document.body.classList.add('woman-theme')
    } else {
      document.body.classList.remove('woman-theme')
    }
  }, [isWomanPage])

  return (
    <>
      <Cursor />
      {loading && <Preloader />}
      {!loading && (
        <>
          <div className="system-badge" style={{ position: 'fixed', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '5px', fontSize: '10px', zIndex: 999999, pointerEvents: 'none' }}>
            System Live: v1.1.5
          </div>
          <style>{`
            @media (max-width: 768px) {
              .system-badge { display: none; }
            }
          `}</style>
          
          {/* Main Nav only shows on non-woman pages */}
          {!isWomanPage && <Nav />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/woman" element={<WomanHome />} />
            <Route path="/woman/collection" element={<WomanCollection />} />
            <Route path="/woman/contact" element={<WomanContact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/adminpanel" element={<RedirectToAdmin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
