import { PasswordGenerator } from '@/components/password-generator'
import { SidebarAd, BottomBannerAd } from '@/components/ad'
import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/routing'

export default function Home() {
  // Redirect to the default locale
  redirect(`/${defaultLocale}`)
}
