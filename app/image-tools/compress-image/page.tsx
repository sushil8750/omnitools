"use client"

import * as React from "react"
import { ImageToolLayout } from "@/components/tool-layouts/ImageToolLayout"
import { UniversalUploader } from "@/components/upload/UniversalUploader"
import { ProgressOverlay } from "@/components/processing/ProgressOverlay"
import { ShareResult } from "@/components/growth/ShareResult"
import { compressImage } from "@/lib/image-service"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Download, Zap, ImageIcon, Settings2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { trackToolUsage } from "@/lib/analytics/tracker"
import { UploadPipeline } from "@/lib/upload/pipeline"

export default function CompressImagePage({ faqs }: { faqs?: { q: string, a: string }[] }) {
  const [files, setFiles] = React.useState<File[]>([])
  const [quality, setQuality] = React.useState(80)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState<Blob | null>(null)
  const [status, setStatus] = React.useState<'processing' | 'completed' | 'failed'>('processing')

  const handleProcess = async () => {
    const validation = await UploadPipeline.validate(files, {
      maxSize: 20,
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
    })

    if (!validation.success) {
      toast.error(validation.error)
      return
    }

    setIsProcessing(true)
    setStatus('processing')
    setProgress(20)
    trackToolUsage('compress-image')

    try {
      const compressed = await compressImage(files[0], quality / 100)
      setProgress(100)
      setResult(compressed)
      setStatus('completed')
    } catch (error) {
      console.error(error)
      setStatus('failed')
      toast.error("Failed to compress image.")
    }
  }

  const handleDownload = () => {
    if (!result) return
    const url = URL.createObjectURL(result)
    const link = document.createElement('a')
    link.href = url
    link.download = `compressed_${files[0].name}`
    link.click()
    URL.revokeObjectURL(url)
  }

  const sidebar = (
    <div className="space-y-6">
      <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <h4 className="font-bold mb-6 flex items-center gap-2">
            <Settings2 size={18} className="text-primary" /> Settings
          </h4>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-muted-foreground">Quality</span>
                <span className="text-primary">{quality}%</span>
              </div>
              <Slider 
                value={[quality]} 
                onValueChange={(v) => setQuality(v[0])} 
                max={100} 
                step={1} 
                className="py-4"
              />
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Lower quality results in smaller file size. 80% is usually the sweet spot for web.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ImageToolLayout
      title="Compress Image"
      description="Reduce image file size without losing quality."
      sidebarContent={sidebar}
      faqs={faqs}
    >
      <div className="space-y-12">
        <UniversalUploader 
          onFilesChange={setFiles}
          maxFiles={1}
          accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          {!results.length ? (
            <Button 
              size="lg" 
              className="rounded-full px-12 h-14 text-lg gap-2 shadow-xl"
              onClick={handleProcess}
              disabled={files.length === 0 || isProcessing}
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
              {isProcessing ? "Compressing..." : "Compress Images"}
            </Button>
          ) : (
            <div className="w-full space-y-4">
              {results.map((res, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                      <ImageIcon size={18} />
                    </div>
                    <span className="text-sm font-medium">{res.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-bold">
                      {(res.blob.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <Button size="sm" onClick={() => handleDownload(res.blob, res.name)} className="gap-2">
                    <Download size={14} /> Download
                  </Button>
                </div>
              ))}
              <div className="text-center pt-4">
                <Button variant="ghost" onClick={() => {setResults([]); setFiles([])}}>
                  Compress More Images
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
