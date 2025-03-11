'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

interface LegalContentProps {
  titleKey: string;
  children: React.ReactNode;
}

export default function LegalContent({ titleKey, children }: LegalContentProps) {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {t(titleKey)}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </div>
  );
}
