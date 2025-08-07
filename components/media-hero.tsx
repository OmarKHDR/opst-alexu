'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const featuredItems = [
  {
    id: 1,
    title: "Upcoming conference at K university",
    content: "Aliquam tempor eros at felis tincidunt, at vehicula massa blandit. Vestibulum interdum mauris vel interdum ullamcorper. Proin vel nulla tincidunt, ornare lacus at, sodales leo. Aenean ut augue gravida, efficitur orci et, mattis ex. Mauris convallis tortor vel libero varius hendrerit.",
    image: "/conference-hall-gathering.png"
  },
  {
    id: 2,
    title: "Research symposium highlights",
    content: "Join us for an exciting research symposium featuring the latest developments in optics and photonics. Leading researchers will present their groundbreaking work and discuss future directions in the field.",
    image: "/placeholder-1d0ey.png"
  },
  {
    id: 3,
    title: "International collaboration meeting",
    content: "Exploring new partnerships and collaborative opportunities with international research institutions to advance our work in solar technologies and sustainable energy solutions.",
    image: "/placeholder-8qc23.png"
  }
]

export default function MediaHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 12000) // Resume after 12 seconds
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 12000) // Resume after 12 seconds
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
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

  return (
    <section className="relative h-[500px] overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={featuredItems[currentSlide].image || "/placeholder.svg"}
          alt={featuredItems[currentSlide].title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:text-[#FDB813] transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
        aria-label="Previous featured item"
      >
        <ChevronLeft size={32} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:text-[#FDB813] transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
        aria-label="Next featured item"
      >
        <ChevronRight size={32} />
      </button>

      {/* Content - Moved away from navigation buttons */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white ml-16 mr-16">
          <h1 className="font-merriweather text-4xl md:text-5xl font-bold mb-6">
            {featuredItems[currentSlide].title}
          </h1>
          <p className="font-inter text-lg leading-relaxed opacity-90">
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
