'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Extended article data with full content
const articlesData = [
  {
    id: 1,
    title: "Breakthrough in Optical Communication Systems",
    author: "Dr. Ahmed Hassan",
    date: "10/10/2024",
    category: "Research",
    readTime: "5 min read",
    excerpt: "Revolutionary advances in fiber optic technology promise to transform high-speed data transmission capabilities.",
    content: `
      <p>Recent developments in optical communication systems have opened new possibilities for ultra-high-speed data transmission. Our research team has successfully demonstrated a novel approach to fiber optic signal processing that could revolutionize telecommunications infrastructure.</p>
      
      <h2>Key Innovations</h2>
      <p>The breakthrough centers around advanced photonic signal processing techniques that significantly reduce signal degradation over long distances. By implementing sophisticated error correction algorithms and optimized wavelength division multiplexing, we've achieved data transmission rates previously thought impossible.</p>
      
      <h2>Technical Implementation</h2>
      <p>The system utilizes cutting-edge optical amplifiers and specialized fiber designs to maintain signal integrity across transcontinental distances. Our laboratory tests have shown consistent performance improvements of over 300% compared to existing technologies.</p>
      
      <h2>Future Applications</h2>
      <p>This technology has immediate applications in telecommunications, data centers, and high-performance computing networks. The potential for enabling next-generation internet infrastructure makes this research particularly significant for global connectivity.</p>
      
      <p>The research team continues to refine the technology with plans for field trials beginning next quarter. Collaboration with industry partners will be crucial for bringing this innovation to market.</p>
    `,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/laboratory-research-equipment.png`,
    tags: ["Optics", "Communication", "Research", "Innovation"]
  },
  {
    id: 2,
    title: "Solar Technology Advances in Photovoltaic Efficiency",
    author: "Prof. Sarah Johnson",
    date: "15/10/2024",
    category: "Solar Technology",
    readTime: "7 min read",
    excerpt: "New photovoltaic cell designs achieve record-breaking efficiency rates in laboratory testing.",
    content: `
      <p>Our solar technology research division has achieved a significant milestone in photovoltaic efficiency, developing new cell architectures that surpass previous performance benchmarks by substantial margins.</p>
      
      <h2>Efficiency Breakthrough</h2>
      <p>The newly developed photovoltaic cells demonstrate efficiency rates exceeding 45% under standard test conditions, representing a major advancement in solar energy conversion technology. This achievement results from innovative material engineering and optimized cell geometry.</p>
      
      <h2>Material Innovation</h2>
      <p>The breakthrough utilizes advanced semiconductor materials and novel surface texturing techniques to maximize light absorption while minimizing energy losses. Specialized anti-reflective coatings further enhance performance across the solar spectrum.</p>
      
      <h2>Environmental Impact</h2>
      <p>Higher efficiency solar cells directly translate to reduced installation costs and smaller environmental footprints for solar energy systems. This technology could accelerate the global transition to renewable energy sources.</p>
      
      <p>Commercial applications are expected within the next two years, with several industry partners expressing strong interest in licensing the technology for mass production.</p>
    `,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/laboratory-research-equipment.png`,
    tags: ["Solar", "Photovoltaic", "Efficiency", "Renewable Energy"]
  },
  {
    id: 3,
    title: "International Collaboration in Photonics Research",
    author: "Dr. Michael Chen",
    date: "20/10/2024",
    category: "Collaboration",
    readTime: "4 min read",
    excerpt: "New partnerships with leading international institutions expand research capabilities and knowledge sharing.",
    content: `
      <p>The OPST Laboratory has established groundbreaking partnerships with premier research institutions across three continents, creating unprecedented opportunities for collaborative photonics research and knowledge exchange.</p>
      
      <h2>Global Network</h2>
      <p>Our new collaboration network includes partnerships with institutions in Europe, Asia, and North America, enabling access to specialized equipment, expertise, and research facilities that complement our existing capabilities.</p>
      
      <h2>Joint Research Projects</h2>
      <p>Several joint research initiatives are already underway, focusing on quantum photonics, advanced laser systems, and next-generation optical computing technologies. These projects leverage the unique strengths of each participating institution.</p>
      
      <h2>Student Exchange Programs</h2>
      <p>The collaboration includes comprehensive student and researcher exchange programs, providing valuable international experience and exposure to diverse research methodologies and cultural perspectives.</p>
      
      <p>This international network positions the OPST Laboratory at the forefront of global photonics research, ensuring continued innovation and scientific advancement in our field.</p>
    `,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/laboratory-research-equipment.png`,
    tags: ["Collaboration", "International", "Photonics", "Partnership"]
  }
]

interface ArticleDetailProps {
  articleId: string
}

export default function ArticleDetail({ articleId }: ArticleDetailProps) {
  const [article, setArticle] = useState<typeof articlesData[0] | null>(null)

  useEffect(() => {
    const foundArticle = articlesData.find(a => a.id === parseInt(articleId))
    setArticle(foundArticle || null)
  }, [articleId])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">Article Not Found</h1>
          <Link href="/media" className="text-[#3399FF] hover:text-[#003366] transition-colors">
            Return to Media
          </Link>
        </div>
      </div>
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
