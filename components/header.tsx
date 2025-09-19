'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'People', path: '/people' },
  { name: 'Research', path: '/research' },
  { name: 'Publication', path: '/publication' },
  { name: 'Opportunities', path: '/opportunities' },
  { name: 'Engagements', path: '/engagements' },
  { name: 'Contact', path: '/contact' },
  { name: 'Media', path: '/media' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActivePage = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="bg-[#003366] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/opst-logo.svg`}
                alt="OPST Lab"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] ${
                  isActivePage(item.path)
                    ? 'text-[#003366] bg-[#FDB813] shadow-lg transform scale-105'
                    : 'text-white hover:text-[#FDB813] hover:bg-white/10'
                }`}
              >
                {item.name}
                {isActivePage(item.path) && (
                  <div className="absolute inset-0 rounded-lg border-2 border-[#003366] bg-[#FDB813]/90 -z-10"></div>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366]"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#003366] border-t border-[#FDB813]/20 shadow-2xl z-50 rounded-b-2xl">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`px-4 py-3 rounded-xl font-inter text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] ${
                      isActivePage(item.path)
                        ? 'text-[#003366] bg-[#FDB813] shadow-lg'
                        : 'text-white hover:text-[#FDB813] hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
