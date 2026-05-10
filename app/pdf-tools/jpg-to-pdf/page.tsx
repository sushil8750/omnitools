import { JpgToPdfTool } from "@/features/tools/JpgToPdfTool"
import { TOOLS } from "@/config/tools"
import { Metadata } from "next"
import { getToolMetadata } from "@/lib/seo/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const tool = TOOLS.find(t => t.slug === 'jpg-to-pdf')
  return getToolMetadata(tool!)
}

export default function JpgToPdfPage() {
  const tool = TOOLS.find(t => t.slug === 'jpg-to-pdf')
  return <JpgToPdfTool faqs={tool?.faqs} />
}
