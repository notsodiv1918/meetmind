'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props { open: boolean; onClose: () => void }

const SECTIONS = [
  {
    id: 'quickstart',
    title: 'Quick Start',
    content: [
      {
        heading: '1. Set your API key',
        body: `Open web-app/.env.local and paste your Groq API key:\n\nGROQ_API_KEY=gsk_your-key-here\n\nGet a free key at console.groq.com — no credit card needed.`,
      },
      {
        heading: '2. Run the app',
        body: `cd web-app\nnpm install\nnpm run dev\n\nOpen http://localhost:3000`,
      },
      {
        heading: '3. Generate your first MOM',
        body: `Paste any meeting transcript into the text box, select the sections you want, and click Generate. Results appear in under 10 seconds.`,
      },
    ],
  },
  {
    id: 'inputs',
    title: 'Input Types',
    content: [
      {
        heading: 'Text / Transcript',
        body: `Paste raw text from any source — Zoom auto-transcripts, Google Meet captions, Otter.ai exports, or hand-typed notes. Works best with speaker labels (e.g. "John: ...")`,
      },
      {
        heading: 'Images / Screenshots',
        body: `Upload whiteboard photos, slide screenshots, or any meeting document. Claude Vision reads and extracts content from images automatically. Supported: PNG, JPG, WEBP.`,
      },
      {
        heading: 'Audio / Video',
        body: `Requires the Python backend running on port 8000.\n\ncd backend\npip install -r requirements.txt\nuvicorn main:app --reload\n\nSupported: MP3, MP4, WAV, M4A, WEBM.`,
      },
    ],
  },
  {
    id: 'extension',
    title: 'Chrome Extension',
    content: [
      {
        heading: 'Load the extension',
        body: `1. Open chrome://extensions\n2. Enable Developer Mode (top right)\n3. Click "Load unpacked"\n4. Select the extension/ folder from the project`,
      },
      {
        heading: 'Live capture',
        body: `Join a Google Meet, Zoom, or Teams call. Click the MeetMind icon in your toolbar. Hit "Start Listening" — it transcribes in real-time using your microphone. Click "Generate MOM" when done.`,
      },
      {
        heading: 'Platform support',
        body: `Google Meet — full caption scraping + microphone\nZoom — microphone transcription\nMicrosoft Teams — microphone transcription`,
      },
    ],
  },
  {
    id: 'output',
    title: 'MOM Sections',
    content: [
      {
        heading: 'Summary',
        body: `3-4 sentences covering the meeting purpose and outcome.`,
      },
      {
        heading: 'Action Items',
        body: `Bulleted list with owner name and deadline when mentioned.\nExample: • Sarah: Prepare Q3 report (Due: Friday)`,
      },
      {
        heading: 'Key Decisions',
        body: `Numbered list of all major decisions made during the meeting.`,
      },
      {
        heading: 'Attendees',
        body: `All speaker names or people mentioned in the transcript.`,
      },
      {
        heading: 'Timeline',
        body: `Key moments with timestamps. Works best with transcripts that include time markers.`,
      },
    ],
  },
]

export default function DocsModal({ open, onClose }: Props) {
  const [active, setActive] = useState('quickstart')

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const section = SECTIONS.find(s => s.id === active)!

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-3xl h-[560px] rounded-2xl flex overflow-hidden pointer-events-auto"
              style={{ background: 'rgba(10,6,2,0.97)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(40px)' }}
            >
              {/* Sidebar */}
              <div className="w-48 flex-shrink-0 flex flex-col p-4 gap-1"
                style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] font-mono text-white/25 tracking-[0.2em] uppercase mb-3 px-2">
                  Docs
                </p>
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className="text-left px-3 py-2 rounded-lg text-xs transition-all duration-200"
                    style={active === s.id ? {
                      background: 'rgba(200,98,26,0.12)',
                      color: 'rgba(224,112,48,0.90)',
                      border: '1px solid rgba(200,98,26,0.25)',
                    } : {
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <h2 className="font-display font-semibold text-lg text-white">{section.title}</h2>
                  <button onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-lg">
                    ×
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-6"
                    >
                      {section.content.map((item) => (
                        <div key={item.heading}>
                          <h3 className="text-sm font-medium text-white/80 mb-2">{item.heading}</h3>
                          <pre
                            className="text-xs text-white/45 leading-relaxed font-mono whitespace-pre-wrap rounded-lg p-3"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            {item.body}
                          </pre>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
