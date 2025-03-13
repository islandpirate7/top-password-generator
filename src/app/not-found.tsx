import Link from 'next/link'
import type { Metadata, Viewport } from 'next'

// Separate metadata export to fix the warning
export const metadata: Metadata = {
  title: 'Page Not Found - Top Password Generator',
  description: 'The page you are looking for does not exist.',
  // Remove any viewport configuration from metadata
}

// Separate viewport export to fix the warning
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
