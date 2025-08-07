'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, FileText, Linkedin, Globe, Mail } from 'lucide-react'

const contributors = [
  {
    id: 1,
    name: "Prof. Lorem epsum",
    tags: ["Topic A", "Topic B", "Topic C"],
    affiliation: "Affiliated with Alexandria university",
    description: "Aliquam tempor eros at felis tincidunt, at vehicula massa blandit. Vestibulum interdum mauris vel interdum ullamcorper.",
    image: "/professional-headshot.png",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "professor@example.com"
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    tags: ["Photonics", "Research", "Innovation"],
    affiliation: "Affiliated with Alexandria university",
    description: "Leading researcher in optical communications and photonic systems with over 15 years of experience in the field.",
    image: "/professional-headshot.png",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "jane.smith@example.com"
  },
  {
    id: 3,
    name: "Prof. Ahmed Hassan",
    tags: ["Solar Tech", "Energy", "Sustainability"],
    affiliation: "Affiliated with Alexandria university",
    description: "Expert in solar technology and sustainable energy solutions, contributing to breakthrough research in renewable energy.",
    image: "/professional-headshot.png",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "ahmed.hassan@example.com"
  }
]

export default function ContributorsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

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

  const currentContributor = contributors[currentSlide]

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % contributors.length)
      }, 8000) // Change slide every 8 seconds
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isAutoScrolling, contributors.length])

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
        <div className="max-w-6xl mx-auto relative px-16" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Navigation Arrows - Outside the card */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 text-[#555555] hover:text-[#003366] transition-colors bg-white hover:bg-[#F8F8F8] rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 transform hover:scale-110"
            aria-label="Previous contributor"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 text-[#555555] hover:text-[#003366] transition-colors bg-white hover:bg-[#F8F8F8] rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 transform hover:scale-110"
            aria-label="Next contributor"
          >
            <ChevronRight size={28} />
          </button>

          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 md:p-10 border border-gray-100 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Profile Image */}
              <div className="w-64 h-80 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={currentContributor.image || "/placeholder.svg"}
                  alt={`${currentContributor.name} profile photo`}
                  width={256}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-merriweather text-3xl font-bold text-[#1A1A1A] mb-4">
                  {currentContributor.name}
                </h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                  {currentContributor.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#FDB813]/10 text-[#003366] rounded-full text-sm font-inter font-medium border border-[#FDB813]/20 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="font-inter text-[#555555] mb-4 font-medium">
                  {currentContributor.affiliation}
                </p>

                <p className="font-inter text-[#555555] leading-relaxed mb-8">
                  {currentContributor.description}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 justify-center lg:justify-start">
                  <a
                    href={currentContributor.cv}
                    className="p-3 border border-gray-300 rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="Download CV"
                    aria-label={`Download ${currentContributor.name}'s CV`}
                  >
                    <FileText size={20} className="text-[#555555] group-hover:text-[#003366] transition-colors" />
                  </a>
                  <a
                    href={currentContributor.linkedin}
                    className="p-3 border border-gray-300 rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="LinkedIn Profile"
                    aria-label={`Visit ${currentContributor.name}'s LinkedIn profile`}
                  >
                    <Linkedin size={20} className="text-[#555555] group-hover:text-[#003366] transition-colors" />
                  </a>
                  <a
                    href={currentContributor.orcid}
                    className="p-3 border border-gray-300 rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="ORCID Profile"
                    aria-label={`Visit ${currentContributor.name}'s ORCID profile`}
                  >
                    <Globe size={20} className="text-[#555555] group-hover:text-[#003366] transition-colors" />
                  </a>
                  <a
                    href={`mailto:${currentContributor.email}`}
                    className="p-3 border border-gray-300 rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    title="Send Email"
                    aria-label={`Send email to ${currentContributor.name}`}
                  >
                    <Mail size={20} className="text-[#555555] group-hover:text-[#003366] transition-colors" />
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
