import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

interface BarChartData {
    label: string;
    value: number;
    color?: string;
}

interface BarChartProps {
    data: BarChartData[];
    width?: number;
    height?: number;
    barWidth?: number;
    barGap?: number;
    maxValue?: number;
    animationDuration?: number;
    startFrame?: number;
    showLabels?: boolean;
    labelColor?: string;
    labelSize?: number;
    animated?: boolean;
    layout?: 'horizontal' | 'vertical';
    backgroundColor?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
    data,
    width = 800,
    height = 400,
    barWidth = 60,
    barGap = 20,
    maxValue: userMaxValue,
    animationDuration = 45,
    startFrame = 0,
    showLabels = true,
    labelColor = '#ffffff',
    labelSize = 16,
    animated = true,
    layout = 'horizontal',
    backgroundColor = 'transparent',
}) => {
    const frame = useCurrentFrame();

    const maxValue = userMaxValue || Math.max(...data.map(d => d.value));

    const totalWidth = data.length * barWidth + (data.length - 1) * barGap;
    const startX = (width - totalWidth) / 2;

    const getBarAnimation = (index: number): React.CSSProperties => {
        if (!animated) return {};

        const barStartFrame = startFrame + (index * 10);
        const progress = Math.max(0, Math.min(1, (frame - barStartFrame) / animationDuration));

        if (layout === 'horizontal') {
            return {
                width: 0,
                transform: useTransform(progress, [0, 1], [0, barWidth]),
            };
        } else {
            return {
                height: 0,
                transform: useTransform(progress, [0, 1], [0, data[index].value / maxValue * (height - 100)]),
            };
        }
    };

    return (
        <div style={{ width, height, backgroundColor, position: 'relative' }}>
            {data.map((item, index) => {
                const barHeight = (item.value / maxValue) * (height - 100);
                const barColor = item.color || '#3b82f6';
                const x = startX + index * (barWidth + barGap);

                if (layout === 'horizontal') {
                    return (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                bottom: 50,
                                left: x,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: barWidth,
                                    height: barHeight,
                                    background: barColor,
                                    borderRadius: 4,
                                    transformOrigin: 'bottom',
                                    ...getBarAnimation(index),
                                }}
                            />
                            {showLabels && (
                                <div
                                    style={{
                                        marginTop: 10,
                                        color: labelColor,
                                        fontSize: labelSize,
                                        fontWeight: 500,
                                    }}
                                >
                                    {item.label}
                                </div>
                            )}
                            <div
                                style={{
                                    marginTop: 4,
                                    color: labelColor,
                                    fontSize: labelSize - 2,
                                    opacity: 0.7,
                                }}
                            >
                                {item.value}
                            </div>
                        </div>
                    );
                }

                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            bottom: 50,
                            left: x,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            height: height - 100,
                        }}
                    >
                        <div
                            style={{
                                width: barWidth,
                                height: barHeight,
                                background: barColor,
                                borderRadius: 4,
                                transformOrigin: 'bottom',
                                ...getBarAnimation(index),
                            }}
                        />
                        {showLabels && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: -30,
                                    left: 0,
                                    width: barWidth,
                                    textAlign: 'center',
                                    color: labelColor,
                                    fontSize: labelSize,
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.label}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

interface AnimatedBarProps {
    value: number;
    maxValue?: number;
    width?: number;
    height?: number;
    color?: string;
    direction?: 'left-to-right' | 'right-to-left' | 'center-out';
    showValue?: boolean;
    valueColor?: string;
    valueSize?: number;
    label?: string;
    labelColor?: string;
    labelSize?: number;
    animationDuration?: number;
    startFrame?: number;
}

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
    value,
    maxValue = 100,
    width = 400,
    height = 40,
    color = '#3b82f6',
    direction = 'left-to-right',
    showValue = true,
    valueColor = '#ffffff',
    valueSize = 18,
    label,
    labelColor = '#aaaaaa',
    labelSize = 14,
    animationDuration = 30,
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / animationDuration));
    const filledWidth = (value / maxValue) * width;

    const barStyle: React.CSSProperties = {
        position: 'relative',
        width,
        height,
        background: '#333333',
        borderRadius: height / 2,
        overflow: 'hidden',
    };

    const fillStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        height: '100%',
        background: color,
        borderRadius: height / 2,
    };

    switch (direction) {
        case 'left-to-right':
            fillStyle.left = 0;
            fillStyle.width = 0;
            fillStyle.transform = useTransform(progress, [0, 1], [0, filledWidth]);
            break;
        case 'right-to-left':
            fillStyle.right = 0;
            fillStyle.width = 0;
            fillStyle.transform = useTransform(progress, [0, 1], [0, filledWidth]);
            break;
        case 'center-out':
            fillStyle.left = '50%';
            fillStyle.width = 0;
            fillStyle.transformOrigin = 'center';
            fillStyle.transform = useTransform(progress, [0, 1], ['translateX(-50%) scaleX(0)', `translateX(-50%) scaleX(${value / maxValue})`]);
            break;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={barStyle}>
                <div style={fillStyle} />
                {showValue && (
                    <div
                        style={{
                            position: 'absolute',
                            right: 12,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: valueColor,
                            fontSize: valueSize,
                            fontWeight: 600,
                        }}
                    >
                        {value}
                    </div>
                )}
            </div>
            {label && (
                <div style={{ color: labelColor, fontSize: labelSize }}>
                    {label}
                </div>
            )}
        </div>
    );
};
