import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { useScrollReveal, useParallax } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

// Color swatches matching greige/fabric palette
const SWATCHES = [
  { color: '#E8DFD0', name: 'Ecru' },
  { color: '#C8B9A8', name: 'Greige' },
  { color: '#9C8878', name: 'Taupe' },
  { color: '#6B4F3A', name: 'Camel' },
  { color: '#2A1F17', name: 'Espresso' },
  { color: '#B5A898', name: 'Linen' },
]

const FABRICS = [
  {
    name: 'Raw Cotton',
    meta: '100% Cotton · 140gsm',
    tag: 'Woven',
    bg: '#C8B9A8',
    stock: '2,400m',
    textureStyle: {
      background: 'repeating-linear-gradient(45deg, #C8B9A8 0px, #BEAe9D 2px, #C8B9A8 4px)',
    },
  },
  {
    name: 'Linen Greige',
    meta: 'Linen Blend · 180gsm',
    tag: 'Natural',
    bg: '#D4C4B0',
    stock: '1,150m',
    textureStyle: {
      background: 'repeating-linear-gradient(0deg, #D4C4B0 0px, #CAB8A2 3px, #D4C4B0 6px)',
    },
  },
  {
    name: 'Muslin Base',
    meta: 'Fine Cotton · 90gsm',
    tag: 'Sheer',
    bg: '#E2D9CC',
    stock: '850m',
    textureStyle: {
      background: 'repeating-linear-gradient(90deg, #E2D9CC 0px, #D8CEBF 2px, #E2D9CC 4px)',
    },
  },
  {
    name: 'Heavy Canvas',
    meta: 'Cotton Canvas · 320gsm',
    tag: 'Structured',
    bg: '#9C8878',
    stock: '3,200m',
    textureStyle: {
      background: 'repeating-linear-gradient(45deg, #9C8878 0px, #8E7A6A 3px, #9C8878 6px)',
    },
  },
]

const TESTIMONIALS = [
  {
    quote: '"Grey fabric is the foundation of every collection we produce. The consistency is unmatched — every metre is exactly what we ordered."',
    author: 'Aisha Raza — Creative Director, Studio Naksh',
  },
  {
    quote: '"We\'ve sourced greige from across Pakistan and abroad. Grey consistently delivers the cleanest base cloth we\'ve found at scale."',
    author: 'Omar Farooq — Head of Sourcing, Crescent Textiles',
  },
  {
    quote: '"The raw feel, the drape, the weight — it all translates beautifully once dyed. It\'s our go-to for luxury upholstery projects."',
    author: 'Sana Ali — Interior Designer, Form & Fold',
  },
]

