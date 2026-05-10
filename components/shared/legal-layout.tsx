import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

export default function LegalPage({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12">{title}</h1>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
