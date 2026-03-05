'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  usePostFitnessVideo,
  useUploadExercises,
} from '@/app/apis/ExerciseReactQuery';
import { Exercise } from '@/app/apis/types';
import ExerciseListItem from './ExerciseListItem';
import SourceVideoCard from './SourceVideoCard';
import VideoSegmentEditor from './VideoSegmentEditor';
import AuthModal from '../AuthModal';

interface AnalysisData {
  exercises: Exercise[];
}

export default function VideoUploader() {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const router = useRouter();

  // Get user session
  const { data: session, status } = useSession();
  const userId = session?.user?.userId;

  // Upload exercises mutation
  const uploadMutation = useUploadExercises();

  // Debug: Log session information
  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
    console.log('User ID:', userId);
  }, [session, status, userId]);

  // Read URL from query params
  const searchParams = useSearchParams();
  const urlParam = searchParams.get('url');

  // Convert YouTube URL to embed format
  const convertToEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);

      // Handle youtube.com/watch?v=VIDEO_ID
      if (
        urlObj.hostname.includes('youtube.com') &&
        urlObj.searchParams.has('v')
      ) {
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

  const videoEmbedUrl = urlParam
    ? convertToEmbedUrl(urlParam)
    : 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  // Fetch video analysis data using React Query
  const {
    data: analysisData,
    isLoading,
    error,
    isError,
  } = usePostFitnessVideo(urlParam || '', userId) as {
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

  const handleCancel = () => {
    router.push('/');
  };

  const handleSave = () => {
    // Check if user is signed in
    if (!userId) {
      setShowSignInModal(true);
      return;
    }

    if (analysisData) {
      uploadMutation.mutate(
        { analysisData, userId },
        {
          onSuccess: () => {
            console.log('Exercises uploaded successfully');
            // Commenting out for testing
            //router.push('/');
          },
          onError: (error) => {
            console.error('Error uploading exercises:', error);
            // Optionally show error message to user
          },
        }
      );
    }
  };

  const selectedExercise: Exercise | undefined =
    analysisData?.exercises?.[selectedExerciseIndex];

  return (
    <>
      {/* Sign In Required Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent">
          <div className="mx-4 max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-black">
                Sign In Required
              </h3>
              <p className="mt-2 text-sm text-black">
                You need to be signed in to save your video analysis. Please sign in to continue.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowSignInModal(false);
                    setShowAuthModal(true);
                  }}
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  Go to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <div className="flex flex-1 bg-gray-50 relative">
      {/* Fixed Save/Cancel Buttons - Top Right */}
      <div className="fixed top-24 right-8 flex gap-3 z-50">
        <button
          onClick={handleCancel}
          className="rounded-lg border-2 border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!analysisData || uploadMutation.isPending}
          className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploadMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Left Sidebar - Exercise List */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-black uppercase tracking-wide">
            Detected Exercises
          </h2>
          <p className="text-xs text-black mt-1">
            {analysisData?.exercises.length || 0} segments detected
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                <p className="mt-3 text-sm text-black">Analyzing video...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="p-4 text-center">
              <p className="text-sm text-red-600">Error loading exercises</p>
              <p className="mt-1 text-xs text-black">
                {error?.message || 'Unknown error'}
              </p>
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
              <p className="mt-4 text-lg font-semibold text-black">
                Processing your video...
              </p>
              <p className="mt-2 text-sm text-black">
                This may take a moment
              </p>
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
              <h3 className="mt-4 text-lg font-semibold text-red-900">
                Analysis Failed
              </h3>
              <p className="mt-2 text-sm text-red-700">
                {error?.message || 'Unknown error occurred'}
              </p>
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
              <VideoSegmentEditor
                exercise={selectedExercise}
                videoUrl={videoEmbedUrl}
              />
            )}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-black">Select an exercise to view details</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
