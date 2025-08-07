import Image from 'next/image'

export default function AffiliationsOverview() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-3xl font-bold text-[#1A1A1A] mb-12 text-center">
            Affiliations and Overview
          </h2>

          {/* Affiliations Grid */}
          <div className="space-y-12">
            {/* CSMNP */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 flex-shrink-0">
                <Image
                  src="/csmnp-logo.png"
                  alt="CSMNP Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="font-inter text-[#555555] leading-relaxed">
                  Multi-disciplinary research center aims to provide high quality 
                  and competitive research in the field of Material Engineering, 
                  Nanotechnology and Photonics.
                </p>
              </div>
            </div>

            {/* Alexandria University */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-right order-2 md:order-1">
                <p className="font-inter text-[#555555] leading-relaxed">
                  Alexandria University aspires to restore the historic status of and to 
                  achieve a comprehensive qualitative leap in various fields of 
                  knowledge.
                </p>
              </div>
              <div className="w-24 h-24 flex-shrink-0 order-1 md:order-2">
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
