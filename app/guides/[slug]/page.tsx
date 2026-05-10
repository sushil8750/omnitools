import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";

// Mock guide data - in production this would come from a CMS or JSON
const GUIDES = [
  {
    slug: "how-to-merge-pdf-files-online",
    title: "How to Merge PDF Files Online: A Step-by-Step Guide",
    description: "Learn how to combine multiple PDF documents into one easily using OmniTools.",
    category: "PDF",
    readTime: "5 min",
    content: "Full guide content would go here...",
    relatedTools: ["merge-pdf", "split-pdf"]
  },
  {
    slug: "best-way-to-compress-images-without-losing-quality",
    title: "Best Way to Compress Images Without Losing Quality",
    description: "Discover techniques for reducing image file size while maintaining perfect visual clarity.",
    category: "Images",
    readTime: "7 min",
    content: "Full guide content would go here...",
    relatedTools: ["compress-image"]
  }
];

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = GUIDES.find(g => g.slug === params.slug);
  if (!guide) return constructMetadata();
  
  return constructMetadata({
    title: guide.title,
    description: guide.description,
  });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find(g => g.slug === params.slug);
  if (!guide) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-20">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <Badge variant="outline" className="mb-6 uppercase tracking-widest text-[10px] px-3 py-1 bg-primary/5">
              {guide.category} Guide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              {guide.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Clock size={16} /> {guide.readTime} read</span>
              <span className="flex items-center gap-2"><BookOpen size={16} /> {guide.category}</span>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed mb-20">
            {/* Real content would be MDX or sanitized HTML */}
            <p className="text-xl text-muted-foreground mb-8">{guide.description}</p>
            <h2 className="text-3xl font-bold mt-12 mb-6">Introduction</h2>
            <p>Processing files online should be simple, fast, and secure. In this guide, we'll show you exactly how to use OmniTools to achieve professional results with just a few clicks.</p>
            <div className="my-12 p-8 rounded-3xl bg-muted/30 border">
              <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
              <ul className="space-y-3 list-none p-0">
                <li className="flex items-start gap-3">
                  <ArrowRight size={18} className="text-primary mt-1 shrink-0" />
                  <span>Learn how to handle complex file conversions effortlessly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight size={18} className="text-primary mt-1 shrink-0" />
                  <span>Understand the importance of client-side processing for privacy.</span>
                </li>
              </ul>
            </div>
            <p>Our tools are built on the latest WebAssembly technology, meaning your files never leave your computer. This provides unmatched speed and security compared to traditional server-side tools.</p>
          </div>

          <Separator className="my-12" />

          <section>
            <h3 className="text-2xl font-bold mb-8">Related Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.relatedTools.map(toolSlug => (
                <Link 
                  key={toolSlug}
                  href={`/tools/${toolSlug}`}
                  className="flex items-center justify-between p-6 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group"
                >
                  <span className="font-bold capitalize">{toolSlug.replace('-', ' ')}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
