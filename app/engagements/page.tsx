import Header from '@/components/header'
import EngagementHero from '@/components/engagement-hero'
import StudentProgramsSection from '@/components/student-programs-section'
import LabActivitiesSection from '@/components/lab-activities-section'
import LabResourcesSection from '@/components/lab-resources-section'
import IndustryServicesSection from '@/components/industry-services-section'
import Footer from '@/components/footer'

export default function EngagementsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <EngagementHero />
      <StudentProgramsSection />
      <LabActivitiesSection />
      <LabResourcesSection />
      <IndustryServicesSection />
      <Footer />
    </div>
  )
}
