'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getTimelineEvents, TimelineEvent } from '@/lib/timeline'

export default function LabHistory() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getTimelineEvents()
        setEvents(fetchedEvents)
      } catch (err) {
        setError('Failed to load timeline events')
        console.error('Error fetching timeline events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className="bg-[#F8F8F8] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-[#555555]">Loading timeline...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#F8F8F8] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return (
      <section className="bg-[#F8F8F8] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#FDB813]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#FDB813]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-merriweather text-2xl font-bold text-[#1A1A1A] mb-4">
              Our History
            </h2>
            <p className="font-inter text-[#555555] leading-relaxed">
              We're working on bringing you our timeline. Check back soon.
            </p>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="bg-[#F8F8F8] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center md:text-left">
            our history
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 bg-[#FDB813] h-full"></div>
            
            {/* Mobile Timeline Line - Left aligned */}
            <div className="md:hidden absolute left-6 w-0.5 bg-[#FDB813] h-full"></div>

            {/* Timeline Events */}
            <div className="space-y-6 md:space-y-8">
              {events.map((event: TimelineEvent, index: number) => (
                <div key={event.id} className="relative">
                  {/* Desktop Timeline Dot */}
                  <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10 ${
                    event.isLabCreated ? 'bg-[#003366] border-2 border-white shadow-lg' : 'bg-[#FDB813]'
                  }`}></div>

                  {/* Mobile Timeline Dot */}
                  <div className={`md:hidden absolute left-6 transform -translate-x-1/2 w-3 h-3 rounded-full z-10 ${
                    event.isLabCreated ? 'bg-[#003366] border-2 border-white shadow-lg' : 'bg-[#FDB813]'
                  }`}></div>

                  {/* Event Content */}
                  <div className={`w-full md:flex ${event.side === 'left' ? 'md:justify-start' : 'md:justify-end'}`}>
                    {/* Mobile Layout - Always left aligned with padding */}
                    <div className="md:hidden pl-12 pr-2">
                      <div className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border max-w-[calc(100vw-3rem)] mx-auto ${
                      event.isLabCreated ? 'border-[#003366]/20 bg-gradient-to-br from-[#003366]/5 to-white' : 'border-gray-100'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            event.isLabCreated
                              ? 'text-white bg-[#003366]'
                              : 'text-[#FDB813] bg-[#FDB813]/10'
                          }`}>
                            {event.eventDate}
                          </span>
                        </div>
                        <h3 className={`font-merriweather text-base font-bold mb-2 ${
                          event.isLabCreated ? 'text-[#003366]' : 'text-[#1A1A1A]'
                        }`}>
                          {event.title}
                        </h3>

                        {event.image && (
                          <div className="w-full h-20 mb-3 rounded-lg overflow-hidden">
                            <Image
                              src={event.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                              alt={event.title}
                              width={200}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div
                          className="font-inter text-xs text-[#555555] leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                      </div>
                    </div>

                    {/* Desktop Layout - Alternating sides */}
                    <div className={`hidden md:block md:w-5/12 ${event.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 border ${
                        event.isLabCreated ? 'border-[#003366]/20 bg-gradient-to-br from-[#003366]/5 to-white' : 'border-gray-100'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            event.isLabCreated
                              ? 'text-white bg-[#003366]'
                              : 'text-[#FDB813] bg-[#FDB813]/10'
                          }`}>
                            {event.eventDate}
                          </span>
                        </div>
                        <h3 className={`font-merriweather text-lg font-bold mb-3 ${
                          event.isLabCreated ? 'text-[#003366]' : 'text-[#1A1A1A]'
                        }`}>
                          {event.title}
                        </h3>

                        {event.image && (
                          <div className="w-full h-24 mb-4 rounded-xl overflow-hidden">
                            <Image
                              src={event.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                              alt={event.title}
                              width={200}
                              height={96}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div
                          className="font-inter text-sm text-[#555555] leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
