'use client'

import { useRouter, usePathname } from 'next/navigation'

const tabs = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Map', href: '/dashboard/map' },
  { name: 'Playlist', href: '/dashboard/playlist' },
  { name: 'Profile', href: '/dashboard/profile' },
  { name: 'Chat', href: '/dashboard/chat' }
]

export default function DashboardTabs() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="w-full flex justify-center gap-4 py-4 bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-800 text-white shadow-md">
      {tabs.map(tab => (
        <button
          key={tab.name}
          onClick={() => router.push(tab.href)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200
            ${pathname === tab.href
              ? 'bg-white text-indigo-700 shadow-lg'
              : 'hover:bg-white/20 hover:text-white'}`}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  )
}
