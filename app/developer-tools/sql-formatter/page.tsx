"use client"

import * as React from "react"
import { EditorToolLayout } from "@/components/tool-layouts/EditorToolLayout"
import Editor from "@monaco-editor/react"
import { format } from "sql-formatter"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Copy, Database, Play } from "lucide-react"

export default function SqlFormatterPage() {
  const [code, setCode] = React.useState("SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC")
  const [language, setLanguage] = React.useState("sql")

  const handleFormat = () => {
    try {
      const formatted = format(code, {
        language: "sql",
        tabWidth: 2,
        keywordCase: "upper",
        linesBetweenQueries: 2,
      })
      setCode(formatted)
      toast.success("SQL formatted successfully!")
    } catch (error) {
      toast.error("Failed to format SQL. Please check your syntax.")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    toast.success("Copied to clipboard!")
  }

  return (
    <EditorToolLayout
      title="SQL Formatter"
      description="Prettify and format your SQL queries instantly."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-350px)]">
        <div className="lg:col-span-3 rounded-[2rem] overflow-hidden border shadow-2xl bg-background">
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "var(--font-geist-mono)",
              lineNumbers: "on",
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 20, bottom: 20 }
            }}
          />
        </div>
        
        <div className="lg:col-span-1 space-y-4">
          <div className="p-8 rounded-[2rem] bg-background border shadow-xl">
            <h4 className="font-bold mb-6 flex items-center gap-2">
              <Database size={18} className="text-primary" /> SQL Options
            </h4>
            
            <div className="space-y-4">
              <Button 
                className="w-full h-14 rounded-2xl text-lg gap-2 shadow-xl shadow-primary/20"
                onClick={handleFormat}
              >
                <Play size={20} /> Format SQL
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-14 rounded-2xl text-lg gap-2"
                onClick={handleCopy}
              >
                <Copy size={20} /> Copy Code
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t space-y-4">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">Stats</div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Lines</span>
                <span className="font-bold">{code.split('\n').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Characters</span>
                <span className="font-bold">{code.length}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-[10px] text-muted-foreground leading-relaxed">
            <p className="font-bold text-primary mb-1 uppercase tracking-widest">Tip</p>
            You can use uppercase or lowercase keywords. The formatter will automatically normalize them based on best practices.
          </div>
        </div>
      </div>
    </EditorToolLayout>
  )
}
