"use client"

import * as React from "react"
import { ImageToolLayout } from "@/components/tool-layouts/ImageToolLayout"
import { UniversalUploader } from "@/components/upload/UniversalUploader"
import { Button } from "@/components/ui/button"
import { ImageIcon, Zap } from "lucide-react"

export function PdfToJpgTool({ faqs }: { faqs?: { q: string, a: string }[] }) {
  return (
    <ImageToolLayout
      title="PDF to JPG"
      description="Extract pages from a PDF as high-quality JPG images."
      faqs={faqs}
    >
      <div className="space-y-12">
        <UniversalUploader 
          accept={{ 'application/pdf': ['.pdf'] }}
        />
        <div className="flex justify-center">
          <Button size="lg" className="h-16 rounded-full px-12 text-xl font-bold gap-3 shadow-2xl">
            <Zap size={24} /> Extract Images
          </Button>
        </div>
      </div>
    </ImageToolLayout>
  )
}
