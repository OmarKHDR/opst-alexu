import Image from 'next/image'

export default function PrincipalInvestigator() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center md:text-left">
            Principal investigator
          </h2>

          {/* Profile */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="w-48 md:w-64 h-60 md:h-80 flex-shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`}
                alt="Prof. hello world"
                width={256}
                height={320}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Profile Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-merriweather text-xl md:text-2xl font-bold text-[#1A1A1A] mb-4 md:mb-6">
                Prof. hello world
              </h3>
              <div className="font-inter text-[#555555] leading-relaxed space-y-4">
                <p className="text-sm md:text-base px-4 md:px-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                  commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                  ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
