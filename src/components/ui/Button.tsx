'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, useRef, useState } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
  loadingText?: string
}

export default function Button({ variant='primary', loading=false, loadingText, disabled, className, children, ...props }: ButtonProps) {
  const [ripples, setRipples] = useState<{x:number;y:number;id:number}[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled || loading) return
    const r = btnRef.current!.getBoundingClientRect()
    const id = Date.now()
    setRipples(prev => [...prev, { x: e.clientX-r.left, y: e.clientY-r.top, id }])
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id !== id)), 700)
    props.onClick?.(e)
  }

  return (
    <button
      ref={btnRef}
      disabled={disabled || loading}
      className={cn(
        'relative w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-medium transition-all duration-200 overflow-hidden select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variant === 'primary'
          ? 'bg-white text-black hover:bg-white/90 active:scale-[0.99]'
          : 'text-white/70 hover:text-white border border-white/15 hover:border-white/30',
        className
      )}
      {...props}
      onClick={handleClick}
    >
      {ripples.map(rp => (
        <span
          key={rp.id}
          className="absolute rounded-full bg-black/10 pointer-events-none btn-ripple"
          style={{ left: rp.x, top: rp.y, width: 8, height: 8 }}
        />
      ))}

      {loading ? (
        <>
          <span className="relative w-4 h-4 flex-shrink-0">
            <span className="absolute inset-0 rounded-full border-2 border-black/20" />
            <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-black/70 animate-spin-slow" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.12em]">{loadingText ?? 'PROCESSING...'}</span>
        </>
      ) : children}
    </button>
  )
}
