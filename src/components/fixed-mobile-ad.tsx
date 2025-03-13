'use client';

import { useEffect, useRef, useState } from 'react';

// Mobile ad slot ID
const MOBILE_AD_SLOT = "7784881434";

export function FixedMobileAd() {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Function to measure container width
  const measureContainer = () => {
    if (adRef.current) {
      const width = adRef.current.getBoundingClientRect().width;
      setContainerWidth(width);
      return width > 0;
    }
    return false;
  };

  // Set up visibility detection and width measurement
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    try {
      // Create intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Measure container when it becomes visible
            measureContainer();
          }
        },
        { threshold: 0.1, rootMargin: '200px' }
      );

      if (adRef.current) {
        observer.observe(adRef.current);
        // Initial measurement
        measureContainer();
      }

      // Add resize listener
      const handleResize = () => {
        measureContainer();
      };
      
      window.addEventListener('resize', handleResize);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error setting up ad container:', error);
      setIsVisible(true); // Fallback
    }
  }, []);

  // Initialize ad when container is ready
  useEffect(() => {
    if (!isVisible || isAdLoaded || hasError || containerWidth <= 0 || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Add a delay to ensure the container is stable
    const timer = setTimeout(() => {
      try {
        if (typeof window === 'undefined') {
          setHasError(true);
          return;
        }

        // Check if adsbygoogle is available
        const adsbygoogle = (window as any).adsbygoogle;
        if (!adsbygoogle) {
          console.error('AdSense not loaded');
          setHasError(true);
          return;
        }

        // Log the container width for debugging
        console.log(`Initializing mobile ad with width: ${containerWidth}px`);

        // Push the ad
        adsbygoogle.push({});
        setIsAdLoaded(true);
      } catch (error) {
        console.error('Error initializing ad:', error);
        setHasError(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible, isAdLoaded, hasError, containerWidth]);

  // Development placeholder
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px 0',
          border: '1px dashed #ccc'
        }}
      >
        <span style={{ color: '#999' }}>Mobile Ad Placeholder</span>
      </div>
    );
  }

  return (
    <div 
      ref={adRef}
      style={{
        width: '100%',
        minHeight: '100px',
        margin: '10px 0',
        display: 'block',
        overflow: 'hidden'
      }}
    >
      {hasError ? (
        <div style={{ textAlign: 'center', color: '#999', padding: '10px' }}>
          Advertisement not available
        </div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: containerWidth > 0 ? `${containerWidth}px` : '100%',
            height: '100px',
            overflow: 'hidden'
          }}
          data-ad-client="ca-pub-7164870963379403"
          data-ad-slot={MOBILE_AD_SLOT}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
      )}
    </div>
  );
}
