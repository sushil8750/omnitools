"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Code, 
  Calculator, 
  Zap, 
  Shield, 
  MousePointer2,
  MoveRight,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ToolCard } from "@/components/shared/tool-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const popularTools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document instantly.",
    icon: FileText,
    href: "/pdf-tools/merge-pdf",
    color: "bg-red-500"
  },
  {
    title: "Compress Image",
    description: "Reduce image file size without losing quality.",
    icon: ImageIcon,
    href: "/image-tools/compress-image",
    color: "bg-blue-500"
  },
  {
    title: "LaTeX Editor",
    description: "Write and compile LaTeX documents online with live preview.",
    icon: Code,
    href: "/developer-tools/latex-to-pdf",
    color: "bg-purple-500"
  },
  {
    title: "Video to MP3",
    description: "Extract audio from your video files in high quality.",
    icon: Settings,
    href: "/converter-tools/mp4-to-mp3",
    color: "bg-emerald-500"
  },
  {
    title: "JSON Formatter",
    description: "Prettify and validate your JSON data instantly.",
    icon: Code,
    href: "/developer-tools/json-formatter",
    color: "bg-orange-500"
  },
  {
    title: "Length Converter",
    description: "Quickly convert between different units of length.",
    icon: Calculator,
    href: "/calculators/length-converter",
    color: "bg-indigo-500"
  },
]

export default function Home() {
  const router = useRouter()
  const [heroSearch, setHeroSearch] = React.useState("")

  const handleHeroSearch = () => {
    const q = heroSearch.trim()
    router.push(q ? `/tools?search=${encodeURIComponent(q)}` : "/tools")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary gap-2">
                <Sparkles size={14} className="animate-pulse" />
                All-in-one utility platform
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                The Smart Way to <br />
                <span className="gradient-text">Handle Your Files</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                100+ professional tools for PDF, Images, Video, and Developers. 
                Fast, secure, and works directly in your browser.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                <div className="relative w-full">
                  <Input 
                    placeholder="Search for any tool..." 
                    className="h-14 pl-12 rounded-full border-primary/20 focus-visible:ring-primary shadow-lg"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                  />
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
                <Button className="h-14 px-8 rounded-full shadow-lg group" onClick={handleHeroSearch}>
                  Explore All
                  <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Tools Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Popular Tools</h2>
                <p className="text-muted-foreground">The most used utilities by our community.</p>
              </div>
              <Link href="/tools">
                <Button variant="ghost" className="hidden sm:flex gap-2">
                  View All Tools <MoveRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                  <Shield size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                <p className="text-muted-foreground">Your files are processed in your browser or deleted immediately after processing. We never store your data.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                  <Zap size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Blazing Fast</h3>
                <p className="text-muted-foreground">Powered by Wasm and Edge computing to give you near-instant results regardless of file size.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                  <MousePointer2 size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Simple UX</h3>
                <p className="text-muted-foreground">Minimalist interface designed for speed. Drag, drop, and you&apos;re done in seconds.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to boost your productivity?</h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10 text-lg">
                Join thousands of users who trust OmniTools for their daily tasks. 
                Free to use, forever.
              </p>
              <Link href="/tools">
                <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg">
                  Start Using Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
