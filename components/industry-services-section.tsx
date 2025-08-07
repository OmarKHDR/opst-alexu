import Image from 'next/image'
import { Button } from '@/components/ui/button'

const services = [
  {
    id: 1,
    title: "Technical Consulting",
    description: "Expert technical consulting services providing specialized knowledge in optical systems, photonic applications, and advanced engineering solutions. Our experienced team offers comprehensive support for industry and academic challenges.",
    image: "/technical-consulting-bg.png"
  },
  {
    id: 2,
    title: "Research Partnership",
    description: "Collaborative research partnerships with industry leaders, government agencies, and international institutions. We provide access to cutting-edge facilities, expertise, and innovative solutions for complex engineering challenges and research endeavors.",
    image: "/research-partnership-bg.png"
  }
]

export default function IndustryServicesSection() {
  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Industry Services
          </h2>
          <p className="font-inter text-[#555555] text-lg">
            Contact us for technical consulting or research partnerships
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          {services.map((service) => (
            <div key={service.id} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-center text-white">
                <h3 className="font-merriweather text-2xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="font-inter text-sm leading-relaxed opacity-90">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <div className="text-center">
          <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-8 py-3">
            CONTACT US NOW
          </Button>
        </div>
      </div>
    </section>
  )
}
