import { Button } from '@/components/ui/button'

export default function AboutSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left side - Title */}
          <div className="relative">
            <h2 className="font-merriweather text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-6">
              About us
            </h2>
            {/* Mobile golden line */}
            <div className="block md:hidden w-20 h-1 bg-[#FDB813] mb-6"></div>
          </div>
          
          {/* Right side - Content and button */}
          <div className="relative">
            <div className="hidden md:block w-1 h-20 bg-[#FDB813] absolute -left-6 top-0"></div>
            <p className="font-inter text-[#555555] leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-medium px-4 sm:px-6 py-3 w-full sm:w-auto">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
