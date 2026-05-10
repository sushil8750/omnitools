"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

interface ToolLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  category: string
  faqs?: FAQItem[]
  relatedTools?: any[]
}

export function ToolLayout({ 
  children, 
  title, 
  description, 
  category,
  faqs = [
    { question: "Is this tool free to use?", answer: "Yes, all tools on OmniTools are 100% free with no hidden charges." },
    { question: "Are my files secure?", answer: "Absolutely. We process files in your browser or delete them immediately after processing. Your privacy is our priority." }
  ]
}: ToolLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="outline" className="mb-4 uppercase tracking-widest text-[10px] px-3 py-1 bg-primary/5">
                {category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
              <p className="text-lg text-muted-foreground">{description}</p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            {children}
          </div>

          {/* SEO Content / FAQ Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <Separator className="mb-12" />
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
