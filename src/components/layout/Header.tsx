'use client'

import { useState } from 'react'
import PricingModal from '@/components/ui/PricingModal'
import DocsModal from '@/components/ui/DocsModal'

export default function Header() {
  const [pricingOpen, setPricingOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const NAV = [
    { label: 'Features', action: () => scrollTo('features-section') },
    { label: 'Pricing',  action: () => setPricingOpen(true) },
    { label: 'Docs',     action: () => setDocsOpen(true) },
  ]

  return (
    <>
      <header className="relative z-50 flex items-center justify-between px-6 py-5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span className="font-display font-bold text-white text-sm">M</span>
          </div>
          <span className="font-display font-semibold text-white text-base tracking-tight">MeetMind</span>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {NAV.map(({ label, action }) => (
            <button key={label} onClick={action}
              className="text-white/70 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer">
              {label}
            </button>
          ))}
        </nav>

        <button onClick={() => scrollTo('app-section')}
          className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs hover:bg-white/90 transition-all duration-200 h-8 flex items-center">
          Get Started
        </button>
      </header>

      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
      <DocsModal    open={docsOpen}    onClose={() => setDocsOpen(false)} />
    </>
  )
}
