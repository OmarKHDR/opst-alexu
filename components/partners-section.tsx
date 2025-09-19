'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getPartners, Partner } from '@/lib/partners'

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const fetchedPartners = await getPartners()
        setPartners(fetchedPartners)
      } catch (err) {
        setError('Failed to load partners')
        console.error('Error fetching partners:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  if (loading) {
    return (
      <section className="bg-[#F8F8F8] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center">
              Our Partners
            </h2>
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-16 md:h-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#F8F8F8] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center">
              Our Partners
            </h2>
            <div className="text-center">
              <p className="font-inter text-[#555555] text-base md:text-lg">
                {error}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F8F8F8] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center">
            Our Partners
          </h2>

          {/* Partners Content */}
          <div className="text-center">
            <p className="font-inter text-[#555555] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12 px-4 md:px-0">
              We collaborate with leading institutions and organizations worldwide to advance
              research in optics, photonics, and solar technologies.
            </p>

            {/* Partner logos grid */}
            {partners.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 md:p-6 border border-gray-100 hover:border-[#FDB813] transform hover:-translate-y-1"
                  >
                    <div className="h-16 md:h-20 flex items-center justify-center mb-3">
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={80}
                          height={80}
                          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 font-inter text-xs text-center">
                            {partner.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-merriweather text-sm md:text-base font-semibold text-[#1A1A1A] mb-2">
                      {partner.name}
                    </h3>
                    {partner.brief && (
                      <p className="font-inter text-xs md:text-sm text-[#555555] leading-relaxed line-clamp-2">
                        {partner.brief}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="font-inter text-[#555555] text-base md:text-lg">
                  No partners available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
