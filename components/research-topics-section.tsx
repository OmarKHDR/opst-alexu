'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const researchTopics = [
  {
    id: 1,
    title: "Optical Communications",
    description: "Advanced research in fiber optic systems, high-speed data transmission, and next-generation optical communication networks. Our work focuses on developing innovative solutions for global connectivity challenges.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/research-placeholder.png`,
    projects: ["Fiber Optic Networks", "Signal Processing", "Optical Amplifiers"]
  },
  {
    id: 2,
    title: "Photonic Devices", 
    description: "Cutting-edge development of photonic components including lasers, detectors, and integrated optical circuits. Research encompasses both fundamental physics and practical device applications.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/server-network-equipment.png`,
    projects: ["Laser Systems", "Optical Sensors", "Integrated Photonics"]
  },
  {
    id: 3,
    title: "Solar Technology",
    description: "Innovative research in photovoltaic systems, solar cell efficiency optimization, and sustainable energy solutions. Focus on developing next-generation solar technologies for renewable energy applications.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/research-placeholder.png`,
    projects: ["Photovoltaic Cells", "Energy Storage", "Solar Systems"]
  },
  {
    id: 4,
    title: "Quantum Optics",
    description: "Fundamental research in quantum optical phenomena and their applications in quantum computing, cryptography, and advanced sensing systems. Exploring the quantum nature of light and matter interactions.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/research-placeholder.png`,
    projects: ["Quantum Computing", "Quantum Sensors", "Quantum Cryptography"]
  }
]

interface ResearchTopicsSectionProps {
  onScrollToProjects?: (topicId: number) => void
}

export default function ResearchTopicsSection({ onScrollToProjects }: ResearchTopicsSectionProps) {
  const handleScrollToProjects = (topicId: number) => {
    if (onScrollToProjects) {
      onScrollToProjects(topicId)
    }
    
    // Smooth scroll to projects section
    const projectsSection = document.getElementById('projects-section')
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Research Topics
          </h1>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Explore our diverse research areas spanning optics, photonics, and solar technologies
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {researchTopics.map((topic) => (
            <div 
              key={topic.id} 
              className="bg-[#F8F8F8] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Topic Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={topic.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                  alt={topic.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                  <h3 className="font-merriweather text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                    {topic.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <p className="font-inter text-sm sm:text-base text-[#555555] leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  {topic.description}
                </p>

                {/* Related Projects Preview */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-inter text-xs sm:text-sm font-semibold text-[#1A1A1A] mb-2 sm:mb-3">
                    Key Research Areas:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {topic.projects.map((project, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-white text-[#555555] rounded-full text-xs sm:text-sm font-inter border border-gray-200 shadow-sm"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => handleScrollToProjects(topic.id)}
                  className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-3 sm:px-6 py-2 sm:py-3 w-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 text-xs sm:text-sm"
                >
                  EXPLORE PROJECTS ON {topic.title.toUpperCase()}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
