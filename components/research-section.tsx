'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const researchTopics = [
  {
    id: 1,
    title: "Research topic",
    content: "Aliquam tempor eros at felis tincidunt, at vehicula massa blandit. Vestibulum interdum mauris vel interdum ullamcorper. Proin vel nulla tincidunt, ornare lacus at, sodales leo. Aenean ut augue gravida, efficitur orci et, mattis ex. Mauris convallis tortor vel libero varius hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis gravida vel nulla lacinia dictum. Nulla convallis, leo quis vehicula pellentesque, augue odio tincidunt lorem, sed aliquet risus ligula non dolor.",
    image: "/images/research-placeholder.png"
  },
  {
    id: 2,
    title: "Photonics Research",
    content: "Advanced photonics research focusing on optical communication systems and fiber optic technologies. Our team explores cutting-edge solutions for high-speed data transmission and optical signal processing applications in modern telecommunications infrastructure.",
    image: "/images/research-placeholder.png"
  },
  {
    id: 3,
    title: "Solar Technology",
    content: "Innovative solar technology research aimed at improving efficiency and sustainability of photovoltaic systems. We develop next-generation solar cells and energy storage solutions for renewable energy applications.",
    image: "/images/research-placeholder.png"
  }
]

export default function ResearchSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % researchTopics.length)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + researchTopics.length) % researchTopics.length)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 10000) // Resume after 10 seconds
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
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
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Text Content */}
                <div className="order-2 md:order-1">
                  <div className="bg-[#003366] text-white px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 inline-block">
                    <h3 className="font-merriweather text-lg sm:text-xl font-bold">
                      {researchTopics[currentSlide].title}
                    </h3>
                  </div>
                  <p className="font-inter text-sm sm:text-base text-[#555555] leading-relaxed mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-none">
                    {researchTopics[currentSlide].content}
                  </p>
                  <Button className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] font-inter font-medium w-full sm:w-auto">
                    KNOW MORE
                  </Button>
                </div>

                {/* Image */}
                <div className="relative h-48 sm:h-64 md:h-80 order-1 md:order-2">
                  <Image
                    src={researchTopics[currentSlide].image || "/placeholder.svg"}
                    alt={researchTopics[currentSlide].title}
                    fill
                    className="object-cover rounded-lg"
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
