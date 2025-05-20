'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const tabs = [
  { name: 'Playlist', href: '/dashboard/playlist' },
  { name: 'Map', href: '/dashboard/map' },
  { name: 'Chat', href: '/dashboard/chat' },
  { name: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <nav className="flex gap-6 mb-8 border-b border-gray-700 pb-2">
        {tabs.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`text-lg ${pathname.startsWith(tab.href) ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      <div>{children}</div>
    </main>
  )
}
