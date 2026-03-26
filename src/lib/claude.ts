import type { MOMOption } from '@/types'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'
const MAX_TOKENS = 3000

// ── Prompt Builder ──────────────────────────────────
export function buildMOMPrompt(transcript: string, options: MOMOption[]): string {
  const sectionMap: Record<MOMOption, string> = {
    summary:    '**SUMMARY**: 3-4 sentences summarizing the meeting purpose and outcome.',
    actions:    '**ACTION ITEMS**: Bulleted list. Format: "• [Owner if known]: Task (Due: date if mentioned)"',
    decisions:  '**KEY DECISIONS**: Numbered list of all important decisions made.',
    attendees:  '**ATTENDEES**: Comma-separated list of all speakers or names mentioned.',
    timestamps: '**TIMESTAMPS**: Key moments. Format: "[00:00] Topic or event"',
  }

  const requested = options.map(o => sectionMap[o]).join('\n')

  return `You are an expert at creating structured Minutes of Meeting (MOM) documents.
The transcript may contain multiple languages (Hindi, Tamil, English, etc.) — ALWAYS respond in English only.

Analyze the following meeting content and generate:
${requested}

**SPEAKERS**: List each identified speaker and 1-2 key things they said. Format:
"• [Name]: key contribution"

**SENTIMENT**: Rate this meeting on a scale of 0-100 for productivity. Format:
"Score: [number]/100 | Label: [Productive/Neutral/Tense/Chaotic] | Tags: [tag1, tag2, tag3]"

**UNANSWERED QUESTIONS**: List questions raised in the meeting that were never answered. Format:
"• [Question]? (asked by [name if known])"
If none, write "None identified."

Meeting content:
---
${transcript}
---

Rules:
- ALWAYS respond in English regardless of transcript language
- Use EXACT section headers shown above with ** markers
- Be concise but complete
- If a section has no content write "None identified"`
}

// ── Call via Next.js API route ──────────────────────
export async function callClaude(content: object[]): Promise<string> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as any)?.error ?? `Request failed (${res.status})`)
  }
  const data = await res.json()
  return data.text ?? ''
}

// ── Audio transcription ─────────────────────────────
export async function transcribeAudio(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/transcribe', { method: 'POST', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as any)?.error ?? `Transcription failed (${res.status})`)
  }
  const data = await res.json()
  return data.transcript ?? ''
}
