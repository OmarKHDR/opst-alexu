import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-16 sm:py-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/hero-background.png`}
          alt="Research Laboratory"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-merriweather text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Advancing optics photonics and solar technologies for a sustainable future
        </h1>
        <p className="font-inter text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 px-2">
          Empowering researchers for advancing technologies
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto">
          <Button 
            className="bg-[#003366] hover:bg-[#003366]/90 text-white px-4 sm:px-8 py-3 text-base sm:text-lg font-inter font-medium w-full sm:w-auto"
            size="lg"
          >
            EXPLORE OUR RESEARCH
          </Button>
          <Button 
            className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-[#003366] px-4 sm:px-8 py-3 text-base sm:text-lg font-inter font-medium w-full sm:w-auto"
            size="lg"
          >
            MEET THE TEAM
          </Button>
        </div>
      </div>
    </section>
  )
}
