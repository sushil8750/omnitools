"use client"

import * as React from "react"
import { PdfToolLayout } from "@/components/tool-layouts/PdfToolLayout"
import { UniversalUploader } from "@/components/upload/UniversalUploader"
import { ProgressOverlay } from "@/components/processing/ProgressOverlay"
import { ShareResult } from "@/components/growth/ShareResult"
import { PDFDocument } from "pdf-lib"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FileText, Download, Zap } from "lucide-react"
import { trackToolUsage } from "@/lib/analytics/tracker"
import { UploadPipeline } from "@/lib/upload/pipeline"

export default function JpgToPdfPage() {
  const [files, setFiles] = React.useState<File[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState<Uint8Array | null>(null)
  const [status, setStatus] = React.useState<'processing' | 'completed' | 'failed'>('processing')

  const handleProcess = async () => {
    const validation = await UploadPipeline.validate(files, {
      maxSize: 50,
      allowedTypes: ['image/jpeg', 'image/png']
    })

    if (!validation.success) {
      toast.error(validation.error)
      return
    }

    setIsProcessing(true)
    setStatus('processing')
    setProgress(10)
    trackToolUsage('jpg-to-pdf')

    try {
      const pdfDoc = await PDFDocument.create()
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const arrayBuffer = await file.arrayBuffer()
        let image
        
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer)
        } else {
          image = await pdfDoc.embedJpg(arrayBuffer)
        }

        const page = pdfDoc.addPage([image.width, image.height])
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        })
        
        setProgress(10 + ((i + 1) / files.length) * 80)
      }

      const pdfBytes = await pdfDoc.save()
      setResult(pdfBytes)
      setStatus('completed')
      setProgress(100)
    } catch (error) {
      console.error(error)
      setStatus('failed')
      toast.error("Failed to convert images to PDF.")
    }
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = "converted_images.pdf"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PdfToolLayout
      title="JPG to PDF"
      description="Convert your JPG images to high-quality PDF documents in seconds."
    >
      <div className="space-y-12">
        <UniversalUploader 
          onFilesChange={setFiles} 
          accept={{"image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"]}}
          maxFiles={20}
        />

        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="h-16 rounded-full px-12 text-xl font-bold gap-3 shadow-2xl shadow-primary/20"
            disabled={files.length === 0 || isProcessing}
            onClick={handleProcess}
          >
            <Zap size={24} className="fill-current" />
            Convert to PDF Now
          </Button>
        </div>

        <ProgressOverlay
          isOpen={isProcessing}
          status={status}
          progress={progress}
          title="Converting Images"
          message="We're building your PDF document. This happens entirely in your browser."
          onDownload={handleDownload}
          onClose={() => setIsProcessing(false)}
        />

        {status === 'completed' && !isProcessing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6">
                <FileText size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to download!</h3>
              <p className="text-primary-foreground/80 mb-8">Your images have been successfully converted into a PDF.</p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full h-14 rounded-full text-lg gap-2 shadow-xl"
                onClick={handleDownload}
              >
                <Download size={20} /> Download PDF
              </Button>
            </div>
            <ShareResult toolName="JPG to PDF" />
          </div>
        )}
      </div>
    </PdfToolLayout>
  )
}
