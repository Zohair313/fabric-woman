import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

export default function WomanNav() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <style>{`
        .w-nav-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2.5rem 5vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2000;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .w-nav-container.scrolled {
          padding: 1.2rem 5vw;
          background: rgba(45, 29, 52, 0.95);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(178, 132, 190, 0.15);
        }

        .w-nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.5rem;
          color: #FFFFFF;
          text-decoration: none;
          z-index: 2001;
        }

        .w-nav-desktop {
          display: flex;
          gap: 3rem;
          list-style: none;
        }

        .w-nav-link {
          color: #FFFFFF;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .w-nav-link:hover, .w-nav-link.active {
          opacity: 1;
        }

        .w-nav-mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 1.8rem;
          cursor: pointer;
          z-index: 2001;
        }

        .w-mobile-overlay {
          position: fixed;
          inset: 0;
          background: #2D1D34;
          z-index: 1999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          transform: translateY(-100%);
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .w-mobile-overlay.active {
          transform: translateY(0);
        }

        .w-mobile-link {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          color: #FFFFFF;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
        }

        @media (max-width: 1100px) {
          .w-nav-desktop { display: none !important; }
          .w-nav-mobile-toggle { display: block !important; }
          .w-nav-container { padding: 1.5rem 5vw !important; }
        }
      `}</style>

      <nav className={`w-nav-container ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="w-nav-logo">GREY</Link>
        
        <ul className="w-nav-desktop">
          <li><Link to="/" className={`w-nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
          <li><Link to="/collection" className={`w-nav-link ${location.pathname === '/collection' ? 'active' : ''}`}>Collection</Link></li>
          <li><Link to="/contact" className={`w-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Inquire</Link></li>
        </ul>

        <button className="w-nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <div className={`w-mobile-overlay ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="w-mobile-link">Home</Link>
        <Link to="/collection" className="w-mobile-link">Collection</Link>
        <Link to="/contact" className="w-mobile-link">Inquire</Link>
      </div>
    </>
  )
}
