import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Clock, Users, Calendar, CheckCircle } from 'lucide-react'

const programs = [
  {
    id: 1,
    title: "Summer Training Program",
    description: "Intensive 10-week training program providing undergraduate students with hands-on laboratory experience, advanced research methodologies, and exposure to cutting-edge optical systems and photonic applications. Students work directly with faculty and graduate researchers.",
    duration: "10 weeks",
    capacity: "25 Students",
    applicationStatus: "opened",
    startDate: "June 2025",
    image: "/students-working-lab.png",
    buttonText: "APPLY NOW",
    highlights: ["Hands-on Lab Experience", "Research Methodology", "Faculty Mentorship", "Certificate of Completion"]
  },
  {
    id: 2,
    title: "Graduation Project Support",
    description: "Comprehensive graduation project support including project supervision, technical guidance, access to advanced engineering systems, project ideation, methodology development, technical resources, and thesis writing assistance for final year students.",
    duration: "One Academic Year",
    capacity: "5 Teams",
    applicationStatus: "opened",
    startDate: "September 2025",
    image: "/students-library-study.png",
    buttonText: "APPLY NOW",
    highlights: ["Project Supervision", "Technical Resources", "Methodology Support", "Thesis Assistance"]
  }
]

export default function StudentProgramsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Student Programs
          </h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto rounded-full mb-6"></div>
          <p className="font-inter text-[#555555] text-lg max-w-2xl mx-auto">
            Comprehensive educational programs designed to enhance student learning and professional development
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className="bg-[#F8F8F8] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group relative"
            >
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDB813]/5 to-[#3399FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative z-10">
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-inter font-semibold ${
                      program.applicationStatus === 'opened' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      <CheckCircle size={12} className="inline mr-1" />
                      Applications {program.applicationStatus}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-merriweather text-2xl font-bold text-white mb-2">
                      {program.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="font-inter text-[#555555] leading-relaxed mb-6 text-sm">
                    {program.description}
                  </p>
                  
                  {/* Program Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-[#FDB813]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Duration</span>
                        <span className="font-inter text-[#555555]">{program.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={16} className="text-[#3399FF]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Capacity</span>
                        <span className="font-inter text-[#555555]">{program.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <Calendar size={16} className="text-[#003366]" />
                      <div>
                        <span className="font-inter font-medium text-[#1A1A1A] block">Start Date</span>
                        <span className="font-inter text-[#555555]">{program.startDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Program Highlights */}
                  <div className="mb-6">
                    <h4 className="font-inter text-sm font-semibold text-[#1A1A1A] mb-3">
                      Program Highlights:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {program.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle size={12} className="text-green-600" />
                          <span className="font-inter text-[#555555]">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-6 py-3 w-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 group-hover:scale-[1.02]">
                    {program.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
