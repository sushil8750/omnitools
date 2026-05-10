"use client"

import * as React from "react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  ArrowUpRight,
  ArrowDownRight,
  Target,
  MousePointer2,
  Filter
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function BusinessDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Navbar />
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Business Insights</h1>
              <p className="text-muted-foreground">Revenue tracking, conversion funnels, and LTV analytics.</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-background">Last 30 Days</Badge>
              <Button variant="outline" size="sm" className="rounded-lg"><Filter size={14} className="mr-2" /> Filter</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Monthly Revenue", value: "$14,284", icon: DollarSign, trend: "+12.4%", trendUp: true },
              { title: "New Subscribers", value: "842", icon: Users, trend: "+5.2%", trendUp: true },
              { title: "Churn Rate", value: "1.2%", icon: Target, trend: "-0.4%", trendUp: true },
              { title: "Avg. Order Value", value: "$19.00", icon: ShoppingCart, trend: "0%", trendUp: null },
            ].map((stat, i) => (
              <Card key={i} className="rounded-[2rem] border-none shadow-xl group">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <stat.icon size={24} />
                    </div>
                    {stat.trendUp !== null && (
                      <div className={cn(
                        "flex items-center gap-1 text-xs font-bold",
                        stat.trendUp ? "text-green-500" : "text-red-500"
                      )}>
                        {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {stat.trend}
                      </div>
                    )}
                  </div>
                  <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
                  <span className="text-3xl font-black">{stat.value}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="p-10 border-b bg-muted/30">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <MousePointer2 className="text-primary" /> Conversion Funnel
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10">
                <div className="space-y-12">
                  {[
                    { label: "Website Visitors", value: "120,482", percentage: 100 },
                    { label: "Tool Interactions", value: "84,291", percentage: 70 },
                    { label: "Upgrade Modal Views", value: "12,482", percentage: 10 },
                    { label: "Checkout Starts", value: "2,482", percentage: 2 },
                    { label: "Successful Subscriptions", value: "842", percentage: 0.7 },
                  ].map((step, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Step {i+1}</span>
                          <h4 className="text-lg font-bold">{step.label}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black">{step.value}</span>
                          <p className="text-xs text-muted-foreground">{step.percentage}% of total</p>
                        </div>
                      </div>
                      <Progress value={step.percentage} className="h-4 rounded-full bg-muted shadow-inner" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
                <CardHeader className="p-8">
                  <CardTitle className="text-lg font-bold">Top Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  {[
                    { source: "Google Search", value: "65%", color: "bg-blue-500" },
                    { source: "Direct Traffic", value: "20%", color: "bg-purple-500" },
                    { source: "Referrals", value: "10%", color: "bg-green-500" },
                    { source: "Social Media", value: "5%", color: "bg-amber-500" },
                  ].map((src, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{src.source}</span>
                        <span>{src.value}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted">
                        <div className={cn("h-full rounded-full", src.color)} style={{ width: src.value }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden">
                <CardContent className="p-10">
                  <h4 className="text-xl font-black mb-4">LTV Optimization</h4>
                  <p className="text-primary-foreground/80 text-sm mb-8 leading-relaxed">
                    Users who use the **Merge PDF** tool are 3x more likely to subscribe to the Pro plan within 48 hours.
                  </p>
                  <Button variant="secondary" className="w-full rounded-full h-12 font-bold">
                    View Retention Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
