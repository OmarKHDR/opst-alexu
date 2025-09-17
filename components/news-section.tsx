'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getHomeSection } from '@/lib/generic'
import { Article } from '@/lib/articles'
import ArticleModal from './article-modal'

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchHomeSection = async () => {
      try {
        const homeSectionData = await getHomeSection()
        setNewsItems(homeSectionData?.recentNews || [])
      } catch (err) {
        setError('Failed to load news section')
        console.error('Error fetching news section:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeSection()
  }, [])

  const nextSlide = () => {
    if (newsItems.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length)
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
    }
  }

  const prevSlide = () => {
    if (newsItems.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length)
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && newsItems.length > 0) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % newsItems.length)
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isAutoScrolling, newsItems.length])

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

  const handleKnowMoreClick = () => {
    setSelectedArticleId(newsItems[currentSlide].id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArticleId(null)
  }

  if (loading) {
    return (
      <section className="bg-[#003366] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FDB813] mx-auto"></div>
            <p className="mt-4 text-white opacity-90">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#003366] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (newsItems.length === 0) {
    return (
      <section className="bg-[#003366] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="font-merriweather text-2xl font-bold mb-4">Recent News</h2>
            <p className="font-inter text-lg opacity-90">No news available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#003366] py-16" role="region" aria-label="Recent News">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-[#FDB813] px-6 py-3 mb-4 rounded-lg shadow-md">
            <h2 className="font-merriweather text-2xl font-bold text-[#003366]">Recent News</h2>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="flex items-center">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 sm:p-3 text-white hover:text-[#FDB813] transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366]"
              aria-label="Previous news item"
            >
              <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
            </button>

            {/* Content */}
            <div className="flex-1 mx-4 sm:mx-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-2xl border border-white/20">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                  {/* Text Content */}
                  <div className="text-white order-2 md:order-1">
                    <h3 className="font-merriweather text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                      {newsItems[currentSlide].title}
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-[#FDB813] mb-3 sm:mb-4">
                      {newsItems[currentSlide].date} by {newsItems[currentSlide].author}
                    </p>
                    <div
                      className="font-inter text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 opacity-90 line-clamp-4 sm:line-clamp-none prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: newsItems[currentSlide].excerpt || newsItems[currentSlide].content.substring(0, 200) + '...'
                      }}
                    />
                    <Button
                      className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] font-inter font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-transparent w-full sm:w-auto"
                      onClick={handleKnowMoreClick}
                    >
                      KNOW MORE
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 sm:h-64 md:h-80 order-1 md:order-2">
                    <Image
                      src={newsItems[currentSlide].image || `${process.env.NEXT_PUBLIC_BASE_PATH}/images/placeholder.svg`}
                      alt={newsItems[currentSlide].title}
                      fill
                      className="object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 p-2 sm:p-3 text-white hover:text-[#FDB813] transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366]"
              aria-label="Next news item"
            >
              <ChevronRight size={24} className="sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="News navigation">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoScrolling(false)
                  setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] ${
                  index === currentSlide ? 'bg-[#FDB813] scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <ArticleModal
        articleId={selectedArticleId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
