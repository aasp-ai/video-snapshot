import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface GeometricShapesProps {
    shapes?: Array<{
        type: 'rect' | 'circle' | 'polygon' | 'star';
        width?: number;
        height?: number;
        radius?: number;
        sides?: number;
        color: string;
        x?: number;
        y?: number;
        rotation?: number;
        opacity?: number;
        animation?: 'none' | 'fadeIn' | 'scaleIn' | 'rotate' | 'pulse';
        animationDuration?: number;
    }>;
    background?: string;
    startFrame?: number;
}

export const GeometricShapes: React.FC<GeometricShapesProps> = ({
    shapes = [],
    background = 'transparent',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const renderShape = (shape: GeometricShapesProps['shapes'][0], index: number) => {
        const { 
            type, 
            width = 100, 
            height = 100, 
            radius = 50, 
            sides = 5,
            color, 
            x = 0, 
            y = 0, 
            rotation = 0, 
            opacity = 1,
            animation = 'none',
            animationDuration = 30,
        } = shape;

        const shapeStartFrame = startFrame + (index * 10);
        const progress = Math.max(0, Math.min(1, (frame - shapeStartFrame) / animationDuration));

        const getAnimationStyle = (): React.CSSProperties => {
            switch (animation) {
                case 'fadeIn':
                    return { opacity: progress * opacity };
                case 'scaleIn':
                    return { opacity: progress * opacity, transform: `scale(${progress}) rotate(${rotation}deg)` };
                case 'rotate':
                    return { opacity, transform: `rotate(${rotation + frame * 0.5}deg)` };
                case 'pulse':
                    const pulseScale = 1 + Math.sin(frame * 0.1) * 0.1;
                    return { opacity, transform: `scale(${pulseScale}) rotate(${rotation}deg)` };
                default:
                    return { opacity, transform: `rotate(${rotation}deg)` };
            }
        };

        const baseStyle: React.CSSProperties = {
            position: 'absolute',
            left: x,
            top: y,
            ...getAnimationStyle(),
        };

        switch (type) {
            case 'rect':
                return (
                    <div
                        key={index}
                        style={{
                            ...baseStyle,
                            width,
                            height,
                            background: color,
                            borderRadius: 8,
                        }}
                    />
                );

            case 'circle':
                return (
                    <div
                        key={index}
                        style={{
                            ...baseStyle,
                            width: radius * 2,
                            height: radius * 2,
                            background: color,
                            borderRadius: '50%',
                        }}
                    />
                );

            case 'polygon':
                const points = Array.from({ length: sides }, (_, i) => {
                    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    return `${x},${y}`;
                }).join(' ');
                return (
                    <svg
                        key={index}
                        style={{ ...baseStyle, overflow: 'visible' }}
                        width={radius * 2}
                        height={radius * 2}
                        viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                    >
                        <polygon points={points} fill={color} />
                    </svg>
                );

            case 'star':
                const starPoints = Array.from({ length: sides * 2 }, (_, i) => {
                    const radiusInner = radius * 0.4;
                    const r = i % 2 === 0 ? radius : radiusInner;
                    const angle = (i * Math.PI) / sides - Math.PI / 2;
                    const x = r * Math.cos(angle);
                    const y = r * Math.sin(angle);
                    return `${x},${y}`;
                }).join(' ');
                return (
                    <svg
                        key={index}
                        style={{ ...baseStyle, overflow: 'visible' }}
                        width={radius * 2}
                        height={radius * 2}
                        viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                    >
                        <polygon points={starPoints} fill={color} />
                    </svg>
                );

            default:
                return null;
        }
    };

    return (
        <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%', 
            background,
        }}>
            {shapes.map((shape, index) => renderShape(shape, index))}
        </div>
    );
};

interface AnimatedShapesProps {
    count?: number;
    baseColor?: string;
    secondaryColor?: string;
    background?: string;
    animation?: 'pulse' | 'rotate' | 'bounce' | 'float';
    startFrame?: number;
}

export const AnimatedShapes: React.FC<AnimatedShapesProps> = ({
    count = 5,
    baseColor = '#3b82f6',
    secondaryColor = '#8b5cf6',
    background = '#0a0a0a',
    animation = 'pulse',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const shapes = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            type: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'rect' : 'polygon',
            radius: 30 + Math.random() * 50,
            sides: 3 + Math.floor(Math.random() * 4),
            color: Math.random() > 0.5 ? baseColor : secondaryColor,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            delay: i * 10,
        }));
    }, [count, baseColor, secondaryColor]);

    const getAnimation = (delay: number): React.CSSProperties => {
        const adjustedFrame = frame - startFrame - delay;

        switch (animation) {
            case 'pulse':
                const pulseScale = 1 + Math.sin(adjustedFrame * 0.1) * 0.2;
                return { transform: `scale(${pulseScale})` };
            case 'rotate':
                return { transform: `rotate(${adjustedFrame * 0.5}deg)` };
            case 'bounce':
                const bounceY = Math.abs(Math.sin(adjustedFrame * 0.1)) * 20;
                return { transform: `translateY(${-bounceY}px)` };
            case 'float':
                const floatX = Math.sin(adjustedFrame * 0.05) * 10;
                const floatY = Math.cos(adjustedFrame * 0.05) * 10;
                return { transform: `translate(${floatX}px, ${floatY}px)` };
            default:
                return {};
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background }}>
            {shapes.map((shape, i) => {
                const { type, radius, sides, color, x, y } = shape;

                const baseStyle: React.CSSProperties = {
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    opacity: 0.7,
                    ...getAnimation(shape.delay),
                };

                if (type === 'circle') {
                    return (
                        <div
                            key={i}
                            style={{
                                ...baseStyle,
                                width: radius * 2,
                                height: radius * 2,
                                borderRadius: '50%',
                                background: color,
                            }}
                        />
                    );
                }

                if (type === 'rect') {
                    return (
                        <div
                            key={i}
                            style={{
                                ...baseStyle,
                                width: radius * 1.5,
                                height: radius * 1.5,
                                background: color,
                                borderRadius: 8,
                            }}
                        />
                    );
                }

                const points = Array.from({ length: sides }, (_, j) => {
                    const angle = (j * 2 * Math.PI) / sides - Math.PI / 2;
                    const px = radius * Math.cos(angle);
                    const py = radius * Math.sin(angle);
                    return `${px},${py}`;
                }).join(' ');

                return (
                    <svg
                        key={i}
                        style={{ ...baseStyle, overflow: 'visible' }}
                        width={radius * 2}
                        height={radius * 2}
                        viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                    >
                        <polygon points={points} fill={color} />
                    </svg>
                );
            })}
        </div>
    );
};
