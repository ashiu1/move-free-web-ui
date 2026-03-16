'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Exercise } from '@/app/apis/types';
import ExerciseListItem from '../VideoUploader/ExerciseListItem';

interface AnalysisData {
  exercises: Exercise[];
}

export default function FileUploader() {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const filename = searchParams.get('filename') || 'Uploaded file';

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('file_exercise_data');
      if (!stored) {
        setError('No analysis data found. Please upload a file first.');
        return;
      }
      const data = JSON.parse(stored);
      setAnalysisData(data);
      setSelectedExerciseIndex(0);
    } catch {
      setError('Failed to load analysis data.');
    }
  }, []);

  const selectedExercise: Exercise | undefined =
    analysisData?.exercises?.[selectedExerciseIndex];

  return (
    <div className="flex flex-1 bg-gray-50 relative">
      {/* Fixed Cancel Button */}
      <div className="fixed top-24 right-8 z-50">
        <button
          onClick={() => router.push('/')}
          className="rounded-lg border-2 border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
        >
          Cancel
        </button>
      </div>

      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-black uppercase tracking-wide">
            Detected Exercises
          </h2>
          <p className="text-xs text-black mt-1 truncate" title={filename}>
            {filename}
          </p>
          <p className="text-xs text-black mt-0.5">
            {analysisData?.exercises.length || 0} segments detected
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          {error ? (
            <div className="p-4 text-center">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : !analysisData ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
                <p className="mt-3 text-sm text-black">Loading...</p>
              </div>
            </div>
          ) : (
            analysisData.exercises.map((exercise, index) => (
              <ExerciseListItem
                key={`exercise-${index}`}
                exercise={exercise}
                isSelected={selectedExerciseIndex === index}
                onClick={() => setSelectedExerciseIndex(index)}
                isFullVideo={index === 0}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {error ? (
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
              <p className="mt-2 text-sm text-red-700">{error}</p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-sm font-semibold text-white"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : selectedExercise ? (
          <div className="p-6">
            <div className="mx-auto max-w-5xl">
              {/* File summary card for first item */}
              {selectedExerciseIndex === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 truncate max-w-md">{filename}</h2>
                      <p className="text-sm text-gray-500">Analysis complete</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{analysisData?.exercises.length || 0}</p>
                      <p className="text-xs text-gray-500 mt-1">Total Segments</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">Complete</p>
                      <p className="text-xs text-gray-500 mt-1">Status</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">AI</p>
                      <p className="text-xs text-gray-500 mt-1">Powered</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Select an exercise from the sidebar to view its details and description.
                  </p>
                </div>
              ) : (
                /* Exercise detail view */
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedExercise.name}</h2>
                      {selectedExercise.timestamp && (
                        <p className="mt-1 text-sm text-gray-500">
                          Time: {selectedExercise.timestamp}
                        </p>
                      )}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {selectedExercise.description && (
                    <div className="mt-6">
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{selectedExercise.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-black">Select an exercise to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
