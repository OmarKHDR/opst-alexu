'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2, MapPin, Clock, Users } from 'lucide-react'
import { getOpportunities, Opportunity } from '@/lib/opportunities'

export default function ResearchOpportunitiesSection() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getOpportunities()
        const researchOpportunities = data.filter(opp => opp.type === 'Research Opportunity')
        setOpportunities(researchOpportunities)
      } catch (error) {
        console.error('Failed to fetch research opportunities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  const displayedOpportunities = showAll ? opportunities : opportunities.slice(0, 2)

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Research Opportunities
          </h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Join our research community and advance your academic career with exciting opportunities
          </p>
        </div>

        {/* Opportunities List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {displayedOpportunities.map((opportunity) => (
              <div 
                key={opportunity.id} 
                className="bg-[#F8F8F8] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group relative overflow-hidden"
              >
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FDB813]/5 to-[#3399FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  {/* Company Logo */}
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#003366] to-[#3399FF] rounded-xl sm:rounded-2xl flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                    <Building2 size={20} className="sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-merriweather text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#003366] transition-colors duration-200">
                      {opportunity.title}
                    </h3>
                    <p className="font-inter text-[#555555] mb-3 sm:mb-4 font-medium flex items-center gap-2 text-sm">
                      <Building2 size={14} className="sm:w-4 sm:h-4" />
                      {opportunity.company}
                    </p>
                    <p className="font-inter text-[#555555] leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-3 sm:line-clamp-none">
                      {opportunity.description}
                    </p>
                    
                    {/* Opportunity Details */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[#555555] bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm">
                        <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[#555555] bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm">
                        <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[#555555] bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm">
                        <Users size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>Deadline: {opportunity.deadline}</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                      {opportunity.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-inter shadow-sm transition-all duration-200 ${
                            tag === 'funded' || tag === 'fellowship' || tag === 'research grant' ? 'bg-green-100 text-green-800 border border-green-200' :
                            tag === 'PhD' || tag === 'Postdoc' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            tag === 'Master\'s' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            tag === 'Undergraduate' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                            'bg-white text-[#555555] border border-gray-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex-shrink-0 w-full sm:w-auto">
                    <Link href={`/contact?subject=${encodeURIComponent(`Application for ${opportunity.title}`)}&message=${encodeURIComponent(`I am interested in applying for the ${opportunity.title} research opportunity at ${opportunity.company}.`)}`}>
                      <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-4 sm:px-6 py-2 w-full sm:w-auto text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 group-hover:scale-105">
                        APPLY NOW
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {opportunities.length > 2 && (
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
      </div>
    </section>
  )
}
