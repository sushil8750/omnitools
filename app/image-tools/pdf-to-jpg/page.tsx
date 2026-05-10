"use client"

import * as React from "react"
import { ImageToolLayout } from "@/components/tool-layouts/ImageToolLayout"
import { UniversalUploader } from "@/components/upload/UniversalUploader"
import { ProgressOverlay } from "@/components/processing/ProgressOverlay"
import { ShareResult } from "@/components/growth/ShareResult"
import { convertPdfToImages } from "@/lib/pdf-to-image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Download, Zap, ImageIcon, FileText } from "lucide-react"
import { trackToolUsage } from "@/lib/analytics/tracker"
import { UploadPipeline } from "@/lib/upload/pipeline"
import JSZip from "jszip"

export default function PdfToJpgPage({ faqs }: { faqs?: { q: string, a: string }[] }) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState<Blob | null>(null)
  const [status, setStatus] = React.useState<'processing' | 'completed' | 'failed'>('processing')

  const handleProcess = async () => {
    const validation = await UploadPipeline.validate(files, {
      maxSize: 50,
      allowedTypes: ['application/pdf']
    })

    if (!validation.success) {
      toast.error(validation.error)
      return
    }

    setIsProcessing(true)
    setStatus('processing')
    setProgress(10)
    trackToolUsage('pdf-to-jpg')

    try {
      const images = await convertPdfToImages(files[0])
      setProgress(80)

      if (images.length === 1) {
        setResult(images[0])
      } else {
        const zip = new JSZip()
        images.forEach((img, i) => {
          zip.file(`page_${i + 1}.jpg`, img)
        })
        const zipBlob = await zip.generateAsync({ type: "blob" })
        setResult(zipBlob)
      }

      setStatus('completed')
      setProgress(100)
    } catch (error) {
      console.error(error)
      setStatus('failed')
      toast.error("Failed to convert PDF to images.")
    }
  }

  const handleDownload = () => {
    if (!result) return
    const url = URL.createObjectURL(result)
    const link = document.createElement('a')
    link.href = url
    link.download = result.type === 'application/zip' ? 'images.zip' : 'page.jpg'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ImageToolLayout
      title="PDF to JPG"
      description="Extract pages from your PDF documents as high-quality JPG images."
      faqs={faqs}
    >
      <div className="space-y-12">
        <UniversalUploader 
          onFilesChange={setFiles}
          maxFiles={1}
          accept={{ 'application/pdf': ['.pdf'] }}
        />

        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="h-16 rounded-full px-12 text-xl font-bold gap-3 shadow-2xl shadow-primary/20"
            disabled={files.length === 0 || isProcessing}
            onClick={handleProcess}
          >
            <Zap size={24} className="fill-current" />
            Extract Images Now
          </Button>
        </div>

        <ProgressOverlay
          isOpen={isProcessing}
          status={status}
          progress={progress}
          title="Extracting Pages"
          message="We're rendering your PDF pages to high-quality images. No data leaves your device."
          onDownload={handleDownload}
          onClose={() => setIsProcessing(false)}
        />

        {status === 'completed' && !isProcessing && result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6">
                <ImageIcon size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Extraction Complete!</h3>
              <p className="text-primary-foreground/80 mb-8">
                {result.type === 'application/zip' 
                  ? "All pages have been converted. Download them as a ZIP archive." 
                  : "The page has been converted successfully."}
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full h-14 rounded-full text-lg gap-2 shadow-xl"
                onClick={handleDownload}
              >
                <Download size={20} /> Download {result.type === 'application/zip' ? 'ZIP Archive' : 'JPG Image'}
              </Button>
            </div>
            <ShareResult toolName="PDF to JPG" />
          </div>
        )}
      </div>
    </ImageToolLayout>
  )
}
