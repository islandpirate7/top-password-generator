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

  useEffect(() => {
    // Load Google AdSense script if it's not already loaded
    if (!document.getElementById('google-adsense-script')) {
      const script = document.createElement('script');
      script.id = 'google-adsense-script';
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-7164870963379403';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Create an intersection observer to detect when the ad is in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
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
    if (!isVisible) return;

    const timer = setTimeout(() => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log(`AdSense initialized for slot ${slot} with width ${adRef.current.offsetWidth}px`);
        } catch (err) {
          console.error('Error loading AdSense:', err);
        }
      } else {
        console.warn('Ad container has zero width, not initializing AdSense');
      }
    }, 1000); // Increased timeout to ensure container has rendered

    return () => clearTimeout(timer);
  }, [isVisible, slot]);

  // Get dimensions based on format
  const getAdDimensions = () => {
    switch (format) {
      case 'rectangle':
        return { width: AD_SIZES.IN_CONTENT.width, height: AD_SIZES.IN_CONTENT.height };
      case 'vertical':
        return { width: AD_SIZES.SIDEBAR.width, height: AD_SIZES.SIDEBAR.height };
      case 'horizontal':
        return { width: AD_SIZES.BOTTOM_BANNER.width, height: AD_SIZES.BOTTOM_BANNER.height };
      default:
        return { width: '100%', height: 'auto' };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <div 
      ref={adRef}
      className={`ad-container ${className}`}
      style={{ 
        minWidth: format !== 'auto' ? `${dimensions.width}px` : '300px',
        minHeight: format !== 'auto' ? `${dimensions.height}px` : '100px',
        display: 'block',
        overflow: 'hidden',
        visibility: 'visible'
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          width: format !== 'auto' ? `${dimensions.width}px` : '100%',
          height: format !== 'auto' ? `${dimensions.height}px` : '100%',
          visibility: 'visible'
        }}
        data-ad-client="pub-7164870963379403"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <p className="text-xs text-center text-gray-400 mt-1">Advertisement</p>
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="sidebar-ad-container hidden lg:block">
      <Ad 
        slot="1234567890" 
        format="vertical" 
        className="min-h-[600px] w-[300px] mx-auto"
      />
    </div>
  );
}

export function BottomBannerAd() {
  return (
    <div className="bottom-banner-ad-container w-full overflow-hidden my-4">
      <Ad 
        slot="0987654321" 
        format="horizontal" 
        className="min-h-[90px] w-full max-w-[728px] mx-auto"
      />
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="in-content-ad-container my-4 overflow-hidden">
      <Ad 
        slot="1122334455" 
        format="rectangle" 
        className="min-h-[250px] w-[300px] mx-auto"
      />
    </div>
  );
}
