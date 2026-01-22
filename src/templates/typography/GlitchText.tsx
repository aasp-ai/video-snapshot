import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface GlitchTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    glitchIntensity?: number;
    glitchFrequency?: number;
    startFrame?: number;
    duration?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    text,
    font = 'Oswald',
    size = 72,
    color = '#ffffff',
    glitchIntensity = 0.15,
    glitchFrequency = 0.08,
    startFrame = 0,
    duration = 99999,
}) => {
    const frame = useCurrentFrame();

    const redOffset = useTransform(
        frame,
        [startFrame, startFrame + 1],
        [0, Math.random() > (1 - glitchFrequency) ? (Math.random() - 0.5) * 15 * glitchIntensity : 0]
    );

    const blueOffset = useTransform(
        frame,
        [startFrame, startFrame + 1],
        [0, Math.random() > (1 - glitchFrequency) ? (Math.random() - 0.5) * 15 * glitchIntensity : 0]
    );

    const opacity = useTransform(
        frame,
        [startFrame, startFrame + duration],
        [1, 1]
    );

    return (
        <div style={{ 
            position: 'relative', 
            fontFamily: font, 
            fontSize: size, 
            fontWeight: 800,
            display: 'inline-block',
        }}>
            <span 
                style={{ 
                    color: 'rgba(255, 0, 50, 0.8)', 
                    position: 'absolute', 
                    left: -2, 
                    top: 0, 
                    transform: `translateX(${redOffset}px)`,
                    opacity: opacity,
                }}
            >
                {text}
            </span>
            <span 
                style={{ 
                    color: 'rgba(0, 150, 255, 0.8)', 
                    position: 'absolute', 
                    left: 2, 
                    top: 0, 
                    transform: `translateX(${blueOffset}px)`,
                    opacity: opacity,
                }}
            >
                {text}
            </span>
            <span style={{ color, position: 'relative' }}>
                {text}
            </span>
        </div>
    );
};

interface CyberTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    accentColor?: string;
    startFrame?: number;
}

export const CyberText: React.FC<CyberTextProps> = ({
    text,
    font = 'Orbitron',
    size = 64,
    color = '#00ff88',
    accentColor = '#ff00ff',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const scanlineOffset = useTransform(
        frame,
        [startFrame, startFrame + 100],
        [0, 100]
    );

    return (
        <div style={{ 
            position: 'relative', 
            fontFamily: font, 
            fontSize: size, 
            fontWeight: 700,
            color,
            overflow: 'hidden',
        }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
                {text}
            </div>
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(transparent 50%, ${accentColor}10 50%), linear-gradient(90deg, transparent 50%, ${accentColor}10 50%)`,
                    backgroundSize: '4px 4px, 4px 4px',
                    zIndex: 0,
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    top: `${scanlineOffset}%`,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: accentColor,
                    boxShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}`,
                    zIndex: 2,
                }}
            />
        </div>
    );
};
