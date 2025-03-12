'use client'

import { useParams } from 'next/navigation'

interface LocalizedLegalLinkProps {
  path: string;
  children: React.ReactNode;
  className?: string;
}

export function LocalizedLegalLink({ path, children, className }: LocalizedLegalLinkProps) {
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  // Construct the URL with the correct locale prefix
  const href = locale === 'en' 
    ? `/${path}` 
    : `/${locale}/${path}`;
  
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
