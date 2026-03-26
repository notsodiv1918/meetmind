const FEATURES = [
  {
    icon: '🎙',
    title: 'Audio & Video',
    desc: 'Upload MP3, MP4, WAV or any audio format. Whisper AI transcribes it automatically before generating your MOM.',
  },
  {
    icon: '🖼',
    title: 'Image Analysis',
    desc: 'Drop in whiteboard photos, slide screenshots, or PDFs. Claude Vision reads and extracts all relevant content.',
  },
  {
    icon: '⚡',
    title: 'Instant Generation',
    desc: 'Powered by Groq — the fastest AI inference available. Full MOM in under 10 seconds, every time.',
  },
  {
    icon: '📋',
    title: 'Structured Output',
    desc: 'Summary, action items with owners, key decisions, attendees, and timestamped timeline — all cleanly structured.',
  },
  {
    icon: '🔌',
    title: 'Live Chrome Extension',
    desc: 'Listens directly from Google Meet, Zoom, or Teams in real-time. No recording or upload needed.',
  },
  {
    icon: '⬇',
    title: 'Export Anywhere',
    desc: 'Copy to clipboard or download as .md or .txt. Paste straight into Notion, Slack, email, or your wiki.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features-section" className="max-w-8xl mx-auto px-6 lg:px-12 pt-24 pb-16">

      {/* Label */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px w-8 bg-white/20" />
        <span className="text-[11px] font-mono text-white/35 tracking-[0.22em] uppercase">Features</span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* Heading */}
      <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-3 max-w-lg leading-tight">
        Everything you need to<br />
        <span style={{ color: '#e07030' }}>never miss a detail</span>
      </h2>
      <p className="text-sm text-white/40 font-light mb-12 max-w-md leading-relaxed">
        From live meeting capture to audio transcription and image analysis — MeetMind handles every input type.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="rounded-xl p-5 flex flex-col gap-3 group hover:border-orange-500/25 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              animationDelay: `${i * 60}ms`,
            }}
          >
            <span className="text-2xl">{f.icon}</span>
            <h3 className="text-sm font-medium text-white/80">{f.title}</h3>
            <p className="text-xs text-white/40 font-light leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
