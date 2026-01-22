import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface LowerThirdProps {
    name: string;
    title?: string;
    logo?: string;
    duration?: number;
    startFrame?: number;
    style?: 'standard' | 'minimal' | 'boxed' | 'slide';
    colorScheme?: 'dark' | 'light';
}

export const LowerThird: React.FC<LowerThirdProps> = ({
    name,
    title,
    logo,
    duration = 120,
    startFrame = 0,
    style = 'standard',
    colorScheme = 'dark',
}) => {
    const frame = useCurrentFrame();

    const colors = colorScheme === 'dark'
        ? { bg: 'rgba(0, 0, 0, 0.85)', text: '#ffffff', accent: '#3b82f6' }
        : { bg: 'rgba(255, 255, 255, 0.9)', text: '#000000', accent: '#3b82f6' };

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 30));
    const exitProgress = Math.max(0, Math.min(1, (frame - (startFrame + duration - 30)) / 15));

    const slideIn = useTransform(progress, [0, 1], [-100, 0]);
    const slideOut = useTransform(exitProgress, [0, 1], [0, -100]);
    const combinedSlide = useTransform(
        [progress, exitProgress],
        ([p, e]) => e > 0 ? e : -p * 100
    );

    const baseStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 120,
        left: 80,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        opacity: exitProgress > 0 ? 1 - exitProgress : progress,
    };

    switch (style) {
        case 'minimal':
            return (
                <div style={baseStyle}>
                    <div
                        style={{
                            height: 40,
                            width: 4,
                            background: colors.accent,
                            borderRadius: 2,
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 600, color: colors.text }}>
                            {name}
                        </span>
                        {title && (
                            <span style={{ fontFamily: 'Inter', fontSize: 18, color: colors.text, opacity: 0.7 }}>
                                {title}
                            </span>
                        )}
                    </div>
                </div>
            );

        case 'boxed':
            return (
                <div style={baseStyle}>
                    <div
                        style={{
                            background: colors.bg,
                            padding: '16px 24px',
                            borderRadius: 8,
                            borderLeft: `4px solid ${colors.accent}`,
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <span style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 600, color: colors.text }}>
                            {name}
                        </span>
                        {title && (
                            <div style={{ fontFamily: 'Inter', fontSize: 16, color: colors.text, opacity: 0.7, marginTop: 4 }}>
                                {title}
                            </div>
                        )}
                    </div>
                </div>
            );

        case 'slide':
            return (
                <div style={{
                    ...baseStyle,
                    transform: `translateX(${slideIn})`,
                }}>
                    <div
                        style={{
                            background: colors.accent,
                            padding: '12px 20px',
                            borderRadius: 4,
                        }}
                    >
                        <span style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 700, color: '#ffffff' }}>
                            {name}
                        </span>
                    </div>
                    {title && (
                        <div
                            style={{
                                background: colors.bg,
                                padding: '12px 20px',
                                borderRadius: 4,
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <span style={{ fontFamily: 'Inter', fontSize: 20, color: colors.text }}>
                                {title}
                            </span>
                        </div>
                    )}
                </div>
            );

        default:
            return (
                <div style={baseStyle}>
                    {logo && (
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: 50, height: 50, borderRadius: 4 }}
                        />
                    )}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            background: colors.bg,
                            padding: '12px 20px',
                            borderRadius: 4,
                            borderLeft: `4px solid ${colors.accent}`,
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <span style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 600, color: colors.text }}>
                            {name}
                        </span>
                        {title && (
                            <span style={{ fontFamily: 'Inter', fontSize: 18, color: colors.text, opacity: 0.8 }}>
                                {title}
                            </span>
                        )}
                    </div>
                </div>
            );
    }
};

interface CaptionsProps {
    text: string;
    style?: 'standard' | 'bottom' | 'centered' | 'top';
    background?: string;
    textColor?: string;
    font?: string;
    fontSize?: number;
    startFrame?: number;
}

