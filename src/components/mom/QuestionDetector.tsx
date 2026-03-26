'use client'
import type { UnansweredQuestion } from '@/types'

interface Props { questions: UnansweredQuestion[] }

export default function QuestionDetector({ questions }: Props) {
  if (!questions.length) return null

  return (
    <div
      className="col-span-full rounded-xl p-5 animate-fade-up"
      style={{
        background: 'rgba(200,98,26,0.05)',
        border: '1px solid rgba(200,98,26,0.20)',
        animationDelay: '400ms',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-orange-500 text-base">?</span>
        <span className="text-[10px] font-mono text-orange-400/60 tracking-[0.15em] uppercase">
          Unanswered Questions
        </span>
        <span
          className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(200,98,26,0.12)', color: '#e07030', border: '1px solid rgba(200,98,26,0.25)' }}
        >
          {questions.length} unresolved
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(200,98,26,0.15)', color: '#e07030' }}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm text-white/65 font-light leading-snug">{q.question}</p>
              {q.askedBy && (
                <p className="text-[11px] font-mono text-white/30 mt-1">asked by {q.askedBy}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
