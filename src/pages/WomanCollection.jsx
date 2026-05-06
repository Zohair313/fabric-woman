import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WomanNav from '../components/WomanNav'
import { gsap } from 'gsap'

const PRODUCTS = [
  { id: 1, name: 'SILK VOILE', category: 'Fine', price: 'POA', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'RAW GREIGE', category: 'Heavy', price: 'POA', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'LINEN BLEND', category: 'Texture', price: 'POA', image: 'https://images.unsplash.com/photo-1529139572765-397437ef19b2?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'COTTON DRILL', category: 'Core', price: 'POA', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'SATIN LUSTRE', category: 'Fine', price: 'POA', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'ORGANZA', category: 'Fine', price: 'POA', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' },
]

const MODEL_IMAGES = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800'
]

export default function WomanCollection() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentModel, setCurrentModel] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentModel(prev => (prev + 1) % MODEL_IMAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true)
      else setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="coll-page">
      <style>{`
        .coll-page {
          background: #2D1D34;
          color: #FFFFFF;
          min-height: 100vh;
          padding: 180px 5vw 100px;
          font-family: 'Playfair Display', serif;
        }

        @media (max-width: 991px) {
          .coll-page { padding-top: 120px; }
          .coll-header { flex-direction: column; align-items: flex-start; gap: 2rem; margin-bottom: 4rem; }
          .coll-title { font-size: 4.5rem; margin-bottom: 2rem; }
          .coll-hero-slider { width: 100%; height: 350px; order: 2; }
          .coll-header > div:first-child { order: 1; }
          .coll-grid { grid-template-columns: 1fr; gap: 3rem; }
        }

        .w-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem 5vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .w-nav.scrolled {
          padding: 1.2rem 5vw;
          background: rgba(45, 29, 52, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(178, 132, 190, 0.2);
        }

        .w-logo {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.3rem;
          color: #FFFFFF;
          text-decoration: none;
        }

        .w-nav-links {
          display: flex;
          gap: 3rem;
          list-style: none;
        }

        .w-nav-link {
          color: #FFFFFF;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .w-nav-link:hover, .w-nav-link.active {
          opacity: 1;
        }

        .coll-header {
          margin-bottom: 8rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 4rem;
        }

        .coll-hero-slider {
          width: 400px;
          height: 550px;
          position: relative;
          overflow: hidden;
          background: #3D2D44;
        }

        .coll-model-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1), transform 2s;
          transform: scale(1.1);
        }

        .coll-model-img.active {
          opacity: 0.8;
          transform: scale(1);
        }

        .coll-title {
          font-size: clamp(3rem, 10vw, 10rem);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.8;
          margin-bottom: 9rem;
          color: #FFFFFF !important;
        }

        .coll-title span { 
          display: block; 
          color: #FFFFFF !important;
          opacity: 1 !important;
        }

        .coll-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.4rem;
          opacity: 0.6;
        }

        .coll-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4rem 2rem;
        }

        .coll-card {
          position: relative;
          text-decoration: none;
          color: inherit;
        }

        .coll-card-img-wrap {
          aspect-ratio: 4/5;
          overflow: hidden;
          background: #3D2D44;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .coll-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .coll-card:hover .coll-card-img {
          transform: scale(1.08);
        }

        .coll-card-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .coll-card-name {
          font-size: 1.2rem;
          letter-spacing: 0.1rem;
          margin-bottom: 0.5rem;
        }

        .coll-card-cat {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          opacity: 1;
          margin-bottom: 0.5rem;
          color: #FFFFFF;
        }

        .coll-card-price {
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.1rem;
          opacity: 0.6;
        }

        .coll-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 60%);
          opacity: 0.3;
          transition: opacity 0.5s;
        }

        .coll-card:hover .coll-card-overlay {
          opacity: 0.1;
        }

        @media (max-width: 991px) {
          .coll-grid { grid-template-columns: repeat(2, 1fr); }
          .coll-header { flex-direction: column; align-items: flex-start; }
          .coll-hero-slider { width: 100%; height: 400px; }
        }

        @media (max-width: 768px) {
          .coll-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav className={`w-nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/woman" className="w-logo">GREY</Link>
        <ul className="w-nav-links">
          <li><Link to="/woman" className="w-nav-link">Home</Link></li>
          <li><Link to="/woman/collection" className="w-nav-link active">Collection</Link></li>
          <li><Link to="/woman/contact" className="w-nav-link">Inquire</Link></li>
        </ul>
      </nav>

      <header className="coll-header">
        <div style={{ flex: 1 }}>
          <h1 className="coll-title">
            <span>THE</span>
            <span>CURATED</span>
            <span>EDIT</span>
          </h1>
          <p className="coll-subtitle">Woman 2.0 Collection / Summer 24</p>
        </div>
        
        <div className="coll-hero-slider">
          {MODEL_IMAGES.map((img, i) => (
            <img 
              key={i} 
              src={img} 
              className={`coll-model-img ${currentModel === i ? 'active' : ''}`}
              alt="Model" 
            />
          ))}
        </div>
      </header>

      <div className="coll-grid">
        {PRODUCTS.map(product => (
          <Link to="/woman/contact" key={product.id} className="coll-card">
            <div className="coll-card-img-wrap">
              <img src={product.image} alt={product.name} className="coll-card-img" />
              <div className="coll-card-overlay"></div>
            </div>
            <div className="coll-card-info">
              <div>
                <div className="coll-card-cat">{product.category}</div>
                <h3 className="coll-card-name">{product.name}</h3>
              </div>
              <div className="coll-card-price">{product.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
