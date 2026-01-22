import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface SceneContainerProps {
    children: React.ReactNode;
    padding?: number;
    background?: string;
    backgroundImage?: string;
    alignItems?: 'flex-start' | 'center' | 'flex-end';
    justifyContent?: 'flex-start' | 'center' | 'flex-end';
    direction?: 'row' | 'column';
    gap?: number;
    enterDuration?: number;
    exitDuration?: number;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
    children,
    padding = 80,
    background = '#000000',
    backgroundImage,
    alignItems = 'center',
    justifyContent = 'center',
    direction = 'column',
    gap = 20,
    enterDuration = 30,
    exitDuration = 30,
}) => {
    const frame = useCurrentFrame();

    const enterProgress = useTransform(
        frame,
        [0, enterDuration],
        [0, 1],
        { easing: Easing.out(Easing.cubic) }
    );

    const exitProgress = useTransform(
        frame,
        [0, exitDuration],
        [1, 0],
        { easing: Easing.in(Easing.cubic) }
    );

    const enterOpacity = useTransform(enterProgress, [0, 1], [0.8, 1]);
    const enterScale = useTransform(enterProgress, [0, 1], [0.98, 1]);
    const enterY = useTransform(enterProgress, [0, 1], [20, 0]);

    const containerStyle: React.CSSProperties = useMemo(() => ({
        padding,
        background,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: direction,
        alignItems,
        justifyContent,
        gap,
        width: '100%',
        height: '100%',
        opacity: enterOpacity,
        transform: `scale(${enterScale}) translateY(${enterY}px)`,
    }), [padding, background, backgroundImage, alignItems, justifyContent, direction, gap, enterOpacity, enterScale, enterY]);

    return <div style={containerStyle}>{children}</div>;
};

interface SceneWrapperProps {
    children: React.ReactNode;
    startFrame: number;
    durationFrames: number;
    background?: string;
}

export const SceneWrapper: React.FC<SceneWrapperProps> = ({
    children,
    startFrame,
    durationFrames,
    background = '#000000',
}) => {
    const frame = useCurrentFrame();
    const endFrame = startFrame + durationFrames;
    const isActive = frame >= startFrame && frame < endFrame;
    const exitStart = endFrame - 30;

    const opacity = useTransform(
        frame,
        [startFrame, startFrame + 20, exitStart, endFrame],
        [0, 1, 1, 0]
    );

    const style: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background,
        opacity,
        display: isActive ? 'flex' : 'none',
    };

    return <div style={style}>{children}</div>;
};

interface SceneTransitionProps {
    type: 'fade' | 'slide-left' | 'slide-right' | 'zoom' | 'blur';
    direction?: 'in' | 'out';
    duration?: number;
    color?: string;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
    type,
    direction = 'in',
    duration = 20,
    color = '#000000',
}) => {
    const frame = useCurrentFrame();

    const getTransitionStyle = (): React.CSSProperties => {
        switch (type) {
            case 'fade':
                const fadeOpacity = direction === 'in'
                    ? useTransform(frame, [0, duration], [1, 0])
                    : useTransform(frame, [0, duration], [0, 1]);
                return {
                    position: 'absolute' as const,
                    inset: 0,
                    background: color,
                    opacity: fadeOpacity,
                };

            case 'slide-left':
                const slideX = direction === 'in'
                    ? useTransform(frame, [0, duration], ['100%', '0%'])
                    : useTransform(frame, [0, duration], ['0%', '-100%']);
                return {
                    position: 'absolute' as const,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: color,
                    transform: `translateX(${slideX})`,
                };

            case 'slide-right':
                const slideRightX = direction === 'in'
                    ? useTransform(frame, [0, duration], ['-100%', '0%'])
                    : useTransform(frame, [0, duration], ['0%', '100%']);
                return {
                    position: 'absolute' as const,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: color,
                    transform: `translateX(${slideRightX})`,
                };

            case 'zoom':
                const scale = direction === 'in'
                    ? useTransform(frame, [0, duration], [2, 1])
                    : useTransform(frame, [0, duration], [1, 0.5]);
                const zoomOpacity = direction === 'in'
                    ? useTransform(frame, [0, duration], [0.5, 1])
                    : useTransform(frame, [0, duration], [1, 0]);
                return {
                    position: 'absolute' as const,
                    inset: 0,
                    background: color,
                    transform: `scale(${scale})`,
                    opacity: zoomOpacity,
                };

            case 'blur':
                return {
                    position: 'absolute' as const,
                    inset: 0,
                    background: color,
                    filter: direction === 'in' ? 'blur(20px)' : 'blur(0px)',
                    transition: 'filter 0.3s',
                };

            default:
                return {};
        }
    };

    return <div style={getTransitionStyle()} />;
};
