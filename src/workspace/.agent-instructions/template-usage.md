# Template Usage Guide

## Template Categories

### 1. Typography Templates
Use for text-based visual elements.

| Template | Use Case | Animation Options |
|----------|----------|-------------------|
| `Heading` | Main titles, headlines | reveal, slideUp, scaleIn |
| `Subheading` | Subtitles, descriptions | typewriter, fadeIn, blurIn |
| `GlitchText` | Tech, cyberpunk, edgy | glitch, shake |
| `SplitText` | Word-by-word reveals | word, char, line |
| `Marquee` | Scrolling text | left, right |

**Example:**
```tsx
import { Heading, Subheading } from '../../templates/typography';

<Heading 
    text="Your Headline" 
    animation="reveal"
    font="Poppins"
    size={72}
/>
<Subheading 
    text="Your subtitle here" 
    animation="typewriter"
/>
```

### 2. Graphics Templates
Use for visual shapes, backgrounds, and effects.

| Template | Use Case |
|----------|----------|
| `GeometricShapes` | Animated shapes (rect, circle, polygon) |
| `GradientOverlay` | Gradient backgrounds |
| `NoiseTexture` | Film grain, noise overlay |
| `PatternBackground` | Pattern backgrounds |
| `BorderGlow` | Neon glow effects |
| `RadialProgress` | Circular progress indicator |

**Example:**
```tsx
import { GradientOverlay, BorderGlow } from '../../templates/graphics';

<GradientOverlay type="sunset" opacity={0.8} />
<BorderGlow color="#00ff88" intensity={0.8}>
    <Content />
</BorderGlow>
```

### 3. Chart Templates
Use for data visualization.

| Template | Use Case | Animation |
|----------|----------|-----------|
| `BarChart` | Comparison data | bars grow up |
| `LineChart` | Trends over time | line draws left-to-right |
| `DonutChart` | Percentages | arc fills clockwise |
| `ProgressBar` | Simple progress | fills left-to-right |

**Example:**
```tsx
import { BarChart, LineChart } from '../../templates/charts';

<BarChart 
    data={[{ label: 'A', value: 40 }, { label: 'B', value: 70 }]}
    color="#3b82f6"
/>
<LineChart 
    data={points}
    strokeWidth={3}
    animated={true}
/>
```

### 4. Effect Templates
Use for visual effects and enhancements.

| Template | Use Case |
|----------|----------|
| `MotionBlur` | Directional blur |
| `Vignette` | Dark corners |
| `Grain` | Film grain texture |
| `ChromaticAberration` | RGB split effect |
| `ColorOverlay` | Color filters |

**Example:**
```tsx
import { Vignette, Grain } from '../../templates/effects';

<Vignette intensity={0.5} />
<Grain opacity={0.15} />
```

### 5. Transition Templates
Use for smooth scene changes.

| Template | Direction | Duration |
|----------|-----------|----------|
| `Fade` | - | 15-30 frames |
| `Slide` | left/right/up/down | 20-30 frames |
| `Wipe` | left/right/top/bottom | 20-30 frames |
| `Zoom` | in/out | 20-30 frames |
| `Blur` | - | 15-25 frames |

**Example:**
```tsx
import { Slide, Fade } from '../../templates/transitions';

// Scene transition
<Slide direction="right" duration={20}>
    <NextScene />
</Slide>
```

### 6. Overlay Templates
Use for UI elements and information display.

| Template | Use Case |
|----------|----------|
| `LowerThird` | Name/title lower third |
| `Captions` | Subtitle text |
| `BugLogo` | Channel logo |
| `Timestamp` | Time display |
| `CenterText` | Centered text card |

**Example:**
```tsx
import { LowerThird, Captions } from '../../templates/overlay';

<LowerThird 
    name="John Doe"
    title="Video Creator"
    duration={120}
/>
<Captions 
    text="Your subtitle text"
    style="bottom"
/>
```

### 7. Media Templates
Use for images, video, and audio visualization.

| Template | Use Case |
|----------|----------|
| `ImageFrame` | Images with Ken Burns effect |
| `AudioWaveform` | Audio waveform |
| `AudioBars` | Frequency bars |
| `VideoBackground` | Background video |

**Example:**
```tsx
import { ImageFrame, AudioWaveform } from '../../templates/media';

<ImageFrame 
    src="/path/to/image.jpg"
    effect="ken-burns"
    duration={120}
/>
<AudioWaveform data={audioData} color="#00ff88" />
```

### 8. Animation Templates
Use for common animation patterns.

| Template | Use Case |
|----------|----------|
| `Entrance` | Element entry animations |
| `Continuous` | Looping animations |
| `Countdown` | Countdown timer |

**Example:**
```tsx
import { Entrance, Countdown } from '../../templates/animation';

<Entrance animation="slideUp" duration={30}>
    <Content />
</Entrance>
<Countdown from={3} to={0} />
```

## Template Selection Flowchart

```
What are you creating?
├── Text content
│   ├── Main title → Heading
│   ├── Subtitle → Subheading
│   ├── Tech/glitch style → GlitchText
│   └── Scrolling text → Marquee
├── Visual elements
│   ├── Background → GradientOverlay / PatternBackground
│   ├── Animated shapes → GeometricShapes
│   ├── Progress indicator → RadialProgress / ProgressBar
│   └── Visual effects → Effects templates
├── Data visualization
│   ├── Bar comparison → BarChart
│   ├── Trend line → LineChart
│   └── Percentage → DonutChart
├── Scene transition → Transition templates
├── UI overlay → Overlay templates
└── Media
    ├── Static image → ImageFrame
    └── Audio viz → AudioWaveform / AudioBars
```

## Combining Templates

Templates are designed to work together:

```tsx
<SceneContainer>
    <GradientOverlay type="ocean" opacity={0.9} />
    <Heading text="Main Title" animation="reveal" />
    <Subheading text="Subtitle" animation="typewriter" />
    <LowerThird name="Creator" title="Channel" />
    <Vignette intensity={0.4} />
</SceneContainer>
```

## Animation Duration Guidelines

| Animation Type | Recommended Frames |
|----------------|-------------------|
| Quick reveal | 15-20 frames |
| Standard | 30-45 frames |
| Smooth | 45-60 frames |
| Dramatic | 60-90 frames |

## Performance Tips

1. **Reuse animations**: Create animation hooks, apply to multiple elements
2. **Limit complexity**: Complex SVGs slow rendering
3. **Use transforms**: Animate `transform` instead of `left/top`
4. **Cache values**: Avoid recalculating in render loop
5. **Test draft quality**: Preview before final render
