"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Upload, 
  X, 
  File as FileIcon, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Plus,
  Trash2,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { UploadPipeline } from "@/lib/upload/pipeline"
import { toast } from "sonner"

interface UniversalUploaderProps {
  onFilesChange: (files: File[]) => void
  accept?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number // in MB
  multiple?: boolean
}

export function UniversalUploader({
  onFilesChange,
  accept,
  maxFiles = 10,
  maxSize = 100,
  multiple = true
}: UniversalUploaderProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const validation = await UploadPipeline.validate([...files, ...acceptedFiles], {
      maxSize,
      allowedTypes: accept ? Object.keys(accept) : []
    })

    if (!validation.success) {
      toast.error(validation.error)
      return
    }

    const newFiles = multiple 
      ? [...files, ...acceptedFiles].slice(0, maxFiles)
      : [acceptedFiles[0]]

    setFiles(newFiles)
    onFilesChange(newFiles)
  }, [files, multiple, maxFiles, maxSize, accept, onFilesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxFiles
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const clearFiles = () => {
    setFiles([])
    onFilesChange([])
  }

  return (
    <div className="w-full space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "relative min-h-[280px] border-2 border-dashed rounded-[2rem] p-12 transition-all cursor-pointer flex flex-col items-center justify-center text-center",
          isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted-foreground/20 hover:border-primary/40 hover:bg-muted/30",
          files.length > 0 && "py-10"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-300",
            isDragActive ? "bg-primary text-primary-foreground rotate-12" : "bg-primary/10 text-primary"
          )}>
            <Upload size={36} className={cn(isDragActive && "animate-bounce")} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {isDragActive ? "Drop them here!" : "Select files to process"}
            </h3>
            <p className="text-muted-foreground max-w-xs mx-auto text-sm">
              Drag and drop your files anywhere, or click to browse from your device.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Badge variant="secondary" className="rounded-full bg-background/50 border-muted-foreground/10 px-3 py-1">
              Max {maxSize}MB
            </Badge>
            <Badge variant="secondary" className="rounded-full bg-background/50 border-muted-foreground/10 px-3 py-1">
              Up to {maxFiles} files
            </Badge>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between px-2">
              <h4 className="text-sm font-bold flex items-center gap-2">
                Queue <Badge variant="default" className="h-5 min-w-[20px] p-0 flex items-center justify-center rounded-full text-[10px]">{files.length}</Badge>
              </h4>
              <Button variant="ghost" size="sm" onClick={clearFiles} className="text-xs h-7 text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 size={12} className="mr-2" /> Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-muted-foreground/10 hover:border-primary/30 transition-all"
                >
                  <div className="p-3 rounded-xl bg-background border shadow-sm group-hover:scale-110 transition-transform">
                    <FileIcon size={20} className="text-primary" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold truncate pr-8">{file.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                        {file.name.split('.').pop()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                  >
                    <X size={14} />
                  </Button>
                </motion.div>
              ))}
              
              {multiple && files.length < maxFiles && (
                <div 
                  {...getRootProps()}
                  className="flex items-center justify-center p-4 rounded-2xl border-2 border-dashed border-muted-foreground/10 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group"
                >
                  <Plus size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Add more files</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
        <Info size={16} className="text-primary mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your files stay private. All processing happens in your browser using secure sandboxed environments. We never see your data.
        </p>
      </div>
    </div>
  )
}