// Fabric texture SVG data URIs for hero background
const heroFabricBg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E`

const CountUp = ({ end, suffix = '', duration = 2.5 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startObj = { val: 0 }
          gsap.to(startObj, {
            val: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
              setCount(Math.floor(startObj.val))
            }
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Home() {
  useScrollReveal()
  const heroBgRef = useRef(null)
  const heroHeadRef = useRef(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [heroColor, setHeroColor] = useState('#2A1F17')
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)
  const [fabrics, setFabrics] = useState([
    { name: 'Industrial Cotton', weight: '320gsm', tag: 'Heavy Duty', stock: '2,400m', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Standard Greige', weight: '180gsm', tag: 'Raw Material', stock: '1,150m', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800' },
    { name: 'Woven Twill', weight: '220gsm', tag: 'Apparel', stock: '850m', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' },
    { name: 'Canvas Pro', weight: '450gsm', tag: 'Technical', stock: '3,200m', image: 'https://images.unsplash.com/photo-1574015974293-817f0efebb1b?auto=format&fit=crop&q=80&w=800' }
  ])

  const getImageUrl = (url) => url;

  // Parallax on hero fabric bg
  useParallax(heroBgRef, 0.25)

  // Hero entrance animation
  useEffect(() => {
    if (!heroHeadRef.current) return
    const lines = heroHeadRef.current.querySelectorAll('.h-line')
    gsap.fromTo(
      lines,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  // Vanta.js Topology Init
  useEffect(() => {
    if (vantaEffect) vantaEffect.destroy()

    if (window.VANTA && window.VANTA.TOPOLOGY) {
      setVantaEffect(
        window.VANTA.TOPOLOGY({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xffffff, // White lines for dark theme
          backgroundColor: parseInt(heroColor.replace('#', ''), 16),
          backgroundAlpha: 0.0 // Transparent to show fabric texture
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [heroColor])

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          {/* Woven texture via SVG noise + CSS pattern */}
          <div
            ref={heroBgRef}
            style={{
              width: '100%',
              height: '110%',
              marginTop: '-5%',
              backgroundColor: heroColor,
              backgroundImage: `
                url("${heroFabricBg}"),
                repeating-linear-gradient(0deg, rgba(42,31,23,0) 0px, rgba(42,31,23,0) 3px, rgba(200,185,168,0.08) 3px, rgba(200,185,168,0.08) 4px),
                repeating-linear-gradient(90deg, rgba(42,31,23,0) 0px, rgba(42,31,23,0) 3px, rgba(200,185,168,0.08) 3px, rgba(200,185,168,0.08) 4px),
                radial-gradient(ellipse at 30% 60%, ${heroColor} 0%, color-mix(in srgb, ${heroColor}, black 40%) 100%)
              `,
              backgroundSize: '400px 400px, 8px 8px, 8px 8px, 100% 100%',
              transition: 'background 0.5s ease',
            }}
          />
        </div>
        <div className="hero__overlay" />

        <div className="hero__content">
          <div ref={heroHeadRef}>
            <div className="overflow-hidden">
              <span className="h-line" style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(4rem,9vw,10rem)', color: 'var(--cream)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                Raw.
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="h-line" style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(4rem,9vw,10rem)', color: 'var(--cream)', lineHeight: 0.95, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                Unfinished.
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="h-line" style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(4rem,9vw,10rem)', color: 'var(--greige)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                Pure.
              </span>
            </div>
          </div>

          <div className="hero__right">
            <p className="hero__meta">
              Grey greige fabric — the origin material.<br />
              Undyed. Unprocessed. Ready for your vision.
            </p>
            <div className="hero__swatches">
              {SWATCHES.map((s, i) => (
                <div
                  key={i}
                  className="hero__swatch"
                  style={{
                    background: s.color,
                    borderColor: s.color === heroColor ? 'var(--cream)' : 'rgba(255,255,255,0.15)'
                  }}
                  title={s.name}
                  onClick={() => setHeroColor(s.color)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <div className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>

        {/* Vanta Birds overlay (flies over text) */}
        <div
          ref={vantaRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* ── MARQUEE ── */}
      <section className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, set) => (
            <div key={set} style={{ display: 'flex', gap: 0 }}>
              {['Grey Fabric', 'Greige', 'Raw Material', 'Pure Texture', 'Woven Origin', 'Natural Base', 'Unfinished Form'].map((word, i) => (
                <div key={i} className="marquee-item">
                  {i % 3 === 1 ? <em>{word}</em> : <span>{word}</span>}
                  <div className="marquee-dot" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: 'var(--off-white)' }}>
        <div className="about">
          <div className="reveal-left">
            <div className="about__label">
              <span className="label">Our Origin</span>
            </div>
            <h2 className="about__heading">
              Fabric in its<br /><em>truest form</em>
            </h2>
            <p className="about__body">
              Grey fabric — or greige — is textile in its most honest state.
              No dyes. No finishes. No masking. It is the raw canvas that
              every garment, every upholstered chair, every home textile begins
              from. We source, mill, and supply greige at the standard that
              serious designers demand.
            </p>
            <div className="about__stat-row">
              <div>
                <div className="about__stat-num"><CountUp end={40} suffix="+" /></div>
                <div className="about__stat-label">Fabric Weights</div>
              </div>
              <div>
                <div className="about__stat-num"><CountUp end={12} suffix="yr" /></div>
                <div className="about__stat-label">In the Industry</div>
              </div>
              <div>
                <div className="about__stat-num"><CountUp end={8} suffix="M+" /></div>
                <div className="about__stat-label">Metres Supplied</div>
              </div>
            </div>
          </div>

          <div className="about__image-wrap reveal-right">
            {/* Fabric-texture generated image placeholder */}
            <div style={{
              width: '100%',
              height: '100%',
              background: `
                repeating-linear-gradient(45deg, #C8B9A8 0px, #BFB09F 2px, #C8B9A8 8px, #D4C4B0 8px, #CBB9A5 10px, #D4C4B0 16px),
                repeating-linear-gradient(-45deg, rgba(100,80,60,0.12) 0px, transparent 4px)
              `,
              backgroundSize: '22px 22px, 22px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'rgba(244,239,232,0.85)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--espresso)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Greige Weave
                </div>
                <div className="label">Cotton · 140gsm · 58" Width</div>
              </div>
            </div>
            <div className="about__image-tag">Est. 2013 · Lahore, Pakistan</div>
          </div>
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section className="collection">
        <div className="collection__header">
          <h2 className="collection__heading">Our Fabrics</h2>
          <Link to="/collection" className="collection__link">View All →</Link>
        </div>
        <div className="collection__grid">
          {(fabrics.length > 0 ? fabrics : FABRICS).map((fabric, i) => {
            const imageUrl = getImageUrl(fabric.image);
            const fabricColor = fabric.color || '#E2D9CC';
            const texture = `repeating-linear-gradient(45deg, ${fabricColor} 0px, rgba(0,0,0,0.05) 2px, ${fabricColor} 4px)`;

            return (
              <div key={i} className={`fabric-card scale-in`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div
                  className="fabric-card__img"
                  style={{
                    background: imageUrl ? `url(${imageUrl})` : fabricColor,
                    backgroundImage: imageUrl ? `url(${imageUrl})` : texture,
                    backgroundSize: imageUrl ? 'cover' : '10px 10px',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    inset: 0,
                  }}
                />
                {/* Woven cross-hatch overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: imageUrl ? 'none' : `
                    repeating-linear-gradient(0deg, transparent 0, transparent 6px, rgba(0,0,0,0.03) 6px, rgba(0,0,0,0.03) 7px),
                    repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(0,0,0,0.03) 6px, rgba(0,0,0,0.03) 7px)
                  `,
                  backgroundSize: '7px 7px',
                }} />
                <span className="fabric-card__tag">{fabric.tag}</span>
                <div className="fabric-card__overlay" />
                <div className="fabric-card__info">
                  <div className="fabric-card__name">{fabric.name}</div>
                  <div className="fabric-card__meta">{fabric.weight}</div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4CAF50' }}></span>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--greige-mid)', fontWeight: 500 }}>
                      In Stock: {fabric.stock}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: 'var(--off-white)' }}>
        <div className="process">
          <div className="process__header">
            <div className="reveal-left">
              <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>How We Work</span>
              <h2 className="process__heading">From loom<br />to doorstep</h2>
            </div>
            <p className="process__intro reveal-right">
              Every roll of Grey fabric passes through a meticulous chain — from raw fibre selection
              to final quality inspection — before it reaches your production line.
            </p>
          </div>
          <div className="process__steps">
            {[
              { n: '01', title: 'Fibre Selection', text: 'We source cotton and linen from trusted farms, selecting only fibres that meet our density and purity benchmarks.' },
              { n: '02', title: 'Weaving', text: 'Woven on industrial looms calibrated for consistent thread count, selvedge alignment, and weight uniformity.' },
              { n: '03', title: 'Grey State', text: 'The cloth is kept in its greige state — no bleach, no dye, no sizing compounds — preserving natural character.' },
              { n: '04', title: 'Quality & Dispatch', text: 'Every batch is inspected for defects, tension, and GSM before being rolled, labelled, and dispatched.' },
            ].map((step, i) => (
              <div key={i} className="process__step reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="process__step-line" />
                <div className="process__step-num">{step.n}</div>
                <div className="process__step-title">{step.title}</div>
                <p className="process__step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK / COLOUR ── */}
      <section className="lookbook">
        <h2 className="lookbook__heading reveal">The Colour of Raw</h2>

        <div className="lookbook__grid">
          {/* Large featured texture */}
          {[
            { bg: 'linear-gradient(135deg, #C8B9A8 0%, #BFB09F 50%, #B5A696 100%)', label: 'Natural Ecru' },
            { bg: 'repeating-linear-gradient(45deg, #D4C4B0 0px, #CBB9A5 4px, #D4C4B0 8px)', label: 'Linen Weave' },
            { bg: 'radial-gradient(circle at 40% 40%, #E2D9CC, #C8B9A8)', label: 'Cotton Voile' },
            { bg: 'repeating-linear-gradient(0deg, #9C8878 0px, #8E7A6A 3px, #9C8878 10px)', label: 'Raw Canvas' },
            { bg: 'linear-gradient(160deg, #6B4F3A, #5A4030)', label: 'Heavy Drill' },
          ].map((cell, i) => (
            <div key={i} className="lookbook-cell reveal scale-in" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: cell.bg,
                backgroundSize: '20px 20px',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.5rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: i > 2 ? 'rgba(244,239,232,0.7)' : 'rgba(42,31,23,0.6)',
                }}>
                  {cell.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Swatch palette */}
        <div className="lookbook__swatch-row reveal">
          {SWATCHES.map((s, i) => (
            <div key={i} className="lookbook__swatch-item">
              <div className="lookbook__swatch-circle" style={{ background: s.color }} />
              <span className="lookbook__swatch-name">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials">
        <div className="testimonials__label">
          <span className="label" style={{ color: 'var(--taupe)' }}>Client Words</span>
        </div>
        <div className="testimonial-item">
          <p className="testimonial-quote" style={{ transition: 'opacity 0.4s' }}>
            {TESTIMONIALS[activeTestimonial].quote}
          </p>
          <div className="testimonial-author">
            — {TESTIMONIALS[activeTestimonial].author}
          </div>
        </div>
        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot${i === activeTestimonial ? ' active' : ''}`}
              onClick={() => setActiveTestimonial(i)}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2 className="cta-section__heading reveal">
          Ready to source <em>raw</em> fabric?
        </h2>
        <p className="cta-section__sub reveal">
          Whether you're a fashion house, home goods brand, or textile importer —
          Grey delivers consistent greige at every scale.
        </p>
        <div className="reveal">
          <Link to="/contact" className="cta-btn"><span>Request Samples</span></Link>
          <Link to="/collection" className="cta-btn-outline">Browse Fabrics</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
