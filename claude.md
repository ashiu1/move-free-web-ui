# MoveFree - Project Context

## Project Overview
MoveFree is a landing page for a fitness video documentation service that transforms workout videos into professional, structured documentation using AI. The application converts YouTube, Vimeo, and other video URLs into step-by-step workout guides with exercises, sets, reps, and form cues.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.3
- **TypeScript**: ^5
- **Styling**: Tailwind CSS v4
- **Package Manager**: npm

## Project Structure
```
move-free-web-ui/
├── app/
│   ├── apis/
│   │   ├── ExerciseApi.ts          # API functions for backend calls
│   │   └── ExerciseReactQuery.ts   # React Query hooks (usePostFitnessVideo, etc.)
│   ├── components/
│   │   ├── Header.tsx              # Navigation header with logo and menu
│   │   ├── UploaderBox.tsx         # Hero section with URL input
│   │   ├── HowItWorks.tsx          # Timeline showing 3-step process
│   │   ├── EffortlessConversion.tsx # Benefits section with 3 cards
│   │   ├── Footer.tsx              # Footer with links and social media
│   │   └── VideoUploader/          # Video analysis & editing components
│   │       ├── VideoUploader.tsx   # Main container with sidebar & content area
│   │       ├── ExerciseListItem.tsx # Sidebar list item for each exercise
│   │       ├── SourceVideoCard.tsx  # Full video view with analysis stats
│   │       └── VideoSegmentEditor.tsx # Individual exercise editor (WIP)
│   ├── providers/
│   │   └── QueryProvider.tsx       # React Query provider wrapper
│   ├── yt_editor/
│   │   └── page.tsx                # Video editor page route
│   ├── layout.tsx                  # Root layout with fonts and metadata
│   ├── page.tsx                    # Main landing page (imports all components)
│   └── globals.css                 # Global styles
├── package.json
└── next.config.ts
```

## Routes
- `/` - Landing page with hero, features, and CTA
- `/yt_editor` - Video analysis and editing interface
  - Query params: `url` (the video URL to process)

## Components Description

### Header (app/components/Header.tsx)
- Sticky navigation bar
- Logo with gradient background (M icon)
- Navigation links: How It Works, Features, Pricing
- Sign In and Get Started buttons
- Responsive with mobile menu support

### UploaderBox (app/components/UploaderBox.tsx)
- Hero section with gradient headline
- URL input field for video links
- Process Video button
- Client component with form handling
- Supports YouTube, Vimeo, and direct video URLs
- On submit: navigates to `/yt_editor?url={videoUrl}`

### HowItWorks (app/components/HowItWorks.tsx)
- 3-step process timeline
- Steps: Submit Video URL → AI Analysis → Generate Document
- Alternating left/right layout on desktop
- Vertical timeline on mobile
- Custom SVG icons for each step

### EffortlessConversion (app/components/EffortlessConversion.tsx)
- Benefits section with 3 feature cards
- Features:
  1. Smart Exercise Detection (blue-cyan gradient)
  2. Multiple Export Formats (purple-pink gradient)
  3. Form Cue Extraction (orange-red gradient)
- Hover effects with shadows and animations
- CTA button at bottom

### Footer (app/components/Footer.tsx)
- 4-column layout: Brand, Product, Company, Legal
- Social media icons (Twitter, GitHub, LinkedIn)
- Copyright with dynamic year
- Responsive grid layout

### Providers (app/providers/)

#### QueryProvider.tsx
- Client component wrapper for TanStack Query (React Query)
- Creates and provides QueryClient instance to the app
- Default options:
  - `staleTime`: 60 seconds (data stays fresh for 1 minute)
  - `refetchOnWindowFocus`: false (prevents refetch on tab switch)
- Wrapped in `layout.tsx` to make React Query available globally

### API Layer (app/apis/)

#### ExerciseApi.ts
- Contains raw API functions for backend communication
- **postFitnessVideo(url)**: Makes POST request to `http://127.0.0.1:5000/exercises`
  - Sends: `{ url: string }`
  - Returns: Analysis data with exercises, confidence, status
- **getExerciseData(url)**: Makes GET request to fetch exercise data
- Base URL: `http://127.0.0.1:5000`

#### ExerciseReactQuery.ts
- React Query hooks wrapping API functions
- **usePostFitnessVideo(url)**: TanStack Query hook for video analysis
  - Parameters: `url` - The video URL to analyze
  - Returns React Query object:
    - `data`: Analysis data from backend
    - `isLoading`: Boolean indicating request status
    - `isError`: Boolean indicating error state
    - `error`: Error object if request fails
  - Only runs query if URL is provided (enabled by `!!url`)
- **useExerciseData(url)**: Query hook for fetching exercise data

### VideoUploader Components (app/components/VideoUploader/)

