import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

export default function Upcoming() {
  useScrollReveal()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8001/api/products/upcoming/')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error("Error fetching upcoming products:", err)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8001${url}`;
  };

  return (
    <main className="collection-page">
      <div className="collection-page__hero" style={{ background: 'var(--espresso)' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            repeating-linear-gradient(45deg, rgba(200,185,168,0.03) 0px, rgba(200,185,168,0.03) 2px, transparent 2px, transparent 10px),
            repeating-linear-gradient(-45deg, rgba(200,185,168,0.03) 0px, rgba(200,185,168,0.03) 2px, transparent 2px, transparent 10px)
          `,
          backgroundSize: '10px 10px',
        }} />
        <h1 className="collection-page__title" style={{ color: 'var(--cream)' }}>Coming Soon</h1>
        <p className="collection-page__sub" style={{ color: 'var(--taupe)' }}>
          Exclusive preview of our upcoming raw collections.
        </p>
      </div>

      <div className="products-grid" style={{ padding: '6rem var(--gutter)' }}>
        {products.length > 0 ? (
          products.map((product, i) => {
            const imageUrl = getImageUrl(product.image);
            return (
              <div key={i} className="product-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="product-card__image">
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: imageUrl ? `url(${imageUrl})` : product.color,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.8
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'var(--cream)',
                    color: 'var(--espresso)',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    zIndex: 2
                  }}>
                    Coming Soon
                  </div>
                </div>
                <div className="product-card__body">
                  <div className="product-card__tag">{product.tag}</div>
                  <div className="product-card__name">{product.name}</div>
                  <div className="product-card__weight">{product.weight}</div>
                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--charcoal)', opacity: 0.7, lineHeight: 1.6 }}>
                    {product.description || 'Our next generation of raw greige material, currently in production.'}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '12rem 2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--espresso)' }}>
              "The next chapter is being written."
            </div>
            <p style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--taupe)' }}>
              We are currently finalizing our next batch of releases.
            </p>
          </div>
        )}
      </div>

      <div style={{
        textAlign: 'center',
        padding: '8rem var(--gutter)',
        background: 'var(--off-white)',
        borderTop: '1px solid var(--greige)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          fontWeight: 300,
          color: 'var(--espresso)',
          marginBottom: '1.5rem',
          fontStyle: 'italic',
        }}>
          Be the first to know
        </h2>
        <p style={{ color: 'var(--charcoal)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
          Registered brands get early access to sample yardage and priority booking on all upcoming rolls.
        </p>
        <Link to="/contact" className="cta-btn"><span>Get Early Access</span></Link>
      </div>

      <Footer />
    </main>
  )
}
