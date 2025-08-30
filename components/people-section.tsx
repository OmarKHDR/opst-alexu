'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Filter, FileText, Linkedin, Globe, Mail, X } from 'lucide-react'

const academicCategories = [
  'All',
  'Professor',
  'Associate Professor', 
  'Assistant Professor',
  'PhD Student',
  'Master Student',
  'Research Assistant',
  'Alumni'
]

const people = [
  {
    id: 1,
    name: "Prof. Ahmed Hassan",
    title: "Professor",
    degree: "PhD in Optical Engineering",
    tags: ["Optical Communications", "Fiber Optics", "Signal Processing"],
    affiliation: "Affiliated with Alexandria University",
    description: "Leading expert in optical communication systems with over 20 years of research experience. Specializes in advanced fiber optic technologies and high-speed data transmission systems.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`,
    category: "Professor",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "ahmed.hassan@alexu.edu.eg"
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    title: "Associate Professor",
    degree: "PhD in Photonics",
    tags: ["Photonic Devices", "Laser Systems", "Quantum Optics"],
    affiliation: "Affiliated with Alexandria University",
    description: "Renowned researcher in photonic device development and quantum optical systems. Her work focuses on next-generation laser technologies and their applications.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`,
    category: "Associate Professor",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "sarah.johnson@alexu.edu.eg"
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    title: "Assistant Professor",
    degree: "PhD in Solar Technology",
    tags: ["Solar Cells", "Renewable Energy", "Materials Science"],
    affiliation: "Affiliated with Alexandria University",
    description: "Specialist in solar technology and renewable energy systems. Research focuses on improving photovoltaic efficiency and developing sustainable energy solutions.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`,
    category: "Assistant Professor",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "michael.chen@alexu.edu.eg"
  },
  {
    id: 4,
    name: "Aya Mohamed",
    title: "PhD Student",
    degree: "MSc in Electrical Engineering",
    tags: ["Machine Learning", "Optical Networks", "AI Applications"],
    affiliation: "Affiliated with Alexandria University",
    description: "PhD candidate researching machine learning applications in optical communication networks. Working on AI-driven optimization of fiber optic systems.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`,
    category: "PhD Student",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "aya.mohamed@alexu.edu.eg"
  },
  {
    id: 5,
    name: "Omar Khalil",
    title: "Master Student",
    degree: "BSc in Electronics Engineering",
    tags: ["Photonic Crystals", "Optical Sensors", "Device Fabrication"],
    affiliation: "Affiliated with Alexandria University",
    description: "Master's student focusing on photonic crystal structures and their applications in optical sensing. Research involves novel device fabrication techniques.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`,
    category: "Master Student",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "omar.khalil@alexu.edu.eg"
  },
  {
    id: 6,
    name: "Fatma Ali",
    title: "Research Assistant",
    degree: "BSc in Physics",
    tags: ["Laboratory Management", "Equipment Maintenance", "Data Analysis"],
    affiliation: "Affiliated with Alexandria University",
    description: "Research assistant supporting laboratory operations and experimental research. Specializes in equipment maintenance and data analysis for optical experiments.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`,
    category: "Research Assistant",
    cv: "#",
    linkedin: "#",
    orcid: "#",
    email: "fatma.ali@alexu.edu.eg"
  }
]

