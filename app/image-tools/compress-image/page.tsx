import { CompressImageTool } from "@/features/tools/CompressImageTool"
import { TOOLS } from "@/config/tools"
import { Metadata } from "next"
import { getToolMetadata } from "@/lib/seo/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const tool = TOOLS.find(t => t.slug === 'compress-image')
  return getToolMetadata(tool!)
}

export default function CompressImagePage() {
  const tool = TOOLS.find(t => t.slug === 'compress-image')
  return <CompressImageTool faqs={tool?.faqs} />
}
