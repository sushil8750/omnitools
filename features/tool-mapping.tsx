"use client"

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { MergePdfTool } from "./tools/MergePdfTool";
import { CompressImageTool } from "./tools/CompressImageTool";
import { JpgToPdfTool } from "./tools/JpgToPdfTool";
import { PdfToJpgTool } from "./tools/PdfToJpgTool";

const Loading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="animate-spin text-primary" size={48} />
  </div>
);

export const TOOL_COMPONENTS: Record<string, any> = {
  'merge-pdf': MergePdfTool,
  'compress-image': CompressImageTool,
  'jpg-to-pdf': JpgToPdfTool,
  'pdf-to-jpg': PdfToJpgTool,
  'latex-to-pdf': dynamic(() => import('@/app/developer-tools/latex-to-pdf/page').then(mod => mod.default), { loading: Loading }),
  'json-formatter': dynamic(() => import('@/app/developer-tools/json-formatter/page').then(mod => mod.default), { loading: Loading }),
  'mp4-to-mp3': dynamic(() => import('@/app/converter-tools/mp4-to-mp3/page').then(mod => mod.default), { loading: Loading }),
  'length-converter': dynamic(() => import('@/app/calculators/length-converter/page').then(mod => mod.default), { loading: Loading }),
  'sql-formatter': dynamic(() => import('@/app/developer-tools/sql-formatter/page').then(mod => mod.default), { loading: Loading }),
};
