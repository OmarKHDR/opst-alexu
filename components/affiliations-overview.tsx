import Image from 'next/image'

export default function AffiliationsOverview() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center">
            Affiliations and Overview
          </h2>

          {/* Affiliations Grid */}
          <div className="space-y-8 md:space-y-12">
            {/* CSMNP */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                <Image
                  src="/csmnp-logo.png"
                  alt="CSMNP Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-inter text-[#555555] leading-relaxed text-sm md:text-base px-4 md:px-0">
                  Multi-disciplinary research center aims to provide high quality 
                  and competitive research in the field of Material Engineering, 
                  Nanotechnology and Photonics.
                </p>
              </div>
            </div>

            {/* Alexandria University */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center">
              <div className="flex-1 md:text-right order-2 md:order-1">
                <p className="font-inter text-[#555555] leading-relaxed text-sm md:text-base px-4 md:px-0">
                  Alexandria University aspires to restore the historic status of and to 
                  achieve a comprehensive qualitative leap in various fields of 
                  knowledge.
                </p>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 order-1 md:order-2">
                <Image
                  src="/alexu-logo.png"
                  alt="Alexandria University Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
