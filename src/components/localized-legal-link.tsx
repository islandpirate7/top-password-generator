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
  
  // Convert old legal paths to the new format
  // For example, "legal/privacy-policy" becomes "privacy-policy"
  const newPath = path.replace('legal/', '');
  
  // Use the current locale for the link
  const href = `/${locale}/${newPath}`;
  
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
