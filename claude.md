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
│   ├── components/
│   │   ├── Header.tsx              # Navigation header with logo and menu
│   │   ├── UploaderBox.tsx         # Hero section with URL input
│   │   ├── HowItWorks.tsx          # Timeline showing 3-step process
│   │   ├── EffortlessConversion.tsx # Benefits section with 3 cards
│   │   └── Footer.tsx              # Footer with links and social media
│   ├── layout.tsx                  # Root layout with fonts and metadata
│   ├── page.tsx                    # Main landing page (imports all components)
│   └── globals.css                 # Global styles
├── package.json
└── next.config.ts
```

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
- [ ] Video processing backend integration
- [ ] User authentication system
- [ ] Document export functionality (PDF, Word)
- [ ] User dashboard for saved workouts
- [ ] Payment integration for pricing plans
- [ ] API endpoints for video analysis

## Styling Conventions
- Use Tailwind CSS utility classes
- Responsive design: mobile-first approach
- Gradients for CTAs and accent elements
- Hover states on interactive elements
- Shadow effects for depth (shadow-lg, shadow-xl)
- Rounded corners: rounded-lg (8px), rounded-2xl (16px)
- Transitions for smooth animations
- **Important**: When updating files, make sure styles are consistent for each recommendation

## State Management
- Currently using React useState for form inputs
- No global state management yet (consider Zustand or Context API for future features)

## Notes
- All components are server components except UploaderBox (needs 'use client')
- Smooth scroll behavior for anchor links
- Accessible design with semantic HTML
- SEO-optimized with proper metadata in layout.tsx