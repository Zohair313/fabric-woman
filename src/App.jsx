import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Assistant from './components/Assistant'

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8001/adminpanel/'
  }, [])
  return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)', color: 'var(--cream)' }}>Redirecting to Admin Panel...</div>
}

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.classList.add('loaded')
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Cursor />
      {loading && <Preloader />}
      {!loading && (
        <>
          <div style={{ position: 'fixed', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '5px', fontSize: '10px', zIndex: 999999, pointerEvents: 'none' }}>
            System Live: v1.0.4
          </div>
          <Nav />
          <Assistant />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
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
