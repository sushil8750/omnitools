"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link as LinkIcon,
  CheckCircle2,
  Copy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export function ShareResult({ toolName }: { toolName: string }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ""
  const message = `Check out this awesome ${toolName} tool on OmniTools! Fast, secure, and free.`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast.success("Link copied to clipboard!")
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  return (
    <Card className="rounded-[2.5rem] border-primary/5 bg-muted/20 shadow-none overflow-hidden">
      <CardContent className="p-8 text-center">
        <h4 className="font-bold text-lg mb-6 flex items-center justify-center gap-2">
          <Share2 size={18} className="text-primary" /> Share the love
        </h4>
        <p className="text-sm text-muted-foreground mb-8">
          Found this tool useful? Help us grow by sharing it with your network!
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full hover:bg-sky-500 hover:text-white transition-colors" onClick={shareOnTwitter}>
            <Twitter size={20} />
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <Facebook size={20} />
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full hover:bg-blue-700 hover:text-white transition-colors">
            <Linkedin size={20} />
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full hover:bg-primary hover:text-white transition-colors" onClick={copyToClipboard}>
            <LinkIcon size={20} />
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-muted-foreground/10">
          <div className="p-3 rounded-2xl bg-background/50 border border-muted-foreground/10 flex items-center justify-between gap-4">
            <span className="text-[10px] font-mono text-muted-foreground truncate">{shareUrl}</span>
            <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2" onClick={copyToClipboard}>
              <Copy size={12} /> Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
