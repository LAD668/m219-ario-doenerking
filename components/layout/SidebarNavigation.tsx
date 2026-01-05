'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function SidebarNavigation() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navItems = [
    { 
      href: '/', 
      label: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      href: '/lernpfad', 
      label: 'Lernpfad',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
  ]

  return (
    <nav className="fixed left-0 top-0 h-full w-20 glass-nav flex flex-col items-center py-8 z-50">
      {/* Logo / Profile */}
      <Link 
        href="/profil" 
        className="mb-12 w-12 h-12 rounded-2xl glass-nav-item flex items-center justify-center hover:bg-white/30"
      >
        <span className="text-white font-bold text-lg text-on-glass-light">E</span>
      </Link>

      {/* Navigation Items */}
      <div className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'glass-nav-item-active text-white'
                    : 'glass-nav-item text-white/80 hover:text-white'
                }`}
              >
                {item.icon}
              </Link>
              
              {/* Tooltip */}
              {hoveredItem === item.href && (
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-grey-900 text-white text-sm rounded-xl whitespace-nowrap shadow-soft-lg z-50">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-grey-900 border-b-4 border-b-transparent"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

