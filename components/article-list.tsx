'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ArticleModal from './article-modal'
import { getArticles } from '@/lib/articles'

interface Article {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  image: string;
}

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const articlesPerPage = 4

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles()
        setArticles(fetchedArticles)
      } catch (err) {
        setError('Failed to load articles')
        console.error('Error fetching articles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const totalPages = Math.ceil(articles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage)

  const handleReadMore = (articleId: string) => {
    setSelectedArticleId(articleId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArticleId(null)
  }

  if (loading) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
              <p className="mt-4 text-[#555555]">Loading articles...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-[#FDB813]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#FDB813]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
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
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Articles List */}
          <div className="space-y-6 sm:space-y-8">
            {currentArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-1 order-2 sm:order-1">
                    <h3 className="font-merriweather text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-2">
                      {article.title}
                    </h3>
                    <p className="font-inter text-sm text-[#FDB813] mb-3 sm:mb-4">
                      {article.author}
                    </p>
                    <p className="font-inter text-sm sm:text-base text-[#555555] leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                      {article.excerpt}
                    </p>
                    <button
                      onClick={() => handleReadMore(article.id)}
                      className="font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded px-1 py-0.5"
                    >
                      Read More
                    </button>
                  </div>
                  <div className="w-full sm:w-32 h-48 sm:h-24 flex-shrink-0 order-1 sm:order-2">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded font-inter font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-[#003366] text-white'
                      : 'bg-white text-[#555555] hover:bg-[#F8F8F8] border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Article Modal */}
      <ArticleModal
        articleId={selectedArticleId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
