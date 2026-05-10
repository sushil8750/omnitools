import { ToolLayout } from "@/components/shared/tool-layout"
import { LatexEditor } from "@/features/latex/latex-editor"

export const metadata = {
  title: "LaTeX to PDF Converter | OmniTools",
  description: "Online LaTeX editor with live PDF preview. Compile .tex files into professional PDF documents instantly.",
}

export default function LatexToPdfPage() {
  return (
    <ToolLayout
      title="LaTeX to PDF Converter"
      description="Write, edit, and compile LaTeX documents online with a professional editor and real-time preview."
      category="Developer Tools"
      faqs={[
        { 
          question: "What is LaTeX?", 
          answer: "LaTeX is a high-quality typesetting system; it includes features designed for the production of technical and scientific documentation." 
        },
        { 
          question: "Can I use external packages?", 
          answer: "Most standard LaTeX packages are supported. Simply use \\usepackage{} as you would normally." 
        },
        { 
          question: "Is my code saved?", 
          answer: "Your code is automatically saved in your browser's local storage, so you can continue your work even if you close the tab." 
        }
      ]}
    >
      <div className="w-full">
        <LatexEditor />
      </div>
      
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-muted/30 border border-muted-foreground/10">
          <h3 className="text-xl font-bold mb-4">Why use our LaTeX Editor?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>No installation required. Works in any modern browser.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>Monaco Editor (VS Code core) for best-in-class coding experience.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>Fast compilation with Web Workers.</span>
            </li>
          </ul>
        </div>
        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
          <h3 className="text-xl font-bold mb-4">Supported Templates</h3>
          <p className="text-muted-foreground mb-4">Start quickly with our professional templates:</p>
          <div className="flex flex-wrap gap-2">
            {["Academic Paper", "Modern Resume", "Meeting Notes", "Thesis Structure"].map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-background border text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
