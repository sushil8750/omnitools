"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Code, 
  Calculator, 
  Search, 
  Menu,
  X,
  Zap,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlobalSearch } from "@/components/search/GlobalSearch"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "All Tools", href: "/tools", icon: Settings },
  { name: "Guides", href: "/guides/how-to-merge-pdf-files-online", icon: FileText },
  { name: "Templates", href: "/templates", icon: Calculator },
  { name: "Blog", href: "/blog", icon: Code },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight">OmniTools</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <GlobalSearch />
            <Button className="rounded-full px-6 shadow-lg hover:shadow-primary/20">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b bg-background px-4 py-6"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 text-lg font-medium",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
            <hr className="my-2" />
            <Button className="w-full justify-start gap-2" variant="outline">
              <Search size={20} />
              Search Tools
            </Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
