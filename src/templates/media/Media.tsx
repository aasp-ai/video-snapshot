import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface KenBurnsProps {
    src: string;
    duration?: number;
    scale?: number;
    startFrame?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'zoom-in' | 'zoom-out';
}

export const ImageFrame: React.FC<KenBurnsProps> = ({
    src,
    duration = 180,
    scale = 1.1,
    startFrame = 0,
    direction = 'zoom-in',
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));

    const getTransform = (): string => {
        const zoom = 1 + (scale - 1) * progress;

        switch (direction) {
            case 'up':
                return `scale(${zoom}) translateY(${-progress * 50}px)`;
            case 'down':
                return `scale(${zoom}) translateY(${progress * 50}px)`;
            case 'left':
                return `scale(${zoom}) translateX(${-progress * 30}px)`;
            case 'right':
                return `scale(${zoom}) translateX(${progress * 30}px)`;
            case 'zoom-out':
                return `scale(${scale - (scale - 1) * progress})`;
            default:
                return `scale(${zoom})`;
        }
    };

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <img
                src={src}
                alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: getTransform(),
                }}
            />
        </div>
    );
};

interface AudioWaveformProps {
    data: number[];
    color?: string;
    barWidth?: number;
    barGap?: number;
    barRadius?: number;
    height?: number;
    animated?: boolean;
    startFrame?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
    data,
    color = '#3b82f6',
    barWidth = 4,
    barGap = 2,
    barRadius = 2,
    height = 60,
    animated = true,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const getBarHeight = (value: number, index: number): number => {
        if (!animated) return value * height;

        const waveValue = value * (0.8 + Math.sin((frame + index * 0.5) * 0.2) * 0.2);
        return waveValue * height;
    };

    const totalWidth = data.length * (barWidth + barGap) - barGap;
    const startX = (1920 - totalWidth) / 2;

    return (
        <div style={{ position: 'absolute', bottom: 100, left: startX, display: 'flex', alignItems: 'center', gap: barGap }}>
            {data.map((value, i) => (
                <div
                    key={i}
                    style={{
                        width: barWidth,
                        height: getBarHeight(value, i),
                        background: color,
                        borderRadius: barRadius,
                        transform: `translateY(${(height - getBarHeight(value, i)) / 2}px)`,
                    }}
                />
            ))}
        </div>
    );
};

interface AudioBarsProps {
    bars?: number;
    color?: string;
    width?: number;
    height?: number;
    barWidth?: number;
    barGap?: number;
    animated?: boolean;
    speed?: number;
    startFrame?: number;
}

export const AudioBars: React.FC<AudioBarsProps> = ({
    bars = 64,
    color = '#3b82f6',
    width = 800,
    height = 100,
    barWidth = 8,
    barGap = 4,
    animated = true,
    speed = 1,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const totalBarWidth = bars * (barWidth + barGap) - barGap;
    const startX = (1920 - totalBarWidth) / 2;

    return (
        <div style={{ position: 'absolute', bottom: 80, left: startX, display: 'flex', alignItems: 'flex-end', gap: barGap }}>
            {Array.from({ length: bars }, (_, i) => {
                const value = animated
                    ? 0.3 + Math.abs(Math.sin((frame * speed + i * 0.3) * 0.15)) * 0.7
                    : 0.5;
                const barHeight = value * height;

                return (
                    <div
                        key={i}
                        style={{
                            width: barWidth,
                            height: barHeight,
                            background: color,
                            borderRadius: barWidth / 2,
                        }}
                    />
                );
            })}
        </div>
    );
};

interface VideoBackgroundProps {
    src: string;
    opacity?: number;
    muted?: boolean;
    loop?: boolean;
    startFrame?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
    src,
    opacity = 1,
    muted = true,
    loop = true,
    startFrame = 0,
}) => {
    return (
        <video
            src={src}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity,
            }}
            autoPlay
            muted={muted}
            loop={loop}
        />
    );
};
