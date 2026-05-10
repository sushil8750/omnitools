"use client"

import * as React from "react"
import { ToolLayout } from "@/components/shared/tool-layout"
import { FileUploader } from "@/components/shared/file-uploader"
import { Button } from "@/components/ui/button"
import { convertVideoToAudio } from "@/lib/ffmpeg-service"
import { toast } from "sonner"
import { Loader2, Download, Music, Video } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { trackToolUsage } from "@/lib/analytics/tracker"
import { UploadPipeline } from "@/lib/upload/pipeline"

export default function VideoToMp3Page() {
  const [files, setFiles] = React.useState<File[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState<{blob: Blob, name: string} | null>(null)

  const handleProcess = async () => {
    const validation = await UploadPipeline.validate(files, {
      maxSize: 500, // Large for videos
      allowedTypes: ['video/mp4', 'video/quicktime', 'video/x-matroska']
    })

    if (!validation.success) {
      toast.error(validation.error)
      return
    }

    setIsProcessing(true)
    trackToolUsage('mp4-to-mp3')
    setProgress(10)
    try {
      const audioBlob = await convertVideoToAudio(files[0])
      setResult({ blob: audioBlob, name: files[0].name.replace(/\.[^/.]+$/, "") + ".mp3" })
      setProgress(100)
      toast.success("Conversion successful!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to convert video. Ensure your browser supports WebAssembly.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!result) return
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement('a')
    link.href = url
    link.download = result.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Video to MP3 Converter"
      description="Extract high-quality audio from your video files instantly."
      category="Converter Tools"
    >
      <div className="space-y-8">
        {!result && (
          <FileUploader 
            onFilesSelected={setFiles}
            accept={{ 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] }}
            maxFiles={1}
            multiple={false}
          />
        )}

        {isProcessing && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Processing video...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="flex justify-center">
          {!result ? (
            <Button 
              size="lg" 
              className="rounded-full px-12 h-14 text-lg gap-2 shadow-xl"
              onClick={handleProcess}
              disabled={files.length === 0 || isProcessing}
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <Music size={20} />}
              {isProcessing ? "Converting..." : "Convert to MP3"}
            </Button>
          ) : (
            <div className="w-full max-w-md p-8 rounded-3xl bg-green-500/5 border border-green-500/20 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto text-green-600">
                <Music size={40} />
              </div>
              <div>
                <h3 className="font-bold text-xl">{result.name}</h3>
                <p className="text-muted-foreground">Ready for download</p>
              </div>
              <Button 
                size="lg" 
                className="w-full rounded-full h-14 text-lg gap-2 bg-green-600 hover:bg-green-700"
                onClick={handleDownload}
              >
                <Download size={20} />
                Download MP3
              </Button>
              <Button variant="ghost" className="text-muted-foreground" onClick={() => {setResult(null); setFiles([])}}>
                Convert Another Video
              </Button>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
