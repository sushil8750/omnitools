import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TOOLS } from "@/config/tools";
import { getToolMetadata, generateSchema } from "@/lib/seo/metadata";
import { ToolLayout } from "@/components/shared/tool-layout";
import { FEATURES } from "@/config/features";

// This will be used to generate static params for build-time optimization
export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  return getToolMetadata(slug);
}

import { TOOL_COMPONENTS } from "@/features/tool-mapping";

export default function ToolPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool || !tool.enabled) {
    notFound();
  }

  const ToolComponent = TOOL_COMPONENTS[slug as keyof typeof TOOL_COMPONENTS];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema(tool)) }}
      />
      {ToolComponent ? (
        <ToolComponent faqs={tool.faqs} />
      ) : (
        <ToolLayout
          title={tool.name}
          description={tool.description}
          category={tool.category.toUpperCase() + " TOOLS"}
        >
          <div className="py-12 bg-muted/5 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center min-h-[400px]">
            <tool.icon size={64} className="text-primary mb-6 opacity-20" />
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">The {tool.name} tool is currently under development.</p>
          </div>
        </ToolLayout>
      )}
    </>
  );
}
