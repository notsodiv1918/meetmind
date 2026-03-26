'use client'
import { useEffect, useRef } from 'react'

export default function CursorOrb() {
  const orbRef = useRef<HTMLDivElement>(null)
  const pos    = useRef({ x: -800, y: -800 })
  const cur    = useRef({ x: -800, y: -800 })
  const raf    = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.07
      cur.current.y += (pos.current.y - cur.current.y) * 0.07
      if (orbRef.current) {
        orbRef.current.style.left = `${cur.current.x}px`
        orbRef.current.style.top  = `${cur.current.y}px`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current) }
  }, [])

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,98,26,0.18) 0%, rgba(200,98,26,0.06) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'screen',
        willChange: 'left, top',
      }}
    />
  )
}
