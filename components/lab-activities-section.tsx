'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Clock, Users, MapPin, Calendar, Tag } from 'lucide-react'

const categories = ['All', 'Seminars', 'Workshops', 'Events']

const activities = [
  {
    id: 1,
    title: "Weekly Research Seminar",
    description: "Regular presentations by lab members, visiting scholars, and guest speakers covering current research developments, methodological advances, and collaborative opportunities within the field of optics and photonics.",
    duration: "2 hours",
    remainingSeats: "25",
    location: "Conference Room A",
    date: "Every Wednesday",
    image: "/conference-presentation.png",
    category: "Seminars",
    level: "All Levels",
    speaker: "Various Researchers"
  },
  {
    id: 2,
    title: "Advanced Photonics Workshop",
    description: "Intensive hands-on training sessions designed to teach advanced laboratory techniques, equipment operation, and methodological approaches relevant to modern photonics and optical engineering research.",
    duration: "4 hours",
    remainingSeats: "15",
    location: "Practical Engineering Lab Hall A",
    date: "Monthly",
    image: "/conference-presentation.png",
    category: "Workshops",
    level: "Intermediate",
    speaker: "Dr. Sarah Johnson"
  },
  {
    id: 3,
    title: "Distinguished Guest Lecture",
    description: "Presentations by distinguished researchers, industry leaders, and international collaborators sharing cutting-edge research findings and emerging trends in engineering and technology applications.",
    duration: "2 hours",
    remainingSeats: "50",
    location: "Main Auditorium",
    date: "Quarterly",
    image: "/conference-presentation.png",
    category: "Events",
    level: "All Levels",
    speaker: "International Experts"
  }
]

export default function LabActivitiesSection() {
  const [activeCategory, setActiveCategory] = useState('All')

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
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 bg-white p-3 rounded-2xl shadow-lg border border-gray-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl font-inter text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 ${
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

        {/* Activities List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-1 border border-gray-100 group relative overflow-hidden"
            >
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3399FF]/5 to-[#FDB813]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative z-10 flex gap-6">
                {/* Activity Image */}
                <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    width={128}
                    height={96}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-merriweather text-xl font-bold text-[#1A1A1A] group-hover:text-[#003366] transition-colors duration-200">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-[#FDB813]" />
                      <span className="px-2 py-1 bg-[#FDB813]/10 text-[#003366] rounded-full text-xs font-inter font-medium border border-[#FDB813]/20">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="font-inter text-[#555555] leading-relaxed mb-4 text-sm">
                    {activity.description}
                  </p>
                  
                  {/* Activity Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <Clock size={14} className="text-[#FDB813]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Duration</span>
                        <span className="font-inter text-[#555555]">{activity.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users size={14} className="text-[#3399FF]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Available</span>
                        <span className="font-inter text-[#555555]">{activity.remainingSeats} seats</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin size={14} className="text-[#003366]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Location</span>
                        <span className="font-inter text-[#555555]">{activity.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar size={14} className="text-green-600" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Schedule</span>
                        <span className="font-inter text-[#555555]">{activity.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="font-inter font-medium text-[#1A1A1A]">Level:</span>
                        <span className="font-inter text-[#555555]">{activity.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-inter font-medium text-[#1A1A1A]">Speaker:</span>
                        <span className="font-inter text-[#555555]">{activity.speaker}</span>
                      </div>
                    </div>
                    
                    <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 group-hover:scale-105">
                      REGISTER
                    </Button>
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
