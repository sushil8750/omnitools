"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

interface FAQProps {
  items: { q: string, a: string }[]
}

export function FAQ({ items }: FAQProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <HelpCircle size={20} />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h3>
      </div>
      
      <Accordion className="w-full space-y-4">
        {items.map((item, i) => (
          <AccordionItem 
            key={i} 
            value={`item-${i}`}
            className="border rounded-3xl px-8 bg-background shadow-sm hover:border-primary/20 transition-colors"
          >
            <AccordionTrigger className="hover:no-underline font-bold text-left py-6">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-8">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
