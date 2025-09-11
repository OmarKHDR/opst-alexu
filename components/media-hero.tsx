'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getArticles } from '@/lib/articles'

interface FeaturedItem {
  id: string;
  title: string;
  content: string;
  image: string;
}

export default function MediaHero() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles()
        // Use the first 3 articles for the hero carousel, or create featured content from them
        const featured = fetchedArticles.slice(0, 3).map(article => ({
          id: article.id,
          title: article.title,
          content: article.excerpt,
          image: article.image
        }))
        setFeaturedItems(featured)
      } catch (err) {
        setError('Failed to load featured content')
        console.error('Error fetching articles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const nextSlide = () => {
    if (featuredItems.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length)
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 12000) // Resume after 12 seconds
    }
  }

  const prevSlide = () => {
    if (featuredItems.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 12000) // Resume after 12 seconds
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && featuredItems.length > 0) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredItems.length)
      }, 7000) // Change slide every 7 seconds
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isAutoScrolling, featuredItems.length])

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
      <section className="relative h-[500px] overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-[#555555]">Loading featured content...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative h-[500px] overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (featuredItems.length === 0) {
    return (
      <section className="relative h-[500px] overflow-hidden bg-gradient-to-r from-[#003366] to-[#3399FF]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl mx-auto px-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="font-merriweather text-3xl md:text-4xl font-bold mb-4">
              Welcome to Our Media Center
            </h1>
            <p className="font-inter text-lg leading-relaxed opacity-90">
              Discover the latest research, publications, and insights from our laboratory.
              We're working on bringing you exciting content soon.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[500px] overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={featuredItems[currentSlide].image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
          alt={featuredItems[currentSlide].title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white hover:text-[#FDB813] transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
        aria-label="Previous featured item"
      >
        <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white hover:text-[#FDB813] transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
        aria-label="Next featured item"
      >
        <ChevronRight size={24} className="sm:w-8 sm:h-8" />
      </button>

      {/* Content - Responsive positioning */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white mx-4 sm:ml-16 sm:mr-16">
          <h1 className="font-merriweather text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {featuredItems[currentSlide].title}
          </h1>
          <p className="font-inter text-sm sm:text-base md:text-lg leading-relaxed opacity-90 line-clamp-3 sm:line-clamp-none">
            {featuredItems[currentSlide].content}
          </p>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoScrolling(false)
              setTimeout(() => setIsAutoScrolling(true), 12000) // Resume after 12 seconds
            }}
            className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-black ${
              index === currentSlide ? 'bg-[#FDB813]' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
