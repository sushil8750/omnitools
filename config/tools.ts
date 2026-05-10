import { 
  FileText, 
  ImageIcon, 
  Settings, 
  Code, 
  Calculator, 
  Music, 
  Braces, 
  FileJson,
  Combine,
  Scissors,
  Zap,
  ArrowRightLeft,
  Type,
  Database
} from "lucide-react";

export interface Tool {
  name: string;
  slug: string;
  category: "pdf" | "image" | "converter" | "developer" | "calculator";
  icon: any;
  description: string;
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  enabled: boolean;
  color: string;
  faqs?: { q: string; a: string }[];
}

export const TOOLS: Tool[] = [
  // PDF Tools
  {
    name: "Merge PDF",
    slug: "merge-pdf",
    category: "pdf",
    icon: Combine,
    description: "Combine multiple PDF files into one document instantly.",
    seoTitle: "Merge PDF Online - Combine PDF Files for Free",
    seoDescription: "Easily merge multiple PDF files into a single document with our fast and secure online tool. No installation required.",
    featured: true,
    enabled: true,
    color: "bg-red-500",
    faqs: [
      { q: "Is merging PDFs free on OmniTools?", a: "Yes, merging PDFs is completely free for up to 5 conversions per day on our Free plan. For unlimited merging, consider upgrading to Pro." },
      { q: "Will my PDF quality be affected after merging?", a: "No, our merging engine ensures that all fonts, images, and formatting remain exactly as they were in the original documents." },
      { q: "Are my files safe?", a: "Absolutely. The merging process happens entirely in your browser using WebAssembly. Your files never leave your computer." }
    ]
  },
  {
    name: "Split PDF",
    slug: "split-pdf",
    category: "pdf",
    icon: Scissors,
    description: "Extract pages from your PDF or split one PDF into many.",
    seoTitle: "Split PDF Online - Extract PDF Pages",
    seoDescription: "Split PDF files into individual pages or extract specific pages into a new PDF document. Fast, free, and secure.",
    enabled: true,
    color: "bg-red-400"
  },
  {
    name: "Compress PDF",
    slug: "compress-pdf",
    category: "pdf",
    icon: Zap,
    description: "Reduce PDF file size without losing quality.",
    seoTitle: "Compress PDF Online - Reduce PDF File Size",
    seoDescription: "Make your PDF files smaller while maintaining the best quality. Optimized for fast web sharing and email attachments.",
    enabled: true,
    color: "bg-red-600"
  },

  // Image Tools
  {
    name: "Compress Image",
    slug: "compress-image",
    category: "image",
    icon: ImageIcon,
    description: "Reduce image file size without losing quality.",
    seoTitle: "Compress Image Online - Reduce Photo File Size",
    seoDescription: "Compress JPG, PNG, and WebP images while maintaining perfect visual quality. Fast and private browser-based compression.",
    featured: true,
    enabled: true,
    color: "bg-blue-500"
  },
  {
    name: "Resize Image",
    slug: "resize-image",
    category: "image",
    icon: Settings,
    description: "Change image dimensions easily.",
    seoTitle: "Resize Image Online - Change Image Dimensions",
    seoDescription: "Resize your images to any dimension. Maintain aspect ratio or stretch to fit. Perfect for social media and web design.",
    enabled: true,
    color: "bg-blue-400"
  },

  // Developer Tools
  {
    name: "LaTeX to PDF",
    slug: "latex-to-pdf",
    category: "developer",
    icon: Type,
    description: "Write and compile LaTeX documents online with live preview.",
    seoTitle: "Online LaTeX Editor - Compile LaTeX to PDF",
    seoDescription: "A professional LaTeX editor in your browser. Live preview, templates, and fast compilation with no installation needed.",
    featured: true,
    enabled: true,
    color: "bg-purple-500"
  },
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    category: "developer",
    icon: Braces,
    description: "Prettify, validate, and minify your JSON data instantly.",
    seoTitle: "JSON Formatter & Validator - Prettify JSON Online",
    seoDescription: "Make your JSON readable, validate its structure, and minify it for production. A must-have tool for every developer.",
    enabled: true,
    color: "bg-purple-600"
  },

  // Converters
  {
    name: "Video to MP3",
    slug: "mp4-to-mp3",
    category: "converter",
    icon: Music,
    description: "Extract high-quality audio from your video files instantly.",
    seoTitle: "Convert Video to MP3 - Extract Audio Online",
    seoDescription: "Extract high-quality MP3 audio from MP4, MOV, and other video formats. Fast browser-based conversion with FFmpeg.",
    enabled: true,
    color: "bg-emerald-500"
  },

  // Calculators
  {
    name: "Length Converter",
    slug: "length-converter",
    category: "calculator",
    icon: Calculator,
    description: "Quickly convert between metric and imperial length units.",
    seoTitle: "Length Converter - Metric to Imperial Conversion",
    seoDescription: "Convert between meters, kilometers, miles, feet, and inches instantly with our precise length conversion tool.",
    enabled: true,
    color: "bg-orange-500"
  },
  {
    name: "SQL Formatter",
    slug: "sql-formatter",
    category: "developer",
    icon: Database,
    description: "Prettify and format your SQL queries for better readability.",
    seoTitle: "Online SQL Formatter - Prettify SQL Queries",
    seoDescription: "Format your SQL queries instantly. Supports multiple dialects, indentations, and capitalization rules.",
    enabled: true,
    color: "bg-indigo-500"
  },
  {
    name: "JPG to PDF",
    slug: "jpg-to-pdf",
    category: "pdf",
    icon: FileText,
    description: "Convert your JPG images to PDF documents instantly.",
    seoTitle: "Convert JPG to PDF Online - Free Image to PDF Converter",
    seoDescription: "Easily convert JPG, PNG, and other images to high-quality PDF documents. Fast, secure, and no installation required.",
    enabled: true,
    color: "bg-red-500"
  },
  {
    name: "PDF to JPG",
    slug: "pdf-to-jpg",
    category: "image",
    icon: ImageIcon,
    description: "Extract pages from a PDF as high-quality JPG images.",
    seoTitle: "Convert PDF to JPG Online - Extract Images from PDF",
    seoDescription: "Turn your PDF pages into high-resolution JPG images instantly. Select specific pages or convert the whole document.",
    enabled: true,
    color: "bg-blue-500"
  }
];

export const CATEGORIES = [
  { id: "pdf", name: "PDF Tools", icon: FileText },
  { id: "image", name: "Image Tools", icon: ImageIcon },
  { id: "developer", name: "Developer Tools", icon: Code },
  { id: "converter", name: "Converter Tools", icon: Settings },
  { id: "calculator", name: "Calculators", icon: Calculator },
];
