'use client'

import UploadZone from '@/components/ui/UploadZone'
import ImageGrid from '@/components/ui/ImageGrid'
import type { ImageFile } from '@/types'

interface ImagesTabProps {
  images: ImageFile[]
  onChange: (images: ImageFile[]) => void
}

export default function ImagesTab({ images, onChange }: ImagesTabProps) {
  function addFiles(files: File[]) {
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string
          onChange([...images, {
            name: file.name, type: file.type,
            dataUrl, b64: dataUrl.split(',')[1],
          }])
        }
        reader.readAsDataURL(file)
      } else {
        onChange([...images, { name: file.name, type: file.type, dataUrl: '', b64: '' }])
      }
    })
  }
  function removeImage(i: number) { onChange(images.filter((_, idx) => idx !== i)) }

  return (
    <div>
      <UploadZone
        accept="image/*,.pdf"
        multiple
        emoji="◈"
        title="Drop screenshots, photos or PDFs"
        subtitle="Whiteboard shots, slide decks, documents"
        formats="PNG · JPG · WEBP · PDF · GIF"
        onFiles={addFiles}
      />
      <ImageGrid images={images} onRemove={removeImage} />
    </div>
  )
}
