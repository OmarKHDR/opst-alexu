'use client'

import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { Search, ExternalLink, FileText, Download, Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPublications } from '@/lib/publications'

const categories = [
  'ALL PUBLICATIONS',
  'JOURNAL ARTICLES', 
  'CONFERENCE PROCEEDINGS',
  'POSTGRADUATE THESES',
  'UNDERGRADUATE THESES',
  'INTELLECTUAL PROPERTIES'
]

interface Publication {
  id: string;
  type: string;
  title: string;
  authors: string;
  year: string;
  journalName?: string;
  impactFactor?: string;
  citations?: string;
  place?: string;
  supervisor?: string;
  field?: string;
  defenceDate?: string;
  status?: string;
  category?: string;
  color?: string;
  readURL?: string;
  doiUrl?: string;
  citeUrl?: string;
  view_Theses_Url?: string;
  abstractUrl?: string;
  attachmentUrl?: string;
  presentationUrl?: string;
  detailsUrl?: string;
}

const getPublicationColor = (type: string) => {
  switch (type) {
    case 'JOURNAL ARTICLES':
      return 'border-l-[#FDB813]'
    case 'CONFERENCE PROCEEDINGS':
      return 'border-l-[#003366]'
    case 'POSTGRADUATE THESES':
      return 'border-l-[#3399FF]'
    case 'UNDERGRADUATE THESES':
      return 'border-l-[#00CC66]'
    case 'INTELLECTUAL PROPERTIES':
      return 'border-l-[#9966CC]'
    default:
      return 'border-l-[#FDB813]'
  }
}

const getPublicationCategory = (type: string) => {
  return type || 'ALL PUBLICATIONS'
}

const mapContentfulToPublication = (pub: Publication): Publication => {
  const category = getPublicationCategory(pub.type)
  const color = getPublicationColor(pub.type)
  
  return {
    ...pub,
    category,
    color,
  }
}

export default function PublicationsSection() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('ALL PUBLICATIONS')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getPublications()
        const transformedData = data.map(mapContentfulToPublication)
        setPublications(transformedData)
      } catch (error) {
        console.error('Failed to fetch publications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

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
        {/* Search Bar and Filter Button */}
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
            
            {/* Filter Button */}
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 border border-gray-300 rounded-2xl hover:bg-[#F8F8F8] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 ${
                  showFilters ? 'border-[#FDB813] bg-[#F8F8F8]' : 'hover:border-[#FDB813]'
                }`}
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
                  
                  {publication.journalName && (
                    <p className="font-inter text-xs sm:text-sm text-[#555555] mb-3 sm:mb-4 font-medium">
                      {publication.journalName}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {publication.readURL && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.readURL} target="_blank" rel="noopener noreferrer">
                          <Eye size={16} />
                          <span className="ml-1">READ</span>
                        </a>
                      </Button>
                    )}
                    {publication.doiUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.doiUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                          <span className="ml-1">DOI LINK</span>
                        </a>
                      </Button>
                    )}
                    {publication.citeUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.citeUrl} target="_blank" rel="noopener noreferrer">
                          <FileText size={16} />
                          <span className="ml-1">CITE</span>
                        </a>
                      </Button>
                    )}
                    {publication.view_Theses_Url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.view_Theses_Url} target="_blank" rel="noopener noreferrer">
                          <Eye size={16} />
                          <span className="ml-1">VIEW THESES</span>
                        </a>
                      </Button>
                    )}
                    {publication.abstractUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.abstractUrl} target="_blank" rel="noopener noreferrer">
                          <FileText size={16} />
                          <span className="ml-1">ABSTRACT</span>
                        </a>
                      </Button>
                    )}
                    {publication.attachmentUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.attachmentUrl} target="_blank" rel="noopener noreferrer">
                          <Download size={16} />
                          <span className="ml-1">ATTACHMENTS</span>
                        </a>
                      </Button>
                    )}
                    {publication.presentationUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.presentationUrl} target="_blank" rel="noopener noreferrer">
                          <FileText size={16} />
                          <span className="ml-1">PRESENTATION</span>
                        </a>
                      </Button>
                    )}
                    {publication.detailsUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-inter text-xs border-gray-300 hover:bg-white hover:border-[#FDB813] hover:text-[#003366] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        asChild
                      >
                        <a href={publication.detailsUrl} target="_blank" rel="noopener noreferrer">
                          <Eye size={16} />
                          <span className="ml-1">DETAILS</span>
                        </a>
                      </Button>
                    )}
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
                         publication.defenceDate ? 'DEFENCE' : 'INFO'}
                      </div>
                      <div className="font-inter text-xs sm:text-sm font-medium">
                        {publication.citations || publication.defenceDate || '-'}
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
