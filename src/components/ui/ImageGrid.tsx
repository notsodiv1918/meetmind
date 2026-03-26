'use client'

import type { ImageFile } from '@/types'

interface ImageGridProps {
  images: ImageFile[]
  onRemove: (index: number) => void
}

export default function ImageGrid({ images, onRemove }: ImageGridProps) {
  if (!images.length) return null

  return (
    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {images.map((img, i) => (
        <div
          key={`${img.name}-${i}`}
          className="relative aspect-square rounded-lg overflow-hidden bg-surface2 border border-edge group hover:border-orange-border transition-colors"
        >
          {img.dataUrl ? (
            <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full font-mono text-2xl text-muted">
              PDF
            </div>
          )}
          <button
            onClick={() => onRemove(i)}
            className="absolute top-1 right-1 w-5 h-5 bg-black/80 text-white/80 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:text-status-red"
          >
            ×
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 py-1 translate-y-full group-hover:translate-y-0 transition-transform">
            <p className="text-[9px] text-white/70 truncate font-mono">{img.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
