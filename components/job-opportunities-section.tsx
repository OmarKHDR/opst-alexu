'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Building2, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react'
import { getOpportunities, Opportunity } from '@/lib/opportunities'

export default function JobOpportunitiesSection() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getOpportunities()
        const jobOpportunities = data.filter(opp => opp.type === 'Job Opportunity')
        setOpportunities(jobOpportunities)
      } catch (error) {
        console.error('Failed to fetch job opportunities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  const displayedJobs = showAll ? opportunities : opportunities.slice(0, 4)

  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Job Opportunities
          </h2>
          <div className="w-20 h-1 bg-[#3399FF] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Discover exciting career opportunities in optics, photonics, and renewable energy
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {displayedJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group relative overflow-hidden"
            >
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3399FF]/5 to-[#FDB813]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#003366] to-[#3399FF] rounded-xl sm:rounded-2xl flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                    <Briefcase size={16} className="sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-merriweather text-base sm:text-lg font-bold text-[#1A1A1A] mb-1 group-hover:text-[#003366] transition-colors duration-200">
                      {job.title}
                    </h3>
                    <p className="font-inter text-[#555555] text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                      <Building2 size={12} className="sm:w-3.5 sm:h-3.5" />
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs">
                  <div className="flex items-center gap-1 text-[#555555] bg-[#F8F8F8] px-2 py-1 rounded-full">
                    <MapPin size={10} className="sm:w-3 sm:h-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#555555] bg-[#F8F8F8] px-2 py-1 rounded-full">
                    <Briefcase size={10} className="sm:w-3 sm:h-3" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#555555] bg-[#F8F8F8] px-2 py-1 rounded-full">
                    <Clock size={10} className="sm:w-3 sm:h-3" />
                    <span>{job.experience}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-inter text-[#555555] leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-3 sm:line-clamp-none">
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-inter shadow-sm transition-all duration-200 ${
                        tag.includes('$') 
                          ? 'bg-green-100 text-green-800 border border-green-200 font-semibold' 
                          : tag === 'Senior' || tag === 'Scientist' 
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : tag === 'Junior' || tag === 'Technician'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : tag === 'remote' || tag === 'hybrid'
                          ? 'bg-orange-100 text-orange-800 border border-orange-200'
                          : 'bg-[#F8F8F8] text-[#555555] border border-gray-200'
                      }`}
                    >
                      {tag.includes('$') && <DollarSign size={8} className="sm:w-2.5 sm:h-2.5 inline mr-1" />}
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Apply Button */}
                <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-4 sm:px-6 py-2 w-full text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 group-hover:scale-[1.02]">
                  APPLY NOW
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {opportunities.length > 4 && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] font-inter font-medium px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
            >
              {showAll ? 'SHOW LESS' : 'SEE MORE OPPORTUNITIES'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
