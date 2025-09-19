'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, Users, MapPin, Calendar, Tag } from 'lucide-react'
import { getActivities, Activity } from '@/lib/activities'

const categories = ['All', 'Seminars', 'Workshops', 'Events']

export default function LabActivitiesSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const data = await getActivities()
        setActivities(data)
      } catch (err) {
        setError('Failed to load activities')
        console.error('Error fetching activities:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const filteredActivities = activities.filter(activity =>
    activeCategory === 'All' || activity.category === activeCategory
  )

  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Lab Activities
          </h2>
          <div className="w-20 h-1 bg-[#3399FF] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Engage with our vibrant research community through seminars, workshops, and special events
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0">
          <div className="flex gap-1.5 sm:gap-2 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl whitespace-nowrap font-inter text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 ${
                  activeCategory === category
                    ? 'bg-[#003366] text-white shadow-md'
                    : 'text-[#555555] hover:text-[#003366] hover:bg-[#F8F8F8]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003366]"></div>
            <p className="mt-4 text-[#555555] font-inter">Loading activities...</p>
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

        {/* Activities List */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {!loading && !error && filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#555555] font-inter">No activities found.</p>
            </div>
          )}

          {filteredActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 transform hover:-translate-y-1 border border-gray-100 group relative overflow-hidden"
            >
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3399FF]/5 to-[#FDB813]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Activity Image */}
                <div className="w-full sm:w-32 h-40 sm:h-24 flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl shadow-md order-1 sm:order-none">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    width={128}
                    height={96}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 order-2 sm:order-none">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                    <h3 className="font-merriweather text-lg sm:text-xl font-bold text-[#1A1A1A] group-hover:text-[#003366] transition-colors duration-200">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Tag size={12} className="sm:w-3.5 sm:h-3.5 text-[#FDB813]" />
                      <span className="px-2 py-1 bg-[#FDB813]/10 text-[#003366] rounded-full text-xs font-inter font-medium border border-[#FDB813]/20">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="font-inter text-[#555555] leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-3 sm:line-clamp-none">
                    {activity.description}
                  </p>
                  
                  {/* Activity Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                      <Clock size={12} className="sm:w-3.5 sm:h-3.5 text-[#FDB813]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Duration</span>
                        <span className="font-inter text-[#555555]">{activity.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                      <Users size={12} className="sm:w-3.5 sm:h-3.5 text-[#3399FF]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Available</span>
                        <span className="font-inter text-[#555555]">{activity.seatsAvailable} seats</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                      <MapPin size={12} className="sm:w-3.5 sm:h-3.5 text-[#003366]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Location</span>
                        <span className="font-inter text-[#555555] line-clamp-1">{activity.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                      <Calendar size={12} className="sm:w-3.5 sm:h-3.5 text-green-600" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Schedule</span>
                        <span className="font-inter text-[#555555]">{activity.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex gap-3 sm:gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="font-inter font-medium text-[#1A1A1A]">Level:</span>
                        <span className="font-inter text-[#555555]">{activity.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-inter font-medium text-[#1A1A1A]">Speaker:</span>
                        <span className="font-inter text-[#555555] line-clamp-1">{activity.speaker}</span>
                      </div>
                    </div>
                    
                    <Link href={`/contact?subject=${encodeURIComponent(`Registration for ${activity.title}`)}&message=${encodeURIComponent(`I am interested in registering for the ${activity.title} activity.`)}`}>
                      <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-4 sm:px-6 py-2 w-full sm:w-auto text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 group-hover:scale-105">
                        REGISTER
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
