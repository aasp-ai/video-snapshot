# Test Composition Guide

## Overview

The `TestComposition` is a comprehensive verification composition that tests all templates and components created in the sandbox. It contains 8 scenes, each showcasing different categories of templates.

## Running the Test

```bash
# Start the dev server
cd sandbox
npm run dev

# Start the render server (in another terminal)
npm run server

# Open the player
# Navigate to http://localhost:5173
# Select "TestComposition" from the dropdown
```

## Scene Breakdown

### Scene 1: Introduction (Frames 0-120)
**Tests:**
- `GlitchText` - Cyberpunk glitch effect
- `Typewriter` - Typewriter text animation
- `LowerThird` - Lower third overlay
- `NoiseTexture` - Film grain overlay
- `GradientOverlay` - Neon gradient background

**Key Code:**
```tsx
<GlitchText text="TEMPLATE TEST" />
<Typewriter text="Testing all templates..." />
<LowerThird name="Test Suite" title="Template Verification" />
<NoiseTexture opacity={0.03} />
```

### Scene 2: Typography Templates (Frames 120-240)
**Tests:**
- `Heading` - Main heading with reveal animation
- `SplitText` - Word-by-word reveals
- `SplitText` - Character-by-character reveals

**Key Code:**
```tsx
<Heading text="Typography Templates" animation="reveal" />
<SplitText text="Split text by word" animation="word" />
<SplitText text="Character by character" animation="char" />
```

### Scene 3: Bar Chart (Frames 240-360)
**Tests:**
- `BarChart` - Animated bar chart
- `PatternBackground` - Grid pattern

**Key Code:**
```tsx
<BarChart
  data={[
    { label: 'A', value: 40, color: '#3b82f6' },
    { label: 'B', value: 70, color: '#8b5cf6' },
    // ...
  ]}
/>
<PatternBackground pattern="grid" color="#3b82f6" />
```

### Scene 4: Line Chart (Frames 360-480)
**Tests:**
- `LineChart` - Animated line graph with fill
- Smooth path animation

**Key Code:**
```tsx
<LineChart
  data={lineData}
  strokeColor="#00ff88"
  fillColor="#00ff88"
  fillOpacity={0.1}
  smooth
/>
```

### Scene 5: Progress Rings & Donut (Frames 480-600)
**Tests:**
- `ProgressRing` - Circular progress indicator
- `DonutChart` - Animated donut chart with center text

**Key Code:**
```tsx
<ProgressRing progress={0.75} size={200} />
<DonutChart
  data={chartData}
  size={200}
  centerText="100%"
/>
```

### Scene 6: Overlays & Effects (Frames 600-720)
**Tests:**
- `BorderGlow` - Neon glow border effect
- `CenterText` - Centered text card
- `Captions` - Caption overlay

**Key Code:**
```tsx
<BorderGlow color="#3b82f6">
  <CenterText text="Border Glow" />
</BorderGlow>
<Captions text="Caption overlay template" />
```

### Scene 7: Animation Templates (Frames 720-840)
**Tests:**
- `Countdown` - Animated countdown timer
- `Continuous` - Pulsing animation
- `Heading` with slideUp animation
- `GradientOverlay` - Sunset gradient

**Key Code:**
```tsx
<Countdown from={5} to={0} />
<Continuous animation="pulse">
  <div style={{ ... }} />
</Continuous>
<GradientOverlay type="sunset" />
```

### Scene 8: Geometric Shapes (Frames 840-960)
**Tests:**
- `GeometricShapes` - Various shape types
- `LowerThird` - Final lower third
- `PatternBackground` - Animated circles pattern

**Key Code:**
```tsx
<GeometricShapes
  shapes={[
    { type: 'circle', radius: 60, color: '#3b82f6', animation: 'pulse' },
    { type: 'rect', width: 80, height: 80, color: '#8b5cf6', animation: 'rotate' },
    { type: 'polygon', sides: 6, radius: 50, color: '#06b6d4' },
    { type: 'star', sides: 5, radius: 45, color: '#10b981' },
  ]}
/>
```

## Available Templates

### Typography
| Template | Description |
|----------|-------------|
| `Heading` | Main titles with animation options |
| `Subheading` | Subtitles with typewriter, fade, blur |
| `GlitchText` | Cyberpunk glitch effect |
| `Typewriter` | Typewriter text effect |
| `SplitText` | Word/char/line split reveals |

### Graphics
| Template | Description |
|----------|-------------|
| `GeometricShapes` | Rectangles, circles, polygons, stars |
| `GradientOverlay` | Gradient backgrounds |
| `PatternBackground` | Grid, dots, diagonal patterns |
| `BorderGlow` | Neon glow border |
| `NoiseTexture` | Film grain overlay |

### Charts
| Template | Description |
|----------|-------------|
| `BarChart` | Animated bar graphs |
| `LineChart` | Animated line charts |
| `ProgressRing` | Circular progress |
| `DonutChart` | Donut/pie chart |

### Effects
| Template | Description |
|----------|-------------|
| `MotionBlur` | Directional blur |
| `ChromaticAberration` | RGB split effect |
| `FilmGrain` | Film grain texture |
| `ColorOverlay` | Color filter overlay |

### Transitions
| Template | Description |
|----------|-------------|
| `Fade` | Fade in/out |
| `Slide` | Slide transitions |
| `Wipe` | Wipe transitions |
| `Zoom` | Zoom in/out |

### Overlays
| Template | Description |
|----------|-------------|
| `LowerThird` | Name/title lower third |
| `Captions` | Subtitle overlay |
| `CenterText` | Centered text card |
| `BugLogo` | Logo placement |
| `Timestamp` | Time display |

### Media
| Template | Description |
|----------|-------------|
| `ImageFrame` | Ken Burns effect |
| `AudioWaveform` | Audio visualization |
| `AudioBars` | Frequency bars |

### Animation
| Template | Description |
|----------|-------------|
| `Entrance` | Entry animations |
| `Continuous` | Looping animations |
| `Countdown` | Countdown timer |
| `Counter` | Number counter |

## Export Testing

Test the render pipeline:

```bash
# Test render API
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "composition": "TestComposition",
    "preset": "youtube",
    "quality": "high"
  }'
```

## Color Presets

Available color schemes:
- `dark` - Dark theme (#0a0a0a background)
- `light` - Light theme
- `neon` - Neon cyberpunk
- `sunset` - Sunset colors
- `ocean` - Ocean blues
- `forest` - Forest greens

## Font Usage

Curated fonts available:
- Inter, Poppins, Montserrat (sans-serif)
- Playfair Display (serif)
- Oswald, Bebas Neue (display)
- JetBrains Mono, Fira Code (monospace)
- Dancing Script (handwriting)

## Troubleshooting

### Import Errors
Ensure all imports are correct:
```tsx
import { Heading, GlitchText } from '../templates/typography';
import { BarChart } from '../templates/charts';
import { getColorPreset } from '../utils/colors';
```

### Animation Not Working
- Check `startFrame` parameter
- Ensure `frame` comes from `useCurrentFrame()`
- Verify duration is sufficient

### Render Fails
- Check server is running: `curl http://localhost:3001/api/status`
- Verify composition name matches exactly
- Check console for TypeScript errors
