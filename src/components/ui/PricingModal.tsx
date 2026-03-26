'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface Props { open: boolean; onClose: () => void }

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for personal use',
    features: ['10 MOMs per month', 'Text transcript input', 'Summary + Action Items', 'Export .txt', 'Chrome extension'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    desc: 'For power users & teams',
    features: ['Unlimited MOMs', 'Audio & video upload', 'Image / whiteboard analysis', 'All 5 MOM sections', 'Export .md + .txt', 'Priority processing', 'Live Chrome extension'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$39',
    period: 'per month',
    desc: 'For entire organisations',
    features: ['Everything in Pro', 'Up to 10 members', 'Shared MOM history', 'Slack / Notion export', 'Custom branding', 'Priority support'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function PricingModal({ open, onClose }: Props) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-3xl rounded-2xl p-8 pointer-events-auto"
              style={{ background: 'rgba(12,8,4,0.95)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(40px)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="font-display font-semibold text-2xl text-white mb-1">Pricing</h2>
                  <p className="text-xs text-white/40 font-light">Simple, transparent pricing. No surprises.</p>
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-lg">
                  ×
                </button>
              </div>

              {/* Plans */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PLANS.map((plan) => (
                  <div
                    key={plan.name}
                    className="rounded-xl p-5 flex flex-col gap-4 relative"
                    style={plan.highlight ? {
                      background: 'rgba(200,98,26,0.10)',
                      border: '1px solid rgba(200,98,26,0.35)',
                    } : {
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider"
                        style={{ background: '#c8621a', color: 'white' }}>
                        POPULAR
                      </div>
                    )}

                    <div>
                      <p className="text-[11px] font-mono text-white/40 tracking-widest mb-2">{plan.name.toUpperCase()}</p>
                      <div className="flex items-end gap-1.5 mb-1">
                        <span className="text-3xl font-display font-semibold text-white">{plan.price}</span>
                        <span className="text-xs text-white/35 mb-1 font-light">{plan.period}</span>
                      </div>
                      <p className="text-xs text-white/40 font-light">{plan.desc}</p>
                    </div>

                    <ul className="flex flex-col gap-2 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-white/55 font-light">
                          <span style={{ color: plan.highlight ? '#e07030' : 'rgba(255,255,255,0.3)' }} className="mt-0.5 flex-shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      className="w-full py-2.5 rounded-full text-xs font-medium transition-all duration-200"
                      style={plan.highlight ? {
                        background: '#c8621a',
                        color: 'white',
                      } : {
                        background: 'rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
