import Link from "next/link"
import { Zap, Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  Tools: [
    { name: "Merge PDF", href: "/pdf-tools/merge-pdf" },
    { name: "Compress Image", href: "/image-tools/compress-image" },
    { name: "LaTeX Editor", href: "/developer-tools/latex-to-pdf" },
    { name: "Video Converter", href: "/converter-tools/video-converter" },
  ],
  Platform: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ],
  Community: [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                <Zap size={16} fill="currentColor" />
              </div>
              <span className="text-lg font-bold tracking-tight">OmniTools</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              The ultimate utility platform for modern professionals. 
              Secure, fast, and completely in your browser.
            </p>
            <div className="flex gap-4">
              {footerLinks.Community.map((item) => (
                <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <item.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {footerLinks.Tools.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.Platform.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on new tools and features.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border rounded-md px-3 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="bg-primary text-primary-foreground rounded-md px-3 py-1 text-sm font-medium">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OmniTools. Built with Next.js and ❤️.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
