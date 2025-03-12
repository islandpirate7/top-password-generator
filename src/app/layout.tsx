import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import './mobile-fixes.css'

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
    description: 'Generate strong, secure, and random passwords instantly. Free online password generator tool with multiple options.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Password Generator - Create Strong & Secure Random Passwords',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Create Strong & Secure Random Passwords',
    description: 'Generate strong, secure, and random passwords instantly. Free online password generator tool with multiple options.',
    images: ['/images/twitter-image.jpg'],
    creator: '@toppasswordgen',
  },
  alternates: {
    canonical: 'https://toppasswordgenerator.com',
    languages: {
      'en': 'https://toppasswordgenerator.com',
      'es': 'https://toppasswordgenerator.com/es',
      'fr': 'https://toppasswordgenerator.com/fr',
      'de': 'https://toppasswordgenerator.com/de',
    },
  },
};

const structuredData = {
  application: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Password Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a strong password?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. Avoid using personal information or common words.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does a random password generator work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Random password generators create secure passwords by using algorithms to randomly select characters from different sets (letters, numbers, symbols). This ensures the passwords are unpredictable and difficult to crack.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are password generators safe to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, reputable password generators like ours are safe to use. Our generator creates passwords directly in your browser without storing them on any server, ensuring your passwords remain private and secure.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often should I change my passwords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Security experts now recommend changing passwords only when there\'s a reason to believe they\'ve been compromised, rather than on a fixed schedule. Using unique, strong passwords for each account is more important than frequent changes.'
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        {children}
        <Toaster />
      </body>
    </html>
  )
}