export const Captions: React.FC<CaptionsProps> = ({
    text,
    style = 'bottom',
    background = 'rgba(0, 0, 0, 0.7)',
    textColor = '#ffffff',
    font = 'Inter',
    fontSize = 28,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 20));

    const positionStyles: Record<string, React.CSSProperties> = {
        standard: { position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)' },
        bottom: { position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)' },
        centered: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        top: { position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)' },
    };

    return (
        <div
            style={{
                ...positionStyles[style],
                background,
                padding: '12px 24px',
                borderRadius: 8,
                opacity: progress,
            }}
        >
            <span style={{ fontFamily: font, fontSize, color: textColor, textAlign: 'center' }}>
                {text}
            </span>
        </div>
    );
};

interface BugLogoProps {
    src: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: number;
    opacity?: number;
    startFrame?: number;
}

export const BugLogo: React.FC<BugLogoProps> = ({
    src,
    position = 'bottom-right',
    size = 60,
    opacity = 0.8,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 20));

    const positionStyles: Record<string, React.CSSProperties> = {
        'top-left': { top: 30, left: 30 },
        'top-right': { top: 30, right: 30 },
        'bottom-left': { bottom: 30, left: 30 },
        'bottom-right': { bottom: 30, right: 30 },
    };

    return (
        <div
            style={{
                position: 'absolute',
                ...positionStyles[position],
                opacity: opacity * progress,
            }}
        >
            <img src={src} alt="Logo" style={{ width: size, height: size }} />
        </div>
    );
};

interface TimestampProps {
    format?: 'time' | 'date' | 'datetime' | 'frames';
    color?: string;
    fontSize?: number;
    font?: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    startFrame?: number;
}

export const Timestamp: React.FC<TimestampProps> = ({
    format = 'time',
    color = '#ffffff',
    fontSize = 20,
    font = 'JetBrains Mono',
    position = 'top-left',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const positionStyles: Record<string, React.CSSProperties> = {
        'top-left': { top: 30, left: 30 },
        'top-right': { top: 30, right: 30 },
        'bottom-left': { bottom: 30, left: 30 },
        'bottom-right': { bottom: 30, right: 30 },
    };

    const getContent = (): string => {
        const now = new Date();
        switch (format) {
            case 'time':
                return now.toLocaleTimeString('en-US', { hour12: false });
            case 'date':
                return now.toLocaleDateString();
            case 'datetime':
                return `${now.toLocaleDateString()} ${now.toLocaleTimeString('en-US', { hour12: false })}`;
            case 'frames':
                return `Frame: ${frame}`;
            default:
                return '';
        }
    };

    return (
        <div
            style={{
                ...positionStyles[position],
                fontFamily: font,
                fontSize,
                color,
                opacity: 0.8,
            }}
        >
            {getContent()}
        </div>
    );
};

interface CenterTextProps {
    text: string;
    subtext?: string;
    backgroundColor?: string;
    textColor?: string;
    subtextColor?: string;
    font?: string;
    size?: number;
    subtextSize?: number;
    borderRadius?: number;
    padding?: number;
    startFrame?: number;
}

export const CenterText: React.FC<CenterTextProps> = ({
    text,
    subtext,
    backgroundColor = 'rgba(0, 0, 0, 0.8)',
    textColor = '#ffffff',
    subtextColor = '#aaaaaa',
    font = 'Inter',
    size = 48,
    subtextSize = 24,
    borderRadius = 16,
    padding = 40,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 30));

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: backgroundColor,
                padding: padding,
                borderRadius,
                textAlign: 'center',
                opacity: progress,
            }}
        >
            <div style={{ fontFamily: font, fontSize: size, fontWeight: 700, color: textColor }}>
                {text}
            </div>
            {subtext && (
                <div style={{ fontFamily: font, fontSize: subtextSize, color: subtextColor, marginTop: 12 }}>
                    {subtext}
                </div>
            )}
        </div>
    );
};
