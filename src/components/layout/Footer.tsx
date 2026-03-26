import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-white/25 tracking-widest">MEETMIND</span>
          <span className="text-white/10">·</span>
          <span className="font-mono text-xs text-white/15">AI MEETING INTELLIGENCE</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/history"
            className="text-[11px] font-mono text-white/25 hover:text-orange-400/60 transition-colors tracking-wider"
          >
            HISTORY →
          </Link>
          <a
            href="https://console.groq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-white/25 hover:text-orange-400/60 transition-colors tracking-wider"
          >
            GET API KEY →
          </a>
          <span className="font-mono text-[10px] text-white/10">v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}
