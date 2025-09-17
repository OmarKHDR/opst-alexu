'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getHomeSection } from '@/lib/generic'
import { ResearchTopic } from '@/lib/research-topics'

export default function ResearchSection() {
  const [researchTopics, setResearchTopics] = useState<ResearchTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchHomeSection = async () => {
      try {
        const homeSectionData = await getHomeSection()
        setResearchTopics(homeSectionData?.researchTopics || [])
      } catch (err) {
        setError('Failed to load research topics')
        console.error('Error fetching research topics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeSection()
  }, [])

  const nextSlide = () => {
    if (researchTopics.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % researchTopics.length)
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
    }
  }

  const prevSlide = () => {
    if (researchTopics.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + researchTopics.length) % researchTopics.length)
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && researchTopics.length > 0) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % researchTopics.length)
      }, 6000) // Change slide every 6 seconds
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isAutoScrolling, researchTopics.length])

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsAutoScrolling(false)
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsAutoScrolling(true)
  }

  if (loading) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-[#555555]">Loading research topics...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (researchTopics.length === 0) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FDB813]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#FDB813]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
              Research Topics
            </h2>
            <p className="font-inter text-lg text-[#555555]">No research topics available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Research Topics
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="flex items-center">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 text-[#003366] hover:text-[#3399FF] transition-colors bg-white/50 hover:bg-white/70 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
            </button>

            {/* Content */}
            <div className="flex-1 mx-4 sm:mx-12">
              <div className="grid md:grid-cols-5 gap-6 sm:gap-8 items-start">
                {/* Text Content - Takes 2 columns on desktop */}
                <div className="order-2 md:order-1 md:col-span-2 flex flex-col h-48 sm:h-64 md:h-80">
                  {/* Title at Top */}
                  <div className="bg-[#003366] text-white px-4 py-3 mb-4 rounded-lg">
                    <h3 className="font-merriweather text-lg sm:text-xl font-bold">
                      {researchTopics[currentSlide].title}
                    </h3>
                  </div>

                  {/* Description in Middle */}
                  <div className="flex-1 mb-4">
                    <div
                      className="font-inter text-sm sm:text-base text-[#555555] leading-relaxed line-clamp-4 sm:line-clamp-none prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: researchTopics[currentSlide].description.length > 250
                          ? researchTopics[currentSlide].description.substring(0, 250) + '...'
                          : researchTopics[currentSlide].description
                      }}
                    />
                  </div>

                  {/* Button at Bottom */}
                  <div className="mt-auto">
                    <Button
                      className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] font-inter font-medium w-full shadow-lg"
                      onClick={() => window.location.href = `/research?topic=${encodeURIComponent(researchTopics[currentSlide].title)}`}
                    >
                      KNOW MORE
                    </Button>
                  </div>
                </div>

                {/* Image - Takes 3 columns on desktop */}
                <div className="relative h-48 sm:h-64 md:h-80 order-1 md:order-2 md:col-span-3">
                  <Image
                    src={researchTopics[currentSlide].image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                    alt={researchTopics[currentSlide].title}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 p-2 text-[#003366] hover:text-[#3399FF] transition-colors bg-white/50 hover:bg-white/70 rounded-full backdrop-blur-sm"
            >
              <ChevronRight size={24} className="sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {researchTopics.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoScrolling(false)
                  setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#003366]' : 'bg-[#555555]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
