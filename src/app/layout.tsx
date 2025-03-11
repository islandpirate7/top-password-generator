import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Top Password Generator - Create Strong & Secure Passwords",
  description: "Generate strong, secure, and unique passwords instantly. Choose from random passwords, memorable phrases, or PIN numbers. Free online password generator tool.",
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  keywords: "password generator, strong password, secure password, random password, PIN generator, memorable password, mnemonic password, password security, secure password generator, password tool",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toppasswordgenerator.com/',
    siteName: 'Top Password Generator',
    title: 'Top Password Generator - Create Strong & Secure Passwords',
    description: 'Generate strong, secure, and unique passwords instantly. Free online password generator with multiple options including memorable mnemonic phrases in English.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Top Password Generator - Create Strong & Secure Passwords',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Password Generator - Create Strong & Secure Passwords',
    description: 'Generate strong, secure, and unique passwords instantly. Free online password generator with multiple options including memorable mnemonic phrases in English.',
    images: ['/images/twitter-image.jpg'],
    creator: '@toppasswordgen',
  },
  alternates: {
    canonical: 'https://toppasswordgenerator.com',
    languages: {
      'en': 'https://toppasswordgenerator.com',
      'es': 'https://toppasswordgenerator.com/es',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Google AdSense Script */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7164870963379403"
          crossOrigin="anonymous"
          id="google-adsense-script"
        ></script>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Structured Data for Rich Results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Top Password Generator",
              "url": "https://toppasswordgenerator.com",
              "description": "Generate strong, secure, and unique passwords instantly. Choose from random passwords, memorable phrases, or PIN numbers.",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "inLanguage": ["en", "es"]
            }
          `}
        </script>
      </head>
      <body className="body-font">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
