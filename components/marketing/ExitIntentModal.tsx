"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Gift, 
  X, 
  ArrowRight, 
  Mail,
  CheckCircle2,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [isSubscribed, setIsSubscribed] = React.useState(false)

  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('exit-modal-dismissed')) {
        setIsOpen(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleDismiss = () => {
    setIsOpen(false)
    localStorage.setItem('exit-modal-dismissed', 'true')
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => {
      handleDismiss()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-xl"
          >
            <Card className="rounded-[3rem] border-primary/20 shadow-2xl overflow-hidden bg-background relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-6 top-6 rounded-full"
                onClick={handleDismiss}
              >
                <X size={20} />
              </Button>
              
              <CardContent className="p-12 text-center">
                {!isSubscribed ? (
                  <>
                    <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 rotate-12">
                      <Gift size={48} />
                    </div>
                    
                    <h2 className="text-4xl font-black tracking-tight mb-4">Wait! Don't leave empty handed.</h2>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                      Get a <span className="text-primary font-bold">20% discount</span> on your first year of OmniTools Pro and stay updated with new tools.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubscribe}>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <Input 
                          placeholder="Enter your email" 
                          className="h-16 pl-12 rounded-2xl text-lg"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Button size="lg" className="w-full h-16 rounded-full text-xl font-bold gap-2 shadow-xl shadow-primary/20">
                        Claim My Discount <ArrowRight size={24} />
                      </Button>
                    </form>
                    
                    <p className="text-[10px] text-muted-foreground mt-6 uppercase tracking-widest font-medium">
                      No spam. Just utility. Unsubscribe at any time.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mx-auto mb-8">
                      <CheckCircle2 size={64} />
                    </div>
                    <h2 className="text-4xl font-black mb-4">You're on the list!</h2>
                    <p className="text-muted-foreground text-lg">
                      Check your email for your exclusive discount code.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
