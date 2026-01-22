# 🎬 Remotion Video Sandbox

A production-ready Remotion video sandbox with comprehensive template library for AI agents.

## Features

### ✅ Complete Template Library (2D Only)

**Typography** (6 templates)
- `Heading` - Main titles with reveal/slide/scale/blur animations
- `Subheading` - Subtitles with typewriter/fade/blur effects
- `GlitchText` - Cyberpunk glitch text effect
- `Typewriter` - Typewriter typing animation
- `SplitText` - Word/char/line split reveals
- `CodeBlock` - Syntax-highlighted code display

**Graphics** (8 templates)
- `GeometricShapes` - Circles, rectangles, polygons, stars
- `GradientOverlay` - 10 gradient presets
- `MeshGradient` - Animated mesh gradients
- `PatternBackground` - Grid, dots, diagonal, checkerboard, waves, zigzag, circles
- `AnimatedPattern` - Pulse-grid, moving-dots, expanding-circles, scanning-lines
- `BorderGlow` - Neon glow borders
- `NeonText` - Neon text effect
- `NoiseTexture` / `FilmGrain` - Film grain overlay
- `Vignette` - Vignette effect

**Charts** (5 templates)
- `BarChart` - Horizontal/vertical animated bar charts
- `LineChart` - Animated line graphs with fill
- `ProgressRing` - Circular progress indicator
- `ProgressBar` - Linear progress bar
- `DonutChart` - Animated donut charts

**Effects** (8 templates)
- `MotionBlur` - Directional blur
- `ChromaticAberration` - RGB split effect
- `ColorOverlay` - Color filters
- `FilmGrain` / `NoiseTexture` - Texture overlays
- `BlurEffect` - Blur filter
- `SepiaEffect` - Sepia filter
- `GrayscaleEffect` - Grayscale filter

**Transitions** (6 templates)
- `Fade` - Fade in/out/cross
- `Slide` - Slide left/right/up/down
- `Wipe` - Directional wipe
- `Zoom` - Zoom in/out
- `BlurTransition` - Blur transition
- `GlitchTransition` - Glitch transition

**Overlays** (5 templates)
- `LowerThird` - Name/title lower thirds (4 styles)
- `Captions` - Subtitle overlays
- `CenterText` - Centered text cards
- `BugLogo` - Logo placement
- `Timestamp` - Time/frame display

**Media** (4 templates)
- `ImageFrame` - Ken Burns effect (zoom/pan directions)
- `AudioWaveform` - Audio waveform visualization
- `AudioBars` - Frequency bars animation
- `VideoBackground` - Background video

**Animation** (5 templates)
- `Entrance` - slide/scale/fade/rotate entrances
- `Continuous` - pulse/bounce/shake/wiggle/float/spin/breathe
- `Countdown` - Animated countdown timer
- `Counter` - Number counter animation
- `LoadingSpinner` - Loading indicator

### ✅ Rendering Pipeline

**Platform Presets:**
- TikTok (1080x1920 @ 30fps)
- Reels (1080x1920 @ 30fps)
- YouTube Shorts (1080x1920 @ 60fps)
- YouTube (1920x1080 @ 60fps)
- Twitter (1280x720 @ 30fps)
- LinkedIn (1200x627 @ 30fps)
- Instagram Post (1080x1080 @ 30fps)
- Generic Vertical/Horizontal

**Quality Tiers:**
- Draft (CRF 28, 2M bitrate, ultrafast)
- Standard (CRF 23, 5M bitrate, fast)
- High (CRF 18, 10M bitrate, medium)
- Professional (CRF 15, 20M bitrate, slow)

### ✅ UI Components (shadcn/ui)

**Core Components:**
- Button, Card, Input, Textarea, Slider

**Video Components:**
- Timeline - Frame scrubber with playback controls
- ExportSettings - Export panel with platform/quality selection
- PlaybackControls - Play/pause/prev/next controls
- SceneSelector - Scene list management

### ✅ Curated Fonts (15 fonts)

**Sans-serif:** Inter, Poppins, Montserrat, Roboto, Open Sans, Lato
**Serif:** Playfair Display
**Display:** Oswald, Bebas Neue, Anton
**Monospace:** JetBrains Mono, Fira Code, Space Mono
**Handwriting:** Dancing Script, Permanent Marker

### ✅ Color Presets

- dark, light, neon, sunset, ocean, forest

### ✅ Workspace Structure

