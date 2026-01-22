import React from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface EntranceProps {
    children: React.ReactNode;
    animation?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleIn' | 'scaleOut' | 'rotateIn';
    duration?: number;
    startFrame?: number;
}

export const Entrance: React.FC<EntranceProps> = ({
    children,
    animation = 'slideUp',
    duration = 30,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));

    const getStyle = (): React.CSSProperties => {
        switch (animation) {
            case 'slideUp':
                return {
                    opacity,
                    transform: `translateY(${(1 - progress) * 50}px)`,
                };
            case 'slideDown':
                return {
                    opacity,
                    transform: `translateY(${(1 - progress) * -50}px)`,
                };
            case 'slideLeft':
                return {
                    opacity,
                    transform: `translateX(${(1 - progress) * -50}px)`,
                };
            case 'slideRight':
                return {
                    opacity,
                    transform: `translateX(${(1 - progress) * 50}px)`,
                };
            case 'fadeIn':
                return { opacity: progress };
            case 'scaleIn':
                return {
                    opacity,
                    transform: `scale(${0.5 + progress * 0.5})`,
                };
            case 'scaleOut':
                return {
                    opacity,
                    transform: `scale(${1.5 - progress * 0.5})`,
                };
            case 'rotateIn':
                return {
                    opacity,
                    transform: `rotate(${(1 - progress) * -180}deg) scale(${progress})`,
                };
            default:
                return { opacity: progress };
        }
    };

    const opacity = useTransform(progress, [0, 0.2, 1], [0, 0, 1]);

    return (
        <div style={getStyle()}>
            {children}
        </div>
    );
};

interface ContinuousProps {
    children: React.ReactNode;
    animation?: 'pulse' | 'bounce' | 'shake' | 'wiggle' | 'float' | 'spin' | 'breathe';
    speed?: number;
    startFrame?: number;
}

export const Continuous: React.FC<ContinuousProps> = ({
    children,
    animation = 'pulse',
    speed = 1,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const getStyle = (): React.CSSProperties => {
        const t = frame * speed * 0.05;

        switch (animation) {
            case 'pulse':
                return {
                    transform: `scale(${1 + Math.sin(t) * 0.05})`,
                };
            case 'bounce':
                return {
                    transform: `translateY(${Math.abs(Math.sin(t)) * -10}px)`,
                };
            case 'shake':
                return {
                    transform: `translateX(${Math.sin(t * 2) * 3}px)`,
                };
            case 'wiggle':
                return {
                    transform: `rotate(${Math.sin(t) * 5}deg)`,
                };
            case 'float':
                return {
                    transform: `translate(${Math.sin(t) * 5}px, ${Math.cos(t * 0.7) * 5}px)`,
                };
            case 'spin':
                return {
                    transform: `rotate(${t * 30}deg)`,
                };
            case 'breathe':
                return {
                    transform: `scale(${1 + Math.sin(t * 0.5) * 0.03})`,
                    opacity: 0.9 + Math.sin(t * 0.5) * 0.1,
                };
            default:
                return {};
        }
    };

    return <div style={getStyle()}>{children}</div>;
};

interface CountdownProps {
    from?: number;
    to?: number;
    font?: string;
    size?: number;
    color?: string;
    duration?: number;
    easing?: 'linear' | 'ease-out' | 'ease-in-out';
    startFrame?: number;
}

export const Countdown: React.FC<CountdownProps> = ({
    from = 3,
    to = 0,
    font = 'Inter',
    size = 120,
    color = '#ffffff',
    duration = 60,
    easing = 'ease-out',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));
    const easedProgress = easing === 'ease-out'
        ? 1 - Math.pow(1 - progress, 3)
        : easing === 'ease-in-out'
            ? progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
            : progress;

    const currentValue = Math.round(from - (from - to) * easedProgress);

    const scale = useTransform(progress, [0, 0.2, 0.8, 1], [1.5, 1, 1, 0.8]);
    const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{
                fontFamily: font,
                fontSize: size,
                fontWeight: 800,
                color,
                transform: `scale(${scale})`,
                opacity,
            }}>
                {currentValue}
            </span>
        </div>
    );
};

interface CounterProps {
    value: number;
    duration?: number;
    font?: string;
    size?: number;
    color?: string;
    startFrame?: number;
    format?: (value: number) => string;
}

export const Counter: React.FC<CounterProps> = ({
    value,
    duration = 60,
    font = 'Inter',
    size = 72,
    color = '#ffffff',
    startFrame = 0,
    format = (v) => v.toLocaleString(),
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));
    const currentValue = Math.round(value * progress);

    return (
        <span style={{
            fontFamily: font,
            fontSize: size,
            fontWeight: 700,
            color,
        }}>
            {format(currentValue)}
        </span>
    );
};

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    speed?: number;
    startFrame?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 48,
    color = '#3b82f6',
    speed = 1,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const rotation = useTransform(frame, [startFrame, startFrame + 100], [0, 360]);

    return (
        <div
            style={{
                width: size,
                height: size,
                border: `4px solid ${color}20`,
                borderTopColor: color,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                transform: `rotate(${rotation})`,
            }}
        />
    );
};
