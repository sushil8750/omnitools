"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  X, 
  Command, 
  TrendingUp, 
  Clock,
  ArrowRight
} from "lucide-react"
import { searchTools } from "@/lib/search/engine"
import { Tool } from "@/config/tools"
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function GlobalSearch() {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<Tool[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    setResults(searchTools(query))
  }, [query])

  const handleSelect = (slug: string) => {
    setIsOpen(false)
    router.push(`/tools/${slug}`)
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="relative h-10 w-full justify-start rounded-full bg-muted/20 text-sm font-medium text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setIsOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search tools...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[2rem] border-primary/10 shadow-2xl">
          <div className="flex items-center border-b px-4">
            <Search className="mr-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for any tool (e.g. merge pdf, compress image...)"
              className="h-14 border-0 focus-visible:ring-0 text-lg px-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <kbd className="hidden sm:flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
          
          <ScrollArea className="max-h-[450px]">
            <div className="p-4">
              {query === "" ? (
                <div className="space-y-6 py-4">
                  <div>
                    <h4 className="flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      <TrendingUp size={14} className="text-primary" /> Trending Tools
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {["Merge PDF", "Compress Image", "LaTeX to PDF", "JSON Formatter"].map((t) => (
                        <button
                          key={t}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 text-sm font-medium group text-left"
                          onClick={() => setQuery(t)}
                        >
                          {t}
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      <Clock size={14} className="text-primary" /> Popular Categories
                    </h4>
                    <div className="flex flex-wrap gap-2 px-2">
                      {["PDF Tools", "Image Tools", "Developer", "Converters"].map((c) => (
                        <Badge key={c} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {results.length > 0 ? (
                    results.map((tool) => (
                      <button
                        key={tool.slug}
                        className="flex w-full items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 group transition-all text-left"
                        onClick={() => handleSelect(tool.slug)}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border border-muted-foreground/10",
                          tool.color.replace('bg-', 'bg-opacity-10 ').replace('bg-', 'text-')
                        )}>
                          <tool.icon size={20} />
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold group-hover:text-primary transition-colors">{tool.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
                        </div>
                        <Badge variant="outline" className="opacity-0 group-hover:opacity-100 uppercase text-[10px] tracking-widest px-2">
                          Go to tool
                        </Badge>
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search size={48} className="text-muted-foreground/20 mb-4" />
                      <p className="text-lg font-bold">No results found</p>
                      <p className="text-sm text-muted-foreground">Try searching with different keywords.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/20 text-[10px] text-muted-foreground font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">↵</kbd> Select</span>
            </div>
            <div className="flex items-center gap-1">
              Search by <span className="font-bold text-primary">OmniTools</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
