'use client';

import { useEffect, useRef, useState } from 'react';
import { AD_SIZES } from '@/lib/constants';

// Use your real AdSense ad unit IDs from your AdSense account
const AD_SLOTS = {
  // These are your actual ad unit IDs from AdSense
  content: "7327654235",  // Auto-sized ad for in-content (tpg_content)
  mobile: "7784881434"    // Mobile-specific ad unit
};

interface MobileAdProps {
  className?: string;
}

export function MobileBottomAd({ className = '' }: MobileAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [adContainerWidth, setAdContainerWidth] = useState(0);

  // Only run in production and on client side
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Create an intersection observer to detect when the ad is in the viewport
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              
              // Measure the container width when it becomes visible
              if (adRef.current) {
                const width = adRef.current.clientWidth;
                setAdContainerWidth(width);
              }
            }
          });
        },
        { threshold: 0.1, rootMargin: '200px' }
      );

      if (adRef.current) {
        observer.observe(adRef.current);
        
        // Initial measurement
        const width = adRef.current.clientWidth;
        setAdContainerWidth(width);
      }

      // Also add a resize listener to update width if window size changes
      const handleResize = () => {
        if (adRef.current) {
          const width = adRef.current.clientWidth;
          setAdContainerWidth(width);
        }
      };
      
      window.addEventListener('resize', handleResize);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error setting up intersection observer:', error);
      // Fallback to always visible
      setIsVisible(true);
    }
  }, []);

  // Initialize AdSense when the ad is visible and has width
  useEffect(() => {
    if (!isVisible || isLoaded || process.env.NODE_ENV !== 'production' || adContainerWidth <= 0) {
      return;
    }

    // Add a delay to ensure other ads have time to load first
    const timer = setTimeout(() => {
      try {
        // Safely check if adsbygoogle is defined
        if (typeof window === 'undefined') {
          console.error('Window is undefined');
          setHasError(true);
          return;
        }
        
        const adsbygoogle = (window as any).adsbygoogle;
        if (typeof adsbygoogle === 'undefined') {
          console.error('AdSense script not loaded properly');
          setHasError(true);
          return;
        }

        // Log the container width for debugging
        console.log(`Initializing AdSense ad with format: auto slot: ${AD_SLOTS.mobile} width: ${adContainerWidth}px`);

        // Push the ad configuration with error handling
        try {
          (window as any).adsbygoogle = adsbygoogle || [];
          (window as any).adsbygoogle.push({});
          setIsLoaded(true);
        } catch (pushError) {
          console.error('Error pushing ad configuration:', pushError);
          setHasError(true);
        }
      } catch (error) {
        console.error('Error initializing mobile ad:', error);
        setHasError(true);
      }
    }, 2000); // 2 second delay to ensure other ads load first

    return () => clearTimeout(timer);
  }, [isVisible, isLoaded, adContainerWidth]);

  // Don't render in development mode
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`ad-container ${className}`}
        style={{
          height: '250px',
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9'
        }}
      >
        <p className="text-sm text-gray-400">Mobile Ad Placeholder (Dev Mode)</p>
      </div>
    );
  }

  return (
    <div className={`ad-container relative overflow-hidden ${className}`} style={{ width: '100%' }}>
      {hasError ? (
        <div className="text-center text-gray-400 text-sm py-4">Advertisement not available</div>
      ) : (
        <div
          ref={adRef}
          className="ad-slot"
          style={{
            display: 'block',
            minHeight: '250px',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
              minHeight: '250px',
              width: '100%',
            }}
            data-ad-client="ca-pub-7164870963379403"
            data-ad-slot={AD_SLOTS.mobile}
            data-ad-format="auto"
            data-full-width-responsive="true"
            id="mobile-bottom-ad"
          />
        </div>
      )}
    </div>
  );
}
