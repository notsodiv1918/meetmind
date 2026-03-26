'use client'

import { formatBytes } from '@/lib/utils'

interface FileListProps {
  files: File[]
  onRemove: (index: number) => void
}

export default function FileList({ files, onRemove }: FileListProps) {
  if (!files.length) return null

  return (
    <div className="mt-4 flex flex-col gap-2">
      {files.map((file, i) => (
        <div
          key={`${file.name}-${i}`}
          className="group flex items-center gap-3 px-4 py-3 bg-surface border border-edge rounded-xl hover:border-orange-border transition-all duration-200"
        >
          <span className="text-xl w-8 text-center flex-shrink-0 opacity-80">
            {file.type.startsWith('video') ? '▶' : '♪'}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-body font-medium text-ink truncate">{file.name}</p>
            <p className="text-[11px] font-mono text-subtle mt-0.5">{formatBytes(file.size)}</p>
          </div>
          <button
            onClick={() => onRemove(i)}
            className="opacity-0 group-hover:opacity-100 text-subtle hover:text-status-red transition-all text-lg leading-none px-1"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
