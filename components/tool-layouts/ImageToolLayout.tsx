"use client"

import * as React from "react"
import { BaseToolLayout } from "./BaseToolLayout"
import { ImageIcon, Zap, Sparkles } from "lucide-react"

interface ImageToolLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  icon?: any
}

export function ImageToolLayout({ children, title, description, icon = ImageIcon }: ImageToolLayoutProps) {
  return (
    <BaseToolLayout 
      title={title} 
      description={description} 
      category="IMAGE TOOLS" 
      icon={icon}
    >
      {children}
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
          <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-600">
            <Zap size={16} /> Instant Processing
          </h4>
          <p className="text-sm text-muted-foreground">
            Our image tools use GPU acceleration and optimized algorithms to process your photos in milliseconds.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10">
          <h4 className="font-bold flex items-center gap-2 mb-2 text-purple-600">
            <Sparkles size={16} /> Best-in-class Quality
          </h4>
          <p className="text-sm text-muted-foreground">
            Whether you are compressing or resizing, we use Lanczos3 resampling to ensure your images stay sharp.
          </p>
        </div>
      </div>
    </BaseToolLayout>
  )
}
