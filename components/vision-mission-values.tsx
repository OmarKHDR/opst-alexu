'use client'

import { useState, useEffect } from 'react'
import { getVisionMissionValues } from '@/lib/generic'

interface VisionMissionValues {
  id: string;
  vision: string;
  mission: string;
  values: string;
}

export default function VisionMissionValues() {
  const [vmv, setVmv] = useState<VisionMissionValues | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVmv = async () => {
      try {
        const fetchedVmv = await getVisionMissionValues()
        setVmv(fetchedVmv)
      } catch (err) {
        setError('Failed to load vision mission values')
        console.error('Error fetching vision mission values:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVmv()
  }, [])

  if (loading) {
    return (
      <section className="bg-[#003366] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FDB813] mx-auto"></div>
            <p className="mt-4 text-white opacity-90">Loading content...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#003366] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!vmv) {
    return (
      <section className="bg-[#003366] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-merriweather text-2xl font-bold mb-4">
              Content Coming Soon
            </h2>
            <p className="font-inter text-lg opacity-90">
              We're working on bringing you our vision, mission, and values. Check back soon.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#003366] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Vision and Mission Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-12">
            {/* Vision */}
            <div className="text-white text-center px-4 md:px-0">
              <h2 className="font-merriweather text-xl md:text-2xl font-bold mb-2">
                Vision
              </h2>
              <div className="w-12 md:w-16 h-1 bg-[#FDB813] mx-auto mb-4 md:mb-6"></div>
              <p className="font-inter text-sm md:text-base leading-relaxed opacity-90">
                {vmv.vision}
              </p>
            </div>

            {/* Mission */}
            <div className="text-white text-center px-4 md:px-0">
              <h2 className="font-merriweather text-xl md:text-2xl font-bold mb-2">
                Mission
              </h2>
              <div className="w-12 md:w-16 h-1 bg-[#FDB813] mx-auto mb-4 md:mb-6"></div>
              <p className="font-inter text-sm md:text-base leading-relaxed opacity-90">
                {vmv.mission}
              </p>
            </div>
          </div>

          {/* Values - Centered */}
          <div className="text-white text-center px-4 md:px-0">
            <h2 className="font-merriweather text-xl md:text-2xl font-bold mb-2">
              Values
            </h2>
            <div className="w-12 md:w-16 h-1 bg-[#FDB813] mx-auto mb-4 md:mb-6"></div>
            <p className="font-inter text-sm md:text-base leading-relaxed opacity-90 max-w-3xl mx-auto">
              {vmv.values}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
