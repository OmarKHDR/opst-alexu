'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getHomeSection, GenericSection } from '@/lib/generic'
import Link from 'next/link'

export default function AboutSection() {
  const [aboutSection, setAboutSection] = useState<GenericSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHomeSection = async () => {
      try {
        const homeSectionData = await getHomeSection()
        setAboutSection(homeSectionData?.about || null)
      } catch (err) {
        setError('Failed to load about section')
        console.error('Error fetching about section:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeSection()
  }, [])

  if (loading) {
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-[#555555]">Loading about section...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left side - Title */}
          <div className="relative">
            <h2 className="font-merriweather text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-6">
              {aboutSection?.title || 'About us'}
            </h2>
            {/* Mobile golden line */}
            <div className="block md:hidden w-20 h-1 bg-[#FDB813] mb-6"></div>
          </div>

          {/* Right side - Content and button */}
          <div className="relative">
            <div className="hidden md:block w-1 h-20 bg-[#FDB813] absolute -left-6 top-0"></div>
            <div
              className="font-inter text-[#555555] leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutSection?.body ? aboutSection.body.substring(0, 300) + '...' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }}
            />
            <Link href='/about'>
              <Button
                className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-4 sm:px-6 py-3 w-full sm:w-auto"
              >
                LEARN MORE
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}
