'use client'

import UploadZone from '@/components/ui/UploadZone'
import FileList from '@/components/ui/FileList'

interface AudioTabProps {
  files: File[]
  onChange: (files: File[]) => void
}

export default function AudioTab({ files, onChange }: AudioTabProps) {
  function addFiles(newFiles: File[]) {
    onChange([...files, ...newFiles])
  }
  function removeFile(i: number) {
    onChange(files.filter((_, idx) => idx !== i))
  }

  return (
    <div>
      <UploadZone
        accept="audio/*,video/*"
        multiple
        emoji="🎙"
        title="Drop audio or video files here"
        subtitle="or click to browse your files"
        formats="MP3 · MP4 · WAV · M4A · WEBM · OGG"
        onFiles={addFiles}
      />
      <FileList files={files} onRemove={removeFile} />
      <p className="mt-3 text-[11px] font-mono text-subtle tracking-wide">
        ℹ AUDIO TRANSCRIPTION REQUIRES BACKEND AT localhost:8000
      </p>
    </div>
  )
}
