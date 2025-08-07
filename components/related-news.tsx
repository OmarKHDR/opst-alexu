import Image from 'next/image'
import Link from 'next/link'

const relatedNewsData = [
  {
    id: 7,
    title: "OPST Lab Receives International Research Grant",
    date: "02/11/2024",
    excerpt: "Major funding secured for groundbreaking photonics research initiative.",
    image: "/conference-presentation.png",
    category: "News"
  },
  {
    id: 8,
    title: "Student Team Wins National Innovation Competition",
    date: "05/11/2024",
    excerpt: "Undergraduate researchers recognized for innovative solar technology project.",
    image: "/students-working-lab.png",
    category: "Achievement"
  },
  {
    id: 9,
    title: "New Partnership with Leading Tech Company",
    date: "08/11/2024",
    excerpt: "Collaboration agreement signed to advance optical communication research.",
    image: "/technical-consulting-bg.png",
    category: "Partnership"
  }
]

interface RelatedNewsProps {
  currentArticleId: string
}

export default function RelatedNews({ currentArticleId }: RelatedNewsProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-merriweather text-3xl font-bold text-[#1A1A1A] mb-4">
              Related News
            </h2>
            <div className="w-20 h-1 bg-[#3399FF] mx-auto rounded-full"></div>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {relatedNewsData.map((news) => (
              <article 
                key={news.id}
                className="bg-[#F8F8F8] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="mb-3">
                  <span className="px-3 py-1 bg-[#3399FF]/10 text-[#003366] rounded-full text-xs font-inter font-medium border border-[#3399FF]/20">
                    {news.category}
                  </span>
                </div>
                
                <h3 className="font-merriweather text-lg font-bold text-[#1A1A1A] mb-2 line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="font-inter text-sm text-[#555555] mb-3">{news.date}</p>
                
                <p className="font-inter text-[#555555] leading-relaxed mb-4 text-sm line-clamp-2">
                  {news.excerpt}
                </p>
                
                <Link 
                  href={`/media/${news.id}`}
                  className="inline-flex items-center font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-md px-2 py-1"
                >
                  Read More
                  <svg className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
