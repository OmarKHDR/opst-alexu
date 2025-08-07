import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import NewsSection from '@/components/news-section'
import ResearchSection from '@/components/research-section'
import AboutSection from '@/components/about-section'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <NewsSection />
      <ResearchSection />
      <AboutSection />
      <Footer />
    </div>
  )
}
