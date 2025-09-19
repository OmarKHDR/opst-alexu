import Image from 'next/image'

export default function EngagementHero() {
  return (
    <section className="relative h-64 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/ourstory-background.png`}
          alt="University Buildings"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="font-merriweather text-4xl md:text-5xl font-bold mb-4">
            Student Activities
          </h1>
          <p className="font-inter text-lg opacity-90">
            Comprehensive programs designed to enhance student learning and professional development
          </p>
        </div>
      </div>
    </section>
  )
}
