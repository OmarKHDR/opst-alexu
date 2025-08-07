import Header from '@/components/header'
import OpportunitiesSearch from '@/components/opportunities-search'
import ResearchOpportunitiesSection from '@/components/research-opportunities-section'
import JobOpportunitiesSection from '@/components/job-opportunities-section'
import Footer from '@/components/footer'

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <OpportunitiesSearch />
      <ResearchOpportunitiesSection />
      <JobOpportunitiesSection />
      <Footer />
    </div>
  )
}
