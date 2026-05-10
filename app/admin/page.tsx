"use client"

import * as React from "react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Server,
  Database,
  Globe,
  Settings2,
  DollarSign
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Navbar />
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">System Analytics</h1>
              <p className="text-muted-foreground">Internal metrics and platform health monitoring.</p>
            </div>
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-red-500/20 text-red-500 bg-red-500/5 font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Monitoring
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Active Users", value: "12,482", icon: Users, color: "text-blue-500" },
              { title: "Conversion Rate", value: "4.2%", icon: TrendingUp, color: "text-green-500" },
              { title: "System Load", value: "12%", icon: Activity, color: "text-amber-500" },
              { title: "Revenue (MRR)", value: "$14.2k", icon: DollarSign, color: "text-emerald-500" },
            ].map((stat, i) => (
              <Card key={i} className="rounded-[2rem] border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-2xl bg-muted", stat.color)}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                  <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
                  <span className="text-3xl font-black">{stat.value}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="p-10 border-b bg-muted/30">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <Server className="text-primary" /> Most Used Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { name: "Merge PDF", usage: "45%", trend: "+12%" },
                    { name: "Compress Image", usage: "32%", trend: "+5%" },
                    { name: "Video to MP3", usage: "15%", trend: "+8%" },
                    { name: "LaTeX Editor", usage: "8%", trend: "-2%" },
                  ].map((tool, i) => (
                    <div key={i} className="p-8 flex items-center justify-between hover:bg-muted/10 transition-colors">
                      <div className="font-bold text-lg">{tool.name}</div>
                      <div className="flex items-center gap-8">
                        <span className="text-muted-foreground font-medium">{tool.usage} usage</span>
                        <Badge className="bg-green-500/10 text-green-600 border-none">{tool.trend}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="p-10 border-b bg-muted/30">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <AlertTriangle className="text-red-500" /> Recent Errors
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { error: "WASM OOM", tool: "FFmpeg Converter", user: "ID: 482", time: "2m ago" },
                    { error: "Upload Timeout", tool: "Compress Image", user: "ID: 942", time: "15m ago" },
                    { error: "Quota Exceeded", tool: "Merge PDF", user: "ID: 104", time: "1h ago" },
                    { error: "Auth Failure", tool: "Dashboard", user: "ID: 882", time: "3h ago" },
                  ].map((err, i) => (
                    <div key={i} className="p-8 flex items-center justify-between hover:bg-muted/10 transition-colors">
                      <div>
                        <div className="font-bold text-red-500">{err.error}</div>
                        <div className="text-xs text-muted-foreground mt-1">{err.tool} • {err.user}</div>
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">{err.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { cn } from "@/lib/utils"
