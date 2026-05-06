import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WomanNav from '../components/WomanNav'

export default function WomanContact() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true)
      else setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="inq-page">
      <style>{`
        .inq-page {
          background: #2D1D34;
          color: #E6D5ED;
          min-height: 100vh;
          padding: 240px 5vw 100px;
          font-family: 'Playfair Display', serif;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
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

        .inq-title {
          font-size: clamp(3rem, 7vw, 8.5rem);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.85;
          margin-bottom: 8.5rem;
          color: #FFFFFF !important;
          position: relative;
          z-index: 10;
        }

        .inq-title span { 
          display: block;
          color: #FFFFFF !important;
          opacity: 1 !important;
          mix-blend-mode: normal !important;
        }

        .inq-info {
          font-family: 'Jost', sans-serif;
          max-width: 450px;
        }

        .inq-info-item {
          margin-bottom: 2rem;
        }

        .inq-info-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.3rem;
          color: #FFFFFF;
          opacity: 0.6;
          margin-bottom: 1rem;
        }

        .inq-info-value {
          font-size: 1.4rem;
          font-weight: 400;
          color: #FFFFFF;
        }

        .inq-form-wrap {
          background: #34223bff !important;
          padding: 4rem;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(36, 36, 36, 0.5);
          position: relative;
          z-index: 10;
          display: block !important;
          opacity: 1 !important;
        }

        .inq-input-group {
          margin-bottom: 2.5rem;
        }

        .inq-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          margin-bottom: 0.8rem;
          color: #FFFFFF !important;
          opacity: 1 !important;
        }

        .inq-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05) !important;
          border: none;
          border-bottom: 3px solid #FFFFFF !important;
          color: #FFFFFF !important;
          padding: 1.5rem 1rem;
          font-size: 1.2rem;
          font-family: 'Playfair Display', serif;
          outline: none;
          display: block !important;
          opacity: 1 !important;
        }

        .inq-submit {
          background: #FFFFFF;
          color: #2D1D34;
          border: none;
          padding: 1.5rem 4rem;
          font-family: 'Jost', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.3rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s;
          width: 100%;
        }

        .inq-submit:hover {
          background: #E6D5ED;
          transform: translateY(-5px);
        }

        .success-msg {
          font-size: 1.5rem;
          text-align: center;
          padding: 4rem 0;
        }

        @media (max-width: 991px) {
          .inq-page { grid-template-columns: 1fr; gap: 4rem; padding-top: 120px; }
          .inq-title { font-size: 4.5rem; margin-bottom: 4rem; }
          .inq-form-wrap { padding: 2.5rem; }
        }
      `}</style>

      <WomanNav />


      <div className="inq-left">
        <h1 className="inq-title">
          <span>START</span>
          <span>YOUR</span>
          <span>INQUIRY</span>
        </h1>

        <div className="inq-info">
          <div className="inq-info-item">
            <div className="inq-info-label">Global Logistics</div>
            <div className="inq-info-value">Shipping from Karachi to 40+ countries.</div>
          </div>
          <div className="inq-info-item">
            <div className="inq-info-label">Email Us</div>
            <div className="inq-info-value">hello@greyfabric.co</div>
          </div>
          <div className="inq-info-item">
            <div className="inq-info-label">Follow</div>
            <div className="inq-info-value">@grey.fabric.house</div>
          </div>
        </div>
      </div>

      <div className="inq-right">
        <div className="inq-form-wrap">
          {sent ? (
            <div className="success-msg">
              <h3>THANK YOU</h3>
              <p>Your inquiry for the Woman 2.0 Collection has been received. Our concierge will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="inq-input-group">
                <label className="inq-label">Your Name</label>
                <input type="text" className="inq-input" required />
              </div>
              <div className="inq-input-group">
                <label className="inq-label">Email Address</label>
                <input type="email" className="inq-input" required />
              </div>
              <div className="inq-input-group">
                <label className="inq-label">Fabric of Interest</label>
                <input type="text" className="inq-input" placeholder="e.g. Silk Voile, Organza..." required />
              </div>
              <div className="inq-input-group">
                <label className="inq-label">Message</label>
                <textarea className="inq-input" style={{ minHeight: '120px' }} required></textarea>
              </div>
              <button type="submit" className="inq-submit">Send Inquiry</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
