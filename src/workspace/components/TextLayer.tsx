import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface TextLayerProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    weight?: number;
    align?: 'left' | 'center' | 'right';
    letterSpacing?: number;
    lineHeight?: number;
    maxWidth?: number;
    animation?: 'none' | 'reveal' | 'typewriter' | 'slideUp' | 'scaleIn' | 'blurIn';
    animationDuration?: number;
    startFrame?: number;
}

export const TextLayer: React.FC<TextLayerProps> = ({
    text,
    font = 'Inter',
    size = 48,
    color = '#ffffff',
    weight = 700,
    align = 'center',
    letterSpacing = 0,
    lineHeight = 1.2,
    maxWidth,
    animation = 'none',
    animationDuration = 30,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const getAnimationStyles = (): React.CSSProperties => {
        if (animation === 'none') return {};

        const progress = Math.max(0, Math.min(1, (frame - startFrame) / animationDuration));

        switch (animation) {
            case 'reveal':
                return {
                    opacity: progress,
                    transform: `translateY(${(1 - progress) * 30}px)`,
                };

            case 'typewriter':
                const charCount = text.length;
                const charsToShow = Math.floor(progress * charCount);
                return {
                    clipPath: `inset(0 ${100 - (charsToShow / charCount) * 100}% 0 0)`,
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

    const style: React.CSSProperties = useMemo(() => ({
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        color,
        textAlign: align,
        letterSpacing: `${letterSpacing}px`,
        lineHeight,
        maxWidth,
        ...getAnimationStyles(),
    }), [font, size, color, weight, align, letterSpacing, lineHeight, maxWidth, animation, frame, startFrame, animationDuration, text]);

    return <div style={style}>{text}</div>;
};

interface SplitTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    weight?: number;
    animation?: 'word' | 'char' | 'line';
    animationDuration?: number;
    stagger?: number;
    startFrame?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
    text,
    font = 'Inter',
    size = 48,
    color = '#ffffff',
    weight = 700,
    animation = 'word',
    animationDuration = 30,
    stagger = 5,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const splitContent = useMemo(() => {
        if (animation === 'char') {
            return text.split('').map((char, i) => ({
                char,
                key: `char-${i}`,
                type: 'char' as const,
            }));
        } else if (animation === 'line') {
            return text.split('\n').map((line, i) => ({
                text: line,
                key: `line-${i}`,
                type: 'line' as const,
            }));
        }
        return text.split(' ').map((word, i) => ({
            word: word + (i < text.split(' ').length - 1 ? ' ' : ''),
            key: `word-${i}`,
            type: 'word' as const,
        }));
    }, [text, animation]);

    const getItemStyle = (index: number): React.CSSProperties => {
        const itemStartFrame = startFrame + (index * stagger);
        const progress = Math.max(0, Math.min(1, (frame - itemStartFrame) / animationDuration));

        return {
            opacity: progress,
            transform: `translateY(${(1 - progress) * 20}px)`,
            display: animation === 'line' ? 'block' : 'inline-block',
            marginRight: animation === 'word' ? '0.25em' : 0,
        };
    };

    return (
        <div style={{ fontFamily: font, fontSize: size, fontWeight: weight, color }}>
            {splitContent.map((item, index) => (
                <span key={item.key} style={getItemStyle(index)}>
                    {item.type === 'char' ? item.char : item.type === 'word' ? item.word : item.text}
                </span>
            ))}
        </div>
    );
};

interface GlitchTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    glitchIntensity?: number;
    startFrame?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    text,
    font = 'Oswald',
    size = 72,
    color = '#ffffff',
    glitchIntensity = 0.1,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const glitchOffset = useTransform(
        frame,
        [startFrame, startFrame + 1],
        [0, Math.random() > 0.9 ? (Math.random() - 0.5) * 20 * glitchIntensity : 0]
    );

    const redOffset = useTransform(
        frame,
        [startFrame, startFrame + 1],
        [0, Math.random() > 0.9 ? (Math.random() - 0.5) * 10 * glitchIntensity : 0]
    );

    const blueOffset = useTransform(
        frame,
        [startFrame, startFrame + 1],
        [0, Math.random() > 0.9 ? (Math.random() - 0.5) * 10 * glitchIntensity : 0]
    );

    const clipPath = useTransform(
        frame,
        [startFrame, startFrame + 1],
        [Math.random() > 0.95 ? `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)` : undefined]
    );

    return (
        <div style={{ position: 'relative', fontFamily: font, fontSize: size, fontWeight: 700 }}>
            <span style={{ color: 'red', position: 'absolute', left: -2, top: 0, transform: `translateX(${redOffset}px)` }}>
                {text}
            </span>
            <span style={{ color: 'blue', position: 'absolute', left: 2, top: 0, transform: `translateX(${blueOffset}px)` }}>
                {text}
            </span>
            <span style={{ color, position: 'relative', transform: `translateX(${glitchOffset}px)`, clipPath }}>
                {text}
            </span>
        </div>
    );
};

interface TypewriterTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    speed?: number;
    cursor?: boolean;
    cursorColor?: string;
    startFrame?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    font = 'JetBrains Mono',
    size = 36,
    color = '#00ff88',
    speed = 2,
    cursor = true,
    cursorColor = '#00ff88',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();
    const charsRevealed = Math.floor((frame - startFrame) / speed);

    const displayedText = text.substring(0, Math.max(0, charsRevealed));

    const cursorOpacity = useTransform(
        frame,
        [startFrame, startFrame + 30],
        [1, 1],
        { easing: (t) => Math.sin(t * Math.PI * 2) * 0.5 + 0.5 }
    );

    return (
        <div style={{ fontFamily: font, fontSize: size, color, display: 'inline-flex', alignItems: 'center' }}>
            <span>{displayedText}</span>
            {cursor && charsRevealed < text.length && (
                <span style={{ 
                    width: 2, 
                    height: size * 0.8, 
                    background: cursorColor, 
                    marginLeft: 4,
                    opacity: cursorOpacity,
                }} />
            )}
        </div>
    );
};

interface MarqueeTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    direction?: 'left' | 'right';
    speed?: number;
    startFrame?: number;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
    text,
    font = 'Oswald',
    size = 48,
    color = '#ffffff',
    direction = 'left',
    speed = 2,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const offset = useTransform(
        frame,
        [startFrame, startFrame + 1000],
        [0, direction === 'left' ? -1000 : 1000],
        { easing: (t) => t }
    );

    return (
        <div style={{ 
            overflow: 'hidden', 
            whiteSpace: 'nowrap',
            width: '100%',
            fontFamily: font,
            fontSize: size,
            fontWeight: 700,
            color,
        }}>
            <span style={{ display: 'inline-block', transform: `translateX(${offset}px)` }}>
                {text}
            </span>
        </div>
    );
};
