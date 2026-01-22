# Composition Guide

## Structure Overview

A Remotion composition consists of:
1. **VideoConfig** - Resolution, FPS, duration
2. **Composition Component** - Main video component
3. **Scenes** - Individual scene components
4. **Elements** - Typography, graphics, overlays

## Composition Types

### Single Scene
```tsx
export const SingleScene = () => {
    return (
        <div style={{ background: '#000', width: '100%', height: '100%' }}>
            <Heading text="Hello World" />
        </div>
    );
};
```

### Multi-Scene
```tsx
export const MultiScene = () => {
    return (
        <>
            <Scene1 startFrame={0} durationFrames={90} />
            <Scene2 startFrame={90} durationFrames={90} />
            <Scene3 startFrame={180} durationFrames={90} />
        </>
    );
};
```

### Loop Composition
```tsx
export const LoopComposition = () => {
    const duration = 60;
    return (
        <div style={{ flex: 1 }}>
            <LoopAnimation durationFrames={duration} />
        </div>
    );
};
```

## Scene Composition Pattern

```tsx
interface SceneProps {
    startFrame: number;
    durationFrames: number;
    children: React.ReactNode;
}

const SceneWrapper = ({ startFrame, durationFrames, children }: SceneProps) => {
    const frame = useCurrentFrame();
    const progress = (frame - startFrame) / durationFrames;
    const isActive = frame >= startFrame && frame < startFrame + durationFrames;

    return (
        <div style={{ 
            opacity: isActive ? 1 : 0,
            position: 'absolute',
            inset: 0,
        }}>
            {children}
        </div>
    );
};
```

## Scene Timing

| Platform | Optimal Scene Length |
|----------|---------------------|
| TikTok/Reels | 3-5 seconds |
| YouTube Shorts | 5-10 seconds |
| Twitter | 2-4 seconds |
| LinkedIn | 5-15 seconds |

## Scene Transitions

### Fade
```tsx
const fadeTransition = (duration = 15) => {
    const frame = useCurrentFrame();
    return {
        opacity: useTransform(frame, [duration - 15, duration], [0, 1]),
    };
};
```

### Slide
```tsx
const slideTransition = (direction: 'left' | 'right' | 'up' | 'down' = 'left') => {
    const frame = useCurrentFrame();
    const offset = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
    const offsetY = direction === 'up' ? -50 : direction === 'down' ? 50 : 0;
    
    return {
        transform: useTransform(frame, [duration - 20, duration], 
            [`translateX(${offset}px)`, 'translateX(0px)']),
    };
};
```

## Scene Container

Use `SceneContainer` for consistent layout:

```tsx
const SceneContainer = ({ children, padding = 80 }) => (
    <div style={{
        padding,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }}>
        {children}
    </div>
);
```

## Composition Registration

```tsx
import { Composition } from 'remotion';

export const MyVideo = () => (
    <>
        <Composition
            id="MainComposition"
            component={MainComponent}
            durationInFrames={300}
            fps={30}
            width={1920}
            height={1080}
        />
    </>
);
```

## Dynamic Duration

```tsx
export const DynamicComposition = ({ duration = 5 }) => {
    const durationInFrames = duration * 30;
    
    return (
        <Composition
            id="DynamicVideo"
            component={DynamicComponent}
            durationInFrames={durationInFrames}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
```
