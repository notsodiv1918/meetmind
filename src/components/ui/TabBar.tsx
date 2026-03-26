'use client'
import { cn } from '@/lib/utils'

interface Tab { id: string; label: string; icon: React.ReactNode }
interface TabBarProps { tabs: Tab[]; active: string; onChange: (id: string) => void }

export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div
      className="flex gap-1 p-1 mb-5 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium transition-all duration-200',
            active === tab.id
              ? 'text-white'
              : 'text-white/40 hover:text-white/65'
          )}
          style={active === tab.id ? {
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.10)',
          } : {}}
        >
          <span className="w-3.5 h-3.5 flex-shrink-0">{tab.icon}</span>
          <span className="hidden sm:block">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
