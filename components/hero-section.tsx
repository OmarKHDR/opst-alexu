'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getHomeSection, GenericSection } from '@/lib/generic'

export default function HeroSection() {
  const [heroSection, setHeroSection] = useState<GenericSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHomeSection = async () => {
      try {
        const homeSectionData = await getHomeSection()
        setHeroSection(homeSectionData?.heroSection || null)
      } catch (err) {
        setError('Failed to load hero section')
        console.error('Error fetching hero section:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeSection()
  }, [])

  if (loading) {
    return (
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-16 sm:py-0">
        <div className="absolute inset-0 bg-gray-100"></div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
          <p className="mt-4 text-[#555555]">Loading hero section...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-16 sm:py-0">
        <div className="absolute inset-0 bg-gray-100"></div>
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-16 sm:py-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroSection?.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/images/hero-background.png`}
          alt="Research Laboratory"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-merriweather text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {heroSection?.title || 'Advancing optics photonics and solar technologies for a sustainable future'}
        </h1>
        <p className="font-inter text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 px-2">
          {heroSection?.subtitle || 'Empowering researchers for advancing technologies'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto">
          <Link href={`/${process.env.NEXT_PUBLIC_BASE_PATH}/research`}>
            <Button
              className="bg-[#003366] hover:bg-[#003366]/90 text-white px-4 sm:px-8 py-3 text-base sm:text-lg font-inter font-medium w-full sm:w-auto"
              size="lg"
            >
              EXPLORE OUR RESEARCH
            </Button>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/people`}>
            <Button
              className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] px-4 sm:px-8 py-3 text-base sm:text-lg font-inter font-medium w-full sm:w-auto"
              size="lg"
            >
              MEET THE TEAM
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
