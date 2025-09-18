'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getServices, Service } from '@/lib/services'

export default function IndustryServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const data = await getServices()
        setServices(data)
      } catch (err) {
        setError('Failed to load services')
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Industry Services
          </h2>
          <p className="font-inter text-[#555555] text-lg">
            Contact us for technical consulting or research partnerships
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003366]"></div>
            <p className="mt-4 text-[#555555] font-inter">Loading services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-red-600 font-inter mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#003366] hover:bg-[#003366]/90 text-white"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-6 sm:mb-8">
          {!loading && !error && services.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-[#555555] font-inter">No services found.</p>
            </div>
          )}

          {services.map((service) => (
            <div key={service.id} className="relative h-56 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={service.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-center text-white">
                <h3 className="font-merriweather text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                  {service.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm leading-relaxed opacity-90 line-clamp-4 sm:line-clamp-none">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <div className="text-center">
          <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm w-full sm:w-auto">
            CONTACT US NOW
          </Button>
        </div>
      </div>
    </section>
  )
}
