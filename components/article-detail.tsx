'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getArticleById } from '@/lib/articles'

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
}

interface ArticleDetailProps {
  articleId: string
}

export default function ArticleDetail({ articleId }: ArticleDetailProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const foundArticle = await getArticleById(articleId)
        setArticle(foundArticle)
      } catch (err) {
        setError('Failed to load article')
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId])

  if (loading) {
    return (
      <article className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
              <p className="mt-4 text-[#555555]">Loading article...</p>
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (error || !article) {
    return (
      <article className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                {error || 'Article Not Found'}
              </h1>
              <Link href="/media" className="text-[#3399FF] hover:text-[#003366] transition-colors">
                Return to Media
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/media"
              className="inline-flex items-center text-[#3399FF] hover:text-[#003366] transition-colors font-inter font-medium focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Media
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#FDB813]/10 text-[#003366] rounded-full text-sm font-inter font-medium border border-[#FDB813]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-[#555555] font-inter text-sm mb-6">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 border-gray-300 hover:bg-[#F8F8F8] transition-colors"
              >
                <Share2 size={16} />
                Share Article
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none font-inter leading-relaxed text-[#555555]"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              '--tw-prose-headings': '#1A1A1A',
              '--tw-prose-h2': '#1A1A1A',
              '--tw-prose-h3': '#1A1A1A',
            } as React.CSSProperties}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-inter text-sm text-[#555555]">Share this article:</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-300 hover:bg-[#F8F8F8] transition-colors"
                  >
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-300 hover:bg-[#F8F8F8] transition-colors"
                  >
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-300 hover:bg-[#F8F8F8] transition-colors"
                  >
                    LinkedIn
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-[#555555] font-inter">
                Category: <span className="font-medium text-[#003366]">{article.category}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}
