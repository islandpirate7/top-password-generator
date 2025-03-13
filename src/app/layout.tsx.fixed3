import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import './mobile-fixes.css'
import AdSenseScript from "@/components/adsense-script";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong & Secure Random Passwords",
  description: "Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.",
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  keywords: "password generator, random password, strong password, secure password, password creator, online password generator, free password generator, PIN generator, password tool",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toppasswordgenerator.com/',
    siteName: 'Password Generator',
    title: 'Password Generator - Create Strong & Secure Random Passwords',
    description: 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Password Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Create Strong & Secure Random Passwords',
    description: 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.',
    images: ['/og-image.png'],
    creator: '@passwordgen',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://toppasswordgenerator.com/',
    languages: {
      'en-US': 'https://toppasswordgenerator.com/',
      'es-ES': 'https://toppasswordgenerator.com/es/',
    },
  },
};

// Structured data for rich results
const structuredData = {
  application: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Password Generator',
    url: 'https://toppasswordgenerator.com/',
    description: 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a password strong?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A strong password typically includes a mix of uppercase and lowercase letters, numbers, and special characters. It should be at least 12 characters long and avoid common words or personal information.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I change my passwords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Security experts now recommend changing passwords only when there is a reason to believe they have been compromised, rather than on a fixed schedule. However, using unique passwords for each account is essential.',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.application) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.faq) }}
        />
      </head>
      <body className="body-font">
        {/* AdSense Script is now a client component */}
        <AdSenseScript />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
