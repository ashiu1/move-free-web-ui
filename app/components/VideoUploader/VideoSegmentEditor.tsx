interface VideoSegmentEditorProps {
  exercise: {
    id: string;
    name: string;
    startTime?: string;
    endTime?: string;
    duration?: string;
  };
}

export default function VideoSegmentEditor({
  exercise,
}: VideoSegmentEditorProps) {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Placeholder for VideoSegmentEditor */}
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <div className="mx-auto max-w-md">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            {exercise.name}
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Time: {exercise.startTime} - {exercise.endTime} (
            {exercise.duration})
          </p>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <strong>Component Under Development</strong>
              <br />
              VideoSegmentEditor will display exercise details, video clip,
              coaching tips, and editing tools here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
