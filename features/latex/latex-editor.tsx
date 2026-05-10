"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Editor from "@monaco-editor/react"
import { 
  Play, 
  Download, 
  FileText, 
  Save, 
  Settings, 
  ChevronRight,
  Loader2,
  Trash2,
  Copy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TEMPLATES = {
  academic: `\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{Academic Paper Template}
\\author{OmniTools User}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
This is a sample academic paper template created with OmniTools LaTeX Editor.

\\section{Mathematics}
Equations are rendered beautifully:
\\begin{equation}
    E = mc^2
\\end{equation}

\\section{Conclusion}
Happy TeX-ing!

\\end{document}`,
  resume: `\\documentclass{article}
\\begin{document}
\\centerline{\\Huge John Doe}
\\centerline{john.doe@example.com | +1 234 567 890}
\\section*{Experience}
\\textbf{Senior Engineer} @ Tech Corp \\hfill 2020 -- Present
\\begin{itemize}
    \\item Developed high-performance utility platforms.
\\end{itemize}
\\end{document}`,
  notes: `\\documentclass{article}
\\begin{document}
\\title{Meeting Notes}
\\maketitle
\\section{Key Points}
- Discussed the new LaTeX feature.
- Optimized the PDF preview system.
\\end{document}`
}

export function LatexEditor() {
  const [code, setCode] = React.useState(TEMPLATES.academic)
  const [isCompiling, setIsCompiling] = React.useState(false)
  const [previewContent, setPreviewContent] = React.useState<string | null>(null)
  const [logs, setLogs] = React.useState<string[]>([])
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCompile = () => {
    setIsCompiling(true)
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting compilation...`])
    
    // Simulate compilation for now
    setTimeout(() => {
      setIsCompiling(false)
      setPreviewContent("Sample PDF Content")
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Compilation successful.`])
      toast.success("Compiled successfully!")
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
    toast.success("Code copied to clipboard")
  }

  return (
    <div className="flex flex-col h-[800px] border rounded-3xl overflow-hidden bg-background shadow-2xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/20">
        <div className="flex items-center gap-2">
          <Select defaultValue="academic" onValueChange={(val) => setCode(TEMPLATES[val as keyof typeof TEMPLATES])}>
            <SelectTrigger className="w-[180px] h-9 bg-background">
              <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic Paper</SelectItem>
              <SelectItem value="resume">Resume</SelectItem>
              <SelectItem value="notes">Meeting Notes</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
            {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setCode("")}>
            <Trash2 size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            onClick={handleCompile} 
            disabled={isCompiling}
            className="h-9 gap-2 px-4 shadow-md hover:shadow-primary/20"
          >
            {isCompiling ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
            Compile
          </Button>
          <Button variant="outline" className="h-9 gap-2 shadow-sm" disabled={!previewContent}>
            <Download size={16} />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* Editor Side */}
        <div className="w-1/2 border-r relative flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/5">
            <FileText size={12} /> main.tex
          </div>
          <div className="flex-grow">
            <Editor
              height="100%"
              defaultLanguage="latex"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        {/* Preview / Logs Side */}
        <div className="w-1/2 flex flex-col bg-muted/10">
          <Tabs defaultValue="preview" className="flex flex-col h-full">
            <div className="px-4 border-b bg-background">
              <TabsList className="bg-transparent h-10 gap-4">
                <TabsTrigger 
                  value="preview" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
                >
                  PDF Preview
                </TabsTrigger>
                <TabsTrigger 
                  value="logs"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
                >
                  Logs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="preview" className="flex-grow m-0 p-0 relative">
              {isCompiling && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin text-primary" />
                    <p className="font-medium animate-pulse">Compiling document...</p>
                  </div>
                </div>
              )}
              
              {!previewContent && !isCompiling ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                    <FileText size={40} className="text-muted-foreground/40" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Preview Available</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Click the "Compile" button to generate the PDF preview of your document.
                  </p>
                </div>
              ) : (
                <div className="w-full h-full p-4 flex justify-center">
                  <div className="w-full h-full bg-white rounded shadow-lg flex items-center justify-center text-slate-400">
                    {/* In a real app, this would be an iframe or PDF.js canvas */}
                    <div className="text-center">
                      <p className="text-sm">PDF Preview Component</p>
                      <p className="text-[10px] uppercase tracking-widest mt-2">Mock Content</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="logs" className="flex-grow m-0 bg-black text-green-500 font-mono text-xs p-4">
              <ScrollArea className="h-full">
                {logs.map((log, i) => (
                  <div key={i} className="mb-1 leading-relaxed">{log}</div>
                ))}
                {logs.length === 0 && <div className="text-muted-foreground italic">No logs to display.</div>}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
