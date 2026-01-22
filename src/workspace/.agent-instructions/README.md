# AI Agent Instructions for Video Generation

## Overview

This workspace provides a standardized environment for creating Remotion videos through AI agents. All components, templates, and utilities are organized for consistency and reusability.

## Project Structure

```
sandbox/src/workspace/
├── .agent-instructions/     # This documentation
├── examples/               # Working examples by use case
├── components/            # Reusable workspace components
├── utils/                 # Utilities (timing, colors, fonts)
├── Composition.tsx        # Main composition entry
└── VideoConfig.ts         # Video configuration
```

## Core Principles

### 1. Frame-Accurate Animations
Always use `useCurrentFrame()` for timing. Import utilities from `./utils/timing`:
```tsx
import { useCurrentFrame, secondsToFrames, useFrameProgress } from './utils/timing';

const frame = useCurrentFrame();
const progress = useFrameProgress(startFrame, durationFrames);
```

### 2. Consistent Styling
Use color presets from `./utils/colors.ts` for consistent theming:
```tsx
import { getColorPreset } from './utils/colors';

const theme = getColorPreset('dark');
const background = theme.background;
```

### 3. Standardized Text
Use `TextLayer` component for consistent typography:
```tsx
import { TextLayer } from './components/TextLayer';

<TextLayer text="Your text" font="Inter" size={72} color="#ffffff" />
```

### 4. Proper Scene Structure
Each scene should:
- Be 3-10 seconds for social media
- Have clear entrance and exit animations
- Use `SceneContainer` for consistent margins

## Template Usage Guide

### Typography Templates
- **Heading**: Use for main titles with `animation: 'reveal'`
- **Subheading**: Use for subtitles with `animation: 'typewriter'`
- **GlitchText**: Use for cyberpunk/tech effects
- **SplitText**: Use for word-by-word reveals

### Graphics Templates
- **GeometricShapes**: Rectangles, circles, polygons with animations
- **GradientOverlay**: Background gradients
- **NoiseTexture**: Film grain overlay
- **BorderGlow**: Neon glow effects

### Chart Templates
- **BarChart**: Animated bar graphs
- **LineChart**: Animated line graphs
- **DonutChart**: Animated donut charts
- **ProgressBar**: Horizontal/circular progress

### Overlay Templates
- **LowerThird**: Name/title lower thirds
- **Captions**: Subtitle overlays
- **BugLogo**: Channel logo placement
- **Timestamp**: Time overlays

### Transition Templates
- **Fade**: Smooth fade to black/white
- **Slide**: Horizontal/vertical slide
- **Wipe**: Directional wipe
- **Zoom**: Zoom in/out transitions
- **Blur**: Blur transition effect

## Composition Structure

### Single Scene
```tsx
export const MyScene = ({ duration = 5 }) => {
    return (
        <div style={{ background: '#000', flex: 1 }}>
            <SceneContainer>
                <Heading text="Hello World" />
            </SceneContainer>
        </div>
    );
};
```

### Multi-Scene
```tsx
export const MyComposition = () => {
    return (
        <Composition
            id="MyComposition"
            component={MultiSceneWrapper}
            durationInFrames={150}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};

const MultiSceneWrapper = () => (
    <>
        <Scene1 startFrame={0} durationFrames={50} />
        <Scene2 startFrame={50} durationFrames={50} />
        <Scene3 startFrame={100} durationFrames={50} />
    </>
);
```

## Animation Patterns

### Entrance Animation
```tsx
import { useTransform, useSpring } from 'remotion';
import { Easing } from '@remotion/easing';

const opacity = useTransform(frame, [0, 30], [0, 1]);
const y = useTransform(frame, [0, 30], [50, 0]);
const scale = useSpring(useTransform(frame, [0, 30], [0.8, 1]), { damping: 15 });
```

### Continuous Animation
```tsx
import { useSpring } from 'remotion';

const scale = useSpring(
    useCurrentFrame() % 60 < 30 
        ? useCurrentFrame() % 60 
        : 60 - (useCurrentFrame() % 60),
    { damping: 10 }
);
```

### Data-Driven Animation
```tsx
const barWidth = useTransform(progress, [0, 1], [0, targetWidth]);
const linePath = useTransform(progress, [0, 1], [emptyPath, fullPath]);
```

## Color Usage

Always use color presets for consistency:

```tsx
import { getColorPreset, GRADIENTS } from './utils/colors';

const colors = getColorPreset('neon');
// or
const gradient = GRADIENTS.sunset;
```

Available presets: `dark`, `light`, `neon`, `sunset`, `ocean`, `forest`

## Font Usage

Import curated fonts from `./utils/fonts.ts`:

```tsx
import { getGoogleFontsCSS, getFontOptions } from './utils/fonts';

// Add to your component
const fonts = getGoogleFontsCSS();
// Include in style tag
```

Available fonts: Inter, Poppins, Montserrat, Playfair Display, Oswald, Bebas Neue, Roboto, Open Sans, JetBrains Mono, Fira Code, Dancing Script.

## Export Configuration

### Presets
- `tiktok` / `reels`: 1080x1920 @ 30fps
- `youtube_shorts`: 1080x1920 @ 60fps
- `youtube`: 1920x1080 @ 60fps
- `twitter`: 1280x720 @ 30fps
- `linkedin`: 1200x627 @ 30fps

### Quality Tiers
- `draft`: Fast render, lower quality
- `standard`: Balanced for social media
- `high`: High quality for distribution
- `professional`: Maximum quality

## Common Patterns

### Scene Transition
```tsx
const SceneTransition = ({ type = 'fade' }) => {
    const opacity = useTransform(frame, [start - 15, start], [0, 1]);
    return <div style={{ opacity, position: 'absolute' }} />;
};
```

### Text Reveal
```tsx
const words = text.split(' ');
return (
    <div style={{ display: 'flex' }}>
        {words.map((word, i) => (
            <span style={{ opacity: useTransform(frame, [i * 5, i * 5 + 10], [0, 1]) }}>
                {word}{' '}
            </span>
        ))}
    </div>
);
```

### Progress Indicator
```tsx
const progress = useFrameProgress(startFrame, durationFrames);
return <div style={{ width: useTransform(progress, [0, 1], [0, fullWidth]) }} />;
```

## Best Practices

1. **Keep scenes short**: 3-5 seconds for social media
2. **Use easing**: Always apply `Easing.inOut` for smooth animations
3. **Optimize rendering**: Avoid heavy computations in render loop
4. **Test at draft quality**: Preview before high-quality render
5. **Use SceneContainer**: Consistent padding and margins
6. **Follow naming**: `Scene1`, `Scene2`, `Heading`, `LowerThird`

## Error Handling

If a render fails:
1. Check composition ID matches export
2. Verify all imports are correct
3. Ensure frame ranges are valid
4. Test with shorter duration

## Additional Resources

- Remotion Docs: https://remotion.dev/docs
- Template examples: `./examples/`
- Utilities: `./utils/`
- Components: `./components/`
