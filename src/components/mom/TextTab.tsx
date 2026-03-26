'use client'
export default function TextTab({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={`Paste your meeting transcript here...\n\nJohn: Good morning. Let's review Q3 results.\nSarah: Revenue target was met at 102%!\nJohn: Sarah, can you prepare a report by Friday?`}
        className="w-full min-h-[220px] px-4 py-3.5 text-xs font-mono text-white/75 outline-none resize-y leading-relaxed transition-all duration-300 placeholder:text-white/20 rounded-xl"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          caretColor: '#e07030',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(200,98,26,0.40)' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
      />
      {value.length > 0 && (
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/20 pointer-events-none">
          {value.length.toLocaleString()} chars
        </div>
      )}
    </div>
  )
}
