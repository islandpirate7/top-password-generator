import { PasswordGenerator } from '@/components/password-generator'
import { SidebarAd, BottomBannerAd } from '@/components/ad'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <PasswordGenerator />
          </div>
          <aside className="w-full lg:w-auto">
            <SidebarAd />
          </aside>
        </div>
        
        <div className="mt-12">
          <BottomBannerAd />
        </div>
      </main>
    </div>
  )
}
