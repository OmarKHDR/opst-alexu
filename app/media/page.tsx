import Header from '@/components/header'
import MediaHero from '@/components/media-hero'
import TopArticles from '@/components/top-articles'
import SearchSection from '@/components/search-section'
import ArticleList from '@/components/article-list'
import Footer from '@/components/footer'

export default function MediaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <MediaHero />
      <TopArticles />
      <SearchSection />
      <ArticleList />
      <Footer />
    </div>
  )
}
