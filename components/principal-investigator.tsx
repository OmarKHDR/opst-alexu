'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getPrincipalInvestigator, Person } from '@/lib/people'

export default function PrincipalInvestigator() {
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrincipalInvestigator = async () => {
      try {
        const fetchedPerson = await getPrincipalInvestigator()
        setPerson(fetchedPerson)
      } catch (err) {
        setError('Failed to load principal investigator')
        console.error('Error fetching principal investigator:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrincipalInvestigator()
  }, [])

  if (loading) {
    return (
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-[#555555]">Loading principal investigator...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!person) {
    return (
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#F8F8F8] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="font-merriweather text-2xl font-bold text-[#1A1A1A] mb-4">
              Principal Investigator
            </h2>
            <p className="font-inter text-[#555555] leading-relaxed">
              We're working on bringing you information about our principal investigator. Check back soon.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center md:text-left">
            Principal investigator
          </h2>

          {/* Profile */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="w-48 md:w-64 h-60 md:h-80 flex-shrink-0">
              <Image
                src={person.image}
                alt={person.name}
                width={256}
                height={320}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Profile Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-merriweather text-xl md:text-2xl font-bold text-[#1A1A1A] mb-4 md:mb-6">
                {person.name}
              </h3>
              {person.title && (
                <p className="font-inter text-[#003366] font-medium mb-2">
                  {person.title}
                </p>
              )}
              {person.degree && (
                <p className="font-inter text-[#555555] mb-4">
                  {person.degree}
                </p>
              )}
              {person.affiliation && (
                <p className="font-inter text-[#555555] mb-6">
                  {person.affiliation}
                </p>
              )}
              <div className="font-inter text-[#555555] leading-relaxed space-y-4">
                <p className="text-sm md:text-base px-4 md:px-0">
                  {person.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
