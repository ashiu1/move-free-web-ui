interface SourceVideoCardProps {
  videoUrl: string;
  status: string;
  confidence: number;
  totalSegments: number;
}

export default function SourceVideoCard({
  videoUrl,
  status,
  confidence,
  totalSegments,
}: SourceVideoCardProps) {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Stats Header */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Analysis Status
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{status}</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            AI Confidence
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{confidence}%</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Segments
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totalSegments} Clips
          </p>
        </div>
      </div>

      {/* Video Player */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl">
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={videoUrl}
            className="absolute top-0 left-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Workout Video"
          />
        </div>
      </div>

      {/* Video Controls/Info */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
            </button>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Full Workout Analysis
              </p>
              <p className="text-xs text-gray-500">
                All {totalSegments} segments detected and analyzed
              </p>
            </div>
          </div>

          <button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
            Export All
          </button>
        </div>
      </div>
    </div>
  );
}
