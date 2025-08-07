import Header from '@/components/header'
import PublicationsHeader from '@/components/publications-header'
import PublicationsSection from '@/components/publications-section'
import Footer from '@/components/footer'

export default function PublicationPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PublicationsHeader />
      <PublicationsSection />
      <Footer />
    </div>
  )
}
