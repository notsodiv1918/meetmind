'use client'

import { MeshGradient } from '@paper-design/shaders-react'
import { useEffect, useRef, useState } from 'react'

interface Props { children: React.ReactNode }

export default function ShaderBackground({ children }: Props) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div ref={containerRef} className="relative w-full" style={{ minHeight: '100vh' }}>

      {/* SVG filters — match reference exactly */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix type="matrix"
              values="1 0 0 0 0.02  0 1 0 0 0.02  0 0 1 0 0.05  0 0 0 0.9 0"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Primary dark mesh — matches reference colours */}
      {mounted && (
        <MeshGradient
          className="fixed inset-0 w-full h-full"
          style={{ zIndex: 0 }}
          colors={['#000000', '#8B4513', '#ffffff', '#3E2723', '#5D4037']}
          speed={0.3}
          backgroundColor="#000000"
        />
      )}

      {/* Layer 2: Wireframe overlay */}
      {mounted && (
        <MeshGradient
          className="fixed inset-0 w-full h-full"
          style={{ zIndex: 1, opacity: 0.55 }}
          colors={['#000000', '#ffffff', '#8B4513', '#000000']}
          speed={0.2}
          backgroundColor="transparent"
        />
      )}

      {/* Content above shaders */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  )
}
