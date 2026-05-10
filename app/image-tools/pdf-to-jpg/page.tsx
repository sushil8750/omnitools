import { PdfToJpgTool } from "@/features/tools/PdfToJpgTool"
import { TOOLS } from "@/config/tools"
import { Metadata } from "next"
import { getToolMetadata } from "@/lib/seo/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const tool = TOOLS.find(t => t.slug === 'pdf-to-jpg')
  return getToolMetadata(tool!)
}

export default function PdfToJpgPage() {
  const tool = TOOLS.find(t => t.slug === 'pdf-to-jpg')
  return <PdfToJpgTool faqs={tool?.faqs} />
}
