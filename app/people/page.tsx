import Header from '@/components/header'
import ContributorsSection from '@/components/contributors-section'
import PeopleSection from '@/components/people-section'
import Footer from '@/components/footer'

export default function PeoplePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ContributorsSection />
      <PeopleSection />
      <Footer />
    </div>
  )
}
