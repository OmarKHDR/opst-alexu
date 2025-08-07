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

      {/* Search Skeleton */}
      <div className="bg-[#F8F8F8] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="flex-1 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Research Opportunities Skeleton */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-64 h-10 bg-gray-300 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-[#F8F8F8] rounded-lg p-6 flex gap-6">
                <div className="w-16 h-16 bg-gray-300 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="w-48 h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="w-32 h-4 bg-gray-300 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2 mb-4">
                    <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-3/4 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Opportunities Skeleton */}
      <div className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-48 h-10 bg-gray-300 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="w-3/4 h-5 bg-gray-300 rounded mb-2 animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-2/3 h-3 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
