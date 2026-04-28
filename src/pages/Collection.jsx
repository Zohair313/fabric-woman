import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const FILTERS = ['All', 'Cotton', 'Linen', 'Canvas']

const WOVEN_PATTERNS = {
  cotton: `repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 5px), repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 5px)`,
  linen: `repeating-linear-gradient(45deg, transparent 0px, transparent 6px, rgba(0,0,0,0.05) 6px, rgba(0,0,0,0.05) 7px), repeating-linear-gradient(-45deg, transparent 0px, transparent 6px, rgba(0,0,0,0.05) 6px, rgba(0,0,0,0.05) 7px)`,
  canvas: `repeating-linear-gradient(0deg, transparent 0px, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 9px), repeating-linear-gradient(90deg, transparent 0px, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 9px)`,
}

export default function Collection() {
  useScrollReveal()
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParam = searchParams.get('filter')
  const [activeFilter, setActiveFilter] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8001/api/products/')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (filterParam) {
      const matched = FILTERS.find(f => f.toLowerCase() === filterParam.toLowerCase())
      if (matched) setActiveFilter(matched)
    } else {
      setActiveFilter('All')
    }
  }, [filterParam])

  const handleFilterChange = (f) => {
    setActiveFilter(f)
    if (f === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ filter: f.toLowerCase() })
    }
  }

  const filtered = products.filter(p =>
    activeFilter === 'All' || (p.category_name && p.category_name.toLowerCase() === activeFilter.toLowerCase())
  )

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8001${url}`;
  };

  return (
    <main className="collection-page">
      <div className="collection-page__hero">
        <h1 className="collection-page__title">The Fabric Range</h1>
        <p className="collection-page__sub">40+ greige varieties · Sustainable sourcing · Bulk & sample orders</p>
      </div>

      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn${activeFilter === f ? ' active' : ''}`}
            onClick={() => handleFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.length > 0 ? (
          filtered.map((product, i) => {
            const imageUrl = getImageUrl(product.image);
            const catName = product.category_name || 'Cotton';
            const cat = catName.toLowerCase();
            
            return (
              <div key={i} className="product-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="product-card__image">
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: imageUrl ? `url(${imageUrl})` : product.color,
                    backgroundImage: imageUrl ? `url(${imageUrl})` : WOVEN_PATTERNS[cat],
                    backgroundSize: imageUrl ? 'cover' : '12px 12px',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    inset: 0,
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'rgba(42,31,23,0.1)',
                      letterSpacing: '0.1em',
                    }}>
                      {product.name ? (product.name.length > 8 ? 'Grey' : product.name) : 'Grey'}
                    </span>
                  </div>
                </div>
                <div className="product-card__body">
                  <div className="product-card__tag">{product.tag}</div>
                  <div className="product-card__name">{product.name}</div>
                  <div className="product-card__weight">{product.weight}</div>
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50' }}></span>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--espresso)', fontWeight: 500 }}>
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '12rem 2rem', background: 'var(--off-white)', border: '1px dashed var(--greige)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--espresso)' }}>
              "Fine things take time."
            </div>
            <p style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--taupe)', maxWidth: '400px', margin: '0 auto' }}>
              We are currently preparing new rolls of {activeFilter} greige. 
              Please check our other categories or contact us for a custom mill run.
            </p>
          </div>
        )}
      </div>

      <div style={{
        textAlign: 'center',
        padding: '6rem var(--gutter)',
        background: 'var(--greige)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          fontWeight: 300,
          color: 'var(--espresso)',
          marginBottom: '1.5rem',
          fontStyle: 'italic',
        }}>
          Need a custom weight or weave?
        </h2>
        <p style={{ color: 'var(--charcoal)', marginBottom: '2.5rem', maxWidth: '420px', margin: '0 auto 2.5rem' }}>
          We take custom mill orders for brands that need specific GSM,
          width, or fibre composition.
        </p>
        <Link to="/contact" className="cta-btn"><span>Talk to Us</span></Link>
      </div>

      <Footer />
    </main>
  )
}
