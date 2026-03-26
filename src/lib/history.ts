import type { MeetingRecord, MOMResult, MOMOption } from '@/types'

const STORAGE_KEY = 'meetmind_history'
const MAX_RECORDS = 50

export function saveMeeting(result: MOMResult, options: MOMOption[], duration?: string): MeetingRecord {
  const record: MeetingRecord = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    title: result.summary
      ? result.summary.split('.')[0].slice(0, 80)
      : 'Meeting ' + new Date().toLocaleDateString(),
    duration,
    result,
    options,
  }

  const existing = getHistory()
  const updated = [record, ...existing].slice(0, MAX_RECORDS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return record
}

export function getHistory(): MeetingRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function deleteRecord(id: string): void {
  const updated = getHistory().filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function searchHistory(query: string): MeetingRecord[] {
  const q = query.toLowerCase()
  return getHistory().filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.result.summary?.toLowerCase().includes(q) ||
    r.result.attendees?.some(a => a.toLowerCase().includes(q))
  )
}
