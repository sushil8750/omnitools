"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ToolLayout } from "@/components/shared/tool-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Info, 
  ShieldCheck, 
  Zap, 
  History,
  Settings2,
  Share2
} from "lucide-react"
import { FAQ } from "@/components/shared/faq"

interface BaseToolLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  category: string
  icon: any
  sidebarContent?: React.ReactNode
  faqs?: { q: string, a: string }[]
}

export function BaseToolLayout({ 
  children, 
  title, 
  description, 
  category, 
  icon: Icon,
  sidebarContent,
  faqs
}: BaseToolLayoutProps) {
  return (
    <ToolLayout title={title} description={description} category={category}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Tool Area */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none bg-background shadow-none">
            <CardContent className="p-0">
              {children}
            </CardContent>
          </Card>
          
          <Card className="rounded-[2.5rem] border-green-500/10 bg-green-500/5 shadow-none overflow-hidden">
            <CardContent className="p-8">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-6">
                <Shield size={20} />
              </div>
              <h4 className="font-bold mb-2">Secure & Private</h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Your files are processed directly in your browser. We never upload your sensitive data to our servers. Files are automatically cleared from memory after processing.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / Options Area */}
        <div className="lg:col-span-4 space-y-6">
          {sidebarContent ? sidebarContent : (
            <>
              <Card className="rounded-3xl border-primary/10 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings2 size={18} className="text-primary" />
                    <h3 className="font-bold">Tool Options</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select your files to see available processing options for this tool.
                  </p>
                  <Separator className="my-4 bg-primary/10" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck size={14} className="text-green-500" />
                      Secure client-side processing
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap size={14} className="text-amber-500" />
                      Powered by Wasm technology
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-muted-foreground/10 bg-muted/20">
                <CardContent className="p-6">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Info size={14} /> Quick Tips
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• Drag and drop multiple files at once.</li>
                    <li>• Large files may take a few moments.</li>
                    <li>• Files are processed in your browser.</li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <Share2 size={14} /> Share Tool
            </Button>
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <History size={14} /> Recently Used
            </Button>
          </div>
        </div>
      </div>

      {faqs && <FAQ items={faqs} />}
    </ToolLayout>
  )
}

import { Button } from "@/components/ui/button"
