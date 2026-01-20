# AI Video Composition Template

A comprehensive Remotion-based video composition template for AI agents, featuring 60+ packages and modular components for creating stunning videos.

## 📁 Directory Structure

```
src/templates/
├── index.tsx                  # Entry point exports
├── AIComposition.tsx          # Main composition orchestrator
├── scenes/
│   ├── ThreeScene.tsx         # Three.js 3D rendering
│   ├── PixiScene.tsx          # PixiJS v8 2D graphics
│   ├── ShapesScene.tsx        # Remotion shapes & paths
│   ├── D3Chart.tsx             # D3.js data visualization
│   ├── NoiseTexture.tsx        # Simplex noise effects
│   └── TextEffects.tsx        # Splitting.js typography
├── ui/
│   ├── Captions.tsx           # Subtitle/caption system
│   ├── AnimatedEmojis.tsx     # Animated emoji stickers
│   └── StyledComponents.tsx   # Tailwind + CVA components
├── effects/
│   ├── GSAPTimeline.tsx       # GSAP frame-synced animations
│   ├── Transitions.tsx        # Scene transitions
│   └── MotionBlur.tsx         # Motion blur effects
└── assets/
    ├── MediaLoader.tsx        # Audio/video loading
    ├── FontsLoader.tsx        # Google fonts integration
    └── LottieAnimation.tsx    # Lottie JSON animations
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { AIComposition } from './templates/AIComposition';
import { VIDEO_CONFIG } from './templates/AIComposition';

// In Root.tsx
<Composition
  id="AI-Video-Composition"
  component={AIComposition}
  durationInFrames={VIDEO_CONFIG.durationInFrames}
  fps={VIDEO_CONFIG.fps}
  height={VIDEO_CONFIG.height}
  width={VIDEO_CONFIG.width}
/>
```

### Custom Components

```tsx
// Import individual components
import { ThreeScene } from './templates/scenes/ThreeScene';
import { PixiScene } from './templates/scenes/PixiScene';

export const MyCustomComposition = () => {
  return (
    <AbsoluteFill>
      <ThreeScene />
      <PixiScene />
    </AbsoluteFill>
  );
};
```

## 📦 Package Reference

### Three.js 3D
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for React Three Fiber
- `@remotion/three` - Three.js integration for Remotion
- `three` - 3D graphics library
- `@types/three` - TypeScript definitions

**Usage:** See `scenes/ThreeScene.tsx`

### PixiJS 2D
- `pixi.js` - High-performance 2D WebGL renderer
- `pixi-filters` - Filters for PixiJS

**Usage:** See `scenes/PixiScene.tsx`

### Remotion Core
- `remotion` - Core Remotion framework
- `@remotion/shapes` - Shape components
- `@remotion/paths` - Path utilities
- `@remotion/transitions` - Scene transitions
- `@remotion/captions` - Caption system
- `@remotion/layout-utils` - Layout helpers
- `@remotion/fonts` - Font loading
- `@remotion/google-fonts` - Google fonts
- `@remotion/lottie` - Lottie animations
- `@remotion/animated-emoji` - Animated emojis
- `@remotion/preload` - Asset preloading
- `@remotion/media-utils` - Media utilities
- `@remotion/motion-blur` - Motion blur effect

**Usage:** See respective component files

### GSAP
- `gsap` - Timeline-based animations

**Usage:** See `effects/GSAPTimeline.tsx`

### D3.js
- `d3-shape` - Data visualization shapes
- `d3-path` - Path utilities
- `@types/d3-shape` - TypeScript definitions

**Usage:** See `scenes/D3Chart.tsx`

### Noise & Effects
- `simplex-noise` - Procedural noise generation
- `splitting` - Text splitting for animations
- `@types/splitting` - TypeScript definitions

**Usage:** See `scenes/NoiseTexture.tsx`, `scenes/TextEffects.tsx`

### Styling
- `tailwindcss` - Utility-first CSS
- `@tailwindcss/postcss` - Tailwind PostCSS plugin
- `@radix-ui/react-slot` - Radix UI primitives
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes
- `tailwind-merge` - Tailwind class merging

**Usage:** See `ui/StyledComponents.tsx`

## 🎨 Component Examples

### Three.js 3D Scene
```tsx
import { ThreeScene } from './templates/scenes/ThreeScene';

<Sequence from={0} durationInFrames={300}>
  <ThreeScene />
</Sequence>
```

### PixiJS 2D Graphics
```tsx
import { PixiScene } from './templates/scenes/PixiScene';

<Sequence from={30} durationInFrames={270}>
  <PixiScene />
</Sequence>
```

### GSAP Animations
```tsx
import { GSAPTimeline } from './templates/effects/GSAPTimeline';

<Sequence from={0} durationInFrames={300}>
  <GSAPTimeline />
</Sequence>
```

### Captions
```tsx
import { Captions } from './templates/ui/Captions';

<Sequence from={60} durationInFrames={240}>
  <Captions />
</Sequence>
```

## 🔧 Configuration

Update `VIDEO_CONFIG` in `AIComposition.tsx`:

```tsx
export const VIDEO_CONFIG = {
    width: 1080,           // Video width in pixels
    height: 1920,          // Video height in pixels
    fps: 30,               // Frames per second
    durationInFrames: 300, // Total duration (10 seconds @ 30fps)
    id: "AI-Video-Composition"
};
```

## 📝 AI Agent Guidelines

### Writing Video Code
1. **Always cleanup** effects in `useEffect` return statements
2. **Sync animations** to Remotion frames using `useCurrentFrame()`
3. **Use AbsoluteFill** for full-screen components
4. **Wrap in Sequence** to control timing
5. **Import only** packages listed in `package.json`

### Best Practices
- Keep components self-contained
- Use memoization for expensive calculations
- Test animations frame by frame
- Optimize for rendering performance
- Follow existing code style

### Example Template Structure
```tsx
import { useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence } from 'remotion';
import { useEffect, useRef } from 'react';

export const MyComponent = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const ref = useRef<any>(null);

    useEffect(() => {
        // Setup logic
        return () => {
            // Cleanup logic
        };
    }, []);

    return (
        <AbsoluteFill style={{ background: '#000' }}>
            {/* Your content */}
        </AbsoluteFill>
    );
};
```

## 🎬 Rendering

### Preview
```bash
npm run dev
```

### Render Video
```bash
npm run render
```

### Render ProRes
```bash
npm run render:prores
```

## 📚 Additional Resources

- [Remotion Docs](https://www.remotion.dev/docs)
- [Three.js Docs](https://threejs.org/docs/)
- [PixiJS Docs](https://pixijs.io/docs/)
- [GSAP Docs](https://greensock.com/docs/)
- [D3.js Docs](https://d3js.org/)

## 🤝 Contributing

When adding new features:
1. Create modular components in appropriate directories
2. Follow existing code conventions
3. Add JSDoc comments for AI agents
4. Update this README
5. Test rendering with `npm run render`
