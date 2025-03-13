'use client';

import { useEffect, useRef, useState } from 'react';
import { AD_SIZES } from '@/lib/constants';

interface AdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
  uniqueId?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

// Use your real AdSense ad unit IDs from your AdSense account
const AD_SLOTS = {
  // These are your actual ad unit IDs from AdSense
  sidebar: "7211032331",    // Vertical ad for sidebar (tpg_sidebar)
  bottom: "7784881434",     // Horizontal ad for bottom banner (tpg_bottom)
  content: "7327654235"     // Auto-sized ad for in-content (tpg_content)
};

// Default slot if none specified
const DEFAULT_SLOT = AD_SLOTS.content;

// Helper function to combine class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Ad({
  slot = DEFAULT_SLOT,
  format = 'auto',
  className = '',
  uniqueId = `ad-${Math.random().toString(36).substring(2, 9)}`
}: AdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [adWidth, setAdWidth] = useState(0);
  const [adError, setAdError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Determine ad size based on container width
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateAdWidth = () => {
      if (adRef.current) {
        const width = adRef.current.getBoundingClientRect().width;
        setAdWidth(width);
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
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Check if the AdSense script is available
    const checkScriptLoaded = () => {
      if ((window as any).adsbygoogle !== undefined) {
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
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              
              // Measure width when visible
              if (adRef.current) {
                const width = adRef.current.getBoundingClientRect().width;
                setAdWidth(width);
              }
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
    } catch (error) {
      console.error('Error setting up intersection observer:', error);
      setIsVisible(true); // Fallback to always visible
    }
  }, []);

  // Initialize AdSense when the ad is visible and the script is loaded
  useEffect(() => {
    if (
      typeof window === 'undefined' || 
      process.env.NODE_ENV !== 'production' || 
      !isVisible || 
      isInitialized || 
      adWidth <= 0 || 
      !scriptLoaded
    ) {
      return;
    }

    // Add a delay to ensure the container is stable
    const timer = setTimeout(() => {
      try {
        console.log(`Initializing AdSense ad with format: ${format} slot: ${slot} width: ${adWidth}px`);
        
        // Make sure adsbygoogle is defined
        if (typeof (window as any).adsbygoogle === 'undefined') {
          console.error('AdSense script not loaded properly');
          setAdError('Advertisement not available');
          return;
        }

        // Check if this specific ad element already has an ad
        const adElement = adRef.current?.querySelector('.adsbygoogle');
        if (adElement && (adElement as any).__adInitialized) {
          console.log('Ad already initialized, skipping');
          setIsInitialized(true);
          return;
        }

        // Push the ad configuration
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        
        // Mark this ad as initialized to prevent multiple initializations
        if (adElement) {
          (adElement as any).__adInitialized = true;
        }
        
        console.log('AdSense ad initialized successfully');
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing AdSense:', error);
        setAdError('Failed to load advertisement');
      }
    }, 1000);

    return () => clearTimeout(timer);
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

  // Don't render in development mode
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={cn('ad-placeholder', className)}
        style={{
          width: '100%',
          height: format === 'vertical' ? '600px' : '250px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #ccc',
          margin: '10px 0',
          padding: '10px',
          boxSizing: 'border-box',
        }}
      >
        <div className="text-center text-gray-400">
          <p>Advertisement Placeholder</p>
          <p className="text-xs">{format} format - {slot}</p>
        </div>
      </div>
    );
  }

  // Get the appropriate size
  const { width: adSizeWidth, height: adSizeHeight } = getAdSize();

  return (
    <div
      ref={adRef}
      className={cn('ad-container relative', className)}
      style={{
        width: '100%',
        minHeight: `${adSizeHeight}px`,
        margin: '10px 0',
        overflow: 'hidden',
      }}
    >
      {adError ? (
        <div className="text-center text-gray-400 text-xs py-2">{adError}</div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: adWidth > 0 ? `${adWidth}px` : '100%', 
            height: `${adSizeHeight}px`,
            overflow: 'hidden',
          }}
          data-ad-client="ca-pub-7164870963379403"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
          id={uniqueId}
        />
      )}
    </div>
  );
}

// Sidebar ad component (vertical format)
export function SidebarAd() {
  return <Ad slot={AD_SLOTS.sidebar} format="vertical" className="sidebar-ad" />;
}

// Bottom banner ad component (horizontal format)
export function BottomBannerAd() {
  return (
    <div className="bottom-banner-ad-container w-full overflow-hidden">
      <Ad 
        slot={AD_SLOTS.bottom} 
        format="horizontal" 
        className="bottom-banner-ad"
        uniqueId="bottom-banner-ad"
      />
    </div>
  );
}

// In-content ad component (auto format)
export function InContentAd() {
  return <Ad slot={AD_SLOTS.content} format="auto" className="in-content-ad my-6" />;
}

// Mobile-specific bottom ad
export function MobileBottomAd() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!isMobile) return null;
  
  return (
    <div className="mobile-only-ad w-full mt-4">
      <Ad 
        slot={AD_SLOTS.bottom} 
        format="horizontal" 
        className="mobile-bottom-ad"
        uniqueId="mobile-bottom-ad"
      />
    </div>
  );
}
