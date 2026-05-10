"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ToolLayout } from "@/components/shared/tool-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Fullscreen, Save, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorToolLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  category?: string
}

export function EditorToolLayout({ children, title, description, category = "DEVELOPER TOOLS" }: EditorToolLayoutProps) {
  return (
    <ToolLayout title={title} description={description} category={category}>
      <div className="flex flex-col gap-6">
        {/* Editor Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-muted/30 border border-muted-foreground/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Code size={14} className="text-primary" /> Editor Mode
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 gap-2 rounded-lg text-xs">
              <Save size={14} /> Auto-saving
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
              <Fullscreen size={14} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
              <Share2 size={14} />
            </Button>
          </div>
        </div>

        {/* Full-width Editor Area */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </ToolLayout>
  )
}
