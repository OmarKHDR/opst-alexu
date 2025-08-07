import Image from 'next/image'

export default function PrincipalInvestigator() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-3xl font-bold text-[#1A1A1A] mb-12">
            Principal investigator
          </h2>

          {/* Profile */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="w-full md:w-64 h-80 flex-shrink-0">
              <Image
                src="/professional-headshot.png"
                alt="Prof. hello world"
                width={256}
                height={320}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Profile Content */}
            <div className="flex-1">
              <h3 className="font-merriweather text-2xl font-bold text-[#1A1A1A] mb-6">
                Prof. hello world
              </h3>
              <div className="font-inter text-[#555555] leading-relaxed space-y-4">
                <p>
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
