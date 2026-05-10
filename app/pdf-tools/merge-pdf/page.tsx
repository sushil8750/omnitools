import { MergePdfTool } from "@/features/tools/MergePdfTool"
import { TOOLS } from "@/config/tools"
import { Metadata } from "next"
import { getToolMetadata } from "@/lib/seo/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const tool = TOOLS.find(t => t.slug === 'merge-pdf')
  return getToolMetadata(tool!)
}

export default function MergePdfPage() {
  const tool = TOOLS.find(t => t.slug === 'merge-pdf')
  return <MergePdfTool faqs={tool?.faqs} />
}
