import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Top Password Generator - Create Strong & Secure Passwords",
  description: "Generate strong, secure, and unique passwords instantly. Choose from random passwords, memorable phrases, or PIN numbers. Free online password generator tool.",
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  keywords: "password generator, strong password, secure password, random password, PIN generator, memorable password",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/icons/apple-touch-icon.png',
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-7164870963379403"
     crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="body-font">
        <div className="flex min-h-screen flex-col">
          <header className="border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              {/* Header title removed as we're using the logo in the main component */}
            </div>
          </header>
          
          {children}
          
          <footer className="mt-auto border-t py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Top Password Generator. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
