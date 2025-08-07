export default function CollaborativeWorkSection() {
  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A]">
            Collaborative Work
          </h2>
        </div>

        {/* Content Placeholder */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-inter text-[#555555] text-lg leading-relaxed">
            Our laboratory actively collaborates with leading institutions and industry partners worldwide. 
            We believe in the power of collaborative research to drive innovation and create meaningful 
            impact in the fields of optics, photonics, and solar technologies.
          </p>
          
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-merriweather text-xl font-bold text-[#1A1A1A] mb-4">
                Academic Partnerships
              </h3>
              <p className="font-inter text-[#555555] leading-relaxed">
                Collaborating with top universities and research institutions to advance 
                scientific knowledge and foster academic excellence.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-merriweather text-xl font-bold text-[#1A1A1A] mb-4">
                Industry Collaboration
              </h3>
              <p className="font-inter text-[#555555] leading-relaxed">
                Working closely with industry leaders to translate research into 
                practical applications and commercial solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
