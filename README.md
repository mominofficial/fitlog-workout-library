# FitLog — Workout Library

A modern, high-contrast, editorial gym companion and workout library application. FitLog is engineered for focused training: browse compound and isolation lifts, inspect deep movement specifications and numbered coaching cues, curate your daily plan capped at five focused movements, and save exercises for future sessions.

Built with Next.js App Router, TypeScript, and Tailwind CSS, featuring an athletic dark design system with neon-lime accents and persistent local client state.

---

## Technologies Used

- **Next.js (v16 App Router)** — Server and client rendering architecture
- **TypeScript** — Strictly typed interfaces for workouts, specs, and state
- **Tailwind CSS (v4)** — Custom dark editorial design system and tokens
- **React (v19)** — Hooks, context architecture, and dynamic UI state
- **Lucide React** — High-precision minimalist iconography
- **FitLog REST API** — Live remote dataset for library and detailed workout records
- **HTML5 Web Storage (localStorage)** — Safe SSR-hydrated client persistence

---

## Key Features

1. **Workout Library**: Clean 3-column athletic grid displaying lifts across all major muscle groups with cover imagery, category tags, equipment requirements, and core metrics.
2. **Workout Detail Pages**: Deep editorial two-column layouts featuring full-bleed movement illustrations, key specifications (equipment, difficulty, sets, reps, duration, calories, rating), and dynamic numbered instructions.
3. **Today's Plan**: Interactive routine builder capped at 5 lifts for focused daily execution.
4. **Saved Workouts**: Dedicated library bookmarking system allowing users to save exercises for future planning.
5. **Dynamic Metric Calculations**: Real-time aggregated statistics for Exercises count, Total Duration (minutes), and Total Burn (calories).
6. **Live Multi-Criteria Sorting**: Real-time sorting by Duration, Calories Burned, or Community Rating with ascending and descending order toggling.
7. **Workout Completion Tracking**: "Mark as Done" feature providing visual strikethrough, completion badges, and persisted progress.
8. **Plan Cap Enforcement**: Strict 5-workout maximum protection preventing routine overload, with proactive UI disabling and feedback.
9. **Duplicate Prevention**: Automated safeguards preventing duplicate additions in both Today's Plan and Saved lists.
10. **Toast Notification System**: Custom bottom-anchored animated toast feedback confirming additions, removals, state changes, and cap warnings.
11. **Local State Persistence**: All routine modifications, saved lifts, and completion states safely persist across reloads using `localStorage`.
12. **Custom 404 Experience**: Dedicated athletic 404 page matching the dark FitLog aesthetic with direct navigation back to the library.
13. **Responsive Architecture**: Fully responsive across mobile, tablet, desktop, and ultra-wide viewports with zero horizontal overflow.

---

## FitLog REST API

FitLog integrates with the live FitLog Cloudflare Workers API:

- **All Workouts Endpoint**:  
  `GET https://api.abcz.workers.dev/api/fitlog`  
  Returns the complete array of workout records.

- **Single Workout Endpoint**:  
  `GET https://api.abcz.workers.dev/api/fitlog/:id`  
  Returns detailed specifications, muscle groups, equipment, and numbered instructions for a given exercise ID.

### Data Model

```typescript
interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;        // minutes
  caloriesBurned: number;  // calories
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}
```

---

## Project Structure

```text
fitlog/
├── app/
│   ├── layout.tsx         # Root layout with Google fonts (Oswald, Inter), Navbar, Footer
│   ├── globals.css        # Exact FitLog design tokens, custom dark scrollbar, typography
│   ├── page.tsx           # Homepage with Hero, Library grid, and Sort controls
│   ├── not-found.tsx      # Custom 404 page with return to library CTA
│   ├── my-plan/
│   │   └── page.tsx       # My Plan dashboard with dynamic metrics, tabs, and completion actions
│   └── workout/
│       └── [id]/
│           └── page.tsx   # Dynamic workout detail route with server fetching and metadata
├── components/
│   ├── Navbar.tsx         # Responsive sticky header with brand logo and live counters
│   ├── Footer.tsx         # Minimal dark athletic footer with copyright and brand mark
│   ├── Hero.tsx           # Two-column homepage hero with anatomical illustration and CTA
│   ├── WorkoutCard.tsx    # Card component with image fallback, tags, and stats row
│   ├── WorkoutGrid.tsx    # Responsive grid with sorting controls, error, and empty states
│   ├── WorkoutDetail.tsx  # Editorial two-column workout spec and instruction sheet
│   ├── MetricCard.tsx     # Large Oswald stat card for dynamic plan summaries
│   ├── SortDropdown.tsx   # Custom dark dropdown for sorting by Duration, Calories, Rating
│   ├── LoadingState.tsx   # Polished animated loading indicator and skeleton cards
│   └── EmptyState.tsx     # Editorial empty state component with contextual CTA
├── lib/
│   ├── api.ts             # API client with error handling and response validation
│   ├── context.tsx        # Central React context provider for plan, saved, and toast state
│   ├── storage.ts         # SSR-safe localStorage persistence wrapper
│   ├── types.ts           # TypeScript interfaces and type definitions
│   └── utils.ts           # Class merging, step number formatting, and sorting functions
└── public/
    ├── banner.png         # Main Hero anatomical workout visual
    └── logo.png           # Brand neon-lime dumbbell logo icon
```

---

## Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher recommended)
- npm, pnpm, or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mominofficial/fitlog-workout-library.git
cd fitlog-workout-library
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Create an optimized production build and launch the server:

```bash
npm run build
npm run start
```

### Code Quality & Linting

Run ESLint to verify code quality:

```bash
npm run lint
```

---

## Design System Tokens

FitLog uses a strict, low-noise dark palette with high-contrast neon accents:

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--background` | `#0F1115` | Primary application canvas background |
| `--background-deep` | `#090A0D` | Deep background and footer base |
| `--surface` | `#15171D` | Primary card and hero background |
| `--surface-2` | `#13161D` | Secondary panel and item surface |
| `--surface-3` | `#151921` | Elevated surface |
| `--border` | `#1F242D` | Structural borders and dividers |
| `--text` | `#FFFFFF` | Primary headlines and high-emphasis text |
| `--text-secondary` | `#E5E7EB` | Body text and values |
| `--muted` | `#9CA3AF` | Supporting descriptions and metadata |
| `--muted-2` | `#8A92A0` | Secondary muted text and labels |
| `--accent` | `#CCFF00` | Signature neon-lime primary interactive accent |
| `--accent-2` | `#C2F800` | Secondary neon highlight for eyebrows |

---

## Deployment

FitLog is optimized for zero-configuration deployment on **Vercel**:

1. Push your changes to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Vercel automatically detects Next.js App Router and applies optimal build settings (`next build`).
4. Output directory defaults to `.next`.

Alternatively, deploy directly via the Vercel CLI:

```bash
npx vercel --prod
```

---

## License

MIT © 2026 FitLog. Train hard, log honest.
