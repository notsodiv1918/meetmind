'use client'
import type { SentimentResult } from '@/types'

interface Props { sentiment: SentimentResult; languages: string[] }

export default function SentimentBadge({ sentiment, languages }: Props) {
  const color =
    sentiment.score >= 70 ? '#3d9e6a' :
    sentiment.score >= 40 ? '#c8621a' : '#c0504a'

  const bg =
    sentiment.score >= 70 ? 'rgba(61,158,106,0.08)' :
    sentiment.score >= 40 ? 'rgba(200,98,26,0.08)' : 'rgba(192,80,74,0.08)'

  const border =
    sentiment.score >= 70 ? 'rgba(61,158,106,0.25)' :
    sentiment.score >= 40 ? 'rgba(200,98,26,0.25)' : 'rgba(192,80,74,0.25)'

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in">

      {/* Sentiment score */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        {/* Arc score */}
        <div className="relative w-10 h-10 flex-shrink-0">
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke={color} strokeWidth="3"
              strokeDasharray={`${(sentiment.score / 100) * 94} 94`}
              strokeLinecap="round"
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium"
            style={{ color }}
          >
            {sentiment.score}
          </span>
        </div>
        <div>
          <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Meeting Score</div>
          <div className="text-sm font-medium text-white/80">{sentiment.label}</div>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 ml-1">
          {sentiment.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ color, background: bg, border: `1px solid ${border}` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Language detection badge */}
      {languages.length > 1 && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
          style={{ background: 'rgba(91,155,213,0.08)', border: '1px solid rgba(91,155,213,0.25)' }}
        >
          <span className="text-blue-400/70 font-mono text-[10px] tracking-wider">LANGUAGES</span>
          <span className="text-white/60">{languages.join(' · ')}</span>
          <span className="text-blue-400/50 text-[10px]">→ English output</span>
        </div>
      )}

    </div>
  )
}
