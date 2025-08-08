'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const articles = [
  {
    id: 1,
    title: "Article Title",
    author: "author name",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus lectus metus sit amet quam. Nam urna sem, imperdiet non mauris euismod, scelerisque...",
    image: "/images/research-placeholder.png"
  },
  {
    id: 2,
    title: "Article Title",
    author: "author name",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus lectus metus sit amet quam. Nam urna sem, imperdiet non mauris euismod, scelerisque...",
    image: "/images/research-placeholder.png"
  },
  {
    id: 3,
    title: "Article Title",
    author: "author name",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus lectus metus sit amet quam. Nam urna sem, imperdiet non mauris euismod, scelerisque...",
    image: "/images/research-placeholder.png"
  },
  {
    id: 4,
    title: "Article Title",
    author: "author name",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus lectus metus sit amet quam. Nam urna sem, imperdiet non mauris euismod, scelerisque...",
    image: "/images/research-placeholder.png"
  },
  {
    id: 5,
    title: "Article Title",
    author: "author name",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus lectus metus sit amet quam. Nam urna sem, imperdiet non mauris euismod, scelerisque...",
    image: "/images/research-placeholder.png"
  },
  {
    id: 6,
    title: "Article Title",
    author: "author name",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus lectus metus sit amet quam. Nam urna sem, imperdiet non mauris euismod, scelerisque...",
    image: "/images/research-placeholder.png"
  }
]

export default function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 4
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage)

  return (
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
                    <Link 
                      href={`/media/${article.id}`}
                      className="font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium text-sm sm:text-base"
                    >
                      Read More
                    </Link>
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
  )
}
