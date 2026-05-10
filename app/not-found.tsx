import Link from 'next/link'
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Search, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12 relative inline-block">
            <h1 className="text-[12rem] font-black text-primary/5 select-none leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background p-8 rounded-full shadow-2xl border-primary/10">
                <Search size={80} className="text-primary animate-pulse" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Oops! Page not found</h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-10">
            The tool or page you are looking for doesn't exist or has been moved. 
            Try searching for it instead.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-12 h-14 text-lg gap-2 shadow-xl">
              <Link href="/">
                <Home size={20} /> Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-12 h-14 text-lg gap-2">
              <Link href="/tools">
                Explore All Tools <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
