import Image from 'next/image'

const facilities = [
  {
    id: 1,
    name: "Room 1",
    image: "/laboratory-facility.png"
  },
  {
    id: 2,
    name: "Room 1",
    image: "/laboratory-facility.png"
  },
  {
    id: 3,
    name: "Room 1",
    image: "/laboratory-facility.png"
  }
]

export default function LabFacilitiesSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-4xl font-bold text-[#1A1A1A]">
            Lab Facilities
          </h2>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {facilities.map((facility) => (
            <div key={facility.id} className="relative group cursor-pointer">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-merriweather text-xl font-bold text-white">
                    {facility.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
