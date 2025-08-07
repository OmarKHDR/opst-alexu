export default function VisionMissionValues() {
  return (
    <section className="bg-[#003366] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Vision and Mission Row */}
          <div className="grid md:grid-cols-2 gap-16 mb-12">
            {/* Vision */}
            <div className="text-white text-center">
              <h2 className="font-merriweather text-2xl font-bold mb-2">
                Vision
              </h2>
              <div className="w-16 h-1 bg-[#FDB813] mx-auto mb-6"></div>
              <p className="font-inter leading-relaxed opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>

            {/* Mission */}
            <div className="text-white text-center">
              <h2 className="font-merriweather text-2xl font-bold mb-2">
                Mission
              </h2>
              <div className="w-16 h-1 bg-[#FDB813] mx-auto mb-6"></div>
              <p className="font-inter leading-relaxed opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
          </div>

          {/* Values - Centered */}
          <div className="text-white text-center">
            <h2 className="font-merriweather text-2xl font-bold mb-2">
              Values
            </h2>
            <div className="w-16 h-1 bg-[#FDB813] mx-auto mb-6"></div>
            <p className="font-inter leading-relaxed opacity-90 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
