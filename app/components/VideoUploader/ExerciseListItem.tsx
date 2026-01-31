interface ExerciseListItemProps {
  exercise: {
    id: string;
    name: string;
    startTime?: string;
    endTime?: string;
    duration?: string;
  };
  isSelected: boolean;
  onClick: () => void;
  isFullVideo: boolean;
}

export default function ExerciseListItem({
  exercise,
  isSelected,
  onClick,
  isFullVideo,
}: ExerciseListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full border-b border-gray-200 p-4 text-left transition-colors ${
        isSelected
          ? 'bg-blue-50 border-l-4 border-l-blue-500'
          : 'hover:bg-gray-50 border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Status Indicator */}
        <div className="mt-1">
          {isFullVideo ? (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
              <svg
                className="h-3 w-3 text-white"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Exercise Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-semibold ${
              isSelected ? 'text-blue-700' : 'text-gray-900'
            }`}
          >
            {exercise.name}
          </h3>

          {isFullVideo ? (
            <p className="mt-1 text-xs text-gray-500">{exercise.duration}</p>
          ) : (
            <p className="mt-1 text-xs text-gray-500">
              {exercise.startTime} - {exercise.endTime}
            </p>
          )}

          {isFullVideo && (
            <p className="mt-1 text-xs text-green-600 font-medium">
              Live input entered
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
