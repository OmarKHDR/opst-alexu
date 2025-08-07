'use client'

import { useState } from 'react'
import Header from '@/components/header'
import ResearchTopicsSection from '@/components/research-topics-section'
import ProjectsSection from '@/components/projects-section'
import LabFacilitiesSection from '@/components/lab-facilities-section'
import CollaborativeWorkSection from '@/components/collaborative-work-section'
import Footer from '@/components/footer'

export default function ResearchPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<number | undefined>(undefined)

  const handleScrollToProjects = (topicId: number) => {
    setSelectedTopicId(topicId)
  }

  const handleTopicChange = (topicId: number) => {
    setSelectedTopicId(topicId)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ResearchTopicsSection onScrollToProjects={handleScrollToProjects} />
      <ProjectsSection 
        selectedTopicId={selectedTopicId} 
        onTopicChange={handleTopicChange}
      />
      <LabFacilitiesSection />
      <CollaborativeWorkSection />
      <Footer />
    </div>
  )
}
