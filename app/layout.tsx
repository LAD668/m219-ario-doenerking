import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SidebarNavigation from '@/components/layout/SidebarNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Einstieg mit R - Ausbildung für Entwickler Digitales Business EFZ',
  description: 'Lernplattform für Auszubildende im Bereich Entwickler Digitales Business EFZ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <SidebarNavigation />
        <main className="min-h-screen ml-20">
          {children}
        </main>
      </body>
    </html>
  )
}

