"use client"

import * as React from "react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageSquare, Send, Zap } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message sent! We'll get back to you soon.")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-5xl font-bold mb-6 tracking-tight">Let's Talk</h1>
              <p className="text-xl text-muted-foreground mb-12">
                Have a suggestion for a new tool? Found a bug? Or just want to say hi? 
                We'd love to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Email us</h4>
                    <p className="text-muted-foreground">support@omnitools.example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Chat with us</h4>
                    <p className="text-muted-foreground">Available on Twitter/X @omnitools</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Fast Response</h4>
                    <p className="text-muted-foreground">Typically within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-[2.5rem] border-primary/10 shadow-2xl overflow-hidden bg-background">
              <CardContent className="p-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Name</label>
                      <Input placeholder="John Doe" className="h-12 rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Email</label>
                      <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Subject</label>
                    <Input placeholder="How can we help?" className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Message</label>
                    <Textarea placeholder="Tell us more..." className="min-h-[150px] rounded-2xl" required />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-14 rounded-full text-lg gap-2 shadow-xl" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={18} className={isSubmitting ? "" : "group-hover:translate-x-1 transition-transform"} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
