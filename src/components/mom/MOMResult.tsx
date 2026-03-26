'use client'
import { useState } from 'react'
import MOMCard from './MOMCard'
import SentimentBadge from './SentimentBadge'
import QuestionDetector from './QuestionDetector'
import EmailExport from './EmailExport'
import PDFReport from './PDFReport'
import { formatDate } from '@/lib/utils'
import type { MOMResult, MOMOption } from '@/types'

export default function MOMResult({ result, options }: { result: MOMResult; options: MOMOption[] }) {
  const [copyLabel, setCopyLabel] = useState('COPY')

  const copy = () => navigator.clipboard.writeText(result.rawText).then(() => {
    setCopyLabel('COPIED ✓'); setTimeout(() => setCopyLabel('COPY'), 2000)
  })
  const download = (fmt: 'txt'|'md') => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([result.rawText], { type:'text/plain' }))
    a.download = `MOM-${new Date().toISOString().split('T')[0]}.${fmt}`
    a.click(); URL.revokeObjectURL(a.href)
  }

  const Btn = ({ onClick, label }: { onClick:()=>void; label:string }) => (
    <button onClick={onClick}
      className="px-4 py-2 rounded-lg text-[11px] font-mono text-white/40 hover:text-white/70 transition-all duration-200"
      style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
    >{label}</button>
  )

  return (
    <section className="mt-12 animate-fade-up">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-5 bg-white/30" />
            <span className="text-[10px] font-mono text-white/30 tracking-[0.2em]">GENERATED OUTPUT</span>
          </div>
          <h2 className="font-display font-semibold text-2xl text-white/90 tracking-tight">
            Minutes of Meeting
          </h2>
          <p className="text-xs font-mono text-white/30 mt-1">{formatDate(new Date())}</p>
        </div>
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <Btn onClick={copy} label={copyLabel} />
          <Btn onClick={() => download('md')} label="↓ .MD" />
          <Btn onClick={() => download('txt')} label="↓ .TXT" />
          <EmailExport result={result} />
          <PDFReport result={result} options={options} />
        </div>
      </div>

      {/* Sentiment + Language badges */}
      {result.sentiment && (
        <SentimentBadge
          sentiment={result.sentiment}
          languages={result.detectedLanguages}
        />
      )}

      {/* Language badge when no sentiment */}
      {!result.sentiment && result.detectedLanguages.length > 1 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs mb-5 w-fit"
          style={{ background:'rgba(91,155,213,0.08)', border:'1px solid rgba(91,155,213,0.25)' }}>
          <span className="text-blue-400/70 font-mono text-[10px] tracking-wider">LANGUAGES DETECTED</span>
          <span className="text-white/60">{result.detectedLanguages.join(' · ')}</span>
          <span className="text-blue-400/50 text-[10px]">→ English output</span>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {options.includes('summary') && result.summary && (
          <MOMCard label="Summary" accentColor="#5b9bd5" full index={0}>
            <p className="text-sm text-white/55 leading-relaxed font-light">{result.summary}</p>
          </MOMCard>
        )}

        {/* Speaker breakdown */}
        {result.speakers.length > 0 && (
          <MOMCard label="Speaker Breakdown" accentColor="#a78bfa" index={1}>
            <div className="flex flex-col gap-2.5">
              {result.speakers.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono flex-shrink-0 mt-0.5"
                    style={{ background:'rgba(167,139,250,0.15)', color:'#a78bfa' }}
                  >
                    {s.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70">{s.name}</p>
                    <p className="text-[11px] text-white/35 font-light leading-snug">
                      {s.lines[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MOMCard>
        )}

        {options.includes('actions') && (
          <MOMCard label="Action Items" accentColor="#3d9e6a" index={2}>
            {result.actions.length ? (
              <ul className="flex flex-col gap-2.5">
                {result.actions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/50 leading-snug font-light">
                    <span className="mt-0.5 w-3.5 h-3.5 border rounded flex-shrink-0"
                      style={{ borderColor:'rgba(200,98,26,0.35)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            ) : <p className="text-xs font-mono text-white/25">None identified</p>}
          </MOMCard>
        )}

        {options.includes('decisions') && (
          <MOMCard label="Key Decisions" accentColor="#c8621a" index={3}>
            {result.decisions.length ? (
              <div className="flex flex-col gap-2">
                {result.decisions.map((d, i) => (
                  <div key={i} className="pl-3 py-2 text-sm text-white/50 leading-snug font-light rounded-r-lg"
                    style={{ borderLeft:'2px solid rgba(200,98,26,0.45)', background:'rgba(200,98,26,0.05)' }}>
                    {d}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs font-mono text-white/25">None identified</p>}
          </MOMCard>
        )}

        {options.includes('attendees') && (
          <MOMCard label="Attendees" accentColor="#9a6fd8" index={4}>
            {result.attendees.length ? (
              <div className="flex flex-wrap gap-2">
                {result.attendees.map((n, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs font-mono text-white/50 rounded-lg"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                    {n}
                  </span>
                ))}
              </div>
            ) : <p className="text-xs font-mono text-white/25">None identified</p>}
          </MOMCard>
        )}

        {options.includes('timestamps') && (
          <MOMCard label="Timeline" accentColor="#c0504a" full index={5}>
            {result.timestamps.length ? (
              <div className="flex flex-col divide-y" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
                {result.timestamps.map((ts, i) => (
                  <div key={i} className="flex gap-4 py-2.5 first:pt-0 last:pb-0">
                    <span className="font-mono text-[11px] text-orange-400/70 flex-shrink-0 w-12 pt-0.5">{ts.time}</span>
                    <span className="text-sm text-white/50 font-light leading-snug">{ts.text}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs font-mono text-white/25">No timestamps available</p>}
          </MOMCard>
        )}

        {/* Unanswered questions — always show if found */}
        <QuestionDetector questions={result.unansweredQuestions} />

      </div>
    </section>
  )
}
