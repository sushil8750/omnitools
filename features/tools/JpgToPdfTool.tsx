"use client"

import * as React from "react"
import { PdfToolLayout } from "@/components/tool-layouts/PdfToolLayout"
import { UniversalUploader } from "@/components/upload/UniversalUploader"
import { Button } from "@/components/ui/button"
import { FileText, Zap } from "lucide-react"

export function JpgToPdfTool({ faqs }: { faqs?: { q: string, a: string }[] }) {
  return (
    <PdfToolLayout
      title="JPG to PDF"
      description="Convert your JPG images to PDF documents instantly."
      faqs={faqs}
    >
      <div className="space-y-12">
        <UniversalUploader 
          onFilesChange={() => {}}
          accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
        />
        <div className="flex justify-center">
          <Button size="lg" className="h-16 rounded-full px-12 text-xl font-bold gap-3 shadow-2xl">
            <Zap size={24} /> Convert to PDF
          </Button>
        </div>
      </div>
    </PdfToolLayout>
  )
}
