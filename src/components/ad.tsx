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

// Helper function to combine class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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
      console.log('AdSense disabled in development mode');
      return;
    }

    // Check if the AdSense script is available
    const checkScriptLoaded = () => {
      if (typeof window !== 'undefined' && 
          (window as any).adsbygoogle !== undefined) {
        console.log('AdSense script loaded successfully');
        setScriptLoaded(true);
        return true;
      }
      return false;
    };

    if (checkScriptLoaded()) {
      return;
    }

    // Set a timeout to check again in case the script is still loading
    const timer = setInterval(() => {
      if (checkScriptLoaded()) {
        clearInterval(timer);
      } else {
        console.log('AdSense not available yet');
      }
    }, 1000);

    // Clear interval after 10 seconds to prevent infinite checking
    const maxWaitTimer = setTimeout(() => {
      clearInterval(timer);
      if (!checkScriptLoaded()) {
        console.warn('AdSense script not detected after timeout');
        setAdError('Advertisement not available');
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(maxWaitTimer);
    };
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

  // Initialize AdSense when the ad is visible and the script is loaded
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !isVisible || isInitialized || adWidth === 0 || !scriptLoaded) {
      return;
    }

    try {
      console.log('Initializing AdSense ad with format:', format, 'slot:', slot);
      
      // Make sure adsbygoogle is defined
      if (typeof (window as any).adsbygoogle === 'undefined') {
        console.error('AdSense script not loaded properly');
        setAdError('Advertisement not available');
        return;
      }

      // Push the ad configuration
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
      
      console.log('AdSense ad initialized successfully');
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing AdSense:', error);
      setAdError('Failed to load advertisement');
    }
  }, [isVisible, isInitialized, adWidth, slot, format, scriptLoaded]);

  // Get appropriate ad size based on format and container width
  const getAdSize = () => {
    const { width, height } = (() => {
      switch (format) {
        case 'vertical':
          return AD_SIZES.vertical;
        case 'horizontal':
          return AD_SIZES.horizontal;
        case 'rectangle':
          return adWidth > 336 ? AD_SIZES.medium : AD_SIZES.mobile;
        case 'auto':
        default:
          // For mobile screens
          if (adWidth < 336) {
            return AD_SIZES.mobile;
          }
          // For medium screens
          if (adWidth < 728) {
            return AD_SIZES.medium;
          }
          // For large screens
          return AD_SIZES.large;
      }
    })();

    return { width, height };
  };

  const adSize = getAdSize();

  // Don't render anything if we're in development mode or if there's an error
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={cn('ad-container', className)} 
        style={{ 
          height: `${adSize.height}px`, 
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

  // Render the ad
  return (
    <div className={cn('ad-container relative overflow-hidden', className)}>
      {adError ? (
        <div className="text-center text-gray-400 text-sm py-4">{adError}</div>
      ) : (
        <div
          ref={adRef}
          className="ad-slot"
          style={{
            display: 'block',
            minHeight: adSize.height,
            minWidth: adSize.width,
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
          data-ad-client="ca-pub-7164870963379403"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
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
