import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface BorderGlowProps {
    children: React.ReactNode;
    color?: string;
    intensity?: number;
    speed?: number;
    size?: number;
    borderWidth?: number;
    borderRadius?: number;
    startFrame?: number;
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
    children,
    color = '#3b82f6',
    intensity = 0.8,
    speed = 2,
    size = 20,
    borderWidth = 3,
    borderRadius = 12,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const gradientAngle = useTransform(
        frame,
        [startFrame, startFrame + 360 / speed],
        [0, 360]
    );

    return (
        <div
            style={{
                position: 'relative',
                padding: borderWidth,
                borderRadius,
                background: `conic-gradient(from ${gradientAngle}deg, ${color}, #ff00ff, ${color}, #00ffff, ${color})`,
                boxShadow: `0 0 ${size}px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`,
            }}
        >
            <div
                style={{
                    background: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: borderRadius - 2,
                    padding: 16,
                }}
            >
                {children}
            </div>
        </div>
    );
};

interface NeonTextProps {
    text: string;
    color?: string;
    secondaryColor?: string;
    font?: string;
    size?: number;
    intensity?: number;
    blur?: number;
    startFrame?: number;
}

export const NeonText: React.FC<NeonTextProps> = ({
    text,
    color = '#00ff88',
    secondaryColor = '#ff00ff',
    font = 'Inter',
    size = 64,
    intensity = 1,
    blur = 10,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const glowIntensity = useTransform(
        frame,
        [startFrame, startFrame + 60],
        [0, intensity]
    );

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
                style={{
                    fontFamily: font,
                    fontSize: size,
                    fontWeight: 800,
                    color: 'transparent',
                    WebkitTextStroke: `2px ${color}`,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {text}
            </div>
            <div
                style={{
                    fontFamily: font,
                    fontSize: size,
                    fontWeight: 800,
                    color,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    filter: `blur(${blur * glowIntensity}px)`,
                    opacity: 0.8 * glowIntensity,
                }}
            >
                {text}
            </div>
            <div
                style={{
                    fontFamily: font,
                    fontSize: size,
                    fontWeight: 800,
                    color: secondaryColor,
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    filter: `blur(${blur * 0.5 * glowIntensity}px)`,
                    opacity: 0.6 * glowIntensity,
                }}
            >
                {text}
            </div>
        </div>
    );
};

interface GlowBoxProps {
    children: React.ReactNode;
    color?: string;
    glowColor?: string;
    glowSize?: number;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
    startFrame?: number;
}

export const GlowBox: React.FC<GlowBoxProps> = ({
    children,
    color = '#3b82f6',
    glowColor = '#3b82f6',
    glowSize = 20,
    backgroundColor = '#111111',
    borderRadius = 12,
    padding = 24,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const glowOpacity = useTransform(
        frame,
        [startFrame, startFrame + 30],
        [0, 1]
    );

    return (
        <div
            style={{
                position: 'relative',
                borderRadius,
                background: backgroundColor,
                padding,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: -3,
                    borderRadius: borderRadius + 3,
                    background: `linear-gradient(135deg, ${color}, ${glowColor}, ${color})`,
                    opacity: 0.5 * glowOpacity,
                    filter: `blur(${glowSize}px)`,
                    zIndex: 0,
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
};

interface PulsingOrbProps {
    color?: string;
    size?: number;
    speed?: number;
    startFrame?: number;
}

export const PulsingOrb: React.FC<PulsingOrbProps> = ({
    color = '#3b82f6',
    size = 100,
    speed = 1,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const pulseScale = useTransform(
        frame,
        [startFrame, startFrame + 60],
        [0.8, 1.2],
        { easing: (t) => Math.sin(t * Math.PI * 2) * 0.1 + 1 }
    );

    const pulseOpacity = useTransform(
        frame,
        [startFrame, startFrame + 60],
        [0.3, 0.7],
        { easing: (t) => Math.sin(t * Math.PI * 2) * 0.2 + 0.5 }
    );

    return (
        <div
            style={{
                position: 'relative',
                width: size,
                height: size,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: color,
                    transform: `scale(${pulseScale})`,
                    opacity: pulseOpacity,
                    filter: 'blur(20px)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    inset: '20%',
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                    opacity: 0.5,
                }}
            />
        </div>
    );
};

interface ShadowDropProps {
    children: React.ReactNode;
    color?: string;
    offsetX?: number;
    offsetY?: number;
    blur?: number;
    opacity?: number;
    animated?: boolean;
    startFrame?: number;
}

export const ShadowDrop: React.FC<ShadowDropProps> = ({
    children,
    color = '#000000',
    offsetX = 10,
    offsetY = 10,
    blur = 20,
    opacity = 0.5,
    animated = false,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const shadowOpacity = useTransform(
        frame,
        [startFrame, startFrame + 30],
        [0, animated ? opacity : opacity]
    );

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                    filter: `blur(${blur}px)`,
                    opacity: shadowOpacity,
                    background: color,
                    zIndex: 0,
                }}
            >
                {children}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
};
