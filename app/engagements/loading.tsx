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

      {/* Hero Skeleton */}
      <div className="h-64 bg-gray-300 animate-pulse relative">
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-10 bg-white/20 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-4 bg-white/20 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-[#F8F8F8] rounded-lg p-6 flex gap-6">
                <div className="flex-1">
                  <div className="w-32 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2 mb-6">
                    <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-3/4 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="w-48 h-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
