import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface FadeTransitionProps {
    children: React.ReactNode;
    type?: 'in' | 'out' | 'cross';
    duration?: number;
    color?: string;
    startFrame?: number;
}

export const Fade: React.FC<FadeTransitionProps> = ({
    children,
    type = 'in',
    duration = 20,
    color = '#000000',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const opacity = useTransform(
        frame,
        [startFrame, startFrame + duration],
        type === 'in' ? [1, 0] : type === 'out' ? [0, 1] : [0, 1]
    );

    if (type === 'cross') {
        return (
            <div style={{ position: 'absolute', inset: 0 }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 1 - opacity }}>
                    {children}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: color,
                        opacity,
                    }}
                />
            </div>
        );
    }

    return (
        <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ opacity: type === 'in' ? 1 - opacity : opacity }}>
                {children}
            </div>
            {type === 'in' && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: color,
                        opacity,
                    }}
                />
            )}
        </div>
    );
};

interface SlideTransitionProps {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    duration?: number;
    startFrame?: number;
}

export const Slide: React.FC<SlideTransitionProps> = ({
    children,
    direction = 'left',
    duration = 25,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const offset = useTransform(
        frame,
        [startFrame, startFrame + duration],
        [0, 100]
    );

    const getTransform = (): string => {
        switch (direction) {
            case 'left': return `translateX(-${offset}%)`;
            case 'right': return `translateX(${offset}%)`;
            case 'up': return `translateY(-${offset}%)`;
            case 'down': return `translateY(${offset}%)`;
            default: return `translateX(-${offset}%)`;
        }
    };

    const getEnterTransform = (): string => {
        const enterOffset = useTransform(
            frame,
            [startFrame + duration - 20, startFrame + duration],
            [100, 0]
        );
        switch (direction) {
            case 'left': return `translateX(-${enterOffset}%)`;
            case 'right': return `translateX(${enterOffset}%)`;
            case 'up': return `translateY(-${enterOffset}%)`;
            case 'down': return `translateY(${enterOffset}%)`;
            default: return `translateX(-${enterOffset}%)`;
        }
    };

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ transform: getTransform(), width: '100%', height: '100%' }}>
                {children}
            </div>
        </div>
    );
};

interface WipeTransitionProps {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    duration?: number;
    color?: string;
    startFrame?: number;
}

export const Wipe: React.FC<WipeTransitionProps> = ({
    children,
    direction = 'left',
    duration = 25,
    color = '#000000',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const progress = useTransform(
        frame,
        [startFrame, startFrame + duration],
        [0, 1]
    );

    const maskStyle: React.CSSProperties = {
        position: 'absolute',
        background: color,
    };

    switch (direction) {
        case 'left':
            maskStyle.top = 0;
            maskStyle.left = 0;
            maskStyle.bottom = 0;
            maskStyle.width = useTransform(progress, [0, 1], ['0%', '100%']);
            break;
        case 'right':
            maskStyle.top = 0;
            maskStyle.right = 0;
            maskStyle.bottom = 0;
            maskStyle.width = useTransform(progress, [0, 1], ['0%', '100%']);
            break;
        case 'up':
            maskStyle.top = 0;
            maskStyle.left = 0;
            maskStyle.right = 0;
            maskStyle.height = useTransform(progress, [0, 1], ['0%', '100%']);
            break;
        case 'down':
            maskStyle.bottom = 0;
            maskStyle.left = 0;
            maskStyle.right = 0;
            maskStyle.height = useTransform(progress, [0, 1], ['0%', '100%']);
            break;
    }

    return (
        <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', inset: 0 }}>
                {children}
            </div>
            <div style={maskStyle} />
        </div>
    );
};

interface ZoomTransitionProps {
    children: React.ReactNode;
    type?: 'in' | 'out';
    duration?: number;
    startFrame?: number;
}

export const Zoom: React.FC<ZoomTransitionProps> = ({
    children,
    type = 'in',
    duration = 25,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const scale = useTransform(
        frame,
        [startFrame, startFrame + duration],
        type === 'in' ? [2, 1] : [1, 2]
    );

    const opacity = useTransform(
        frame,
        [startFrame, startFrame + duration],
        type === 'in' ? [0, 1] : [1, 0]
    );

    return (
        <div style={{ position: 'absolute', inset: 0 }}>
            <div
                style={{
                    transform: `scale(${scale})`,
                    opacity,
                    width: '100%',
                    height: '100%',
                }}
            >
                {children}
            </div>
        </div>
    );
};

interface BlurTransitionProps {
    children: React.ReactNode;
    type?: 'in' | 'out' | 'both';
    maxBlur?: number;
    duration?: number;
    startFrame?: number;
}

export const BlurTransition: React.FC<BlurTransitionProps> = ({
    children,
    type = 'in',
    maxBlur = 20,
    duration = 20,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const blur = useTransform(
        frame,
        [startFrame, startFrame + duration],
        type === 'in' ? [maxBlur, 0] : type === 'out' ? [0, maxBlur] : [maxBlur, 0, maxBlur]
    );

    return (
        <div style={{ position: 'absolute', inset: 0, filter: `blur(${blur}px)` }}>
            {children}
        </div>
    );
};

interface GlitchTransitionProps {
    children: React.ReactNode;
    duration?: number;
    startFrame?: number;
}

export const GlitchTransition: React.FC<GlitchTransitionProps> = ({
    children,
    duration = 30,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));

    return (
        <div style={{ position: 'absolute', inset: 0 }}>
            {progress < 0.3 && (
                <div style={{ position: 'absolute', inset: 0, filter: 'hue-rotate(90deg)' }}>
                    {children}
                </div>
            )}
            {progress > 0.3 && progress < 0.6 && (
                <div style={{ position: 'absolute', inset: 0, filter: 'hue-rotate(180deg)' }}>
                    {children}
                </div>
            )}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: progress > 0.5 ? 1 : progress * 2,
                }}
            >
                {children}
            </div>
        </div>
    );
};
