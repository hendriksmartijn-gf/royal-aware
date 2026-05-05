export function SkeletonCard() {
  return (
    <div className="bg-white overflow-hidden border border-gray-100 animate-pulse rounded-sm">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 w-3/4" />
        <div className="h-3 bg-gray-200 w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded-full w-14" />
          <div className="h-5 bg-gray-200 rounded-full w-20" />
        </div>
        <div className="h-3 bg-gray-200 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
