'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { Search, ExternalLink, FileText, Download, Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  'ALL PUBLICATIONS',
  'JOURNAL ARTICLES', 
  'CONFERENCE PROCEEDINGS',
  'POSTGRADUATE THESES',
  'UNDERGRADUATE THESES',
  'INTELLECTUAL PROPERTIES'
]

const publications = [
  {
    id: 1,
    type: "JOURNAL ARTICLE",
    title: "Novel Approaches to Optical Communication Systems",
    authors: "Ahmed M. Hassan, Sarah L. Johnson, John D. Smith",
    journal: "Journal of Lightwave Technology",
    year: "2025",
    impactFactor: "4.5",
    citations: "31",
    category: "JOURNAL ARTICLES",
    color: "border-l-[#FDB813]",
    actions: {
      "READ": "/publication/1",
      "DOI LINK": "https://doi.org/10.1234/example-doi",
      "CITE": "/publication/1#cite"
    }
  },
  {
    id: 2,
    type: "POSTGRADUATE THESES",
    title: "Machine Learning Applications in Wireless Sensor Networks",
    authors: "PhD Thesis - Aya Hassan Mohamed",
    supervisor: "Supervised by: Prof. Ahmed Khalil, Dr. Sarah Ibrahim",
    year: "2024",
    field: "Electrical Engineering",
    defence: "June 2024",
    category: "POSTGRADUATE THESES",
    color: "border-l-[#3399FF]",
    actions: {
      "VIEW THESES": "/theses/2",
      "ABSTRACT": "/theses/2#abstract",
      "ATTACHMENTS": "/theses/2#attachments"
    }
  },
  {
    id: 3,
    type: "CONFERENCE PROCEEDING",
    title: "Blockchain Integration in IoT Security Frameworks",
    authors: "Hassan A. Mohamed, Amira S. Ahmed Ghanem",
    year: "2025",
    place: "Paris, France",
    citations: "8",
    category: "CONFERENCE PROCEEDINGS",
    color: "border-l-[#003366]",
    actions: {
      "VIEW": "/conference/3",
      "PRESENTATION": "/conference/3#slides",
      "ATTACHMENTS": "/conference/3#attachments"
    }
  },
  {
    id: 4,
    type: "UNDERGRADUATE THESES",
    title: "Smart Home Automation System Using IoT Technologies",
    authors: "Bachelor's Thesis - Yasmin Mohamed Ali",
    supervisor: "Supervised by: Dr. Ahmed Hassan, Eng. Mahmoud Farouk",
    year: "2022",
    field: "Electrical Engineering", 
    defence: "June 2024",
    category: "UNDERGRADUATE THESES",
    color: "border-l-[#00CC66]",
    actions: {
      "VIEW THESES": "/theses/4",
      "ABSTRACT": "/theses/4#abstract",
      "ATTACHMENTS": "/theses/4#attachments"
    }
  },
  {
    id: 5,
    type: "INTELLECTUAL PROPERTY",
    title: "Adaptive Antenna Array System for 6G Communications",
    authors: "Inventors: Ahmed M. Hassan, Fatma A. Ahmed, Amira S. Ahmed",
    year: "2023",
    status: "Granted",
    field: "Communication",
    category: "INTELLECTUAL PROPERTIES",
    color: "border-l-[#9966CC]",
    actions: {
      "DETAILS": "/ip/5",
      "ABSTRACT": "/ip/5#abstract",
      "ATTACHMENTS": "/ip/5#attachments"
    }
  }
]

