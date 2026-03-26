'use client'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface UploadZoneProps {
  accept: string; multiple?: boolean; emoji: string
  title: string; subtitle: string; formats: string
  onFiles: (files: File[]) => void
}

export default function UploadZone({ accept, multiple=true, emoji, title, subtitle, formats, onFiles }: UploadZoneProps) {
  const [drag, setDrag] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f=Array.from(e.dataTransfer.files); if(f.length) onFiles(f) }}
      className="group relative rounded-xl px-8 py-12 text-center cursor-pointer transition-all duration-300"
      style={{
        background: drag ? 'rgba(200,98,26,0.08)' : 'rgba(255,255,255,0.025)',
        border: drag ? '2px dashed rgba(200,98,26,0.45)' : '2px dashed rgba(255,255,255,0.08)',
      }}
    >
      <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden" onChange={e => { const f=Array.from(e.target.files??[]); if(f.length) onFiles(f); e.target.value='' }} />
      <div className="text-3xl mb-3">{emoji}</div>
      <p className="text-sm font-medium text-white/70 mb-1">{title}</p>
      <p className="text-xs text-white/35 mb-2">{subtitle}</p>
      <p className="text-[11px] font-mono text-white/20 tracking-widest">{formats}</p>
    </div>
  )
}
