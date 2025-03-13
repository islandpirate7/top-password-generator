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
  
  // Use the current locale for the link
  const href = `/${locale}/${path}`;
  
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
