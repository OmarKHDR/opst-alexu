import Header from '@/components/header'
import AboutHero from '@/components/about-hero'
import VisionMissionValues from '@/components/vision-mission-values'
import PrincipalInvestigator from '@/components/principal-investigator'
import LabHistory from '@/components/lab-history'
import AffiliationsOverview from '@/components/affiliations-overview'
import PartnersSection from '@/components/partners-section'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutHero />
      <VisionMissionValues />
      <PrincipalInvestigator />
      <LabHistory />
      <AffiliationsOverview />
      <PartnersSection />
      <Footer />
    </div>
  )
}
