import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

export default function Contact() {
  useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', company: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main style={{ paddingTop: '120px', background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'var(--espresso)',
        padding: '5rem var(--gutter) 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            repeating-linear-gradient(45deg, rgba(200,185,168,0.04) 0px, rgba(200,185,168,0.04) 2px, transparent 2px, transparent 10px),
            repeating-linear-gradient(-45deg, rgba(200,185,168,0.04) 0px, rgba(200,185,168,0.04) 2px, transparent 2px, transparent 10px)
          `,
          backgroundSize: '10px 10px',
        }} />
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 7rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--cream)',
          position: 'relative',
          zIndex: 1,
          marginBottom: '1rem',
        }}>
          Let's talk fabric
        </h1>
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
          position: 'relative',
          zIndex: 1,
        }}>
          Samples · Bulk Orders · Custom Weaves
        </p>
      </div>

      {/* Two-col layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr',
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '6rem var(--gutter)',
        gap: '8rem',
        alignItems: 'start',
      }}>
        {/* Left info */}
        <div className="reveal-left">
          <span className="label" style={{ display: 'block', marginBottom: '2rem' }}>Get In Touch</span>

          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--espresso)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
              Email
            </div>
            <a href="mailto:hello@greyfabric.co" style={{ fontSize: '0.9rem', color: 'var(--taupe)', transition: 'color 0.3s' }}>
              hello@greyfabric.co
            </a>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--espresso)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
              Phone
            </div>
            <a href="tel:+923222548132" style={{ fontSize: '0.9rem', color: 'var(--taupe)' }}>
              +92 322 2548132
            </a>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--espresso)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
              Location
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--taupe)', lineHeight: 1.7 }}>
              Lahore, Punjab<br />Pakistan
            </p>
          </div>

          {/* Fabric swatch preview */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '3rem',
            paddingTop: '3rem',
            borderTop: '1px solid var(--greige)',
          }}>
            {['#E2D9CC', '#C8B9A8', '#9C8878', '#6B4F3A', '#2A1F17'].map((c, i) => (
              <div key={i} style={{
                width: '40px',
                height: '60px',
                background: c,
                backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)`,
              }} />
            ))}
          </div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--greige-mid)', marginTop: '1rem' }}>
            Request physical swatches
          </p>
        </div>

        {/* Form */}
        <div className="reveal-right">
          {sent ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'var(--greige)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--espresso)',
                marginBottom: '1rem',
              }}>
                Thank you.
              </div>
              <p style={{ color: 'var(--charcoal)', fontSize: '0.9rem' }}>
                We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company / Brand</label>
                <input
                  className="form-input"
                  type="text"
                  name="company"
                  placeholder="Your company or brand"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">What do you need?</label>
                <select
                  className="form-input"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  style={{ cursor: 'none' }}
                >
                  <option value="">Select inquiry type</option>
                  <option value="samples">Sample Request</option>
                  <option value="bulk">Bulk Order</option>
                  <option value="custom">Custom Weave / Mill Order</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  placeholder="Describe what you're looking for — fabric type, GSM, quantities..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button type="submit" className="cta-btn">
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
