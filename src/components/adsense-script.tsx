'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AdSenseScript() {
  useEffect(() => {
    // Add a small delay to ensure the page layout is fully rendered
    const timeout = setTimeout(() => {
      try {
        // Check if there are any adsbygoogle slots that need to be initialized
        if (window.adsbygoogle && document.querySelectorAll('ins.adsbygoogle').length > 0) {
          console.log('Ensuring AdSense is properly initialized');
        }
      } catch (error) {
        console.error('Error initializing AdSense:', error);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Script
      id="google-adsense-script"
      strategy="afterInteractive"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7164870963379403"
      crossOrigin="anonymous"
    />
  );
}
