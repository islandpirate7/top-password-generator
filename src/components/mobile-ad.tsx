'use client';

import { useEffect, useRef, useState } from 'react';
import { AD_SIZES } from '@/lib/constants';

// Use your real AdSense ad unit IDs from your AdSense account
const AD_SLOTS = {
  // These are your actual ad unit IDs from AdSense
  content: "7327654235"  // Auto-sized ad for in-content (tpg_content)
};

interface MobileAdProps {
  className?: string;
}

export function MobileBottomAd({ className = '' }: MobileAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Only run in production and on client side
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Create an intersection observer to detect when the ad is in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  // Initialize AdSense when the ad is visible
  useEffect(() => {
    if (!isVisible || isLoaded || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Add a delay to ensure other ads have time to load first
    const timer = setTimeout(() => {
      try {
        if (typeof (window as any).adsbygoogle === 'undefined') {
          console.error('AdSense script not loaded properly');
          setHasError(true);
          return;
        }

        // Push the ad configuration
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        
        setIsLoaded(true);
      } catch (error) {
        console.error('Error initializing mobile ad:', error);
        setHasError(true);
      }
    }, 2000); // 2 second delay to ensure other ads load first

    return () => clearTimeout(timer);
  }, [isVisible, isLoaded]);

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
    <div className={`ad-container relative overflow-hidden ${className}`}>
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
            data-ad-slot={AD_SLOTS.content}
            data-ad-format="auto"
            data-full-width-responsive="true"
            id="mobile-bottom-ad"
          />
        </div>
      )}
    </div>
  );
}
