import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight, Zap, Shield, Heart } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";

const COMPARISONS = [
  {
    slug: "omnitools-vs-ilovepdf",
    title1: "OmniTools",
    title2: "iLovePDF",
    description: "Discover why OmniTools is the faster, more secure alternative to iLovePDF for browser-based PDF processing.",
    features: [
      { name: "Client-side Processing", v1: true, v2: false },
      { name: "Privacy (Files stay on device)", v1: true, v2: false },
      { name: "High-speed Wasm Merging", v1: true, v2: "Partial" },
      { name: "Unlimited Free Tools", v1: true, v2: false },
      { name: "No Data Storage", v1: true, v2: false },
    ]
  },
  {
    slug: "omnitools-vs-tinywow",
    title1: "OmniTools",
    title2: "TinyWow",
    description: "Comparing the user experience and processing speeds of OmniTools and TinyWow.",
    features: [
      { name: "Ad-free Experience", v1: true, v2: false },
      { name: "Mobile Optimization", v1: "Excellent", v2: "Good" },
      { name: "Developer Tools", v1: true, v2: "Limited" },
      { name: "Zero Server Uploads", v1: true, v2: false },
    ]
  }
];

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const comparison = COMPARISONS.find(c => c.slug === params.slug);
  if (!comparison) return constructMetadata();
  
  return constructMetadata({
    title: `${comparison.title1} vs ${comparison.title2} - Comparison Guide`,
    description: comparison.description,
  });
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const comp = COMPARISONS.find(c => c.slug === params.slug);
  if (!comp) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-20">
            <Badge className="mb-6 rounded-full px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 border-none uppercase tracking-widest text-xs font-bold">
              Comparison Guide
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              {comp.title1} <span className="text-muted-foreground/30 font-light italic text-4xl md:text-6xl mx-4">vs</span> {comp.title2}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {comp.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="md:col-span-1 space-y-6">
              <div className="p-8 rounded-[2rem] bg-background border shadow-xl border-primary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                  <Zap size={80} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{comp.title1}</h3>
                <p className="text-sm text-muted-foreground mb-6">Built for speed and privacy. No server uploads, purely browser-based.</p>
                <Button className="w-full rounded-full gap-2 shadow-lg">Try {comp.title1}</Button>
              </div>
              <div className="p-8 rounded-[2rem] bg-muted/30 border text-muted-foreground grayscale">
                <h3 className="text-2xl font-bold mb-4">{comp.title2}</h3>
                <p className="text-sm mb-6">Standard cloud-based processing. Requires file uploads to external servers.</p>
                <Button variant="outline" disabled className="w-full rounded-full">Third Party</Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-[2.5rem] bg-background border shadow-2xl overflow-hidden">
                <div className="p-10 border-b bg-muted/10">
                  <h4 className="text-lg font-bold">Feature Comparison</h4>
                </div>
                <div className="divide-y">
                  {comp.features.map((f, i) => (
                    <div key={i} className="grid grid-cols-2 md:grid-cols-4 p-8 items-center gap-4 hover:bg-muted/5 transition-colors">
                      <div className="col-span-2 font-bold text-lg">{f.name}</div>
                      <div className="flex items-center gap-2 font-bold text-primary">
                        {typeof f.v1 === 'boolean' ? (f.v1 ? <Check className="text-green-500" /> : <X className="text-red-500" />) : f.v1}
                        {typeof f.v1 === 'boolean' && <span>{comp.title1}</span>}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {typeof f.v2 === 'boolean' ? (f.v2 ? <Check className="text-green-500" /> : <X className="text-red-500" />) : f.v2}
                        {typeof f.v2 === 'boolean' && <span>{comp.title2}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 mx-auto mb-6">
                <Shield size={24} />
              </div>
              <h4 className="font-bold mb-2">Privacy First</h4>
              <p className="text-sm text-muted-foreground">Unlike {comp.title2}, we never see your files. Everything stays on your device.</p>
            </div>
            <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mx-auto mb-6">
                <Zap size={24} />
              </div>
              <h4 className="font-bold mb-2">Instant Speed</h4>
              <p className="text-sm text-muted-foreground">Wasm-powered processing is up to 10x faster than cloud round-trips.</p>
            </div>
            <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 mx-auto mb-6">
                <Heart size={24} />
              </div>
              <h4 className="font-bold mb-2">Community Driven</h4>
              <p className="text-sm text-muted-foreground">Open architectural approach with continuous tool expansion based on feedback.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
