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
      <div className="h-96 bg-gray-300 animate-pulse relative">
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <div className="w-48 h-12 bg-white/20 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-4 bg-white/20 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Our Story Skeleton */}
      <div className="bg-gray-300 py-16 animate-pulse relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="w-48 h-10 bg-white/20 rounded mb-6 animate-pulse"></div>
              <div className="w-1 h-20 bg-white/20 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Mission Values Skeleton */}
      <div className="bg-[#003366] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i}>
                  <div className="w-32 h-8 bg-white/20 rounded mb-4 animate-pulse"></div>
                  <div className="w-16 h-1 bg-white/20 rounded mb-6 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-white/20 rounded animate-pulse"></div>
                    <div className="w-full h-3 bg-white/20 rounded animate-pulse"></div>
                    <div className="w-3/4 h-3 bg-white/20 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="w-24 h-8 bg-white/20 rounded mb-4 animate-pulse"></div>
              <div className="w-16 h-1 bg-white/20 rounded mb-6 animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-white/20 rounded animate-pulse"></div>
                <div className="w-full h-3 bg-white/20 rounded animate-pulse"></div>
                <div className="w-2/3 h-3 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {/* Principal Investigator Skeleton */}
            <div>
              <div className="w-64 h-8 bg-gray-300 rounded mb-8 animate-pulse"></div>
              <div className="flex gap-8">
                <div className="w-48 h-64 bg-gray-300 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="w-48 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-3/4 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
