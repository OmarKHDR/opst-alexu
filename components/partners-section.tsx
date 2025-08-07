export default function PartnersSection() {
  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-3xl font-bold text-[#1A1A1A] mb-12 text-center">
            Our Partners
          </h2>

          {/* Partners Content - Placeholder */}
          <div className="text-center">
            <p className="font-inter text-[#555555] text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              We collaborate with leading institutions and organizations worldwide to advance 
              research in optics, photonics, and solar technologies.
            </p>
            
            {/* Partner logos placeholder grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-30">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg flex items-center justify-center border">
                  <span className="text-gray-400 font-inter text-xs">Partner Logo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
