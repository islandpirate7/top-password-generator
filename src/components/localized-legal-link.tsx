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
  
  // Always point to the English legal pages since localized versions don't exist yet
  const href = `/${path}`;
  
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
