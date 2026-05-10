"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

export function ToolCard({ title, description, icon: Icon, href, color }: ToolCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <Card className="h-full border-muted/60 transition-shadow hover:shadow-xl hover:shadow-primary/5 premium-card cursor-pointer overflow-hidden group">
          <div className={cn("h-1.5 w-full", color)} />
          <CardHeader>
            <div className={cn(
              "mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary/10",
              "bg-muted/50"
            )}>
              <Icon size={24} className="text-primary transition-transform group-hover:scale-110" />
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  )
}
