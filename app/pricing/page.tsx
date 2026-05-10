"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { 
  Check, 
  Zap, 
  Shield, 
  Users, 
  Crown,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PLANS } from "@/lib/plans"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState<'month' | 'year'>('month')

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-6 rounded-full px-4 py-1.5 bg-primary/10 text-primary border-none text-sm font-bold">
              Simple Pricing
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
              Unlock the full power of <span className="text-primary">OmniTools</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Professional tools for individuals and teams. No hidden fees. 
              Start for free and scale as you grow.
            </p>

            <div className="mt-12 flex items-center justify-center gap-4">
              <span className={cn("text-sm font-bold", billingCycle === 'month' ? "text-primary" : "text-muted-foreground")}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'month' ? 'year' : 'month')}
                className="w-16 h-8 rounded-full bg-muted p-1 relative transition-colors"
              >
                <motion.div 
                  animate={{ x: billingCycle === 'month' ? 0 : 32 }}
                  className="w-6 h-6 rounded-full bg-primary shadow-lg"
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-bold", billingCycle === 'year' ? "text-primary" : "text-muted-foreground")}>Yearly</span>
                <Badge className="bg-green-500/10 text-green-600 border-none rounded-full text-[10px] font-black tracking-tighter">
                  SAVE 20%
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Object.values(PLANS).map((plan) => (
              <Card key={plan.id} className={cn(
                "rounded-[2.5rem] p-10 flex flex-col transition-all duration-500 hover:scale-[1.02] border-2",
                plan.id === 'pro' ? "border-primary shadow-2xl shadow-primary/20 bg-primary/[0.02]" : "border-muted shadow-xl"
              )}>
                {plan.id === 'pro' && (
                  <div className="mb-6">
                    <Badge className="bg-primary text-primary-foreground rounded-full px-4 py-1 font-bold text-xs">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
                </div>
                
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">
                    ${billingCycle === 'year' ? Math.floor(plan.price * 0.8) : plan.price}
                  </span>
                  <span className="text-muted-foreground font-bold">/mo</span>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 p-0.5 rounded-full bg-green-500/10 text-green-600">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  variant={plan.id === 'pro' ? 'default' : 'outline'}
                  className={cn(
                    "w-full h-14 rounded-full text-lg font-bold gap-2 shadow-xl",
                    plan.id === 'pro' && "shadow-primary/30"
                  )}
                >
                  {plan.id === 'free' ? 'Get Started' : 'Upgrade Now'}
                  <ArrowRight size={18} />
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-32 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-16">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { q: "Is there a free trial?", a: "We offer a generous free tier that includes all essential tools. You can upgrade to Pro anytime for unlimited usage." },
                { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your dashboard. Your Pro features will remain active until the end of the billing period." },
                { q: "How secure are my files?", a: "Extremely. Most processing happens directly in your browser. For cloud features, we use AES-256 encryption and delete files immediately after processing." },
                { q: "Do you offer team plans?", a: "Yes, our Business plan is designed for teams. It includes shared history, higher quotas, and priority support." }
              ].map((faq, i) => (
                <div key={i} className="space-y-3">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <HelpCircle size={18} className="text-primary" /> {faq.q}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
