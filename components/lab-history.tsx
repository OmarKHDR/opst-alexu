import Image from 'next/image'

const historyEvents = [
  {
    year: "2023",
    title: "some event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    side: "right"
  },
  {
    year: "2022",
    title: "some event", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    side: "left"
  },
  {
    year: "July 2021",
    title: "some event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    side: "right"
  },
  {
    year: "Oct 2021",
    title: "some event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    side: "left"
  },
  {
    year: "2020",
    title: "Some Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    side: "right",
    image: "/colorful-network-visualization.png"
  },
  {
    year: "2019",
    title: "some event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    side: "left"
  },
  {
    year: "2018",
    title: "Lab Created",
    description: "The OPST Laboratory was officially established, marking the beginning of our journey in advancing optics, photonics, and solar technologies research.",
    side: "right",
    isLabCreated: true
  }
]

export default function LabHistory() {
  return (
    <section className="bg-[#F8F8F8] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <h2 className="font-merriweather text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 md:mb-12 text-center md:text-left">
            our history
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 bg-[#FDB813] h-full"></div>
            
            {/* Mobile Timeline Line - Left aligned */}
            <div className="md:hidden absolute left-6 w-0.5 bg-[#FDB813] h-full"></div>

            {/* Timeline Events */}
            <div className="space-y-6 md:space-y-8">
              {historyEvents.map((event, index) => (
                <div key={index} className="relative">
                  {/* Desktop Timeline Dot */}
                  <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10 ${
                    event.isLabCreated ? 'bg-[#003366] border-2 border-white shadow-lg' : 'bg-[#FDB813]'
                  }`}></div>

                  {/* Mobile Timeline Dot */}
                  <div className={`md:hidden absolute left-6 transform -translate-x-1/2 w-3 h-3 rounded-full z-10 ${
                    event.isLabCreated ? 'bg-[#003366] border-2 border-white shadow-lg' : 'bg-[#FDB813]'
                  }`}></div>

                  {/* Event Content */}
                  <div className={`w-full md:flex ${event.side === 'left' ? 'md:justify-start' : 'md:justify-end'}`}>
                    {/* Mobile Layout - Always left aligned with padding */}
                    <div className="md:hidden pl-12 pr-2">
                      <div className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border max-w-[calc(100vw-3rem)] mx-auto ${
                      event.isLabCreated ? 'border-[#003366]/20 bg-gradient-to-br from-[#003366]/5 to-white' : 'border-gray-100'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            event.isLabCreated 
                              ? 'text-white bg-[#003366]' 
                              : 'text-[#FDB813] bg-[#FDB813]/10'
                          }`}>
                            {event.year}
                          </span>
                        </div>
                        <h3 className={`font-merriweather text-base font-bold mb-2 ${
                          event.isLabCreated ? 'text-[#003366]' : 'text-[#1A1A1A]'
                        }`}>
                          {event.title}
                        </h3>
                        
                        {event.image && (
                          <div className="w-full h-20 mb-3 rounded-lg overflow-hidden">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              width={200}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <p className="font-inter text-xs text-[#555555] leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Layout - Alternating sides */}
                    <div className={`hidden md:block md:w-5/12 ${event.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 border ${
                        event.isLabCreated ? 'border-[#003366]/20 bg-gradient-to-br from-[#003366]/5 to-white' : 'border-gray-100'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            event.isLabCreated 
                              ? 'text-white bg-[#003366]' 
                              : 'text-[#FDB813] bg-[#FDB813]/10'
                          }`}>
                            {event.year}
                          </span>
                        </div>
                        <h3 className={`font-merriweather text-lg font-bold mb-3 ${
                          event.isLabCreated ? 'text-[#003366]' : 'text-[#1A1A1A]'
                        }`}>
                          {event.title}
                        </h3>
                        
                        {event.image && (
                          <div className="w-full h-24 mb-4 rounded-xl overflow-hidden">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              width={200}
                              height={96}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <p className="font-inter text-sm text-[#555555] leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
