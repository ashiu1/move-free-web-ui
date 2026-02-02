import { Exercise } from '@/app/apis/types';

interface VideoSegmentEditorProps {
  exercise: Exercise;
  videoUrl: string;
}

/**
 * Parses timestamp string in format "mm:ss - mm:ss" and returns start time in seconds
 * @param timestamp - Time range string (e.g., "01:30 - 02:45")
 * @returns Start time in seconds
 */
function parseStartTime(timestamp: string | undefined): number {
  if (!timestamp) return 0;

  try {
    // Split by " - " to get the start time
    const startTimeStr = timestamp.split(' - ')[0].trim();

    // Split by ":" to get minutes and seconds
    const parts = startTimeStr.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);

    // Check for invalid numbers
    if (isNaN(minutes) || isNaN(seconds)) {
      return 0;
    }

    // Convert to total seconds
    return minutes * 60 + seconds;
  } catch {
    return 0;
  }
}

/**
 * Adds start time parameter to YouTube embed URL
 * @param embedUrl - YouTube embed URL
 * @param startSeconds - Start time in seconds
 * @returns URL with start parameter
 */
function addStartTimeToUrl(embedUrl: string, startSeconds: number): string {
  if (startSeconds === 0) return embedUrl;

  const separator = embedUrl.includes('?') ? '&' : '?';
  return `${embedUrl}${separator}start=${startSeconds}`;
}

export default function VideoSegmentEditor({
  exercise,
  videoUrl,
}: VideoSegmentEditorProps) {
  const startTimeSeconds = parseStartTime(exercise.timestamp);
  const videoUrlWithStart = addStartTimeToUrl(videoUrl, startTimeSeconds);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Video Player Section */}
      <div className="mb-6">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
          <iframe
            src={videoUrlWithStart}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={exercise.name}
          />
        </div>
      </div>

      {/* Exercise Details */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Time Range: {exercise.timestamp || 'N/A'}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Exercise Description */}
        {exercise.description && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{exercise.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
