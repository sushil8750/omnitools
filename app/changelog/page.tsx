import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Zap, Sparkles, Rocket, Bug } from "lucide-react";

const UPDATES = [
  {
    version: "2.0.0",
    date: "May 10, 2026",
    type: "major",
    title: "The All-New OmniTools SaaS Experience",
    description: "We've completely rebuilt OmniTools from the ground up to be faster, more secure, and more powerful.",
    changes: [
      { icon: Rocket, text: "New high-performance Wasm-based processing engine." },
      { icon: Zap, text: "Introduced Pro and Business tiers for power users." },
      { icon: Sparkles, text: "New Apple-inspired premium design system." },
      { icon: Bug, text: "Fixed memory leaks in heavy video conversions." },
    ]
  },
  {
    version: "1.5.0",
    date: "April 15, 2026",
    type: "feature",
    title: "AI Infrastructure Integration",
    description: "Added foundational support for AI-powered PDF and image tools.",
    changes: [
      { icon: Sparkles, text: "New AI Provider abstraction for OpenAI/Google." },
      { icon: Zap, text: "Global search modal with fuzzy matching." },
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Navbar />
      <main className="flex-grow py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-24">
            <Badge className="mb-6 rounded-full px-4 py-1.5 bg-primary/10 text-primary border-none text-sm font-bold uppercase tracking-widest">
              Release Notes
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">What's New</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay updated with the latest features, improvements, and bug fixes in OmniTools.
            </p>
          </div>

          <div className="space-y-24">
            {UPDATES.map((update, i) => (
              <div key={i} className="relative pl-12 border-l-2 border-primary/10">
                {/* Timeline dot */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
                
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-bold text-primary tracking-widest uppercase">{update.date}</span>
                    <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase">
                      v{update.version}
                    </Badge>
                    {update.type === 'major' && (
                      <Badge className="rounded-full bg-amber-500 text-white border-none text-[10px] font-black uppercase">
                        Major Update
                      </Badge>
                    )}
                  </div>

                  <h2 className="text-3xl font-black tracking-tight">{update.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {update.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {update.changes.map((change, j) => (
                      <div key={j} className="p-6 rounded-2xl bg-background border shadow-sm flex items-start gap-4 group hover:border-primary/30 transition-colors">
                        <div className="mt-1 p-2 rounded-xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                          <change.icon size={18} />
                        </div>
                        <span className="text-sm font-medium leading-relaxed">{change.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 p-12 rounded-[3rem] bg-primary text-primary-foreground text-center shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
              <Rocket size={160} />
            </div>
            <h3 className="text-3xl font-black mb-6">Stay ahead of the curve</h3>
            <p className="text-primary-foreground/80 mb-10 max-w-lg mx-auto">
              Join our newsletter to get monthly updates on new tools and productivity tips.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-full h-14 px-10 text-lg font-bold">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
