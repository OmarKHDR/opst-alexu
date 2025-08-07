export default function AboutHero() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/ourstory-background.png)' }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left side - Title with underline */}
          <div>
            <h1 className="font-merriweather text-4xl font-bold text-white mb-2">
              Our Story
            </h1>
            <div className="w-20 h-1 bg-[#FDB813] mb-6"></div>
          </div>
          
          {/* Right side - Content */}
          <div>
            <p className="font-inter text-white leading-relaxed text-base opacity-90">
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
