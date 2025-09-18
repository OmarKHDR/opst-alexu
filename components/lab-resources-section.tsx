'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Play, BookOpen, Clock, Tag } from 'lucide-react'
import { getResources, Resource } from '@/lib/resources'

export default function LabResourcesSection() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        const data = await getResources()
        setResources(data)
      } catch (err) {
        setError('Failed to load resources')
        console.error('Error fetching resources:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Lab Resources
          </h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Access our comprehensive library of educational resources, tutorials, and research materials
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDB813]"></div>
            <p className="mt-4 text-[#555555] font-inter">Loading resources...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-red-600 font-inter mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366]"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {!loading && !error && resources.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-[#555555] font-inter">No resources found.</p>
            </div>
          )}

          {resources.map((resource) => (
            <div 
              key={resource.id} 
              className="bg-[#F8F8F8] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group relative"
            >
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDB813]/5 to-[#3399FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
              
              <div className="relative z-10">
                {/* Resource Image with Play Button */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={resource.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play size={20} className="sm:w-6 sm:h-6 text-[#003366] ml-0.5 sm:ml-1" />
                    </div>
                  </div>
                  
                  {/* Resource Type Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <div className="px-2 sm:px-3 py-1 bg-[#FDB813] text-[#003366] rounded-full text-xs font-inter font-semibold shadow-lg">
                      {resource.type}
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <div className="px-2 sm:px-3 py-1 bg-black/70 text-white rounded-full text-xs font-inter font-medium flex items-center gap-1">
                      <Clock size={10} className="sm:w-3 sm:h-3" />
                      {resource.duration}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-merriweather text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2 sm:mb-3 group-hover:text-[#003366] transition-colors duration-200">
                    {resource.title}
                  </h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {resource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-inter shadow-sm transition-all duration-200 ${
                          tag === 'Beginner' ? 'bg-green-100 text-green-800 border border-green-200' :
                          tag === 'Intermediate' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                          tag === 'Advanced' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                          'bg-white text-[#555555] border border-gray-200'
                        }`}
                      >
                        {tag === 'Video Guide' && <BookOpen size={10} className="sm:w-3 sm:h-3 inline mr-1" />}
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Resource Details */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Tag size={12} className="sm:w-3.5 sm:h-3.5 text-[#FDB813]" />
                      <span className="font-inter font-medium text-[#1A1A1A]">Level:</span>
                      <span className="font-inter text-[#555555]">{resource.level}</span>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-inter text-xs sm:text-sm font-medium text-[#1A1A1A] mb-1.5 sm:mb-2">DESCRIPTION</h4>
                    <p className="font-inter text-[#555555] text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {resource.description}
                    </p>
                  </div>

                  <Button className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] font-inter font-medium px-4 sm:px-6 py-2 sm:py-3 w-full text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group-hover:scale-[1.02] flex items-center justify-center gap-1.5 sm:gap-2">
                    <Play size={14} className="sm:w-4 sm:h-4" />
                    WATCH NOW
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
