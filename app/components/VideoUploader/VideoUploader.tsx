'use client';

import { useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import SourceVideoCard from './SourceVideoCard';
import VideoSegmentEditor from './VideoSegmentEditor';

interface Exercise {
  id: string;
  name: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
}

interface AnalysisData {
  status: string;
  confidence: number;
  totalSegments: number;
  videoUrl: string;
  exercises: Exercise[];
}

export default function VideoUploader() {
  // This will be populated from API call later
  // const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');
  // const [isLoading, setIsLoading] = useState(false);

  // Mock data for development - remove when API is integrated
  const mockData: AnalysisData = {
    status: 'Complete',
    confidence: 98,
    totalSegments: 5,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    exercises: [
      {
        id: 'full-video',
        name: 'Full Workout',
        duration: '1:59',
      },
      {
        id: 'exercise-1',
        name: 'Hamstring Stretch',
        startTime: '0:10',
        endTime: '0:20',
        duration: '0:10',
      },
      {
        id: 'exercise-2',
        name: 'Downward Dog',
        startTime: '0:31',
        endTime: '0:45',
        duration: '0:14',
      },
      {
        id: 'exercise-3',
        name: 'Plank Hold',
        startTime: '0:50',
        endTime: '1:05',
        duration: '0:15',
      },
      {
        id: 'exercise-4',
        name: 'Cool Down',
        startTime: '1:10',
        endTime: '1:30',
        duration: '0:20',
      },
    ],
  };

  // Set initial selected exercise to full video when data loads
  if (mockData && !selectedExerciseId) {
    setSelectedExerciseId('full-video');
  }

  const handleExerciseClick = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
  };

  const selectedExercise = mockData?.exercises.find(
    (ex) => ex.id === selectedExerciseId
  );

  return (
    <div className="flex flex-1 bg-gray-50">
      {/* Left Sidebar - Exercise List */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Detected Exercises
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {mockData?.exercises.length || 0} segments detected
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          {mockData?.exercises.map((exercise) => (
            <ExerciseListItem
              key={exercise.id}
              exercise={exercise}
              isSelected={selectedExerciseId === exercise.id}
              onClick={() => handleExerciseClick(exercise.id)}
              isFullVideo={exercise.id === 'full-video'}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {selectedExercise && (
          <div className="p-6">
            {selectedExercise.id === 'full-video' ? (
              <SourceVideoCard
                videoUrl={mockData.videoUrl}
                status={mockData.status}
                confidence={mockData.confidence}
                totalSegments={mockData.totalSegments}
              />
            ) : (
              <VideoSegmentEditor exercise={selectedExercise} />
            )}
          </div>
        )}

        {!selectedExercise && (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">Select an exercise to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
