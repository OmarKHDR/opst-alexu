'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import ResearchTopicsSection from '@/components/research-topics-section'
import ProjectsSection from '@/components/projects-section'
import LabFacilitiesSection from '@/components/lab-facilities-section'
import CollaborativeWorkSection from '@/components/collaborative-work-section'
import Footer from '@/components/footer'

export default function ResearchPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()

  useEffect(() => {
    const topic = searchParams.get('topic')
    if (topic) {
      setSelectedTopicId(topic)
    }
  }, [searchParams])

  const handleScrollToProjects = (topicId: string) => {
    setSelectedTopicId(topicId)
  }

  const handleTopicChange = (topicId: string) => {
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
