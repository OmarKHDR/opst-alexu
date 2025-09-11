'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Calendar, User, Share2, BookOpen } from 'lucide-react'
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

interface ArticleModalProps {
  articleId: string | null
  isOpen: boolean
  onClose: () => void
}

export default function ArticleModal({ articleId, isOpen, onClose }: ArticleModalProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      if (articleId) {
        setLoading(true)
        try {
          const foundArticle = await getArticleById(articleId)
          setArticle(foundArticle)
        } catch (err) {
          console.error('Error fetching article:', err)
          setArticle(null)
        } finally {
          setLoading(false)
        }
      } else {
        setArticle(null)
      }
    }

    fetchArticle()
  }, [articleId])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !article) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Featured Image */}
          <div className="relative h-64 sm:h-80">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-8">
            {/* Tags */}
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
            
            {/* Title */}
            <h1 className="font-merriweather text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-[#555555] font-inter text-sm mb-6">
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

            {/* Share Button */}
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 border-gray-300 hover:bg-[#F8F8F8] transition-colors"
              >
                <Share2 size={16} />
                Share Article
              </Button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none font-inter leading-relaxed text-[#555555] mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                '--tw-prose-headings': '#1A1A1A',
                '--tw-prose-h2': '#1A1A1A',
                '--tw-prose-h3': '#1A1A1A',
              } as React.CSSProperties}
            />

            {/* Article Footer */}
            <footer className="pt-6 border-t border-gray-200">
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
      </div>
    </div>
  )
}
