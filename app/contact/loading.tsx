export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-[#003366] h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="w-32 h-8 bg-white/20 rounded animate-pulse"></div>
          <div className="hidden md:flex space-x-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section Skeleton */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="w-48 h-12 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="w-16 h-1 bg-gray-300 rounded animate-pulse"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form Skeleton */}
            <div>
              <div className="w-96 h-4 bg-gray-300 rounded mb-8 animate-pulse"></div>
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`${i === 4 ? 'h-24' : 'h-12'} bg-gray-300 rounded animate-pulse`}></div>
                ))}
                <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Contact Info Skeleton */}
            <div className="border-l-4 border-gray-300 pl-8">
              <div className="space-y-8">
                <div>
                  <div className="w-24 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-48 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-40 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <div className="w-32 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-40 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
