'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, FileText, Linkedin, Globe, Mail } from 'lucide-react'
import { getBestContributors } from '@/lib/best-contributors'
import type { Contributor } from '@/lib/best-contributors'

export default function ContributorsSection() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Data fetching effect
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const data = await getBestContributors()
        setContributors(data)
      } catch (error) {
        console.error('Failed to fetch contributors:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContributors()
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (!loading && contributors.length > 0 && isAutoScrolling) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % contributors.length)
      }, 8000)
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isAutoScrolling, contributors.length, loading])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contributors.length)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 15000) // Resume after 15 seconds
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + contributors.length) % contributors.length)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 15000) // Resume after 15 seconds
  }

  const handleMouseEnter = () => {
    setIsAutoScrolling(false)
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsAutoScrolling(true)
  }

  const currentContributor = contributors[currentSlide]

  if (loading) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-inter text-[#555555]">Loading contributors...</p>
          </div>
        </div>
      </section>
    )
  }

  if (contributors.length === 0) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-inter text-[#555555]">No contributors found.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F8F8F8] py-16" role="region" aria-label="Contributors of the Year">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Contributors of The Year
          </h1>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Recognizing outstanding contributions to our research community
          </p>
        </div>

        {/* Contributor Carousel */}
        <div className="max-w-6xl mx-auto relative px-4 sm:px-16" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Navigation Arrows - Outside the card */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-4 text-[#555555] hover:text-[#003366] transition-colors bg-white hover:bg-[#F8F8F8] rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 transform hover:scale-110"
            aria-label="Previous contributor"
          >
            <ChevronLeft size={20} className="sm:w-7 sm:h-7" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-4 text-[#555555] hover:text-[#003366] transition-colors bg-white hover:bg-[#F8F8F8] rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 transform hover:scale-110"
            aria-label="Next contributor"
          >
            <ChevronRight size={20} className="sm:w-7 sm:h-7" />
          </button>

          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center">
              {/* Profile Image */}
              <div className="w-full sm:w-64 h-48 sm:h-64 md:h-80 flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
                <Image
                  src={currentContributor.person.image || "/placeholder.svg"}
                  alt={`${currentContributor.person.name} profile photo`}
                  width={256}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-merriweather text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3 sm:mb-4">
                  {currentContributor.person.name}
                </h3>
                
                {/* Research Interests */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 justify-center lg:justify-start">
                  {currentContributor.person.researchInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FDB813]/10 text-[#003366] rounded-full text-xs sm:text-sm font-inter font-medium border border-[#FDB813]/20 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <p className="font-inter text-sm sm:text-base text-[#555555] mb-3 sm:mb-4 font-medium">
                  {currentContributor.person.affiliation}
                </p>

                <p className="font-inter text-sm sm:text-base text-[#555555] leading-relaxed mb-6 sm:mb-8 line-clamp-4 sm:line-clamp-none">
                  {currentContributor.person.description}
                </p>

                {/* Social Links */}
                <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
                  <a
                    href={currentContributor.person.cvLink}
                    className="p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="Download CV"
                    aria-label={`Download ${currentContributor.person.name}'s CV`}
                  >
                    <FileText size={16} className="sm:w-5 sm:h-5 text-[#555555] group-hover:text-[#003366] transition-colors" />
                  </a>
                  <a
                    href={currentContributor.person.linkedin}
                    className="p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="LinkedIn Profile"
                    aria-label={`Visit ${currentContributor.person.name}'s LinkedIn profile`}
                  >
                    <Linkedin size={16} className="sm:w-5 sm:h-5 text-[#555555] group-hover:text-[#003366] transition-colors" />
                  </a>
                  <a
                    href={currentContributor.person.orcid}
                    className="p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="ORCID Profile"
                    aria-label={`Visit ${currentContributor.person.name}'s ORCID profile`}
                  >
                    <Globe size={16} className="sm:w-5 sm:h-5 text-[#555555] group-hover:text-[#003366] transition-colors" />
                  </a>
                  <a
                    href={`mailto:${currentContributor.person.email}`}
                    className="p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="Send Email"
                    aria-label={`Send email to ${currentContributor.person.name}`}
                  >
                    <Mail size={16} className="sm:w-5 sm:h-5 text-[#555555] group-hover:text-[#003366] transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Contributors navigation">
            {contributors.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoScrolling(false)
                  setTimeout(() => setIsAutoScrolling(true), 15000) // Resume after 15 seconds
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 ${
                  index === currentSlide ? 'bg-[#3399FF] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`View contributor ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
