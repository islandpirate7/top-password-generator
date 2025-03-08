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

export function Ad({ slot, format = 'auto', className = '' }: AdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [adWidth, setAdWidth] = useState(0);

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
    // Load Google AdSense script if it's not already loaded
    if (!document.getElementById('google-adsense-script')) {
      const script = document.createElement('script');
      script.id = 'google-adsense-script';
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7164870963379403';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, []);

  // Create an intersection observer to detect when the ad is in the viewport
  useEffect(() => {
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
      { threshold: 0.1, rootMargin: '100px' }
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
    if (!isVisible || isInitialized || adWidth === 0) return;

    const timer = setTimeout(() => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log(`AdSense initialized for slot ${slot} with width ${adRef.current.offsetWidth}px`);
          setIsInitialized(true);
        } catch (err) {
          console.error('Error loading AdSense:', err);
        }
      } else {
        console.warn('Ad container has zero width, not initializing AdSense');
      }
    }, 1000); // Increased timeout to ensure container has rendered

    return () => clearTimeout(timer);
  }, [isVisible, isInitialized, adWidth, slot]);

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

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      {adWidth > 0 && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: `${height}px`, maxWidth: '100%' }}
          data-ad-client="ca-pub-7164870963379403"
          data-ad-slot={slot}
          data-ad-format={format === 'auto' ? 'auto' : 'rectangle'}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}

export function SidebarAd() {
  return <Ad slot="1234567890" format="vertical" className="hidden md:block" />;
}

export function BottomBannerAd() {
  return <Ad slot="9876543210" format="horizontal" className="mt-8 mb-4" />;
}

export function InContentAd() {
  return <Ad slot="5432167890" format="auto" className="my-6" />;
}
