'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function OpportunitiesSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here - can be connected to your CMS later
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="bg-[#F8F8F8] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Jobs and Internships"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-transparent font-inter shadow-lg hover:shadow-xl transition-all duration-200"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#003366] transition-colors p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2"
                aria-label="Search opportunities"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
