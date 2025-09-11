'use client'

import { useEffect, useState } from 'react'
import { getPublications, getPublicationStatistics } from '@/lib/publications'

export default function PublicationsHeader() {
  const [statistics, setStatistics] = useState([
    { number: "0", label: "Journal Articles" },
    { number: "0", label: "Conference Papers" },
    { number: "0", label: "PhD Theses" },
    { number: "0", label: "Master's Theses" },
    { number: "0", label: "Patents" }
  ])

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const publications = await getPublications()
        const stats = getPublicationStatistics(publications)
        setStatistics([
          { number: stats["Journal Articles"].toString(), label: "Journal Articles" },
          { number: stats["Conference Papers"].toString(), label: "Conference Papers" },
          { number: stats["PhD Theses"].toString(), label: "PhD Theses" },
          { number: stats["Master's Theses"].toString(), label: "Master's Theses" },
          { number: stats["Patents"].toString(), label: "Patents" }
        ])
      } catch (error) {
        console.error('Failed to fetch publication statistics:', error)
      }
    }

    fetchStatistics()
  }, [])
  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Publications
          </h1>
          <p className="font-inter text-[#555555] text-lg">
            Advancing knowledge through scientific research and innovation
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm text-center">
              <div className="font-merriweather text-xl sm:text-2xl lg:text-3xl font-bold text-[#003366] mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="font-inter text-xs sm:text-sm text-[#555555]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
