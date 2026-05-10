import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OmniTools | The Ultimate Utility SaaS Platform",
  description: "Merge PDF, Compress Images, Convert Files, LaTeX Editor, and more. All-in-one premium utility platform.",
  keywords: ["pdf tools", "image converter", "latex editor", "developer tools", "online utilities"],
  authors: [{ name: "OmniTools Team" }],
  openGraph: {
    title: "OmniTools | All-in-one Utility Platform",
    description: "Premium tools for PDF, Images, LaTeX, and more.",
    url: "https://omnitools.example.com",
    siteName: "OmniTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniTools | All-in-one Utility Platform",
    description: "Premium tools for PDF, Images, LaTeX, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
