export default function AboutHero() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `${process.env.NEXT_PUBLIC_BASE_PATH}/ourstory-background.png`}}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
          {/* Left side - Title with underline */}
          <div className="text-center md:text-left">
            <h1 className="font-merriweather text-3xl md:text-4xl font-bold text-white mb-2">
              Our Story
            </h1>
            <div className="w-16 md:w-20 h-1 bg-[#FDB813] mb-4 md:mb-6 mx-auto md:mx-0"></div>
          </div>
          
          {/* Right side - Content */}
          <div className="text-center md:text-left">
            <p className="font-inter text-white leading-relaxed text-sm md:text-base opacity-90 px-2 md:px-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
