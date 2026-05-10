"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { 
  BarChart3, 
  Clock, 
  FileText, 
  History as HistoryIcon, 
  Settings, 
  Zap,
  ArrowUpRight,
  Shield,
  Download,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Navbar />
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, Demo User</h1>
              <p className="text-muted-foreground">Manage your tools, track your usage, and access premium features.</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="h-10 px-4 rounded-full bg-primary/10 text-primary border-none text-sm font-bold">
                PRO PLAN
              </Badge>
              <Button variant="outline" className="h-10 rounded-full gap-2">
                <Settings size={16} /> Settings
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Total Conversions", value: "1,284", icon: BarChart3, trend: "+12%", color: "text-blue-500" },
              { title: "Files Processed", value: "842", icon: FileText, trend: "+5%", color: "text-purple-500" },
              { title: "Time Saved", value: "48h", icon: Clock, trend: "+18%", color: "text-green-500" },
              { title: "Bandwidth Used", value: "4.2 GB", icon: Zap, trend: "-2%", color: "text-amber-500" },
            ].map((stat, i) => (
              <Card key={i} className="rounded-[2rem] border-primary/5 shadow-xl shadow-primary/5 overflow-hidden group">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-2xl bg-muted/50", stat.color)}>
                      <stat.icon size={24} />
                    </div>
                    <Badge variant="secondary" className="rounded-full text-[10px] tracking-widest font-black uppercase">
                      {stat.trend}
                    </Badge>
                  </div>
                  <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">{stat.value}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Recent Activity */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="rounded-[2.5rem] border-primary/5 shadow-2xl shadow-primary/5 overflow-hidden">
                <CardHeader className="p-10 border-b bg-muted/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                      <HistoryIcon className="text-primary" /> Recent Activity
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="rounded-full text-xs">View All</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[
                      { name: "merged_contract_v2.pdf", tool: "Merge PDF", date: "2 mins ago", size: "12.4 MB" },
                      { name: "profile_photo.webp", tool: "Compress Image", date: "1 hour ago", size: "1.2 MB" },
                      { name: "resume_final.pdf", tool: "LaTeX to PDF", date: "3 hours ago", size: "0.8 MB" },
                      { name: "data_dump.json", tool: "JSON Formatter", date: "Yesterday", size: "4.5 MB" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-8 hover:bg-muted/10 transition-colors group">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span className="font-medium text-primary/70 uppercase tracking-widest">{item.tool}</span>
                              <span>•</span>
                              <span>{item.date}</span>
                              <span>•</span>
                              <span>{item.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                            <Download size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                            <ArrowUpRight size={18} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: Quotas & Favorites */}
            <div className="space-y-8">
              <Card className="rounded-[2.5rem] border-primary/10 shadow-2xl shadow-primary/5 bg-primary/5 border-2 overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                      <Zap size={20} />
                    </div>
                    <h4 className="font-bold text-lg">Daily Quota</h4>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span className="text-muted-foreground">Conversions</span>
                        <span className="text-primary">48 / Unlimited</span>
                      </div>
                      <Progress value={48} className="h-2 bg-primary/20" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span className="text-muted-foreground">Bandwidth</span>
                        <span className="text-primary">1.2 GB / 10 GB</span>
                      </div>
                      <Progress value={12} className="h-2 bg-primary/20" />
                    </div>
                  </div>

                  <div className="mt-10 p-6 rounded-2xl bg-background/50 border border-primary/10">
                    <p className="text-sm font-bold flex items-center gap-2 mb-2">
                      <Star size={16} className="text-primary fill-primary" /> Pro Member since May 2024
                    </p>
                    <p className="text-xs text-muted-foreground">You have saved over $120 this month compared to pay-per-use tools.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2.5rem] border-primary/5 shadow-2xl shadow-primary/5 overflow-hidden">
                <CardHeader className="p-8">
                  <CardTitle className="text-lg font-bold">Favorite Tools</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-3">
                  {["Merge PDF", "Compress Image", "LaTeX to PDF"].map((tool) => (
                    <Button key={tool} variant="outline" className="w-full justify-between h-14 rounded-2xl border-primary/5 hover:bg-primary/5 hover:border-primary/20 group">
                      <span className="font-bold">{tool}</span>
                      <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </Button>
                  ))}
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

import { cn } from "@/lib/utils"
