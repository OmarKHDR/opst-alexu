import Image from 'next/image'
import Link from 'next/link'

const topArticles = [
  {
    id: 1,
    title: "Article Title",
    author: "author name",
    date: "10/10/2024",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus...",
    image: "/laboratory-research-equipment.png"
  },
  {
    id: 2,
    title: "Article Title",
    author: "author name",
    date: "15/10/2024",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus...",
    image: "/laboratory-research-equipment.png"
  },
  {
    id: 3,
    title: "Article Title",
    author: "author name",
    date: "20/10/2024",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt condimentum ex in congue. Cras mollis, dui a interdum eleifend, nulla dui posuere velit, vel maximus...",
    image: "/laboratory-research-equipment.png"
  }
]

export default function TopArticles() {
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
          {topArticles.map((article) => (
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
                  className="inline-flex items-center font-inter text-[#3399FF] hover:text-[#003366] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 rounded-md px-2 py-1 text-sm sm:text-base"
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
