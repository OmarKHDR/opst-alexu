import Image from 'next/image'
import Link from 'next/link'

const relatedArticlesData = [
  {
    id: 4,
    title: "Advanced Laser Systems in Modern Research",
    author: "Dr. Lisa Wang",
    date: "25/10/2024",
    excerpt: "Exploring the latest developments in laser technology and their applications in scientific research.",
    image: "/laboratory-research-equipment.png",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Quantum Optics: The Future of Computing",
    author: "Prof. Robert Kim",
    date: "28/10/2024",
    excerpt: "How quantum optical systems are revolutionizing computational capabilities and information processing.",
    image: "/laboratory-research-equipment.png",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "Sustainable Energy Solutions Through Photonics",
    author: "Dr. Maria Rodriguez",
    date: "30/10/2024",
    excerpt: "Innovative approaches to renewable energy generation using advanced photonic technologies.",
    image: "/laboratory-research-equipment.png",
    readTime: "5 min read"
  }
]

interface RelatedArticlesProps {
  currentArticleId: string
}

export default function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
  // Filter out current article and get related ones
  const relatedArticles = relatedArticlesData.filter(article => 
    article.id !== parseInt(currentArticleId)
  ).slice(0, 3)

  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-merriweather text-3xl font-bold text-[#1A1A1A] mb-4">
              Related Articles
            </h2>
            <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full"></div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-merriweather text-xl font-bold text-[#1A1A1A] mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-inter text-sm text-[#FDB813] mb-3 font-medium">
                    {article.author} • {article.date}
                  </p>
                  <p className="font-inter text-[#555555] leading-relaxed mb-4 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/media/${article.id}`}
                      className="inline-flex items-center font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-md px-2 py-1"
                    >
                      Read More
                      <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <span className="text-xs text-[#555555] font-inter">{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
