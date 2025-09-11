'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from '@/lib/articles'

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
}

export default function TopArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles()
        // Get the first 3 articles for top articles section
        setArticles(fetchedArticles.slice(0, 3))
      } catch (err) {
        setError('Failed to load articles')
        console.error('Error fetching articles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <section className="bg-[#F8F8F8] py-16" role="region" aria-label="Top Articles">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
              Top Articles
            </h2>
            <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full"></div>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-[#555555]">Loading top articles...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#F8F8F8] py-16" role="region" aria-label="Top Articles">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
              Top Articles
            </h2>
            <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full"></div>
          </div>
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section className="bg-[#F8F8F8] py-16" role="region" aria-label="Top Articles">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
              Top Articles
            </h2>
            <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full"></div>
          </div>
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#FDB813]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#FDB813]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-merriweather text-xl font-semibold text-[#1A1A1A] mb-2">
                No Articles Yet
              </h3>
              <p className="font-inter text-[#555555] leading-relaxed">
                We're working on bringing you the latest research and insights. Check back soon for our upcoming articles and publications.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F8F8F8] py-16" role="region" aria-label="Top Articles">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Top Articles
          </h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full"></div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[#FDB813] focus-within:ring-offset-2"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-merriweather text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2 sm:mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[#FDB813] mb-3 sm:mb-4 font-medium">
                  {article.author} • {article.date}
                </p>
                <p className="font-inter text-sm sm:text-base text-[#555555] leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/media/${article.id}`}
                  className="inline-flex items-center font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-md px-2 py-1 text-sm sm:text-base group"
                >
                  Read More
                  <svg className="ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
