const statistics = [
  { number: "123", label: "Journal Articles" },
  { number: "12", label: "Conference Papers" },
  { number: "23", label: "PhD Theses" },
  { number: "123", label: "Master's Theses" },
  { number: "123", label: "Patents" }
]

export default function PublicationsHeader() {
  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="font-merriweather text-4xl font-bold text-[#1A1A1A] mb-4">
            Publications
          </h1>
          <p className="font-inter text-[#555555] text-lg">
            Advancing knowledge through scientific research and innovation
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="font-merriweather text-3xl font-bold text-[#003366] mb-2">
                {stat.number}
              </div>
              <div className="font-inter text-sm text-[#555555]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
