'use client'

import { useState } from 'react'
import { useMOM } from '@/hooks/useMOM'
import TabBar from '@/components/ui/TabBar'
import OptionChips from '@/components/ui/OptionChips'
import Button from '@/components/ui/Button'
import AudioTab from './AudioTab'
import ImagesTab from './ImagesTab'
import TextTab from './TextTab'
import MOMResult from './MOMResult'
import type { TabType, MOMOption, ImageFile } from '@/types'

const TABS = [
  {
    id: 'audio', label: 'Audio / Video',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>),
  },
  {
    id: 'images', label: 'Images / PDF',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>),
  },
  {
    id: 'text', label: 'Transcript / Text',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>),
  },
]

export default function MeetingInput() {
  const { generate, result, isLoading, statusMsg, error } = useMOM()
  const [activeTab, setActiveTab] = useState<TabType>('text')
  const [audioFiles, setAudioFiles] = useState<File[]>([])
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([])
  const [transcript, setTranscript] = useState('')
  const [options, setOptions] = useState<MOMOption[]>(['summary','actions','decisions','attendees','timestamps'])

  const hasContent = () => {
    if (activeTab === 'text')   return transcript.trim().length > 10
    if (activeTab === 'audio')  return audioFiles.length > 0
    if (activeTab === 'images') return imageFiles.length > 0
    return false
  }

  return (
    <div id="app-section">

      {/* Section label */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-8 bg-white/20" />
        <span className="text-[11px] font-mono text-white/35 tracking-[0.22em] uppercase">
          Meeting Intelligence
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">

        {/* ── LEFT: Input card ─────────────────────────── */}
        <div
          className="rounded-2xl p-6 lg:p-8 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.035)',
            backdropFilter: 'blur(28px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-3 bg-white/30" />
            <span className="text-[10px] font-mono text-white/35 tracking-[0.22em] uppercase">Input Source</span>
          </div>

          <TabBar tabs={TABS} active={activeTab} onChange={(id) => setActiveTab(id as TabType)} />

          <div className="min-h-[200px] mb-6">
            <div className="animate-fade-in" key={activeTab}>
              {activeTab === 'audio'  && <AudioTab  files={audioFiles}  onChange={setAudioFiles} />}
              {activeTab === 'images' && <ImagesTab images={imageFiles} onChange={setImageFiles} />}
              {activeTab === 'text'   && <TextTab   value={transcript}  onChange={setTranscript} />}
            </div>
          </div>

          <OptionChips selected={options} onChange={setOptions} />

          <Button
            onClick={() => generate({ tab: activeTab, transcript, audioFiles, imageFiles, options })}
            disabled={!hasContent() || options.length === 0 || isLoading}
            loading={isLoading}
            loadingText={statusMsg || 'GENERATING...'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Generate Minutes of Meeting
          </Button>

          {error && (
            <div className="mt-4 p-4 rounded-xl" style={{ background:'rgba(192,80,74,0.10)', border:'1px solid rgba(192,80,74,0.25)' }}>
              <p className="text-xs font-mono text-red-400 leading-relaxed whitespace-pre-line">⚠ {error}</p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Sidebar cards ─────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* System status */}
          <div
            className="rounded-xl p-5"
            style={{ background:'rgba(255,255,255,0.035)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-[10px] font-mono text-white/35 tracking-[0.2em] mb-4 uppercase">System Status</p>
            {[
              { label: 'AI Model', value: 'Groq LLaMA 3.3',  ok: true  },
              { label: 'Status',   value: 'Operational',     ok: true  },
              { label: 'Backend',  value: 'localhost:8000',  ok: false },
            ].map(({ label, value, ok }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-[11px] font-mono text-white/35">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-white/60">{value}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-green-400' : 'bg-white/20'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div
            className="rounded-xl p-5"
            style={{ background:'rgba(255,255,255,0.035)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-[10px] font-mono text-white/35 tracking-[0.2em] mb-4 uppercase">How It Works</p>
            {[
              { n: '01', t: 'Upload audio, images, or paste transcript' },
              { n: '02', t: 'Select which sections to include' },
              { n: '03', t: 'AI analyzes and structures the output' },
              { n: '04', t: 'Export as .txt or .md — ready to share' },
            ].map(({ n, t }) => (
              <div key={n} className="flex gap-3 mb-3 last:mb-0">
                <span className="text-[10px] font-mono text-orange-500/50 w-5 flex-shrink-0 mt-0.5">{n}</span>
                <span className="text-[11px] text-white/45 font-light leading-snug">{t}</span>
              </div>
            ))}
          </div>

          {/* Chrome extension */}
          <div
            className="rounded-xl p-5 relative overflow-hidden"
            style={{ background:'rgba(200,98,26,0.07)', backdropFilter:'blur(20px)', border:'1px solid rgba(200,98,26,0.25)' }}
          >
            <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl" style={{ background: 'rgba(200,98,26,0.12)' }} />
            <div className="flex gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5" style={{ color: '#c8621a' }}>⬡</span>
              <div>
                <p className="text-xs font-medium text-white/75 mb-1.5">Live Meeting Capture</p>
                <p className="text-[11px] text-white/40 leading-relaxed font-light">
                  Chrome extension listens live from Meet, Zoom, or Teams.
                </p>
                <code className="mt-2 block text-[10px] font-mono text-orange-400/55 px-2 py-1 rounded" style={{ background:'rgba(200,98,26,0.07)', border:'1px solid rgba(200,98,26,0.20)' }}>
                  chrome://extensions → Load extension/
                </code>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width result */}
        {result && (
          <div className="xl:col-span-2">
            <MOMResult result={result} options={options} />
          </div>
        )}

      </div>
    </div>
  )
}
