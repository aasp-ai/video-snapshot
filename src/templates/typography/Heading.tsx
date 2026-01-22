import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface HeadingProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    weight?: number;
    align?: 'left' | 'center' | 'right';
    animation?: 'reveal' | 'slideUp' | 'scaleIn' | 'blurIn' | 'none';
    duration?: number;
    startFrame?: number;
    letterSpacing?: number;
}

export const Heading: React.FC<HeadingProps> = ({
    text,
    font = 'Inter',
    size = 72,
    color = '#ffffff',
    weight = 800,
    align = 'center',
    animation = 'reveal',
    duration = 30,
    startFrame = 0,
    letterSpacing = -1,
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));

    const getAnimationStyle = (): React.CSSProperties => {
        switch (animation) {
            case 'reveal':
                return {
                    opacity: progress,
                    transform: `translateY(${(1 - progress) * 30}px)`,
                };
            case 'slideUp':
                return {
                    opacity: progress,
                    transform: `translateY(${(1 - progress) * 50}px) scale(${0.9 + progress * 0.1})`,
                };
            case 'scaleIn':
                return {
                    opacity: progress,
                    transform: `scale(${0.5 + progress * 0.5})`,
                };
            case 'blurIn':
                return {
                    opacity: progress,
                    filter: `blur(${(1 - progress) * 20}px)`,
                };
            default:
                return {};
        }
    };

    const style = useMemo(() => ({
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        color,
        textAlign: align,
        letterSpacing: `${letterSpacing}px`,
        lineHeight: 1.1,
        maxWidth: '90%',
        ...getAnimationStyle(),
    }), [font, size, color, weight, align, letterSpacing, animation, progress]);

    return <div style={style}>{text}</div>;
};

interface SubheadingProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    weight?: number;
    align?: 'left' | 'center' | 'right';
    animation?: 'typewriter' | 'fadeIn' | 'blurIn' | 'slideUp' | 'none';
    duration?: number;
    startFrame?: number;
}

export const Subheading: React.FC<SubheadingProps> = ({
    text,
    font = 'Inter',
    size = 36,
    color = '#cccccc',
    weight = 400,
    align = 'center',
    animation = 'fadeIn',
    duration = 30,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));

    const getAnimationStyle = (): React.CSSProperties => {
        switch (animation) {
            case 'typewriter':
                const chars = text.length;
                const charsRevealed = Math.floor(progress * chars);
                return {
                    clipPath: `inset(0 ${100 - (charsRevealed / chars) * 100}% 0 0)`,
                };
            case 'fadeIn':
                return { opacity: progress };
            case 'blurIn':
                return { opacity: progress, filter: `blur(${(1 - progress) * 15}px)` };
            case 'slideUp':
                return { opacity: progress, transform: `translateY(${(1 - progress) * 30}px)` };
            default:
                return {};
        }
    };

    const style = useMemo(() => ({
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        color,
        textAlign: align,
        lineHeight: 1.4,
        maxWidth: '80%',
        marginTop: 16,
        ...getAnimationStyle(),
    }), [font, size, color, weight, align, animation, progress, text]);

    return <div style={style}>{text}</div>;
};

interface HighlightTextProps {
    text: string;
    highlight: string;
    font?: string;
    size?: number;
    textColor?: string;
    highlightColor?: string;
    weight?: number;
    animation?: 'reveal' | 'none';
    duration?: number;
    startFrame?: number;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
    text,
    highlight,
    font = 'Inter',
    size = 48,
    textColor = '#ffffff',
    highlightColor = '#fbbf24',
    weight = 600,
    animation = 'reveal',
    duration = 30,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));

    const parts = text.split(highlight);
    const highlightIndex = parts.findIndex(p => p === '');

    const getAnimationStyle = (): React.CSSProperties => {
        if (animation === 'reveal') {
            return { opacity: progress };
        }
        return {};
    };

    return (
        <div style={{ fontFamily: font, fontSize: size, fontWeight: weight, ...getAnimationStyle() }}>
            {parts.map((part, i) => (
                <React.Fragment key={i}>
                    <span style={{ color: textColor }}>{part}</span>
                    {i < parts.length - 1 && (
                        <span style={{ 
                            color: highlightColor,
                            background: `${highlightColor}20`,
                            padding: '0 8px',
                            borderRadius: 4,
                        }}>
                            {highlight}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
