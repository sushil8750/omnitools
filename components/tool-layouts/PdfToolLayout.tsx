"use client"

import * as React from "react"
import { BaseToolLayout } from "./BaseToolLayout"
import { FileText, Shield, FileCheck } from "lucide-react"

interface PdfToolLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  icon?: any
}

export function PdfToolLayout({ children, title, description, icon = FileText }: PdfToolLayoutProps) {
  return (
    <BaseToolLayout 
      title={title} 
      description={description} 
      category="PDF TOOLS" 
      icon={icon}
    >
      {children}
      
      {/* PDF Specific Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
          <h4 className="font-bold flex items-center gap-2 mb-2 text-red-600">
            <Shield size={16} /> Privacy Guaranteed
          </h4>
          <p className="text-sm text-muted-foreground">
            Your PDF files are never uploaded to our servers. All merging, splitting, and compression happens locally in your browser.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <h4 className="font-bold flex items-center gap-2 mb-2 text-blue-600">
            <FileCheck size={16} /> High Fidelity
          </h4>
          <p className="text-sm text-muted-foreground">
            We use industry-standard libraries to ensure that your PDF structure, fonts, and images remain perfectly intact.
          </p>
        </div>
      </div>
    </BaseToolLayout>
  )
}
