'use client';

import { useEffect, useRef, useState } from 'react';
import { AD_SIZES } from '@/lib/constants';

interface AdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

// Use a placeholder slot ID - IMPORTANT: Replace with real ad unit IDs from your AdSense account
const DEFAULT_SLOT = "1234567890";

export function Ad({ slot = DEFAULT_SLOT, format = 'auto', className = '' }: AdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [adWidth, setAdWidth] = useState(0);
  const [adError, setAdError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Determine ad size based on container width
  useEffect(() => {
    const updateAdWidth = () => {
      if (adRef.current) {
        setAdWidth(adRef.current.offsetWidth);
      }
    };

    // Update width on mount
    updateAdWidth();

    // Update width on resize
    window.addEventListener('resize', updateAdWidth);
    return () => window.removeEventListener('resize', updateAdWidth);
  }, []);

  // Load AdSense script
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // We don't need to load the script here since it's already loaded in layout.tsx
    // Just check if it's available
    const checkScriptLoaded = () => {
      if (document.getElementById('google-adsense-script') || 
          document.querySelector('script[src*="adsbygoogle.js"]')) {
        setScriptLoaded(true);
        return true;
      }
      return false;
    };

    if (checkScriptLoaded()) {
      return;
    }

    // Set a timeout to check again in case the script is still loading
    const timer = setTimeout(() => {
      if (!checkScriptLoaded()) {
        console.warn('AdSense script not detected after timeout');
        setAdError('Advertisement not available');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Create an intersection observer to detect when the ad is in the viewport
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize AdSense only when the ad is visible and has dimensions
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !isVisible || isInitialized || adWidth === 0 || !scriptLoaded) {
      return;
    }

    const timer = setTimeout(() => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
            window.adsbygoogle.push({});
            console.log(`AdSense initialized for slot ${slot} with width ${adRef.current.offsetWidth}px`);
            setIsInitialized(true);
          } else {
            console.warn('AdSense not available yet');
            setAdError('Advertisement not available');
          }
        } catch (err) {
          console.error('Error loading AdSense:', err);
          setAdError('Failed to load advertisement');
        }
      } else {
        console.warn('Ad container has zero width, not initializing AdSense');
      }
    }, 2000); // Increased timeout to ensure container has rendered

    return () => clearTimeout(timer);
  }, [isVisible, isInitialized, adWidth, slot, scriptLoaded]);

  // Get appropriate ad size based on format and container width
  const getAdSize = () => {
    if (format === 'auto') {
      // Responsive sizing based on container width
      if (adWidth < 400) return 'mobile';
      if (adWidth < 800) return 'medium';
      return 'large';
    }
    return format;
  };

  const adSize = getAdSize();
  const { width, height } = AD_SIZES[adSize] || AD_SIZES.medium;

  // Don't render anything if we're in development mode or if there's an error
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`ad-container ${className}`} 
        style={{ 
          height: `${height}px`, 
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9'
        }}
      >
        <p className="text-sm text-gray-400">Ad Placeholder (Dev Mode)</p>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      {adError ? (
        <div 
          style={{ 
            height: `${height}px`, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9f9f9',
            border: '1px solid #eee'
          }}
        >
          <p className="text-sm text-gray-400">Advertisement</p>
        </div>
      ) : adWidth > 0 ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: `${height}px`, maxWidth: '100%' }}
          data-ad-client="ca-pub-7164870963379403"
          data-ad-slot={slot}
          data-ad-format={format === 'auto' ? 'auto' : 'rectangle'}
          data-full-width-responsive="true"
        />
      ) : null}
    </div>
  );
}

// Use a single ad component with consistent slot ID
export function SidebarAd() {
  return <Ad slot={DEFAULT_SLOT} format="vertical" className="hidden md:block" />;
}

export function BottomBannerAd() {
  return <Ad slot={DEFAULT_SLOT} format="horizontal" className="mt-8 mb-4" />;
}

export function InContentAd() {
  return <Ad slot={DEFAULT_SLOT} format="auto" className="my-6" />;
}
