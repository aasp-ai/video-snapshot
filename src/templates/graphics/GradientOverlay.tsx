import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface GradientOverlayProps {
    type?: 'primary' | 'sunset' | 'ocean' | 'forest' | 'midnight' | 'warm' | 'cool' | 'dark' | 'neon' | 'fire';
    opacity?: number;
    direction?: 'to-bottom' | 'to-top' | 'to-left' | 'to-right' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
    animated?: boolean;
    animationDuration?: number;
    startFrame?: number;
}

const GRADIENTS: Record<string, string> = {
    'primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'sunset': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'ocean': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'forest': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'midnight': 'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)',
    'warm': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'cool': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'dark': 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
    'neon': 'linear-gradient(135deg, #ff00cc 0%, #333399 100%)',
    'fire': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
};

export const GradientOverlay: React.FC<GradientOverlayProps> = ({
    type = 'primary',
    opacity = 1,
    direction = 'to-bottom',
    animated = false,
    animationDuration = 60,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const getGradientDirection = (): string => {
        switch (direction) {
            case 'to-top': return 'to top';
            case 'to-left': return 'to left';
            case 'to-right': return 'to right';
            case 'to-br': return 'to bottom right';
            case 'to-bl': return 'to bottom left';
            case 'to-tr': return 'to top right';
            case 'to-tl': return 'to top left';
            default: return 'to bottom';
        }
    };

    const gradient = GRADIENTS[type] || GRADIENTS.primary;

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
                background: gradient.replace('135deg', getGradientDirection()),
                opacity: animated ? animatedOpacity : opacity,
            }}
        />
    );
};

interface MeshGradientProps {
    colors?: string[];
    animated?: boolean;
    speed?: number;
    startFrame?: number;
}

export const MeshGradient: React.FC<MeshGradientProps> = ({
    colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'],
    animated = true,
    speed = 0.02,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const positions = useMemo(() => {
        return colors.map((_, i) => ({
            x: 0.5 + Math.sin(i * 2.1) * 0.3,
            y: 0.5 + Math.cos(i * 2.3) * 0.3,
        }));
    }, [colors.length]);

    const animatedPositions = useTransform(
        frame,
        [startFrame, startFrame + 1000],
        positions.map((_, i) => {
            const t = frame * speed;
            return [
                0.5 + Math.sin(i * 2.1 + t) * 0.35,
                0.5 + Math.cos(i * 2.3 + t * 0.7) * 0.35,
            ];
        })
    );

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: colors[0],
                overflow: 'hidden',
            }}
        >
            <svg
                style={{ width: '100%', height: '100%', filter: 'blur(60px)' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {colors.map((color, i) => (
                    <circle
                        key={i}
                        cx={positions[i].x * 100}
                        cy={positions[i].y * 100}
                        r={40 + (i % 3) * 10}
                        fill={color}
                        opacity={0.8}
                    />
                ))}
            </svg>
        </div>
    );
};

interface VignetteProps {
    intensity?: number;
    color?: string;
    startFrame?: number;
}

export const Vignette: React.FC<VignetteProps> = ({
    intensity = 0.5,
    color = '#000000',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const opacity = useTransform(
        frame,
        [startFrame, startFrame + 30],
        [0, intensity]
    );

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle, transparent 40%, ${color} 100%)`,
                opacity,
                pointerEvents: 'none',
            }}
        />
    );
};

interface NoiseTextureProps {
    opacity?: number;
    intensity?: number;
    animated?: boolean;
    speed?: number;
    startFrame?: number;
}

export const NoiseTexture: React.FC<NoiseTextureProps> = ({
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

    const generateNoisePattern = (seed: number): string => {
        let pattern = '';
        for (let i = 0; i < 64; i++) {
            const value = Math.floor(Math.random() * 256);
            pattern += String.fromCharCode(value);
        }
        return btoa(pattern);
    };

    const noiseBase64 = useMemo(() => generateNoisePattern(startFrame), [startFrame]);

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
                backgroundImage: `url(data:image/png;base64,${noiseBase64})`,
                backgroundSize: '4px 4px',
                backgroundPosition: backgroundPosition,
                opacity: animated ? animatedOpacity : opacity,
                pointerEvents: 'none',
            }}
        />
    );
};
