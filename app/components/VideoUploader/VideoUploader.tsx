'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePostFitnessVideo } from '@/app/apis/ExerciseReactQuery';
import {Exercise} from '@/app/apis/types'
import ExerciseListItem from './ExerciseListItem';
import SourceVideoCard from './SourceVideoCard';
import VideoSegmentEditor from './VideoSegmentEditor';


interface AnalysisData {
  exercises: Exercise[];
}

export default function VideoUploader() {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);

  // Read URL from query params
  const searchParams = useSearchParams();
  const urlParam = searchParams.get('url');

  // Convert YouTube URL to embed format
  const convertToEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);

      // Handle youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
        const videoId = urlObj.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Handle youtu.be/VIDEO_ID
      if (urlObj.hostname === 'youtu.be') {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // If already an embed URL, return as is
      if (urlObj.pathname.includes('/embed/')) {
        return url;
      }

      // For other video platforms (Vimeo, etc.), return as is for now
      return url;
    } catch {
      // TODO: Fix handling, create a page that says video not found
      return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    }
  };

  const videoEmbedUrl = urlParam ? convertToEmbedUrl(urlParam) : 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  // Fetch video analysis data using React Query
  const { data: analysisData, isLoading, error, isError } = usePostFitnessVideo(urlParam || '') as {
    data: AnalysisData | undefined;
    isLoading: boolean;
    error: Error | null;
    isError: boolean;
  };

  // Set initial selected exercise to full video when data loads
  useEffect(() => {
    if (analysisData && analysisData.exercises.length > 0) {
      setSelectedExerciseIndex(0);
    }
  }, [analysisData]);

  const handleExerciseClick = (index: number) => {
    setSelectedExerciseIndex(index);
  };

  const selectedExercise: Exercise | undefined = analysisData?.exercises?.[selectedExerciseIndex];

  return (
    <div className="flex flex-1 bg-gray-50">
      {/* Left Sidebar - Exercise List */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Detected Exercises
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {analysisData?.exercises.length || 0} segments detected
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                <p className="mt-3 text-sm text-gray-500">Analyzing video...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="p-4 text-center">
              <p className="text-sm text-red-600">Error loading exercises</p>
              <p className="mt-1 text-xs text-gray-500">{error?.message || 'Unknown error'}</p>
            </div>
          ) : (
            analysisData?.exercises?.map((exercise, index) => (
              <ExerciseListItem
                key={`exercise-${index}`}
                exercise={exercise}
                isSelected={selectedExerciseIndex === index}
                onClick={() => handleExerciseClick(index)}
                isFullVideo={index === 0}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
              <p className="mt-4 text-lg font-semibold text-gray-700">Processing your video...</p>
              <p className="mt-2 text-sm text-gray-500">This may take a moment</p>
            </div>
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-red-900">Analysis Failed</h3>
              <p className="mt-2 text-sm text-red-700">{error?.message || 'Unknown error occurred'}</p>
            </div>
          </div>
        ) : selectedExercise ? (
          <div className="p-6">
            {selectedExerciseIndex === 0 ? (
              <SourceVideoCard
                videoUrl={videoEmbedUrl}
                status="Completed"
                confidence={98}
                totalSegments={analysisData?.exercises.length || 0}
              />
            ) : (
              <VideoSegmentEditor exercise={selectedExercise} videoUrl={videoEmbedUrl} />
            )}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">Select an exercise to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
