import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface SplitTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    weight?: number;
    animation?: 'word' | 'char' | 'line';
    stagger?: number;
    duration?: number;
    startFrame?: number;
    letterSpacing?: number;
    lineHeight?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
    text,
    font = 'Inter',
    size = 48,
    color = '#ffffff',
    weight = 600,
    animation = 'word',
    stagger = 5,
    duration = 30,
    startFrame = 0,
    letterSpacing = 0,
    lineHeight = 1.3,
}) => {
    const frame = useCurrentFrame();

    const splitContent = useMemo(() => {
        if (animation === 'char') {
            return text.split('').map((char, i) => ({
                char,
                key: `char-${i}`,
            }));
        } else if (animation === 'line') {
            return text.split('\n').map((line, i) => ({
                text: line,
                key: `line-${i}`,
            }));
        }
        return text.split(' ').map((word, i) => ({
            word: word + (i < text.split(' ').length - 1 ? ' ' : ''),
            key: `word-${i}`,
        }));
    }, [text, animation]);

    const getItemStyle = (index: number): React.CSSProperties => {
        const itemStartFrame = startFrame + (index * stagger);
        const progress = Math.max(0, Math.min(1, (frame - itemStartFrame) / duration));

        return {
            display: animation === 'line' ? 'block' : 'inline-block',
            marginRight: animation === 'word' ? '0.25em' : 0,
            opacity: progress,
            transform: `translateY(${(1 - progress) * 20}px)`,
        };
    };

    return (
        <div style={{ 
            fontFamily: font, 
            fontSize: size, 
            fontWeight: weight, 
            color,
            letterSpacing: `${letterSpacing}px`,
            lineHeight,
        }}>
            {splitContent.map((item, index) => (
                <span key={item.key} style={getItemStyle(index)}>
                    {item.type === 'char' ? item.char : item.type === 'word' ? item.word : item.text}
                </span>
            ))}
        </div>
    );
};

interface RevealTextProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    weight?: number;
    revealDirection?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    startFrame?: number;
    maskHeight?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
    text,
    font = 'Inter',
    size = 64,
    color = '#ffffff',
    weight = 700,
    revealDirection = 'up',
    duration = 30,
    startFrame = 0,
    maskHeight = 50,
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));

    const getTransform = (): string => {
        switch (revealDirection) {
            case 'up': return `translateY(${(1 - progress) * maskHeight}px)`;
            case 'down': return `translateY(${(progress - 1) * maskHeight}px)`;
            case 'left': return `translateX(${(1 - progress) * maskHeight}px)`;
            case 'right': return `translateX(${(progress - 1) * maskHeight}px)`;
            default: return `translateY(${(1 - progress) * maskHeight}px)`;
        }
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div 
                style={{
                    fontFamily: font,
                    fontSize: size,
                    fontWeight: weight,
                    color,
                    transform: getTransform(),
                }}
            >
                {text}
            </div>
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent, black 100%)',
                    transform: revealDirection === 'up' ? `translateY(${(1 - progress) * 100}%)` : 'none',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

interface TextSequenceProps {
    texts: string[];
    font?: string;
    size?: number;
    color?: string;
    weight?: number;
    durationPerText?: number;
    stagger?: number;
    startFrame?: number;
}

export const TextSequence: React.FC<TextSequenceProps> = ({
    texts,
    font = 'Inter',
    size = 48,
    color = '#ffffff',
    weight = 600,
    durationPerText = 60,
    stagger = 15,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    return (
        <div style={{ fontFamily: font, fontSize: size, fontWeight: weight, color }}>
            {texts.map((text, index) => {
                const textStartFrame = startFrame + (index * (durationPerText + stagger));
                const textEndFrame = textStartFrame + durationPerText;
                const progress = Math.max(0, Math.min(1, (frame - textStartFrame) / stagger));

                const isVisible = frame >= textStartFrame && frame < textEndFrame;

                if (!isVisible && frame >= textEndFrame) return null;

                return (
                    <div
                        key={index}
                        style={{
                            opacity: isVisible ? 1 : progress,
                            transform: `translateY(${(1 - progress) * 20}px)`,
                        }}
                    >
                        {text}
                    </div>
                );
            })}
        </div>
    );
};
