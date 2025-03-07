'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="pub-7164870963379403"
        data-ad-slot={slot}
        data-ad-format={format}
      />
      <p className="text-xs text-center text-gray-400 mt-1">Advertisement</p>
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="sticky top-4">
      <Ad slot="1234567890" format="vertical" className="min-h-[600px] w-[300px]" />
    </div>
  );
}

export function BottomBannerAd() {
  return (
    <div className="my-8">
      <Ad slot="0987654321" format="horizontal" className="min-h-[90px]" />
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="my-4">
      <Ad slot="1122334455" format="rectangle" className="min-h-[250px]" />
    </div>
  );
}