export default function PeopleSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 4

  // Filter people based on category and search
  const filteredPeople = people.filter(person => {
    const matchesCategory = activeCategory === 'All' || person.category === activeCategory
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.degree.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPeople = filteredPeople.slice(startIndex, startIndex + itemsPerPage)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
    setShowFilters(false)
  }

  return (
    <section className="bg-white py-16" role="region" aria-label="Our People">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Our People
          </h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Meet our diverse team of researchers, faculty, and students advancing the frontiers of optics, photonics, and solar technology.
          </p>
        </div>

        {/* Category Filters - Desktop */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 bg-[#F8F8F8] p-3 rounded-2xl shadow-sm border border-gray-100">
            {academicCategories.map((category) => (
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
                placeholder="Search by name, title, degree, or expertise"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-[#3399FF] font-inter shadow-sm hover:shadow-md transition-shadow"
                aria-label="Search team members"
              />
              <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555555]" />
            </div>
            <div className="relative md:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-[#F8F8F8] hover:border-[#FDB813] transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
                aria-label="Filter options"
              >
                <Filter size={20} className="text-[#555555]" />
              </button>
              
              {/* Mobile Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-inter font-semibold text-[#1A1A1A]">Filter by Position</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {academicCategories.map((category) => (
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
        {activeCategory !== 'All' && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2">
              <span className="font-inter text-sm text-[#555555]">Filtered by:</span>
              <div className="flex items-center gap-2 bg-[#FDB813]/10 text-[#003366] px-3 py-1 rounded-full border border-[#FDB813]/20">
                <span className="font-inter text-sm font-medium">{activeCategory}</span>
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="hover:bg-[#FDB813]/20 rounded-full p-1 transition-colors"
                  aria-label="Clear filter"
                >
                  <X size={12} />
                </button>
              </div>
              <span className="font-inter text-sm text-[#555555]">
                ({filteredPeople.length} {filteredPeople.length === 1 ? 'person' : 'people'})
              </span>
            </div>
          </div>
        )}

        {/* People Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {currentPeople.map((person) => (
            <div 
              key={person.id} 
              className="bg-[#F8F8F8] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 focus-within:ring-2 focus-within:ring-[#FDB813] focus-within:ring-offset-2"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Profile Image */}
                <div className="w-full sm:w-1/3 h-48 sm:h-auto overflow-hidden rounded-lg sm:rounded-xl">
                  <Image
                    src={person.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                    alt={`${person.name} profile photo`}
                    width={300}
                    height={192}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col">
                  {/* Basic Info */}
                  <div className="mb-2 sm:mb-3">
                    <h3 className="font-merriweather text-lg sm:text-xl font-bold text-[#1A1A1A] mb-1">
                      {person.name}
                    </h3>
                    <p className="font-inter text-[#003366] font-semibold text-xs sm:text-sm mb-1">
                      {person.title}
                    </p>
                    <p className="font-inter text-[#555555] text-xs sm:text-sm font-medium">
                      {person.degree}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    {person.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-white text-[#555555] rounded-full text-xs sm:text-sm font-inter border border-gray-200 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="font-inter text-[#555555] mb-2 sm:mb-3 font-medium text-xs sm:text-sm">
                    {person.affiliation}
                  </p>

                  <p className="font-inter text-[#555555] leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm line-clamp-3 sm:line-clamp-none">
                    {person.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-2 sm:gap-3 mt-auto">
                    <a
                      href={person.cv}
                      className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-white hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group"
                      title="Download CV"
                      aria-label={`Download ${person.name}'s CV`}
                    >
                      <FileText size={14} className="sm:w-4 sm:h-4 text-[#555555] group-hover:text-[#003366] transition-colors" />
                    </a>
                    <a
                      href={person.linkedin}
                      className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-white hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group"
                      title="LinkedIn Profile"
                      aria-label={`Visit ${person.name}'s LinkedIn profile`}
                    >
                      <Linkedin size={14} className="sm:w-4 sm:h-4 text-[#555555] group-hover:text-[#003366] transition-colors" />
                    </a>
                    <a
                      href={person.orcid}
                      className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-white hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group"
                      title="ORCID Profile"
                      aria-label={`Visit ${person.name}'s ORCID profile`}
                    >
                      <Globe size={14} className="sm:w-4 sm:h-4 text-[#555555] group-hover:text-[#003366] transition-colors" />
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-white hover:border-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 group"
                      title="Send Email"
                      aria-label={`Send email to ${person.name}`}
                    >
                      <Mail size={14} className="sm:w-4 sm:h-4 text-[#555555] group-hover:text-[#003366] transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPeople.length === 0 && (
          <div className="text-center py-12">
            <p className="font-inter text-[#555555] text-lg mb-4">
              No team members found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All')
                setSearchQuery('')
                setCurrentPage(1)
              }}
              className="font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2" role="navigation" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-xl font-inter font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 ${
                    page === currentPage
                      ? 'bg-[#003366] text-white shadow-lg'
                      : 'bg-white text-[#555555] hover:bg-[#F8F8F8] border border-gray-300 shadow-sm hover:shadow-md'
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
