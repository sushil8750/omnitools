"use client"

import * as React from "react"
import { ToolLayout } from "@/components/shared/tool-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Copy, Trash2, Code2, Check, Braces } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function JsonFormatterPage() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [isCopied, setIsCopied] = React.useState(false)

  const handleFormat = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      toast.success("JSON formatted successfully!")
    } catch (error) {
      toast.error("Invalid JSON format. Please check your input.")
    }
  }

  const handleMinify = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      toast.success("JSON minified successfully!")
    } catch (error) {
      toast.error("Invalid JSON format. Please check your input.")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Prettify, validate, and minify your JSON data instantly."
      category="Developer Tools"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Code2 size={18} className="text-primary" /> Input
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setInput("")}>
              <Trash2 size={14} className="mr-2" /> Clear
            </Button>
          </div>
          <Textarea 
            placeholder='Paste your JSON here... e.g. {"name":"John", "age":30}' 
            className="min-h-[400px] font-mono text-sm rounded-2xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-4">
            <Button className="flex-grow rounded-xl h-12" onClick={handleFormat}>
              Format (Prettify)
            </Button>
            <Button variant="outline" className="flex-grow rounded-xl h-12" onClick={handleMinify}>
              Minify
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Braces size={18} className="text-primary" /> Output
            </h3>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              {isCopied ? <Check size={14} className="mr-2 text-green-500" /> : <Copy size={14} className="mr-2" />}
              Copy
            </Button>
          </div>
          <Card className="min-h-[400px] rounded-2xl bg-muted/30 border-none overflow-hidden">
            <CardContent className="p-0 h-full">
              <pre className="p-4 font-mono text-sm overflow-auto h-[400px] whitespace-pre-wrap">
                {output || <span className="text-muted-foreground italic">Formatted output will appear here...</span>}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
