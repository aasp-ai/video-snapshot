import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface PatternBackgroundProps {
    pattern?: 'grid' | 'dots' | 'diagonal' | 'checkerboard' | 'waves' | 'zigzag' | 'circles';
    color?: string;
    backgroundColor?: string;
    scale?: number;
    opacity?: number;
    animated?: boolean;
    animationSpeed?: number;
    startFrame?: number;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
    pattern = 'grid',
    color = '#ffffff',
    backgroundColor = '#000000',
    scale = 1,
    opacity = 0.1,
    animated = false,
    animationSpeed = 0.02,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const patternCSS = useMemo((): React.CSSProperties => {
        switch (pattern) {
            case 'grid':
                return {
                    backgroundImage: `
                        linear-gradient(${color} 1px, transparent 1px),
                        linear-gradient(90deg, ${color} 1px, transparent 1px)
                    `,
                    backgroundSize: `${40 * scale}px ${40 * scale}px`,
                    backgroundPosition: 'center center',
                };

            case 'dots':
                return {
                    backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
                    backgroundSize: `${30 * scale}px ${30 * scale}px`,
                };

            case 'diagonal':
                return {
                    backgroundImage: `linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%, ${color}), linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%, ${color})`,
                    backgroundSize: `${40 * scale}px ${40 * scale}px`,
                    backgroundPosition: '0 0, 20px 20px',
                };

            case 'checkerboard':
                return {
                    backgroundImage: `linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(-45deg, ${color} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${color} 75%), linear-gradient(-45deg, transparent 75%, ${color} 75%)`,
                    backgroundSize: `${40 * scale}px ${40 * scale}px`,
                    backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
                };

            case 'waves':
                return {
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${color} 1px, transparent 0)`,
                    backgroundSize: `${20 * scale}px ${20 * scale}px`,
                };

            case 'zigzag':
                return {
                    backgroundImage: `linear-gradient(135deg, ${color} 25%, transparent 25%) -10px 0, linear-gradient(225deg, ${color} 25%, transparent 25%) -10px 0, linear-gradient(315deg, ${color} 25%, transparent 25%), linear-gradient(45deg, ${color} 25%, transparent 25%)`,
                    backgroundSize: `${20 * scale}px ${20 * scale}px`,
                };

            case 'circles':
                return {
                    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
                    backgroundSize: `${30 * scale}px ${30 * scale}px`,
                };

            default:
                return {};
        }
    }, [pattern, color, scale]);

    const animatedOffset = useTransform(
        frame,
        [startFrame, startFrame + 100],
        animated ? [0, -40] : [0, 0]
    );

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                backgroundColor,
                opacity,
                ...patternCSS,
                transform: animated ? `translateY(${animatedOffset}px)` : undefined,
            }}
        />
    );
};

interface AnimatedPatternProps {
    type?: 'pulse-grid' | 'moving-dots' | 'expanding-circles' | 'scanning-lines';
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    speed?: number;
    startFrame?: number;
}

export const AnimatedPattern: React.FC<AnimatedPatternProps> = ({
    type = 'pulse-grid',
    primaryColor = '#3b82f6',
    secondaryColor = '#8b5cf6',
    backgroundColor = '#0a0a0a',
    speed = 1,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    switch (type) {
        case 'pulse-grid':
            const gridOpacity = useTransform(
                frame,
                [startFrame, startFrame + 60, startFrame + 120],
                [0.05, 0.15, 0.05]
            );
            return (
                <div style={{ position: 'absolute', inset: 0, backgroundColor }}>
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `
                                linear-gradient(${primaryColor} 1px, transparent 1px),
                                linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                            opacity: gridOpacity,
                        }}
                    />
                </div>
            );

        case 'moving-dots':
            const dotPositions = useMemo(() => {
                return Array.from({ length: 20 }, (_, i) => ({
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: 4 + Math.random() * 8,
                    speed: 0.1 + Math.random() * 0.2,
                    color: Math.random() > 0.5 ? primaryColor : secondaryColor,
                }));
            }, []);

            return (
                <div style={{ position: 'absolute', inset: 0, backgroundColor, overflow: 'hidden' }}>
                    {dotPositions.map((dot, i) => {
                        const x = (dot.x + frame * dot.speed) % 100;
                        const y = (dot.y + frame * dot.speed * 0.7) % 100;
                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    width: dot.size,
                                    height: dot.size,
                                    borderRadius: '50%',
                                    background: dot.color,
                                    opacity: 0.6,
                                }}
                            />
                        );
                    })}
                </div>
            );

        case 'expanding-circles':
            const circles = useMemo(() => {
                return Array.from({ length: 5 }, (_, i) => ({
                    delay: i * 40,
                    color: i % 2 === 0 ? primaryColor : secondaryColor,
                }));
            }, []);

            return (
                <div style={{ position: 'absolute', inset: 0, backgroundColor, overflow: 'hidden' }}>
                    {circles.map((circle, i) => {
                        const adjustedFrame = Math.max(0, frame - startFrame - circle.delay);
                        const progress = Math.min(1, adjustedFrame / 60);
                        const scale = 1 + progress * 5;
                        const opacity = (1 - progress) * 0.3;

                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: 200,
                                    height: 200,
                                    borderRadius: '50%',
                                    border: `2px solid ${circle.color}`,
                                    transform: `translate(-50%, -50%) scale(${scale})`,
                                    opacity,
                                }}
                            />
                        );
                    })}
                </div>
            );

        case 'scanning-lines':
            const scanLinePosition = useTransform(
                frame,
                [startFrame, startFrame + 200],
                ['0%', '100%']
            );

            const scanLineGlow = useTransform(
                frame,
                [startFrame, startFrame + 200],
                ['0%', '100%']
            );

            return (
                <div style={{ position: 'absolute', inset: 0, backgroundColor }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: scanLinePosition,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: `linear-gradient(90deg, transparent, ${primaryColor}, ${secondaryColor}, ${primaryColor}, transparent)`,
                            boxShadow: `0 0 20px ${primaryColor}, 0 0 40px ${secondaryColor}`,
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: scanLineGlow,
                            left: 0,
                            right: 0,
                            height: 60,
                            background: `linear-gradient(to bottom, transparent, ${primaryColor}20, transparent)`,
                        }}
                    />
                </div>
            );

        default:
            return null;
    }
};
