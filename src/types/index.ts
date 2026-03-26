export type TabType = 'audio' | 'images' | 'text'

export type MOMOption = 'summary' | 'actions' | 'decisions' | 'attendees' | 'timestamps'

export interface ImageFile {
  name: string
  type: string
  dataUrl: string
  b64: string
}

export interface SentimentResult {
  score: number          // 0-100
  label: string          // "Productive" | "Tense" | "Neutral" etc
  tags: string[]         // ["2 disagreements", "high energy"]
}

export interface UnansweredQuestion {
  question: string
  askedBy?: string
}

export interface MOMResult {
  summary: string
  actions: string[]
  decisions: string[]
  attendees: string[]
  timestamps: { time: string; text: string }[]
  speakers: { name: string; lines: string[] }[]   // speaker detection
  sentiment: SentimentResult | null
  unansweredQuestions: UnansweredQuestion[]
  detectedLanguages: string[]
  rawText: string
}

export interface MeetingRecord {
  id: string
  date: string           // ISO string
  title: string          // first line of summary
  duration?: string
  result: MOMResult
  options: MOMOption[]
}

export interface ApiError {
  message: string
  status?: number
}
