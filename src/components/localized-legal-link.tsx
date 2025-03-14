'use client'

import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

interface LocalizedLegalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LocalizedLegalLink({ href, children, className }: LocalizedLegalLinkProps) {
  const locale = useLocale();
  
  return (
    <Link 
      href={href} 
      locale={locale} 
      className={className}
    >
      {children}
    </Link>
  )
}
