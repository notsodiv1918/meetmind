import { cn } from '@/lib/utils'

interface MOMCardProps {
  label: string; accentColor: string; full?: boolean
  children: React.ReactNode; index?: number
}

export default function MOMCard({ label, accentColor, full=false, children, index=0 }: MOMCardProps) {
  return (
    <div
      className={cn('relative rounded-xl p-5 animate-fade-up', full && 'col-span-full')}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.07)',
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="absolute top-0 left-6 right-6 h-px rounded-full opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}80` }}
        />
        <span className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: accentColor + 'aa' }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}
