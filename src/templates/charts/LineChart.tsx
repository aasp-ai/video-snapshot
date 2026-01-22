import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface LineChartProps {
    data: { x: number; y: number }[];
    width?: number;
    height?: number;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    fillOpacity?: number;
    showPoints?: boolean;
    pointRadius?: number;
    pointColor?: string;
    animated?: boolean;
    animationDuration?: number;
    startFrame?: number;
    smooth?: boolean;
    backgroundColor?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
    data,
    width = 800,
    height = 400,
    strokeColor = '#3b82f6',
    strokeWidth = 3,
    fillColor = '#3b82f6',
    fillOpacity = 0.1,
    showPoints = true,
    pointRadius = 6,
    pointColor = '#ffffff',
    animated = true,
    animationDuration = 60,
    startFrame = 0,
    smooth = true,
    backgroundColor = 'transparent',
}) => {
    const frame = useCurrentFrame();

    const xScale = width / (Math.max(...data.map(d => d.x)) - Math.min(...data.map(d => d.x)) || 1);
    const yScale = height / (Math.max(...data.map(d => d.y)) - Math.min(...data.map(d => d.y)) || 1);

    const normalizedData = useMemo(() => {
        const minX = Math.min(...data.map(d => d.x));
        const minY = Math.min(...data.map(d => d.y));
        return data.map(d => ({
            x: (d.x - minX) * xScale,
            y: height - (d.y - minY) * yScale,
        }));
    }, [data, xScale, yScale, height]);

    const linePath = useMemo(() => {
        if (smooth) {
            let path = `M ${normalizedData[0].x} ${normalizedData[0].y}`;
            for (let i = 1; i < normalizedData.length; i++) {
                const prev = normalizedData[i - 1];
                const curr = normalizedData[i];
                const midX = (prev.x + curr.x) / 2;
                path += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
            }
            return path;
        }
        return normalizedData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${d.x} ${d.y}`).join(' ');
    }, [normalizedData, smooth]);

    const fillPath = useMemo(() => {
        const lastPoint = normalizedData[normalizedData.length - 1];
        return `${linePath} L ${lastPoint.x} ${height} L ${normalizedData[0].x} ${height} Z`;
    }, [linePath, normalizedData, height]);

    const progress = Math.max(0, Math.min(1, (frame - startFrame) / animationDuration));

    const drawProgress = useTransform(progress, [0, 1], [0, 1]);
    const drawLength = useTransform(progress, [0, 1], [0, 1000]);

    return (
        <div style={{ width, height, backgroundColor, position: 'relative' }}>
            <svg width={width} height={height} style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id={`fillGradient-${startFrame}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={fillColor} stopOpacity={fillOpacity} />
                        <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d={fillPath}
                    fill={`url(#fillGradient-${startFrame})`}
                    style={{ opacity: animated ? progress : 1 }}
                />
                <path
                    d={linePath}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        strokeDasharray: 2000,
                        strokeDashoffset: useTransform(drawProgress, [0, 1], [2000, 0]),
                    }}
                />
                {showPoints && normalizedData.map((point, i) => {
                    const pointProgress = Math.max(0, Math.min(1, (frame - startFrame - (i * animationDuration / normalizedData.length)) / 15));
                    return (
                        <circle
                            key={i}
                            cx={point.x}
                            cy={point.y}
                            r={pointRadius}
                            fill={pointColor}
                            style={{
                                opacity: animated ? pointProgress : 1,
                                transform: useTransform(pointProgress, [0, 1], [0, pointRadius]),
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    progressColor?: string;
    trackColor?: string;
    startAngle?: number;
    endAngle?: number;
    animated?: boolean;
    animationDuration?: number;
    startFrame?: number;
    showLabel?: boolean;
    labelColor?: string;
    labelSize?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
    progress,
    size = 200,
    strokeWidth = 15,
    progressColor = '#3b82f6',
    trackColor = '#333333',
    startAngle = -90,
    endAngle = 270,
    animated = true,
    animationDuration = 45,
    startFrame = 0,
    showLabel = true,
    labelColor = '#ffffff',
    labelSize = 36,
}) => {
    const frame = useCurrentFrame();

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const progressFrame = Math.max(0, Math.min(1, (frame - startFrame) / animationDuration));
    const actualProgress = progress * progressFrame;

    const dashOffset = circumference * (1 - actualProgress);

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={progressColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                />
            </svg>
            {showLabel && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: labelColor,
                        fontSize: labelSize,
                        fontWeight: 700,
                    }}
                >
                    {Math.round(actualProgress * 100)}%
                </div>
            )}
        </div>
    );
};

interface ProgressBarProps {
    progress: number;
    width?: number;
    height?: number;
    progressColor?: string;
    trackColor?: string;
    animated?: boolean;
    animationDuration?: number;
    startFrame?: number;
    showLabel?: boolean;
    labelColor?: string;
    labelSize?: number;
    borderRadius?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    width = 400,
    height = 20,
    progressColor = '#3b82f6',
    trackColor = '#333333',
    animated = true,
    animationDuration = 30,
    startFrame = 0,
    showLabel = true,
    labelColor = '#ffffff',
    labelSize = 14,
    borderRadius = 10,
}) => {
    const frame = useCurrentFrame();

    const progressFrame = Math.max(0, Math.min(1, (frame - startFrame) / animationDuration));
    const actualProgress = progress * progressFrame;

    const barStyle: React.CSSProperties = {
        width,
        height,
        background: trackColor,
        borderRadius,
        overflow: 'hidden',
    };

    const fillStyle: React.CSSProperties = {
        width: 0,
        height: '100%',
        background: progressColor,
        borderRadius,
        transformOrigin: 'left',
        transform: useTransform(progressFrame, [0, 1], [0, actualProgress * width]),
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={barStyle}>
                <div style={fillStyle} />
            </div>
            {showLabel && (
                <div style={{ color: labelColor, fontSize: labelSize, fontWeight: 500 }}>
                    {Math.round(actualProgress * 100)}%
                </div>
            )}
        </div>
    );
};

interface DonutChartProps {
    data: { value: number; color: string; label?: string }[];
    size?: number;
    innerRadiusRatio?: number;
    animated?: boolean;
    animationDuration?: number;
    startFrame?: number;
    showLabels?: boolean;
    labelColor?: string;
    labelSize?: number;
    centerText?: string;
    centerTextColor?: string;
    centerTextSize?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
    data,
    size = 300,
    innerRadiusRatio = 0.6,
    animated = true,
    animationDuration = 60,
    startFrame = 0,
    showLabels = true,
    labelColor = '#ffffff',
    labelSize = 14,
    centerText,
    centerTextColor = '#ffffff',
    centerTextSize = 24,
}) => {
    const frame = useCurrentFrame();

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const outerRadius = size / 2;
    const innerRadius = outerRadius * innerRadiusRatio;

    let currentAngle = 0;
    const segments = data.map(item => {
        const angle = (item.value / total) * 2 * Math.PI;
        const startAngle = currentAngle;
        currentAngle += angle;
        return { ...item, startAngle, endAngle: currentAngle };
    });

    const progressFrame = Math.max(0, Math.min(1, (frame - startFrame) / animationDuration));

    const createArcPath = (startAngle: number, endAngle: number): string => {
        const start = {
            x: outerRadius + outerRadius * Math.cos(startAngle),
            y: outerRadius + outerRadius * Math.sin(startAngle),
        };
        const end = {
            x: outerRadius + outerRadius * Math.cos(endAngle),
            y: outerRadius + outerRadius * Math.sin(endAngle),
        };
        const innerStart = {
            x: outerRadius + innerRadius * Math.cos(endAngle),
            y: outerRadius + innerRadius * Math.sin(endAngle),
        };
        const innerEnd = {
            x: outerRadius + innerRadius * Math.cos(startAngle),
            y: outerRadius + innerRadius * Math.sin(startAngle),
        };
        return `M ${start.x} ${start.y} A ${outerRadius} ${outerRadius} 0 ${endAngle - startAngle > Math.PI ? 1 : 0} 1 ${end.x} ${end.y} L ${innerStart.x} ${innerStart.y} A ${innerRadius} ${innerRadius} 0 ${endAngle - startAngle > Math.PI ? 1 : 0} 0 ${innerEnd.x} ${innerEnd.y} Z`;
    };

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size}>
                {segments.map((segment, i) => {
                    const segmentProgress = Math.max(0, Math.min(1, (frame - startFrame - (i * animationDuration / segments.length)) / 30));
                    const adjustedEndAngle = segment.startAngle + (segment.endAngle - segment.startAngle) * segmentProgress;
                    const path = createArcPath(segment.startAngle, adjustedEndAngle);

                    return (
                        <path
                            key={i}
                            d={path}
                            fill={segment.color}
                            style={{ opacity: segmentProgress }}
                        />
                    );
                })}
            </svg>
            {centerText && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: centerTextColor,
                        fontSize: centerTextSize,
                        fontWeight: 700,
                        textAlign: 'center',
                    }}
                >
                    {centerText}
                </div>
            )}
            {showLabels && (
                <div style={{ position: 'absolute', top: size + 20, left: 0, right: 0 }}>
                    {segments.map((segment, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                marginRight: 20,
                                color: labelColor,
                                fontSize: labelSize,
                            }}
                        >
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 2,
                                    background: segment.color,
                                    marginRight: 8,
                                }}
                            />
                            {segment.label || `${Math.round((segment.value / total) * 100)}%`}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
