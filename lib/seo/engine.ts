import { TOOLS } from "@/config/tools"

export const COMPARISONS = [
  { slug: "omnitools-vs-ilovepdf", title1: "OmniTools", title2: "iLovePDF" },
  { slug: "omnitools-vs-tinywow", title1: "OmniTools", title2: "TinyWow" },
  { slug: "omnitools-vs-smallpdf", title1: "OmniTools", title2: "SmallPDF" },
]

export const GUIDES = [
  { slug: "how-to-merge-pdf-files-online", title: "How to Merge PDF Files Online" },
  { slug: "best-way-to-compress-images-without-losing-quality", title: "Best Way to Compress Images" },
]

export function generateInternalLinks(content: string) {
  // Logic to find tool names or guide titles in content and wrap them in Links
  let linkedContent = content

  TOOLS.forEach(tool => {
    const regex = new RegExp(`\\b${tool.name}\\b`, 'gi')
    linkedContent = linkedContent.replace(regex, `<a href="/tools/${tool.slug}" class="text-primary font-bold hover:underline">${tool.name}</a>`)
  })

  return linkedContent
}

export function getRelatedTools(currentSlug: string, count: number = 3) {
  return TOOLS
    .filter(t => t.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
}
