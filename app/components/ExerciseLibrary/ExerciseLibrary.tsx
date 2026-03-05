'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WorkoutCard from './WorkoutCard';

// Placeholder workout data
const PLACEHOLDER_WORKOUTS = [
  {
    id: '1',
    title: 'Full Body Mobility',
    exerciseCount: 12,
    date: 'Oct 12, 2023',
    duration: '12:30',
    imageUrl:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'HIIT Cardio Blast',
    exerciseCount: 16,
    date: 'Oct 10, 2023',
    duration: '36:45',
    imageUrl:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Lower Body Strength',
    exerciseCount: 10,
    date: 'Oct 08, 2023',
    duration: '32:00',
    imageUrl:
      'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Yoga Flow Basics',
    exerciseCount: 8,
    date: 'Oct 05, 2023',
    duration: '44:15',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Core Stabilizer',
    exerciseCount: 14,
    date: 'Oct 02, 2023',
    duration: '18:30',
    imageUrl:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    title: 'Upper Body Pump',
    exerciseCount: 11,
    date: 'Sep 28, 2023',
    duration: '19:50',
    imageUrl:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop',
  },
];

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredWorkouts = PLACEHOLDER_WORKOUTS.filter((workout) =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black">Saved Workouts</h1>
          <p className="mt-2 text-black">
            Manage and view your converted YouTube exercise guides.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workouts by name or muscle group..."
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {/* Filter button */}
            <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors hover:bg-gray-100">
              <svg
                className="h-5 w-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Workout Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              title={workout.title}
              exerciseCount={workout.exerciseCount}
              date={workout.date}
              duration={workout.duration}
              imageUrl={workout.imageUrl}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredWorkouts.length === 0 && (
          <div className="py-20 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-black">
              No workouts found
            </h3>
            <p className="mt-2 text-black">Try adjusting your search query</p>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => router.push('/')}
          className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-all hover:bg-green-600 hover:shadow-2xl"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