```
sandbox/src/workspace/
├── .agent-instructions/
│   ├── README.md           # AI agent guidelines
│   ├── composition-guide.md
│   └── template-usage.md
├── components/
│   ├── SceneContainer.tsx  # Scene wrapper with animations
│   └── TextLayer.tsx       # Text layer with variants
├── examples/
│   ├── basic/
│   │   ├── hello-world.tsx
│   │   └── title-card.tsx
│   ├── social/
│   │   ├── tiktok-intro.tsx
│   │   └── youtube-shorts.tsx
│   ├── effects/
│   │   ├── glitch-title.tsx
│   │   └── animated-chart.tsx
│   └── complete/
│       ├── product-announcement.tsx
│       └── test-composition.tsx  # ⭐ VERIFICATION TEST
├── utils/
│   ├── fonts.ts            # Font configuration
│   ├── colors.ts           # Color presets & gradients
│   ├── timing.ts           # Frame utilities
│   └── constants.ts        # Common constants
└── index.ts                # Barrel export
```

## Quick Start

```bash
# Install dependencies
cd sandbox
npm install

# Start development server
npm run dev

# Start render server (separate terminal)
npm run server

# Open player
# Navigate to http://localhost:5173
```

## Usage Example

```tsx
import { Heading, Subheading } from '../templates/typography';
import { BarChart } from '../templates/charts';
import { LowerThird } from '../templates/overlay';
import { GradientOverlay } from '../templates/graphics';
import { getColorPreset } from '../utils/colors';

export const MyVideo = () => {
    return (
        <div style={{ background: '#0a0a0a' }}>
            <GradientOverlay type="neon" opacity={0.8} />
            <Heading 
                text="Hello World" 
                animation="reveal"
                startFrame={0}
            />
            <Subheading 
                text="Welcome to the sandbox"
                animation="typewriter"
                startFrame={30}
            />
            <BarChart
                data={[{ label: 'A', value: 40 }, { label: 'B', value: 70 }]}
                startFrame={60}
            />
            <LowerThird 
                name="Creator" 
                title="Channel"
                startFrame={90}
            />
        </div>
    );
};
```

## Test Composition

Run the comprehensive test composition to verify all templates:

1. Start the server: `npm run dev`
2. Select "TestComposition" from the dropdown
3. The test includes 8 scenes covering all template categories

## Rendering API

```bash
# Render with YouTube preset, high quality
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "composition": "MyComposition",
    "preset": "youtube",
    "quality": "high"
  }'

# Check status
curl http://localhost:3001/api/status

# Download rendered video
curl http://localhost:3001/api/download/filename.mp4
```

## AI Agent Instructions

The sandbox includes comprehensive AI agent instructions in `.agent-instructions/README.md` covering:
- Frame-accurate animation patterns
- Template usage guide
- Composition structure
- Common patterns and best practices

## File Structure

```
sandbox/
├── server.ts                 # Enhanced render server
├── tailwind.config.js        # Tailwind configuration
├── src/
│   ├── index.tsx             # Main entry (exports all compositions)
│   ├── components/ui/        # shadcn UI components
│   ├── templates/            # All template categories
│   ├── workspace/            # Workspace structure & examples
│   └── utils/                # Fonts, colors, timing, constants
└── package.json
```

## Dependencies

- **Remotion** - Video rendering framework
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI component library
- **Express** - Render server
- **D3.js** - Chart rendering
- **Simplex Noise** - Noise generation

---

## Original Documentation

### Rendering Videos

This sandbox includes a backend API that uses Remotion CLI to render videos server-side with real-time progress updates via Server-Sent Events (SSE) and **social media presets**.

#### Running the Application

To run both frontend and backend servers simultaneously:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

**Important:** The backend server runs on port 3001 and must be started for the render button to work.

#### Using the Render Button

1. Make sure both the frontend (Vite dev server) and backend (Express server) are running
2. Select a social media preset from the dropdown menu
3. Click the "Render & Save Video" button
4. A real-time progress panel will appear showing progress
5. The video will be automatically downloaded as MP4 when complete

#### Social Media Presets

Each preset is optimized for its target platform with CRF, bitrate, and quality settings.

#### Real-Time Progress Features

The render API uses Server-Sent Events (SSE) to provide real-time updates:
- Status Events: Current stage (initializing, bundling, selecting, rendering)
- Progress Events: Detailed progress information
- Complete Event: Video finished and ready for download
- Error Event: Render failed with error details

#### API Endpoints

- `POST /api/render` - Start rendering a video
- `GET /api/download/:filename` - Download a rendered video
- `GET /api/status` - Check if the render API is ready

#### Manual CLI Rendering

```bash
# Render as MP4
npm run render

# Render as ProRes
npm run render:prores
```
