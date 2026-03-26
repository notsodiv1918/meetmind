'use client'
import { useState, useEffect } from 'react'
import { getHistory, deleteRecord, searchHistory, clearHistory } from '@/lib/history'
import type { MeetingRecord, MOMOption } from '@/types'
import MOMResult from '@/components/mom/MOMResult'
import Link from 'next/link'

export default function HistoryPage() {
  const [records, setRecords] = useState<MeetingRecord[]>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<MeetingRecord | null>(null)

  useEffect(() => {
    setRecords(getHistory())
  }, [])

  useEffect(() => {
    setRecords(search.trim() ? searchHistory(search) : getHistory())
  }, [search])

  function handleDelete(id: string) {
    deleteRecord(id)
    setRecords(getHistory())
    if (selected?.id === id) setSelected(null)
  }

  function handleClearAll() {
    if (confirm('Delete all meeting history? This cannot be undone.')) {
      clearHistory()
      setRecords([])
      setSelected(null)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'rgba(0,0,0,0.96)' }}>

      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/"
            className="text-white/40 hover:text-white/70 transition-colors text-xs font-mono tracking-wider">
            ← BACK
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="font-display font-semibold text-white/80 text-lg">Meeting History</h1>
          <span className="text-[10px] font-mono text-white/25 px-2 py-0.5 rounded-full border border-white/10">
            {records.length} meetings
          </span>
        </div>
        {records.length > 0 && (
          <button onClick={handleClearAll}
            className="text-[11px] font-mono text-white/25 hover:text-red-400/70 transition-colors">
            Clear all
          </button>
        )}
      </div>

      <div className="max-w-8xl mx-auto px-6 py-8 flex gap-6">

        {/* Sidebar — list */}
        <div className="w-72 flex-shrink-0">

          {/* Search */}
          <input
            type="text"
            placeholder="Search meetings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-xs font-mono text-white/60 outline-none mb-4"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              caretColor: '#e07030',
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'rgba(200,98,26,0.40)'}
            onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
          />

          {records.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/20 text-sm font-light">No meetings yet</p>
              <p className="text-white/15 text-xs mt-1">Generate a MOM to see it here</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {records.map(record => (
                <div
                  key={record.id}
                  onClick={() => setSelected(record)}
                  className="group relative p-4 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    background: selected?.id === record.id
                      ? 'rgba(200,98,26,0.10)'
                      : 'rgba(255,255,255,0.03)',
                    border: selected?.id === record.id
                      ? '1px solid rgba(200,98,26,0.30)'
                      : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="text-xs font-medium text-white/70 leading-snug mb-1 pr-5 line-clamp-2">
                    {record.title}
                  </p>
                  <p className="text-[10px] font-mono text-white/25">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                  {record.result.sentiment && (
                    <span
                      className="text-[9px] font-mono mt-1.5 inline-block px-1.5 py-0.5 rounded"
                      style={{
                        background: record.result.sentiment.score >= 70
                          ? 'rgba(61,158,106,0.12)' : 'rgba(200,98,26,0.12)',
                        color: record.result.sentiment.score >= 70 ? '#3d9e6a' : '#c8621a',
                      }}
                    >
                      {record.result.sentiment.score}/100 · {record.result.sentiment.label}
                    </span>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(record.id) }}
                    className="absolute top-3 right-3 w-5 h-5 rounded flex items-center justify-center text-white/20 hover:text-red-400/70 opacity-0 group-hover:opacity-100 transition-all text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main — selected meeting */}
        <div className="flex-1 min-w-0">
          {selected ? (
            <MOMResult result={selected.result} options={selected.options} />
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-white/20 text-sm font-light">
                {records.length === 0 ? 'Generate your first MOM to see history' : 'Select a meeting to view details'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
