import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import WomanNav from '../components/WomanNav'

gsap.registerPlugin(ScrollTrigger)

export default function WomanHome() {
  const containerRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    console.log('Grey 2.0 Woman Section Mounted')
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.w-hero-title span', {
        y: 150,
        rotate: 5,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
      })

      gsap.from('.w-hero-image-wrap', {
        x: 100,
        opacity: 0,
        duration: 2,
        ease: 'power3.out'
      })

      // Horizontal Scroll Section - Only on Desktop
      if (window.innerWidth > 991) {
        const sections = gsap.utils.toArray('.w-horiz-panel')
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.w-horiz-container',
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => '+=' + document.querySelector('.w-horiz-container').offsetWidth
          }
        })
      }

      // Vertical text reveal
      gsap.from('.w-reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.w-reveal-trigger',
          start: 'top 80%'
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="w-page" ref={containerRef}>
      <style>{`
        .w-page {
          background-color: #2D1D34;
          color: #B284BE;
          overflow-x: hidden;
          font-family: 'Playfair Display', serif;
        }

          @media (max-width: 991px) {
            .w-hero { height: auto; min-height: 100vh; padding: 120px 5vw 60px; display: block; }
            .w-hero-content { grid-template-columns: 1fr; gap: 4rem; display: flex; flex-direction: column; }
            .w-hero-title { font-size: 5rem; line-height: 1; }
            .w-hero-image-wrap { height: 50vh; width: 100%; clip-path: none; order: -1; }
            .w-hero-bg-text { display: none; }
            .w-hero-tag { display: none; }
            
            .w-horiz-container { height: auto; width: 100%; flex-direction: column; display: block; }
            .w-horiz-panel { height: auto; width: 100%; padding: 60px 5vw; border-bottom: 1px solid rgba(178, 132, 190, 0.1); display: block; }
            .w-panel-content { grid-template-columns: 1fr; gap: 3rem; text-align: center; display: flex; flex-direction: column; }
            .w-panel-text { font-size: 1.8rem; order: 2; }
            .w-panel-text h2 { font-size: 2.5rem; line-height: 1.1; }
            .w-panel-img { width: 100%; height: 400px; object-fit: cover; border-radius: 10px; order: 1; }
            
            .w-footer-alt-content { flex-direction: column; text-align: center; gap: 3rem; }
            .w-footer-social { justify-content: center; }
          }

        .w-hero {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 5vw 0;
          overflow: hidden;
        }

        .w-hero-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(10rem, 30vw, 40rem);
          font-weight: 900;
          color: rgba(178, 132, 190, 0.03);
          z-index: 0;
          white-space: nowrap;
          pointer-events: none;
          text-transform: uppercase;
          letter-spacing: -2rem;
        }

        .w-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
        }

        .w-hero-text-block {
          position: relative;
          z-index: 3;
        }

        .w-hero-title {
          font-size: clamp(0.5rem, 7vw, 13rem);
          line-height: 0.85;
          text-transform: uppercase;
          font-weight: 900;
          margin-left: -0.5rem;
          color: #B284BE;
          mix-blend-mode: screen;
        }

        .w-hero-title span {
          display: block;
        }

        .w-hero-title .italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          text-transform: lowercase;
          margin-top: -1rem;
          letter-spacing: -0.2rem;
        }

        .w-hero-image-wrap {
          position: relative;
          height: 80vh;
          width: 100%;
          overflow: hidden;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .w-hero-image-wrap:hover {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .w-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.1);
          transition: transform 1.5s ease;
        }

        .w-hero-image-wrap:hover .w-hero-img {
          transform: scale(1);
        }

        .w-hero-tag {
          position: absolute;
          top: 2rem;
          left: -2rem;
          background: #B284BE;
          color: #2D1D34;
          padding: 1rem 2rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3rem;
          font-size: 0.7rem;
          transform: rotate(-90deg);
          transform-origin: top left;
        }

        .w-horiz-container {
          width: 400%;
          height: 100vh;
          display: flex;
          flex-wrap: nowrap;
        }

        .w-horiz-panel {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5vw;
          flex-shrink: 0;
          position: relative;
        }

        .w-horiz-panel:nth-child(even) {
          background: #B284BE;
          color: #2D1D34;
        }

        .w-panel-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1200px;
        }

        .w-panel-img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 50%;
        }

        .w-panel-text {
          font-size: 3rem;
          line-height: 1.1;
        }

        .w-footer-alt {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: #B284BE;
          color: #2D1D34;
        }

        .w-marquee-v {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 50px;
          background: #B284BE;
          display: flex;
          flex-direction: column;
          z-index: 10;
          border-left: 1px solid rgba(45, 29, 52, 0.2);
          overflow: hidden;
        }

        .w-marquee-v__inner {
          display: flex;
          flex-direction: column;
          writing-mode: vertical-rl;
          white-space: nowrap;
          animation: marqueeVertical 20s linear infinite;
          padding: 2rem 0;
          gap: 4rem;
        }

        .w-marquee-v span {
          font-weight: 900;
          letter-spacing: 0.5rem;
          text-transform: uppercase;
          font-size: 0.8rem;
          color: #2D1D34;
        }

        @keyframes marqueeVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @media (max-width: 768px) {
          .w-hero-split { flex-direction: column; }
          .w-panel-content { grid-template-columns: 1fr; text-align: center; }
          .w-marquee-v { display: none; }
          .w-nav-links { display: flex; gap: 1rem; }
        }

        /* NEW FOOTER & INQUIRY STYLES */
        .w-inquiry-section {
          padding: 10rem 5vw;
          background: #B284BE;
          color: #2D1D34;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .w-inquiry-title {
          font-size: clamp(3rem, 8vw, 10rem);
          line-height: 0.9;
          text-transform: uppercase;
          font-weight: 900;
          margin-bottom: 3rem;
        }

        .w-footer {
          background: #2D1D34;
          color: #B284BE;
          padding: 8rem 5vw 4rem;
          border-top: 1px solid rgba(178, 132, 190, 0.1);
        }

        .w-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 6rem;
        }

        .w-footer-brand {
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: 0.8rem;
          margin-bottom: 2rem;
        }

        .w-footer-col-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          margin-bottom: 2.5rem;
          opacity: 0.6;
        }

        .w-footer-links {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .w-footer-link {
          font-size: 1.1rem;
          text-decoration: none;
          color: inherit;
          transition: opacity 0.3s;
        }

        .w-footer-link:hover {
          opacity: 0.6;
        }

        .w-footer-bottom {
          padding-top: 4rem;
          border-top: 1px solid rgba(178, 132, 190, 0.1);
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          opacity: 0.5;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
        }

        @media (max-width: 991px) {
          .w-footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 576px) {
          .w-footer-grid { grid-template-columns: 1fr; }
          .w-footer-bottom { flex-direction: column; gap: 2rem; text-align: center; }
        }
      `}</style>

      <WomanNav />

      <div className="w-marquee-v">
        <div className="w-marquee-v__inner">
          <span>GREY 2.0 FOR WOMAN · GREY 2.0 FOR WOMAN · GREY 2.0 FOR WOMAN ·&nbsp;</span>
          <span>GREY 2.0 FOR WOMAN · GREY 2.0 FOR WOMAN · GREY 2.0 FOR WOMAN ·&nbsp;</span>
        </div>
      </div>

      <header className="w-hero">
        <div className="w-hero-bg-text">WOMAN</div>
        
        <div className="w-hero-content">
          <div className="w-hero-text-block">
            <h1 className="w-hero-title">
              <span>FEMME</span>
              <span className="italic">extraordinaire</span>
              <span>FORTE</span>
            </h1>
            <p style={{ marginTop: '3rem', fontSize: '1.2rem', maxWidth: '450px', lineHeight: '1.8', opacity: 0.8 }}>
              A unique vision of retail. Where the raw foundation of Grey meets the sculptural elegance of the modern woman.
            </p>
            <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link to="/woman/collection" style={{ 
                padding: '1.2rem 1.8rem', 
                background: '#B284BE', 
                color: '#2D1D34', 
                fontWeight: '900', 
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Shop Collection
              </Link>
              <Link to="/about" style={{ color: 'inherit', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontWeight: '700' }}>
                Learn More
              </Link>
            </div>
          </div>

          <div className="w-hero-image-wrap">
            <div className="w-hero-tag">Grey 2.0 / Summer 24</div>
            <img 
              className="w-hero-img" 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
              alt="Femme Forte" 
            />
          </div>
        </div>
      </header>

      <div className="w-horiz-container">
        <section className="w-horiz-panel">
          <div className="w-panel-content">
            <Link to="/woman/collection" style={{ width: '100%' }}>
              <img className="w-panel-img" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" alt="Fashion 1" />
            </Link>
            <div className="w-panel-text">
              <h2>The Sculpted<br />Silhouette</h2>
              <p style={{ fontSize: '1rem', marginTop: '2rem' }}>We use heavy-weight greige to create structures that defy expectation.</p>
            </div>
          </div>
        </section>

        <section className="w-horiz-panel">
          <div className="w-panel-content">
            <div className="w-panel-text">
              <h2>The Ethereal<br />Flow</h2>
              <p style={{ fontSize: '1rem', marginTop: '2rem' }}>Fine silk bases that move with the body like a second skin.</p>
            </div>
            <Link to="/woman/collection" style={{ width: '100%' }}>
              <img className="w-panel-img" src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800" alt="Fashion 2" />
            </Link>
          </div>
        </section>

        <section className="w-horiz-panel">
          <div className="w-panel-content">
            <Link to="/woman/collection" style={{ width: '100%' }}>
              <img className="w-panel-img" src="https://images.unsplash.com/photo-1529139572765-397437ef19b2?auto=format&fit=crop&q=80&w=800" alt="Fashion 3" />
            </Link>
            <div className="w-panel-text">
              <h2>A Vision In<br />Yellow</h2>
              <p style={{ fontSize: '1rem', marginTop: '2rem' }}>Bold color meets raw texture. This is Grey 2.0.</p>
            </div>
          </div>
        </section>

        <section className="w-horiz-panel">
          <div className="w-panel-content">
             <h2 style={{ fontSize: '5rem', gridColumn: 'span 2', textAlign: 'center' }}>GREY 2.0</h2>
          </div>
        </section>
      </div>

      {/* INQUIRY SECTION */}
      <section className="w-inquiry-section">
        <h2 className="w-inquiry-title">Ready to<br />Inquire?</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 4rem', opacity: 0.8 }}>
          Our bespoke services are tailored for the modern woman who values the raw beauty of fabric and the precision of couture.
        </p>
        <Link to="/woman/contact" style={{ 
          display: 'inline-block',
          padding: '2rem 5rem', 
          background: '#2D1D34', 
          color: '#B284BE', 
          textTransform: 'uppercase', 
          letterSpacing: '4px', 
          fontWeight: '900', 
          textDecoration: 'none',
          fontSize: '1.2rem'
        }}>
          Start Inquiry
        </Link>
      </section>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="w-footer">
        <div className="w-footer-grid">
          <div>
            <div className="w-footer-brand">GREY</div>
            <p style={{ maxWidth: '300px', lineHeight: '1.8', opacity: 0.7 }}>
              Karachi-based fabric house specializing in the raw, the pure, and the intentional. Grey 2.0 represents our leap into the feminine form.
            </p>
          </div>

          <div>
            <div className="w-footer-col-title">Navigation</div>
            <ul className="w-footer-links">
              <li><Link to="/woman" className="w-footer-link">Home</Link></li>
              <li><Link to="/about" className="w-footer-link">About Us</Link></li>
              <li><Link to="/woman/contact" className="w-footer-link">Contact</Link></li>
              <li><Link to="/faq" className="w-footer-link">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <div className="w-footer-col-title">Collection</div>
            <ul className="w-footer-links">
              <li><Link to="/woman/collection" className="w-footer-link">Woman 2.0</Link></li>
              <li><Link to="/woman/collection" className="w-footer-link">Raw Greige</Link></li>
              <li><Link to="/woman/collection" className="w-footer-link">Silks & Voiles</Link></li>
              <li><Link to="/woman/collection" className="w-footer-link">Bespoke</Link></li>
            </ul>
          </div>

          <div>
            <div className="w-footer-col-title">Contact</div>
            <ul className="w-footer-links">
              <li><a href="mailto:hello@greyfabric.co" className="w-footer-link">hello@greyfabric.co</a></li>
              <li><a href="tel:+923222548132" className="w-footer-link">+92 322 2548132</a></li>
              <li style={{ marginTop: '1rem', opacity: 0.6 }}>Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="w-footer-bottom">
          <span>© {new Date().getFullYear()} Grey Fabric House</span>
          <span>Designed for the Modern Woman</span>
        </div>
      </footer>
    </div>
  )
}
