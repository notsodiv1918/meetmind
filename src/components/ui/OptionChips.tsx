'use client'
import { cn } from '@/lib/utils'
import type { MOMOption } from '@/types'

const OPTIONS: { value: MOMOption; label: string }[] = [
  { value: 'summary',    label: 'Summary'      },
  { value: 'actions',   label: 'Action Items'  },
  { value: 'decisions', label: 'Key Decisions' },
  { value: 'attendees', label: 'Attendees'     },
  { value: 'timestamps',label: 'Timeline'      },
]

interface OptionChipsProps { selected: MOMOption[]; onChange: (o: MOMOption[]) => void }

export default function OptionChips({ selected, onChange }: OptionChipsProps) {
  const toggle = (v: MOMOption) =>
    onChange(selected.includes(v) ? selected.filter(o => o !== v) : [...selected, v])

  return (
    <div className="mb-6">
      <p className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase mb-2.5">Output Sections</p>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map(({ value, label }) => {
          const on = selected.includes(value)
          return (
            <button
              key={value}
              onClick={() => toggle(value)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-body transition-all duration-200',
                on
                  ? 'text-orange-300'
                  : 'text-white/40 hover:text-white/60'
              )}
              style={on ? {
                background: 'rgba(200,98,26,0.12)',
                border: '1px solid rgba(200,98,26,0.30)',
              } : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span
                className="w-3 h-3 rounded flex items-center justify-center border flex-shrink-0 text-[9px]"
                style={on ? { background:'rgba(200,98,26,0.4)', borderColor:'rgba(200,98,26,0.6)', color:'#ffa060' } : { borderColor:'rgba(255,255,255,0.18)' }}
              >
                {on && '✓'}
              </span>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
