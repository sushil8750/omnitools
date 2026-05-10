import { Metadata } from "next";
import { Tool, TOOLS } from "@/config/tools";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://omnitools.example.com";

export function constructMetadata({
  title,
  description,
  image = "/og-image.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: title ? `${title} | OmniTools` : "OmniTools | All-in-One Utility SaaS",
    description: description || "Professional browser-based tools for PDF, Images, Developers, and more. Secure, fast, and free.",
    openGraph: {
      title: title ? `${title} | OmniTools` : "OmniTools",
      description: description || "Professional browser-based tools.",
      url: BASE_URL,
      siteName: "OmniTools",
      images: [
        {
          url: image,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "OmniTools",
      description: description || "Professional browser-based tools.",
      images: [image],
      creator: "@omnitools",
    },
    icons,
    metadataBase: new URL(BASE_URL),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function getToolMetadata(toolOrSlug: string | Tool): Metadata {
  const tool = typeof toolOrSlug === "string" 
    ? TOOLS.find((t) => t.slug === toolOrSlug)
    : toolOrSlug;
    
  if (!tool) return constructMetadata();

  return constructMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
  });
}

export function generateSchema(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "No installation required",
      "Browser-based processing",
      "Privacy-first approach"
    ]
  };
}
