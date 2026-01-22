import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface MotionBlurProps {
    intensity?: number;
    direction?: number;
    children?: React.ReactNode;
    startFrame?: number;
}

export const MotionBlur: React.FC<MotionBlurProps> = ({
    intensity = 0.1,
    direction = 0,
    children,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    return (
        <div
            style={{
                filter: `blur(${intensity * (Math.sin(frame * 0.1) * 2 + 2)}px) rotate(${direction}deg)`,
            }}
        >
            {children}
        </div>
    );
};

interface ChromaticAberrationProps {
    children?: React.ReactNode;
    intensity?: number;
    animated?: boolean;
    startFrame?: number;
}

export const ChromaticAberration: React.FC<ChromaticAberrationProps> = ({
    children,
    intensity = 5,
    animated = true,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const offset = animated
        ? useTransform(frame, [startFrame, startFrame + 1], [0, Math.random() > 0.9 ? intensity : intensity * 0.3])
        : intensity * 0.3;

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: -offset, color: 'red', opacity: 0.8 }}>
                {children}
            </div>
            <div style={{ position: 'absolute', left: offset, color: 'cyan', opacity: 0.8 }}>
                {children}
            </div>
            <div style={{ position: 'relative', color: 'white' }}>
                {children}
            </div>
        </div>
    );
};

interface ColorOverlayProps {
    color?: string;
    opacity?: number;
    blendMode?: string;
    animated?: boolean;
    animationDuration?: number;
    startFrame?: number;
}

export const ColorOverlay: React.FC<ColorOverlayProps> = ({
    color = '#3b82f6',
    opacity = 0.3,
    blendMode = 'overlay',
    animated = false,
    animationDuration = 30,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const animatedOpacity = useTransform(
        frame,
        [startFrame, startFrame + animationDuration],
        [0, opacity]
    );

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: color,
                opacity: animated ? animatedOpacity : opacity,
                mixBlendMode: blendMode as any,
                pointerEvents: 'none',
            }}
        />
    );
};

interface FilmGrainProps {
    opacity?: number;
    intensity?: number;
    animated?: boolean;
    speed?: number;
    startFrame?: number;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({
    opacity = 0.08,
    intensity = 1,
    animated = true,
    speed = 1,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const noiseValue = useTransform(
        frame,
        [startFrame, startFrame + 100],
        [0, 100]
    );

    const noisePattern = useMemo(() => {
        let pattern = '';
        for (let i = 0; i < 256; i++) {
            pattern += String.fromCharCode(Math.floor(Math.random() * 256));
        }
        return btoa(pattern);
    }, [startFrame]);

    const animatedOpacity = useTransform(
        frame,
        [startFrame, startFrame + 10],
        [0, opacity]
    );

    const backgroundPosition = useTransform(
        frame,
        [startFrame, startFrame + 100],
        ['0% 0%', `${animated ? frame % 4 : 0}% ${animated ? frame % 4 : 0}%`]
    );

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(data:image/png;base64,${noisePattern})`,
                backgroundSize: '4px 4px',
                backgroundPosition: backgroundPosition,
                opacity: animated ? animatedOpacity : opacity,
                pointerEvents: 'none',
            }}
        />
    );
};

interface BlurEffectProps {
    children?: React.ReactNode;
    blur?: number;
    animated?: boolean;
    startFrame?: number;
}

export const BlurEffect: React.FC<BlurEffectProps> = ({
    children,
    blur = 10,
    animated = false,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const blurValue = animated
        ? useTransform(frame, [startFrame, startFrame + 30], [0, blur])
        : blur;

    return (
        <div style={{ filter: `blur(${blurValue}px)` }}>
            {children}
        </div>
    );
};

interface SepiaEffectProps {
    children?: React.ReactNode;
    intensity?: number;
    animated?: boolean;
    startFrame?: number;
}

export const SepiaEffect: React.FC<SepiaEffectProps> = ({
    children,
    intensity = 0.8,
    animated = false,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const sepiaValue = animated
        ? useTransform(frame, [startFrame, startFrame + 30], [0, intensity])
        : intensity;

    return (
        <div style={{ filter: `sepia(${sepiaValue})` }}>
            {children}
        </div>
    );
};

interface GrayscaleEffectProps {
    children?: React.ReactNode;
    intensity?: number;
    animated?: boolean;
    startFrame?: number;
}

export const GrayscaleEffect: React.FC<GrayscaleEffectProps> = ({
    children,
    intensity = 1,
    animated = false,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const grayscaleValue = animated
        ? useTransform(frame, [startFrame, startFrame + 30], [0, intensity])
        : intensity;

    return (
        <div style={{ filter: `grayscale(${grayscaleValue})` }}>
            {children}
        </div>
    );
};
