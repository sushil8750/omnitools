"use client"

import * as React from "react"
import { PdfToolLayout } from "@/components/tool-layouts/PdfToolLayout"
import { UniversalUploader } from "@/components/upload/UniversalUploader"
import { ProgressOverlay } from "@/components/processing/ProgressOverlay"
import { ShareResult } from "@/components/growth/ShareResult"
import { mergePDFs } from "@/lib/pdf-service"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Download, Zap, FileText } from "lucide-react"
import { trackToolUsage } from "@/lib/analytics/tracker"
import { UploadPipeline } from "@/lib/upload/pipeline"

export default function MergePdfPage({ faqs }: { faqs?: { q: string, a: string }[] }) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState<Uint8Array | null>(null)
  const [status, setStatus] = React.useState<'processing' | 'completed' | 'failed'>('processing')

  const handleProcess = async () => {
    const validation = await UploadPipeline.validate(files, {
      maxSize: 100,
      allowedTypes: ['application/pdf']
    })

    if (!validation.success) {
      toast.error(validation.error)
      return
    }

    setIsProcessing(true)
    setStatus('processing')
    setProgress(10)
    trackToolUsage('merge-pdf')

    try {
      // Small delay to show animation
      await new Promise(r => setTimeout(r, 800))
      setProgress(40)
      
      const merged = await mergePDFs(files)
      
      setProgress(90)
      await new Promise(r => setTimeout(r, 500))
      
      setResult(merged)
      setStatus('completed')
      setProgress(100)
    } catch (error) {
      console.error(error)
      setStatus('failed')
      toast.error("Failed to merge PDFs. Please try again.")
    }
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'merged_document.pdf'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PdfToolLayout
      title="Merge PDF"
      description="Merge multiple PDF documents into one single file easily."
      faqs={faqs}
    >
      <div className="space-y-12">
        <UniversalUploader 
          onFilesChange={setFiles}
          accept={{ 'application/pdf': ['.pdf'] }}
          maxFiles={20}
        />

        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="h-16 rounded-full px-12 text-xl font-bold gap-3 shadow-2xl shadow-primary/20"
            disabled={files.length < 2 || isProcessing}
            onClick={handleProcess}
          >
            <Zap size={24} className="fill-current" />
            Merge PDFs Now
          </Button>
        </div>

        <ProgressOverlay
          isOpen={isProcessing}
          status={status}
          progress={progress}
          title="Merging PDFs"
          message="We're combining your files using high-speed WebAssembly. No data leaves your device."
          onDownload={handleDownload}
          onClose={() => setIsProcessing(false)}
        />

        {status === 'completed' && !isProcessing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6">
                <FileText size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Success!</h3>
              <p className="text-primary-foreground/80 mb-8">Your files have been merged into a single document.</p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full h-14 rounded-full text-lg gap-2 shadow-xl"
                onClick={handleDownload}
              >
                <Download size={20} /> Download Merged PDF
              </Button>
            </div>
            <ShareResult toolName="Merge PDF" />
          </div>
        )}
      </div>
    </PdfToolLayout>
  )
}
