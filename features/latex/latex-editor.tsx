"use client"

import * as React from "react"
import Editor from "@monaco-editor/react"
import {
  Play,
  Download,
  FileText,
  Loader2,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------
const TEMPLATES: Record<string, string> = {
  academic: `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}

\\title{Academic Paper Template}
\\author{OmniTools User}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
This is a sample academic paper template created with the OmniTools LaTeX Editor.
You can write your content here and click \\textbf{Compile} to generate a real PDF.

\\section{Mathematics}
Equations are rendered beautifully in LaTeX:
\\begin{equation}
  E = mc^2
\\end{equation}

The quadratic formula is given by:
\\begin{equation}
  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
\\end{equation}

\\section{Conclusion}
Happy TeX-ing!

\\end{document}`,

  resume: `\\documentclass[10pt]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{parskip}
\\begin{document}

\\begin{center}
  {\\Huge \\textbf{John Doe}}\\\\[4pt]
  john.doe@example.com $\\bullet$ +1 234 567 890 $\\bullet$ LinkedIn
\\end{center}

\\hrule
\\vspace{4pt}

\\section*{Experience}
\\textbf{Senior Engineer} \\hfill Tech Corp \\textit{(2020 -- Present)}
\\begin{itemize}
  \\item Developed high-performance utility platforms serving 10M+ users.
  \\item Led a team of 8 engineers across 3 time zones.
\\end{itemize}

\\section*{Education}
\\textbf{B.Sc. Computer Science} \\hfill State University \\textit{(2016 -- 2020)}

\\section*{Skills}
TypeScript, Python, Go, Kubernetes, PostgreSQL, LaTeX

\\end{document}`,

  notes: `\\documentclass{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\title{Meeting Notes}
\\author{OmniTools}
\\date{\\today}
\\begin{document}
\\maketitle

\\section*{Attendees}
Alice, Bob, Charlie

\\section*{Key Points}
\\begin{itemize}[noitemsep]
  \\item Discussed the new LaTeX feature.
  \\item Optimised the PDF preview system.
  \\item Scheduled next review for Friday.
\\end{itemize}

\\section*{Action Items}
\\begin{enumerate}[noitemsep]
  \\item Alice -- update the roadmap by EOD.
  \\item Bob -- set up CI pipeline.
\\end{enumerate}

\\end{document}`,

  thesis: `\\documentclass[12pt]{report}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath, amssymb}
\\usepackage[margin=1.25in]{geometry}

\\title{Thesis Title}
\\author{Your Name}
\\date{\\today}

\\begin{document}
\\maketitle
\\tableofcontents

\\chapter{Introduction}
This is the introduction chapter of your thesis.

\\chapter{Literature Review}
Summarise prior work here.

\\chapter{Methodology}
Describe your approach.

\\chapter{Conclusion}
Summarise findings and future work.

\\end{document}`,
}

// ---------------------------------------------------------------------------
// LaTeX Online API wrapper
// Free, no-auth API that compiles LaTeX → PDF
// Docs: https://latexonline.cc
// ---------------------------------------------------------------------------
async function compileLatex(source: string): Promise<{ pdf: Blob; logs: string } | { error: string; logs: string }> {
  try {
    // Encode the source and POST it
    const formData = new FormData()
    const blob = new Blob([source], { type: "text/plain" })
    formData.append("file", blob, "main.tex")

    const res = await fetch("https://latexonline.cc/compile", {
      method: "POST",
      body: formData,
    })

    // Try to read the logs header
    const logs = res.headers.get("x-latex-log") || ""

    if (res.ok) {
      const pdf = await res.blob()
      return { pdf, logs }
    }

    // The API may return 400 with a plain-text error body
    const errorText = await res.text().catch(() => "Unknown compilation error")
    return { error: errorText || `HTTP ${res.status}`, logs }
  } catch (err: any) {
    // Network / CORS fallback — explain clearly
    return {
      error:
        "Could not reach the LaTeX compilation server. " +
        "This usually means a network or CORS restriction. " +
        "Please check your internet connection and try again.",
      logs: err?.message ?? "",
    }
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function LatexEditor() {
  const [code, setCode] = React.useState(TEMPLATES.academic)
  const [isCompiling, setIsCompiling] = React.useState(false)
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = React.useState<Blob | null>(null)
  const [logs, setLogs] = React.useState<string[]>([])
  const [compilationError, setCompilationError] = React.useState<string | null>(null)
  const [isCopied, setIsCopied] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("preview")

  // Revoke old object URL to prevent memory leaks
  const revokePrevUrl = React.useCallback(() => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl)
  }, [pdfUrl])

  const appendLog = (msg: string) =>
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])

  const handleCompile = async () => {
    if (!code.trim()) {
      toast.error("Editor is empty — please write some LaTeX first.")
      return
    }

    setIsCompiling(true)
    setCompilationError(null)
    revokePrevUrl()
    setPdfUrl(null)
    setPdfBlob(null)
    setActiveTab("preview")
    appendLog("Starting compilation...")

    const result = await compileLatex(code)

    if ("error" in result) {
      setCompilationError(result.error)
      appendLog("Compilation failed.")
      if (result.logs) appendLog(result.logs)
      toast.error("Compilation failed — see logs for details.")
    } else {
      const url = URL.createObjectURL(result.pdf)
      setPdfUrl(url)
      setPdfBlob(result.pdf)
      appendLog("Compilation successful ✓")
      if (result.logs) appendLog(result.logs)
      toast.success("PDF compiled successfully!")
    }

    setIsCompiling(false)
  }

  const handleDownload = () => {
    if (!pdfBlob) return
    const url = URL.createObjectURL(pdfBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.pdf"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("PDF downloaded!")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
    toast.success("Code copied to clipboard")
  }

  const handleTemplateChange = (val: string) => {
    setCode(TEMPLATES[val] ?? "")
    setPdfUrl(null)
    setPdfBlob(null)
    setCompilationError(null)
    setLogs([])
  }

  const handleClearLogs = () => setLogs([])

  return (
    <div className="flex flex-col h-[820px] border rounded-3xl overflow-hidden bg-background shadow-2xl">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/20">
        <div className="flex items-center gap-2">
          <Select defaultValue="academic" onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-[180px] h-9 bg-background">
              <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic Paper</SelectItem>
              <SelectItem value="resume">Resume / CV</SelectItem>
              <SelectItem value="notes">Meeting Notes</SelectItem>
              <SelectItem value="thesis">Thesis Structure</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} title="Copy source">
            {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => {
              setCode("")
              setPdfUrl(null)
              setPdfBlob(null)
              setCompilationError(null)
              setLogs([])
            }}
            title="Clear editor"
          >
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
            {isCompiling ? "Compiling…" : "Compile"}
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-2 shadow-sm"
            disabled={!pdfBlob}
            onClick={handleDownload}
          >
            <Download size={16} />
            Download PDF
          </Button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-grow overflow-hidden">
        {/* Editor */}
        <div className="w-1/2 border-r relative flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/5 border-b">
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
                padding: { top: 16 },
                wordWrap: "on",
              }}
            />
          </div>
        </div>

        {/* Preview + Logs */}
        <div className="w-1/2 flex flex-col bg-muted/10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <div className="px-4 border-b bg-background flex items-center justify-between">
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
                  {logs.length > 0 && (
                    <span className="ml-2 rounded-full bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5">
                      {logs.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              {activeTab === "logs" && logs.length > 0 && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={handleClearLogs}>
                  <RefreshCw size={11} /> Clear
                </Button>
              )}
            </div>

            {/* PDF Preview tab */}
            <TabsContent value="preview" className="flex-grow m-0 p-0 relative overflow-hidden">
              {isCompiling && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[3px]">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin text-primary" />
                    <p className="font-semibold animate-pulse">Compiling LaTeX…</p>
                    <p className="text-xs text-muted-foreground">This usually takes a few seconds</p>
                  </div>
                </div>
              )}

              {compilationError && !isCompiling && (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle size={32} className="text-destructive" />
                  </div>
                  <h3 className="font-bold text-lg">Compilation Error</h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{compilationError}</p>
                  <Button size="sm" variant="outline" className="gap-2" onClick={handleCompile}>
                    <RefreshCw size={14} /> Retry
                  </Button>
                </div>
              )}

              {!pdfUrl && !compilationError && !isCompiling && (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 gap-4">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                    <FileText size={40} className="text-muted-foreground/40" />
                  </div>
                  <h3 className="text-lg font-semibold">No Preview Yet</h3>
                  <p className="text-muted-foreground max-w-xs text-sm">
                    Click <span className="font-bold text-primary">Compile</span> to generate a real PDF preview of your document.
                  </p>
                  <Button onClick={handleCompile} className="gap-2 mt-2 rounded-full px-6">
                    <Play size={14} fill="currentColor" /> Compile Now
                  </Button>
                </div>
              )}

              {pdfUrl && !isCompiling && (
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  className="w-full h-full"
                  title="PDF Preview"
                >
                  <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Your browser cannot display PDFs inline.
                    </p>
                    <Button onClick={handleDownload} className="gap-2 rounded-full">
                      <Download size={14} /> Download PDF
                    </Button>
                  </div>
                </object>
              )}
            </TabsContent>

            {/* Logs tab */}
            <TabsContent value="logs" className="flex-grow m-0 overflow-hidden">
              <ScrollArea className="h-full bg-black text-green-400 font-mono text-xs p-4">
                {logs.length === 0 ? (
                  <div className="text-muted-foreground italic">No logs yet. Compile a document to see output here.</div>
                ) : (
                  logs.map((log, i) => (
                    <div
                      key={i}
                      className={cn(
                        "mb-1 leading-relaxed",
                        log.includes("failed") || log.includes("Error") ? "text-red-400" : "",
                        log.includes("successful") ? "text-green-300 font-bold" : ""
                      )}
                    >
                      {log}
                    </div>
                  ))
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
