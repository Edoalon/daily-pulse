/**
 * Skeleton loading state that mirrors the main page layout:
 * a hero placeholder + a grid of card placeholders.
 */
export function LoadingState() {
  return (
    <div className="animate-pulse space-y-10">
      {/* Executive Summary skeleton */}
      <div className="border-l-4 border-indigo-200 pl-6 space-y-4">
        <div className="h-3 w-40 rounded bg-indigo-100" />
        <div className="h-10 w-3/4 rounded bg-gray-200" />
        <div className="h-10 w-1/2 rounded bg-gray-200" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
          <div className="h-4 w-4/6 rounded bg-gray-100" />
        </div>
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="flex h-28 items-center justify-center bg-gray-100">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <div className="h-5 w-28 rounded-full bg-gray-200" />
                <div className="h-4 w-10 rounded bg-gray-100" />
              </div>
              <div className="h-5 w-full rounded bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="flex gap-2 pt-2">
                <div className="h-4 w-16 rounded bg-gray-100" />
                <div className="h-4 w-20 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
