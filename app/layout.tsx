import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from './pageComponents/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Navbar from './pageComponents/navbar/Navbar';
import { AuthProvider } from '@/lib/auth-context';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './logo/logo2.svg';
import './globals.css';


export const metadata: Metadata = {
  title: 'Westside Renovation - NYC Premier Renovation Experts',
  description:
    'Professional renovation and construction services in New York City. Custom carpentry, interior remodeling, and quality craftsmanship since 2012.',
  keywords: 'renovation, construction, NYC, carpentry, remodeling, interior design',
  authors: [{ name: 'Westside Renovation' }],
  creator: 'Westside Renovation',
  publisher: 'Westside Renovation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://westsideren.com',
    siteName: 'Westside Renovation',
    title: 'Westside Renovation - NYC Premier Renovation Experts',
    description:
      'Professional renovation and construction services in New York City. Custom carpentry, interior remodeling, and quality craftsmanship since 2012.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Westside Renovation - Quality Craftsmanship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Westside Renovation - NYC Premier Renovation Experts',
    description:
      'Professional renovation and construction services in New York City. Custom carpentry, interior remodeling, and quality craftsmanship since 2012.',
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#3b82f6', // Blue-600, consistent with metadata
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen flex flex-col')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-background/95 backdrop-blur-sm border-t border-border mt-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <Link href="/" className="flex items-center space-x-3">
                      <Image
                        src={Logo}
                        alt="Westside Renovation Logo"
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-xl"
                      />
                      <div>
                        <h2 className="font-bold text-lg text-foreground">WESTSIDE</h2>
                        <p className="text-xs text-muted-foreground">RENOVATION INC</p>
                      </div>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Transforming spaces in NYC with quality craftsmanship since 2012.
                    </p>
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="hover:bg-primary/10 text-primary"
                      >
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                          <Twitter className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="hover:bg-primary/10 text-primary"
                      >
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                          <Facebook className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="hover:bg-primary/10 text-primary"
                      >
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                          <Instagram className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      {[
                        { name: 'Home', path: '/' },
                        { name: 'About', path: '/about' },
                        { name: 'Services', path: '/services' },
                        { name: 'Projects', path: '/projects' },
                        { name: 'Contact', path: '/contact' },
                      ].map((item) => (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span>123 Renovation St, NYC, NY 10001</span>
                      </li>
                      <li className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        <a href="tel:+16462391844" className="hover:text-primary transition-colors">
                          (646) 239-1844
                        </a>
                      </li>
                      <li className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        <a
                          href="mailto:info@westsideren.com"
                          className="hover:text-primary transition-colors"
                        >
                          info@westsideren.com
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Get Started</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ready to transform your space? Request a free quote today.
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-sky-600 hover:from-primary/90 hover:to-sky-700 text-white"
                      asChild
                    >
                      <Link href="/contact">Get Free Quote</Link>
                    </Button>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Westside Renovation Inc. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
            <Toaster position="top-right" richColors expand visibleToasts={4} closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}