import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      requestAnimationFrame(animate)
    }

    const onEnter = () => {
      follower.style.width = '56px'
      follower.style.height = '56px'
      follower.style.borderColor = 'var(--espresso)'
    }

    const onLeave = () => {
      follower.style.width = '36px'
      follower.style.height = '36px'
      follower.style.borderColor = 'var(--taupe)'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .fabric-card, .lookbook-cell, .product-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .cursor, .cursor-follower { display: none !important; }
        }
      `}</style>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  )
}
