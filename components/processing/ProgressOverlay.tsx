"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProgressOverlayProps {
  isOpen: boolean
  status: 'processing' | 'completed' | 'failed'
  progress: number
  title: string
  message: string
  error?: string
  onDownload?: () => void
  onClose?: () => void
}

export function ProgressOverlay({
  isOpen,
  status,
  progress,
  title,
  message,
  error,
  onDownload,
  onClose
}: ProgressOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg"
          >
            <Card className="rounded-[2.5rem] border-primary/10 shadow-2xl overflow-hidden bg-background">
              <CardContent className="p-10 text-center">
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    {status === 'processing' && (
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-muted/20"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <motion.circle
                            className="text-primary"
                            strokeWidth="8"
                            strokeDasharray="251.2"
                            initial={{ strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="animate-spin text-primary" size={32} />
                        </div>
                      </div>
                    )}
                    {status === 'completed' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"
                      >
                        <CheckCircle2 size={48} />
                      </motion.div>
                    )}
                    {status === 'failed' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center text-destructive"
                      >
                        <AlertCircle size={48} />
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                  <p className="text-muted-foreground">{message}</p>
                  {error && <p className="text-sm text-destructive font-medium mt-2">{error}</p>}
                </div>

                {status === 'processing' && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        <ShieldCheck size={14} className="text-green-500" /> AES-256 Encrypted
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        <Zap size={14} className="text-amber-500" /> GPU Accelerated
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 mt-10">
                  {status === 'completed' && (
                    <Button 
                      size="lg" 
                      className="w-full h-14 rounded-full text-lg gap-2 shadow-xl bg-green-600 hover:bg-green-700"
                      onClick={onDownload}
                    >
                      <Download size={20} />
                      Download Result
                    </Button>
                  )}
                  {status === 'failed' && (
                    <Button 
                      size="lg" 
                      variant="destructive"
                      className="w-full h-14 rounded-full text-lg gap-2"
                      onClick={onClose}
                    >
                      Try Again
                    </Button>
                  )}
                  {status !== 'processing' && (
                    <Button variant="ghost" className="rounded-full" onClick={onClose}>
                      Close
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
