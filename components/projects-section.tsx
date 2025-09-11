'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getProjects } from '@/lib/projects'
import { getResearchTopics } from '@/lib/research-topics'
import type { Project } from '@/lib/projects'
import type { ResearchTopic } from '@/lib/research-topics'

interface ProjectsSectionProps {
  selectedTopicId?: string;
  onTopicChange?: (topicId: string) => void;
}

export default function ProjectsSection({ selectedTopicId, onTopicChange }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<ResearchTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, topicsData] = await Promise.all([
          getProjects(),
          getResearchTopics()
        ]);
        setProjects(projectsData);
        setCategories([
          { id: 'all', title: 'All Projects', description: '', image: '', projectsTags: [] },
          ...topicsData
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Update active category when selectedTopicId changes
  useEffect(() => {
    if (selectedTopicId) {
      const topic = categories.find(cat => cat.id === selectedTopicId)
      if (topic) {
        setActiveCategory(topic.title)
      }
    }
  }, [selectedTopicId, categories])

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category?.title === activeCategory
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3)

  const handleCategoryChange = (categoryTitle: string, categoryId: string) => {
    setActiveCategory(categoryTitle)
    if (onTopicChange && categoryId !== 'all') {
      onTopicChange(categoryId)
    }
  }

  return (
    <section id="projects-section" ref={sectionRef} className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Our Projects
          </h2>
          <div className="w-20 h-1 bg-[#3399FF] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Discover our ongoing and completed research projects across various domains
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl shadow-lg border border-gray-100">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.title, category.id)}
                className={`px-4 py-2 rounded-xl font-inter text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 ${
                  activeCategory === category.title
                    ? 'bg-[#003366] text-white shadow-md'
                    : 'text-[#555555] hover:text-[#003366] hover:bg-[#F8F8F8]'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name, description, or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-transparent font-inter shadow-lg hover:shadow-xl transition-all duration-200"
            />
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555555]" />
          </div>
        </div>

        {/* Projects List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {displayedProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Content */}
                  <div className="flex-1 order-2 sm:order-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <h3 className="font-merriweather text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2 sm:mb-0">
                        {project.name}
                      </h3>
                      {project.category && (
                        <span className="px-2 sm:px-3 py-1 bg-[#3399FF]/10 text-[#003366] rounded-full text-xs font-inter font-medium border border-[#3399FF]/20 self-start sm:ml-4">
                          {project.category.title}
                        </span>
                      )}
                    </div>
                    <p className="font-inter text-sm sm:text-base text-[#555555] leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-inter shadow-sm ${
                            tag === 'ongoing' ? 'bg-green-100 text-green-800 border border-green-200' :
                            tag === 'completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            tag === 'funded' || tag === 'research grant' || tag === 'government funded' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            tag === 'published' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                            tag === 'patent pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            'bg-[#F8F8F8] text-[#555555] border border-gray-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-2xl shadow-md order-1 sm:order-2">
                    <Image
                      src={project.image || `${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg`}
                      alt={project.name}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="font-inter text-[#555555] text-lg mb-4">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setSearchQuery('')
                }}
                className="font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* See More Button */}
          {filteredProjects.length > 3 && (
            <div className="text-center mt-8">
              <Button 
                onClick={() => setShowAll(!showAll)}
                className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] font-inter font-medium px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2"
              >
                {showAll ? 'SHOW LESS' : 'SEE MORE PROJECTS'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