export default function PublicationsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL PUBLICATIONS')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Filter publications based on category and search
  const filteredPublications = publications.filter(publication => {
    const matchesCategory = activeCategory === 'ALL PUBLICATIONS' || publication.category === activeCategory
    const matchesSearch = publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         publication.authors.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setShowFilters(false)
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'READ':
      case 'VIEW':
      case 'VIEW THESES':
        return <Eye size={16} />
      case 'DOI LINK':
        return <ExternalLink size={16} />
      case 'CITE':
        return <FileText size={16} />
      case 'ABSTRACT':
        return <FileText size={16} />
      case 'ATTACHMENTS':
        return <Download size={16} />
      case 'PRESENTATION':
        return <FileText size={16} />
      case 'DETAILS':
        return <Eye size={16} />
      default:
        return <FileText size={16} />
    }
  }

  const isExternalLink = (url: string) => /^https?:\/\//.test(url)

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Category Filters - Desktop */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 bg-[#F8F8F8] p-3 rounded-2xl shadow-lg border border-gray-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-xl font-inter text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 ${
                  activeCategory === category
                    ? 'bg-white text-[#003366] shadow-md border border-[#FDB813]/20'
                    : 'text-[#555555] hover:text-[#003366] hover:bg-white/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar and Mobile Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search keywords in publications"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-transparent font-inter shadow-lg hover:shadow-xl transition-all duration-200"
              />
              <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555555]" />
            </div>
            
            {/* Mobile Filter Button */}
            <div className="relative md:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-300 rounded-2xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
                aria-label="Filter options"
              >
                <svg className="w-5 h-5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </button>
              
              {/* Mobile Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-inter font-semibold text-[#1A1A1A]">Filter Publications</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg font-inter text-sm transition-colors ${
                            activeCategory === category
                              ? 'bg-[#FDB813]/10 text-[#003366] font-medium'
                              : 'text-[#555555] hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Display */}
        {activeCategory !== 'ALL PUBLICATIONS' && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2">
              <span className="font-inter text-sm text-[#555555]">Filtered by:</span>
              <div className="flex items-center gap-2 bg-[#FDB813]/10 text-[#003366] px-3 py-1 rounded-full border border-[#FDB813]/20">
                <span className="font-inter text-sm font-medium">{activeCategory}</span>
                <button
                  onClick={() => handleCategoryChange('ALL PUBLICATIONS')}
                  className="hover:bg-[#FDB813]/20 rounded-full p-1 transition-colors"
                  aria-label="Clear filter"
                >
                  <X size={12} />
                </button>
              </div>
              <span className="font-inter text-sm text-[#555555]">
                ({filteredPublications.length} {filteredPublications.length === 1 ? 'publication' : 'publications'})
              </span>
            </div>
          </div>
        )}

        {/* Publications List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {filteredPublications.map((publication) => (
              <div 
                key={publication.id} 
                className={`bg-[#F8F8F8] rounded-xl sm:rounded-2xl overflow-hidden border-l-4 ${publication.color} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group`}
              >
                {/* Publication Header */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="text-xs font-inter text-[#555555] mb-1 sm:mb-2 uppercase tracking-wide">
                      {publication.type}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-2 h-2 bg-[#FDB813] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <h3 className="font-merriweather text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2 sm:mb-3 group-hover:text-[#003366] transition-colors duration-200">
                    {publication.title}
                  </h3>
                  
                  <p className="font-inter text-sm sm:text-base text-[#555555] mb-3 sm:mb-4">
                    {publication.authors}
                  </p>
                  
                  {publication.supervisor && (
                    <p className="font-inter text-xs sm:text-sm text-[#555555] mb-3 sm:mb-4">
                      {publication.supervisor}
                    </p>
                  )}
                  
                  {publication.journal && (
                    <p className="font-inter text-xs sm:text-sm text-[#555555] mb-3 sm:mb-4 font-medium">
                      {publication.journal}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {Object.entries(publication.actions).map(([action, href], index) => {
                      const buttonEl = (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          disabled={!href}
                          title={!href ? 'No link available' : undefined}
                        >
                          {getActionIcon(action)}
                          <span className="ml-1">{action}</span>
                        </Button>
                      )

                      if (!href) return buttonEl

                      return isExternalLink(href)
                        ? (
                            <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
                              {buttonEl}
                            </a>
                          )
                        : (
                            <NextLink key={index} href={href} className="inline-block">
                              {buttonEl}
                            </NextLink>
                          )
                    })}
                  </div>
                </div>

                {/* Publication Details Bar */}
                <div className="bg-[#003366] text-white px-4 sm:px-6 py-2 sm:py-3 group-hover:bg-[#003366]/90 transition-colors duration-200">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div>
                      <div className="font-inter text-xs opacity-75 mb-1">YEAR</div>
                      <div className="font-inter text-xs sm:text-sm font-medium">{publication.year}</div>
                    </div>
                    <div>
                      <div className="font-inter text-xs opacity-75 mb-1">
                        {publication.impactFactor ? 'IMPACT FACTOR' : 
                         publication.field ? 'FIELD' : 
                         publication.place ? 'PLACE' : 
                         publication.status ? 'STATUS' : 'INFO'}
                      </div>
                      <div className="font-inter text-xs sm:text-sm font-medium">
                        {publication.impactFactor || publication.field || publication.place || publication.status || '-'}
                      </div>
                    </div>
                    <div>
                      <div className="font-inter text-xs opacity-75 mb-1">
                        {publication.citations ? 'CITATIONS' : 
                         publication.defence ? 'DEFENCE' : 'INFO'}
                      </div>
                      <div className="font-inter text-xs sm:text-sm font-medium">
                        {publication.citations || publication.defence || '-'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <p className="font-inter text-[#555555] text-lg mb-4">
                No publications found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('ALL PUBLICATIONS')
                  setSearchQuery('')
                }}
                className="font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
