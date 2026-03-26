'use client'
import { useState } from 'react'
import type { MOMResult, MOMOption } from '@/types'

interface Props { result: MOMResult; options: MOMOption[] }

export default function PDFReport({ result, options }: Props) {
  const [generating, setGenerating] = useState(false)

  function generatePDF() {
    setGenerating(true)

    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })
    const shortDate = new Date().toISOString().split('T')[0]

    const sentimentColor =
      result.sentiment
        ? result.sentiment.score >= 70 ? '#22c55e'
        : result.sentiment.score >= 40 ? '#f97316' : '#ef4444'
        : '#888'

    // Build sections HTML
    const sectionsHTML: string[] = []

    if (options.includes('summary') && result.summary) {
      sectionsHTML.push(`
        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background:#5b9bd5"></div>
            <span>Summary</span>
          </div>
          <p class="section-body">${result.summary}</p>
        </div>
      `)
    }

    if (result.speakers.length > 0) {
      sectionsHTML.push(`
        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background:#a78bfa"></div>
            <span>Speaker Breakdown</span>
          </div>
          <div class="speakers">
            ${result.speakers.map(s => `
              <div class="speaker-row">
                <div class="speaker-avatar">${s.name[0]?.toUpperCase()}</div>
                <div>
                  <div class="speaker-name">${s.name}</div>
                  <div class="speaker-line">${s.lines[0] || ''}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `)
    }

    if (options.includes('actions') && result.actions.length) {
      sectionsHTML.push(`
        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background:#22c55e"></div>
            <span>Action Items</span>
          </div>
          <ul class="action-list">
            ${result.actions.map(a => `
              <li class="action-item">
                <div class="action-checkbox"></div>
                <span>${a}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `)
    }

    if (options.includes('decisions') && result.decisions.length) {
      sectionsHTML.push(`
        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background:#f97316"></div>
            <span>Key Decisions</span>
          </div>
          ${result.decisions.map(d => `
            <div class="decision-item">${d}</div>
          `).join('')}
        </div>
      `)
    }

    if (options.includes('attendees') && result.attendees.length) {
      sectionsHTML.push(`
        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background:#9a6fd8"></div>
            <span>Attendees</span>
          </div>
          <div class="attendee-list">
            ${result.attendees.map(a => `<span class="attendee-chip">${a}</span>`).join('')}
          </div>
        </div>
      `)
    }

    if (options.includes('timestamps') && result.timestamps.length) {
      sectionsHTML.push(`
        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background:#ef4444"></div>
            <span>Timeline</span>
          </div>
          <div class="timeline">
            ${result.timestamps.map(ts => `
              <div class="timeline-item">
                <span class="timeline-time">${ts.time}</span>
                <span class="timeline-text">${ts.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `)
    }

    if (result.unansweredQuestions.length) {
      sectionsHTML.push(`
        <div class="section section-warning">
          <div class="section-header">
            <div class="section-dot" style="background:#f97316"></div>
            <span>Unanswered Questions</span>
            <span class="badge">${result.unansweredQuestions.length} unresolved</span>
          </div>
          ${result.unansweredQuestions.map(q => `
            <div class="question-item">
              <span class="question-mark">?</span>
              <div>
                <div class="question-text">${q.question}</div>
                ${q.askedBy ? `<div class="question-by">asked by ${q.askedBy}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `)
    }

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Minutes of Meeting — ${shortDate}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Outfit', sans-serif;
    background: #ffffff;
    color: #1a1a1a;
    font-size: 13px;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 52px;
  }

  /* ── Header ── */
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 36px;
    padding-bottom: 24px;
    border-bottom: 2px solid #f0ece4;
  }

  .header-left {}

  .logo-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .logo-mark {
    width: 32px; height: 32px;
    background: #c8621a;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 15px;
  }

  .logo-name {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #1a1a1a;
  }

  .doc-title {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #0a0a0a;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
  }

  .doc-date {
    font-size: 12px;
    color: #888;
    font-weight: 400;
  }

  .header-right {
    text-align: right;
  }

  /* ── Sentiment card ── */
  .sentiment-card {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    background: #faf8f5;
    border: 1px solid #ede8e0;
    margin-bottom: 28px;
  }

  .sentiment-score {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: ${sentimentColor};
  }

  .sentiment-info {}
  .sentiment-label {
    font-size: 13px;
    font-weight: 600;
    color: #333;
  }
  .sentiment-tags {
    font-size: 11px;
    color: #888;
    margin-top: 2px;
  }

  .lang-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 28px;
    font-size: 11px;
    color: #888;
  }
  .lang-badge {
    padding: 2px 8px;
    background: #eef3ff;
    color: #4880b8;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 500;
  }

  /* ── Sections ── */
  .section {
    margin-bottom: 28px;
    padding: 20px 24px;
    border-radius: 12px;
    background: #faf8f5;
    border: 1px solid #ede8e0;
  }

  .section-warning {
    background: #fff8f3;
    border-color: #fddcbc;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #666;
  }

  .section-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .badge {
    margin-left: auto;
    padding: 2px 8px;
    background: #fff0e6;
    color: #c8621a;
    border-radius: 20px;
    font-size: 10px;
    text-transform: none;
    letter-spacing: 0;
  }

  .section-body {
    font-size: 13px;
    color: #333;
    line-height: 1.75;
    font-weight: 300;
  }

  /* Speakers */
  .speakers { display: flex; flex-direction: column; gap: 10px; }
  .speaker-row { display: flex; gap: 10px; align-items: flex-start; }
  .speaker-avatar {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: #ede8f5;
    color: #7c5cbf;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600;
    flex-shrink: 0;
  }
  .speaker-name { font-size: 12px; font-weight: 600; color: #333; }
  .speaker-line { font-size: 11px; color: #888; margin-top: 1px; }

  /* Actions */
  .action-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .action-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #333; font-weight: 300; }
  .action-checkbox {
    width: 14px; height: 14px;
    border: 1.5px solid #c8621a;
    border-radius: 3px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Decisions */
  .decision-item {
    padding: 8px 12px;
    border-left: 3px solid #c8621a;
    background: #fff8f3;
    border-radius: 0 6px 6px 0;
    font-size: 13px;
    color: #333;
    font-weight: 300;
    margin-bottom: 6px;
  }

  /* Attendees */
  .attendee-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .attendee-chip {
    padding: 4px 12px;
    background: #f0ece4;
    border-radius: 20px;
    font-size: 11px;
    color: #555;
    font-weight: 500;
  }

  /* Timeline */
  .timeline { display: flex; flex-direction: column; gap: 0; }
  .timeline-item {
    display: flex;
    gap: 16px;
    padding: 8px 0;
    border-bottom: 1px solid #ede8e0;
    font-size: 12px;
  }
  .timeline-item:last-child { border-bottom: none; }
  .timeline-time { font-weight: 600; color: #c8621a; width: 48px; flex-shrink: 0; font-family: monospace; }
  .timeline-text { color: #444; font-weight: 300; }

  /* Questions */
  .question-item {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid #fddcbc;
  }
  .question-item:last-child { border-bottom: none; }
  .question-mark {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #fff0e6;
    color: #c8621a;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    flex-shrink: 0;
  }
  .question-text { font-size: 12px; color: #444; font-weight: 400; }
  .question-by { font-size: 10px; color: #aaa; margin-top: 2px; }

  /* Footer */
  .footer {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 1px solid #ede8e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    color: #bbb;
  }

  @media print {
    body { background: white; }
    .page { padding: 32px 40px; }
    .section { break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="header-left">
      <div class="logo-row">
        <div class="logo-mark">M</div>
        <span class="logo-name">MeetMind</span>
      </div>
      <div class="doc-title">Minutes of Meeting</div>
      <div class="doc-date">${date}</div>
    </div>
  </div>

  ${result.sentiment ? `
  <div class="sentiment-card">
    <div class="sentiment-score">${result.sentiment.score}</div>
    <div class="sentiment-info">
      <div class="sentiment-label">${result.sentiment.label}</div>
      <div class="sentiment-tags">${result.sentiment.tags.join(' · ')}</div>
    </div>
  </div>
  ` : ''}

  ${result.detectedLanguages.length > 1 ? `
  <div class="lang-row">
    <span>Languages detected:</span>
    ${result.detectedLanguages.map(l => `<span class="lang-badge">${l}</span>`).join('')}
    <span>→ Output in English</span>
  </div>
  ` : ''}

  ${sectionsHTML.join('')}

  <div class="footer">
    <span>Generated by MeetMind AI · ${new Date().toLocaleString()}</span>
    <span>meetmind.ai</span>
  </div>

</div>
</body>
</html>`

    // Open in new window and trigger print dialog
    const win = window.open('', '_blank')
    if (!win) {
      setGenerating(false)
      alert('Please allow popups for this site to generate the PDF report.')
      return
    }

    win.document.write(html)
    win.document.close()

    // Wait for fonts to load then print
    win.onload = () => {
      setTimeout(() => {
        win.print()
        setGenerating(false)
      }, 800)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={generating}
      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-mono text-white/40 hover:text-white/70 transition-all duration-200 disabled:opacity-50"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      title="Download formatted PDF report"
    >
      {generating ? '...' : '⬇ PDF Report'}
    </button>
  )
}
