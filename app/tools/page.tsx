"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ToolCard } from "@/components/shared/tool-card"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  ImageIcon, 
  Settings, 
  Code, 
  Calculator, 
  Search,
  ArrowRightLeft,
  Music,
  Braces,
  FileJson,
  Type
} from "lucide-react"

const ALL_TOOLS = [
  {
    category: "PDF Tools",
    tools: [
      { title: "Merge PDF", description: "Combine multiple PDFs into one.", icon: FileText, href: "/pdf-tools/merge-pdf", color: "bg-red-500" },
      { title: "Split PDF", description: "Extract pages from your PDF.", icon: FileText, href: "/pdf-tools/split-pdf", color: "bg-red-400" },
      { title: "Compress PDF", description: "Reduce PDF file size.", icon: FileText, href: "/pdf-tools/compress-pdf", color: "bg-red-600" },
    ]
  },
  {
    category: "Image Tools",
    tools: [
      { title: "Compress Image", description: "Smaller size, same quality.", icon: ImageIcon, href: "/image-tools/compress-image", color: "bg-blue-500" },
      { title: "Resize Image", description: "Change dimensions easily.", icon: ImageIcon, href: "/image-tools/resize-image", color: "bg-blue-400" },
      { title: "Convert Image", description: "Change format (PNG, JPG, WebP).", icon: Settings, href: "/image-tools/convert-image", color: "bg-blue-600" },
    ]
  },
  {
    category: "Developer Tools",
    tools: [
      { title: "LaTeX Editor", description: "Write LaTeX with live preview.", icon: Code, href: "/developer-tools/latex-to-pdf", color: "bg-purple-500" },
      { title: "JSON Formatter", description: "Prettify and validate JSON.", icon: Braces, href: "/developer-tools/json-formatter", color: "bg-purple-600" },
      { title: "CSV to JSON", description: "Convert data formats.", icon: FileJson, href: "/converter-tools/csv-to-json", color: "bg-purple-400" },
    ]
  },
  {
    category: "Converters",
    tools: [
      { title: "Video to MP3", description: "Extract audio from video.", icon: Music, href: "/converter-tools/mp4-to-mp3", color: "bg-emerald-500" },
      { title: "Currency", description: "Real-time exchange rates.", icon: ArrowRightLeft, href: "/calculators/currency-converter", color: "bg-emerald-600" },
    ]
  },
  {
    category: "Calculators",
    tools: [
      { title: "Length", description: "Metric to Imperial conversion.", icon: Calculator, href: "/calculators/length-converter", color: "bg-orange-500" },
      { title: "Weight", description: "KG to Pounds and more.", icon: Calculator, href: "/calculators/weight-converter", color: "bg-orange-600" },
    ]
  }
]

export default function AllToolsPage() {
  const [search, setSearch] = React.useState("")

  const filteredTools = ALL_TOOLS.map(cat => ({
    ...cat,
    tools: cat.tools.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      cat.category.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.tools.length > 0)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Explore All Tools</h1>
            <div className="relative">
              <Input 
                placeholder="Search tools by name or category..." 
                className="h-14 pl-12 rounded-2xl shadow-lg border-primary/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
          </div>

          <div className="space-y-20">
            {filteredTools.map((category, idx) => (
              <section key={idx}>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, tIdx) => (
                    <ToolCard key={tIdx} {...tool} />
                  ))}
                </div>
              </section>
            ))}
            
            {filteredTools.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No tools found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