#### VideoUploader.tsx (Main Component)
- Container component that manages the video analysis interface
- Split layout: sidebar (exercise list) + main content area
- Reads video URL from query parameter (`?url=...`)
- Converts YouTube URLs to embed format automatically:
  - `youtube.com/watch?v=VIDEO_ID` → `youtube.com/embed/VIDEO_ID`
  - `youtu.be/VIDEO_ID` → `youtube.com/embed/VIDEO_ID`
- Uses `usePostFitnessVideo` from `ExerciseReactQuery` to fetch analysis data
  - Makes POST request to `http://127.0.0.1:5000/exercises`
  - Passes original URL (not embed URL) to API
  - Uses converted embed URL for video player display
- Displays loading state with spinner while processing
- Displays error state if API call fails (shows error.message)
- Auto-selects "Full Video" when data loads
- Routes to appropriate sub-component based on selection:
  - Full Video → SourceVideoCard (with embed URL)
  - Individual Exercise → VideoSegmentEditor

#### ExerciseListItem.tsx
- Sidebar list item component for each detected exercise
- Two variants:
  1. Full Video item (blue play icon, shows duration)
  2. Exercise segment item (green checkmark, shows time range)
- Visual states: selected (blue highlight), unselected, hover
- Clickable to switch main content view

#### SourceVideoCard.tsx
- Displays full video with embedded YouTube player
- Shows analysis statistics in 3 cards:
  - Analysis Status (Complete/Processing)
  - AI Confidence (percentage)
  - Total Segments (number of clips)
- Video controls section with export button
- Only shown when "Full Video" is selected from sidebar

#### VideoSegmentEditor.tsx (Placeholder - WIP)
- Individual exercise editing interface
- Will display:
  - Video clip for specific exercise
  - Exercise details (name, timing, duration)
  - Goal & purpose section
  - Exercise description
  - Coaching tips and form cues
- Currently shows placeholder UI for development

## Design System

### Colors
- **Primary Gradient**: Blue (#3B82F6) to Purple (#9333EA)
- **Accent Gradients**:
  - Blue-Cyan: from-blue-500 to-cyan-500
  - Purple-Pink: from-purple-500 to-pink-500
  - Orange-Red: from-orange-500 to-red-500
- **Neutral Colors**: Gray scale (50, 200, 600, 900)
- **Background**: White with gray-50 accents

### Typography
- **Fonts**: Geist Sans and Geist Mono (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Hero**: text-5xl to text-6xl
- **Section Titles**: text-4xl
- **Body**: text-base to text-lg

### Spacing & Layout
- Max width: 7xl (1280px) for headers/footers
- Max width: 6xl (1152px) for content sections
- Max width: 5xl (1024px) for hero section
- Consistent padding: py-20 for sections
- Grid layouts: 3 columns on desktop, 1 on mobile

## Development Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Features to Implement (Future)
- [ ] Complete VideoSegmentEditor component implementation
- [ ] User authentication system
- [ ] Document export functionality (PDF, Word)
- [ ] User dashboard for saved workouts
- [ ] Payment integration for pricing plans
- [ ] Better error handling page for invalid video URLs
- [x] QueryClientProvider setup in layout for React Query ✓

## Styling Conventions
- Use Tailwind CSS utility classes
- Responsive design: mobile-first approach
- Gradients for CTAs and accent elements
- Hover states on interactive elements
- Shadow effects for depth (shadow-lg, shadow-xl)
- Rounded corners: rounded-lg (8px), rounded-2xl (16px)
- Transitions for smooth animations
- **Important**: When updating files, make sure styles are consistent for each recommendation

## Data Structures

### Analysis Data (from Backend API)
```typescript
interface Exercise {
  id: string;
  name: string;
  startTime?: string;  // Format: "0:10"
  endTime?: string;    // Format: "0:20"
  duration?: string;   // Format: "0:10"
}

interface AnalysisData {
  status: string;          // "Complete" | "Processing" | "Failed"
  confidence: number;      // 0-100
  totalSegments: number;   // Count of detected exercises
  videoUrl: string;        // YouTube embed URL
  exercises: Exercise[];   // Array of detected exercises
}
```

**Note**: First exercise in array should always be "Full Video" with id `full-video`

## State Management
- Uses **TanStack Query (React Query)** for server state management
  - Handles caching, loading, and error states automatically
  - Query keys: `['postFitnessVideo', url]`, `['getExerciseData', url]`
- Local component state with React useState:
  - UploaderBox: `url` (form input)
  - VideoUploader: `selectedExerciseId` (currently viewed exercise)
- No global state management yet (consider Zustand or Context API for future user/auth state)

## Notes
- All components are server components except UploaderBox (needs 'use client')
- Smooth scroll behavior for anchor links
- Accessible design with semantic HTML
- SEO-optimized with proper metadata in layout.tsx