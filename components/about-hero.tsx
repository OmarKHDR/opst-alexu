'use client'

import { useState, useEffect } from 'react'
import { getGenericSection } from '@/lib/generic'

interface GenericSection {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
}

export default function AboutHero() {
  const [section, setSection] = useState<GenericSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const fetchedSection = await getGenericSection('Our Story')
        setSection(fetchedSection)
      } catch (err) {
        setError('Failed to load section content')
        console.error('Error fetching section:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSection()
  }, [])

  if (loading) {
    return (
      <section className="relative py-12 md:py-16 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-[#555555]">Loading section content...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-12 md:py-16 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!section) {
    return (
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-r from-[#003366] to-[#3399FF]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl mx-auto px-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="font-merriweather text-3xl md:text-4xl font-bold mb-4">
              Section Not Found
            </h1>
            <p className="font-inter text-lg leading-relaxed opacity-90">
              We're working on bringing you this content. Check back soon.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${section.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/ourstory-background.png`})`}}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
          {/* Left side - Title with underline */}
          <div className="text-center md:text-left">
            <h1 className="font-merriweather text-3xl md:text-4xl font-bold text-white mb-2">
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="font-inter text-white text-lg opacity-90 mb-4">
                {section.subtitle}
              </p>
            )}
            <div className="w-16 md:w-20 h-1 bg-[#FDB813] mb-4 md:mb-6 mx-auto md:mx-0"></div>
          </div>

          {/* Right side - Content */}
          <div className="text-center md:text-left">
            <div
              className="font-inter text-white leading-relaxed text-sm md:text-base opacity-90 px-2 md:px-0 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: section.body }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
